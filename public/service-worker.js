// DeenSphereX Service Worker - PWA Support
const CACHE_VERSION = 'v5.9.0';
const CACHE_NAME = `deenspherex-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const AUDIO_CACHE = `audio-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const PRAYER_CACHE = `prayer-${CACHE_VERSION}`;

// Essential assets to precache on install
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Audio files to precache
const AUDIO_FILES = [
  '/azan1.mp3',
  '/alarm-clock-short-6402.mp3',
  '/99-names.mp3',
  '/hajj/talbiyah.mp3',
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[Service Worker] Precaching app shell');
        return cache.addAll(APP_SHELL.map(url => new Request(url, { cache: 'reload' })));
      }),
      caches.open(AUDIO_CACHE).then((cache) => {
        console.log('[Service Worker] Precaching audio files');
        return cache.addAll(AUDIO_FILES.map(url => new Request(url, { cache: 'reload' })));
      })
    ]).then(() => {
      console.log('[Service Worker] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.includes('deenspherex-') && cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE && cacheName !== AUDIO_CACHE &&
              cacheName !== API_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== PRAYER_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation complete');
      return self.clients.claim();
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
  let data = {};
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'DeenSphereX', body: event.data.text() };
    }
  }

  const title = data.title || 'DeenSphereX';
  const options = {
    body: data.body || 'New notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

// Message event - handle skipWaiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skip waiting requested');
    self.skipWaiting();
  }
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome extensions and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle audio files
  if (request.url.endsWith('.mp3')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Handle PDF books
  if (request.url.includes('/books/') && request.url.endsWith('.pdf')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Handle navigation requests (SPA routing) - Always return index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((cachedResponse) => {
        return cachedResponse || fetch('/index.html').then((response) => {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put('/index.html', responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // Handle same-origin assets - Cache-first for offline support
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          // Fetch update in background for next time
          fetch(request).then((networkResponse) => {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, networkResponse);
            });
          }).catch(() => {}); // Ignore network errors
          
          return cachedResponse;
        }
        
        // If not cached, fetch from network and cache
        return fetch(request).then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // Handle prayer times API
  if (request.url.includes('api.aladhan.com') && request.url.includes('timings')) {
    event.respondWith(
      fetch(request).then((response) => {
        const responseClone = response.clone();
        caches.open(PRAYER_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Handle Hadith APIs
  if (request.url.includes('hadithapi.com') || request.url.includes('api.sunnah.com')) {
    event.respondWith(
      fetch(request).then((response) => {
        const responseClone = response.clone();
        caches.open(API_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Handle other cross-origin API requests
  if (request.url.includes('api.') || request.url.includes('/api/')) {
    event.respondWith(
      fetch(request).then((response) => {
        const responseClone = response.clone();
        caches.open(API_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(request).then((response) => {
          return response || caches.match('/index.html');
        });
      })
    );
    return;
  }

  // Default: network first, fallback to cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

console.log('[Service Worker] Loaded successfully');
