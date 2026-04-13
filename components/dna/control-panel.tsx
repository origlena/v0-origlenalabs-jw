"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut, Eye, EyeOff, Gauge, Layers } from "lucide-react"

interface ControlPanelProps {
  basePairs: number
  setBasePairs: (value: number) => void
  rotationSpeed: number
  setRotationSpeed: (value: number) => void
  showBasePairs: boolean
  setShowBasePairs: (value: boolean) => void
  onReset: () => void
}

export function ControlPanel({
  basePairs,
  setBasePairs,
  rotationSpeed,
  setRotationSpeed,
  showBasePairs,
  setShowBasePairs,
  onReset,
}: ControlPanelProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Gauge className="h-5 w-5 text-biology" />
          Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Base Pairs Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              Base Pairs
            </Label>
            <span className="text-sm text-muted-foreground font-mono">{basePairs}</span>
          </div>
          <Slider
            value={[basePairs]}
            onValueChange={(value) => setBasePairs(value[0])}
            min={5}
            max={40}
            step={1}
            className="w-full"
          />
        </div>

        {/* Rotation Speed Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              Rotation Speed
            </Label>
            <span className="text-sm text-muted-foreground font-mono">{rotationSpeed.toFixed(1)}x</span>
          </div>
          <Slider
            value={[rotationSpeed]}
            onValueChange={(value) => setRotationSpeed(value[0])}
            min={0}
            max={3}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Show/Hide Base Pairs Toggle */}
        <div className="flex items-center justify-between py-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            {showBasePairs ? (
              <Eye className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
            Show Base Pairs
          </Label>
          <Switch checked={showBasePairs} onCheckedChange={setShowBasePairs} />
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full bg-transparent" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset View
        </Button>

        {/* Zoom Controls */}
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" size="sm">
            <ZoomOut className="h-4 w-4 mr-1" />
            Zoom Out
          </Button>
          <Button variant="secondary" className="flex-1" size="sm">
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom In
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
