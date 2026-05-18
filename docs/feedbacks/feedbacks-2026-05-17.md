# Feedbacks — 2026-05-17

Source: Dale Nacario (owner) review of `localhost:3000` build.
Scope: visual / UX revisions to the live portfolio (Hero, About, Skills, Nav).

---

## Feedback #1 — Merge Hero (landing) and About into a single landing section

**Current state**
- The landing route has two distinct stacked sections: `Hero` (`#hero`) and `About` (`#about`), each with its own rail label (`01 — Introduction`, `02 — About`) and its own grid.
- The portrait image lives only inside the About section.
- The Hero's "main section" (large serif name, italic tagline, CTA row, three-up meta strip) is what the owner likes — that pattern stays.

**Desired state**
- One combined "Landing" section that gives a first impression of Dale: portrait/image banner + a short narrative about himself + emphasis on **years of experience** (currently `3`).
- The big-type intro, CTA row, and meta strip (Based in / Status / Currently) remain as the section's anchor — this is the "main section of the landing page" the owner called out as great.
- The About section as a separate scroll stop is **removed** from the page composition; its essential content (portrait, longer bio, experience years, location, focus areas) is absorbed into the landing/hero.

**Implications**
- Nav must no longer list "About" as a top-level item (or "About" should map to the merged section, see Feedback #3 for active-state behavior).
- `src/config/content.ts` keeps both `hero` and `about` objects (data is fine to keep), but `src/app/page.tsx` no longer renders `<About />` as a sibling.
- The merged section should still feel calm/editorial — not a busy hero. Portrait sits beside the type block on `md+`, stacks above the type block on mobile.

---

## Feedback #2 — Color the technical skill icons (no more grayscale)

**Current state**
- `SkillIcon` renders all brand icons inside a `bg-surface` chip with **no `color` prop passed** to the Simple Icons component — they inherit `currentColor` and end up as flat black on the warm paper background.
- The Soft Skills column uses Lucide line icons; those can stay monochrome (they're abstract concepts, not brands).

**Desired state**
- Technical skill icons render in their **official brand colors** (e.g. React `#61DAFB`, TypeScript `#3178C6`, Laravel red, Python yellow/blue, etc.).
- The chip container stays — just the glyph inside gets color.
- Brand color is sourced from `@icons-pack/react-simple-icons` itself: each icon module exports a `defaultColor` constant (verified: `import { defaultColor } from "@icons-pack/react-simple-icons/icons/SiReact"` → `#61DAFB`). Preferred over a hand-maintained hex map.
- For the inline AWS SVG already in the file, the existing fallback `#FF9900` stays.
- Soft Skills (Lucide icons) stay monochrome `text-ink`.

**Accessibility**
- A few brand colors (e.g. JavaScript yellow `#F7DF1E`) are low-contrast on the warm-paper chip. Acceptable for **decorative** brand recognition because the skill **name** is always rendered as text next to the chip (per `color-not-only` rule).

---

## Feedback #3 — Animated active-section indicator in the navbar

**Current state**
- `Nav` already tracks the active section via `IntersectionObserver` and swaps the text color of the active item from `text-taupe` → `text-ink`.
- There is **no visual indicator** (no underline, no pill, no traveling marker) — only a color shift.

**Desired state** (per attached screenshot of the desktop navbar)
- The currently-visible section's nav item is visually highlighted (e.g. small filled pill, underline bar, or background plate behind the label).
- The highlight **animates between items** as the user scrolls — sliding/morphing from the previous item's bounds to the new item's bounds, not snapping.
- Behavior must work across all nav items: About, Skills, Experience, Projects, Achievements, Contact.
- Mobile sheet menu: simpler — active item gets a static highlight; no traveling animation needed inside the sheet.

**Constraints**
- Must respect `prefers-reduced-motion` — degrade to instant swap, no slide.
- Must not break keyboard focus rings or accessibility.
- Should feel calm/editorial (≈200–300 ms, easeOut) to match the rest of the site, not bouncy.

**Implementation hint (for the planner, not prescriptive)**
- Common pattern: measure each nav item's `offsetLeft`/`offsetWidth`, render a single absolutely-positioned `<motion.div>` underneath the items, and animate its `x` and `width` via Framer Motion (already a dependency per `PLAN.md`).
- Recompute on resize.

---

## Out of scope for this round

- Copy edits to the actual TODO bio strings in `content.ts` (owner will fill those in separately).
- Any changes to Experience / Projects / Achievements / Contact sections.
- Dark-mode variant.
