"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TheoremVisualizerProps {
  sideA: number
  sideB: number
  currentStep: number
}

export function TheoremVisualizer({ sideA, sideB, currentStep }: TheoremVisualizerProps) {
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)
  const aSquared = sideA * sideA
  const bSquared = sideB * sideB
  const cSquared = sideC * sideC

  return (
    <Card className="bg-card/95 backdrop-blur border-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Visual Proof</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual blocks representation */}
        <div className="flex items-end justify-center gap-4">
          {/* Square A blocks */}
          <div
            className={cn(
              "transition-all duration-500",
              currentStep >= 1 ? "opacity-100 scale-100" : "opacity-30 scale-90",
            )}
          >
            <div
              className="grid gap-0.5 p-1 rounded bg-green-500/20 border-2 border-green-500"
              style={{
                gridTemplateColumns: `repeat(${sideA}, 1fr)`,
              }}
            >
              {Array.from({ length: aSquared }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-green-500 rounded-sm"
                  style={{
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
            <div className="text-center mt-1 text-sm font-bold text-green-500">a² = {aSquared}</div>
          </div>

          {/* Plus sign */}
          <div
            className={cn(
              "text-2xl font-bold transition-all duration-500",
              currentStep >= 2 ? "opacity-100" : "opacity-30",
            )}
          >
            +
          </div>

          {/* Square B blocks */}
          <div
            className={cn(
              "transition-all duration-500",
              currentStep >= 2 ? "opacity-100 scale-100" : "opacity-30 scale-90",
            )}
          >
            <div
              className="grid gap-0.5 p-1 rounded bg-red-500/20 border-2 border-red-500"
              style={{
                gridTemplateColumns: `repeat(${sideB}, 1fr)`,
              }}
            >
              {Array.from({ length: bSquared }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-red-500 rounded-sm" />
              ))}
            </div>
            <div className="text-center mt-1 text-sm font-bold text-red-500">b² = {bSquared}</div>
          </div>

          {/* Equals sign */}
          <div
            className={cn(
              "text-2xl font-bold transition-all duration-500",
              currentStep >= 3 ? "opacity-100" : "opacity-30",
            )}
          >
            =
          </div>

          {/* Square C blocks */}
          <div
            className={cn(
              "transition-all duration-500",
              currentStep >= 3 ? "opacity-100 scale-100" : "opacity-30 scale-90",
            )}
          >
            <div
              className="grid gap-0.5 p-1 rounded bg-purple-500/20 border-2 border-purple-500"
              style={{
                gridTemplateColumns: `repeat(${Math.round(sideC)}, 1fr)`,
              }}
            >
              {Array.from({ length: Math.round(cSquared) }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-purple-500 rounded-sm" />
              ))}
            </div>
            <div className="text-center mt-1 text-sm font-bold text-purple-500">c² ≈ {Math.round(cSquared)}</div>
          </div>
        </div>

        {/* Equation */}
        <div
          className={cn(
            "text-center p-4 rounded-lg transition-all duration-500",
            currentStep >= 4
              ? "bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-purple-500/20 scale-105"
              : "bg-muted/50",
          )}
        >
          <div className="text-3xl font-bold font-mono">
            <span className="text-green-500">{aSquared}</span>
            <span className="mx-2">+</span>
            <span className="text-red-500">{bSquared}</span>
            <span className="mx-2">=</span>
            <span className="text-purple-500">{aSquared + bSquared}</span>
          </div>
          {currentStep >= 4 && (
            <div className="mt-2 text-lg text-green-400 font-bold animate-pulse">✓ Theorem Verified!</div>
          )}
        </div>

        {/* Count comparison */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className={cn("p-2 rounded transition-all", currentStep >= 1 ? "bg-green-500/20" : "bg-muted/30")}>
            <div className="text-green-500 font-bold">{aSquared}</div>
            <div className="text-xs text-muted-foreground">green cubes</div>
          </div>
          <div className={cn("p-2 rounded transition-all", currentStep >= 2 ? "bg-red-500/20" : "bg-muted/30")}>
            <div className="text-red-500 font-bold">{bSquared}</div>
            <div className="text-xs text-muted-foreground">red cubes</div>
          </div>
          <div className={cn("p-2 rounded transition-all", currentStep >= 3 ? "bg-purple-500/20" : "bg-muted/30")}>
            <div className="text-purple-500 font-bold">{Math.round(cSquared)}</div>
            <div className="text-xs text-muted-foreground">purple cubes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
