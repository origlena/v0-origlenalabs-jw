"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepGuideProps {
  currentStep: number
  totalSteps: number
  sideA: number
  sideB: number
  onStepChange: (step: number) => void
  onReset: () => void
  isSpeaking: boolean
  onToggleVoice: () => void
}

const steps = [
  {
    title: "Meet the Right Triangle",
    description:
      "This is a right triangle - it has one 90° angle (the corner). The two shorter sides are called 'a' and 'b'.",
    highlight: "The longest side (opposite the right angle) is called the hypotenuse 'c'.",
    emoji: "📐",
  },
  {
    title: "Build Square on Side 'a'",
    description: "Let's build a square using side 'a'. Each side of this square equals 'a'.",
    highlight: "The area of this square = a × a = a²",
    formula: "a² = {a} × {a} = {aSquared}",
    emoji: "🟩",
  },
  {
    title: "Build Square on Side 'b'",
    description: "Now build another square using side 'b'. Each side equals 'b'.",
    highlight: "The area of this square = b × b = b²",
    formula: "b² = {b} × {b} = {bSquared}",
    emoji: "🟥",
  },
  {
    title: "Build Square on Hypotenuse 'c'",
    description: "Finally, build a square on the hypotenuse. This is the magic square!",
    highlight: "The area of this square = c × c = c²",
    formula: "c² = {c} × {c} ≈ {cSquared}",
    emoji: "🟪",
  },
  {
    title: "The Amazing Discovery!",
    description:
      "Count the unit cubes! The cubes in the green square PLUS the cubes in the red square EQUALS the cubes in the purple square!",
    highlight: "a² + b² = c² — This is the Pythagorean Theorem!",
    formula: "{aSquared} + {bSquared} = {sum} ✓",
    emoji: "🎉",
  },
]

export function StepGuide({
  currentStep,
  totalSteps,
  sideA,
  sideB,
  onStepChange,
  onReset,
  isSpeaking,
  onToggleVoice,
}: StepGuideProps) {
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)
  const step = steps[currentStep]

  const formatFormula = (formula: string) => {
    return formula
      .replace("{a}", sideA.toString())
      .replace("{b}", sideB.toString())
      .replace("{c}", sideC.toFixed(2))
      .replace("{aSquared}", (sideA * sideA).toString())
      .replace("{bSquared}", (sideB * sideB).toString())
      .replace("{cSquared}", (sideC * sideC).toFixed(1))
      .replace("{sum}", (sideA * sideA + sideB * sideB).toString())
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-2 border-primary/20">
      <CardContent className="p-6">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl">{step.emoji}</span>
            <div>
              <div className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {totalSteps}
              </div>
              <div className="font-bold text-lg">{step.title}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggleVoice} className={cn(isSpeaking && "text-primary")}>
            {isSpeaking ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-4">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => onStepChange(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === currentStep ? "w-8 bg-primary" : i < currentStep ? "w-2 bg-primary/60" : "w-2 bg-muted",
              )}
            />
          ))}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-3">{step.description}</p>

        {/* Highlight box */}
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mb-4">
          <p className="font-medium text-primary">{step.highlight}</p>
          {step.formula && <p className="text-2xl font-bold mt-2 font-mono">{formatFormula(step.formula)}</p>}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <Button variant="ghost" size="icon" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
            disabled={currentStep === totalSteps - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
