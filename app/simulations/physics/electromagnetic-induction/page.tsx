"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { EMInduction3D } from "@/components/electromagnetic/em-induction-3d"
import { EMControlPanel } from "@/components/electromagnetic/control-panel"
import { EMInfoPanel } from "@/components/electromagnetic/info-panel"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Maximize2, Minimize2, PanelLeftClose, PanelLeft } from "lucide-react"
import Link from "next/link"

export default function ElectromagneticInductionPage() {
  const [magnetSpeed, setMagnetSpeed] = useState(1)
  const [coilTurns, setCoilTurns] = useState(5)
  const [magnetStrength, setMagnetStrength] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPanels, setShowPanels] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-background">
      {!isFullscreen && <Navigation />}

      <div className="flex-1 flex overflow-hidden">
        {/* Left Control Panel */}
        {showPanels && !isFullscreen && (
          <div className="w-80 lg:w-96 border-r overflow-y-auto p-4 hidden md:block">
            <Link href="/simulations">
              <Button variant="ghost" size="sm" className="mb-4 touch-manipulation">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Simulations
              </Button>
            </Link>
            <EMControlPanel
              magnetSpeed={magnetSpeed}
              setMagnetSpeed={setMagnetSpeed}
              coilTurns={coilTurns}
              setCoilTurns={setCoilTurns}
              magnetStrength={magnetStrength}
              setMagnetStrength={setMagnetStrength}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <EMInduction3D
            magnetSpeed={magnetSpeed}
            coilTurns={coilTurns}
            magnetStrength={magnetStrength}
            isPlaying={isPlaying}
          />

          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setShowPanels(!showPanels)}
              className="touch-manipulation"
            >
              {showPanels ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="touch-manipulation"
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden absolute bottom-4 left-4 right-4">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full h-12 text-base touch-manipulation"
              variant={isPlaying ? "destructive" : "default"}
            >
              {isPlaying ? "Pause" : "Start Experiment"}
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-4 py-2 rounded-lg">
            <h1 className="text-lg md:text-xl font-bold">Electromagnetic Induction</h1>
            <p className="text-sm text-muted-foreground">Faraday's Law Simulation</p>
          </div>
        </div>

        {/* Right Info Panel */}
        {showPanels && !isFullscreen && (
          <div className="w-80 lg:w-96 border-l overflow-y-auto p-4 hidden lg:block">
            <EMInfoPanel magnetSpeed={magnetSpeed} coilTurns={coilTurns} magnetStrength={magnetStrength} />
          </div>
        )}
      </div>
    </div>
  )
}
