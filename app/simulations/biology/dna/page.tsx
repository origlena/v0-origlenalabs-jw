"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { DNACanvas } from "@/components/dna/dna-helix"
import { ControlPanel } from "@/components/dna/control-panel"
import { InfoPanel } from "@/components/dna/info-panel"
import { SequenceViewer } from "@/components/dna/sequence-viewer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Maximize2, Minimize2, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const DEFAULT_COLOR_SCHEME = {
  adenine: "#ef4444",
  thymine: "#22c55e",
  guanine: "#3b82f6",
  cytosine: "#eab308",
  backbone: "#8b5cf6",
}

export default function DNASimulationPage() {
  const [basePairs, setBasePairs] = useState(20)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)
  const [showBasePairs, setShowBasePairs] = useState(true)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [colorScheme] = useState(DEFAULT_COLOR_SCHEME)
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

  // Generate sequence based on base pairs
  const sequence = React.useMemo(() => {
    const bases = ["A", "T", "G", "C"]
    let seq = ""
    for (let i = 0; i < basePairs; i++) {
      seq += bases[Math.floor(Math.random() * 4)]
    }
    return seq
  }, [basePairs])

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
    setBasePairs(20)
    setRotationSpeed(0.5)
    setShowBasePairs(true)
    setCurrentRotation(0)
  }

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
                  <div className="space-y-4">
                    <ControlPanel
                      basePairs={basePairs}
                      setBasePairs={setBasePairs}
                      rotationSpeed={rotationSpeed}
                      setRotationSpeed={setRotationSpeed}
                      showBasePairs={showBasePairs}
                      setShowBasePairs={setShowBasePairs}
                      onReset={handleReset}
                    />
                  </div>
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
                <DNACanvas
                  basePairs={basePairs}
                  rotationSpeed={rotationSpeed}
                  showBasePairs={showBasePairs}
                  colorScheme={colorScheme}
                  onRotationChange={setCurrentRotation}
                />
              </div>

              {/* Title overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <h1 className="text-2xl font-bold text-foreground/90">DNA Double Helix</h1>
                <p className="text-sm text-muted-foreground">Interactive 3D Visualization</p>
              </div>
            </div>

            {/* Bottom Sequence Viewer */}
            {!isFullscreen && (
              <div className="p-4 border-t border-border/50">
                <SequenceViewer sequence={sequence} colorScheme={colorScheme} />
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
                showRightPanel ? "right-72" : "right-0",
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
                showRightPanel ? "w-72" : "w-0",
                isMobile && showRightPanel && "absolute inset-y-0 right-0 shadow-xl",
              )}
            >
              {showRightPanel && (
                <div className="h-full p-4 overflow-y-auto w-72">
                  <InfoPanel
                    basePairs={basePairs}
                    rotationAngle={currentRotation}
                    sequence={sequence}
                    colorScheme={colorScheme}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
