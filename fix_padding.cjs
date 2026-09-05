const fs = require('fs');

let content = fs.readFileSync('src/views/NewsDetailView.tsx', 'utf-8');

// replace <div className="px-4 py-6 space-y-3">
content = content.replace('<div className="px-4 py-6 space-y-3">', '<div className="px-6 py-6 space-y-3">');

// replace <div className="px-4 py-8 space-y-4">
content = content.replace('<div className="px-4 py-8 space-y-4">', '<div className="px-6 py-8 space-y-4">');

// replace <div className="mt-12 pt-8 border-t border-white/5 -mx-4 px-4">
content = content.replace('<div className="mt-12 pt-8 border-t border-white/5 -mx-4 px-4">', '<div className="mt-12 pt-8 border-t border-white/5 -mx-6 px-6">');

fs.writeFileSync('src/views/NewsDetailView.tsx', content, 'utf-8');
