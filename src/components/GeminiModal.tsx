import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Trash2, 
  Clock, 
  MessageSquare, 
  RotateCcw, 
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { 
  ensureAuthUser, 
  saveInteraction, 
  subscribeUserChatHistory, 
  deleteInteraction, 
  ChatInteraction 
} from '../firebase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export default function GeminiModal({ isOpen, onClose, initialPrompt }: GeminiModalProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Halo! I'm your **Wassup Jakarta AI Assistant**, powered by Gemini. Ask me anything about Jakarta's best coffee shops, hidden dining gems, listening bars, weekend events, or custom neighborhood walks!",
      createdAt: new Date().toISOString()
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatInteraction[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Authenticate user anonymously or check current user
  useEffect(() => {
    ensureAuthUser().then((user) => {
      setUserId(user.uid);
    });
  }, []);

  // Subscribe to real-time user-isolated chat history from Firestore
  useEffect(() => {
    if (!userId) return;
    const unsubscribe = subscribeUserChatHistory(userId, (items) => {
      setHistory(items);
    });
    return () => unsubscribe();
  }, [userId]);

  // Handle initialPrompt trigger if passed from HomeView
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim() !== '') {
      handleSend(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, activeTab]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputPrompt).trim();
    if (!textToSend || loading) return;

    setInputPrompt('');
    const userMsgId = 'user_' + Date.now();
    const newUserMsg: Message = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          text: m.content
        }));

      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: historyPayload
        })
      });

      const data = await res.json();
      const assistantReply = data.text || "Sorry, I couldn't get a response. Please try again.";

      const assistantMsg: Message = {
        id: 'assistant_' + Date.now(),
        role: 'assistant',
        content: assistantReply,
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMsg]);

      // Save interaction to Firestore strictly isolated to this user
      if (userId) {
        await saveInteraction(userId, textToSend, assistantReply);
      }
    } catch (err) {
      console.error('Gemini error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: "Sorry, I ran into an error connecting to the assistant. Please check your network and try again.",
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) return;
    try {
      await deleteInteraction(userId, id);
    } catch (err) {
      console.error('Failed to delete history item:', err);
    }
  };

  const handleReplayHistoryItem = (item: ChatInteraction) => {
    setMessages(prev => [
      ...prev,
      {
        id: 'hist_user_' + item.id,
        role: 'user',
        content: item.prompt,
        createdAt: item.createdAt
      },
      {
        id: 'hist_bot_' + item.id,
        role: 'assistant',
        content: item.response,
        createdAt: item.createdAt
      }
    ]);
    setActiveTab('chat');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg h-[90vh] max-h-[720px] bg-[var(--color-dark-bg)] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 bg-[var(--color-dark-surface)] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-md shadow-[var(--color-primary)]/20">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Gemini Assistant</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full">Online</span>
              </div>
              <p className="text-[11px] text-gray-400">Jakarta local guide & spot recommender</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 bg-[var(--color-dark-surface)]/50 px-4 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-2 transition border-b-2 ${
              activeTab === 'chat'
                ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            <MessageSquare size={14} />
            Chat Assistant
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-2 transition border-b-2 ${
              activeTab === 'history'
                ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            <Clock size={14} />
            Saved History ({history.length})
          </button>
          <div className="ml-auto flex items-center gap-1 text-[10px] text-gray-400 self-center pb-2">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>Private to you</span>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[var(--color-primary)]/80 to-[var(--color-secondary)]/80 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--color-primary)] text-white rounded-br-none shadow-md'
                        : 'bg-[var(--color-dark-surface)] text-gray-200 border border-white/5 rounded-bl-none prose prose-invert prose-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                    <div className="text-[9px] mt-1 opacity-60 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[var(--color-primary)]/80 to-[var(--color-secondary)]/80 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={14} className="text-white animate-spin" />
                  </div>
                  <div className="bg-[var(--color-dark-surface)] border border-white/5 p-3 rounded-2xl rounded-bl-none text-xs text-gray-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.4s]" />
                    <span>Gemini is finding the best spots...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-[var(--color-dark-surface)]/30">
                {[
                  'Best coffee in Blok M',
                  'Listening bar in SCBD',
                  'Quiet cafe to work in Senopati',
                  'Hidden gem dinner spots'
                ].map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sugg)}
                    className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition shrink-0 border border-white/5"
                  >
                    ✨ {sugg}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="p-3 bg-[var(--color-dark-surface)] border-t border-white/5">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Ask about places, coffee, food, vibe..."
                  disabled={loading}
                  className="flex-1 bg-[var(--color-dark-bg)] text-white text-sm px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[var(--color-primary)] transition placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!inputPrompt.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* History Tab */
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {history.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
                  <Clock size={20} />
                </div>
                <h4 className="text-sm font-bold text-gray-300">No Past Entries Yet</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Every question you ask Gemini and its recommendations are automatically saved to your private Firestore database history.
                </p>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="mt-2 text-xs text-[var(--color-primary)] font-semibold hover:underline"
                >
                  Start a conversation &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span>Your Saved Questions & Gemini Answers</span>
                  <span className="text-[10px] text-gray-500">Stored in Firestore</span>
                </div>

                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[var(--color-dark-surface)] border border-white/5 hover:border-white/15 transition space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                        <h4 className="text-sm font-semibold text-white leading-snug">{item.prompt}</h4>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleReplayHistoryItem(item)}
                          title="Open in Chat"
                          className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-[var(--color-primary)] transition"
                        >
                          <RotateCcw size={14} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteHistory(item.id, e)}
                          title="Delete from Firestore"
                          className="p-1 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-gray-300 line-clamp-3 bg-black/20 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                      {item.response}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-gray-500">
                      <span>{new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <button 
                        onClick={() => handleReplayHistoryItem(item)}
                        className="text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
                      >
                        View full reply <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
