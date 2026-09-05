import { useState, useMemo } from 'react';
import { MOCK_NEWS } from '../data';
import { Search, ChevronDown, Loader2, X, CheckCircle2 } from 'lucide-react';
import GeminiHeaderButton from '../components/GeminiHeaderButton';

export default function NewsView({ 
  navigateDetail,
  onOpenGemini 
}: { 
  navigateDetail?: (type: string, id: string) => void,
  onOpenGemini?: () => void 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter news based on search input
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_NEWS;
    const q = searchQuery.toLowerCase();
    return MOCK_NEWS.filter(news => 
      news.title.toLowerCase().includes(q) ||
      news.summary.toLowerCase().includes(q) ||
      news.type.toLowerCase().includes(q) ||
      (news.author && news.author.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const displayedNews = useMemo(() => {
    return filteredNews.slice(0, visibleCount);
  }, [filteredNews, visibleCount]);

  const hasMore = visibleCount < filteredNews.length;

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    // Smooth micro-delay for satisfying tactile feedback
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoadingMore(false);
    }, 350);
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="sticky top-0 z-30 pt-2 pb-4 bg-[var(--color-dark-bg)]/90 backdrop-blur-lg flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">The Feed</h1>
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
              title="Search news"
            >
              {showSearch ? <X size={18} /> : <Search size={19} />}
            </button>
          </div>
        </div>

        <p className="text-[13.5px] sm:text-sm text-gray-300 font-normal leading-normal whitespace-nowrap overflow-hidden text-ellipsis">
          Jakarta’s curated culture & lifestyle dispatches
        </p>

        {/* Expandable search bar */}
        {showSearch && (
          <div className="relative animate-in fade-in duration-200 mt-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(3); // Reset visible count on new search
              }}
              placeholder="Search stories, topics, authors..."
              className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-primary)]/70 transition"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}
      </header>

      {/* Articles Feed */}
      <div className="space-y-6">
        {displayedNews.length > 0 ? (
          displayedNews.map((news) => (
            <div 
              key={news.id} 
              className="rounded-2xl border border-white/10 overflow-hidden bg-[var(--color-dark-surface)] shadow-lg cursor-pointer hover:border-white/20 transition group"
              onClick={() => navigateDetail && navigateDetail('news', news.id)}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-surface)] via-[var(--color-dark-surface)]/40 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] shadow-sm inline-block ${
                    news.type === 'Deep Dive' ? 'bg-[var(--color-secondary)] text-black' : 'bg-[var(--color-primary)] text-white'
                  }`}>
                    {news.type}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-gray-100 transition">{news.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{news.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-1 border-t border-white/5">
                  <span>{new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  {news.author && <span className="text-gray-400">By {news.author}</span>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-base font-semibold text-gray-300 mb-1">No articles found</p>
            <p className="text-xs text-gray-400">Try searching for other keywords like "coffee", "art", or "Blok M".</p>
          </div>
        )}
      </div>

      {/* See More Button / End of Feed indicator */}
      {filteredNews.length > 0 && (
        <div className="pt-2 pb-4 flex flex-col items-center">
          {hasMore ? (
            <div className="w-full flex flex-col items-center gap-2.5">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="w-full py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.99] border border-white/10 hover:border-white/20 text-white text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm group disabled:opacity-60 cursor-pointer"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[var(--color-primary)]" />
                    <span>Loading more content...</span>
                  </>
                ) : (
                  <>
                    <span>See More</span>
                    <ChevronDown size={16} className="text-gray-400 group-hover:translate-y-0.5 transition" />
                  </>
                )}
              </button>
              <span className="text-[11px] text-gray-400">
                Showing {displayedNews.length} of {filteredNews.length} stories
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-gray-400 py-3 px-4 rounded-full bg-white/[0.03] border border-white/5">
              <CheckCircle2 size={14} className="text-[var(--color-primary)]" />
              <span>You're all caught up on The Feed</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
