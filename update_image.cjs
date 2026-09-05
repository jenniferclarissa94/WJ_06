const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf-8');
content = content.replace(
    "'https://drive.google.com/uc?export=download&id=1pMckvHr5DtXEIXatJT1HGnto5fQcpHNt'",
    "'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'"
);
fs.writeFileSync('src/data.ts', content, 'utf-8');
