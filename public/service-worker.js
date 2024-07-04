// Nome do cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Arquivos a serem armazenados em cache
const urlsToCache = [
  '/',
  '/index.html',
  // Adicione aqui outros arquivos que deseja armazenar em cache
];

// Evento 'install'
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'activate'
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento 'fetch'
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Forçar atualização imediata do Service Worker
self.addEventListener('controllerchange', () => {
  if (self.skipWaiting) {
    self.skipWaiting();
  }
});