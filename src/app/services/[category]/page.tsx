import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/PageIntro";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight } from "@/components/ui/icons";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { OtherDisciplines } from "@/components/services/OtherDisciplines";
import { categories, getCategory, serviceHref } from "@/content/services";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return {
    title: c.name,
    description: `${c.name}: ${c.summary} ${c.intro}`.slice(0, 158),
    alternates: { canonical: `/services/${c.slug}` },
    openGraph: { images: [{ url: `/images/${c.image}.jpg` }] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).category);
  if (!c) notFound();

  return (
    <>
      <PageIntro
        label={`Services — ${c.index}`}
        title={c.name}
        lead={c.intro}
        crumbs={[{ label: "Services", href: "/services" }, { label: c.name }]}
      />

      <div className="wrap">
        <Frame image={c.image} ratio="aspect-[4/3] md:aspect-[21/9]" sizes="(min-width: 1440px) 1330px, 100vw" priority reveal parallax={8} />
      </div>

      <section className="section" aria-labelledby="list-title">
        <div className="wrap">
          <div className="grid-12 gap-y-6">
            <p className="col-span-4 t-label text-slate md:col-span-3" data-reveal>
              {c.services.length} services
            </p>
            <h2 id="list-title" className="col-span-4 t-h2 md:col-span-9" data-reveal>
              Services in this discipline.
            </h2>
          </div>

          <ol className="mt-12 border-t border-line md:mt-16">
            {c.services.map((s, i) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={serviceHref(c.slug, s.slug)} className="group grid-12 items-center gap-y-5 py-8 md:py-10">
                  <span className="col-span-4 t-meta text-muted md:col-span-1">
                    {c.index}.{i + 1}
                  </span>
                  <div className="col-span-4 md:col-span-6 lg:col-span-5">
                    <h3 className="t-h3 transition-colors group-hover:text-brick">{s.name}</h3>
                    <p className="mt-3 max-w-lg text-slate">{s.summary}</p>
                    <span className="btn-text mt-2 text-[0.875rem]">
                      View service <ArrowRight />
                    </span>
                  </div>
                  <div className="col-span-4 md:col-span-5 lg:col-span-4 lg:col-start-9">
                    {s.image ? (
                      <div className="overflow-hidden">
                        <Frame image={s.image} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw" className="transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
                      </div>
                    ) : (
                      <ul className="hidden border-l border-line pl-6 md:block">
                        {s.scope.slice(0, 3).map((x) => (
                          <li key={x} className="t-small py-1 text-slate">
                            {x}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <OtherDisciplines current={c.slug} />
      <ClosingCTA title="Discuss your project." />
    </>
  );
}
