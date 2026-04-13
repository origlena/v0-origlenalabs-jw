"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Atom, Dna, FlaskConical, Calculator, GraduationCap, BookOpen } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-biology/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-physics/15 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] animate-float" style={{ animationDelay: "0s" }}>
          <div className="p-3 rounded-xl bg-biology/10 border border-biology/20">
            <Dna className="h-6 w-6 text-biology" />
          </div>
        </div>
        <div className="absolute top-32 right-[15%] animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="p-3 rounded-xl bg-physics/10 border border-physics/20">
            <Atom className="h-6 w-6 text-physics" />
          </div>
        </div>
        <div className="absolute bottom-32 left-[20%] animate-float" style={{ animationDelay: "1s" }}>
          <div className="p-3 rounded-xl bg-chemistry/10 border border-chemistry/20">
            <FlaskConical className="h-6 w-6 text-chemistry" />
          </div>
        </div>
        <div className="absolute bottom-40 right-[25%] animate-float" style={{ animationDelay: "1.5s" }}>
          <div className="p-3 rounded-xl bg-mathematics/10 border border-mathematics/20">
            <Calculator className="h-6 w-6 text-mathematics" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <Badge variant="secondary" className="px-3 py-1">
              <BookOpen className="h-3 w-3 mr-1" />
              {t("hero.cbseAligned")}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <GraduationCap className="h-3 w-3 mr-1" />
              {t("hero.classRange")}
            </Badge>
            <Badge className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              {t("hero.aiPowered")}
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            {t("hero.title1")} <span className="text-primary">{t("hero.title2")}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 text-pretty">
            {t("hero.subtitle")}
          </p>

          <p className="text-sm text-muted-foreground mb-8">{t("hero.aligned")}</p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/simulations">
                {t("hero.startLearning")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
              <Link href="/simulations/biology/dna">{t("hero.tryDNA")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">11+</div>
              <div className="text-sm text-muted-foreground mt-1">{t("stats.simulations")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-biology">4</div>
              <div className="text-sm text-muted-foreground mt-1">{t("stats.subjects")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-physics">100+</div>
              <div className="text-sm text-muted-foreground mt-1">{t("stats.molecules")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chemistry">118</div>
              <div className="text-sm text-muted-foreground mt-1">{t("stats.elements")}</div>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm">
              {t("hero.developedFor")} <span className="font-semibold">{t("hero.iitKharagpur")}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
