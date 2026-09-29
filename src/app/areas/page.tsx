import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRight, PhoneIcon } from "@/components/ui/icons";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Areas",
  description: "London Construction and Development is based at 648 London Road, Ashford, TW15 3AW. Contact us to confirm whether we can take on your project.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  const { lat, lng } = site.geo;
  const d = 0.012;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d * 1.6}%2C${lat - d}%2C${lng + d * 1.6}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <>
      <PageIntro
        label="Areas"
        title="Based in Ashford."
        lead="Our base is at 648 London Road, Ashford. If you are planning work, tell us where the property is and we will confirm whether we can take the project on."
        crumbs={[{ label: "Areas" }]}
      />

      <section className="wrap pb-24 md:pb-32" aria-label="Location">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <div className="frame aspect-[4/3] md:aspect-[16/10]" data-reveal-image>
              <iframe
                title="Map showing 648 London Road, Ashford TW15 3AW"
                src={mapSrc}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.05)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <dl className="border-t border-line" data-reveal-stagger>
              <div className="border-b border-line py-5">
                <dt className="t-label text-muted">Address</dt>
                <dd className="mt-2 t-h4 font-medium">
                  {site.address.street}
                  <br />
                  {site.address.locality} {site.address.postcode}
                </dd>
              </div>
              <div className="border-b border-line py-5">
                <dt className="t-label text-muted">Telephone</dt>
                <dd className="mt-2">
                  <a href={site.phone.href} className="t-h4 tabular hover:text-brick transition-colors">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3" data-reveal>
              <ButtonLink href="/contact#enquiry">Check Your Project</ButtonLink>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Get Directions <ArrowUpRight />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <a href={site.phone.href} className="btn-text self-start">
                <PhoneIcon /> Call to discuss
              </a>
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
