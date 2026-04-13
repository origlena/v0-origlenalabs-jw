import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SimulationsProvider } from "@/lib/simulations-store"
import { SupabaseAuthProvider } from "@/lib/supabase-auth"
import { LanguageProvider } from "@/lib/language-context"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Origlena Labs | Virtual Lab & Interactive STEM Simulations for CBSE Students",
    template: "%s | Origlena Labs",
  },
  description:
    "India's first NCERT-aligned virtual laboratory platform. Experience interactive 3D simulations for Physics, Chemistry, Biology, and Mathematics. E-lab for CBSE Class 6-12 students. Learn through hands-on experiments online. Free virtual science lab by IIT KGP YIP.",
  generator: "v0.app",
  applicationName: "Origlena Labs",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  keywords: [
    "virtual lab",
    "e-lab",
    "e lab",
    "online lab",
    "virtual laboratory",
    "origlena",
    "origlena labs",
    "origlenalabs",
    "olabs",
    "STEM simulations",
    "interactive simulations",
    "3D simulations",
    "physics simulations",
    "chemistry simulations",
    "biology simulations",
    "mathematics simulations",
    "CBSE virtual lab",
    "NCERT virtual lab",
    "science experiments online",
    "online science lab",
    "virtual science experiments",
    "Class 6 science",
    "Class 7 science",
    "Class 8 science",
    "Class 9 science",
    "Class 10 science",
    "Class 11 physics",
    "Class 12 chemistry",
    "DNA simulation",
    "projectile motion simulation",
    "molecular viewer",
    "pH simulator",
    "cell structure 3D",
    "interactive learning",
    "hands-on learning",
    "experiential learning",
    "online education",
    "digital learning",
    "IIT Kharagpur",
    "IIT KGP YIP",
    "Young Innovators Programme",
    "Navodaya Vidyalaya",
    "Indian education",
    "educational technology",
    "EdTech India",
  ],
  authors: [{ name: "Jarjish Alam", url: "mailto:jarjishalam0299@gmail.com" }],
  creator: "Jarjish Alam",
  publisher: "Origlena Labs - IIT Kharagpur Young Innovators Programme",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://origlenalabs.vercel.app"),
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Origlena Labs",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://origlenalabs.vercel.app",
    siteName: "Origlena Labs - Virtual Laboratory Platform",
    title: "Origlena Labs | Virtual Lab & Interactive STEM Simulations for CBSE Students",
    description:
      "India's first NCERT-aligned virtual laboratory. Interactive 3D simulations for Physics, Chemistry, Biology, and Mathematics. Free e-lab for Class 6-12 students.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Origlena Labs - Virtual Laboratory Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Origlena Labs | Virtual Lab for CBSE Students",
    description:
      "India's first NCERT-aligned virtual laboratory platform with interactive 3D STEM simulations. Free online science lab for students.",
    images: ["/logo.png"],
    creator: "@origlenalabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  verification: {
    google: "qXuWUdP6gGsHSmTtviTSxEgBowZ2U9fIT3rgXlPocuw",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcf9" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2121" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MS3T2K36');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="application-name" content="Origlena Labs" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Origlena Labs" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#32b8c6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MS3T2K36"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SupabaseAuthProvider>
            <LanguageProvider>
              <SimulationsProvider>{children}</SimulationsProvider>
            </LanguageProvider>
          </SupabaseAuthProvider>
        </ThemeProvider>
        <Analytics />
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
