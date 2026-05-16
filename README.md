# Dale Nacario — Portfolio

Personal portfolio site. Single-page, dark-restrained editorial design (warm paper + Fraunces serif + terracotta accent).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · `@icons-pack/react-simple-icons` · `lucide-react`

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run lint
```

## Repo layout

```
src/
├── app/
│   ├── layout.tsx               root layout, fonts, metadata, skip link
│   ├── page.tsx                 composes the 7 sections in order
│   ├── globals.css              design tokens (Warm Paper palette) + Tailwind v4
│   ├── opengraph-image.tsx      auto-generated 1200×630 OG image
│   ├── robots.ts                /robots.txt
│   └── sitemap.ts               /sitemap.xml
├── components/
│   ├── layout/   nav, footer
│   ├── sections/ hero, about, skills, experience-timeline, projects, achievements, contact
│   ├── primitives/ section, reveal (motion), tag, skill-icon
│   └── ui/       shadcn primitives
├── config/
│   ├── content.ts   typed content used by the site (mirror of CONTENT.md)
│   ├── site.ts      name, role, url, description, locale
│   └── theme.ts     typed reference to design tokens in globals.css
└── lib/utils.ts     cn() helper
```

## Editing content

`CONTENT.md` is the human-readable source-of-truth. After you edit it, mirror the values into `src/config/content.ts` (typed; this is what the site actually reads). Run `npm run dev` to verify, commit both files together.

Search the codebase for `TODO:` to find every placeholder that still needs real content.

## Design tokens

All colors and fonts come from CSS variables in `src/app/globals.css`:

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F7F5F2` | page background |
| `--ink` | `#2B2A27` | primary text |
| `--ink-soft` | `#5A5550` | body copy |
| `--taupe` | `#8A7F70` | captions, rail labels |
| `--hairline` | `#E8E2D8` | dividers, borders |
| `--surface` | `#FFFFFF` | cards |
| `--accent` | `#B5651D` | terracotta — italic emphasis, hover |
| `--accent-ink` | `#8A4A14` | accent on hover (AA contrast) |

Fonts: **Fraunces** (display, italic-capable) + **Inter** (body/UI) via `next/font/google`.

## Adding skills

Edit `src/config/content.ts` → `content.skills`. Each item is `{ name, icon, iconSource }`:

- `iconSource: 'simple-icons'` — `icon` is a [Simple Icons](https://simpleicons.org) slug (e.g. `react`, `typescript`). Add the slug to the static map in `src/components/primitives/skill-icon.tsx` (`SIMPLE_ICON_MAP`) — keeps the bundle tree-shakeable. Unknown slugs render a monogram fallback.
- `iconSource: 'lucide'` — `icon` is a [Lucide](https://lucide.dev) component name (e.g. `Lightbulb`). Add it to `LUCIDE_ICON_MAP`.

## Swapping placeholder project images

Project covers live under `public/projects/<slug>/cover.svg` (themed SVGs for v1). Drop a real screenshot (PNG/JPG/WebP) at the same path, or update the `image` field in `src/config/content.ts`.

The Adam's Staycation card also pulls a brand logo from `public/projects/adams-staycation/logo.svg` (real asset).

## Deploy

Zero-config on Vercel — push to GitHub and import the repo. For static hosting elsewhere, `npm run build` produces a fully static output (no server runtime required).

Set the canonical URL in `src/config/site.ts` (`site.url`) before deploy — it feeds OG tags, sitemap, and robots.

## Planning docs

- [`PLAN.md`](./PLAN.md) — implementation plan, design system, task list, decisions.
- [`CONTENT.md`](./CONTENT.md) — content source-of-truth.
