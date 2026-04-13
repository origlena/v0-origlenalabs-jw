"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"

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

interface ProjectileCanvasProps {
  angle: number
  velocity: number
  gravity: number
  airResistance: number
  mass: number
  height: number
  showTrail: boolean
  showVectors: boolean
  showGrid: boolean
  isPaused: boolean
  projectiles: Projectile[]
  setProjectiles: React.Dispatch<React.SetStateAction<Projectile[]>>
  onLaunch: () => void
  timeScale: number
}

export function ProjectileCanvas({
  angle,
  velocity,
  gravity,
  airResistance,
  mass,
  height,
  showTrail,
  showVectors,
  showGrid,
  isPaused,
  projectiles,
  setProjectiles,
  timeScale,
}: ProjectileCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 1400, height: 800 })

  const [dynamicViewRange, setDynamicViewRange] = useState(100)

  const calculateMaxRange = useCallback(() => {
    const angleRad = (angle * Math.PI) / 180
    const v0x = velocity * Math.cos(angleRad)
    const v0y = velocity * Math.sin(angleRad)

    // Calculate time of flight with initial height
    // y = h + v0y*t - 0.5*g*t² = 0
    // Using quadratic formula: t = (v0y + sqrt(v0y² + 2*g*h)) / g
    const discriminant = v0y * v0y + 2 * gravity * height
    const flightTime = discriminant >= 0 ? (v0y + Math.sqrt(discriminant)) / gravity : (2 * v0y) / gravity
    const theoreticalRange = Math.abs(v0x * Math.max(flightTime, 1))

    return theoreticalRange
  }, [angle, velocity, gravity, height])

  const getViewRange = useCallback(() => {
    // Find the furthest projectile position
    let maxProjectileX = 0
    projectiles.forEach((proj) => {
      if (proj.x > maxProjectileX) maxProjectileX = proj.x
      if (proj.range > maxProjectileX) maxProjectileX = proj.range
    })

    const theoreticalRange = calculateMaxRange()
    const neededRange = Math.max(maxProjectileX, theoreticalRange) * 1.1 // 10% padding

    // Default is 100m, expand in 10m increments when needed
    if (neededRange <= 100) return 100

    // Round up to nearest 10m increment
    return Math.ceil(neededRange / 10) * 10
  }, [calculateMaxRange, projectiles])

  const viewRange = getViewRange()

  useEffect(() => {
    const newRange = getViewRange()
    if (newRange > dynamicViewRange) {
      setDynamicViewRange(newRange)
    }
  }, [projectiles, getViewRange, dynamicViewRange])

  const groundY = dimensions.height - 120
  const launchX = 100

  const scale = (dimensions.width - launchX - 80) / viewRange

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement
        if (parent) {
          setDimensions({
            width: Math.max(1200, parent.clientWidth),
            height: Math.max(600, parent.clientHeight),
          })
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const drawCannon = useCallback(
    (ctx: CanvasRenderingContext2D, cannonX: number, cannonY: number) => {
      ctx.save()
      ctx.translate(cannonX, cannonY)

      // Platform shadow
      ctx.fillStyle = "rgba(0,0,0,0.4)"
      ctx.beginPath()
      ctx.ellipse(0, 35, 55, 15, 0, 0, Math.PI * 2)
      ctx.fill()

      // Platform base with 3D gradient
      const platformGrad = ctx.createLinearGradient(-50, 0, 50, 0)
      platformGrad.addColorStop(0, "#1a1a2e")
      platformGrad.addColorStop(0.3, "#4a4a6a")
      platformGrad.addColorStop(0.5, "#5a5a7a")
      platformGrad.addColorStop(0.7, "#4a4a6a")
      platformGrad.addColorStop(1, "#1a1a2e")
      ctx.fillStyle = platformGrad
      ctx.beginPath()
      ctx.roundRect(-50, -8, 100, 40, 8)
      ctx.fill()

      // Wheels
      const drawWheel = (wx: number) => {
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.beginPath()
        ctx.ellipse(wx + 3, 35, 20, 8, 0, 0, Math.PI * 2)
        ctx.fill()

        const wheelGrad = ctx.createRadialGradient(wx - 5, 28, 0, wx, 30, 22)
        wheelGrad.addColorStop(0, "#4a4a4a")
        wheelGrad.addColorStop(0.5, "#2a2a2a")
        wheelGrad.addColorStop(1, "#1a1a1a")
        ctx.fillStyle = wheelGrad
        ctx.beginPath()
        ctx.arc(wx, 30, 20, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = "#666"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(wx, 30, 20, 0, Math.PI * 2)
        ctx.stroke()

        // Spokes
        ctx.strokeStyle = "#555"
        ctx.lineWidth = 2
        for (let i = 0; i < 6; i++) {
          const spokeAngle = (i / 6) * Math.PI * 2
          ctx.beginPath()
          ctx.moveTo(wx, 30)
          ctx.lineTo(wx + Math.cos(spokeAngle) * 15, 30 + Math.sin(spokeAngle) * 15)
          ctx.stroke()
        }

        // Hub
        const hubGrad = ctx.createRadialGradient(wx - 2, 28, 0, wx, 30, 8)
        hubGrad.addColorStop(0, "#888")
        hubGrad.addColorStop(1, "#444")
        ctx.fillStyle = hubGrad
        ctx.beginPath()
        ctx.arc(wx, 30, 7, 0, Math.PI * 2)
        ctx.fill()
      }

      drawWheel(-30)
      drawWheel(30)

      // Rotate for barrel
      ctx.rotate((-angle * Math.PI) / 180)

      // Barrel with metallic gradient
      const barrelGrad = ctx.createLinearGradient(0, -16, 0, 16)
      barrelGrad.addColorStop(0, "#1a1a2e")
      barrelGrad.addColorStop(0.2, "#3a3a5a")
      barrelGrad.addColorStop(0.4, "#5a5a8a")
      barrelGrad.addColorStop(0.5, "#6a6a9a")
      barrelGrad.addColorStop(0.6, "#5a5a8a")
      barrelGrad.addColorStop(0.8, "#3a3a5a")
      barrelGrad.addColorStop(1, "#1a1a2e")
      ctx.fillStyle = barrelGrad
      ctx.beginPath()
      ctx.roundRect(0, -16, 95, 32, [0, 14, 14, 0])
      ctx.fill()

      // Barrel rings
      ctx.strokeStyle = "#2a2a4a"
      ctx.lineWidth = 3
      for (let ring = 20; ring < 80; ring += 25) {
        ctx.beginPath()
        ctx.moveTo(ring, -14)
        ctx.lineTo(ring, 14)
        ctx.stroke()
      }

      // Barrel opening glow
      const glowGrad = ctx.createRadialGradient(95, 0, 0, 95, 0, 20)
      glowGrad.addColorStop(0, "#ff6600")
      glowGrad.addColorStop(0.3, "#ff4400")
      glowGrad.addColorStop(0.6, "#aa2200")
      glowGrad.addColorStop(1, "#000")
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(95, 0, 14, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#0a0a0a"
      ctx.beginPath()
      ctx.arc(95, 0, 10, 0, Math.PI * 2)
      ctx.fill()

      // Highlight
      ctx.strokeStyle = "rgba(255,255,255,0.3)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(8, -14)
      ctx.lineTo(85, -14)
      ctx.stroke()

      ctx.restore()
    },
    [angle],
  )

  const drawProjectile = useCallback(
    (ctx: CanvasRenderingContext2D, proj: Projectile, time: number) => {
      if (!proj.active && !proj.landed) return

      const projX = launchX + proj.x * scale
      const projY = groundY - proj.y * scale

      // Trail with gradient
      if (showTrail && proj.trail.length > 1) {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        for (let i = 1; i < proj.trail.length; i++) {
          const alpha = (i / proj.trail.length) * 0.9
          const trailX = launchX + proj.trail[i].x * scale
          const trailY = groundY - proj.trail[i].y * scale
          const prevTrailX = launchX + proj.trail[i - 1].x * scale
          const prevTrailY = groundY - proj.trail[i - 1].y * scale

          ctx.strokeStyle =
            proj.color +
            Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.lineWidth = 4 * (i / proj.trail.length)
          ctx.beginPath()
          ctx.moveTo(prevTrailX, prevTrailY)
          ctx.lineTo(trailX, trailY)
          ctx.stroke()
        }

        // Predicted trajectory
        if (!proj.landed && proj.active) {
          ctx.setLineDash([10, 6])
          ctx.strokeStyle = proj.color + "50"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(projX, projY)

          let predX = proj.x
          let predY = proj.y
          let predVx = proj.vx
          let predVy = proj.vy
          const dt = 0.05

          for (let i = 0; i < 200; i++) {
            const speed = Math.sqrt(predVx * predVx + predVy * predVy)
            const drag = (airResistance * 0.001 * speed * speed) / Math.max(mass, 0.1)

            if (speed > 0.01) {
              predVx -= (predVx / speed) * drag * dt * 60
              predVy -= gravity * dt * 60 + (predVy / speed) * drag * dt * 60
            } else {
              predVy -= gravity * dt * 60
            }

            predX += predVx * dt
            predY += predVy * dt

            if (predY < 0) break

            const drawX = launchX + predX * scale
            const drawY = groundY - predY * scale
            ctx.lineTo(drawX, drawY)
          }
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // Velocity vectors
      if (showVectors && proj.active && !proj.landed) {
        const vectorScale = 4

        // Total velocity
        ctx.beginPath()
        ctx.moveTo(projX, projY)
        ctx.lineTo(projX + proj.vx * vectorScale, projY - proj.vy * vectorScale)
        ctx.strokeStyle = "#f59e0b"
        ctx.lineWidth = 4
        ctx.stroke()

        // Arrow head
        const vAngle = Math.atan2(-proj.vy * vectorScale, proj.vx * vectorScale)
        ctx.beginPath()
        ctx.moveTo(projX + proj.vx * vectorScale, projY - proj.vy * vectorScale)
        ctx.lineTo(
          projX + proj.vx * vectorScale - 15 * Math.cos(vAngle - 0.4),
          projY - proj.vy * vectorScale - 15 * Math.sin(vAngle - 0.4),
        )
        ctx.lineTo(
          projX + proj.vx * vectorScale - 15 * Math.cos(vAngle + 0.4),
          projY - proj.vy * vectorScale - 15 * Math.sin(vAngle + 0.4),
        )
        ctx.closePath()
        ctx.fillStyle = "#f59e0b"
        ctx.fill()

        // Horizontal component
        ctx.beginPath()
        ctx.moveTo(projX, projY)
        ctx.lineTo(projX + proj.vx * vectorScale, projY)
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 3
        ctx.setLineDash([6, 4])
        ctx.stroke()
        ctx.setLineDash([])

        // Vertical component
        ctx.beginPath()
        ctx.moveTo(projX + proj.vx * vectorScale, projY)
        ctx.lineTo(projX + proj.vx * vectorScale, projY - proj.vy * vectorScale)
        ctx.strokeStyle = "#22c55e"
        ctx.stroke()

        // Labels
        ctx.font = "bold 14px Inter, system-ui"
        ctx.fillStyle = "#3b82f6"
        ctx.fillText(`Vx: ${Math.abs(proj.vx).toFixed(1)}`, projX + (proj.vx * vectorScale) / 2 - 25, projY + 25)
        ctx.fillStyle = "#22c55e"
        ctx.fillText(
          `Vy: ${Math.abs(proj.vy).toFixed(1)}`,
          projX + proj.vx * vectorScale + 10,
          projY - (proj.vy * vectorScale) / 2,
        )
      }

      // Projectile ball with 3D effect
      if (proj.active || proj.landed) {
        // Motion blur
        if (proj.active && !proj.landed && proj.trail.length > 3) {
          const speed = Math.sqrt(proj.vx * proj.vx + proj.vy * proj.vy)
          const blurCount = Math.min(6, Math.floor(speed / 15))

          for (let i = 0; i < blurCount; i++) {
            const idx = Math.max(0, proj.trail.length - 1 - i * 2)
            if (proj.trail[idx]) {
              const blurX = launchX + proj.trail[idx].x * scale
              const blurY = groundY - proj.trail[idx].y * scale
              const alpha = (0.15 * (blurCount - i)) / blurCount

              ctx.beginPath()
              ctx.arc(blurX, blurY, 18 - i * 2, 0, Math.PI * 2)
              ctx.fillStyle =
                proj.color +
                Math.floor(alpha * 255)
                  .toString(16)
                  .padStart(2, "0")
              ctx.fill()
            }
          }
        }

        // Main ball with 3D gradient
        const ballGrad = ctx.createRadialGradient(projX - 6, projY - 6, 0, projX, projY, 22)
        ballGrad.addColorStop(0, "#ffffff")
        ballGrad.addColorStop(0.2, proj.color)
        ballGrad.addColorStop(0.8, proj.color)
        ballGrad.addColorStop(1, "#000000")

        ctx.beginPath()
        ctx.arc(projX, projY, 20, 0, Math.PI * 2)
        ctx.fillStyle = ballGrad
        ctx.fill()

        // Shadow
        ctx.beginPath()
        ctx.ellipse(projX + 3, groundY + 5, 15, 5, 0, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0,0,0,0.3)"
        ctx.fill()

        // Spin effect
        if (proj.active && !proj.landed) {
          const spinAngle = (time * (proj.spinRate || 5)) % (Math.PI * 2)
          ctx.strokeStyle = "rgba(255,255,255,0.4)"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(projX, projY, 18, spinAngle, spinAngle + Math.PI * 0.8)
          ctx.stroke()
        }

        // Highlight
        ctx.beginPath()
        ctx.arc(projX - 6, projY - 6, 7, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.6)"
        ctx.fill()

        // Landing marker
        if (proj.landed) {
          const landX = launchX + proj.range * scale

          // Impact crater
          ctx.beginPath()
          ctx.ellipse(landX, groundY + 5, 35, 12, 0, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(139,69,19,0.6)"
          ctx.fill()

          // Distance label
          ctx.fillStyle = proj.color
          ctx.font = "bold 18px Inter, system-ui"
          ctx.textAlign = "center"
          ctx.fillText(`${proj.range.toFixed(1)} m`, landX, groundY + 55)

          ctx.fillStyle = "rgba(255,255,255,0.8)"
          ctx.font = "14px Inter, system-ui"
          ctx.fillText(`t = ${proj.flightTime.toFixed(2)}s`, landX, groundY + 75)
        }
      }
    },
    [showTrail, showVectors, groundY, scale, launchX, airResistance, mass, gravity],
  )

  // Main draw function
  const draw = useCallback(
    (time = 0) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY)
      skyGrad.addColorStop(0, "#0a0a1a")
      skyGrad.addColorStop(0.2, "#1a1a3a")
      skyGrad.addColorStop(0.5, "#2a3a5a")
      skyGrad.addColorStop(0.8, "#4a6a8a")
      skyGrad.addColorStop(1, "#7a9aba")
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, dimensions.width, groundY)

      // Stars
      for (let i = 0; i < 80; i++) {
        const starX = (i * 127 + 50) % dimensions.width
        const starY = (i * 83) % (groundY * 0.6)
        const twinkle = Math.sin(time * 0.003 + i) * 0.5 + 1
        ctx.fillStyle = `rgba(255,255,255,${0.3 + twinkle * 0.4})`
        ctx.beginPath()
        ctx.arc(starX, starY, twinkle, 0, Math.PI * 2)
        ctx.fill()
      }

      // Moon
      const moonGrad = ctx.createRadialGradient(dimensions.width - 100, 80, 0, dimensions.width - 100, 80, 45)
      moonGrad.addColorStop(0, "#ffffee")
      moonGrad.addColorStop(0.8, "#ddddcc")
      moonGrad.addColorStop(1, "#aaaaaa")
      ctx.fillStyle = moonGrad
      ctx.beginPath()
      ctx.arc(dimensions.width - 100, 80, 40, 0, Math.PI * 2)
      ctx.fill()

      // Grid
      if (showGrid) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)"
        ctx.lineWidth = 1

        const gridSpacing = viewRange > 500 ? 100 : viewRange > 200 ? 50 : viewRange > 100 ? 25 : 10

        // Vertical lines
        for (let d = 0; d <= viewRange; d += gridSpacing) {
          const x = launchX + d * scale
          if (x > dimensions.width) break

          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, groundY)
          ctx.stroke()

          ctx.fillStyle = "rgba(255,255,255,0.5)"
          ctx.font = "13px Inter, system-ui"
          ctx.textAlign = "center"
          ctx.fillText(`${d}m`, x, groundY - 8)
        }

        // Horizontal lines
        const heightGridSpacing = viewRange > 300 ? 50 : viewRange > 100 ? 20 : 10
        const maxHeightGrid = Math.max(100, height + 100)
        for (let h = heightGridSpacing; h < maxHeightGrid; h += heightGridSpacing) {
          const y = groundY - h * scale
          if (y < 50) break

          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(dimensions.width, y)
          ctx.stroke()

          ctx.fillStyle = "rgba(255,255,255,0.4)"
          ctx.font = "12px Inter, system-ui"
          ctx.textAlign = "left"
          ctx.fillText(`${h}m`, 8, y + 4)
        }
      }

      // Ground
      const groundGrad = ctx.createLinearGradient(0, groundY, 0, dimensions.height)
      groundGrad.addColorStop(0, "#2d5a1e")
      groundGrad.addColorStop(0.2, "#1e4a15")
      groundGrad.addColorStop(0.6, "#153a10")
      groundGrad.addColorStop(1, "#0a2a08")
      ctx.fillStyle = groundGrad
      ctx.fillRect(0, groundY, dimensions.width, dimensions.height - groundY)

      // Grass
      for (let x = 0; x < dimensions.width; x += 8) {
        const windOffset = Math.sin(time * 0.002 + x * 0.02) * 3
        const grassHeight = 8 + Math.random() * 6

        ctx.strokeStyle = `rgba(34,197,94,${0.4 + Math.random() * 0.3})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x, groundY)
        ctx.quadraticCurveTo(x + windOffset, groundY - grassHeight / 2, x + windOffset * 1.5, groundY - grassHeight)
        ctx.stroke()
      }

      // Ground line
      ctx.strokeStyle = "#4a7a3a"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, groundY)
      ctx.lineTo(dimensions.width, groundY)
      ctx.stroke()

      // Launch platform if height > 0
      if (height > 0) {
        const platY = groundY - height * scale
        const platHeight = height * scale

        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.beginPath()
        ctx.moveTo(launchX + 60, groundY)
        ctx.lineTo(launchX + 75, groundY + 15)
        ctx.lineTo(launchX - 35, groundY + 15)
        ctx.lineTo(launchX - 50, groundY)
        ctx.closePath()
        ctx.fill()

        const platGrad = ctx.createLinearGradient(launchX - 50, 0, launchX + 60, 0)
        platGrad.addColorStop(0, "#2a2a3a")
        platGrad.addColorStop(0.3, "#4a4a5a")
        platGrad.addColorStop(0.5, "#5a5a6a")
        platGrad.addColorStop(0.7, "#4a4a5a")
        platGrad.addColorStop(1, "#2a2a3a")
        ctx.fillStyle = platGrad
        ctx.fillRect(launchX - 50, platY, 110, platHeight)

        ctx.strokeStyle = "#6a6a7a"
        ctx.lineWidth = 2
        ctx.strokeRect(launchX - 50, platY, 110, platHeight)

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 14px Inter, system-ui"
        ctx.textAlign = "center"
        ctx.fillText(`${height}m`, launchX, platY - 12)
      }

      // Draw cannon
      const cannonY = groundY - height * scale
      drawCannon(ctx, launchX, cannonY)

      // Angle arc
      ctx.beginPath()
      ctx.arc(launchX, cannonY, 70, 0, (-angle * Math.PI) / 180, true)
      ctx.strokeStyle = "#f59e0b"
      ctx.lineWidth = 3
      ctx.stroke()

      // Angle label
      const labelAngle = (-angle * Math.PI) / 360
      ctx.fillStyle = "#f59e0b"
      ctx.font = "bold 20px Inter, system-ui"
      ctx.textAlign = "center"
      ctx.fillText(`${angle}°`, launchX + Math.cos(labelAngle) * 90, cannonY + Math.sin(labelAngle) * 90)

      // Draw all projectiles
      projectiles.forEach((proj) => drawProjectile(ctx, proj, time))

      // Info panel
      ctx.fillStyle = "rgba(0,0,0,0.7)"
      ctx.beginPath()
      ctx.roundRect(dimensions.width - 220, 20, 200, 120, 10)
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Inter, system-ui"
      ctx.textAlign = "left"
      ctx.fillText("Launch Parameters", dimensions.width - 210, 42)

      ctx.font = "13px Inter, system-ui"
      ctx.fillStyle = "#aaaaaa"
      ctx.fillText(`Angle: ${angle}°`, dimensions.width - 210, 62)
      ctx.fillText(`Velocity: ${velocity} m/s`, dimensions.width - 210, 82)
      ctx.fillText(`Height: ${height} m`, dimensions.width - 210, 102)
      ctx.fillText(`Gravity: ${gravity.toFixed(1)} m/s²`, dimensions.width - 210, 122)
    },
    [
      dimensions,
      groundY,
      showGrid,
      viewRange,
      launchX,
      scale,
      height,
      drawCannon,
      angle,
      velocity,
      gravity,
      projectiles,
      drawProjectile,
    ],
  )

  // Animation loop with physics
  useEffect(() => {
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = ((currentTime - lastTime) / 1000) * timeScale
      lastTime = currentTime

      if (!isPaused) {
        setProjectiles((prev) =>
          prev.map((proj) => {
            if (!proj.active || proj.landed) return proj

            const dt = deltaTime
            let newVx = proj.vx
            let newVy = proj.vy

            // Apply air resistance
            const speed = Math.sqrt(newVx * newVx + newVy * newVy)
            if (speed > 0.01 && airResistance > 0) {
              const drag = (airResistance * 0.001 * speed * speed) / Math.max(mass, 0.1)
              newVx -= (newVx / speed) * drag * dt * 60
              newVy -= (newVy / speed) * drag * dt * 60
            }

            // Apply gravity
            newVy -= gravity * dt * 60

            // Update position
            const newX = proj.x + newVx * dt
            const newY = proj.y + newVy * dt

            // Check if landed
            if (newY <= 0) {
              const impactSpeed = Math.sqrt(newVx * newVx + newVy * newVy)
              return {
                ...proj,
                x: newX,
                y: 0,
                vx: 0,
                vy: 0,
                active: false,
                landed: true,
                range: newX,
                flightTime: proj.currentTime,
                impactVelocity: impactSpeed,
                trail: [...proj.trail, { x: newX, y: 0, vx: newVx, vy: newVy }],
              }
            }

            // Update max height
            const maxHeight = Math.max(proj.maxHeight, newY)

            // Add to trail
            const newTrail =
              proj.trail.length > 200
                ? [...proj.trail.slice(1), { x: newX, y: newY, vx: newVx, vy: newVy }]
                : [...proj.trail, { x: newX, y: newY, vx: newVx, vy: newVy }]

            return {
              ...proj,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              maxHeight,
              currentTime: proj.currentTime + dt,
              trail: newTrail,
            }
          }),
        )
      }

      draw(currentTime)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, gravity, airResistance, mass, timeScale, draw, setProjectiles])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="w-full h-full touch-manipulation"
      style={{ display: "block" }}
    />
  )
}
