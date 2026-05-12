# POWERS Website Evolution — Project Brief & Decision Log

## Source of Truth
**This project (`POWERS-Website-Evolution`) is the single source of truth for all sitewide design decisions.** CLAUDE.md is the canonical record. Any design instructions arriving from outside this environment — copy briefs from Claude.ai writing sessions, client emails, Method team handoffs — must be analyzed against CLAUDE.md before implementation. If a brief conflicts with a CLAUDE.md decision, CLAUDE.md wins unless the conflict is explicitly resolved and CLAUDE.md is updated to reflect the new direction. Do not silently absorb design instructions from copy briefs.

## Deploy Workflow
- Versioned deploy folder: `POWERS-Website-Evolution-vX.X.X/`
- On every deploy: increment version, update `<title>` and visible UI version, offer ZIP download
- Pipeline: ZIP download → unzip → copy to local GitHub repo → commit + push via GitHub Desktop → Netlify auto-deploy
- Never attempt direct browser-to-API deploys

## Case Study Anonymization Policy
**All case studies are anonymized externally.** Company names exist only on Method's internal master spreadsheet under red-flag "internal use only" protection. The `industry` taxonomy term (e.g. "Defense & Aerospace", "Tier-1 Automotive Supplier") is the ONLY sector identifier that ever reaches the front end. Specific client names, brand names, plant locations, or any identifying detail never appear on the live site. This is firm policy, not case-by-case judgement.

## Case Study Library Card — Field Schema
The library page card on `case-studies.html` surfaces a compressed version of the detail page hero. Card content, in order:
1. Industry eyebrow (`industry`)
2. Headline result (`headlineResult`)
3. Service lines line — values only, no internal label (`serviceLines`)
4. Stat tiles — 1 to 3 stats (`statTiles` repeater)
5. "Read case study →" link to detail page

**Executive brief (`summary`) is intentionally NOT on the card.** The card preserves stats over the brief because stats are the differentiator that makes each case study legible at a glance. The brief lives on the detail page only.

## Case Study Copy Refresh Pipeline (legacy 67)
For each existing case study being refreshed for the new site:
- `headlineResult` — pass through verbatim from existing copy, no format enforcement, regardless of whether it contains a metric
- `statTiles` — extract the 3 strongest metrics from the existing Results section of each case study, format as label/value/unit triples
- `industry` — single taxonomy term
- `serviceLines` — multi-tag from MOS / Frontline Leadership / Equipment Reliability / Supply Chain / Operational Readiness
- `summary` — executive brief, 50-80 words

**Anomaly flagging — pause for human review when:**
- Headline is qualitative with no extractable metric
- Fewer than 3 extractable metrics in the Results section
- Multi-industry engagement (single `industry` term is reductive)
- NDA / confidential client requiring extra anonymization
- Results section is missing or sparse in the original case study

The refresh pass uses Claude.ai with this CLAUDE.md attached, so the anomaly rules ride in the prompt.

---

## Design System

### Brand Anchors
- Navy: `#183a61` (navy-800) — H1, header bg (if navy), logo, primary CTA bg
- Gold: `#eabb71` (gold-400) — eyebrow labels, rule lines, logo mark, icon accents, header bottom border

### Full Color Scale
| Token | Hex | Usage |
|---|---|---|
| navy-50 | #f0f4f8 | Subtle tint backgrounds |
| navy-100 | #d6e2ee | Section background tints |
| navy-200 | #a8c0d6 | Borders, dividers |
| navy-400 | #4a6a8a | H2/subheads, tagline, secondary nav text |
| navy-600 | #2b5070 | Body links |
| navy-800 | #183a61 | BRAND ANCHOR |
| navy-900 | #0d2442 | Footer background |
| gold-50 | #fdf6e8 | Warm section tints |
| gold-100 | #f7e4b8 | Card highlights |
| gold-200 | #f2d08a | Accent borders |
| gold-400 | #eabb71 | BRAND ANCHOR |
| gold-600 | #c9963e | CTA hover, interactive emphasis |
| white | #ffffff | Page background, cards |
| gray-50 | #f5f5f3 | Alternating section background |
| gray-100 | #e8e8e4 | Borders, hairlines |
| gray-200 | #c4c4be | Disabled, placeholder |
| gray-400 | #888884 | Captions, meta text |
| gray-700 | #3a3a38 | Body copy |
| gray-900 | #1a1a18 | Strong headings on white |

### Retired Colors — DO NOT USE
- `#0058ED` — blue from old Figma prototype
- `#FFD700` — safety yellow
- Any teal, any light blue, any gradient
- Gold-800 and Gold-900 (read as brown)

### Typography Rules
| Element | Size | Weight | Color |
|---|---|---|---|
| Eyebrow | 12px | 500 | Gold-400 #eabb71, uppercase, letter-spacing 0.18em, margin-bottom 24px (DESIGN STANDARD — matches homepage hero "Manufacturing Performance Consulting" + section eyebrows like "The Manufacturing Moment") |
| H1 (light bg) | 44–64px | 700–800 | Navy-800 #183a61 |
| H1 (navy bg) | 44–64px | 700–800 | White #ffffff |
| H2 / Subhead | 30px | 700 | Navy-400 #4a6a8a — NEVER navy-800 |
| H3 | 22px | 600 | Navy-800 or gray-900 |
| Body | 16–18px | 300 | Gray-700 #3a3a38 — never pure black, never navy |
| Caption | 12px | 400 | Gray-400 #888884 |
| Nav links | 13px | 400 | Navy-800 on white header; gold on hover |

**Font:** Proxima Nova via Adobe Fonts (Typekit ID: dhv8kja)
**Fallback:** -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif

### Hero Standard (sitewide — applies to all internal pages except homepage and bio pages)

| Token | Spec |
|---|---|
| Container outer | `<section style="background:#183a61">` (navy-800) |
| Container inner | `max-width:1280px; margin:0 auto; padding:120px 48px; min-height:600px; display:flex; flex-direction:column; justify-content:center;` |
| Eyebrow | 12px / weight 500 / 0.18em / uppercase / gold-400 #eabb71 / margin-bottom 24px |
| H1 | `clamp(36px, 4.2vw, 56px)` / weight 800 / line-height 1.08 / letter-spacing -0.01em / white / `text-wrap: balance` / Title Case / no terminal period unless headline contains an internal comma |
| Subhead | `clamp(17px, 1.5vw, 22px)` / weight 300 / line-height 1.5 / `rgba(255,255,255,0.90)` / max-width 60ch / margin-top 28px / `text-wrap: pretty` |
| Gold rule | 80px × 1px / #eabb71 / margin-top 64px |

**Rules:**
- Never use `min-height: Nvh` on heroes. Always fixed `min-height: 600px`.
- Never override H1 or subhead font-size, line-height, opacity, or max-width below this spec without justification documented in the version log.
- The gold rule below the subhead is required on every internal page hero. Without it, the hero reads incomplete.
- If a subhead produces a 1–2 word orphan on the last line at 60ch, switch that page's subhead to `text-wrap: balance` (rather than `pretty`) before adjusting max-width.
- For multi-line H1s, use a deliberate `<br/>` at the natural typographic break and ensure the page has the mobile media query: `@media (max-width: 767px) { .hero-headline br { display: none; } }`

**Exemptions:** Homepage (uses video-overlay hero with dual CTAs); 6 bio pages (use 32fr/68fr split layout).

### Absolute Rules
1. H2/subheads = Navy-400 (#4a6a8a). Never Navy-800. Ever.
2. Gold is decorative at small scale — eyebrows, rules, borders, icons only. Not body text.
3. Body copy = Gray-700 (#3a3a38). Never pure black. Never navy.
4. Header bottom border = Gold-400 (#eabb71), 1px.
5. No dark mode unless explicitly requested.
6. No em dashes anywhere. Use periods or commas instead.
7. No gradients. No drop shadows. No border radius on cards or buttons.
8. Max content width = 1280px on ALL pages. Header, hero, controls, body content — all centered at 1280px.

---

## Homepage Card Sections — Data Strategy

### Case Study Cards (Section 6) and Insights Cards (Section 7)
Both sections display exactly 3 cards on the homepage. In the HTML prototype phase these are hardcoded placeholder content — curated manually by Gary/Method when real content is ready.

In the Faust.js build, Patrik replaces these with dynamic WPGraphQL queries:

**Case Studies — 3 most recent:**
```graphql
query FeaturedCaseStudies {
  caseStudies(first: 3, where: { orderby: { field: DATE, order: DESC }}) {
    nodes {
      title
      acfFields { headlineResult, industry, summary }
    }
  }
}
```

**Insights — 3 most recent:**
```graphql
query FeaturedInsights {
  posts(first: 3, where: { orderby: { field: DATE, order: DESC }}) {
    nodes {
      title
      excerpt
      categories { nodes { name } }
      slug
    }
  }
}
```

Once live, publishing a new case study or insight in WordPress automatically promotes it to the homepage. No code changes required.

---
| Page | File | Type | Status |
|---|---|---|---|
| Homepage | index.html | Static | ✅ Live v0.1.17 |
| Case Studies | case-studies.html | Static | ✅ Live v0.1.17 |
| History | history.html | Static | ✅ Live v0.1.17 |
| Careers | careers.html | Static | ✅ Live v0.1.17 |
| Approach | approach.html | Static | ✅ Live v0.1.17 |
| Discovery Process | discovery-process.html | Static | ✅ Live v0.1.17 |
| Operational Readiness | operational-readiness.html | Static skeleton | Pending content |
| Frontline Leadership | frontline-leadership.html | Static skeleton | Pending content |
| Equipment Reliability | equipment-reliability.html | Static skeleton | Pending content |
| Supply Chain | supply-chain.html | Static skeleton | Pending content |
| Industries Served | industries-served.html | Static skeleton | Pending content |
| Insights | insights.html | Static skeleton (will be Dynamic WPGraphQL in Faust build) | Pending content |
| Leadership | leadership.html | Static | ✅ Live v0.1.18 |
| Leadership Bios (6) | randall-powers.html, sean-hart.html, saul-bautista.html, ken-wiesinger.html, justin-pethick.html, kevin-sabany.html | Static | ✅ Live v0.1.18 |
| Company News | company-news.html | Static skeleton | Pending content |
| Contact | contact.html | Static skeleton | Pending content |
| 404 | — | Static | Pending |

---

## Component Index
| Component | File | Status |
|---|---|---|
| Header + Navigation | site-nav.jsx | ✅ Approved (Approach + Discovery Process in left mega col) |
| Approach page | approach.html | ✅ Built v0.1.17 |
| Discovery Process page | discovery-process.html | ✅ Built v0.1.17 |
| Hero Section | index.html | ✅ Approved |
| Section 2 — The Moment | index.html | ✅ Built |
| Section 3 — What POWERS Does | index.html | ✅ Built |
| Section 4 — Four Expertise Areas | index.html | ✅ Built |
| Section 5 — How We Work | index.html | ✅ Built |
| Section 6 — Results Entry Point | index.html | ✅ Built |
| Section 7 — Insights Entry Point | index.html | ✅ Built |
| Section 8 — Footer CTA | index.html | ✅ Built |
| Footer | site-nav.jsx | ✅ Built |
| Case Study Library | case-studies.html | ✅ Built |
| Case Study Detail Page (web + 2-page PDF) | case-study-defense-aerospace-otd.html | ✅ LOCKED v0.2.1 — template for all 67 case studies |
| Client Logo Bar | — | Pending |
| Insights Entry Cards | — | Pending |

---

## Header Spec (Approved)
- Background: white #ffffff
- Bottom border: gold-400 #eabb71, 1px solid
- Logo: powers-logo-refined-2026.png, height 57px
- Tagline: "Make Performance Stick" — 12px, italic, weight 300, navy-400, desktop only
- Nav items: Results (mega), About (mega), Insights (direct), Let's Talk (ghost button)
- Nav font: 13px, weight 400, navy-800, gold on hover
- Nav gap: 44px
- Let's Talk: ghost button, navy border + text, gold border + text on hover
- Search icon: 27×27px, far right, gray-100 border, navy-400 icon
- Mega menu top border: 1px gold #eabb71, flush with header bottom border (marginTop: -1px)
- Header height: 84px
- Max content width: 1280px
- Mobile: hamburger (40×40px), right-side sheet drawer

### Results Mega Menu
- Two-column layout, width 640px
- Left: Our Approach (link) | Expertise Areas (navy, 14px, weight 400 — not a link) | 4 indented sub-links | 
- Right: Industries Served (link) | Case Studies (link → powers-case-study-library.html)

### About Mega Menu
- Single column, width 260px: History | Leadership | Company News | Careers

---

## Hero Spec (Approved)
- Background: navy-900 #0d2442 + video overlay rgba(24,58,97,0.60)
- Video: https://www.thepowerscompany.com/wp-content/uploads/2025/10/POWERS-Banner-Video-2026.mp4
- Eyebrow: "MANUFACTURING PERFORMANCE CONSULTING" — gold, 12px, 0.18em tracked, uppercase, weight 500
- H1: "Turning Manufacturing Strategy into Measurable Results" — white, clamp(36px,4.2vw,56px), weight 800
- Body: "POWERS closes the gap between executive intent and shop floor performance. We build the systems, processes, and leadership behaviors that make improvement stick, no matter the conditions." — white 80% opacity, 18px, weight 300
- Primary CTA: "Start a Conversation" — solid gold #eabb71, navy text, no border radius, gold-600 on hover
- Secondary CTA: "See Our Results →" — white text, underline on hover → links to powers-case-study-library.html

---

## Homepage Section Architecture
| Section | Background | Key Elements |
|---|---|---|
| Hero | navy-900 + video overlay | Eyebrow, H1, subhead, dual CTAs |
| 2 — The Moment | navy-800 #183a61 | Centered column, white H2, gold eyebrow, no CTA |
| 3 — What POWERS Does | white | Centered, navy H2, body, gold bridge line |
| 4 — Expertise Areas | gray-50 #f5f5f3 | 4-col card grid, white cards, hover gold top border |
| 5 — How We Work | white (split) | Copy left, image placeholder right, pull quote navy block |
| 6 — Results Entry Point | navy-800 | 3 case study cards, "See All Case Studies →" → case studies page |
| 7 — Insights Entry Point | gray-50 | 3 article cards, "Visit Insights Hub →" |
| 8 — Footer CTA | navy-900 #0d2442 | Centered, gold "Start a Conversation" button |
| Footer | navy-900 #0d2442 | 4-col grid, logo, tagline, nav links, contact, legal bar |

---

## Footer Spec (Approved)
- Background: #0d2442
- Logo: powers-logo-refined-for-dark-backgrounds-2026.png, 140px wide
- Tagline: "Make Performance Stick." — gold #eabb71, 13px, letter-spacing 0.14em, weight 500
- 4 columns: Brand | Results | About | Let's Talk (Contact)
- Contact col: phone, email, address, ghost button "Start a Conversation"
- Legal bar: 1px gold rule at 20% opacity, copyright + links at white 40% opacity
- Max width: 1280px

---

## Case Study Library Page Spec
- File: powers-case-study-library.html
- Header + Footer: shared React components, identical to homepage
- No standalone header — uses site header
- Hero: eyebrow "Case Studies" (11px, weight 500, 0.18em, gold), H1 "The Work Speaks for Itself.", subhead at 15px weight 300 white 70%
- Stats row: removed entirely
- Search/filter bar: sticky below header (top: 84px), max-width 1280px inner wrapper
- Content width: 1280px max on all sections — hero, controls bar, card grid
- Filtering/search/sort: all functional, untouched
- Fonts: Proxima Nova throughout (Playfair Display and DM Sans removed)
- Brand tokens: corrected to POWERS spec

---

## Key Design Decisions
- No dark mode toggle in header (removed per reset brief)
- Search icon is placeholder — no modal built yet
- "Let's Talk" is ghost button, not plain text link
- Mega menus use marginTop: -1px to sit flush against header gold border
- Value chain strip removed from hero bottom
- H2 color in section headlines uses navy-800 (these are H3-level section titles, not true H2 subheads)
- All pages use max-width: 1280px for content — established as global rule
- No em dashes anywhere in copy
- No gradients, no drop shadows, no border radius on cards or buttons

---

## Case Study Detail Template — LOCKED v0.2.1

**Reference file:** `case-study-defense-aerospace-otd.html`
**Status:** Locked production prototype. Used as the template for all 67 case studies. Copy refresh from the master case study spreadsheet feeds directly into this scaffold; no structural changes expected. Anticipated client tweaks: logo size on the 2-page PDF; tagline lockup added next to logo once approved.

### Dual-output architecture
A single HTML file produces two outputs from the same content:
- **Screen view** — long-scroll web page, sectioned layout, full POWERS site nav and footer
- **2-page PDF download** — print stylesheet + dense hero variant, designed to render as exactly two letter-size pages

Sections use `.screen-only` and `.print-only` classes plus `@media print` to swap between the two views. The dense hero (`data-hero="dense"`) uses CSS Grid named areas to compress hero content into a 2-column layout for print.

### Section structure (web view)
1. Site header (shared site-nav.jsx)
2. Hero — simple variant (`.cs-hero` `data-hero="simple"`): eyebrow "Case Study · [Industry]", H1 with the headline result, subhead, gold rule
3. The Situation (`data-row="situation"`)
4. The Diagnosis (`data-row="diagnosis"`) — alt background
5. What POWERS Did (`data-row="powers"`)
6. The Full Result (`data-row="results"`) — alt background, stat tiles
7. Bottom CTA (`.cs-cta`) — "Ready to Make Performance Stick in Your Operation?"
8. Site footer (shared)

### 2-page PDF variant
- Print-only dense hero (`.cs-hero-dense`) replaces the screen hero via `@media print`
- All `.screen-only` elements (header, footer, screen hero, screen sections) hidden in print
- Print-only condensed versions of Situation/Diagnosis/What POWERS Did/Result render the same copy at print density
- Designed to break exactly between page 1 and page 2 with no widows or short last pages

### Producing the other 66 case studies
For each of the remaining case studies:
1. Copy `case-study-defense-aerospace-otd.html` → `case-study-[slug].html`
2. Update `<title>` and meta description
3. Replace eyebrow industry tag, H1 headline result, all section copy, and stat tiles with refreshed copy
4. Leave all CSS, structural markup, hero variants, print stylesheet, and nav/footer references untouched
5. Sitewide link audit before deploy

### Pending client tweaks (acknowledged, deferred)
- Logo size on 2-page PDF (likely larger than current)
- Tagline lockup added next to logo once tagline copy is finalized

### Faust integration notes (for the WordPress/Faust merge)
This prototype is built as a standalone HTML demo so the client can review the case study experience in isolation. When Patrik folds this into the main Faust.js build, the following transitions apply:

**The case study HTML files become a template, not a content source.** Section structure, CSS, print stylesheet, dense hero variant, and `@media print` rules all carry over verbatim. Only the copy slots get tokenized.

**Field map — which HTML elements become which WP custom fields (ACF):**
| HTML location | Field name | Type |
|---|---|---|
| Hero eyebrow industry tag (after "Case Study · ") | `industry` | Taxonomy term |
| Hero H1 headline result | `headlineResult` | Text |
| Hero subhead / Executive Brief | `summary` | Textarea |
| Hero disciplines line (e.g. "MOS · Frontline Leadership · Supply Chain") | `serviceLines` | Taxonomy (multi-tag) |
| The Situation body | `situation` | WYSIWYG |
| The Diagnosis body | `diagnosis` | WYSIWYG |
| What POWERS Did body | `powersActions` | WYSIWYG |
| The Full Result body | `fullResult` | WYSIWYG |
| Stat tiles (3-up) | `statTiles` (repeater: label, value, unit) | Repeater |
| Print-only condensed copy | derived from same fields | — |

**Internal field labels are never surfaced to users.** The WP field names (`industry`, `serviceLines`, `headlineResult`, etc.) are internal-only. The front-end template renders the field VALUES only, never the field name as a caption. Example: the disciplines line shows "MOS · Frontline Leadership · Supply Chain" with no "Service Lines:" or "Disciplines:" label above it. Same pattern as the eyebrow, which renders "Case Study · Defense & Aerospace" without surfacing the `industry` field name.

**Routing change:** Faust will serve these at `/case-studies/[slug]/`, not `/case-study-[slug].html`. The prototype's flat-file naming convention is prototype-only; no action required now.

**Header/footer:** Inline React `site-nav.jsx` is replaced by the global WP/Faust nav. No content changes; just a swap of the wrapping shell.

**Print stylesheet is a primary deliverable, not a nice-to-have.** The 2-page PDF download is core to the case study experience. The `@media print` rules, `.screen-only`/`.print-only` class system, and dense hero (`.cs-hero-dense`) MUST carry into the Faust build unchanged.

**Search/filter wiring (handled on `case-studies.html`, NOT on detail pages):** The detail pages don't query anything themselves. The library page's card grid will swap from hardcoded cards to a WPGraphQL query (same pattern as the Insights cards on the homepage). Filter facets (Industry, Service Line, Result Type) come from WP taxonomies registered on the Case Study post type — not from the case study HTML files.

```graphql
query CaseStudyLibrary($industry: String, $serviceLine: String) {
  caseStudies(where: {
    taxQuery: {
      taxArray: [
        { taxonomy: INDUSTRY, terms: [$industry] }
        { taxonomy: SERVICELINE, terms: [$serviceLine] }
      ]
    }
  }) {
    nodes {
      title
      slug
      acfFields { headlineResult, industry, summary }
    }
  }
}
```

**Order of operations for the merge:**
1. Register `caseStudy` post type + ACF field group + `industry` / `serviceLine` / `resultType` taxonomies in WP
2. Import all 67 case studies from the master spreadsheet as `caseStudy` posts with populated ACF fields
3. Build the Faust template (`templates/single-caseStudy.tsx`) using the locked HTML structure with field placeholders
4. Replace `case-studies.html` hardcoded cards with the WPGraphQL query above
5. Verify print stylesheet renders correctly through the Faust template
6. Set up redirects from prototype flat-file URLs to new `/case-studies/[slug]/` routes if any prototype URLs leaked into the wild

---

## Version Log

### v0.3.0 — 2026-05-11
**Deploy 23 — Senior dev handoff snapshot (Faust/headless test environment)**
- Frozen snapshot delivered to senior developer (Patrik) for headless hosting environment testing and start of Faust.js / WordPress build
- No HTML structural changes this deploy. Version stamps bumped from v0.2.2 to v0.3.0 across 12 active pages (index, case-studies, history, careers, approach, discovery-process, leadership, 6 bio pages) to mark the handoff snapshot
- Case study detail prototype (`case-study-defense-aerospace-otd.html`) remains LOCKED at v0.2.1 design — page itself carries no inline stamp; lock status documented in Component Index and the Case Study Detail Template section above
- Design work continues in this project (`POWERS-Website-Evolution`) as the design source of truth. CLAUDE.md remains the contract between design and dev. Senior dev rebases against future snapshots as needed
- Coordination protocol with senior dev: cosmetic, copy, and responsive changes do not require coordination. Structural changes (new ACF fields, new taxonomies, new section variants, schema changes) must be flagged before deploy
- Following this deploy: handoff package generated via "Handoff to Claude Code" skill — produces a developer-oriented bundle (source files + dev README + design intent notes) optimized for Patrik to pick up in his local Claude Code environment and build the Faust template against

### v0.2.2 — 2026-05-07
**Deploy 22 — Case study detail template locked + Faust integration notes**
- `case-study-defense-aerospace-otd.html` is the directly-accessible standalone URL for the locked single case study prototype, sitting alongside the rest of the proto site. Client can open it independently of the rest of the site for focused review
- New "Faust integration notes" subsection added to the locked template doc in CLAUDE.md, capturing the field map (HTML element → ACF field name → field type), routing change to `/case-studies/[slug]/`, header/footer swap, print stylesheet must carry over unchanged, and the WPGraphQL query pattern for the library page filter wiring
- 6-step order of operations documented for Patrik's WP/Faust merge
- All version stamps bumped from v0.2.0 to v0.2.2 across active pages (skipping v0.2.1 since v0.2.1 was a documentation-only deploy with no HTML changes)

### v0.2.1 — 2026-05-07
**Deploy 21 — Case study detail template locked**
- `case-study-defense-aerospace-otd.html` declared the LOCKED production template for all 67 case studies (Defense & Aerospace OTD 56% → 89% as the reference build)
- Single-file dual-output architecture: long-scroll web view + 2-page printable PDF, switched via `@media print` and `.screen-only` / `.print-only` class pairs
- Final fix this deploy: nav responsive show/hide rules promoted to `!important` on the base `.nav-desktop` / `.nav-mobile` / `.nav-tagline` declarations to override the inline `style={{display:'flex'}}` set by site-nav.jsx — hamburger now correctly hides at desktop and the matching 900px media-query breakpoint flips correctly on mobile
- Template documented in new "Case Study Detail Template — LOCKED v0.2.1" section above the Version Log; production workflow for the remaining 66 case studies captured there
- Anticipated post-lock client tweaks logged but deferred: PDF logo sizing and logo+tagline lockup

### v0.2.0 — 2026-05-06
**Deploy 20 — Sitewide hero standardization (Hero Standard locked)**
- All internal page heroes now snap to a single hero token spec, with Approach as the canonical reference. The four "Hero Standard" tokens, applied identically across all 13 internal pages:
  - **Container:** `min-height: 600px`, `padding: 120px 48px`, `display: flex; flex-direction: column; justify-content: center`, max-width 1280px inner wrapper
  - **Eyebrow:** 12px / weight 500 / 0.18em tracking / uppercase / gold-400 #eabb71 / margin-bottom 24px
  - **H1:** `clamp(36px, 4.2vw, 56px)` / weight 800 / line-height 1.08 / letter-spacing -0.01em / white / `text-wrap: balance`
  - **Subhead:** `clamp(17px, 1.5vw, 22px)` / weight 300 / line-height 1.5 / `rgba(255,255,255,0.90)` / max-width 60ch / margin-top 28px / `text-wrap: pretty`
  - **Gold rule:** 80px × 1px / #eabb71 / margin-top 64px
- Retired `min-height: 70vh` and `min-height: 60vh` from all heroes. Fixed pixel `min-height: 600px` replaces viewport-relative heights so hero depth is consistent across all monitor sizes (a 1920×1080 desktop and a 1366×768 laptop now show identically depth heroes)
- Retired the case-studies page's nonstandard hero spec: H1 was `clamp(28px,4vw,44px)` / line-height 1.15 / max-width 640px / mb 16px; subhead was 15px fixed / opacity 0.70 / max-width 520px / mb 32px / no rule. All replaced with Hero Standard tokens. Eyebrow corrected from 11px / mb 16px to 12px / mb 24px
- Retired the history.html and careers.html nonstandard hero spec: H1 was `clamp(34px,5.2vw,56px)` / max-width 780px; subhead was `clamp(16px,1.4vw,18px)` / opacity 0.80 / max-width 620px / mt 24px / no rule. All replaced with Hero Standard tokens. Hero gold rule added below subhead on both pages
- Retired the leadership.html nonstandard hero spec: subhead was `18px` fixed / mt 24px; gold rule margin-top was 32px. All replaced with Hero Standard tokens. H1 wrapped to two lines via deliberate `<br/>` after "Built" for visual pairing with multi-line subhead. Mobile media query (`@media (max-width: 767px) { .hero-headline br { display: none } }`) suppresses the desktop break on phones
- Subhead `text-wrap` set to `balance` on Leadership specifically (rather than `pretty`) because the existing copy ("...did it.") was producing a two-word orphan on the last line at 60ch. `balance` redistributes all lines so they read as four roughly-equal lines with no orphan
- All 12 retrofitted pages now match Approach hero exactly: approach.html (template, baseline reference), discovery-process.html, leadership.html, history.html, careers.html, case-studies.html, operational-readiness.html, frontline-leadership.html, equipment-reliability.html, supply-chain.html, industries-served.html, insights.html, company-news.html, contact.html
- Homepage and 6 bio pages exempted from the retrofit per scope. Homepage uses its own video-overlay hero treatment with dual CTAs. Bio pages use a 32fr/68fr split layout that does not follow Hero Standard. These exceptions are documented and intentional
- Hero Standard added to the Design System section of CLAUDE.md as a sitewide token specification, parallel to the existing Color Scale and Typography Rules tables
- All version stamps bumped to v0.2.0 across active pages

### v0.1.19 — 2026-05-06
**Deploy 19 — Sitewide typography unification to homepage standard**
- Established homepage as the sitewide H1/H2 standard: H1 `clamp(36px, 4.2vw, 56px)`, weight 800, line-height 1.08, **Title Case**, no terminal period; H2 `clamp(28px, 3.5vw, 44px)`, weight 800, line-height 1.1, **Title Case**
- Retired Register B (sentence case + period punctuation) editorial convention. Register A (Title Case) is now the single sitewide standard for H1 and H2
- `approach.html`: H1 retitled "Where Executive Intent Meets Shop Floor Execution" (terminal period dropped), `.pw-h1` and `.pw-h2` rescaled to homepage spec, all 8 inner section H2s converted to Title Case
- `discovery-process.html`: H1 retitled "The Roadmap to Value Creation, Built in Two Weeks" (terminal period dropped), `.pw-h1` and `.pw-h2` rescaled to homepage spec, all 9 inner section H2s converted to Title Case
- `leadership.html`: H1 retitled "The Team That Built the Architecture" (terminal period dropped), hero H1 rescaled from clamp(36-48) to clamp(36-56), CTA H2 rescaled to homepage section H2 spec, CTA H2 converted to Title Case
- 6 bio pages (randall-powers, sean-hart, saul-bautista, ken-wiesinger, justin-pethick, kevin-sabany): shared CTA H2 rescaled and converted to Title Case
- Editorial convention update applied to CLAUDE.md: Register B retired. All future pages use Title Case for H1 and H2
- Pending later editorial pass: history.html and careers.html already use Title Case so no copy retitling needed there, but H1/H2 scale will be unified in a separate deploy if needed
- Version stamps bumped to v0.1.19 across all 12 active content files

### v0.1.18 — 2026-05-06
**Deploy 18 — Leadership page + bios**
- New `leadership.html` built: hero (navy, 50vh, eyebrow + sentence-case H1 "The team that built the architecture." + subhead + gold rule), 6-card grid (3-col desktop, 2-col tablet, 1-col mobile) scaled to 880px max-width container with 28px gap, smaller card text (18px name / 12.5px title), Connect on LinkedIn link with LinkedIn glyph icon below each card except Randall, sitewide CTA at bottom
- 6 individual bio pages built: `randall-powers.html`, `sean-hart.html`, `saul-bautista.html`, `ken-wiesinger.html`, `justin-pethick.html`, `kevin-sabany.html`. Each page: bio hero (32fr/68fr split, photo capped at 300px max-width per scale-down request), narrow body column with full bio copy, Connect on LinkedIn link in bio-contact block (Randall has no contact block), Back to Leadership link section (vertically centered with 96px min-height + symmetric 40px padding), shared CTA
- All direct individual email addresses removed from bio pages per editorial direction. Single firm-level email retained in shared CTA only
- LinkedIn URLs wired: Sean (seanphart), Saul (saulbautista), Ken (kenwiesinger), Justin (justin-pethick-ab5388181), Kevin (kevin-sabany-901339174). Randall intentionally has no LinkedIn link
- Editorial register: Leadership page H1 follows Register B (sentence case + period punctuation) matching approach.html and discovery-process.html, since those are the most senior client-approved pages and the right peer group for Leadership. History/Careers Register A retrofit deferred to a later editorial pass
- Typography QC applied: text-wrap balance on h1/h2/h3/eyebrows, text-wrap pretty on body, 12px/0.18em/gold-400 eyebrow standard
- All version stamps bumped to v0.1.18 across index, history, careers, approach, discovery-process, leadership, and 6 bio pages

### v0.1.17 — 2026-05-06
**Deploy 17 — Approach + Discovery Process page pair**
- New `approach.html` built end-to-end against the Method copy-and-specs document. 9 sections: Hero (navy, no CTA, gold hairline rule + read-on chevron), The Gap (white centered 720px), The Mechanism (navy-50 tint, 2-col split, four discipline blocks with gold numerals 01-04 + gray-100 hairline rules), Performance Arc (white, five-stage horizontal arc with continuous gold-400 spine connecting cards via 12px gold dots, vertical-stack on mobile), The Engagement (navy-800 with inline CTA "See how the engagement runs →" linked to discovery-process.html, gold rules above and below), Four Expertise Areas (white, 2x2 card grid with gold-eyebrow + navy-800 H3 + gold hover border), Durability (navy-50 tint, single-column rhetoric block ending on "moment."), Proof (white, three case study card row with image placeholders), CTA (navy-800, gold hairline + phone/email/button stack)
- New `discovery-process.html` built end-to-end. 9+1 sections: Hero (navy, 60vh), The Starting Point (white 720px), Multi-site Discovery aside (navy-50 tint, tight padding, with inline contact link), Three Opportunity Areas (white, three-column white-card grid with gold left-border list items + Cost-of-Leaving consequences callout), Week One (white, 45/55 split with navy-50 output sub-block), Week Two (navy-50, mirrored split with on-tint white output sub-block + thread-tie line about multi-site), Five Deliverables (white, 5-row stacked list with 64px gold-400 numerals + gray-100 hairlines), Skin in the Game (navy-800, three-stat row with gold dividers), Phases Two and Three (white, two-column Implementation / Evaluate ROI & Savings split with gold-bordered list items), CTA (navy-800)
- Editorial conventions enforced on both pages per spec: no em-dashes (periods/commas/colons only — page titles and OG titles use periods, not em-dashes), no "facility/facilities" (only "site/sites"), no "culture" used as a soft-register noun, no possessive "Our" in nav labels (page is "Approach" not "Our Approach", "Discovery Process" not "Our Discovery Process"), sentence case throughout (proper nouns: Discovery, Implementation, Evaluate ROI & Savings, Management Operating System, Project Savings Commitment, Key Event Schedule)
- Typography QC applied: `text-wrap: balance` on h1/h2/h3/.pw-eyebrow, `text-wrap: pretty` on body p/li, `.hero-headline br` suppressed below 767px
- All right-arrow glyphs are true Unicode → (HTML entity `&rarr;`), not hyphen-greater-than
- Results mega menu restructured sitewide: left column now reads "Approach | Discovery Process | Industries Served | Case Studies" — retired "Our Approach" label and `our-approach.html` slug everywhere
- `our-approach.html` deleted from project root
- Sitewide find-and-replace applied across 13 files (index.html, case-studies.html, history.html, careers.html, company-news.html, contact.html, equipment-reliability.html, frontline-leadership.html, industries-served.html, insights.html, leadership.html, operational-readiness.html, supply-chain.html) plus shared site-nav.jsx, covering: RESULTS_LEFT.topLinks data, mobile drawer items, MegaLink desktop nav, FooterLink/NFooterLink references, and the homepage "See What That Looks Like in Practice →" link target
- Sitewide link audit: 0 broken internal links, 0 root-relative paths, 0 references to "our-approach.html" or label "Our Approach" remain across all 16 files
- Version stamps bumped to v0.1.17 on index.html, case-studies.html (no stamp present), history.html, careers.html, approach.html, discovery-process.html
- CLAUDE.md page index and component index updated to reflect new approved pages

### v0.1.16 — 2026-05-06
**Deploy 16 — Typography Quality Control implementation**
- New "Typography Quality Control" section added to CLAUDE.md as standing instruction (appended after Version Log; nothing else disturbed)
- Global rule applied to index.html, history.html, careers.html: `h1, h2, h3, .eyebrow { text-wrap: balance; }` for automatic line distribution on all headlines and subheads
- Mobile reflow rule added: `@media (max-width: 767px) { .hero-headline br { display: none; } }` so decorative desktop breaks don't carry into narrow widths
- history.html hero H1 "Built From the Floor Up. Since 2004." rewritten with deliberate `<br>` between sentences at the natural typographic break point, tagged `.hero-headline` class so mobile suppresses the break
- Retrofit complete on all three target pages per standing instruction

### v0.1.15 — 2026-05-05
**Deploy 15 — History + Careers pages built**
- history.html: full content build per approved prompt. Hero (navy, eyebrow + H1 + subhead), Section 1 Where It Started (white, narrow column), Section 2 How We Evolved (gray-50, narrow column), Section 3 A New Chapter (white, split layout with image placeholder), Section 4 The Constants (navy, narrow column with quote list — 5 founding principles separated by gold rules at 30% opacity), Section 5 CTA (navy-900, "Read the Case Studies" link → case-studies.html)
- careers.html: full content build per approved prompt. Hero (navy), Section 1 What The Work Actually Looks Like (white, narrow column), Section 2 Who Thrives Here (gray-50, split layout with image placeholder), Section 3 What POWERS Offers (white, narrow column), Section 4 CTA (navy-900, gold "View Open Positions" button → placeholder #)
- Eyebrow size: 12px (matches homepage hero "Manufacturing Performance Consulting" and "The Manufacturing Moment" — the design standard). CLAUDE.md typography table corrected from 11px to 12px in same deploy.
- Image placeholders use striped SVG pattern with monospace label per default aesthetic, on navy background to read as professional/dark
- Section pattern reused: outer element no horizontal padding, inner wrapper max-width 1280px with padding 96px 48px (per global rule v0.1.11)
- Fully responsive: split layouts collapse to single column at 1023px; section padding tightens to 64px 24px at 767px
- Header + footer: existing React components unchanged on both pages
- Meta descriptions added to both pages

**Open questions to confirm:**
1. Image placeholders: confirm replacement images for (a) Atlanta skyline / 1801 Peachtree NE on history Section 3, and (b) manufacturing floor / consultant on shift on careers Section 2.
2. Careers CTA button "View Open Positions" wired to placeholder href="#" — pending client direction on LinkedIn Jobs vs iSolveHire destination.

### v0.1.14 — 2026-05-04
**Deploy 14**
- Hero "Start a Conversation" CTA wired to contact.html
- Hero "See Our Results →" underline on hover removed, arrow animation retained
- CLAUDE.md updated

### v0.1.13 — 2026-05-04
**Deploy 13**
- Root Cause section: "Frontline" → "Front Line" (two words) in headline
- Root Cause section: "frontline capability" → "frontline leadership capability" in body
- Root Cause section: link added "Build the Frontline Leaders That Will Make Performance Stick →" → frontline-leadership.html
- "See what that looks like in practice →" capitalized to initial caps
- Sitewide link audit passed

### v0.1.12 — 2026-05-04
**Deploy 12**
- "Visit the Insights Hub →" wired to insights.html
- "Start a Conversation" button in Footer CTA wired to contact.html
- Sitewide link audit passed: all 14 files clean

### v0.1.11 — 2026-05-04
**Deploy 11 — Full site nav stabilization**
- case-studies.html inline nav replaced with site-nav.jsx content — all menu links now work from case studies page
- Responsive CSS class names unified: nav-desktop / nav-mobile / nav-tagline across all pages
- About mega menu wired on homepage: History, Leadership, Company News, Careers
- All root-relative hrefs (/page.html) corrected to plain relative (page.html) across all 14 files
- Skeleton page hero: double-padding removed, outer section has no horizontal padding, inner wrapper is max-width 1280px with padding 96px 48px — matches header/footer column exactly
- case-studies.html hero depth matched to skeleton pages: min-height 320px, padding 96px 48px
- Sitewide link audit passed: zero broken links, zero root-relative paths, zero unwired nav items across all 14 files

### Global rules added to spec:
- All pages use plain relative hrefs (no leading slash) — works in preview and on Netlify
- Hero sections on all pages: outer element has NO horizontal padding. Inner wrapper: max-width 1280px, margin 0 auto, padding 96px 48px
- Sitewide link audit runs before every deploy
- Shared nav (site-nav.jsx) is the single source of truth for skeleton pages — never duplicate inline

### v0.1.10 — 2026-05-04
**Deploy 10 — Full site nav build**
- Homepage renamed from POWERS v2.html to index.html
- powers-case-study-library.html renamed to case-studies.html, all references updated
- 12 skeleton pages built: our-approach, operational-readiness, frontline-leadership, equipment-reliability, supply-chain, industries-served, insights, history, leadership, company-news, careers, contact
- All internal nav links wired with plain relative paths (no leading slash) — works in preview and on Netlify
- About mega menu wired: History, Leadership, Company News, Careers
- Expertise sub-links wired to respective skeleton pages
- Expertise cards on homepage wired to respective pages
- Full sitewide link audit: all 14 files clean, zero broken or root-relative links
- site-nav.jsx shared component created for skeleton pages

### v0.1.9 — 2026-05-04
**Deploy 9**
- New section added: "The Root Cause" — white bg, centered column, between The Moment and How We're Different
- "How We're Different" section background changed from white to navy-800 (#183a61), text inverted to white/gold
- Manufacturing floor placeholder replaced with real photography (POWERS Homepage Placeholder 1280 x 960.png)
- 1px gold #eabb71 top border added to footer
- Homepage section architecture updated in CLAUDE.md

### v0.1.8 — 2026-05-04
**Deploy 8 — Best practices audit**
- All logo links set to index.html across all pages (header, footer, mobile drawer)
- Meta description + OG tags added to both pages
- Dead CSS removed from case study page (.site-header, .logo, .header-label)
- Card border-radius removed (brand spec: no border radius on cards)
- Card box-shadow removed (brand spec: no drop shadows)
- Card hover translateY removed
- Old gold rgba(201,168,76) corrected to rgba(234,187,113) throughout case study page
- Decorative hero circle pseudo-elements removed from case study page (off-brand)
- CLAUDE.md to be updated automatically on every deploy going forward

### v0.1.7 — 2026-05-04
**Deploy 7**
- Fixed controls bar width on case study page — padding moved entirely to inner wrapper, outer element padding set to 0, so 1280px max-width correctly aligns with header and hero content

### v0.1.6 — 2026-05-04
**Deploy 6**
- Fixed hero and controls bar content width on case study page — padding moved from outer elements to inner wrappers so max-width 1280px correctly constrains content to match header column

### v0.1.5 — 2026-05-04
**Deploy 5**
- Content width standardized to 1280px across all sections on case study page (hero inner wrapper, controls bar inner wrapper, card grid)
- CLAUDE.md fully updated with complete project state

### v0.1.4 — 2026-05-04
**Deploy 4**
- Full homepage section architecture built: Sections 2-8 (The Moment, What POWERS Does, Expertise Areas, How We Work, Results Entry Point, Insights Entry Point, Footer CTA)
- Footer added with 4-column layout, logo, tagline, nav links, contact info, legal bar
- Case Study Library page integrated (powers-case-study-library.html) — brand tokens corrected, header/footer added, stats row removed
- Case Studies wired across all nav locations (mega menu, mobile drawer, footer, CTAs)
- "See Our Results" hero CTA linked to case studies page
- "See All Case Studies" linked to case studies page
- Eyebrow weight corrected on case study page (600 → 500)
- Content width standardized to 1280px across all sections on case study page

### v0.1.3 — 2026-05-04
**Deploy 3**
- Tagline font changed to sentence case, no letter-spacing
- Tagline size increased to 12px
- Tagline set to italic

### v0.1.2 — 2026-05-04
**Deploy 2**
- "Expertise Areas" label in Results mega menu changed to match nav link treatment (14px, weight 400, navy) — no longer gold uppercase label
- Same fix applied to mobile drawer and static demo panel
- Duplicate CSS properties cleaned up

### v0.1.1 — 2026-05-04
**Deploy 1**
- Nav font reduced to 13px
- Nav item gap increased to 44px
- Search button added to header far right (27×27px)
- Hero body copy updated to approved text
- Tagline updated to "Make Performance Stick"
- Logo increased to 57px
- Header height increased to 84px
- Mega menu gold top border restored (1px #eabb71), flush with header
- Value chain strip removed from hero bottom
- Reindustrialization Bridge section added
- Strategy to Execution section added (pending image approval)

### v0.1.0 — 2026-05-04
**Initial build**
- Header component: white bg, gold border, logo, tagline, nav, mega menus (Results + About), ghost CTA, search button
- Hero section: navy bg, video, overlay, eyebrow, H1, subhead, dual CTAs
- Reindustrialization Bridge: navy-800, single statement
- Strategy to Execution: two alternating image-text blocks
- Value Chain Diagram: in progress

**Key decisions:**
- Full reset from v1 (navy header) to v2 (white header) per client brief correction
- Nav font: 13px (reduced from 14px)
- Logo height: 57px
- Header height: 84px
- Tagline: "Make Performance Stick"
- Mega menu gold top border flush with header bottom border

---

## Typography Quality Control

**STANDING INSTRUCTION FOR ALL PAGES**

### Text Wrap Balancing
Apply `text-wrap: balance` to all headline and subhead elements globally. Add to the stylesheet for H1, H2, H3, and any element using the eyebrow style. This is the baseline protection against uneven line distribution.

```css
h1, h2, h3, .eyebrow {
  text-wrap: balance;
}
```

### Controlled Breaks on Hero Headlines
For hero headlines where the natural break point matters, use a deliberate `<br>` tag at the correct typographic break. Example: "Built From the Floor Up.`<br>`Since 2004." not "Built From the Floor Up. Since`<br>`2004."

On mobile, suppress decorative `<br>` tags using:

```css
@media (max-width: 767px) {
  .hero-headline br {
    display: none;
  }
}
```

This allows mobile text to reflow naturally without inheriting a desktop break that creates awkward three-line stacks at narrow widths.

### Widow and Orphan Watching
Before delivering any page, visually check every headline, subhead, and body paragraph at desktop width (1280px) for:

- Single words on the last line of any headline or subhead. Adjust max-width by 20-40px or flag for copy review. Never leave a single word on the last line of a headline or subhead.
- Single lines of body copy carried to a new column or new section. Flag these as orphans and adjust padding or copy length to resolve.

`text-wrap: balance` handles most cases automatically but does not catch everything. Manual review is required before every deploy.

### Copy Edit as First Resort
If a headline widow cannot be resolved by `text-wrap: balance` or a `<br>` tag without breaking the design, flag it for copy review rather than forcing a layout change. A one-word edit to the headline is always preferable to compromising the grid or the spacing system.

### Retrofit Existing Pages
Apply `text-wrap: balance` to the global stylesheet immediately so it takes effect across all existing pages. Check index.html, history.html, and careers.html for any headline widows at desktop width and resolve using the methods above before the next deploy.
