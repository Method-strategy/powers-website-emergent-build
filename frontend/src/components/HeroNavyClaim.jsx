/* ════════════════════════════════════════════════════════════════════
 *  HERO NAVY CLAIM  (Feb 2026 — V4 spine, Sean/Justin pivot)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Pure-typography hero on navy.
 *
 *  Three beats, each on its own line of vertical real estate:
 *    1. H1 — "Strong execution. Strong performance. Regardless of
 *       conditions." (sans white + italic gold pivot on the resolution
 *       clause)
 *    2. Lede — "Market pressures don't stop. Strong quarters and weak
 *       ones are readouts of the same thing — the fundamentals at the
 *       root of your operation."
 *    3. Signature — "That's what we build." (small serif italic in
 *       white, the visual gesture lifted from the legacy hero's "We
 *       build your capacity to execute" closing line — same size and
 *       style, color flipped from gold to white because gold was
 *       punctuating a confrontation; white here punctuates a settled
 *       claim.)
 *
 *  Together these three beats form a complete miniature pitch —
 *  claim, premise, promise — so a reader who never scrolls past the
 *  first viewport still gets POWERS' whole argument. The proof and
 *  the disciplines diagram live in the rows below.
 *
 *  No animation, no chart, no chip exhibit — those were promoted to
 *  Row 2 by direction. The hero stays cinematic but lighter.
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
          padding: 96px 56px 88px;
          text-align: center;
        }

        /* H1 — same sans+serif-italic pairing as the legacy hero,
           sized down because this is a three-sentence claim, not two
           display words. Optical line balance: a small negative
           margin-top tightens the sans→sans gap, and a small positive
           margin-top on the serif opens the sans→serif gap so the
           italic's taller ascenders don't crowd the sans line above. */
        .hnc-h1 {
          line-height: 1.0;
          letter-spacing: -.014em;
          margin: 0 0 28px;
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
          margin-top: 0.08em;
        }

        .hnc-lede {
          font-family: ${SANS};
          font-size: clamp(16px, 1.25vw, 19px);
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.72);
          max-width: 760px;
          margin: 0 auto 40px;
          text-wrap: pretty;
        }

        /* Signature — small serif italic in white. The size matches
           the legacy hero's "We build your capacity to execute"
           closing line (clamp 20→23px) so the editorial gesture is
           preserved; the color flips from gold to white to mark the
           tonal shift from provocation to settled claim. */
        .hnc-signature {
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 500;
          font-size: clamp(20px, 1.6vw, 23px);
          color: ${C.paper};
          letter-spacing: 0;
          margin: 0;
        }

        @media (max-width: 880px) {
          .hnc-inner { padding: 72px 32px 64px; }
        }
        @media (max-width: 480px) {
          .hnc-inner { padding: 56px 22px 48px; }
        }
      `}</style>

      <section className="hnc-section" data-testid="hero-navy-claim">
        <div className="hnc-inner">
          <h1 className="hnc-h1" data-testid="hero-h1">
            <span className="sans">Strong execution.</span>
            <span className="sans">Strong performance.</span>
            <span className="serif">Regardless of conditions.</span>
          </h1>
          <p className="hnc-lede">
            Market pressures don&rsquo;t stop. Strong quarters and weak ones are readouts of the same thing&nbsp;&mdash;&nbsp;the fundamentals at the root of your operation.
          </p>
          <p className="hnc-signature" data-testid="hero-signature">
            That&rsquo;s what we build.
          </p>
        </div>
      </section>
    </>
  );
}
