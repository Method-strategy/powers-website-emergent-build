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

## Implemented (2026-02-27 — closing pass) — Font Stack + Five Disciplines Tab/Drawer
- **Font stack** updated to user spec:
  - **Sans**: Proxima Nova (Adobe Typekit, site-wide) → `'proxima-nova', 'Proxima Nova', ...`
  - **Serif**: Newsreader (Google Fonts) → `'Newsreader', 'Source Serif 4', 'Tiempos Headline', 'Domine', Georgia, ...`
  - **Mono**: JetBrains Mono (Google Fonts) → `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, ...`
  - Italics restored on serif accents. Newsreader's italics are drawn with restrained terminals so the rounded-tail tracking issues the user flagged on Fraunces / Playfair don't recur.
- **Five Disciplines rebuilt as tab-strip + drawer** (matches user's reference exactly):
  - Top row: 5 short equal-weight cards (~138px tall) inside a single copper hairline frame. Each shows only the discipline title + a `+` toggle.
  - Active card gets a cream-tinted background + copper outline; `+` rotates 45° to `×`.
  - Body text lives in a shared drawer panel directly below the row, in a 5-column grid that mirrors the row above. The body for the active card sits in its matching column — visually "drops down" out of the clicked card.
  - Radio behavior: opening one closes any other. Smooth max-height + opacity transitions.
  - Panel height measures the tallest body so no layout jump when switching tabs.

## Implemented (2026-02-27 — final pass for the day) — Roboto Serif + Numbering Removal
- **Serif typeface**: Playfair Display → **Roboto Serif** (Google Fonts). Used roman/upright throughout — every italic SERIF usage on the page was stripped. This kills the letter-tracking artifacts the user flagged on rounded italic terminals.
- **Conceptual fix — no more chapter numbers**: The page previously numbered each section `00 — / 01 — / 02 — … / 10 —` as a "chaptered article" device. That directly contradicted the homepage thesis "Stop Chasing Numbers." `ChapterMark` is now a no-op component (returns `null`); every `<ChapterMark n="…" />` call site stays intact but renders nothing.
- **Reading rail upgraded**: Replaced the Fraunces chapter-number badge with a GSAP pulse-flash on the newly-active dot when the reader crosses a section boundary (scale `2.4 → 1.4`, copper halo fading out, 0.9s `power3.out`). The 11 dots + scrubbing fill remain as the navigation/orientation device.
- Lint clean; verified with multi-section screenshot pass.

## Implemented (2026-02-27 — later still) — Serif Swap + Five Disciplines Rebuild
- **Serif typeface**: Replaced Fraunces with **Playfair Display** (Google Fonts). High-contrast Didone italic — classical, confident, forward-looking. Picked up automatically by all italic accents: hero "Numbers.", chapter marks (`00 —`, `01 —`, …), section headlines' gold italic, reading-rail chapter badge, and the "Start with the foundation" tag.
- **Five Disciplines (Section 01) rebuilt as accordion row**:
  - All five disciplines now equal weight — no keystone treatment, no scroll-locked GSAP stagger, no perimeter comet.
  - Single copper hairline frame around a 5-column row of white cards on the new `ice` blue background.
  - Each card has a copper `+` toggle that rotates 45° to `×` on open; clicking the card expands the body text via measured-height + opacity transitions. Radio behavior — opening one closes any other.
  - New copy: eyebrow "WHAT GETS BUILT IN", H2 "Five disciplines. One operation that doesn't break down." (italic gold), closing paragraph "Not five initiatives or five priorities…".
  - Removed PerimeterFrame, PlusJoiner, and the keystone state machine from this section. ExpertiseCard rewritten as a button with aria-expanded for a11y.
- All other V3 sections (Hero, Principle, Diagnostic Chain, Pressure-In/Out, How We Work, Metrics, Where We Work, Results, Insights, Closing CTA) untouched.

## Implemented (2026-02-27 — later) — Typography, Palette, & Pressure-In/Out Redesign
- **Typography**: Loaded Inter Tight (Google Fonts) for V3 only and applied via a `SANS` constant on the root V3 wrapper. Replaces the inherited Proxima Nova with a modern grotesque that feels forward-looking, geometric, and confident — pairs cleanly with Fraunces italic accents.
- **Expanded blue palette**: Added six new blue tokens (`midnight`, `dusk`, `cobalt`, `sapphire`, `mist`, `ice`) plus semantic `signalRed` and `signalGreen` for the pressure/outcome indicators. Section 04 now uses the dusk/navy900/ink stack as a chromatic depth layer with subtle cobalt + sapphire radial washes.
- **Section 04 (Pressure In / Performance Out) rebuilt to match user's reference**:
  - Full navy → ink gradient background (was white).
  - Header: copper chapter mark + gold eyebrow "WHEN EVERYTHING WORKS TOGETHER" + H2 with lowercase "in/out" + Fraunces italic "out." in brand gold.
  - Three columns: PRESSURES label + single red ▼ + cycling pressure label (cross-fade dissolve, GSAP) | gold-topped glass card with the thesis | OUTCOMES label + single green ▲ + cycling outcome label.
  - Pressures and outcomes cycle on independent intervals (2.7s / 3.1s) so they never tick together.
  - Bottom flow rail: gold hairline with a single dot that travels left → right continuously (5s loop, linear ease) — visualizes direction of value.
  - Honors `prefers-reduced-motion` (snaps to final state, no animation).
- All other V3 sections retained and continue to inherit the new Inter Tight family by default via the wrapper.

## Implemented (2026-02-27) — HomeV3 Editorial Iteration Promoted to `/`
- New editorial homepage at `/` (`/app/frontend/src/pages/HomeV3.jsx`) with Fraunces serif italic accents, chapter marks (`00 — / 01 — …`), asymmetric left-anchored layouts, radial-gradient hero, and GSAP-driven cinematic motion (ScrollTrigger lock-ins, continuous "engine" halo breathing, rotating force/result lists).
- 11-chapter editorial spine: 00 Hero → 01 Five Disciplines → 02 The Principle → 03 Diagnostic Chain → 04 Pressure In/Out → 05 How We Work → 06 Metrics → 07 Where We Work → 08 Proven Results → 09 Insights → 10 Closing CTA.
- Apple-level reading-progress rail: replaced the previous 2px right-edge bar with a vertically-centered chapter scrubber — 11 hairline copper tick dots connected by a hairline that scales as the reader passes each chapter, plus a Fraunces-italic chapter number badge that quietly fades in/out adjacent to the active dot. Hidden on mobile and `prefers-reduced-motion`.
- Old iterations preserved for stakeholder review: `/v1` (original Home), `/v2` (HomeV2 copy rewrite), `/v3` (alias of `/`).
- GSAP is now the standard for motion on this site (raw CSS keyframes deprecated for complex sequences). Easing favors `power3.out`, `back.out`, `sine.inOut`.

## Pending / Backlog
- P1: Build a native React `IndustriesServed` page (currently wraps the legacy HTML via `LegacyPage.jsx`). The V3 home's "Where We Work" CTA links here, so a native treatment matters once V3 is the live home.
- P1: Confirm final metric numbers with the CEO (98% / 5 WKS / 500+ / 30+ are placeholders).
- P1: Real Insights & Company News content (legacy site marks them as skeleton-only per CLAUDE.md page index).
- P1: Wire Contact form to a FastAPI endpoint (currently UI-only per user choice; revisit when client supplies submission target).
- P2: Real images for placeholders flagged in CLAUDE.md v0.1.15 (history Section 3, careers Section 2).
- P2: Search modal (icon is a placeholder per CLAUDE.md "Key Design Decisions").
- P2: Refresh the remaining 66 case studies from the master spreadsheet into the locked detail template (production data work, not a code change).
- P3: Retire `/v1` and `/v2` aliases once the V3 home is fully signed off.

## Pending / Backlog (legacy)
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
