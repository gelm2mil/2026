const CACHE = "gelm-2026-v3";
const FILES = [
    "/2026/",
    "/2026/index.html",
    "/2026/styles.css",
    "/2026/app.js",
    "/2026/manifest.webmanifest",
    "/2026/icons/icon-192.png",
    "/2026/icons/icon-512.png",
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES))
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            )
        )
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(resp => resp || fetch(e.request))
    );
});
