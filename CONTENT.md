# CONTENT.md — Dale Nacario Portfolio

> Human-readable source-of-truth for everything that appears on the portfolio site. Edit this file first, then mirror changes into `src/config/content.ts`. Fields tagged `TODO:` need real values before launch — placeholders are fine for v1 build.
>
> **Companion docs:** [`PLAN.md`](./PLAN.md) — implementation plan, design system, asset inventory.

**Sections in this file:** Hero · About · Skills · Experience · Personal Projects · Achievements · Contact · SEO / Meta

---

## Hero

- **Name:** Dale Nacario
- **Role:** Software Engineer
- **Tagline:** TODO: one-line elevator pitch (e.g., "Building thoughtful web products with 3 years of full-stack experience.")
- **Location:** TODO: City, Country
- **Availability:** TODO: e.g., "Open to opportunities" / "Currently @ Cody Web Development"
- **CTAs:**
  - Primary: `Email me` → `mailto:TODO@example.com`
  - Secondary: `GitHub` → `https://github.com/TODO`
  - Optional: `Resume` → `/resume.pdf` (drop file into `public/` if used)

---

## About

- **Portrait:** `/owner.jpg` *(already in `public/owner.jpg`)*
- **Intro (1–2 sentences):** TODO: short hook — who you are and what you focus on.
- **Long bio (1 paragraph):** TODO: 3–5 sentences covering background, what you enjoy building, current focus, and one personal note.
- **Years of experience:** 3
- **Focus areas:** TODO: e.g., "Full-stack web", "Frontend systems", "API design"

---

## Skills

Two cards, modeled on the reference layout: **Technical Skills** and **Soft Skills**.
Each item has a `name` and an `icon` slug. For technical skills, `icon` is a [Simple Icons](https://simpleicons.org) slug (rendered via `@icons-pack/react-simple-icons` in full brand color). For soft skills, `icon` is a [lucide-react](https://lucide.dev) icon name.

> Add/remove items freely. Slug for a brand → look it up at https://simpleicons.org (e.g., React = `react`, Next.js = `nextdotjs`).

### ● Technical Skills

**Programming Languages / Frameworks**
- PHP → `php` (simple-icons)
- Laravel → `laravel`
- HTML5 → `html5`
- CSS3 → `css3`
- JavaScript → `javascript`
- TypeScript → `typescript`
- React → `react`
- Vue.js → `vuedotjs`
- React Native → `react` *(Simple Icons has no separate React Native mark; intentional reuse of the React atom — the label disambiguates)*
- Flutter → `flutter`
- Python → `python`
- Next.js → `nextdotjs` *(TODO: confirm)*

**Databases**
- MySQL → `mysql`
- PostgreSQL → `postgresql`
- MongoDB → `mongodb`
- Firebase → `firebase`

**DevOps, Servers & Infrastructure**
- Docker → `docker`
- Nginx → `nginx`
- Apache → `apache`
- AWS → `amazonaws`
- DigitalOcean → `digitalocean`
- Hostinger → `hostinger` *(TODO: confirm slug — may need fallback)*

**Tools & Development Environment**
- GitHub / Bitbucket → `github` *(or `bitbucket`)*
- Vite / Webpack → `vite` *(or `webpack`)*
- Linux Server Management → `linux`
- Jira / Shortcut → `jira` *(or `shortcut`)*
- REST APIs → *(no SI logo — use lucide `Network` or a custom mini-badge)*
- CI/CD → *(no SI logo — use lucide `Infinity`)*

### ● Soft Skills

**Essential interpersonal abilities**
- Problem Solving → `Lightbulb` (lucide)
- Teamwork → `Users` (lucide)
- Effective Communication → `MessageSquare` (lucide)
- Time Management → `Clock` (lucide)

> **TODO:** review the list above — add, remove, or reorder to match your actual proficiencies. Anything you've shipped to production belongs here; tools you've only dabbled with should not.

---

## Experience

### Cody Web Development — Software Engineer

- **Period:** TODO: `YYYY-MM` → `Present` (3 years total)
- **Summary:** TODO: 1–2 sentences on overall scope of work at Cody.

#### Projects at Cody (chronological)

> Add one block per project. Newest at the bottom or top — pick one ordering and stick with it.

**Project 1 — TODO: Project Name**
- Period: TODO: `YYYY-MM` → `YYYY-MM`
- Description: TODO: 1–2 sentences (what it does, who it's for, your role).
- Stack: TODO: e.g., Next.js, TypeScript, PostgreSQL, AWS
- Image: `/projects/cody/project-1/cover.svg` *(placeholder, swap with real screenshot)*
- Highlights:
  - TODO: outcome, metric, or notable contribution
  - TODO: outcome, metric, or notable contribution

**Project 2 — TODO: Project Name**
- Period: TODO
- Description: TODO
- Stack: TODO
- Image: `/projects/cody/project-2/cover.svg` *(placeholder)*
- Highlights:
  - TODO

**Project 3 — TODO: Project Name**
- Period: TODO
- Description: TODO
- Stack: TODO
- Image: `/projects/cody/project-3/cover.svg` *(placeholder)*
- Highlights:
  - TODO

> Add or remove project blocks above as needed. New project images go under `public/projects/cody/project-N/cover.{svg,png,jpg}`.

---

## Personal Projects

### MarketPlace
- **Slug:** `marketplace`
- **Tagline:** TODO: one-line description
- **Description:** TODO: 2–4 sentences — problem, approach, what you learned.
- **Stack:** TODO
- **Status:** TODO: `shipped` | `in-progress` | `archived`
- **Links:** TODO: e.g., `Live → https://...` / `Repo → https://github.com/...`
- **Image:** `/projects/marketplace/cover.svg` *(placeholder, swap with real screenshot)*

### Adam's Staycation (AS) *(formerly: Tambuli)*
- **Slug:** `adams-staycation`
- **Tagline:** TODO: one-line description (e.g., "Short-stay bookings & property management for small operators.")
- **Description:** TODO: 2–4 sentences — problem, approach, what you learned.
- **Stack:** TODO
- **Status:** TODO: `shipped` | `in-progress` | `archived`
- **Links:** TODO
- **Logo:** `/projects/adams-staycation/logo.svg` *(brand mark — dark teal #0D2B33 with terracotta #E07A5F "AS")*
- **Image:** `/projects/adams-staycation/cover.svg` *(placeholder cover incorporating the AS mark, swap with real screenshot)*

### Social
- **Slug:** `social`
- **Tagline:** TODO
- **Description:** TODO
- **Stack:** TODO
- **Status:** TODO
- **Links:** TODO
- **Image:** `/projects/social/cover.svg` *(placeholder, swap with real screenshot)*

---

## Achievements

> Certifications, hackathons, notable releases, talks, open-source contributions — anything worth highlighting.

- **TODO: Achievement title** — TODO: date (optional) — TODO: 1-line detail (optional)
- **TODO: Achievement title** — TODO: date — TODO: detail
- **TODO: Achievement title** — TODO: date — TODO: detail

---

## Contact

- **Email:** TODO: dale@example.com
- **Socials:**
  - GitHub: `https://github.com/TODO`
  - LinkedIn: `https://linkedin.com/in/TODO`
  - X / Twitter: `https://x.com/TODO` *(optional)*
  - Other: TODO *(optional — e.g., Read.cv, personal blog)*

---

## SEO / Meta

- **Site title:** Dale Nacario — Software Engineer
- **Site description:** TODO: 1-sentence meta description (≤ 155 chars).
- **OG image:** `public/og.png` (1200 × 630) — TODO: design or generate.
- **Canonical URL:** TODO: e.g., `https://dalenacario.com`

---

## Image Assets

Per-image paths are listed inline under each section (`Image:` / `Portrait:` / `Logo:` fields). The canonical inventory with status (real vs placeholder) lives in [`PLAN.md` → Image Assets](./PLAN.md#image-assets).

**Swap workflow:** when you have a real screenshot (PNG/JPG/WebP), drop it at the same path with the same filename **or** update the `Image:` field in the relevant section above to point to the new file. The placeholders are themed SVGs — vector, on-brand, lightweight — so it's fine to ship with them for v1.

---

## Editing workflow

1. Edit this file (`CONTENT.md`) — it's the source-of-truth.
2. Mirror the values into `src/config/content.ts` (typed, what the site reads).
3. Run `npm run dev` and verify the change.
4. Commit both files together so they stay in sync.

*(v2 may auto-generate `content.ts` from frontmatter — see [`PLAN.md` content-model note](./PLAN.md#content-model-typed-in-srcconfigcontentts).)*
