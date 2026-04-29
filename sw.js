const CACHE_NAME = 'nexus-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './1777394363882.png'
];

// Instalando o Service Worker e guardando arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Ativando e limpando caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Respondendo mesmo quando estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
