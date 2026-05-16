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

- [ ] **Task 2 — Design tokens, fonts, global styles**
  - Wire **Fraunces** (display) + **Inter** (body/UI) via `next/font/google` in `layout.tsx`, expose as CSS vars (`--font-display`, `--font-sans`).
  - Define CSS vars in `globals.css` per the Design System table: `--paper`, `--ink`, `--ink-soft`, `--taupe`, `--hairline`, `--surface`, `--accent`, `--accent-ink`.
  - Set `<html lang="en">` (light-only v1, no `class="dark"`); page bg `--paper`, text `--ink`.
  - Configure Tailwind v4 `@theme` block mapping vars → utilities (`bg-paper`, `text-ink`, `text-taupe`, `border-hairline`, `text-accent`, `font-display`, `font-sans`).
  - Base utilities: smooth-scroll, focus-visible ring in `--accent`, selection color `--accent` on `--paper`, fluid display sizing helpers.
  - **Acceptance:** Page renders warm-paper background, Fraunces visible in hero, Inter in body, terracotta accent visible via `text-accent`, no FOUT, contrast `--ink` on `--paper` ≥ 13:1.
  - **Files:** `src/app/layout.tsx`, `src/app/globals.css`, `src/config/site.ts`, `src/config/theme.ts`.
  - **Size:** S

- [ ] **Task 3 — Author `CONTENT.md` and typed `content.ts`**
  - `CONTENT.md` is already drafted with known info + `TODO:` placeholders (see [CONTENT.md](./CONTENT.md)).
  - Create `src/config/content.ts` exporting `content: Content` mirroring it.
  - **Acceptance:** `import { content } from '@/config/content'` typechecks.
  - **Files:** `CONTENT.md` (exists), `src/config/content.ts`.
  - **Size:** S

### Checkpoint A — Foundation
- [ ] `npm run dev` works, theme renders, content imports type-safe.
- [ ] Dale reviews `CONTENT.md` and fills in `TODO:` placeholders (or signs off on placeholders for v1 build).

### Phase 2: Layout shell + Hero

- [ ] **Task 4 — Add shadcn primitives**
  - `npx shadcn@latest add button card badge separator navigation-menu sheet tooltip`
  - **Files:** `src/components/ui/*`.
  - **Size:** XS

- [ ] **Task 5 — `Section` + `Reveal` primitives**
  - `Section` enforces max-width (`max-w-5xl`), vertical padding, `id=` anchor.
  - `Reveal` wraps children in Framer Motion fade-up on scroll-into-view; respects `prefers-reduced-motion`.
  - **Files:** `src/components/primitives/section.tsx`, `src/components/primitives/reveal.tsx`.
  - **Size:** S

- [ ] **Task 6 — Top nav + mobile sheet + footer**
  - Sticky nav: name/initials left, anchor links right; mobile uses `Sheet` drawer.
  - Smooth-scroll on anchor click; active-section highlight via IntersectionObserver.
  - Footer: copyright, socials, "built with Next.js + Tailwind".
  - **Acceptance:** Keyboard tab traversal works; nav highlights current section; mobile drawer opens/closes.
  - **Files:** `src/components/layout/nav.tsx`, `src/components/layout/footer.tsx`, `src/app/layout.tsx`.
  - **Size:** M

- [ ] **Task 7 — Hero section**
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

- [ ] **Task 8 — About section** — two-column on desktop: left = `/owner.jpg` portrait (rendered via `next/image`, ~280–360px wide, 1px `--hairline` border, 8px radius, no shadow); right = Fraunces intro, Inter long bio, Inter meta row (location, years, focus). On mobile: portrait stacks above text, max ~220px wide.
  - **Acceptance:** Portrait loads with `priority={false}`, explicit width/height (no CLS); contrast on text meets AA; layout reads cleanly at 375px.
  - **Files:** `src/components/sections/about.tsx`. **Size:** S

- [ ] **Task 9 — Skills section** — two cards side-by-side on desktop (stacks on mobile), modeled on the reference: **Technical Skills** card and **Soft Skills** card. Both have a small bullet dot + uppercase category label header, then sub-grouped lists (`Languages & Frameworks`, `Databases`, `DevOps`, `Tools` / `Essential interpersonal abilities`) separated by 1px `--hairline` rules. Each item is a row: 28px circular `--surface` (white) pill with 1px `--hairline` border containing the brand logo (via `@icons-pack/react-simple-icons`, default 14–16px), then Inter 14px name in `--ink`. Hover: row gets `--surface` background, no other change. Soft-skill icons come from `lucide-react` (Lightbulb, Users, MessageSquare, Clock) in `--ink` stroke. Brand colors are official Simple-Icons colors — preserved inside the white pill so they don't disrupt warm-paper rhythm.
  - Install: `npm i @icons-pack/react-simple-icons`.
  - Build a small `<SkillIcon>` primitive that takes `{ icon, iconSource }` and renders the right component, with the pill wrapper.
  - **Acceptance:** All skills from `content.skills` render with correct brand logos and colors; rows are keyboard-focusable when wrapped in links; grid is 2-col mobile-friendly (items wrap inside each card at narrow widths); only icons actually used are bundled (tree-shaking verified in build output).
  - **Files:** `src/components/sections/skills.tsx`, `src/components/primitives/skill-icon.tsx`. **Size:** M
  - **Override path:** to switch to monochrome ink rendering globally, set a CSS class on the section that applies `filter: grayscale(1) brightness(0)` to icons — one-line change, no content edits.

- [ ] **Task 10 — Experience timeline (Cody)** — editorial two-column layout: left column is a fixed-width mono date range (`120px`, `ui-monospace`, taupe); right column is the entry (Fraunces project name, Inter description, stack badges). Each row separated by 1px `--hairline` top border. Header above the list shows "Cody Web Development · Software Engineer · 2023 — Present" with the period subline in italic taupe Fraunces. Mobile collapses date above content.
  - **Acceptance:** All Cody projects from `content.experience[0].projects` render in chronological order; reads cleanly on mobile (375px); no card shadows.
  - **Files:** `src/components/sections/experience-timeline.tsx`. **Size:** M

- [ ] **Task 11 — Personal projects** — grid of 3 cards (**MarketPlace**, **Adam's Staycation**, **Social**) on `--surface` (white) with 1px `--hairline` border, 12px radius, no shadow. Each card: cover image at top (16:10 ratio, served from `/projects/<slug>/cover.svg`), then Fraunces name (with optional inline `logo.svg` badge for Adam's Staycation), Inter tagline, Inter description, stack badges (Inter 11px, `--hairline` border), status pill, optional links (`--accent` underline on hover). Hover: border darkens to `--ink`; no lift.
  - **Acceptance:** Cards keyboard-focusable with visible `--accent` focus ring; external links `rel="noreferrer noopener"`; grid is 1-col mobile, 3-col desktop; covers load via `next/image` with explicit dimensions (no CLS); SVG covers render crisply at any size.
  - **Files:** `src/components/sections/projects.tsx`. **Size:** S

- [ ] **Task 12 — Achievements** — clean list/grid (title, optional date, detail). Compact, no decoration overload.
  - **Files:** `src/components/sections/achievements.tsx`. **Size:** XS

- [ ] **Task 13 — Contact section** — email as primary CTA (mailto), socials as icon row (lucide). Optional copy-to-clipboard on email.
  - **Files:** `src/components/sections/contact.tsx`. **Size:** S

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
