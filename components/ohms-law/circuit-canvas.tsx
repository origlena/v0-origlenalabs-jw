"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface BulbState {
  id: number
  maxWattage: number
  isBurst: boolean
  label: string
}

interface CircuitCanvasProps {
  voltage: number
  resistance: number
  current: number
  power: number
  animationSpeed: number
  selectedBulb: number
  onBulbBurst: (bulbId: number) => void
}

export function CircuitCanvas({
  voltage,
  resistance,
  current,
  power,
  animationSpeed,
  selectedBulb,
  onBulbBurst,
}: CircuitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const electronsRef = useRef<Array<{ x: number; y: number; progress: number }>>([])
  const sparkParticlesRef = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; life: number; bulbId: number }>
  >([])
  const burstTimeRef = useRef<Record<number, number>>({})

  const bulbs: BulbState[] = [
    { id: 1, maxWattage: 5, isBurst: false, label: "5W" }, // Low power - night light
    { id: 2, maxWattage: 15, isBurst: false, label: "15W" }, // Medium - LED bulb
    { id: 3, maxWattage: 40, isBurst: false, label: "40W" }, // Higher - standard bulb
    { id: 4, maxWattage: 100, isBurst: false, label: "100W" }, // Most powerful - high wattage
  ]

  const [bulbStates, setBulbStates] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
  })

  // Check for bulb bursts
  useEffect(() => {
    const currentBulb = bulbs.find((b) => b.id === selectedBulb)
    if (currentBulb && power > currentBulb.maxWattage * 1.5 && !bulbStates[selectedBulb]) {
      // Bulb bursts when power exceeds 150% of rating
      setBulbStates((prev) => ({ ...prev, [selectedBulb]: true }))
      onBulbBurst(selectedBulb)
      burstTimeRef.current[selectedBulb] = Date.now()

      // Create spark particles for burst effect
      const canvas = canvasRef.current
      if (canvas) {
        const width = canvas.offsetWidth
        const height = canvas.offsetHeight
        const bulbX = width / 2
        const bulbY = height / 2

        for (let i = 0; i < 30; i++) {
          const angle = (Math.PI * 2 * i) / 30
          const speed = 3 + Math.random() * 5
          sparkParticlesRef.current.push({
            x: bulbX,
            y: bulbY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            bulbId: selectedBulb,
          })
        }
      }
    }
  }, [power, selectedBulb, bulbStates, onBulbBurst])

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

    // Initialize more electrons for visibility on large screens
    if (electronsRef.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        electronsRef.current.push({
          x: 0,
          y: 0,
          progress: i / 40,
        })
      }
    }

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.clearRect(0, 0, width, height)

      const scale = Math.min(width, height) / 600
      const centerX = width / 2
      const centerY = height / 2
      const circuitWidth = Math.min(width * 0.85, 900)
      const circuitHeight = Math.min(height * 0.7, 500)

      const left = centerX - circuitWidth / 2
      const right = centerX + circuitWidth / 2
      const top = centerY - circuitHeight / 2
      const bottom = centerY + circuitHeight / 2

      // Draw circuit wires - thicker for smartboard
      ctx.strokeStyle = "#64748b"
      ctx.lineWidth = 12 * scale
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.beginPath()
      ctx.moveTo(left, top)
      ctx.lineTo(right, top)
      ctx.lineTo(right, bottom)
      ctx.lineTo(left, bottom)
      ctx.lineTo(left, top)
      ctx.stroke()

      const batteryX = left - 20
      const batteryY = centerY
      const batteryHeight = 140 * scale
      const batteryWidth = 80 * scale

      // Battery body
      ctx.fillStyle = "#1e293b"
      ctx.strokeStyle = "#475569"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.roundRect(batteryX - batteryWidth / 2, batteryY - batteryHeight / 2, batteryWidth, batteryHeight, 8)
      ctx.fill()
      ctx.stroke()

      // Battery positive terminal
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.roundRect(batteryX - 15, batteryY - batteryHeight / 2 - 25, 30, 25, [8, 8, 0, 0])
      ctx.fill()
      ctx.fillStyle = "#fca5a5"
      ctx.font = `bold ${24 * scale}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText("+", batteryX, batteryY - batteryHeight / 2 - 8)

      // Battery negative terminal
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.roundRect(batteryX - 15, batteryY + batteryHeight / 2, 30, 25, [0, 0, 8, 8])
      ctx.fill()
      ctx.fillStyle = "#93c5fd"
      ctx.fillText("−", batteryX, batteryY + batteryHeight / 2 + 18)

      // Battery charge indicator
      const chargeLevel = voltage / 24
      ctx.fillStyle = `hsl(${120 * chargeLevel}, 70%, 50%)`
      const chargeHeight = (batteryHeight - 20) * chargeLevel
      ctx.fillRect(
        batteryX - batteryWidth / 2 + 10,
        batteryY + batteryHeight / 2 - 10 - chargeHeight,
        batteryWidth - 20,
        chargeHeight,
      )

      // Voltage label - larger for smartboard
      ctx.fillStyle = "#f1f5f9"
      ctx.font = `bold ${32 * scale}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText(`${voltage.toFixed(1)}V`, batteryX, batteryY - batteryHeight / 2 - 50)

      const bulbSpacing = circuitHeight / 5
      const bulbStartY = top + bulbSpacing
      const currentBulb = bulbs.find((b) => b.id === selectedBulb)!
      const isBurst = bulbStates[selectedBulb]

      bulbs.forEach((bulb, index) => {
        const bulbY = bulbStartY + index * bulbSpacing
        const bulbX = right + 40
        const bulbRadius = 35 * scale
        const isSelected = bulb.id === selectedBulb
        const isThisBurst = bulbStates[bulb.id]

        // Calculate glow intensity for this bulb if selected
        let glowIntensity = 0
        if (isSelected && !isThisBurst) {
          const powerRatio = power / bulb.maxWattage
          glowIntensity = Math.min(powerRatio, 1.5)
        }

        // Bulb socket
        ctx.fillStyle = "#374151"
        ctx.beginPath()
        ctx.roundRect(bulbX - 18, bulbY + bulbRadius - 5, 36, 30, [0, 0, 8, 8])
        ctx.fill()

        // Socket threads
        ctx.strokeStyle = "#9ca3af"
        ctx.lineWidth = 2
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(bulbX - 15, bulbY + bulbRadius + 5 + i * 8)
          ctx.lineTo(bulbX + 15, bulbY + bulbRadius + 5 + i * 8)
          ctx.stroke()
        }

        if (isThisBurst) {
          ctx.fillStyle = "#1f2937"
          ctx.beginPath()
          ctx.arc(bulbX, bulbY, bulbRadius, 0, Math.PI * 2)
          ctx.fill()

          // Crack lines
          ctx.strokeStyle = "#4b5563"
          ctx.lineWidth = 2
          for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.3
            ctx.beginPath()
            ctx.moveTo(bulbX, bulbY)
            ctx.lineTo(bulbX + Math.cos(angle) * bulbRadius * 0.9, bulbY + Math.sin(angle) * bulbRadius * 0.9)
            ctx.stroke()
          }

          // Smoke effect
          const smokeTime = (Date.now() - (burstTimeRef.current[bulb.id] || 0)) / 1000
          if (smokeTime < 3) {
            ctx.fillStyle = `rgba(100, 100, 100, ${0.3 * (1 - smokeTime / 3)})`
            for (let i = 0; i < 5; i++) {
              const smokeY = bulbY - bulbRadius - smokeTime * 30 - i * 15
              const smokeX = bulbX + Math.sin(smokeTime * 3 + i) * 10
              ctx.beginPath()
              ctx.arc(smokeX, smokeY, 10 + i * 3, 0, Math.PI * 2)
              ctx.fill()
            }
          }

          // X mark
          ctx.strokeStyle = "#ef4444"
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(bulbX - 15, bulbY - 15)
          ctx.lineTo(bulbX + 15, bulbY + 15)
          ctx.moveTo(bulbX + 15, bulbY - 15)
          ctx.lineTo(bulbX - 15, bulbY + 15)
          ctx.stroke()
        } else {
          // Outer glow when lit
          if (isSelected && glowIntensity > 0) {
            const glowColor =
              glowIntensity > 1
                ? `rgba(255, ${Math.max(0, 200 - (glowIntensity - 1) * 200)}, 0, ${0.4 * glowIntensity})`
                : `rgba(255, 255, 100, ${0.3 * glowIntensity})`

            const glowRadius = bulbRadius * (1.5 + glowIntensity * 0.5)
            const gradient = ctx.createRadialGradient(bulbX, bulbY, 0, bulbX, bulbY, glowRadius)
            gradient.addColorStop(0, glowColor)
            gradient.addColorStop(0.5, glowColor.replace(/[\d.]+\)$/, `${0.2 * glowIntensity})`))
            gradient.addColorStop(1, "rgba(255, 255, 100, 0)")
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(bulbX, bulbY, glowRadius, 0, Math.PI * 2)
            ctx.fill()

            // Warning pulse when near max
            if (glowIntensity > 0.8) {
              const pulse = Math.sin(Date.now() / 100) * 0.5 + 0.5
              ctx.strokeStyle = `rgba(255, 100, 0, ${pulse * (glowIntensity - 0.8) * 2})`
              ctx.lineWidth = 3
              ctx.beginPath()
              ctx.arc(bulbX, bulbY, bulbRadius + 10 + pulse * 5, 0, Math.PI * 2)
              ctx.stroke()
            }
          }

          // Bulb glass
          const bulbGradient = ctx.createRadialGradient(
            bulbX - bulbRadius * 0.3,
            bulbY - bulbRadius * 0.3,
            0,
            bulbX,
            bulbY,
            bulbRadius,
          )

          if (isSelected && glowIntensity > 0) {
            const warmth = Math.min(glowIntensity, 1)
            bulbGradient.addColorStop(0, `rgba(255, ${255 - warmth * 55}, ${200 - warmth * 150}, 1)`)
            bulbGradient.addColorStop(0.7, `rgba(255, ${220 - warmth * 70}, ${150 - warmth * 100}, 0.9)`)
            bulbGradient.addColorStop(1, `rgba(200, ${180 - warmth * 80}, ${100 - warmth * 50}, 0.8)`)
          } else {
            bulbGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
            bulbGradient.addColorStop(0.7, "rgba(220, 220, 230, 0.8)")
            bulbGradient.addColorStop(1, "rgba(180, 180, 190, 0.7)")
          }

          ctx.fillStyle = bulbGradient
          ctx.beginPath()
          ctx.arc(bulbX, bulbY, bulbRadius, 0, Math.PI * 2)
          ctx.fill()

          // Bulb outline
          ctx.strokeStyle = isSelected ? "#32b8c6" : "#94a3b8"
          ctx.lineWidth = isSelected ? 4 : 2
          ctx.stroke()

          // Filament
          if (isSelected && glowIntensity > 0) {
            ctx.strokeStyle = `rgba(255, ${200 - glowIntensity * 100}, 0, ${0.5 + glowIntensity * 0.5})`
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(bulbX - 10, bulbY + 15)
            ctx.quadraticCurveTo(bulbX - 5, bulbY - 10, bulbX, bulbY + 5)
            ctx.quadraticCurveTo(bulbX + 5, bulbY - 10, bulbX + 10, bulbY + 15)
            ctx.stroke()
          } else {
            ctx.strokeStyle = "#6b7280"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(bulbX - 10, bulbY + 15)
            ctx.quadraticCurveTo(bulbX - 5, bulbY - 10, bulbX, bulbY + 5)
            ctx.quadraticCurveTo(bulbX + 5, bulbY - 10, bulbX + 10, bulbY + 15)
            ctx.stroke()
          }
        }

        // Bulb label
        ctx.fillStyle = isSelected ? "#32b8c6" : "#94a3b8"
        ctx.font = `bold ${24 * scale}px sans-serif`
        ctx.textAlign = "center"
        ctx.fillText(bulb.label, bulbX, bulbY + bulbRadius + 55)

        // Status indicator
        if (isSelected) {
          ctx.fillStyle = isThisBurst ? "#ef4444" : "#22c55e"
          ctx.beginPath()
          ctx.arc(bulbX + bulbRadius + 15, bulbY - bulbRadius, 8, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      const selectedBulbY = bulbStartY + (selectedBulb - 1) * bulbSpacing
      ctx.strokeStyle = "#64748b"
      ctx.lineWidth = 8 * scale
      ctx.beginPath()
      ctx.moveTo(right, selectedBulbY)
      ctx.lineTo(right + 40 - 35 * scale, selectedBulbY)
      ctx.stroke()

      // Draw Ammeter (top center) - larger for smartboard
      const ammeterX = centerX
      const ammeterY = top - 30
      const meterRadius = 50 * scale

      ctx.fillStyle = "#0f172a"
      ctx.beginPath()
      ctx.arc(ammeterX, ammeterY, meterRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 4
      ctx.stroke()

      // Ammeter dial
      const ammeterAngle = -Math.PI * 0.75 + (current / 2) * Math.PI * 1.5
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(ammeterX, ammeterY)
      ctx.lineTo(
        ammeterX + Math.cos(ammeterAngle) * meterRadius * 0.7,
        ammeterY + Math.sin(ammeterAngle) * meterRadius * 0.7,
      )
      ctx.stroke()

      ctx.fillStyle = "#22c55e"
      ctx.font = `bold ${28 * scale}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText("A", ammeterX, ammeterY - 10)
      ctx.fillStyle = "#f1f5f9"
      ctx.font = `bold ${22 * scale}px sans-serif`
      ctx.fillText(`${current.toFixed(3)}A`, ammeterX, ammeterY + 18)

      // Draw Voltmeter (bottom center) - larger for smartboard
      const voltmeterX = centerX
      const voltmeterY = bottom + 30

      ctx.fillStyle = "#0f172a"
      ctx.beginPath()
      ctx.arc(voltmeterX, voltmeterY, meterRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 4
      ctx.stroke()

      // Voltmeter dial
      const voltmeterAngle = -Math.PI * 0.75 + (voltage / 24) * Math.PI * 1.5
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(voltmeterX, voltmeterY)
      ctx.lineTo(
        voltmeterX + Math.cos(voltmeterAngle) * meterRadius * 0.7,
        voltmeterY + Math.sin(voltmeterAngle) * meterRadius * 0.7,
      )
      ctx.stroke()

      ctx.fillStyle = "#3b82f6"
      ctx.font = `bold ${28 * scale}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText("V", voltmeterX, voltmeterY - 10)
      ctx.fillStyle = "#f1f5f9"
      ctx.font = `bold ${22 * scale}px sans-serif`
      ctx.fillText(`${voltage.toFixed(1)}V`, voltmeterX, voltmeterY + 18)

      const powerMeterX = centerX
      const powerMeterY = centerY
      const powerMeterRadius = 70 * scale

      // Power meter background
      ctx.fillStyle = "#0f172a"
      ctx.beginPath()
      ctx.arc(powerMeterX, powerMeterY, powerMeterRadius, 0, Math.PI * 2)
      ctx.fill()

      // Power level arc
      const maxPowerDisplay = currentBulb.maxWattage * 2
      const powerRatio = Math.min(power / maxPowerDisplay, 1)
      const startAngle = Math.PI * 0.75
      const endAngle = startAngle + powerRatio * Math.PI * 1.5

      // Background arc
      ctx.strokeStyle = "#374151"
      ctx.lineWidth = 12
      ctx.beginPath()
      ctx.arc(powerMeterX, powerMeterY, powerMeterRadius - 15, Math.PI * 0.75, Math.PI * 2.25)
      ctx.stroke()

      // Power arc with color based on level
      const powerColor =
        power > currentBulb.maxWattage * 1.2 ? "#ef4444" : power > currentBulb.maxWattage * 0.8 ? "#f59e0b" : "#22c55e"
      ctx.strokeStyle = powerColor
      ctx.lineWidth = 12
      ctx.beginPath()
      ctx.arc(powerMeterX, powerMeterY, powerMeterRadius - 15, startAngle, endAngle)
      ctx.stroke()

      // Power value
      ctx.fillStyle = powerColor
      ctx.font = `bold ${32 * scale}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText(`${power.toFixed(2)}W`, powerMeterX, powerMeterY + 5)
      ctx.fillStyle = "#94a3b8"
      ctx.font = `${18 * scale}px sans-serif`
      ctx.fillText("POWER", powerMeterX, powerMeterY + 30)

      // Max power indicator
      ctx.fillStyle = "#64748b"
      ctx.font = `${16 * scale}px sans-serif`
      ctx.fillText(`Max: ${currentBulb.maxWattage}W`, powerMeterX, powerMeterY - 25)

      ctx.strokeStyle = powerColor
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(powerMeterX, powerMeterY, powerMeterRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Animate electrons - more visible on large screens
      if (!isBurst) {
        const speed = 0.0008 * animationSpeed * Math.min(current * 10, 5)

        electronsRef.current.forEach((electron) => {
          electron.progress += speed
          if (electron.progress >= 1) electron.progress = 0

          const totalPerimeter = (circuitWidth + circuitHeight) * 2
          const distance = electron.progress * totalPerimeter

          if (distance < circuitWidth) {
            electron.x = left + distance
            electron.y = top
          } else if (distance < circuitWidth + circuitHeight) {
            electron.x = right
            electron.y = top + (distance - circuitWidth)
          } else if (distance < circuitWidth * 2 + circuitHeight) {
            electron.x = right - (distance - circuitWidth - circuitHeight)
            electron.y = bottom
          } else {
            electron.x = left
            electron.y = bottom - (distance - circuitWidth * 2 - circuitHeight)
          }

          // Draw electron - larger for smartboard
          const electronRadius = 12 * scale
          const gradient = ctx.createRadialGradient(electron.x, electron.y, 0, electron.x, electron.y, electronRadius)
          gradient.addColorStop(0, "#93c5fd")
          gradient.addColorStop(0.5, "#3b82f6")
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(electron.x, electron.y, electronRadius, 0, Math.PI * 2)
          ctx.fill()

          // Electron trail
          ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(electron.x, electron.y, electronRadius * 0.5, 0, Math.PI * 2)
          ctx.stroke()
        })
      }

      sparkParticlesRef.current = sparkParticlesRef.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1 // gravity
        particle.life -= 0.02

        if (particle.life > 0) {
          const sparkGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 5)
          sparkGradient.addColorStop(0, `rgba(255, 200, 50, ${particle.life})`)
          sparkGradient.addColorStop(1, `rgba(255, 100, 0, 0)`)
          ctx.fillStyle = sparkGradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2)
          ctx.fill()
          return true
        }
        return false
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [voltage, resistance, current, power, animationSpeed, selectedBulb, bulbStates])

  // Reset bulb state function exposed via ref
  const resetBulb = useCallback((bulbId: number) => {
    setBulbStates((prev) => ({ ...prev, [bulbId]: false }))
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
      {/* Reset burst bulbs button */}
      {Object.values(bulbStates).some((b) => b) && (
        <button
          onClick={() => setBulbStates({ 1: false, 2: false, 3: false, 4: false })}
          className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
        >
          Replace Burst Bulbs
        </button>
      )}
    </div>
  )
}
