import React from 'react';

/**
 * CaseStudyPrintDoc — parametric 2-page print document (hidden on screen,
 * shown when the user invokes `window.print()` or the Download PDF button).
 *
 * Markup mirrors the locked legacy `.print-doc` exactly so the existing
 * @media print rules + page-break logic in `caseStudyStyles.js` apply
 * without modification. The whole content tree is sourced from `data`.
 */
function PrintFooter({ page, total = 2 }) {
  return (
    <div className="pp-foot">
      <div className="pp-foot-inner">
        <span className="pp-foot-brand">POWERS</span>
        <span className="pp-foot-sep">|</span>
        <span>+1 678-971-4711</span>
        <span className="pp-foot-sep">|</span>
        <span>info@thepowerscompany.com</span>
        <span className="pp-foot-sep">|</span>
        <span>1801 Peachtree St NE, Suite 200, Atlanta, GA 30309</span>
        <span className="pp-foot-page">{page} / {total}</span>
      </div>
    </div>
  );
}

export default function CaseStudyPrintDoc({ data }) {
  if (!data) return null;
  const {
    industry,
    headlineResult,
    summary,
    serviceLines = [],
    statTiles = [],
    situation,
    diagnosis,
    powersActions,
    fullResult,
  } = data;

  const disciplinesLine = serviceLines.join(' \u00A0\u00B7\u00A0 ');

  return (
    <div className="print-doc" id="print-doc">

      {/* ── PAGE 1 ── */}
      <div className="print-page">
        <div className="pp-mast">
          <div className="pp-mast-top">
            <div className="pp-mast-meta">
              <span className="pp-tag">Case Study</span>
              <span className="pp-bar">|</span>
              <span className="pp-industry">{industry}</span>
            </div>
            <div className="pp-mast-logo">
              <img src="/uploads/powers-logo-refined-for-dark-backgrounds-2026.png" alt="POWERS" />
            </div>
          </div>
          <h1 className="pp-h1">{headlineResult}</h1>
        </div>

        <div className="pp-content">
          <div className="pp-disciplines">{disciplinesLine}</div>

          <div className="pp-brief">
            <div className="pp-brief-label">Executive Brief</div>
            <p className="pp-brief-body">{summary}</p>
          </div>

          <div className="pp-section-eyebrow pp-section-eyebrow--ruled" style={{ marginTop: 22 }}>
            Results at a Glance
          </div>

          <div className="pp-stats">
            {statTiles.map((s, i) => (
              <div className="pp-stat" key={i}>
                <i className={`ti ti-${s.icon} pp-stat-icon`} aria-hidden="true"></i>
                <div>
                  <div className="pp-stat-num">{s.value}</div>
                  <div
                    className="pp-stat-label"
                    dangerouslySetInnerHTML={{ __html: (s.label || '').replace(/\n/g, '<br/>') }}
                  />
                </div>
              </div>
            ))}
          </div>

          {situation ? (
            <div className="pp-section">
              <div className="pp-section-eyebrow pp-section-eyebrow--ruled">The Situation</div>
              <h2 className="pp-section-h2">{situation.title}</h2>
              {(situation.body || []).map((p, i) => (
                <p className="pp-section-p" key={i}>{p}</p>
              ))}
            </div>
          ) : null}
        </div>

        <PrintFooter page={1} />
      </div>

      {/* ── PAGE 2 ── */}
      <div className="print-page">
        <div className="pp-cont-mast">
          <div className="pp-cont-meta">
            <span className="pp-cont-tag">Case Study</span>
            <span className="pp-cont-bar">|</span>
            <span className="pp-cont-industry">{industry}</span>
          </div>
          <div className="pp-cont-label">Continued · Page 2 / 2</div>
        </div>

        <div className="pp-content">
          {diagnosis ? (
            <div className="pp-section">
              <div className="pp-section-eyebrow pp-section-eyebrow--ruled">The Diagnosis</div>
              <h2 className="pp-section-h2">{diagnosis.title}</h2>
              <div className="pp-diag-grid">
                {(diagnosis.items || []).map((it, i) => (
                  <div key={i}>
                    <div className="pp-diag-title">{it.title}</div>
                    <p className="pp-diag-body">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {powersActions ? (
            <div className="pp-section">
              <div className="pp-section-eyebrow pp-section-eyebrow--ruled">What POWERS Did</div>
              <h2 className="pp-section-h2">{powersActions.title}</h2>
              {(powersActions.body || []).map((p, i) => (
                <p className="pp-section-p" key={i}>{p}</p>
              ))}
            </div>
          ) : null}

          {fullResult ? (
            <div className="pp-section">
              <div className="pp-section-eyebrow pp-section-eyebrow--ruled">The Full Result</div>
              <div className="pp-results">
                {(fullResult.stats || []).map((s, i) => (
                  <div className="pp-result" key={i}>
                    <div className="pp-result-num">{s.value}</div>
                    <div>
                      <div className="pp-result-label">{s.label}</div>
                      <p className="pp-result-body">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <PrintFooter page={2} />
      </div>
    </div>
  );
}
