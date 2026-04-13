import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Zap, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Physics Virtual Lab | Motion, Circuits & Waves | CBSE Class 10-12",
  description:
    "Interactive physics simulations: projectile motion, Ohm's Law circuits, and electromagnetic induction. Perfect for CBSE Class 10-12 students.",
  keywords:
    "physics virtual lab, projectile motion, Ohm's Law, electromagnetic induction, circuits, CBSE physics, online physics lab, kinematics",
  openGraph: {
    title: "Physics Virtual Lab | Motion & Circuits Simulations",
    description: "Interactive physics simulations for CBSE Class 10-12 students",
    url: "https://origlenalabs.vercel.app/physics-virtual-lab",
    type: "website",
  },
  alternates: {
    canonical: "https://origlenalabs.vercel.app/physics-virtual-lab",
  },
}

export default function PhysicsLabPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://origlenalabs.vercel.app",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Physics Virtual Lab",
                item: "https://origlenalabs.vercel.app/physics-virtual-lab",
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen pt-20 md:pt-24">
        <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 uppercase">Physics Virtual Lab</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Explore Motion, Electricity & Magnetism Through Interactive Physics Simulations
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                From projectile motion to electromagnetic induction, master core physics concepts with interactive
                experiments. Designed for CBSE Class 10-12.
              </p>
              <Button size="lg" asChild>
                <Link href="/simulations?subject=physics">
                  Explore All Physics Simulations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Physics Simulations</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Explore mechanics, electricity, and magnetism with visual experiments that bring physics to life.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/simulations/physics/projectile-motion">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Projectile Motion</CardTitle>
                    <CardDescription>CBSE Class 11</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Launch projectiles and explore how initial velocity, angle, and gravity affect trajectory and
                      range.
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/simulations/physics/ohms-law">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Ohm's Law Circuit</CardTitle>
                    <CardDescription>CBSE Class 10, 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Interactive circuit with adjustable voltage, current, and resistance showing effects on light
                      bulbs.
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/simulations/physics/electromagnetic-induction">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Electromagnetic Induction</CardTitle>
                    <CardDescription>CBSE Class 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore Faraday's Law with 3D visualization of magnets, coils, and induced EMF in real time.
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="h-full opacity-50 pointer-events-none">
                <CardHeader>
                  <CardTitle>More Coming Soon</CardTitle>
                  <CardDescription>Waves, Light, Thermodynamics</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Mechanics & Motion</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">✓</span>
                    <span>Kinematics: velocity, acceleration, trajectory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">✓</span>
                    <span>Forces and Newton's laws of motion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">✓</span>
                    <span>Energy and momentum conservation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Electricity & Magnetism</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">✓</span>
                    <span>Ohm's Law and circuit analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">✓</span>
                    <span>Faraday's Law and electromagnetic induction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">✓</span>
                    <span>AC circuits and generators</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Master Physics Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              See the invisible forces that govern our universe.
            </p>
            <Button size="lg" asChild>
              <Link href="/simulations?subject=physics">
                Explore All Physics Simulations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
