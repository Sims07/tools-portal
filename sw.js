// Boîte à outils — Architecture Solutions — Service Worker
// Vitrine statique : mise en cache de la coquille de l'application pour accès hors-ligne.

const CACHE_VERSION = 'v9';
const CACHE_NAME = `boite-a-outils-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Navigation Preload : la requête réseau démarre en parallèle du réveil du SW.
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('boite-a-outils-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

// Ne met en cache que les réponses valides (ok) ou opaques (ex. Google Fonts).
function isCacheable(response) {
  return response && (response.ok || response.type === 'opaque');
}

function putInCache(request, response) {
  if (!isCacheable(response)) return;
  const copy = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
}

// Stale-while-revalidate : réponse immédiate depuis le cache, mise à jour en arrière-plan.
function staleWhileRevalidate(event) {
  const { request } = event;
  return caches.match(request).then((cached) => {
    const network = fetch(request)
      .then((response) => {
        putInCache(request, response);
        return response;
      })
      .catch(() => cached);
    if (cached) {
      event.waitUntil(network.catch(() => {}));
      return cached;
    }
    return network;
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // Navigation : réseau d'abord, puis index.html en cache, puis page hors-ligne.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloaded = await event.preloadResponse;
          const response = preloaded || await fetch(request);
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy)).catch(() => {});
          }
          return response;
        } catch (err) {
          const cachedPage = await caches.match('./index.html');
          return cachedPage || caches.match('./offline.html');
        }
      })()
    );
    return;
  }

  // Ressources de la même origine et ressources tierces (polices) : SWR.
  if (isSameOrigin || url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // Autres origines : on laisse passer sans interférer.
});
