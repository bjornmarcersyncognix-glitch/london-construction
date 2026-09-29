import type { SiteImage } from "./images";

/**
 * Project portfolio.
 *
 * Intentionally empty: no verified project information has been supplied.
 * Add entries here once the client provides real projects and photography —
 * the Projects page switches from its holding state to a full showcase
 * automatically.
 */
export type Project = {
  slug: string;
  title: string;
  /** e.g. "House extension", "Office fit-out" — should match a service name. */
  type: string;
  /** Town or area, as approved by the client. */
  location: string;
  sector: "Residential" | "Commercial";
  scope: string[];
  summary: string;
  cover: SiteImage;
  gallery?: SiteImage[];
};

export const projects: Project[] = [];
