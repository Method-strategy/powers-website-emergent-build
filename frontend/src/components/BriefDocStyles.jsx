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
     Full-bleed page hero on the brand PAPER (cream) surface — same
     light background the approved homepage uses for its hero. The
     navy hero treatment that appeared in earlier History/Careers
     drafts was an unauthorized artifact carried over from the
     legacy/unapproved pages; it has been removed in favor of the
     locked PAPER/navy-text/gold-accent grammar that defines the
     brief. Page text inherits NAVY from .brief-doc; lede sits at
     TEXT_BODY so paragraph copy stays consistent with body
     stations. */
  .brief-page-hero {
    position: relative;
    /* Top padding clears the 112px fixed BriefHeader and adds
       viewport-scaled breathing room above the content. Tightened
       from clamp(56px, 8vh, 120px) → clamp(36px, 5vh, 88px) and
       bottom padding from clamp(96px, 12vh, 140px) → clamp(64px,
       9vh, 112px) so the H1 + lede + rule cluster sits comfortably
       inside 100dvh on 1366x768 laptops without scrolling. */
    padding: calc(var(--header-h, 112px) + clamp(36px, 5vh, 88px)) 0 clamp(64px, 9vh, 112px);
    overflow: hidden;
    background: ${PAPER};
    /* Viewport-filling row, matching the homepage hero + Approach +
       DiscoveryProcess pattern. Without min-height the hero collapses
       to its content height, leaving short pages (like Case Studies
       whose lede is more compact) noticeably shorter than the taller
       interior heroes — visible as a depth glitch when switching
       between pages. 100dvh - header-h keeps the hero just below the
       fixed nav; flex-column + center vertically centers the eyebrow
       + H1 + lede + rule cluster in whatever extra space is left. */
    min-height: calc(100dvh - var(--header-h, 112px));
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .brief-page-hero .brief-doc-inner { color: ${NAVY}; position: relative; z-index: 2; }

  /* ── Hero ghosted background image (optional) ──────────────────
     Mirrors the homepage hero's transparent-video pattern, but with
     a still image (each interior page picks its own gritty, candid
     shop-floor shot). Same sepia + saturation + multiply-blend
     treatment so the image reads as a tint of the cream PAPER
     instead of a foreign photograph. Object-cover fills any aspect
     ratio without letterboxing; opacity stays low so navy hero text
     remains legible on top.

     Opt-in via:
       <section class="brief-page-hero">
         <img class="brief-page-hero-bg" src="..." alt="" />
         <div class="brief-page-hero-wash" />
         <div class="brief-doc-inner"> ... content ... </div>
       </section>

     The same class also accepts a <video class="brief-page-hero-bg">
     for atmospheric loops (Operational Discipline + the four sister
     discipline pages). Use:
       <video class="brief-page-hero-bg" autoPlay muted loop
              playsInline preload="metadata" poster="...">
         <source src="...webm" type="video/webm" />
         <source src="...mp4"  type="video/mp4"  />
       </video>
     object-fit, mix-blend-mode, opacity, and filter all apply to
     <video> exactly as they do to <img>, so the ghosted+grit look
     stays identical across static and motion heros.
  */
  .brief-page-hero-bg {
    /* Ghosted background photograph — DISABLED sitewide Feb 2026.
     *
     * Original intent: mirror the homepage's transparent-video
     * pattern with a still shop-floor image on interior page
     * heroes. At 16% opacity + sepia + multiply blend under a
     * radial cream wash, the photo was supposed to read as an
     * atmospheric warm tint on the cream paper — not a visible
     * photograph.
     *
     * Reality (caught by the print-designer review, Feb 2026):
     * Even at very low effective opacity, the photograph carries
     * differential tonal weight across its frame (e.g. lighter
     * top-left with sky/ambient light vs. darker right-of-center
     * where the workers stand). That differential composites as
     * a light→dark gradient bleeding out of the right edge of
     * every hero on every interior page. Reviewer initially
     * assumed it was an Emergent preview-embed watermark; it
     * wasn't, it was our own photo layer. A stronger uniform
     * cream wash (0.92 alpha) knocked the photo back to ~1.3%
     * effective opacity but the differential still read as a
     * ghost gradient to a trained eye.
     *
     * Fix: display: none. No photograph = no differential = no
     * gradient. The cream PAPER surface + the ::after fractal
     * noise grain on the wash still supply the tactile "paper
     * stock" feel the photo was meant to warm. The <img> element
     * itself is left in the JSX (harmless, and easy to re-enable
     * per-page later by removing this rule on a specific hero).
     *
     * If you re-enable this on any single page, either:
     *   (a) crop/edit the image so its tonal weight is uniform
     *       side-to-side (an even wash of texture, not a scene
     *       with subjects clustered on one side), or
     *   (b) accept that the "gradient" is intentional atmosphere.
     */
    display: none !important;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
    z-index: 0;
    opacity: 0.16;
    filter: sepia(0.95) saturate(1.55) hue-rotate(-10deg) brightness(1.10) contrast(0.90);
    mix-blend-mode: multiply;
    pointer-events: none;
    user-select: none;
  }
  /* Cream wash sitting between the image and the hero content.
     Historical treatment (v1) was a radial gradient centered at
     20% 50% that faded to 0% alpha at 100% — deliberately letting
     the ghosted photograph read through on the right side of the
     hero as "atmosphere." A print designer on the review side
     called it correctly Feb 2026: what reads as intentional
     atmosphere on a rich photograph reads as an unwanted gray/
     black gradient bleeding out of the right edge on a cream
     surface, especially at desktop widths where the darker photo
     shadows sit exactly where the eye lands after finishing the
     H1. Fixed by making the wash a UNIFORM near-opaque cream
     across the entire hero — the photograph now contributes only
     as a very faint underlying tone (opacity 0.16 × cream 0.92
     over ≈ 1–2% visible), and the ::after noise overlay handles
     the tactile paper-stock feel on its own. No visible gradient
     anywhere on the surface. */
  .brief-page-hero-wash {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: rgba(251, 250, 246, 0.92);
  }
  .brief-page-hero-wash::after {
    /* Fractal-noise grain overlay — DISABLED alongside the photo
     * (Feb 2026, print-designer review). Was a subtle "newsprint
     * grit" texture atop the ghosted photo; with the photo now
     * hidden, the noise sits directly over the cream PAPER with
     * mix-blend-mode: overlay, which could contribute imperceptible
     * tonal shifts to a trained eye. Disabling to guarantee a
     * mathematically uniform cream surface across every hero.
     * Re-enable per-page if a specific hero wants extra grit. */
    content: none;
  }
  @media (max-width: 720px) {
    /* Mobile: same uniform-cream treatment as desktop above; the
       previous mobile-specific radial-with-falloff was solving a
       problem (portrait-crop photo dominating text) that the
       uniform wash already solves outright — the photo is now
       ~99% suppressed everywhere, so no per-viewport variant is
       needed. Kept the block as a hook in case a future page
       wants a mobile-only override. */
    .brief-page-hero-wash {
      background: rgba(251, 250, 246, 0.94);
    }
  }

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

  /* Hero H1 — sans only. Stacks clauses vertically via flex-column.
     Sized to match the approved HomeV5 hero exactly:
     clamp(48px, 6.2vw, 96px). Previous interior-page rebuilds
     shipped at 40-64px, a leftover from the unapproved pages —
     corrected to the homepage spec so every page hero reads at
     the same scale. */
  .brief-doc-h1 {
    font-family: ${TYPE.sans};
    /* Cap reduced from 96px to 76px so longer two-clause hero
       titles (e.g. "Equipment Reliability. Where uptime,
       throughput, and margin meet.") still fit the accent on
       a single visual line at 1366px+ and keep the entire hero
       within 100vh on standard laptops. Lower bound + scaling
       slope preserved so short heroes still feel commanding. */
    font-size: clamp(44px, 5vw, 76px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.014em;
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
     brief's signature tonal lift inside content sections. Sized
     to match the approved HomeV5 station h2 exactly:
     clamp(30px, 3.4vw, 48px). Previous interior-page rebuilds
     shipped at 28-40px, an artifact from the unapproved pages —
     corrected so every section heading reads at the same scale. */
  .brief-doc-h2 {
    font-family: ${TYPE.sans};
    font-size: clamp(30px, 3.4vw, 48px);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.014em;
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

  /* Hero lede & body copy. Lede size matches the HomeV5
     station-lede (17px). Was clamp(17, 1.5vw, 21px) — adjusted
     to the homepage spec so the same paragraph type reads the
     same on every page. */
  .brief-doc-lede {
    font-family: ${TYPE.sans};
    font-size: 17px;
    font-weight: 400;
    line-height: 1.62;
    color: ${TEXT_BODY};
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
  }
  .brief-doc-body p + p { margin-top: 1.1em; }
  .brief-doc-body em { font-style: italic; color: ${NAVY}; font-weight: 500; }

  /* ── Inline link grammar ─────────────────────────────────────
     Global gold inline-link used for in-paragraph link targets
     across the brief (Approach → Discovery Process, Discovery
     Process → Approach + Case Studies, Case Studies CTA →
     Discovery Process, future Insights / Leadership / Careers
     body copy). Single source of truth so every page reads in
     the same voice.

     Variants:
       .brief-inline-link              Default (navy / paper surfaces)
       .brief-inline-link--on-dark     Brightens enough to read on
                                       the navy Engagement band / CTA
                                       chassis without losing the
                                       gold identity.
  */
  .brief-inline-link {
    color: ${GOLD_BRIGHT};
    text-decoration: underline;
    text-decoration-color: rgba(232, 147, 70, 0.45);
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
    transition: text-decoration-color 160ms ease, color 160ms ease;
    font-weight: 500;
  }
  .brief-inline-link:hover {
    text-decoration-color: ${GOLD_BRIGHT};
    color: #d27d2e;
  }
  .brief-inline-link--on-dark {
    color: ${GOLD_BRIGHT};
    text-decoration-color: rgba(232, 147, 70, 0.55);
  }
  .brief-inline-link--on-dark:hover {
    color: #ffd9a8;
    text-decoration-color: #ffd9a8;
  }

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
