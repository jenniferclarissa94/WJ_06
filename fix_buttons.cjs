const fs = require('fs');
let code = fs.readFileSync('src/views/ProfileView.tsx', 'utf8');

// Find all matches for the button that navigates to notifications
let matches = [];
let regex = /onClick=\{\(\) => navigateDetail \&\& navigateDetail\('notifications', 'me'\)\}/g;
let m;
while ((m = regex.exec(code)) !== null) {
    matches.push(m);
}

if (matches.length >= 3) {
    let start2 = matches[1].index;
    code = code.substring(0, start2) + "onClick={() => navigateDetail && navigateDetail('loved_spots', 'me')}" + code.substring(start2 + matches[1][0].length);
    
    // Now re-run regex to find the updated positions
    matches = [];
    regex = /onClick=\{\(\) => navigateDetail \&\& navigateDetail\('notifications', 'me'\)\}/g;
    while ((m = regex.exec(code)) !== null) {
        matches.push(m);
    }
    
    if (matches.length >= 2) {
        let start3 = matches[1].index; // The previous 3rd is now the 2nd
        code = code.substring(0, start3) + "onClick={() => navigateDetail && navigateDetail('my_tips', 'me')}" + code.substring(start3 + matches[1][0].length);
    }
}

fs.writeFileSync('src/views/ProfileView.tsx', code, 'utf8');
