import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { images } from "@/content/images";
import { heroFilm } from "@/content/media";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Credits for photography and film used on this website.",
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  const photos = Object.values(images);
  return (
    <>
      <PageIntro
        label="Credits"
        title="Image credits."
        lead="Illustrative photography and film on this website are licensed stock and do not depict our own projects."
        crumbs={[{ label: "Image credits" }]}
      />
      <section className="wrap pb-24 md:pb-32">
        <div className="grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-4">
            <h2 className="t-h4">Film</h2>
            <p className="mt-2 t-small text-muted">Pexels License</p>
            <ul className="mt-4 border-t border-line">
              {heroFilm.sources.map((s) => (
                <li key={s.source} className="flex flex-wrap justify-between gap-2 border-b border-line py-3 t-small">
                  <span>{s.title}</span>
                  <a href={s.source} className="link-inline text-slate" target="_blank" rel="noopener noreferrer">
                    {s.credit}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="t-h4 mt-14">Photography</h2>
            <p className="mt-2 t-small text-muted">Unsplash License</p>
            <ul className="mt-4 border-t border-line">
              {photos.map((p) => (
                <li key={p.src} className="flex flex-wrap justify-between gap-2 border-b border-line py-3 t-small">
                  <span className="max-w-lg">{p.alt}</span>
                  <a href={p.source} className="link-inline text-slate" target="_blank" rel="noopener noreferrer">
                    {p.credit}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
