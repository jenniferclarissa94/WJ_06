import { MOCK_SPOTS } from '../data';
import { ArrowLeft, MapPin, Heart, Wifi, Volume2, Share2, PenLine, X, Link, Twitter, Facebook, ExternalLink, Camera } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import GeminiHeaderButton from '../components/GeminiHeaderButton';
import ImagePreviewModal from '../components/ImagePreviewModal';

export default function SpotDetailView({ 
  id, 
  onBack, 
  onRequireLogin,
  onOpenGemini 
}: { 
  id: string, 
  onBack: () => void, 
  onRequireLogin?: () => void,
  onOpenGemini?: (prompt?: string) => void 
}) {
  const spot = MOCK_SPOTS.find(s => s.id === id);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const defaultTips = [
    {
      name: 'Rara T.',
      avatar: '/assets/avatars/rara.jpg',
      fallbackAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      tip: "Don't come after 4 PM on a weekend, you won't get a seat."
    },
    {
      name: 'Bimo',
      avatar: '/assets/avatars/bimo.jpg',
      fallbackAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      tip: 'Their matcha latte is secretly the best item on the menu.'
    }
  ];

  const tips = (spot?.insider_tips && spot.insider_tips.length > 0) ? spot.insider_tips : defaultTips;

  if (!spot) return <div>Spot not found</div>;

  const galleryImages = Array.from(new Set([
    ...spot.images,
    ...(spot.ambiance_images || []),
    ...(spot.menu_recommendations?.map(m => m.image) || [])
  ])).filter(Boolean);

  const handleOpenPreview = (imgUrl: string) => {
    const idx = galleryImages.indexOf(imgUrl);
    setPreviewIndex(idx !== -1 ? idx : 0);
  };

  const handleShare = (type: string) => {
    if (type === 'link') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
    setShowShareMenu(false);
  };

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      <ImagePreviewModal
        images={galleryImages}
        initialIndex={previewIndex ?? 0}
        isOpen={previewIndex !== null}
        onClose={() => setPreviewIndex(null)}
        title={spot.name}
      />

      {showShareMenu && typeof document !== 'undefined' && createPortal(
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
        </div>,
        document.body
      )}

      <div className="relative h-72 w-full">
        <img 
          src={spot.images[0]} 
          alt={spot.name} 
          className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition" 
          onClick={() => handleOpenPreview(spot.images[0])}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-bg)] to-transparent pointer-events-none" />
        
        <button onClick={onBack} className="absolute top-6 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition z-10">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <button 
          onClick={() => handleOpenPreview(spot.images[0])} 
          className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold hover:bg-black/80 transition text-white cursor-pointer"
        >
          <Camera size={14} /> {galleryImages.length} Photos
        </button>
        <div className="absolute top-6 right-4 flex items-center gap-2 z-10">
          {onOpenGemini && (
            <GeminiHeaderButton 
              onClick={() => onOpenGemini(`Tell me more about ${spot.name} in ${spot.district}. What's the vibe, best menu items, and the crowd like?`)} 
            />
          )}
          <button onClick={() => setShowShareMenu(true)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition">
            <Share2 size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-10 space-y-6 max-w-md mx-auto">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-white bg-[var(--color-primary)] px-2.5 py-0.5 rounded-[4px] uppercase tracking-wider shadow-sm">
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

        {(galleryImages.length > 1) && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Ambiance & Gallery ({galleryImages.length})</h2>
              <button
                onClick={() => handleOpenPreview(galleryImages[0])}
                className="text-xs text-[var(--color-secondary)] hover:underline font-semibold"
              >
                View all
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
              {galleryImages.map((img, i) => (
                <div 
                  key={i} 
                  className="relative shrink-0 snap-start group cursor-pointer"
                  onClick={() => handleOpenPreview(img)}
                >
                  <img 
                    src={img} 
                    alt={`${spot.name} photo ${i + 1}`} 
                    referrerPolicy="no-referrer"
                    className="w-40 h-32 object-cover rounded-xl border border-white/5 shadow-sm group-hover:scale-[1.02] transition duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent rounded-xl transition" />
                </div>
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
                  <img 
                    src={menu.image} 
                    alt={menu.name} 
                    referrerPolicy="no-referrer" 
                    onClick={() => handleOpenPreview(menu.image)}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 cursor-pointer hover:opacity-90 transition" 
                  />
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
            <h2 className="text-lg font-bold">Insider Tips ({tips.length})</h2>
            <button onClick={onRequireLogin} className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/5 hover:bg-white/20 transition">
              <PenLine size={12} /> Write a tip
            </button>
          </div>
          <div className="space-y-3 mb-6">
            {tips.map((item, index) => (
              <div key={index} className="flex gap-3 bg-[var(--color-dark-surface)] p-3 rounded-xl border border-white/5 items-start">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (item.fallbackAvatar && e.currentTarget.src !== item.fallbackAvatar) {
                      e.currentTarget.src = item.fallbackAvatar;
                    } else {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=4D47D0&color=fff&size=128`;
                    }
                  }}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/10" 
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-100">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <h2 className="text-lg font-bold mb-3">Location</h2>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + spot.district + ' Jakarta')}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in Google Maps"
            className="block rounded-xl overflow-hidden h-36 mb-4 relative border border-white/10 shadow-sm group hover:border-[var(--color-primary)] transition-all cursor-pointer"
          >
            <img 
              src="/Screenshot%202026-09-04%20at%2002.23.25.png" 
              alt={`${spot.name} Google Maps Preview`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-[var(--color-primary)] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(77,71,208,0.7)] group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
              <span className="font-semibold text-white/90 drop-shadow-md flex items-center gap-1.5">
                <MapPin size={13} className="text-[var(--color-secondary)]" />
                {spot.district}
              </span>
              <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 group-hover:bg-[var(--color-primary)] transition-colors shadow">
                Open in Google Maps <ExternalLink size={11} />
              </span>
            </div>
          </a>
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat_long[0]},${spot.lat_long[1]}`}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center bg-[var(--color-primary)] text-white font-bold py-2.5 rounded-xl shadow-[0_0_15px_rgba(77,71,208,0.4)] hover:scale-[0.98] transition-transform"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
