import { CURRENT_USER } from '../data';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { useState } from 'react';

export default function SettingsView({ onBack }: { onBack: () => void }) {
  const user = CURRENT_USER;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      <header className="sticky top-0 z-30 pt-6 pb-4 px-4 bg-[var(--color-dark-bg)]/90 backdrop-blur-lg flex items-center border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition -ml-2 mr-2">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-bold">Edit Profile</h1>
      </header>

      <div className="px-4 py-8 max-w-md mx-auto space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[var(--color-primary)]">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-1 right-1 w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-[var(--color-dark-bg)] shadow-md hover:scale-105 transition z-10">
              <Camera size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Display Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--color-dark-surface)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition"
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-green-500 text-white' : 'bg-[var(--color-primary)] text-black hover:scale-[0.98]'}`}
        >
          {saved ? (
            <><Check size={20} /> Saved Successfully</>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
}
