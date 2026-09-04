import { MOCK_SPOTS, MOCK_EVENTS, MOCK_NEWS } from '../data';
import { MapPin, Calendar, Heart, ArrowRight, Search, History } from 'lucide-react';
import { useState } from 'react';

export default function HomeView({ navigate, navigateDetail }: { navigate: (tab: string) => void, navigateDetail?: (type: string, id: string) => void }) {
  const trendingSpots = [MOCK_SPOTS[4], MOCK_SPOTS[3], MOCK_SPOTS[1]]; // Little Salt Pan, Zodiac, 7 Speed Coffee
  const upcomingEvents = MOCK_EVENTS;
  const topNews = MOCK_NEWS[0]; // Quick Hits

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imgError, setImgError] = useState(false);
  
  const searchHistory = ['Kopi Tuku', 'Senopati late night', 'Art Jakarta', 'WFC near me'];

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {!imgError ? (
              <img 
                src="/white%20ver@3x.png" 
                alt="Wassup Jakarta Logo" 
                className="h-8 object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="text-2xl font-extrabold tracking-tight">Wassup <span className="text-gradient">Jakarta</span></div>
            )}
          </div>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)} 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSearchOpen ? 'bg-[var(--color-primary)] text-white' : 'bg-white/5 border border-white/10 text-[var(--color-tertiary)] hover:bg-white/10'}`}
          >
            <Search size={20} />
          </button>
        </div>

        {isSearchOpen && (
          <div className="absolute top-14 left-0 right-0 z-50 bg-[var(--color-dark-surface)] border border-white/10 rounded-2xl p-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center bg-white/5 rounded-xl px-3 py-2 mb-4 border border-white/10">
              <Search size={16} className="text-gray-400 mr-2" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search spots, events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Recent Searches</h4>
              <div className="space-y-1">
                {searchHistory.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300 hover:text-[var(--color-tertiary)] hover:bg-white/5 p-2 rounded-lg cursor-pointer transition">
                    <History size={14} className="text-gray-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 mb-6">
          <h1 className="text-xl font-medium text-gray-300 mb-1">Wassup, Andi! 👋</h1>
          <h2 className="text-2xl font-extrabold tracking-tight leading-tight">Ready to uncover <span className="text-gradient">Jakarta's</span> best spots today?</h2>
        </div>
      </header>

      {/* Trending Spot */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Trending Near You</h2>
          <button onClick={() => navigate('culinary')} className="text-sm text-gray-400 flex items-center hover:text-white transition">
            See all <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
          {trendingSpots.map(spot => (
            <div key={spot.id} className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer snap-start min-w-[280px] shrink-0 shadow-lg" onClick={() => navigateDetail && navigateDetail('spot', spot.id)}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <img 
                src={spot.images[0]} 
                alt={spot.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80'; }}
              />
              
              <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                <Heart size={14} className="text-pink-500 fill-current" />
                <span className="text-xs font-semibold">{spot.love_count}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[var(--color-primary)] px-2 py-1 rounded shadow-sm">
                    {spot.category}
                  </span>
                  <span className="text-xs font-medium text-gray-300 flex items-center">
                    <MapPin size={12} className="mr-1" /> {spot.distance_km} km
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1 leading-tight line-clamp-1">{spot.name}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{spot.curator_note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Event */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">This Weekend</h2>
          <button onClick={() => navigate('events')} className="text-sm text-gray-400 flex items-center hover:text-white transition">
            See all <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
          {upcomingEvents.map(event => (
            <div key={event.id} className="snap-start glass rounded-2xl p-2 flex flex-col gap-2 border border-white/5 cursor-pointer hover:border-white/20 transition min-w-[220px] max-w-[220px] shrink-0 bg-[var(--color-dark-surface)]/50" onClick={() => navigateDetail && navigateDetail('event', event.id)}>
              <div className="w-full h-28 rounded-xl overflow-hidden shrink-0 relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80'; }}
                />
                <div className="absolute top-2 right-2">
                   <span className="text-[10px] font-bold text-black bg-[var(--color-secondary)] px-2 py-1 rounded w-fit uppercase mb-1 inline-block shadow-sm">
                     {event.type}
                   </span>
                </div>
              </div>
              <div className="px-1 pb-1">
                <h4 className="font-bold text-sm leading-tight mb-1 line-clamp-1">{event.title}</h4>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} className="text-[var(--color-tertiary)]" /> {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Quick Hit */}
      <section>
        <h2 className="text-xl font-bold mb-4">Insider Tips</h2>
        <div className="rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition bg-[var(--color-dark-surface)] shadow-lg" onClick={() => navigateDetail && navigateDetail('news', topNews.id)}>
          <div className="h-32 relative">
            <img src={topNews.image} alt={topNews.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold text-white bg-[var(--color-primary)] px-2 py-1 rounded uppercase shadow-sm">
                {topNews.type}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-lg mb-2">{topNews.title}</h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">{topNews.summary}</p>
            <div className="text-xs font-bold text-[var(--color-tertiary)] flex items-center">
              Read full guide <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
