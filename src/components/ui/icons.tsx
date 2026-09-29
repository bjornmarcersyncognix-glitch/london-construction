type IconProps = { className?: string };

/** Arrow used on every forward action — one icon, one stroke weight. */
export function ArrowRight({ className = "" }: IconProps) {
  return (
    <svg className={`btn-arrow shrink-0 ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: IconProps) {
  return (
    <svg className={`btn-arrow shrink-0 ${className}`} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11 11 3M4.5 3H11v6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg className={`shrink-0 ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.6 1.5H3.2c-.9 0-1.7.8-1.6 1.7.6 6 5.4 10.8 11.4 11.4.9.1 1.7-.7 1.7-1.6v-2.4l-3-1.3-1.6 1.6a8.6 8.6 0 0 1-3.9-3.9l1.6-1.6-1.2-3.9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusMinus({ open, className = "" }: IconProps & { open: boolean }) {
  return (
    <svg className={`shrink-0 ${className}`} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M0 7h14" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 0v14"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ transform: open ? "scaleY(0)" : "scaleY(1)", transformOrigin: "center", transition: "transform 300ms var(--ease-out)" }}
      />
    </svg>
  );
}
