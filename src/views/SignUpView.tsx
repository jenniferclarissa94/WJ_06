import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function SignUpView({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 pt-6 pb-4 px-4 flex items-center">
        <button onClick={step === 2 ? () => setStep(1) : onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
      </header>

      <div className="px-6 py-8 max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-6">
            <img src="/white ver@3x.png" alt="Wassup Jakarta Logo" className="h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-3">
            {step === 1 ? 'Create Account' : 'Verify Phone'}
          </h1>
          <p className="text-gray-400 leading-relaxed text-sm">
            {step === 1 
              ? 'Join the club to share insider tips and save your favorite spots.' 
              : `Enter the 6-digit verification code sent to ${phone || 'your phone number'}.`
            }
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Phone Number</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 812-3456-7890" 
                className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] transition"
              />
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-[var(--color-primary)] text-white font-bold py-3.5 mt-2 rounded-xl shadow-[0_0_15px_rgba(77,71,208,0.4)] hover:scale-[0.98] transition-transform"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Verification Code</label>
              <input 
                type="text" 
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000" 
                className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-[var(--color-primary)] transition"
              />
            </div>
            <button 
              onClick={() => onBack()}
              className="w-full bg-[var(--color-primary)] text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(77,71,208,0.4)] hover:scale-[0.98] transition-transform"
            >
              Verify & Complete
            </button>
            <p className="text-sm text-gray-500">
              Didn't receive it? <button className="text-[var(--color-primary)] font-bold hover:underline">Resend Code</button>
            </p>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
