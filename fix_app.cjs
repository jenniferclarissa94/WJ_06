const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add imports
if (!code.includes('LovedSpotsView')) {
    code = code.replace("import SettingsView from './views/SettingsView';", "import SettingsView from './views/SettingsView';\nimport LovedSpotsView from './views/LovedSpotsView';\nimport MyTipsView from './views/MyTipsView';");
}

// Add to switch cases
if (!code.includes("case 'loved_spots':")) {
    let target = "case 'settings': return <SettingsView onBack={() => setDetailView(null)} />;";
    let replacement = target + "\n        case 'loved_spots': return <LovedSpotsView onBack={() => setDetailView(null)} navigateDetail={(type, id) => setDetailView({type, id})} />;\n        case 'my_tips': return <MyTipsView onBack={() => setDetailView(null)} navigateDetail={(type, id) => setDetailView({type, id})} />;";
    code = code.replace(target, replacement);
}

fs.writeFileSync('src/App.tsx', code, 'utf8');
