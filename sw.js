const CACHE_NAME = 'todo-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Evento de instalación
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Archivos en caché');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('Error al cachear archivos:', err);
      })
  );
  // Forzar que el nuevo SW tome control inmediatamente
  self.skipWaiting();
});

// Evento de activación
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar control de todas las páginas inmediatamente
  return self.clients.claim();
});

// Evento de fetch (interceptar peticiones)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en caché, devuélvelo
        if (response) {
          return response;
        }
        // Si no, intenta descargarlo de la red
        return fetch(event.request)
          .then((response) => {
            // Si la respuesta no es válida, devuélvela sin cachear
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clona la respuesta
            const responseToCache = response.clone();
            // Guarda en caché
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            // Si falla la red, podrías devolver una página offline personalizada
            console.log('Sin conexión y no hay caché disponible');
          });
      })
  );
});


