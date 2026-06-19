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
 *     vocabulary. Eyebrows were rewritten Feb 2026 from filing-
 *     cabinet section labels ("I/Position", "II/Thesis") to
 *     plainspoken concept titles ("The Foundation", "Performance
 *     Under Pressure", "Our Work Ethic", "The Ledger", "Where We
 *     Work", "Client Success Stories", "Field Notes", "Next Move").
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
 *  V4 lives on at / for the client side-by-side comparison; V5 is
 *  served at /v5 for client review. Routing not changed in this file. */

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

/* Hero H1 lines — module-level so the array isn't reallocated on
 * every HomeV5 render. The `accent` flag flips that line to the
 * gold .accent class (used for the third "Regardless of conditions."
 * payoff). */
const HERO_LINES = [
  { text: 'Strong execution.',         accent: false },
  { text: 'Strong performance.',       accent: false },
  { text: 'Regardless of conditions.', accent: true },
];

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

  /* Mobile drawer state (≤ 900px) — hamburger button toggles a
   * full-height slide-in panel. `mobileExpanded` tracks which of
   * the two nested sections (Results / About) is expanded inside
   * the drawer so the menu doesn't open as a wall of every link
   * at once. Body scroll is locked while the drawer is open. */
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  useEffect(() => {
    if (mobileNavOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileNavOpen]);

  /* Activate scroll-snap on the document scroller (<html>) only
   * while this page is mounted. Previous version set
   * `scroll-snap-type` on `.brief-page` — but `.brief-page` is a
   * <div> with no `overflow:auto`, so it isn't a scroll container
   * and the property had no effect. The actual scroller is <html>,
   * which is why the page felt like free scroll/swipe. The class is
   * scoped here (added on mount, removed on unmount) so V4 and the
   * rest of the app keep their normal free-scroll behavior. */
  useEffect(() => {
    document.documentElement.classList.add('v5-snap');
    return () => document.documentElement.classList.remove('v5-snap');
  }, []);

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

  // HERO_LINES is module-level (above) so the array doesn't reallocate per render.

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

        /* Scroll-snap engages on the document scroller (<html>),
         * activated by the "v5-snap" class that the page adds while
         * mounted. One scroll-wheel notch OR one swipe = one beat
         * advance, with the next section locked to the viewport top.
         * Scoped to the html class so V4 and the rest of the app are
         * unaffected. Uses dvh (dynamic viewport height) so iOS
         * Safari's collapsing address bar doesn't break section
         * heights mid-scroll. */
        html.v5-snap {
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }

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
          min-height: 100dvh;
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
          left: 0;
          width: 1px;
          height: 0%;
          background: ${GOLD};
          box-shadow: 0 0 8px rgba(200, 130, 31, 0.32);
          transition: height 60ms linear;
        }
        .brief-tick {
          position: absolute;
          top: 8vh;
          right: 0;
          width: 28px;
          height: 1px;
          background: ${RULE};
        }

        /* ── Page header strip ────────────────────────────────────
           The cover-meta strip ("Operating Brief 2026 / POWERS /
           Confidential…") was removed Feb 2026 — the publication
           identity moved into the hero section-num as a single
           cleaner mark. Styles deleted here; the responsive override
           below was scoped to that element and is also gone. */

        /* ── Beat: Hero ───────────────────────────────────────────
           Same character-assembly motion as the paradigm prototype.
           Letters fly in along per-character vectors, snap-settle.
           Reads on cream paper with navy text — confident, restrained. */
        .brief-hero {
          position: relative;
          min-height: calc(100dvh - 112px - 50px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px max(40px, calc((100% - 1240px) / 2 + 40px));
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
          /* Was overflow: hidden, which clipped both top AND bottom
             of each line box. At line-height 1.03 + 800-weight sans
             at clamp(48–96px), the line box has no descender room —
             the "g" in "Regardless" was getting sliced at the box
             bottom. We only need to hide the pre-strike position
             (chars are translateY(-22px) above their resting spot),
             so clip the TOP at 0 and extend the BOTTOM 0.5em past
             the box so descenders render fully. */
          clip-path: inset(0 0 -0.5em 0);
        }
        /* Word group — keeps each word's per-character spans on the
           same line. Without this, individual .ch spans (display:
           inline-block) are valid line-break candidates between
           every character, which is why iOS Safari was breaking
           "execution" mid-word at narrow portrait widths. The word
           wrapper is inline-block + nowrap so breaks only happen
           between words at real spaces. */
        .brief-h1 .word {
          display: inline-block;
          white-space: nowrap;
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
          /* Symmetric horizontal padding — matches header & footer
             content alignment. At wide viewports (>1240px), content
             area = 1240 - 80 = 1160px, centered. The previous version
             added +40px ONLY to the right side, which made the
             station content area extend 40px wider than the header,
             producing visible misalignment at desktop. */
          padding: 8vh max(40px, calc((100% - 1240px) / 2 + 40px));
          box-sizing: border-box;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
          /* COLUMN-gap only — the previous "gap" shorthand applied
             to row-gap too, injecting a 96px ghost row between every
             stacked item in single-column beats (Thesis, Pressure,
             Evidence, Cards, Action). That ghost stacked on top of
             each item's own marginBottom, producing the blown-out
             "X" gaps. Vertical rhythm now comes from explicit item
             margins only. */
          column-gap: clamp(40px, 6vw, 96px);
          align-items: center;
        }
        .station-divider {
          /* A hairline rule above each station — marks the page
             "section break" in the brief without using a thick line
             or color band. Edges aligned to the symmetric station
             padding so the rule spans the content frame, not the
             whole viewport. */
          position: absolute;
          top: 0;
          left: max(40px, calc((100% - 1240px) / 2 + 40px));
          right: max(40px, calc((100% - 1240px) / 2 + 40px));
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
           standard" pattern. Replaces fade-ins.

           NOTE (Feb 2026, root-cause fix): the previous values were
           inset(0 100% 0 0) → inset(0 0 0 0). The zero top/bottom
           insets clipped **exactly** at the element's content-box
           edges, which sliced descenders off any serif italic (the
           gold .pivot clauses) and any ascenders on tall caps.
           Layout still allocated that descender region, producing a
           ghost gap below the visible text — which is the "big
           vertical space between subhead and lede" the page kept
           showing. Negative top/bottom insets let glyphs render past
           the box edges; horizontal insets continue to drive the
           wipe sweep. */
        .wipe {
          clip-path: inset(-0.4em 100% -0.5em 0);
          transition: clip-path 1000ms cubic-bezier(.2,.7,.2,1);
        }
        .brief-station.is-in .wipe { clip-path: inset(-0.4em 0 -0.5em 0); }
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
          /* Bumped Feb 2026 (84 → 112) — the prior shallow header
             felt squeezed against the hero's full-viewport breathing
             room. The deeper bar gives the logo + nav room to sit
             without compression and matches the document-grade
             generosity of the rest of the brief. */
          height: 112px;
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

        /* ── Hamburger button (≤ 900px only) ──────────────────────
           Standard 3-line button with morph-to-X on open. Sits where
           the desktop nav lives, swapped via display: none on each
           per the breakpoint below. */
        .brief-burger {
          display: none;
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          position: relative;
        }
        .brief-burger-bar {
          position: absolute;
          left: 8px;
          right: 8px;
          height: 2px;
          background: #f3f0e8;
          border-radius: 1px;
          transition: transform 220ms cubic-bezier(.6,.2,.2,1),
                      opacity 180ms ease,
                      top 220ms cubic-bezier(.6,.2,.2,1);
        }
        .brief-burger-bar:nth-child(1) { top: 14px; }
        .brief-burger-bar:nth-child(2) { top: 21px; }
        .brief-burger-bar:nth-child(3) { top: 28px; }
        .brief-burger[data-open="true"] .brief-burger-bar:nth-child(1) {
          top: 21px;
          transform: rotate(45deg);
        }
        .brief-burger[data-open="true"] .brief-burger-bar:nth-child(2) {
          opacity: 0;
        }
        .brief-burger[data-open="true"] .brief-burger-bar:nth-child(3) {
          top: 21px;
          transform: rotate(-45deg);
        }

        /* ── Mobile drawer ────────────────────────────────────────
           Full-height slide-in panel from the right. Sits ABOVE
           every section in z-index. Backdrop blurs the page behind.
           Drawer interior scrolls independently if its content
           exceeds the viewport. */
        .brief-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 22, 42, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 220ms ease;
          z-index: 300;
        }
        .brief-drawer-backdrop[data-open="true"] {
          opacity: 1;
          pointer-events: auto;
        }
        .brief-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(360px, 84vw);
          height: 100dvh;
          background: ${NAVY};
          border-left: 1px solid rgba(232,147,70, 0.22);
          box-shadow: -16px 0 48px rgba(8, 22, 42, 0.55);
          transform: translateX(100%);
          transition: transform 280ms cubic-bezier(.6,.2,.2,1);
          z-index: 301;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .brief-drawer[data-open="true"] { transform: translateX(0); }
        .brief-drawer-inner {
          padding: 96px 24px 32px;
          display: flex;
          flex-direction: column;
        }
        .brief-drawer-section {
          font-family: ${TYPE.sans};
          font-size: 18px;
          font-weight: 600;
          color: #f3f0e8;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(232,147,70, 0.16);
          text-align: left;
          text-decoration: none;
          padding: 18px 4px;
          letter-spacing: 0.01em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .brief-drawer-section:hover { color: ${GOLD_BRIGHT}; }
        .brief-drawer-caret {
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid currentColor;
          opacity: 0.7;
          transition: transform 200ms ease;
        }
        .brief-drawer-section[aria-expanded="true"] .brief-drawer-caret {
          transform: rotate(180deg);
        }
        .brief-drawer-sub {
          max-height: 0;
          overflow: hidden;
          transition: max-height 280ms cubic-bezier(.6,.2,.2,1);
        }
        .brief-drawer-sub[data-open="true"] {
          max-height: 720px;
        }
        .brief-drawer-sublink {
          display: block;
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 400;
          color: rgba(243, 240, 232, 0.78);
          text-decoration: none;
          padding: 11px 4px 11px 20px;
          letter-spacing: 0.005em;
        }
        .brief-drawer-sublink:hover { color: ${GOLD_BRIGHT}; }
        /* Sub-parent button — "Areas of Expertise" inside Results.
           Same font as the sibling sublinks but rendered as a button
           with a caret (no destination of its own). Tapping expands
           the nested .brief-drawer-subsub group below. */
        .brief-drawer-sublink.brief-drawer-subparent {
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font: inherit;
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 400;
          color: rgba(243, 240, 232, 0.78);
        }
        .brief-drawer-sublink.brief-drawer-subparent[aria-expanded="true"] .brief-drawer-caret {
          transform: rotate(180deg);
        }
        /* Nested sub-sub level: indented one further step + thin
           gold leader to mark the discipline-list relationship. */
        .brief-drawer-subsub {
          max-height: 0;
          overflow: hidden;
          transition: max-height 280ms cubic-bezier(.6,.2,.2,1);
        }
        .brief-drawer-subsub[data-open="true"] {
          max-height: 520px;
        }
        .brief-drawer-sublink.nested {
          padding-left: 36px;
          position: relative;
          font-size: 14px;
          color: rgba(243, 240, 232, 0.66);
        }
        .brief-drawer-sublink.nested::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 50%;
          width: 8px;
          height: 1px;
          background: rgba(232,147,70, 0.5);
        }
        .brief-drawer-sublabel {
          font-family: ${TYPE.mono};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          padding: 16px 4px 6px 20px;
        }
        .brief-drawer-cta {
          margin-top: 32px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 16px 24px;
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 600;
          color: ${NAVY};
          background: ${GOLD_BRIGHT};
          text-decoration: none;
          letter-spacing: 0.02em;
          border: 1px solid ${GOLD_BRIGHT};
          transition: background 180ms ease;
        }
        .brief-drawer-cta:hover { background: ${GOLD}; }

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
        /* Parent label inside a mega-menu column. Same font as the
           sibling links but no hover, no cursor — it's a category
           heading, not a destination. The 5 nested discipline links
           below it are indented to communicate the parent/child
           relationship visually without using a small-caps label. */
        .brief-mega-link.brief-mega-parent {
          color: rgba(243, 240, 232, 0.55);
          opacity: 1;
          cursor: default;
          margin-bottom: 4px;
        }
        .brief-mega-link.brief-mega-parent:hover { color: rgba(243, 240, 232, 0.55); }
        .brief-mega-link.brief-mega-nested {
          padding-left: 18px;
          position: relative;
        }
        .brief-mega-link.brief-mega-nested::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 50%;
          width: 6px;
          height: 1px;
          background: rgba(232,147,70, 0.5);
        }
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
          .brief-station { grid-template-columns: 1fr; column-gap: 24px; }
          .brief-rail { right: 24px; }
          /* Swap desktop nav for hamburger. The mega-menu panels are
             hover/click triggered only from the desktop nav buttons —
             with the nav hidden, the panels become unreachable and
             the drawer becomes the sole navigation surface. */
          .brief-nav { display: none; }
          .brief-burger { display: block; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brief-h1 .ch { opacity: 1; transform: none; transition: none; }
          .wipe { clip-path: inset(-0.4em 0 -0.5em 0); transition: none; }
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

          {/* Hamburger toggle — visible only at ≤900px via CSS. */}
          <button
            type="button"
            className="brief-burger"
            data-testid="brief-burger"
            data-open={mobileNavOpen}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(v => !v)}
          >
            <span className="brief-burger-bar" />
            <span className="brief-burger-bar" />
            <span className="brief-burger-bar" />
          </button>
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
                {/* Non-clickable parent label, standard menu font.
                    Was uppercase tracked .brief-mega-section-label —
                    that read as a "category" but didn't make the
                    parent/child relationship clear. The 5 discipline
                    links sit indented underneath it as the visual
                    submenu. */}
                <div className="brief-mega-link brief-mega-parent" aria-hidden="true">Areas of Expertise</div>
                <a href="/operational-discipline" className="brief-mega-link brief-mega-nested">Operational Discipline</a>
                <a href="/frontline-leadership"   className="brief-mega-link brief-mega-nested">Frontline Leadership</a>
                <a href="/equipment-reliability"  className="brief-mega-link brief-mega-nested">Equipment Reliability</a>
                <a href="/workforce-capability"   className="brief-mega-link brief-mega-nested">Workforce Capability</a>
                <a href="/daily-accountability"   className="brief-mega-link brief-mega-nested">Daily Accountability</a>
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

      {/* ── Mobile drawer (≤900px) ───────────────────────────────
          Slides in from the right. Two collapsible sections mirror
          the desktop mega-menus (Results / About), then the standalone
          Insights link, then the Let's Talk CTA pinned at the bottom.
          Closes on any link click + on backdrop click + on Escape
          (handled by the close button). */}
      <div
        className="brief-drawer-backdrop"
        data-open={mobileNavOpen}
        aria-hidden={!mobileNavOpen}
        onClick={() => setMobileNavOpen(false)}
      />
      <aside
        className="brief-drawer"
        data-open={mobileNavOpen}
        data-testid="brief-drawer"
        aria-hidden={!mobileNavOpen}
      >
        <div className="brief-drawer-inner">
          <button
            type="button"
            className="brief-drawer-section"
            data-open={mobileExpanded === 'results'}
            data-testid="brief-drawer-results"
            onClick={() => setMobileExpanded(v => v === 'results' ? null : 'results')}
            aria-expanded={mobileExpanded === 'results'}
          >
            Results
            <span className="brief-drawer-caret" aria-hidden="true" />
          </button>
          <div className="brief-drawer-sub" data-open={mobileExpanded === 'results'}>
            <a href="/approach"               className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Approach</a>
            <a href="/discovery-process"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Discovery Process</a>
            <a href="/industries-served"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Industries Served</a>
            <a href="/case-studies"           className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Case Studies</a>
            {/* Areas of Expertise — nested sub-expansion. Tapping
                toggles the 5 discipline links beneath it. Styled
                like the other Results items (standard menu font)
                with its own caret. */}
            <button
              type="button"
              className="brief-drawer-sublink brief-drawer-subparent"
              data-open={mobileExpertiseOpen}
              data-testid="brief-drawer-expertise"
              onClick={() => setMobileExpertiseOpen(v => !v)}
              aria-expanded={mobileExpertiseOpen}
            >
              Areas of Expertise
              <span className="brief-drawer-caret" aria-hidden="true" />
            </button>
            <div className="brief-drawer-subsub" data-open={mobileExpertiseOpen}>
              <a href="/operational-discipline" className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Operational Discipline</a>
              <a href="/frontline-leadership"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Frontline Leadership</a>
              <a href="/equipment-reliability"  className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Equipment Reliability</a>
              <a href="/workforce-capability"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Workforce Capability</a>
              <a href="/daily-accountability"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Daily Accountability</a>
            </div>
          </div>

          <button
            type="button"
            className="brief-drawer-section"
            data-open={mobileExpanded === 'about'}
            data-testid="brief-drawer-about"
            onClick={() => setMobileExpanded(v => v === 'about' ? null : 'about')}
            aria-expanded={mobileExpanded === 'about'}
          >
            About
            <span className="brief-drawer-caret" aria-hidden="true" />
          </button>
          <div className="brief-drawer-sub" data-open={mobileExpanded === 'about'}>
            <a href="/history"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>History</a>
            <a href="/leadership"   className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Leadership</a>
            <a href="/company-news" className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Company News</a>
            <a href="/careers"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Careers</a>
          </div>

          <a
            href="/insights"
            className="brief-drawer-section"
            data-testid="brief-drawer-insights"
            onClick={() => setMobileNavOpen(false)}
          >Insights</a>

          <a
            href="/contact"
            className="brief-drawer-cta"
            data-testid="brief-drawer-cta"
            onClick={() => setMobileNavOpen(false)}
          >Let&rsquo;s Talk</a>
        </div>
      </aside>

      {/* ── Right-rail spine ───────────────────────────────────── */}
      <div className="brief-rail" aria-hidden="true">
        <div className="brief-rail-fill" ref={railFill} />
      </div>

      {/* ── Beat 01 — Position ─────────────────────────────────── */}
      <section className="brief-hero">
        <span className="brief-tick" style={{ top: '52%' }} aria-hidden="true" />
        <h1 className="brief-h1" data-testid="hero-h1">
          {HERO_LINES.map((line, li) => {
            /* Render chars grouped by word. Each word is its own
             * inline-block + nowrap wrapper so chars inside a word
             * can never line-break. Real space characters sit
             * BETWEEN word wrappers as direct children of the line —
             * they remain valid line-break opportunities for the
             * browser. The running `ci` counter still ticks through
             * spaces (without rendering them as .ch spans) so the
             * 28ms-per-char typewriter cadence stays identical to
             * the original. */
            const words = line.text.split(' ');
            let ci = 0;
            return (
              <span className="line" key={li}>
                {words.map((word, wi) => {
                  if (wi > 0) ci += 1;
                  const wordSpans = Array.from(word).map((c) => {
                    const delay = (li * 320) + (ci * 28);
                    ci += 1;
                    return (
                      <span
                        key={ci}
                        className={`ch${line.accent ? ' accent' : ''}`}
                        style={{ transitionDelay: delay + 'ms' }}
                      >{c}</span>
                    );
                  });
                  return (
                    <React.Fragment key={wi}>
                      {wi > 0 && ' '}
                      <span className="word">{wordSpans}</span>
                    </React.Fragment>
                  );
                })}
              </span>
            );
          })}
        </h1>
        <div className="brief-hero-footer">
          {/* The audience line. Was "For the operator accountable for
              the number" → updated to a forward-leaning CTA-style
              hook. "Scroll to read" was removed; the document
              builds itself as the reader advances. */}
          <span>Find out how</span>
          <span className="rule" />
        </div>
      </section>

      {/* ── Beat II — Thesis ─────────────────────────────────────
          Headline + lede + earned italic quote, then the FIVE
          DISCIPLINE CARDS as the jump-off points to their dedicated
          pages. Locked content per direction — copy + URLs match
          V4 exactly. */}
      <ThesisBeat />

      {/* ── Beat III — Pressure (the dramatic dark spread) ───────
          The single navy beat. Reserved for the moment in the
          document where the argument has to land with weight: the
          conditions under which most operations break, and what
          built-in discipline does about that. Everything else is
          paper; this is the one moment of dark. */}
      <PressureBeat />

      {/* ── Beat IV — Mechanism ─────────────────────────────────── */}
      <Station
        index="Our Work Ethic"
        headline="We work where value gets"
        pivot="won or lost."
        body="Most consulting firms diagnose, recommend, and leave. They’re out the door at 3pm and don’t work Fridays. The slide decks are sharp. The results don’t last. Our approach is very different. We build the disciplines where the work actually happens and value is created. On the floor. In the shifts. Inside the standards, the supplier relationships, the AP/AR process. We put skin in the game — paid on results, not recommendations."
        quote="If you’re working, we’re working."
        attr="The POWERS guiding principle"
      />

      {/* ── Beat V — Evidence (metrics) ─────────────────────────── */}
      <EvidenceBeat />

      {/* ── Beat VI — Industries ────────────────────────────────── */}
      <Station
        index="Where We Work"
        headline="Different industries."
        pivot="The same execution discipline."
        body="We work with multi-site operators, PE-backed platforms, and organizations in active growth or integration. From food and beverage and protein processing to automotive, aerospace and defense, pharmaceuticals and medical devices, consumer packaged goods, agriculture, metals and mining, chemicals, oil and gas, and the private equity firms behind many of them. Different products. Different scales. Different pressures. The same financial result: stronger margins, faster recovery, gains that compound."
      />

      {/* ── Beat VII — Results (case study entry point) ─────────── */}
      <CardsBeat
        index="Client Success Stories"
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
        index="Field Notes"
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

/* ── Pressures + Outcomes (Beat III ambient swarm) ───────────────
 * Two independent particle fields split into LEFT and RIGHT
 * hemispheres of the navy "Performance Under Pressure" beat.
 *
 *   LEFT  — red pressures rain straight down, then SHATTER at a
 *           shared baseline ~56vh from section top (opacity collapse
 *           + scaleY crush + letter-spacing widen-out). Reads as the
 *           operating pressures hitting the disciplines and breaking.
 *   RIGHT — green outcomes EMERGE from the exact same baseline and
 *           rise straight up, untouched, fading near the top. Reads
 *           as outcomes compounding above the same horizon.
 *
 * Implementation notes:
 *   - Positions are STRATIFIED across each hemisphere (one slot per
 *     phrase + small intra-slot jitter) so coverage is uniform, not
 *     clustered.
 *   - Greens are anchored by the RIGHT edge (`right: Xvw` instead of
 *     `left:`) so long phrases like "+34% labor productivity" extend
 *     leftward into their band without overflowing the viewport.
 *   - Speed contrast carries the narrative: reds 9–14s (urgent),
 *     greens 22–32s (patient/compounding).
 *   - Each phrase trails a directional border-triangle (red ▾ left,
 *     green ▴ right) — drawn via CSS borders so the rendering is
 *     identical across fonts (the mono face was substituting the
 *     unicode glyphs with missing-glyph asterisks). */
const FALLING_PRESSURES = [
  'Demand spike', 'Leadership change', 'PE timeline', 'New site online',
  'Labor shortage', 'Supply disruption', 'Margin compression',
  'Equipment failure', 'Working-capital crunch', 'Customer escalation',
  'Raw-material spike', 'Integration deadline',
];
const RISING_OUTCOMES = [
  '+22% throughput', '+34% labor productivity', '+18% margin', '96% OTD',
  '−41% scrap', '5-week ROI', '+28% safety', '1.8× uptime',
  '2.4× inventory turn', '$3.2M WC freed', '$14M run-rate', '+12% yield',
];

function PressureSwarm() {
  const swarm = React.useMemo(() => {
    const seeded = (i) => {
      const x = Math.sin(i * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };
    /* HEMISPHERE SPLIT + STRATIFIED POSITIONS (Feb 2026 rev):
     *   - Red pressures: LEFT hemisphere only, anchored by LEFT
     *     edge of the word. X range 4–38vw — kept under 38 so the
     *     longest phrase ("Working-capital crunch") doesn't bleed
     *     across the centerline.
     *   - Green outcomes: RIGHT hemisphere only, anchored by RIGHT
     *     edge of the word (CSS `right:` instead of `left:`). X
     *     range 62–96vw measured from the LEFT viewport edge — kept
     *     above 62 so long phrases extend leftward without crossing
     *     center.
     *
     *   Previously: pure-random seeded X distribution produced
     *   visible clustering on the green side. Switched to
     *   STRATIFIED sampling — each phrase gets its own slot in the
     *   band, with a small intra-slot jitter — so coverage is
     *   guaranteed even across both hemispheres.
     *
     * COMMON BASELINE:
     *   - Reds fall and SHATTER at ~56vh from section top.
     *   - Greens EMERGE from exactly the same line and rise to the
     *     top — same scar in the page, two opposite directions.
     *
     * SPEED CONTRAST:
     *   - Reds: 9–14s. Loud, urgent, plural.
     *   - Greens: 22–32s. Patient, steady, compounding.
     */
    const STRAT = (slot, n, lo, hi, jitterSeed) => {
      const slotW = (hi - lo) / n;
      const jitter = (seeded(jitterSeed) - 0.5) * slotW * 0.55;
      return lo + slotW * (slot + 0.5) + jitter;
    };
    const buildFall = (words) => words.map((w, i) => {
      const r2 = seeded(i + 117);
      const r3 = seeded(i + 217);
      const x = STRAT(i, words.length, 4, 38, i + 9100);   // left hemisphere
      const duration = 9 + r2 * 5;
      const delay = -(r3 * 18);
      return { word: w, x, duration, delay };
    });
    const buildRise = (words) => words.map((w, i) => {
      const r2 = seeded(i + 5103);
      const r3 = seeded(i + 5203);
      // For RIGHT-anchored greens, x is the offset from the RIGHT
      // viewport edge. Distributing 4–38 here puts word right-edges
      // between 62vw and 96vw measured from the left.
      const x = STRAT(i, words.length, 4, 38, i + 9200);
      const duration = 22 + r2 * 10;
      const delay = -(r3 * 36);
      return { word: w, x, duration, delay };
    });
    return {
      falling: buildFall(FALLING_PRESSURES),
      rising:  buildRise(RISING_OUTCOMES),
    };
  }, []);
  return (
    <div className="ps-swarm" aria-hidden="true">
      <style>{`
        .ps-swarm {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .ps-p {
          position: absolute;
          font-family: ${TYPE.mono};
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
          will-change: transform, opacity, letter-spacing;
          opacity: 0;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          transform-origin: center center;
        }
        /* Trailing triangle: red ▾ on falling pressures, green ▴ on
           rising outcomes. Reinforces the directionality of each
           hemisphere at a glance — left is downward force, right is
           upward lift. Implemented as a CSS border triangle (not a
           unicode glyph) — the mono font we use was substituting the
           ▾/▴ codepoints with the missing-glyph asterisk. Border
           triangles render identically across every font and OS. */
        .ps-arrow {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 0.55em;
          vertical-align: 1px;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
        }
        .ps-p.fall .ps-arrow {
          /* Downward red triangle — points toward the baseline. */
          border-top: 5px solid rgba(224, 101, 79, 0.62);
        }
        .ps-p.rise .ps-arrow {
          /* Upward green triangle — points away from the baseline,
             toward the top (the compounding direction). */
          border-bottom: 5px solid rgba(91, 191, 115, 0.62);
        }
        /* Red pressure: rains straight down, shatters at baseline. */
        .ps-p.fall {
          top: -32px;
          color: rgba(224, 101, 79, 0.62);
          animation-name: ps-fall;
        }
        /* Green outcome: EMERGES at the baseline (~56vh — the same
           line where reds shatter), rises straight up, fades out
           near the top. The shared horizon is the disciplines. */
        .ps-p.rise {
          top: 56vh;
          color: rgba(91, 191, 115, 0.62);
          animation-name: ps-rise;
          animation-timing-function: cubic-bezier(.5,.0,.5,1);
        }
        @keyframes ps-fall {
          0%   { transform: translateY(0) scaleY(1);         opacity: 0;    letter-spacing: 0.18em; }
          8%   { opacity: 0.62; }
          /* Travel down to baseline, intact. */
          76%  { transform: translateY(54vh) scaleY(1);      opacity: 0.62; letter-spacing: 0.18em; }
          /* First shatter beat — letter-spacing starts to spread,
             opacity dips, the word stretches just enough to register
             as 'breaking'. */
          86%  { transform: translateY(56vh) scaleY(0.85);   opacity: 0.45; letter-spacing: 0.46em; }
          /* Full disintegration: letters fly apart laterally,
             vertical scale crushes to nothing, opacity to zero. */
          100% { transform: translateY(58vh) scaleY(0.30);   opacity: 0;    letter-spacing: 0.95em; }
        }
        @keyframes ps-rise {
          /* Emerges AT the baseline (translateY 0 from top: 56vh),
             rises upward, fades near the top of the section. */
          0%   { transform: translateY(0);          opacity: 0; }
          14%  { opacity: 0.62; }
          88%  { transform: translateY(-52vh);      opacity: 0.62; }
          100% { transform: translateY(-58vh);      opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-p { animation: none; opacity: 0.30; }
          .ps-p.fall { top: 18%; }
          .ps-p.rise { top: 56vh; }
        }
      `}</style>
      {swarm.falling.map((p, i) => (
        <span
          key={'f' + i}
          className="ps-p fall"
          style={{
            left: p.x + 'vw',
            animationDuration: p.duration.toFixed(2) + 's',
            animationDelay: p.delay.toFixed(2) + 's',
          }}
        >{p.word}<span className="ps-arrow" aria-hidden="true" /></span>
      ))}
      {swarm.rising.map((p, i) => (
        <span
          key={'r' + i}
          className="ps-p rise"
          style={{
            right: p.x + 'vw',
            animationDuration: p.duration.toFixed(2) + 's',
            animationDelay: p.delay.toFixed(2) + 's',
          }}
        >{p.word}<span className="ps-arrow" aria-hidden="true" /></span>
      ))}
    </div>
  );
}

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
      borderTop: '1px solid rgba(232,147,70, 0.22)',
      borderBottom: '1px solid rgba(232,147,70, 0.22)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <PressureSwarm />
      <span className="brief-tick" style={{ background: 'rgba(232,147,70,0.32)', zIndex: 2 }} aria-hidden="true" />
      <div style={{ marginBottom: 18, position: 'relative', zIndex: 2 }}>
        <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>Performance Under Pressure</div>
        <h2 className="station-h2 wipe wipe-d1" style={{ color: '#f3f0e8' }}>
          <span>When execution is built on these disciplines,</span>
          <span className="pivot" style={{ color: GOLD_BRIGHT }}>performance is not at the mercy of conditions.</span>
        </h2>
      </div>
      <div className="wipe wipe-d2" style={{ maxWidth: 720, position: 'relative', zIndex: 2 }}>
        <p className="station-lede" style={{ color: 'rgba(243,240,232,0.78)', maxWidth: 720 }}>
          Market pressures don&rsquo;t stop. The question isn&rsquo;t whether you can get better. It&rsquo;s whether what you built stays built when demand spikes, leadership changes, a new site comes online, or a PE timeline compresses. Operations built with these five core disciplines as their foundation hold position, recover faster, and compound gains regardless.
        </p>
        <p className="station-lede wipe wipe-d3" style={{
          marginTop: 18, color: '#f3f0e8', fontWeight: 600, fontSize: 'clamp(18px, 1.4vw, 22px)', maxWidth: 720,
        }}>
          Greater margins. Stronger performance. Better results. Quarter after quarter.
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
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
      {/* Header takes full station width so neither H2 clause wraps
          internally; lede below is body-width-constrained (none here
          — Evidence has no lede paragraph). */}
      <div style={{ marginBottom: 64 }}>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>The Ledger</div>
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
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
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
    <section ref={ref} className="brief-station" style={{ gridTemplateColumns: '1fr' }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
      <div>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>Next Move</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>Let&rsquo;s build your operation</span>
          <span className="pivot">to execute under any circumstances.</span>
        </h2>
        <p className="station-lede wipe wipe-d2" style={{ marginTop: 24, maxWidth: 600 }}>
          Tell us where the operation is feeling pressure. We&rsquo;ll come see it on the floor, find the gaps that are hiding inside it, and build the disciplines that close them.
        </p>
        <div className="wipe wipe-d3" style={{ marginTop: 40 }}>
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
      </div>
    </section>
  );
}

/* ── Beat II: Thesis — H2 + lede + earned italic quote + the
 *    FIVE DISCIPLINE CARDS as jump-off points. Card content +
 *    URLs are LOCKED (per direction) — match V4's DISCIPLINES
 *    array verbatim. Each card links to its own page. */
const DISCIPLINES = [
  { num: '01', name: 'Operational Discipline', body: 'Standards, routines, and structured practices that make consistent execution the default.', href: '/operational-discipline' },
  { num: '02', name: 'Frontline Leadership',   body: 'Supervisors who can plan a shift, run a problem to ground, and hold the standard with their team.', href: '/frontline-leadership' },
  { num: '03', name: 'Equipment Reliability',  body: 'Uptime, changeovers, and maintenance practices that make the asset base predictable.', href: '/equipment-reliability' },
  { num: '04', name: 'Workforce Capability',   body: 'Skilled, engaged operators who know the work, own the outcome, and can train the next shift.', href: '/workforce-capability' },
  { num: '05', name: 'Daily Accountability',   body: 'The cadence, metrics, and conversations that close the loop every shift, every day.', href: '/daily-accountability' },
];

function ThesisBeat() {
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
      { threshold: 0.14 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="brief-station" style={{
      gridTemplateColumns: '1fr',
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />

      <div style={{ marginBottom: 32, maxWidth: 920 }}>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>The Foundation</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>We build the disciplines to execute.</span>
          <span className="pivot">No matter what.</span>
        </h2>
      </div>

      {/* Lede sits on its own measure column — quote that used to
          live here has been moved to Beat IV (Work Ethic), where it
          functions as POWERS' guiding principle, not floor practice. */}
      <p className="station-lede wipe wipe-d2" style={{ marginBottom: 48, maxWidth: 720 }}>
        Five disciplines built into how the operation executes every shift, every day, every quarter. Not five initiatives. Not five priorities. Weaken one and the others drift. Build them together and they interlock into something load&#8209;bearing, deep enough that performance doesn&rsquo;t break down when conditions do.
      </p>

      {/* ── Five discipline cards — locked content, locked URLs.
         Each card is the jump-off to its dedicated discipline page.
         5-up row at desktop; collapses cleanly to 2-up / 1-up. */}
      <div className="wipe wipe-d3" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: 1,
        background: RULE_SOFT,
      }}>
        {DISCIPLINES.map((d) => (
          <a key={d.num} href={d.href} className="discipline-card" style={{
            background: PAPER,
            padding: '28px 24px 32px',
            textDecoration: 'none',
            color: NAVY,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            transition: 'background 200ms ease',
            position: 'relative',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = PAPER_DEEP}
            onMouseLeave={(e) => e.currentTarget.style.background = PAPER}
          >
            <div style={{
              fontFamily: TYPE.mono, fontSize: 10, fontWeight: 500,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: GOLD_BRIGHT,
            }}>{d.num} &nbsp;&middot;&nbsp; Discipline</div>
            <div style={{
              fontFamily: TYPE.sans, fontSize: 17, fontWeight: 700,
              lineHeight: 1.25, color: NAVY,
            }}>{d.name}</div>
            <div style={{
              fontFamily: TYPE.sans, fontSize: 13, fontWeight: 400,
              lineHeight: 1.55, color: TEXT_BODY,
              flex: 1,
            }}>{d.body}</div>
            <div style={{
              fontFamily: TYPE.mono, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: GOLD_BRIGHT, marginTop: 8,
            }}>Learn more &rarr;</div>
          </a>
        ))}
      </div>
      <style>{`
        /* Note: the former .thesis-body two-column with quote sidebar
           was removed Feb 2026 — the "If you're working, we're
           working" credo moved to Beat IV (Work Ethic) where it now
           functions as POWERS' guiding principle. The Thesis lede
           now sits on a single measure column above the cards. */
        @media (max-width: 1100px) {
          .brief-station .wipe-d3 > div[style*="grid-template-columns"],
          .brief-station > .wipe.wipe-d3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 720px) {
          .brief-station > .wipe.wipe-d3 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 480px) {
          .brief-station > .wipe.wipe-d3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
      <span className="brief-tick" aria-hidden="true" />
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
