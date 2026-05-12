# POWERS Website — Migration Handoff for Faust.js + WP Engine

**Audience:** the developer building the production hosting environment (Faust.js on WP Engine's Headless Platform, with WordPress + WPGraphQL backing the content layer).

**Status of this codebase:** technology test / prototype. Visually locked to `/app/CLAUDE.md` (the design contract — read that first). The React tree is production-quality for the patterns it demonstrates; specific implementation choices may need adapting to the Faust template model.

---

## TL;DR — what you're inheriting

A React 19 SPA built on Create React App + react-router-dom v7 that ports an approved, locked static HTML/CSS marketing site (24 source pages) into a real componentized React tree. Two architectural patterns coexist:

1. **Static content pages** (Approach, History, Leadership, bios, etc.) render via a `LegacyPage` component that injects extracted HTML + CSS via `dangerouslySetInnerHTML`. This was the right call for a prototype — it preserves 1:1 visual fidelity from the locked HTML with zero risk of design drift. **In Faust, port these into proper page templates.** See "Migration plan" §3 below.
2. **Case-study system** (library + detail + print PDF) has been promoted to a *real* React architecture with a single canonical data file. This is your migration template. The data file's shape mirrors the WPGraphQL/ACF response shape you'll define in WordPress — swap the static export for a query and the component tree continues to render unchanged. See "Migration plan" §4 below.

The homepage (`/`) is a special case — its custom video-overlay hero and bespoke section components live as a single React module ported verbatim from the source's inline `<script type="text/babel">` block. Treat it as another lossless port; preserve its DOM and CSS.

---

## Repo layout

```
/app/
├── CLAUDE.md                    ← Locked design contract. Source of truth.
├── HANDOFF.md                   ← This file.
├── memory/
│   ├── PRD.md                   ← Architecture state log of the prototype.
│   └── test_credentials.md      ← Empty (no auth).
├── netlify.toml                 ← SPA fallback for the prototype on Netlify.
│
├── frontend/
│   ├── public/
│   │   ├── _redirects           ← Netlify SPA fallback (`/* → /index.html`).
│   │   ├── index.html           ← CRA shell. Loads Adobe Typekit + Tabler Icons.
│   │   └── uploads/             ← All static assets: logos, headshots, PDFs.
│   └── src/
│       ├── App.js               ← React Router route map (22 routes).
│       ├── index.css            ← Global tokens + print suppression for site chrome.
│       ├── components/
│       │   ├── SiteHeader.jsx   ← Canonical port of legacy site-nav.jsx. Mega menus, mobile drawer.
│       │   ├── SiteFooter.jsx   ← Footer with nav + contact + legal.
│       │   ├── Layout.jsx       ← <SiteHeader/> + <Outlet/> + <SiteFooter/> for internal pages.
│       │   ├── HomeLayout.jsx   ← Bare wrapper for the homepage (which has its own inline chrome).
│       │   ├── LegacyPage.jsx   ← Renders extracted HTML+CSS+inline-JS verbatim.
│       │   └── caseStudy/
│       │       ├── CaseStudyHero.jsx
│       │       ├── CaseStudyBody.jsx
│       │       ├── CaseStudyPrintDoc.jsx
│       │       ├── CaseStudyCard.jsx
│       │       ├── caseStudyStyles.js          (locked CSS, verbatim)
│       │       └── caseStudiesLibraryStyles.js (locked CSS, verbatim)
│       ├── data/
│       │   └── caseStudies.js   ← CANONICAL data source. Mirrors WPGraphQL/ACF shape.
│       ├── lib/
│       │   ├── routes.js        ← `HTML_TO_ROUTE` map for legacy .html → /slug.
│       │   └── navHooks.js      ← Legacy link interceptor + scroll restoration.
│       └── pages/
│           ├── Home.jsx                    (lossless port of index.html's inline JSX)
│           ├── Approach.jsx, History.jsx, etc.   (LegacyPage wrappers; 20+ pages)
│           ├── CaseStudies.jsx             (real React; reads from data/caseStudies.js)
│           └── CaseStudyDefenseAerospaceOTD.jsx  (real React; thin shell composing the 3 case-study components)
│
├── backend/                     ← Default CRA FastAPI scaffold. Untouched. Discard in production.
│
└── scripts/
    ├── convert_legacy_pages.py  ← Extracts HTML/CSS/JS from source .html files → React modules.
    └── convert_homepage.py      ← Converts index.html's inline <script type="text/babel"> → Home.jsx.
```

---

## What survives the Faust migration vs. what gets replaced

### Survives (port as-is)

- **`/app/CLAUDE.md`** — the locked design contract. Don't paraphrase or summarize it; honor it line-for-line.
- **`/app/frontend/public/uploads/`** — every image, PDF, and logo. Move these into WordPress media library or keep them in `/public/uploads/` under Faust. Paths in the codebase are absolute (`/uploads/...`).
- **`/app/frontend/src/data/caseStudies.js`** — the schema is what survives. Use the shape as your ACF + WPGraphQL contract. The static data goes away (replaced by a query) but the field names stay.
- **`/app/frontend/src/components/caseStudy/`** — all 4 components (`CaseStudyHero`, `CaseStudyBody`, `CaseStudyPrintDoc`, `CaseStudyCard`) port directly. They are pure functions of a `data` prop. Drop into Faust templates as-is.
- **`/app/frontend/src/components/caseStudy/caseStudyStyles.js`** and `caseStudiesLibraryStyles.js` — locked CSS, ship to Faust unchanged.
- **`/app/frontend/src/components/SiteHeader.jsx`** + **`SiteFooter.jsx`** — the navigation map inside these is hard-coded today. Recommend converting that map to a WP menu so the marketing team can manage links; the React component itself can stay otherwise unchanged.
- **`/app/frontend/src/pages/Home.jsx`** — port as a Faust homepage template. Lossless. Don't refactor.
- **Tabler Icons (`@tabler/icons-webfont@3.34.0`) + Adobe Typekit (`dhv8kja`)** — keep both CDN links in Faust's `<head>`. They're load-bearing for hero stat tiles, result cards, and Proxima Nova.

### Gets replaced

- **`/app/scripts/convert_legacy_pages.py`** and **`convert_homepage.py`** — prototype-only tooling. Discard.
- **`/app/frontend/src/components/LegacyPage.jsx`** + the 20 `LegacyPage` wrapper modules under `/app/frontend/src/pages/` (Approach, History, Leadership, all bios, etc.) — these are the right shortcut for a prototype, not a production pattern. Recommend porting each into a proper Faust template using the locked HTML + CSS as the spec.
- **`/app/frontend/src/lib/navHooks.js`'s `useLegacyLinkIntercept`** — only exists because `LegacyPage` renders raw HTML. Once content is in proper templates with real `<Link>` components, this hook is unnecessary.
- **`/app/backend/`** — default FastAPI scaffold. Discard.
- **`/app/netlify.toml`** and **`/app/frontend/public/_redirects`** — prototype hosting only. Discard.
- **`/app/memory/PRD.md`** — prototype session log. Reference if useful, then discard.

---

## Migration plan, in order

### 1. Stand up the locked design contract first

Read `/app/CLAUDE.md` end-to-end before writing any Faust code. It contains:

- Hero Spec (locked v0.1.0) — every internal-page hero conforms to this
- Page index with content status (Live vs. Pending)
- Case Study Detail Template (LOCKED v0.2.1) — what we built `CaseStudyHero` + `CaseStudyBody` + `CaseStudyPrintDoc` against
- Color tokens, spacing scale, typography scale (Adobe Typekit Proxima Nova)
- Standing copy/design rules (sentence-case H1s on case-study heroes; `|` separator in case-study eyebrows; `text-wrap: balance` site-wide; etc.)

Anything you build that contradicts CLAUDE.md should be flagged for the design owner, not silently corrected.

### 2. Wire up the hosting environment

- Faust.js + Next.js on WP Engine's Headless Platform.
- WPGraphQL + ACF on the WordPress side.
- Confirm the Typekit and Tabler Icons CDN links survive in your Faust `<head>` (currently in `/app/frontend/public/index.html`).
- Confirm `<title>` and `<meta name="description">` get set per page (the React prototype does this via `useEffect`; in Faust, use `<Head>`).

### 3. Port the static content pages

For each page in `/app/frontend/src/pages/` that uses `LegacyPage` — Approach, Discovery Process, History, Leadership, Careers, Insights, Contact, Industries Served, the 4 Expertise pages, Company News, and the 6 bio pages — recreate them as proper Faust page templates. Use the rendered HTML in the prototype as your visual spec (or use the corresponding source `.html` file if your team still has the original ZIP). Don't worry about preserving the `LegacyPage` runtime pattern — that was a prototype shortcut.

The page-by-page content status, hero structure, and any locked element specs are documented in CLAUDE.md.

### 4. Port the case-study system (the important one)

This is the part of the prototype built to survive the migration. The data file `/app/frontend/src/data/caseStudies.js` is shaped exactly as your WPGraphQL response should be.

**ACF field group** — author one `case_study` custom post type with these fields (taken from the prototype's canonical entry for Defense & Aerospace OTD, which is the locked v0.2.1 template):

```
Post fields
  num                  (number)        — sequential case # (display only)
  date                 (date)          — published/dated date

Top-level ACF fields
  industry             (taxonomy term, single, string)
  headlineResult       (text)          — the sentence-case H1
  subtitle             (text)          — italic descriptor under H1
  summary              (textarea)      — Executive Brief body
  serviceLines         (taxonomy multi, string[])
  challenges           (taxonomy multi, string[])      — used by library facet
  resultSummary        (text)          — library-card stat snippet

ACF Repeater: statTiles
  icon                 (text)          — Tabler webfont key, e.g. "target-arrow"
  value                (text)          — the big number, e.g. "59%"
  label                (textarea)      — newline-separated label, max 2 lines

ACF Group: situation
  title                (text)          — section H2 (sentence case)
  body                 (repeater of textareas) — one entry per paragraph

ACF Group: diagnosis
  title                (text)
  items                (repeater) → { title (text), body (textarea) }

ACF Group: powersActions
  title                (text)
  body                 (repeater of textareas) — one entry per paragraph

ACF Group: fullResult
  title                (text)
  stats                (repeater) → { icon, value, label, body }
```

**WPGraphQL query shape:**

```graphql
query CaseStudyBySlug($slug: ID!) {
  caseStudy(id: $slug, idType: SLUG) {
    slug
    num
    date
    industry
    headlineResult
    subtitle
    summary
    serviceLines
    challenges
    resultSummary
    statTiles { icon value label }
    situation {
      title
      body
    }
    diagnosis {
      title
      items { title body }
    }
    powersActions {
      title
      body
    }
    fullResult {
      title
      stats { icon value label body }
    }
  }
}
```

**Faust template** for `/case-studies/[slug].js`:

```jsx
import CaseStudyHero      from '@/components/caseStudy/CaseStudyHero';
import CaseStudyBody      from '@/components/caseStudy/CaseStudyBody';
import CaseStudyPrintDoc  from '@/components/caseStudy/CaseStudyPrintDoc';
import { caseStudyStyles } from '@/components/caseStudy/caseStudyStyles';

export default function CaseStudyTemplate(props) {
  const data = props.data?.caseStudy;
  if (!data) return null;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: caseStudyStyles }} />
      <CaseStudyHero     data={data} />
      <CaseStudyBody     data={data} />
      <CaseStudyPrintDoc data={data} />
    </>
  );
}

CaseStudyTemplate.query = gql`...query above...`;
```

That's the whole detail page. All four components are pure functions of `data`; they don't need ANY changes to consume WordPress data instead of the static file.

**Library page** (`/case-studies`): the prototype's `/app/frontend/src/pages/CaseStudies.jsx` uses `useMemo` + `useState` for filtering/search/sort against the full dataset. In Faust, fetch all `caseStudies { nodes { ... } }` at build/SSR time and feed the same array into the same filter/search logic. Reuse `CaseStudyCard` unchanged.

### 5. Port the chrome

- `SiteHeader.jsx` and `SiteFooter.jsx` lift cleanly. The hard-coded nav map inside `SiteHeader` should become a WP menu fetched via WPGraphQL (the menu structure is documented in CLAUDE.md's site-architecture section).
- The legacy link intercept hook (`useLegacyLinkIntercept`) can be deleted in production — once every page is a proper Faust template, all internal links can be `next/link` or `<Link>` directly.

### 6. Print PDF

The Defense & Aerospace detail page renders a 2-page printable PDF via `window.print()` + `<CaseStudyPrintDoc />` + the locked `@media print` block inside `caseStudyStyles.js`. **Two things to preserve in Faust:**

1. The `@media print` rules in `caseStudyStyles.js` reference `.screen-only` and `.print-doc`. Those class names must continue to apply across screen and print views.
2. The shared `SiteHeader` and `SiteFooter` must be hidden in print. The prototype does this via a global rule in `/app/frontend/src/index.css`:

   ```css
   @media print {
     [data-testid="site-header"],
     [data-testid="site-footer"] { display: none !important; }
     body.pw-has-fixed-header { padding-top: 0 !important; }
   }
   ```

   Carry that rule into Faust's global stylesheet, or hide the header/footer based on a route guard. Either approach works.

### 7. SEO and metadata

The prototype sets `<title>` and `<meta name="description">` per route via `useEffect`. In Faust, use `<Head>` from Next.js. CLAUDE.md doesn't specify per-page meta copy yet — surface that gap to the design owner during your build.

### 8. Routing

The slug map is `/app/frontend/src/lib/routes.js` (HTML_TO_ROUTE). The 22 routes from the prototype map to Faust pages 1:1. If you want to preserve the legacy `.html` URLs (e.g. for SEO continuity), add WordPress rewrite rules; otherwise the clean slugs are already what the SEO-friendlier final URLs should look like.

---

## Open items / not yet built

These are flagged in `PRD.md` and remain unresolved by the prototype:

- **Contact form submission endpoint.** The form UI exists in `pages/Contact.jsx`; no backend. Decide whether to wire to a WP form plugin (Gravity Forms / WPForms / Formidable), a Faust API route, or a third party (Resend, Postmark, HubSpot). User explicitly chose UI-only for the prototype.
- **Search modal.** The header has a search icon (`data-testid="header-search-btn"`). It's a placeholder per CLAUDE.md. In Faust, wire to WordPress full-text search or a hosted index.
- **66 of 68 case studies are external links** (to thepowerscompany.com PDFs). Only Defense & Aerospace has full detail. As cases are migrated into the new template (per CLAUDE.md's case-study refresh plan), each entry's `externalUrl` becomes a full data object with `situation`/`diagnosis`/`powersActions`/`fullResult` filled in. The library logic auto-detects which is which based on the presence of `internalRoute`.
- **Skeleton content pages.** Operational Readiness, Frontline Leadership, Equipment Reliability, Supply Chain, Industries Served, Insights, Company News all have hero sections only. CLAUDE.md marks them "Pending content."
- **Placeholders flagged in CLAUDE.md v0.1.15** — history Section 3 and careers Section 2 await real imagery.

---

## Verification (when you're ready to hand off back to the design owner)

The prototype passes these checks (regression-tested in `/app/test_reports/iteration_3.json`):

- 22 routes render with the canonical chrome (homepage uses its own inline chrome — intentional).
- Library page renders 68 case-study cards; filters (industry / service type / challenge / sort) all work; search is debounced.
- Defense & Aerospace card is an internal SPA `<Link>`; the other 67 are external `<a target="_blank" rel="noopener noreferrer">`.
- The detail page hero, body, and print PDF all read from the same `caseStudies.js` entry — manually verified by editing a stat tile value and observing it propagate to all three surfaces.
- Print emulation: header + footer hidden, `.print-doc` visible, exactly 2 `.print-page` children, page 1 = hero + Situation, page 2 = Diagnosis (6 items) + What POWERS Did + Full Result (6 stats).
- Tabler Icons + Adobe Typekit both load (HTTP 200).
- All other site pages render without console errors.

Use these as your acceptance smoke tests after the Faust port.

---

## Questions to send back to the design owner / Method

- Per-page `<title>` and `<meta name="description">` copy — needed for SEO. CLAUDE.md doesn't specify.
- Final hosting for `/uploads/` — keep in repo, move to WP media library, or front with a CDN?
- Contact form destination (email inbox? CRM? both?).
- Case-study URL strategy — keep the existing `/case-studies/{slug}` pattern, or restore the `/resources/{slug}/` pattern used on thepowerscompany.com for backward-compat redirects?
- Search backend — WordPress core, or a hosted index like Algolia?

---

**For anything not covered here, the order of precedence is:**
1. CLAUDE.md (locked design contract) wins.
2. PRD.md (prototype state log) is reference-only.
3. The prototype's rendered output is the visual spec.
4. When in doubt, ask the design owner; never silently re-design.
