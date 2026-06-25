import React, { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import BriefHeader from './BriefHeader';
import BriefFooter from './BriefFooter';
import BriefDocStyles, { useInViewClass, NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE } from './BriefDocStyles';
import { getLeader } from '../data/leaders';

/* Generic <LeaderBio> — renders any /leadership/:slug from the data
   file at /data/leaders.js. Single source of truth for all six
   leader pages. Follows the "Operating Brief" grammar established
   by /approach + /industries-served:

   ┌── BriefHeader (interior mode)
   ├── Hero band ─ photo (left) + eyebrow / name H1 / bio paragraphs (right)
   ├── Featured Insights (optional, renders only when leader has any)
   ├── Back link ─ "Return to Leadership"
   ├── Canonical CTA (navy band) ─ eyebrow / two-line H2 with italic-gold
   │   pivot / lede / primary button + tel·email subline
   └── BriefFooter
*/

export default function LeaderBio() {
  const { slug } = useParams();
  const data = getLeader(slug);
  const heroRef = useRef(null); useInViewClass(heroRef);
  const insightsRef = useRef(null); useInViewClass(insightsRef);
  const ctaRef = useRef(null); useInViewClass(ctaRef);
  useEffect(() => {
    if (data) document.title = `${data.name} — ${data.title} | POWERS`;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug, data]);
  if (!data) return <Navigate to="/leadership" replace />;

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>

        {/* HERO — photo (left) + bio (right) on the brief paper */}
        <section ref={heroRef} className="brief-page-hero leader-bio-hero">
          <div className="brief-doc-inner">
            <div className="leader-bio-grid">
              <div className="leader-bio-photo wipe wipe-d1" data-testid={`leader-photo-${slug}`}>
                <img src={data.photo} alt={data.name} loading="eager" decoding="async" />
              </div>
              <div className="leader-bio-col">
                <div className="station-index wipe" style={{ marginBottom: 18 }}>{data.title}</div>
                <h1 className="brief-doc-h1 wipe wipe-d1" style={{ marginBottom: 28 }}>
                  <span>{data.name}.</span>
                </h1>
                <div className="brief-doc-rule-gold wipe wipe-d2" />
                <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 28 }}>
                  {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED INSIGHTS — only if the leader has any */}
        {data.insights && data.insights.length > 0 && (
          <section ref={insightsRef} className="brief-doc-station" style={{ background: '#f3f0e8' }}>
            <div className="brief-doc-inner">
              <div className="station-index wipe">Featured Insights</div>
              <h2 className="brief-doc-h2 wipe wipe-d1">
                <span>What {data.name.split(' ')[0]} has written</span>
                <span className="pivot">about operations under pressure.</span>
              </h2>
              <div className="brief-doc-rule-gold wipe wipe-d2" />
              <ul className="leader-bio-insights wipe wipe-d3">
                {data.insights.map((ins, i) => (
                  <li key={i} className="leader-bio-insight">
                    <a
                      href={ins.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-testid={`leader-insight-${slug}-${i}`}
                    >
                      <div className="ins-date">{ins.date}</div>
                      <div className="ins-title">{ins.title}</div>
                      <span className="ins-arrow" aria-hidden="true">&rarr;</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* BACK LINK */}
        <section className="brief-doc-station leader-bio-back" style={{ background: PAPER, padding: '40px 0' }}>
          <div className="brief-doc-inner">
            <Link to="/leadership" className="brief-inline-link" data-testid={`leader-back-${slug}`}>
              &larr; Return to Leadership
            </Link>
          </div>
        </section>

        {/* CANONICAL CTA — matches /industries-served hub grammar */}
        <section className="brief-doc-station brief-doc-cta" ref={ctaRef} style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>Working With the Team</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 920, alignItems: 'center', color: '#ffffff' }}>
              <span>The leadership team works the engagement,</span>
              <span className="pivot">not just the contract.</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
              POWERS engagements are led by senior practitioners. The names you see here are the people you will work with, on the floor, during Discovery and Implementation. If you want to meet the team before scoping a Discovery, the conversation starts with a call.
            </p>
            <div style={{ marginTop: 36 }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid={`leader-cta-contact-${slug}`}>
                Start the conversation <span className="brief-doc-cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 22, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)' }}>
              Or reach us directly at{' '}
              <a href="tel:+16789714711" className="brief-inline-link brief-inline-link--on-dark" data-testid={`leader-cta-phone-${slug}`}>+1 678-971-4711</a>
              {' · '}
              <a href="mailto:info@thepowerscompany.com" className="brief-inline-link brief-inline-link--on-dark" data-testid={`leader-cta-email-${slug}`}>info@thepowerscompany.com</a>
            </p>
          </div>
        </section>
      </main>
      <BriefFooter />

      {/* Scoped layout — only the photo + bio grid and the insights
          rows. Everything else (typography, CTA buttons, inline
          links, rules) is inherited from BriefDocStyles. */}
      <style>{`
        .leader-bio-hero { padding-top: calc(var(--header-h, 112px) + clamp(40px, 6vh, 80px)); }
        .leader-bio-grid {
          display: grid;
          grid-template-columns: 32fr 68fr;
          gap: 64px;
          align-items: start;
        }
        .leader-bio-photo {
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #efece3;
          border: 1px solid rgba(13, 36, 66, 0.08);
          box-shadow: 0 1px 0 rgba(13, 36, 66, 0.04), 0 18px 40px -28px rgba(13, 36, 66, 0.35);
        }
        .leader-bio-photo img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          filter: saturate(0.96);
        }
        .leader-bio-col { min-width: 0; }
        .leader-bio-insights {
          margin-top: 32px;
          list-style: none;
          padding: 0;
          border-top: 1px solid rgba(13, 36, 66, 0.12);
        }
        .leader-bio-insight a {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 22px 0;
          border-bottom: 1px solid rgba(13, 36, 66, 0.12);
          text-decoration: none;
          color: ${NAVY};
          transition: border-color 180ms ease, padding-left 220ms ease;
        }
        .leader-bio-insight a:hover {
          border-bottom-color: ${GOLD_BRIGHT};
          padding-left: 6px;
        }
        .leader-bio-insight .ins-date {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 6px;
          grid-column: 1;
        }
        .leader-bio-insight .ins-title {
          font-size: 19px;
          font-weight: 500;
          line-height: 1.35;
          color: ${NAVY};
          grid-column: 1;
        }
        .leader-bio-insight .ins-arrow {
          grid-column: 2;
          grid-row: 1 / span 2;
          font-size: 22px;
          color: ${TEXT_BODY};
          transition: color 160ms ease, transform 220ms ease;
        }
        .leader-bio-insight a:hover .ins-arrow {
          color: ${GOLD_BRIGHT};
          transform: translateX(4px);
        }
        @media (max-width: 899px) {
          .leader-bio-grid { grid-template-columns: 1fr; gap: 40px; }
          .leader-bio-photo { max-width: 380px; }
        }
        @media (max-width: 639px) {
          .leader-bio-insight a { grid-template-columns: 1fr; gap: 6px; }
          .leader-bio-insight .ins-arrow { display: none; }
        }
      `}</style>
    </div>
  );
}
