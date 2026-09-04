import { MOCK_EVENTS } from '../data';
import { ArrowLeft, Calendar, MapPin, Ticket, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

export default function EventDetailView({ id, onBack }: { id: string, onBack: () => void }) {
  const evt = MOCK_EVENTS.find(e => e.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!evt) return <div>Not found</div>;

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

      <div className="relative h-72 w-full">
        <img 
          src={evt.image} 
          alt={evt.title} 
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setSelectedImage(evt.image)}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-bg)] to-transparent pointer-events-none" />
        
        <button onClick={onBack} className="absolute top-6 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition z-10">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-bold text-black bg-[var(--color-secondary)] px-2 py-1 rounded uppercase">
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
                  onClick={() => setSelectedImage(img)}
                  className="w-56 h-40 object-cover rounded-xl shrink-0 snap-start border border-white/5 shadow-sm cursor-pointer" 
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
            <div className="rounded-xl overflow-hidden h-48 mb-4 border border-white/10 shadow-sm relative group">
              <img src={evt.concert_map} alt={`${evt.title} Map`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        )}
        
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
