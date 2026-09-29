import Link from "next/link";
import { Frame } from "@/components/ui/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/icons";
import { getCategory, serviceHref } from "@/content/services";
import type { ImageKey } from "@/content/images";

const paths: { slug: string; audience: string; title: string; text: string; image: ImageKey; picks: string[] }[] = [
  {
    slug: "residential",
    audience: "For homeowners, landlords and self-builders",
    title: "Residential",
    text: "New homes, extensions, loft and garage conversions, and the renovation of existing houses and flats.",
    image: "kitchen",
    picks: ["new-house-construction", "house-extensions", "loft-conversions", "garden-rooms-and-offices"],
  },
  {
    slug: "commercial",
    audience: "For businesses, developers and property managers",
    title: "Commercial",
    text: "Commercial construction, refurbishment of commercial property, and retail and office fit-outs.",
    image: "commercial",
    picks: ["commercial-construction", "commercial-property-refurbishment", "shop-fitting-and-refurbishment", "office-fitting-and-refurbishment"],
  },
];

/** Two clearly separated routes into the site for the two audiences. */
export function Pathways() {
  return (
    <section className="section" aria-labelledby="pathways-title">
      <div className="wrap">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="05" className="text-slate">
              Who we work for
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9">
            <h2 id="pathways-title" className="t-h2 max-w-[18ch]" data-reveal>
              Homes and businesses.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6 xl:gap-8">
          {paths.map((p) => {
            const cat = getCategory(p.slug)!;
            return (
              <article key={p.slug} className="on-ink group relative flex min-h-[34rem] flex-col justify-end overflow-hidden bg-ink text-on-ink md:min-h-[42rem]">
                <div className="absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-[1.03]" style={{ transitionTimingFunction: "var(--ease-out)" }}>
                  <Frame image={p.image} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full" alt="" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/20" aria-hidden="true" />
                <div className="relative p-6 md:p-10">
                  <p className="t-label text-on-ink-soft">{p.audience}</p>
                  <h3 className="t-h1 mt-4">
                    <Link href={`/services/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-4 max-w-md text-on-ink/85">{p.text}</p>
                  <ul className="relative z-10 mt-8 border-t border-[var(--line-on-ink)]">
                    {p.picks.map((slug) => {
                      const s = cat.services.find((x) => x.slug === slug);
                      return s ? (
                        <li key={slug} className="border-b border-[var(--line-on-ink)]">
                          <Link href={serviceHref(cat.slug, slug)} className="flex min-h-12 items-center justify-between gap-4 py-2 text-on-ink/90 hover:text-on-ink">
                            {s.name}
                            <ArrowRight />
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                  <p className="mt-6 t-small font-semibold">
                    {cat.name} — {cat.services.length} services
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
