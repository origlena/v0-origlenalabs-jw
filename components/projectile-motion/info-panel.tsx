"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Clock, Ruler, ArrowUp, Zap, Flame } from "lucide-react"

interface Projectile {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  initialVx: number
  initialVy: number
  trail: { x: number; y: number }[]
  color: string
  active: boolean
  landed: boolean
  maxHeight: number
  range: number
  flightTime: number
  currentTime: number
  spinRate: number
  impactVelocity: number
  energyLost: number
}

interface InfoPanelProps {
  angle: number
  velocity: number
  gravity: number
  airResistance: number
  height: number
  projectiles: Projectile[]
}

export function InfoPanel({ angle, velocity, gravity, airResistance, height, projectiles }: InfoPanelProps) {
  const angleRad = (angle * Math.PI) / 180
  const vx = velocity * Math.cos(angleRad)
  const vy = velocity * Math.sin(angleRad)

  const theoreticalMaxHeight = height + (vy * vy) / (2 * gravity)
  const timeToMaxHeight = vy / gravity
  const timeFromMaxToGround = Math.sqrt((2 * theoreticalMaxHeight) / gravity)
  const theoreticalFlightTime = timeToMaxHeight + timeFromMaxToGround
  const theoreticalRange = vx * theoreticalFlightTime

  const mass = 1
  const kineticEnergy = 0.5 * mass * velocity * velocity
  const potentialEnergy = mass * gravity * height
  const totalEnergy = kineticEnergy + potentialEnergy

  const activeProjectile = projectiles.find((p) => p.active && !p.landed)
  const lastLandedProjectile = [...projectiles].reverse().find((p) => p.landed)

  const currentSpeed = activeProjectile
    ? Math.sqrt(activeProjectile.vx * activeProjectile.vx + activeProjectile.vy * activeProjectile.vy)
    : 0

  return (
    <Card className="h-full bg-card/95 backdrop-blur border-2">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-5 w-5 text-physics" />
          Physics Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Initial Conditions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Initial Conditions</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">V₀ₓ (horizontal)</div>
              <div className="text-xl font-bold text-blue-500">{vx.toFixed(2)} m/s</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">V₀ᵧ (vertical)</div>
              <div className="text-xl font-bold text-green-500">{vy.toFixed(2)} m/s</div>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        {activeProjectile && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Data
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-physics/10 border border-physics/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Current Speed</div>
                <div className="text-xl font-bold text-physics">{(currentSpeed ?? 0).toFixed(1)} m/s</div>
              </div>
              <div className="bg-physics/10 border border-physics/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Time</div>
                <div className="text-xl font-bold text-physics">{(activeProjectile.currentTime ?? 0).toFixed(2)} s</div>
              </div>
              <div className="bg-physics/10 border border-physics/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Current Height</div>
                <div className="text-xl font-bold text-physics">{(activeProjectile.y ?? 0).toFixed(1)} m</div>
              </div>
              <div className="bg-physics/10 border border-physics/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Vₓ / Vᵧ</div>
                <div className="text-lg font-bold text-physics">
                  {(activeProjectile.vx ?? 0).toFixed(1)} / {(activeProjectile.vy ?? 0).toFixed(1)}
                </div>
              </div>
              <div className="bg-physics/10 border border-physics/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Energy Lost</div>
                <div className="text-lg font-bold text-amber-500">
                  {(activeProjectile.energyLost ?? 0).toFixed(1)} J
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theoretical Predictions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Theoretical (No Air Drag)
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="flex items-center gap-2 text-sm">
                <Ruler className="h-4 w-4 text-orange-500" />
                Max Range
              </span>
              <span className="font-mono font-bold">{theoreticalRange.toFixed(1)} m</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="flex items-center gap-2 text-sm">
                <ArrowUp className="h-4 w-4 text-green-500" />
                Max Height
              </span>
              <span className="font-mono font-bold">{theoreticalMaxHeight.toFixed(1)} m</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-500" />
                Flight Time
              </span>
              <span className="font-mono font-bold">{theoreticalFlightTime.toFixed(2)} s</span>
            </div>
          </div>
        </div>

        {/* Last Result */}
        {lastLandedProjectile && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Actual Result (with drag)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/30 rounded">
                <span className="text-sm">Range</span>
                <div className="text-right">
                  <span className="font-mono font-bold">{lastLandedProjectile.range.toFixed(1)} m</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({((lastLandedProjectile.range / theoreticalRange) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/30 rounded">
                <span className="text-sm">Max Height</span>
                <span className="font-mono font-bold">{lastLandedProjectile.maxHeight.toFixed(1)} m</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/30 rounded">
                <span className="text-sm">Flight Time</span>
                <span className="font-mono font-bold">{lastLandedProjectile.flightTime.toFixed(2)} s</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-500/10 border border-red-500/30 rounded">
                <span className="flex items-center gap-2 text-sm">
                  <Flame className="h-4 w-4 text-red-500" />
                  Impact Velocity
                </span>
                <span className="font-mono font-bold text-red-500">
                  {lastLandedProjectile.impactVelocity.toFixed(1)} m/s
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-amber-500/10 border border-amber-500/30 rounded">
                <span className="text-sm">Total Energy Lost</span>
                <span className="font-mono font-bold text-amber-600">
                  {lastLandedProjectile.energyLost.toFixed(2)} J
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Energy */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Energy Analysis
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Kinetic Energy</span>
              <span className="font-mono">{kineticEnergy.toFixed(1)} J</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${(kineticEnergy / totalEnergy) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Potential Energy</span>
              <span className="font-mono">{potentialEnergy.toFixed(1)} J</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(potentialEnergy / totalEnergy) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm font-semibold pt-1 border-t">
              <span>Total Energy</span>
              <span className="font-mono">{totalEnergy.toFixed(1)} J</span>
            </div>
          </div>
        </div>

        {/* Formulas */}
        <div className="space-y-3 pt-2 border-t">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Key Formulas</h4>
          <div className="space-y-2 text-xs font-mono bg-muted/50 rounded-lg p-3">
            <div>x(t) = v₀·cos(θ)·t</div>
            <div>y(t) = h₀ + v₀·sin(θ)·t - ½gt²</div>
            <div>Range = v₀²·sin(2θ) / g</div>
            <div>Max H = h₀ + v₀²·sin²(θ) / 2g</div>
            <div className="pt-1 border-t border-muted">
              <div>F_drag = ½ρACᵈv²</div>
              <div>Energy_lost = F_drag · distance</div>
            </div>
          </div>
        </div>

        {/* Projectile History */}
        {projectiles.filter((p) => p.landed).length > 0 && (
          <div className="space-y-3 pt-2 border-t">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Launch History</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {projectiles
                .filter((p) => p.landed)
                .slice(-6)
                .reverse()
                .map((p, i) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between text-sm p-2 rounded"
                    style={{ backgroundColor: p.color + "20" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <span>#{projectiles.filter((pr) => pr.landed).length - i}</span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="font-mono">{p.range.toFixed(1)}m</span>
                      <span className="font-mono text-muted-foreground">{p.flightTime.toFixed(2)}s</span>
                      <span className="font-mono text-orange-500">{p.impactVelocity.toFixed(1)} m/s</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
