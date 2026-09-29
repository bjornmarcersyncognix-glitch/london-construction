import Link from "next/link";
import { Frame } from "@/components/ui/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/icons";
import { getService, serviceHref } from "@/content/services";

const featured = [
  { ref: ["residential", "house-extensions"], ratio: "aspect-[4/5]", col: "md:col-span-7", offset: "" },
  { ref: ["residential", "loft-conversions"], ratio: "aspect-[4/3]", col: "md:col-span-5", offset: "md:mt-40" },
  { ref: ["structural", "structural-alterations"], ratio: "aspect-[4/3]", col: "md:col-span-5", offset: "" },
  { ref: ["commercial", "office-fitting-and-refurbishment"], ratio: "aspect-[16/11]", col: "md:col-span-7", offset: "md:-mt-24 lg:-mt-40" },
] as const;

/** Four services with the strongest visual story, set as an offset editorial grid. */
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
          <div className="col-span-4 md:col-span-9">
            <h2 id="featured-title" className="t-h2 max-w-[20ch]" data-reveal>
              More space, better space, and the structure to support it.
            </h2>
          </div>
        </div>

        <ul className="grid-12 mt-14 gap-y-16 md:mt-20 md:gap-y-24">
          {featured.map(({ ref, ratio, col, offset }, i) => {
            const found = getService(ref[0], ref[1]);
            if (!found) return null;
            const { category, service } = found;
            return (
              <li key={service.slug} className={`col-span-4 ${col} ${offset}`}>
                <Link href={serviceHref(category.slug, service.slug)} className="group block">
                  <div className="overflow-hidden">
                    <Frame
                      image={service.image!}
                      ratio={ratio}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      reveal
                      className="transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-[2.5rem_1fr] gap-x-2" data-reveal>
                    <span className="t-meta pt-1.5 text-muted">0{i + 1}</span>
                    <div>
                      <p className="t-label text-muted">{category.name}</p>
                      <h3 className="t-h3 mt-3">{service.name}</h3>
                      <p className="mt-3 max-w-md text-slate">{service.summary}</p>
                      <span className="btn-text mt-3 group-hover:[background-size:100%_1px]">
                        Explore {service.name.toLowerCase()} <ArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
