import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Frame } from "@/components/ui/Frame";

export function Intro() {
  return (
    <section className="section" aria-labelledby="intro-title">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-3" data-reveal>
            <SectionLabel index="01" className="text-slate">
              The company
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9">
            <h2 id="intro-title" className="t-h2 max-w-[22ch] lg:max-w-[24ch]" data-reveal>
              We build, extend, renovate and maintain property for homeowners, landlords, developers and businesses.
            </h2>
            <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-10" data-reveal-stagger>
              <p className="text-slate">
                London Construction and Development works across residential and commercial property. Our services
                run from groundworks and structural alterations to roofing, interiors and building services — the
                trades needed to take a project from an empty plot or a tired building to a finished space.
              </p>
              <p className="text-slate">
                Every project starts with understanding what you want to achieve, then agreeing a clear scope. From
                there, the work is planned in the right order so that each stage sets up the next.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2" data-reveal>
              <ButtonLink href="/about" variant="text">
                About the company
              </ButtonLink>
              <ButtonLink href="/services" variant="text">
                View all services
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="grid-12 mt-16 gap-y-4 md:mt-24">
          <Frame image="london-terrace" ratio="aspect-[4/3] md:aspect-[16/10]" sizes="(min-width: 768px) 58vw, 100vw" className="col-span-4 md:col-span-7" reveal parallax={6} />
          <div className="col-span-4 flex flex-col justify-end md:col-span-5">
            <Frame image="brick-texture" ratio="aspect-[4/3]" sizes="(min-width: 768px) 40vw, 100vw" reveal />
          </div>
        </div>
      </div>
    </section>
  );
}
