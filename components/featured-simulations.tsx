"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Star, Clock, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const featured = [
  {
    title: "DNA Double Helix",
    description: "Interactive 3D model with base pair visualization and real-time rotation controls.",
    subject: "Biology",
    color: "biology",
    difficulty: "Beginner",
    duration: "15 min",
    rating: 4.9,
    users: "12.5k",
    href: "/simulations/biology/dna",
    image: "/3d-dna-double-helix-dark-theme.jpg",
  },
  {
    title: "Photosynthesis Process",
    description: "Watch plants convert sunlight into energy with animated molecules and step-by-step visualization.",
    subject: "Biology",
    color: "biology",
    difficulty: "Beginner",
    duration: "5 min",
    rating: 4.8,
    users: "8.2k",
    href: "/simulations/biology/photosynthesis",
    image: "/photosynthesis-process-plant-leaf-sunlight-green.jpg",
  },
  {
    title: "Cell Structure (Animal & Plant)",
    description: "Explore animal and plant cells in 3D with interactive organelles and detailed information.",
    subject: "Biology",
    color: "biology",
    difficulty: "Beginner",
    duration: "15 min",
    rating: 4.9,
    users: "20.5k",
    href: "/simulations/biology/cell",
    image: "/3d-cell-structure-organelles-colorful.jpg",
  },
  {
    title: "Ohm's Law Circuit",
    description: "Interactive circuit with 4 bulbs showing voltage, current, resistance and power effects.",
    subject: "Physics",
    color: "physics",
    difficulty: "Beginner",
    duration: "10 min",
    rating: 4.7,
    users: "9.3k",
    href: "/simulations/physics/ohms-law",
    image: "/electric-circuit-with-battery-resistor-ammeter-vol.jpg",
  },
  {
    title: "Projectile Motion",
    description: "Launch projectiles with adjustable angle, velocity, gravity, and air resistance effects.",
    subject: "Physics",
    color: "physics",
    difficulty: "Intermediate",
    duration: "10 min",
    rating: 4.9,
    users: "14.2k",
    href: "/simulations/physics/projectile-motion",
    image: "/projectile-motion-physics-trajectory.jpg",
  },
  {
    title: "Unit Circle & Trigonometry",
    description: "Interactive unit circle with all trig functions, visual triangle, and real-time graph plotting.",
    subject: "Math",
    color: "math",
    difficulty: "Intermediate",
    duration: "10 min",
    rating: 4.9,
    users: "15.2k",
    href: "/simulations/math/unit-circle",
    image: "/unit-circle-trigonometry-colorful-math.jpg",
  },
  {
    title: "Pythagoras Theorem Prover",
    description: "Interactive visual proofs of a² + b² = c² with area, rearrangement, and water-fill methods.",
    subject: "Math",
    color: "math",
    difficulty: "Beginner",
    duration: "8 min",
    rating: 4.9,
    users: "11.8k",
    href: "/simulations/math/pythagoras",
    image: "/pythagoras-theorem-right-triangle-squares.jpg",
  },
  {
    title: "Interactive Periodic Table",
    description: "Explore all 118 elements with 3D visualization and electron shell models.",
    subject: "Chemistry",
    color: "chemistry",
    difficulty: "Beginner",
    duration: "15 min",
    rating: 4.9,
    users: "18.5k",
    href: "/simulations/chemistry/periodic-table",
    image: "/periodic-table-colorful-elements-3d.jpg",
  },
  {
    title: "pH Scale Simulator",
    description: "Interactive 3D pH simulator with realistic beaker, acids, bases, and color changes.",
    subject: "Chemistry",
    color: "chemistry",
    difficulty: "Beginner",
    duration: "10 min",
    rating: 4.8,
    users: "10.2k",
    href: "/simulations/chemistry/ph-simulator",
    image: "/ph-simulator-beaker-colorful-liquid.jpg",
  },
  {
    title: "3D Molecular Viewer",
    description: "Ultra-realistic 3D molecular visualization with 50+ molecules and interactive labels.",
    subject: "Chemistry",
    color: "chemistry",
    difficulty: "Intermediate",
    duration: "15 min",
    rating: 4.9,
    users: "16.8k",
    href: "/simulations/chemistry/molecular-viewer",
    image: "/3d-molecules-chemistry-realistic.jpg",
  },
]

export function FeaturedSimulations() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Simulations</h2>
            <p className="text-muted-foreground text-lg">Most popular experiments from our collection</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/simulations">View All Simulations</Link>
          </Button>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <Link key={item.title} href={item.href} className="group">
              <Card className="overflow-hidden h-full border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-card to-muted overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", `bg-${item.color}`)}>
                      <Play className="h-6 w-6 text-primary-foreground ml-1" />
                    </div>
                  </div>

                  {/* Badge */}
                  <Badge className={cn("absolute top-4 left-4", `bg-${item.color}/90 hover:bg-${item.color}`)}>
                    {item.subject}
                  </Badge>
                </div>

                <CardContent className="p-5">
                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {item.users}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {item.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
