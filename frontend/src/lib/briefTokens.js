/**
 * briefTokens.js — single source of truth for the "Operating Brief"
 * design language introduced on HomeV5 in Feb 2026.
 *
 * These tokens drive both the homepage (HomeV5.jsx, currently
 * inlined) and every interior page that adopts the brief aesthetic
 * (History, Leadership, Careers, Approach, Discovery Process, Case
 * Studies). When a value changes here, the entire brief surface
 * shifts in lockstep — no per-page palette drift, no orphaned
 * hex codes scattered across components.
 *
 * Palette rationale lives in HomeV5.jsx (the original definition
 * site); duplicated here verbatim so consumers don't need to import
 * a page file just to get a color.
 *
 *   PAPER       — bright near-white with a faint warmth. The
 *                 default reading surface. Was #f6f4ee (read as
 *                 too yellow/beige); lightened so the "paper feel"
 *                 comes from texture, not color.
 *   PAPER_DEEP  — one notch darker, used for inset surfaces
 *                 (subtle card backgrounds, hover states).
 *   NAVY        — primary text + the dark beat surface. The brief's
 *                 ink color.
 *   NAVY_DEEP   — used for closing CTA surfaces and the footer.
 *   GOLD /
 *   GOLD_BRIGHT — bright copper accent. Single value (the earlier
 *                 split into muddy/bright was collapsed Feb 2026).
 *                 Used for: section indices, italic pivots, CTAs,
 *                 the right rail's progress fill, the gold rule.
 *   RULE        — hairline rule color (navy at 16% alpha)
 *   RULE_SOFT   — softer hairline (navy at 8% alpha) for inter-
 *                 card gutters / very quiet dividers.
 *   TEXT_BODY   — main body copy on paper surfaces (navy at 72%)
 *   TEXT_MUTED  — captions, meta, secondary info (navy at 54%)
 */
export const PAPER       = '#fbfaf6';
export const PAPER_DEEP  = '#f3f0e8';
export const NAVY        = '#0d2442';
export const NAVY_DEEP   = '#0a1e36';
export const GOLD        = '#e89346';
export const GOLD_BRIGHT = '#e89346';
export const RULE        = 'rgba(13, 36, 66, 0.16)';
export const RULE_SOFT   = 'rgba(13, 36, 66, 0.08)';
export const TEXT_BODY   = 'rgba(13, 36, 66, 0.72)';
export const TEXT_MUTED  = 'rgba(13, 36, 66, 0.54)';

/**
 * Typography stacks. SANS for everything except mono accents
 * (indices, eyebrows, meta strings) and SERIF, which is reserved
 * for the gold italic "pivot" clauses inside an H2. The serif
 * italic is the brief's tonal lift — sans clause states the fact,
 * serif italic clause resolves it (e.g. "Building a strong
 * execution capability / produces results that speak for themselves.").
 * The pivot rhythm is the brief's signature voice; mis-using the
 * sans face there flattens every H2 into a single tone.
 */
export const TYPE = {
  sans:  "'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  serif: "'Newsreader', 'Source Serif 4', 'Tiempos Headline', Georgia, 'Times New Roman', serif",
  mono:  "'SF Mono', 'Menlo', Consolas, 'Liberation Mono', monospace",
};

/**
 * Header strip height. --header-h CSS variable is the single source
 * of truth; this JS export is for any code path that needs the
 * numeric value (rail offset calculations, etc.).
 */
export const HEADER_H_DESKTOP = 112;
export const HEADER_H_MOBILE  = 72;
