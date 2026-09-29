import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "primary" | "secondary" | "text";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  text: "btn-text",
};

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  inverse?: boolean;
  className?: string;
  children: ReactNode;
};

/** Navigational action. Uses next/link for internal routes, <a> for tel:/mailto:/external. */
export function ButtonLink({ variant = "primary", arrow = true, inverse, className = "", children, href, ...rest }: LinkButtonProps) {
  const cls = `${variantClass[variant]} ${inverse ? "is-inverse" : ""} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight />}
    </>
  );
  const h = typeof href === "string" ? href : "";
  if (h.startsWith("tel:") || h.startsWith("mailto:") || h.startsWith("http")) {
    return (
      <a href={h} className={cls} {...(h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
