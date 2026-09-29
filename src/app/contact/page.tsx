import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/ui/PageIntro";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { ArrowUpRight, PhoneIcon } from "@/components/ui/icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description: `Request a quote or discuss your project with London Construction and Development. Call ${site.phone.display} or send an enquiry online.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Contact"
        title="Discuss your project."
        lead="Call us, or send a few details using the form and we will come back to you."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="wrap pb-24 md:pb-32" aria-label="Contact options">
        <div className="grid-12 gap-y-14">
          <aside className="col-span-4 md:col-span-12 lg:col-span-4" aria-label="Contact details">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <div className="on-ink bg-ink p-8 text-on-ink" data-reveal>
                <p className="t-label text-on-ink-soft">Call us</p>
                <a href={site.phone.href} className="mt-4 flex items-center gap-3 text-[1.75rem] font-semibold tabular tracking-[-0.02em] hover:text-on-ink-soft transition-colors md:text-[2rem]">
                  <PhoneIcon className="h-5 w-5" />
                  {site.phone.display}
                </a>
                <p className="mt-4 t-small text-on-ink-soft">The quickest way to talk through a project.</p>
              </div>

              <dl className="mt-8 border-t border-line" data-reveal-stagger>
                <div className="border-b border-line py-5">
                  <dt className="t-label text-muted">Address</dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      {site.name}
                      <br />
                      {site.address.street}
                      <br />
                      {site.address.locality} {site.address.postcode}
                    </address>
                    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-text mt-2">
                      Get directions <ArrowUpRight />
                      <span className="sr-only">(opens Google Maps in a new tab)</span>
                    </a>
                  </dd>
                </div>
                {site.email && (
                  <div className="border-b border-line py-5">
                    <dt className="t-label text-muted">Email</dt>
                    <dd className="mt-2">
                      <a href={`mailto:${site.email}`} className="link-inline">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>

          <div id="enquiry" className="col-span-4 scroll-mt-[calc(var(--header-h)+24px)] md:col-span-12 lg:col-span-7 lg:col-start-6">
            <h2 className="t-h2" data-reveal>
              Request a quote
            </h2>
            <p className="mt-4 max-w-xl text-slate" data-reveal>
              The more you can tell us about the work, the more useful our first conversation will be.
            </p>
            <div className="mt-10">
              <Suspense fallback={<div className="h-[40rem]" aria-hidden="true" />}>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
