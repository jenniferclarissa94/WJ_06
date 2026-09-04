import { CURRENT_USER } from '../data';
import { Heart, MessageSquare, Settings, Bell, LogOut, Camera, ChevronRight } from 'lucide-react';

export default function ProfileView({ navigateDetail }: { navigateDetail?: (type: string, id: string) => void }) {
  const user = CURRENT_USER;

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Profile</h1>
        <button onClick={() => navigateDetail && navigateDetail('settings', 'me')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <Settings size={20} className="text-white" />
        </button>
      </header>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-primary)]">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-3 rounded-2xl flex flex-col items-center justify-center text-center">
          <Heart size={24} className="text-pink-500 mb-2" />
          <span className="text-xl font-bold">{user.loved_spots.length}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Loved Spots</span>
        </div>
        <div className="glass p-3 rounded-2xl flex flex-col items-center justify-center text-center">
          <MessageSquare size={24} className="text-[var(--color-primary)] mb-2" />
          <span className="text-xl font-bold">{user.my_tips.length}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Insider Tips</span>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 px-2">Account</h3>
        
        <button onClick={() => navigateDetail && navigateDetail('notifications', 'me')} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/5">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-gray-400" />
            <span className="text-sm font-medium">Notifications</span>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </button>

        <button onClick={() => navigateDetail && navigateDetail('loved_spots', 'me')} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/5">
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-pink-500" />
            <span className="text-sm font-medium">My Loved Spots</span>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </button>

        <button onClick={() => navigateDetail && navigateDetail('my_tips', 'me')} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/5">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-gray-400" />
            <span className="text-sm font-medium">My Tips</span>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="pt-4">
        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition border border-red-500/20 text-sm font-medium">
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
}
