// Nombre de la caché (cámbialo cuando hagas cambios grandes)
const CACHE_NAME = "gelm-pmt-2026-v2";

// Archivos que se cachean para trabajar offline
const OFFLINE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",                // si no usas app.js aún, no pasa nada
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./agen2026.html"          // si todavía no existe, puedes quitarla o dejarla preparada
];

// INSTALACIÓN: guardar archivos en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

// ACTIVACIÓN: limpiar cachés viejas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH: estrategia cache-first con fallback a red
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Sólo manejar peticiones GET
  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          // Guardar en caché lo nuevo
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Si falla la red y no hay caché, puedes devolver algo opcional
          if (request.mode === "navigate") {
            // Podrías devolver una página offline personalizada aquí
            return caches.match("./index.html");
          }
        });
    })
  );
});

