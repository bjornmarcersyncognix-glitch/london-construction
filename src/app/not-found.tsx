import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { categories } from "@/content/services";

export default function NotFound() {
  return (
    <section className="wrap pb-24 pt-[calc(var(--header-h)+72px)] md:pb-32 md:pt-[calc(var(--header-h)+120px)]">
      <div className="grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-7">
          <SectionLabel index="404" className="text-slate">
            Page not found
          </SectionLabel>
          <h1 className="t-h1 mt-8">This page isn&rsquo;t here.</h1>
          <p className="t-lead mt-6 max-w-lg text-slate">It may have moved, or the address may be mistyped. These links should help you find what you need.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Go to the homepage</ButtonLink>
            <ButtonLink href="/contact" variant="secondary" arrow={false}>
              Contact us
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Services" className="col-span-4 md:col-span-5">
          <p className="t-label text-muted">Services</p>
          <ul className="mt-4 border-t border-line">
            {categories.map((c) => (
              <li key={c.slug} className="border-b border-line">
                <Link href={`/services/${c.slug}`} className="flex min-h-12 items-center gap-4 py-2 hover:text-brick transition-colors">
                  <span className="t-meta text-muted">{c.index}</span>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
