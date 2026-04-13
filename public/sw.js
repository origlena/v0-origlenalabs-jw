const CACHE_NAME = "origlena-labs-v2"
const STATIC_CACHE = "origlena-static-v2"
const DYNAMIC_CACHE = "origlena-dynamic-v2"

const urlsToCache = [
  "/",
  "/simulations",
  "/about",
  "/contact",
  "/offline",
  "/manifest.json",
  "/logo.png",
  "/favicon.png",
]

// Install event - cache essential assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...")
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[SW] Caching static assets")
        return cache.addAll(urlsToCache)
      })
      .then(() => {
        console.log("[SW] Static assets cached successfully")
      })
      .catch((err) => {
        console.error("[SW] Failed to cache static assets:", err)
      }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("[SW] Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("[SW] Service worker activated")
      }),
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip chrome extensions and other protocols
  if (!url.protocol.startsWith("http")) {
    return
  }

  event.respondWith(
    (async () => {
      try {
        // Try network first
        const networkResponse = await fetch(request)

        // Cache successful responses
        if (networkResponse.ok) {
          const cache = await caches.open(DYNAMIC_CACHE)
          // Clone the response before caching
          cache.put(request, networkResponse.clone())
        }

        return networkResponse
      } catch (error) {
        console.log("[SW] Network request failed, trying cache:", request.url)

        // Try to get from cache
        const cachedResponse = await caches.match(request)

        if (cachedResponse) {
          console.log("[SW] Serving from cache:", request.url)
          return cachedResponse
        }

        // For navigation requests, return offline page
        if (request.mode === "navigate") {
          console.log("[SW] Returning offline page")
          const offlineResponse = await caches.match("/offline")
          if (offlineResponse) {
            return offlineResponse
          }
          // Fallback to home if offline page not cached
          return caches.match("/")
        }

        // For other requests, return a basic error response
        console.log("[SW] No cache available for:", request.url)
        return new Response("Offline - resource not available", {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        })
      }
    })(),
  )
})

// Handle push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data?.text() || "New update from Origlena Labs!",
    icon: "/logo.png",
    badge: "/logo.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
    },
  }

  event.waitUntil(self.registration.showNotification("Origlena Labs", options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow("/"))
})
