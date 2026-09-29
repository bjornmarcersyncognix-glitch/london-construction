import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight } from "@/components/ui/icons";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { categories, serviceHref } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential and commercial construction, renovation, structural work and groundworks, roofing and exterior works, interiors and building services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        label="Services"
        title="Everything a building needs, from the ground up."
        lead="Our services are grouped into seven disciplines. Choose one to see what it covers, or get in touch and tell us about your project."
        crumbs={[{ label: "Services" }]}
      >
        <nav aria-label="Service disciplines" className="mt-6 border-t border-line pt-6 md:mt-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-2" data-reveal-stagger>
            {categories.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="inline-flex min-h-11 items-center gap-2 t-small text-slate hover:text-ink transition-colors">
                  <span className="t-meta text-muted">{c.index}</span>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      <div className="wrap pb-8">
        {categories.map((c, i) => (
          <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-title`} className="grid-12 gap-y-8 border-t border-line py-14 md:py-20 lg:py-24">
            <div className={`col-span-4 md:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              <Link href={`/services/${c.slug}`} tabIndex={-1} aria-hidden="true" className="group block overflow-hidden">
                <Frame image={c.image} ratio="aspect-[4/3]" sizes="(min-width: 768px) 40vw, 100vw" reveal className="transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
              </Link>
            </div>
            <div className={`col-span-4 md:col-span-7 ${i % 2 ? "lg:order-1 lg:col-start-1 lg:col-end-7" : "lg:col-start-7"}`}>
              <p className="t-meta text-muted" data-reveal>
                {c.index} / 0{categories.length}
              </p>
              <h2 id={`${c.slug}-title`} className="t-h2 mt-4" data-reveal>
                <Link href={`/services/${c.slug}`} className="hover:text-slate transition-colors">
                  {c.name}
                </Link>
              </h2>
              <p className="mt-5 max-w-xl text-slate" data-reveal>
                {c.intro}
              </p>
              <ul className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-8" data-reveal-stagger>
                {c.services.map((s) => (
                  <li key={s.slug} className="border-b border-line">
                    <Link href={serviceHref(c.slug, s.slug)} className="group flex min-h-12 items-center justify-between gap-4 py-3">
                      <span className="font-medium group-hover:text-brick transition-colors">{s.name}</span>
                      <ArrowRight className="text-muted transition-colors group-hover:text-brick" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/services/${c.slug}`} className="btn-text mt-6" data-reveal>
                {c.name} overview <ArrowRight />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <ClosingCTA />
    </>
  );
}
