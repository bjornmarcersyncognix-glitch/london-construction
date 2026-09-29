import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { Frame } from "@/components/ui/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/icons";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { categories } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "London Construction and Development is a construction and development company based at 648 London Road, Ashford, working on residential and commercial property.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Scope before start",
    text: "A project goes best when everyone agrees what it includes before work begins. We take time at the outset to understand the brief and set out the scope clearly.",
  },
  {
    title: "Build in the right order",
    text: "Construction is a sequence. Structure before envelope, services before finishes. Planning that order carefully keeps work moving and avoids undoing what has already been done.",
  },
  {
    title: "Care where it can't be seen",
    text: "Foundations, junctions, damp-proofing and fixings are hidden once a building is finished, but they decide how well it performs for years to come.",
  },
  {
    title: "Clear communication",
    text: "Building work involves decisions. Keeping clients informed about progress and the choices ahead means fewer surprises and better outcomes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title="A construction and development company based in Ashford."
        lead="We work on homes and commercial property — building new, extending, altering, renovating and maintaining — across the full range of building trades."
        crumbs={[{ label: "About" }]}
      />

      <div className="wrap">
        <div className="grid-12 gap-y-4">
          <Frame image="brickwork" ratio="aspect-[4/3] md:aspect-[16/11]" sizes="(min-width: 768px) 58vw, 100vw" className="col-span-4 md:col-span-7" priority reveal parallax={6} />
          <Frame image="carpentry" ratio="aspect-[4/3] md:aspect-[4/5]" sizes="(min-width: 768px) 40vw, 100vw" className="col-span-4 md:col-span-5" reveal />
        </div>
      </div>

      <section className="section" aria-labelledby="what-title">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="01" className="text-slate">
              What we do
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9">
            <h2 id="what-title" className="t-h2 max-w-[22ch]" data-reveal>
              Residential and commercial work, from groundworks to finishes.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10" data-reveal-stagger>
              <p className="text-slate">
                For homeowners, landlords and self-builders we build new houses, extensions, loft and garage
                conversions and garden buildings, and renovate and refurbish existing homes.
              </p>
              <p className="text-slate">
                For businesses, developers and property managers we carry out commercial construction and
                refurbishment, shop fitting and office fit-out, and manage construction projects.
              </p>
            </div>

            <ul className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-8" data-reveal-stagger>
              {categories.map((c) => (
                <li key={c.slug} className="border-b border-line">
                  <Link href={`/services/${c.slug}`} className="group flex min-h-14 items-center gap-4 py-3">
                    <span className="t-meta text-muted">{c.index}</span>
                    <span className="flex-1 font-semibold transition-colors group-hover:text-brick">{c.name}</span>
                    <ArrowRight className="text-muted transition-colors group-hover:text-brick" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="on-ink section bg-ink text-on-ink" aria-labelledby="principles-title">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="02" className="text-on-ink-soft">
              How we work
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9">
            <h2 id="principles-title" className="t-h2 max-w-[20ch]" data-reveal>
              Good building is mostly good decisions, made in the right order.
            </h2>
            <ol className="mt-12 grid gap-x-10 border-t border-[var(--line-on-ink)] md:grid-cols-2" data-reveal-stagger>
              {principles.map((p, i) => (
                <li key={p.title} className="border-b border-[var(--line-on-ink)] py-8">
                  <span className="t-meta text-brick-light">0{i + 1}</span>
                  <h3 className="t-h3 mt-3">{p.title}</h3>
                  <p className="mt-3 text-on-ink-soft">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="details-title">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="03" className="text-slate">
              Company details
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9 lg:col-span-6">
            <h2 id="details-title" className="sr-only">
              Company details
            </h2>
            <dl className="border-t border-line" data-reveal-stagger>
              {[
                ["Company", site.name],
                ["Address", `${site.address.street}, ${site.address.locality} ${site.address.postcode}, ${site.address.country}`],
                ...(site.companyNumber ? [["Company number", site.companyNumber]] : []),
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="t-label pt-1 text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="t-label pt-1 text-muted">Telephone</dt>
                <dd>
                  <a href={site.phone.href} className="font-semibold tabular hover:text-brick transition-colors">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
