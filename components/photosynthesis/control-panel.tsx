"use client"

import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Wind, Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react"

interface ControlPanelProps {
  lightIntensity: number
  setLightIntensity: (value: number) => void
  animationSpeed: number
  setAnimationSpeed: (value: number) => void
  showLabels: boolean
  setShowLabels: (value: boolean) => void
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  currentStep: number
  setCurrentStep: (value: number) => void
  onReset: () => void
}

export function PhotosynthesisControlPanel({
  lightIntensity,
  setLightIntensity,
  animationSpeed,
  setAnimationSpeed,
  showLabels,
  setShowLabels,
  isPlaying,
  setIsPlaying,
  currentStep,
  setCurrentStep,
  onReset,
}: ControlPanelProps) {
  const steps = [
    "Light Absorption",
    "CO₂ Intake",
    "Water Absorption",
    "Chloroplast Activity",
    "O₂ Release",
    "Glucose Production",
  ]

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sun className="h-5 w-5 text-yellow-500" />
          Simulation Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Playback controls */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">Playback</label>
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" onClick={prevStep} disabled={currentStep <= 0}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-primary hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={nextStep} disabled={currentStep >= 5}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current step indicator */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">Current Step: {currentStep + 1}/6</label>
          <div className="flex gap-1">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`flex-1 h-2 rounded-full transition-all ${i <= currentStep ? "bg-primary" : "bg-muted"}`}
                title={step}
              />
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground">{steps[currentStep]}</p>
        </div>

        {/* Light intensity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              Light Intensity
            </label>
            <span className="text-sm text-muted-foreground">{Math.round(lightIntensity * 100)}%</span>
          </div>
          <Slider
            value={[lightIntensity]}
            onValueChange={([v]) => setLightIntensity(v)}
            min={0.1}
            max={2}
            step={0.1}
            className="py-2"
          />
        </div>

        {/* Animation speed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Wind className="h-4 w-4 text-blue-500" />
              Animation Speed
            </label>
            <span className="text-sm text-muted-foreground">{animationSpeed.toFixed(1)}x</span>
          </div>
          <Slider
            value={[animationSpeed]}
            onValueChange={([v]) => setAnimationSpeed(v)}
            min={0.2}
            max={3}
            step={0.1}
            className="py-2"
          />
        </div>

        {/* Show labels toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Show Labels</label>
          <Switch checked={showLabels} onCheckedChange={setShowLabels} />
        </div>
      </CardContent>
    </Card>
  )
}
