"use client"

import { Card } from "@/components/ui/card"
import { Zap, BookOpen, Lightbulb, ArrowRight } from "lucide-react"

interface Props {
  magnetSpeed: number
  coilTurns: number
  magnetStrength: number
}

export function EMInfoPanel({ magnetSpeed, coilTurns, magnetStrength }: Props) {
  // Calculate approximate EMF
  const fluxChangeRate = magnetSpeed * magnetStrength
  const emf = coilTurns * fluxChangeRate

  return (
    <Card className="p-4 md:p-6 space-y-6 bg-background/95 backdrop-blur">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Faraday's Law
      </h3>

      {/* Formula */}
      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
        <p className="text-center font-mono text-lg md:text-xl">EMF = -N × (dΦ/dt)</p>
        <div className="mt-3 text-sm text-muted-foreground text-center">
          <p>EMF = Electromotive Force (Voltage)</p>
          <p>N = Number of coil turns</p>
          <p>Φ = Magnetic flux</p>
          <p>dΦ/dt = Rate of change of flux</p>
        </div>
      </div>

      {/* Current Values */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          Current Readings
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Coil Turns (N)</p>
            <p className="text-xl font-bold text-amber-500">{coilTurns}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Field (B)</p>
            <p className="text-xl font-bold text-purple-500">{magnetStrength.toFixed(1)} T</p>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Flux Rate</p>
            <p className="text-xl font-bold text-blue-500">{fluxChangeRate.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Est. EMF</p>
            <p className="text-xl font-bold text-green-500">{emf.toFixed(2)} V</p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          Key Concepts
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <p>
              <strong>Lenz's Law:</strong> Induced current opposes the change that created it (minus sign in formula)
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <p>
              <strong>Faster motion</strong> = Greater rate of flux change = Higher EMF
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <p>
              <strong>More coil turns</strong> = More flux linkage = Higher EMF
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <p>
              <strong>Stronger magnet</strong> = More magnetic flux = Higher EMF
            </p>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="space-y-2">
        <h4 className="font-medium">Real-World Applications</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-muted rounded flex items-center gap-2">
            <span className="text-lg">🔌</span>
            <span>Electric Generators</span>
          </div>
          <div className="p-2 bg-muted rounded flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span>Transformers</span>
          </div>
          <div className="p-2 bg-muted rounded flex items-center gap-2">
            <span className="text-lg">📱</span>
            <span>Wireless Charging</span>
          </div>
          <div className="p-2 bg-muted rounded flex items-center gap-2">
            <span className="text-lg">🍳</span>
            <span>Induction Cooktop</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
