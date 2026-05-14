/**
 * typo(text)  —  Typography hygiene helper.
 *
 * Replaces the regular ASCII space between high-risk "orphan-prone" short
 * words and the word that follows them with a non-breaking space (\u00A0).
 * This prevents the following typographic faux pas:
 *
 *   - Articles ("The", "A", "An") landing alone at the end of a line
 *   - Short prepositions / conjunctions ("Or", "If", "So", "Of") doing
 *     the same
 *   - Common contractions ("It's", "That's", "Don't") stranded at the
 *     end of a line ahead of their predicate
 *
 * The matched word + its following whitespace get fused into a single
 * unbreakable unit, so the browser's line-breaking algorithm wraps the
 * whole pair down together when there isn't room for both.
 *
 * Use this on every body-copy string passed into a <p> or similar text
 * element. Display type (H1/H2/eyebrow) usually doesn't need it because
 * `text-wrap: balance` handles those.
 *
 *   <p>{typo("That's the sound of an operation producing...")}</p>
 *
 * Why a helper instead of marking up NBSPs by hand: the helper is one
 * decision, applied once. Manual marking requires re-inspecting every
 * paragraph at every line-width across every breakpoint after every
 * edit — which is what burns time and tokens.
 *
 * The helper is intentionally CONSERVATIVE. It only glues at points
 * where an orphan would be a clear typographic mistake. It does not
 * try to fix every possible bad wrap; `text-wrap: pretty` does the
 * rest of the work on the last 1-2 lines of each paragraph.
 */

// Words that, if landing alone at a line end, look like orphans.
// Matched case-insensitively but the original case is preserved.
const ORPHAN_PRONE = [
  // Articles
  'The', 'A', 'An',
  // Conjunctions
  'And', 'But', 'Or', 'Nor', 'Yet', 'So', 'If',
  // Short prepositions
  'At', 'By', 'In', 'On', 'To', 'Of', 'Up', 'As', 'For',
  // Common contractions / sentence starters
  "It's", "That's", "Don't", "We're", "They're", "You're", "We've", "We'll",
  // Numbers can also strand
  'Is', 'Was', 'Are',
];

// Build the regex once. We match the word + whitespace, capturing the word
// so we can re-emit it. The `\b` boundaries keep us from matching inside
// longer words. The 's flag isn't needed; the space class catches \s.
//
// Note we encode "It's" etc. with both straight (') and curly (\u2019)
// apostrophes since either may appear in copy.
function escapeForRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const ORPHAN_PATTERN = new RegExp(
  '\\b(' +
    ORPHAN_PRONE
      .flatMap((w) =>
        w.includes("'")
          ? [w, w.replace(/'/g, '\u2019')] // straight + curly apostrophe variants
          : [w]
      )
      .map(escapeForRegex)
      .join('|') +
  ')(\\s)',
  'gi'
);

export function typo(text) {
  if (text == null) return text;
  return String(text).replace(ORPHAN_PATTERN, (_, word /* , space */) => word + '\u00A0');
}

export default typo;
