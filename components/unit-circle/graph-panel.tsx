"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart } from "lucide-react"

interface GraphPanelProps {
  angle: number
}

export function GraphPanel({ angle }: GraphPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeFunction, setActiveFunction] = useState<"sin" | "cos" | "tan">("sin")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerY = height / 2
    const padding = 40

    // Clear
    ctx.fillStyle = "rgba(15, 23, 42, 0.95)"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"
    ctx.lineWidth = 1
    for (let i = 0; i <= 8; i++) {
      const x = padding + (i / 8) * (width - 2 * padding)
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let i = 0; i <= 4; i++) {
      const y = (i / 4) * height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "rgba(148, 163, 184, 0.5)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(padding, centerY)
    ctx.lineTo(width - padding, centerY)
    ctx.stroke()

    // X-axis labels
    ctx.fillStyle = "rgba(148, 163, 184, 0.7)"
    ctx.font = "11px Inter, system-ui, sans-serif"
    ctx.textAlign = "center"
    const xLabels = ["0", "π/2", "π", "3π/2", "2π"]
    xLabels.forEach((label, i) => {
      const x = padding + (i / 4) * (width - 2 * padding)
      ctx.fillText(label, x, height - 10)
    })

    // Y-axis labels
    ctx.textAlign = "right"
    ctx.fillText("1", padding - 5, padding + 5)
    ctx.fillText("0", padding - 5, centerY + 5)
    ctx.fillText("-1", padding - 5, height - padding + 5)

    // Draw function
    const graphWidth = width - 2 * padding
    const graphHeight = (height - 2 * padding) / 2

    ctx.lineWidth = 3
    ctx.beginPath()

    for (let i = 0; i <= graphWidth; i++) {
      const t = (i / graphWidth) * 2 * Math.PI
      let value: number

      switch (activeFunction) {
        case "sin":
          ctx.strokeStyle = "#22c55e"
          value = Math.sin(t)
          break
        case "cos":
          ctx.strokeStyle = "#3b82f6"
          value = Math.cos(t)
          break
        case "tan":
          ctx.strokeStyle = "#ef4444"
          value = Math.tan(t)
          // Clamp tan values
          value = Math.max(-2, Math.min(2, value))
          break
      }

      const x = padding + i
      const y = centerY - value * graphHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        // For tan, don't draw lines across asymptotes
        if (activeFunction === "tan") {
          const prevT = ((i - 1) / graphWidth) * 2 * Math.PI
          const prevValue = Math.tan(prevT)
          if (Math.abs(value - prevValue) > 3) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        } else {
          ctx.lineTo(x, y)
        }
      }
    }
    ctx.stroke()

    // Draw current angle marker
    const markerX = padding + (angle / (2 * Math.PI)) * graphWidth
    let markerValue: number
    switch (activeFunction) {
      case "sin":
        markerValue = Math.sin(angle)
        break
      case "cos":
        markerValue = Math.cos(angle)
        break
      case "tan":
        markerValue = Math.max(-2, Math.min(2, Math.tan(angle)))
        break
    }
    const markerY = centerY - markerValue * graphHeight

    // Vertical line
    ctx.strokeStyle = "rgba(50, 184, 198, 0.5)"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(markerX, 0)
    ctx.lineTo(markerX, height)
    ctx.stroke()
    ctx.setLineDash([])

    // Marker point
    ctx.fillStyle = "#32b8c6"
    ctx.shadowColor = "#32b8c6"
    ctx.shadowBlur = 15
    ctx.beginPath()
    ctx.arc(markerX, markerY, 8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.shadowBlur = 0

    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(markerX, markerY, 4, 0, 2 * Math.PI)
    ctx.fill()
  }, [angle, activeFunction])

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            Function Graph
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant={activeFunction === "sin" ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setActiveFunction("sin")}
            >
              sin
            </Button>
            <Button
              variant={activeFunction === "cos" ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setActiveFunction("cos")}
            >
              cos
            </Button>
            <Button
              variant={activeFunction === "tan" ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setActiveFunction("tan")}
            >
              tan
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          width={500}
          height={200}
          className="w-full rounded-lg"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </CardContent>
    </Card>
  )
}
