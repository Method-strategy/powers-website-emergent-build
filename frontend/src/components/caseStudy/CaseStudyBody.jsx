import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CaseStudyBody — screen-only body for a case-study detail page.
 *
 * Renders the four lower sections (Situation, Diagnosis, What POWERS Did,
 * Full Result) plus the bottom CTA, from the same canonical data object as
 * the hero and print-doc. Markup mirrors the locked legacy `.cs-section` /
 * `.cs-cta` classes so existing styles + print-suppression rules apply
 * unchanged.
 *
 * Note on capitalization: the headline H2s display in title case per the
 * locked screen template, while the equivalent print-doc H2s display in
 * sentence case. We let CSS handle visual transforms; we pass the data
 * value through verbatim. (Today both screen and print pull from the same
 * `title` field; if the design later diverges, add `titleScreen` + `titlePrint`
 * to the schema.)
 */
export default function CaseStudyBody({ data }) {
  if (!data) return null;
  const { situation, diagnosis, powersActions, fullResult } = data;

  return (
    <>
      {situation ? (
        <section className="cs-section screen-only" data-row="situation">
          <div className="cs-section-inner">
            <div className="cs-eyebrow-dark">The Situation</div>
            <h2 className="cs-h2">{situation.title}</h2>
            <div className="cs-body">
              {(situation.body || []).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>
      ) : null}

      {diagnosis ? (
        <section className="cs-section alt screen-only" data-row="diagnosis">
          <div className="cs-section-inner">
            <div className="cs-eyebrow-dark">The Diagnosis</div>
            <h2 className="cs-h2">{diagnosis.title}</h2>
            <div className="cs-diag-grid">
              {(diagnosis.items || []).map((it, i) => (
                <div className="cs-diag" key={i}>
                  <div className="cs-diag-title">{it.title}</div>
                  <p className="cs-diag-body">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {powersActions ? (
        <section className="cs-section screen-only" data-row="powers">
          <div className="cs-section-inner">
            <div className="cs-eyebrow-dark">What POWERS Did</div>
            <h2 className="cs-h2">{powersActions.title}</h2>
            <div className="cs-body">
              {(powersActions.body || []).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>
      ) : null}

      {fullResult ? (
        <section className="cs-section alt screen-only" data-row="results">
          <div className="cs-section-inner">
            <div className="cs-eyebrow-dark">The Full Result</div>
            <h2 className="cs-h2">{fullResult.title}</h2>
            <div className="cs-results-grid">
              {(fullResult.stats || []).map((s, i) => (
                <div className="cs-result" key={i}>
                  <i className={`ti ti-${s.icon} cs-result-icon`} aria-hidden="true"></i>
                  <div className="cs-result-num">{s.value}</div>
                  <div className="cs-result-label">{s.label}</div>
                  <p className="cs-result-body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Bottom CTA — uses the canonical brief grammar (.brief-doc-h2
          with sans clause + .pivot gold-italic-serif clause stacked
          vertically, .brief-doc-cta-button for the primary action,
          .brief-doc-inner for the column width). The legacy .cs-cta
          chassis stays only for the navy contrast band; everything
          inside the chassis reads in the same grammar as every other
          brief page CTA. The screen-only class keeps it suppressed
          in print. */}
      <section className="cs-cta screen-only" style={{ background: 'var(--navy)' }}>
        <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
          <h2
            className="brief-doc-h2 cs-cta-h2"
            style={{ margin: '0 auto', maxWidth: 880, alignItems: 'center', color: '#ffffff' }}
            data-testid="cs-cta-h2"
          >
            <span>Ready to build</span>
            <span className="pivot">disciplined execution in your operation?</span>
          </h2>
          <p
            className="brief-doc-lede cs-cta-lede"
            style={{
              margin: '24px auto 0',
              maxWidth: 640,
              color: 'rgba(255, 255, 255, 0.82)',
            }}
          >
            Every POWERS engagement starts with our intensive{' '}
            <Link to="/discovery-process" className="cs-cta-link" data-testid="cs-cta-discovery-link">Discovery Process</Link>.
            We work with everyone on your team, identify the gaps in the five disciplines that hold execution back,
            and build the partnership that closes them. The results stay built long after we&rsquo;re gone.
          </p>
          <div className="cs-cta-actions" style={{ marginTop: 40, display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/contact" className="brief-doc-cta-button" data-testid="cs-cta-contact">
              Start a Conversation
            </Link>
            <button
              type="button"
              className="brief-doc-cta-button cs-cta-ghost"
              onClick={() => window.print()}
              data-testid="cs-cta-download-pdf"
            >
              Download This Case Study
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
