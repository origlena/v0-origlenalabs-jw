"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, X, Smartphone, Monitor, Tv, Share } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already installed
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ||
      document.referrer.includes("android-app://")

    setIsStandalone(checkStandalone)

    // Check if iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream
    setIsIOS(isIOSDevice)

    // Check if dismissed before
    const wasDismissed = localStorage.getItem("pwa-install-dismissed")
    if (wasDismissed) {
      const dismissedTime = Number.parseInt(wasDismissed)
      // Show again after 7 days
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        setDismissed(true)
      }
    }

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after 30 seconds of engagement
      setTimeout(() => {
        if (!checkStandalone && !wasDismissed) {
          setShowPrompt(true)
        }
      }, 30000)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)

    // Show iOS prompt after 30 seconds
    if (isIOSDevice && !checkStandalone && !wasDismissed) {
      setTimeout(() => setShowPrompt(true), 30000)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem("pwa-install-dismissed", Date.now().toString())
  }

  if (isStandalone || dismissed || !showPrompt) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
              <Download className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Install Origlena Labs</h3>
              <p className="text-sm text-muted-foreground">Get the full app experience</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleDismiss} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Smartphone className="h-6 w-6 text-primary" />
            <span className="text-xs text-center">Mobile</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Monitor className="h-6 w-6 text-primary" />
            <span className="text-xs text-center">Desktop</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Tv className="h-6 w-6 text-primary" />
            <span className="text-xs text-center">Smart TV</span>
          </div>
        </div>

        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Works offline - learn anywhere
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Faster loading and performance
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Fullscreen immersive experience
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Quick access from home screen
          </li>
        </ul>

        {isIOS ? (
          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <Share className="h-4 w-4" />
              How to install on iOS:
            </p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Tap the Share button in Safari</li>
              <li>Scroll down and tap "Add to Home Screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDismiss} className="flex-1 bg-transparent">
              Maybe Later
            </Button>
            <Button onClick={handleInstall} className="flex-1 bg-gradient-to-r from-primary to-cyan-500">
              <Download className="h-4 w-4 mr-2" />
              Install App
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
