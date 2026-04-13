"use client"

import { useState, useCallback, useEffect } from "react"
import { CircuitCanvas } from "@/components/ohms-law/circuit-canvas"
import { ControlPanel } from "@/components/ohms-law/control-panel"
import { InfoPanel } from "@/components/ohms-law/info-panel"
import { VoltageCurrentGraph } from "@/components/ohms-law/voltage-current-graph"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Maximize2, Minimize2, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const BULB_WATTAGES = [5, 15, 40, 100]

export default function OhmsLawPage() {
  const [voltage, setVoltage] = useState(12)
  const [resistance, setResistance] = useState(100)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedBulb, setSelectedBulb] = useState(1)
  const [burstBulbs, setBurstBulbs] = useState<number[]>([])
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

  // Calculate current using Ohm's Law: I = V / R
  const current = voltage / resistance

  // Calculate power: P = V × I
  const power = voltage * current

  const handleReset = () => {
    setVoltage(12)
    setResistance(100)
    setAnimationSpeed(1)
    setIsPlaying(true)
    setBurstBulbs([])
  }

  const handleBulbBurst = useCallback((bulbId: number) => {
    setBurstBulbs((prev) => {
      if (!prev.includes(bulbId)) {
        return [...prev, bulbId]
      }
      return prev
    })
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="lg" asChild className="h-12 px-4">
              <Link href="/simulations">
                <ArrowLeft className="h-6 w-6 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">Ohm's Law - Interactive Circuit</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Explore voltage, current, resistance & watch bulbs glow or burst!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowLeftPanel(!showLeftPanel)}
                className="hidden xl:flex bg-transparent"
              >
                {showLeftPanel ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowRightPanel(!showRightPanel)}
                className="hidden xl:flex bg-transparent"
              >
                {showRightPanel ? <PanelRightClose className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
              </Button>
              <Button variant="outline" size="lg" onClick={toggleFullscreen} className="h-12 px-4 bg-transparent">
                {isFullscreen ? <Minimize2 className="h-6 w-6" /> : <Maximize2 className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex h-[calc(100vh-80px)] overflow-hidden relative">
        {/* Left Column - Controls */}
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
                voltage={voltage}
                resistance={resistance}
                animationSpeed={animationSpeed}
                isPlaying={isPlaying}
                selectedBulb={selectedBulb}
                bulbWattages={BULB_WATTAGES}
                currentPower={power}
                onVoltageChange={setVoltage}
                onResistanceChange={setResistance}
                onSpeedChange={setAnimationSpeed}
                onBulbChange={setSelectedBulb}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onReset={handleReset}
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

        {/* Center Column - Canvas */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Circuit Visualization */}
          <div className="bg-card rounded-lg border p-4 h-[500px] md:h-[600px]">
            <CircuitCanvas
              voltage={voltage}
              resistance={resistance}
              current={current}
              power={power}
              animationSpeed={isPlaying ? animationSpeed : 0}
              selectedBulb={selectedBulb}
              onBulbBurst={handleBulbBurst}
            />
          </div>

          {/* Graph */}
          <VoltageCurrentGraph voltage={voltage} current={current} resistance={resistance} />
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

        {/* Right Column - Info Panel */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out z-20 border-l bg-background",
            showRightPanel ? "w-80" : "w-0",
            isMobile && showRightPanel && "absolute inset-y-0 right-0 shadow-xl",
          )}
        >
          {showRightPanel && (
            <div className="h-full p-4 overflow-y-auto w-80">
              <InfoPanel
                voltage={voltage}
                current={current}
                resistance={resistance}
                power={power}
                selectedBulb={selectedBulb}
                bulbWattages={BULB_WATTAGES}
                burstBulbs={burstBulbs}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
