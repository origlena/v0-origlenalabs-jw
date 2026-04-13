import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SubjectCards } from "@/components/subject-cards"
import { FeaturedSimulations } from "@/components/featured-simulations"
import { Footer } from "@/components/footer"
import { WelcomePopup } from "@/components/welcome-popup"
import { OriglenaAI } from "@/components/origlena-ai"
import { LabNotebook } from "@/components/lab-notebook"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Origlena Labs | #1 Virtual Lab & 3D E-Learning Platform for CBSE Students",
  description:
    "India's first NCERT-aligned virtual laboratory with 11+ interactive 3D STEM simulations. Best e-lab for CBSE Class 6-12. Free online science experiments in Physics, Chemistry, Biology & Math. Learn through immersive 3D learning. IIT KGP YIP Project.",
  keywords:
    "virtual lab, e-lab, e lab, 3d learning, 3d e-learning, online lab, origlena, origlena labs, origlenalabs, olabs, o labs, virtual laboratory, CBSE virtual lab, NCERT simulations, interactive science experiments, 3D simulations, best virtual lab India, free online lab, virtual science lab, online science experiments, 3d education, immersive learning, cbse online lab, ncert virtual lab, science lab online, chemistry lab online, physics lab online, biology lab online",
  openGraph: {
    title: "Origlena Labs | #1 Virtual Lab & 3D E-Learning for CBSE",
    description:
      "India's first NCERT-aligned virtual laboratory platform with interactive 3D STEM simulations for CBSE students",
    url: "https://origlenalabs.vercel.app",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Origlena Labs",
              alternateName: ["Origlenalabs", "Origlena", "OLabs Virtual Lab"],
              description:
                "India's first NCERT-aligned virtual laboratory platform with interactive 3D STEM simulations for CBSE students",
              url: "https://origlenalabs.vercel.app",
              logo: "https://origlenalabs.vercel.app/logo.png",
              sameAs: [
                "https://origlenalabs.vercel.app",
                "https://github.com/jarjishalam",
                "https://v0-origlena.vercel.app",
              ],
              founder: [
                {
                  "@type": "Person",
                  name: "Jarjish Alam",
                  email: "jarjishalam0299@gmail.com",
                  affiliation: "PM SHRI Jawahar Navodaya Vidyalaya",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dakshin Dinajpur",
                addressRegion: "West Bengal",
                addressCountry: "IN",
              },
              areaServed: "IN",
              availableLanguage: "en",
              educationalCredentialAwarded: "IIT Kharagpur Young Innovators Programme",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "STEM Simulations",
                itemListElement: [
                  {
                    "@type": "Course",
                    name: "Physics Simulations",
                    description: "Interactive physics experiments including projectile motion, electromagnetic induction",
                    provider: {
                      "@type": "Organization",
                      name: "Origlena Labs",
                    },
                  },
                  {
                    "@type": "Course",
                    name: "Chemistry Simulations",
                    description: "3D molecular viewer, pH simulator, periodic table explorer",
                    provider: {
                      "@type": "Organization",
                      name: "Origlena Labs",
                    },
                  },
                  {
                    "@type": "Course",
                    name: "Biology Simulations",
                    description: "DNA structure, cell anatomy, photosynthesis, species generator",
                    provider: {
                      "@type": "Organization",
                      name: "Origlena Labs",
                    },
                  },
                  {
                    "@type": "Course",
                    name: "Mathematics Simulations",
                    description: "Pythagoras theorem, unit circle, geometric visualizations",
                    provider: {
                      "@type": "Organization",
                      name: "Origlena Labs",
                    },
                  },
                ],
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Origlena Labs",
              url: "https://origlenalabs.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://origlenalabs.vercel.app/simulations?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://origlenalabs.vercel.app",
                },
              ],
            },
          ]),
        }}
      />
      <div className="min-h-screen flex flex-col">
        <WelcomePopup />
        <PWAInstallPrompt />
        <Navigation />
        <main className="flex-grow">
          <HeroSection />
          <SubjectCards />
          <FeaturedSimulations />
        </main>
        <Footer />
        <OriglenaAI />
        <LabNotebook />
      </div>
    </>
  )
}
