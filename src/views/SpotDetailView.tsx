import { MOCK_SPOTS } from '../data';
import { ArrowLeft, MapPin, Heart, Wifi, Volume2, Share2, PenLine, X, Link, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function SpotDetailView({ id, onBack, onRequireLogin }: { id: string, onBack: () => void, onRequireLogin?: () => void }) {
  const spot = MOCK_SPOTS.find(s => s.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!spot) return <div>Spot not found</div>;

  const handleShare = (type: string) => {
    if (type === 'link') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
    setShowShareMenu(false);
  };

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full hover:bg-white/20 transition">
            <X size={24} />
          </button>
          <img src={selectedImage} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
        </div>
      )}

      {showShareMenu && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in" onClick={() => setShowShareMenu(false)}>
          <div className="bg-[var(--color-dark-surface)] w-full sm:w-96 rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Share this spot</h3>
              <button onClick={() => setShowShareMenu(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => handleShare('link')} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition border border-white/5"><Link size={24} /></div>
                <span className="text-xs text-gray-300 font-medium">Copy Link</span>
              </button>
              <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center group-hover:bg-[#1DA1F2]/30 transition border border-[#1DA1F2]/20"><Twitter size={24} className="text-[#1DA1F2]" /></div>
                <span className="text-xs text-gray-300 font-medium">Twitter</span>
              </button>
              <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-[#4267B2]/20 flex items-center justify-center group-hover:bg-[#4267B2]/30 transition border border-[#4267B2]/20"><Facebook size={24} className="text-[#4267B2]" /></div>
                <span className="text-xs text-gray-300 font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative h-72 w-full">
        <img 
          src={spot.images[0]} 
          alt={spot.name} 
          className="w-full h-full object-cover cursor-pointer" 
          onClick={() => setSelectedImage(spot.images[0])}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-bg)] to-transparent pointer-events-none" />
        
        <button onClick={onBack} className="absolute top-6 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition z-10">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <button onClick={() => setShowShareMenu(true)} className="absolute top-6 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition z-10">
          <Share2 size={18} className="text-white" />
        </button>
      </div>

      <div className="px-4 -mt-8 relative z-10 space-y-6 max-w-md mx-auto">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded uppercase tracking-wide">
              {spot.category}
            </span>
            <button className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium">
              <Heart size={14} className="text-pink-500 fill-current" /> {spot.love_count}
            </button>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">{spot.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} className="text-[var(--color-primary)]" />
            {spot.district} • {spot.distance_km} km away
          </div>
        </div>

        <div className="flex gap-4 p-4 glass rounded-2xl border border-white/5 justify-between">
          <div className="flex flex-col items-center">
            <Wifi size={20} className={spot.wfc_score > 3 ? "text-[var(--color-primary)] mb-1" : "text-gray-500 mb-1"} />
            <span className="text-xs text-gray-400">WFC {spot.wfc_score}/5</span>
          </div>
          <div className="flex flex-col items-center">
            <Volume2 size={20} className={spot.noise_level === 'Loud' ? "text-[var(--color-secondary)] mb-1" : "text-gray-300 mb-1"} />
            <span className="text-xs text-gray-400">{spot.noise_level}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex tracking-tighter mb-1.5 text-lg leading-none">
              {[1, 2, 3].map((i) => (
                <span key={i} className={`font-bold ${i <= spot.price_level ? 'text-[var(--color-secondary)]' : 'text-gray-600'}`}>
                  $
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-400">Price</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Curator's Note</h2>
          <p className="text-gray-300 text-sm leading-relaxed p-4 bg-[var(--color-dark-surface)] rounded-2xl border border-white/5 shadow-inner">
            "{spot.curator_note}"
          </p>
        </div>

        {spot.images.length > 1 && (
          <div>
            <h2 className="text-lg font-bold mb-3">Ambiance & Details</h2>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
              {spot.images.slice(1).map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt={`${spot.name} detail ${i}`} 
                  onClick={() => setSelectedImage(img)}
                  className="w-40 h-32 object-cover rounded-xl shrink-0 snap-start border border-white/5 shadow-sm cursor-pointer" 
                />
              ))}
            </div>
          </div>
        )}

        {spot.menu_recommendations && spot.menu_recommendations.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3">Must Try</h2>
            <div className="space-y-3">
              {spot.menu_recommendations.map((menu, i) => (
                <div key={i} className="flex gap-3 bg-[var(--color-dark-surface)] p-2.5 rounded-xl border border-white/5 items-center shadow-sm">
                  <img src={menu.image} alt={menu.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-200">{menu.name}</h4>
                    <p className="text-sm text-[var(--color-secondary)] font-medium mt-0.5">{menu.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Insider Tips (2)</h2>
            <button onClick={onRequireLogin} className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/5 hover:bg-white/20 transition">
              <PenLine size={12} /> Write a tip
            </button>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 bg-[var(--color-dark-surface)] p-3 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0"></div>
              <div>
                <h4 className="text-sm font-bold">Rara T.</h4>
                <p className="text-xs text-gray-400 mt-1">Don't come after 4 PM on a weekend, you won't get a seat.</p>
              </div>
            </div>
            <div className="flex gap-3 bg-[var(--color-dark-surface)] p-3 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0"></div>
              <div>
                <h4 className="text-sm font-bold">Bimo</h4>
                <p className="text-xs text-gray-400 mt-1">Their matcha latte is secretly the best item on the menu.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <h2 className="text-lg font-bold mb-3">Location</h2>
          <div className="rounded-xl overflow-hidden h-32 mb-4 relative border border-white/10 shadow-sm">
            <img src="/Screenshot%202026-09-04%20at%2002.23.25.png" alt="Map Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-[var(--color-primary)] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(77,71,208,0.5)]">
                <MapPin size={20} />
              </div>
            </div>
          </div>
          <button className="w-full bg-[var(--color-primary)] text-white font-bold py-2.5 rounded-xl shadow-[0_0_15px_rgba(77,71,208,0.4)] hover:scale-[0.98] transition-transform">
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
}
