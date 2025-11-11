const CACHE_VERSION = Date.now();
const CACHE_NAME = `al-quran-v${CACHE_VERSION}`;

// Separate cache buckets for different content types
const STATIC_CACHE = 'al-quran-static-v2'; // PDFs, images that never change
const AUDIO_CACHE = 'al-quran-audio-v2'; // MP3 files
const API_CACHE = 'al-quran-api-v2'; // Quran API data
const DYNAMIC_CACHE = `al-quran-dynamic-v${CACHE_VERSION}`; // App shell, JS, CSS
const PRAYER_CACHE = 'al-quran-prayer-v1'; // Prayer times cache

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-192.jpg',
  '/icon-512.jpg'
];

const AUDIO_FILES = [
  '/azan1.mp3',
  '/alarm-clock-short-6402.mp3'
];

// Install service worker and precache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(DYNAMIC_CACHE).then((cache) => cache.addAll(APP_SHELL)),
      caches.open(AUDIO_CACHE).then((cache) => cache.addAll(AUDIO_FILES))
    ])
  );
  // Don't skip waiting - let the new SW wait until user updates
});

// Handle push notifications for prayer times
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'নামাজের সময় হয়ে গেছে',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      data: data.data || {},
      requireInteraction: true,
    };
    event.waitUntil(
      self.registration.showNotification(data.title || 'নামাজের সময়', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Listen for skip waiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Activate and remove old caches (only dynamic cache, keep static content)
self.addEventListener('activate', (event) => {
  const keepCaches = [STATIC_CACHE, AUDIO_CACHE, API_CACHE, DYNAMIC_CACHE, PRAYER_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          // Only delete old dynamic caches, keep static/user content caches
          if (!keepCaches.includes(name) && name.startsWith('al-quran-dynamic-')) {
            console.log('🗑️ Deleting old dynamic cache:', name);
            return caches.delete(name);
          }
          return null;
        })
      )
    )
  );
  console.log('✅ Service Worker activated - offline mode ready');
  self.clients.claim();
});

// Fetch handler with robust offline strategy
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET
  if (req.method !== 'GET') return;

  // Cache audio files (adhan & alarm) in separate cache
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(AUDIO_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // Cache PDFs and static books permanently
  if (url.pathname.includes('/books/') && url.pathname.endsWith('.pdf')) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // Navigate requests: network-first, fallback to cached app shell
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put('/index.html', copy));
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(DYNAMIC_CACHE);
          return cache.match('/index.html');
        })
    );
    return;
  }

  // Same-origin assets: cache-first (JS, CSS, images)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => cache.put(req, copy));
            }
            return res;
          })
          .catch(() => caches.match('/index.html'));
      })
    );
    return;
  }

  // Prayer times API: cache for 24 hours, network-first
  if (url.hostname === 'api.aladhan.com') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(PRAYER_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          // Fallback to cached prayer times if offline
          return caches.match(req).then((cached) => {
            if (cached) {
              console.log('📱 Using cached prayer times (offline mode)');
              return cached;
            }
            return new Response(JSON.stringify({ error: 'Offline - prayer times not cached' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // Hadith APIs: cache permanently, network-first
  if (url.hostname.includes('github') && url.pathname.includes('hadith-api')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(API_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Other cross-origin requests (Quran APIs): network-first with separate API cache
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        // Cache API responses separately so they persist across updates
        caches.open(API_CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => {
        return caches.match(req).then((cached) => {
          if (cached) {
            console.log('📖 Using cached content (offline mode)');
            return cached;
          }
          // Return offline page if nothing cached
          return caches.match('/index.html');
        });
      })
  );
});
