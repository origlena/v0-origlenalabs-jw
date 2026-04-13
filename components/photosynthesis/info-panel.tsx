"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Sun, Droplets, Wind, Zap, FlaskConical } from "lucide-react"

interface InfoPanelProps {
  currentStep: number
  lightIntensity: number
}

export function PhotosynthesisInfoPanel({ currentStep, lightIntensity }: InfoPanelProps) {
  const steps = [
    {
      title: "Light Absorption",
      icon: Sun,
      color: "text-yellow-500",
      description: "Chlorophyll in leaves absorbs sunlight energy, especially red and blue wavelengths.",
      formula: "Light Energy → Captured by Chlorophyll",
      detail: "Photons excite electrons in chlorophyll molecules",
    },
    {
      title: "CO₂ Intake",
      icon: Wind,
      color: "text-gray-400",
      description: "Carbon dioxide enters through tiny pores called stomata on the leaf surface.",
      formula: "6CO₂ → enters leaf",
      detail: "Stomata open during the day to allow gas exchange",
    },
    {
      title: "Water Absorption",
      icon: Droplets,
      color: "text-blue-500",
      description: "Roots absorb water from soil, which travels up through the stem to leaves.",
      formula: "6H₂O → absorbed by roots",
      detail: "Water provides hydrogen atoms and electrons",
    },
    {
      title: "Chloroplast Activity",
      icon: Zap,
      color: "text-green-500",
      description: "Light reactions in thylakoids convert light energy to chemical energy (ATP & NADPH).",
      formula: "Light + H₂O → ATP + NADPH + O₂",
      detail: "Calvin cycle uses ATP & NADPH to fix CO₂",
    },
    {
      title: "Oxygen Release",
      icon: Wind,
      color: "text-blue-400",
      description: "Oxygen gas is released as a byproduct through the stomata.",
      formula: "6O₂ → released to atmosphere",
      detail: "This oxygen comes from splitting water molecules",
    },
    {
      title: "Glucose Production",
      icon: FlaskConical,
      color: "text-emerald-500",
      description: "Carbon dioxide is converted into glucose sugar - stored energy for the plant.",
      formula: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
      detail: "Glucose is used for growth, respiration, and storage",
    },
  ]

  const currentInfo = steps[currentStep]
  const Icon = currentInfo.icon

  // Calculate estimated rates based on light intensity
  const glucoseRate = (lightIntensity * 2.5).toFixed(1)
  const o2Rate = (lightIntensity * 3.2).toFixed(1)
  const co2Absorbed = (lightIntensity * 3.0).toFixed(1)

  return (
    <div className="space-y-4">
      {/* Current Step Card */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            Process Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current step details */}
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`h-5 w-5 ${currentInfo.color}`} />
              <h3 className="font-semibold">{currentInfo.title}</h3>
              <Badge variant="secondary" className="ml-auto text-xs">
                Step {currentStep + 1}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{currentInfo.description}</p>
            <code className="block text-xs bg-background/50 p-2 rounded font-mono text-primary">
              {currentInfo.formula}
            </code>
            <p className="text-xs text-muted-foreground mt-2 italic">{currentInfo.detail}</p>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Simulated Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10">
              <span className="text-sm flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-emerald-500" />
                Glucose
              </span>
              <span className="text-sm font-mono text-emerald-500">{glucoseRate} μmol/m²/s</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-blue-500/10">
              <span className="text-sm flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                O₂ Output
              </span>
              <span className="text-sm font-mono text-blue-500">{o2Rate} μmol/m²/s</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-gray-500/10">
              <span className="text-sm flex items-center gap-2">
                <Wind className="h-4 w-4 text-gray-500" />
                CO₂ Absorbed
              </span>
              <span className="text-sm font-mono text-gray-400">{co2Absorbed} μmol/m²/s</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Equation */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Overall Equation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 via-green-500/10 to-blue-500/10 border border-primary/20">
            <code className="block text-center text-sm font-mono">
              <span className="text-yellow-500">6CO₂</span>
              <span className="text-muted-foreground"> + </span>
              <span className="text-blue-500">6H₂O</span>
              <span className="text-muted-foreground"> + </span>
              <span className="text-yellow-400">Light</span>
            </code>
            <div className="text-center text-muted-foreground my-1">↓</div>
            <code className="block text-center text-sm font-mono">
              <span className="text-emerald-500">C₆H₁₂O₆</span>
              <span className="text-muted-foreground"> + </span>
              <span className="text-blue-400">6O₂</span>
            </code>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Carbon Dioxide + Water + Light → Glucose + Oxygen
          </p>
        </CardContent>
      </Card>

      {/* Color Legend */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Molecule Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Oxygen (O)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white border" />
              <span>Hydrogen (H)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <span>Carbon (C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Light Photon</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>O₂ Molecule</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Glucose</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
