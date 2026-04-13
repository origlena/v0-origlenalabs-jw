"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { MolecularViewer3D } from "@/components/molecular-viewer/molecular-viewer-3d"
import { ControlPanel } from "@/components/molecular-viewer/control-panel"
import { InfoPanel } from "@/components/molecular-viewer/info-panel"
import { molecules, type Molecule } from "@/components/molecular-viewer/molecules-data"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, ChevronLeft, ChevronRight, RotateCcw, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MolecularViewerPage() {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(molecules[0])
  const [viewMode, setViewMode] = useState<"ball-stick" | "space-fill" | "wireframe">("ball-stick")
  const [showLabels, setShowLabels] = useState(true)
  const [showElectronCloud, setShowElectronCloud] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [highlightedAtom, setHighlightedAtom] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-hide panels on mobile
      if (window.innerWidth < 768) {
        setShowLeftPanel(false)
        setShowRightPanel(false)
      } else if (window.innerWidth >= 1920) {
        // Large smartboards - show both panels
        setShowLeftPanel(true)
        setShowRightPanel(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        toggleFullscreen()
      } else if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen()
      } else if (e.key === "r" || e.key === "R") {
        setAutoRotate((prev) => !prev)
      } else if (e.key === "1") {
        setViewMode("ball-stick")
      } else if (e.key === "2") {
        setViewMode("space-fill")
      } else if (e.key === "3") {
        setViewMode("wireframe")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen])

  return (
    <div className={cn("flex flex-col h-screen bg-background", isFullscreen && "fixed inset-0 z-50")}>
      {!isFullscreen && <Navigation />}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Control Panel - responsive width */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out z-20",
            showLeftPanel ? "w-72 md:w-80 lg:w-96" : "w-0",
            isMobile && showLeftPanel && "absolute inset-y-0 left-0 bg-background shadow-xl",
          )}
        >
          {showLeftPanel && (
            <div className="h-full p-2 md:p-4 overflow-hidden">
              <ControlPanel
                selectedMolecule={selectedMolecule}
                onSelectMolecule={setSelectedMolecule}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                showLabels={showLabels}
                onShowLabelsChange={setShowLabels}
                showElectronCloud={showElectronCloud}
                onShowElectronCloudChange={setShowElectronCloud}
                autoRotate={autoRotate}
                onAutoRotateChange={setAutoRotate}
                rotationSpeed={rotationSpeed}
                onRotationSpeedChange={setRotationSpeed}
              />
            </div>
          )}
        </div>

        {/* Toggle Left Panel Button - larger for touch */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-l-none shadow-md",
            "h-12 w-8 md:h-14 md:w-10 touch-manipulation",
            showLeftPanel ? (isMobile ? "left-72" : "left-72 md:left-80 lg:left-96") : "left-0",
          )}
          onClick={() => setShowLeftPanel(!showLeftPanel)}
        >
          {showLeftPanel ? (
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          ) : (
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          )}
        </Button>

        {/* Main 3D Viewer */}
        <div className="flex-1 relative">
          <MolecularViewer3D
            molecule={selectedMolecule}
            viewMode={viewMode}
            showLabels={showLabels}
            showElectronCloud={showElectronCloud}
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
            highlightedAtom={highlightedAtom}
          />

          {/* Overlay Controls - larger for touch */}
          <div className="absolute top-2 md:top-4 right-2 md:right-4 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                setAutoRotate(true)
                setRotationSpeed(1)
              }}
              className="bg-card/80 backdrop-blur h-10 w-10 md:h-12 md:w-12 touch-manipulation"
            >
              <RotateCcw className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleFullscreen}
              className="bg-card/80 backdrop-blur h-10 w-10 md:h-12 md:w-12 touch-manipulation"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="absolute top-2 left-2 z-10">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setShowLeftPanel(!showLeftPanel)}
                className="bg-card/80 backdrop-blur h-10 w-10 touch-manipulation"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Molecule Name Overlay - responsive */}
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 z-10">
            <div className="bg-card/80 backdrop-blur rounded-lg px-3 py-1.5 md:px-4 md:py-2 border">
              <h2 className="text-base md:text-xl font-bold">{selectedMolecule.name}</h2>
              <p className="text-sm md:text-lg font-mono text-primary">{selectedMolecule.formula}</p>
            </div>
          </div>

          {/* View Mode Indicator */}
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-10">
            <div className="bg-card/80 backdrop-blur rounded-lg px-2 py-1 md:px-3 md:py-1.5 border text-xs md:text-sm">
              View: <span className="font-medium capitalize">{viewMode.replace("-", " & ")}</span>
            </div>
          </div>

          {/* Keyboard Shortcuts Help - larger text for smartboards */}
          {isFullscreen && !isMobile && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-card/80 backdrop-blur rounded-lg px-3 py-2 md:px-4 md:py-3 border text-xs md:text-sm text-muted-foreground">
                <p className="mb-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">F</kbd> Fullscreen
                </p>
                <p className="mb-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">R</kbd> Toggle Rotation
                </p>
                <p className="mb-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">1-3</kbd> View Modes
                </p>
                <p>
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">ESC</kbd> Exit
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Right Panel Button - larger for touch */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-r-none shadow-md",
            "h-12 w-8 md:h-14 md:w-10 touch-manipulation",
            showRightPanel ? (isMobile ? "right-72" : "right-72 md:right-80 lg:right-96") : "right-0",
          )}
          onClick={() => setShowRightPanel(!showRightPanel)}
        >
          {showRightPanel ? (
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          ) : (
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          )}
        </Button>

        {/* Right Info Panel - responsive width */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out z-20",
            showRightPanel ? "w-72 md:w-80 lg:w-96" : "w-0",
            isMobile && showRightPanel && "absolute inset-y-0 right-0 bg-background shadow-xl",
          )}
        >
          {showRightPanel && (
            <div className="h-full p-2 md:p-4 overflow-hidden">
              <InfoPanel molecule={selectedMolecule} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
