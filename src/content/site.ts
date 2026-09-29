/**
 * Verified business facts — the single source of truth for company details.
 *
 * Only information supplied by the client belongs here. Anything marked
 * `null` has not been provided yet; components must render gracefully
 * without it rather than substituting invented values.
 */
export const site = {
  name: "London Construction And Development LTD",
  shortName: "London Construction & Development",
  address: {
    street: "648 London Road",
    locality: "Ashford",
    postcode: "TW15 3AW",
    country: "United Kingdom",
    countryCode: "GB",
  },
  phone: {
    display: "+44 7721 043900",
    href: "tel:+447721043900",
  },
  /** Public enquiry email — not yet supplied by the client. */
  email: null as string | null,
  /** Companies House registration number — not yet supplied. */
  companyNumber: null as string | null,
  /**
   * Canonical production URL. The domain has not been confirmed, so this is
   * driven by NEXT_PUBLIC_SITE_URL, falling back to the Vercel production URL.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),
  /** Postcode centroid for TW15 3AW (postcodes.io) — used only to centre the map. */
  geo: { lat: 51.445175, lng: -0.462666 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=648+London+Road%2C+Ashford+TW15+3AW",
} as const;

export const addressLine = `${site.address.street}, ${site.address.locality}, ${site.address.postcode}`;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Areas", href: "/areas" },
  { label: "Contact", href: "/contact" },
] as const;
