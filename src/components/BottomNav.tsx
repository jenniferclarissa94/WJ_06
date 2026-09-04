import { Home, Coffee, Calendar, Newspaper, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'culinary', label: 'Spots', icon: Coffee },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 pb-safe">
      <div className="flex justify-around items-center h-16 md:h-20 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors"
            >
              <Icon 
                size={22} 
                className={isActive ? 'text-[var(--color-primary)]' : 'text-gray-500'} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
