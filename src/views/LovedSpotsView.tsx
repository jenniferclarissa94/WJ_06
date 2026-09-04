import { MOCK_SPOTS, CURRENT_USER } from '../data';
import { ArrowLeft, Heart, MapPin, Wifi, Volume2 } from 'lucide-react';

export default function LovedSpotsView({ onBack, navigateDetail }: { onBack: () => void, navigateDetail?: (type: string, id: string) => void }) {
  const lovedSpots = MOCK_SPOTS.filter(spot => CURRENT_USER.loved_spots.includes(spot.id));

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      <div className="sticky top-0 z-30 bg-[var(--color-dark-bg)]/80 backdrop-blur-xl border-b border-white/5 px-4 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">My Loved Spots</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {lovedSpots.length === 0 ? (
          <p className="text-gray-400 text-center py-8">You haven't loved any spots yet.</p>
        ) : (
          lovedSpots.map(spot => (
            <div 
              key={spot.id} 
              onClick={() => navigateDetail && navigateDetail('spot', spot.id)}
              className="bg-[var(--color-dark-surface)] rounded-2xl border border-white/5 shadow-sm overflow-hidden cursor-pointer hover:border-white/20 transition group"
            >
              <div className="h-32 w-full relative">
                <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md rounded-full p-1.5 border border-white/10">
                  <Heart size={16} className="text-pink-500 fill-current" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{spot.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                  <MapPin size={12} /> {spot.district}
                </div>
                <div className="flex gap-4 mt-3 text-xs font-bold text-gray-300">
                  <div className="flex items-center gap-1"><Wifi size={14} className="text-[var(--color-primary)]" /> {spot.wfc_score}/5</div>
                  <div className="flex items-center gap-1"><Volume2 size={14} className="text-[var(--color-primary)]" /> {spot.noise_level}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
