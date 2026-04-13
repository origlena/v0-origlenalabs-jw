"use client"

import { useState, useCallback, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectileCanvas } from "@/components/projectile-motion/projectile-canvas"
import { ControlPanel } from "@/components/projectile-motion/control-panel"
import { InfoPanel } from "@/components/projectile-motion/info-panel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Maximize2, Minimize2, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Projectile {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  initialX: number
  initialY: number
  initialVx: number
  initialVy: number
  trail: { x: number; y: number; vx: number; vy: number }[]
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

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"]

export default function ProjectileMotionPage() {
  const [angle, setAngle] = useState(45)
  const [velocity, setVelocity] = useState(30)
  const [gravity, setGravity] = useState(9.81)
  const [airResistance, setAirResistance] = useState(0.5)
  const [mass, setMass] = useState(1)
  const [height, setHeight] = useState(0)
  const [showTrail, setShowTrail] = useState(true)
  const [showVectors, setShowVectors] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [timeScale, setTimeScale] = useState(1)
  const [projectiles, setProjectiles] = useState<Projectile[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [projectileCount, setProjectileCount] = useState(0)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1280
      setIsMobile(mobile)
      if (mobile) {
        setShowLeftPanel(false)
        setShowRightPanel(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLaunch = useCallback(() => {
    const angleRad = (angle * Math.PI) / 180
    const vx = velocity * Math.cos(angleRad)
    const vy = velocity * Math.sin(angleRad)

    const newProjectile: Projectile = {
      id: Date.now(),
      x: 0,
      y: height,
      vx,
      vy,
      initialX: 0,
      initialY: height,
      initialVx: vx,
      initialVy: vy,
      trail: [{ x: 0, y: height, vx, vy }],
      color: COLORS[projectileCount % COLORS.length],
      active: true,
      landed: false,
      maxHeight: height,
      range: 0,
      flightTime: 0,
      currentTime: 0,
      spinRate: 3 + Math.random() * 4,
      impactVelocity: 0,
      energyLost: 0,
    }

    setProjectiles((prev) => [...prev, newProjectile])
    setProjectileCount((prev) => prev + 1)
    setIsPaused(false)
  }, [angle, velocity, height, projectileCount])

  const handleReset = useCallback(() => {
    setProjectiles([])
    setProjectileCount(0)
    setIsPaused(false)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={toggleFullscreen} className="bg-background/80 backdrop-blur">
            <Minimize2 className="h-5 w-5" />
          </Button>
          <Badge className="bg-physics text-lg px-4 py-2">Projectile Motion - Smartboard Mode</Badge>
        </div>
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <Button onClick={handleLaunch} className="bg-physics hover:bg-physics/90 h-14 px-8 text-xl">
            Launch
          </Button>
          <Button
            variant="outline"
            className="h-14 px-6 text-lg bg-background/80 backdrop-blur"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? "Play" : "Pause"}
          </Button>
          <Button variant="outline" className="h-14 px-6 text-lg bg-background/80 backdrop-blur" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div className="w-full h-full">
          <ProjectileCanvas
            angle={angle}
            velocity={velocity}
            gravity={gravity}
            airResistance={airResistance}
            mass={mass}
            height={height}
            showTrail={showTrail}
            showVectors={showVectors}
            showGrid={showGrid}
            isPaused={isPaused}
            projectiles={projectiles}
            setProjectiles={setProjectiles}
            onLaunch={handleLaunch}
            timeScale={timeScale}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navigation />

      <main className="flex-1 pt-16 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b bg-card/50 shrink-0">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/simulations">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Projectile Motion</h1>
                    <Badge className="bg-physics">Physics</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Explore trajectories with dynamic scaling - view adjusts to projectile range
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowLeftPanel(!showLeftPanel)}
                  className="hidden xl:flex"
                >
                  {showLeftPanel ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowRightPanel(!showRightPanel)}
                  className="hidden xl:flex"
                >
                  {showRightPanel ? <PanelRightClose className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Content - Updated layout with hideable panels */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Panel - Controls */}
          <div
            className={cn(
              "transition-all duration-300 ease-in-out z-20 border-r bg-background",
              showLeftPanel ? "w-80" : "w-0",
              isMobile && showLeftPanel && "absolute inset-y-0 left-0 shadow-xl",
            )}
          >
            {showLeftPanel && (
              <div className="h-full p-4 overflow-y-auto w-80">
                <ControlPanel
                  angle={angle}
                  setAngle={setAngle}
                  velocity={velocity}
                  setVelocity={setVelocity}
                  gravity={gravity}
                  setGravity={setGravity}
                  airResistance={airResistance}
                  setAirResistance={setAirResistance}
                  mass={mass}
                  setMass={setMass}
                  height={height}
                  setHeight={setHeight}
                  showTrail={showTrail}
                  setShowTrail={setShowTrail}
                  showVectors={showVectors}
                  setShowVectors={setShowVectors}
                  showGrid={showGrid}
                  setShowGrid={setShowGrid}
                  isPaused={isPaused}
                  setIsPaused={setIsPaused}
                  timeScale={timeScale}
                  setTimeScale={setTimeScale}
                  onLaunch={handleLaunch}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>

          {/* Toggle Left Panel Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-l-none shadow-md h-12 w-8 touch-manipulation xl:hidden",
              showLeftPanel ? "left-80" : "left-0",
            )}
            onClick={() => setShowLeftPanel(!showLeftPanel)}
          >
            {showLeftPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>

          {/* Center - Canvas */}
          <div className="flex-1 bg-card rounded-xl border-2 overflow-hidden m-2">
            <ProjectileCanvas
              angle={angle}
              velocity={velocity}
              gravity={gravity}
              airResistance={airResistance}
              mass={mass}
              height={height}
              showTrail={showTrail}
              showVectors={showVectors}
              showGrid={showGrid}
              isPaused={isPaused}
              projectiles={projectiles}
              setProjectiles={setProjectiles}
              onLaunch={handleLaunch}
              timeScale={timeScale}
            />
          </div>

          {/* Toggle Right Panel Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-r-none shadow-md h-12 w-8 touch-manipulation xl:hidden",
              showRightPanel ? "right-80" : "right-0",
            )}
            onClick={() => setShowRightPanel(!showRightPanel)}
          >
            {showRightPanel ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
          </Button>

          {/* Right Panel - Info */}
          <div
            className={cn(
              "transition-all duration-300 ease-in-out z-20 border-l bg-background",
              showRightPanel ? "w-80" : "w-0",
              isMobile && showRightPanel && "absolute inset-y-0 right-0 shadow-xl",
            )}
          >
            {showRightPanel && (
              <div className="h-full p-4 overflow-y-auto w-80">
                <InfoPanel
                  angle={angle}
                  velocity={velocity}
                  gravity={gravity}
                  airResistance={airResistance}
                  height={height}
                  projectiles={projectiles}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
