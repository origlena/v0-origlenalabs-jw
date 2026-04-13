"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Simulation {
  id: string
  title: string
  description: string
  subject: "biology" | "physics" | "chemistry" | "math" | "agriculture" // Added agriculture
  difficulty: "beginner" | "intermediate" | "advanced"
  topics: string[]
  duration: string
  rating: number
  users: string
  href: string
  featured?: boolean
  createdAt?: string
  isCustom?: boolean
  type?: "react" | "html" | "iframe"
  uploadedFiles?: string[]
}

interface SimulationsContextType {
  simulations: Simulation[]
  addSimulation: (sim: Omit<Simulation, "id" | "createdAt">) => void
  updateSimulation: (id: string, sim: Partial<Simulation>) => void
  deleteSimulation: (id: string) => void
}

const defaultSimulations: Simulation[] = [
  {
    id: "dna",
    title: "DNA Double Helix",
    description: "Interactive 3D model with base pair visualization and real-time rotation controls.",
    subject: "biology",
    difficulty: "beginner",
    topics: ["DNA Structure", "Genetics", "Molecular Biology"],
    duration: "15 min",
    rating: 4.9,
    users: "12.5k",
    href: "/simulations/biology/dna",
    featured: true,
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis Process",
    description: "Watch plants convert sunlight into energy with animated molecules and step-by-step visualization.",
    subject: "biology",
    difficulty: "beginner",
    topics: ["Photosynthesis", "Plant Biology", "Energy Conversion"],
    duration: "5 min",
    rating: 4.8,
    users: "8.2k",
    href: "/simulations/biology/photosynthesis",
    featured: true,
  },
  {
    id: "cell-structure",
    title: "Cell Structure (Animal & Plant)",
    description: "Explore animal and plant cells in 3D with interactive organelles, labels, and detailed information.",
    subject: "biology",
    difficulty: "beginner",
    topics: ["Cell Biology", "Organelles", "Animal Cell", "Plant Cell"],
    duration: "15 min",
    rating: 4.9,
    users: "20.5k",
    href: "/simulations/biology/cell",
    featured: true,
  },
  {
    id: "ohms-law",
    title: "Ohm's Law Circuit",
    description:
      "Interactive circuit with 4 bulbs showing voltage, current, resistance relationships and power effects.",
    subject: "physics",
    difficulty: "beginner",
    topics: ["Electricity", "Circuits", "Ohm's Law"],
    duration: "10 min",
    rating: 4.7,
    users: "9.3k",
    href: "/simulations/physics/ohms-law",
    featured: true,
  },
  {
    id: "projectile-motion",
    title: "Projectile Motion",
    description:
      "Launch projectiles and explore trajectories with adjustable angle, velocity, gravity, and air resistance.",
    subject: "physics",
    difficulty: "intermediate",
    topics: ["Kinematics", "Gravity", "Air Resistance", "Trajectories"],
    duration: "10 min",
    rating: 4.9,
    users: "14.2k",
    href: "/simulations/physics/projectile-motion",
    featured: true,
  },
  {
    id: "electromagnetic-induction",
    title: "Electromagnetic Induction",
    description: "Explore Faraday's Law with interactive 3D visualization of magnets, coils, and induced EMF.",
    subject: "physics",
    difficulty: "intermediate",
    topics: ["Faraday's Law", "EMF", "Magnetic Flux", "Lenz's Law"],
    duration: "12 min",
    rating: 4.9,
    users: "11.2k",
    href: "/simulations/physics/electromagnetic-induction",
    featured: true,
  },
  {
    id: "unit-circle",
    title: "Unit Circle & Trigonometry",
    description: "Interactive unit circle with all trig functions, visual triangle, and real-time graph plotting.",
    subject: "math",
    difficulty: "intermediate",
    topics: ["Trigonometry", "Unit Circle", "Sin Cos Tan"],
    duration: "10 min",
    rating: 4.9,
    users: "15.2k",
    href: "/simulations/math/unit-circle",
    featured: true,
  },
  {
    id: "pythagoras",
    title: "Pythagoras Theorem Prover",
    description: "Interactive visual proofs of a² + b² = c² with multiple proof methods including 3D demonstrations.",
    subject: "math",
    difficulty: "beginner",
    topics: ["Pythagoras", "Geometry", "Proofs", "Right Triangles"],
    duration: "8 min",
    rating: 4.9,
    users: "11.8k",
    href: "/simulations/math/pythagoras",
    featured: true,
  },
  {
    id: "periodic-table",
    title: "Interactive Periodic Table",
    description: "Explore all 118 elements with 3D visualization, electron shell models, and detailed properties.",
    subject: "chemistry",
    difficulty: "beginner",
    topics: ["Periodic Table", "Elements", "Atomic Structure", "Chemistry"],
    duration: "15 min",
    rating: 4.9,
    users: "18.5k",
    href: "/simulations/chemistry/periodic-table",
    featured: true,
  },
  {
    id: "ph-simulator",
    title: "pH Scale Simulator",
    description: "Interactive 3D pH simulator with realistic beaker, acids, bases, and ion concentration calculations.",
    subject: "chemistry",
    difficulty: "beginner",
    topics: ["pH Scale", "Acids and Bases", "Ion Concentration", "Chemistry"],
    duration: "10 min",
    rating: 4.8,
    users: "10.2k",
    href: "/simulations/chemistry/ph-simulator",
    featured: true,
  },
  {
    id: "molecular-viewer",
    title: "3D Molecular Viewer",
    description:
      "Ultra-realistic 3D molecular visualization with 100+ molecules, multiple view modes, and interactive labels.",
    subject: "chemistry",
    difficulty: "intermediate",
    topics: ["Molecular Structure", "Chemical Bonds", "Organic Chemistry", "3D Visualization"],
    duration: "15 min",
    rating: 4.9,
    users: "16.8k",
    href: "/simulations/chemistry/molecular-viewer",
    featured: true,
  },
  {
    id: "crop-farming",
    title: "3D Crop Farming Simulator",
    description:
      "Plant crops, manage fertilizers, control nutrients, and see seasonal effects and diseases in real-time.",
    subject: "agriculture",
    difficulty: "intermediate",
    topics: ["Agriculture", "Crop Management", "Fertilizers", "NPK", "Soil Health", "Seasons", "Plant Diseases"],
    duration: "20 min",
    rating: 5.0,
    users: "2.5k",
    href: "/simulations/agriculture/crop-farming",
    featured: true,
  },
  {
    id: "species-generator",
    title: "Species Generator",
    description:
      "Combine genetics from two species to analyze feasibility, predict traits, and visualize hybrid offspring.",
    subject: "biology",
    difficulty: "advanced",
    topics: ["Genetics", "Hybridization", "Evolution", "Chromosomes", "DNA", "Speciation"],
    duration: "15 min",
    rating: 5.0,
    users: "1.2k",
    href: "/simulations/biology/species-generator",
    featured: true,
  },
  {
    id: "chemical-reactions",
    title: "Chemical Reactions Lab",
    description:
      "Mix dangerous chemicals safely in virtual 3D lab. See explosive reactions, color changes, and real-time chemistry in cinematic detail.",
    subject: "chemistry",
    difficulty: "intermediate",
    topics: ["Chemical Reactions", "Safety", "Acids & Bases", "Redox", "Explosions", "Lab Techniques"],
    duration: "20 min",
    rating: 5.0,
    users: "500",
    href: "/simulations/chemistry/chemical-reactions",
    featured: true,
  },
]

const SimulationsContext = createContext<SimulationsContextType | undefined>(undefined)

export function SimulationsProvider({ children }: { children: ReactNode }) {
  const [simulations, setSimulations] = useState<Simulation[]>(defaultSimulations)

  useEffect(() => {
    const stored = localStorage.getItem("origlena-simulations")
    if (stored) {
      try {
        const customSims = JSON.parse(stored) as Simulation[]
        setSimulations([...defaultSimulations, ...customSims])
      } catch (e) {
        console.error("Failed to parse stored simulations", e)
      }
    }
  }, [])

  const addSimulation = (sim: Omit<Simulation, "id" | "createdAt">) => {
    const newSim: Simulation = {
      ...sim,
      id: `custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isCustom: true,
    }

    setSimulations((prev) => {
      const updated = [...prev, newSim]
      const customSims = updated.filter((s) => s.isCustom)
      localStorage.setItem("origlena-simulations", JSON.stringify(customSims))
      return updated
    })
  }

  const updateSimulation = (id: string, updates: Partial<Simulation>) => {
    setSimulations((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      const customSims = updated.filter((s) => s.isCustom)
      localStorage.setItem("origlena-simulations", JSON.stringify(customSims))
      return updated
    })
  }

  const deleteSimulation = (id: string) => {
    setSimulations((prev) => {
      const updated = prev.filter((s) => s.id !== id)
      const customSims = updated.filter((s) => s.isCustom)
      localStorage.setItem("origlena-simulations", JSON.stringify(customSims))
      return updated
    })
  }

  return (
    <SimulationsContext.Provider value={{ simulations, addSimulation, updateSimulation, deleteSimulation }}>
      {children}
    </SimulationsContext.Provider>
  )
}

export function useSimulations() {
  const context = useContext(SimulationsContext)
  if (!context) {
    throw new Error("useSimulations must be used within a SimulationsProvider")
  }
  return context
}
