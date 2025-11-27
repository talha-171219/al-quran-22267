// DeenSphereX Service Worker - PWA Support
const CACHE_VERSION = 'v6.3.0';
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

// Install event - precache essential assets and clear old caches immediately
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    // First, clear ALL old caches to prevent stale chunk issues
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete all caches that don't match current version
          if (!cacheName.includes(CACHE_VERSION)) {
            console.log('[Service Worker] Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return caches.open(STATIC_CACHE);
    }).then((cache) => {
      console.log('[Service Worker] Precaching essential assets');
      const allAssets = [...new Set([...APP_SHELL, ...AUDIO_FILES])];
      return cache.addAll(allAssets.map(url => new Request(url, { cache: 'reload' })));
    }).then(() => {
      console.log('[Service Worker] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches aggressively
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete ANY cache that doesn't match current version
          if (!cacheName.includes(CACHE_VERSION)) {
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

// Message event - handle skipWaiting and cache clearing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skip waiting requested');
    self.skipWaiting();
  }
  
  // Allow clients to request full cache clear
  if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    console.log('[Service Worker] Clearing all caches...');
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    }).then(() => {
      event.ports[0]?.postMessage({ success: true });
    });
  }
});

// Helper function to check if response is valid for the request type
function isValidResponse(request, response) {
  if (!response || !response.ok) return false;
  
  const contentType = response.headers.get('content-type') || '';
  const url = request.url;
  
  // For JS files, ensure we got JavaScript, not HTML
  if (url.endsWith('.js') || url.includes('.js?')) {
    return contentType.includes('javascript') || contentType.includes('application/javascript');
  }
  
  // For CSS files, ensure we got CSS, not HTML
  if (url.endsWith('.css') || url.includes('.css?')) {
    return contentType.includes('text/css');
  }
  
  return true;
}

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome extensions and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle audio files - cache first
  if (request.url.endsWith('.mp3')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Handle PDF books - cache first
  if (request.url.includes('/books/') && request.url.endsWith('.pdf')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
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
      fetch('/index.html', { cache: 'no-cache' }).then((response) => {
        const responseClone = response.clone();
        caches.open(STATIC_CACHE).then((cache) => {
          cache.put('/index.html', responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match('/index.html');
      })
    );
    return;
  }

  // Handle JS/CSS bundles - CRITICAL: Network first with MIME type validation
  if (url.origin === location.origin && (request.url.endsWith('.js') || request.url.endsWith('.css'))) {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        // Validate that we got the correct MIME type
        if (isValidResponse(request, networkResponse)) {
          // Cache valid response
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return networkResponse;
        } else {
          // Got wrong MIME type (likely HTML from 404 redirect)
          // This means the chunk doesn't exist - app needs refresh
          console.warn('[Service Worker] MIME mismatch for:', request.url);
          
          // Try cache as fallback
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse && isValidResponse(request, cachedResponse)) {
              return cachedResponse;
            }
            
            // No valid cached version - notify client to reload
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => {
                client.postMessage({ 
                  type: 'CHUNK_LOAD_FAILED',
                  url: request.url 
                });
              });
            });
            
            // Return the network response anyway (will cause error, but triggers app reload logic)
            return networkResponse;
          });
        }
      }).catch(() => {
        // Network failed, try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return new Response('', { status: 503, statusText: 'Offline' });
        });
      })
    );
    return;
  }

  // Handle other same-origin assets (images, JSON, etc.)
  if (url.origin === location.origin) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Update cache in background when online
            fetch(request).then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
              }
            }).catch(() => {});
            
            return cachedResponse;
          }
          
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok && (
              request.url.includes('/assets/') ||
              request.url.endsWith('.json') ||
              request.url.endsWith('.png') ||
              request.url.endsWith('.jpg') ||
              request.url.endsWith('.svg') ||
              request.url.endsWith('.webp')
            )) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            return new Response('', { status: 503, statusText: 'Offline' });
          });
        });
      })
    );
    return;
  }

  // Handle prayer times API
  if (request.url.includes('api.aladhan.com') && request.url.includes('timings')) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(PRAYER_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
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
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
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

  // Handle other cross-origin API requests
  if (request.url.includes('api.') || request.url.includes('/api/') || 
      request.url.includes('nominatim.openstreetmap.org')) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
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

  // Default: network first, fallback to cache
  event.respondWith(
    fetch(request).then((response) => {
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
