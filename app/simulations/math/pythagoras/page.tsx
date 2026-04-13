"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { Pythagoras3D } from "@/components/pythagoras/pythagoras-3d"
import { StepGuide } from "@/components/pythagoras/step-guide"
import { TheoremVisualizer } from "@/components/pythagoras/theorem-visualizer"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Maximize2, Minimize2, ChevronLeft, Play, Pause, Triangle, PanelRightClose, PanelRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const TOTAL_STEPS = 5

export default function PythagorasPage() {
  const [sideA, setSideA] = useState(3)
  const [sideB, setSideB] = useState(4)
  const [showSquares, setShowSquares] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const animationRef = useRef<number | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const sideC = Math.sqrt(sideA * sideA + sideB * sideB)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setShowRightPanel(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Animation loop for step transitions
  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setAnimationProgress((prev) => {
          if (prev >= 1) {
            setIsAnimating(false)
            return 1
          }
          return prev + 0.02
        })
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isAnimating])

  // Auto-play through steps
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= TOTAL_STEPS - 1) {
            setIsAutoPlay(false)
            return prev
          }
          setAnimationProgress(0)
          setIsAnimating(true)
          return prev + 1
        })
      }, 4000)
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlay])

  // Text-to-speech for steps
  const speakStep = useCallback(
    (stepIndex: number) => {
      if (!isSpeaking || typeof window === "undefined" || !window.speechSynthesis) return

      const descriptions = [
        `This is a right triangle with sides a equals ${sideA} and b equals ${sideB}. The longest side, called the hypotenuse, is c.`,
        `Building a square on side a. The area is a squared, which equals ${sideA * sideA} square units.`,
        `Building a square on side b. The area is b squared, which equals ${sideB * sideB} square units.`,
        `Building a square on the hypotenuse c. The area is c squared, approximately ${Math.round(sideC * sideC)} square units.`,
        `Amazing! ${sideA * sideA} plus ${sideB * sideB} equals ${sideA * sideA + sideB * sideB}. This proves the Pythagorean theorem: a squared plus b squared equals c squared!`,
      ]

      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(descriptions[stepIndex])
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    },
    [isSpeaking, sideA, sideB, sideC],
  )

  useEffect(() => {
    speakStep(currentStep)
  }, [currentStep, speakStep])

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
    setAnimationProgress(0)
    setIsAnimating(true)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnimationProgress(0)
    setIsAnimating(false)
    setIsAutoPlay(false)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isFullscreen && <Navigation />}

      <main className={`flex-1 ${isFullscreen ? "" : "pt-16"}`}>
        <div className={`${isFullscreen ? "h-screen" : "container mx-auto px-4 py-6 lg:px-8"}`}>
          {/* Header */}
          {!isFullscreen && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/simulations">
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Pythagoras Theorem Prover</h1>
                  <p className="text-muted-foreground">Understand a² + b² = c² in 5 simple steps</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant={isAutoPlay ? "secondary" : "default"} onClick={() => setIsAutoPlay(!isAutoPlay)}>
                  {isAutoPlay ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isAutoPlay ? "Pause" : "Auto Play"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowRightPanel(!showRightPanel)}
                  className="hidden lg:flex"
                >
                  {showRightPanel ? <PanelRightClose className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          <div className={`flex ${isFullscreen ? "h-full" : ""} gap-6 relative`}>
            {/* 3D Canvas */}
            <div
              className={cn(
                "relative bg-card rounded-xl border-2 overflow-hidden",
                isFullscreen ? "h-full flex-1" : "min-h-[500px] lg:min-h-[600px] flex-1",
              )}
            >
              <Pythagoras3D
                sideA={sideA}
                sideB={sideB}
                showSquares={showSquares}
                showLabels={showLabels}
                currentStep={currentStep}
                isAnimating={isAnimating}
                animationProgress={animationProgress}
              />

              {/* Fullscreen controls */}
              {isFullscreen && (
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Button variant="secondary" size="icon" onClick={toggleFullscreen}>
                    <Minimize2 className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Formula overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur px-6 py-3 rounded-full">
                <div className="text-xl md:text-2xl font-bold font-mono text-center">
                  <span className="text-green-500">a²</span>
                  <span className="text-white mx-2">+</span>
                  <span className="text-red-500">b²</span>
                  <span className="text-white mx-2">=</span>
                  <span className="text-purple-500">c²</span>
                </div>
              </div>

              {/* Step indicator overlay */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-4 py-2 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {TOTAL_STEPS}
                </div>
                <div className="font-bold">
                  {["Triangle", "Square a²", "Square b²", "Square c²", "Proof Complete!"][currentStep]}
                </div>
              </div>
            </div>

            {/* Toggle Right Panel Button - Mobile */}
            {!isFullscreen && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 z-30 bg-card/90 backdrop-blur rounded-r-none shadow-md h-12 w-8 touch-manipulation lg:hidden",
                  showRightPanel ? "right-[380px]" : "right-0",
                )}
                onClick={() => setShowRightPanel(!showRightPanel)}
              >
                {showRightPanel ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
              </Button>
            )}

            {/* Side panels (hidden in fullscreen) */}
            {!isFullscreen && (
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out z-20",
                  showRightPanel ? "w-[380px]" : "w-0",
                  isMobile && showRightPanel && "absolute inset-y-0 right-0 bg-background shadow-xl",
                )}
              >
                {showRightPanel && (
                  <div className="space-y-4 w-[380px]">
                    {/* Step Guide */}
                    <StepGuide
                      currentStep={currentStep}
                      totalSteps={TOTAL_STEPS}
                      sideA={sideA}
                      sideB={sideB}
                      onStepChange={handleStepChange}
                      onReset={handleReset}
                      isSpeaking={isSpeaking}
                      onToggleVoice={() => setIsSpeaking(!isSpeaking)}
                    />

                    {/* Theorem Visualizer */}
                    <TheoremVisualizer sideA={sideA} sideB={sideB} currentStep={currentStep} />

                    {/* Simple Controls */}
                    <Card className="bg-card/95 backdrop-blur border-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Triangle className="h-4 w-4 text-primary" />
                          Adjust Triangle
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-green-500">Side a</Label>
                            <span className="font-bold">{sideA}</span>
                          </div>
                          <Slider
                            value={[sideA]}
                            onValueChange={([v]) => setSideA(v)}
                            min={1}
                            max={8}
                            step={1}
                            className="[&>span:first-child]:bg-green-500/30 [&_[role=slider]]:bg-green-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-red-500">Side b</Label>
                            <span className="font-bold">{sideB}</span>
                          </div>
                          <Slider
                            value={[sideB]}
                            onValueChange={([v]) => setSideB(v)}
                            min={1}
                            max={8}
                            step={1}
                            className="[&>span:first-child]:bg-red-500/30 [&_[role=slider]]:bg-red-500"
                          />
                        </div>

                        <div className="flex justify-between items-center p-2 rounded bg-purple-500/20">
                          <Label className="text-purple-500">Hypotenuse c</Label>
                          <span className="font-bold text-purple-500">{sideC.toFixed(2)}</span>
                        </div>

                        {/* Famous triples */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { a: 3, b: 4, label: "3-4-5" },
                            { a: 5, b: 12, label: "5-12" },
                            { a: 6, b: 8, label: "6-8" },
                            { a: 8, b: 6, label: "8-6" },
                          ].map((triple) => (
                            <Button
                              key={triple.label}
                              variant="outline"
                              size="sm"
                              className="text-xs bg-transparent"
                              onClick={() => {
                                setSideA(triple.a)
                                setSideB(triple.b)
                              }}
                            >
                              {triple.label}
                            </Button>
                          ))}
                        </div>

                        {/* Display toggles */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Switch checked={showSquares} onCheckedChange={setShowSquares} />
                            <Label className="text-sm">Squares</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch checked={showLabels} onCheckedChange={setShowLabels} />
                            <Label className="text-sm">Labels</Label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
