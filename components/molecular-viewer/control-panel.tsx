"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Atom, RotateCcw, Eye, EyeOff, Sparkles, Play, Pause, Zap, Search, X } from "lucide-react"
import { molecules, categoryInfo, type Molecule } from "./molecules-data"
import { cn } from "@/lib/utils"

interface ControlPanelProps {
  selectedMolecule: Molecule
  onSelectMolecule: (mol: Molecule) => void
  viewMode: "ball-stick" | "space-fill" | "wireframe"
  onViewModeChange: (mode: "ball-stick" | "space-fill" | "wireframe") => void
  showLabels: boolean
  onShowLabelsChange: (show: boolean) => void
  showElectronCloud: boolean
  onShowElectronCloudChange: (show: boolean) => void
  autoRotate: boolean
  onAutoRotateChange: (auto: boolean) => void
  rotationSpeed: number
  onRotationSpeedChange: (speed: number) => void
}

export function ControlPanel({
  selectedMolecule,
  onSelectMolecule,
  viewMode,
  onViewModeChange,
  showLabels,
  onShowLabelsChange,
  showElectronCloud,
  onShowElectronCloudChange,
  autoRotate,
  onAutoRotateChange,
  rotationSpeed,
  onRotationSpeedChange,
}: ControlPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter molecules based on search and category
  const filteredMolecules = useMemo(() => {
    return molecules.filter((mol) => {
      const matchesSearch =
        searchQuery === "" ||
        mol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mol.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mol.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || mol.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Group molecules by category for display
  const categories = Object.keys(categoryInfo)

  return (
    <Card className="h-full border-2 bg-card/95 backdrop-blur overflow-hidden flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Atom className="h-5 w-5 text-chemistry" />
          Molecule Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 overflow-y-auto flex-1">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Search Molecules</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-10 md:h-12 text-sm md:text-base"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Filter by Category</Label>
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer text-xs md:text-sm px-2 py-1"
              onClick={() => setSelectedCategory(null)}
            >
              All ({molecules.length})
            </Badge>
            {categories.map((cat) => {
              const count = molecules.filter((m) => m.category === cat).length
              return (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer text-xs md:text-sm px-2 py-1"
                  style={
                    selectedCategory === cat
                      ? {
                          backgroundColor: categoryInfo[cat].color,
                          color: "white",
                        }
                      : {
                          borderColor: categoryInfo[cat].color,
                          color: categoryInfo[cat].color,
                        }
                  }
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                >
                  {categoryInfo[cat].label} ({count})
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Molecule Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Select Molecule ({filteredMolecules.length} results)</Label>
          <ScrollArea className="h-40 md:h-48 rounded-md border bg-muted/30 p-2">
            <div className="space-y-1">
              {filteredMolecules.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No molecules found</p>
              ) : (
                filteredMolecules.map((mol) => (
                  <button
                    key={mol.id}
                    onClick={() => onSelectMolecule(mol)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-all",
                      "hover:bg-primary/10 touch-manipulation",
                      selectedMolecule.id === mol.id && "bg-primary/20 border-l-2 border-primary",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm truncate">{mol.name}</span>
                      <Badge
                        variant="secondary"
                        className="text-xs flex-shrink-0"
                        style={{
                          backgroundColor: `${categoryInfo[mol.category].color}20`,
                          color: categoryInfo[mol.category].color,
                        }}
                      >
                        {mol.formula}
                      </Badge>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* View Mode - larger buttons for touch */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">View Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { mode: "ball-stick", label: "Ball & Stick" },
              { mode: "space-fill", label: "Space Fill" },
              { mode: "wireframe", label: "Wireframe" },
            ].map(({ mode, label }) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange(mode as typeof viewMode)}
                className="text-xs md:text-sm h-9 md:h-10 touch-manipulation"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Visual Options */}
        <div className="space-y-3 md:space-y-4">
          <Label className="text-sm font-medium">Visual Options</Label>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span className="text-sm">Show Labels</span>
            </div>
            <Switch checked={showLabels} onCheckedChange={onShowLabelsChange} className="scale-110" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Electron Cloud</span>
            </div>
            <Switch checked={showElectronCloud} onCheckedChange={onShowElectronCloudChange} className="scale-110" />
          </div>
        </div>

        {/* Animation Controls */}
        <div className="space-y-3 md:space-y-4">
          <Label className="text-sm font-medium">Animation</Label>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="text-sm">Auto Rotate</span>
            </div>
            <Switch checked={autoRotate} onCheckedChange={onAutoRotateChange} className="scale-110" />
          </div>

          {autoRotate && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Rotation Speed</span>
                <span>{rotationSpeed.toFixed(1)}x</span>
              </div>
              <Slider
                value={[rotationSpeed]}
                onValueChange={([v]) => onRotationSpeedChange(v)}
                min={0.1}
                max={3}
                step={0.1}
                className="touch-manipulation"
              />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Actions</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs md:text-sm bg-transparent h-9 md:h-10">
              <RotateCcw className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Reset View
            </Button>
            <Button variant="outline" size="sm" className="text-xs md:text-sm bg-transparent h-9 md:h-10">
              <Zap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Vibration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
