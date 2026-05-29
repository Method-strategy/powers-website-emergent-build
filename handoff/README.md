# POWERS Site — Headless Integration Handoff

**Version:** 0.4.0 (homepage + chrome + 5 expertise skeletons)
**Date:** 2026-05-29
**For:** Patrik (senior dev, headless integration)
**Target stack:** Faust.js + WP Engine

---

## What this is

A React 19 SPA prototype of the POWERS homepage and site shell. It establishes the **chrome, type/color system, component conventions, animation choreography, and section markup** for an eventual Faust.js / WP Engine deployment. The visual fidelity is 1:1 with stakeholder-approved HTML reference files; what you see in the browser is the locked design.

This handoff is **stack-agnostic on the data side**. Per Patrik's preference (#2b in the handoff brief), each component is documented with the *data shape* it expects rather than a prescribed WordPress schema. The CMS modelling is yours.

---

## Where to start

Read these in order:

1. **`ARCHITECTURE.md`** — file tree, routing, conventions. The "if you only read one file" doc.
2. **`DESIGN_SYSTEM.md`** — type/color tokens, naming patterns, layout primitives.
3. **`COMPONENT_INVENTORY.md`** — every component, what it does, props, data shape contract.
4. **`SECTION_CHOREOGRAPHY.md`** — animation specifics for Hero, Sections 3+4, video loop, subhead reveals. Read this before touching the animated sections.
5. **`ASSET_MANIFEST.md`** — fonts, video, images, where they live, swap instructions.
6. **`ROUTES_AND_REDIRECTS.md`** — what's wired, what legacy aliases exist.
7. **`KNOWN_TUNING_LEVERS.md`** — spots the briefs flagged as likely-to-need-tweaking-in-production.

Visual ground truth: see `screenshots/` for the canonical desktop captures of each section in its final state.

---

## Quick start (running locally)

```bash
cd /app/frontend
yarn install
yarn start   # http://localhost:3000
```

Backend exists (`/app/backend`, FastAPI + Mongo) but is currently unused by the frontend — all content is hardcoded in the React tree pending CMS wiring.

---

## State of the build

| Area | Status |
|---|---|
| Site chrome (header, footer, mega-menus, mobile drawer) | ✅ Complete |
| Homepage (Hero → S3 → S4 → How We Work → Metrics → Where We Work → Insights → CTA) | ✅ Complete, locked |
| Type & color system | ✅ Locked to spec |
| Expertise area pages (`/operational-discipline`, etc.) | 🟡 Hero-only skeletons, body content pending |
| Approach, Discovery, Industries, Careers, Insights, Contact, Leadership bios | 🟡 Legacy HTML wrapped in `LegacyPage.jsx` — native React conversion pending |
| Case studies | 🟡 1 of 67 built (`/case-studies/defense-aerospace-otd`) |
| Contact form backend | ⚪ UI only, no submission endpoint |
| Search modal | ⚪ Icon stub, no functionality |

---

## Conventions to preserve

- **No `<Link>` to legacy `.html` slugs** — always pipe through `toRoute()` from `/lib/routes.js`. The mapping handles both legacy aliases and current routes.
- **Sentence case for headings.** Not Title Case. (Locked, brand decision.)
- **Single gold accent (`#e89346`).** No second gold, no copper, no rust, no amber. The `C.copper`, `C.gold600`, etc. tokens are deprecated aliases left in for backwards compat; **do not introduce them in new code**.
- **Body text on light = `#4a5568`** (locked).
- **Max content width = 1280px** with 48px inner padding (= 1184px usable). Header aligns to the same width.
- **Scoped CSS via `<style>` blocks** in animation-heavy sections (`s3-*`, `s4-*` class prefixes). Don't lift these into global CSS — the scoping is intentional.
- **Animations replay on re-entry.** Section 3 and Section 4 reset and re-animate every time the viewport re-enters them. Hero loops perpetually from page load.
