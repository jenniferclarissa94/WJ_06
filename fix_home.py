import re

with open('src/views/HomeView.tsx', 'r') as f:
    content = f.read()

target = """      {/* News Quick Hit */}
      <section>
        <h2 className="text-xl font-bold mb-4">Insider Tips</h2>
        <div className="space-y-4">
          {insiderTips.map(news => (
            <div key={news.id} className="rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition bg-[var(--color-dark-surface)] shadow-lg" onClick={() => navigateDetail && navigateDetail('news', news.id)}>
              <div className="h-32 relative">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold text-white bg-[var(--color-primary)] px-2 py-1 rounded uppercase shadow-sm">
                    {news.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-2">{news.title}</h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">{news.summary}</p>
                <div className="text-xs font-bold text-[var(--color-tertiary)] flex items-center">
                  Read full guide <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>"""

replacement = """      {/* News Quick Hit */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Insider Tips</h2>
        </div>
        <div className="space-y-4">
          {insiderTips.map((news, index) => {
            if (index === 0) {
              return (
                <div key={news.id} className="rounded-2xl border border-white/5 overflow-hidden cursor-pointer hover:border-white/20 transition bg-[var(--color-dark-surface)] shadow-xl group" onClick={() => navigateDetail && navigateDetail('news', news.id)}>
                  <div className="h-44 relative">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-surface)] via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold text-black bg-[var(--color-secondary)] px-2.5 py-1 rounded-sm uppercase tracking-wide shadow-lg">
                        {news.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h4 className="font-bold text-2xl mb-1 leading-tight">{news.title}</h4>
                    </div>
                  </div>
                  <div className="p-4 pt-1">
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{news.summary}</p>
                  </div>
                </div>
              );
            }
            
            return (
              <div key={news.id} className="flex gap-4 items-center bg-[var(--color-dark-surface)]/40 p-3 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 hover:border-white/10 transition group" onClick={() => navigateDetail && navigateDetail('news', news.id)}>
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative border border-white/10">
                   <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[9px] font-bold text-[var(--color-primary)] uppercase tracking-widest mb-1 block">
                    {news.type}
                  </span>
                  <h4 className="font-bold text-sm leading-snug mb-1 line-clamp-2">{news.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-1">{news.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/HomeView.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced content.")
else:
    print("Could not find exact string, trying regex...")
    # Just in case there are whitespace differences
    # Let's do a more robust approach if needed, but since we just read it exactly as written, it should work.

