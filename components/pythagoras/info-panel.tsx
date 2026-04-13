"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lightbulb, History, Calculator } from "lucide-react"

interface InfoPanelProps {
  sideA: number
  sideB: number
  proofType: "area" | "rearrangement" | "similar-triangles" | "water-fill"
}

export function InfoPanel({ sideA, sideB, proofType }: InfoPanelProps) {
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)
  const area = (sideA * sideB) / 2
  const perimeter = sideA + sideB + sideC

  const proofDescriptions = {
    area: {
      title: "Area Proof",
      description:
        "The most intuitive proof! The area of the square on the hypotenuse (c²) equals the sum of the areas of the squares on the other two sides (a² + b²).",
      steps: [
        "Build a square on each side of the triangle",
        "Calculate the area of each square",
        "Verify: a² + b² = c²",
      ],
    },
    rearrangement: {
      title: "Rearrangement Proof",
      description:
        "Place 4 identical right triangles in a large square two different ways. One arrangement shows a² + b², the other shows c².",
      steps: [
        "Arrange 4 triangles leaving a² + b² visible",
        "Rearrange same triangles differently",
        "Now c² is visible - same total area!",
      ],
    },
    "similar-triangles": {
      title: "Similar Triangles Proof",
      description:
        "Drop an altitude from the right angle to the hypotenuse. This creates two smaller triangles, both similar to the original.",
      steps: [
        "Draw altitude to hypotenuse",
        "Identify 3 similar triangles",
        "Use similarity ratios to prove a² + b² = c²",
      ],
    },
    "water-fill": {
      title: "Water Fill Proof",
      description:
        "A visual demonstration: water filling squares a² and b² will exactly fill the square c². This physically demonstrates the theorem!",
      steps: ["Fill square a² with water", "Fill square b² with water", "Pour both into c² - it fits exactly!"],
    },
  }

  const currentProof = proofDescriptions[proofType]

  return (
    <Card className="bg-card/95 backdrop-blur border-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Learn & Understand
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Proof Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{currentProof.title}</span>
          </div>
          <p className="text-sm text-muted-foreground">{currentProof.description}</p>
          <div className="space-y-1">
            {currentProof.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Triangle Properties */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Triangle Properties</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground">Area</div>
              <div className="font-bold">{area.toFixed(2)} units²</div>
              <div className="text-xs text-muted-foreground mt-1">½ × a × b</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground">Perimeter</div>
              <div className="font-bold">{perimeter.toFixed(2)} units</div>
              <div className="text-xs text-muted-foreground mt-1">a + b + c</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground">Angle A</div>
              <div className="font-bold">{((Math.atan(sideA / sideB) * 180) / Math.PI).toFixed(1)}°</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground">Angle B</div>
              <div className="font-bold">{((Math.atan(sideB / sideA) * 180) / Math.PI).toFixed(1)}°</div>
            </div>
          </div>
        </div>

        {/* Historical Context */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-purple-500" />
            <span className="font-medium">Historical Facts</span>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Named after the ancient Greek mathematician{" "}
              <span className="text-foreground font-medium">Pythagoras</span> (c. 570-495 BCE), though the theorem was
              known to Babylonians 1000 years earlier.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">Ancient Greece</Badge>
              <Badge variant="secondary">~500 BCE</Badge>
              <Badge variant="secondary">Geometry</Badge>
            </div>
          </div>
        </div>

        {/* Key Formula */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="text-center">
            <div className="text-lg font-bold mb-2">The Pythagorean Theorem</div>
            <div className="text-2xl font-bold tracking-wide">
              <span className="text-green-500">a²</span>
              <span className="mx-2">+</span>
              <span className="text-red-500">b²</span>
              <span className="mx-2">=</span>
              <span className="text-purple-500">c²</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Real-World Applications</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {["Construction", "Navigation", "Architecture", "Computer Graphics", "Physics", "Engineering"].map(
              (app) => (
                <div key={app} className="p-2 rounded bg-muted/50 text-center text-muted-foreground">
                  {app}
                </div>
              ),
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
