import { ArrowLeft } from 'lucide-react';

export default function LoginView({ onBack, onNavigateToSignUp }: { onBack: () => void, onNavigateToSignUp?: () => void }) {
  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 pt-6 pb-4 px-4 flex items-center">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
      </header>

      <div className="px-6 py-8 max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-6">
            <img src="/assets/WJWhite.png" alt="Wassup Jakarta Logo" className="h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-3">Join the Club</h1>
          <p className="text-gray-400 leading-relaxed text-sm">
            Sign in or create an account to share your own insider tips, save your favorite spots, and get exclusive access.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] transition"
            />
          </div>
          <button className="w-full bg-[var(--color-primary)] text-white font-bold py-3.5 mt-2 rounded-xl shadow-[0_0_15px_rgba(77,71,208,0.4)] hover:scale-[0.98] transition-transform">
            Continue
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <button onClick={onNavigateToSignUp} className="text-[var(--color-primary)] font-bold hover:underline">
            Sign up
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
