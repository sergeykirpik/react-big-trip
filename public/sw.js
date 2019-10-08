const CACHE_NAME = `Big-Trip-Application-Cache`;

// install service worker
self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
          `/`,
          `css/style.css`,
          ...[
            `bus`,
            `check-in`,
            `drive`,
            `flight`,
            `restaurant`,
            `ship`,
            `sightseeing`,
            `taxi`,
            `train`,
            `transport`,
            `trip`
          ].map((name) => `img/icons/${name}.png`),
          ...[1, 2, 3, 4, 5].map((n) => `img/photos/${n}.jpg`),
          `img/header-bg.png`,
          `img/header-bg@2x.png`,
          `img/logo.png`,
          `bundle.js`,
          `index.html`,
        ]);
      })
  );
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.match(evt.request).then((response) => response || fetch(evt.request))
  );
});
