# Design System

## Locked Spec — Type & Color System

This is non-negotiable. Stakeholder-approved. Source: `POWERS_Brand_Design_Tokens.docx`.

## Color tokens

| Token | Hex | Usage | Notes |
|---|---|---|---|
| `navy` | `#143257` | Text on light; primary surface on dark backgrounds | LOCKED |
| `navyDeep` | `#0f2a47` | Hero backgrounds, dark section fills | LOCKED |
| `body` | `#4a5568` | Body text on light backgrounds | LOCKED |
| `bodyDark` | `rgba(230,237,246,0.78)` | Body text on dark backgrounds (hero lede) | LOCKED |
| `gold` | `#e89346` | The single accent color. Used on italic serif keywords, eyebrows, hover states, CTA. Max 3 uses per row. | LOCKED |
| `blue` | `#3e80c1` | Structural blue — dividers, borders, illustrative line work only. Never text. | LOCKED |
| `hairline` | `rgba(20, 50, 87, 0.14)` | Section dividers, card borders | LOCKED |
| `paper` / `white` | `#ffffff` | Default background for every content section | LOCKED |
| `signalRed` | `#e0654f` | Canvas-only: hero swarm negative numbers, S4 pressure labels | Used inside `<canvas>` only |
| `signalGreen` | `#5bbf73` | Canvas-only: hero swarm positive numbers, S4 outcome labels | Used inside `<canvas>` only |

### Deprecated aliases (do not use in new code)

Left in the codebase as backwards-compat shims to spec-equivalent values. The grep will find them; **do not introduce them in new code**.

| Deprecated | Resolves to | Reason for retirement |
|---|---|---|
| `copper` | `#e89346` (gold) | Renamed — was a duplicate accent |
| `gold600`, `gold200` | `#e89346` | Spec mandates a single gold |
| `amber`, `rust` | `#e89346` | Same — single accent |
| `ink`, `navy900` | `#0f2a47` | Pre-spec naming |
| `navy400` | `#4a5568` | Pre-spec naming |
| `ivory`, `bone` | `#ffffff` | Spec mandates pure white |

## Type system

### Font families

```js
const SANS  = '"proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';
const SERIF = '"Newsreader","Source Serif 4","Tiempos Headline",Georgia,"Times New Roman",serif';
const MONO  = '"JetBrains Mono","IBM Plex Mono",ui-monospace,"SFMono-Regular",Menlo,Consolas,monospace';
```

| Family | Loaded via | Used for |
|---|---|---|
| **Proxima Nova** | Adobe Fonts in production (Adobe kit ID TBD by Patrik) | Default sans for body, headlines, UI |
| **Newsreader** | Google Fonts `?family=Newsreader:ital,opsz,wght@1,6..72,500` | Italic accent keywords in h2/h3 — the editorial pivot pattern |
| **JetBrains Mono** | Google Fonts `?family=JetBrains+Mono:wght@500` | Uppercase eyebrows above section headings |

⚠️ **The Newsreader italic span is what makes the brand voice work.** Every section headline follows the pattern: sans navy primary clause + Newsreader italic gold accent clause. See section-by-section examples in `COMPONENT_INVENTORY.md`.

### Type scale

Defined in `HomeV3.jsx` as the `S` constant (line 317):

```js
const S = {
  // Headings
  h2Size:     'clamp(34px, 4.2vw, 56px)',  // section h2 — single size used by every row
  h2Weight:   800,
  h2LH:       1.08,
  h2Tracking: '-0.014em',
  h3Size:     'clamp(20px, 2vw, 26px)',
  h3Weight:   700,

  // Body
  ledeSize:   17,
  ledeLH:     1.65,
  ledeWeight: 300,
};
```

### Editorial type rules

1. **Sentence case for all headings.** Not Title Case. "Five disciplines. One foundation." not "Five Disciplines. One Foundation."
2. **Editorial variation lives inside the H2**, not at the H2 level. The H2 size/weight is fixed; variation comes from a serif italic gold span within it.
3. **Eyebrows are mono, uppercase, 0.24em tracked, gold, 11.5px.** The full pattern:
   ```
   WHAT WE BUILD        ← MONO eyebrow (gold)
   Five disciplines.    ← H2 sans navy
   One foundation.      ← H2 newsreader italic gold (same line, inline span)
   Lede paragraph…      ← Sans 17/1.65 weight 300, body color
   ```
4. **Lede width is constrained.** Most ledes use `max-width: 44em` or `S.maxRead` (760px) to maintain optimal reading measure.
5. **`textWrap: 'pretty'` for body, `textWrap: 'balance'` for h2.** Already applied throughout.

## Layout primitives

### Approved measures (use these, not custom widths)

```js
S.maxNarrow  // 640px — punchy hero or single-thesis focal content
S.maxRead    // 760px — body reading copy, lede paragraphs
S.maxWide    // 1280px — section containers, card grids, exhibits
```

The 1280px wide measure is the **canonical content frame width**. Every section, the header, and the footer all align to this.

### Section padding

```js
S.sectionPadY  // clamp(56px, 5vw, 72px) — vertical breathing room per row
S.sectionPadX  // clamp(24px, 4vw, 48px) — horizontal gutter inside maxWidth container
```

Inner content area at desktop = 1280 - 96 = **1184px usable**.

### Breakpoints

| Breakpoint | Trigger | What changes |
|---|---|---|
| `> 880px` | desktop | Default — multi-column grids, side-by-side hero, sticky elements |
| `<= 880px` | tablet | Most multi-column layouts collapse to single column. Section 3 cards stack vertically (canvas connectors hidden). |
| `<= 480px` | phone | Tighter padding, smaller core sizes, narrower gaps |
| `max-height: 640px` (desktop) | short laptops | Hero padding compresses |
| `max-height: 560px` | very short | Hero enforces 600px min-height |

## Alignment

**Left-anchored is the default editorial voice.** Centered is reserved for big moments:
- Hero
- The S3 "Together, they form your *ability to execute…*" payoff line
- The S4 copy block (signal-in/out exhibit deserves a centered "stage" treatment)
- The closing CTA

This discipline is what fixes the "all over the place" feeling. Don't reach for `text-align: center` casually.

## The editorial pivot pattern

This is the brand voice in code form. Every section H2 splits into two clauses:

```jsx
<h2 className="...">
  <span className="sans">Five disciplines.</span>
  <span className="serif">One foundation.</span>
</h2>
```

```css
.sans  { font-family: SANS;  font-weight: 800; color: navy; }
.serif { font-family: SERIF; font-style: italic; font-weight: 500; color: gold; margin-left: 0.2em; }
```

Examples in current build:
- *Stop Chasing **Numbers.*** (hero)
- *Five disciplines. **One foundation.*** (S3)
- *Strong numbers. **Regardless of conditions.*** (S4)
- *We work where the **work happens.*** (How We Work — variant)
- *Stop chasing numbers. **Start building the foundation.*** (CTA)

**When porting to the CMS:** the headline field should ideally be split into `lead` and `accent` parts at the content-model level so editors can author both halves without HTML markup. See `COMPONENT_INVENTORY.md` for per-component data shapes.

## Visual rhythm

The homepage alternates dark and light backgrounds in a deliberate pattern. **Do not break this rhythm without intent.**

| Row | Background |
|---|---|
| Hero | Navy gradient (radial, dark) |
| A different approach | White |
| Five disciplines (S3) | White |
| Strong numbers (S4) | White |
| How we work | White |
| Metrics | Navy (sets up the proof claim) |
| Where we work | White |
| Insights | White |
| CTA | Gold wash on navy (drama close) |

S3 and S4 are intentionally on continuous white — this is the choreography that lets the "core" element appear to travel from S3 down into S4. See `SECTION_CHOREOGRAPHY.md`.
