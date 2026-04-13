"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Atom, Zap, AlertTriangle, BookOpen } from "lucide-react"

interface InfoPanelProps {
  pH: number
  solution: string
}

export function PHInfoPanel({ pH, solution }: InfoPanelProps) {
  // Calculate H+ and OH- concentrations
  const hConcentration = Math.pow(10, -pH)
  const ohConcentration = Math.pow(10, -(14 - pH))

  const getAcidityLevel = () => {
    if (pH < 3) return { level: "Strongly Acidic", color: "bg-red-600", warning: "Highly corrosive!" }
    if (pH < 5) return { level: "Moderately Acidic", color: "bg-orange-500", warning: "Can cause irritation" }
    if (pH < 7) return { level: "Weakly Acidic", color: "bg-yellow-500", warning: "Generally safe" }
    if (pH === 7) return { level: "Neutral", color: "bg-green-500", warning: "Perfectly balanced" }
    if (pH < 9) return { level: "Weakly Basic", color: "bg-cyan-500", warning: "Generally safe" }
    if (pH < 11) return { level: "Moderately Basic", color: "bg-blue-500", warning: "Can cause irritation" }
    return { level: "Strongly Basic", color: "bg-purple-600", warning: "Highly caustic!" }
  }

  const acidity = getAcidityLevel()

  const getExamples = () => {
    if (pH < 1) return ["Battery Acid", "Hydrochloric Acid"]
    if (pH < 2) return ["Stomach Acid", "Lemon Juice"]
    if (pH < 3) return ["Vinegar", "Soda"]
    if (pH < 4) return ["Orange Juice", "Tomatoes"]
    if (pH < 5) return ["Beer", "Coffee"]
    if (pH < 6) return ["Rain Water", "Banana"]
    if (pH < 7) return ["Milk", "Saliva"]
    if (pH === 7) return ["Pure Water", "Human Blood (7.4)"]
    if (pH < 8) return ["Sea Water", "Eggs"]
    if (pH < 9) return ["Baking Soda", "Pancreas Juice"]
    if (pH < 10) return ["Antacid", "Hand Soap"]
    if (pH < 11) return ["Ammonia Solution", "Milk of Magnesia"]
    if (pH < 12) return ["Soapy Water", "Household Ammonia"]
    if (pH < 13) return ["Bleach", "Oven Cleaner"]
    return ["Drain Cleaner", "Sodium Hydroxide"]
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-chemistry" />
            Current Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Solution name */}
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Testing Solution</p>
            <p className="text-xl font-semibold">{solution}</p>
          </div>

          {/* Acidity level */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Acidity Level</span>
            <Badge className={acidity.color}>{acidity.level}</Badge>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
            <AlertTriangle className={`w-4 h-4 ${pH < 3 || pH > 11 ? "text-red-500" : "text-yellow-500"}`} />
            <span className="text-sm">{acidity.warning}</span>
          </div>

          {/* pH scale position */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">pH Scale Position</p>
            <div
              className="relative h-6 rounded-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(to right, #ff0000, #ff6600, #ffcc00, #66ff00, #00ff66, #00ccff, #0066ff, #6600ff)",
              }}
            >
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-300"
                style={{ left: `${(pH / 14) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Acid</span>
              <span>Neutral</span>
              <span>Base</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Atom className="w-5 h-5 text-chemistry" />
            Ion Concentrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-red-500/10 rounded">
            <span className="text-sm font-medium">H⁺ (Hydrogen ions)</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">{hConcentration.toExponential(2)} M</code>
          </div>
          <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded">
            <span className="text-sm font-medium">OH⁻ (Hydroxide ions)</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">{ohConcentration.toExponential(2)} M</code>
          </div>
          <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
            <p className="font-medium mb-1">Formula:</p>
            <p>pH = -log₁₀[H⁺]</p>
            <p>pOH = -log₁₀[OH⁻]</p>
            <p>pH + pOH = 14</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-chemistry" />
            Similar Substances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getExamples().map((example, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Zap className="w-3 h-3 text-chemistry" />
                {example}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Facts</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-muted-foreground">
          <p>• pH stands for "potential of Hydrogen"</p>
          <p>• Each pH unit represents a 10x change in acidity</p>
          <p>• Human blood must stay between pH 7.35-7.45</p>
          <p>• Rainwater is slightly acidic (~5.6) due to CO₂</p>
          <p>• Stomach acid has pH 1.5-3.5 to digest food</p>
        </CardContent>
      </Card>
    </div>
  )
}
