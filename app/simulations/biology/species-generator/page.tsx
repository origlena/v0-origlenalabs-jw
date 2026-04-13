"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SpeciesSelector } from "@/components/species-generator/species-selector"
import { GeneticAnalyzer } from "@/components/species-generator/genetic-analyzer"
import { HybridVisualization } from "@/components/species-generator/hybrid-visualization"
import { InfoPanel } from "@/components/species-generator/info-panel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react"

export default function SpeciesGeneratorPage() {
  const [parent1, setParent1] = useState<string | null>(null)
  const [parent2, setParent2] = useState<string | null>(null)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navigation />

      <header className="border-b border-border bg-card px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold">Species Generator</h1>
          <p className="text-xs md:text-sm text-muted-foreground">Genetic Hybridization & Feasibility Analysis</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className="hidden md:flex gap-2"
          >
            <ChevronLeft className={!showLeftPanel ? "rotate-180" : ""} />
            Selection
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRightPanel(!showRightPanel)}
            className="hidden md:flex gap-2"
          >
            Info
            <ChevronRight className={!showRightPanel ? "rotate-180" : ""} />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile toggle buttons */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setShowLeftPanel(!showLeftPanel)}
          className="md:hidden fixed left-2 top-24 z-40 h-10 w-10 rounded-full shadow-lg"
        >
          {showLeftPanel ? <X className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="md:hidden fixed right-2 top-24 z-40 h-10 w-10 rounded-full shadow-lg"
        >
          {showRightPanel ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
        </Button>

        {/* Left Panel - Species Selection */}
        <div
          className={`${
            showLeftPanel ? "w-full md:w-80 lg:w-96" : "w-0"
          } transition-all duration-300 border-r border-border bg-card overflow-hidden absolute md:relative inset-y-0 left-0 z-30`}
        >
          <div className="h-full overflow-auto p-4">
            <SpeciesSelector
              parent1={parent1}
              parent2={parent2}
              onSelectParent1={setParent1}
              onSelectParent2={setParent2}
            />
          </div>
        </div>

        {/* Center - Visualization & Analysis */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <HybridVisualization parent1={parent1} parent2={parent2} />
          </div>
          <div className="border-t border-border">
            <GeneticAnalyzer parent1={parent1} parent2={parent2} />
          </div>
        </div>

        {/* Right Panel - Info */}
        <div
          className={`${
            showRightPanel ? "w-full md:w-80 lg:w-96" : "w-0"
          } transition-all duration-300 border-l border-border bg-card overflow-hidden absolute md:relative inset-y-0 right-0 z-30`}
        >
          <div className="h-full overflow-auto p-4">
            <InfoPanel parent1={parent1} parent2={parent2} />
          </div>
        </div>
      </div>
    </div>
  )
}
