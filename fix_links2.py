import re
with open('src/views/ProfileView.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    ">My Loved Spots<", ">My Loved Spots TEMP<"
).replace(
    "navigateDetail('notifications', 'me')", "navigateDetail('loved_spots', 'me')", 1
).replace(
    ">My Loved Spots TEMP<", ">My Loved Spots<"
)

# wait there are 3 instances of navigateDetail('notifications', 'me')
# first is Notifications, second is My Loved Spots, third is My Tips
matches = [m.start() for m in re.finditer(r"navigateDetail\('notifications', 'me'\)", content)]
if len(matches) == 3:
    content = content[:matches[1]] + "navigateDetail('loved_spots', 'me')" + content[matches[1]+len("navigateDetail('notifications', 'me')"):]
    matches = [m.start() for m in re.finditer(r"navigateDetail\('notifications', 'me'\)", content)]
    content = content[:matches[1]] + "navigateDetail('my_tips', 'me')" + content[matches[1]+len("navigateDetail('notifications', 'me')"):]
    with open('src/views/ProfileView.tsx', 'w') as f:
        f.write(content)
