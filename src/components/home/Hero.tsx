"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { heroFilm } from "@/content/media";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Video-led hero.
 * - The poster renders immediately (and is the LCP element).
 * - Exactly one rendition is loaded: portrait for tall/narrow screens,
 *   1080p landscape otherwise. The film fades in once it is playing.
 * - Reduced-motion and data-saver visitors keep the still poster.
 * - A pause control satisfies WCAG 2.2.2 for moving content.
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData) return;

    const portrait = window.matchMedia("(max-aspect-ratio: 4/5), (max-width: 640px)").matches;
    const onStart = () => setEnabled(true);
    const onPlaying = () => setReady(true);
    video.addEventListener("loadstart", onStart);
    video.addEventListener("playing", onPlaying);
    video.src = portrait ? heroFilm.portrait : heroFilm.desktop;
    video.play().catch(() => setPaused(true));

    // Stop decoding while the hero is off-screen; resume when it returns (unless the visitor paused it).
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else if (video.dataset.userPaused !== "true") video.play().catch(() => {});
    });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => {
      io.disconnect();
      video.removeEventListener("loadstart", onStart);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  // Gentle scroll-away: the film drifts and the copy lifts as the hero leaves.
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-motion")) return;
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-copy]", {
        y: -60,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.dataset.userPaused = "false";
      v.play();
      setPaused(false);
    } else {
      v.dataset.userPaused = "true";
      v.pause();
      setPaused(true);
    }
  };

  return (
    <section ref={sectionRef} className="on-ink relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-on-ink" aria-labelledby="hero-title">
      <div ref={mediaRef} className="absolute inset-0" aria-hidden="true">
       <div className="absolute inset-0 hero-media">
        <HeroPoster />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${ready ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
       </div>
      </div>

      {/* Legibility: a low, directional wash — not a flat tint over the film */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" aria-hidden="true" />

      <div className="wrap relative flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+48px)] md:pb-14">
        <div data-hero-copy className="grid-12">
          <div className="col-span-4 md:col-span-11 xl:col-span-9">
            <div className="hero-in" style={{ animationDelay: "150ms" }}>
              <SectionLabel className="text-on-ink/80">Residential and Commercial · Ashford</SectionLabel>
            </div>
            <h1 id="hero-title" className="t-hero mt-6 md:mt-8 hero-in" style={{ animationDelay: "250ms" }}>
              Construction and development for homes and commercial property.
            </h1>
          </div>
          <div className="col-span-4 mt-8 md:col-span-7 md:mt-10 lg:col-span-6">
            <p className="t-lead text-on-ink/85 hero-in" style={{ animationDelay: "400ms" }}>
              New builds, extensions, loft conversions, renovations, structural work and commercial fit-outs.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row hero-in md:mt-10" style={{ animationDelay: "520ms" }}>
              <ButtonLink href="/contact#enquiry">Request a Quote</ButtonLink>
              <ButtonLink href="/services" variant="secondary" inverse arrow={false}>
                Explore Our Services
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between gap-6 border-t border-[var(--line-on-ink)] pt-5 hero-in md:mt-16" style={{ animationDelay: "700ms" }}>
          <dl className="flex flex-col gap-x-12 gap-y-2 t-small sm:flex-row">
            <div className="flex gap-3">
              <dt className="sr-only">Address</dt>
              <dd className="text-on-ink/75">{site.address.street}, {site.address.locality} {site.address.postcode}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="sr-only">Telephone</dt>
              <dd>
                <a href={site.phone.href} className="tabular text-on-ink hover:text-on-ink/70 transition-colors">
                  {site.phone.display}
                </a>
              </dd>
            </div>
          </dl>
          {enabled && (
            <button
              type="button"
              onClick={toggle}
              className="flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 text-on-ink/75 hover:text-on-ink transition-colors t-meta"
              aria-label={paused ? "Play background film" : "Pause background film"}
            >
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5V1Z" fill="currentColor" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" /></svg>
              )}
              <span className="hidden sm:inline">{paused ? "Play" : "Pause"}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/** Art-directed poster: portrait crop on narrow screens, landscape otherwise. */
function HeroPoster() {
  const common = { alt: "", sizes: "100vw", priority: true } as const;
  const { props: { srcSet: portrait } } = getImageProps({ ...common, src: heroFilm.posterPortrait, width: 720, height: 1280 });
  const { props: { srcSet: landscape, ...rest } } = getImageProps({ ...common, src: heroFilm.poster, width: 1920, height: 1080 });
  return (
    <picture>
      <source media="(max-aspect-ratio: 4/5), (max-width: 640px)" srcSet={portrait} />
      <source srcSet={landscape} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...rest} className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  );
}
