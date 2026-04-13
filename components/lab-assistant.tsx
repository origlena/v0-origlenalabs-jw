"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Maximize2,
  Lightbulb,
  BookOpen,
  FlaskConical,
  Calculator,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickQuestions = [
  { icon: Lightbulb, text: "Explain photosynthesis", category: "biology" },
  { icon: FlaskConical, text: "What is pH scale?", category: "chemistry" },
  { icon: Calculator, text: "Explain Pythagoras theorem", category: "math" },
  { icon: BookOpen, text: "How does DNA replication work?", category: "biology" },
]

// Knowledge base for the AI assistant
const knowledgeBase: Record<string, string> = {
  // Biology
  photosynthesis: `**Photosynthesis** is the process by which plants convert light energy into chemical energy.

**The Equation:**
6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂

**Key Steps:**
1. **Light Absorption** - Chlorophyll captures sunlight
2. **Water Splitting** - H₂O molecules are split, releasing O₂
3. **Carbon Fixation** - CO₂ is converted to glucose

**Fun Fact:** Plants produce about 70% of Earth's oxygen!`,

  dna: `**DNA (Deoxyribonucleic Acid)** is the molecule that carries genetic information.

**Structure:**
- Double helix shape (like a twisted ladder)
- Made of nucleotides: A, T, G, C
- Base pairs: A-T and G-C

**Key Concepts:**
1. **Replication** - DNA copies itself before cell division
2. **Transcription** - DNA → RNA
3. **Translation** - RNA → Protein

**Fun Fact:** If you uncoiled all DNA in your body, it would stretch to the sun and back 600 times!`,

  cell: `**Cells** are the basic unit of life. There are two main types:

**Animal Cell:**
- No cell wall
- Small vacuoles
- Has centrioles
- Irregular shape

**Plant Cell:**
- Has cell wall (cellulose)
- Large central vacuole
- Has chloroplasts
- Regular/rectangular shape

**Common Organelles:**
- Nucleus (control center)
- Mitochondria (powerhouse)
- Ribosomes (protein factories)
- ER & Golgi (transport system)`,

  // Chemistry
  ph: `**pH Scale** measures how acidic or basic a solution is.

**Scale:** 0 to 14
- **0-6:** Acidic (more H⁺ ions)
- **7:** Neutral (pure water)
- **8-14:** Basic/Alkaline (more OH⁻ ions)

**Formula:** pH = -log[H⁺]

**Examples:**
- Lemon juice: pH 2 (acidic)
- Blood: pH 7.4 (slightly basic)
- Bleach: pH 13 (very basic)

**Tip:** Each pH unit = 10x difference in H⁺ concentration!`,

  periodic: `**The Periodic Table** organizes all 118 elements by atomic number.

**Organization:**
- **Rows (Periods):** 7 periods, elements get heavier
- **Columns (Groups):** Similar properties
- **Blocks:** s, p, d, f based on electron configuration

**Key Groups:**
- Group 1: Alkali metals (reactive)
- Group 17: Halogens
- Group 18: Noble gases (stable)

**Trends:**
- Atomic radius decreases across a period
- Electronegativity increases across a period`,

  molecule: `**Molecules** are two or more atoms bonded together.

**Types of Bonds:**
1. **Covalent** - Sharing electrons (H₂O)
2. **Ionic** - Transfer of electrons (NaCl)
3. **Metallic** - Electron sea (metals)

**Molecular Geometry:**
- Linear (CO₂)
- Bent (H₂O)
- Tetrahedral (CH₄)
- Trigonal planar (BF₃)

**VSEPR Theory** predicts molecular shape based on electron repulsion.`,

  // Physics
  ohm: `**Ohm's Law** relates voltage, current, and resistance.

**Formula:** V = I × R

Where:
- **V** = Voltage (Volts)
- **I** = Current (Amperes)
- **R** = Resistance (Ohms)

**Power:** P = V × I = I²R = V²/R

**Key Concepts:**
- Higher resistance = Lower current
- Series: Resistances add up
- Parallel: 1/R_total = 1/R₁ + 1/R₂

**Application:** Used in designing circuits, LED brightness control, etc.`,

  projectile: `**Projectile Motion** is motion under gravity with an initial velocity.

**Key Equations:**
- Horizontal: x = v₀cosθ × t
- Vertical: y = v₀sinθ × t - ½gt²

**Important Values:**
- **Max Range:** at 45° angle
- **Max Height:** H = (v₀sinθ)²/2g
- **Time of Flight:** T = 2v₀sinθ/g

**Factors:**
- Air resistance reduces range
- Higher launch = longer flight time

**Applications:** Sports, artillery, rockets`,

  electromagnetic: `**Electromagnetic Induction** (Faraday's Law)

**Principle:** A changing magnetic field induces an electric current.

**Faraday's Law:** EMF = -N × dΦ/dt

Where:
- EMF = Electromotive force (voltage)
- N = Number of coil turns
- Φ = Magnetic flux
- dΦ/dt = Rate of change of flux

**Lenz's Law:** Induced current opposes the change.

**Applications:**
- Electric generators
- Transformers
- Induction cooktops
- Wireless charging`,

  // Math
  pythagoras: `**Pythagoras Theorem** - For right triangles:

**Formula:** a² + b² = c²

Where:
- a, b = two shorter sides (legs)
- c = longest side (hypotenuse)

**Proof Methods:**
1. Area rearrangement
2. Similar triangles
3. Algebraic proof

**Pythagorean Triples:**
- 3, 4, 5
- 5, 12, 13
- 8, 15, 17
- 7, 24, 25

**Applications:** Navigation, construction, computer graphics`,

  trigonometry: `**Trigonometry** - Study of triangles and angles.

**Basic Ratios (SOH-CAH-TOA):**
- sin θ = Opposite/Hypotenuse
- cos θ = Adjacent/Hypotenuse
- tan θ = Opposite/Adjacent

**Unit Circle:**
- Radius = 1
- sin θ = y-coordinate
- cos θ = x-coordinate

**Key Identities:**
- sin²θ + cos²θ = 1
- tan θ = sin θ/cos θ

**Quadrant Signs (ASTC):**
All → Sin → Tan → Cos`,

  "unit circle": `**The Unit Circle** is a circle with radius 1 centered at origin.

**Key Points:**
- (1, 0) at 0°
- (0, 1) at 90°
- (-1, 0) at 180°
- (0, -1) at 270°

**Common Angles:**
- 30° → (√3/2, 1/2)
- 45° → (√2/2, √2/2)
- 60° → (1/2, √3/2)

**Relationship:**
- x = cos θ
- y = sin θ

**Applications:** Wave functions, rotations, physics`,
}

function getAIResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  // Check knowledge base
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lowerQuery.includes(key)) {
      return value
    }
  }

  // Generic responses
  if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
    return "Hello! I'm your AI Lab Assistant. I can help you understand concepts in Biology, Chemistry, Physics, and Mathematics. Try asking me about photosynthesis, DNA, pH scale, Ohm's law, or any topic from our simulations!"
  }

  if (lowerQuery.includes("help")) {
    return `I can help you with:

**Biology:** DNA, Cells, Photosynthesis
**Chemistry:** pH Scale, Periodic Table, Molecules
**Physics:** Ohm's Law, Projectile Motion, Electromagnetic Induction
**Math:** Pythagoras, Trigonometry, Unit Circle

Just ask me any question about these topics!`
  }

  if (lowerQuery.includes("thank")) {
    return "You're welcome! Keep exploring and learning. Science is amazing! 🔬"
  }

  return `I'd be happy to help you learn about that topic! 

Currently, I have detailed information about:
- **Biology:** DNA, Cells, Photosynthesis
- **Chemistry:** pH, Periodic Table, Molecular structures
- **Physics:** Ohm's Law, Projectile Motion
- **Math:** Pythagoras, Trigonometry

Try asking specifically about one of these topics, or explore our interactive simulations for hands-on learning!`
}

export function LabAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI Lab Assistant powered by Origlena Labs. Ask me anything about Biology, Chemistry, Physics, or Mathematics!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    const response = getAIResponse(input)

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 md:h-16 md:w-16 rounded-full shadow-lg bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 touch-manipulation"
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        <span className="sr-only">Open Lab Assistant</span>
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        "fixed z-50 shadow-2xl border-2 border-primary/20 transition-all duration-300",
        isMinimized
          ? "bottom-6 right-6 w-72 h-14"
          : "bottom-6 right-6 w-[95vw] sm:w-96 md:w-[450px] h-[70vh] max-h-[600px]",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-t-lg">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center">
              <Bot className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h3 className="font-semibold text-sm md:text-base">AI Lab Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by Origlena Labs</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 touch-manipulation"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 touch-manipulation">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 h-[calc(100%-140px)] p-3 md:p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-2 md:gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content.split("\n").map((line, i) => {
                        // Handle bold text
                        const parts = line.split(/(\*\*[^*]+\*\*)/g)
                        return (
                          <span key={i}>
                            {parts.map((part, j) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return <strong key={j}>{part.slice(2, -2)}</strong>
                              }
                              return part
                            })}
                            {i < message.content.split("\n").length - 1 && <br />}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 md:gap-3">
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span
                        className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(q.text)}
                      className="text-xs h-8 touch-manipulation"
                    >
                      <q.icon className="h-3 w-3 mr-1.5" />
                      {q.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-3 md:p-4 border-t bg-background/50">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 h-10 md:h-11 text-sm md:text-base touch-manipulation"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="h-10 w-10 md:h-11 md:w-11 touch-manipulation"
              >
                <Send className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </form>
          </div>
        </>
      )}
    </Card>
  )
}
