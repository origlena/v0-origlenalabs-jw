"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[App] Service Worker registered successfully:", registration.scope)

            // Check for updates periodically
            setInterval(() => {
              registration.update()
            }, 60000) // Check every minute
          })
          .catch((error) => {
            console.error("[App] Service Worker registration failed:", error)
          })
      })

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[App] Service Worker controller changed, reloading page")
        window.location.reload()
      })
    }
  }, [])

  return null
}
