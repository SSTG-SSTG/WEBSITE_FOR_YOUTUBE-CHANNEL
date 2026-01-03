// YouTube Gaming Channel interactions
// Configuration: if you have a YouTube Data API key and your channel ID, paste them here.
// To get a channel ID: open your channel page and find the `UC...` id, or use the YouTube API.
const YT_CONFIG = {
  apiKey: '', // <- paste your API key here
  channelId: '' // SSTG Gaming channel ID
};

document.addEventListener('DOMContentLoaded', () => {
  // set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click', ()=>{
      if(nav.style.display === 'flex'){
        nav.style.display = '';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.background = 'rgba(255,255,255,0.02)';
        nav.style.padding = '12px';
        nav.style.borderRadius = '8px';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
      }
    });
  }

  // subscribe button tracking (opens your channel)
  const subscribeBtn = document.getElementById('subscribeBtn');
  if(subscribeBtn){
    subscribeBtn.addEventListener('click', ()=>{
      console.log('Subscribe button clicked - tracking event');
      const originalText = subscribeBtn.textContent;
      subscribeBtn.textContent = '✓ Redirecting...';
      setTimeout(()=>{
        window.open('https://youtube.com/@sstgsstg-mk5mp', '_blank');
        subscribeBtn.textContent = originalText;
      }, 800);
    });
  }

  // fetch and show latest upload if config provided
  const latestIframe = document.getElementById('latestUpload');
  const latestTitle = document.getElementById('latestTitle');
  const latestMeta = document.getElementById('latestMeta');
  if(YT_CONFIG.apiKey && YT_CONFIG.channelId && latestIframe){
    fetchLatestVideo(YT_CONFIG.apiKey, YT_CONFIG.channelId).then(info=>{
      if(info && info.videoId){
        latestIframe.src = `https://www.youtube.com/embed/${info.videoId}`;
        if(latestTitle) latestTitle.textContent = info.title || 'Latest upload';
        if(latestMeta) latestMeta.textContent = `${info.viewCount || ''} · ${info.publishedAtText || ''}`;
      } else {
        if(latestMeta) latestMeta.textContent = 'Could not fetch latest video. Check API key/channel ID.';
      }
    }).catch(err=>{
      console.error('Error fetching latest video', err);
      if(latestMeta) latestMeta.textContent = 'Error fetching latest video (see console).';
    });
  } else {
    if(latestMeta) latestMeta.textContent = 'Auto-fetch disabled. Add your API key and channel ID to script.js to enable.';
  }

  // video cards keyboard support
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card=>{
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){
        card.querySelector('iframe')?.click();
      }
    });
  });

  // playlist card interactions
  const playlistCards = document.querySelectorAll('.playlist-card');
  playlistCards.forEach(card=>{
    card.addEventListener('click', ()=>{
      console.log('Playlist clicked - would navigate to playlist');
      // In production, link to playlist URL
    });
  });

  // animate channel stats on load
  const stats = document.querySelectorAll('.channel-stats strong');
  stats.forEach((stat, idx)=>{
    stat.style.animation = `slideUp 0.6s ease forwards`;
    stat.style.animationDelay = `${idx * 0.1}s`;
  });
});

// Simple CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// End of file additions

/**
 * Note: To enable automatic fetching of the most-recent upload, open `script.js` and set
 * `YT_CONFIG.apiKey` and `YT_CONFIG.channelId` with your YouTube Data API key and channel ID.
 * Example channelId starts with "UC". If you need help getting these, I can walk you through it.
 */

// --- Admin UI: load/save API key and channel ID to localStorage and wire modal ---
// Override config from localStorage if present
try{
  const savedKey = localStorage.getItem('yt_api_key');
  const savedChannel = localStorage.getItem('yt_channel_id');
  if(savedKey) YT_CONFIG.apiKey = savedKey;
  if(savedChannel) YT_CONFIG.channelId = savedChannel;
}catch(e){
  console.warn('LocalStorage not available', e);
}

// Admin modal handlers
document.addEventListener('DOMContentLoaded', ()=>{
  const adminToggle = document.getElementById('adminToggle');
  const adminModal = document.getElementById('adminModal');
  const adminClose = document.getElementById('adminClose');
  const adminSave = document.getElementById('adminSave');
  const adminClear = document.getElementById('adminClear');
  const adminApiKey = document.getElementById('adminApiKey');
  const adminChannelId = document.getElementById('adminChannelId');
  const adminMsg = document.getElementById('adminMsg');

  function openAdmin(){
    if(!adminModal) return;
    adminModal.setAttribute('aria-hidden','false');
    if(adminApiKey) adminApiKey.value = YT_CONFIG.apiKey || '';
    if(adminChannelId) adminChannelId.value = YT_CONFIG.channelId || '';
    if(adminMsg) adminMsg.textContent = '';
  }
  function closeAdmin(){
    if(!adminModal) return;
    adminModal.setAttribute('aria-hidden','true');
  }

  adminToggle?.addEventListener('click', (e)=>{ e.preventDefault(); openAdmin(); });
  adminClose?.addEventListener('click', ()=> closeAdmin());

  adminSave?.addEventListener('click', ()=>{
    const key = adminApiKey?.value?.trim() || '';
    const ch = adminChannelId?.value?.trim() || '';
    if(!key || !ch){
      if(adminMsg) adminMsg.textContent = 'Both API key and Channel ID are required.';
      return;
    }
    try{
      localStorage.setItem('yt_api_key', key);
      localStorage.setItem('yt_channel_id', ch);
      YT_CONFIG.apiKey = key;
      YT_CONFIG.channelId = ch;
      if(adminMsg) adminMsg.textContent = 'Saved — fetching latest video...';
      // attempt immediate fetch
      const latestIframe = document.getElementById('latestUpload');
      const latestTitle = document.getElementById('latestTitle');
      const latestMeta = document.getElementById('latestMeta');
      if(latestIframe){
        fetchLatestVideo(key, ch).then(info=>{
          if(info && info.videoId){
            latestIframe.src = `https://www.youtube.com/embed/${info.videoId}`;
            if(latestTitle) latestTitle.textContent = info.title || 'Latest upload';
            if(latestMeta) latestMeta.textContent = `${info.viewCount || ''} · ${info.publishedAtText || ''}`;
            if(adminMsg) adminMsg.textContent = 'Latest video loaded.';
          } else {
            if(adminMsg) adminMsg.textContent = 'Saved but could not find latest video.';
          }
        }).catch(err=>{
          console.error(err);
          if(adminMsg) adminMsg.textContent = 'Saved but error fetching latest video (see console).';
        });
      }
    }catch(e){
      if(adminMsg) adminMsg.textContent = 'Could not save settings (storage error).';
    }
  });

  adminClear?.addEventListener('click', ()=>{
    try{
      localStorage.removeItem('yt_api_key');
      localStorage.removeItem('yt_channel_id');
      YT_CONFIG.apiKey = '';
      // keep channel id in file as fallback
      if(adminMsg) adminMsg.textContent = 'Cleared from localStorage.';
      if(adminApiKey) adminApiKey.value = '';
    }catch(e){
      if(adminMsg) adminMsg.textContent = 'Could not clear storage.';
    }
  });

  // Close modal when clicking outside content
  adminModal?.addEventListener('click', (e)=>{
    if(e.target === adminModal) closeAdmin();
  });
});
