"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { images } from "@/content/images";
import { categories } from "@/content/services";

/**
 * The seven disciplines as an index rather than a wall of cards.
 * On desktop the image panel follows the row being explored (hover or focus);
 * on smaller screens each row carries its own thumbnail.
 */
export function CapabilityIndex() {
  const [active, setActive] = useState(0);

  return (
    <section className="section border-t border-line" aria-labelledby="capabilities-title">
      <div className="wrap">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="02" className="text-slate">
              Capabilities
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9 md:flex md:items-end md:justify-between md:gap-10">
            <h2 id="capabilities-title" className="t-h2 max-w-[18ch]" data-reveal>
              Seven disciplines, from the ground up.
            </h2>
            <Link href="/services" className="btn-text mt-6 shrink-0 md:mt-0" data-reveal>
              All services <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="grid-12 mt-12 md:mt-16">
          <ol className="col-span-4 border-t border-line md:col-span-12 lg:col-span-7" data-reveal-stagger>
            {categories.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/services/${c.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 border-b border-line py-5 transition-colors md:grid-cols-[3rem_1fr_auto] md:py-7"
                >
                  <span className={`t-meta transition-colors ${active === i ? "text-brick" : "text-muted"} lg:group-hover:text-brick`}>{c.index}</span>
                  <span className="min-w-0">
                    <span className={`block t-h3 transition-colors ${active === i ? "lg:text-ink" : "lg:text-slate"} group-hover:text-ink`}>{c.name}</span>
                    <span className="mt-1.5 block t-small text-slate">{c.summary}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="relative hidden h-14 w-20 overflow-hidden bg-stone-deep sm:block lg:hidden">
                      <Image src={images[c.image].src} alt="" fill sizes="80px" className="object-cover" />
                    </span>
                    <ArrowRight className={`transition-[opacity,transform] duration-300 ${active === i ? "lg:opacity-100" : "lg:opacity-0"} group-hover:translate-x-1`} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+24px)] ml-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden bg-stone-deep" data-reveal-image>
              <div className="absolute inset-0">
              {categories.map((c, i) => (
                <Image
                  key={c.slug}
                  src={images[c.image].src}
                  alt={images[c.image].alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 0px"
                  className={`object-cover transition-[opacity,transform] duration-700 ${active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                  aria-hidden={active !== i}
                />
              ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-6 pt-20 text-on-ink">
                <span className="t-label">{categories[active].name}</span>
                <span className="t-meta">{categories[active].services.length} services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
