import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { categories } from "@/content/services";

/** Cross-navigation between the seven disciplines. */
export function OtherDisciplines({ current }: { current: string }) {
  const others = categories.filter((c) => c.slug !== current);
  return (
    <nav aria-labelledby="other-disciplines" className="border-t border-line bg-surface">
      <div className="wrap py-14 md:py-20">
        <h2 id="other-disciplines" className="t-label text-slate">
          Other disciplines
        </h2>
        <ul className="mt-6 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
          {others.map((c) => (
            <li key={c.slug} className="border-b border-line">
              <Link href={`/services/${c.slug}`} className="group flex min-h-16 items-center gap-4 py-4">
                <span className="t-meta text-muted">{c.index}</span>
                <span className="flex-1 font-semibold transition-colors group-hover:text-brick">{c.name}</span>
                <ArrowRight className="text-muted transition-colors group-hover:text-brick" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
