import Link from "next/link";
import { Frame } from "@/components/ui/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/icons";
import { getService, serviceHref } from "@/content/services";

const featured = [
  ["residential", "house-extensions"],
  ["residential", "loft-conversions"],
  ["structural", "structural-alterations"],
  ["commercial", "office-fitting-and-refurbishment"],
] as const;

/**
 * Four services with the strongest visual story, set as a strict sheet:
 * equal columns (3 of 12 on desktop, 6 of 12 on tablet), one image ratio
 * (4:5), and a shared row structure. Each card is a subgrid of the list,
 * so the index rule, image, title, summary and link sit on the same
 * baselines across a row regardless of how long a title runs.
 */
export function FeaturedServices() {
  return (
    <section className="section bg-surface" aria-labelledby="featured-title">
      <div className="wrap">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="03" className="text-slate">
              Selected services
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9 md:flex md:items-end md:justify-between md:gap-10">
            <h2 id="featured-title" className="t-h2 max-w-[20ch]" data-reveal>
              More space, better space, and the structure to support it.
            </h2>
            <Link href="/services" className="btn-text mt-6 shrink-0 md:mt-0" data-reveal>
              All services <ArrowRight />
            </Link>
          </div>
        </div>

        <ul className="featured-grid mt-12 md:mt-16">
          {featured.map(([cat, slug], i) => {
            const found = getService(cat, slug);
            if (!found) return null;
            const { category, service } = found;
            return (
              <li key={service.slug} className="featured-card">
                <Link href={serviceHref(category.slug, service.slug)} className="featured-link group">
                  {/* Row 1 — sheet rule: index and discipline */}
                  <span className="flex items-baseline justify-between gap-4 border-t border-ink pt-3" data-reveal>
                    <span className="t-meta tabular text-muted">0{i + 1}</span>
                    <span className="t-label text-right text-muted">{category.short}</span>
                  </span>

                  {/* Row 2 — image, identical ratio in every card */}
                  <span className="mt-4 block overflow-hidden">
                    <Frame
                      image={service.image!}
                      ratio="aspect-[4/5]"
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 46vw, 100vw"
                      reveal
                      className="transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    />
                  </span>

                  {/* Row 3 — title (row height set by the longest title in the row) */}
                  <span className="mt-6 block t-h4 transition-colors group-hover:text-brick" data-reveal>
                    {service.name}
                  </span>

                  {/* Row 4 — summary */}
                  <span className="mt-3 block t-small text-slate" data-reveal>
                    {service.summary}
                  </span>

                  {/* Row 5 — action, pinned to a common baseline */}
                  <span className="btn-text mt-4 self-end justify-self-start text-[0.875rem] group-hover:[background-size:100%_1px]" data-reveal>
                    View service <ArrowRight />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
