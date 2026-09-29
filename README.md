# London Construction And Development LTD — Website

Marketing website for London Construction And Development LTD, 648 London Road, Ashford, TW15 3AW.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 and GSAP.
All 61 pages are statically generated; the only server code is the enquiry endpoint.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Environment

Copy `.env.example` to `.env.local` (or set these in Vercel):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain, e.g. `https://www.example.co.uk` (sitemap, canonical links, Open Graph) |
| `RESEND_API_KEY` | Resend API key for enquiry emails |
| `ENQUIRY_TO_EMAIL` | Inbox that receives enquiries |
| `ENQUIRY_FROM_EMAIL` | Sender on a Resend-verified domain |

Until the three `RESEND`/`ENQUIRY` variables are set, the form validates normally but tells visitors that
online enquiries are temporarily unavailable and shows the phone number. It never reports a false success.

## Where things live

| Path | Contents |
|---|---|
| `src/content/site.ts` | Verified business facts (name, address, phone). `null` fields are not yet supplied. |
| `src/content/services.ts` | Service taxonomy — 7 disciplines, 37 services — and all service copy |
| `src/content/projects.ts` | Project portfolio (empty until real projects are supplied) |
| `src/content/images.ts` | Image manifest with alt text and licence credits |
| `src/content/media.ts` | Hero film renditions and sources |
| `src/app/globals.css` | Design tokens, typography scale, buttons, fields |
| `src/components/motion/MotionProvider.tsx` | Site-wide scroll reveals / parallax (data-attribute driven) |

## Design system (summary)

- **Type:** Archivo (one family, variable width axis). Display and headings at 104–112% width; body at 100%.
- **Colour:** Portland stone `#f3f1ec` ground, graphite `#141619` ink, mortar `#d6d1c7` lines, London brick `#9e3f28` as the single accent (`#d9785c` for brick text on dark).
- **Shape:** 2px radius on controls, square images, no drop shadows.
- **Motion:** GSAP reveals once per element, clip-path image wipes, ≤8% parallax on desktop only. Everything is disabled under `prefers-reduced-motion`.

## Content still required from the client

Nothing below has been invented; the site renders cleanly without each item and picks it up automatically once added.

1. Enquiry email address(es) and a Resend account/API key (or alternative delivery method)
2. Companies House registration number (legally required on the site) — add to `site.companyNumber`
3. Confirmed service areas
4. Real project information and photography — add to `src/content/projects.ts`
5. Logo / brand assets, if any exist (a wordmark has been designed in the meantime)
6. Any genuine accreditations, memberships, insurance details or founding year
7. Final domain name
8. Confirmation of the "How we work" / "What to expect" copy (About page and home page), which describes a general approach
9. Review of the privacy notice (`/privacy`)

## Imagery

Photography is from Unsplash (Unsplash License) and the hero film is edited from four Pexels clips (Pexels License).
Both licences allow commercial use without attribution; credits are nonetheless listed at `/credits`.
Stock imagery is illustrative and should be replaced with the company's own project photography when available.
