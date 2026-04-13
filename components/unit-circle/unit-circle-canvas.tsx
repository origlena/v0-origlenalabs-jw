"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"

interface UnitCircleCanvasProps {
  angle: number
  setAngle: (angle: number) => void
  showTriangle: boolean
  showCoordinates: boolean
  showTangentLine: boolean
  useDegrees: boolean
  animating: boolean
}

export function UnitCircleCanvas({
  angle,
  setAngle,
  showTriangle,
  showCoordinates,
  showTangentLine,
  useDegrees,
}: UnitCircleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 })

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const size = Math.min(containerRef.current.offsetWidth, 600)
        setCanvasSize({ width: size, height: size })
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getAngleFromMouse = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const centerX = canvasSize.width / 2
      const centerY = canvasSize.height / 2

      const x = e.clientX - rect.left - centerX
      const y = -(e.clientY - rect.top - centerY) // Flip Y for math coordinates

      let newAngle = Math.atan2(y, x)
      if (newAngle < 0) newAngle += 2 * Math.PI

      setAngle(newAngle)
    },
    [canvasSize, setAngle],
  )

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    getAngleFromMouse(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      getAngleFromMouse(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvasSize.width
    const height = canvasSize.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.35

    // Clear canvas
    ctx.fillStyle = "rgba(15, 23, 42, 0.95)"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"
    ctx.lineWidth = 1
    const gridSize = radius / 4
    for (let i = -8; i <= 8; i++) {
      ctx.beginPath()
      ctx.moveTo(centerX + i * gridSize, 0)
      ctx.lineTo(centerX + i * gridSize, height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, centerY + i * gridSize)
      ctx.lineTo(width, centerY + i * gridSize)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "rgba(148, 163, 184, 0.6)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    // Draw axis labels
    ctx.fillStyle = "rgba(148, 163, 184, 0.8)"
    ctx.font = "bold 14px Inter, system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("x", width - 20, centerY - 10)
    ctx.fillText("y", centerX + 15, 20)

    // Draw unit circle
    ctx.strokeStyle = "#32b8c6"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Draw tick marks and values on circle
    ctx.fillStyle = "rgba(148, 163, 184, 0.7)"
    ctx.font = "12px Inter, system-ui, sans-serif"
    const tickAngles = [
      0,
      Math.PI / 6,
      Math.PI / 4,
      Math.PI / 3,
      Math.PI / 2,
      (2 * Math.PI) / 3,
      (3 * Math.PI) / 4,
      (5 * Math.PI) / 6,
      Math.PI,
      (7 * Math.PI) / 6,
      (5 * Math.PI) / 4,
      (4 * Math.PI) / 3,
      (3 * Math.PI) / 2,
      (5 * Math.PI) / 3,
      (7 * Math.PI) / 4,
      (11 * Math.PI) / 6,
    ]
    const tickLabels = useDegrees
      ? [
          "0°",
          "30°",
          "45°",
          "60°",
          "90°",
          "120°",
          "135°",
          "150°",
          "180°",
          "210°",
          "225°",
          "240°",
          "270°",
          "300°",
          "315°",
          "330°",
        ]
      : [
          "0",
          "π/6",
          "π/4",
          "π/3",
          "π/2",
          "2π/3",
          "3π/4",
          "5π/6",
          "π",
          "7π/6",
          "5π/4",
          "4π/3",
          "3π/2",
          "5π/3",
          "7π/4",
          "11π/6",
        ]

    tickAngles.forEach((tickAngle, i) => {
      const tickX = centerX + Math.cos(tickAngle) * radius
      const tickY = centerY - Math.sin(tickAngle) * radius

      // Draw small tick
      ctx.fillStyle = "#f97316"
      ctx.beginPath()
      ctx.arc(tickX, tickY, 4, 0, 2 * Math.PI)
      ctx.fill()

      // Draw label
      const labelRadius = radius + 25
      const labelX = centerX + Math.cos(tickAngle) * labelRadius
      const labelY = centerY - Math.sin(tickAngle) * labelRadius
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)"
      ctx.font = "11px Inter, system-ui, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(tickLabels[i], labelX, labelY)
    })

    // Draw quadrant labels
    ctx.font = "bold 16px Inter, system-ui, sans-serif"
    ctx.fillStyle = "rgba(34, 197, 94, 0.6)"
    ctx.fillText("I", centerX + radius * 0.5, centerY - radius * 0.5)
    ctx.fillText("All +", centerX + radius * 0.5, centerY - radius * 0.35)

    ctx.fillStyle = "rgba(168, 85, 247, 0.6)"
    ctx.fillText("II", centerX - radius * 0.5, centerY - radius * 0.5)
    ctx.fillText("Sin +", centerX - radius * 0.5, centerY - radius * 0.35)

    ctx.fillStyle = "rgba(249, 115, 22, 0.6)"
    ctx.fillText("III", centerX - radius * 0.5, centerY + radius * 0.5)
    ctx.fillText("Tan +", centerX - radius * 0.5, centerY + radius * 0.65)

    ctx.fillStyle = "rgba(59, 130, 246, 0.6)"
    ctx.fillText("IV", centerX + radius * 0.5, centerY + radius * 0.5)
    ctx.fillText("Cos +", centerX + radius * 0.5, centerY + radius * 0.65)

    // Calculate point on circle
    const pointX = centerX + Math.cos(angle) * radius
    const pointY = centerY - Math.sin(angle) * radius
    const cosValue = Math.cos(angle)
    const sinValue = Math.sin(angle)

    // Draw angle arc
    ctx.strokeStyle = "#a855f7"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.15, 0, -angle, true)
    ctx.stroke()

    // Draw angle label
    const arcLabelRadius = radius * 0.25
    const arcLabelAngle = angle / 2
    const arcLabelX = centerX + Math.cos(arcLabelAngle) * arcLabelRadius
    const arcLabelY = centerY - Math.sin(arcLabelAngle) * arcLabelRadius
    ctx.fillStyle = "#a855f7"
    ctx.font = "bold 14px Inter, system-ui, sans-serif"
    const angleLabel = useDegrees ? `${Math.round((angle * 180) / Math.PI)}°` : `${(angle / Math.PI).toFixed(2)}π`
    ctx.fillText(angleLabel, arcLabelX, arcLabelY)

    // Draw triangle if enabled
    if (showTriangle) {
      // Cosine line (horizontal)
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(pointX, centerY)
      ctx.stroke()

      // Sine line (vertical)
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(pointX, centerY)
      ctx.lineTo(pointX, pointY)
      ctx.stroke()

      // Hypotenuse (radius)
      ctx.strokeStyle = "#f97316"
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(pointX, pointY)
      ctx.stroke()
      ctx.setLineDash([])

      // Right angle marker
      const markerSize = 10
      ctx.strokeStyle = "rgba(148, 163, 184, 0.6)"
      ctx.lineWidth = 2
      ctx.beginPath()
      if (cosValue >= 0) {
        ctx.moveTo(pointX - markerSize, centerY)
        ctx.lineTo(pointX - markerSize, centerY + (sinValue >= 0 ? -markerSize : markerSize))
        ctx.lineTo(pointX, centerY + (sinValue >= 0 ? -markerSize : markerSize))
      } else {
        ctx.moveTo(pointX + markerSize, centerY)
        ctx.lineTo(pointX + markerSize, centerY + (sinValue >= 0 ? -markerSize : markerSize))
        ctx.lineTo(pointX, centerY + (sinValue >= 0 ? -markerSize : markerSize))
      }
      ctx.stroke()

      // Labels for sides
      ctx.font = "bold 14px Inter, system-ui, sans-serif"
      ctx.textAlign = "center"

      // Cosine label
      ctx.fillStyle = "#3b82f6"
      ctx.fillText(`cos = ${cosValue.toFixed(3)}`, (centerX + pointX) / 2, centerY + (sinValue >= 0 ? 20 : -10))

      // Sine label
      ctx.fillStyle = "#22c55e"
      ctx.save()
      ctx.translate(pointX + (cosValue >= 0 ? 50 : -50), (centerY + pointY) / 2)
      ctx.fillText(`sin = ${sinValue.toFixed(3)}`, 0, 0)
      ctx.restore()
    }

    // Draw tangent line if enabled
    if (showTangentLine && Math.abs(cosValue) > 0.01) {
      const tanValue = sinValue / cosValue
      const tangentEndY = centerY - tanValue * radius

      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX + radius, centerY)
      ctx.lineTo(centerX + radius, tangentEndY)
      ctx.stroke()

      // Tangent label
      ctx.fillStyle = "#ef4444"
      ctx.font = "bold 12px Inter, system-ui, sans-serif"
      const tanDisplay = Math.abs(tanValue) > 100 ? "∞" : tanValue.toFixed(3)
      ctx.fillText(`tan = ${tanDisplay}`, centerX + radius + 40, (centerY + tangentEndY) / 2)

      // Connecting line to tangent point
      ctx.strokeStyle = "rgba(239, 68, 68, 0.4)"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(pointX, pointY)
      ctx.lineTo(centerX + radius, tangentEndY)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw coordinates if enabled
    if (showCoordinates) {
      // Dotted lines to axes
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])

      // To X axis
      ctx.beginPath()
      ctx.moveTo(pointX, pointY)
      ctx.lineTo(pointX, centerY)
      ctx.stroke()

      // To Y axis
      ctx.beginPath()
      ctx.moveTo(pointX, pointY)
      ctx.lineTo(centerX, pointY)
      ctx.stroke()
      ctx.setLineDash([])

      // Coordinate values on axes
      ctx.fillStyle = "#3b82f6"
      ctx.font = "bold 12px Inter, system-ui, sans-serif"
      ctx.fillText(cosValue.toFixed(2), pointX, centerY + 20)

      ctx.fillStyle = "#22c55e"
      ctx.fillText(sinValue.toFixed(2), centerX - 30, pointY + 5)
    }

    // Draw point on circle
    ctx.fillStyle = "#32b8c6"
    ctx.shadowColor = "#32b8c6"
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(pointX, pointY, 12, 0, 2 * Math.PI)
    ctx.fill()
    ctx.shadowBlur = 0

    // Inner point
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(pointX, pointY, 6, 0, 2 * Math.PI)
    ctx.fill()

    // Coordinate label at point
    ctx.fillStyle = "#fff"
    ctx.font = "bold 13px Inter, system-ui, sans-serif"
    ctx.textAlign = "left"
    const coordText = `(${cosValue.toFixed(2)}, ${sinValue.toFixed(2)})`
    const labelOffsetX = cosValue >= 0 ? 20 : -90
    const labelOffsetY = sinValue >= 0 ? -20 : 25
    ctx.fillText(coordText, pointX + labelOffsetX, pointY + labelOffsetY)

    // Draw center point
    ctx.fillStyle = "#f97316"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI)
    ctx.fill()
  }, [angle, canvasSize, showTriangle, showCoordinates, showTangentLine, useDegrees])

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="rounded-xl cursor-crosshair touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
