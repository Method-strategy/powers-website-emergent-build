# Architecture

## Stack

- **React 19** (CRA-based — `react-scripts@5.0.1`)
- **React Router 7** (`react-router-dom@7.5.1`)
- **GSAP 3** (only used by `ReadingProgress` in `HomeV3.jsx`; the major animations are vanilla canvas + RAF, not GSAP)
- **Lucide React** for icons
- **shadcn/ui** components present at `/components/ui/*` but **the homepage and chrome do not depend on them** — they're available for future page builds (forms, modals, etc.)
- Backend: FastAPI + MongoDB exists at `/app/backend` but the frontend currently makes zero API calls. All content is hardcoded.

## Top-level file tree

```
/app/frontend/src/
├── App.js                          # Router root — all routes here
├── index.js                        # ReactDOM.render entry
├── components/
│   ├── Layout.jsx                  # Standard pages: <SiteHeader/> + <Outlet/> + <SiteFooter/>
│   ├── HomeLayout.jsx              # Homepage only — bare outlet, header/footer inline in HomeV3
│   ├── SiteHeader.jsx              # Canonical chrome header (non-home pages)
│   ├── SiteFooter.jsx              # Canonical chrome footer (non-home pages)
│   ├── LegacyPage.jsx              # Wraps raw HTML/CSS/JS strings inside a React shell
│   ├── PowersMetrics.jsx           # Metrics row used on homepage (rolling counter)
│   ├── DisciplinesAndPressureExhibit.jsx   # ⭐ Homepage sections 3 + 4 (foundation + swarm)
│   ├── caseStudy/                  # Case study templates
│   └── ui/                         # shadcn primitives (unused on homepage)
├── pages/
│   ├── HomeV3.jsx                  # ⭐ PRIMARY HOMEPAGE — all other Home* are legacy
│   ├── Home.jsx, HomeV2.jsx        # Earlier homepage iterations, kept at /v1 and /v2
│   ├── OperationalDiscipline.jsx   # ⭐ Five expertise pages — currently hero-only skeletons
│   ├── FrontlineLeadership.jsx     #   "
│   ├── EquipmentReliability.jsx    #   "
│   ├── WorkforceCapability.jsx     #   "
│   ├── DailyAccountability.jsx     #   "
│   ├── Approach.jsx, DiscoveryProcess.jsx, IndustriesServed.jsx,
│   │   Careers.jsx, History.jsx, Leadership.jsx, CompanyNews.jsx,
│   │   Insights.jsx, Contact.jsx
│   │       └── These are all <LegacyPage> wrappers around imported HTML.
│   ├── Bio*.jsx                    # 6 leadership bio pages (Randall, Sean, Saul, Ken, Justin, Kevin)
│   ├── CaseStudies.jsx             # Library landing
│   ├── CaseStudyDefenseAerospaceOTD.jsx  # First fully-built case study
│   └── NotFound.jsx                # 404
├── data/
│   └── caseStudies.js              # Case study metadata array (only 1 of 67 entries built)
├── lib/
│   ├── routes.js                   # ⭐ legacy .html → React route map. ALL nav links route through toRoute()
│   ├── typo.js                     # Smart-quote / em-dash typographic substitution
│   ├── navHooks.js                 # Reusable nav state hooks (hover intent, etc.)
│   └── utils.js                    # shadcn cn() helper
└── hooks/
    └── use-toast.js                # shadcn toast hook (currently unused)
```

## Routing strategy

All routes declared in `App.js`. Two layouts:

| Layout | Used by | Reason |
|---|---|---|
| `<HomeLayout/>` | `/`, `/v1`, `/v2`, `/v3` | Homepage has its own bespoke inline header/footer (legacy reason — `HomeV3` was built as a self-contained prototype) |
| `<Layout/>` | Every other route | Wraps `<SiteHeader/>` + `<Outlet/>` + `<SiteFooter/>` — the canonical chrome |

⚠️ **In production you may want to consolidate to a single layout.** The dual-layout split is a vestige of the homepage being prototyped independently. The header inside `HomeV3.jsx` (`<Header/>` at line 911) is functionally equivalent to `<SiteHeader/>` — both can render the same menu data.

## Legacy `.html` link handling

The site originated as static HTML files. Every nav reference uses `.html` slugs (e.g., `operational-discipline.html`). Rather than rewriting every link, `/lib/routes.js` provides:

```js
toRoute('operational-discipline.html')         // → '/operational-discipline'
toRoute('operational-readiness.html')          // → '/operational-discipline'  (alias)
toRoute('https://...')                         // → unchanged
toRoute('#anchor')                             // → unchanged
toRoute('unknown.html')                        // → 'unknown.html' (pass-through)
```

Every `<Link to={...}>` and every nav-data object that references a route must pass through `toRoute()`. Don't hardcode React paths in markup — keep the indirection so future slug changes are one-line edits.

## Important component groupings

### The "homepage section" pattern

Each homepage row in `HomeV3.jsx` is its own top-level function component (`Hero`, `SectionDifferentApproach`, `SectionHowWeWork`, `SectionWhereWeWork`, `SectionResultsEntryPoint`, `SectionInsightsEntryPoint`, `FooterCTA`). They're composed in order inside the `HomeV3()` return. Each section is independently swappable.

Sections 3 + 4 (the choreographed pair) live in their own file: `/components/DisciplinesAndPressureExhibit.jsx`. They were extracted because of their size (~1100 lines) and because they're tightly coupled to each other via the core-travel illusion. See `SECTION_CHOREOGRAPHY.md`.

### The `LegacyPage` pattern

Static pages that haven't been ported to native React yet are wrapped in `<LegacyPage css={...} html={...} script={...} />`. This component:
- Renders the HTML string as `dangerouslySetInnerHTML`
- Injects the CSS into a scoped `<style>` block
- Runs the script after mount
- Intercepts internal `<a>` clicks and routes them through `toRoute()` for SPA navigation

This is a **temporary scaffold**. Native React conversions are tracked in PRD as P1 work.

## Build outputs

- Frontend builds with `yarn build` → `/app/frontend/build/`
- No SSR. CRA default CSR.
- For Faust.js: the existing components are pure functions of their data; they should port cleanly to Faust's React-based templating with minimal modification beyond swapping hardcoded content for GraphQL query results.

## What lives where (cheat sheet)

| Need | Path |
|---|---|
| Add a new route | `App.js` + `lib/routes.js` |
| Change a design token | `pages/HomeV3.jsx` line 247 (`C`) and line 317 (`S`) |
| Touch the homepage swarm/foundation animations | `components/DisciplinesAndPressureExhibit.jsx` |
| Touch the hero swarm | `pages/HomeV3.jsx` function `Hero()` line 1117 |
| Change the menu | `pages/HomeV3.jsx` `<Header/>` AND `components/SiteHeader.jsx` (two copies — see ARCHITECTURE quirks) |
| Swap a font | `pages/HomeV3.jsx` `V3_FONT_LINKS` constant near top + the SANS/SERIF/MONO constants in both `HomeV3.jsx` and `DisciplinesAndPressureExhibit.jsx` |
| Replace the video | See `ASSET_MANIFEST.md` |

## Architecture quirks to know

1. **Two copies of menu data.** Both `HomeV3.jsx` `<Header/>` and `SiteHeader.jsx` define the same mega-menu. Edits must happen in both. This was deliberate during prototyping; in production these should consolidate to a single `<SiteHeader/>` consumed by both layouts.

2. **Inline CSS-in-JS for most styles.** No styled-components, no Emotion, no Tailwind (despite Tailwind being in package.json — it's there for shadcn's primitives, not used on the homepage). Sections use a combination of inline `style={{}}` objects and `<style>` tags for animations/keyframes that can't be inlined.

3. **Token spreading.** `S` (sizing/layout) and `C` (colors) constants are defined once at the top of `HomeV3.jsx` and referenced everywhere. They're also re-defined inside `DisciplinesAndPressureExhibit.jsx` for portability. **If you change a token, change both.** A future consolidation should move both into `/lib/tokens.js`.

4. **The case study library is data-driven.** `/data/caseStudies.js` is the source. Currently has 1 fully-built case study; the brief mentions 66 more incoming.

5. **No global state.** No Redux, Zustand, Context. Each section manages its own animation state via `useRef` + `useEffect`. Page state lives in the URL.
