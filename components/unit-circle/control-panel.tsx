"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Triangle, Crosshair, TrendingUp } from "lucide-react"

interface ControlPanelProps {
  angle: number
  setAngle: (angle: number) => void
  showTriangle: boolean
  setShowTriangle: (show: boolean) => void
  showCoordinates: boolean
  setShowCoordinates: (show: boolean) => void
  showTangentLine: boolean
  setShowTangentLine: (show: boolean) => void
  useDegrees: boolean
  setUseDegrees: (use: boolean) => void
  animating: boolean
  setAnimating: (animating: boolean) => void
  animationSpeed: number
  setAnimationSpeed: (speed: number) => void
}

const commonAngles = [
  { deg: 0, rad: 0, label: "0°" },
  { deg: 30, rad: Math.PI / 6, label: "30°" },
  { deg: 45, rad: Math.PI / 4, label: "45°" },
  { deg: 60, rad: Math.PI / 3, label: "60°" },
  { deg: 90, rad: Math.PI / 2, label: "90°" },
  { deg: 120, rad: (2 * Math.PI) / 3, label: "120°" },
  { deg: 135, rad: (3 * Math.PI) / 4, label: "135°" },
  { deg: 150, rad: (5 * Math.PI) / 6, label: "150°" },
  { deg: 180, rad: Math.PI, label: "180°" },
  { deg: 270, rad: (3 * Math.PI) / 2, label: "270°" },
  { deg: 360, rad: 2 * Math.PI, label: "360°" },
]

export function ControlPanel({
  angle,
  setAngle,
  showTriangle,
  setShowTriangle,
  showCoordinates,
  setShowCoordinates,
  showTangentLine,
  setShowTangentLine,
  useDegrees,
  setUseDegrees,
  animating,
  setAnimating,
  animationSpeed,
  setAnimationSpeed,
}: ControlPanelProps) {
  const currentDegrees = Math.round((angle * 180) / Math.PI)

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Triangle className="h-5 w-5 text-purple-500" />
          </div>
          Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Angle Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Angle</Label>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {useDegrees ? `${currentDegrees}°` : `${(angle / Math.PI).toFixed(2)}π rad`}
            </Badge>
          </div>
          <Slider
            value={[angle]}
            onValueChange={([v]) => setAngle(v)}
            min={0}
            max={2 * Math.PI}
            step={0.01}
            className="py-2"
          />
        </div>

        {/* Common Angles */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Angles</Label>
          <div className="grid grid-cols-4 gap-2">
            {commonAngles.map((a) => (
              <Button
                key={a.deg}
                variant={Math.abs(currentDegrees - a.deg) < 2 ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setAngle(a.rad)}
              >
                {a.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Animation Controls */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Animation</Label>
          <div className="flex items-center gap-2">
            <Button
              variant={animating ? "default" : "outline"}
              size="sm"
              className="flex-1 gap-2"
              onClick={() => setAnimating(!animating)}
            >
              {animating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {animating ? "Pause" : "Play"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAngle(0)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Speed</span>
              <span>{animationSpeed.toFixed(1)}x</span>
            </div>
            <Slider
              value={[animationSpeed]}
              onValueChange={([v]) => setAnimationSpeed(v)}
              min={0.1}
              max={3}
              step={0.1}
              disabled={!animating}
            />
          </div>
        </div>

        {/* Display Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Display Options</Label>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Triangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Show Triangle</span>
            </div>
            <Switch checked={showTriangle} onCheckedChange={setShowTriangle} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crosshair className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Show Coordinates</span>
            </div>
            <Switch checked={showCoordinates} onCheckedChange={setShowCoordinates} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-500" />
              <span className="text-sm">Show Tangent Line</span>
            </div>
            <Switch checked={showTangentLine} onCheckedChange={setShowTangentLine} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">Use Degrees</span>
            </div>
            <Switch checked={useDegrees} onCheckedChange={setUseDegrees} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
