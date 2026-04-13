"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface PythagorasCanvasProps {
  sideA: number
  sideB: number
  showSquares: boolean
  showLabels: boolean
  showGrid: boolean
  proofType: "area" | "rearrangement" | "similar-triangles" | "water-fill"
  animationProgress: number
  isAnimating: boolean
}

export function PythagorasCanvas({
  sideA,
  sideB,
  showSquares,
  showLabels,
  showGrid,
  proofType,
  animationProgress,
  isAnimating,
}: PythagorasCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  // Calculate hypotenuse
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)

  // Resize handler
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width,
          height: Math.max(600, rect.height),
        })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = dimensions
    const scale = Math.min(width, height) / 500
    const centerX = width / 2
    const centerY = height / 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
    bgGradient.addColorStop(0, "#0f172a")
    bgGradient.addColorStop(1, "#1e293b")
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)"
      ctx.lineWidth = 1
      const gridSize = 30 * scale

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    // Triangle dimensions scaled
    const a = sideA * 20 * scale
    const b = sideB * 20 * scale
    const c = sideC * 20 * scale

    // Triangle position
    const triX = centerX - b / 2
    const triY = centerY + a / 4

    // Draw based on proof type
    if (proofType === "area") {
      drawAreaProof(ctx, triX, triY, a, b, c, scale, animationProgress, showSquares, showLabels)
    } else if (proofType === "rearrangement") {
      drawRearrangementProof(ctx, width, height, a, b, c, scale, animationProgress, showLabels)
    } else if (proofType === "similar-triangles") {
      drawSimilarTrianglesProof(ctx, triX, triY, a, b, c, scale, animationProgress, showLabels)
    } else if (proofType === "water-fill") {
      drawWaterFillProof(ctx, width, height, a, b, c, scale, animationProgress, showLabels)
    }

    // Draw formula at bottom
    ctx.fillStyle = "#f8fafc"
    ctx.font = `bold ${28 * scale}px 'Geist', system-ui, sans-serif`
    ctx.textAlign = "center"
    ctx.fillText(`a² + b² = c²`, centerX, height - 40 * scale)

    ctx.font = `${20 * scale}px 'Geist', system-ui, sans-serif`
    ctx.fillStyle = "#94a3b8"
    ctx.fillText(
      `${sideA}² + ${sideB}² = ${sideA * sideA} + ${sideB * sideB} = ${sideA * sideA + sideB * sideB} = ${sideC.toFixed(2)}²`,
      centerX,
      height - 12 * scale,
    )
  }, [dimensions, sideA, sideB, sideC, showSquares, showLabels, showGrid, proofType, animationProgress])

  // Area Proof - Classic visualization
  function drawAreaProof(
    ctx: CanvasRenderingContext2D,
    triX: number,
    triY: number,
    a: number,
    b: number,
    c: number,
    scale: number,
    progress: number,
    showSq: boolean,
    showLbl: boolean,
  ) {
    // Draw main triangle with 3D effect
    ctx.beginPath()
    ctx.moveTo(triX, triY)
    ctx.lineTo(triX + b, triY)
    ctx.lineTo(triX, triY - a)
    ctx.closePath()

    // Triangle gradient fill
    const triGradient = ctx.createLinearGradient(triX, triY, triX + b / 2, triY - a / 2)
    triGradient.addColorStop(0, "rgba(59, 130, 246, 0.4)")
    triGradient.addColorStop(1, "rgba(59, 130, 246, 0.2)")
    ctx.fillStyle = triGradient
    ctx.fill()

    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3 * scale
    ctx.stroke()

    // Right angle indicator
    const rightAngleSize = 15 * scale
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 2 * scale
    ctx.beginPath()
    ctx.moveTo(triX + rightAngleSize, triY)
    ctx.lineTo(triX + rightAngleSize, triY - rightAngleSize)
    ctx.lineTo(triX, triY - rightAngleSize)
    ctx.stroke()

    if (showSq) {
      // Square on side a (vertical) - Green
      const aSquareOpacity = Math.min(1, progress * 3)
      ctx.fillStyle = `rgba(34, 197, 94, ${0.3 * aSquareOpacity})`
      ctx.strokeStyle = `rgba(34, 197, 94, ${aSquareOpacity})`
      ctx.lineWidth = 2 * scale
      ctx.beginPath()
      ctx.rect(triX - a, triY - a, a, a)
      ctx.fill()
      ctx.stroke()

      // Draw grid pattern on a² square
      ctx.strokeStyle = `rgba(34, 197, 94, ${0.3 * aSquareOpacity})`
      ctx.lineWidth = 1
      const gridStep = a / sideA
      for (let i = 1; i < sideA; i++) {
        ctx.beginPath()
        ctx.moveTo(triX - a + i * gridStep, triY - a)
        ctx.lineTo(triX - a + i * gridStep, triY)
        ctx.stroke()
        ctx.moveTo(triX - a, triY - a + i * gridStep)
        ctx.lineTo(triX, triY - a + i * gridStep)
        ctx.stroke()
      }

      // Square on side b (horizontal) - Red
      const bSquareOpacity = Math.min(1, Math.max(0, (progress - 0.2) * 3))
      ctx.fillStyle = `rgba(239, 68, 68, ${0.3 * bSquareOpacity})`
      ctx.strokeStyle = `rgba(239, 68, 68, ${bSquareOpacity})`
      ctx.lineWidth = 2 * scale
      ctx.beginPath()
      ctx.rect(triX, triY, b, b)
      ctx.fill()
      ctx.stroke()

      // Draw grid pattern on b² square
      ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 * bSquareOpacity})`
      ctx.lineWidth = 1
      const gridStepB = b / sideB
      for (let i = 1; i < sideB; i++) {
        ctx.beginPath()
        ctx.moveTo(triX + i * gridStepB, triY)
        ctx.lineTo(triX + i * gridStepB, triY + b)
        ctx.stroke()
        ctx.moveTo(triX, triY + i * gridStepB)
        ctx.lineTo(triX + b, triY + i * gridStepB)
        ctx.stroke()
      }

      // Square on hypotenuse c - Purple (with rotation)
      const cSquareOpacity = Math.min(1, Math.max(0, (progress - 0.4) * 3))
      const angle = Math.atan2(a, b)

      ctx.save()
      ctx.translate(triX, triY - a)
      ctx.rotate(-angle)

      ctx.fillStyle = `rgba(168, 85, 247, ${0.3 * cSquareOpacity})`
      ctx.strokeStyle = `rgba(168, 85, 247, ${cSquareOpacity})`
      ctx.lineWidth = 2 * scale
      ctx.beginPath()
      ctx.rect(0, 0, c, -c)
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    }

    // Labels
    if (showLbl) {
      ctx.font = `bold ${18 * scale}px 'Geist', system-ui, sans-serif`
      ctx.textAlign = "center"

      // Side a label
      ctx.fillStyle = "#22c55e"
      ctx.fillText(`a = ${sideA}`, triX - 25 * scale, triY - a / 2)

      // Side b label
      ctx.fillStyle = "#ef4444"
      ctx.fillText(`b = ${sideB}`, triX + b / 2, triY + 25 * scale)

      // Side c label
      ctx.fillStyle = "#a855f7"
      const midX = (triX + triX + b) / 2 + 20 * scale
      const midY = (triY + triY - a) / 2 - 10 * scale
      ctx.fillText(`c = ${sideC.toFixed(2)}`, midX, midY)

      // Area labels
      if (showSq && progress > 0.5) {
        ctx.font = `${16 * scale}px 'Geist', system-ui, sans-serif`

        ctx.fillStyle = "#22c55e"
        ctx.fillText(`a² = ${sideA * sideA}`, triX - a / 2, triY - a / 2)

        ctx.fillStyle = "#ef4444"
        ctx.fillText(`b² = ${sideB * sideB}`, triX + b / 2, triY + b / 2)

        ctx.fillStyle = "#a855f7"
        ctx.save()
        ctx.translate(triX, triY - a)
        ctx.rotate(-Math.atan2(a, b))
        ctx.fillText(`c² = ${(sideC * sideC).toFixed(1)}`, c / 2, -c / 2)
        ctx.restore()
      }
    }
  }

  // Rearrangement Proof - Moving squares
  function drawRearrangementProof(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    a: number,
    b: number,
    c: number,
    scale: number,
    progress: number,
    showLbl: boolean,
  ) {
    const leftX = width * 0.25
    const rightX = width * 0.75
    const centerY = height * 0.45
    const boxSize = (a + b) * 0.8

    // Left side - a² + b² arrangement
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 2 * scale
    ctx.strokeRect(leftX - boxSize / 2, centerY - boxSize / 2, boxSize, boxSize)

    // Four triangles in corners
    const triPositions = [
      { x: leftX - boxSize / 2, y: centerY - boxSize / 2, rot: 0 },
      { x: leftX + boxSize / 2, y: centerY - boxSize / 2, rot: Math.PI / 2 },
      { x: leftX + boxSize / 2, y: centerY + boxSize / 2, rot: Math.PI },
      { x: leftX - boxSize / 2, y: centerY + boxSize / 2, rot: -Math.PI / 2 },
    ]

    triPositions.forEach((pos, i) => {
      ctx.save()
      ctx.translate(pos.x, pos.y)
      ctx.rotate(pos.rot)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(b * 0.8, 0)
      ctx.lineTo(0, a * 0.8)
      ctx.closePath()

      ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + (i % 2) * 0.1})`
      ctx.fill()
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2 * scale
      ctx.stroke()

      ctx.restore()
    })

    // a² square (green) in middle-left
    const aSize = a * 0.8
    const bSize = b * 0.8
    ctx.fillStyle = "rgba(34, 197, 94, 0.4)"
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 2 * scale
    ctx.fillRect(leftX - boxSize / 2, centerY - boxSize / 2 + bSize, aSize, aSize)
    ctx.strokeRect(leftX - boxSize / 2, centerY - boxSize / 2 + bSize, aSize, aSize)

    // b² square (red) in top-right corner
    ctx.fillStyle = "rgba(239, 68, 68, 0.4)"
    ctx.strokeStyle = "#ef4444"
    ctx.fillRect(leftX - boxSize / 2 + aSize, centerY - boxSize / 2, bSize, bSize)
    ctx.strokeRect(leftX - boxSize / 2 + aSize, centerY - boxSize / 2, bSize, bSize)

    // Right side - c² arrangement (after rearrangement)
    ctx.strokeStyle = "#64748b"
    ctx.strokeRect(rightX - boxSize / 2, centerY - boxSize / 2, boxSize, boxSize)

    // Animated triangles moving to new positions
    const moveProgress = Math.min(1, progress * 2)
    const triTargets = [
      { x: rightX - boxSize / 2, y: centerY + boxSize / 2 - a * 0.8, rot: 0 },
      { x: rightX - boxSize / 2 + b * 0.8, y: centerY - boxSize / 2, rot: Math.PI / 2 },
      { x: rightX + boxSize / 2, y: centerY - boxSize / 2 + a * 0.8, rot: Math.PI },
      { x: rightX + boxSize / 2 - b * 0.8, y: centerY + boxSize / 2, rot: -Math.PI / 2 },
    ]

    triTargets.forEach((pos, i) => {
      const startPos = triPositions[i]
      const currX = startPos.x + (pos.x - startPos.x - (rightX - leftX)) * 0 + (rightX - leftX)
      const currY = startPos.y + (pos.y - startPos.y) * moveProgress

      ctx.save()
      ctx.translate(
        rightX - boxSize / 2 + (i === 1 || i === 2 ? boxSize : 0) + (i === 1 ? -b * 0.8 : i === 2 ? 0 : 0),
        centerY - boxSize / 2 + (i === 2 || i === 3 ? boxSize : 0) + (i === 0 ? b * 0.8 : i === 3 ? -a * 0.8 : 0),
      )
      ctx.rotate(pos.rot)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(b * 0.8, 0)
      ctx.lineTo(0, a * 0.8)
      ctx.closePath()

      ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + (i % 2) * 0.1})`
      ctx.fill()
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2 * scale
      ctx.stroke()

      ctx.restore()
    })

    // c² square in the middle (purple) - appears with animation
    const cSquareOpacity = Math.max(0, (progress - 0.5) * 2)
    const cSize = c * 0.8
    ctx.save()
    ctx.translate(rightX, centerY)
    ctx.rotate(-Math.atan2(a, b))

    ctx.fillStyle = `rgba(168, 85, 247, ${0.4 * cSquareOpacity})`
    ctx.strokeStyle = `rgba(168, 85, 247, ${cSquareOpacity})`
    ctx.lineWidth = 3 * scale
    ctx.fillRect(-cSize / 2, -cSize / 2, cSize, cSize)
    ctx.strokeRect(-cSize / 2, -cSize / 2, cSize, cSize)

    ctx.restore()

    // Labels
    if (showLbl) {
      ctx.font = `bold ${20 * scale}px 'Geist', system-ui, sans-serif`
      ctx.textAlign = "center"

      ctx.fillStyle = "#f8fafc"
      ctx.fillText("a² + b²", leftX, centerY + boxSize / 2 + 40 * scale)
      ctx.fillText("= c²", rightX, centerY + boxSize / 2 + 40 * scale)

      // Equals sign between
      ctx.font = `bold ${40 * scale}px 'Geist', system-ui, sans-serif`
      ctx.fillText("=", (leftX + rightX) / 2, centerY)
    }
  }

  // Similar Triangles Proof
  function drawSimilarTrianglesProof(
    ctx: CanvasRenderingContext2D,
    triX: number,
    triY: number,
    a: number,
    b: number,
    c: number,
    scale: number,
    progress: number,
    showLbl: boolean,
  ) {
    // Main triangle
    ctx.beginPath()
    ctx.moveTo(triX, triY)
    ctx.lineTo(triX + b, triY)
    ctx.lineTo(triX, triY - a)
    ctx.closePath()

    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.fill()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3 * scale
    ctx.stroke()

    // Altitude to hypotenuse
    const altitudeProgress = Math.min(1, progress * 2)
    const angle = Math.atan2(a, b)
    const altX = triX + (b * a * a) / (a * a + b * b)
    const altY = triY - (a * a * b) / (a * a + b * b)

    if (altitudeProgress > 0) {
      ctx.beginPath()
      ctx.moveTo(triX, triY)
      ctx.lineTo(triX + (altX - triX) * altitudeProgress, triY + (altY - triY) * altitudeProgress)
      ctx.strokeStyle = "#f59e0b"
      ctx.lineWidth = 2 * scale
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])

      // Altitude foot point
      ctx.beginPath()
      ctx.arc(altX, altY, 5 * scale, 0, Math.PI * 2)
      ctx.fillStyle = "#f59e0b"
      ctx.fill()
    }

    // Three similar triangles highlighted
    if (progress > 0.5) {
      const triOpacity = Math.min(1, (progress - 0.5) * 2)

      // Triangle 1 (small left)
      ctx.beginPath()
      ctx.moveTo(triX, triY)
      ctx.lineTo(altX, altY)
      ctx.lineTo(triX, triY - a)
      ctx.closePath()
      ctx.fillStyle = `rgba(34, 197, 94, ${0.3 * triOpacity})`
      ctx.fill()
      ctx.strokeStyle = `rgba(34, 197, 94, ${triOpacity})`
      ctx.lineWidth = 2 * scale
      ctx.stroke()

      // Triangle 2 (small right)
      ctx.beginPath()
      ctx.moveTo(triX, triY)
      ctx.lineTo(altX, altY)
      ctx.lineTo(triX + b, triY)
      ctx.closePath()
      ctx.fillStyle = `rgba(239, 68, 68, ${0.3 * triOpacity})`
      ctx.fill()
      ctx.strokeStyle = `rgba(239, 68, 68, ${triOpacity})`
      ctx.stroke()
    }

    // Labels
    if (showLbl) {
      ctx.font = `bold ${16 * scale}px 'Geist', system-ui, sans-serif`
      ctx.textAlign = "center"

      ctx.fillStyle = "#22c55e"
      ctx.fillText("Triangle 1", triX - 30 * scale, triY - a / 2 - 20 * scale)

      ctx.fillStyle = "#ef4444"
      ctx.fillText("Triangle 2", triX + b / 2 + 30 * scale, triY - 20 * scale)

      ctx.fillStyle = "#3b82f6"
      ctx.fillText("Main Triangle", triX + b / 2, triY + 40 * scale)

      // Similarity explanation
      ctx.font = `${14 * scale}px 'Geist', system-ui, sans-serif`
      ctx.fillStyle = "#94a3b8"
      ctx.fillText("All three triangles are similar!", triX + b / 2, triY + 70 * scale)
      ctx.fillText("This proves: a² + b² = c²", triX + b / 2, triY + 95 * scale)
    }
  }

  // Water Fill Proof - Visual demonstration
  function drawWaterFillProof(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    a: number,
    b: number,
    c: number,
    scale: number,
    progress: number,
    showLbl: boolean,
  ) {
    const baseY = height * 0.7
    const aSquareX = width * 0.15
    const bSquareX = width * 0.4
    const cSquareX = width * 0.72
    const aSize = a * 0.9
    const bSize = b * 0.9
    const cSize = c * 0.9

    // Container for a² (green water)
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 3 * scale
    ctx.strokeRect(aSquareX, baseY - aSize, aSize, aSize)

    // Water fill in a²
    const aFillHeight = aSize * Math.min(1, progress * 2)
    const waterGradientA = ctx.createLinearGradient(0, baseY - aFillHeight, 0, baseY)
    waterGradientA.addColorStop(0, "rgba(34, 197, 94, 0.6)")
    waterGradientA.addColorStop(1, "rgba(34, 197, 94, 0.9)")
    ctx.fillStyle = waterGradientA
    ctx.fillRect(aSquareX, baseY - aFillHeight, aSize, aFillHeight)

    // Water wave effect
    if (aFillHeight > 0) {
      ctx.beginPath()
      ctx.moveTo(aSquareX, baseY - aFillHeight)
      for (let x = 0; x <= aSize; x += 5) {
        const waveY = Math.sin((x + Date.now() / 200) * 0.1) * 3 * scale
        ctx.lineTo(aSquareX + x, baseY - aFillHeight + waveY)
      }
      ctx.lineTo(aSquareX + aSize, baseY)
      ctx.lineTo(aSquareX, baseY)
      ctx.closePath()
      ctx.fill()
    }

    // Container for b² (red water)
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 3 * scale
    ctx.strokeRect(bSquareX, baseY - bSize, bSize, bSize)

    // Water fill in b²
    const bFillHeight = bSize * Math.min(1, Math.max(0, (progress - 0.2) * 2))
    const waterGradientB = ctx.createLinearGradient(0, baseY - bFillHeight, 0, baseY)
    waterGradientB.addColorStop(0, "rgba(239, 68, 68, 0.6)")
    waterGradientB.addColorStop(1, "rgba(239, 68, 68, 0.9)")
    ctx.fillStyle = waterGradientB
    ctx.fillRect(bSquareX, baseY - bFillHeight, bSize, bFillHeight)

    // Water wave effect for b
    if (bFillHeight > 0) {
      ctx.beginPath()
      ctx.moveTo(bSquareX, baseY - bFillHeight)
      for (let x = 0; x <= bSize; x += 5) {
        const waveY = Math.sin((x + Date.now() / 200 + 50) * 0.1) * 3 * scale
        ctx.lineTo(bSquareX + x, baseY - bFillHeight + waveY)
      }
      ctx.lineTo(bSquareX + bSize, baseY)
      ctx.lineTo(bSquareX, baseY)
      ctx.closePath()
      ctx.fill()
    }

    // Container for c² (purple - receiving)
    ctx.strokeStyle = "#a855f7"
    ctx.lineWidth = 3 * scale
    ctx.strokeRect(cSquareX, baseY - cSize, cSize, cSize)

    // Water transfer animation
    if (progress > 0.6) {
      const transferProgress = (progress - 0.6) / 0.4
      const totalVolume = aSize * aSize + bSize * bSize
      const cFillHeight = (totalVolume / cSize) * transferProgress

      // Combined water in c²
      const waterGradientC = ctx.createLinearGradient(0, baseY - cFillHeight, 0, baseY)
      waterGradientC.addColorStop(0, "rgba(168, 85, 247, 0.6)")
      waterGradientC.addColorStop(1, "rgba(168, 85, 247, 0.9)")
      ctx.fillStyle = waterGradientC
      ctx.fillRect(cSquareX, baseY - Math.min(cFillHeight, cSize), cSize, Math.min(cFillHeight, cSize))

      // Pour animation
      if (transferProgress < 0.8) {
        // Stream from a² to c²
        ctx.strokeStyle = "rgba(34, 197, 94, 0.7)"
        ctx.lineWidth = 4 * scale
        ctx.beginPath()
        ctx.moveTo(aSquareX + aSize, baseY - aSize / 2)
        ctx.quadraticCurveTo((aSquareX + aSize + cSquareX) / 2, baseY - cSize - 50 * scale, cSquareX, baseY - cSize)
        ctx.stroke()

        // Stream from b² to c²
        ctx.strokeStyle = "rgba(239, 68, 68, 0.7)"
        ctx.beginPath()
        ctx.moveTo(bSquareX + bSize, baseY - bSize / 2)
        ctx.quadraticCurveTo(
          (bSquareX + bSize + cSquareX) / 2,
          baseY - cSize - 30 * scale,
          cSquareX + cSize / 3,
          baseY - cSize,
        )
        ctx.stroke()
      }
    }

    // Plus sign between a² and b²
    ctx.fillStyle = "#f8fafc"
    ctx.font = `bold ${30 * scale}px 'Geist', system-ui, sans-serif`
    ctx.textAlign = "center"
    ctx.fillText("+", (aSquareX + aSize + bSquareX) / 2, baseY - Math.max(aSize, bSize) / 2)

    // Equals sign
    ctx.fillText("=", (bSquareX + bSize + cSquareX) / 2, baseY - Math.max(bSize, cSize) / 2)

    // Labels
    if (showLbl) {
      ctx.font = `bold ${18 * scale}px 'Geist', system-ui, sans-serif`

      ctx.fillStyle = "#22c55e"
      ctx.fillText(`a² = ${(sideA * sideA).toFixed(0)}`, aSquareX + aSize / 2, baseY + 30 * scale)

      ctx.fillStyle = "#ef4444"
      ctx.fillText(`b² = ${(sideB * sideB).toFixed(0)}`, bSquareX + bSize / 2, baseY + 30 * scale)

      ctx.fillStyle = "#a855f7"
      ctx.fillText(`c² = ${(sideC * sideC).toFixed(1)}`, cSquareX + cSize / 2, baseY + 30 * scale)

      // Explanation
      ctx.fillStyle = "#94a3b8"
      ctx.font = `${14 * scale}px 'Geist', system-ui, sans-serif`
      ctx.fillText("Water from a² and b² exactly fills c²!", width / 2, baseY + 70 * scale)
    }
  }

  useEffect(() => {
    render()
  }, [render])

  // Animation loop for water waves
  useEffect(() => {
    if (proofType === "water-fill") {
      const interval = setInterval(render, 50)
      return () => clearInterval(interval)
    }
  }, [proofType, render])

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px]">
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="w-full h-full" />
    </div>
  )
}
