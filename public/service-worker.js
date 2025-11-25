// DeenSphereX Service Worker - PWA Support
const CACHE_VERSION = 'v6.1.0';
const CACHE_NAME = `deenspherex-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const AUDIO_CACHE = `audio-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const PRAYER_CACHE = `prayer-${CACHE_VERSION}`;

// Workbox will inject the precache manifest here
const PRECACHE_MANIFEST = self.__WB_MANIFEST || [];

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
      // Precache Workbox manifest
      PRECACHE_MANIFEST.length > 0 && caches.open(STATIC_CACHE).then((cache) => {
        console.log('[Service Worker] Precaching Workbox manifest');
        return cache.addAll(PRECACHE_MANIFEST.map(entry => entry.url || entry));
      }),
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

  // Handle same-origin assets with cache-first strategy for full offline support
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version and update in background
          fetch(request).then((networkResponse) => {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, networkResponse.clone());
            });
          }).catch(() => {}); // Ignore network errors when cached version exists
          
          return cachedResponse;
        }
        
        // Not cached, try network
        return fetch(request).then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return networkResponse;
        }).catch(() => {
          // Network failed and no cache, return offline page for navigation
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          // For other requests, return nothing (will fail gracefully)
          return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
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
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || new Response(JSON.stringify({ error: 'Offline' }), { 
            status: 503, 
            headers: { 'Content-Type': 'application/json' }
          });
        });
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
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || new Response(JSON.stringify({ error: 'Offline' }), { 
            status: 503, 
            headers: { 'Content-Type': 'application/json' }
          });
        });
      })
    );
    return;
  }

  // Handle other cross-origin API requests (including Nominatim)
  if (request.url.includes('api.') || request.url.includes('/api/') || 
      request.url.includes('nominatim.openstreetmap.org')) {
    event.respondWith(
      fetch(request).then((response) => {
        const responseClone = response.clone();
        caches.open(API_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || new Response(JSON.stringify({ error: 'Offline' }), { 
            status: 503, 
            headers: { 'Content-Type': 'application/json' }
          });
        });
      })
    );
    return;
  }

  // Default: network first, fallback to cache or offline response
  event.respondWith(
    fetch(request).then((response) => {
      // Cache successful responses
      if (response.ok) {
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(request).then((cachedResponse) => {
        return cachedResponse || new Response('Offline', { 
          status: 503, 
          statusText: 'Service Unavailable' 
        });
      });
    })
  );
});

console.log('[Service Worker] Loaded successfully');
