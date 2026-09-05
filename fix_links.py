import re
with open('src/views/ProfileView.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '''        <button onClick={() => navigateDetail && navigateDetail('notifications', 'me')} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/5">
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-pink-500" />
            <span className="font-medium">My Loved Spots</span>
          </div>
        </button>
        <button onClick={() => navigateDetail && navigateDetail('notifications', 'me')} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/5">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-gray-400" />
            <span className="font-medium">My Tips</span>
          </div>
        </button>''',
    '''        <button onClick={() => navigateDetail && navigateDetail('loved_spots', 'me')} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/5">
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-pink-500" />
            <span className="font-medium">My Loved Spots</span>
          </div>
        </button>
        <button onClick={() => navigateDetail && navigateDetail('my_tips', 'me')} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface-2)] transition border border-white/5">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-gray-400" />
            <span className="font-medium">My Tips</span>
          </div>
        </button>'''
)

with open('src/views/ProfileView.tsx', 'w') as f:
    f.write(content)
