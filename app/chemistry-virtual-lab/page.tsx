import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Beaker, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Chemistry Virtual Lab | Molecular Viewer, pH & Reactions | CBSE Class 10-12",
  description:
    "Interactive chemistry simulations: periodic table, molecular viewer, pH scale, and chemical reactions. Perfect for CBSE Class 10-12 students. Safe virtual chemistry experiments.",
  keywords:
    "chemistry virtual lab, periodic table, molecular viewer, pH simulator, chemical reactions, CBSE chemistry, online chemistry lab, molecular structure",
  openGraph: {
    title: "Chemistry Virtual Lab | Molecules & Reactions Simulations",
    description: "Interactive 3D chemistry simulations for CBSE Class 10-12 students",
    url: "https://origlenalabs.vercel.app/chemistry-virtual-lab",
    type: "website",
  },
  alternates: {
    canonical: "https://origlenalabs.vercel.app/chemistry-virtual-lab",
  },
}

export default function ChemistryLabPage() {
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
                name: "Chemistry Virtual Lab",
                item: "https://origlenalabs.vercel.app/chemistry-virtual-lab",
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Beaker className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600 uppercase">Chemistry Virtual Lab</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Master Molecular Chemistry, Reactions & The Periodic Table With Interactive 3D Simulations
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore elements, molecules, pH chemistry, and perform safe chemical reactions impossible in a regular
                lab. Designed for CBSE Class 10-12 students.
              </p>
              <Button size="lg" asChild>
                <Link href="/simulations?subject=chemistry">
                  Explore All Chemistry Simulations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Simulations */}
        <section className="py-12 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Chemistry Simulations</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Explore atomic structure, molecular bonding, acid-base chemistry, and dramatic reactions with
              professional-grade 3D visualizations.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/simulations/chemistry/periodic-table">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Interactive Periodic Table</CardTitle>
                    <CardDescription>CBSE Class 10, 11</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore all 118 elements with 3D atomic structure visualization, electron shells, and detailed
                      chemical properties.
                    </p>
                    <div className="flex items-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/simulations/chemistry/molecular-viewer">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>3D Molecular Viewer</CardTitle>
                    <CardDescription>CBSE Class 10, 11, 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ultra-realistic 3D visualization of 100+ molecules with multiple view modes, bond angles, and
                      interactive exploration.
                    </p>
                    <div className="flex items-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/simulations/chemistry/ph-simulator">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>pH Scale Simulator</CardTitle>
                    <CardDescription>CBSE Class 10, 11, 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Interactive pH simulator with realistic beaker, adjustable acid/base strength, and real-time ion
                      concentration calculations.
                    </p>
                    <div className="flex items-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/simulations/chemistry/chemical-reactions">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Chemical Reactions Lab</CardTitle>
                    <CardDescription>CBSE Class 10, 11, 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Mix dangerous chemicals in a virtual lab and observe explosive reactions, color changes, and
                      real-time chemistry in cinematic detail.
                    </p>
                    <div className="flex items-center text-orange-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-12 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">What You'll Learn</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Atomic & Molecular Chemistry</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>Atomic structure and electron configuration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>Periodic table trends and element properties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>Chemical bonding and molecular geometry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>How structure determines chemical properties</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Reactions & Acid-Base Chemistry</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>Types of chemical reactions and balancing equations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>Acid-base chemistry and pH calculations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>Redox reactions and electron transfer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-3">✓</span>
                    <span>Chemical safety and lab hazards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* For Teachers & Students */}
        <section className="py-12 md:py-20 bg-blue-50 dark:bg-blue-950/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h3 className="text-2xl font-bold">For Students</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>See molecules and reactions in stunning 3D detail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Perform dangerous reactions safely in a virtual lab</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Understand the periodic table through interactive exploration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Practice chemistry concepts unlimited times without waste</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="text-2xl font-bold">For Teachers</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Demonstrate reactions impossible in a real classroom</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Show molecular structures in 3D to improve comprehension</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Align with CBSE curriculum for Class 10, 11, and 12</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Teach lab safety with dramatic, consequence-free demonstrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Master Chemistry Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              No beakers. No test tubes. No dangerous chemicals. Just pure, immersive chemistry learning.
            </p>
            <Button size="lg" asChild>
              <Link href="/simulations?subject=chemistry">
                Explore All Chemistry Simulations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
