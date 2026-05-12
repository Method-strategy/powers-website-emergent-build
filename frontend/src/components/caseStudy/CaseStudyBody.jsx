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

      <section className="cs-cta screen-only">
        <div className="cs-cta-inner">
          <h2>Ready to Make Performance Stick in Your Operation?</h2>
          <p>Every POWERS engagement starts with a two-week Discovery. We document the gap between executive intent and shop floor performance, then build the system to close it.</p>
          <div className="cs-cta-actions">
            <Link to="/contact" className="cs-cta-primary" data-testid="cs-cta-contact">Start a Conversation</Link>
            <button type="button" className="cs-cta-secondary" onClick={() => window.print()} data-testid="cs-cta-download-pdf">
              Download This Case Study
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
