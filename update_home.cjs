const fs = require('fs');

let content = fs.readFileSync('src/views/HomeView.tsx', 'utf-8');

// Replace topNews declaration
content = content.replace(
    "const topNews = MOCK_NEWS[0]; // Quick Hits",
    "const insiderTips = MOCK_NEWS.slice(0, 3); // Top 3 Insider Tips"
);

const targetBlock = `      {/* News Quick Hit */}
      <section>
        <h2 className="text-xl font-bold mb-4">Insider Tips</h2>
        <div className="rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition bg-[var(--color-dark-surface)] shadow-lg" onClick={() => navigateDetail && navigateDetail('news', topNews.id)}>
          <div className="h-32 relative">
            <img src={topNews.image} alt={topNews.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold text-white bg-[var(--color-primary)] px-2 py-1 rounded uppercase shadow-sm">
                {topNews.type}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-lg mb-2">{topNews.title}</h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">{topNews.summary}</p>
            <div className="text-xs font-bold text-[var(--color-tertiary)] flex items-center">
              Read full guide <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </section>`;

const newBlock = `      {/* News Quick Hit */}
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
      </section>`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, newBlock);
} else {
    console.log("Could not find the target block to replace.");
}

fs.writeFileSync('src/views/HomeView.tsx', content, 'utf-8');
