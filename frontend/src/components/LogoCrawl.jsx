/* ════════════════════════════════════════════════════════════════════
 *  LogoCrawl — reusable horizontal client-logo marquee
 * ════════════════════════════════════════════════════════════════════
 *
 *  Lifted verbatim from Home.jsx (Beat VI — Where We Work) so the
 *  Case Studies hero can render the SAME row from the SAME data,
 *  same sequence, same size, same animation timing, same hover
 *  treatment. The only behavioral difference from the homepage
 *  embed is that the eyebrow label is configurable via prop — the
 *  homepage uses "Shoulder to shoulder with"; the Case Studies hero
 *  uses "Trusted By".
 *
 *  Why a self-contained component:
 *   • Home.jsx originally inlined all marquee CSS inside its page
 *     <style> tag. Importing the data was easy; reusing the markup
 *     and CSS was not.
 *   • The crawl now lives once, here. Both consumers (Home.jsx and
 *     CaseStudies.jsx) render <LogoCrawl /> and get identical visuals.
 *   • Scoped <style> uses the same selector names the original
 *     Home.jsx page styles use — when this component renders inside
 *     Home, both stylesheets agree (same values), so no override
 *     conflicts. When it renders on Case Studies (where the page
 *     <style> block has no marquee rules), this component's own
 *     <style> supplies them.
 *
 *  Treatment recap (kept identical to the original implementation):
 *   - 18 logos, twin rows tracking left at the same speed for a
 *     seamless infinite loop (when row A hits -100%, row B is at 0%).
 *   - Each <img> rendered at 56px tall, max-width 220px, mounted in
 *     a 130px-min-width slot so square logos don't create whitespace
 *     islands between wider neighbors.
 *   - grayscale(1) + contrast(1.2) + opacity 0.55 + mix-blend-mode
 *     multiply knocks the brand-color carnival down to one cohesive
 *     dark set on the cream PAPER surface. Hover restores color.
 *   - 80px PAPER-gradient fades on each edge so the crawl doesn't
 *     "pop" at the viewport boundaries.
 *   - 72s linear marquee, paused on hover, paused entirely under
 *     prefers-reduced-motion. */

import React from 'react';
import { CLIENT_LOGOS, logoSrc } from '../data/clientLogos';
import { GOLD_BRIGHT, TYPE } from '../lib/briefTokens';

export default function LogoCrawl({
  eyebrow = 'Trusted By',
  /* Optional extra style on the outer wrapper so consumers can pass
   * gridColumn spans (homepage uses gridColumn: '1 / -1' to break
   * out of the two-col Station layout). */
  style,
}) {
  return (
    <div className="industries-logos-row" style={style} data-testid="logo-crawl-wrapper">
      <style>{`
        .industries-logos-row {
          margin-top: clamp(40px, 6vh, 80px);
          min-width: 0;
        }
        .industries-logos-row .industries-logos-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 22px;
        }
        .industries-logos-row .logo-crawl {
          position: relative;
          overflow: hidden;
          padding: 4px 0;
          min-width: 0;
          /* Edge soft-fade via mask (not a colored overlay).
             Earlier draft layered two PAPER-colored gradient divs
             on top of the marquee — that approach assumes the
             surface behind the crawl is exactly PAPER (#fbfaf6).
             Worked on the homepage (where Beat VI sits on solid
             cream). Broke on the Case Studies hero, which renders
             a ghosted shop-floor photograph + cream wash beneath
             the hero — the PAPER overlay no longer matched the
             composited surface, so the fade boxes were visible as
             two pale rectangles flanking the marquee. Mask-image
             fades the LOGOS to alpha 0 at each edge instead, so
             whatever's behind the crawl shows through cleanly with
             no color matching required. Works on any host surface,
             including the photo. */
          -webkit-mask-image: linear-gradient(to right,
            transparent 0,
            #000 80px,
            #000 calc(100% - 80px),
            transparent 100%);
                  mask-image: linear-gradient(to right,
            transparent 0,
            #000 80px,
            #000 calc(100% - 80px),
            transparent 100%);
        }
        .industries-logos-row .logo-crawl-track {
          display: flex;
          width: max-content;
        }
        .industries-logos-row .logo-crawl-row {
          display: flex;
          flex-shrink: 0;
          gap: clamp(36px, 4vw, 60px);
          padding-right: clamp(36px, 4vw, 60px);
          animation: logo-crawl-marquee 72s linear infinite;
          will-change: transform;
        }
        .industries-logos-row .logo-crawl:hover .logo-crawl-row {
          animation-play-state: paused;
        }
        @keyframes logo-crawl-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        .industries-logos-row .logo-crawl-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 72px;
          min-width: 130px;
          flex-shrink: 0;
        }
        .industries-logos-row .logo-crawl-item img {
          height: 56px;
          max-width: 220px;
          width: auto;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: grayscale(1) contrast(1.2);
          opacity: 0.55;
          transition: opacity 220ms ease, filter 220ms ease, transform 220ms ease, mix-blend-mode 220ms ease;
          background: transparent;
        }
        .industries-logos-row .logo-crawl-item:hover img {
          mix-blend-mode: normal;
          filter: grayscale(0) contrast(1);
          opacity: 1;
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .industries-logos-row .logo-crawl-row { animation: none; }
        }
      `}</style>
      {eyebrow ? (
        <div className="industries-logos-label">{eyebrow}</div>
      ) : null}
      <div className="logo-crawl" data-testid="logo-crawl">
        <div className="logo-crawl-track">
          <div className="logo-crawl-row">
            {CLIENT_LOGOS.map((l, i) => (
              <span key={i} className="logo-crawl-item" title={l.name}>
                <img src={logoSrc(l)} alt={l.name} loading="lazy" />
              </span>
            ))}
          </div>
          {/* Duplicate set for seamless infinite loop — when the
              first set finishes at translateX(-100%), the duplicate
              lands at translateX(0), so the cycle has no visible seam. */}
          <div className="logo-crawl-row" aria-hidden="true">
            {CLIENT_LOGOS.map((l, i) => (
              <span key={'b' + i} className="logo-crawl-item">
                <img src={logoSrc(l)} alt="" loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
