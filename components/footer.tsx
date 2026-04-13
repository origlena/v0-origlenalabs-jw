import Link from "next/link"
import { Dna, Mail, Phone } from "lucide-react"

const footerLinks = {
  simulations: [
    { name: "Biology", href: "/simulations/biology/dna" },
    { name: "Physics", href: "/simulations/physics/ohms-law" },
    { name: "Chemistry", href: "/simulations" },
    { name: "Mathematics", href: "/simulations/math/pythagoras" },
  ],
  resources: [
    { name: "All Simulations", href: "/simulations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Dna className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Origlena Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Making STEM education interactive and accessible for everyone through immersive 3D simulations.
            </p>

            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <h4 className="font-semibold text-sm mb-3 text-primary">Development Team</h4>

              <div>
                <p className="text-sm font-medium">Jarjish Alam</p>
                <p className="text-xs text-muted-foreground">Lead Developer | Class 9</p>
                <p className="text-xs text-muted-foreground">PM SHRI JNV, Dakshin Dinajpur, WB</p>

                <div className="mt-2 space-y-1">
                  <a
                    href="mailto:jarjishalam0299@gmail.com"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-3 w-3" />
                    jarjishalam0299@gmail.com
                  </a>
                  <a
                    href="tel:+919609960381"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    +91 9609960381
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Simulations */}
          <div>
            <h4 className="font-semibold mb-4">Simulations</h4>
            <ul className="space-y-2">
              {footerLinks.simulations.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Origlena Labs. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Developed by <span className="text-primary font-medium">Jarjish Alam</span> | Built with Next.js & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
