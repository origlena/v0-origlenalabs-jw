"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw, Home } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <WifiOff className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">You're Offline</h1>
          <p className="text-muted-foreground">
            It looks like you've lost your internet connection. Some features may not be available.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 text-left space-y-2">
          <p className="font-medium">While offline, you can:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• View previously loaded pages</li>
            <li>• Access cached simulations</li>
            <li>• Browse saved content</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Origlena Labs is a Progressive Web App that works offline once you've visited pages.
        </p>
      </div>
    </div>
  )
}
