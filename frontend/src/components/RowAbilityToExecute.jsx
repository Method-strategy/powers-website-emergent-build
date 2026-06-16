/* ════════════════════════════════════════════════════════════════════
 *  ROW — ABILITY TO EXECUTE  (Feb 2026 — V4 spine row 3)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Single-line display row. The hero plants "That's what we build."
 *  as a quiet signature; the pressure animation in Row 2 proves it;
 *  this row delivers the resolution as a full-page display moment.
 *
 *  Copy: "The ability to execute. No matter what."
 *  Treatment: same H1 typography family as the hero — sans navy +
 *  italic gold pivot — but on a white background. The italic-gold
 *  carries the page's gold thread through the resolution moment so
 *  the reader's eye registers continuity with the hero claim above.
 * ════════════════════════════════════════════════════════════════════ */

import React from 'react';

const SANS  = '"proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';
const SERIF = '"Newsreader","Source Serif 4","Tiempos Headline",Georgia,"Times New Roman",serif';

const C = {
  navy:  '#143257',
  gold:  '#e89346',
  paper: '#ffffff',
};

export default function RowAbilityToExecute() {
  return (
    <>
      <style>{`
        .rae-section {
          background: ${C.paper};
        }
        .rae-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 120px 56px 120px;
          text-align: center;
        }
        .rae-display {
          line-height: 1.0;
          letter-spacing: -.014em;
          margin: 0;
        }
        .rae-display .sans {
          display: block;
          font-family: ${SANS};
          font-weight: 800;
          font-size: clamp(38px, 5.2vw, 76px);
          color: ${C.navy};
        }
        .rae-display .serif {
          display: block;
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 500;
          font-size: clamp(38px, 5.2vw, 76px);
          color: ${C.gold};
          margin-top: 0.08em;
        }

        @media (max-width: 880px) {
          .rae-inner { padding: 88px 32px 88px; }
        }
        @media (max-width: 480px) {
          .rae-inner { padding: 64px 22px 64px; }
        }
      `}</style>

      <section className="rae-section" data-testid="row-ability-to-execute">
        <div className="rae-inner">
          <h2 className="rae-display">
            <span className="sans">The ability to execute.</span>
            <span className="serif">No matter what.</span>
          </h2>
        </div>
      </section>
    </>
  );
}
