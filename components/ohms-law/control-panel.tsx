"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Zap, Play, Pause, RotateCcw, Lightbulb, AlertTriangle } from "lucide-react"

interface ControlPanelProps {
  voltage: number
  resistance: number
  animationSpeed: number
  isPlaying: boolean
  selectedBulb: number
  bulbWattages: number[]
  currentPower: number
  onVoltageChange: (value: number) => void
  onResistanceChange: (value: number) => void
  onSpeedChange: (value: number) => void
  onBulbChange: (bulbId: number) => void
  onPlayPause: () => void
  onReset: () => void
}

export function ControlPanel({
  voltage,
  resistance,
  animationSpeed,
  isPlaying,
  selectedBulb,
  bulbWattages,
  currentPower,
  onVoltageChange,
  onResistanceChange,
  onSpeedChange,
  onBulbChange,
  onPlayPause,
  onReset,
}: ControlPanelProps) {
  const selectedWattage = bulbWattages[selectedBulb - 1]
  const powerRatio = currentPower / selectedWattage
  const isWarning = powerRatio > 0.8 && powerRatio <= 1.2
  const isDanger = powerRatio > 1.2

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Zap className="h-7 w-7 text-physics" />
          Circuit Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Select Bulb
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {bulbWattages.map((wattage, index) => {
              const bulbId = index + 1
              const isSelected = selectedBulb === bulbId
              return (
                <Button
                  key={bulbId}
                  size="lg"
                  variant={isSelected ? "default" : "outline"}
                  className={`h-20 text-lg font-bold transition-all ${
                    isSelected ? "bg-primary ring-4 ring-primary/30" : "hover:bg-muted"
                  }`}
                  onClick={() => onBulbChange(bulbId)}
                >
                  <div className="flex flex-col items-center">
                    <Lightbulb className={`h-6 w-6 mb-1 ${isSelected ? "text-yellow-300" : ""}`} />
                    <span>{wattage}W</span>
                  </div>
                </Button>
              )
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-bold text-primary">{selectedWattage}W bulb</span>
          </p>
        </div>

        {(isWarning || isDanger) && (
          <div
            className={`p-4 rounded-lg flex items-center gap-3 ${
              isDanger ? "bg-red-500/20 border border-red-500" : "bg-yellow-500/20 border border-yellow-500"
            }`}
          >
            <AlertTriangle className={`h-6 w-6 ${isDanger ? "text-red-500" : "text-yellow-500"}`} />
            <div>
              <p className={`font-bold ${isDanger ? "text-red-500" : "text-yellow-500"}`}>
                {isDanger ? "DANGER: Bulb will burst!" : "Warning: High power"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentPower.toFixed(2)}W / {selectedWattage}W ({(powerRatio * 100).toFixed(0)}%)
              </p>
            </div>
          </div>
        )}

        {/* Voltage Control - Larger for smartboard */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Voltage (V)</Label>
            <span className="text-2xl font-bold text-physics">{voltage.toFixed(1)} V</span>
          </div>
          <Slider
            value={[voltage]}
            onValueChange={([val]) => onVoltageChange(val)}
            min={1}
            max={48}
            step={0.5}
            className="[&_[role=slider]]:bg-physics [&_[role=slider]]:h-8 [&_[role=slider]]:w-8"
          />
          <p className="text-sm text-muted-foreground">Adjust battery voltage (1V - 48V)</p>
        </div>

        {/* Resistance Control - Larger for smartboard */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Resistance (Ω)</Label>
            <span className="text-2xl font-bold text-orange-500">{resistance} Ω</span>
          </div>
          <Slider
            value={[resistance]}
            onValueChange={([val]) => onResistanceChange(val)}
            min={5}
            max={500}
            step={5}
            className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:h-8 [&_[role=slider]]:w-8"
          />
          <p className="text-sm text-muted-foreground">Change resistor value (5Ω - 500Ω)</p>
        </div>

        {/* Animation Speed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Animation Speed</Label>
            <span className="text-xl font-bold">{animationSpeed.toFixed(1)}x</span>
          </div>
          <Slider
            value={[animationSpeed]}
            onValueChange={([val]) => onSpeedChange(val)}
            min={0.5}
            max={3}
            step={0.1}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:h-8 [&_[role=slider]]:w-8"
          />
        </div>

        {/* Action Buttons - Large touch targets */}
        <div className="flex gap-3 pt-4">
          <Button onClick={onPlayPause} className="flex-1 h-14 text-lg" variant={isPlaying ? "outline" : "default"}>
            {isPlaying ? (
              <>
                <Pause className="h-6 w-6 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-6 w-6 mr-2" />
                Play
              </>
            )}
          </Button>
          <Button onClick={onReset} variant="outline" className="h-14 w-14 bg-transparent">
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-3 pt-4 border-t">
          <Label className="text-lg font-semibold">Quick Presets</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              size="lg"
              variant="secondary"
              className="h-12"
              onClick={() => {
                onVoltageChange(3)
                onResistanceChange(100)
              }}
            >
              Safe Low
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-12"
              onClick={() => {
                onVoltageChange(12)
                onResistanceChange(50)
              }}
            >
              Standard
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-12"
              onClick={() => {
                onVoltageChange(24)
                onResistanceChange(20)
              }}
            >
              High Power
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-12"
              onClick={() => {
                onVoltageChange(48)
                onResistanceChange(10)
              }}
            >
              Overload!
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
