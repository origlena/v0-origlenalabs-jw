"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Palette, Droplets, Zap, RotateCcw, Atom } from "lucide-react"
import { categoryColors, categoryNames } from "./elements-data"

interface ControlPanelProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  viewMode: "category" | "state" | "electronegativity"
  onViewModeChange: (mode: "category" | "state" | "electronegativity") => void
  highlightedCategory: string | null
  onCategoryChange: (category: string | null) => void
  show3DAtom: boolean
  onShow3DAtomChange: (show: boolean) => void
  onReset: () => void
}

export function ControlPanel({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  highlightedCategory,
  onCategoryChange,
  show3DAtom,
  onShow3DAtomChange,
  onReset,
}: ControlPanelProps) {
  const categories = Object.entries(categoryNames)

  return (
    <Card className="h-full bg-card/50 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Atom className="w-5 h-5 text-primary" />
          Controls
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Search Element</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Name, symbol, or number..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* View Mode */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground">Color By</Label>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={viewMode === "category" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("category")}
              className="justify-start"
            >
              <Palette className="w-4 h-4 mr-2" />
              Category
            </Button>
            <Button
              variant={viewMode === "state" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("state")}
              className="justify-start"
            >
              <Droplets className="w-4 h-4 mr-2" />
              State of Matter
            </Button>
            <Button
              variant={viewMode === "electronegativity" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("electronegativity")}
              className="justify-start"
            >
              <Zap className="w-4 h-4 mr-2" />
              Electronegativity
            </Button>
          </div>
        </div>

        {/* 3D Atom Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm">Show 3D Atom Model</Label>
          <Switch checked={show3DAtom} onCheckedChange={onShow3DAtomChange} />
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground">Filter by Category</Label>
          <ScrollArea className="h-48">
            <div className="space-y-1 pr-4">
              <Button
                variant={highlightedCategory === null ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(null)}
                className="w-full justify-start text-xs"
              >
                All Elements
              </Button>
              {categories.map(([key, name]) => (
                <Button
                  key={key}
                  variant={highlightedCategory === key ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onCategoryChange(highlightedCategory === key ? null : key)}
                  className="w-full justify-start text-xs gap-2"
                >
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: categoryColors[key] }} />
                  {name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={onReset} className="w-full bg-transparent">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>

        {/* Legend */}
        {viewMode === "state" && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">State Legend</Label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#4dabf7]" />
                Solid
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#ff6b6b]" />
                Liquid
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#69db7c]" />
                Gas
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#868e96]" />
                Unknown
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
