import { MOCK_NEWS } from '../data';
import { Search } from 'lucide-react';

export default function NewsView({ navigateDetail }: { navigateDetail?: (type: string, id: string) => void }) {
  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="sticky top-0 z-30 pt-2 pb-4 bg-[var(--color-dark-bg)]/90 backdrop-blur-lg flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">The Feed</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <Search size={20} className="text-white" />
        </button>
      </header>

      <div className="space-y-6">
        {MOCK_NEWS.map((news) => (
          <div key={news.id} className="rounded-2xl border border-white/10 overflow-hidden bg-[var(--color-dark-surface)] shadow-lg cursor-pointer hover:border-white/20 transition" onClick={() => navigateDetail && navigateDetail('news', news.id)}>
            <div className="h-48 relative">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-surface)] to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className={`text-[10px] font-bold text-white px-2 py-1 rounded uppercase ${news.type === 'Deep Dive' ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'}`}>
                  {news.type}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 leading-tight">{news.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{news.summary}</p>
              <div className="text-xs text-gray-500 font-medium">
                {new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
