import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ArrowUpRight } from "@/components/ui/icons";
import { categories } from "@/content/services";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-ink bg-ink text-on-ink">
      <div className="wrap pb-10 pt-16 md:pt-24">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <Link href="/" aria-label={`${site.shortName} — home`} className="inline-block">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-on-ink-soft">
              Residential and commercial construction, renovation and development, from our base in Ashford.
            </p>
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <h2 className="t-label text-on-ink-soft">Services</h2>
            <ul className="mt-5 space-y-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services/${c.slug}`} className="footer-link">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h2 className="t-label text-on-ink-soft">Company</h2>
            <ul className="mt-5 space-y-1">
              {[
                ["About", "/about"],
                ["Projects", "/projects"],
                ["Areas", "/areas"],
                ["Contact", "/contact"],
                ["Request a Quote", "/contact#enquiry"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <h2 className="t-label text-on-ink-soft">Contact</h2>
            <address className="mt-5 not-italic">
              <p>
                {site.address.street}
                <br />
                {site.address.locality} {site.address.postcode}
                <br />
                {site.address.country}
              </p>
              <p className="mt-5">
                <a href={site.phone.href} className="text-[1.375rem] font-semibold tabular tracking-[-0.01em] hover:text-on-ink-soft transition-colors">
                  {site.phone.display}
                </a>
              </p>
              {site.email && (
                <p className="mt-2">
                  <a href={`mailto:${site.email}`} className="footer-link">
                    {site.email}
                  </a>
                </p>
              )}
              <p className="mt-5">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-text text-on-ink">
                  Get directions <ArrowUpRight />
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--line-on-ink)] pt-6 t-small text-on-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
            {site.companyNumber ? ` · Registered in England & Wales, No. ${site.companyNumber}` : ""}
            {" · All rights reserved @blackwolvestech.com"}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-on-ink transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/credits" className="hover:text-on-ink transition-colors">
                Image credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
