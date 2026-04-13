"use client"

import { useState, useEffect, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { PeriodicTable3D } from "@/components/periodic-table/periodic-table-3d"
import { ElementDetailPanel } from "@/components/periodic-table/element-detail-panel"
import { ControlPanel } from "@/components/periodic-table/control-panel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Minimize2, Info, X, Search, Filter, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Element } from "@/components/periodic-table/elements-data"
import { cn } from "@/lib/utils"

export default function PeriodicTablePage() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [viewMode, setViewMode] = useState<"category" | "state" | "electronegativity">("category")
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null)
  const [show3DAtom, setShow3DAtom] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showMobileControls, setShowMobileControls] = useState(false)
  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(true)

  const handleReset = () => {
    setSelectedElement(null)
    setViewMode("category")
    setSearchQuery("")
    setHighlightedCategory(null)
    setShow3DAtom(true)
  }

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen()
      }
      if (e.key === "f" && e.ctrlKey) {
        e.preventDefault()
        toggleFullscreen()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, toggleFullscreen])

  useEffect(() => {
    if (selectedElement) {
      const isDesktop = window.innerWidth >= 1280 // xl breakpoint
      if (isDesktop) {
        setShowMobileDetails(true)
      }
    }
  }, [selectedElement])

  return (
    <div className={cn("min-h-screen bg-background flex flex-col", isFullscreen && "fixed inset-0 z-50")}>
      {!isFullscreen && <Navigation />}

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className={cn("border-b bg-card/50 backdrop-blur px-4 py-3 shrink-0", isFullscreen && "bg-background/95")}>
          <div className="flex items-center justify-between max-w-[1800px] mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chemistry flex items-center justify-center">
                <span className="text-xl">⚗️</span>
              </div>
              <div>
                <h1 className={cn("font-bold", isFullscreen ? "text-2xl" : "text-xl")}>Interactive Periodic Table</h1>
                <p className={cn("text-muted-foreground", isFullscreen ? "text-base" : "text-sm")}>
                  Explore all 118 elements with 3D visualization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isFullscreen && (
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search element..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-9 h-10 text-base"
                  />
                </div>
              )}

              <Badge variant="secondary" className="hidden md:flex">
                <Info className="w-3 h-3 mr-1" />
                {isFullscreen ? "Press ESC to exit" : "Click any element for details"}
              </Badge>

              <Button
                variant="outline"
                size="icon"
                className="lg:hidden bg-transparent"
                onClick={() => setShowMobileControls(!showMobileControls)}
              >
                <Filter className="w-4 h-4" />
              </Button>

              {selectedElement && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowMobileDetails(!showMobileDetails)}
                  className="xl:hidden"
                  title={showMobileDetails ? "Hide element details" : "Show element details"}
                >
                  {showMobileDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowDetailsSidebar(!showDetailsSidebar)}
                className="hidden xl:flex"
                title={showDetailsSidebar ? "Hide details sidebar" : "Show details sidebar"}
              >
                {showDetailsSidebar ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>

              <Button
                variant={isFullscreen ? "default" : "outline"}
                size="icon"
                onClick={toggleFullscreen}
                className={cn(isFullscreen && "bg-primary")}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          <div
            className={cn(
              "border-r p-4 shrink-0 overflow-y-auto",
              isFullscreen ? "w-72 hidden lg:block" : "w-64 hidden lg:block",
              showMobileControls && "absolute left-0 top-0 bottom-0 z-40 bg-background w-72 block lg:relative",
            )}
          >
            {showMobileControls && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 lg:hidden"
                onClick={() => setShowMobileControls(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <ControlPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              highlightedCategory={highlightedCategory}
              onCategoryChange={setHighlightedCategory}
              show3DAtom={show3DAtom}
              onShow3DAtomChange={setShow3DAtom}
              onReset={handleReset}
            />
          </div>

          <div className="flex-1 relative">
            <PeriodicTable3D
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              viewMode={viewMode}
              searchQuery={searchQuery}
              highlightedCategory={highlightedCategory}
              show3DAtom={show3DAtom}
            />

            <div className={cn("absolute bottom-4 left-4 flex gap-2", isFullscreen && "bottom-6 left-6")}>
              <Badge
                variant="secondary"
                className={cn("bg-background/80 backdrop-blur", isFullscreen && "text-base px-4 py-2")}
              >
                118 Elements
              </Badge>
              <Badge
                variant="secondary"
                className={cn("bg-background/80 backdrop-blur", isFullscreen && "text-base px-4 py-2")}
              >
                7 Periods
              </Badge>
              <Badge
                variant="secondary"
                className={cn("bg-background/80 backdrop-blur", isFullscreen && "text-base px-4 py-2")}
              >
                18 Groups
              </Badge>
            </div>

            {isFullscreen && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Badge className="bg-primary/80 backdrop-blur text-base px-4 py-2">
                  Fullscreen Mode - Press ESC to exit
                </Badge>
              </div>
            )}

            {isFullscreen && (
              <div className="absolute bottom-6 right-6 flex gap-2">
                {(["category", "state", "electronegativity"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "outline"}
                    size="lg"
                    className={cn("capitalize", viewMode === mode && "bg-chemistry")}
                    onClick={() => setViewMode(mode)}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {showDetailsSidebar && (
            <div
              className={cn(
                "border-l p-4 shrink-0 overflow-y-auto transition-all duration-300",
                isFullscreen ? "w-96 hidden xl:block" : "w-80 hidden xl:block",
                showMobileDetails &&
                  selectedElement &&
                  "absolute right-0 top-0 bottom-0 z-40 bg-background/95 backdrop-blur-xl w-full sm:w-96 block xl:relative shadow-2xl",
              )}
            >
              {showMobileDetails && selectedElement && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 xl:hidden z-50"
                  onClick={() => setShowMobileDetails(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <ElementDetailPanel element={selectedElement} showAtomModel={show3DAtom} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
