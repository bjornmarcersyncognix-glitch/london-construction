import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, PhoneIcon } from "@/components/ui/icons";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { projects } from "@/content/projects";
import { categories } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Residential and commercial projects by London Construction and Development.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const hasProjects = projects.length > 0;

  return (
    <>
      <PageIntro
        label="Projects"
        title="Our work."
        lead={
          hasProjects
            ? "A selection of residential and commercial projects."
            : "Our project portfolio is being prepared and will be published here."
        }
        crumbs={[{ label: "Projects" }]}
      />

      {hasProjects ? (
        <section className="wrap pb-24" aria-label="Project list">
          <ul className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:gap-x-8">
            {projects.map((p, i) => (
              <li key={p.slug} className={i % 3 === 0 ? "md:col-span-2" : ""}>
                <article>
                  <div className={`frame ${i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`} data-reveal-image>
                    <Image src={p.cover.src} alt={p.cover.alt} fill sizes={i % 3 === 0 ? "100vw" : "50vw"} className="object-cover" />
                  </div>
                  <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4" data-reveal>
                    <div>
                      <p className="t-label text-muted">
                        {p.sector} · {p.type}
                      </p>
                      <h2 className="t-h3 mt-2">{p.title}</h2>
                    </div>
                    <p className="t-meta text-slate">{p.location}</p>
                  </div>
                  <p className="mt-3 max-w-2xl text-slate">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.scope.map((s) => (
                      <li key={s} className="border border-line px-3 py-1 t-meta text-slate">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="wrap pb-24 md:pb-32" aria-labelledby="portfolio-status">
          <div className="grid-12 gap-y-10 border-t border-line pt-12 md:pt-16">
            <div className="col-span-4 md:col-span-6 lg:col-span-5">
              <h2 id="portfolio-status" className="t-h3" data-reveal>
                Planning a project?
              </h2>
              <p className="mt-4 text-slate" data-reveal>
                Tell us what you have in mind and we can talk through the work involved and how we would approach
                it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
                <ButtonLink href="/contact#enquiry">Discuss Your Project</ButtonLink>
                <a href={site.phone.href} className="btn btn-secondary tabular">
                  <PhoneIcon /> {site.phone.display}
                </a>
              </div>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
              <p className="t-label text-muted" data-reveal>
                Browse by discipline
              </p>
              <ul className="mt-4 border-t border-line" data-reveal-stagger>
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
      )}

      <ClosingCTA />
    </>
  );
}
