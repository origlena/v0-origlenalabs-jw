"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SimulationPageWrapperProps {
  children: ReactNode
  isFullscreen?: boolean
  className?: string
}

/**
 * Top-level wrapper for all simulation pages
 * Provides consistent background, spacing, and structure
 */
export function SimulationPageWrapper({
  children,
  isFullscreen = false,
  className,
}: SimulationPageWrapperProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background flex flex-col",
        isFullscreen && "fixed inset-0 z-50",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface SimulationHeaderProps {
  title: string
  description?: string
  subtitle?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
}

/**
 * Simulation page header with title and metadata
 */
export function SimulationHeader({ title, description, subtitle, difficulty }: SimulationHeaderProps) {
  return (
    <div className="border-b bg-card/50 backdrop-blur px-4 py-6 sticky top-[60px] z-40">
      <div className="container mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>}
            {description && <p className="text-base text-foreground/80 max-w-2xl">{description}</p>}
          </div>
          {difficulty && (
            <div className="flex-shrink-0">
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-sm font-medium",
                  difficulty === "beginner" && "bg-green-500/20 text-green-700 dark:text-green-400",
                  difficulty === "intermediate" &&
                    "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
                  difficulty === "advanced" && "bg-red-500/20 text-red-700 dark:text-red-400",
                )}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface SimulationCanvasContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Container for 3D canvas/visualization area
 * Handles responsive sizing and proper overflow
 */
export function SimulationCanvasContainer({ children, className }: SimulationCanvasContainerProps) {
  return (
    <div className={cn("flex-1 relative bg-muted/30 overflow-hidden", className)}>
      {children}
    </div>
  )
}

interface SimulationMainLayoutProps {
  canvas: ReactNode
  controls?: ReactNode
  info?: ReactNode
  showLeftPanel?: boolean
  showRightPanel?: boolean
  isMobile?: boolean
  isFullscreen?: boolean
}

/**
 * Main layout for simulation with canvas, controls, and info panels
 * Responsive layout that handles panel visibility
 */
export function SimulationMainLayout({
  canvas,
  controls,
  info,
  showLeftPanel = true,
  showRightPanel = true,
  isMobile = false,
  isFullscreen = false,
}: SimulationMainLayoutProps) {
  if (isFullscreen) {
    return <div className="flex-1 relative w-full h-full">{canvas}</div>
  }

  if (isMobile) {
    return (
      <div className="flex-1 flex flex-col">
        <SimulationCanvasContainer>{canvas}</SimulationCanvasContainer>
        {controls && <div className="border-t bg-card/50 p-4 overflow-y-auto max-h-48">{controls}</div>}
        {info && <div className="border-t bg-card/50 p-4 overflow-y-auto max-h-48">{info}</div>}
      </div>
    )
  }

  return (
    <div className="flex-1 flex gap-0">
      {/* Left Panel (Controls) */}
      {showLeftPanel && controls && (
        <div className="w-80 border-r bg-card/30 backdrop-blur flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">{controls}</div>
        </div>
      )}

      {/* Canvas */}
      <SimulationCanvasContainer>{canvas}</SimulationCanvasContainer>

      {/* Right Panel (Info) */}
      {showRightPanel && info && (
        <div className="w-72 border-l bg-card/30 backdrop-blur flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">{info}</div>
        </div>
      )}
    </div>
  )
}

