"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { images, type ImageKey } from "@/content/images";

const steps: { title: string; text: string; image: ImageKey }[] = [
  {
    title: "Conversation",
    text: "It starts with what you want to achieve: the space you need, how you want to use it, and any drawings, approvals or constraints already in place.",
    image: "drawings",
  },
  {
    title: "Survey and scope",
    text: "We look at the property and agree what the work involves. A clear scope is the foundation of an accurate quotation and a project without surprises.",
    image: "project-management",
  },
  {
    title: "Construction",
    text: "The work is planned in sequence — structure, envelope, services, finishes — so that each stage sets up the next and progress is easy to follow.",
    image: "brickwork",
  },
  {
    title: "Completion",
    text: "Finishes are completed, the site is cleared and the space is handed back ready to use.",
    image: "refurbishment",
  },
];

/**
 * How a project runs, told as the building itself changes: the image panel
 * holds while the steps scroll past, moving from drawing to finished room.
 */
export function Approach() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="on-ink section bg-ink text-on-ink" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="04" className="text-on-ink-soft">
              What to expect
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9">
            <h2 id="approach-title" className="t-h2 max-w-[20ch]" data-reveal>
              From first drawing to finished room.
            </h2>
          </div>
        </div>

        <div className="grid-12 mt-12 md:mt-20">
          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-[calc(var(--header-h)+24px)] aspect-[4/5] overflow-hidden bg-[#1d2024] md:aspect-[4/5]" data-reveal-image>
              <div className="absolute inset-0">
              {steps.map((s, i) => (
                <Image
                  key={s.title}
                  src={images[s.image].src}
                  alt={images[s.image].alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className={`object-cover transition-[opacity,transform] duration-[900ms] ${active === i ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"}`}
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                  aria-hidden={active !== i}
                />
              ))}
              </div>
              <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-ink px-5 py-4">
                <span className="t-meta tabular text-on-ink">0{active + 1}</span>
                <span className="h-px w-10 bg-[var(--line-on-ink)]" aria-hidden="true">
                  <span className="block h-px bg-brick transition-[width] duration-700" style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
                </span>
                <span className="t-meta tabular text-on-ink-soft">0{steps.length}</span>
              </div>
            </div>
          </div>

          <ol className="col-span-4 md:col-span-5 md:col-start-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                className={`flex flex-col justify-center border-t border-[var(--line-on-ink)] py-10 transition-opacity duration-500 md:min-h-[60vh] md:py-12 ${
                  active === i ? "opacity-100" : "md:opacity-40"
                }`}
              >
                <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-[#1d2024] md:hidden">
                  <Image src={images[s.image].src} alt={images[s.image].alt} fill sizes="92vw" className="object-cover" />
                </div>
                <span className={`t-meta tabular ${active === i ? "text-brick-light" : "text-on-ink-soft"} transition-colors`}>0{i + 1}</span>
                <h3 className="t-h2 mt-4">{s.title}</h3>
                <p className="t-lead mt-5 max-w-md text-on-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
