# Personal Projects Section Revamp — Plan

## Overview

Replace the placeholder content (`TODO: one-line description`, `TODO: 2–4 sentences`, `Stack: ["TODO"]`) for all three personal projects with researched, real content. Add a **GitHub repo affordance** per project — a "GitHub" button that opens a hover/click dropdown for projects with split repos (frontend + backend), or links directly when the project has only one repo. Add an **APK download** affordance for the Marketplace project (Flutter mobile app — no live site).

Files touched: `src/config/content.ts` (data), `docs/personal-details/content.md` (source-of-truth mirror), `src/components/sections/projects.tsx` (render), one new primitive `src/components/primitives/repo-menu.tsx`.

---

## Researched project context

Gathered from live sites + GitHub repo READMEs:

### Marketplace
- **What it is:** Flutter mobile app + Laravel headless API. End-to-end buyer/seller e-commerce: product browsing with categories, cart + checkout, PayMongo payments, Google sign-in, seller dashboard for listings, order history, favorites, dark mode.
- **Stack:** Flutter (Dart) · Laravel · MySQL · GetX (state) · PayMongo · Google Auth
- **Distribution:** No live web URL — it's a mobile app. The APK at `public/projects/marketplace/marketplace.apk` (55 MB) is the artifact.
- **Repos:** [frontend](https://github.com/Nacar11/marketplace_frontend) (Flutter) · [backend](https://github.com/Nacar11/marketplace_backend) (Laravel)
- **Status:** `shipped` (functional app, real APK)

### Social
- **What it is:** Nightlife-themed social media app. React + TypeScript + Vite + Tailwind + Flowbite frontend; Node + Express + MongoDB backend with GridFS image storage, bearer-token auth, paginated post feed, posts CRUD.
- **Stack:** React · TypeScript · Vite · Tailwind · Flowbite · Node.js · Express · MongoDB · GridFS
- **Live:** [https://social-frontend-swart.vercel.app/login](https://social-frontend-swart.vercel.app/login)
- **Repos:** [frontend](https://github.com/Nacar11/MERN-frontend) (the "MERN-frontend" naming reflects the stack) · [backend](https://github.com/Nacar11/MERN-Backend)
- **Status:** `shipped` (deployed on Vercel, accessible login)

### Adam's Staycation
- **What it is:** Next.js 14 marketing site for a luxury one-bedroom studio rental at Tambuli Seaside Living, Lapu-Lapu City, Cebu. Showcases amenities, photo gallery, host info; deep-links to Airbnb for the actual booking flow. Not a booking platform — a polished landing site for the property.
- **Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion
- **Live:** [https://adamstaycation.business/](https://adamstaycation.business/)
- **Repos:** [single repo](https://github.com/Nacar11/adamstaycation) (full-stack Next.js)
- **Status:** `shipped` (live on custom domain)

---

## Architecture decisions

### 1. Extend the `projects` data shape

Current shape (in `src/config/content.ts`):
```ts
projects: {
  slug, name, tagline, description, stack,
  status?, links?, image?, logo?
}[]
```

Add two optional fields:

```ts
repos?: {
  label?: string;   // "Frontend" | "Backend" | undefined (single-repo case)
  href: string;
}[];

links?: {
  label: string;
  href: string;
  download?: boolean;   // NEW — when true, renders <a download> for file downloads
}[];
```

**Why separate `repos` from `links`:** The `repos` array drives the GitHub menu's branching behavior (1 entry → direct link; 2+ entries → dropdown). Mixing them into `links` would force the component to parse label strings to know which are GitHub vs other — brittle. Clean separation, single responsibility per field.

**Why `download?: boolean` on link entries:** The Marketplace APK needs the HTML5 `download` attribute on its anchor so the browser triggers a save dialog rather than navigating. Encoding this in data (vs. sniffing `.apk` suffix in the component) is explicit and extensible to future downloads (PDFs, ZIPs).

### 2. New primitive: `RepoMenu`

Lives at `src/components/primitives/repo-menu.tsx`. Single component that handles both cases:

- **Single repo** (Adam's Staycation) — renders as a direct link styled like a regular link button (`GitHub →`).
- **Multiple repos** (Marketplace, Social) — renders as a button labeled `GitHub ▾` that opens a small dropdown with `Frontend` / `Backend` options on hover **and** click (touch devices have no hover).

**Implementation choice:** Use Radix UI primitive (`@radix-ui/react-popover` or `react-dropdown-menu`) if either is already a transitive dep via existing packages — otherwise a small handwritten popover with `useState` + focus management. **Decision deferred to Task 2** after checking the dependency tree; I'll prefer the handwritten path if no Radix primitive is already present, to keep bundle size flat.

**Hover + click + keyboard:** Opens on `pointerenter` (desktop hover), `click` (touch), and `Enter`/`Space` (keyboard). Closes on `pointerleave` after a short delay, `click outside`, or `Escape`. Trap focus inside while open for accessibility.

### 3. APK distribution caveat

The APK is **55 MB** committed in `public/`. Two concerns to flag, not blockers:

- **Git repo bloat** — committing a 55 MB binary inflates the repo. If the user plans to update this APK over time, consider hosting it via GitHub Releases (free, designed for binaries) and linking out, instead of bundling in `public/`. Adding to `.gitignore` and Git LFS are alternatives.
- **Hosting/CDN cost** — every visitor who clicks "Download" pulls 55 MB through Vercel's bandwidth. With the portfolio's expected traffic this is fine; flagging for awareness.

This plan **keeps** the APK in `public/` (user's stated choice). Just calling out the trade-off in case they want to reconsider before implementation.

---

## Dependency graph

```
Type changes (content.ts type definition)
    │
    ├── Data updates (content.ts data + content.md mirror)
    │
    └── Component changes
            │
            ├── RepoMenu primitive  (independent — testable standalone)
            │       │
            │       └── Projects component  (consumes RepoMenu + new fields)
```

Implementation order: types first, then split into two parallel-able paths (data updates and RepoMenu), then converge on the Projects component update.

---

## Task list

### Phase 1: Foundation

#### Task 1 — Extend `Content` type for `repos` and `download`

**Description:** Update the `Content.projects` type in `src/config/content.ts` to add the `repos?: { label?: string; href: string }[]` field and a `download?: boolean` field on link entries. No data changes yet.

**Acceptance criteria:**
- [ ] `Content.projects[number].repos` field added with the shape `{ label?: string; href: string }[]` (optional)
- [ ] `Content.projects[number].links[number].download` field added as `boolean` (optional)
- [ ] No existing data needs modification to satisfy the new types
- [ ] `npm run build` passes (TypeScript clean)

**Verification:**
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds

**Dependencies:** None.

**Files touched:**
- `src/config/content.ts` (type block only)

**Scope:** XS (1 file, type change).

---

#### Task 2 — Build `RepoMenu` primitive

**Description:** New component at `src/components/primitives/repo-menu.tsx`. Accepts a `repos: { label?: string; href: string }[]` prop. If `repos.length === 1`, renders a direct `<a>` to that repo styled as `GitHub →`. If `repos.length >= 2`, renders a button labeled `GitHub ▾` that opens a small popover on hover (desktop) or click (touch), listing each repo by label.

**Design notes:**
- Style matches existing link affordances (`font-sans text-xs text-ink hover:text-accent`) to keep visual consistency with the current `Projects` component link strip.
- Use a Github icon from `lucide-react` (already a dep) for visual cue.
- Popover positions below the button by default; flips above if near viewport bottom.
- All anchors get `target="_blank"` + `rel="noopener noreferrer"` and an `aria-label` like `"Visit frontend repo on GitHub (opens in new tab)"`.

**Acceptance criteria:**
- [ ] Component file exists at `src/components/primitives/repo-menu.tsx`
- [ ] Renders direct link when `repos.length === 1`
- [ ] Renders button + dropdown when `repos.length >= 2`
- [ ] Dropdown opens on hover (desktop) AND click (touch)
- [ ] Dropdown closes on click-outside, Escape, and `pointerleave` after a 150ms grace period (so the cursor can traverse from button → menu without auto-close)
- [ ] Keyboard accessible: Tab into button, Enter/Space opens, arrow keys navigate items, Escape closes
- [ ] All anchors have `target="_blank" rel="noopener noreferrer"` + descriptive `aria-label`
- [ ] No new package added unless explicitly justified

**Verification:**
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds
- [ ] Manual test in `npm run dev` on a temporary scratch page or after Task 6 wire-up:
  - Hover the button — dropdown appears
  - Click a dropdown item — opens repo in new tab
  - Tab into button + arrow keys — dropdown navigable
  - Resize to mobile (375px) + tap — dropdown opens on tap

**Dependencies:** Task 1 (type definition for what it consumes).

**Files touched:**
- `src/components/primitives/repo-menu.tsx` (new)

**Scope:** S (1 new file, no other touches; component logic is the bulk).

---

### Checkpoint: Foundation
- [ ] Types extended cleanly
- [ ] `RepoMenu` builds and renders both modes when invoked manually
- [ ] `npm run build` passes

---

### Phase 2: Data + wire-up (vertical slices per project)

#### Task 3 — Marketplace: real content + APK download + dual-repo menu

**Description:** Replace the Marketplace placeholder in `src/config/content.ts` with researched content (tagline, description, stack, status: `shipped`), add the APK link as a download, and add the two GitHub repos.

**Concrete data:**
```ts
{
  slug: "marketplace",
  name: "MarketPlace",
  tagline: "Buyer/seller e-commerce mobile app with built-in payments.",
  description:
    "Flutter mobile app backed by a Laravel API — buyers browse categorized listings, manage a cart, and pay via PayMongo; sellers post inventory and track orders. Authenticated with Google sign-in.",
  stack: ["Flutter", "Dart", "Laravel", "MySQL", "GetX", "PayMongo"],
  status: "shipped",
  image: "/projects/marketplace/cover.svg",
  links: [
    {
      label: "Download APK",
      href: "/projects/marketplace/marketplace.apk",
      download: true,
    },
  ],
  repos: [
    { label: "Frontend", href: "https://github.com/Nacar11/marketplace_frontend" },
    { label: "Backend",  href: "https://github.com/Nacar11/marketplace_backend"  },
  ],
}
```

**Acceptance criteria:**
- [ ] All TODO placeholders for Marketplace removed
- [ ] Description references the real product (e-commerce, Flutter + Laravel, PayMongo)
- [ ] Stack tags are real and accurate
- [ ] Download link present with `download: true`
- [ ] Both GitHub repos present with correct labels

**Verification:**
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds
- [ ] After Task 6, `npm run dev`: Marketplace card shows "Download APK" link, "GitHub ▾" button with dropdown listing Frontend + Backend

**Dependencies:** Task 1.

**Files touched:**
- `src/config/content.ts` (Marketplace data block)

**Scope:** XS.

---

#### Task 4 — Social: real content + live link + dual-repo menu

**Description:** Replace the Social placeholder. Live site + both repos.

**Concrete data:**
```ts
{
  slug: "social",
  name: "Social",
  tagline: "Nightlife-themed social feed with image posts.",
  description:
    "React + TypeScript frontend on Vite, Node + Express backend with MongoDB and GridFS for image storage. Users sign up, post images with captions, and scroll a paginated feed.",
  stack: ["React", "TypeScript", "Vite", "Tailwind", "Node.js", "Express", "MongoDB"],
  status: "shipped",
  image: "/projects/social/cover.svg",
  links: [
    { label: "Live site", href: "https://social-frontend-swart.vercel.app/login" },
  ],
  repos: [
    { label: "Frontend", href: "https://github.com/Nacar11/MERN-frontend" },
    { label: "Backend",  href: "https://github.com/Nacar11/MERN-Backend"  },
  ],
}
```

**Acceptance criteria:** parallel to Task 3.

**Verification:** parallel to Task 3, with "Social card shows Live site link + GitHub dropdown".

**Dependencies:** Task 1.

**Files touched:** `src/config/content.ts` (Social data block).

**Scope:** XS.

---

#### Task 5 — Adam's Staycation: real content + live link + single-repo direct link

**Description:** Replace the Adam's Staycation placeholder.

**Concrete data:**
```ts
{
  slug: "adams-staycation",
  name: "Adam's Staycation",
  tagline: "Marketing site for a Cebu seaside studio rental.",
  description:
    "Next.js 14 + TypeScript landing site for a one-bedroom studio at Tambuli Seaside Living, Lapu-Lapu City. Showcases amenities, gallery, and host details, then deep-links to Airbnb for the booking flow.",
  stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  status: "shipped",
  image: "/projects/adams-staycation/cover.svg",
  logo: "/projects/adams-staycation/logo.svg",
  links: [
    { label: "Live site", href: "https://adamstaycation.business/" },
  ],
  repos: [
    { href: "https://github.com/Nacar11/adamstaycation" },
  ],
}
```

**Acceptance criteria:** parallel to Tasks 3 and 4, plus:
- [ ] `repos` has exactly one entry → renders as direct link, not dropdown

**Verification:** card shows "GitHub →" as a direct link (not dropdown).

**Dependencies:** Task 1.

**Files touched:** `src/config/content.ts` (Adam's Staycation data block).

**Scope:** XS.

---

#### Task 6 — Wire `RepoMenu` + download links into `Projects` component

**Description:** Update `src/components/sections/projects.tsx` to:
1. Render `<RepoMenu repos={project.repos} />` when `project.repos?.length` is set.
2. Pass `download` from link entries through to the rendered `<a>` (`<a download={link.download ? "" : undefined}>...`).
3. Keep the existing links strip (`Live site`, `Download APK`, etc.) and append the RepoMenu after it (or before — design call: I recommend after, so external destinations come first, repo access second).

**Acceptance criteria:**
- [ ] `RepoMenu` imported and rendered conditionally on `project.repos`
- [ ] Download attribute applied to `<a>` when `link.download === true`
- [ ] Visual order in the card footer: links strip → RepoMenu
- [ ] Existing card layout/spacing preserved (no visual regression to projects without `repos`)
- [ ] No emoji icons; lucide GitHub icon used in RepoMenu

**Verification:**
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds
- [ ] `npm run dev` visual check on all three cards:
  - **Marketplace** — `Download APK` (triggers save dialog) + GitHub dropdown with Frontend/Backend
  - **Social** — `Live site` (opens new tab) + GitHub dropdown with Frontend/Backend
  - **Adam's Staycation** — `Live site` (opens new tab) + direct `GitHub →` link

**Dependencies:** Tasks 1, 2, 3, 4, 5.

**Files touched:**
- `src/components/sections/projects.tsx`

**Scope:** S.

---

### Checkpoint: Core Features
- [ ] All three project cards render with real content
- [ ] Download APK works (file saves to disk)
- [ ] GitHub dropdown works on Marketplace + Social (hover + click + keyboard)
- [ ] Direct GitHub link works on Adam's Staycation
- [ ] Mobile (375px) tap-to-open dropdown works
- [ ] Existing site layout unchanged outside the Projects section

---

### Phase 3: Mirror + verify

#### Task 7 — Mirror updates into `docs/personal-details/content.md`

**Description:** Update the "Personal Projects" section of `docs/personal-details/content.md` to mirror the new data. This file is the human-readable source-of-truth per the project convention.

**Acceptance criteria:**
- [ ] All three personal project entries in `content.md` reflect the same tagline, description, stack, status, links, and repos as `content.ts`
- [ ] Repo URLs listed clearly per project
- [ ] APK link path noted under Marketplace
- [ ] No remaining TODO placeholders in the personal projects section

**Verification:**
- [ ] Visual inspection of the diff against the data in `content.ts` — fields match

**Dependencies:** Tasks 3, 4, 5.

**Files touched:**
- `docs/personal-details/content.md`

**Scope:** XS.

---

#### Task 8 — Final verification

**Description:** End-to-end verification of the revamped section.

**Acceptance criteria:**
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds
- [ ] `npm run dev` — visual smoke test:
  - All three cards render with real content (no `TODO:` strings visible)
  - Each card's CTAs work as described (download, live, GitHub direct, GitHub dropdown)
  - Mobile 375px width: cards stack vertically; dropdown opens on tap
  - Reduced-motion (`prefers-reduced-motion: reduce`): no janky animations on dropdown
  - No console errors / 404s

**Verification:** above acceptance criteria == verification.

**Dependencies:** Tasks 1–7.

**Files touched:** None (verification only).

**Scope:** XS.

---

### Checkpoint: Complete
- [ ] All acceptance criteria met
- [ ] Ready for user review in browser

---

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Dropdown UX feels janky on touch (hover-then-click confusion) | Medium | Use established pattern: hover *or* click both open; click outside or Escape closes. Test on mobile in Task 2 verification. |
| GitHub icon import bloats bundle | Low | `lucide-react` is already a dep and tree-shakes. Single icon import is negligible. |
| 55 MB APK in `public/` slows Vercel builds and bloats git history | Medium | Flagged in "APK distribution caveat" above. Not changing in this plan, but recommend the user consider GitHub Releases for future updates. |
| Existing `image?:` placeholders still show generic SVG covers | Low | Out of scope here — covers stay as-is. Future task can swap to real screenshots. |
| `RepoMenu` accessibility regression (focus trap, keyboard nav) | High | Task 2 acceptance criteria require keyboard nav + Escape + focus management. Verify in manual check before Task 6. |

---

## Open questions for user

These are decisions I made defaults for in the plan — flag any you want to change before implementation starts:

1. **Order of CTAs in each card footer** — I have `Live/Download` first, `GitHub` second. Reasonable inverse: GitHub first (developers-first audience). My take: Live/Download first because the live site is what most viewers actually want to see; engineering peers know to look for code regardless. **Stick with Live/Download first?**

2. **GitHub button copy** — I have `GitHub ▾` for the dropdown and `GitHub →` for the single-repo direct link. Alternatives: `Code ▾`, `Repos ▾`, or splitting `Frontend repo` / `Backend repo` as flat links instead of a dropdown. **Stick with `GitHub` + dropdown for multi-repo?**

3. **Dropdown item labels** — I have `Frontend` / `Backend`. Alternative: `Mobile app` / `API server` for Marketplace specifically (more product-language) or `Client` / `Server`. **`Frontend` / `Backend` works?**

4. **APK distribution** — Keep in `public/` (current plan) or migrate to GitHub Releases? Affects whether Task 3 uses `/projects/marketplace/marketplace.apk` or an external URL. Not blocking — easy to change later.

5. **`MERN-frontend` repo naming** — The repo is literally named `MERN-frontend` on GitHub. This shows nowhere in the rendered UI (only the label `Frontend` shows), so it's invisible to portfolio viewers. **No action needed unless you want to rename the repo.**

---

## Out of scope (NOT doing here)

- Replacing the abstract cover SVGs (`/projects/<slug>/cover.svg`) with real screenshots — separate change.
- Changing the card layout, grid columns, or visual design of the Projects section.
- Adding any new project entries beyond the three already defined.
- Touching any other section (Experience, Skills, etc.).
- Adding Git LFS or moving the APK to GitHub Releases (recommended but separate decision).
- Adding a "Featured" or "Pinned" highlight treatment for `shipped` projects.

---

## Files index

| File | Touch | Reason |
|---|---|---|
| `src/config/content.ts` | Modify | Tasks 1, 3, 4, 5 — type + 3 data blocks |
| `src/components/primitives/repo-menu.tsx` | Create | Task 2 — new primitive |
| `src/components/sections/projects.tsx` | Modify | Task 6 — wire new primitive + download attr |
| `docs/personal-details/content.md` | Modify | Task 7 — mirror data |

Net: 3 files modified, 1 file created.
