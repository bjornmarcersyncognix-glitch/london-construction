"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One motion layer for the whole site. Server-rendered markup opts in with
 * data attributes, so pages stay server components:
 *
 *   data-reveal            fade + 24px rise, once, when entering the viewport
 *   data-reveal-stagger    reveals direct children in sequence
 *   data-reveal-image      clip-path wipe with a slight scale settle
 *   data-parallax="8"      image drifts ±8% while its frame crosses the viewport
 *
 * Initial hidden states live in CSS under `.js-motion`, which is only set when
 * the visitor has not asked for reduced motion (see the inline script in the
 * root layout). If this component never runs, a CSS failsafe reveals content.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-motion")) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay || 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        gsap.to(group.children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((frame) => {
        const media = frame.querySelector("img, video");
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 85%", once: true } });
        tl.to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
        if (media) tl.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
      });

      if (window.matchMedia("(min-width: 768px)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 8);
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }
    });

    root.classList.add("motion-live");
    // Fonts and images can shift layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
