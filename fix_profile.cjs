const fs = require('fs');

let content = fs.readFileSync('src/views/ProfileView.tsx', 'utf-8');

// Header
content = content.replace(
  '<h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>',
  '<h1 className="text-2xl font-extrabold tracking-tight">Profile</h1>'
);

// User Info size
content = content.replace(
  '<div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-primary)]">',
  '<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-primary)]">'
);
content = content.replace(
  '<h2 className="text-2xl font-bold">{user.name}</h2>',
  '<h2 className="text-xl font-bold">{user.name}</h2>'
);
content = content.replace(
  '<p className="text-sm text-gray-400">{user.email}</p>',
  '<p className="text-xs text-gray-400">{user.email}</p>'
);

// Stats padding and text size
content = content.replace(
  '<div className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center">',
  '<div className="glass p-3 rounded-2xl flex flex-col items-center justify-center text-center">'
);
content = content.replace(
  '<div className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center">',
  '<div className="glass p-3 rounded-2xl flex flex-col items-center justify-center text-center">'
);
content = content.replace(
  '<span className="text-2xl font-bold">{user.loved_spots.length}</span>',
  '<span className="text-xl font-bold">{user.loved_spots.length}</span>'
);
content = content.replace(
  '<span className="text-2xl font-bold">{user.my_tips.length}</span>',
  '<span className="text-xl font-bold">{user.my_tips.length}</span>'
);
content = content.replace(
  '<span className="text-xs text-gray-400 uppercase tracking-wide">Loved Spots</span>',
  '<span className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Loved Spots</span>'
);
content = content.replace(
  '<span className="text-xs text-gray-400 uppercase tracking-wide">Insider Tips</span>',
  '<span className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Insider Tips</span>'
);

// Space-y-8 to Space-y-6
content = content.replace(
  '<div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">',
  '<div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">'
);

fs.writeFileSync('src/views/ProfileView.tsx', content, 'utf-8');
