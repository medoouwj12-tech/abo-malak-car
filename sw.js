const CACHE_NAME = 'abu-malik-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/fleet-group.jpg',
  '/images/hummer-wedding.jpg',
  '/images/hyundai-elantra-red.jpg',
  '/images/hyundai-elantra-wedding.jpg',
  '/images/hyundai-sonata-black.jpg',
  '/images/hyundai-tucson-new.jpg',
  '/images/hyundai-tucson-wedding.jpg',
  '/images/kia-sportage-wedding.jpg',
  '/images/neta-x-wedding.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
