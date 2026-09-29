/**
 * Wordmark. The mark is a plan-section: a square site boundary with a
 * brick-coloured L — a footing, a corner, the first course of a building.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="28.5" height="28.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6h4.5v13.5H23V24H7V6Z" fill="var(--brick)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-semibold tracking-[-0.01em]" style={{ fontStretch: "112%" }}>
          London Construction
        </span>
        <span className="mt-[5px] text-[0.625rem] font-medium uppercase tracking-[0.22em] opacity-75">
          and Development
        </span>
      </span>
    </span>
  );
}
