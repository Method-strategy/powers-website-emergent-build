import React, { useEffect, useRef } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import {
  NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT,
  TEXT_BODY, TYPE,
} from '../lib/briefTokens';

/**
 * History — POWERS' origin story, rebuilt Feb 2026 in the
 * "Operating Brief" design language introduced on HomeV5.
 *
 * Structure mirrors the original content (Hero, Where It Started,
 * How We Evolved, A New Chapter, The Constants, CTA) — copy is
 * preserved verbatim per the client review note that this pass is
 * design/aesthetic only. Visual treatment now matches the brief:
 *
 *   - BriefHeader (fixed navy strip, italic running tagline,
 *     gold rule, mega-menu nav) replaces the legacy SiteHeader
 *   - BriefFooter replaces the legacy SiteFooter
 *   - Each section follows the brief's beat grammar:
 *         eyebrow (mono small caps, gold)
 *         h2 (sans bold navy, italic gold "pivot" tail)
 *         lede (long-form serious body in TEXT_BODY)
 *   - Alternating paper / navy surfaces give the "page-break"
 *     rhythm the brief uses on the homepage
 *   - Wipe-in entries triggered by IntersectionObserver match the
 *     homepage's `.wipe` left-to-right clip-path sweep
 *   - The "Constants" section uses a 5-up disciplined list of the
 *     founding principles, styled like the homepage's discipline
 *     cards — same gold rule + drop-in choreography
 *
 * No scroll-snap: interior pages are normal scroll documents, per
 * the locked design decision. Snap is a homepage-only signature.
 */

/* Helper: trigger a one-shot `.is-in` class when the section
   enters the viewport so the .wipe clip-path animation plays. */
function useInViewClass(ref, threshold = 0.18) {
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

const FOUNDING_PRINCIPLES = [
  'We earn the right to return to a client every week by delivering on our commitments.',
  'Clients first, company second, self third.',
  'Frontline leadership is the most critical and most underinvested role in manufacturing.',
  'Behavioral change is a skill and an art that must be handled with discipline.',
  'We deliver on schedule, always.',
];

export default function History() {
  useEffect(() => {
    document.title = 'History | POWERS Manufacturing Consulting';
  }, []);

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <PageStyles />
      <BriefHeader mode="interior" />

      {/* Content sits below the fixed 112/72px header. */}
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <HeroBeat />
        <SectionWhereItStarted />
        <SectionHowWeEvolved />
        <SectionNewChapter />
        <SectionTheConstants />
        <SectionCTA />
      </main>

      <BriefFooter />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Beats                                                          */
/* ──────────────────────────────────────────────────────────────── */

function HeroBeat() {
  const ref = useRef(null);
  useInViewClass(ref);
  return (
    <section ref={ref} className="brief-page-hero" style={{ background: NAVY }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ color: GOLD_BRIGHT, marginBottom: 24 }}>Our Story</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            Built from the floor up. <span style={{ color: GOLD_BRIGHT, fontStyle: 'italic' }}>Since 2004.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ color: 'rgba(255,255,255,0.86)', marginTop: 28, maxWidth: 760 }}>
            POWERS was not founded by academics or career consultants. It was founded by executives who had run manufacturing operations, managed P&amp;Ls, and understood firsthand where performance breaks down and why it stays broken.
          </p>
          <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 64 }} />
        </div>
      </div>
    </section>
  );
}

function SectionWhereItStarted() {
  const ref = useRef(null);
  useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">Where It Started</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Gainesville, Georgia.</span>
            <span className="pivot">2004.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Randall Powers founded POWERS in Gainesville, Georgia, with a team of C-level executives who shared a common conviction: that the gap between executive intent and shop floor performance was not a strategy problem. It was a systems, leadership, and discipline problem. And it could be solved, permanently, by working inside the operation rather than advising from outside it.</p>
            <p>That founding conviction has never changed. Every engagement POWERS takes on today is built on the same principle that drove the first one in 2004. <em>Get on the floor. Work with the people. Build what holds.</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHowWeEvolved() {
  const ref = useRef(null);
  useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER_DEEP }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">How We Evolved</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Two decades on the floor built something</span>
            <span className="pivot">no competitor has.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Over twenty years of engagements across food and beverage, aerospace and defense, automotive, pharmaceutical, metals and mining, medical devices, and private equity portfolio operations, POWERS developed something that can only come from that kind of accumulated experience: a proprietary methodology that integrates management operating systems, frontline leadership development, and real-time operational visibility into a single coherent approach.</p>
            <p>That approach is not a framework borrowed from Lean or Six Sigma. It is the direct result of watching what breaks, understanding why it breaks, and building the systems that prevent it from breaking again. The Management Operating System POWERS installs is not a product. It is an outcome built from the inside, tailored to how each specific organization operates.</p>
            <p>The Digital Production System, POWERS&rsquo; proprietary execution layer, came from the same place. Not from a software team working from a distance, but from consultants on the floor who saw the same gap repeated across hundreds of engagements: organizations had data, but the data was not driving decisions at the speed and level required to maintain execution consistency. DPS closes that gap.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionNewChapter() {
  const ref = useRef(null);
  useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-split">
          <div>
            <div className="station-index wipe">A New Chapter</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Atlanta.</span>
              <span className="pivot">2021.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <div className="brief-doc-body wipe wipe-d3">
              <p>In 2021, POWERS relocated its corporate headquarters from Gainesville to Atlanta, Georgia, establishing its offices at 1801 Peachtree Street NE. The move reflected what had been true for years: POWERS had grown into a firm operating at national and global scale, serving manufacturing leaders across industries and geographies, and its home base needed to reflect that ambition.</p>
              <p>The work still happens on the floor. <em>That has never changed.</em> But Atlanta positions POWERS to attract the caliber of talent the firm&rsquo;s next chapter requires and keeps it connected to the broader business and investment community it increasingly serves.</p>
            </div>
          </div>
          <div className="brief-doc-placeholder wipe wipe-d3" aria-hidden="true">
            <span className="brief-doc-placeholder-label">
              Atlanta skyline / 1801 Peachtree St NE<br />
              <em>placeholder</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTheConstants() {
  const ref = useRef(null);
  useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: NAVY }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>The Constants</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
            <span>Twenty years in.</span>
            <span className="pivot">The founding principles still run the firm.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3" style={{ color: 'rgba(255,255,255,0.78)' }}>
            <p>The industries have expanded. The methodology has deepened. The team has grown. But the operating principles Randall Powers built the firm on in 2004 are the same ones that govern every engagement today.</p>
          </div>
        </div>

        {/* Principles list — full inner width (NOT inside .brief-doc-col)
            so the 5-up grid uses the full content area instead of
            being constrained to the 900px reading column. */}
        <div className="principles-row">
          <div className="principles-rule" aria-hidden="true" />
          <ol className="principles-list">
            {FOUNDING_PRINCIPLES.map((p, i) => (
              <li key={i} className="principle-card" style={{ ['--i']: i }}>
                <span className="principle-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="principle-text">&ldquo;{p}&rdquo;</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SectionCTA() {
  const ref = useRef(null);
  useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station brief-doc-cta" style={{ background: PAPER }}>
      <div className="brief-doc-inner" style={{ textAlign: 'center', paddingTop: 96, paddingBottom: 96 }}>
        <h2 className="brief-doc-h2 wipe" style={{ margin: '0 auto', maxWidth: 760, alignItems: 'center' }}>
          <span>See what twenty years of this approach</span>
          <span className="pivot">produces.</span>
        </h2>
        <div style={{ marginTop: 36 }} className="wipe wipe-d2">
          <a href="/case-studies" className="brief-doc-cta-link">
            Read the Case Studies <span className="brief-doc-cta-arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Page-scoped styles                                             */
/* ──────────────────────────────────────────────────────────────── */

function PageStyles() {
  return (
    <style>{`
      .brief-doc * { box-sizing: border-box; }

      /* Page hero — full-bleed navy slab. Matches the HomeV5 hero
         spec for typography but without the video/swarm; History
         carries its own gravitas via copy + ample padding. */
      .brief-page-hero {
        position: relative;
        padding: clamp(120px, 14vh, 180px) 0 clamp(96px, 12vh, 140px);
        overflow: hidden;
      }
      .brief-page-hero .brief-doc-inner { color: #ffffff; }

      /* Stations — alternating paper / paper-deep / navy surfaces. */
      .brief-doc-station {
        padding: clamp(80px, 10vh, 140px) 0;
        position: relative;
      }
      /* Outer page-edge frame. Spans the full viewport width; its
         padding pushes content inside to align with the 1240-grid
         centerline. Note: NOT capped to max-width — that would
         compound with .brief-doc-col's own max-width and shrink
         the content area to nothing. The inner column handles its
         own measure constraint. */
      .brief-doc-inner {
        width: 100%;
        padding: 0 max(40px, calc((100% - 1240px) / 2 + 40px));
        box-sizing: border-box;
      }
      /* Reading-measure column for prose-heavy stations. Wraps
         eyebrow + h2 + body into a single 900px-max read width
         and centers nothing — content is left-aligned, the
         leftover space lives on the right (standard editorial
         single-column behavior). */
      .brief-doc-col { max-width: 900px; }
      .brief-doc-split {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 80px;
        align-items: center;
      }
      @media (max-width: 1023px) {
        .brief-doc-split { grid-template-columns: 1fr; gap: 56px; }
      }

      /* Typography — locked to the HomeV5 type rhythm so the brief
         feels like one continuous document across pages. */
      .station-index {
        font-family: ${TYPE.mono};
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: ${GOLD_BRIGHT};
        margin-bottom: 20px;
      }
      .brief-doc-h1 {
        font-family: ${TYPE.sans};
        font-size: clamp(40px, 5vw, 64px);
        font-weight: 800;
        line-height: 1.04;
        letter-spacing: -0.012em;
        margin: 0;
        text-wrap: balance;
      }
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
        /* Gold italic "pivot" clause — the resolution phrase inside
           each H2. Must use the SERIF face (Newsreader / Source
           Serif 4) to deliver the brief's signature sans→italic-
           gold tonal lift. Inheriting sans here was a regression
           from the homepage spec and was caught in the History POC
           review. Sized 1.02× the sans clause so cap height aligns
           cleanly even though the serif x-height runs slightly
           smaller than Proxima Nova at the same px. */
        font-family: ${TYPE.serif};
        font-style: italic;
        font-weight: 500;
        font-size: 1.02em;
        color: ${GOLD_BRIGHT};
        letter-spacing: -0.012em;
        text-wrap: pretty;
        margin-top: 0.06em;
      }
      .brief-doc-lede {
        font-family: ${TYPE.sans};
        font-size: clamp(17px, 1.5vw, 21px);
        font-weight: 300;
        line-height: 1.55;
        text-wrap: pretty;
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
      .brief-doc-body em {
        font-style: italic;
        color: ${NAVY};
        font-weight: 500;
      }

      /* Rules — gold hairlines used as visual page breaks. */
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

      /* Wipe animation — port of HomeV5's .wipe class. Each station's
         eyebrow, h2, body, etc. start clipped 100% from the right
         and reveal left-to-right when the section gains .is-in. */
      .wipe {
        clip-path: inset(-0.4em 100% -0.5em 0);
        transition: clip-path 900ms cubic-bezier(.4, 0, .2, 1);
      }
      .brief-doc-station.is-in .wipe,
      .brief-page-hero.is-in .wipe {
        clip-path: inset(-0.4em 0 -0.5em 0);
      }
      .wipe-d1 { transition-delay: 120ms; }
      .wipe-d2 { transition-delay: 240ms; }
      .wipe-d3 { transition-delay: 360ms; }

      /* Placeholder media tile (used by the "Atlanta 2021" split). */
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

      /* CTA section closing link. Now sits on the cream PAPER
         surface (was NAVY_DEEP) — gold text on cream still reads
         strongly. Hover collapses to NAVY for the stronger
         "clicked" cue that white-on-navy used to provide. */
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

      /* ── The five founding principles ───────────────────────────
         Rendered in HomeV5's discipline-card grammar: a single gold
         rule strikes across the row first, then the five cards drop
         in from 12px above with a 70ms stagger. Choreography fires
         when the parent station gains .is-in.

         Cards sit in a 5-up grid on desktop, 2-up at tablet, 1-up
         at mobile — same breakpoint pattern as the homepage. */
      .principles-row {
        position: relative;
        margin-top: 56px;
      }
      .principles-rule {
        height: 1px;
        background: ${GOLD_BRIGHT};
        width: 100%;
        margin-bottom: 28px;
        transform-origin: left center;
        transform: scaleX(0);
      }
      .brief-doc-station.is-in .principles-rule {
        animation: principles-rule-draw 360ms cubic-bezier(.4, 0, .2, 1) 320ms forwards;
      }
      @keyframes principles-rule-draw {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      .principles-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 1px;
        background: rgba(232,147,70, 0.18);
      }
      @media (max-width: 1100px) {
        .principles-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 600px) {
        .principles-list { grid-template-columns: 1fr; }
      }
      .principle-card {
        background: ${NAVY_DEEP};
        padding: 26px 22px 30px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        color: #ffffff;
        position: relative;
        transition:
          transform 220ms cubic-bezier(.2, .8, .2, 1),
          background-color 220ms ease;
        will-change: transform;
      }
      .principle-card:hover {
        background: #0e2542;
        transform: translateY(-3px);
      }
      .brief-doc-station.is-in .principle-card {
        animation: principle-drop 380ms cubic-bezier(.2, .85, .25, 1) backwards;
        animation-delay: calc(680ms + var(--i, 0) * 70ms);
      }
      @keyframes principle-drop {
        from { opacity: 0; transform: translateY(-12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .principle-num {
        font-family: ${TYPE.mono};
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: ${GOLD_BRIGHT};
        line-height: 1;
      }
      .principle-text {
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 400;
        line-height: 1.5;
        color: rgba(255,255,255,0.92);
        font-style: italic;
        text-wrap: pretty;
      }

      /* Reduced-motion respect: no clip-path sweeps, no drop-in,
         no rule draw — just static surfaces in their final state. */
      @media (prefers-reduced-motion: reduce) {
        .wipe { clip-path: none !important; }
        .principles-rule { transform: scaleX(1) !important; }
        .brief-doc-station.is-in .principles-rule,
        .brief-doc-station.is-in .principle-card { animation: none !important; }
        .principle-card { opacity: 1 !important; transform: none !important; }
      }

      @media (max-width: 767px) {
        .brief-doc-station { padding: 64px 0; }
        .brief-doc-body { font-size: 16px; }
      }
    `}</style>
  );
}
