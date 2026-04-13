"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw, Leaf, Dog, Eye, EyeOff, Scissors, Tag, Maximize2, Minimize2 } from "lucide-react"

interface ControlPanelProps {
  cellType: "animal" | "plant"
  onCellTypeChange: (type: "animal" | "plant") => void
  showLabels: boolean
  onShowLabelsChange: (show: boolean) => void
  showMembranes: boolean
  onShowMembranesChange: (show: boolean) => void
  crossSection: boolean
  onCrossSectionChange: (show: boolean) => void
  rotationSpeed: number
  onRotationSpeedChange: (speed: number) => void
  isFullscreen: boolean
  onToggleFullscreen: () => void
  onReset: () => void
}

export function ControlPanel({
  cellType,
  onCellTypeChange,
  showLabels,
  onShowLabelsChange,
  showMembranes,
  onShowMembranesChange,
  crossSection,
  onCrossSectionChange,
  rotationSpeed,
  onRotationSpeedChange,
  isFullscreen,
  onToggleFullscreen,
  onReset,
}: ControlPanelProps) {
  return (
    <Card className="bg-card/95 backdrop-blur border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            {cellType === "animal" ? <Dog className="h-4 w-4 text-white" /> : <Leaf className="h-4 w-4 text-white" />}
          </div>
          Cell Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Cell Type Selector */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Cell Type</Label>
          <Tabs value={cellType} onValueChange={(v) => onCellTypeChange(v as "animal" | "plant")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="animal" className="flex items-center gap-2">
                <Dog className="h-4 w-4" />
                Animal
              </TabsTrigger>
              <TabsTrigger value="plant" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Plant
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Rotation Speed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Rotation Speed</Label>
            <span className="text-xs text-muted-foreground">{rotationSpeed.toFixed(1)}x</span>
          </div>
          <Slider
            value={[rotationSpeed]}
            onValueChange={([v]) => onRotationSpeedChange(v)}
            min={0}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Toggle Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Show Labels
            </Label>
            <Switch checked={showLabels} onCheckedChange={onShowLabelsChange} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center gap-2">
              {showMembranes ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              Show Membranes
            </Label>
            <Switch checked={showMembranes} onCheckedChange={onShowMembranesChange} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              Cross Section
            </Label>
            <Switch checked={crossSection} onCheckedChange={onCrossSectionChange} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={onToggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4 mr-2" /> : <Maximize2 className="h-4 w-4 mr-2" />}
            {isFullscreen ? "Exit" : "Fullscreen"}
          </Button>
        </div>

        {/* Legend */}
        <div className="pt-3 border-t">
          <Label className="text-sm font-medium mb-2 block">Quick Guide</Label>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Click organelles to select</p>
            <p>• Drag to rotate view</p>
            <p>• Scroll to zoom in/out</p>
            <p>• Hover for labels</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
