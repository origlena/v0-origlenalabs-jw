"use client"

import { useState, useEffect, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { Cell3D } from "@/components/cell/cell-3d"
import { ControlPanel } from "@/components/cell/control-panel"
import { InfoPanel } from "@/components/cell/info-panel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CellSimulationPage() {
  const [cellType, setCellType] = useState<"animal" | "plant">("animal")
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [showMembranes, setShowMembranes] = useState(true)
  const [crossSection, setCrossSection] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)

  const handleReset = useCallback(() => {
    setSelectedOrganelle(null)
    setShowLabels(true)
    setShowMembranes(true)
    setCrossSection(false)
    setRotationSpeed(0.5)
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        toggleFullscreen()
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      } else if (e.key === "l" || e.key === "L") {
        setShowLabels((prev) => !prev)
      } else if (e.key === "m" || e.key === "M") {
        setShowMembranes((prev) => !prev)
      } else if (e.key === "c" || e.key === "C") {
        setCrossSection((prev) => !prev)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen, toggleFullscreen])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur px-4 py-3">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/simulations">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">{cellType === "animal" ? "Animal" : "Plant"} Cell Structure</h1>
                <p className="text-sm text-muted-foreground">Interactive 3D exploration of cell organelles</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="hidden md:inline-flex px-2 py-1 text-xs bg-muted rounded">F</kbd>
              <span className="hidden md:inline text-xs text-muted-foreground">Fullscreen</span>
              <kbd className="hidden md:inline-flex px-2 py-1 text-xs bg-muted rounded ml-2">L</kbd>
              <span className="hidden md:inline text-xs text-muted-foreground">Labels</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex relative overflow-hidden">
          {/* Left Panel - Controls */}
          <div
            className={`absolute left-0 top-0 bottom-0 z-20 transition-transform duration-300 ${
              leftPanelOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-full w-80 p-4 overflow-auto">
              <ControlPanel
                cellType={cellType}
                onCellTypeChange={setCellType}
                showLabels={showLabels}
                onShowLabelsChange={setShowLabels}
                showMembranes={showMembranes}
                onShowMembranesChange={setShowMembranes}
                crossSection={crossSection}
                onCrossSectionChange={setCrossSection}
                rotationSpeed={rotationSpeed}
                onRotationSpeedChange={setRotationSpeed}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
                onReset={handleReset}
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -right-10 top-1/2 -translate-y-1/2 rounded-l-none"
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            >
              {leftPanelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* 3D Canvas */}
          <div className="flex-1 relative">
            <Cell3D
              cellType={cellType}
              selectedOrganelle={selectedOrganelle}
              onSelectOrganelle={setSelectedOrganelle}
              showLabels={showLabels}
              showMembranes={showMembranes}
              crossSection={crossSection}
              rotationSpeed={rotationSpeed}
            />

            {/* Cell Type Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur ${
                  cellType === "animal"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-green-500/20 text-green-300 border border-green-500/30"
                }`}
              >
                {cellType === "animal" ? "🔬 Animal Cell" : "🌿 Plant Cell"}
              </div>
            </div>
          </div>

          {/* Right Panel - Info */}
          <div
            className={`absolute right-0 top-0 bottom-0 z-20 transition-transform duration-300 ${
              rightPanelOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full w-80 p-4 overflow-hidden">
              <InfoPanel
                cellType={cellType}
                selectedOrganelle={selectedOrganelle}
                onSelectOrganelle={setSelectedOrganelle}
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -left-10 top-1/2 -translate-y-1/2 rounded-r-none"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
            >
              {rightPanelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
