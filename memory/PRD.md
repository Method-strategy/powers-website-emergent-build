# POWERS Website Evolution — React SPA Port

## Original Problem Statement
Refactor the existing locked HTML/CSS/JS marketing site (`powers-website-evolution.zip`) into a full React Single Page Application with **strict 1:1 lossless visual translation** from the approved, locked HTML. CLAUDE.md is the design source of truth.

## Tech Stack
- **Frontend:** React 19 + react-router-dom v7 (CRA + craco), Tailwind/shadcn available but unused (lossless port preserves original CSS), Adobe Fonts Typekit `dhv8kja` (Proxima Nova)
- **Backend:** FastAPI default template (untouched per user choice — static marketing site, no API needs)
- **Storage:** None (static site)
- **Assets:** `/app/frontend/public/uploads/` (logos, headshots, placeholders, PDFs)

## Architecture

### Lossless Port Strategy
1. **Shared chrome** (Header + Footer): Single canonical React port of `site-nav.jsx` → `/app/frontend/src/components/SiteHeader.jsx` + `SiteFooter.jsx`. Uses `react-router-dom` `<Link>` via a centralized `HTML_TO_ROUTE` map in `/app/frontend/src/lib/routes.js`.
2. **Static content pages** (everything except homepage): Auto-generated React modules that wrap a `<LegacyPage />` component (`/app/frontend/src/components/LegacyPage.jsx`). LegacyPage renders the legacy page's `<style>` block + body content via `dangerouslySetInnerHTML`, plus re-executes any inline plain-JS scripts (used by the case-studies filter grid).
3. **Homepage** (`/`): Inline babel JSX from `index.html` ported as-is into `/app/frontend/src/pages/Home.jsx` with React imports + `export default App`. Retains its custom video-overlay Header/Hero/Footer per CLAUDE.md Hero Spec (this is the intentional exception to the shared chrome rule).
4. **Link routing**: A `useLegacyLinkIntercept` hook in `Layout` traps clicks on `<a href="*.html">` inside the `dangerouslySetInnerHTML` content and routes them via `navigate()`.

### Routes (clean slugs, per CLAUDE.md Faust target)
- `/` Home
- `/approach`, `/discovery-process`, `/industries-served`
- `/case-studies` library
- `/case-studies/defense-aerospace-otd` locked detail
- `/operational-readiness`, `/frontline-leadership`, `/equipment-reliability`, `/supply-chain`
- `/history`, `/leadership`, `/company-news`, `/careers`, `/insights`, `/contact`
- `/leadership/{randall-powers, sean-hart, saul-bautista, ken-wiesinger, justin-pethick, kevin-sabany}`

### Converter Scripts
- `/app/scripts/convert_legacy_pages.py` — extracts `<style>`, body HTML, plain `<script>` blocks per page; repaths `uploads/` → `/uploads/`; emits 21 React modules.
- `/app/scripts/convert_homepage.py` — extracts the homepage's babel JSX block and wraps as a standalone React module.

Run anytime the source HTML is updated:
```bash
python3 /app/scripts/convert_legacy_pages.py
python3 /app/scripts/convert_homepage.py
```

## Implemented (2026-02-12)
- Foundation: routing, Layout/HomeLayout, SiteHeader + SiteFooter (canonical port of `site-nav.jsx`), legacy link intercept, scroll-to-top on nav.
- 21 lossless legacy page modules + 1 homepage module + 1 404 page.
- All static images and PDFs migrated to `/app/frontend/public/uploads/`.
- LegacyPage component executes inline legacy `<script>` blocks via useRef-guarded injection that survives React.StrictMode and resets on real SPA remount.
- Converter wraps inline JS in an IIFE and auto-hoists top-level function declarations to `window` so injected `onclick="..."` handlers still resolve.
- Shared `useLegacyLinkIntercept` + `useScrollToTopOnNav` hooks in `/app/frontend/src/lib/navHooks.js`.
- Netlify SPA fallback (`public/_redirects` + `netlify.toml`) so direct hits to `/approach` etc don't 404.

## Implemented (2026-02-13) — Case Study Architecture (Single Source of Truth)
- `/app/frontend/src/data/caseStudies.js` — canonical dataset for all 68 case studies. Schema mirrors WPGraphQL + ACF response shape per CLAUDE.md "LOCKED v0.2.1" field map (industry / headlineResult / subtitle / summary / serviceLines / statTiles / situation / diagnosis / powersActions / fullResult / num / date / internalRoute / externalUrl). Defense & Aerospace (#54) has full detail; other 67 have card-level fields.
- New parametric React components in `/app/frontend/src/components/caseStudy/`:
  - `CaseStudyHero.jsx` — dense screen hero (eyebrow, sentence-case H1, descriptor, results-at-a-glance with Tabler icon stat tiles, Executive Brief sidebar, disciplines line, Download PDF button)
  - `CaseStudyBody.jsx` — screen body (Situation, Diagnosis 6-item grid, What POWERS Did, Full Result 6-stat grid) + CTA
  - `CaseStudyPrintDoc.jsx` — 2-page print PDF (parametric masthead, hero, results, situation, continuation, diagnosis, powers, full result, footer with phone/address/page-indicator)
  - `CaseStudyCard.jsx` — library card; internal routes use React Router `<Link>`, external use `<a target="_blank">`
  - `caseStudyStyles.js` + `caseStudiesLibraryStyles.js` — extracted legacy CSS preserved verbatim
- Library page (`/app/frontend/src/pages/CaseStudies.jsx`) rewritten as proper React with hooks (debounced search, filter state, sort, active-filter pills). No more inline-script + dangerouslySetInnerHTML.
- Detail page (`/app/frontend/src/pages/CaseStudyDefenseAerospaceOTD.jsx`) is now a thin shell that loads the data and composes the three parametric components.
- Verified end-to-end: changing one value in `caseStudies.js` propagates to library card, detail hero, and print PDF simultaneously.

## Testing
- iteration_3 (case-study refactor): 100% pass, 0 issues, 0 console errors. Single-source-of-truth architecture validated by the testing agent reading the data file + components and confirming no parallel hardcoded copies anywhere.
- iteration_2 (link routing + StrictMode fix): 100% pass.
- iteration_1 (initial foundation): 96% pass, 1 medium bug fixed in iteration_2.

## Production Migration Path
The case-study system is built to migrate cleanly to Faust.js + WP Engine + WPGraphQL + ACF. Steps when ready:
1. Author each case study as a `case_study` custom post type in WordPress with the ACF field group matching the schema in `caseStudies.js`.
2. Replace `/app/frontend/src/data/caseStudies.js` with a WPGraphQL query returning the same JSON shape (the helper `getCaseStudy(slug)` becomes a `useQuery` call).
3. No component edits required — `CaseStudyHero`, `CaseStudyBody`, `CaseStudyPrintDoc`, `CaseStudyCard` read from the same data object regardless of source.

## Pending / Backlog
- P1: Real Insights & Company News content (legacy site marks them as skeleton-only per CLAUDE.md page index).
- P1: Wire Contact form to a FastAPI endpoint (currently UI-only per user choice; revisit when client supplies submission target).
- P2: Real images for placeholders flagged in CLAUDE.md v0.1.15 (history Section 3, careers Section 2).
- P2: Search modal (icon is a placeholder per CLAUDE.md "Key Design Decisions").
- P2: Refresh the remaining 66 case studies from the master spreadsheet into the locked detail template (production data work, not a code change).

## Files of Reference
- `/app/frontend/src/App.js` — route map
- `/app/frontend/src/components/{Layout,HomeLayout,SiteHeader,SiteFooter,LegacyPage}.jsx`
- `/app/frontend/src/lib/routes.js` — `HTML_TO_ROUTE` link map
- `/app/frontend/src/pages/*.jsx` — generated page modules
- `/app/scripts/convert_legacy_pages.py`, `/app/scripts/convert_homepage.py`
- `/tmp/powers-website/powers-website-evolution/CLAUDE.md` — design source of truth

## Test Credentials
None — site is fully public, no auth.
