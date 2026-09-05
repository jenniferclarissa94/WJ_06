const fs = require('fs');

// Update HomeView.tsx
let homeContent = fs.readFileSync('src/views/HomeView.tsx', 'utf-8');

const getGreetingFunc = `
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
`;

if (!homeContent.includes('const getGreeting = () =>')) {
    homeContent = homeContent.replace(
        "export default function HomeView({ navigate, navigateDetail }: { navigate: (tab: string) => void, navigateDetail?: (type: string, id: string) => void }) {",
        "export default function HomeView({ navigate, navigateDetail }: { navigate: (tab: string) => void, navigateDetail?: (type: string, id: string) => void }) {" + getGreetingFunc
    );
}

homeContent = homeContent.replace(
    '<h1 className="text-xl font-medium text-gray-300 mb-1">Wassup, Andi! 👋</h1>',
    '<h1 className="text-xl font-medium text-gray-300 mb-1">{getGreeting()} 👋</h1>'
);
fs.writeFileSync('src/views/HomeView.tsx', homeContent, 'utf-8');

// Update ProfileView.tsx
let profileContent = fs.readFileSync('src/views/ProfileView.tsx', 'utf-8');
const loggedOutProfile = `
import { Settings, LogIn, UserPlus } from 'lucide-react';

export default function ProfileView({ navigateDetail }: { navigateDetail?: (type: string, id: string) => void }) {
  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Profile</h1>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition opacity-50 cursor-not-allowed">
          <Settings size={20} className="text-white" />
        </button>
      </header>

      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
          <Settings size={32} className="text-gray-500" />
        </div>
        <h2 className="text-xl font-bold">Welcome to Wassup Jakarta</h2>
        <p className="text-sm text-gray-400 max-w-[250px] leading-relaxed">
          Log in to save your favorite spots, create insider tips, and customize your experience.
        </p>
      </div>

      <div className="space-y-3 pt-4">
        <button onClick={() => navigateDetail && navigateDetail('login', '')} className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition font-bold shadow-lg">
          <LogIn size={18} />
          Log In
        </button>
        <button onClick={() => navigateDetail && navigateDetail('signup', '')} className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/10 font-bold">
          <UserPlus size={18} className="text-[var(--color-primary)]" />
          Create Account
        </button>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/views/ProfileView.tsx', loggedOutProfile, 'utf-8');

