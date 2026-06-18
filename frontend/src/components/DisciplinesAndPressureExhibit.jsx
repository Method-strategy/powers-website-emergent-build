/* ── SECTIONS 3 + 4 — DISCIPLINES FOUNDATION + PRESSURE EXHIBIT ──────
 * 1:1 React port of /tmp/powers-combined.html per the
 * POWERS_Sections_3_4_Integration_Brief.md spec.
 *
 * NARRATIVE ARC
 * Section 3 builds the foundation: five discipline cards arrange
 * clockwise around a central "core" element. Cards stagger in, the
 * core materializes, connector lines draw from each card to the core,
 * the connector lines draw.
 *
 * Section 3 then exits with the core translating downward 220px and
 * fading out — the optical illusion is that the core is *leaving*
 * Section 3 to travel into Section 4.
 *
 * Section 4 receives a "ghost core" descending from the top of the
 * exhibit area. The ghost lands on the canvas core's operating
 * position and crossfades into the canvas core. The swarm then
 * activates: red pressures fly in from the left, are absorbed by the
 * core, and green outcomes emit from the right side.
 *
 * REPLAY ON RE-ENTRY — CRITICAL
 * Both sections replay their entry animations every time the reader
 * scrolls back into them. This is implemented via IntersectionObserver
 * edge detection. We guard against React StrictMode's double-mount in
 * development with a `mountedRef` sentinel — without that, the
 * observers would be created twice and the replay logic would
 * misfire.
 *
 * NO COPY CHANGES
 * All copy is locked at the values in this file (and matches the
 * brief). The discipline body copy here is the *short* form used on
 * the foundation diagram cards; the longer paragraph form lives on
 * each card's full expertise page (reachable via Learn more).
 * ──────────────────────────────────────────────────────────────── */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toRoute } from '../lib/routes';
import { useScrollBuild } from '../lib/useScrollBuild';
import { COLOR, MEASURE, RHYTHM, TYPE } from '../lib/designSpec';

/* ── Design tokens — all forward to the spec source of truth.
 *   `/app/frontend/src/lib/designSpec.js` is the SINGLE place where
 *   hex literals, type ladders, measure widths, and rhythm values
 *   live. The local `C` / SANS / SERIF / MONO aliases here exist only
 *   to keep the existing CSS template literals readable. */
const SANS  = TYPE.sans;
const SERIF = TYPE.serif;
const MONO  = TYPE.mono;

const C = {
  navy:     COLOR.navy,
  navyDeep: COLOR.navyDeep,
  ink:      COLOR.navyDeep,
  body:     COLOR.body,
  gold:     COLOR.gold,
  paper:    COLOR.paper,
  line:     COLOR.line,
  /* Signal red/green — canvas exhibit only, NOT a UI color. Kept
   * local because nothing else on the site is allowed to use them. */
  red:      '#d8523c',
  green:    '#3fb364',
};

const DISCIPLINES = [
  {
    num: '01 — Discipline',
    name: 'Operational Discipline',
    body: 'Standards, routines, and structured practices that make consistent execution the default.',
    href: 'operational-discipline.html',
    pos: 'd1',
  },
  {
    num: '02 — Discipline',
    name: 'Frontline Leadership',
    body: 'Supervisors who can plan a shift, run a problem to ground, and hold the standard with their team.',
    href: 'frontline-leadership.html',
    pos: 'd2',
  },
  {
    num: '03 — Discipline',
    name: 'Equipment Reliability',
    body: 'Uptime, changeovers, and maintenance practices that make the asset base predictable.',
    href: 'equipment-reliability.html',
    pos: 'd3',
  },
  {
    num: '04 — Discipline',
    name: 'Workforce Capability',
    body: 'Skilled, engaged operators who know the work, own the outcome, and can train the next shift.',
    href: 'workforce-capability.html',
    pos: 'd4',
  },
  {
    num: '05 — Discipline',
    name: 'Daily Accountability',
    body: 'The cadence, metrics, and conversations that close the loop every shift, every day.',
    href: 'daily-accountability.html',
    pos: 'd5',
  },
];

/* Inline Learn more link styled to match the new card layout — copper,
   small, with an arrow that nudges right on hover. Routes via
   react-router so navigation is client-side. */
function CardLearnMore({ href }) {
  const [h, setH] = useState(false);
  return (
    <Link
      to={toRoute(href)}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        marginTop: 4,
        fontFamily: SANS,
        fontSize: 12.5,
        fontWeight: 600,
        color: C.gold,
        letterSpacing: '0.02em',
        textDecoration: h ? 'underline' : 'none',
        textUnderlineOffset: 4,
        textDecorationColor: C.gold,
      }}
    >
      Learn more
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          transform: h ? 'translateX(3px)' : 'translateX(0)',
          transition: 'transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
      >
        →
      </span>
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  SECTION 3 — DISCIPLINES FOUNDATION
 * ════════════════════════════════════════════════════════════════ */

export function SectionDisciplinesFoundation() {
  const sectionRef  = useRef(null);
  const stageRef    = useRef(null);
  const canvasRef   = useRef(null);
  const coreRef     = useRef(null);
  const softRef     = useRef(null);
  const anchorRef   = useRef(null);
  const discRefs    = useRef([]);
  const sentinelRef = useRef(null);

  // Scroll-driven build/unbuild for the H2 + lede typography. The
  // pentagon of disciplines (cards) is structural geometry and keeps
  // its existing first-entry stagger; only the editorial copy
  // builds and unbuilds with scroll.
  useScrollBuild(sectionRef);

  useEffect(() => {
    const stage   = stageRef.current;
    const canvas  = canvasRef.current;
    const core    = coreRef.current;
    const soft    = softRef.current;
    const anchor  = anchorRef.current;
    const discs   = discRefs.current.filter(Boolean);
    const section = sectionRef.current;
    const sentinel = sentinelRef.current;
    if (!stage || !canvas || !core || !discs.length) return;

    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let connectorOpacity = 1;
    let sequencePlaying = false;
    let exitPlaying = false;
    let entryTimers = [];
    let exitRAF = 0;
    let connectorRAF = 0;
    let stageInView = false;
    let exitBottomCrossed = false;

    function fitCanvas() {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    fitCanvas();

    function centerOf(el) {
      const sr = stage.getBoundingClientRect();
      const r  = el.getBoundingClientRect();
      return { x: r.left + r.width/2 - sr.left, y: r.top + r.height/2 - sr.top };
    }
    function pointOnRectTowards(el, tx, ty) {
      const sr = stage.getBoundingClientRect();
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width/2 - sr.left;
      const cy = r.top  + r.height/2 - sr.top;
      const dx = tx - cx, dy = ty - cy;
      const hx = r.width/2, hy = r.height/2;
      const ax = Math.abs(dx), ay = Math.abs(dy);
      const sx = ax === 0 ? 1 : hx/ax;
      const sy = ay === 0 ? 1 : hy/ay;
      const s  = Math.min(sx, sy);
      return { x: cx + dx*s, y: cy + dy*s };
    }
    function pointOnCircleTowards(el, sx0, sy0) {
      const sr = stage.getBoundingClientRect();
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width/2 - sr.left;
      const cy = r.top  + r.height/2 - sr.top;
      const rad = r.width/2;
      const dx = sx0 - cx, dy = sy0 - cy;
      const d  = Math.hypot(dx, dy) || 1;
      return { x: cx + dx/d*rad, y: cy + dy/d*rad };
    }
    function drawConnectors(progress) {
      const w = stage.clientWidth, h = stage.clientHeight;
      ctx.clearRect(0, 0, w, h);
      if (progress <= 0) return;
      if (connectorOpacity <= 0.01) return;
      if (!core.classList.contains('s3-in')) return;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(232,147,70,' + (0.5 * connectorOpacity).toFixed(3) + ')';
      ctx.setLineDash([4, 4]);

      discs.forEach((d) => {
        if (!d.classList.contains('s3-in')) return;
        const cc = centerOf(core);
        const start = pointOnRectTowards(d, cc.x, cc.y);
        const end   = pointOnCircleTowards(core, start.x, start.y);
        const sx = start.x, sy = start.y;
        const ex = sx + (end.x - sx) * Math.min(1, progress);
        const ey = sy + (end.y - sy) * Math.min(1, progress);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    function resetSection() {
      entryTimers.forEach(clearTimeout);
      entryTimers = [];
      if (exitRAF) { cancelAnimationFrame(exitRAF); exitRAF = 0; }
      if (connectorRAF) { cancelAnimationFrame(connectorRAF); connectorRAF = 0; }
      sequencePlaying = false;
      exitPlaying = false;

      if (anchor) anchor.classList.remove('s3-exiting');
      discs.forEach((d) => { d.classList.remove('s3-in'); d.classList.remove('s3-fading'); });
      core.classList.remove('s3-in');
      soft.classList.remove('s3-in');

      connectorOpacity = 1;
      const w = stage.clientWidth, h = stage.clientHeight;
      ctx.clearRect(0, 0, w, h);
    }

    function runSequence() {
      if (sequencePlaying) return;
      sequencePlaying = true;
      entryTimers.forEach(clearTimeout);
      entryTimers = [];

      // 5 discipline cards, staggered 180ms apart starting at 220ms
      [0, 1, 2, 3, 4].forEach((i) => {
        entryTimers.push(setTimeout(() => {
          if (discs[i]) discs[i].classList.add('s3-in');
        }, 220 + i * 180));
      });

      // Core materializes after the 5th card (220 + 5*180 + 280)
      const coreStart = 220 + 5 * 180 + 280;
      entryTimers.push(setTimeout(() => {
        core.classList.add('s3-in');
        soft.classList.add('s3-in');
      }, coreStart));

      // Connectors draw 700ms after the core, animated over 900ms
      const connectorStart = coreStart + 700;
      const connectorDur   = 900;
      entryTimers.push(setTimeout(() => {
        let t0 = null;
        const step = (ts) => {
          if (t0 === null) t0 = ts;
          const elapsed = ts - t0;
          const p = Math.min(1, elapsed / connectorDur);
          const eased = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p + 2, 2) / 2;
          drawConnectors(eased);
          if (p < 1) connectorRAF = requestAnimationFrame(step);
          else connectorRAF = 0;
        };
        connectorRAF = requestAnimationFrame(step);
      }, connectorStart));

      // The closing payoff line was removed in v0.4.2 (its content was
      // merged into the section h2). The connector animation now ends
      // the entry sequence on its own.
      const totalDur = connectorStart + connectorDur + 100;
      entryTimers.push(setTimeout(() => { sequencePlaying = false; }, totalDur));
    }

    function runExit() {
      if (exitPlaying) return;
      exitPlaying = true;
      if (anchor) anchor.classList.add('s3-exiting');
      discs.forEach((d) => d.classList.add('s3-fading'));

      let t0 = null;
      const fadeStep = (ts) => {
        if (t0 === null) t0 = ts;
        const elapsed = ts - t0;
        const p = Math.max(0, Math.min(1, elapsed / 1000));
        connectorOpacity = 1 - p;
        drawConnectors(1);
        if (p < 1) {
          exitRAF = requestAnimationFrame(fadeStep);
        } else {
          exitRAF = 0;
          exitPlaying = false;
        }
      };
      exitRAF = requestAnimationFrame(fadeStep);
    }

    // Reduced motion: skip animation, show end-state
    if (reduce) {
      discs.forEach((d) => d.classList.add('s3-in'));
      core.classList.add('s3-in');
      soft.classList.add('s3-in');
      requestAnimationFrame(() => drawConnectors(1));
      // Still install the resize listener; skip observers.
      const onResize = () => { fitCanvas(); drawConnectors(1); };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    // Resize handling — recompute canvas + redraw connectors
    const onResize = () => {
      fitCanvas();
      requestAnimationFrame(() => drawConnectors(1));
    };
    window.addEventListener('resize', onResize);

    // Stage-in observer — fires entry sequence ONCE on first entry.
    //
    // Earlier rev had replay-on-reentry, but that caused visible
    // hiccups: scrolling back up into the section called resetSection
    // (clears all card visibility) then re-ran the staggered entry,
    // which read as the whole layout dissolving and re-building. We
    // keep state once it's been built.
    let entryFired = false;
    const stageIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !entryFired) {
          entryFired = true;
          runSequence();
          stageIO.disconnect();
        }
      });
    }, { threshold: 0.18 });
    stageIO.observe(stage);

    // Exit-trigger observer — also retired with the play-once rev.
    // The exit fade was the second source of "hinky" scroll behavior:
    // cards faded out when you scrolled past the bottom, then the
    // stage observer re-fired the entry when you scrolled back. We
    // disable both. The section now just sits in its built state.
    // (Sentinel still rendered for backwards compat; nothing observes it.)

    /* ── SCROLL-DRIVEN CORE HANDOFF (Row 2 → Row 3) ────────────────
     * The core anchor's downward translate is bound to how far the
     * section's bottom edge has scrolled past the viewport's midline.
     * Replaces the older time-based 1.2s `.s3-exiting` transition
     * (which fired on IO leave and never synced with the reader's
     * scroll velocity).
     *
     * Mechanic: as the section's bottom passes upward through the
     * viewport from ~55% height down through 0%, the anchor translates
     * downward up to MAX_DROP pixels and fades to 0. The Row-3 ghost
     * (HeroPressureExhibit) starts its own scroll-driven descent
     * concurrently, so the user reads the two motions as a single
     * core falling through the section boundary. We don't need
     * pixel-perfect coordinate alignment between the two — what reads
     * as a "handoff" is the matched motion language (both bound to
     * scroll, both falling downward at scroll velocity). */
    const MAX_DROP = 320;
    let handoffRAF = 0;
    let handoffLast = -1;
    function updateHandoff() {
      handoffRAF = 0;
      if (!section || !anchor) return;
      // Until the build sequence has fired (i.e. the user hasn't
      // yet scrolled the section into view at all), don't touch
      // the anchor — let the entry sequence paint it in place.
      if (!entryFired) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const enterY = vh * 0.55;
      const leaveY = vh * -0.10;
      const raw = (enterY - rect.bottom) / (enterY - leaveY);
      const p = Math.max(0, Math.min(1, raw));
      if (Math.abs(p - handoffLast) < 0.002) return;
      handoffLast = p;
      const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      anchor.style.transform = `translate(-50%, calc(-50% + ${(eased * MAX_DROP).toFixed(1)}px))`;
      anchor.style.opacity = String((1 - eased).toFixed(3));
    }
    const onHandoffScroll = () => {
      if (handoffRAF) return;
      handoffRAF = requestAnimationFrame(updateHandoff);
    };
    window.addEventListener('scroll', onHandoffScroll, { passive: true });
    window.addEventListener('resize', onHandoffScroll, { passive: true });
    // Prime once after mount.
    requestAnimationFrame(updateHandoff);

    return () => {
      stageIO.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onHandoffScroll);
      window.removeEventListener('resize', onHandoffScroll);
      if (handoffRAF) cancelAnimationFrame(handoffRAF);
      entryTimers.forEach(clearTimeout);
      if (exitRAF) cancelAnimationFrame(exitRAF);
      if (connectorRAF) cancelAnimationFrame(connectorRAF);
    };
  }, []);

  return (
    <>
      <style>{`
        /* ── SECTION 3 SCOPED STYLES (s3-) ─────────────────────────── */
        .s3-section { position: relative; background: ${C.paper}; }
        .s3-row {
          position: relative;
          max-width: ${MEASURE.wide}px;
          margin: 0 auto;
          /* Symmetric section rhythm — matches the page-wide spec
             (RHYTHM.sectionPadY = clamp(56,5vw,72)). Asymmetric
             hand-rolled padding was retired Feb 2026 as part of the
             design-spec pass. */
          padding: ${RHYTHM.sectionPadY} ${RHYTHM.sectionPadX};
        }
        .s3-intro { max-width: ${MEASURE.read}px; margin: 0 auto 16px; text-align: center; }
        .s3-eyebrow {
          font-family: ${MONO};
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: ${C.gold};
          margin-bottom: 28px;
        }
        .s3-h2 {
          /* Matches TYPE.h2.lineHeight (1.08). */
          line-height: ${TYPE.h2.lineHeight};
          letter-spacing: ${TYPE.h2.tracking};
          margin-bottom: 14px;
        }
        .s3-h2 .sans {
          display: inline-block;
          font-family: ${SANS};
          font-weight: ${TYPE.h2.weight};
          /* Single H2 ladder from spec. Replaces the hand-rolled
             clamp(30, 3.2vw, 48) that lived here Feb 2026 — Rows 2/3
             now match every other H2 on the page. */
          font-size: ${TYPE.h2.size};
          color: ${C.navy};
          will-change: opacity, transform;
        }
        .s3-h2 .serif {
          display: inline-block;
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 500;
          font-size: ${TYPE.h2.size};
          color: ${C.gold};
          margin-left: 0.2em;
          will-change: opacity, transform;
        }
        /* Lede sentences — each <span class="s3-lede-sent"> is an
           independent build target so the four-sentence paragraph
           cascades in / out sentence by sentence. inline-block keeps
           the natural paragraph flow; the spans wrap at word
           boundaries between them. */
        .s3-lede-sent {
          display: inline;
          will-change: opacity, transform;
        }
        .s3-lede {
          font-family: ${SANS};
          font-size: 17px;
          font-weight: 300;
          line-height: 1.65;
          color: ${C.body};
          max-width: 44em;
          margin: 0 auto;
        }
        .s3-stage {
          position: relative;
          width: 100%;
          /* Stage height tuned Feb 2026 — d5 (Daily Accountability)
             needs ~40px clearance below the core (which extends to
             top:50% + 94px radius = top:50% + 94 = 334 at 500h).
             Stage 500 with d5 at bottom:0 gives ~35–40px gap, clean.
             Total row is still ~140px shorter than the original 540h. */
          height: 500px;
          margin: 20px auto 0;
        }
        .s3-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .s3-core-anchor {
          position: absolute;
          left: 50%;
          /* Vertically centered in the stage. The disciplines arrange
             around it: d1/d2 above, d3/d4 level, d5 below. */
          top: 50%;
          transform: translate(-50%, -50%);
          width: 188px;
          height: 188px;
          pointer-events: none;
          transition:
            transform 1.2s cubic-bezier(.42,0,.58,1),
            opacity 1.2s cubic-bezier(.42,0,.58,1);
        }
        .s3-core-anchor.s3-exiting {
          transform: translate(-50%, calc(-50% + 220px));
          opacity: 0;
        }
        .s3-core-soft {
          position: absolute;
          inset: -47px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(232,147,70,0.12) 0%,
            rgba(232,147,70,0.06) 50%,
            rgba(232,147,70,0) 75%);
          opacity: 0;
          transition: opacity 1.4s cubic-bezier(.22,.61,.36,1);
          z-index: -1;
          pointer-events: none;
        }
        .s3-core-soft.s3-in { opacity: 1; }
        .s3-core {
          position: absolute;
          inset: 0;
          border: 1.5px solid rgba(232,147,70,0.95);
          border-radius: 50%;
          background: ${C.navyDeep};
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0;
          transform: scale(.85);
          transition:
            opacity 1s cubic-bezier(.22,.61,.36,1),
            transform 1s cubic-bezier(.22,.61,.36,1);
        }
        .s3-core.s3-in {
          opacity: 1;
          transform: scale(1);
          animation: s3-coreBreath 4.2s ease-in-out infinite 1.2s;
        }
        .s3-core::before {
          content: "";
          position: absolute;
          inset: 14%;
          border: 1px solid rgba(232,147,70,0.22);
          border-radius: 50%;
          pointer-events: none;
        }
        @keyframes s3-coreBreath {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.012); }
        }
        .s3-core-text {
          color: ${C.gold};
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .18em;
          line-height: 1.42;
          text-transform: uppercase;
          text-align: center;
        }
        .s3-core-text .line {
          display: block;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity .6s cubic-bezier(.22,.61,.36,1),
            transform .6s cubic-bezier(.22,.61,.36,1);
        }
        .s3-core.s3-in .s3-core-text .line { opacity: 1; transform: translateY(0); }
        .s3-core.s3-in .s3-core-text .line:nth-child(1) { transition-delay: .30s; }
        .s3-core.s3-in .s3-core-text .line:nth-child(2) { transition-delay: .42s; }
        .s3-core.s3-in .s3-core-text .line:nth-child(3) { transition-delay: .54s; }
        .s3-core.s3-in .s3-core-text .line:nth-child(4) { transition-delay: .66s; }

        .s3-disc {
          position: absolute;
          width: 220px;
          text-align: left;
          opacity: 0;
          transition:
            opacity .9s cubic-bezier(.22,.61,.36,1),
            transform 1.1s cubic-bezier(.22,.61,.36,1);
          will-change: transform, opacity;
        }
        .s3-disc .s3-num {
          font-family: ${MONO};
          font-size: 10.5px;
          letter-spacing: .22em;
          color: ${C.gold};
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }
        .s3-disc .s3-name {
          font-family: ${SANS};
          font-weight: 800;
          font-size: 18px;
          line-height: 1.18;
          color: ${C.navy};
          letter-spacing: -.005em;
          /* Tightened Feb 2026 — was 8px, dropped to 2px so the
             discipline name sits tight against its descriptor. */
          margin-bottom: 2px;
        }
        .s3-disc .s3-copy {
          font-family: ${SANS};
          font-weight: 300;
          font-size: 14px;
          /* Tightened Feb 2026 — line-height 1.5 → 1.42. */
          line-height: 1.42;
          color: ${C.body};
          margin: 0;
        }
        /* Discipline positions (entered state). Tightened Feb 2026:
              d1/d2 → top:2%   (tucked just under the lede)
              d3/d4 → top:48%  (level with the core's vertical middle)
              d5    → bottom:4% (pulled up from the stage floor — was
                                 hanging way low at bottom:0%) */
        .s3-disc.d1 { left: 12%; top: 2%;    transform: translate(-20px, -16px); }
        .s3-disc.d2 { right: 12%; top: 2%;   transform: translate(20px, -16px);  text-align: right; }
        .s3-disc.d3 { left: 8%;  top: 48%;   transform: translate(-30px, 0); }
        .s3-disc.d4 { right: 8%; top: 48%;   transform: translate(30px, 0);     text-align: right; }
        .s3-disc.d5 { left: 50%; bottom: 0%; transform: translate(-50%, 24px);  text-align: center; }
        .s3-disc.s3-in { opacity: 1; transform: translate(0, 0); }
        .s3-disc.d5.s3-in { transform: translate(-50%, 0); }
        .s3-disc.s3-fading { opacity: 0; transition: opacity 1s cubic-bezier(.22,.61,.36,1); }

        /* Removed in v0.4.2: .s3-below / .s3-payoff (the closing
           "Together, they form your ability to execute…" line). Its
           message was merged into the section h2. */

        @media (max-width: 980px) {
          .s3-row { padding: 56px 32px 48px; }
          .s3-stage { height: auto; min-height: auto; }
          .s3-core-anchor {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
            margin: 32px auto;
            width: 170px;
            height: 170px;
          }
          .s3-core-anchor.s3-exiting {
            transform: translateY(220px);
            opacity: 0;
          }
          .s3-disc {
            position: relative;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            bottom: auto !important;
            width: 100%;
            max-width: 520px;
            margin: 0 auto 28px;
            text-align: left !important;
            transform: translateY(20px);
          }
          .s3-disc.s3-in { transform: translateY(0); }
          .s3-canvas { display: none; }
        }
        @media (max-width: 480px) {
          .s3-row { padding: 48px 22px 40px; }
          .s3-core-anchor { width: 150px; height: 150px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .s3-disc, .s3-core, .s3-core-soft, .s3-core-text .line {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .s3-disc.d1, .s3-disc.d2, .s3-disc.d3, .s3-disc.d4 {
            transform: translate(0, 0) !important;
          }
          .s3-disc.d5 { transform: translate(-50%, 0) !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="s3-section"
        aria-label="What we build — the ability to execute, no matter what"
      >
        <div className="s3-row">
          <div className="s3-intro">
            <h2 className="s3-h2">
              <span className="sans" data-build>We build the disciplines to execute.</span>{' '}
              <span className="serif" data-build>No matter what.</span>
            </h2>
            <p className="s3-lede">
              <span className="s3-lede-sent" data-build>Five disciplines built into how the operation executes every shift, every day, every quarter.</span>{' '}
              <span className="s3-lede-sent" data-build>Not five initiatives. Not five priorities.</span>{' '}
              <span className="s3-lede-sent" data-build>Weaken one and the others drift.</span>{' '}
              <span className="s3-lede-sent" data-build>Build them together and they interlock into something load-bearing, deep enough that performance doesn&rsquo;t break down when conditions do.</span>
            </p>
          </div>

          <div className="s3-stage" ref={stageRef}>
            <canvas className="s3-canvas" ref={canvasRef} aria-hidden="true" />
            {DISCIPLINES.map((d, i) => (
              <div
                key={d.name}
                ref={(el) => { discRefs.current[i] = el; }}
                className={`s3-disc ${d.pos}`}
              >
                {/* `<span className="s3-num">{d.num}</span>` removed
                    Feb 2026 — eyebrows like "01 — Discipline" were
                    redundant with the discipline NAME itself
                    ("Operational Discipline"), and they added vertical
                    height that the row didn't need. */}
                <p className="s3-name">{d.name}</p>
                <p className="s3-copy">{d.body}</p>
                <CardLearnMore href={d.href} />
              </div>
            ))}
            <div className="s3-core-anchor" ref={anchorRef}>
              <div className="s3-core-soft" ref={softRef}></div>
              <div className="s3-core" ref={coreRef}>
                <div className="s3-core-text">
                  <span className="line">Execution</span>
                  <span className="line">Capability</span>
                  <span className="line">Rooted in</span>
                  <span className="line">Discipline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom-of-section sentinel for the exit observer */}
        <div
          ref={sentinelRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            pointerEvents: 'none',
          }}
        />
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  SECTION 4 — PRESSURE EXHIBIT
 * ════════════════════════════════════════════════════════════════ */

const PRESSURES = [
  'Market volatility','Tariff & trade shifts','Demand swings','Workforce turnover',
  'Equipment breakdowns','Inexperienced supervisors','Margin compression','Schedule misses',
  'Supply chain disruption','New site ramp-up','Raw material shortfall','Quality escapes',
  'Absenteeism','Changeover delays','Unplanned downtime','Skilled labor shortage',
  'Aging equipment','Rising input costs','Capacity constraints','Supplier delays',
  'Rework & scrap','Safety incidents','Tribal knowledge loss','Forecast misses',
  'Inventory imbalance','Shipping delays','Energy cost spikes','Regulatory changes',
  'Customer escalations','Maintenance backlog','Bottleneck operations','Shift variance',
  'Overtime creep','Yield loss','Material price swings',
];
const OUTCOMES = [
  'Increased throughput','Higher OEE','Reduced downtime','Improved labor productivity',
  'Expanded margin','Recovered working capital','Stronger frontline leadership','Sustained performance',
  'Lower cost per unit','Workforce stability','Increased capacity','Higher quality','Less waste','Higher yield',
  'Faster changeovers','On-time delivery','Predictable schedules','Fewer safety incidents',
  'Improved first-pass yield','Lower scrap rate','Better asset reliability','Shorter lead times',
  'Consistent shift output','Reduced overtime','Stronger accountability','Improved morale',
  'Tighter cost control','Scalable operations','Repeatable execution','Higher utilization',
];

export function SectionPressureExhibit() {
  const sectionRef    = useRef(null);
  const exhibitRef    = useRef(null);
  const canvasRef     = useRef(null);
  const copyRef       = useRef(null);
  const ghostWrapRef  = useRef(null);
  const controlsRef   = useRef(null);
  const toggleRef     = useRef(null);
  const loadRef       = useRef(null);
  const loadValRef    = useRef(null);
  const burstRef      = useRef(null);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const copyEl    = copyRef.current;
    const controlsEl= controlsRef.current;
    const ghostWrap = ghostWrapRef.current;
    const exhibitEl = exhibitRef.current;
    const toggleEl  = toggleRef.current;
    const loadEl    = loadRef.current;
    const loadValEl = loadValRef.current;
    const burstEl   = burstRef.current;
    if (!canvas || !exhibitEl) return;

    const ctx = canvas.getContext('2d');
    const NAVY_DEEP = '#0f2a47';
    const RED = '#fa4b4b', GREEN = '#4dc774', GOLD = '#e89346';

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let core = { x: 0, y: 0, r: 0 };

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function aspectFor(w) {
      if (w < 480) return 0.56;
      if (w < 768) return 0.46;
      return 0.38;
    }
    function coreSizeFor(w) {
      if (w < 480) return 150;
      if (w < 880) return 170;
      return 188;
    }
    function resize() {
      const cssW = canvas.clientWidth || canvas.parentElement.clientWidth;
      const cssH = Math.round(cssW * aspectFor(cssW));
      canvas.style.height = cssH + 'px';
      W = cssW; H = cssH;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      core.x = W * 0.5;
      core.y = H * 0.5;
      const coreDiameter = coreSizeFor(window.innerWidth);
      core.r = coreDiameter / 2;
      if (ghostWrap) {
        ghostWrap.style.width  = coreDiameter + 'px';
        ghostWrap.style.height = coreDiameter + 'px';
      }
    }

    function rand(a, b) { return a + Math.random() * (b - a); }
    function pick(arr)  { return arr[(Math.random() * arr.length) | 0]; }

    const inbound = [];
    const outbound = [];
    const particles = [];

    function spawnPressure() {
      inbound.push({
        text: pick(PRESSURES),
        x: -30,
        y: rand(0.08, 0.92) * H,
        speed: rand(2.0, 4.2),
        wobble: rand(0, Math.PI * 2),
        wobAmp: rand(0.15, 0.7),
        size: rand(12, 17),
        opacity: 0,
        state: 'fly',
        tAbsorb: 0,
      });
    }
    function emitOutcome() {
      outbound.push({
        text: pick(OUTCOMES),
        x: core.x + core.r * 0.2,
        y: core.y + rand(-core.r * 0.5, core.r * 0.5),
        targetY: core.y + rand(-H * 0.30, H * 0.30),
        vx: 1.9,
        size: 14,
        opacity: 0,
        life: 0,
        state: 'birth',
      });
    }
    function burstAbsorb(x, y, color) {
      for (let i = 0; i < 14; i++) {
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.6, 2.6);
        particles.push({
          x, y,
          vx: Math.cos(a) * sp - 1.2,
          vy: Math.sin(a) * sp,
          r: rand(1, 2.6),
          life: 1,
          decay: rand(0.012, 0.03),
          color,
        });
      }
    }
    function burstEmit(x, y, color) {
      for (let i = 0; i < 10; i++) {
        const a = rand(-0.7, 0.7);
        const sp = rand(0.8, 2.2);
        particles.push({
          x, y,
          vx: Math.cos(a) * sp + 0.8,
          vy: Math.sin(a) * sp * 0.6,
          r: rand(1, 2.4),
          life: 1,
          decay: rand(0.012, 0.028),
          color,
        });
      }
    }

    let loadLevel = 6;
    let lastSpawn = 0;
    let lastEmit = 0;
    const EMIT_GAP = 1150;
    let surgeUntil = 0;
    let surgeStart = 0;
    const SURGE_DUR = 2600;
    let surgeEase = 0;

    let entryStart = 0;
    let entryProgress = 0;
    let entryTriggered = false;
    let entryComplete = false;
    const ENTRY_DUR = 1600;

    function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }

    function positionGhostStart() {
      if (!ghostWrap || !canvas) return { startY: 0, endY: 0 };
      const exhibitRect = exhibitEl.getBoundingClientRect();
      const canvasRect  = canvas.getBoundingClientRect();
      const ghostSize   = coreSizeFor(window.innerWidth);
      const startY = 0;
      const endY = (canvasRect.top - exhibitRect.top) + (canvasRect.height / 2) - (ghostSize / 2);
      return { startY, endY };
    }
    let ghostPositions = { startY: 0, endY: 0 };

    function updateEntry(t) {
      if (!entryTriggered) return;
      if (entryStart === 0) return;
      const elapsed = t - entryStart;
      if (!entryComplete) {
        const p = Math.max(0, Math.min(1, elapsed / ENTRY_DUR));
        const eased = easeOutCubic(p);
        const opacity = p < 0.15 ? (p / 0.15) : 1;
        const y = ghostPositions.startY + (ghostPositions.endY - ghostPositions.startY) * eased;
        ghostWrap.style.transform = 'translateX(-50%) translateY(' + y + 'px)';
        ghostWrap.style.opacity = opacity;
        if (p >= 1) {
          entryComplete = true;
          ghostWrap.style.opacity = 0;
          ghostWrap.style.transition = 'opacity .3s ease-out';
          controlsEl.classList.add('s4-in');
          spawnPressure();
          const gap = computeSpawnGap();
          lastSpawn = t - gap * 0.55;
          lastEmit = t;
        }
      } else {
        const fadeElapsed = elapsed - ENTRY_DUR;
        const fadeP = Math.max(0, Math.min(1, fadeElapsed / 300));
        entryProgress = fadeP;
      }
    }

    function triggerEntry() {
      if (entryTriggered) return;
      entryTriggered = true;
      ghostPositions = positionGhostStart();
      ghostWrap.style.transform = 'translateX(-50%) translateY(' + ghostPositions.startY + 'px)';
      copyEl.classList.add('s4-in');
      setTimeout(() => { entryStart = performance.now(); }, 400);
    }

    function resetExhibit() {
      if (entryTriggered && !entryComplete) return;
      entryTriggered = false;
      entryComplete = false;
      entryStart = 0;
      entryProgress = 0;
      copyEl.classList.remove('s4-in');
      controlsEl.classList.remove('s4-in');
      ghostWrap.style.transition = '';
      ghostWrap.style.opacity = 0;
      ghostWrap.style.transform = 'translateX(-50%) translateY(0px)';
      inbound.length = 0;
      outbound.length = 0;
      particles.length = 0;
    }

    function computeSpawnGap() {
      return 1150 - (loadLevel - 1) * 95;
    }

    function updateSurgeEase(t) {
      if (t >= surgeUntil) {
        surgeEase += (0 - surgeEase) * 0.06;
        if (surgeEase < 0.002) surgeEase = 0;
        return;
      }
      const elapsed = t - surgeStart;
      const p = Math.max(0, Math.min(1, elapsed / SURGE_DUR));
      const target = Math.sin(p * Math.PI);
      surgeEase += (target - surgeEase) * 0.08;
    }

    let running = true;
    let speedScale = reduceMotion ? 0.35 : 1;
    let pulse = 0;
    let rafId = 0;

    function fadeNearCore(dist) {
      const edge = core.r * 1.25;
      if (dist > edge) return 1;
      return Math.max(0.15, (dist - core.r * 0.9) / (edge - core.r * 0.9));
    }

    function drawLabel(x, y, text, color, opacity, size) {
      if (opacity <= 0.01) return;
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      ctx.fillStyle = color;
      ctx.font = '600 ' + size.toFixed(1) + 'px "proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1;
    }
    function drawTracked(text, cx, y, tracking) {
      ctx.textAlign = 'left';
      const widths = [];
      let total = 0;
      for (const ch of text) {
        const w = ctx.measureText(ch).width;
        widths.push(w);
        total += w + tracking;
      }
      total -= tracking;
      let x = cx - total / 2;
      let k = 0;
      for (const ch of text) {
        ctx.fillText(ch, x, y);
        x += widths[k] + tracking;
        k++;
      }
      ctx.textAlign = 'center';
    }
    function drawCore(t) {
      const baseBreath = Math.sin(t * 0.0015) * 0.012;
      const surgeBreath = Math.sin(t * 0.0011) * 0.05 * surgeEase;
      const swell = 1 + baseBreath + surgeBreath + surgeEase * 0.04;
      const r = core.r * swell + pulse * 4;
      const entryAlpha = entryProgress;
      const drawX = core.x;
      const drawY = core.y;
      if (entryAlpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = entryAlpha;
      const haloR = r * (1.5 + surgeEase * 0.5);
      const haloAlpha = 0.12 + pulse * 0.06 + surgeEase * 0.10;
      const halo = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, haloR);
      halo.addColorStop(0,    'rgba(232,147,70,' + haloAlpha.toFixed(3) + ')');
      halo.addColorStop(0.50, 'rgba(232,147,70,' + (haloAlpha * 0.5).toFixed(3) + ')');
      halo.addColorStop(0.75, 'rgba(232,147,70,0)');
      halo.addColorStop(1,    'rgba(232,147,70,0)');
      ctx.beginPath();
      ctx.arc(drawX, drawY, haloR, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
      ctx.fillStyle = NAVY_DEEP;
      ctx.fill();
      ctx.lineWidth = 1.5 + surgeEase * 1.0;
      ctx.strokeStyle = 'rgba(232,147,70,' + (0.95 + surgeEase * 0.05).toFixed(2) + ')';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(drawX, drawY, r * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(232,147,70,0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.textBaseline = 'middle';
      const titleSize = Math.max(12, r * 0.150);
      ctx.font = '500 ' + titleSize.toFixed(0) + 'px "proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';
      ctx.fillStyle = GOLD;
      const lines = ['EXECUTION', 'CAPABILITY', 'ROOTED IN', 'DISCIPLINE'];
      const lh = titleSize * 1.42;
      const startY = drawY - lh * 1.5;
      const tracking = titleSize * 0.18;
      for (let i = 0; i < lines.length; i++) {
        drawTracked(lines[i], drawX, startY + i * lh, tracking);
      }
      ctx.restore();
    }

    function frame(ts) {
      const t = ts;
      ctx.clearRect(0, 0, W, H);
      updateSurgeEase(t);
      updateEntry(t);
      drawCore(t);

      const swarmActive = entryComplete;
      const surging = t < surgeUntil;
      const gap = surging ? 180 : computeSpawnGap();
      if (swarmActive && running && t - lastSpawn > gap) {
        spawnPressure();
        if (surging && Math.random() < 0.6) spawnPressure();
        lastSpawn = t;
      }
      if (swarmActive && running && t - lastEmit > EMIT_GAP) {
        emitOutcome();
        lastEmit = t;
      }
      for (let i = inbound.length - 1; i >= 0; i--) {
        const p = inbound[i];
        if (p.state === 'fly') {
          p.opacity = Math.min(1, p.opacity + 0.06);
          if (running) {
            const dx = core.x - p.x, dy = core.y - p.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist, uy = dy / dist;
            const perpx = -uy, perpy = ux;
            p.wobble += 0.05;
            const wob = Math.sin(p.wobble) * p.wobAmp;
            p.x += (ux * p.speed + perpx * wob) * speedScale;
            p.y += (uy * p.speed + perpy * wob) * speedScale;
            if (dist < core.r * 0.95) {
              p.state = 'absorb'; p.tAbsorb = 0;
              burstAbsorb(p.x, p.y, RED);
            }
          }
          const ddx = core.x - p.x, ddy = core.y - p.y;
          const ddist = Math.hypot(ddx, ddy);
          drawLabel(p.x, p.y, p.text, RED, p.opacity * fadeNearCore(ddist), p.size);
        } else if (p.state === 'absorb') {
          p.tAbsorb += 0.06;
          const k = 1 - p.tAbsorb;
          if (running) {
            p.x += (core.x - p.x) * 0.18;
            p.y += (core.y - p.y) * 0.18;
          }
          drawLabel(p.x, p.y, p.text, RED, Math.max(0, k) * 0.6, p.size * Math.max(0.2, k));
          if (p.tAbsorb >= 1) {
            inbound.splice(i, 1);
            pulse = Math.min(1, pulse + 0.10);
          }
        }
      }
      for (let i = outbound.length - 1; i >= 0; i--) {
        const o = outbound[i];
        if (o.state === 'birth') {
          o.life += 0.05;
          o.opacity = Math.min(1, o.opacity + 0.05);
          if (running) {
            o.y += (o.targetY - o.y) * 0.04;
            o.x += o.vx * 0.4 * speedScale;
          }
          if (o.life >= 1) {
            o.state = 'glide';
            burstEmit(o.x, o.y, GREEN);
          }
          drawLabel(o.x, o.y, o.text, GREEN, o.opacity * 0.85, o.size);
        } else {
          if (running) {
            o.x += o.vx * speedScale;
            o.y += (o.targetY - o.y) * 0.02;
          }
          let op = o.opacity;
          if (o.x > W * 0.86) { op = Math.max(0, op - 0.02); o.opacity = op; }
          drawLabel(o.x, o.y, o.text, GREEN, op, o.size);
          if (o.x > W + 40 || op <= 0.02) {
            outbound.splice(i, 1);
          }
        }
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const pa = particles[i];
        if (running) { pa.x += pa.vx * speedScale; pa.y += pa.vy * speedScale; }
        pa.life -= pa.decay;
        if (pa.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, pa.life) * 0.7;
        ctx.fillStyle = pa.color;
        ctx.beginPath();
        ctx.arc(pa.x, pa.y, pa.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      pulse *= 0.94;
      rafId = requestAnimationFrame(frame);
    }

    // Controls listeners
    const onToggle = () => {
      running = !running;
      toggleEl.textContent = running ? 'Pause' : 'Play';
    };
    const onLoad = (e) => {
      loadLevel = +e.target.value;
      loadValEl.textContent = e.target.value;
    };
    const onBurst = () => {
      surgeStart = performance.now();
      surgeUntil = surgeStart + SURGE_DUR;
    };
    toggleEl.addEventListener('click', onToggle);
    loadEl.addEventListener('input', onLoad);
    burstEl.addEventListener('click', onBurst);

    // Resize
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    // Boot
    resize();

    let observer = null;
    if (reduceMotion) {
      // Show end-state immediately; spawn a few labels for legibility
      entryProgress = 1;
      entryTriggered = true;
      entryComplete = true;
      copyEl.classList.add('s4-in');
      controlsEl.classList.add('s4-in');
      ghostWrap.style.display = 'none';
      for (let i = 0; i < 3; i++) {
        setTimeout(spawnPressure, i * 250);
      }
    } else if ('IntersectionObserver' in window) {
      let exhibitInView = false;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            if (!exhibitInView) {
              exhibitInView = true;
              if (!entryTriggered || entryComplete) {
                resetExhibit();
                triggerEntry();
              }
            }
          } else {
            exhibitInView = false;
          }
        });
      }, { threshold: 0.25 });
      observer.observe(exhibitEl);
    } else {
      triggerEntry();
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', onResize);
      toggleEl.removeEventListener('click', onToggle);
      loadEl.removeEventListener('input', onLoad);
      burstEl.removeEventListener('click', onBurst);
    };
  }, []);

  return (
    <>
      <style>{`
        /* ── SECTION 4 SCOPED STYLES (s4-) ─────────────────────────── */
        .s4-section { background: ${C.paper}; }
        .s4-exhibit {
          position: relative;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 56px 56px 80px;
        }
        .s4-copy {
          max-width: 880px;
          margin: 0 auto;
          text-align: center;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity .9s cubic-bezier(.22,.61,.36,1),
            transform .9s cubic-bezier(.22,.61,.36,1);
        }
        .s4-copy.s4-in { opacity: 1; transform: translateY(0); }
        .s4-eyebrow {
          /* Matches the s3-eyebrow treatment one-for-one so the two
             sections read as a paired narrative: "what we build" →
             "what that means". Mono, gold, 0.24em tracking, sits
             above the h2 with the same 28px gap. */
          font-family: ${MONO};
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: ${C.gold};
          margin-bottom: 28px;
        }
        .s4-h2 {
          line-height: 1.08;
          letter-spacing: -.012em;
          margin-bottom: 14px;
        }
        .s4-h2 .sans {
          display: inline;
          font-family: ${SANS};
          font-weight: 800;
          font-size: clamp(30px, 3.6vw, 46px);
          color: ${C.navy};
        }
        .s4-h2 .serif {
          display: inline;
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 500;
          font-size: clamp(30px, 3.6vw, 46px);
          color: ${C.gold};
          margin-left: .2em;
        }
        .s4-lede {
          font-family: ${SANS};
          font-size: 17px;
          font-weight: 300;
          line-height: 1.65;
          color: ${C.body};
          max-width: 44em;
          margin: 0 auto;
        }
        .s4-stage-wrap { position: relative; width: 100%; margin-top: 0; }
        .s4-canvas { display: block; width: 100%; height: auto; }
        .s4-ghost-wrap {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 188px;
          height: 188px;
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          will-change: transform, opacity;
        }
        .s4-ghost-wrap::before {
          content: "";
          position: absolute;
          inset: -47px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(232,147,70,0.12) 0%,
            rgba(232,147,70,0.06) 50%,
            rgba(232,147,70,0) 75%);
          pointer-events: none;
        }
        .s4-ghost-core {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1.5px solid rgba(232,147,70,0.95);
          border-radius: 50%;
          background: ${C.navyDeep};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .s4-ghost-core::before {
          content: "";
          position: absolute;
          inset: 14%;
          border: 1px solid rgba(232,147,70,0.22);
          border-radius: 50%;
        }
        .s4-ghost-core-text {
          color: ${C.gold};
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .18em;
          line-height: 1.42;
          text-transform: uppercase;
          text-align: center;
        }
        .s4-ghost-core-text span { display: block; }

        .s4-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          margin-top: 14px;
          flex-wrap: wrap;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(.22,.61,.36,1);
        }
        .s4-controls.s4-in { opacity: 1; }
        .s4-controls button {
          background: transparent;
          border: 1px solid ${C.line};
          color: ${C.navy};
          font-size: 12.5px;
          letter-spacing: .04em;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all .15s;
          font-family: ${SANS};
          font-weight: 500;
        }
        .s4-controls button:hover  { background: rgba(20,50,87,.04); border-color: rgba(20,50,87,.28); }
        .s4-controls button:active { transform: scale(.97); }
        .s4-controls .val {
          font-variant-numeric: tabular-nums;
          min-width: 34px;
          text-align: center;
          color: ${C.gold};
          font-weight: 500;
          font-family: ${MONO};
          font-size: 12.5px;
        }
        .s4-controls label {
          font-family: ${SANS};
          font-size: 12px;
          color: ${C.body};
          letter-spacing: .04em;
        }
        .s4-controls input[type=range] {
          accent-color: ${C.gold};
          width: 120px;
        }
        @media (prefers-reduced-motion: reduce) {
          .s4-copy, .s4-controls {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 880px) {
          .s4-exhibit { padding: 56px 32px 64px; }
        }
        @media (max-width: 480px) {
          .s4-exhibit { padding: 40px 22px 48px; }
        }
      `}</style>

      <section ref={sectionRef} className="s4-section">
        <div className="s4-exhibit" ref={exhibitRef}>
          <div className="s4-copy" ref={copyRef}>
            <p className="s4-eyebrow">What that means</p>
            <h2 className="s4-h2">
              <span className="sans">Strong execution. Strong numbers.</span>
              <span className="serif">Regardless of conditions.</span>
            </h2>
            <p className="s4-lede">
              Market conditions don&rsquo;t stop changing. Your capacity to execute decides whether performance tanks or holds up under pressure.
            </p>
          </div>

          <div className="s4-ghost-wrap" ref={ghostWrapRef} aria-hidden="true">
            <div className="s4-ghost-core">
              <div className="s4-ghost-core-text">
                <span>EXECUTION</span>
                <span>CAPABILITY</span>
                <span>ROOTED IN</span>
                <span>DISCIPLINE</span>
              </div>
            </div>
          </div>

          <div className="s4-stage-wrap">
            <canvas
              ref={canvasRef}
              className="s4-canvas"
              aria-label="Animated exhibit: varied operational pressures are all absorbed by a steady execution-capacity core, which emits a calm, even stream of positive outcomes."
            />
          </div>

          <div className="s4-controls" ref={controlsRef}>
            <button ref={toggleRef} type="button">Pause</button>
            <label htmlFor="s4-load">Operating pressure</label>
            <input ref={loadRef} id="s4-load" type="range" min="1" max="10" defaultValue="6" />
            <span className="val" ref={loadValRef}>6</span>
            <button ref={burstRef} type="button">Surge</button>
          </div>
        </div>
      </section>
    </>
  );
}
