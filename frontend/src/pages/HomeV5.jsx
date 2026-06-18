/* ════════════════════════════════════════════════════════════════════
 *  HomeV5 — "The Shift" (2026-06-18, foundation pass)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Paradigm experiment, NOT a finished page.
 *
 *  Goal of this first commit: prove the grammar — continuous dark
 *  canvas, right-rail copper line, character-assembly H1, scroll-bound
 *  ambient temperature shift, one demonstration "station" docking onto
 *  the rail. If the grammar reads right, the remaining beats (pressure,
 *  approach, metrics, industries, results, insights, close) get
 *  threaded onto this same skeleton.
 *
 *  Rules of the grammar:
 *   1. No section borders. The page is one continuous canvas.
 *   2. Scroll IS time. Ambient color/density modulates continuously
 *      across page progress 0→1 — not at row boundaries.
 *   3. A single 1px copper hairline runs the full page on the right
 *      rail. Every beat docks onto it.
 *   4. Text is ASSEMBLED, not faded. H1 characters fly in along
 *      vectors and snap-settle; H2 reveals via clip-path wipe; ledes
 *      type-in left-to-right.
 *   5. Italics are reserved for direct attributable quotes ONLY.
 *      No more "sans-navy / serif-italic-gold" pivot on every H2.
 *   6. Gold is a SIGNAL color — fires only when something is being
 *      earned or revealed. Used sparingly so it carries weight.
 *
 *  V4 lives on at /v4-locked for client side-by-side comparison.
 * ════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLOR, TYPE } from '../lib/designSpec';

const NAVY_FLOOR   = '#0a1e36'; // deeper than COLOR.navyDeep — the "operating floor"
const NAVY_SURFACE = COLOR.navyDeep;
const GOLD         = COLOR.gold;
const GOLD_DIM     = 'rgba(232,147,70,0.32)';
const RULE         = 'rgba(232,147,70,0.22)';
const TEXT         = '#e6edf6';
const TEXT_MUTED   = 'rgba(230,237,246,0.62)';

function HomeV5() {
  const pageRef    = useRef(null);
  const heroRef    = useRef(null);
  const stationRef = useRef(null);
  const railFill   = useRef(null);
  const [mounted, setMounted] = useState(false);

  /* Scroll-bound ambient progress 0→1 across the entire page.
   * Drives: right-rail fill height, background temperature shift,
   * and any per-beat reveals as the user passes them. One single
   * rAF loop reads scroll once per frame and writes to a CSS
   * custom property at the page root — every beat reads from it
   * via var(--shift). */
  useEffect(() => {
    setMounted(true);
    const root = pageRef.current;
    if (!root) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, window.scrollY / max));
      root.style.setProperty('--shift', p.toFixed(4));
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

  /* H1 character-assembly entrance.
   * Letters render with `opacity:0` + a random (x,y,rotate) offset
   * applied via CSS variables, then animate to their resting
   * position via a staggered transition on mount. Reads as letters
   * "flying into place" along the production line rather than a
   * uniform fade. Per-letter delay is `index * 28ms`. */
  const HERO_LINES = [
    { text: 'Strong execution.',     accent: false },
    { text: 'Strong performance.',   accent: false },
    { text: 'Regardless of conditions.', accent: true },
  ];

  return (
    <div
      ref={pageRef}
      className="shift-page"
      style={{
        background: NAVY_FLOOR,
        color: TEXT,
        fontFamily: TYPE.sans,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        :root { --shift: 0; }

        .shift-page {
          /* Ambient temperature: cool navy at top (morning), warmer
             undertone mid-shift (more gold light), cooler resolution
             at the close. Driven by --shift 0→1 via mix-color. */
          background:
            radial-gradient(1200px 800px at 88% calc(8% + var(--shift) * 80%),
              rgba(232,147,70,calc(0.10 + var(--shift) * 0.06)) 0%,
              transparent 60%),
            linear-gradient(180deg,
              ${NAVY_FLOOR} 0%,
              ${NAVY_SURFACE} 50%,
              ${NAVY_FLOOR} 100%);
        }

        /* ── Right-rail production line ────────────────────────────
           A 1px copper hairline pinned to the right edge of the
           1240 content frame. Spans the full page height. The fill
           overlay grows from 0% → 100% as the user scrolls — gives
           the user a visceral sense of how far through the shift
           they are. */
        .shift-rail {
          position: absolute;
          top: 0;
          right: max(40px, calc((100% - 1240px) / 2 + 40px));
          width: 1px;
          height: 100%;
          background: ${RULE};
          pointer-events: none;
          z-index: 2;
        }
        .shift-rail-fill {
          position: absolute;
          top: 0;
          left: -0.5px;
          width: 2px;
          height: 0%;
          background: ${GOLD};
          box-shadow: 0 0 12px ${GOLD_DIM};
          transition: height 60ms linear;
        }
        /* Station tick — a 12px horizontal hairline that branches
           off the rail at each beat. Marks where the user is on the
           shift. */
        .shift-tick {
          position: absolute;
          right: 0;
          width: 28px;
          height: 1px;
          background: ${RULE};
        }
        .shift-tick.is-passed { background: ${GOLD_DIM}; }

        /* ── Hero ──────────────────────────────────────────────────
           First beat. No box, no card — the H1 sits directly on the
           dark floor. Characters assemble from random offsets along
           the rail's incoming direction. */
        .shift-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 max(40px, calc((100% - 1240px) / 2 + 40px)) 0 max(40px, calc((100% - 1240px) / 2));
          box-sizing: border-box;
        }
        .shift-eyebrow {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 64px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .shift-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: ${GOLD};
        }
        .shift-h1 {
          font-family: ${TYPE.sans};
          font-weight: 800;
          font-size: clamp(48px, 6.5vw, 104px);
          line-height: 1.02;
          letter-spacing: -0.022em;
          margin: 0;
          max-width: 1180px;
        }
        .shift-h1 .line {
          display: block;
          overflow: hidden;
        }
        .shift-h1 .ch {
          display: inline-block;
          white-space: pre;
          opacity: 0;
          transform: translate(var(--cx, 20px), var(--cy, 32px)) rotate(var(--cr, 0deg));
          transition:
            opacity 700ms cubic-bezier(.2,.7,.2,1),
            transform 900ms cubic-bezier(.2,.85,.2,1);
        }
        .shift-page.is-mounted .shift-h1 .ch {
          opacity: 1;
          transform: translate(0,0) rotate(0);
        }
        .shift-h1 .accent { color: ${GOLD}; }

        .shift-sub {
          font-family: ${TYPE.mono};
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          margin-top: 64px;
          /* The footer line of the hero — a bracket that names the
             content type ("01 / The shift begins"). Gives the user
             a sense they're reading something structured, not
             marketing fluff. */
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .shift-sub .seg {
          flex: 0 0 auto;
        }
        .shift-sub .rule {
          flex: 1 1 auto;
          height: 1px;
          background: ${RULE};
        }

        /* ── Station (beat 2 demo) ─────────────────────────────────
           Each station docks onto the rail with a horizontal tick
           and a left-anchored title block. Reveal: clip-path wipe
           from left to right when scrolled into view. The animation
           is bound to a per-station IO + a one-shot class — once
           passed, stays revealed (the shift moves forward, never
           erases what's behind). */
        .shift-station {
          position: relative;
          min-height: 80vh;
          padding: 18vh max(40px, calc((100% - 1240px) / 2 + 40px)) 18vh max(40px, calc((100% - 1240px) / 2));
          box-sizing: border-box;
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1.2fr);
          gap: clamp(40px, 6vw, 96px);
          align-items: start;
        }
        .station-index {
          font-family: ${TYPE.mono};
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: ${GOLD};
        }
        .station-h2 {
          font-family: ${TYPE.sans};
          font-weight: 800;
          font-size: clamp(34px, 4vw, 58px);
          line-height: 1.06;
          letter-spacing: -0.014em;
          color: ${TEXT};
          margin: 18px 0 0;
        }
        .station-lede {
          font-family: ${TYPE.sans};
          font-weight: 300;
          font-size: 17px;
          line-height: 1.65;
          color: ${TEXT_MUTED};
          margin: 0;
          max-width: 640px;
        }
        .station-lede p { margin: 0 0 18px; }

        /* Clip-path wipe reveal — left to right, like a header
           being printed onto a standard. The default state is
           hidden; the .is-in class triggers the reveal. */
        .wipe {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1000ms cubic-bezier(.2,.7,.2,1);
        }
        .shift-station.is-in .wipe { clip-path: inset(0 0 0 0); }
        .shift-station.is-in .wipe-delay-1 { transition-delay: 120ms; }
        .shift-station.is-in .wipe-delay-2 { transition-delay: 280ms; }
        .shift-station.is-in .wipe-delay-3 { transition-delay: 460ms; }

        /* Direct attributable quote — earns italics. */
        .shift-quote {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(22px, 2.2vw, 30px);
          line-height: 1.32;
          color: ${TEXT};
          margin: 32px 0 12px;
          max-width: 540px;
        }
        .shift-quote-attr {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
        }

        @media (max-width: 900px) {
          .shift-station { grid-template-columns: 1fr; gap: 24px; }
          .shift-rail { right: 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .shift-h1 .ch { opacity: 1; transform: none; transition: none; }
          .wipe { clip-path: inset(0 0 0 0); transition: none; }
        }
      `}</style>

      {/* ── Top bar (minimal — borrowed pattern from V4 chrome) ─────
          Header is identical to V4's so users don't lose orientation
          when they land. */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10,30,54,0.78)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(232,147,70,0.10)',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          padding: '0 40px',
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ color: TEXT, textDecoration: 'none', fontWeight: 800, letterSpacing: '0.04em' }}>
            POWERS
          </Link>
          <nav style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }}>
            <a href="/approach"    style={navLink}>Approach</a>
            <a href="/case-studies" style={navLink}>Results</a>
            <a href="/insights"     style={navLink}>Insights</a>
            <a href="/contact"      style={ctaLink}>Let&rsquo;s Talk</a>
          </nav>
        </div>
      </header>

      {/* ── The production-line rail ───────────────────────────────
          Pinned to the right edge of the content frame. Spans the
          full page height with a copper fill that tracks scroll. */}
      <div className="shift-rail" aria-hidden="true">
        <div className="shift-rail-fill" ref={railFill} />
      </div>

      {/* ── BEAT 01 — Hero (the shift begins) ──────────────────── */}
      <section ref={heroRef} className={`shift-hero ${mounted ? 'is-mounted' : ''}`}>
        <span className="shift-tick" style={{ top: '50%' }} aria-hidden="true" />
        <div className="shift-eyebrow" data-testid="hero-eyebrow">
          01 / The shift begins · 05:42
        </div>
        <h1 className="shift-h1" data-testid="hero-h1">
          {HERO_LINES.map((line, li) => (
            <span className="line" key={li}>
              {Array.from(line.text).map((c, ci) => {
                // Random per-character entrance vector — letters
                // fly in from semi-random directions and rotate
                // slightly. Deterministic based on index so SSR/
                // re-render is stable.
                const seed = (li * 31 + ci * 17) % 100;
                const dx = ((seed * 7) % 60) - 30;
                const dy = 24 + (seed % 16);
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
        <div className="shift-sub">
          <span className="seg">POWERS · operations performance</span>
          <span className="rule" />
          <span className="seg">scroll to begin</span>
        </div>
      </section>

      {/* ── BEAT 02 — Station: What we build ─────────────────────
          Demonstration of the station grammar. When the section
          enters viewport, the wipe class reveals each block in
          left-to-right cascade. Header docks onto the rail via the
          .shift-tick element. */}
      <StationOne stationRef={stationRef} />

      {/* ── Placeholder for remaining beats ──────────────────────
          Beats 03–09 (Pressure, Approach, Metrics, Industries,
          Results, Insights, Close) get threaded onto this same
          skeleton once the grammar above is approved. */}
      <section style={{
        minHeight: '60vh',
        padding: '12vh max(40px, calc((100% - 1240px) / 2)) 18vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 1240,
        margin: '0 auto',
      }}>
        <div style={{
          fontFamily: TYPE.mono,
          fontSize: 12,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: TEXT_MUTED,
          marginBottom: 18,
        }}>
          {String.fromCharCode(0x2014)} Foundation pass
        </div>
        <div style={{
          fontFamily: TYPE.sans,
          fontWeight: 300,
          fontSize: 17,
          lineHeight: 1.65,
          color: TEXT_MUTED,
          maxWidth: 640,
        }}>
          Beats 03–09 (Pressure, Approach, Metrics, Industries, Results, Insights, Close)
          thread onto this same skeleton once the grammar above reads right.
          V4 stays live at <a href="/v4-locked" style={{ color: GOLD }}>/v4-locked</a> for side-by-side.
        </div>
      </section>

      {/* ── Minimal footer (mirrors V4 footer chrome) ──────────── */}
      <footer style={{
        background: NAVY_SURFACE,
        borderTop: '1px solid rgba(232,147,70,0.14)',
        padding: '48px max(40px, calc((100% - 1240px) / 2))',
        fontFamily: TYPE.sans,
        fontSize: 13,
        color: TEXT_MUTED,
        textAlign: 'center',
      }}>
        Strong Execution. Strong Performance.
      </footer>
    </div>
  );
}

const navLink = {
  color: TEXT,
  textDecoration: 'none',
  opacity: 0.85,
};
const ctaLink = {
  color: GOLD,
  textDecoration: 'none',
  border: '1px solid ' + GOLD,
  padding: '10px 16px',
  fontWeight: 600,
  letterSpacing: '0.04em',
};

/* ── Station component (extracted so the IO-driven reveal logic
 *    stays clean). Mirrors the grammar future stations will inherit. */
function StationOne({ stationRef }) {
  const elRef = useRef(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect(); // one-shot — the shift moves forward
        }
      }),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={(node) => { elRef.current = node; if (stationRef) stationRef.current = node; }} className="shift-station">
      <span className="shift-tick is-passed" style={{ top: '18vh' }} aria-hidden="true" />
      <div>
        <div className="station-index wipe">02 / What we build</div>
        <h2 className="station-h2 wipe wipe-delay-1">
          We build the disciplines to execute. No matter what.
        </h2>
      </div>
      <div className="wipe wipe-delay-2">
        <p className="station-lede">
          Five disciplines built into how the operation executes every shift,
          every day, every quarter. Not five initiatives. Not five priorities.
          Weaken one and the others drift. Build them together and they
          interlock into something load&#8209;bearing, deep enough that
          performance doesn&rsquo;t break down when conditions do.
        </p>
        <div className="wipe wipe-delay-3">
          <p className="shift-quote">
            &ldquo;If you&rsquo;re working, we&rsquo;re working.&rdquo;
          </p>
          <div className="shift-quote-attr">Floor practice &middot; POWERS</div>
        </div>
      </div>
    </section>
  );
}

export default HomeV5;
