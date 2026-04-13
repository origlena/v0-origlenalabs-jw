"use client"

import { useState, useCallback, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { PHCanvas } from "@/components/ph-simulator/ph-canvas"
import { PHControlPanel } from "@/components/ph-simulator/control-panel"
import { PHInfoPanel } from "@/components/ph-simulator/info-panel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Minimize2, Info, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PHSimulatorPage() {
  const [pH, setPH] = useState(7)
  const [solution, setSolution] = useState("Pure Water")
  const [isDropping, setIsDropping] = useState(false)
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

  const handleAddAcid = useCallback(() => {
    setIsDropping(true)
    setSolution("Adding Acid...")
    setTimeout(() => {
      setPH((prev) => Math.max(0, prev - 0.5))
    }, 800)
  }, [])

  const handleAddBase = useCallback(() => {
    setIsDropping(true)
    setSolution("Adding Base...")
    setTimeout(() => {
      setPH((prev) => Math.min(14, prev + 0.5))
    }, 800)
  }, [])

  const handleDropComplete = useCallback(() => {
    setIsDropping(false)
    if (solution === "Adding Acid..." || solution === "Adding Base...") {
      setSolution("Custom Solution")
    }
  }, [solution])

  const handleReset = useCallback(() => {
    setPH(7)
    setSolution("Pure Water")
    setIsDropping(false)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur px-4 py-3">
          <div className="flex items-center justify-between max-w-[1800px] mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chemistry flex items-center justify-center">
                <span className="text-xl">🧪</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">pH Simulator</h1>
                <p className="text-sm text-muted-foreground">Explore acids, bases, and the pH scale interactively</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden md:flex">
                <Info className="w-3 h-3 mr-1" />
                Add acids or bases to change pH
              </Badge>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowLeftPanel(!showLeftPanel)}
                className="hidden lg:flex"
              >
                {showLeftPanel ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowRightPanel(!showRightPanel)}
                className="hidden xl:flex"
              >
                {showRightPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar - Controls */}
          <div
            className={cn(
              "transition-all duration-300 ease-in-out z-20 border-r bg-background",
              showLeftPanel ? "w-72" : "w-0",
              isMobile && showLeftPanel && "absolute inset-y-0 left-0 shadow-xl",
            )}
          >
            {showLeftPanel && (
              <div className="h-full p-4 overflow-y-auto w-72">
                <PHControlPanel
                  pH={pH}
                  onPHChange={setPH}
                  solution={solution}
                  onSolutionChange={setSolution}
                  onAddAcid={handleAddAcid}
                  onAddBase={handleAddBase}
                  onReset={handleReset}
                  isDropping={isDropping}
                />
              </div>
            )}
          </div>

          {/* Toggle Left Panel Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-l-none shadow-md h-12 w-8 touch-manipulation lg:hidden",
              showLeftPanel ? "left-72" : "left-0",
            )}
            onClick={() => setShowLeftPanel(!showLeftPanel)}
          >
            {showLeftPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>

          {/* Center - 3D Visualization */}
          <div className="flex-1 relative">
            <PHCanvas pH={pH} solution={solution} isDropping={isDropping} onDropComplete={handleDropComplete} />

            {/* Mobile Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <div className="bg-background/90 backdrop-blur rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">pH: {pH.toFixed(1)}</span>
                  <Badge variant={pH < 7 ? "destructive" : pH === 7 ? "default" : "secondary"}>
                    {pH < 7 ? "Acidic" : pH === 7 ? "Neutral" : "Basic"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="destructive" onClick={handleAddAcid} disabled={isDropping}>
                    + Acid
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button size="sm" className="bg-blue-600" onClick={handleAddBase} disabled={isDropping}>
                    + Base
                  </Button>
                </div>
              </div>
            </div>
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

          {/* Right Sidebar - Info */}
          <div
            className={cn(
              "transition-all duration-300 ease-in-out z-20 border-l bg-background",
              showRightPanel ? "w-80" : "w-0",
              isMobile && showRightPanel && "absolute inset-y-0 right-0 shadow-xl",
            )}
          >
            {showRightPanel && (
              <div className="h-full p-4 overflow-y-auto w-80">
                <PHInfoPanel pH={pH} solution={solution} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
