# Routes & Redirects

## Active routes

Declared in `/app/frontend/src/App.js`.

### Homepage variants

| Path | Component | Notes |
|---|---|---|
| `/` | `<HomeV3/>` | Primary homepage — the current design |
| `/v1` | `<Home/>` | Original homepage iteration (kept for stakeholder comparison) |
| `/v2` | `<HomeV2/>` | Copy-rewrite iteration |
| `/v3` | `<HomeV3/>` | Same as `/` — alias |

In production: keep `/` only; the `/v1`, `/v2`, `/v3` aliases can be removed unless stakeholders still need comparison access.

### Expertise area pages (5)

| Path | Component |
|---|---|
| `/operational-discipline` | `<OperationalDiscipline/>` |
| `/frontline-leadership` | `<FrontlineLeadership/>` |
| `/equipment-reliability` | `<EquipmentReliability/>` |
| `/workforce-capability` | `<WorkforceCapability/>` |
| `/daily-accountability` | `<DailyAccountability/>` |

All five currently render hero-only skeletons.

### Standard pages (LegacyPage-wrapped)

| Path | Component | Status |
|---|---|---|
| `/approach` | `<Approach/>` | Legacy HTML wrapped |
| `/discovery-process` | `<DiscoveryProcess/>` | Legacy HTML wrapped |
| `/industries-served` | `<IndustriesServed/>` | Legacy HTML wrapped (P1: convert to native React) |
| `/case-studies` | `<CaseStudies/>` | Legacy HTML wrapped |
| `/case-studies/defense-aerospace-otd` | `<CaseStudyDefenseAerospaceOTD/>` | Native React — only fully-built case study |
| `/history` | `<History/>` | Legacy HTML wrapped |
| `/leadership` | `<Leadership/>` | Legacy HTML wrapped |
| `/leadership/randall-powers` | `<BioRandallPowers/>` | Native React |
| `/leadership/sean-hart` | `<BioSeanHart/>` | Native React |
| `/leadership/saul-bautista` | `<BioSaulBautista/>` | Native React |
| `/leadership/ken-wiesinger` | `<BioKenWiesinger/>` | Native React |
| `/leadership/justin-pethick` | `<BioJustinPethick/>` | Native React |
| `/leadership/kevin-sabany` | `<BioKevinSabany/>` | Native React |
| `/company-news` | `<CompanyNews/>` | Legacy HTML wrapped |
| `/careers` | `<Careers/>` | Legacy HTML wrapped |
| `/insights` | `<Insights/>` | Legacy HTML wrapped |
| `/contact` | `<Contact/>` | Legacy HTML wrapped (UI only — no submission backend) |
| `*` (404) | `<NotFound/>` | Catch-all |

---

## Legacy `.html` slug aliases

Declared in `/app/frontend/src/lib/routes.js` as `HTML_TO_ROUTE`. Every link that comes from the legacy HTML content (header nav, footer nav, in-content `<a>` tags) gets piped through `toRoute()` which uses this map.

### Active mappings

| Legacy slug | React route |
|---|---|
| `index.html` | `/` |
| `approach.html` | `/approach` |
| `discovery-process.html` | `/discovery-process` |
| `industries-served.html` | `/industries-served` |
| `case-studies.html` | `/case-studies` |
| `powers-case-study-library.html` | `/case-studies` |
| `operational-discipline.html` | `/operational-discipline` |
| `frontline-leadership.html` | `/frontline-leadership` |
| `equipment-reliability.html` | `/equipment-reliability` |
| `workforce-capability.html` | `/workforce-capability` |
| `daily-accountability.html` | `/daily-accountability` |
| `history.html` | `/history` |
| `leadership.html` | `/leadership` |
| `company-news.html` | `/company-news` |
| `careers.html` | `/careers` |
| `insights.html` | `/insights` |
| `contact.html` | `/contact` |
| `randall-powers.html` → `kevin-sabany.html` | `/leadership/{slug}` |
| `case-study-defense-aerospace-otd.html` | `/case-studies/defense-aerospace-otd` |

### Retired aliases (preserved for backwards compatibility)

| Old slug | Now maps to | Why |
|---|---|---|
| `operational-readiness.html` | `/operational-discipline` | Section renamed in v0.4.0 |
| `supply-chain.html` | `/workforce-capability` | Section replaced in v0.4.0 |
| `our-approach.html` | `/approach` | Slug shortened |

These keep external inbound links from breaking. If you're confident no external traffic uses them, they can be removed.

---

## In production (Faust.js → WP Engine)

You'll likely want:

1. **Redirect rules in WP/Faust** mirroring the retired aliases above (server-level 301s).
2. **SEO-friendly slugs.** The current React slugs (`/operational-discipline`, etc.) are SEO-clean and align with copy. No changes needed unless you want the URL structure to match a CPT taxonomy.
3. **No trailing slashes.** React Router normalizes to no-trailing-slash. Match this in WP rewrites.
4. **Sitemap generation.** Currently no `sitemap.xml`. Patrik to produce from the WP side.
5. **`robots.txt`.** Currently default CRA `robots.txt` at `/app/frontend/public/robots.txt`. Review before prod.

---

## How `toRoute()` works

```js
import { toRoute } from '../lib/routes';

<Link to={toRoute('operational-discipline.html')} >…</Link>
// → renders <a href="/operational-discipline">

<Link to={toRoute('https://example.com')} >…</Link>
// → renders <a href="https://example.com"> (external, unchanged)

<Link to={toRoute('#section-id')} >…</Link>
// → renders <a href="#section-id"> (anchor, unchanged)

<Link to={toRoute('approach.html#contact-form')} >…</Link>
// → renders <a href="/approach#contact-form">
```

If the slug isn't in the map, `toRoute()` returns it unchanged — so unknown links degrade gracefully rather than throwing.

The companion `isInternal(href)` helper returns whether a given href should be handled by React Router (true) or pass through as a normal browser navigation (false, e.g., external URLs and `mailto:`).
