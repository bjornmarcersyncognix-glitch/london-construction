import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/PageIntro";
import { Frame } from "@/components/ui/Frame";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, PhoneIcon } from "@/components/ui/icons";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { allServices, getService, resolveRelated, serviceHref } from "@/content/services";
import { site } from "@/content/site";

type Props = { params: Promise<{ category: string; service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map((s) => ({ category: s.category.slug, service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, service } = await params;
  const found = getService(category, service);
  if (!found) return {};
  const { service: s, category: c } = found;
  return {
    title: s.name,
    description: `${s.summary} ${s.intro}`.slice(0, 158),
    alternates: { canonical: serviceHref(c.slug, s.slug) },
    openGraph: s.image ? { images: [{ url: `/images/${s.image}.jpg` }] } : undefined,
  };
}

export default async function ServicePage({ params }: Props) {
  const { category, service } = await params;
  const found = getService(category, service);
  if (!found) notFound();
  const { category: c, service: s } = found;

  const idx = c.services.findIndex((x) => x.slug === s.slug);
  const prev = c.services[idx - 1];
  const next = c.services[idx + 1];
  const related = resolveRelated(s.related);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${site.url}/services/${c.slug}` },
      { "@type": "ListItem", position: 4, name: s.name, item: `${site.url}${serviceHref(c.slug, s.slug)}` },
    ],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.summary,
    provider: { "@id": `${site.url}/#organisation` },
    url: `${site.url}${serviceHref(c.slug, s.slug)}`,
  };

  return (
    <>
      <PageIntro
        label={`${c.name} — ${c.index}.${idx + 1}`}
        title={s.name}
        lead={s.summary}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: c.name, href: `/services/${c.slug}` },
          { label: s.name },
        ]}
      />

      {s.image && (
        <div className="wrap">
          <Frame image={s.image} ratio="aspect-[4/3] md:aspect-[21/9]" sizes="(min-width: 1440px) 1330px, 100vw" priority reveal parallax={8} />
        </div>
      )}

      <div className="wrap section">
        <div className="grid-12 gap-y-16">
          {/* Sticky action column */}
          <aside className="col-span-4 md:col-span-4 lg:col-span-3 md:order-2 md:col-start-9 lg:col-start-10" aria-label="Enquire about this service">
            <div className="md:sticky md:top-[calc(var(--header-h)+32px)]">
              <div className="border border-line bg-surface p-6">
                <p className="t-label text-muted">Enquire</p>
                <p className="t-h4 mt-3">Discuss {s.name.toLowerCase()} for your property.</p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href={`/contact?service=${encodeURIComponent(c.name)}#enquiry`} className="w-full">
                    Request a Quote
                  </ButtonLink>
                  <a href={site.phone.href} className="btn btn-secondary w-full tabular">
                    <PhoneIcon /> {site.phone.display}
                  </a>
                </div>
              </div>
              <nav aria-label={`More in ${c.name}`} className="mt-8 hidden md:block">
                <p className="t-label text-muted">More in {c.name}</p>
                <ul className="mt-3 border-t border-line">
                  {c.services.map((x) => (
                    <li key={x.slug} className="border-b border-line">
                      <Link
                        href={serviceHref(c.slug, x.slug)}
                        aria-current={x.slug === s.slug ? "page" : undefined}
                        className={`flex min-h-11 items-center gap-2 py-2 t-small transition-colors ${
                          x.slug === s.slug ? "font-semibold text-ink" : "text-slate hover:text-ink"
                        }`}
                      >
                        {x.slug === s.slug && <span className="h-1.5 w-1.5 shrink-0 bg-brick" aria-hidden="true" />}
                        {x.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Body */}
          <article className="col-span-4 md:order-1 md:col-span-8 lg:col-span-8">
            <p className="t-lead" data-reveal>
              {s.intro}
            </p>

            <section className="mt-16 md:mt-20" aria-labelledby="scope-title">
              <h2 id="scope-title" className="t-h3" data-reveal>
                What the work can include
              </h2>
              <ol className="mt-6 border-t border-line" data-reveal-stagger>
                {s.scope.map((item, i) => (
                  <li key={item} className="grid grid-cols-[3rem_1fr] border-b border-line py-4">
                    <span className="t-meta pt-0.5 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 t-small text-muted">Every project is scoped individually; your quotation will set out exactly what is included.</p>
            </section>

            <section className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2" aria-label="Applications and approach">
              <div data-reveal>
                <h2 className="t-h3">Typical projects</h2>
                <ul className="mt-6 space-y-3">
                  {s.applications.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-4 shrink-0 bg-brick" aria-hidden="true" />
                      <span className="text-slate">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-brick pl-6" data-reveal>
                <h2 className="t-h3">Why it matters</h2>
                <p className="mt-6 text-slate">{s.care}</p>
              </div>
            </section>

            {(prev || next) && (
              <nav aria-label="Adjacent services" className="mt-20 grid grid-cols-2 border-y border-line">
                {prev ? (
                  <Link href={serviceHref(c.slug, prev.slug)} className="group py-6 pr-4">
                    <span className="t-label text-muted">Previous</span>
                    <span className="mt-2 block font-semibold transition-colors group-hover:text-brick">{prev.name}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link href={serviceHref(c.slug, next.slug)} className="group border-l border-line py-6 pl-4 text-right md:pl-6">
                    <span className="t-label text-muted">Next</span>
                    <span className="mt-2 block font-semibold transition-colors group-hover:text-brick">{next.name}</span>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </article>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface" aria-labelledby="related-title">
          <div className="wrap section">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="related-title" className="t-h2" data-reveal>
                Related services
              </h2>
              <Link href="/services" className="btn-text" data-reveal>
                All services <ArrowRight />
              </Link>
            </div>
            <ul className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-6 lg:gap-8">
              {related.map(({ category: rc, service: rs }) => (
                <li key={rs.slug}>
                  <Link href={serviceHref(rc.slug, rs.slug)} className="group block">
                    <div className="overflow-hidden">
                      {rs.image ? (
                        <Frame
                          image={rs.image}
                          ratio="aspect-[4/3]"
                          sizes="(min-width: 768px) 30vw, 100vw"
                          reveal
                          className="transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                        />
                      ) : (
                        // No photograph that genuinely shows this service — use a typographic tile instead.
                        <div className="on-ink flex aspect-[4/3] flex-col justify-between bg-ink p-6 text-on-ink">
                          <span className="t-meta text-on-ink-soft">{rc.index}</span>
                          <span className="t-h3 max-w-[12ch]">{rs.name}</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-5 t-label text-muted">{rc.name}</p>
                    <h3 className="t-h4 mt-2 transition-colors group-hover:text-brick">{rs.name}</h3>
                    <p className="mt-2 t-small text-slate">{rs.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ClosingCTA title="Discuss your project." />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]) }} />
    </>
  );
}
