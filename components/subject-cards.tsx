"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Dna, Atom, FlaskConical, Calculator, ArrowRight, Sprout } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export function SubjectCards() {
  const { t } = useLanguage()

  const subjects = [
    {
      name: t("subjects.biology"),
      description: t("subjects.biology.desc"),
      icon: Dna,
      href: "/biology-virtual-lab",
      color: "biology",
      simulations: 4,
      featured: "Cell Structure",
    },
    {
      name: t("subjects.physics"),
      description: t("subjects.physics.desc"),
      icon: Atom,
      href: "/physics-virtual-lab",
      color: "physics",
      simulations: 3,
      featured: "Projectile Motion",
    },
    {
      name: t("subjects.chemistry"),
      description: t("subjects.chemistry.desc"),
      icon: FlaskConical,
      href: "/chemistry-virtual-lab",
      color: "chemistry",
      simulations: 4,
      featured: "Periodic Table",
    },
    {
      name: t("subjects.mathematics"),
      description: t("subjects.mathematics.desc"),
      icon: Calculator,
      href: "/math-virtual-lab",
      color: "mathematics",
      simulations: 2,
      featured: "Unit Circle",
    },
    {
      name: t("subjects.agriculture"),
      description: t("subjects.agriculture.desc"),
      icon: Sprout,
      href: "/simulations?subject=agriculture",
      color: "green",
      simulations: 1,
      featured: "Crop Farming",
    },
  ]

  return (
    <section className="py-12 md:py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("subjects.title")}</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{t("subjects.subtitle")}</p>
        </div>

        {/* Cards Grid - responsive for mobile and smartboards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <Link key={subject.name} href={subject.href} className="group">
                <Card
                  className={cn(
                    "h-full border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                    `hover:border-${subject.color}/50`,
                  )}
                >
                  <CardContent className="p-4 md:p-6 flex flex-col h-full">
                    <div
                      className={cn(
                        "w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-all duration-300",
                        `bg-${subject.color}/10 group-hover:bg-${subject.color}/20`,
                      )}
                    >
                      <Icon className={cn("h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8", `text-${subject.color}`)} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{subject.name}</h3>
                    <p className="text-muted-foreground text-sm md:text-base flex-grow mb-3 md:mb-4">
                      {subject.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm md:text-base pt-3 md:pt-4 border-t border-border">
                      <span className="text-muted-foreground">
                        {subject.simulations} {t("subjects.simulations")}
                      </span>
                      <span
                        className={cn("flex items-center gap-1 font-medium transition-colors", `text-${subject.color}`)}
                      >
                        {t("subjects.explore")}
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
