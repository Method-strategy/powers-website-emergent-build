/* ════════════════════════════════════════════════════════════════════
 *  POWERS — Design Spec (single source of truth)
 *  Created 2026-06-18 — disciplined pass.
 * ════════════════════════════════════════════════════════════════════
 *
 *  Goal: stop the "all over the map" feel. Every row of the homepage
 *  (and eventually every page) imports from this module. If you find
 *  yourself typing a hex literal, a px value, or a clamp() inline in
 *  a component file — that's the bug. Add it here, or use what's
 *  already here.
 *
 *  Rule of thumb:
 *    1. No hardcoded hex anywhere outside this file. Use `COLOR.*`.
 *    2. No invented measure widths. Use `MEASURE.narrow|read|wide`.
 *    3. No hand-rolled H2 clamps. Use `TYPE.h2.size`.
 *    4. No hand-rolled section padding. Use `RHYTHM.sectionPad`.
 *    5. No mixed centered/left within one row. Use `ALIGN[rowKey]`.
 *
 *  When a row needs to break this spec, the override goes in this
 *  file as a named exception with a comment explaining why — never
 *  inline in a component.
 * ════════════════════════════════════════════════════════════════════ */

/* ── COLOR ─ Brand surface. Six values. No aliases.
 *   navy       — primary text on light, primary surface on dark
 *   navyDeep   — dark hero backgrounds, deeper navy
 *   gold       — accent / pivot / CTA
 *   body       — body copy on light
 *   paper      — light surface (white)
 *   line       — hairline rules at 14% navy
 */
export const COLOR = {
  navy:     '#143257',
  navyDeep: '#0f2a47',
  gold:     '#e89346',
  body:     '#4a5568',
  paper:    '#ffffff',
  line:     'rgba(20,50,87,0.14)',
};

/* ── MEASURE ─ Container widths. Three values. No others.
 *   narrow — single dense paragraph or tight CTA (640)
 *   read   — body prose at comfortable measure (760)
 *   wide   — full content row, card grids, diagrams (1240)
 */
export const MEASURE = {
  narrow: 640,
  read:   760,
  wide:   1240,
};

/* ── RHYTHM ─ Vertical and horizontal spacing.
 *   sectionPadY — symmetric top/bottom padding for every row
 *   sectionPadX — inner gutter for every row's content container
 *   headerToBody — gap between H2 and first paragraph
 *   paraGap    — gap between paragraphs inside a lede
 */
export const RHYTHM = {
  sectionPadY: 'clamp(56px, 5vw, 72px)',
  sectionPadX: 'clamp(24px, 4vw, 48px)',
  headerToBody: 28,
  paraGap: 18,
};

/* ── TYPE ─ One H2 ladder, one body ladder, one mono treatment.
 *
 *  H2 ladder targets the size that fits a 2-line subhead inside a
 *  1080px viewport without scrolling at desktop, while still reading
 *  as a display tier above body.
 *
 *  Every H2 on every row uses TYPE.h2. Editorial variation happens
 *  INSIDE the H2 via italic/weight contrast on inline <span>, not by
 *  varying the H2 itself. */
export const TYPE = {
  sans:  "'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  serif: "'Newsreader', 'Source Serif 4', 'Tiempos Headline', Georgia, 'Times New Roman', serif",
  mono:  "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",

  h2: {
    size:     'clamp(32px, 3.6vw, 52px)',
    weight:   800,
    lineHeight: 1.08,
    tracking: '-0.014em',
  },

  lede: {
    size:     17,
    weight:   300,
    lineHeight: 1.6,
    color:    'body',
  },

  payoff: {
    /* Used for short cadenced closing lines under a lede
     * (e.g. "Better margins. Stronger throughput. Higher returns.
     * Quarter after quarter.") Heavier weight + slightly bigger
     * so the cadence beats land. */
    size:     'clamp(18px, 1.4vw, 21px)',
    weight:   600,
    lineHeight: 1.4,
  },
};

/* ── ALIGN ─ Per-row alignment regimen.
 *
 *  Discipline: LEFT-ANCHORED IS THE DEFAULT VOICE.
 *  CENTERED is reserved for rows where the editorial text serves as
 *  caption to a centered diagram/canvas exhibit — the alignment of
 *  the text mirrors the alignment of the visual it labels.
 *
 *  Mixed alignment within a single row (centered H2 over left lede)
 *  is BANNED. */
export const ALIGN = {
  hero:       'center',    // big claim, no body
  disciplines:'center',    // disciplines diagram is centered exhibit
  pressure:   'center',    // pressure exhibit is centered canvas
  approach:   'left',      // long-form editorial argument
  metrics:    'center',    // numerical proof, symmetric grid
  industries: 'left',      // body prose + outbound link
  results:    'left',      // intro + 3 case study cards
  insights:   'left',      // intro + 3 blog cards
  cta:        'left',      // closing invitation
};
