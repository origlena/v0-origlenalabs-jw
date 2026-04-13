"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Gauge, Zap, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react"

interface InfoPanelProps {
  voltage: number
  current: number
  resistance: number
  power: number
  selectedBulb: number
  bulbWattages: number[]
  burstBulbs: number[]
}

export function InfoPanel({
  voltage,
  current,
  resistance,
  power,
  selectedBulb,
  bulbWattages,
  burstBulbs,
}: InfoPanelProps) {
  const selectedWattage = bulbWattages[selectedBulb - 1]
  const powerRatio = power / selectedWattage
  const isSafe = powerRatio <= 0.8
  const isWarning = powerRatio > 0.8 && powerRatio <= 1.2
  const isDanger = powerRatio > 1.2
  const isBurst = powerRatio > 1.5

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Activity className="h-6 w-6 text-physics" />
          Ohm's Law Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div
          className={`p-4 rounded-lg border-2 ${
            burstBulbs.includes(selectedBulb)
              ? "bg-red-500/20 border-red-500"
              : isDanger
                ? "bg-red-500/10 border-red-500/50 animate-pulse"
                : isWarning
                  ? "bg-yellow-500/10 border-yellow-500/50"
                  : "bg-green-500/10 border-green-500/50"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb
                className={`h-6 w-6 ${burstBulbs.includes(selectedBulb) ? "text-red-500" : "text-yellow-500"}`}
              />
              <span className="font-bold text-lg">Bulb {selectedBulb}</span>
            </div>
            <span className="text-2xl font-bold">{selectedWattage}W</span>
          </div>

          {/* Power bar */}
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 ${
                burstBulbs.includes(selectedBulb)
                  ? "bg-red-500"
                  : isDanger
                    ? "bg-red-500"
                    : isWarning
                      ? "bg-yellow-500"
                      : "bg-green-500"
              }`}
              style={{ width: `${Math.min(powerRatio * 100, 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {power.toFixed(2)}W / {selectedWattage}W
            </span>
            <span
              className={`font-bold flex items-center gap-1 ${
                burstBulbs.includes(selectedBulb)
                  ? "text-red-500"
                  : isDanger
                    ? "text-red-500"
                    : isWarning
                      ? "text-yellow-500"
                      : "text-green-500"
              }`}
            >
              {burstBulbs.includes(selectedBulb) ? (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  BURST!
                </>
              ) : isDanger ? (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  DANGER
                </>
              ) : isWarning ? (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  WARNING
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  SAFE
                </>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {bulbWattages.map((wattage, index) => {
            const bulbId = index + 1
            const isBurstBulb = burstBulbs.includes(bulbId)
            const isSelected = selectedBulb === bulbId
            return (
              <div
                key={bulbId}
                className={`p-2 rounded-lg text-center border-2 ${
                  isBurstBulb
                    ? "bg-red-500/20 border-red-500"
                    : isSelected
                      ? "bg-primary/20 border-primary"
                      : "bg-muted border-transparent"
                }`}
              >
                <Lightbulb
                  className={`h-5 w-5 mx-auto mb-1 ${
                    isBurstBulb ? "text-red-500" : isSelected ? "text-yellow-400" : "text-muted-foreground"
                  }`}
                />
                <div className="text-xs font-bold">{wattage}W</div>
                <div className={`text-[10px] ${isBurstBulb ? "text-red-500" : "text-muted-foreground"}`}>
                  {isBurstBulb ? "BURST" : "OK"}
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Formula - Larger for smartboard */}
        <div className="p-4 bg-physics/10 rounded-lg border-2 border-physics/20">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Ohm's Law</div>
            <div className="text-4xl font-bold text-physics">V = I × R</div>
            <div className="text-sm text-muted-foreground">Voltage = Current × Resistance</div>
          </div>
        </div>

        {/* Calculations - Larger values for smartboard */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-physics" />
              <span className="font-medium">Voltage (V)</span>
            </div>
            <span className="text-2xl font-bold text-physics">{voltage.toFixed(2)} V</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-green-500" />
              <span className="font-medium">Current (I)</span>
            </div>
            <span className="text-2xl font-bold text-green-500">{current.toFixed(3)} A</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Gauge className="h-6 w-6 text-orange-500" />
              <span className="font-medium">Resistance (R)</span>
            </div>
            <span className="text-2xl font-bold text-orange-500">{resistance} Ω</span>
          </div>

          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              isDanger ? "bg-red-500/20" : isWarning ? "bg-yellow-500/20" : "bg-muted"
            }`}
          >
            <div className="flex items-center gap-3">
              <Zap
                className={`h-6 w-6 ${isDanger ? "text-red-500" : isWarning ? "text-yellow-500" : "text-red-500"}`}
              />
              <span className="font-medium">Power (P)</span>
            </div>
            <span
              className={`text-2xl font-bold ${isDanger ? "text-red-500" : isWarning ? "text-yellow-500" : "text-red-500"}`}
            >
              {power.toFixed(2)} W
            </span>
          </div>
        </div>

        {/* Power Formula */}
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          <div className="text-center space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Power Formula</div>
            <div className="text-2xl font-bold text-red-500">P = V × I</div>
            <div className="text-sm text-muted-foreground">
              {power.toFixed(2)}W = {voltage.toFixed(2)}V × {current.toFixed(3)}A
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Bulb Rating Guide
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>
              <span className="text-green-500">●</span> 0-80%: Safe operation
            </li>
            <li>
              <span className="text-yellow-500">●</span> 80-120%: Warning - bulb hot
            </li>
            <li>
              <span className="text-red-500">●</span> 120-150%: Danger zone
            </li>
            <li>
              <span className="text-red-500">●</span> &gt;150%: Bulb will BURST!
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
