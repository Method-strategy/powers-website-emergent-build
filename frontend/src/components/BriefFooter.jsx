import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GOLD_BRIGHT, TYPE } from '../lib/briefTokens';

/**
 * BriefFooter — single shared site footer.
 *
 * Used by every page (Home, brief-language pages, layout-group pages).
 * Single source of truth for the navy footer band, link columns, and
 * legal bar.
 *
 * "What We Build" sits inside the Results column as a non-link
 * category header (mirrors the main-nav dropdown). On click it
 * expands an inline accordion of the five discipline pages —
 * no extra footer column, no extra depth.
 */
export default function BriefFooter() {
  const [buildOpen, setBuildOpen] = useState(false);

  return (
    <footer className="brief-footer" style={{ background: '#0f2a47', fontFamily: TYPE.sans, borderTop: '1px solid #e89346' }}>
      <style>{`
        /* Defensive resets — BriefFooter is used inside Home.jsx,
           which has page-scoped CSS that uppercases + center-aligns
           anchors / paragraphs across its hero/beat sections. Lock the
           footer's typographic treatment so no host page can bleed
           into it. */
        .brief-footer,
        .brief-footer * {
          text-transform: none;
          text-align: left;
          letter-spacing: normal;
        }
        .brief-footer .brief-foot-head {
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .brief-footer-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 72px 48px 64px;
          display: grid;
          gap: 56px 32px;
          grid-template-columns: minmax(340px, 1.7fr) repeat(3, minmax(140px, 1fr));
          box-sizing: border-box;
        }
        @media (max-width: 980px) {
          .brief-footer-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 48px 32px;
          }
        }
        @media (max-width: 560px) {
          .brief-footer-grid { grid-template-columns: 1fr; }
        }

        .brief-foot-link {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.70);
          text-decoration: none;
          padding: 4px 0;
          display: block;
          transition: color 140ms ease;
        }
        .brief-foot-link:hover { color: ${GOLD_BRIGHT}; }
        .brief-foot-head {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        /* ── Accordion toggle for "What We Build" ──────────────
           Styled to read as a sibling to the regular footer links
           (same font, color, padding). The only ornament is a
           small chevron that rotates 180° on open. */
        .brief-foot-accordion-btn {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.70);
          background: transparent;
          border: 0;
          padding: 4px 0;
          margin: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          cursor: pointer;
          transition: color 140ms ease;
        }
        .brief-foot-accordion-btn:hover { color: ${GOLD_BRIGHT}; }
        .brief-foot-accordion-btn:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 2px;
        }
        .brief-foot-accordion-chev {
          display: inline-block;
          font-size: 10px;
          line-height: 1;
          opacity: 0.85;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1);
        }
        .brief-foot-accordion-btn[aria-expanded="true"] .brief-foot-accordion-chev {
          transform: rotate(180deg);
        }
        /* Expanding panel — uses grid-template-rows trick so the
           open/close transition is smooth without measuring heights. */
        .brief-foot-accordion-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 260ms cubic-bezier(.2,.6,.2,1);
        }
        .brief-foot-accordion-panel.is-open { grid-template-rows: 1fr; }
        .brief-foot-accordion-inner {
          overflow: hidden;
          min-height: 0;
        }
        .brief-foot-accordion-link {
          font-family: ${TYPE.sans};
          font-size: 12.5px;
          font-weight: 300;
          color: rgba(255,255,255,0.58);
          text-decoration: none;
          padding: 4px 0 4px 14px;
          display: block;
          position: relative;
          transition: color 140ms ease;
        }
        .brief-foot-accordion-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.95em;
          width: 6px;
          height: 1px;
          background: ${GOLD_BRIGHT};
          opacity: 0.55;
        }
        .brief-foot-accordion-link:hover { color: ${GOLD_BRIGHT}; }
        @media (prefers-reduced-motion: reduce) {
          .brief-foot-accordion-panel,
          .brief-foot-accordion-chev { transition: none !important; }
        }
      `}</style>

      <div className="brief-footer-grid">
        <div style={{ maxWidth: 380 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img
              src="/uploads/powers-logo-dark.png"
              alt="POWERS"
              style={{ width: 140, height: 'auto', display: 'block', marginBottom: 16 }}
            />
          </Link>
          <div style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.10em',
            color: GOLD_BRIGHT, marginBottom: 14,
          }}>
            <span style={{ whiteSpace: 'nowrap' }}>Stronger Execution.</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>Stronger Performance.</span>
          </div>
          <p style={{
            fontSize: 13, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.60)', margin: 0,
            textWrap: 'pretty',
          }}>
            Operations performance consulting that builds execution capability across teams, shifts, sites, and holdings.
          </p>
        </div>

        <div>
          <div className="brief-foot-head">Results</div>
          <Link className="brief-foot-link" to="/approach">Approach</Link>
          <Link className="brief-foot-link" to="/discovery-process">Discovery Process</Link>

          {/* "What We Build" — accordion toggle. Parent label is not
              a link (no /operational-readiness route exists); clicking
              it expands the 5 discipline destinations inline. Mirrors
              the main-nav dropdown without adding a fifth column. */}
          <button
            type="button"
            className="brief-foot-accordion-btn"
            aria-expanded={buildOpen}
            aria-controls="brief-foot-build-panel"
            onClick={() => setBuildOpen(o => !o)}
            data-testid="brief-foot-build-toggle"
          >
            <span>What We Build</span>
            <span className="brief-foot-accordion-chev" aria-hidden="true">&#9662;</span>
          </button>
          <div
            id="brief-foot-build-panel"
            className={`brief-foot-accordion-panel ${buildOpen ? 'is-open' : ''}`}
            data-testid="brief-foot-build-panel"
          >
            <div className="brief-foot-accordion-inner">
              <Link className="brief-foot-accordion-link" to="/operational-discipline">Operational Discipline</Link>
              <Link className="brief-foot-accordion-link" to="/frontline-leadership">Frontline Leadership</Link>
              <Link className="brief-foot-accordion-link" to="/equipment-reliability">Equipment Reliability</Link>
              <Link className="brief-foot-accordion-link" to="/workforce-capability">Workforce Capability</Link>
              <Link className="brief-foot-accordion-link" to="/daily-accountability">Daily Accountability</Link>
            </div>
          </div>

          <Link className="brief-foot-link" to="/industries-served">Industries Served</Link>
          <Link className="brief-foot-link" to="/case-studies">Case Studies</Link>
        </div>

        <div>
          <div className="brief-foot-head">About</div>
          <Link className="brief-foot-link" to="/history">History</Link>
          <Link className="brief-foot-link" to="/leadership">Leadership</Link>
          <Link className="brief-foot-link" to="/insights">Insights</Link>
          <Link className="brief-foot-link" to="/company-news">Company News</Link>
          <Link className="brief-foot-link" to="/careers">Careers</Link>
        </div>

        <div>
          <div className="brief-foot-head">Let&rsquo;s Talk</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <a className="brief-foot-link" href="tel:+16789714711">+1 678-971-4711</a>
            <a className="brief-foot-link" href="mailto:info@thepowerscompany.com">info@thepowerscompany.com</a>
            <div style={{
              fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)',
              padding: '4px 0', lineHeight: 1.5,
            }}>
              1801 Peachtree St NE, Suite 200<br />Atlanta, GA 30309
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px 40px' }}>
        <div style={{ height: 1, background: 'rgba(232,147,70,0.20)', marginBottom: 20 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 12px' }}>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)' }}>
            Copyright 2026 The POWERS Company, Inc. All Rights Reserved.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <Link className="brief-foot-link" to="/sitemap" style={{ fontSize: 11, padding: 0 }}>Sitemap</Link>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <Link className="brief-foot-link" to="/privacy" style={{ fontSize: 11, padding: 0 }}>Privacy Policy</Link>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)' }}>
            Powered by <a className="brief-foot-link" href="https://methodmarketing.com" style={{ fontSize: 11, padding: 0, display: 'inline' }}>Method Marketing</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
