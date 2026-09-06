import { useState } from 'react';
import { MOCK_EVENTS } from '../data';
import { MapPin, Calendar, ExternalLink, Ticket, Search, X } from 'lucide-react';
import GeminiHeaderButton from '../components/GeminiHeaderButton';

export default function EventsView({ 
  navigateDetail,
  onOpenGemini 
}: { 
  navigateDetail?: (type: string, id: string) => void,
  onOpenGemini?: () => void 
}) {
  const [activeTab, setActiveTab] = useState<'All' | 'Concert' | 'Exhibition' | 'Festival'>('All');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = MOCK_EVENTS.filter(evt => {
    const matchesTab = activeTab === 'All' || evt.type === activeTab;
    if (!matchesTab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      evt.title.toLowerCase().includes(q) ||
      evt.venue_name.toLowerCase().includes(q) ||
      (evt.description && evt.description.toLowerCase().includes(q)) ||
      evt.type.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="sticky top-0 z-30 pt-2 pb-4 bg-[var(--color-dark-bg)]/90 backdrop-blur-lg flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">Events</h1>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenGemini && <GeminiHeaderButton onClick={onOpenGemini} />}
            <button 
              onClick={() => {
                setShowSearch(!showSearch);
                if (showSearch) setSearchQuery('');
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${
                showSearch ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
              title="Search events"
            >
              {showSearch ? <X size={18} /> : <Search size={19} />}
            </button>
          </div>
        </div>

        {/* Expandable search bar */}
        {showSearch && (
          <div className="relative animate-in fade-in duration-200 mt-1 mb-2">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concerts, exhibitions, venues..."
              className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-primary)]/70 transition"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button 
            onClick={() => setActiveTab('All')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition ${activeTab === 'All' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(77,71,208,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('Concert')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition ${activeTab === 'Concert' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(77,71,208,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
          >
            Concerts
          </button>
          <button 
            onClick={() => setActiveTab('Exhibition')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition ${activeTab === 'Exhibition' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(77,71,208,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
          >
            Exhibitions
          </button>
          <button 
            onClick={() => setActiveTab('Festival')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition ${activeTab === 'Festival' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(77,71,208,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
          >
            Festivals
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((evt) => (
          <div key={evt.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[var(--color-dark-surface)] shadow-lg cursor-pointer hover:border-white/20 transition" onClick={() => navigateDetail && navigateDetail('event', evt.id)}>
            <div className="h-40 relative">
              <img 
                src={evt.image} 
                alt={evt.title} 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80'; }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-3 left-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-black bg-[var(--color-secondary)] px-2 py-0.5 rounded-[4px] shadow-sm inline-block">
                  {evt.type}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-3">{evt.title}</h3>
              
              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <Calendar size={16} className="shrink-0 mt-0.5 text-[var(--color-primary)]" />
                  <span>{new Date(evt.start_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-[var(--color-primary)]" />
                  <span>{evt.venue_name}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <Ticket size={16} className="shrink-0 mt-0.5 text-[var(--color-primary)]" />
                  <span>{evt.price_display}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a href={evt.ticket_url} target="_blank" rel="noreferrer" className="flex-1 bg-white text-black py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-gray-200 transition" onClick={(e) => e.stopPropagation()}>
                  Get Tickets <ExternalLink size={16} />
                </a>
                <a href={evt.map_url} target="_blank" rel="noreferrer" className="w-12 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition text-white" onClick={(e) => e.stopPropagation()}>
                  <MapPin size={18} />
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16 px-4 bg-white/5 border border-white/10 rounded-2xl">
          <Calendar size={36} className="mx-auto text-gray-500 mb-3" />
          <p className="text-base font-semibold text-gray-300 mb-1">No events found</p>
          <p className="text-xs text-gray-500">Try adjusting your search query or category filters.</p>
        </div>
      )}
      </div>
    </div>
  );
}
