import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { categories } from "@/content/services";
import "./globals.css";

/**
 * Archivo — a grotesque with industrial roots and a variable width axis.
 * One family covers everything: slightly expanded for display, normal width
 * for reading. Self-hosted by next/font.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const description =
  "London Construction & Development — residential and commercial construction, extensions, loft conversions, renovation, structural work and fit-outs. Based at 648 London Road, Ashford, TW15 3AW.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | Construction, Renovation & Development`,
    template: `%s | ${site.shortName}`,
  },
  description,
  applicationName: site.shortName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.shortName,
    title: `${site.shortName} | Construction, Renovation & Development`,
    description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#141619",
  colorScheme: "light",
};

/** Structured data limited to verified facts: no hours, ratings or service areas. */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#organisation`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  telephone: site.phone.display.replace(/\s/g, ""),
  image: `${site.url}/opengraph-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    postalCode: site.address.postcode,
    addressCountry: site.address.countryCode,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction services",
    itemListElement: categories.map((c) => ({
      "@type": "OfferCatalog",
      name: c.name,
      itemListElement: c.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${c.slug}/${s.slug}` },
      })),
    })),
  },
};

// Runs before first paint: enables reveal animations only when motion is welcome.
const motionBootstrap = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MotionProvider />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
      </body>
    </html>
  );
}
