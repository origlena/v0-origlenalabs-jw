import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Simulations | Virtual Lab Experiments Gallery",
  description:
    "Browse 11+ interactive STEM simulations including DNA structure, projectile motion, molecular viewer, pH simulator, cell anatomy, and more. CBSE/NCERT aligned virtual lab experiments for Class 6-12.",
  keywords:
    "virtual lab simulations, e-lab experiments, interactive science simulations, 3D lab experiments, physics simulations, chemistry simulations, biology simulations, math simulations, CBSE lab experiments",
  openGraph: {
    title: "All Simulations | Origlena Labs Virtual Laboratory",
    description:
      "Browse 11+ interactive STEM simulations. CBSE/NCERT aligned virtual lab experiments for Physics, Chemistry, Biology, and Mathematics.",
    url: "https://origlenalabs.vercel.app/simulations",
  },
}

export default function SimulationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
