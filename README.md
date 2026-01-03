YouTube Gaming Channel Hub

A dark-themed, responsive website for gaming YouTube creators.

Files:
- index.html — main landing page with hero, video embeds, playlists, and social links
- styles.css — dark theme with neon accents and responsive layout
- script.js — interactions for subscribe button, mobile menu, and analytics tracking

Quick Start

1. Open locally in browser:
```powershell
Start-Process 'c:\Users\91908\Downloads\HTML PROJECTS\gaming-website\index.html'
```

2. Customize for your channel:
   - Replace "Your Gaming Channel" with your actual channel name (multiple places)
   - Replace YouTube channel links: search/replace `@yourchannel` with your handle
   - Replace video IDs: in the three `<iframe src>` elements with your video IDs
   - Update stats: subscriber count, video count, total views
   - Add your channel avatar (replace `.channel-avatar` with an `<img>` tag)
   - Replace Twitch, Discord, Twitter links with your social handles

3. Customize sections:
   - Video titles and view counts in the "Latest Videos" section
   - Playlist names and video counts in the "Playlists" section
   - Social links to your platforms

Video ID Example:
For a YouTube URL like `https://www.youtube.com/watch?v=9bZkp7q19f0`,
use this in the iframe: `src="https://www.youtube.com/embed/9bZkp7q19f0"`

Deploy Options:
- GitHub Pages (free static hosting)
- Netlify (https://netlify.com)
- Vercel (https://vercel.com)
- Your own web server

Features:
✓ Dark gaming aesthetic with neon accents
✓ Responsive design (mobile, tablet, desktop)
✓ YouTube embed player for latest videos
✓ Playlists showcase
✓ Social media links
✓ Subscribe button with tracking
✓ Optimized performance

Next Steps:
- Host on GitHub Pages or Netlify for free
- Link from your YouTube channel bio
- Add Google Analytics for tracking (optional)
- Create additional pages (about, contact, merch, etc.)
