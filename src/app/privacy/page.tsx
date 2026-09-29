import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How London Construction and Development uses personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

/*
 * NOTE FOR THE CLIENT: this notice reflects how the website itself works
 * (an enquiry form, no analytics or marketing cookies). It should be
 * reviewed by the business before launch, and updated if analytics,
 * marketing tools or new data uses are added.
 */
export default function PrivacyPage() {
  const sections: { title: string; body: React.ReactNode }[] = [
    {
      title: "Who we are",
      body: (
        <p>
          This website is operated by {site.name}, {site.address.street}, {site.address.locality} {site.address.postcode},{" "}
          {site.address.country}. We are the controller of personal information submitted through this website. You can
          contact us on{" "}
          <a href={site.phone.href} className="link-inline tabular">
            {site.phone.display}
          </a>
          {site.email ? (
            <>
              {" "}
              or at{" "}
              <a href={`mailto:${site.email}`} className="link-inline">
                {site.email}
              </a>
            </>
          ) : null}
          .
        </p>
      ),
    },
    {
      title: "What we collect",
      body: (
        <p>
          When you send an enquiry we collect the details you enter: your name, email address and, if you choose to give
          them, your phone number, the type of project, its location and your message. We do not ask for more than we
          need to reply.
        </p>
      ),
    },
    {
      title: "How we use it",
      body: (
        <p>
          We use your details to respond to your enquiry and, where you ask us to, to discuss or quote for your project.
          Our lawful basis is our legitimate interest in responding to enquiries and, where relevant, taking steps at
          your request before entering into a contract. We do not sell your information or use it for unrelated
          marketing.
        </p>
      ),
    },
    {
      title: "Who we share it with",
      body: (
        <p>
          Enquiries are delivered to us by email through service providers that host this website and send its email.
          They process the information only to provide those services. We do not otherwise share your information unless
          the law requires us to.
        </p>
      ),
    },
    {
      title: "How long we keep it",
      body: <p>We keep enquiry information only for as long as we need it to deal with your enquiry and any project that follows, and for any period required by law.</p>,
    },
    {
      title: "Cookies and third-party content",
      body: (
        <p>
          This website does not use analytics or advertising cookies. The map on our{" "}
          <Link href="/areas" className="link-inline">
            Areas
          </Link>{" "}
          page is provided by OpenStreetMap, which receives your IP address when the map loads. Links to Google Maps open
          Google&rsquo;s own website.
        </p>
      ),
    },
    {
      title: "Your rights",
      body: (
        <p>
          You have the right to ask for a copy of your information, to have it corrected or deleted, and to object to or
          restrict how we use it. To make a request, contact us using the details above. If you are unhappy with how we
          have handled your information you can complain to the Information Commissioner&rsquo;s Office at{" "}
          <a href="https://ico.org.uk" className="link-inline" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <>
      <PageIntro label="Privacy" title="Privacy notice." lead="How we use the information you share with us through this website." crumbs={[{ label: "Privacy" }]} />
      <section className="wrap pb-24 md:pb-32">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-9 lg:col-span-7 lg:col-start-4">
            {sections.map((s) => (
              <section key={s.title} className="border-t border-line py-8">
                <h2 className="t-h4">{s.title}</h2>
                <div className="mt-3 text-slate">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
