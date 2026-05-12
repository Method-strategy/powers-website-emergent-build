import React from 'react';

/**
 * CaseStudyHero — parametric "dense" hero for a case-study detail page.
 *
 * Reads its content entirely from `data` (matching the WPGraphQL/ACF shape
 * documented in `/app/frontend/src/data/caseStudies.js`).
 *
 * Markup intentionally mirrors the locked DOM exactly so the existing CSS in
 * `caseStudyStyles.js` (including the @media print rules) applies unchanged.
 * Stat tile icons map to Tabler webfont keys (e.g. `target-arrow` →
 * `ti ti-target-arrow`). The eyebrow separator pipe and the descriptor text
 * style are locked per the design contract in CLAUDE.md.
 */
export default function CaseStudyHero({ data }) {
  if (!data) return null;
  const { industry, headlineResult, subtitle, summary, serviceLines = [], statTiles = [] } = data;

  const disciplinesLine = serviceLines.join(' \u00B7 ');

  return (
    <section className="cs-hero-dense screen-only" data-hero="dense">
      <div className="cs-hero-dense-inner">

        {/* ── LEFT COLUMN ── */}
        <div className="cs-hd-left">
          <div className="cs-hd-tags">
            <span className="cs-hd-tag-cs">Case Study</span>
            <span className="cs-hd-tag-bar">|</span>
            <span className="cs-hd-tag-industry">{industry}</span>
          </div>

          <h1 className="cs-hd-h1">{headlineResult}</h1>
          {subtitle ? <div className="cs-hd-descriptor">{subtitle}</div> : null}

          <div className="cs-hd-results-eyebrow">Results at a Glance</div>

          <div className="cs-hd-stats">
            {statTiles.map((s, i) => (
              <div className="cs-hd-stat" key={i}>
                <i className={`ti ti-${s.icon} cs-hd-stat-icon`} aria-hidden="true"></i>
                <div>
                  <div className="cs-hd-stat-num">{s.value}</div>
                  <div
                    className="cs-hd-stat-label"
                    dangerouslySetInnerHTML={{ __html: (s.label || '').replace(/\n/g, '<br/>') }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="cs-hd-right">
          <div className="cs-hd-brief">
            <div className="cs-hd-brief-label">Executive Brief</div>
            <p className="cs-hd-brief-body">{summary}</p>
            <div className="cs-hd-meta">{disciplinesLine}</div>
          </div>

          <button
            type="button"
            className="cs-hd-pdf"
            onClick={() => window.print()}
            aria-label="Download this case study as PDF"
            data-testid="hero-download-pdf-btn"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1v9M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Download PDF
          </button>
        </div>

      </div>
    </section>
  );
}
