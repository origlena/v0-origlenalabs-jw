"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Triangle, Square, Droplets, Layers } from "lucide-react"

interface ControlPanelProps {
  sideA: number
  sideB: number
  showSquares: boolean
  showLabels: boolean
  showGrid: boolean
  proofType: "area" | "rearrangement" | "similar-triangles" | "water-fill"
  isAnimating: boolean
  onSideAChange: (value: number) => void
  onSideBChange: (value: number) => void
  onShowSquaresChange: (value: boolean) => void
  onShowLabelsChange: (value: boolean) => void
  onShowGridChange: (value: boolean) => void
  onProofTypeChange: (value: "area" | "rearrangement" | "similar-triangles" | "water-fill") => void
  onToggleAnimation: () => void
  onReset: () => void
}

export function ControlPanel({
  sideA,
  sideB,
  showSquares,
  showLabels,
  showGrid,
  proofType,
  isAnimating,
  onSideAChange,
  onSideBChange,
  onShowSquaresChange,
  onShowLabelsChange,
  onShowGridChange,
  onProofTypeChange,
  onToggleAnimation,
  onReset,
}: ControlPanelProps) {
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)

  return (
    <Card className="bg-card/95 backdrop-blur border-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Triangle className="h-5 w-5 text-primary" />
          Pythagoras Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Proof Type Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Proof Method</Label>
          <Tabs value={proofType} onValueChange={(v) => onProofTypeChange(v as typeof proofType)}>
            <TabsList className="grid grid-cols-2 gap-1 h-auto">
              <TabsTrigger value="area" className="flex items-center gap-1 py-2">
                <Square className="h-3 w-3" />
                <span className="text-xs">Area</span>
              </TabsTrigger>
              <TabsTrigger value="rearrangement" className="flex items-center gap-1 py-2">
                <Layers className="h-3 w-3" />
                <span className="text-xs">Rearrange</span>
              </TabsTrigger>
              <TabsTrigger value="similar-triangles" className="flex items-center gap-1 py-2">
                <Triangle className="h-3 w-3" />
                <span className="text-xs">Similar</span>
              </TabsTrigger>
              <TabsTrigger value="water-fill" className="flex items-center gap-1 py-2">
                <Droplets className="h-3 w-3" />
                <span className="text-xs">Water</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Triangle Dimensions */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Triangle Dimensions</Label>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-500 font-medium">Side a (vertical)</span>
              <span className="text-sm font-bold bg-green-500/20 px-2 py-0.5 rounded">{sideA}</span>
            </div>
            <Slider
              value={[sideA]}
              onValueChange={([v]) => onSideAChange(v)}
              min={1}
              max={12}
              step={1}
              className="[&>span:first-child]:bg-green-500/30 [&_[role=slider]]:bg-green-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-500 font-medium">Side b (horizontal)</span>
              <span className="text-sm font-bold bg-red-500/20 px-2 py-0.5 rounded">{sideB}</span>
            </div>
            <Slider
              value={[sideB]}
              onValueChange={([v]) => onSideBChange(v)}
              min={1}
              max={12}
              step={1}
              className="[&>span:first-child]:bg-red-500/30 [&_[role=slider]]:bg-red-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-500 font-medium">Hypotenuse c</span>
              <span className="text-sm font-bold bg-purple-500/20 px-2 py-0.5 rounded">{sideC.toFixed(2)}</span>
            </div>
            <div className="h-2 bg-purple-500/30 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 transition-all" style={{ width: `${(sideC / 17) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Calculations Box */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="text-sm font-medium mb-2">Theorem Verification</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded bg-green-500/20">
              <div className="text-xs text-muted-foreground">a²</div>
              <div className="font-bold text-green-500">{sideA * sideA}</div>
            </div>
            <div className="p-2 rounded bg-red-500/20">
              <div className="text-xs text-muted-foreground">b²</div>
              <div className="font-bold text-red-500">{sideB * sideB}</div>
            </div>
            <div className="p-2 rounded bg-purple-500/20">
              <div className="text-xs text-muted-foreground">c²</div>
              <div className="font-bold text-purple-500">{(sideC * sideC).toFixed(1)}</div>
            </div>
          </div>
          <div className="text-center pt-2 border-t border-border mt-2">
            <span className="text-green-500 font-bold">{sideA * sideA}</span>
            <span className="mx-2">+</span>
            <span className="text-red-500 font-bold">{sideB * sideB}</span>
            <span className="mx-2">=</span>
            <span className="text-purple-500 font-bold">{sideA * sideA + sideB * sideB}</span>
            <span className="ml-2 text-green-400">✓</span>
          </div>
        </div>

        {/* Display Options */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Display Options</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Squares</span>
              <Switch checked={showSquares} onCheckedChange={onShowSquaresChange} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Labels</span>
              <Switch checked={showLabels} onCheckedChange={onShowLabelsChange} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Grid</span>
              <Switch checked={showGrid} onCheckedChange={onShowGridChange} />
            </div>
          </div>
        </div>

        {/* Animation Controls */}
        <div className="flex gap-2">
          <Button onClick={onToggleAnimation} className="flex-1" variant={isAnimating ? "secondary" : "default"}>
            {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAnimating ? "Pause" : "Animate"}
          </Button>
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Famous Pythagorean Triples */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Famous Triples</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { a: 3, b: 4, label: "3-4-5" },
              { a: 5, b: 12, label: "5-12-13" },
              { a: 8, b: 6, label: "6-8-10" },
              { a: 7, b: 24 / 3, label: "7-24-25" },
            ].map((triple) => (
              <Button
                key={triple.label}
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
                onClick={() => {
                  onSideAChange(triple.a)
                  onSideBChange(triple.b)
                }}
              >
                {triple.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
