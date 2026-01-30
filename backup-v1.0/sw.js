const CACHE_NAME = 'libertad-2026-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'data/data.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - devolver respuesta del cache
        if (response) {
          return response;
        }
        
        // Clonar la petición
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Verificar si recibimos una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar la respuesta
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Manejar notificaciones push
self.addEventListener('push', event => {
  console.log('[SW] Push recibido');
  
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  
  const title = data.title || 'Sistema Libertad 2026';
  const options = {
    body: data.body || '¡Tienes una nueva actualización!',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver ahora',
        icon: 'icon-192.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: 'icon-192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', event => {
  console.log('[SW] Click en notificación');
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('index.html')
    );
  }
});

// Sincronización en background
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
      console.log('[SW] Datos sincronizados:', data);
      return data;
    })
    .catch(error => {
      console.error('[SW] Error sincronizando:', error);
    });
}
