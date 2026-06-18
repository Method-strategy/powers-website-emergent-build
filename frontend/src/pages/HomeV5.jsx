/* ════════════════════════════════════════════════════════════════════
 *  HomeV5 — "The Operating Brief" (2026-06-18, foundation pass v2)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Paradigm pivot from "The Shift" (operator-floor) to "The Operating
 *  Brief" (C-suite). Per direction:
 *   • Dark mode is OUT (client previously rejected). Light dominant
 *     paper background with one navy beat reserved for the pressure
 *     exhibit.
 *   • Voice shifts from shift/operator vocabulary to board-room
 *     vocabulary ("I / Position", "II / Thesis", "III / Mechanism",
 *     etc.) — what a PE operating partner or CEO actually thinks in.
 *   • Header uses NAVY background with the dark-bg POWERS logo. Menu
 *     items match the V4 spec exactly (Results / About / Insights /
 *     Let's Talk) — those are pre-planned pages.
 *
 *  Grammar that stays from "The Shift":
 *   1. No section borders — page reads as one continuous document.
 *   2. Right-rail line (now navy on cream, with gold "earned" fill).
 *   3. Character-assembly H1 (letters fly into place).
 *   4. Clip-path wipe reveals for H2/lede (left-to-right "print on
 *      a standard").
 *   5. Italics ONLY for direct attributable quotes — at most 3 in
 *      the whole document.
 *   6. Gold is a signal color, used sparingly.
 *
 *  V4 lives on at /v4-locked for client side-by-side comparison.
 * ════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef, useState } from 'react';
import { TYPE } from '../lib/designSpec';

/* ── Palette (this paradigm) ──────────────────────────────────────
 *  PAPER  — slight warm cream, NOT pure white. Reads as documents
 *           print onto stock, not as a marketing site.
 *  NAVY   — primary text + the dark beat surface
 *  GOLD   — earned-signal accent. Sparingly used.
 *  RULE   — hairline rule color (navy at low alpha) */
const PAPER       = '#f6f4ee';
const PAPER_DEEP  = '#efece4';
const NAVY        = '#0d2442';
const NAVY_DEEP   = '#0a1e36';
const GOLD        = '#c8821f';
const GOLD_BRIGHT = '#e89346';
const RULE        = 'rgba(13, 36, 66, 0.16)';
const RULE_SOFT   = 'rgba(13, 36, 66, 0.08)';
const TEXT_BODY   = 'rgba(13, 36, 66, 0.72)';
const TEXT_MUTED  = 'rgba(13, 36, 66, 0.54)';

function HomeV5() {
  const pageRef  = useRef(null);
  const railFill = useRef(null);
  const [mounted, setMounted] = useState(false);

  /* Scroll-bound ambient progress 0→1 across the full page.
   * Single rAF loop. Drives the right-rail fill height and exposes
   * --brief-progress as a CSS variable for any element that wants
   * to bind itself to the document position. */
  useEffect(() => {
    setMounted(true);
    const root = pageRef.current;
    if (!root) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, window.scrollY / max));
      root.style.setProperty('--brief-progress', p.toFixed(4));
      if (railFill.current) railFill.current.style.height = (p * 100).toFixed(2) + '%';
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const HERO_LINES = [
    { text: 'Strong execution.',         accent: false },
    { text: 'Strong performance.',       accent: false },
    { text: 'Regardless of conditions.', accent: true },
  ];

  return (
    <div
      ref={pageRef}
      className={`brief-page ${mounted ? 'is-mounted' : ''}`}
      style={{
        background: PAPER,
        color: NAVY,
        fontFamily: TYPE.sans,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        :root { --brief-progress: 0; }

        .brief-page {
          /* Paper texture — extremely subtle warm vignette on the
             right edge to anchor the rail. NOT a gradient that
             dominates; a faint warm wash that disappears as you
             scroll past the hero. */
          background:
            radial-gradient(900px 600px at 92% 6%,
              rgba(232,147,70, calc(0.06 - var(--brief-progress) * 0.06)) 0%,
              transparent 60%),
            ${PAPER};
        }

        /* ── Right rail (the spine of the brief) ──────────────────
           Navy hairline with a gold "earned progress" fill. The gold
           grows as the reader advances — the metaphor is that
           reading the brief IS earning the gold. */
        .brief-rail {
          position: absolute;
          top: 0;
          right: max(40px, calc((100% - 1240px) / 2 + 40px));
          width: 1px;
          height: 100%;
          background: ${RULE};
          pointer-events: none;
          z-index: 2;
        }
        .brief-rail-fill {
          position: absolute;
          top: 0;
          left: -0.5px;
          width: 2px;
          height: 0%;
          background: ${GOLD};
          box-shadow: 0 0 10px rgba(200, 130, 31, 0.32);
          transition: height 60ms linear;
        }
        .brief-tick {
          position: absolute;
          right: 0;
          width: 28px;
          height: 1px;
          background: ${RULE};
        }

        /* ── Page header strip ────────────────────────────────────
           Mono row above the hero that names the document. Reads
           like the cover page of an internal operating brief, not
           a website. */
        .brief-cover {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.30em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          padding: 28px max(40px, calc((100% - 1240px) / 2)) 0;
          display: flex;
          justify-content: space-between;
          gap: 24px;
        }
        .brief-cover .meta-rule {
          flex: 1 1 auto;
          height: 1px;
          background: ${RULE_SOFT};
          align-self: center;
        }

        /* ── Beat: Hero ───────────────────────────────────────────
           Same character-assembly motion as the paradigm prototype.
           Letters fly in along per-character vectors, snap-settle.
           Reads on cream paper with navy text — confident, restrained. */
        .brief-hero {
          position: relative;
          min-height: calc(100vh - 84px - 50px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px max(40px, calc((100% - 1240px) / 2 + 40px)) 40px max(40px, calc((100% - 1240px) / 2));
          box-sizing: border-box;
        }
        .brief-section-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.30em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 56px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brief-section-num::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: ${GOLD};
        }
        .brief-h1 {
          font-family: ${TYPE.sans};
          font-weight: 800;
          font-size: clamp(48px, 6.2vw, 96px);
          line-height: 1.03;
          letter-spacing: -0.022em;
          margin: 0;
          max-width: 1180px;
          color: ${NAVY};
        }
        .brief-h1 .line {
          display: block;
          overflow: hidden;
        }
        .brief-h1 .ch {
          display: inline-block;
          white-space: pre;
          opacity: 0;
          transform: translate(var(--cx, 16px), var(--cy, 28px)) rotate(var(--cr, 0deg));
          transition:
            opacity 700ms cubic-bezier(.2,.7,.2,1),
            transform 900ms cubic-bezier(.2,.85,.2,1);
        }
        .brief-page.is-mounted .brief-h1 .ch {
          opacity: 1;
          transform: translate(0,0) rotate(0);
        }
        .brief-h1 .accent { color: ${GOLD}; }

        .brief-hero-footer {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          margin-top: 64px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .brief-hero-footer .rule {
          flex: 1 1 auto;
          height: 1px;
          background: ${RULE_SOFT};
        }

        /* ── Beat 02 (demo) — Position / What we build ────────────
           Two-column. Left: section index + H2. Right: lede + the
           earned italic quote. Reveals via clip-path wipe in a
           cascade as it enters the viewport. */
        .brief-station {
          position: relative;
          padding: 14vh max(40px, calc((100% - 1240px) / 2 + 40px)) 14vh max(40px, calc((100% - 1240px) / 2));
          box-sizing: border-box;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
          gap: clamp(40px, 6vw, 96px);
          align-items: start;
        }
        .station-divider {
          /* A hairline rule above each station — marks the page
             "section break" in the brief without using a thick line
             or color band. */
          position: absolute;
          top: 0;
          left: max(40px, calc((100% - 1240px) / 2));
          right: max(40px, calc((100% - 1240px) / 2));
          height: 1px;
          background: ${RULE_SOFT};
        }
        .station-index {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.30em;
          text-transform: uppercase;
          color: ${GOLD};
        }
        .station-h2 {
          font-family: ${TYPE.sans};
          font-weight: 800;
          font-size: clamp(32px, 3.8vw, 54px);
          line-height: 1.06;
          letter-spacing: -0.014em;
          color: ${NAVY};
          margin: 18px 0 0;
          text-wrap: pretty;
        }
        .station-lede {
          font-family: ${TYPE.sans};
          font-weight: 400;
          font-size: 17px;
          line-height: 1.62;
          color: ${TEXT_BODY};
          margin: 0;
          max-width: 580px;
        }

        /* Clip-path wipe reveal — left-to-right "print onto a
           standard" pattern. Replaces fade-ins. */
        .wipe {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1000ms cubic-bezier(.2,.7,.2,1);
        }
        .brief-station.is-in .wipe { clip-path: inset(0 0 0 0); }
        .brief-station.is-in .wipe-d1 { transition-delay: 120ms; }
        .brief-station.is-in .wipe-d2 { transition-delay: 280ms; }
        .brief-station.is-in .wipe-d3 { transition-delay: 460ms; }

        .brief-quote {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(22px, 2.2vw, 28px);
          line-height: 1.34;
          color: ${NAVY};
          margin: 32px 0 12px;
          max-width: 540px;
        }
        .brief-quote-attr {
          font-family: ${TYPE.mono};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
        }

        /* ── Header (navy chrome) ─────────────────────────────────
           Background sits on navy with the dark-bg POWERS logo on
           the left and the same V4 menu structure on the right.
           Sticky. Same height (84) as V4 so layout doesn't jump if
           the client compares side-by-side. */
        .brief-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: ${NAVY};
          border-bottom: 1px solid rgba(232,147,70, 0.22);
        }
        .brief-header-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .brief-logo img {
          height: 57px;
          width: auto;
          display: block;
        }
        .brief-nav {
          display: flex;
          align-items: center;
          gap: 36px;
        }
        .brief-nav a {
          font-family: ${TYPE.sans};
          font-size: 14px;
          font-weight: 500;
          color: #f3f0e8;
          text-decoration: none;
          letter-spacing: 0.01em;
          opacity: 0.92;
          transition: color 160ms ease, opacity 160ms ease;
        }
        .brief-nav a:hover { color: ${GOLD_BRIGHT}; opacity: 1; }
        .brief-nav a.cta {
          border: 1px solid ${GOLD_BRIGHT};
          padding: 10px 18px;
          color: ${GOLD_BRIGHT};
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .brief-nav a.cta:hover {
          background: ${GOLD_BRIGHT};
          color: ${NAVY};
        }

        /* ── Footer ───────────────────────────────────────────── */
        .brief-footer {
          background: ${NAVY_DEEP};
          color: rgba(243, 240, 232, 0.78);
          padding: 56px max(40px, calc((100% - 1240px) / 2));
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-align: center;
          border-top: 1px solid rgba(232,147,70, 0.18);
        }
        .brief-footer-tag {
          display: block;
          margin-top: 8px;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0;
          text-transform: none;
          color: rgba(243, 240, 232, 0.92);
        }

        @media (max-width: 900px) {
          .brief-station { grid-template-columns: 1fr; gap: 24px; }
          .brief-rail { right: 24px; }
          .brief-cover { padding: 18px 24px 0; flex-wrap: wrap; }
          .brief-nav { gap: 18px; }
          .brief-nav a:not(.cta) { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brief-h1 .ch { opacity: 1; transform: none; transition: none; }
          .wipe { clip-path: inset(0 0 0 0); transition: none; }
        }
      `}</style>

      {/* ── Navy header (V4 menu structure + dark-bg logo) ─────── */}
      <header className="brief-header">
        <div className="brief-header-inner">
          <a href="/" className="brief-logo" aria-label="POWERS">
            <img src="/uploads/powers-logo-dark.png" alt="POWERS" />
          </a>
          <nav className="brief-nav" data-testid="brief-nav">
            <a href="/case-studies">Results</a>
            <a href="/approach">About</a>
            <a href="/insights">Insights</a>
            <a href="/contact" className="cta">Let&rsquo;s Talk</a>
          </nav>
        </div>
      </header>

      {/* ── Cover meta strip ───────────────────────────────────── */}
      <div className="brief-cover" aria-hidden="true">
        <span>Operating Brief &middot; 2026</span>
        <span className="meta-rule" />
        <span>POWERS &middot; Confidential to the reader</span>
      </div>

      {/* ── Right-rail spine ───────────────────────────────────── */}
      <div className="brief-rail" aria-hidden="true">
        <div className="brief-rail-fill" ref={railFill} />
      </div>

      {/* ── Beat 01 — Position ─────────────────────────────────── */}
      <section className="brief-hero">
        <span className="brief-tick" style={{ top: '52%' }} aria-hidden="true" />
        <div className="brief-section-num" data-testid="hero-section-num">
          I &nbsp;/&nbsp; Position
        </div>
        <h1 className="brief-h1" data-testid="hero-h1">
          {HERO_LINES.map((line, li) => (
            <span className="line" key={li}>
              {Array.from(line.text).map((c, ci) => {
                const seed = (li * 31 + ci * 17) % 100;
                const dx = ((seed * 7) % 60) - 30;
                const dy = 20 + (seed % 14);
                const dr = ((seed % 12) - 6);
                const delay = (li * 280) + (ci * 28);
                return (
                  <span
                    key={ci}
                    className={`ch${line.accent ? ' accent' : ''}`}
                    style={{
                      '--cx': dx + 'px',
                      '--cy': dy + 'px',
                      '--cr': dr + 'deg',
                      transitionDelay: delay + 'ms',
                    }}
                  >{c}</span>
                );
              })}
            </span>
          ))}
        </h1>
        <div className="brief-hero-footer">
          <span>For the operator and the board</span>
          <span className="rule" />
          <span>Scroll to read</span>
        </div>
      </section>

      {/* ── Beat 02 — Thesis (demo of the station grammar) ────── */}
      <Station
        index="II  /  Thesis"
        headline="We build the disciplines to execute. No matter what."
        body="Five disciplines built into how the operation executes every shift, every day, every quarter. Not five initiatives. Not five priorities. Weaken one and the others drift. Build them together and they interlock into something load-bearing, deep enough that performance doesn’t break down when conditions do."
        quote="If you’re working, we’re working."
        attr="Floor practice · POWERS"
      />

      {/* ── Foundation placeholder ─────────────────────────────── */}
      <section style={{
        padding: '12vh max(40px, calc((100% - 1240px) / 2)) 16vh',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: 640,
          fontFamily: TYPE.mono,
          fontSize: 11,
          letterSpacing: '0.30em',
          textTransform: 'uppercase',
          color: TEXT_MUTED,
          marginBottom: 18,
        }}>
          — Foundation pass
        </div>
        <div style={{
          maxWidth: 640,
          fontFamily: TYPE.sans,
          fontWeight: 400,
          fontSize: 17,
          lineHeight: 1.62,
          color: TEXT_BODY,
        }}>
          Sections III–IX (Mechanism, Pressure, Evidence, Industries, Results,
          Insights, Action) thread onto this same skeleton once the grammar above
          reads right. V4 stays live at <a href="/v4-locked" style={{ color: GOLD, textDecoration: 'none', borderBottom: '1px solid ' + GOLD }}>/v4-locked</a> for side-by-side.
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="brief-footer">
        <span>POWERS &middot; Operations performance consulting</span>
        <span className="brief-footer-tag">Strong Execution. Strong Performance.</span>
      </footer>
    </div>
  );
}

/* ── Station component — every beat below the hero uses this. */
function Station({ index, headline, body, quote, attr }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      }),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="brief-station">
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" style={{ top: '14vh' }} aria-hidden="true" />
      <div>
        <div className="station-index wipe">{index}</div>
        <h2 className="station-h2 wipe wipe-d1">{headline}</h2>
      </div>
      <div className="wipe wipe-d2">
        <p className="station-lede">{body}</p>
        {quote && (
          <div className="wipe wipe-d3">
            <p className="brief-quote">&ldquo;{quote}&rdquo;</p>
            <div className="brief-quote-attr">{attr}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeV5;
