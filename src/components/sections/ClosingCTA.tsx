import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Frame } from "@/components/ui/Frame";
import { site } from "@/content/site";
import type { ImageKey } from "@/content/images";

/** Closing conversion block used at the foot of every page. */
export function ClosingCTA({
  title = "Tell us about your project.",
  text = "Whether it is an extension, a refurbishment or a commercial fit-out, the first step is a conversation. Share a few details and we will come back to you to discuss it.",
  image = "london-cranes",
}: {
  title?: string;
  text?: string;
  image?: ImageKey;
}) {
  return (
    <section className="on-ink relative overflow-hidden bg-ink text-on-ink" aria-labelledby="cta-title">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <Frame image={image} sizes="100vw" className="h-full w-full" parallax={6} alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" aria-hidden="true" />
      <div className="wrap relative section">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-10 lg:col-span-8">
            <div data-reveal>
              <SectionLabel className="text-on-ink-soft">Start a conversation</SectionLabel>
            </div>
            <h2 id="cta-title" className="t-display mt-8" data-reveal>
              {title}
            </h2>
            <p className="t-lead mt-8 max-w-xl text-on-ink-soft" data-reveal>
              {text}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-reveal>
              <ButtonLink href="/contact#enquiry">Request a Quote</ButtonLink>
              <a href={site.phone.href} className="btn btn-secondary tabular">
                <PhoneIcon /> Call {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
