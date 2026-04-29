const CACHE_NAME = 'nexus-v4';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './1777394363882.png'
];

// Instalação: Salva os arquivos essenciais no cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Intercepta os pedidos: Tenta o cache, se não tiver, vai na rede
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

