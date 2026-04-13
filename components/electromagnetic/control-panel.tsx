"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Zap, Magnet, CircleDot } from "lucide-react"

interface Props {
  magnetSpeed: number
  setMagnetSpeed: (value: number) => void
  coilTurns: number
  setCoilTurns: (value: number) => void
  magnetStrength: number
  setMagnetStrength: (value: number) => void
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
}

export function EMControlPanel({
  magnetSpeed,
  setMagnetSpeed,
  coilTurns,
  setCoilTurns,
  magnetStrength,
  setMagnetStrength,
  isPlaying,
  setIsPlaying,
}: Props) {
  const handleReset = () => {
    setMagnetSpeed(1)
    setCoilTurns(5)
    setMagnetStrength(1)
    setIsPlaying(false)
  }

  return (
    <Card className="p-4 md:p-6 space-y-6 bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Controls
        </h3>
        <Button variant="ghost" size="sm" onClick={handleReset} className="touch-manipulation">
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Play/Pause */}
      <Button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full h-12 text-base touch-manipulation"
        variant={isPlaying ? "destructive" : "default"}
      >
        {isPlaying ? (
          <>
            <Pause className="h-5 w-5 mr-2" />
            Pause
          </>
        ) : (
          <>
            <Play className="h-5 w-5 mr-2" />
            Start Experiment
          </>
        )}
      </Button>

      {/* Magnet Speed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Magnet className="h-4 w-4 text-red-500" />
            Magnet Speed
          </Label>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{magnetSpeed.toFixed(1)}x</span>
        </div>
        <Slider
          value={[magnetSpeed]}
          onValueChange={([v]) => setMagnetSpeed(v)}
          min={0.1}
          max={3}
          step={0.1}
          className="touch-manipulation"
        />
        <p className="text-xs text-muted-foreground">Faster movement = Greater EMF</p>
      </div>

      {/* Coil Turns */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <CircleDot className="h-4 w-4 text-amber-500" />
            Coil Turns (N)
          </Label>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{coilTurns} turns</span>
        </div>
        <Slider
          value={[coilTurns]}
          onValueChange={([v]) => setCoilTurns(v)}
          min={1}
          max={15}
          step={1}
          className="touch-manipulation"
        />
        <p className="text-xs text-muted-foreground">More turns = Greater EMF</p>
      </div>

      {/* Magnet Strength */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-500" />
            Magnetic Field (B)
          </Label>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{magnetStrength.toFixed(1)} T</span>
        </div>
        <Slider
          value={[magnetStrength]}
          onValueChange={([v]) => setMagnetStrength(v)}
          min={0.1}
          max={2}
          step={0.1}
          className="touch-manipulation"
        />
        <p className="text-xs text-muted-foreground">Stronger magnet = Greater EMF</p>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <Label className="text-sm">Quick Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMagnetSpeed(0.5)
              setCoilTurns(3)
              setMagnetStrength(0.5)
            }}
            className="touch-manipulation"
          >
            Low Power
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMagnetSpeed(1.5)
              setCoilTurns(8)
              setMagnetStrength(1.2)
            }}
            className="touch-manipulation"
          >
            Medium
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMagnetSpeed(2.5)
              setCoilTurns(12)
              setMagnetStrength(1.8)
            }}
            className="touch-manipulation"
          >
            High Power
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMagnetSpeed(3)
              setCoilTurns(15)
              setMagnetStrength(2)
            }}
            className="touch-manipulation"
          >
            Maximum
          </Button>
        </div>
      </div>
    </Card>
  )
}
