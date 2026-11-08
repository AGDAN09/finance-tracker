const CACHE = "finance-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Online: ambil dari jaringan dan simpan. Offline: pakai simpanan terakhir.
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r)
      .then((res) => {
        const salinan = res.clone();
        caches.open(CACHE).then((c) => c.put(r, salinan));
        return res;
      })
      .catch(() => caches.match(r))
  );
});