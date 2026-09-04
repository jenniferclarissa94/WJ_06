import { useState } from 'react';
import { MOCK_SPOTS, Spot } from '../data';
import { MapPin, Heart, Wifi, Volume2, DollarSign, Filter } from 'lucide-react';

export default function CulinaryView({ navigateDetail }: { navigateDetail?: (type: string, id: string) => void }) {
  const [filter, setFilter] = useState<'Near Me' | 'WFC Friendly' | 'Late Night'>('Near Me');

  const filteredSpots = MOCK_SPOTS.filter(spot => {
    if (filter === 'WFC Friendly') return spot.tags?.includes('wfc') || spot.wfc_score >= 4;
    if (filter === 'Late Night') return spot.tags?.includes('late-night');
    return true; // Near me includes all
  }).sort((a, b) => {
    if (filter === 'Near Me') return (a.distance_km || 0) - (b.distance_km || 0);
    return 0; // retain default order for others, or sort by distance anyway
  });

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="sticky top-0 z-30 pt-2 pb-4 bg-[var(--color-dark-bg)]/90 backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Culinary</h1>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition">
            <MapPin size={20} className="text-white" />
          </a>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button className="shrink-0 flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-medium transition">
            <Filter size={14} /> Filter
          </button>
          <button 
            onClick={() => setFilter('Near Me')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition ${filter === 'Near Me' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(77,71,208,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
          >
            Near Me
          </button>
          <button 
            onClick={() => setFilter('WFC Friendly')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${filter === 'WFC Friendly' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(77,71,208,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
          >
            WFC Friendly
          </button>
          <button 
            onClick={() => setFilter('Late Night')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${filter === 'Late Night' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(77,71,208,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
          >
            Late Night
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {filteredSpots.map((spot) => (
          <div key={spot.id} className="group relative glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer hover:border-white/20 transition" onClick={() => navigateDetail && navigateDetail('spot', spot.id)}>
            {/* Image Header */}
            <div className="relative h-48 w-full">
              <img 
                src={spot.images[0]} 
                alt={spot.name} 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-surface)] to-transparent" />
              
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Heart size={16} className="text-pink-500 fill-current" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded-sm uppercase tracking-wide">
                    {spot.category}
                  </span>
                  <h3 className="text-xl font-bold mt-1 leading-tight">{spot.name}</h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-white bg-white/10 backdrop-blur px-2 py-1 rounded flex items-center gap-1">
                    <MapPin size={12} className="text-[var(--color-primary)]" />
                    {spot.distance_km} km
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-[var(--color-dark-surface)]/80">
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                <span className="font-bold text-white">Curator's Note:</span> {spot.curator_note}
              </p>

              {/* Vibe Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1.5 rounded border border-white/5">
                  <Wifi size={14} className={spot.wfc_score > 3 ? "text-green-400" : "text-gray-500"} />
                  <span className="text-xs font-medium text-gray-300">WFC: {spot.wfc_score}/5</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1.5 rounded border border-white/5">
                  <Volume2 size={14} className={spot.noise_level === 'Loud' ? "text-red-400" : "text-gray-300"} />
                  <span className="text-xs font-medium text-gray-300">{spot.noise_level}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1.5 rounded border border-white/5">
                  <div className="flex tracking-tighter text-sm leading-none mt-0.5">
                    {[1, 2, 3].map((i) => (
                      <span key={i} className={`font-bold ${i <= (spot.price_level || 2) ? 'text-[var(--color-secondary)]' : 'text-gray-600'}`}>
                        $
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
