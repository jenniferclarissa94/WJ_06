import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface GeminiHomeBarProps {
  onOpenAssistant: (prompt?: string) => void;
}

export default function GeminiHomeBar({ onOpenAssistant }: GeminiHomeBarProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onOpenAssistant(prompt.trim());
      setPrompt('');
    } else {
      onOpenAssistant();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full relative flex items-center bg-white/5 hover:bg-white/[0.08] focus-within:bg-white/[0.08] border border-white/10 focus-within:border-[var(--color-primary)]/60 rounded-xl px-3 py-2 transition shadow-sm group"
    >
      <div className="w-6 h-6 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center shrink-0 mr-2.5">
        <Sparkles size={13} className="text-[var(--color-primary)]" />
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask Gemini for spot ideas, cafes, or vibes..."
        className="flex-1 bg-transparent text-white text-xs placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="w-6 h-6 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center transition shrink-0 ml-1.5 shadow-sm"
        title="Ask Gemini"
      >
        <ArrowRight size={12} />
      </button>
    </form>
  );
}
