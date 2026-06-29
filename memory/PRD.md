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

## Implemented (2026-02-27 — polish pass) — White Backgrounds, Eyebrow Unification, H2 Anchoring, Faster Pressure/Outcome
- **More white background**: Five Disciplines (was `C.ice`), How We Work (was `S.bgPaper`) now both sit on pure white. The dark sections (Hero, Principle, Pressure In/Out, Metrics, Footer CTA) are kept dark as editorial moments — high contrast against the white sections gives the page a clear rhythm.
- **Eyebrow continuity**: Single canonical `<Eyebrow>` component used by every section. JetBrains Mono, 11.5px, weight 500, 0.24em tracking, uppercase, copper on light / gold on dark. Removed two inline eyebrow blocks that were drifting from the spec (Section 01 + Section 04).
- **H2 anchored**: Sections 01 (Disciplines) and 04 (Pressure In/Out) now use `S.h2Size / S.h2Weight / S.h2LH / S.h2Tracking` like everywhere else — no more outlier tighter line-height / tracking that made those H2s read visually heavier.
- **Pressure / Outcome motion** rebuilt to match user's "other build":
  - Cycle interval down from 2700–3100ms to **1700ms / 1900ms** (much faster).
  - Pressures exit **right** (toward the engine card) and the next pressure enters from the **left** — reads as "absorbed by the engine."
  - Outcomes exit **right** (away from the engine) and the next outcome enters from the **left** (out of the engine) — reads as "emitted by the engine."
  - Both sides now contribute to a unified left → right value-flow across the whole diagram.
  - Bottom gold rail dot sped up to **4s** loop to match the new label cadence.

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

## Implemented (2026-05-28)
- Subhead capitalization sweep on `HomeV3.jsx`: 6 headlines converted from Title Case → Sentence case to align with 2026 editorial trend (Apple/Stripe/Linear standard): "We work where value gets won or lost.", "Wherever the work is physical, repeatable, and measured.", "The work, on the floor.", "The thinking behind the work.", "Stop chasing numbers. / Start building the foundation."
- Row 2 subhead ("We don't work on the numbers. / We work where the numbers come from."): switched `textWrap: 'balance'` → `'pretty'` to eliminate awkward break point produced by the balance algorithm. Now wraps cleanly at "the numbers / come from."


- Subhead staggered fade-in: added page-wide `useSubheadReveal` hook + `data-subhead-reveal` attribute on 5 subhead h2s. Each h2 fades up (opacity + 14px translateY, 0.85s cubic-bezier) as it enters the viewport at 25% threshold; the inline italic accent `<span>` then fades in 280ms later, producing the "statement → accent" editorial beat. Honors `prefers-reduced-motion`.
- "How We Work" row hero swapped from static image to autoplay/muted/loop background video (`powers-banner-2026-v2.webm` + `.mp4` H.264 fallback). 16.5s loop at 1080×1350 cropped to fill via `objectFit: cover`. Poster placeholder retained for fast first paint. Honors `playsInline` for iOS Safari. Original 14MB MP4 (MOOV at end, no faststart) re-encoded to ~8MB H.264 + ~6.8MB VP9 with `+faststart` for progressive playback.
- Hero lede pivot updated: "We build what produces them." → "We build the foundation." (line 1455 in `HomeV3.jsx`). Doc comment at line 1103 updated to match.
- Expertise Areas rename + restructure: 4 menu items → 5. Renamed to: Operational Discipline / Frontline Leadership / Equipment Reliability / Workforce Capability / Daily Accountability. Created `OperationalDiscipline.jsx`, `WorkforceCapability.jsx`, `DailyAccountability.jsx` (skeleton pages mirroring existing template). Deleted `OperationalReadiness.jsx` and `SupplyChain.jsx`. Updated routes (`/operational-discipline`, `/workforce-capability`, `/daily-accountability`) and added legacy slug aliases in `lib/routes.js` so old `operational-readiness.html` / `supply-chain.html` references still resolve. Renamed shorter page titles on `FrontlineLeadership.jsx` and `EquipmentReliability.jsx`. Updated all 4 menu definitions in HomeV3.jsx (mega menu × 2, mobile drawer × 2) and `SiteHeader.jsx`.
- Five Disciplines section redesigned: tab-strip + drawer replaced with an editorial 5-row stack at `/`. Each row: mono `01–05` eyebrow + bold sans + gold serif italic keyword pivot + lede body + routed "Learn more →" link + hairline rule between rows. No copy changed. Closing paragraph moved up directly under the section h2 (was floating at the bottom).
- New `FoundationDiagram` SVG component renders the 5 disciplines as interlocking gold-hairline segments with joinery ticks. Sticky on desktop (`top: 96px`) so it stays in view while the rows scroll past. Active segment fills gold based on which row is in the reader's viewport band (IntersectionObserver with `-40% 0px -40% 0px` rootMargin). Mobile drops sticky to static. Honors `prefers-reduced-motion`.
- Old `SectionExpertiseAreas` accordion still defined in HomeV3.jsx but no longer rendered. `/v3-disciplines-stack` comparison route removed from App.js.

- Five Disciplines accordion: renamed "Reliable Equipment" → "Equipment Reliability" to match menu. Added `href` to each card and a new `ExpertiseLearnMoreLink` component that renders a routed copper "Learn more →" link with hover-arrow animation at the bottom of each opened drawer. Each accordion now navigates to its matching expertise page via react-router.

- Video loop crossfade: extracted first frame of `powers-banner-2026-v2.mp4` → `powers-banner-2026-v2-poster.jpg` (~134KB) and introduced `LoopingVideoWithCrossfade` component. Drives video opacity via rAF tick — fades to 0 over the final 0.7s of playback (revealing the matching first-frame poster underneath), then fades back in over the first 0.7s after the loop restart. Loop seam is now visually invisible. Honors `prefers-reduced-motion`.


- Major rebuild of homepage rows 3 + 4 per `POWERS_Sections_3_4_Integration_Brief.md`. Replaced both the previous Five Disciplines section (editorial stack + FoundationDiagram, built 2026-05-28) and the navy `SectionExecutionEngine` Pressure In/Performance Out exhibit with a single choreographically linked pair: `SectionDisciplinesFoundation` + `SectionPressureExhibit` (new file `/app/frontend/src/components/DisciplinesAndPressureExhibit.jsx`). Both sections now share a continuous white background.
- Section 3 (Disciplines Foundation): 5 discipline cards in a clockwise spatial arrangement around a central 188/170/150px "core" element (CSS-only, navy-deep fill, 1.5px gold border, inner ring at 14% inset, radial gold halo, breathing scale animation). Cards stagger in 180ms apart, core materializes after the 5th card, dotted gold connector lines draw on a `<canvas>` from each card to the core, then the payoff line "Together, they form your *ability to execute no matter what.*" lands. Each card has a routed "Learn more →" link to its expertise page. On section exit (bottom of section crosses upper third of viewport via sentinel + IntersectionObserver with rootMargin `0px 0px -70% 0px`), the core translates 220px downward and fades to 0, selling the illusion that it's leaving Section 3 to travel into Section 4.
- Section 4 (Pressure Exhibit): copy block "Strong numbers. *Regardless of conditions.*" fades up on viewport entry (threshold 0.25). 400ms beat later, an HTML "ghost core" begins descending from the top of the exhibit area to the canvas core's operating position over 1.6s with cubic-out easing. On landing, the ghost fades out (300ms) while the canvas core fades in (300ms). Swarm immediately activates: red pressure labels fly from the left edge toward the core (with wobble, fade-near-core), are absorbed with a particle burst, and green outcome labels emit from the right side of the core. Operating-pressure slider (1–10), Pause/Play, and Surge controls fade in with the swarm.
- Replay-on-re-entry verified working in both sections. IntersectionObserver edge-detection pattern from the brief preserved verbatim; React StrictMode-safe via careful cleanup in useEffect returns. Scrolling back up resets both sections to empty state and replays the entry sequences.
- DPR canvas scaling preserved in both sections. Responsive breakpoints: 980px (Section 3 stacks to single column, canvas hidden) and 480px/880px (Section 4 canvas aspect ratio + core size scale).
- Honors `prefers-reduced-motion` in both sections (end-states shown immediately, no animation).
- Deleted from `HomeV3.jsx` (~990 lines removed): `IconPlaceholder`, `DisciplineTab`, `LearnMoreLink` (unused), `SectionExpertiseAreas` (old accordion), `DISCIPLINE_HEADLINE_PARTS`, `DisciplineRow`, `FoundationDiagram`, `SectionDisciplinesStack` (built and shipped 2026-05-28, now replaced), `ExecutionExhibit`, `SectionExecutionEngine`. Card data + ExpertiseLearnMoreLink also removed since the new file is self-contained.
- All copy locked at brief's values. Card body copy on the homepage is now the shorter form (1 sentence each) appropriate for the spatial layout; the longer paragraph form lives only on each expertise page.



- Hero animation re-tuned per `POWERS_Hero_Integration_Brief.md`: BUILD lengthened 3600→4400ms, PEAK lengthened 1100→3500ms (the "executive watching readouts they can't control" beat now registers as chaos, not flash-by). Word reveal milestones updated from 3 (0.34/0.66) to 5 (0.30/0.58/0.78/0.92) so the lede + "We build the foundation." line now ride the BUILD/PEAK/COLLAPSE/EMPTY cycle with the headline words — they fade up in build, hold in peak, and fade out during collapse. Produces a perpetual emotional rhythm rather than a one-shot reveal. Verified live across one full cycle.
- Section 4 ("Strong numbers. Regardless of conditions.") now has a "What that means" mono eyebrow above the h2, styled to match the Section 3 "What we build" eyebrow exactly (same color, size, tracking). Creates a paired narrative beat: S3 = what we build → S4 = what that means.

## Handoff Package (2026-05-29)

The homepage + shell + chrome + architecture is feature-complete for the Monday CEO concept review. A full handoff package has been produced for Patrik (senior dev) to begin headless integration onto Faust.js + WP Engine. Subsequent pages (Industries Served, expertise area body content, remaining case studies, Approach, Discovery, Careers, etc.) will be built in their own focused conversations and wired in by Patrik between builds.

Handoff package lives at `/app/handoff/`:

- `README.md` — entry point, what's in the box, reading order
- `ARCHITECTURE.md` — file tree, routing, conventions, quirks
- `DESIGN_SYSTEM.md` — locked type/color tokens, naming rules, editorial pivot pattern
- `COMPONENT_INVENTORY.md` — every component, data shape contract (CMS-agnostic per Patrik's preference)
- `SECTION_CHOREOGRAPHY.md` — Hero, S3, S4, video loop, subhead reveal animation specs
- `ASSET_MANIFEST.md` — fonts, video, images, brand docs
- `ROUTES_AND_REDIRECTS.md` — active routes + legacy .html slug aliases
- `KNOWN_TUNING_LEVERS.md` — explicitly flagged tuning points + things NOT to change
- `screenshots/` — 8 canonical desktop captures of each section in final state

Total handoff size: 88KB markdown + 8 JPEG screenshots (~530KB).

Patrik's preferences (asked & answered):
- Stack: Faust.js + WP Engine
- Schema: agnostic — describe data shapes per component, let him model
- Format: markdown files under `/app/handoff/`
- History doc: skipped (no design archaeology — current state only)
- Timeline: hand off now, integration begins before/during/after Monday CEO review


## Cleanup Pass (2026-06-01)

After the client kick-off home run, the user requested a responsive audit + code cleanup. Findings & changes:

- **7 deprecated color alias usages replaced with canonical names** (per `DESIGN_SYSTEM.md` rule "do not introduce deprecated aliases in new code"):
  - `C.copper` × 2 → `C.gold` (Row 5 + Row 8 italic accents)
  - `C.gold600` × 2 → `C.gold` (industries + case studies hover states — see next item)
  - `C.navy900` → `C.navyDeep` (How We Work video container background)
  - `C.navy400` × 2 → `C.body` (footer small text hover states)
- **Fixed 2 no-op hover states** (color-toggle between identical values now that the deprecated aliases all resolve to `C.gold`) by upgrading to `underline-on-hover + arrow-nudge` pattern (matches the discipline `CardLearnMore` treatment). Affects "Explore the industries we serve →" and "See All Case Studies →" links.
- **Deleted ~20 lines of dead code** in Hero: the `revealStatic` function was defined but never called (replaced months ago by `showSupport`/`hideSupport` per the per-cycle reveal brief). Stale comment also removed.
- **Tagline column re-balance** (separate prior request): brand column maxWidth widened 280→340px so "Strong Execution. Strong Performance." fits one line at desktop. Each sentence wrapped in `whiteSpace: 'nowrap'` so narrower viewports break cleanly between sentences. Applied to both `SiteFooter` and the inline `HomeV3` footer.
- **Lint clean** across all modified files.
- **Responsive audit**: media queries verified present at 480 / 880 / 900 / 980 px + reduced-motion in the rendered DOM. Playwright's screenshot tool doesn't honor viewport changes, so visual mobile QA was inconclusive from here — real-device testing on Netlify is the ground truth. Architectural note carried into handoff: S3 uses 980px breakpoint (5-card spatial grid needs the wider room), S4 + chrome use 880px — intentional per choreography briefs.
- **One pre-existing React console warning noted but not chased**: "mixing shorthand and non-shorthand style properties during rerender." Cosmetic warning, not functional. Pre-existed this pass.


### Feb 2026 — 5th Metric Card ($1B+ Client Savings) — DONE
- Added a 5th card to `PowersMetrics.jsx` in the first position: **$1B+ Client Savings** with description "Annualized cost savings produced across engagements, when execution capacity replaces firefighting."
- Extended the `STATS` schema with an optional `format(n)` function so the count-up can render "$XYZM" mid-animation and snap to "$1B+" at the final frame (the target is `1000`, `Math.round(eased * 1000)` hits exactly `1000` at progress=1 → "$1B+").
- Extended the `CountUp` sub-component to accept and use the `format` prop; legacy cards without `format` continue to render the default `<number><suffix>` output (zero regression risk for the other 4 cards).
- Order at `/` is now: **$1B+ Client Savings → 98% Client Retention → 5 WKS Time to Impact → 500+ Operations Strengthened → 30+ Years of Expertise**.
- Verified via screenshot: all 5 cards render, first-card value reads `$1B+`, label reads `CLIENT SAVINGS`. Lint clean.
- Resolved blocker carried over from previous fork: malformed JSX + duplicate `export default` at the tail of the file (lines 261-270 in the previous state) — file now ends cleanly at the single `export default PowersMetrics;`.



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

## 2026-06-18 — Full homepage copy sync to v2 doc + scroll-driven core handoff

**Source:** `POWERS_Homepage_Full_Draft_06-18-2026_v2.docx` (9 rows + tagline).

**Copy synced across all 9 rows:**
- Row 1 (HeroNavyClaim) — H1 unchanged (already matched doc).
- Row 2 (`DisciplinesAndPressureExhibit.jsx` → `SectionDisciplinesFoundation`) — H2 tightened from "We build the disciplines to execute at a consistently high level. No matter what." to "We build the disciplines to execute. No matter what." Added missing word-space between inline-block H2 spans.
- Row 3 (`HeroPressureExhibit.jsx`) — Lede expanded from 3 sentences to 5 fragments matching doc: adds "The question isn't whether you can get better", "demand spikes / leadership changes / new site / PE timeline", and the new closing payoff "Better margins. Stronger throughput. Higher returns. Quarter after quarter." rendered as a block-level `.hpe-lede-payoff` with heavier weight so the cadence beats land.
- Row 4 — **Structural collapse**: previously two sections (`SectionDifferentApproach` + `SectionHowWeWork`) ran the "approach" beat across two stops. Per the doc, Row 4 is a single section. Removed `<SectionDifferentApproach />` from HomeV4 spine; rewrote `SectionHowWeWork` with the full 6-paragraph doc lede covering: 3pm exits → on-the-floor work → third shift / 5am → "radios get quiet" → operational layers (processes/systems/tools/behaviors) → skin-in-the-game / paid on results. Pull-quote `"If you're working, we're working."` retained.
- Row 5 (`PowersMetrics.jsx`) — three "capacity" → "capability" word changes in the stat descriptions (Client Savings / Operations Strengthened / Years of Expertise).
- Row 6 (`SectionWhereWeWork`) — H2 changed from "Wherever the work is physical, repeatable, and measured." to "Different industries. The same execution discipline." Lede rewritten to the doc's industry-credentialing prose ending on "the same financial result: stronger margins, faster recovery, gains that compound."
- Row 7 (`SectionResultsEntryPoint`) — H2 "rock-solid execution" → "strong execution". Lede rewritten to match doc.
- Row 8 (`SectionInsightsEntryPoint`) — lede rewritten to match doc.
- Row 9 (`FooterCTA`) — H2 swapped from "Stop chasing numbers. / Start building execution capacity." to single forward-leaning invitation "Let's build your operation / to execute under any circumstances." Lede updated.

**Scroll-driven core handoff (Row 2 → Row 3) — `s3-core-anchor` + `hpe-ghost-wrap`:**
- Replaced both halves of the handoff (previously IO-fired time-based easings) with scroll-position-driven transforms tied to each section's `getBoundingClientRect().top/.bottom` vs. viewport.
- Row 2 anchor (`DisciplinesAndPressureExhibit.jsx`): introduces `updateHandoff()` rAF listener that maps section bottom from `vh*0.55 → vh*-0.10` onto a 0→1 progress, easing the anchor downward up to `MAX_DROP=320px` with synchronized opacity fade. Replaces the disabled `.s3-exiting` CSS class.
- Row 3 ghost (`HeroPressureExhibit.jsx`): `updateEntry()` now derives its descent progress `p` from section.top vs viewport (`vh*0.65 → vh*-0.15`) instead of `elapsed/ENTRY_DUR`. Added `entryCompleteAt` timestamp so the post-completion canvas-core fade-in stays decoupled from scroll velocity (canvas core fades in over a steady 600ms once ghost lands, independent of how fast the user scrolled).
- Verified across 5 scroll positions: as user scrolls 600px through the boundary, Row 2 anchor traverses 0→317px down with opacity 1→0.01 while Row 3 ghost simultaneously traverses 0→538px down with opacity 0→1. The two motions read as one continuous core falling through the section boundary at the reader's scroll velocity.

**Files touched this pass:**
- `/app/frontend/src/components/DisciplinesAndPressureExhibit.jsx` (Row 2 H2 copy + scroll-driven exit)
- `/app/frontend/src/components/HeroPressureExhibit.jsx` (Row 3 lede copy + scroll-driven ghost descent + payoff styling)
- `/app/frontend/src/components/PowersMetrics.jsx` (capacity → capability in 3 descriptions)
- `/app/frontend/src/pages/HomeV4.jsx` (spine: removed SectionDifferentApproach render; rewrote SectionHowWeWork lede; rewrote SectionWhereWeWork copy; rewrote SectionResultsEntryPoint lede; rewrote SectionInsightsEntryPoint lede; rewrote FooterCTA H2 + lede)
- `/app/frontend/src/lib/useScrollBuild.js` (carried-over: respect `skipInitialUpdate` option for hero entry animation)
- `/app/frontend/src/components/HeroNavyClaim.jsx` (carried-over: one-time CSS entry animation for the hero on mount)

**Not in this pass (open):**
- Larger motion paradigm upgrade — the user flagged fades-as-fades are too subtle; they want real-motion language (slide-ins from offscreen, character-by-character stagger, masked clip-path reveals, copper hairline draw-in, disciplines flying in from offscreen compass directions tied to scroll, parallax). Not started; awaiting user direction.
- Three parallel design tracks at `/v5`, `/v6`, `/v7` (editorial-magazine / cinematic-dark / brutalist-typographic) for client presentation alternatives. Not started; awaiting user direction.
- Rows 7 & 8 use existing hand-coded card prototypes for now per user direction. Programmer or future agent will wire to a CMS/data layer once case studies + blog posts are formatted into a DB.

## 2026-06-18 (later) — Text animations removed + 4 eyebrows + Row 4 video removed

Per direction. The fade-in pattern was reading as "weak/subtle", not as "building". Until a proper motion language replaces it, all editorial copy renders statically.

**Eyebrows removed (4 rows):**
- Row 4 (`SectionHowWeWork`): `<Eyebrow label="How We Work" />` removed.
- Row 6 (`SectionWhereWeWork`): `<Eyebrow label="Where We Work" />` removed.
- Row 7 (`SectionResultsEntryPoint`): `<Eyebrow label="Proven Results" />` removed.
- Row 8 (`SectionInsightsEntryPoint`): `<Eyebrow label="Insights" />` removed.

**Row 4 reformat — single column, no video:**
- The right-column `<LoopingVideoWithCrossfade />` (the manufacturing-floor video) was dropped from Row 4 because that asset is being used in the hero. Row 4's outer container was collapsed from a 2-column `auto-fit minmax(320px, 1fr)` grid to a single `flex-column` centered on a 920px measure — matching the rest of the editorial spine.

**Text animations — fully retired:**
- `useScrollBuild` hook reduced to a no-op that snaps all `[data-build]` descendants to `opacity: 1; transform: none`. No scroll listener, no rAF, no resize listener. Existing call sites (Row 2, Row 3) are left in place so the contract returns when a new motion pass is wired in.
- HomeV4's global reveal CSS block (`[data-subhead-reveal]` / `[data-eyebrow-reveal]` / `[data-lede-reveal]` opacity-0 + translate3d states) was replaced with a single rule that sets them all to `opacity: 1; transform: none; transition: none`. The `useSubheadReveal` IO hook still runs (harmlessly) — it sets `data-subhead-in="true"` and `data-row-revealed="true"` attributes, but those attributes no longer drive any CSS.
- `HeroNavyClaim`'s one-time `@keyframes hnc-rise` staggered entry was removed; the H1 lines now render statically at full opacity, no transform.

**What's still animating (intentional):**
- The five-discipline pentagon entry stagger + connector draw (Row 2's canvas/IO sequence, geometry not text).
- The chip swarm, ambient ±% number swarm, jagged red/green trend lines, breathing core, pressure surge bursts (all Row 3 canvas).
- The scroll-driven core handoff (Row 2 anchor falling + Row 3 ghost descending), both bound to scroll position.
- The metrics count-up (Row 5).
- Hover/cursor microinteractions on links/buttons.

**Files touched this pass:**
- `/app/frontend/src/lib/useScrollBuild.js` (full rewrite as no-op; preserves call-site contract)
- `/app/frontend/src/components/HeroNavyClaim.jsx` (removed keyframe + initial opacity:0)
- `/app/frontend/src/pages/HomeV4.jsx` (global reveal CSS → static; Row 4 single-column reformat + video drop; 4 eyebrow elements removed)


## 2026-06-18 (later) — Design spec pass: single source of truth for every row

User feedback: "your row content widths are all over the place. Left justify and centering are all over the place. There is a severe lack of a disciplined, thoughtful, design backbone." Audited and confirmed correct. Counted **11 distinct container widths, 3 competing H2 ladders, 5 mixed alignment patterns, 30+ hardcoded hex literals**, and a color token with five aliases for the same hex.

**Created `/app/frontend/src/lib/designSpec.js`** — single source of truth. Six color tokens (`COLOR.navy / .navyDeep / .gold / .body / .paper / .line`), three measure widths (`MEASURE.narrow 640 / .read 760 / .wide 1240`), one rhythm scale (`RHYTHM.sectionPadY / .sectionPadX / .headerToBody`), one H2 ladder (`TYPE.h2.size = clamp(32, 3.6vw, 52)`), one body ladder, one per-row alignment regimen (`ALIGN.{row} = 'center' | 'left'`).

**Refactored to obey the spec:**
- `/app/frontend/src/pages/HomeV4.jsx` — `C` and `S` now forward to `COLOR/MEASURE/RHYTHM/TYPE`. Dead aliases (`maxNarrow:640` and `maxRead:760` declared but never used; `bgIvory/bgBone` resolving to the same `#fff`; five gold aliases) removed. Inline `maxWidth: 1280` swept to `S.maxWide` (which now resolves to spec's 1240, matching Row 2/3). Rows 7 and 8 flipped from the banned centered-H2-over-left-lede pattern to fully left-anchored per `ALIGN.results = 'left'` / `ALIGN.insights = 'left'`. Inline `'#143257'` / `'#e89346'` / `'#ffffff'` hex literals in Row 9 CTA + button swept to `C.navy / C.gold / C.paper`.
- `/app/frontend/src/components/DisciplinesAndPressureExhibit.jsx` — imports from `designSpec`. Hand-rolled local `C` reduced to a pass-through. `.s3-row` outer dropped from `max-width: 1240px` + asymmetric `64px 56px 24px` padding to `MEASURE.wide` + symmetric `RHYTHM.sectionPadY/X` (clamp 56–72). `.s3-intro` dropped from `880px` to `MEASURE.read` (760). H2 ladder dropped from hand-rolled `clamp(30, 3.2vw, 48)` to `TYPE.h2.size` (`clamp(32, 3.6vw, 52)`).
- `/app/frontend/src/components/HeroPressureExhibit.jsx` — same pattern. `.hpe-exhibit` dropped from `1240` + `56px 56px 64px` asymmetric padding to spec values. `.hpe-copy` dropped from `920px` to `MEASURE.read`. `.hpe-subhead` H2 ladder unified with the page.

**Visual audit after pass (DOM scrape, 1920×1080 viewport):**
- Every row's outer container = 1240px (`MEASURE.wide`). Row 4 inner = 760px (`MEASURE.read`).
- Every H2 renders at 52px max desktop. Single ladder.
- Alignment: hero/Row 2/Row 3 centered (centered-exhibit rows); Rows 4/6/7/8/9 left-anchored.
- Zero console errors. Hot reload clean.

**Files touched this pass:**
- `/app/frontend/src/lib/designSpec.js` (NEW — single source of truth)
- `/app/frontend/src/pages/HomeV4.jsx` (imports + C/S forwards + inline width sweeps + Rows 7/8 alignment fix + Row 9 hex sweep)
- `/app/frontend/src/components/DisciplinesAndPressureExhibit.jsx` (spec imports, padding/H2/intro width unified)
- `/app/frontend/src/components/HeroPressureExhibit.jsx` (spec imports, padding/H2/copy width unified)

**Discipline now enforced going forward:**
1. No hex literals outside designSpec.js — use `COLOR.*`.
2. No invented measure widths — use `MEASURE.narrow / .read / .wide`.
3. No hand-rolled H2 clamps — use `TYPE.h2`.
4. No hand-rolled section padding — use `RHYTHM`.
5. No mixed alignment within a row — use `ALIGN[rowKey]`.

**Still open:**
- 18 `gray*` / `fog` palette tokens kept in `C` for now (used in dividers). Lower priority.
- The retired `SectionDifferentApproach` still uses `'44em'` measure in its paragraphs. Component isn't rendered, but if it ever returns it needs to be brought to spec.
- `RowAbilityToExecute.jsx` import in HomeV4 is unused (eslint-disabled). Safe to delete.
- `LoopingVideoWithCrossfade` import is unused after the Row 4 video drop. Safe to delete.

## 2026-06-18 (later) — H2 phrasing + frame consistency pass

User feedback after seeing the spec-pass result on a 30" monitor: Row 4 and Row 6 still read as "shrunken strips" (760px outer frame on a 2560px+ display), and several H2s wrapped into 3–4 lines with orphan words ("the", "disciplines,", "discipline" stranded alone). Receipts on a 2560px viewport:
- Row 2 H2 height = 168px / 3 lines, "the" orphan.
- Row 3 H2 height = 225px / 4 lines, "disciplines," orphan.
- Row 6 H2 = 3 lines, "The same" orphan.
- Row 8 H2 = 4 lines, two orphans ("the", "discipline").

**Frame consistency fix:**
- Row 4 (`SectionHowWeWork`) outer frame restored from MEASURE.read (760) → MEASURE.wide (1240). Prose column held to MEASURE.read inside the wide frame. Pattern is now: every section frame at 1240, prose column at 760 inside. Row 4 no longer reads as a narrow strip.
- Row 6 (`SectionWhereWeWork`) H2 lifted out of the 760 inner column so it occupies the full 1240 frame at desktop. Prose column stays at 760.
- Rows 7 + 8 (Results, Insights) — same restructure: H2 in the 1240 frame, lede in MEASURE.read column.

**H2 phrasing — forced two-line beats via display:block spans:**
- Replaced `&nbsp;` + `text-wrap: pretty` (browser-decided wrap) with explicit `display: block` spans per clause. Each H2 now reads as a clean two-line editorial beat regardless of viewport.
- Row 2 (`.s3-h2`) — H2 moved out of `.s3-intro` into its own wide row container; gets a `.s3-h2-wide` class with max-width:100%, centered.
- Row 3 (`.hpe-subhead`) — H2 moved out of `.hpe-copy`; `.hpe-h2-main` and `.pivot` spans switched from `display: inline-block` to `display: block`. Lede column held to MEASURE.narrow (640) for comfortable centered measure.
- Rows 4 / 6 / 7 / 8 / 9 — H2s use explicit `<span style={{display:'block'}}>` per clause.

**Centered exhibit row tightening (Rows 2 + 3):**
- `.s3-intro` lede column narrowed MEASURE.read (760) → MEASURE.narrow (640) so centered prose reads at ~55 char measure instead of sprawling across the wide frame.
- `.hpe-copy` lede column same narrowing (760 → 640).

**Verification at 2560×1440:**
- Every H2 now renders at 112–115px tall, two clean editorial lines, no orphans.
- Row widths: outer frame uniformly 1240 across every row; prose columns uniformly 760; centered ledes 640.
- Zero console errors.

**Files touched this pass:**
- `/app/frontend/src/pages/HomeV4.jsx` (Row 4 outer frame restore + H2 lift-out for Rows 6/7/8 + display:block spans)
- `/app/frontend/src/components/DisciplinesAndPressureExhibit.jsx` (Row 2 H2 lift-out + `.s3-h2-wide` style + `.s3-intro` narrow measure)
- `/app/frontend/src/components/HeroPressureExhibit.jsx` (Row 3 H2 lift-out + `.hpe-subhead` margin/text-align update + `.hpe-h2-main`/`.pivot` block display + `.hpe-copy` narrow measure)


## 2026-06-19 — HomeV5 Operating Brief refinement pass (Beat III, eyebrows, layout root-causes)

V5 at `/v5` continues as the client-review iteration. V4 remains at `/` per user direction; both URLs will be shared with the client as separate links.

**Masthead + hero copy reset (per client direction):**
- Removed the `.brief-cover` cover-meta strip ("Operating Brief 2026 / POWERS / Confidential to the reader") — was reading as theater.
- Removed the hero eyebrow entirely (formerly "I / Position", briefly "OPERATING BRIEF · POWERS").
- Hero footer reduced from "For the operator accountable for the number · Scroll to read" to a single line: **"Find out how"**. Forward-leaning CTA tone; the scroll affordance is the scroll-snap itself, no instruction needed.

**Beat-eyebrow rewrite — plainspoken labels (no Roman numerals, no copy-concept conceit):**
THE FOUNDATION · PERFORMANCE UNDER PRESSURE · WORK ETHIC · THE LEDGER · WHERE WE WORK · CASE STUDIES · FIELD NOTES · NEXT MOVE.

**Credo relocated to Beat IV (Work Ethic):**
- Removed the right-column quote sidebar from Beat II (Thesis) entirely.
- Moved "If you're working, we're working." into Beat IV via the existing `Station` component's `quote` + `attr` props, attributed as "The POWERS guiding principle". Reads now as the blue-collar work-ethic credo, not a piece of floor practice trivia.

**Beat III (Pressure) animation rebuild — narrative-led:**
- Eyebrow renamed UNDER PRESSURE → "Performance Under Pressure".
- Swarm split into clean L/R hemispheres at the H2 baseline. Red pressures fall straight down the LEFT hemisphere (x ∈ [4, 38]vw, anchored by left edge); green outcomes EMERGE from the same baseline (top: 56vh) and rise straight up the RIGHT hemisphere (right offset ∈ [4, 38]vw, anchored by right edge so long phrases like "+34% labor productivity" extend leftward into their band without overflowing). One shared horizon = the disciplines.
- Speed contrast carries the narrative: reds 9–14s (urgent), greens 22–32s (patient/compounding).
- Reds shatter at the baseline via opacity + scaleY collapse + letter-spacing widen-out.
- **STRAT (stratified sampling)** replaced pure-random seeding so coverage is guaranteed even across each band (no clusters).
- Directional **CSS border triangles** (red ▾ on each falling phrase, green ▴ on each rising phrase) reinforce the hemisphere metaphor at a glance. Border triangles chosen over unicode glyphs because the mono font was substituting ▾/▴ with the missing-glyph asterisk.

**Self-inflicted bug found + fixed during this pass:**
- First swarm rewrite passed `i + 73` to the STRAT helper as the slot index, which made STRAT compute `right: 212vw` for every green — pushing them all off-screen. STRAT now takes separate `slot` and `jitterSeed` args so the slot index always stays 0…n-1.

**ROOT-CAUSE FIXES (the real wins of this pass):**
1. **`.brief-station { gap: clamp(40px, 6vw, 96px) }` → `column-gap:`.** The `gap` shorthand was applying to row-gap too, injecting a 96px ghost row between every grid item in single-column beats. That ghost stacked on top of each item's own marginBottom, producing the "blown-out" vertical gaps the user marked with red X's in their feedback screenshot. With `column-gap` only, vertical rhythm comes from explicit item margins as intended. Same fix in the 900px responsive override.
2. **`.brief-station { align-items: start } → align-items: center` + `align-content: center` on the section.** Combined with `min-height: 100vh` and reduced padding (14vh → 8vh), content now vertically centers within each snapped viewport instead of anchoring to the top.
3. **`clip-path: inset(0 0 0 0)` on `.wipe` was clipping serif descenders** off every H2 italic (.pivot clauses). Layout was still allocating that descender region, which produced an invisible "ghost space" below the visible text — the user's perceived "big gap between subhead and lede" was actually the clipped-but-still-allocated descender band. Changed to `inset(-0.4em 0 -0.5em 0)` (negative top/bottom for glyph breathing room, horizontal still drives the wipe sweep). Reduced-motion override fixed too.
4. **`.brief-h1 .line { overflow: hidden }`** was clipping the "g" descender in "Regardless of conditions." at line-height 1.03. Replaced with `clip-path: inset(0 0 -0.5em 0)` so the pre-strike position is still hidden (top clip) but descenders render past the box bottom.

**Confirmed working (no code changes needed):**
- CSS `scroll-snap-type: y mandatory` on `.brief-page` + `scroll-snap-align: start` + `min-height: 100vh` on every section → one full-viewport beat at a time, on scroll OR swipe, across desktop/laptop/tablet/mobile + landscape/portrait. IntersectionObserver triggers the wipe + hammer-strike build animations as each beat reaches the viewport — the "build before your eyes on scroll" paradigm is already live.

**Status:** V5 at `/v5` ready for the client review link. V4 at `/` untouched.

**Files touched this pass:**
- `/app/frontend/src/pages/HomeV5.jsx` (entire pass — root-cause CSS fixes, swarm rebuild, eyebrow rewrites, masthead removal, hero footer rewrite, credo relocation)

**Still open (P0 → P1):**
- Mobile responsive pass on `HomeV5` at 375px / 768px portrait + landscape (the scroll-snap math is right, but spot-checks at small viewports still owed).
- Wire Beats VII (Case Studies) + VIII (Insights) to real `caseStudies.js` data instead of placeholder cards.
- Native React Industries page (`/industries-served`) — currently `LegacyPage.jsx` raw HTML injection.
- Roll out remaining 66 case study entries + matching routes.
- Contact form submission handler (UI only today).
- Search modal functionality.
- Delete unused `RowAbilityToExecute.jsx` import + retired `SectionDifferentApproach`.

## 2026-06-19 (later) — Pre-launch polish + audience-anchor pass

User pushing V5 live with V4 staying at `/v4` for client side-by-side review.

**Reported issues found + fixed this pass:**

1. **Beat IX H2 wrap** — "to execute under any circumstances." was wrapping in the 1.4fr column at desktop. Collapsed ActionBeat to single-column grid; H2 now has the full 1240px frame to breathe.
2. **Unified section padding** — every beat was re-overriding `paddingTop/Bottom` (12vh / 14vh / 18vh) and fighting the global 8vh + `align-content: center` centering. Stripped all inline padding overrides; one source of truth.
3. **brief-tick top values** — 4 different values across 7 instances. Default moved to CSS (`top: 8vh`); all inline overrides removed. Hero keeps its intentional `top: 52%` override.
4. **HERO_LINES hoisted** to module scope (was reallocated on every render).
5. **Stale file-header + PressureSwarm comments** — referenced removed labels and the old X-pattern animation. Rewritten to reflect the actual current implementation.
6. **Content widths misaligned with chrome** — stations had asymmetric padding (+40px on the right only). Now symmetric `max(40px, calc((100% - 1240px) / 2 + 40px))` on both sides. Station content frame = 1160px wide, matching `.brief-header-inner` exactly.
7. **Header NOT actually sticky** — header was declared `position: sticky` but couldn't function because scroll-snap was set on `.brief-page` (a `<div>` with no `overflow:auto` — i.e., NOT a scroll container). Sticky positioning is relative to the scroller; with the wrong scroller targeted, sticky was inert. Root cause fixed in #8 below; sticky now works for free.
8. **Scroll-snap actually engaged** — moved `scroll-snap-type: y mandatory` from `.brief-page` to `html.v5-snap` (scoped via a `useEffect` that toggles the class on mount/unmount, so V4 and the rest of the app keep their free-scroll behavior). The document scroller is `<html>`; that's where snap needs to live. Now one scroll-wheel notch or one swipe = one beat advance, with the next section locked to the viewport top. Verified: `html.v5-snap class: True, computed scroll-snap-type: y mandatory`. Switched section `100vh` → `100dvh` so iOS Safari's collapsing address bar doesn't break section heights mid-scroll.
9. **Rail fill thinner** — `.brief-rail-fill` 2px → 1px (matches the underlying hairline width); glow softened 10px → 8px.
10. **iPhone H1 intra-word break** — chars rendered as `display: inline-block` were valid line-break candidates between every character, so "execution" was wrapping as "e/xecution" on 430px portrait. Each word now wrapped in `<span className="word">` with `display: inline-block; white-space: nowrap`. Real spaces sit between word wrappers as the only valid break opportunities. Typewriter cadence preserved by ticking the `ci` counter through space slots without rendering them as `.ch` spans. Verified programmatically at 430px viewport: `intra_word_breaks: 'NONE — fix works'`.
11. **No hamburger at tablet/mobile** — basic SOP miss. Built a proper hamburger button (3-bar with morph-to-X animation), visible only at ≤900px via media query, swapping out the desktop nav. Drawer slides in from the right (max 360px wide), full-height (100dvh), with backdrop-blur backdrop, body scroll lock while open. Drawer contains: Results + About as collapsible sections (matching the desktop mega panels), Insights as a standalone link, "Let's Talk" pinned as a CTA button at the bottom. All links close the drawer on tap.
12. **Menu hierarchy clarity (V5 was less clear than V4)** — under Results, "Expertise Areas" was styled as a small-caps tracked uppercase label, which read as a separate category rather than the parent of the 5 disciplines beneath it. Replaced with a non-clickable "Areas of Expertise" in standard menu font, with the 5 disciplines indented one step using thin gold leader marks. Same treatment in the drawer: tap Results → 4 main items + "Areas of Expertise" as a nested expandable button → tap it again → 5 disciplines unfold further indented.

**Hero video — the audience anchor (new):**

User removed the explicit audience eyebrow ("For the operator accountable for the number") earlier in the pass and asked whether we could use V4's hero video as a "very translucent goldish/sepia overlay" to do the audience-naming job visually. Answer: yes — the manufacturing/shop-floor montage with dissolves tells the reader who this brief is for at a glance.

Implementation:
- `<video autoplay muted loop playsinline preload="auto">` inside `.brief-hero` only (not on the rest of the page — keeps the brief feel intact below the hero).
- `opacity: 0.22`, `filter: sepia(0.95) saturate(1.55) hue-rotate(-10deg) brightness(1.06) contrast(0.92)`, `mix-blend-mode: multiply` — warm goldish-sepia wash that stains the cream paper without obscuring the navy H1.
- `.brief-hero-wash` — radial cream gradient most opaque at 20% from the left (where the H1 sits), transparent at the right (where the video reads more freely). Keeps the navy text fully legible.
- **Source video compressed 21MB → 2.1MB** via ffmpeg (1280×720 H.264 ~800kbps, `-movflags +faststart` for progressive streaming). At 22% opacity behind a multiply wash, source resolution is invisible — the wins are entirely on payload size + cellular friendliness.
- **95KB poster JPG** (first frame, sepia-baked) renders instantly so the hero never shows blank while the 2.1MB video buffers.
- Paused under `prefers-reduced-motion: reduce`.

**Files touched this pass:**
- `/app/frontend/src/pages/HomeV5.jsx` (everything above)
- `/app/frontend/public/uploads/powers-hero-bg.mp4` (new — 2.1MB compressed)
- `/app/frontend/public/uploads/powers-hero-bg-poster.jpg` (new — 95KB)

**Status:** V5 ready to push live alongside V4 at `/v4`. Client will receive both URLs as iteration links.

**Open for next session (P0 → P1):**
- Convert plain `<a href>` menu links to react-router `<Link>` so V5 → inner-page navigation is SPA-smooth (no full document reload).
- Wire Beats VII (Case Studies) + VIII (Field Notes) to real `caseStudies.js` data instead of placeholder cards.
- Build native React Industries page at `/industries-served` (currently `LegacyPage.jsx` HTML injection).
- Roll out the remaining 66 case study entries + matching routes.
- Mobile pass on the inner section beats (hero is solid on iPhone Pro Max; the rest deserve the same scrutiny).
- Contact form submission handler (UI only today).
- Search modal functionality.
- Find a home for "gains that sustain" — possibly Beat V eyebrow or a Beat III payoff variant.
- Delete unused `RowAbilityToExecute.jsx` + retired `SectionDifferentApproach`.



## 2026-02-24 — Case Studies copy & PDF wiring fixes

**Implemented:**
- `/case-studies` H1 updated to the two-line punchy form: **"Proven execution."** (navy) / **"Built to perform."** (gold accent). Lede copy and station-index preserved. Hero remains under the locked `brief-doc-h1` spec (sans, no italic on accent), consistent with the rest of the site.
- Restored "DOWNLOAD PDF" wiring on `/case-studies/defense-aerospace-otd`. The `window.print()` triggers on `CaseStudyHero` + `CaseStudyBody` were intact; the silent regression was that the `@media print` rules in `caseStudyStyles.js` only hid the legacy `#site-header-root` / `#site-footer-root` IDs. After the migration to `BriefHeader` / `BriefFooter`, those rules no longer matched, so the new chrome was bleeding into the printed PDF. Extended the print sheet to also hide `.brief-header, .brief-footer, .brief-mobile-drawer*` and to reset html/body min-heights. Verified via Playwright `emulate_media(media="print")`: brief chrome hidden, `cs-hero` hidden, `.print-doc` cleanly displayed with masthead + executive brief + stats + situation section + footer page-number band.

**Verification:**
- Screenshot at `/case-studies` — H1 confirmed.
- Playwright print-media emulation at `/case-studies/defense-aerospace-otd` — print-doc rendered alone, brief chrome hidden.

**Files touched:**
- `/app/frontend/src/pages/CaseStudies.jsx` (H1 copy)
- `/app/frontend/src/components/caseStudy/caseStudyStyles.js` (print rules)


## 2026-02-24 — Case Studies design cohesion pass + lede copy

**Implemented:**
- **Token alignment.** The case-study legacy stylesheets shipped their own `:root` palette with drifted values (gold `#eabb71`, navy `#183a61`, off-white `#f5f5f3`, gray body text). Both `caseStudyStyles.js` and `caseStudiesLibraryStyles.js` `:root` blocks remapped to brief tokens from `briefTokens.js`: gold → `#e89346` (brand copper), navy → `#0d2442` (deep ink), paper → `#fbfaf6`, body text → navy @ 72%, muted text → navy @ 54%. Local var names preserved so every downstream selector picked up the new palette without rewrites.
- **Header clearance.** `caseStudyStyles.js` body padding-top changed from hardcoded `84px` to `var(--header-h, 112px)` so case-study screens no longer clip under the 112px fixed BriefHeader.
- **Hero breathing room.** `BriefDocStyles.jsx` `.brief-page-hero` padding-top changed from `clamp(120px, 14vh, 180px)` to `calc(var(--header-h, 112px) + clamp(56px, 8vh, 120px))` — every brief-page hero (incl. /case-studies) now has a consistent 56-120px clear below the fixed header.
- **Dead overlay revived.** `CaseStudyDefenseAerospaceOTD.jsx` `briefAlignmentOverlay` targeted nonexistent selectors (`.case-hero`, `.case-section`); rewritten to hit the real classes (`.cs-hero-dense`, `.cs-section`, `.cs-h2`, `.cs-eyebrow-dark`, `.cs-hd-h1`, `.cs-hd-descriptor`, etc.). Hero H1 now renders at brief scale (clamp 40-64px) in Proxima sans; descriptor in Newsreader italic gold; all eyebrows in mono+gold; body H2s at brief scale (clamp 30-48px) in brief NAVY; PDF button in brand copper. Shell layout (dark-navy hero, 3-col stats, right-rail exec brief, section stack) untouched.
- **Residual hardcodes purged.** Cleaned 6 stragglers: `.hero-rule-gold` (legacy `#eabb71` → `var(--gold)`), 4 × `rgba(234,187,113,...)` legacy gold derivatives in focus halos/hover tints/print bars → `rgba(232, 147, 70, ...)`, and `.cs-hd-pdf:hover` `#d9a85a` → `#d27d2e` (brand-copper darkened ~10%).
- **Copy.** `/case-studies` lede updated to "Real operations. Real pressure. Measurable results. Every case below is an operation that had to execute and perform under conditions like yours. The proof is in the resilient execution capability we built working side by side with our clients and the lasting results it produced. Search by industry, service type, or operational challenge."

**Verification (testing agent iteration_5):** 100% pass — 9/9 checks. Cross-page palette consistency confirmed: `rgb(232, 147, 70)` identical on /, /case-studies, /case-studies/defense-aerospace-otd. H1/H2 scales hit brief targets. PDF download wiring + print-media stylesheet unaffected. Zero JS console errors.

**Files touched:**
- `/app/frontend/src/components/caseStudy/caseStudyStyles.js`
- `/app/frontend/src/components/caseStudy/caseStudiesLibraryStyles.js`
- `/app/frontend/src/components/BriefDocStyles.jsx`
- `/app/frontend/src/pages/CaseStudyDefenseAerospaceOTD.jsx`
- `/app/frontend/src/pages/CaseStudies.jsx`


## 2026-02-24 — Case Study CTA rewritten to canonical brief grammar

**Implemented:**
- Replaced legacy `.cs-cta-primary` / `.cs-cta-secondary` / inline `<em>` markup in `CaseStudyBody.jsx` with the canonical brief CTA grammar: `.brief-doc-inner` column, `.brief-doc-h2` with `<span>` + `<span className="pivot">` for the vertical stack, `.brief-doc-cta-button` for both buttons (primary gold-filled, secondary `.cs-cta-ghost` variant with white-alpha outline).
- The "?" now lives inside the `.pivot` span so it renders in italic Newsreader serif gold instead of bleeding back to sans-white.
- Added `<BriefDocStyles />` to `CaseStudyDefenseAerospaceOTD.jsx` (was missing — the canonical primitives weren't being injected on the detail page).
- Updated `briefAlignmentOverlay` to invert the palette for the dark-navy CTA chassis (white H2, gold pivot, white-82 lede, gold inline link, white-outline ghost button hover-to-gold).
- Dark-navy chassis preserved as an intentional visual contrast band against the surrounding PAPER body sections.

**Verification (testing agent iteration_6): 100% pass / 9 of 9 checks.** Cross-page button consistency confirmed against `/approach` canonical reference (same padding 16px 36px, same font-size 15px, same letter-spacing 0.04em, same brand copper fill, same Proxima sans). PDF download wiring + print-media stylesheet unaffected. Zero console errors.

**Files touched:**
- `/app/frontend/src/components/caseStudy/CaseStudyBody.jsx`
- `/app/frontend/src/pages/CaseStudyDefenseAerospaceOTD.jsx`



## 2026-02-25 — Industries Served (hub + 14 child pages) wired, Disciplines refactored to Brief shell

**Implemented:**
- **Industries Served hub + 14 child pages routed.** Added the missing `import IndustryPage from './components/IndustryPage'` and the dynamic `<Route path="/industries-served/:slug" element={<IndustryPage />} />` to `App.js`. The hub already lived at `/industries-served`; this completes the originally-interrupted wiring.
- The 14 industry slugs now resolve: food-beverage-manufacturing, meat-poultry-processing, consumer-packaged-goods, animal-nutrition-feed-manufacturing, agribusiness, pharmaceuticals-medical-devices, aerospace-defense, automotive-manufacturing, industrial-manufacturing, metals-mining, oil-gas, chemicals, warehouse-distribution, private-equity-portfolio-operations. Each renders the 7-row brief template (Hero with `Return to Industries Served` back link, The Pressures, How We Work, The Outcomes, Sub-segments, Why POWERS, Final CTA). Unknown slugs redirect via `<Navigate to="/industries-served" replace />`. Child pages stay hub-only — they do NOT appear in the global menu.
- **5 Discipline pages refactored off `<LegacyPage>`** onto the canonical Brief shell (`BriefHeader` interior + `BriefDocStyles` + `<main paddingTop=var(--header-h)>` + title-only hero + `BriefFooter`). Pages: OperationalDiscipline, FrontlineLeadership, EquipmentReliability, WorkforceCapability, DailyAccountability. Eyebrow renamed from legacy "Expertise Areas" to "What We Build" matching the menu rename. Each hero ships with a commented-out `<img className="brief-page-hero-bg">` + `.brief-page-hero-wash` block ready to receive the ghosted + grit composite when the client delivers hero images. Routes moved from the `<Layout>` group to the `<HomeLayout>` group (no double chrome).
- **Bug fix — clip-path on final CTA bands.** Testing-agent iteration_14 caught a critical bug: the final CTA `<section>` blocks in both `IndustriesServed.jsx` and `IndustryPage.jsx` were raw `<section>` tags without `useInViewClass`, so `.is-in` never landed and every `.wipe` descendant (eyebrow, H2, lede, **and both CTA buttons**) stayed clipped to 0-width and unclickable. Fixed by adding `const ctaRef = useRef(null); useInViewClass(ctaRef)` and `ref={ctaRef}` to both sections. Click verification on `hub-cta-contact`, `hub-cta-cases`, `industry-cta-cases-agribusiness` now passes.

**Verification:**
- Testing agent iteration_14: hub + 14 industry pages + 5 discipline pages all render correctly, all data-testids present, back link navigation works, unknown-slug redirect works, global Results > What We Build dropdown still routes to the 5 disciplines, zero console errors.
- Post-fix self-test (Playwright): Both hub CTAs and a sample industry-page CTA navigate to `/contact` / `/case-studies` as expected.

**Files touched:**
- `/app/frontend/src/App.js`
- `/app/frontend/src/components/IndustryPage.jsx`
- `/app/frontend/src/pages/IndustriesServed.jsx`
- `/app/frontend/src/pages/OperationalDiscipline.jsx`
- `/app/frontend/src/pages/FrontlineLeadership.jsx`
- `/app/frontend/src/pages/EquipmentReliability.jsx`
- `/app/frontend/src/pages/WorkforceCapability.jsx`
- `/app/frontend/src/pages/DailyAccountability.jsx`

**Backlog / next:**
- P1: Hero images for the 5 Discipline pages — uncomment the `<img>` + `.brief-page-hero-wash` blocks once the compressed JPGs (~200KB, 1920x1080) land at `/uploads/{slug}-hero-bg.jpg`. Discipline hero copy (lede + body sections) when the client delivers it.
- P1: Decide whether Leadership + History pages get hero images (TBD by user).
- P2: Insights archive search/filtering.
- P2: Roll the remaining 66 case studies into `caseStudies.js` and route them.
- P2: Contact form backend endpoint (UI-only today).
- P2: Defensive guard — add a non-clipped fallback to `.wipe` so a missing `useInViewClass` never silently hides content (audit other brief-doc pages first).


## Implemented (2026-02-29) — Equipment Reliability page (Discipline 3 of 5, full build)

Built `/equipment-reliability` end-to-end against the user-supplied copy draft (`POWERS_Equipment_Reliability_Page_Full_Draft.docx`) and hero video (`Equipment Reliability Page Hero Video.mp4`). User explicitly warned against the page feeling templated — chassis is shared with `/operational-discipline` and `/frontline-leadership`, but three new visual primitives carry the bulk of the argument and read as fresh:

- **`.er-margin-gauge`** — Horizontal stacked bar visualising the maintenance-spend gap (world-class 1.5–2.5% vs reactive 4–6% RAV) with the recoverable margin band in gold. Animates `clip-path` open from left when the row enters the viewport.
- **`.er-amp-duo`** — Two-channel parallel diagram (Tactical || Technical) flanking a central navy "AMP / PROGRAM" axis with a gold connector line. Replaces the vertical stack diagrams used on OD/FL.
- **`.er-phase-timeline`** — Vertical numbered timeline with a left gold rail, circular phase nodes (italic 01/02/03), and gantt-style content blocks with a gold left edge. Replaces the horizontal dot rail used on FL.

**Other elements:**
- Hero `<video>` with .webm + .mp4 sources and a duotone (navy → paper) ghosted+grit poster generated via PIL pipeline (FFmpeg reinstalled in container after dropping out, then 720p H.264 + VP9 + poster pulled at frame 30 → /uploads/videos/equipment-reliability-hero.{mp4,webm} + equipment-reliability-hero-poster.jpg).
- Shared CollapseCard primitive reused for both the 6-card cost grid and the 5-card gain grid (page-scoped `.er-collapse-*` selectors).
- `.er-results-strip` — A documented-results stat strip at the close of Row 6 with three gold serif figures (47%, 85%, $M+).
- Cross-discipline lock-in mosaic with the current discipline (03) in the anchor card and four sister cards routing to the other disciplines.
- Navy CTA band with "Recover the Margin You're Already Paying For" eyebrow.

**Verification:**
- Testing agent iteration_16: 69/69 assertions passed across page load, hero video, all three new primitives, accordion behaviour, mosaic routing, CTA links, responsive collapse at 1920/768/375, and cross-discipline regression (OD + FL videos still autoplay). Zero console errors. No bugs. No retest needed.

**Files touched:**
- `/app/frontend/src/pages/EquipmentReliability.jsx` (replaced 46-line stub with 1256-line full build)
- `/app/frontend/public/uploads/videos/equipment-reliability-hero.mp4`
- `/app/frontend/public/uploads/videos/equipment-reliability-hero.webm`
- `/app/frontend/public/uploads/videos/equipment-reliability-hero-poster.jpg`

**Backlog / next:**
- P1: Build `/workforce-capability` (Discipline 4) once user delivers copy + hero video.
- P1: Build `/daily-accountability` (Discipline 5) once user delivers copy + hero video.
- P2: Gravity Forms headless integration for `/contact` (currently placeholder).
- P2: SEOPress WP REST integration for headless metadata at launch.
- P2: Lift `robots.txt` Disallow when site goes live.
- P3 (refactor): Discipline pages are now 900–1250 lines each, mostly inlined `<style>` CSS. Consider extracting per-page CSS into co-located `.module.css` files. Defer until after all 5 disciplines ship to avoid churn.


## Implemented (2026-02-29) — Workforce Capability page (Discipline 4 of 5, full build)

Built `/workforce-capability` end-to-end against the user-supplied copy draft (`POWERS_Workforce_Capability_Page_Full_Draft.docx`) and hero video. Two new signature primitives introduced so the page reads as a fresh chapter rather than a re-skin of OD/FL/ER:

- **`.wc-mosaic`** — 5-tile asymmetric magazine layout on a 12-col grid. Row 1: tile 01 (cols 1–7, wide) + 02 (cols 8–12, narrow). Row 2: tile 03 spans cols 1–12 full width. Row 3: tile 04 (cols 1–5, narrow) + 05 (cols 6–12, wide) — mirrored ratio around row 2, creating an ABA-with-reversed-A composition. Visualises "five interlocking capability streams". Tiles 02 + 04 use PAPER_DEEP backgrounds for subtle texture variation.
- **`.wc-chevron-strip`** — Horizontal 4-phase process strip with gold SVG ">" chevron separators between cards. Each card has a gold left-edge accent, mono PHASE 0X eyebrow, bold verb title, body text. Distinct from FL's horizontal dot rail and ER's vertical timeline.

Plus a 5-cell `.wc-stat-ribbon` (3.8M / 1.9M / 92% / 1·3 / 2.5y) for the Reframe row, two pull quotes, 6-card collapsible cost grid, 5-card collapsible gain grid, lock-in mosaic with 04 anchored as the current discipline, navy CTA band.

Hero pipeline: FFmpeg 720p mp4 + VP9 webm + duotone PIL poster at `/uploads/videos/workforce-capability-hero.{mp4,webm,jpg}`.

**Testing**: iteration_17 — 110+ assertions, 99% pass. Caught one layout inversion (row 3 of the mosaic), now fixed via 12-col explicit grid-column spans. Verified at 1920/1440/768/375. Cross-discipline regression clean. Zero console errors. Hero fits 100vh at 1366×768 + 1440×900.

**Files touched:**
- `/app/frontend/src/pages/WorkforceCapability.jsx` (replaced 46-line stub with 939-line full build)
- `/app/frontend/public/uploads/videos/workforce-capability-hero.{mp4,webm,jpg}`
- (App.js + BriefHeader nav routing was already wired in earlier passes)

**Backlog / next:**
- P1: Build `/daily-accountability` (Discipline 5, the final chapter) once user delivers copy + hero video. Signature primitive candidates: cadence rhythm chart, pulse/heartbeat trace, or operational tempo grid.
- P2: Gravity Forms headless integration for `/contact`.
- P2: SEOPress WP REST integration at launch.
- P2: Lift `robots.txt` Disallow when site goes live.
- P3 (refactor): Extract page-scoped CSS from the 5 discipline pages into co-located `.module.css` files once all 5 ship.

## Implemented (2026-02-29) — Daily Accountability page (Discipline 5 of 5 — FINAL chapter)

The fifth and final discipline page. Two new signature primitives:

- **`.da-cadence-loop`** — Serpentine 3+3 grid. Row 1 reads left→right (layers 01-02-03). Row 2 reads right→left (layers 06-05-04 in display order). A solid gold arc on the right of row 1 curves down to row 2; a dashed gold arc on the left of row 2 curves back up to row 1, visualising the closed daily loop. Italic gold "A daily loop, run every shift." label centered below. Distinct from OD's vertical stack, FL's 2x2 quadrant, ER's dual-channel, WC's asymmetric mosaic.

- **`.da-dps-band`** — Unique product-showcase row only Daily Accountability has. Navy band with the DPS positioning, a gold-accented headline, and a 2x2 grid of 4 feature cards (DPS Dashboard / Daily Schedule Control & Startup Scorecard / Downtime Tracker & Action Item Log / Built-in Messaging & Knowledge Hub) with gold-bordered translucent backgrounds. Gold "Learn more about DPS →" CTA at the bottom.

Plus 6-card cost grid, 4-card phase grid (gold top accents), lock-in mosaic with 05 anchored on the far right (DA closes the circuit), navy CTA band.

Hero pipeline: FFmpeg 720p mp4 + VP9 webm + duotone PIL poster.

**Testing**: iteration_18 — 12/12 spec items verified, 100% pass, zero bugs found. Hero fits 100vh at 1440×900 exactly + 1366×768 within 1px. Cross-discipline regression confirmed via lock-in mosaic to OD/FL/ER/WC. Page-transition pulse observed. Zero console errors.

---

## 🏛 THE FIVE DISCIPLINES — STRUCTURALLY COMPLETE

All five chapter pages are now built, validated, and individually styled with a unique signature primitive while sharing the Operating Brief family chassis:

| # | Route | Hero | Signature primitive (Row 3) | "How we build" |
|---|---|---|---|---|
| 01 | `/operational-discipline` | Video | Vertical 6-layer MOS stack | 5-step approach |
| 02 | `/frontline-leadership` | Video | 2×2 quadrant + central role node | 4-dot horizontal rail |
| 03 | `/equipment-reliability` | Video | Dual-channel + central AMP axis | 3-step vertical timeline |
| 04 | `/workforce-capability` | Video | Asymmetric 5-tile mosaic (12-col grid) | 4-card chevron strip |
| 05 | `/daily-accountability` | Video | Serpentine 6-card cadence loop with return arcs | 4-card phase grid (gold top accents) |

DA additionally has the unique navy **DPS Modern Enabler** band — a product showcase row not present anywhere else.

The lock-in mosaic on every discipline now resolves all 5 routes — the cross-link circuit across the whole site is closed.

**Backlog / next:**
- P2: Wire `/contact` form to Gravity Forms via WP REST endpoint at launch (form is currently MOCKED)
- P2: SEOPress WP REST integration for headless metadata at launch
- P2: Lift `robots.txt` Disallow when site goes live
- P3 refactor: Extract page-scoped CSS from the 5 discipline pages + Contact into co-located `.module.css` files (now that all 5 are shipped, this is the right moment for the de-dup pass — cost grid, lock-in mosaic, pull quote, and CTA band CSS repeats across 5 files)


## 2026-06-29 — White-Hat SEO Audit Pass (Phase A — pre-Insights Hub)

**User direction:** Comb the site for "white hat best practice top tier website build standards" before the Insights Hub build. Audit confirmed the previous handoff's flagged issues (missing `alt`, missing `rel="noopener noreferrer"`) were **false positives** — the prior bash scripts used single-line regex that didn't match multi-line JSX attributes. Actual code was already compliant.

**What this pass shipped (real white-hat foundations the site was missing):**

- **`<SEO />` component** at `/app/frontend/src/components/SEO.jsx` — single source of truth for every page's `<title>`, `<meta name="description">`, `<link rel="canonical">`, full Open Graph stack (og:title / og:description / og:url / og:type / og:image / og:image:alt / og:site_name / og:locale), and Twitter Card stack (twitter:card / twitter:title / twitter:description / twitter:image / twitter:image:alt / twitter:site). No external deps — uses the same direct DOM-upsert pattern the codebase already used for `document.title`. Replaces the `useEffect(() => { document.title = ... })` pattern across the site.
- **Site metadata constants** at `/app/frontend/src/lib/siteMeta.js` — SITE_NAME, SITE_URL (env-driven, defaults to `https://thepowerscompany.com`), DEFAULT_OG_IMAGE, DEFAULT_DESCRIPTION, TWITTER_HANDLE, `absoluteUrl()` helper.
- **Wired `<SEO />` into 20 pages**: Home, Approach, DiscoveryProcess, IndustriesServed, CaseStudies, CaseStudyDefenseAerospaceOTD, OperationalDiscipline, FrontlineLeadership, EquipmentReliability, WorkforceCapability, DailyAccountability, History, Leadership, Careers, Contact, NotFound, CompanyNews, Insights — plus dynamic `LeaderBio` (6 routes) and `IndustryPage` (14 routes). Every page now has a unique title + tailored 150–160 char meta description authored for SEO.
- **JSON-LD Organization + WebSite schema** added site-wide in `public/index.html`. Captures: name, alternateName, URL, logo, image, description, foundingDate (2004), founder (Randall Powers), corporate address (1801 Peachtree Street NE, Suite 200, Atlanta GA 30309), contactPoint (+1-678-971-4711, info@thepowerscompany.com), sameAs (LinkedIn). Verified live: `JSONLD: 1` per page.
- **Open Graph + Twitter Card defaults** added to `public/index.html` so the static index also has correct fallback metadata if the SPA hasn't hydrated yet (important for social-card scrapers that don't run JS).
- **`public/sitemap.xml`** built — 37 URLs covering home + 5 disciplines + 6 about-tree pages + 14 industries + 6 leader bios + 1 case study + insights/news/contact. Pre-built so it's ready to expose at launch.
- **`public/robots.txt`** rewritten — staging block (`Disallow: /`) stays active for the Netlify preview, with the LAUNCH-MODE block commented inline ready to swap at go-live. Cloudflare auto-appends its AI-crawler managed block in front; our directives sit underneath.
- **`public/index.html` launch-toggle comment block** — explicit ╔═══╗ box above the `noindex, nofollow` metas listing the three steps to flip the site to launch mode (delete meta robots, replace robots.txt, confirm sitemap).
- **Theme color** corrected from generic `#000000` to brand navy `#0d2442`.

**Verification (Playwright, 1920×800):**
- `/approach` — title, description, canonical, og:url, twitter:card all unique + correct.
- `/industries-served/aerospace-defense` — dynamic title "Aerospace & Defense Operations Consulting | POWERS", canonical resolves to `https://thepowerscompany.com/industries-served/aerospace-defense`, single H1.
- `/` — title "POWERS — Manufacturing Operations Management Consulting", canonical `https://thepowerscompany.com/`.
- `/leadership/sean-hart` — dynamic title "Sean Hart — Chief Executive Officer and Managing Partner | POWERS".
- JSON-LD Organization schema present in DOM on every route (count: 1).
- `/sitemap.xml` served, 37 `<url>` entries.
- `/robots.txt` served with staging Disallow active + launch-mode block commented.

**What this gives the launch checklist:**
- One toggle (3 lines in 2 files) flips the entire site from staging-blocked to launch-indexable, with sitemap + structured data + full OG/Twitter card support already in place. No scrambling at go-live.

**Files touched:**
- NEW: `/app/frontend/src/components/SEO.jsx`
- NEW: `/app/frontend/src/lib/siteMeta.js`
- NEW: `/app/frontend/public/sitemap.xml`
- REWRITE: `/app/frontend/public/robots.txt`, `/app/frontend/public/index.html`
- EDIT (SEO wiring): 19 page files + 2 dynamic-route components

**Still open (Backlog, unchanged):**
- P0: Build the **Insights Hub** page (awaiting copy/assets from user).
- P2 (Launch): Gravity Forms API integration for `/contact`.
- P2 (Launch): SEOPress WP REST integration if the user wants per-page metadata managed in WordPress instead of in code.
- P2: Refresh the remaining 66 case studies into the locked detail template — sitemap.xml entries need fanning out as they land.
- P3: Extract repeated discipline-page CSS into shared `.module.css` files.
