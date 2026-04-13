"use client"

import { useState, useEffect, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { UnitCircleCanvas } from "@/components/unit-circle/unit-circle-canvas"
import { ControlPanel } from "@/components/unit-circle/control-panel"
import { TrigValuesPanel } from "@/components/unit-circle/trig-values-panel"
import { GraphPanel } from "@/components/unit-circle/graph-panel"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Maximize2, Minimize2, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function UnitCirclePage() {
  const [angle, setAngle] = useState(Math.PI / 4) // Start at 45°
  const [showTriangle, setShowTriangle] = useState(true)
  const [showCoordinates, setShowCoordinates] = useState(true)
  const [showTangentLine, setShowTangentLine] = useState(false)
  const [useDegrees, setUseDegrees] = useState(true)
  const [animating, setAnimating] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1280
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

  // Animation loop
  useEffect(() => {
    if (!animating) return

    const interval = setInterval(() => {
      setAngle((prev) => {
        const next = prev + 0.02 * animationSpeed
        return next >= 2 * Math.PI ? 0 : next
      })
    }, 16)

    return () => clearInterval(interval)
  }, [animating, animationSpeed])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navigation />

      <main className="flex-grow overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 shrink-0">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                  <Link href="/simulations">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/10 text-purple-500">
                      Mathematics
                    </span>
                    <span className="text-xs text-muted-foreground">Interactive Simulation</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">Unit Circle & Trigonometry</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowLeftPanel(!showLeftPanel)}
                  className="hidden xl:flex"
                >
                  {showLeftPanel ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowRightPanel(!showRightPanel)}
                  className="hidden xl:flex"
                >
                  {showRightPanel ? <PanelRightClose className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Panel - Controls */}
          <div
            className={cn(
              "transition-all duration-300 ease-in-out z-20 border-r bg-background",
              showLeftPanel ? "w-80" : "w-0",
              isMobile && showLeftPanel && "absolute inset-y-0 left-0 shadow-xl",
            )}
          >
            {showLeftPanel && (
              <div className="h-full p-4 overflow-y-auto w-80">
                <ControlPanel
                  angle={angle}
                  setAngle={setAngle}
                  showTriangle={showTriangle}
                  setShowTriangle={setShowTriangle}
                  showCoordinates={showCoordinates}
                  setShowCoordinates={setShowCoordinates}
                  showTangentLine={showTangentLine}
                  setShowTangentLine={setShowTangentLine}
                  useDegrees={useDegrees}
                  setUseDegrees={setUseDegrees}
                  animating={animating}
                  setAnimating={setAnimating}
                  animationSpeed={animationSpeed}
                  setAnimationSpeed={setAnimationSpeed}
                />
              </div>
            )}
          </div>

          {/* Toggle Left Panel Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-l-none shadow-md h-12 w-8 touch-manipulation xl:hidden",
              showLeftPanel ? "left-80" : "left-0",
            )}
            onClick={() => setShowLeftPanel(!showLeftPanel)}
          >
            {showLeftPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>

          {/* Center - Canvas & Graph */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="bg-card rounded-xl border-2 border-border p-4 shadow-lg">
              <UnitCircleCanvas
                angle={angle}
                setAngle={setAngle}
                showTriangle={showTriangle}
                showCoordinates={showCoordinates}
                showTangentLine={showTangentLine}
                useDegrees={useDegrees}
                animating={animating}
              />
            </div>
            <GraphPanel angle={angle} />
          </div>

          {/* Toggle Right Panel Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-r-none shadow-md h-12 w-8 touch-manipulation xl:hidden",
              showRightPanel ? "right-80" : "right-0",
            )}
            onClick={() => setShowRightPanel(!showRightPanel)}
          >
            {showRightPanel ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
          </Button>

          {/* Right Panel - Values */}
          <div
            className={cn(
              "transition-all duration-300 ease-in-out z-20 border-l bg-background",
              showRightPanel ? "w-80" : "w-0",
              isMobile && showRightPanel && "absolute inset-y-0 right-0 shadow-xl",
            )}
          >
            {showRightPanel && (
              <div className="h-full p-4 overflow-y-auto w-80">
                <TrigValuesPanel angle={angle} useDegrees={useDegrees} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
