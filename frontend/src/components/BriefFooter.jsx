import React from 'react';
import { Link } from 'react-router-dom';
import { GOLD_BRIGHT, TYPE } from '../lib/briefTokens';

/**
 * BriefFooter — reusable footer for every page using the "Operating
 * Brief" design language.
 *
 * Lifted verbatim from HomeV5's SiteFooter so the visual treatment
 * (navy strip, 4-column grid: brand / Results / About / Let's Talk,
 * gold legal-bar rule, italic tagline) stays consistent across the
 * homepage and every interior page that adopts the brief.
 *
 * In-app routes use React Router <Link>; tel/mailto/external stay
 * as <a>.
 */
export default function BriefFooter() {
  return (
    <footer className="brief-footer" style={{ background: '#0f2a47', fontFamily: TYPE.sans, borderTop: '1px solid #e89346' }}>
      <style>{`
        .brief-footer-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 72px 48px 64px;
          display: grid;
          gap: 56px 32px;
          grid-template-columns: minmax(300px, 1.6fr) repeat(4, minmax(140px, 1fr));
          box-sizing: border-box;
        }
        @media (max-width: 1099px) {
          .brief-footer-grid {
            grid-template-columns: minmax(280px, 1.4fr) repeat(2, minmax(140px, 1fr));
            gap: 48px 32px;
          }
        }
        @media (max-width: 720px) {
          .brief-footer-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
        }
        @media (max-width: 480px) {
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
          <Link className="brief-foot-link" to="/industries-served">Industries Served</Link>
          <Link className="brief-foot-link" to="/case-studies">Case Studies</Link>
        </div>

        {/* "What We Build" mirrors the main-nav dropdown: the parent
            label is a category (not a route), the children are the 5
            discipline pages. Keeping the parent as a non-link <div>
            here is intentional — it's honest about the structure and
            avoids the 404 the old /operational-readiness link
            was producing. */}
        <div>
          <div className="brief-foot-head" aria-hidden="false">What We Build</div>
          <Link className="brief-foot-link" to="/operational-discipline">Operational Discipline</Link>
          <Link className="brief-foot-link" to="/frontline-leadership">Frontline Leadership</Link>
          <Link className="brief-foot-link" to="/equipment-reliability">Equipment Reliability</Link>
          <Link className="brief-foot-link" to="/workforce-capability">Workforce Capability</Link>
          <Link className="brief-foot-link" to="/daily-accountability">Daily Accountability</Link>
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
