import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dna, Globe, Rocket, GraduationCap, MapPin, Mail, Phone, Award, Code } from "lucide-react"
import type { Metadata } from "next"

const techStack = [
  { name: "Next.js 16", description: "React framework for production" },
  { name: "Three.js", description: "3D graphics library" },
  { name: "React Three Fiber", description: "React renderer for Three.js" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework" },
  { name: "shadcn/ui", description: "Accessible component library" },
  { name: "TypeScript", description: "Type-safe JavaScript" },
]

const features = [
  {
    icon: Dna,
    title: "Interactive 3D Models",
    description: "Explore complex scientific structures with real-time 3D visualizations.",
    color: "text-biology",
  },
  {
    icon: Code,
    title: "Student Developed",
    description: "Built by a passionate Class 9 student from Navodaya Vidyalaya.",
    color: "text-primary",
  },
  {
    icon: Globe,
    title: "Accessible Learning",
    description: "WCAG compliant design ensuring education for everyone.",
    color: "text-physics",
  },
  {
    icon: Rocket,
    title: "Real-time Updates",
    description: "Live data visualization with 60fps animations.",
    color: "text-chemistry",
  },
]

export const metadata: Metadata = {
  title: "About Us | IIT KGP Young Innovators Programme Project",
  description:
    "Learn about Origlena Labs, India's first NCERT-aligned virtual laboratory platform. Developed by a Class 9 student from Navodaya Vidyalaya for IIT Kharagpur Young Innovators Programme. Meet the team behind this revolutionary e-lab platform.",
  keywords:
    "about origlena labs, IIT KGP YIP, Young Innovators Programme, Navodaya Vidyalaya, student developer, virtual lab creator, Jarjish Alam",
  openGraph: {
    title: "About Origlena Labs | IIT KGP YIP Project",
    description:
      "Developed by a Class 9 student from Navodaya Vidyalaya for IIT Kharagpur Young Innovators Programme. India's first NCERT-aligned virtual laboratory.",
    url: "https://origlenalabs.vercel.app/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Hero */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-16 text-center">
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Making STEM Education <span className="text-primary">Interactive</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Origlena Labs is dedicated to transforming how students learn science, technology, engineering, and
              mathematics through immersive simulations.
            </p>
          </div>
        </section>

        {/* Developer Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-4">
                  Meet the Developer
                </Badge>
                <h2 className="text-3xl font-bold">Development Team</h2>
              </div>

              <div className="max-w-xl mx-auto">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-primary/20 via-biology/20 to-physics/20 p-6 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-biology flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                          JA
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1.5 shadow-lg">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">Jarjish Alam</h3>
                        <p className="text-sm text-muted-foreground">
                          Lead Developer & Creator. A passionate young developer with a vision to make STEM education
                          more accessible.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span className="text-xs">Class 9 Student</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-xs">
                            PM SHRI Jawahar Navodaya Vidyalaya, Dakshin Dinajpur, West Bengal
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <a
                            href="mailto:jarjishalam0299@gmail.com"
                            className="text-xs hover:text-primary transition-colors"
                          >
                            jarjishalam0299@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <div className="text-xs space-x-2">
                            <a href="tel:+919609960381" className="hover:text-primary transition-colors">
                              +91 9609960381
                            </a>
                            <span className="text-muted-foreground">|</span>
                            <a href="tel:+917679565807" className="hover:text-primary transition-colors">
                              +91 7679565807
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  We believe that understanding complex scientific concepts shouldn&apos;t be limited by traditional
                  teaching methods. Our platform provides hands-on, interactive experiences that make abstract concepts
                  tangible.
                </p>
                <p className="text-muted-foreground mb-6">
                  From visualizing DNA double helices to simulating projectile motion and proving mathematical theorems,
                  our tools help students develop intuition for scientific phenomena through direct manipulation and
                  observation.
                </p>
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">6+</div>
                    <div className="text-sm text-muted-foreground">Simulations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-biology">3D</div>
                    <div className="text-sm text-muted-foreground">Interactive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-physics">4</div>
                    <div className="text-sm text-muted-foreground">Disciplines</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <Icon className={`h-8 w-8 ${feature.color} mb-3`} />
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Built With Modern Tech</h2>
              <p className="text-muted-foreground">
                Leveraging cutting-edge web technologies for the best learning experience
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {techStack.map((tech, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold mb-1">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* School Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">PM SHRI Jawahar Navodaya Vidyalaya</h2>
              <p className="text-muted-foreground mb-6">
                Navodaya Vidyalayas are a system of central government schools in India for talented students
                predominantly from rural areas. This platform was developed as part of the effort to enhance STEM
                education using modern technology and interactive learning methods.
              </p>

              <Card className="text-left">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-sm text-muted-foreground">Dakshin Dinajpur District, West Bengal, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
