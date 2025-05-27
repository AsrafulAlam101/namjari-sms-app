self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('namjari-app-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './history.html',
        './style.css',
        './script.js',
        './history.js',
        './manifest.json',
        './icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
