"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface GraphProps {
  voltage: number
  current: number
  resistance: number
}

export function VoltageCurrentGraph({ voltage, current, resistance }: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener("resize", resize)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const padding = 40

    ctx.clearRect(0, 0, width, height)

    // Draw axes
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 2

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.stroke()

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Labels
    ctx.fillStyle = "#f1f5f9"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // X-axis label
    ctx.fillText("Voltage (V)", width / 2, height - 10)

    // Y-axis label
    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Current (A)", 0, 0)
    ctx.restore()

    // Draw grid
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 1

    for (let i = 1; i <= 5; i++) {
      const x = padding + (i * (width - padding * 2)) / 5
      const y = padding + (i * (height - padding * 2)) / 5

      // Vertical grid lines
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()

      // Horizontal grid lines
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw V = I × R line (for current resistance)
    const maxVoltage = 24
    const maxCurrent = maxVoltage / resistance

    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()

    for (let v = 0; v <= maxVoltage; v += 0.5) {
      const i = v / resistance
      const x = padding + (v / maxVoltage) * (width - padding * 2)
      const y = height - padding - (i / maxCurrent) * (height - padding * 2)

      if (v === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw current point
    const currentX = padding + (voltage / maxVoltage) * (width - padding * 2)
    const currentY = height - padding - (current / maxCurrent) * (height - padding * 2)

    // Glow effect
    const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 15)
    gradient.addColorStop(0, "rgba(34, 197, 94, 0.8)")
    gradient.addColorStop(1, "rgba(34, 197, 94, 0)")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(currentX, currentY, 15, 0, Math.PI * 2)
    ctx.fill()

    // Point
    ctx.fillStyle = "#22c55e"
    ctx.beginPath()
    ctx.arc(currentX, currentY, 6, 0, Math.PI * 2)
    ctx.fill()

    // Point label
    ctx.fillStyle = "#f1f5f9"
    ctx.font = "bold 11px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText(`(${voltage.toFixed(1)}V, ${current.toFixed(2)}A)`, currentX + 10, currentY - 10)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [voltage, current, resistance])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-physics" />
          V-I Characteristic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full" style={{ width: "100%", height: "300px" }} />
        <p className="text-xs text-muted-foreground text-center mt-2">
          Linear relationship: For R = {resistance}Ω, the current increases proportionally with voltage
        </p>
      </CardContent>
    </Card>
  )
}
