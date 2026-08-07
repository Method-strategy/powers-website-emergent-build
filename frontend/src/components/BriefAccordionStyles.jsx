import React from 'react';
import { GOLD_BRIGHT, TEXT_BODY, TYPE } from './BriefDocStyles';

/* BriefAccordionStyles — shared CSS for the editorial accordion pattern
   used on Approach.jsx and DiscoveryProcess.jsx.

   Both pages render a native <details>/<summary> accordion with:
     - gold hairline dividers between rows
     - gold mono +/× toggle marker (no chevron)
     - numbered eyebrow + serifed italic title
     - zero JavaScript

   Page-specific token styles (.approach-mech-*, .deliv-*) stay in
   their respective page files; only the structural and interaction
   rules live here. */

export default function BriefAccordionStyles() {
  return (
    <style>{`
      /* ── Structural / interaction ────────────────────────────── */
      .brief-accordion { border-top: 1px solid rgba(232,147,70,0.30); }
      .brief-accordion > summary {
        list-style: none;
        cursor: pointer;
        display: grid;
        grid-template-columns: 78px 1fr auto;
        gap: 24px;
        align-items: baseline;
        padding: 26px 4px 26px 0;
        outline: none;
        user-select: none;
      }
      .brief-accordion > summary::-webkit-details-marker,
      .brief-accordion > summary::marker { display: none; }
      .brief-accordion > summary:focus-visible {
        outline: 2px solid ${GOLD_BRIGHT};
        outline-offset: 4px;
        border-radius: 2px;
      }

      /* ── Sub-elements ────────────────────────────────────────── */
      .brief-accordion-title { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
      .brief-accordion-teaser {
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 300;
        line-height: 1.4;
        color: ${TEXT_BODY};
        font-style: italic;
      }
      .brief-accordion-toggle {
        font-family: ${TYPE.mono};
        font-size: 22px;
        font-weight: 400;
        color: ${GOLD_BRIGHT};
        line-height: 1;
        transition: transform 240ms cubic-bezier(.2,.7,.2,1);
        padding-top: 4px;
      }
      details[open] > summary .brief-accordion-toggle { transform: rotate(45deg); }

      /* ── Panel (open content) ────────────────────────────────── */
      .brief-accordion-panel {
        padding: 0 4px 30px 102px;
        animation: accordion-fade 300ms cubic-bezier(.2,.7,.2,1);
      }
      @keyframes accordion-fade {
        from { opacity: 0; transform: translateY(-4px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* ── Mobile ──────────────────────────────────────────────── */
      @media (max-width: 720px) {
        .brief-accordion > summary {
          grid-template-columns: 56px 1fr auto;
          gap: 16px;
          padding: 22px 0;
        }
        .brief-accordion-panel {
          padding-left: 72px;
          padding-right: 0;
          padding-bottom: 24px;
        }
      }

      /* ── Reduced motion ──────────────────────────────────────── */
      @media (prefers-reduced-motion: reduce) {
        .brief-accordion-toggle { transition: none; }
        .brief-accordion-panel { animation: none; }
      }
    `}</style>
  );
}
