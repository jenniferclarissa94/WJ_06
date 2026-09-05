import { MOCK_SPOTS, CURRENT_USER } from '../data';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export default function MyTipsView({ onBack, navigateDetail }: { onBack: () => void, navigateDetail?: (type: string, id: string) => void }) {
  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      <div className="sticky top-0 z-30 bg-[var(--color-dark-bg)]/80 backdrop-blur-xl border-b border-white/5 px-4 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">My Tips</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {CURRENT_USER.my_tips.length === 0 ? (
          <p className="text-gray-400 text-center py-8">You haven't left any tips yet.</p>
        ) : (
          CURRENT_USER.my_tips.map((tip, idx) => {
            const spot = MOCK_SPOTS.find(s => s.id === tip.spot_id);
            if (!spot) return null;
            return (
              <div 
                key={idx}
                className="bg-[var(--color-dark-surface)] rounded-2xl border border-white/5 shadow-sm overflow-hidden p-4 space-y-3 cursor-pointer hover:border-white/20 transition"
                onClick={() => navigateDetail && navigateDetail('spot', spot.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{spot.name}</h3>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{tip.date}</p>
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 relative">
                  <MessageSquare size={14} className="text-gray-500 absolute top-3 right-3" />
                  <p className="text-sm text-gray-300 italic pr-6 leading-relaxed">
                    "{tip.text}"
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
