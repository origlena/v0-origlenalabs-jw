"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Droplet, FlaskConical, Beaker, RotateCcw, Pipette } from "lucide-react"

interface ControlPanelProps {
  pH: number
  onPHChange: (pH: number) => void
  solution: string
  onSolutionChange: (solution: string) => void
  onAddAcid: () => void
  onAddBase: () => void
  onReset: () => void
  isDropping: boolean
}

const commonSolutions = [
  { name: "Pure Water", pH: 7, icon: "💧" },
  { name: "Lemon Juice", pH: 2, icon: "🍋" },
  { name: "Vinegar", pH: 2.5, icon: "🫗" },
  { name: "Orange Juice", pH: 3.5, icon: "🍊" },
  { name: "Coffee", pH: 5, icon: "☕" },
  { name: "Milk", pH: 6.5, icon: "🥛" },
  { name: "Blood", pH: 7.4, icon: "🩸" },
  { name: "Seawater", pH: 8.1, icon: "🌊" },
  { name: "Baking Soda", pH: 8.5, icon: "🧂" },
  { name: "Soap", pH: 10, icon: "🧼" },
  { name: "Ammonia", pH: 11.5, icon: "🧪" },
  { name: "Bleach", pH: 12.5, icon: "⚗️" },
]

export function PHControlPanel({
  pH,
  onPHChange,
  solution,
  onSolutionChange,
  onAddAcid,
  onAddBase,
  onReset,
  isDropping,
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-chemistry" />
            Solution Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current pH Display */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Current pH Level</p>
            <p
              className="text-5xl font-bold"
              style={{
                color: pH < 4 ? "#ff4444" : pH < 7 ? "#ffaa00" : pH === 7 ? "#44ff44" : pH < 10 ? "#00aaff" : "#aa44ff",
              }}
            >
              {pH.toFixed(2)}
            </p>
            <Badge className="mt-2" variant={pH < 7 ? "destructive" : pH === 7 ? "default" : "secondary"}>
              {pH < 7 ? "Acidic" : pH === 7 ? "Neutral" : "Basic/Alkaline"}
            </Badge>
          </div>

          {/* pH Slider */}
          <div className="space-y-2">
            <Label>Adjust pH Level</Label>
            <Slider
              value={[pH]}
              onValueChange={([val]) => onPHChange(val)}
              min={0}
              max={14}
              step={0.1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 (Acid)</span>
              <span>7 (Neutral)</span>
              <span>14 (Base)</span>
            </div>
          </div>

          {/* Add Acid/Base */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onAddAcid}
              disabled={isDropping || pH <= 0}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Droplet className="w-4 h-4" />
              Add Acid
            </Button>
            <Button
              onClick={onAddBase}
              disabled={isDropping || pH >= 14}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Pipette className="w-4 h-4" />
              Add Base
            </Button>
          </div>

          {/* Reset */}
          <Button onClick={onReset} variant="outline" className="w-full bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Neutral
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Beaker className="w-5 h-5 text-chemistry" />
            Common Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
            {commonSolutions.map((sol) => (
              <Button
                key={sol.name}
                variant={solution === sol.name ? "default" : "outline"}
                size="sm"
                className="justify-start text-xs h-auto py-2"
                onClick={() => {
                  onSolutionChange(sol.name)
                  onPHChange(sol.pH)
                }}
              >
                <span className="mr-2">{sol.icon}</span>
                <span className="truncate">{sol.name}</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {sol.pH}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
