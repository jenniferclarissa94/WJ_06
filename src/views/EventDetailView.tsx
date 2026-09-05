import { MOCK_EVENTS } from '../data';
import { ArrowLeft, Calendar, MapPin, Ticket, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import GeminiHeaderButton from '../components/GeminiHeaderButton';
import ImagePreviewModal from '../components/ImagePreviewModal';

export default function EventDetailView({ 
  id, 
  onBack,
  onOpenGemini 
}: { 
  id: string, 
  onBack: () => void,
  onOpenGemini?: (prompt?: string) => void 
}) {
  const evt = MOCK_EVENTS.find(e => e.id === id);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  if (!evt) return <div>Not found</div>;

  const galleryImages = Array.from(new Set([
    evt.image,
    ...(evt.additional_images || []),
    ...(evt.concert_map ? [evt.concert_map] : [])
  ])).filter(Boolean);

  const handleOpenPreview = (imgUrl: string) => {
    const idx = galleryImages.indexOf(imgUrl);
    setPreviewIndex(idx !== -1 ? idx : 0);
  };

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      <ImagePreviewModal
        images={galleryImages}
        initialIndex={previewIndex ?? 0}
        isOpen={previewIndex !== null}
        onClose={() => setPreviewIndex(null)}
        title={evt.title}
      />

      <div className="relative h-72 w-full">
        <img 
          src={evt.image} 
          alt={evt.title} 
          className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition"
          onClick={() => handleOpenPreview(evt.image)}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-bg)] to-transparent pointer-events-none" />
        
        <button onClick={onBack} className="absolute top-6 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition z-10">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="absolute top-6 right-4 z-10">
          {onOpenGemini && (
            <GeminiHeaderButton 
              onClick={() => onOpenGemini(`Tell me more about the event "${evt.title}" at ${evt.venue_name}. What should I expect, how is parking/transit, and what spots are nearby?`)} 
            />
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] font-bold uppercase tracking-wider text-black bg-[var(--color-secondary)] px-2 py-0.5 rounded-[4px] shadow-sm inline-block">
            {evt.type}
          </span>
        </div>
      </div>

      <div className="px-4 mt-2 relative z-10 space-y-6 max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight">{evt.title}</h1>
        
        <div className="space-y-4 p-5 glass rounded-2xl border border-white/5">
          <div className="flex items-start gap-3 text-sm text-gray-200">
            <Calendar size={20} className="shrink-0 text-[var(--color-primary)]" />
            <div>
              <div className="font-bold">Date & Time</div>
              <div className="text-gray-400 mt-0.5">{new Date(evt.start_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-200">
            <MapPin size={20} className="shrink-0 text-[var(--color-primary)]" />
            <div>
              <div className="font-bold">Location</div>
              <div className="text-gray-400 mt-0.5">{evt.venue_name}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-200">
            <Ticket size={20} className="shrink-0 text-[var(--color-primary)]" />
            <div>
              <div className="font-bold">Admission</div>
              <div className="text-gray-400 mt-0.5">{evt.price_display}</div>
            </div>
          </div>
        </div>

        {evt.additional_images && evt.additional_images.length > 0 && (
          <div className="pt-2">
            <h2 className="text-xl font-bold mb-3">Event Gallery</h2>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
              {evt.additional_images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt={`${evt.title} gallery ${i}`} 
                  onClick={() => handleOpenPreview(img)}
                  className="w-56 h-40 object-cover rounded-xl shrink-0 snap-start border border-white/5 shadow-sm cursor-pointer hover:opacity-90 transition" 
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-3">About this event</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {evt.description}
          </p>
        </div>

        {evt.ticket_prices && evt.ticket_prices.length > 0 && (
          <div className="pt-2">
            <h2 className="text-xl font-bold mb-3">Tickets</h2>
            <div className="space-y-3">
              {evt.ticket_prices.map((ticket, i) => (
                <div key={i} className="flex items-center justify-between bg-[var(--color-dark-surface)] p-3 rounded-xl border border-white/5 shadow-sm">
                  <div>
                    <h4 className="text-sm font-bold text-gray-200">{ticket.category}</h4>
                    <p className="text-xs text-[var(--color-primary)] font-medium mt-0.5">{ticket.price}</p>
                  </div>
                  <div className="shrink-0">
                    {ticket.available ? (
                      <span className="text-[10px] uppercase font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">Available</span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">Sold Out</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {evt.concert_map && (
          <div className="pt-2">
            <h2 className="text-xl font-bold mb-3">Event Map</h2>
            <div 
              className="rounded-xl overflow-hidden h-48 mb-4 border border-white/10 shadow-sm relative group cursor-pointer"
              onClick={() => handleOpenPreview(evt.concert_map!)}
            >
              <img src={evt.concert_map} alt={`${evt.title} Map`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <h2 className="text-xl font-bold mb-3">Location</h2>
          <a 
            href={evt.map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.venue_name + ' Jakarta')}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in Google Maps"
            className="block rounded-xl overflow-hidden h-36 mb-2 relative border border-white/10 shadow-sm group hover:border-[var(--color-primary)] transition-all cursor-pointer"
          >
            <img 
              src="/Screenshot%202026-09-04%20at%2002.23.25.png" 
              alt={`${evt.venue_name} Google Maps Preview`} 
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
                {evt.venue_name}
              </span>
              <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 group-hover:bg-[var(--color-primary)] transition-colors shadow">
                Open in Google Maps <ExternalLink size={11} />
              </span>
            </div>
          </a>
        </div>
        
        <div className="flex gap-3 pt-2">
          <a href={evt.ticket_url} target="_blank" rel="noreferrer" className="flex-1 bg-[var(--color-primary)] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
            Get Tickets <ExternalLink size={16} />
          </a>
          <a href={evt.map_url} target="_blank" rel="noreferrer" className="w-14 h-[52px] rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition text-white">
            <MapPin size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
