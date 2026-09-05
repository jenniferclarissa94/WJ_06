import { useEffect, useState } from 'react';
import { MOCK_NEWS } from '../data';
import { ArrowLeft } from 'lucide-react';
import GeminiHeaderButton from '../components/GeminiHeaderButton';
import ImagePreviewModal from '../components/ImagePreviewModal';

export default function NewsDetailView({ 
  id, 
  onBack, 
  onNavigateToNews,
  onOpenGemini 
}: { 
  id: string, 
  onBack: () => void, 
  onNavigateToNews?: (id: string) => void,
  onOpenGemini?: (prompt?: string) => void 
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const news = MOCK_NEWS.find(n => n.id === id);
  const suggestedArticles = MOCK_NEWS.filter(n => n.id !== id);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  if (!news) return <div>Not found</div>;

  const articleImages = Array.from(new Set([
    news.image,
    ...(news.contentBlocks?.filter(b => b.type === 'image').map(b => b.content) || [])
  ])).filter(Boolean);

  const handleOpenPreview = (imgUrl: string) => {
    const idx = articleImages.indexOf(imgUrl);
    setPreviewIndex(idx !== -1 ? idx : 0);
  };

  return (
    <div className="pb-24 animate-in fade-in bg-[var(--color-dark-bg)] min-h-screen">
      <ImagePreviewModal
        images={articleImages}
        initialIndex={previewIndex ?? 0}
        isOpen={previewIndex !== null}
        onClose={() => setPreviewIndex(null)}
        title={news.title}
      />

      <header className="sticky top-0 z-30 pt-6 pb-4 px-4 bg-[var(--color-dark-bg)]/90 backdrop-blur-lg flex items-center justify-between border-b border-white/5">
        <div className="flex items-center">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition -ml-2 mr-2">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] shadow-sm ${news.type === 'Deep Dive' ? 'bg-[var(--color-secondary)] text-black' : 'bg-[var(--color-primary)] text-white'}`}>
            {news.type}
          </span>
        </div>
        {onOpenGemini && (
          <GeminiHeaderButton 
            onClick={() => onOpenGemini(`I'm reading "${news.title}". Can you give me more context, tips, or related spots in Jakarta?`)} 
          />
        )}
      </header>

      <div className="max-w-md mx-auto">
        <div className="px-6 py-6 space-y-3">
          <h1 className="text-2xl font-extrabold tracking-tight leading-tight">{news.title}</h1>
          <div className="text-xs text-gray-500 font-medium">
            Published {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <img 
          src={news.image} 
          alt={news.title} 
          onClick={() => handleOpenPreview(news.image)}
          className="w-full h-64 object-cover cursor-pointer hover:opacity-95 transition" 
        />

        <div className="px-6 py-8 space-y-4">
          <p className="text-base font-medium text-gray-200 leading-relaxed italic mb-6">
            {news.summary}
          </p>
          
          <div className="text-gray-300 text-sm leading-relaxed space-y-5">
            {news.contentBlocks ? (
              news.contentBlocks.map((block, i) => {
                if (block.type === 'heading') {
                  return <h3 key={i} className="text-lg font-bold text-white mt-6 mb-2">{block.content}</h3>;
                }
                if (block.type === 'image') {
                  return (
                    <img 
                      key={i} 
                      src={block.content} 
                      alt={`Content image ${i}`} 
                      onClick={() => handleOpenPreview(block.content)}
                      className="w-full h-48 object-cover rounded-xl my-4 border border-white/10 cursor-pointer hover:opacity-95 transition shadow-sm" 
                    />
                  );
                }
                return <p key={i}>{block.content}</p>;
              })
            ) : (
              <div className="whitespace-pre-wrap">{news.content}</div>
            )}
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-500 font-medium">
              Written by <span className="text-gray-300">{news.author || 'Anonymous'}</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Published on {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {suggestedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/5 -mx-6 px-6">
              <h2 className="text-xl font-bold mb-4">Read Next</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                {suggestedArticles.map(article => (
                  <div 
                    key={article.id} 
                    className="flex flex-col gap-3 cursor-pointer group bg-[var(--color-dark-surface)] p-3 rounded-2xl border border-white/5 shadow-sm hover:border-white/10 transition shrink-0 snap-start w-60"
                    onClick={() => onNavigateToNews && onNavigateToNews(article.id)}
                  >
                    <img src={article.image} alt={article.title} className="w-full h-32 object-cover rounded-xl shrink-0 group-hover:opacity-90 transition" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">{article.type}</span>
                      <h4 className="text-sm font-bold text-gray-200 leading-tight group-hover:text-white transition line-clamp-2">{article.title}</h4>
                      <p className="text-xs text-gray-500 mt-4 mt-auto">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
