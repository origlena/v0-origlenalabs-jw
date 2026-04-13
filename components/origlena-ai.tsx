"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Sparkles, Minimize2, Maximize2, RotateCcw, Loader2 } from "lucide-react"
import { useSupabaseAuth } from "@/lib/supabase-auth"

export function OriglenaAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { user } = useSupabaseAuth()

  useEffect(() => {
    if (iframeRef.current && !isLoading && user) {
      const sendUserData = () => {
        const userData = {
          type: "USER_DATA",
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            class: user.class,
            school: user.school,
          },
        }
        console.log("[v0] Sending user data to iframe:", userData)
        iframeRef.current?.contentWindow?.postMessage(userData, "https://v0-origlena.vercel.app")
      }

      // Send immediately
      sendUserData()

      // Also send periodically in case iframe reloads
      const interval = setInterval(sendUserData, 2000)
      return () => clearInterval(interval)
    }
  }, [isLoading, user])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = "https://v0-origlena.vercel.app/"
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open Origlena AI"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
            <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-background border rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Ask Origlena AI
        </span>
      </button>
    )
  }

  if (isMinimized) {
    return (
      <Card className="fixed bottom-6 right-6 z-50 w-64 p-2.5 shadow-2xl border-primary/20 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="font-semibold text-sm">Origlena AI</p>
          </div>
          <div className="flex gap-0.5">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(false)}>
              <Maximize2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`fixed z-50 flex flex-col shadow-2xl border-primary/20 bg-background/95 backdrop-blur overflow-hidden transition-all duration-300 ${
        isFullscreen ? "inset-4 w-auto h-auto" : "bottom-6 right-6 w-[95vw] max-w-md h-[80vh] max-h-[600px]"
      }`}
    >
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-background/80 hover:bg-background backdrop-blur"
          onClick={handleRefresh}
          title="Refresh"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-background/80 hover:bg-background backdrop-blur"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-background/80 hover:bg-background backdrop-blur"
          onClick={() => setIsMinimized(true)}
          title="Minimize"
        >
          <Minimize2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-background/80 hover:bg-background backdrop-blur"
          onClick={() => setIsOpen(false)}
          title="Close"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 relative overflow-hidden bg-background">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading Origlena...</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="https://v0-origlena.vercel.app/"
          className="w-full h-full border-0"
          title="Origlena AI"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </Card>
  )
}
