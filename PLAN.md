# Implementation Plan: Dale Nacario — Personal Portfolio (Frontend)

> **Companion file:** [`CONTENT.md`](./CONTENT.md) — human-readable source-of-truth for all personal content rendered on the site.

## Context

Personal portfolio for Dale Nacario (Software Engineer, 3 yrs) presenting his work at **Cody Web Development**, his personal projects (**MarketPlace**, **Adam's Staycation**, **Social**), achievements, and hard skills.

**Visual direction:** **Warm Paper × Editorial Serif** — a quiet, magazine-like portfolio with a warm off-white background, large serif display type, restrained terracotta accent. Pivots away from the dark gldrp.com reference toward a more client-friendly, premium, gallery-style aesthetic.

The working directory `/Users/dalenacario/Desktop/projects/portfolio-website/` is greenfield (no existing code).

**Outcome:** A production-quality, statically-deployable Next.js portfolio that:
- Feels intentional and polished (not "AI-generated") — reads as a calm publication, not a SaaS template.
- Is edited via a single human-readable `CONTENT.md` mirrored into a typed `src/config/content.ts`.
- Loads fast, is accessible (WCAG AA), responsive (mobile-first), and deploy-ready (Vercel / static export).

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | User-selected. Static-export friendly, great DX. |
| Styling | **Tailwind CSS v4** | User-selected. CSS-first config, fewer dependencies. |
| Components | **shadcn/ui** (Button, Card, Badge, Separator, NavigationMenu, Tooltip, Sheet) | Accessible primitives, copy-in (no runtime lock-in). |
| Animation | **Framer Motion** (sparingly) + Tailwind transitions | Reveal-on-scroll only. Editorial pacing — minimal motion, honors `prefers-reduced-motion`. |
| Icons | **lucide-react** (UI + soft-skill icons) + **@icons-pack/react-simple-icons** (brand logos for Hard Skills) | lucide for navigation/UI; Simple Icons gives 3000+ official brand SVGs with brand colors built-in, tree-shakeable so only the ones imported ship. |
| Fonts | **Fraunces** (display, serif) + **Inter** (body/UI) via `next/font/google` | Fraunces = warm variable serif with editorial personality; Inter = neutral grotesk that holds up at small sizes. Free, zero layout shift. |
| Theme | **Light-only v1**, "Warm Paper × Editorial Serif" — warm off-white background, ink-near-black text, terracotta accent. CSS vars so a dark variant can ship later. | Matches chosen direction (Soft Neutral palette + Editorial Minimal typography). |
| Content source | **`CONTENT.md`** (doc) **+ `src/config/content.ts`** (typed, imported by site) | Markdown is the human-readable spec; TS is what components read. |
| Deployment | Vercel (zero-config) or `next build && next export` static | Decide later, doesn't affect build. |

## Design System — Warm Paper × Editorial Serif

### Color tokens (CSS vars)

| Token | Value | Role |
|---|---|---|
| `--paper` (bg) | `#F7F5F2` | Warm off-white page background |
| `--ink` (fg)   | `#2B2A27` | Primary text / headings |
| `--ink-soft`   | `#5A5550` | Body copy slightly softened |
| `--taupe` (muted) | `#8A7F70` | Secondary text, captions, italic subheads |
| `--hairline` (border) | `#E8E2D8` | Thin section dividers, badge borders |
| `--surface`    | `#FFFFFF` | Cards, badges on `--paper` for subtle lift |
| `--accent`     | `#B5651D` | Terracotta — italic emphasis, primary CTA hover, link underlines |
| `--accent-ink` | `#8A4A14` | Accent text on hover (darker terracotta for AA contrast) |

All tokens defined in `src/app/globals.css` under `:root`. Tailwind v4 `@theme` block maps them to utilities: `bg-paper`, `text-ink`, `text-taupe`, `border-hairline`, `text-accent`, etc.

### Typography

| Role | Family | Notes |
|---|---|---|
| Display (h1, hero) | **Fraunces** (variable) | Weight 400, slight optical adjustments at large sizes. Italic variant for accent words ("calm, useful"). |
| Headings (h2–h4) | **Fraunces** | Weight 400–500, tracking ≈ −0.5 to −1px at large sizes. |
| Body & UI | **Inter** (variable) | Weight 400 for body, 500 for buttons/labels. |
| Section rails / labels | **Inter** | 11px, uppercase, letter-spacing `0.12em`, color `--taupe`. Used as "01 — Introduction" markers. |
| Mono (dates, code) | **JetBrains Mono** (optional) or system `ui-monospace` | For timeline date columns and any inline code. Keep usage rare. |

Fluid display sizing: `clamp(2.5rem, 6vw, 4.5rem)` for hero, `clamp(1.75rem, 3.5vw, 2.5rem)` for section headings.

### Layout & motion

- **Whitespace:** generous. Sections use `py-24` (mobile `py-16`); container `max-w-5xl`.
- **Dividers:** 1px `--hairline` rule between timeline entries; no card shadows in the editorial sections.
- **Cards (personal projects):** subtle `--surface` background, 1px `--hairline` border, 12px radius. Hover = border darkens to `--ink`, no lift.
- **Buttons:** pill shape, `--ink` primary fill on `--paper`, `--paper` text. Secondary = transparent with `--hairline` border.
- **Accent usage rule:** terracotta appears in **at most 2–3 places per viewport** — an italic accent word in the hero, the primary CTA hover state, and the active nav underline. Never as a background fill.
- **Motion:** single `Reveal` primitive (fade + 8px up, 400ms, ease-out) on section enter. Honors `prefers-reduced-motion`. No parallax, no marquees.

## Architecture

```
portfolio-website/
├── CONTENT.md                       ← human-readable source-of-truth for personal content
├── PLAN.md                          ← this file
├── README.md                        ← project setup/run instructions
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs               ← Tailwind v4
├── components.json                  ← shadcn config
├── public/
│   ├── owner.jpg                    ← Dale's portrait (used in About) ✓
│   ├── og.png                       ← OG/Twitter share image (TODO)
│   ├── favicon.ico
│   └── projects/
│       ├── cody/{project-1,project-2,project-3}/cover.svg   ← placeholder covers ✓
│       ├── marketplace/cover.svg                            ← placeholder ✓
│       ├── adams-staycation/{logo.svg, cover.svg}           ← AS brand mark ✓ + placeholder cover ✓
│       └── social/cover.svg                                 ← placeholder ✓
└── src/
    ├── app/
    │   ├── layout.tsx               ← fonts, metadata, theme vars
    │   ├── page.tsx                 ← single long-scroll page composing sections
    │   ├── globals.css              ← Tailwind v4 + CSS vars (bg/fg/accent)
    │   ├── not-found.tsx
    │   └── robots.ts / sitemap.ts
    ├── components/
    │   ├── ui/                      ← shadcn primitives
    │   ├── layout/
    │   │   ├── nav.tsx              ← sticky top nav w/ smooth-scroll anchors
    │   │   └── footer.tsx
    │   ├── sections/
    │   │   ├── hero.tsx
    │   │   ├── about.tsx
    │   │   ├── skills.tsx
    │   │   ├── experience-timeline.tsx
    │   │   ├── projects.tsx
    │   │   ├── achievements.tsx
    │   │   └── contact.tsx
    │   └── primitives/
    │       ├── section.tsx          ← consistent vertical rhythm wrapper
    │       ├── reveal.tsx           ← scroll-reveal motion wrapper
    │       ├── tag.tsx              ← stack/tech badge (used in projects + timeline)
    │       └── skill-icon.tsx       ← skills-section icon renderer (simple-icons OR lucide)
    ├── config/
    │   ├── content.ts               ← typed content (mirrors CONTENT.md)
    │   ├── site.ts                  ← name, url, description, socials
    │   └── theme.ts                 ← accent token reference
    └── lib/
        └── utils.ts                 ← cn() helper from shadcn
```

**Single-page layout** — anchored sections, not separate routes. Nav uses `href="#hero|#about|#skills|#experience|#projects|#achievements|#contact"` with `scroll-behavior: smooth`.

## Image Assets

All assets live under `public/` and are already in place before scaffolding (Task 1 must preserve them).

| Path | Purpose | Status |
|---|---|---|
| `/owner.jpg` | Dale's portrait (About section, optionally Hero meta) | ✓ real photo |
| `/projects/adams-staycation/logo.svg` | AS brand mark (dark teal #0D2B33 + terracotta #E07A5F) | ✓ real |
| `/projects/adams-staycation/cover.svg` | Project cover incorporating the AS mark | ⚠ themed placeholder |
| `/projects/marketplace/cover.svg` | MarketPlace project cover | ⚠ themed placeholder |
| `/projects/social/cover.svg` | Social project cover | ⚠ themed placeholder |
| `/projects/cody/project-{1,2,3}/cover.svg` | Cody experience timeline images | ⚠ themed placeholders |

**Placeholder strategy:** Generated as on-brand SVGs (warm paper bg, Fraunces-style serif, terracotta accent, hairline rules) so they look intentional, scale crisply, and ship lightweight. Replace with real screenshots (PNG/JPG/WebP) at the same path when available — no code change required.

**Rename note:** Personal project `tambuli` → `adams-staycation` (display name: "Adam's Staycation"). The AS brand mark is the only real asset for this project; the cover SVG riffs on the mark.

## Content Model (typed in `src/config/content.ts`)

```ts
export type Content = {
  hero: {
    name: string;
    role: string;
    tagline: string;
    location?: string;       // 'City, Country' — rendered in meta row
    availability?: string;   // 'Open to opportunities' — rendered in meta row
    resumeHref?: string;     // optional 'Download Resume' CTA target
    cta: { label: string; href: string }[];
  };
  about: {
    intro: string;
    longBio: string;
    location?: string;
    portrait?: string;       // '/owner.jpg'
    years?: number;          // 3
    focusAreas?: string[];   // ['Full-stack web', 'Frontend systems']
  };
  skills: {
    section: 'technical' | 'soft';                       // matches reference layout (Technical Skills + Soft Skills cards)
    category: string;                                     // 'Languages & Frameworks', 'Databases', 'DevOps', 'Tools', 'Essential interpersonal abilities'
    items: {
      name: string;                                       // 'React'
      icon: string;                                       // simple-icons slug ('react') OR lucide-react name ('Lightbulb') for soft skills
      iconSource: 'simple-icons' | 'lucide';              // discriminator
    }[];
  }[];
  experience: {
    company: string;
    role: string;
    start: string;   // 'YYYY-MM'
    end: string | 'Present';
    summary: string;
    projects: { name: string; period: string; description: string; stack: string[]; highlights?: string[] }[];
  }[];
  projects: {
    slug: 'marketplace' | 'adams-staycation' | 'social';   // 'adams-staycation' was 'tambuli'
    name: string;
    tagline: string;
    description: string;
    stack: string[];
    status?: 'shipped' | 'in-progress' | 'archived';
    links?: { label: string; href: string }[];
    image?: string;     // path under /public, e.g. '/projects/marketplace/cover.svg'
    logo?: string;      // optional brand mark, e.g. '/projects/adams-staycation/logo.svg'
  }[];
  achievements: { title: string; date?: string; detail?: string }[];
  contact: { email: string; socials: { label: string; href: string; icon: 'github'|'linkedin'|'x'|'mail' }[] };
};
```

`CONTENT.md` mirrors this shape in prose so Dale edits one file as the source-of-truth; values are copied into `content.ts` (v2 can auto-generate from frontmatter).

## Task List

### Phase 1: Foundation

- [x] **Task 1 — Scaffold project & install deps** ✓
  - `npx create-next-app@latest` with TS + Tailwind + App Router + ESLint + src/ → **done** (Next 16.2.6, React 19.2.4, Tailwind v4)
  - Installed: `framer-motion`, `lucide-react`, `@icons-pack/react-simple-icons`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot` → **done**
  - Init shadcn: `npx shadcn@latest init --defaults` → **done** (added `components.json`, `src/components/ui/button.tsx`, `src/lib/utils.ts`; updated `globals.css`)
  - **Acceptance:** `npm run build` succeeds (4 static pages); `tsc --noEmit` clean.
  - **Files:** `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `src/app/{layout,page}.tsx`, `src/app/globals.css`, `components.json`.
  - **Size:** S

- [x] **Task 2 — Design tokens, fonts, global styles** ✓
  - Wired Fraunces (weights 400/500/600 + italic) + Inter via `next/font/google` in `layout.tsx`, exposed as `--font-fraunces` / `--font-inter` → mapped to `--font-display` / `--font-sans` in `@theme`.
  - Defined all 8 brand tokens in `globals.css` `:root`. shadcn tokens (`--background`, `--foreground`, `--primary`, etc.) bridged to our palette so primitives stay on-brand automatically.
  - Light-only v1 (`<html lang="en">`, no `.dark` class). Body forced to `bg-paper text-ink font-sans`.
  - Tailwind v4 `@theme inline` exposes `bg-paper`, `text-ink`, `text-taupe`, `border-hairline`, `text-accent`, `font-display`, `font-sans`. Smooth-scroll + accent focus-ring + accent selection wired in `@layer base`.
  - **Acceptance:** verified via compiled CSS at dev-server runtime — all 5 brand hex values (`#f7f5f2`, `#2b2a27`, `#8a7f70`, `#e8e2d8`, `#b5651d`) and both font CSS vars present. `tsc --noEmit` clean, `npm run build` succeeds.
  - **Files:** `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx` (minimal smoke-test page).
  - Note: deferred `src/config/site.ts` / `theme.ts` to Task 3 (content) since they're content-adjacent.
  - **Size:** S

- [x] **Task 3 — Author `CONTENT.md` and typed `content.ts`** ✓
  - `CONTENT.md` already drafted with known info + `TODO:` markers.
  - Created `src/config/content.ts` exporting `content: Content` mirroring CONTENT.md verbatim (Hero/About/Skills/Experience/Projects/Achievements/Contact). Type union helpers exported: `ProjectSlug`, `IconSource`, `SocialIcon`, `ProjectStatus`.
  - Also created `src/config/site.ts` (name, url, description) and `src/config/theme.ts` (typed reference to the design tokens for programmatic access).
  - Wired `page.tsx` to import `content` from `@/config/content` — proves the import works end-to-end.
  - **Acceptance:** `tsc --noEmit` clean; build green; `content.hero.name` renders on the page.
  - **Files:** `src/config/{content,site,theme}.ts`, `src/app/page.tsx`.
  - **Size:** S

### Checkpoint A — Foundation
- [ ] `npm run dev` works, theme renders, content imports type-safe.
- [ ] Dale reviews `CONTENT.md` and fills in `TODO:` placeholders (or signs off on placeholders for v1 build).

### Phase 2: Layout shell + Hero

- [x] **Task 4 — shadcn primitives** ✓ added button (existed) + card, badge, separator, sheet, tooltip. Skipped navigation-menu (built simple anchor nav by hand).
- [x] **Task 5 — Section + Reveal + Tag primitives** ✓
- [x] **Task 6 — Top nav (sticky, active-section IntersectionObserver, mobile Sheet) + Footer (socials via Simple Icons + inline LinkedIn SVG)** ✓
- [x] **Task 7 — Hero section** ✓ rail label, fluid Fraunces display headline with terracotta italic accent, italic subhead, primary/secondary pill CTAs, 3-col meta dl (Based in / Status / Currently).
  - Editorial rail label ("01 — Introduction") in uppercase Inter, taupe.
  - Large Fraunces display headline (`clamp(2.5rem, 6vw, 4.5rem)`) with one italic accent phrase in `--accent` terracotta (e.g., "crafting *calm, useful* web products").
  - Italic Fraunces subhead in `--taupe` (1–2 sentences).
  - Two pill CTAs: primary (`--ink` fill, `--paper` text), secondary (transparent, `--hairline` border).
  - Meta row at bottom: Based in · Status · Currently (Inter 11px, taupe labels above ink values).
  - **Acceptance:** Hero fills first viewport without scroll on 1440×900; type scales fluidly; CTAs keyboard-accessible; italic accent visibly terracotta; no FOUT.
  - **Files:** `src/components/sections/hero.tsx`, `src/app/page.tsx`.
  - **Size:** S

### Checkpoint B — Shell
- [ ] Mobile + desktop hero looks intentional; nav anchors scroll correctly; Lighthouse a11y ≥ 95.

### Phase 3: Content sections (one vertical slice per task)

- [x] **Task 8 — About** ✓ two-col layout, portrait sticky on desktop, meta dl below long bio.

- [x] **Task 9 — Skills** ✓ Technical + Soft cards, brand logos via SkillIcon primitive (static-import map; AWS = inline SVG fallback; CSS3 → SiCss; monogram fallback for unknown slugs).
- [x] **Task 10 — Experience timeline (Cody)** ✓ company header + italic period, hairline-separated project rows with mono date column, stack tags, highlight bullets.
- [x] **Task 11 — Personal projects** ✓ 3-card grid (MarketPlace, Adam's Staycation, Social), 16:10 cover image, AS logo inline, status pill, hairline border darkens to ink on hover.
- [x] **Task 12 — Achievements** ✓ 3-col date/title/detail rows with hairline separators.
- [x] **Task 13 — Contact** ✓ email pill CTA + copy-to-clipboard with check icon feedback, socials icon row.

### Checkpoint C — Content complete
- [ ] All 7 sections render with real content from `content.ts`.
- [ ] Manual pass on iPhone-sized viewport (375px) and desktop (1440px).

### Phase 4: Polish, SEO, deploy-ready

- [ ] **Task 14 — Metadata, OG image, sitemap, robots**
  - `metadata` export with title/description/openGraph/twitter.
  - Static `public/og.png` (1200×630) or `opengraph-image.tsx`.
  - `app/robots.ts`, `app/sitemap.ts`.
  - **Acceptance:** `view-source` shows OG tags; `/robots.txt` and `/sitemap.xml` resolve.
  - **Size:** S

- [ ] **Task 15 — Accessibility + performance pass**
  - Semantic landmarks (`main`, `nav`, `footer`, `section[aria-labelledby]`).
  - Color contrast ≥ AA on accent + muted text.
  - `prefers-reduced-motion` honored in `Reveal`.
  - Images via `next/image` with explicit width/height.
  - Run Lighthouse (Performance/A11y/SEO ≥ 95).
  - **Size:** S

- [ ] **Task 16 — README + deploy notes**
  - `README.md`: how to run, edit `CONTENT.md` → `content.ts` workflow, deploy to Vercel.
  - **Size:** XS

### Checkpoint D — Ship-ready
- [ ] `npm run build` clean, no TS/ESLint errors.
- [ ] Lighthouse on production build: Perf/A11y/SEO/Best Practices ≥ 95.
- [ ] All `TODO:` placeholders in `CONTENT.md` resolved or explicitly accepted as v1 gaps.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Missing real content (Cody project names/dates, personal project details, socials, achievements) blocks "real" feel | Med | Build with clearly-marked `TODO:` placeholders in `CONTENT.md`; resolve at Checkpoint A. |
| Tailwind v4 + shadcn init friction (v4 is CSS-first, shadcn CLI v4 support still maturing) | Med | If init fails, fall back to Tailwind v3.4 — flagged early in Task 1; ~10 min cost. |
| Over-animation makes site feel gimmicky | Med | Single `Reveal` primitive used sparingly; honor `prefers-reduced-motion`. |
| Looks generic / "AI-generated" | High | Editorial pacing, Fraunces italic accents, single terracotta accent reserved for 2–3 places per viewport, hairline rules instead of shadows; avoid stock gradients or default shadcn-everywhere look. |
| Terracotta accent fails AA contrast on `--paper` for body text | Low | Accent reserved for italic display words, button-hover states, and underlines — never for body copy. Link text remains `--ink` with `--accent` underline. |
| Fraunces is heavy if all weights loaded | Low | Use variable-font subset (latin only), load weights 300–600 range; verify Lighthouse perf ≥ 95. |

## Open Questions

These are content gaps in `CONTENT.md` (every `TODO:` marker maps to one of these). Resolve before Checkpoint A; placeholders are acceptable for v1 build.

1. **Cody timeline** — start/end months and project names + descriptions for each engagement (currently 3 placeholder blocks).
2. **Personal projects** (MarketPlace, **Adam's Staycation**, Social) — tagline, description, stack, status, live/repo links per project.
3. **Contact** — email + GitHub / LinkedIn / X handles.
4. **Achievements** — what belongs here? (Certs, hackathons, notable releases, talks.)
5. **Resume PDF** — wire a "Download Resume" CTA in the hero? If yes, drop `public/resume.pdf`.
6. **Skill slug confirmations** — Hostinger, Shortcut, Bitbucket: verify each exists in Simple Icons or pick a fallback (lucide icon or text-only badge).

## Verification (end-to-end)

```bash
cd /Users/dalenacario/Desktop/projects/portfolio-website
npm install
npm run dev          # http://localhost:3000 — visual smoke test all sections
npm run lint
npm run build        # production build
# In Chrome DevTools: Lighthouse → Mobile → Perf + A11y + SEO + Best Practices
```

Manual checks:
- Resize viewport 360 → 1920px, no horizontal scroll, no broken layout.
- Tab through page: focus rings visible on every interactive element, logical order.
- Anchor links from nav scroll smoothly; active-section indicator updates.
- `prefers-reduced-motion: reduce` (DevTools → Rendering) disables fade-ups.
- View-source: correct `<title>`, `<meta description>`, OG tags.
