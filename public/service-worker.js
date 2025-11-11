// A name for our app's cache
const CACHE_NAME = 'code-fun-v1';

// All the files your app needs to work offline
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/login.html',
  '/icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/login.html'
  // Add any other pages or images here
];

// 1. Install the service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Serve files from cache
// This lets the app load from the phone's storage (fast)
// instead of from the internet (slow)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we found it in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the internet
        return fetch(event.request);
      }
    )
  );
});