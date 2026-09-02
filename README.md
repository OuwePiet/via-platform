cd via-platform
git remote set-url origin https://github.com/OuwePiet/via-platform.git
git add .
git commit -m "VIA platform: feed, mint, marketplace, login, OG"
git pull origin main --allow-unrelated-histories
# los eventuele README-conflict op, behoud onze bestanden
git push -u origin main
