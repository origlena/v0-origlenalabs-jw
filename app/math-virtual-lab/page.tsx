import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sigma, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Math Virtual Lab | Trigonometry & Geometry | CBSE Class 9-12",
  description:
    "Interactive mathematics simulations: unit circle, trigonometry, Pythagoras theorem. Perfect for CBSE Class 9-12 students. Visualize math concepts.",
  keywords:
    "math virtual lab, trigonometry, unit circle, Pythagoras theorem, geometry, CBSE mathematics, online math lab, math simulation",
  openGraph: {
    title: "Math Virtual Lab | Trigonometry & Geometry Simulations",
    description: "Interactive mathematics simulations for CBSE Class 9-12 students",
    url: "https://origlenalabs.vercel.app/math-virtual-lab",
    type: "website",
  },
  alternates: {
    canonical: "https://origlenalabs.vercel.app/math-virtual-lab",
  },
}

export default function MathLabPage() {
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
                name: "Math Virtual Lab",
                item: "https://origlenalabs.vercel.app/math-virtual-lab",
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen pt-20 md:pt-24">
        <section className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-background py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Sigma className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 uppercase">Math Virtual Lab</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Visualize & Understand Mathematics Through Interactive Simulations
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Master trigonometry, geometry, and mathematical proofs by seeing them in action. Perfect for CBSE
                Class 9-12 students.
              </p>
              <Button size="lg" asChild>
                <Link href="/simulations?subject=math">
                  Explore All Math Simulations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Math Simulations</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              See geometry, trigonometry, and algebra come to life through interactive visual experiments.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/simulations/math/pythagoras">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Pythagoras Theorem</CardTitle>
                    <CardDescription>CBSE Class 9, 10</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Interactive visual proofs of a² + b² = c² with multiple proof methods and 3D demonstrations.
                    </p>
                    <div className="flex items-center text-purple-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/simulations/math/unit-circle">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Unit Circle & Trigonometry</CardTitle>
                    <CardDescription>CBSE Class 11, 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Interactive unit circle with all trig functions, visual triangles, and real-time graph plotting.
                    </p>
                    <div className="flex items-center text-purple-600 text-sm font-medium">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Geometry & Proofs</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">✓</span>
                    <span>The Pythagorean theorem and geometric proofs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">✓</span>
                    <span>Right triangle properties and Pythagorean triples</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">✓</span>
                    <span>Geometric reasoning and visual proof methods</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Trigonometry & Functions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">✓</span>
                    <span>The unit circle and trigonometric functions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">✓</span>
                    <span>Sine, cosine, and tangent relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">✓</span>
                    <span>Periodic functions and graph transformations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Master Mathematics Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stop memorizing formulas. Start understanding the beauty of mathematics.
            </p>
            <Button size="lg" asChild>
              <Link href="/simulations?subject=math">
                Explore All Math Simulations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
