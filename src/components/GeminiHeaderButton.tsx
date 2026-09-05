import { Sparkles } from 'lucide-react';

interface GeminiHeaderButtonProps {
  onClick: () => void;
  variant?: 'pill' | 'icon';
}

export default function GeminiHeaderButton({ onClick, variant = 'pill' }: GeminiHeaderButtonProps) {
  if (variant === 'icon') {
    return (
      <button
        onClick={onClick}
        title="Ask Gemini Assistant"
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 hover:from-[var(--color-primary)]/30 hover:to-[var(--color-secondary)]/30 border border-[var(--color-primary)]/40 flex items-center justify-center text-white transition shadow-sm"
      >
        <Sparkles size={18} className="text-[var(--color-primary)] animate-pulse" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      title="Ask Gemini Assistant"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 hover:from-[var(--color-primary)]/30 hover:to-[var(--color-secondary)]/30 border border-[var(--color-primary)]/30 text-white text-xs font-semibold transition shadow-sm"
    >
      <Sparkles size={13} className="text-[var(--color-primary)]" />
      <span>Gemini</span>
    </button>
  );
}
