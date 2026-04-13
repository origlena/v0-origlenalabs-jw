"use client"

import { Card } from "@/components/ui/card"
import { Sun, Wind, Droplets, Zap, CloudRain, Leaf } from "lucide-react"

interface TimelineProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function PhotosynthesisTimeline({ currentStep, setCurrentStep }: TimelineProps) {
  const steps = [
    { icon: Sun, label: "Light", color: "bg-yellow-500" },
    { icon: Wind, label: "CO₂", color: "bg-gray-500" },
    { icon: Droplets, label: "H₂O", color: "bg-blue-500" },
    { icon: Zap, label: "Chloroplast", color: "bg-green-500" },
    { icon: CloudRain, label: "O₂", color: "bg-blue-400" },
    { icon: Leaf, label: "Glucose", color: "bg-emerald-500" },
  ]

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 p-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted -translate-y-1/2 z-0">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Step indicators */}
        {steps.map((step, i) => {
          const Icon = step.icon
          const isActive = i <= currentStep
          const isCurrent = i === currentStep

          return (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`relative z-10 flex flex-col items-center gap-1 transition-all ${
                isCurrent ? "scale-110" : ""
              }`}
            >
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${isActive ? step.color : "bg-muted"}
                ${isCurrent ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
              `}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <span
                className={`text-xs whitespace-nowrap ${
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Quick summary */}
      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground">Click any step to jump to that part of the process</p>
      </div>
    </Card>
  )
}
