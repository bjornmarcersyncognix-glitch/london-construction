import Link from "next/link";
import { SectionLabel } from "./SectionLabel";

type Crumb = { label: string; href?: string };

/** Opening block for interior pages: breadcrumb, label, title and lead. */
export function PageIntro({
  label,
  title,
  lead,
  crumbs = [],
  children,
}: {
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="wrap pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16 md:pt-[calc(var(--header-h)+72px)]">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-14">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 t-meta text-muted">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="grid-12 gap-y-8">
        <div className="col-span-4 md:col-span-12 lg:col-span-9">
          <div data-reveal>
            <SectionLabel className="text-slate">{label}</SectionLabel>
          </div>
          <h1 className="t-h1 mt-6 md:mt-8" data-reveal data-reveal-delay="0.05">
            {title}
          </h1>
        </div>
        {lead && (
          <div className="col-span-4 md:col-span-8 lg:col-span-7" data-reveal data-reveal-delay="0.1">
            <p className="t-lead text-slate">{lead}</p>
          </div>
        )}
        {children && <div className="col-span-4 md:col-span-12">{children}</div>}
      </div>
    </section>
  );
}
