import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Microscope, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSimulations } from "@/lib/simulations-store"

export const metadata: Metadata = {
  title: "Biology Virtual Lab | Interactive Cell, DNA & Genetics Simulations | CBSE Class 9-12",
  description:
    "Explore cell structure, DNA, photosynthesis, and genetics with interactive 3D simulations. Perfect for CBSE Class 9-12 students. Learn biology through immersive experiments.",
  keywords:
    "biology virtual lab, cell structure, DNA simulation, genetics, photosynthesis, CBSE biology, online biology lab, interactive biology",
  openGraph: {
    title: "Biology Virtual Lab | Cell Structure & Genetics Simulations",
    description: "Interactive 3D biology simulations for CBSE Class 9-12 students",
    url: "https://origlenalabs.vercel.app/biology-virtual-lab",
    type: "website",
  },
  alternates: {
    canonical: "https://origlenalabs.vercel.app/biology-virtual-lab",
  },
}

export default function BiologyLabPage() {
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
                name: "Biology Virtual Lab",
                item: "https://origlenalabs.vercel.app/biology-virtual-lab",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalSeries",
            name: "Biology Virtual Lab",
            description: "Interactive 3D biology simulations for CBSE students",
            educationallevel: ["CBSE Class 9", "CBSE Class 10", "CBSE Class 11", "CBSE Class 12"],
            hasPart: [
              {
                "@type": "EducationalResource",
                name: "Cell Structure",
                url: "https://origlenalabs.vercel.app/simulations/biology/cell",
              },
              {
                "@type": "EducationalResource",
                name: "DNA Double Helix",
                url: "https://origlenalabs.vercel.app/simulations/biology/dna",
              },
              {
                "@type": "EducationalResource",
                name: "Photosynthesis",
                url: "https://origlenalabs.vercel.app/simulations/biology/photosynthesis",
              },
              {
                "@type": "EducationalResource",
                name: "Species Generator",
                url: "https://origlenalabs.vercel.app/simulations/biology/species-generator",
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Microscope className="h-6 w-6 text-green-600" />
                <span className="text-sm font-semibold text-green-600 uppercase">Biology Virtual Lab</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Explore Cell Biology, Genetics & Life Sciences Through Interactive 3D Simulations
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Master cellular structure, molecular biology, and genetics with ultra-realistic simulations designed for
                CBSE Class 9-12 students. See the microscopic world come alive.
              </p>
              <Button size="lg" asChild>
                <Link href="/simulations?subject=biology">
                  Explore All Biology Simulations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Simulations */}
        <section className="py-12 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Biology Simulations</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              These simulations cover the core topics of CBSE Biology curriculum with interactive 3D visuals and
              comprehensive learning content.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Cell Structure */}
              <Link href="/simulations/biology/cell">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Cell Structure (Animal & Plant)</CardTitle>
                    <CardDescription>CBSE Class 9, 11</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore ultra-realistic 3D models of animal and plant cells with interactive organelles, detailed
                      labels, and comprehensive information about cell components.
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* DNA */}
              <Link href="/simulations/biology/dna">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>DNA Double Helix</CardTitle>
                    <CardDescription>CBSE Class 11, 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Interactive 3D visualization of DNA structure with base pair manipulation, genetic code
                      exploration, and real-time molecular dynamics.
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Photosynthesis */}
              <Link href="/simulations/biology/photosynthesis">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Photosynthesis Process</CardTitle>
                    <CardDescription>CBSE Class 11, 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Watch plants convert sunlight into energy with animated molecules and step-by-step visualization
                      of light reactions and Calvin Cycle.
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Species Generator */}
              <Link href="/simulations/biology/species-generator">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Species Generator</CardTitle>
                    <CardDescription>CBSE Class 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Combine genetics from two species to predict if cross-breeding is possible, analyze traits, and
                      visualize hybrid offspring.
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
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
                <h3 className="text-xl font-semibold mb-4">Cell Biology</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>Structure and function of cell organelles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>Differences between animal and plant cells</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>How cellular structures enable cellular functions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>The critical role of the nucleus and mitochondria</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Genetics & Molecular Biology</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>DNA structure and the genetic code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>How traits are inherited through generations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>The basis of evolution and species formation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    <span>Photosynthesis and energy conversion in cells</span>
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
                    <span>Learn complex biology concepts through visual, interactive simulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Practice and review before exams with unlimited access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Understand WHY biological processes work, not just memorize facts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Perform experiments safely that would be impossible in a real lab</span>
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
                    <span>Engage students with dynamic, 3D visualizations in the classroom</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Supplement curriculum with high-quality, CBSE-aligned content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Show concepts that are too small, too slow, or too dangerous to demonstrate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Differentiate learning with multiple difficulty levels</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Learning Biology Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              No equipment needed. No dangerous chemicals. No limitations. Just pure, immersive learning.
            </p>
            <Button size="lg" asChild>
              <Link href="/simulations?subject=biology">
                Explore All Biology Simulations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
