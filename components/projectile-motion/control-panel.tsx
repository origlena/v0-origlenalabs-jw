"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Rocket, Target, Wind, Gauge } from "lucide-react"

interface ControlPanelProps {
  angle: number
  setAngle: (v: number) => void
  velocity: number
  setVelocity: (v: number) => void
  gravity: number
  setGravity: (v: number) => void
  airResistance: number
  setAirResistance: (v: number) => void
  mass: number
  setMass: (v: number) => void
  height: number
  setHeight: (v: number) => void
  showTrail: boolean
  setShowTrail: (v: boolean) => void
  showVectors: boolean
  setShowVectors: (v: boolean) => void
  showGrid: boolean
  setShowGrid: (v: boolean) => void
  isPaused: boolean
  setIsPaused: (v: boolean) => void
  timeScale: number
  setTimeScale: (v: number) => void
  onLaunch: () => void
  onReset: () => void
}

export function ControlPanel({
  angle,
  setAngle,
  velocity,
  setVelocity,
  gravity,
  setGravity,
  airResistance,
  setAirResistance,
  mass,
  setMass,
  height,
  setHeight,
  showTrail,
  setShowTrail,
  showVectors,
  setShowVectors,
  showGrid,
  setShowGrid,
  isPaused,
  setIsPaused,
  timeScale,
  setTimeScale,
  onLaunch,
  onReset,
}: ControlPanelProps) {
  const presets = [
    { name: "Maximum Range", angle: 45, velocity: 30, gravity: 9.81 },
    { name: "High Arc", angle: 70, velocity: 25, gravity: 9.81 },
    { name: "Fast & Low", angle: 20, velocity: 50, gravity: 9.81 },
    { name: "Moon Gravity", angle: 45, velocity: 20, gravity: 1.62 },
    { name: "Mars Gravity", angle: 45, velocity: 25, gravity: 3.72 },
    { name: "No Air Drag", angle: 45, velocity: 30, gravity: 9.81 },
  ]

  const applyPreset = (preset: (typeof presets)[0]) => {
    setAngle(preset.angle)
    setVelocity(preset.velocity)
    setGravity(preset.gravity)
    if (preset.name === "No Air Drag") {
      setAirResistance(0)
    }
  }

  return (
    <Card className="h-full bg-card/95 backdrop-blur border-2">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Target className="h-5 w-5 text-physics" />
          Launch Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Main Controls */}
        <div className="flex gap-2">
          <Button onClick={onLaunch} className="flex-1 h-14 text-lg bg-physics hover:bg-physics/90">
            <Rocket className="mr-2 h-5 w-5" />
            Launch
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 bg-transparent"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon" className="h-14 w-14 bg-transparent" onClick={onReset}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* Launch Parameters */}
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Launch Angle</Label>
              <span className="text-2xl font-bold text-physics">{angle}°</span>
            </div>
            <Slider value={[angle]} onValueChange={([v]) => setAngle(v)} min={5} max={85} step={1} className="py-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5°</span>
              <span>45° (max range)</span>
              <span>85°</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Initial Velocity</Label>
              <span className="text-2xl font-bold text-physics">{velocity} m/s</span>
            </div>
            <Slider
              value={[velocity]}
              onValueChange={([v]) => setVelocity(v)}
              min={5}
              max={100}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 m/s</span>
              <span>~{(velocity * 3.6).toFixed(0)} km/h</span>
              <span>100 m/s</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Launch Height</Label>
              <span className="text-2xl font-bold text-physics">{height} m</span>
            </div>
            <Slider value={[height]} onValueChange={([v]) => setHeight(v)} min={0} max={50} step={1} className="py-2" />
          </div>
        </div>

        {/* Environment */}
        <div className="space-y-4 pt-2 border-t">
          <h4 className="font-semibold flex items-center gap-2">
            <Wind className="h-4 w-4" />
            Environment
          </h4>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Gravity</Label>
              <span className="font-mono text-sm">{gravity.toFixed(2)} m/s²</span>
            </div>
            <Slider
              value={[gravity]}
              onValueChange={([v]) => setGravity(v)}
              min={0.5}
              max={25}
              step={0.1}
              className="py-1"
            />
            <div className="flex gap-1 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => setGravity(1.62)}
              >
                Moon
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => setGravity(3.72)}
              >
                Mars
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => setGravity(9.81)}
              >
                Earth
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => setGravity(24.79)}
              >
                Jupiter
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Air Resistance</Label>
              <span className="font-mono text-sm">{airResistance.toFixed(1)}</span>
            </div>
            <Slider
              value={[airResistance]}
              onValueChange={([v]) => setAirResistance(v)}
              min={0}
              max={10}
              step={0.1}
              className="py-1"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Projectile Mass</Label>
              <span className="font-mono text-sm">{mass.toFixed(1)} kg</span>
            </div>
            <Slider value={[mass]} onValueChange={([v]) => setMass(v)} min={0.1} max={10} step={0.1} className="py-1" />
          </div>
        </div>

        {/* Time Scale */}
        <div className="space-y-3 pt-2 border-t">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Time Scale
            </Label>
            <span className="font-mono text-sm">{timeScale.toFixed(1)}x</span>
          </div>
          <Slider
            value={[timeScale]}
            onValueChange={([v]) => setTimeScale(v)}
            min={0.1}
            max={3}
            step={0.1}
            className="py-1"
          />
        </div>

        {/* Display Options */}
        <div className="space-y-4 pt-2 border-t">
          <h4 className="font-semibold">Display Options</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Show Trail</Label>
              <Switch checked={showTrail} onCheckedChange={setShowTrail} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Vectors</Label>
              <Switch checked={showVectors} onCheckedChange={setShowVectors} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Grid</Label>
              <Switch checked={showGrid} onCheckedChange={setShowGrid} />
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-3 pt-2 border-t">
          <h4 className="font-semibold">Quick Presets</h4>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                className="text-xs h-9 bg-transparent"
                onClick={() => applyPreset(preset)}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
