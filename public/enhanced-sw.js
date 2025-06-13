
const CACHE_NAME = 'bukbuk-enhanced-v3';
const urlsToCache = [
  '/',
  '/enhanced-bukbuk.html',
  '/enhanced-styles.css',
  '/enhanced-script.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://smtpjs.com/v3/smtp.js'
];

// Install event
self.addEventListener('install', function(event) {
  console.log('Enhanced Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error('Cache add failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', function(event) {
  console.log('Enhanced Service Worker activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event with enhanced caching strategy
self.addEventListener('fetch', function(event) {
  // Skip cross-origin requests except for allowed domains
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://smtpjs.com') &&
      !event.request.url.startsWith('https://api.openai.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version if available
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }

        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(function(response) {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response because it's a stream
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              // Only cache GET requests
              if (event.request.method === 'GET') {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        }).catch(function(error) {
          console.error('Fetch failed:', error);
          
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/enhanced-bukbuk.html');
          }
          
          // For other requests, return a basic response
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      }
    )
  );
});

// Background sync for offline orders
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Sync offline orders when connection is restored
  console.log('Performing background sync...');
  
  // Check for pending orders in IndexedDB/localStorage
  return new Promise((resolve) => {
    // This would sync any offline orders or data
    console.log('Background sync completed');
    resolve();
  });
}

// Enhanced push notifications
self.addEventListener('push', function(event) {
  console.log('Push message received');
  
  let options = {
    body: 'New update from BukBuk!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Order',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192.png'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }

  event.waitUntil(
    self.registration.showNotification('BukBuk - Fresh Meat Delivery', options)
  );
});

// Enhanced notification click handling
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/enhanced-bukbuk.html')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/enhanced-bukbuk.html')
    );
  }
});

// Message handling for communication with the main thread
self.addEventListener('message', function(event) {
  console.log('SW received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Enhanced error handling
self.addEventListener('error', function(event) {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', function(event) {
  console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('Enhanced Service Worker v3 loaded successfully');
