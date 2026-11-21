const CACHE = 'feliphe-ana-9-meses-v1';
const BASE = new URL('./', self.location.href);
const ESSENCIAIS = [
  './', './index.html', './style.css', './script.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './imagens/foto1.jpeg', './imagens/foto2.jpeg', './imagens/foto3.jpeg', './imagens/foto4.jpeg'
].map(url => new URL(url, BASE).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ESSENCIAIS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  // Áudio com pedidos parciais (Range) deve passar direto à rede; evita falhas no player.
  if (request.headers.has('range') || /\.mp3(?:$|\?)/i.test(request.url)) return;
  event.respondWith(caches.match(request).then(cached => {
    const atualizar = fetch(request).then(response => {
      if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); }
      return response;
    }).catch(() => cached || Response.error());
    return cached || atualizar;
  }));
});
