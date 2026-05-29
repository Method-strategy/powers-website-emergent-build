# Component Inventory

Per Patrik's preference: data shapes are described **agnostic of CMS**. Build whatever WordPress models you want; just feed the components their expected props.

Every component is a pure function of its props (no internal data fetching, no global state). Animation/intersection logic is encapsulated inside the component via `useEffect`.

---

## Chrome

### `SiteHeader` — `/components/SiteHeader.jsx`

Canonical header used on every non-home page. The homepage has a parallel `<Header/>` defined inline in `HomeV3.jsx` with identical menu data — see [ARCHITECTURE.md → quirks].

**Data shape:** Currently hardcoded. To CMS-ify, accept a `navigation` prop:

```ts
navigation: {
  primaryNav: Array<{
    label: string,
    href: string,               // legacy .html slug, routed via toRoute()
    megaMenu?: 'results' | 'about' | null
  }>,
  resultsMegaMenu: {
    leftPanel: { groupLabel: string, links: Array<{ label, href }> },
    rightPanel: { groupLabel: string, subLinks: Array<{ label, href }> }
  },
  aboutMegaMenu: {
    leftPanel: { groupLabel: string, links: Array<{ label, href }> },
    rightPanel: { groupLabel: string, links: Array<{ label, href }> }
  },
  cta: { label: string, href: string },       // currently "Let's Talk"
  tagline: string                              // "Strong Foundation. Strong Performance."
}
```

**Behavior:**
- Mega-menus open on hover with 80ms intent delay
- Click-outside or escape closes
- Mobile (<880px): collapses to hamburger that opens a slide-in drawer (`<Drawer/>` inline component)
- Search icon currently inert (stub for future modal)

### `SiteFooter` — `/components/SiteFooter.jsx`

Canonical footer.

**Data shape:**
```ts
{
  footerNav: {
    columns: Array<{
      header: string,
      links: Array<{ label, href }>
    }>
  },
  legal: {
    copyrightYear: number,                     // currently 2026, computed in code
    links: Array<{ label, href }>              // Privacy, Terms, etc.
  },
  socialLinks: Array<{ platform, href }>,     // LinkedIn only currently
  tagline: string,
  ctaCard: {
    eyebrow: string,
    heading: { lead, accent },                 // editorial pivot pattern
    body: string,
    cta: { label, href }
  }
}
```

### `Layout` — `/components/Layout.jsx`

Wraps `<SiteHeader/>` + `<Outlet/>` + `<SiteFooter/>` for all non-home routes. No props.

### `HomeLayout` — `/components/HomeLayout.jsx`

Bare wrapper for `/` — header and footer render inline within `HomeV3` rather than from this layout. (Quirk to resolve in consolidation.)

---

## Homepage sections (in order of appearance)

### `Hero` — `HomeV3.jsx` line 1117

Dark navy gradient hero with three-word stacked headline (left), lede + brand promise (right), and full-bleed number swarm canvas behind.

**Data shape:**
```ts
{
  headline: {
    word1: string,      // "Stop"        (sans, white)
    word2: string,      // "Chasing"     (sans, white)
    accent: string      // "Numbers."    (newsreader italic gold, period included)
  },
  lede: string,
  closingLine: string   // "We build the foundation."
}
```

**Animation:** Perpetual 4-phase cycle (BUILD 4400ms → PEAK 3500ms → COLLAPSE 1500ms → EMPTY 650ms). See `SECTION_CHOREOGRAPHY.md`.

**Locked copy** (do not paraphrase):
- "Stop" / "Chasing" / "Numbers."
- "Strong quarters and weak ones are both readouts of the same thing: the fundamentals at the root of your operation. When they're missing, your ability to execute is at the mercy of conditions. When they're built in, it isn't."
- "We build the foundation."

### `SectionDifferentApproach` — `HomeV3.jsx` line 2493

"A different approach" — Row 2. Statement + paragraph treatment, all-text, no media.

**Data shape:**
```ts
{
  eyebrow: string,            // "A DIFFERENT APPROACH"
  heading: { lead, accent },  // "We don't work on the numbers." / "We work where the numbers come from."
  body: string                // single paragraph
}
```

### `SectionDisciplinesFoundation` — `/components/DisciplinesAndPressureExhibit.jsx`

**Section 3 of the homepage.** Five discipline cards arranged clockwise around a central "core" element with canvas-drawn connector lines, staggered entry, scroll-driven exit animation.

**Data shape:**
```ts
{
  eyebrow: string,                  // "What we build"
  heading: { lead, accent },        // "Five disciplines." / "One foundation."
  lede: string,                     // closing copy (the "not five initiatives…" paragraph)
  disciplines: Array<{
    num: string,                    // "01 — Discipline"
    name: string,                   // "Operational Discipline"
    body: string,                   // SHORT (~1 sentence) — long form lives on detail page
    href: string,                   // "operational-discipline.html"
    pos: 'd1' | 'd2' | 'd3' | 'd4' | 'd5'   // spatial position class
  }>[5],
  core: {
    titleLines: string[]            // ["Execution", "Capability", "Rooted in", "Discipline"]
  },
  payoff: { lead, accent }          // "Together, they form your" / "ability to execute no matter what."
}
```

**Animation:** Staggered card entry (180ms apart), core materializes, canvas connector lines draw, payoff lands. On scroll-out, core descends 220px and fades. **Replays on every viewport re-entry.** See `SECTION_CHOREOGRAPHY.md`.

### `SectionPressureExhibit` — `/components/DisciplinesAndPressureExhibit.jsx`

**Section 4 of the homepage.** Copy header + ghost core descent + canvas swarm exhibit (red pressures absorbed → green outcomes emitted).

**Data shape:**
```ts
{
  eyebrow: string,                  // "What that means"
  heading: { lead, accent },        // "Strong numbers." / "Regardless of conditions."
  lede: string,                     // closing copy
  pressures: string[],              // ~35 short red labels (e.g., "Schedule misses")
  outcomes: string[],               // ~30 short green labels (e.g., "Higher OEE")
  core: {
    titleLines: string[]            // same 4 lines as S3 — they're the SAME core
  },
  controls: {                       // currently rendered visible — consider hiding for production
    showPauseButton: boolean,
    showLoadSlider: boolean,
    showSurgeButton: boolean
  }
}
```

⚠️ The `pressures` and `outcomes` arrays are currently hardcoded inside the component. For CMS-driven, accept them as props.

### `SectionHowWeWork` — `HomeV3.jsx` line 1782

"How we work" — 2-column row with copy left, looping crossfade video right.

**Data shape:**
```ts
{
  eyebrow: string,
  heading: { lead, accent },
  body: string[],                   // paragraphs
  video: {
    sources: Array<{ src, type }>,  // [{ src: '...webm', type: 'video/webm' }, { src: '...mp4', type: 'video/mp4' }]
    poster: string,                 // first-frame JPG path
    ariaLabel: string
  }
}
```

Uses `<LoopingVideoWithCrossfade/>` (defined in `HomeV3.jsx` line 1702) to crossfade between video and poster at the loop seam — see `SECTION_CHOREOGRAPHY.md`.

### `PowersMetrics` — `/components/PowersMetrics.jsx`

Rolling counter metrics row. Navy background. Triggers on viewport entry.

**Data shape:**
```ts
{
  eyebrow: string,
  heading: { lead, accent },
  metrics: Array<{
    value: number,                  // final value, e.g., 500
    suffix: string,                 // "+" or "%" or "x"
    label: string                   // "Operations transformed"
  }>
}
```

⚠️ Metric values currently use placeholder numbers pending CEO confirmation (tracked in PRD).

### `SectionWhereWeWork` — `HomeV3.jsx` line 1948

"Where we work" — industries grid.

**Data shape:**
```ts
{
  eyebrow: string,
  heading: { lead, accent },
  body: string,
  industries: Array<{ label: string, slug: string }>
}
```

### `SectionResultsEntryPoint` — `HomeV3.jsx` line 2069

"Proven results" — case study card teasers.

**Data shape:**
```ts
{
  eyebrow: string,
  heading: { lead, accent },
  cards: Array<{
    industry: string,
    result: string,                 // "$2.4M annualized"
    summary: string,
    href: string
  }>,
  cta: { label, href }              // "See all case studies →"
}
```

### `SectionInsightsEntryPoint` — `HomeV3.jsx` line 2175

"Insights" — article card teasers.

**Data shape:**
```ts
{
  eyebrow: string,
  heading: { lead, accent },
  cards: Array<{
    category: string,
    headline: string,
    summary: string,
    href: string
  }>,
  cta: { label, href }
}
```

### `FooterCTA` — `HomeV3.jsx` line 2215

Final CTA before footer. Gold wash on navy.

**Data shape:**
```ts
{
  eyebrow: string,
  heading: { lead, accent },        // "Stop chasing numbers." / "Start building the foundation."
  body: string,
  cta: { label, href }
}
```

---

## Expertise area pages (5 of them, currently skeletons)

`OperationalDiscipline.jsx`, `FrontlineLeadership.jsx`, `EquipmentReliability.jsx`, `WorkforceCapability.jsx`, `DailyAccountability.jsx`

All five follow the same pattern: a single `<LegacyPage>` wrapper rendering a navy hero with eyebrow + title. They're placeholders pending body content.

**Future data shape (when filled in):**
```ts
{
  eyebrow: 'Expertise Areas',
  title: string,                    // "Operational Discipline"
  hero: { lede, accent, image? },
  sections: Array<{
    eyebrow,
    heading: { lead, accent },
    body,
    bullets?: string[],
    image?
  }>,
  signatureCaseStudy: { ...case study card },
  cta: { ... }
}
```

---

## Utility primitives

### `SectionShell` — `HomeV3.jsx` line 377

Standard section wrapper. Use this instead of hand-rolling `<section style={...}>`. Standardizes background, padding, max-width.

```jsx
<SectionShell bg={C.white} maxWidth={S.maxWide}>
  {children}
</SectionShell>
```

### `SectionHeader` — `HomeV3.jsx` line 405

Eyebrow + h2 + lede combo. Use this for the top of any new section.

```jsx
<SectionHeader
  eyebrow="WHAT WE BUILD"
  h2={{ lead: 'Five disciplines.', accent: 'One foundation.' }}
  lede="…"
  tone="dark"        // or "light"
  align="left"       // or "center"
/>
```

### `Eyebrow` — `HomeV3.jsx` line 1521

Standalone eyebrow component. Match the `.s3-eyebrow` / `.s4-eyebrow` treatment from `DisciplinesAndPressureExhibit.jsx` for consistency.

### `LegacyPage` — `/components/LegacyPage.jsx`

Wraps raw HTML/CSS/JS in a React-controlled shell with link interception. Used by every non-home page that hasn't been ported yet. **Read this file before touching legacy pages** — its link-interception logic is what keeps SPA navigation working.

### Case study components — `/components/caseStudy/`

| File | Purpose |
|---|---|
| `CaseStudyHero.jsx` | Hero block (title, eyebrow, key result) |
| `CaseStudyBody.jsx` | Body with section pattern (situation/action/outcome) |
| `CaseStudyCard.jsx` | Library card (used on landing + insertions) |
| `CaseStudyPrintDoc.jsx` | Print-optimized layout |
| `caseStudyStyles.js`, `caseStudiesLibraryStyles.js` | Shared style objects |

See `/data/caseStudies.js` for the canonical case study data shape (currently 1 of 67 entries built).
