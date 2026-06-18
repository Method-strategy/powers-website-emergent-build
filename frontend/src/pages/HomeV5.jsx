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
 *  PAPER  — bright, near-white with a faint warmth. Lightened
 *           Feb 2026 from #f6f4ee (read as too yellow/beige) so the
 *           paper feel comes from texture, not color.
 *  NAVY   — primary text + the dark beat surface
 *  GOLD   — bright copper accent (unified with V4's gold). Was
 *           split into a muddy #c8821f for indices + a bright
 *           #e89346 for hovers; collapsed to one bright value so
 *           accents in indices, italic pivots, and CTAs all carry
 *           the same temperature.
 *  RULE   — hairline rule color (navy at low alpha) */
const PAPER       = '#fbfaf6';
const PAPER_DEEP  = '#f3f0e8';
const NAVY        = '#0d2442';
const NAVY_DEEP   = '#0a1e36';
const GOLD        = '#e89346';
const GOLD_BRIGHT = '#e89346';
const RULE        = 'rgba(13, 36, 66, 0.16)';
const RULE_SOFT   = 'rgba(13, 36, 66, 0.08)';
const TEXT_BODY   = 'rgba(13, 36, 66, 0.72)';
const TEXT_MUTED  = 'rgba(13, 36, 66, 0.54)';

function HomeV5() {
  const pageRef  = useRef(null);
  const railFill = useRef(null);
  const [mounted, setMounted] = useState(false);
  /* Mega-menu state — mirrors V4's hover-with-timer pattern so the
   * pre-planned menu and submenu structure ports over intact. */
  const [openMega, setOpenMega] = useState(null);
  const closeTimer = useRef(null);
  const openMenu  = (name) => { clearTimeout(closeTimer.current); setOpenMega(name); };
  const schedClose = ()     => { closeTimer.current = setTimeout(() => setOpenMega(null), 140); };
  const cancelClose = ()    => clearTimeout(closeTimer.current);

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
          /* Single-frame presentation — each beat occupies one full
             viewport. Scroll-snap engages on the page container so
             one scroll = one beat advance. Removes the "you can see
             two rows at once" artifact that broke the illusion the
             user is paging through a document. */
          scroll-snap-type: y mandatory;
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
        /* Every top-level section snaps to the top of the viewport
           on scroll and is at minimum a full viewport tall. Hero +
           stations + pressure + evidence + cards beats + action all
           inherit this. Display/layout is NOT forced here — each
           section keeps its own (.brief-hero is flex, .brief-station
           is grid). Stations vertically center their content via
           align-content:center on the grid. */
        .brief-page > section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .brief-station {
          align-content: center;
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
          /* Hammer-strike entrance (Feb 2026 rev) — replaces the
             soft curl+fade. Each character starts 22px above its
             resting position with zero opacity, then SNAPS down
             with a tight recoil ease (cubic-bezier(.34,1.3,.5,1)
             — the 1.3 second value gives a sub-pixel overshoot at
             landing, reading as a hammer striking and bouncing
             back into place, not a graceful settle). Opacity flips
             on at the start of motion (40ms linear) so the
             character appears WITH the strike, not before it.
             Total per-character motion: 110ms. Per-character delay
             is set inline as 28ms × index, giving a fast typewriter-
             strike cadence rather than the previous wave. */
          opacity: 0;
          transform: translateY(-22px);
          transition: opacity 40ms linear, transform 110ms cubic-bezier(.34, 1.3, .5, 1);
        }
        .brief-page.is-mounted .brief-h1 .ch {
          opacity: 1;
          transform: translateY(0);
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
          /* Tightened cap Feb 2026 (54 → 48) so the longest sans
             clause on the page ("Operations built on strong
             execution produce" = 44 chars) fits on one line within
             the 1240 station frame at every viewport from 900px up.
             Previously the 54px cap force-wrapped "produce" onto
             its own line above ~1700px viewport. */
          font-size: clamp(30px, 3.4vw, 48px);
          line-height: 1.06;
          letter-spacing: -0.014em;
          color: ${NAVY};
          margin: 18px 0 0;
          text-wrap: pretty;
        }
        /* Serif-italic-gold pivot — the "earned" clause inside each
           H2. Reintroduced Feb 2026 from V4 (this concept's voice
           wants the same sans→italic-gold tonal lift on the
           resolution phrase). Sized to match the sans clause so
           cap height aligns. */
        .station-h2 .pivot {
          display: block;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          color: ${GOLD_BRIGHT};
          letter-spacing: -0.012em;
          margin-top: 0.06em;
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
           Navy background with the dark-bg POWERS logo. Menu items +
           submenu structure are LOCKED — match V4 exactly because
           those map to pre-planned pages. */
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
        .brief-nav-link {
          font-family: ${TYPE.sans};
          font-size: 14px;
          font-weight: 500;
          color: #f3f0e8;
          background: transparent;
          border: none;
          text-decoration: none;
          letter-spacing: 0.01em;
          opacity: 0.92;
          padding: 6px 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 160ms ease, opacity 160ms ease;
        }
        .brief-nav-link:hover,
        .brief-nav-link[data-open="true"] {
          color: ${GOLD_BRIGHT};
          opacity: 1;
        }
        .brief-nav-link .caret {
          display: inline-block;
          width: 0; height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid currentColor;
          opacity: 0.7;
          transition: transform 180ms ease;
        }
        .brief-nav-link[data-open="true"] .caret { transform: rotate(180deg); }
        .brief-nav-link.cta {
          border: 1px solid ${GOLD_BRIGHT};
          padding: 10px 18px;
          color: ${GOLD_BRIGHT};
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .brief-nav-link.cta:hover {
          background: ${GOLD_BRIGHT};
          color: ${NAVY};
        }

        /* Mega menu panel container — flush below the header.
           Uses opacity + transform for the open/close transition so
           the panel sits at z-index above the page body. */
        .brief-mega-wrap {
          position: relative;
          margin-top: -1px;
        }
        .brief-mega {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 200;
        }
        .brief-mega-panel {
          background: ${NAVY};
          border: 1px solid rgba(232,147,70, 0.14);
          border-top: 1px solid ${GOLD_BRIGHT};
          box-shadow: 0 12px 40px rgba(8, 22, 42, 0.55);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 180ms ease, transform 180ms ease;
          pointer-events: none;
        }
        .brief-mega-panel[data-open="true"] {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .brief-mega-link {
          display: block;
          font-family: ${TYPE.sans};
          font-size: 14px;
          font-weight: 500;
          color: #f3f0e8;
          text-decoration: none;
          padding: 9px 0;
          letter-spacing: 0.005em;
          opacity: 0.88;
          transition: color 140ms ease, opacity 140ms ease;
        }
        .brief-mega-link:hover { color: ${GOLD_BRIGHT}; opacity: 1; }
        .brief-mega-section-label {
          font-family: ${TYPE.mono};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 8px;
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

      {/* ── Navy header (V4 menu + submenu structure, locked) ────
          Mega menus mirror V4's hover-with-timer behavior so users
          who landed on /v4-locked vs / see identical menu pages and
          identical menu interaction. Only the palette differs (navy
          vs white). */}
      <header className="brief-header">
        <div className="brief-header-inner">
          <a href="/" className="brief-logo" aria-label="POWERS">
            <img src="/uploads/powers-logo-dark.png" alt="POWERS" />
          </a>
          <nav
            className="brief-nav"
            data-testid="brief-nav"
            onMouseLeave={schedClose}
            onMouseEnter={cancelClose}
          >
            <button
              type="button"
              className="brief-nav-link"
              data-open={openMega === 'results'}
              data-testid="brief-nav-results"
              onMouseEnter={() => openMenu('results')}
              onClick={() => openMenu(openMega === 'results' ? null : 'results')}
              aria-haspopup="true"
              aria-expanded={openMega === 'results'}
            >Results <span className="caret" aria-hidden="true" /></button>
            <button
              type="button"
              className="brief-nav-link"
              data-open={openMega === 'about'}
              data-testid="brief-nav-about"
              onMouseEnter={() => openMenu('about')}
              onClick={() => openMenu(openMega === 'about' ? null : 'about')}
              aria-haspopup="true"
              aria-expanded={openMega === 'about'}
            >About <span className="caret" aria-hidden="true" /></button>
            <a
              href="/insights"
              className="brief-nav-link"
              data-testid="brief-nav-insights"
              onMouseEnter={() => setOpenMega(null)}
            >Insights</a>
            <a
              href="/contact"
              className="brief-nav-link cta"
              data-testid="brief-nav-cta"
              onMouseEnter={() => setOpenMega(null)}
            >Let&rsquo;s Talk</a>
          </nav>
        </div>

        {/* Mega menu panels — flush below the header bar. */}
        <div
          className="brief-mega-wrap"
          onMouseEnter={cancelClose}
          onMouseLeave={schedClose}
        >
          {/* Results — 2-column mega (matches V4 exactly) */}
          <div className="brief-mega" aria-hidden={openMega !== 'results'}>
            <div
              className="brief-mega-panel"
              data-open={openMega === 'results'}
              data-testid="brief-mega-results"
              style={{ width: 640, display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            >
              <div style={{ padding: '24px 28px 28px', borderRight: '1px solid rgba(232,147,70,0.14)' }}>
                <a href="/approach"          className="brief-mega-link">Approach</a>
                <a href="/discovery-process" className="brief-mega-link">Discovery Process</a>
                <a href="/industries-served" className="brief-mega-link">Industries Served</a>
                <a href="/case-studies"      className="brief-mega-link">Case Studies</a>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div className="brief-mega-section-label">Expertise Areas</div>
                <a href="/operational-discipline" className="brief-mega-link">Operational Discipline</a>
                <a href="/frontline-leadership"   className="brief-mega-link">Frontline Leadership</a>
                <a href="/equipment-reliability"  className="brief-mega-link">Equipment Reliability</a>
                <a href="/workforce-capability"   className="brief-mega-link">Workforce Capability</a>
                <a href="/daily-accountability"   className="brief-mega-link">Daily Accountability</a>
              </div>
            </div>
          </div>

          {/* About — single column (matches V4 exactly) */}
          <div className="brief-mega" aria-hidden={openMega !== 'about'}>
            <div
              className="brief-mega-panel"
              data-open={openMega === 'about'}
              data-testid="brief-mega-about"
              style={{ width: 260 }}
            >
              <div style={{ padding: '20px 24px 24px' }}>
                <a href="/history"      className="brief-mega-link">History</a>
                <a href="/leadership"   className="brief-mega-link">Leadership</a>
                <a href="/company-news" className="brief-mega-link">Company News</a>
                <a href="/careers"      className="brief-mega-link">Careers</a>
              </div>
            </div>
          </div>
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
                /* Tight typewriter-strike cadence — 28ms per
                 * character within a line, 320ms gap between lines.
                 * No randomness, no per-character offset variation.
                 * Reads as a deliberate, forceful build. */
                const delay = (li * 320) + (ci * 28);
                return (
                  <span
                    key={ci}
                    className={`ch${line.accent ? ' accent' : ''}`}
                    style={{ transitionDelay: delay + 'ms' }}
                  >{c}</span>
                );
              })}
            </span>
          ))}
        </h1>
        <div className="brief-hero-footer">
          {/* The audience line. Was "For the operator and the board" —
              missed high (board doesn't buy) and low (floor operator
              can't). The actual buyer is the C-suite operator with
              P&L authority: COO / CEO / PE operating partner. The
              line below names accountability for the result, which
              is what this reader's seat carries. */}
          <span>For the operator accountable for the number</span>
          <span className="rule" />
          <span>Scroll to read</span>
        </div>
      </section>

      {/* ── Beat II — Thesis ────────────────────────────────────── */}
      <Station
        index="II  /  Thesis"
        headline="We build the disciplines to execute."
        pivot="No matter what."
        body="Five disciplines built into how the operation executes every shift, every day, every quarter. Not five initiatives. Not five priorities. Weaken one and the others drift. Build them together and they interlock into something load-bearing, deep enough that performance doesn’t break down when conditions do."
        quote="If you’re working, we’re working."
        attr="Floor practice · POWERS"
      />

      {/* ── Beat III — Pressure (the dramatic dark spread) ───────
          The single navy beat. Reserved for the moment in the
          document where the argument has to land with weight: the
          conditions under which most operations break, and what
          built-in discipline does about that. Everything else is
          paper; this is the one moment of dark. */}
      <PressureBeat />

      {/* ── Beat IV — Mechanism ─────────────────────────────────── */}
      <Station
        index="IV  /  Mechanism"
        headline="We work where value gets"
        pivot="won or lost."
        body="Most consulting firms diagnose, recommend, and leave. They’re out the door at 3pm and don’t work Fridays. The slide decks are sharp. The results don’t last. Our approach is very different. We build the disciplines where the work actually happens and value is created. On the floor. In the shifts. Inside the standards, the supplier relationships, the AP/AR process. We put skin in the game — paid on results, not recommendations."
      />

      {/* ── Beat V — Evidence (metrics) ─────────────────────────── */}
      <EvidenceBeat />

      {/* ── Beat VI — Industries ────────────────────────────────── */}
      <Station
        index="VI  /  Industries"
        headline="Different industries."
        pivot="The same execution discipline."
        body="We work with multi-site operators, PE-backed platforms, and organizations in active growth or integration. From food and beverage and protein processing to automotive, aerospace and defense, pharmaceuticals and medical devices, consumer packaged goods, agriculture, metals and mining, chemicals, oil and gas, and the private equity firms behind many of them. Different products. Different scales. Different pressures. The same financial result: stronger margins, faster recovery, gains that compound."
      />

      {/* ── Beat VII — Results (case study entry point) ─────────── */}
      <CardsBeat
        index="VII  /  Results"
        headline="Operations built on strong execution produce"
        pivot="results that speak for themselves."
        body="Different operations. Different pressures. The same five disciplines underneath. The successes below are what that execution looks like in operations like yours."
        cards={[
          { kind: 'Case study', title: 'Defense & aerospace OTD lift', meta: '$2.4B platform · 18 mo' },
          { kind: 'Case study', title: 'Food & beverage labor productivity', meta: 'PE-backed multi-site · 9 mo' },
          { kind: 'Case study', title: 'Metals throughput recovery', meta: '$700M operator · 12 mo' },
        ]}
        cta={{ label: 'See all case studies', href: '/case-studies' }}
      />

      {/* ── Beat VIII — Insights (blog entry point) ─────────────── */}
      <CardsBeat
        index="VIII  /  Insights"
        headline="Dig deeper into the"
        pivot="discipline of execution."
        body="Nearly thirty years of helping build some of the top-performing operations on the planet. Read how we install the five disciplines and produce sustainable, scalable financial gains."
        cards={[
          { kind: 'Field note',  title: 'Why standards drift the moment the consultant leaves', meta: '6 min read' },
          { kind: 'Field note',  title: 'The third-shift maintenance gap nobody is measuring',  meta: '8 min read' },
          { kind: 'Field note',  title: 'Why pay-for-results changes which problems get solved', meta: '7 min read' },
        ]}
        cta={{ label: 'Visit the Insights Hub', href: '/insights' }}
      />

      {/* ── Beat IX — Action (closing CTA) ─────────────────────── */}
      <ActionBeat />

      {/* ── V4 Footer (locked — replicated exactly) ─────────────── */}
      <SiteFooter />
    </div>
  );
}

/* ── V4 Footer (locked structure) ────────────────────────────────
 * Replicated verbatim from V4's <Footer /> so the home grid +
 * legal bar + brand block + 3 link columns + contact column are
 * identical to /v4-locked. Only thing that differs is which page
 * embeds it. Menu items, copy, and link targets are all locked. */
function SiteFooter() {
  return (
    <footer style={{ background: '#0f2a47', fontFamily: TYPE.sans, borderTop: '1px solid #e89346' }}>
      <style>{`
        .v5-footer-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 72px 48px 64px;
          display: grid;
          gap: 56px 32px;
          grid-template-columns: minmax(340px, 1.7fr) repeat(3, minmax(140px, 1fr));
          box-sizing: border-box;
        }
        @media (max-width: 980px) {
          .v5-footer-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 48px 32px;
          }
        }
        @media (max-width: 560px) {
          .v5-footer-grid {
            grid-template-columns: 1fr;
            gap: 40px 0;
            padding: 56px 24px 48px;
          }
        }
        .v5-foot-link {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.70);
          text-decoration: none;
          padding: 4px 0;
          display: block;
          transition: color 140ms ease;
        }
        .v5-foot-link:hover { color: ${GOLD_BRIGHT}; }
        .v5-foot-head {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
      `}</style>

      <div className="v5-footer-grid">
        {/* Col 1: Brand */}
        <div style={{ maxWidth: 380 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img
              src="/uploads/powers-logo-dark.png"
              alt="POWERS"
              style={{ width: 140, height: 'auto', display: 'block', marginBottom: 16 }}
            />
          </a>
          <div style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.10em',
            color: GOLD_BRIGHT, marginBottom: 14,
          }}>
            <span style={{ whiteSpace: 'nowrap' }}>Strong Execution.</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>Strong Performance.</span>
          </div>
          <p style={{
            fontSize: 13, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.60)', margin: 0,
            textWrap: 'pretty',
          }}>
            Operations performance consulting that builds execution capability across teams, shifts, sites, and holdings.
          </p>
        </div>

        {/* Col 2: Results */}
        <div>
          <div className="v5-foot-head">Results</div>
          <a className="v5-foot-link" href="/approach">Approach</a>
          <a className="v5-foot-link" href="/discovery-process">Discovery Process</a>
          <a className="v5-foot-link" href="/operational-readiness">Expertise Areas</a>
          <a className="v5-foot-link" href="/industries-served">Industries Served</a>
          <a className="v5-foot-link" href="/case-studies">Case Studies</a>
        </div>

        {/* Col 3: About */}
        <div>
          <div className="v5-foot-head">About</div>
          <a className="v5-foot-link" href="/history">History</a>
          <a className="v5-foot-link" href="/leadership">Leadership</a>
          <a className="v5-foot-link" href="/company-news">Company News</a>
          <a className="v5-foot-link" href="/careers">Careers</a>
        </div>

        {/* Col 4: Let's Talk */}
        <div>
          <div className="v5-foot-head">Let&rsquo;s Talk</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <a className="v5-foot-link" href="tel:+16789714711">+1 678-971-4711</a>
            <a className="v5-foot-link" href="mailto:info@thepowerscompany.com">info@thepowerscompany.com</a>
            <div style={{
              fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)',
              padding: '4px 0', lineHeight: 1.5,
            }}>
              1801 Peachtree St NE, Suite 200<br />Atlanta, GA 30309
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '0 48px 40px',
      }}>
        <div style={{ height: 1, background: 'rgba(232,147,70,0.20)', marginBottom: 20 }} />
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', gap: '6px 12px',
        }}>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)' }}>
            Copyright 2026 The POWERS Company, Inc. All Rights Reserved.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <a className="v5-foot-link" href="/sitemap" style={{ fontSize: 11, padding: 0 }}>Sitemap</a>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <a className="v5-foot-link" href="/privacy" style={{ fontSize: 11, padding: 0 }}>Privacy Policy</a>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)' }}>
            Powered by <a className="v5-foot-link" href="https://methodmarketing.com" style={{ fontSize: 11, padding: 0, display: 'inline' }}>Method Marketing</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── Beat III: Pressure (the dark dramatic spread) ───────────────
 * The single navy beat in the brief. Visually distinct so the
 * argument lands with weight — everything else is paper. No
 * exhibit canvas yet (foundation pass); the H2 carries the moment. */
function PressureBeat() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="brief-station" style={{
      background: NAVY_DEEP,
      color: '#f3f0e8',
      gridTemplateColumns: '1fr',
      paddingTop: '18vh',
      paddingBottom: '18vh',
      borderTop: '1px solid rgba(232,147,70, 0.22)',
      borderBottom: '1px solid rgba(232,147,70, 0.22)',
    }}>
      <span className="brief-tick" style={{ top: '14vh', background: 'rgba(232,147,70,0.32)' }} aria-hidden="true" />
      <div style={{ marginBottom: 36 }}>
        <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>III  /  Pressure</div>
        <h2 className="station-h2 wipe wipe-d1" style={{ color: '#f3f0e8' }}>
          <span>When execution is built on these disciplines,</span>
          <span className="pivot" style={{ color: GOLD_BRIGHT }}>performance is not at the mercy of conditions.</span>
        </h2>
      </div>
      <div className="wipe wipe-d2" style={{ maxWidth: 720 }}>
        <p className="station-lede" style={{ color: 'rgba(243,240,232,0.78)', maxWidth: 720 }}>
          Market pressures don&rsquo;t stop. The question isn&rsquo;t whether you can get better. It&rsquo;s whether what you built stays built when demand spikes, leadership changes, a new site comes online, or a PE timeline compresses. Operations built with these five core disciplines as their foundation hold position, recover faster, and compound gains regardless.
        </p>
        <p className="station-lede wipe wipe-d3" style={{
          marginTop: 18, color: '#f3f0e8', fontWeight: 600, fontSize: 'clamp(18px, 1.4vw, 22px)', maxWidth: 720,
        }}>
          Better margins. Stronger throughput. Higher returns. Quarter after quarter.
        </p>
      </div>
    </section>
  );
}

/* ── Beat V: Evidence (5-stat ledger with count-up) ────────────── */
function EvidenceBeat() {
  const ref = useRef(null);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          setAnimating(true);
          io.disconnect();
        }
      }),
      { threshold: 0.32 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const STATS = [
    { target: 1,   prefix: '$', suffix: 'B+',  decimals: 0, duration: 1600, label: 'Annualized savings produced across engagements' },
    { target: 98,  prefix: '',  suffix: '%',   decimals: 0, duration: 1400, label: 'Client retention across nearly thirty years' },
    { target: 5,   prefix: '',  suffix: ' wks', decimals: 0, duration: 1200, label: 'Median time to first measurable impact' },
    { target: 500, prefix: '',  suffix: '+',   decimals: 0, duration: 1800, label: 'Operations strengthened — multi-site, multi-industry' },
    { target: 30,  prefix: '',  suffix: '+',   decimals: 0, duration: 1400, label: 'Years of frontline operations leadership' },
  ];
  return (
    <section ref={ref} className="brief-station" style={{
      gridTemplateColumns: '1fr',
      paddingTop: '14vh',
      paddingBottom: '14vh',
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" style={{ top: '14vh' }} aria-hidden="true" />
      {/* Header takes full station width so neither H2 clause wraps
          internally; lede below is body-width-constrained (none here
          — Evidence has no lede paragraph). */}
      <div style={{ marginBottom: 64 }}>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>V  /  Evidence</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>Thirty years on the floor.</span>
          <span className="pivot">The ledger speaks for itself.</span>
        </h2>
      </div>
      <div className="wipe wipe-d2" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '40px 48px',
      }}>
        {STATS.map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: TYPE.sans,
              fontWeight: 800,
              fontSize: 'clamp(40px, 4.4vw, 64px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: NAVY,
              marginBottom: 12,
            }}>
              <CountUp run={animating} {...s} delay={120 + i * 110} />
            </div>
            <div style={{
              fontFamily: TYPE.sans,
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.5,
              color: TEXT_BODY,
              maxWidth: 240,
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CountUp — single-shot count-up tied to scroll entry.
 *   Runs only when `run` becomes true. Eases out cubic so the
 *   ramp lands cleanly on the target. Prefix/suffix stick. */
function CountUp({ run, target, prefix = '', suffix = '', decimals = 0, duration = 1400, delay = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const tick = (t) => {
      if (!start) start = t + delay;
      const elapsed = Math.max(0, t - start);
      const p = Math.max(0, Math.min(1, elapsed / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration, delay]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return <span>{prefix}{display}{suffix}</span>;
}

/* ── Beat VII/VIII: Cards (case studies + insights) ────────────── */
function CardsBeat({ index, headline, pivot, body, cards, cta }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="brief-station" style={{
      gridTemplateColumns: '1fr',
      paddingTop: '14vh',
      paddingBottom: '14vh',
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" style={{ top: '14vh' }} aria-hidden="true" />
      {/* Header: index + H2 occupy the full station frame width so
          the sans clause ("Operations built on strong execution
          produce") doesn't get force-wrapped by a narrow column.
          The lede that follows stays in a MEASURE.read-ish column
          for prose legibility. */}
      <div style={{ marginBottom: 36 }}>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>{index}</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>{headline}</span>
          {pivot && <span className="pivot">{pivot}</span>}
        </h2>
      </div>
      <p className="station-lede wipe wipe-d2" style={{ marginBottom: 56, maxWidth: 640 }}>{body}</p>
      <div className="wipe wipe-d3" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 1,
        background: RULE_SOFT,
        marginBottom: 36,
      }}>
        {cards.map((c, i) => (
          <a key={i} href={cta.href} style={{
            display: 'block',
            background: PAPER,
            padding: '28px 28px 32px',
            textDecoration: 'none',
            color: NAVY,
            transition: 'background 200ms ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = PAPER_DEEP}
            onMouseLeave={(e) => e.currentTarget.style.background = PAPER}
          >
            <div style={{
              fontFamily: TYPE.mono, fontSize: 10, fontWeight: 500,
              letterSpacing: '0.26em', textTransform: 'uppercase',
              color: GOLD, marginBottom: 18,
            }}>{c.kind}</div>
            <div style={{
              fontFamily: TYPE.sans, fontSize: 18, fontWeight: 600,
              lineHeight: 1.32, color: NAVY, marginBottom: 18,
              minHeight: '3.2em',
            }}>{c.title}</div>
            <div style={{
              fontFamily: TYPE.mono, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: TEXT_MUTED,
            }}>{c.meta}</div>
          </a>
        ))}
      </div>
      <a href={cta.href} style={{
        fontFamily: TYPE.sans, fontSize: 14, fontWeight: 600,
        color: GOLD, textDecoration: 'none',
        letterSpacing: '0.04em',
        borderBottom: '1px solid ' + GOLD,
        paddingBottom: 2,
        display: 'inline-block',
        alignSelf: 'flex-start',
      }}>{cta.label} →</a>
    </section>
  );
}

/* ── Beat IX: Action (closing CTA) ────────────────────────────── */
function ActionBeat() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="brief-station" style={{
      gridTemplateColumns: 'minmax(0,1.4fr) minmax(280px,1fr)',
      paddingTop: '18vh',
      paddingBottom: '18vh',
      alignItems: 'end',
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" style={{ top: '18vh' }} aria-hidden="true" />
      <div>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>IX  /  Action</div>
        <h2 className="station-h2 wipe wipe-d1" style={{ maxWidth: 920 }}>
          <span>Let&rsquo;s build your operation</span>
          <span className="pivot">to execute under any circumstances.</span>
        </h2>
        <p className="station-lede wipe wipe-d2" style={{ marginTop: 24, maxWidth: 600 }}>
          Tell us where the operation is feeling pressure. We&rsquo;ll come see it on the floor, find the gaps that are hiding inside it, and build the disciplines that close them.
        </p>
      </div>
      <div className="wipe wipe-d3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a href="/contact" style={{
          fontFamily: TYPE.sans, fontSize: 15, fontWeight: 600,
          background: GOLD_BRIGHT, color: NAVY,
          padding: '18px 32px',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          transition: 'background 180ms ease',
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = GOLD}
          onMouseLeave={(e) => e.currentTarget.style.background = GOLD_BRIGHT}
        >Start a conversation <span>→</span></a>
      </div>
    </section>
  );
}

/* ── Station component — every beat below the hero uses this.
 *   `headline` is the sans-navy lead clause. `pivot` is the
 *   serif-italic-gold resolution clause that lands on its own line. */
function Station({ index, headline, pivot, body, quote, attr }) {
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
        <h2 className="station-h2 wipe wipe-d1">
          <span>{headline}</span>
          {pivot && <span className="pivot">{pivot}</span>}
        </h2>
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
