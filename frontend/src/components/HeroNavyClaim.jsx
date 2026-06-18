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

import React, { useRef } from 'react';
import { useScrollBuild } from '../lib/useScrollBuild';

const SANS  = '"proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';
const SERIF = '"Newsreader","Source Serif 4","Tiempos Headline",Georgia,"Times New Roman",serif';

const C = {
  navyDeep: '#0f2a47',
  gold:     '#e89346',
  paper:    '#ffffff',
};

export default function HeroNavyClaim() {
  const sectionRef = useRef(null);
  /* Hero sits at scrollY=0, so at mount the section's progress through
     the viewport is ~0.5 — well inside scroll-build's "fully built"
     zone, which would snap the H1 in with zero motion. We skip the
     initial update() call and let the CSS entry animation below do
     the one-time staggered lay-in. The first scroll event hands
     control back to scroll-build for the lift-out. */
  useScrollBuild(sectionRef, { skipInitialUpdate: true });
  return (
    <>
      <style>{`
        .hnc-section {
          background: ${C.navyDeep};
          position: relative;
          overflow: hidden;
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
        /* Background video — same source as the mid-page "How We Work"
           row but used full-bleed here. Sits at z-index 0, the navy
           overlay at z-index 1 (very heavy at 88% opacity so the video
           reads as a textured atmosphere rather than a featured clip),
           and the H1 above at z-index 2. */
        .hnc-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }
        .hnc-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              180deg,
              rgba(15, 42, 71, 0.92) 0%,
              rgba(15, 42, 71, 0.88) 50%,
              rgba(15, 42, 71, 0.92) 100%
            );
          pointer-events: none;
        }
        .hnc-inner {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 56px;
          text-align: center;
        }

        /* H1 — each line is bound to the section's scroll progress
           via the useScrollBuild hook. Lines rise from below as the
           hero enters the viewport and lift up out the top as the
           reader scrolls past. The looping keyframes that lived here
           previously were retired Feb 2026 — scroll-driven build
           covers the same "claim is being made" cadence, more
           coherently with the rest of the page. */
        .hnc-h1 {
          line-height: 1.0;
          letter-spacing: -.014em;
          margin: 0;
        }
        .hnc-h1 > span {
          /* Initial state — scroll-build hook will overwrite each
             frame once the user starts scrolling. Before that, the
             one-time CSS entry animation below lays each line in
             with a staggered fade + rise. */
          opacity: 0;
          transform: translateY(14px);
          will-change: opacity, transform;
          animation: hnc-rise 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hnc-h1 > span:nth-child(1) { animation-delay: 120ms; }
        .hnc-h1 > span:nth-child(2) { animation-delay: 340ms; }
        .hnc-h1 > span:nth-child(3) { animation-delay: 620ms; }
        @keyframes hnc-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hnc-h1 > span {
            animation: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hnc-h1 .sans {
          display: block;
          font-family: ${SANS};
          font-weight: 800;
          /* Hero scale (Feb 2026 rev). Up significantly from
             clamp(38, 5.2vw, 76) so the H1 has actual hero
             presence. Row 2 H2 and Row 3 subhead inherit this
             same clamp to read at consistent display level. */
          font-size: clamp(54px, 7vw, 108px);
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
          font-size: clamp(54px, 7vw, 108px);
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

      <section ref={sectionRef} className="hnc-section" data-testid="hero-navy-claim">
        {/* Background atmosphere — looped video of POWERS consultants
            on the manufacturing floor, served from /uploads so it's
            same-origin (no CORS issues). Behind a heavy navy overlay
            (~88%) so the video reads as texture, not as a featured
            clip. A separate /uploads/powers-banner-2026-v2.mp4 (the
            cropped version) is used downstream in How We Work. */}
        <video
          className="hnc-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          src="/uploads/powers-banner-2026-hero.mp4"
        />
        <div className="hnc-overlay" aria-hidden="true" />

        <div className="hnc-inner">
          <h1 className="hnc-h1" data-testid="hero-h1">
            <span className="sans" data-build>Strong execution.</span>
            <span className="sans" data-build>Strong performance.</span>
            <span className="serif" data-build>Regardless of conditions.</span>
          </h1>
        </div>
      </section>
    </>
  );
}
