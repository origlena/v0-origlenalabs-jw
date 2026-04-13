"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { PhotosynthesisCanvas } from "@/components/photosynthesis/photosynthesis-canvas"
import { PhotosynthesisControlPanel } from "@/components/photosynthesis/control-panel"
import { PhotosynthesisInfoPanel } from "@/components/photosynthesis/info-panel"
import { PhotosynthesisTimeline } from "@/components/photosynthesis/timeline"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  Info,
  PanelLeftClose,
  PanelLeft,
  PanelRightClose,
  PanelRight,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PhotosynthesisSimulationPage() {
  const [lightIntensity, setLightIntensity] = useState(1)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [showLabels, setShowLabels] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showQuickGuide, setShowQuickGuide] = useState(true)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setShowLeftPanel(false)
        setShowRightPanel(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-advance steps when playing
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) return 0
        return prev + 1
      })
    }, 3000 / animationSpeed)

    return () => clearInterval(interval)
  }, [isPlaying, animationSpeed])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handleReset = () => {
    setLightIntensity(1)
    setAnimationSpeed(1)
    setShowLabels(true)
    setCurrentStep(0)
    setIsPlaying(true)
  }

  // Dismiss quick guide after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowQuickGuide(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-background">
      {!isFullscreen && <Navigation />}

      <main className="flex-grow flex flex-col relative">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <Button asChild variant="secondary" size="sm" className="backdrop-blur-sm">
            <Link href="/simulations">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <Button variant="secondary" size="sm" className="backdrop-blur-sm" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          {!isFullscreen && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm hidden lg:flex"
                onClick={() => setShowLeftPanel(!showLeftPanel)}
              >
                {showLeftPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm hidden lg:flex"
                onClick={() => setShowRightPanel(!showRightPanel)}
              >
                {showRightPanel ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
              </Button>
            </>
          )}
        </div>

        {/* Quick Guide Popup */}
        {showQuickGuide && !isFullscreen && (
          <div className="absolute top-4 right-4 z-20 max-w-xs animate-in slide-in-from-right">
            <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground p-4 rounded-lg shadow-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Quick Guide</h4>
                  <p className="text-xs mt-1 opacity-90">
                    Watch the complete photosynthesis process in 6 steps. Use the timeline below to navigate or let it
                    auto-play. Toggle panels for fullscreen view.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-2 h-7 text-xs"
                    onClick={() => setShowQuickGuide(false)}
                  >
                    Got it!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow flex relative">
          {/* Left Sidebar - Controls */}
          {!isFullscreen && (
            <div
              className={cn(
                "transition-all duration-300 ease-in-out z-20 border-r border-border/50 bg-background",
                showLeftPanel ? "w-80" : "w-0",
                isMobile && showLeftPanel && "absolute inset-y-0 left-0 shadow-xl",
              )}
            >
              {showLeftPanel && (
                <div className="h-full p-4 overflow-y-auto w-80">
                  <PhotosynthesisControlPanel
                    lightIntensity={lightIntensity}
                    setLightIntensity={setLightIntensity}
                    animationSpeed={animationSpeed}
                    setAnimationSpeed={setAnimationSpeed}
                    showLabels={showLabels}
                    setShowLabels={setShowLabels}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    onReset={handleReset}
                  />
                </div>
              )}
            </div>
          )}

          {/* Toggle Left Panel Button - Mobile */}
          {!isFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-l-none shadow-md h-12 w-8 touch-manipulation lg:hidden",
                showLeftPanel ? "left-80" : "left-0",
              )}
              onClick={() => setShowLeftPanel(!showLeftPanel)}
            >
              {showLeftPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </Button>
          )}

          {/* Main Canvas Area */}
          <div className="flex-grow flex flex-col">
            {/* 3D Canvas */}
            <div className="flex-grow relative min-h-[400px]">
              <div className="absolute inset-0">
                <PhotosynthesisCanvas
                  lightIntensity={lightIntensity}
                  animationSpeed={animationSpeed}
                  showLabels={showLabels}
                  currentStep={currentStep}
                  isPlaying={isPlaying}
                />
              </div>

              {/* Title overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <h1 className="text-2xl font-bold text-foreground/90">Photosynthesis</h1>
                <p className="text-sm text-muted-foreground">How Plants Make Food from Sunlight</p>
              </div>
            </div>

            {/* Bottom Timeline */}
            {!isFullscreen && (
              <div className="p-4 border-t border-border/50">
                <PhotosynthesisTimeline currentStep={currentStep} setCurrentStep={setCurrentStep} />
              </div>
            )}
          </div>

          {/* Toggle Right Panel Button - Mobile */}
          {!isFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-r-none shadow-md h-12 w-8 touch-manipulation lg:hidden",
                showRightPanel ? "right-80" : "right-0",
              )}
              onClick={() => setShowRightPanel(!showRightPanel)}
            >
              {showRightPanel ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
            </Button>
          )}

          {/* Right Sidebar - Info */}
          {!isFullscreen && (
            <div
              className={cn(
                "transition-all duration-300 ease-in-out z-20 border-l border-border/50 bg-background",
                showRightPanel ? "w-80" : "w-0",
                isMobile && showRightPanel && "absolute inset-y-0 right-0 shadow-xl",
              )}
            >
              {showRightPanel && (
                <div className="h-full p-4 overflow-y-auto w-80">
                  <PhotosynthesisInfoPanel currentStep={currentStep} lightIntensity={lightIntensity} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
