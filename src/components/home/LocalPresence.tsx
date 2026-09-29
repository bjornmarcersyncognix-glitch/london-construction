import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/content/site";

/**
 * Local presence built only on the verified address. No coverage list is
 * shown until the client confirms the areas they work in.
 */
export function LocalPresence() {
  return (
    <section className="section border-t border-line" aria-labelledby="local-title">
      <div className="wrap">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <div data-reveal>
              <SectionLabel index="06" className="text-slate">
                Where we are
              </SectionLabel>
            </div>
            <h2 id="local-title" className="t-h2 mt-8 max-w-[14ch]" data-reveal>
              Based on London Road, Ashford.
            </h2>
            <p className="t-lead mt-6 max-w-md text-slate" data-reveal>
              Tell us where your project is and we will let you know whether we can take it on.
            </p>

            <dl className="mt-10 border-t border-line" data-reveal-stagger>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                <dt className="t-label pt-1 text-muted">Address</dt>
                <dd>
                  {site.address.street}
                  <br />
                  {site.address.locality} {site.address.postcode}
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                <dt className="t-label pt-1 text-muted">Telephone</dt>
                <dd>
                  <a href={site.phone.href} className="font-semibold tabular hover:text-brick transition-colors">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2" data-reveal>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-text">
                Get directions <ArrowUpRight />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <ButtonLink href="/areas" variant="text">
                Service areas
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <Frame image="london-edwardian" ratio="aspect-[4/5] md:aspect-[5/6]" sizes="(min-width: 768px) 48vw, 100vw" reveal parallax={6} />
          </div>
        </div>
      </div>
    </section>
  );
}
