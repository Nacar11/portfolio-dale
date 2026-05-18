# Experience Section Revamp — Plan

## Problem

`src/components/sections/experience-timeline.tsx` currently renders the experience section in two disconnected blocks:

1. A first loop emits **all company headers** (company → role → date range → summary), one after another.
2. A second loop uses `flatMap` to collect **every project across every company** into one flat list under those headers.

The result is that projects appear as a single chronological-looking list detached from their parent company, instead of being grouped under it. Each project also shows its own `period` (e.g. `2025-11 → 2026-06`) in a left-rail column, which is not desired.

## Desired Outcome

The section reads, top to bottom, like a résumé block:

```
Cody Web Development              [company date range stays]
Software Engineer · 2024 — Present
[company summary]

    Adtokart
    [description, stack tags, highlights]

    Internal Project
    [description, stack tags, highlights]

    Yamaha JP Migration
    [description, stack tags, highlights]

Wonita International Inc
Software Engineer · 2023 — 2024
[company summary]

    E-commerce Mobile App
    [description, stack tags, highlights]
```

Rules:

- Companies are ordered present → past (already true in `content.experience`).
- Projects appear under their own company, ordered present → past (already true in the content data).
- **Per-project month/period strings are removed from the UI** (e.g. `2025-11 → 2026-06` no longer renders).
- The **company-level** date range (e.g. `2024 — Present`) is still shown.

## Scope

- Touches: `src/components/sections/experience-timeline.tsx` only.
- Does **not** touch the `content.ts` data shape. `project.period` is content data (a real fact about each project's timeframe), not dead code — keeping it in the type means re-enabling per-project dates later is a UI-only change, no data migration. We just stop rendering it.
- No copy changes. No new components. No design-token changes.

## Implementation

Rewrite the component body into a single nested map:

```tsx
export function ExperienceTimeline() {
  return (
    <Section id="experience" rail="04 — Experience">
      {content.experience.map((entry) => (
        <div key={entry.company} className="mb-14 last:mb-0">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {entry.company}
            </h2>
            <p className="mt-2 font-display text-lg italic text-taupe md:text-xl">
              {entry.role} · {formatPeriod(entry.start, entry.end)}
            </p>
            {entry.summary && (
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft md:text-base">
                {entry.summary}
              </p>
            )}
          </Reveal>

          <div className="mt-8 md:pl-6 md:border-l md:border-hairline">
            {entry.projects.map((project, idx) => (
              <Reveal
                key={`${entry.company}-${project.name}`}
                delay={idx * 0.04}
                className="border-t border-hairline py-6 first:border-t-0 first:pt-0"
              >
                <h3 className="font-display text-xl text-ink md:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-2 max-w-prose font-sans text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  {project.description}
                </p>

                {project.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5 font-sans text-[13px] text-ink-soft">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-taupe"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
```

Key changes from current file:

1. **Single nested map** replaces the two top-level loops and the `flatMap`.
2. **Project period removed**: the `<p className="font-mono text-xs text-taupe md:pt-1">{project.period}</p>` column is dropped, along with the `[140px_1fr]` grid that hosted it.
3. **Subtle group affordance**: project list gets a left-padded vertical hairline (`md:pl-6 md:border-l md:border-hairline`) so it reads as nested under its company on desktop. On mobile it just stacks (no left rail).
4. **Spacing**: `mb-14` between companies (more than the previous `mb-10`) so the visual grouping is clearer; first project loses its top divider via `first:border-t-0 first:pt-0`.
5. `formatPeriod` / `formatYear` helpers stay — still used for the company date range.
6. **Stagger now resets per company group.** Previously `idx` came from a single `flatMap`, so all projects shared one increasing stagger across companies (Wonita's project started at delay 0.12). After the rewrite, each company's projects stagger from delay 0 — matching the "per-group sequence" pattern in §7 `stagger-sequence`.
7. **Project `key`** uses `${entry.company}-${idx}` (not project name) — guarantees uniqueness even if two projects ever share a name.

## Known gaps NOT addressed in this change

These pre-exist in the data model but neither the current component nor this rewrite renders them. Calling them out so they can be picked up as separate work:

- `project.link` — Adtokart and Yamaha JP have real URLs that aren't surfaced anywhere.
- `project.image` — every project has a cover SVG path, also unused.
- `project.confidential` — the "Internal Project" entry is `confidential: true` but has no visible NDA badge, so it currently reads as just a project without a link rather than as intentionally redacted.

## UX rationale (UI/UX Pro Max checks)

- §6 `visual-hierarchy`: company headline (`text-3xl/4xl`, display font) vs project headline (`text-xl/2xl`) reinforces the parent-child relationship by size + weight, not color.
- §6 `whitespace-balance`: `mb-14` between companies + a clear left rail group projects intentionally; before, all projects bled into one list.
- §5 `mobile-first`: left-rail decoration is `md:`-gated, so on small screens the nesting is implied by indentation-free vertical rhythm, not by a thin border that adds noise.
- §7 `stagger-sequence`: `delay={idx * 0.04}` retained inside each company group (resets per company), so each company's projects reveal as their own staggered sequence.
- §1 `heading-hierarchy`: `h2` (company) → `h3` (project) order is preserved.

## Verification

- [ ] `npm run dev`, scroll to `#experience`, confirm:
  - Cody Web Development header → Adtokart → Internal Project → Yamaha JP Migration appear in that order, grouped under Cody.
  - Wonita International Inc header → E-commerce Mobile App appears after the Cody group.
  - No `2025-11 → 2026-06`-style strings appear anywhere in the section.
  - Company date range `2024 — Present` / `2023 — 2024` still renders.
- [ ] Resize to 375px viewport: no horizontal scroll, no left-rail line, content stacks cleanly.
- [ ] `npm run lint` (or whatever the repo uses) is clean.
- [ ] `npm run build` succeeds.

## Out of scope (not doing here)

- Removing `period` from `Content` type or from `content.ts` data.
- Adding per-project links/images (already optional in the type; not requested).
- Reordering or rewording project copy.
- Any change to other sections.
