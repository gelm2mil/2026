const CACHE_NAME = "gelm-2026-v1";

const FILES_TO_CACHE = [
  "/2026/index.html",
  "/2026/styles.css",
  "/2026/app.js",
  "/2026/operativos.html",
  "/2026/denuncias.html",
  "/2026/confia.html",
  "/2026/respaldo.html",
  "/2026/agen2026.html",
  "/2026/icons/icon-192.png",
  "/2026/icons/icon-512.png"
];

// INSTALAR
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVAR Y LIMPIAR CACHES VIEJOS
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// MODO OFFLINE / RESPUESTA
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => {
          // Si falla red y no hay cache, devolvemos el index
          return caches.match("/2026/index.html");
        })
      );
    })
  );
});
