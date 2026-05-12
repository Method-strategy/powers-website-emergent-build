import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CaseStudyCard — parametric library card.
 *
 * Reads from the canonical case-study schema in /app/frontend/src/data/caseStudies.js.
 *
 *   - Internal case studies (with `internalRoute`) render as an SPA <Link>
 *     so React Router handles the navigation without a full reload.
 *   - External case studies (legacy thepowerscompany.com PDFs, via
 *     `externalUrl`) render as `<a target="_blank" rel="noopener…">`.
 *
 * The visible title is the canonical `headlineResult`, and the result
 * subhead is the canonical `resultSummary` (a short stats string). Both
 * fields are the same ones used in the detail-page hero — there is no
 * second source of truth. The search highlighter wraps query matches in
 * <mark class="card-mark"> regardless of internal/external.
 */

function highlight(text, q) {
  if (!q || !text) return text;
  // Case-insensitive substring highlight; the inline-script version did the same.
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  return text.split(re).map((part, i) =>
    re.test(part) ? (
      <mark key={i} className="card-mark">{part}</mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function CaseStudyCard({ data, query = '', animDelay = 0 }) {
  if (!data) return null;
  const {
    num, industry, headlineResult, resultSummary,
    serviceLines = [], challenges = [],
    date, internalRoute, externalUrl,
  } = data;

  const isInternal = !!internalRoute;
  const href = internalRoute || externalUrl || '#';

  const inner = (
    <article
      className="case-card"
      style={{ animationDelay: `${animDelay}s` }}
      data-testid={`case-card-${num}`}
    >
      <div className="card-header">
        <div className="card-industry">{industry}</div>
        <div className="card-num">#{String(num).padStart(2, '0')}</div>
      </div>
      <h2 className="card-title">{highlight(headlineResult, query)}</h2>
      <div className="card-result">{highlight(resultSummary, query)}</div>
      <div className="card-tags">
        {serviceLines.map((e, i) => (
          <span className="tag tag-engagement" key={`e${i}`}>{e}</span>
        ))}
        {challenges.slice(0, 2).map((c, i) => (
          <span className="tag tag-challenge" key={`c${i}`}>{c}</span>
        ))}
      </div>
      <div className="card-footer">
        <span className="card-date">{formatDate(date)}</span>
        <span className="card-link">
          Read Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </article>
  );

  // Make the entire card clickable so the existing hover/transform CSS still
  // works without changes. Internal -> <Link>, external -> new tab <a>.
  if (isInternal) {
    return (
      <Link to={href} className="case-card-link" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="case-card-link" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      {inner}
    </a>
  );
}
