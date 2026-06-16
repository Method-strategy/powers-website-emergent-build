/* ════════════════════════════════════════════════════════════════════
 *  HERO NAVY CLAIM  (Feb 2026 — V4 spine, Sean/Justin pivot)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Pure-typography hero on navy. Two beats only:
 *    1. Four-line display H1 — the complete claim:
 *         Strong execution.            (sans white)
 *         Strong performance.          (sans white)
 *         Regardless of conditions.    (italic gold)
 *         That's what we build.        (italic gold)
 *
 *  Two sans-white lines (the universal claim), two italic-gold lines
 *  (the resolutions). The first gold line resolves the conditions
 *  problem; the second gold line resolves the question "by whom."
 *  Together they form a parallel-construction display — a complete
 *  pitch in 9 words.
 *
 *  No lede, no animation, no chart. The premise / diagnostic moved
 *  to Row 3 (which is now the pressure animation row); the resolution
 *  copy lives in Row 2's combined eyebrow / subhead / lede block.
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
        }
        .hnc-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 112px 56px 104px;
          text-align: center;
        }

        /* H1 — four-line display claim. Optical line balance: small
           negative margin-top tightens the sans→sans gap, small
           positive margin-top on the first serif opens the sans→serif
           transition (italic ascenders need more breathing room than
           sans). The serif→serif gap inherits a neutral line-height
           since both share the same typeface metrics. */
        .hnc-h1 {
          line-height: 1.0;
          letter-spacing: -.014em;
          margin: 0;
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
        /* Subsequent serif lines — gentle additional gap, since the
           two italic resolutions are separate beats, not a continuation. */
        .hnc-h1 .serif + .serif {
          margin-top: 0.04em;
        }

        @media (max-width: 880px) {
          .hnc-inner { padding: 88px 32px 80px; }
        }
        @media (max-width: 480px) {
          .hnc-inner { padding: 64px 22px 56px; }
        }
      `}</style>

      <section className="hnc-section" data-testid="hero-navy-claim">
        <div className="hnc-inner">
          <h1 className="hnc-h1" data-testid="hero-h1">
            <span className="sans">Strong execution.</span>
            <span className="sans">Strong performance.</span>
            <span className="serif">Regardless of conditions.</span>
            <span className="serif" data-testid="hero-signature">That&rsquo;s what we build.</span>
          </h1>
        </div>
      </section>
    </>
  );
}
