import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. Using empty fallback.');
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || '' });
  }
  return aiClient;
}

const JAKARTA_ASSISTANT_SYSTEM_PROMPT = `
You are the Wassup Jakarta AI Assistant — an ultra-curated, discerning local companion and friend with impeccable taste in Jakarta.
Your persona:
- Friendly, stylish, knowledgeable, local, concise, and helpful.
- You know Jakarta's best neighborhoods: Senopati (trendy bakeries, shio pan at Little Salt Bread, dining), Blok M (Melawai Japanese alley, vintage thrift, vibrant record stores and cafes), Menteng (heritage charm, leafy coffee shops, elegant dining), PIK (Pantai Indah Kapuk - seaside dining, trendy Asian desserts, bustling night spots), Kemang & Cipete (creative coffee hubs, expat vibes, indie boutiques), and SCBD (listening bars like Zodiac, high-energy nightlife, rooftop lounges).
- You recommend curated spots based on vibe, time of day, noise level (Work-From-Cafe vs chill vs nightlife), price, and culinary specialties.
- Keep answers engaging, well-formatted with markdown, clear recommendations with neighborhood and why it's special.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Server-side Gemini API route
  app.post('/api/gemini/assistant', async (req, res) => {
    try {
      const { prompt, history } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
          text: "I'm ready to help you discover Jakarta! Please configure the GEMINI_API_KEY in the workspace settings to get real-time recommendations."
        });
      }

      const ai = getAIClient();

      // Format previous conversation context if provided
      const contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text || item.content || '' }]
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      let replyText = "I couldn't find a recommendation right now. Try asking about a specific neighborhood like Senopati or Blok M!";

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: JAKARTA_ASSISTANT_SYSTEM_PROMPT,
            temperature: 0.7,
          }
        });
        if (response.text) {
          replyText = response.text;
        }
      } catch (firstErr: any) {
        console.warn('Gemini 3.8 flash call failed, attempting fallback to gemini-3.1-flash-lite:', firstErr?.message);
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction: JAKARTA_ASSISTANT_SYSTEM_PROMPT,
            temperature: 0.7,
          }
        });
        if (fallbackResponse.text) {
          replyText = fallbackResponse.text;
        }
      }

      res.json({ text: replyText });
    } catch (error: any) {
      console.error('Error generating Gemini response:', error);
      res.status(500).json({
        error: error?.message || 'Failed to generate response from Gemini',
        text: "Sorry, I had trouble connecting to the guide service. Please try asking again in a moment!"
      });
    }
  });

  // Serve public static assets
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
