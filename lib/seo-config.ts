/**
 * SEO Configuration for Origlena Labs
 * Centralized metadata and canonical URL management for all pages
 * Phase 1: Production-ready SEO foundation
 */

export const SITE_CONFIG = {
  name: "Origlena Labs",
  title: "Origlena Labs | Virtual Lab & Interactive 3D STEM Simulations for CBSE Students",
  description:
    "India's first NCERT-aligned virtual laboratory platform. Experience interactive 3D simulations for Physics, Chemistry, Biology, and Mathematics. E-lab for CBSE Class 6-12 students. Learn through hands-on experiments online.",
  url: "https://origlenalabs.vercel.app",
  locale: "en_IN",
  author: "Jarjish Alam",
  creator: "Jarjish Alam",
  email: "jarjishalam0299@gmail.com",
  publisher: "Origlena Labs - IIT Kharagpur Young Innovators Programme",
  logo: "/logo.png",
  favicon: "/favicon.png",
  twitterHandle: "@origlenalabs",
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
    "3d learning",
    "3d e-learning",
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
    "best virtual lab India",
    "free online lab",
    "IIT Kharagpur",
  ],
}

export const OPEN_GRAPH_CONFIG = {
  type: "website",
  locale: SITE_CONFIG.locale,
  url: SITE_CONFIG.url,
  siteName: "Origlena Labs - Virtual Laboratory Platform",
  image: {
    url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    width: 512,
    height: 512,
    alt: "Origlena Labs - Virtual Laboratory Platform",
    type: "image/png",
  },
}

export const TWITTER_CONFIG = {
  card: "summary_large_image",
  creator: SITE_CONFIG.twitterHandle,
  image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
}

export const ROBOTS_CONFIG = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
}

/**
 * Build canonical URL for a route
 * Ensures proper SEO by preventing duplicate content issues
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${SITE_CONFIG.url}${cleanPath}`
}

/**
 * Build page metadata for consistency across all pages
 * Usage: export const metadata = generatePageMetadata("/page-slug", "Page Title", "Page description")
 */
export function generatePageMetadata(
  path: string,
  title: string,
  description: string,
  ogImage?: string,
) {
  return {
    title,
    description,
    canonical: getCanonicalUrl(path),
    openGraph: {
      ...OPEN_GRAPH_CONFIG,
      url: getCanonicalUrl(path),
      title,
      description,
      image: ogImage ? `${SITE_CONFIG.url}${ogImage}` : OPEN_GRAPH_CONFIG.image.url,
    },
    twitter: {
      ...TWITTER_CONFIG,
      title,
      description,
    },
    robots: ROBOTS_CONFIG,
    alternates: {
      canonical: getCanonicalUrl(path),
    },
  }
}

/**
 * Organization structured data
 * Used in layout for schema.org/Organization
 */
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: OPEN_GRAPH_CONFIG.image.url,
  description: SITE_CONFIG.description,
  email: SITE_CONFIG.email,
  sameAs: [`https://twitter.com/${SITE_CONFIG.twitterHandle.replace("@", "")}`],
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  educationalCredentialAwarded: "Virtual Laboratory Certification",
}

/**
 * Website structured data
 * Used in layout for schema.org/WebSite
 */
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_CONFIG.url}/simulations?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

/**
 * Breadcrumb structured data factory
 * Creates breadcrumb schema for any page path
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Analytics event names for consistent tracking
 * Used for Google Tag Manager and future analytics
 */
export const ANALYTICS_EVENTS = {
  // Page views
  PAGE_VIEW: "page_view",
  SIMULATION_PAGE_VIEW: "simulation_page_view",

  // User interactions
  SIMULATION_OPEN: "simulation_open",
  SIMULATION_START: "simulation_start",
  SIMULATION_COMPLETE: "simulation_complete",
  CTA_CLICK: "cta_click",
  SUBJECT_EXPLORE: "subject_explore",
  SEARCH_USED: "search_used",

  // User engagement
  TIME_ON_PAGE: "time_on_page",
  SCROLL_DEPTH: "scroll_depth",

  // Learning
  FEATURE_USE: "feature_use",
  LANGUAGE_CHANGE: "language_change",

  // Auth events
  SIGN_UP: "sign_up",
  LOGIN: "login",
  LOGOUT: "logout",
}

/**
 * Crawlable public routes that should be indexed
 */
export const PUBLIC_ROUTES = [
  "/",
  "/simulations",
  "/about",
  "/contact",
  "/faq",
  "/simulations/biology/cell",
  "/simulations/biology/dna",
  "/simulations/biology/photosynthesis",
  "/simulations/biology/species-generator",
  "/simulations/chemistry/periodic-table",
  "/simulations/chemistry/chemical-reactions",
  "/simulations/chemistry/molecular-viewer",
  "/simulations/chemistry/ph-simulator",
  "/simulations/physics/projectile-motion",
  "/simulations/physics/ohms-law",
  "/simulations/physics/electromagnetic-induction",
  "/simulations/mathematics/unit-circle",
  "/simulations/mathematics/pythagoras",
  "/simulations/agriculture/crop-farming",
]

/**
 * Routes that should NOT be indexed by search engines
 */
export const PRIVATE_ROUTES = ["/auth", "/admin", "/api", "/offline"]
