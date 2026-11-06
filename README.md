# Muhammad Ameer Hamza: portfolio

Next.js 15 (App Router). Every page is pre-rendered as static HTML at build time. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also lints and type-checks)
npm run lint
```

## Where to edit things

| What | File |
| --- | --- |
| Name, email, LinkedIn, GitHub, CV path, Calendly | `content/site.ts` |
| Hero, proof bar, "How I work", experience | `content/home.ts` |
| Case studies, AI & automation, more work | `content/projects.ts` |
| LinkedIn recommendations (section stays hidden while empty) | `content/testimonials.ts` |
| Colours, type scale, spacing (design tokens) | top of `app/globals.css` |

## Assets you need to add

- **CV:** replace `public/cv.pdf` (currently a placeholder page).
- **Screenshots:** see `public/work/README.md` for the exact file names. Each one appears automatically on the next build; until then a neutral placeholder is shown.
- **Calendly:** set `calendly` in `content/site.ts` and a "Book a call" row appears in Contact.

## Deployment (Vercel)

- Framework preset: **Next.js** (auto-detected). No `vercel.json` needed.
- Optional env var: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`, used for canonical URLs, Open Graph, the sitemap and JSON-LD. Without it, Vercel's production domain is used.
- Vercel Analytics is included (`@vercel/analytics`). Enable **Web Analytics** in the Vercel project settings, or remove `<Analytics />` from `app/layout.tsx`.

## Structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD, header/footer
  page.tsx              home
  work/[slug]/page.tsx  case-study template
  opengraph-image.tsx   1200×630 social card (also per case study)
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
components/             UI (BrowserFrame, ArchitectureDiagram, CountUp, …)
content/                all text and numbers
lib/og.tsx              social-card renderer (fonts in lib/og-fonts)
public/work/<slug>/     screenshots
```
