import type { MetadataRoute } from "next";
import { allServices, categories, serviceHref } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/services", 0.9),
    ...categories.map((c) => page(`/services/${c.slug}`, 0.8)),
    ...allServices.map((s) => page(serviceHref(s.category.slug, s.slug), 0.7)),
    page("/about", 0.6),
    page("/projects", 0.5),
    page("/areas", 0.6),
    page("/contact", 0.8),
    page("/privacy", 0.2),
  ];
}
