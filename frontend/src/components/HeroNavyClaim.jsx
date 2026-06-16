/* ════════════════════════════════════════════════════════════════════
 *  HERO NAVY CLAIM  (Feb 2026 — V4 spine, Sean/Justin pivot)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Pure-typography hero on navy. Three beats:
 *    Strong execution.            (sans white)
 *    Strong performance.          (sans white)
 *    Regardless of conditions.    (italic gold)
 *
 *  A positioning statement, not a sales pitch — the hero declares
 *  where POWERS stands, the rows below say how. Earlier rev had a
 *  fourth gold-italic line ("That's what we build.") but it competed
 *  with Row 2's "We build the disciplines..." H2; dropping it gave
 *  the hero a confident three-beat cadence ending on the resolution
 *  clause, and moved the active "we build" verb to Row 2 where it
 *  triggers the disciplines diagram directly below.
 *
 *  No lede, no animation, no chart — the proof lives in Row 3.
 * ════════════════════════════════════════════════════════════════════ */

import React from 'react';

const SANS  = '"proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';
const SERIF = '"Newsreader","Source Serif 4","Tiempos Headline",Georgia,"Times New Roman",serif';

const C = {
  navyDeep: '#0f2a47',
  gold:     '#e89346',
  paper:    '#ffffff',
};

export default function HeroNavyClaim() {
  return (
    <>
      <style>{`
        .hnc-section {
          background: ${C.navyDeep};
          position: relative;
          /* Hero fills the visible viewport, regardless of device.
             Accounts for the sticky site header above (~85px) via
             100svh - header so the hero never overflows into a
             scrollbar nor leaves visible chrome below it. svh ("small
             viewport height") is the browser-UI-aware unit so mobile
             address-bar collapse doesn't shrink the hero mid-scroll.
             vh fallback first for older Safari. */
          min-height: calc(100vh - 85px);
          min-height: calc(100svh - 85px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hnc-inner {
          max-width: 1180px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 56px;
          text-align: center;
        }

        /* H1 — staggered line-by-line reveal. Each line starts hidden
           (opacity 0, 14px down) and fades up on its own timer. Hero
           sits at the top of the page, so the IntersectionObserver
           fires immediately on mount; the staggered animation-delays
           below produce a "claim is being made" cadence on first paint.
              Strong execution.       →   90ms
              Strong performance.     →  690ms
              Regardless of cond.     → 1290ms (gold italic — the
                                                resolution beat lands
                                                last and loudest) */
        .hnc-h1 {
          line-height: 1.0;
          letter-spacing: -.014em;
          margin: 0;
        }
        .hnc-h1 > span {
          opacity: 0;
          transform: translateY(14px);
          animation: hnc-line-in 1.1s cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hnc-h1 > span:nth-child(1) { animation-delay: 0.09s; }
        .hnc-h1 > span:nth-child(2) { animation-delay: 0.69s; }
        .hnc-h1 > span:nth-child(3) { animation-delay: 1.29s; }
        @keyframes hnc-line-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hnc-h1 > span {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
        .hnc-h1 .sans {
          display: block;
          font-family: ${SANS};
          font-weight: 800;
          font-size: clamp(38px, 5.2vw, 76px);
          color: ${C.paper};
        }
        .hnc-h1 .sans + .sans {
          margin-top: -0.04em;
        }
        .hnc-h1 .serif {
          display: block;
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 500;
          font-size: clamp(38px, 5.2vw, 76px);
          color: ${C.gold};
        }
        /* First serif line after the sans block — open the transition. */
        .hnc-h1 .sans + .serif {
          margin-top: 0.08em;
        }

        @media (max-width: 880px) {
          .hnc-inner { padding: 48px 32px; }
        }
        @media (max-width: 480px) {
          .hnc-inner { padding: 32px 22px; }
        }
      `}</style>

      <section className="hnc-section" data-testid="hero-navy-claim">
        <div className="hnc-inner">
          <h1 className="hnc-h1" data-testid="hero-h1">
            <span className="sans">Strong execution.</span>
            <span className="sans">Strong performance.</span>
            <span className="serif">Regardless of conditions.</span>
          </h1>
        </div>
      </section>
    </>
  );
}
