import { ArrowLeft, BellRing, Calendar, MessageSquare, Tag, CircleCheck } from 'lucide-react';
import { useState } from 'react';

export default function NotificationSettingsView({ onBack }: { onBack: () => void }) {
  const [settings, setSettings] = useState({
    latestUpdates: true,
    eventReminders: true,
    newSpots: false,
    messages: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--color-dark-bg)]/80 backdrop-blur-xl border-b border-white/5 px-4 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Notifications</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-6 max-w-md mx-auto">
        <p className="text-gray-400 text-sm">Choose what you want to be notified about. We'll make sure not to spam you.</p>

        <div className="space-y-4">
          
          <div className="bg-[var(--color-dark-surface)] p-4 rounded-2xl border border-white/5 shadow-sm flex items-center justify-between cursor-pointer" onClick={() => toggleSetting('latestUpdates')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <BellRing size={20} />
              </div>
              <div>
                <h3 className="font-bold">Latest Updates</h3>
                <p className="text-xs text-gray-400 mt-1">Platform news and new features</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${settings.latestUpdates ? 'bg-[var(--color-primary)]' : 'bg-white/10'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.latestUpdates ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>

          <div className="bg-[var(--color-dark-surface)] p-4 rounded-2xl border border-white/5 shadow-sm flex items-center justify-between cursor-pointer" onClick={() => toggleSetting('eventReminders')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="font-bold">Event Reminders</h3>
                <p className="text-xs text-gray-400 mt-1">-1D notification for tickets & events</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${settings.eventReminders ? 'bg-[var(--color-primary)]' : 'bg-white/10'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.eventReminders ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>

          <div className="bg-[var(--color-dark-surface)] p-4 rounded-2xl border border-white/5 shadow-sm flex items-center justify-between cursor-pointer" onClick={() => toggleSetting('newSpots')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Tag size={20} />
              </div>
              <div>
                <h3 className="font-bold">New Spots</h3>
                <p className="text-xs text-gray-400 mt-1">When we add new curated locations</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${settings.newSpots ? 'bg-[var(--color-primary)]' : 'bg-white/10'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.newSpots ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>

          <div className="bg-[var(--color-dark-surface)] p-4 rounded-2xl border border-white/5 shadow-sm flex items-center justify-between cursor-pointer" onClick={() => toggleSetting('messages')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold">Direct Messages</h3>
                <p className="text-xs text-gray-400 mt-1">When curators reply to you</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${settings.messages ? 'bg-[var(--color-primary)]' : 'bg-white/10'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.messages ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
