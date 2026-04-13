"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ChemicalLab3D } from "@/components/chemical-reactions/chemical-lab-3d"
import { ChemicalSelector } from "@/components/chemical-reactions/chemical-selector"
import { ReactionInfo } from "@/components/chemical-reactions/reaction-info"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Chemical } from "@/components/chemical-reactions/chemicals-data"

export default function ChemicalReactionsPage() {
  const [chemical1, setChemical1] = useState<Chemical | null>(null)
  const [chemical2, setChemical2] = useState<Chemical | null>(null)
  const [isReacting, setIsReacting] = useState(false)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showSafetyWarning, setShowSafetyWarning] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setShowLeftPanel(false)
        setShowRightPanel(false)
      } else {
        setShowLeftPanel(true)
        setShowRightPanel(true)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleStartReaction = () => {
    if (chemical1 && chemical2) {
      setShowSafetyWarning(true)
      setTimeout(() => {
        setShowSafetyWarning(false)
        setIsReacting(true)
      }, 3000)
    }
  }

  const handleReset = () => {
    setIsReacting(false)
    setChemical1(null)
    setChemical2(null)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navigation />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel - Chemical Selector */}
        <div
          className={cn(
            "transition-all duration-300 z-20 border-r",
            showLeftPanel ? "w-80 lg:w-96" : "w-0",
            isMobile && showLeftPanel && "absolute inset-y-0 left-0 bg-background shadow-2xl",
          )}
        >
          {showLeftPanel && (
            <ChemicalSelector
              chemical1={chemical1}
              chemical2={chemical2}
              onSelectChemical1={setChemical1}
              onSelectChemical2={setChemical2}
              isReacting={isReacting}
              onStartReaction={handleStartReaction}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Toggle Left Panel */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-l-none shadow-lg",
            "h-14 w-10",
            showLeftPanel ? "left-80 lg:left-96" : "left-0",
          )}
          onClick={() => setShowLeftPanel(!showLeftPanel)}
        >
          {showLeftPanel ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>

        {/* Main 3D Lab */}
        <div className="flex-1 relative bg-gradient-to-b from-slate-900 to-slate-800">
          <ChemicalLab3D chemical1={chemical1} chemical2={chemical2} isReacting={isReacting} />

          {/* Safety Warning Overlay */}
          {showSafetyWarning && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-8 max-w-md mx-4 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-yellow-500">Safety Warning</h3>
                </div>
                <p className="text-yellow-100 text-lg">
                  This is a virtual simulation. Never attempt this reaction in real life without proper safety equipment
                  and supervision!
                </p>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleReset}
              className="bg-card/80 backdrop-blur h-12 w-12"
              disabled={!chemical1 && !chemical2}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          {/* Status Display */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-card/90 backdrop-blur rounded-lg px-4 py-3 border space-y-2">
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", isReacting ? "bg-red-500 animate-pulse" : "bg-green-500")} />
                <span className="font-medium">{isReacting ? "Reaction in Progress" : "Ready"}</span>
              </div>
              {chemical1 && (
                <div className="text-sm">
                  Beaker 1: <span className="font-mono text-primary">{chemical1.formula}</span>
                </div>
              )}
              {chemical2 && (
                <div className="text-sm">
                  Beaker 2: <span className="font-mono text-primary">{chemical2.formula}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toggle Right Panel */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-r-none shadow-lg",
            "h-14 w-10",
            showRightPanel ? "right-80 lg:right-96" : "right-0",
          )}
          onClick={() => setShowRightPanel(!showRightPanel)}
        >
          {showRightPanel ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>

        {/* Right Panel - Reaction Info */}
        <div
          className={cn(
            "transition-all duration-300 z-20 border-l",
            showRightPanel ? "w-80 lg:w-96" : "w-0",
            isMobile && showRightPanel && "absolute inset-y-0 right-0 bg-background shadow-2xl",
          )}
        >
          {showRightPanel && <ReactionInfo chemical1={chemical1} chemical2={chemical2} isReacting={isReacting} />}
        </div>
      </div>
    </div>
  )
}
