"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ArrowRight, PhoneIcon } from "@/components/ui/icons";
import { categories } from "@/content/services";
import { nav, site } from "@/content/site";

/**
 * Header behaviour:
 * - Over the home hero film it sits transparent with light text; anywhere
 *   else (or once scrolled) it becomes a solid stone bar.
 * - It slides away while scrolling down and returns on scroll up, so it is
 *   always one flick away without covering content.
 * - "Services" opens a panel of the seven categories (click or hover).
 * - Below 1024px, a full-screen menu with focus containment and Escape.
 */
export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hoverOpenedAt = useRef(0);

  // Scroll state
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 160 && y > last + 4) setHidden(true);
        else if (y < last - 4 || y < 160) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (state adjusted during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Mobile menu: scroll lock, Escape, focus containment
  useEffect(() => {
    if (!menuOpen) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = menuRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    // Wait a frame so the panel is no longer `visibility: hidden` before moving focus.
    const raf = requestAnimationFrame(() => focusables()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [menuButtonRef.current!, ...focusables()];
      const first = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Services panel: Escape and outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  const openServices = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setServicesOpen((open) => {
      if (!open) hoverOpenedAt.current = Date.now();
      return true;
    });
  }, []);
  // A click straight after hover-open should keep the panel open, not toggle it shut.
  const toggleServices = useCallback(() => {
    setServicesOpen((open) => (open && Date.now() - hoverOpenedAt.current < 500 ? true : !open));
  }, []);
  const closeServicesSoon = useCallback(() => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 180);
  }, []);

  const solid = scrolled || !overHero || servicesOpen;
  const light = !solid && !menuOpen;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500",
        hidden && !menuOpen && !servicesOpen ? "-translate-y-full" : "translate-y-0",
        menuOpen ? "bg-ink text-on-ink on-ink" : solid ? "bg-stone/95 text-ink backdrop-blur-sm" : "bg-transparent text-on-ink on-ink",
        solid && !menuOpen ? "border-b border-line" : "border-b border-transparent",
      ].join(" ")}
      style={{ transitionTimingFunction: "var(--ease-out)" }}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="-my-2 py-2" aria-label={`${site.shortName} — home`}>
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href}>
                  <div ref={servicesRef} onMouseEnter={openServices} onMouseLeave={closeServicesSoon} className="relative">
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-panel"
                      onClick={toggleServices}
                      className={`nav-link ${isActive("/services") ? "is-active" : ""}`}
                    >
                      Services
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}>
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </button>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={`nav-link ${isActive(item.href) ? "is-active" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <a href={site.phone.href} className={`hidden items-center gap-2 text-[0.9375rem] font-medium tabular xl:inline-flex ${light ? "text-on-ink" : "text-ink"} hover:opacity-70 transition-opacity`}>
            <PhoneIcon />
            {site.phone.display}
          </a>
          <Link href="/contact" className="btn btn-primary hidden !min-h-[44px] !px-5 sm:inline-flex">
            Request a Quote
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-all duration-300 ${menuOpen ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-all duration-300 ${menuOpen ? "top-[5px] -rotate-45" : "top-[10.5px]"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Desktop services panel */}
      <div
        id="services-panel"
        onMouseEnter={openServices}
        onMouseLeave={closeServicesSoon}
        className={`absolute inset-x-0 top-full hidden border-b border-line bg-stone text-ink lg:block transition-[opacity,visibility,transform] duration-300 ${
          servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <div className="wrap grid grid-cols-12 gap-8 py-10">
          <div className="col-span-3 flex flex-col justify-between border-r border-line pr-8">
            <div>
              <p className="t-label text-muted">Services</p>
              <p className="mt-4 t-h4 max-w-[16rem]">Seven disciplines, from foundations to finishes.</p>
            </div>
            <Link href="/services" className="btn-text mt-8 self-start" tabIndex={servicesOpen ? 0 : -1}>
              All services <ArrowRight />
            </Link>
          </div>
          <ul className="col-span-9 grid grid-cols-2 gap-x-8 xl:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/services/${c.slug}`}
                  tabIndex={servicesOpen ? 0 : -1}
                  className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors hover:border-ink"
                >
                  <span className="t-meta text-muted">{c.index}</span>
                  <span className="flex-1">
                    <span className="block font-semibold">{c.name}</span>
                    <span className="mt-1 block t-small text-slate">{c.services.length} services</span>
                  </span>
                  <ArrowRight className="self-center opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </header>
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`on-ink fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-ink text-on-ink lg:hidden duration-300 ${
          // Visibility flips instantly on open (so focus can move in) and waits for the fade on close.
          menuOpen ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-[var(--line-on-ink)]">
            <li>
              <Link href="/" tabIndex={menuOpen ? 0 : -1} className="mobile-link">
                Home
              </Link>
            </li>
            {nav.map((item, i) => (
              <li key={item.href} style={{ transitionDelay: menuOpen ? `${60 + i * 40}ms` : "0ms" }} className={`transition-[opacity,transform] duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                <Link href={item.href} tabIndex={menuOpen ? 0 : -1} className="mobile-link" aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                  {isActive(item.href) && <span className="h-1.5 w-1.5 bg-brick" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <p className="t-label text-on-ink-soft">Services</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 xs:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services/${c.slug}`} tabIndex={menuOpen ? 0 : -1} className="flex min-h-11 items-center gap-3 py-1 text-on-ink-soft hover:text-on-ink">
                    <span className="t-meta">{c.index}</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link href="/contact" tabIndex={menuOpen ? 0 : -1} className="btn btn-primary w-full">
              Request a Quote <ArrowRight />
            </Link>
            <a href={site.phone.href} tabIndex={menuOpen ? 0 : -1} className="btn btn-secondary w-full tabular">
              <PhoneIcon /> {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
