import {
  NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT,
  TEXT_BODY, TYPE,
} from '../lib/briefTokens';

/**
 * briefDocStyles — single source of truth for the body-grammar of
 * every interior page in the "Operating Brief" design language.
 *
 * Each interior page mounts <BriefDocStyles /> once, then leans on
 * the shared classes (brief-doc-h1, brief-doc-h2, station-index,
 * brief-doc-body, brief-doc-rule-gold, wipe, etc.). Changing a rule
 * here updates every brief page in lockstep — exactly the parity
 * the client review demanded.
 *
 * Two distinct treatments to keep straight:
 *
 *   HERO (.brief-doc-h1)
 *     - Sans (Proxima Nova) throughout, weight 800.
 *     - One clause may flip to gold via the .accent class.
 *     - NO italic, NO serif on the accent — that was a client-
 *       caught regression in Careers/History v1. The homepage hero
 *       uses only a color flip; the brief signature serif italic
 *       belongs to body section pivots, not the hero.
 *
 *   BODY SECTION (.brief-doc-h2 .pivot)
 *     - Sans clause + italic-serif-gold pivot. This is the brief's
 *       tonal-lift voice (Newsreader / Source Serif 4 in gold).
 *
 * Both are flex column containers so a clause can stack onto a new
 * line cleanly without needing a <br>. The accent/pivot span is the
 * trailing child by convention.
 */

const briefDocCss = `
  /* Box-sizing inheritance for the entire brief surface. */
  .brief-doc * { box-sizing: border-box; }

  /* ── Hero ─────────────────────────────────────────────────────
     Full-bleed page hero. Defaults to navy slab; consuming pages
     can flip background via inline style if a page-specific
     treatment is needed (cream hero, image hero, etc.). */
  .brief-page-hero {
    position: relative;
    padding: clamp(120px, 14vh, 180px) 0 clamp(96px, 12vh, 140px);
    overflow: hidden;
    background: ${NAVY};
  }
  .brief-page-hero .brief-doc-inner { color: #ffffff; }

  /* ── Station (body sections) ─────────────────────────────────
     Standard interior page section. Page sets the background via
     inline style (PAPER / PAPER_DEEP / NAVY) so the surface rhythm
     alternates cleanly down the page. */
  .brief-doc-station {
    padding: clamp(80px, 10vh, 140px) 0;
    position: relative;
  }

  /* Page-edge frame — full viewport width with grid-aligned
     padding. NOT capped to max-width: the inner column handles its
     own measure, and stacking both max-widths here used to shrink
     content to 140px when the page combined .brief-doc-inner with
     .brief-doc-col on the same element. */
  .brief-doc-inner {
    width: 100%;
    padding: 0 max(40px, calc((100% - 1240px) / 2 + 40px));
    box-sizing: border-box;
  }

  /* Reading-measure column. Wraps eyebrow + h2 + body into the
     900px sweet spot for serious prose. Wrap the col INSIDE the
     inner, never combine the classes on a single element. */
  .brief-doc-col { max-width: 900px; }

  /* Two-column split for "X / image" stations. */
  .brief-doc-split {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  @media (max-width: 1023px) {
    .brief-doc-split { grid-template-columns: 1fr; gap: 56px; }
  }

  /* ── Typography ──────────────────────────────────────────────
     Locked to the HomeV5 rhythm so the brief reads as one
     continuous document across pages. */
  .station-index {
    font-family: ${TYPE.mono};
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: ${GOLD_BRIGHT};
    margin-bottom: 20px;
  }

  /* Hero H1 — sans only. Stacks clauses vertically via flex-column
     so headlines can break across 2-3 lines without inline <br>.
     The .accent class flips a clause to GOLD color, matching the
     homepage hero's "Regardless of conditions." treatment.
     IMPORTANT: no italic, no serif on the accent. */
  .brief-doc-h1 {
    font-family: ${TYPE.sans};
    font-size: clamp(40px, 5vw, 64px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.012em;
    margin: 0;
    text-wrap: balance;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .brief-doc-h1 .accent {
    color: ${GOLD_BRIGHT};
    /* Sans, no italic, no serif — matches homepage hero exactly. */
  }

  /* Body H2 — sans clause + italic-serif-gold pivot. This is the
     brief's signature tonal lift inside content sections. */
  .brief-doc-h2 {
    font-family: ${TYPE.sans};
    font-size: clamp(28px, 3.4vw, 40px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.008em;
    color: ${NAVY};
    margin: 0;
    text-wrap: balance;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .brief-doc-h2 .pivot {
    font-family: ${TYPE.serif};
    font-style: italic;
    font-weight: 500;
    font-size: 1.02em;
    color: ${GOLD_BRIGHT};
    letter-spacing: -0.012em;
    text-wrap: pretty;
    margin-top: 0.06em;
  }

  /* Hero lede & body copy. */
  .brief-doc-lede {
    font-family: ${TYPE.sans};
    font-size: clamp(17px, 1.5vw, 21px);
    font-weight: 300;
    line-height: 1.55;
    text-wrap: pretty;
    margin: 0;
  }
  .brief-doc-body {
    font-family: ${TYPE.sans};
    font-size: 17px;
    font-weight: 300;
    line-height: 1.72;
    color: ${TEXT_BODY};
    margin-top: 28px;
    text-wrap: pretty;
    max-width: 720px;
  }
  .brief-doc-body p + p { margin-top: 1.1em; }
  .brief-doc-body em { font-style: italic; color: ${NAVY}; font-weight: 500; }

  /* Hairline rules. */
  .brief-doc-rule {
    width: 80px;
    height: 1px;
    background: ${GOLD_BRIGHT};
    border: 0;
  }
  .brief-doc-rule-gold {
    width: 64px;
    height: 1px;
    background: ${GOLD_BRIGHT};
    margin: 24px 0 0;
  }

  /* ── Wipe animation ──────────────────────────────────────────
     Port of HomeV5's .wipe class. Each element starts clipped 100%
     from the right and reveals left-to-right when its parent
     station gains .is-in (toggled by IntersectionObserver). */
  .wipe {
    clip-path: inset(-0.4em 100% -0.5em 0);
    transition: clip-path 900ms cubic-bezier(.4, 0, .2, 1);
  }
  .brief-doc-station.is-in .wipe,
  .brief-page-hero.is-in .wipe { clip-path: inset(-0.4em 0 -0.5em 0); }
  .wipe-d1 { transition-delay: 120ms; }
  .wipe-d2 { transition-delay: 240ms; }
  .wipe-d3 { transition-delay: 360ms; }
  .wipe-d4 { transition-delay: 480ms; }

  /* Placeholder image tile for split sections that don't have
     real media yet. Diagonal pinstripes on navy so it's clearly
     a placeholder vs. a styling decision. */
  .brief-doc-placeholder {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: ${NAVY}
      repeating-linear-gradient(135deg, rgba(232,147,70,0.06) 0 12px, transparent 12px 24px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .brief-doc-placeholder-label {
    font-family: ${TYPE.mono};
    font-size: 11px;
    letter-spacing: 0.12em;
    color: rgba(232,147,70, 0.55);
    text-transform: uppercase;
    padding: 0 24px;
    text-align: center;
    line-height: 1.6;
  }

  /* ── CTAs ────────────────────────────────────────────────────
     Two patterns:
       .brief-doc-cta-link    — gold-underline link (Read More →)
       .brief-doc-cta-button  — filled gold button (View Open Jobs)
     Pages choose based on action weight. */
  .brief-doc-cta-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: ${TYPE.sans};
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${GOLD_BRIGHT};
    text-decoration: none;
    border-bottom: 1px solid ${GOLD_BRIGHT};
    padding-bottom: 4px;
    transition: color 160ms ease, border-color 160ms ease;
  }
  .brief-doc-cta-link:hover { color: ${NAVY}; border-color: ${NAVY}; }
  .brief-doc-cta-arrow { transition: transform 200ms ease; }
  .brief-doc-cta-link:hover .brief-doc-cta-arrow { transform: translateX(4px); }
  .brief-doc-cta-button {
    display: inline-block;
    background: ${GOLD_BRIGHT};
    color: ${NAVY};
    font-family: ${TYPE.sans};
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 16px 36px;
    text-decoration: none;
    transition: background 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  }
  .brief-doc-cta-button:hover {
    background: #d27a30;
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -12px rgba(13, 36, 66, 0.4);
  }

  /* Reduced-motion respect: clip-path sweeps off, leave content
     in its final visible state. */
  @media (prefers-reduced-motion: reduce) {
    .wipe { clip-path: none !important; }
  }

  @media (max-width: 767px) {
    .brief-doc-station { padding: 64px 0; }
    .brief-doc-body { font-size: 16px; }
  }
`;

export default function BriefDocStyles() {
  return <style>{briefDocCss}</style>;
}

/* Shared in-view hook used by every station to toggle .is-in for
   the wipe choreography. Mount the section's ref + threshold; the
   class flips automatically as the user scrolls. Replays on
   re-entry which is exactly the homepage's behavior. */
import React, { useEffect } from 'react';
export function useInViewClass(ref, threshold = 0.18) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => el.classList.toggle('is-in', e.isIntersecting)),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
}

/* Color/type tokens re-exported here for convenience so consuming
   pages can `import BriefDocStyles, { useInViewClass, NAVY, ... }`
   from one place instead of two. */
export { NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE };
