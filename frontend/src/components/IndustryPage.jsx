import React, { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import BriefDocStyles, { useInViewClass, NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE } from './BriefDocStyles';
import { getIndustry } from '../data/industries';

/* Generic <IndustryPage> — renders any /industries-served/:slug from
   the data file at /data/industries.js. Single source of truth, no
   per-industry boilerplate. Follows the brief grammar established
   by /approach + /discovery-process. */

function Section({ children, dark, style }) {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: dark ? NAVY : PAPER, ...style }}>
      <div className="brief-doc-inner">{children}</div>
    </section>
  );
}

export default function IndustryPage() {
  const { slug } = useParams();
  const data = getIndustry(slug);
  const heroRef = useRef(null); useInViewClass(heroRef);
  const ctaRef = useRef(null); useInViewClass(ctaRef);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [slug]);
  if (!data) return <Navigate to="/industries-served" replace />;

  const ctaH2 = data.ctaH2 || { top: "Let's build your operation to", pivot: 'execute under any circumstances.' };
  const ctaBody = data.ctaBody || "Tell us where the operation is feeling pressure. We'll come see it on the floor, find the gaps that are hiding inside it, and build the disciplines that close them.";

  return (
    <>
      <BriefDocStyles />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        {/* Hero */}
        <section ref={heroRef} className="brief-page-hero">
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 16 }}>
                <Link to="/industries-served" className="ip-back-link" data-testid={`industry-back-${slug}`}>
                  &larr; Return to Industries Served
                </Link>
              </div>
              <div className="station-index wipe" style={{ marginBottom: 24, opacity: 0.85 }}>{data.eyebrow} &middot; {data.name}</div>
              <h1 className="brief-doc-h1 wipe wipe-d1">
                <span>{data.hero.h1Top}</span>
                <span className="accent">{data.hero.h1Accent}</span>
              </h1>
              <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>{data.hero.lede}</p>
              <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 56 }} />
            </div>
          </div>
        </section>

        {/* The Pressures */}
        <Section>
          <div className="station-index wipe">The Pressures</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>{data.pressuresH2.top}</span>
            <span className="pivot">{data.pressuresH2.pivot}</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>{data.pressuresIntro}</p>
          <ol className="ip-list wipe wipe-d4">
            {data.pressures.map((p, i) => (
              <li key={i} className="ip-list-item">
                <strong>{p.h}</strong> {p.body}
              </li>
            ))}
          </ol>
        </Section>

        {/* How We Work — disciplines */}
        <Section style={{ background: '#f3f0e8' }}>
          <div className="station-index wipe">How We Work in {data.name}</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>{data.workH2.top}</span>
            <span className="pivot">{data.workH2.pivot}</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>{data.workIntro}</p>
          <ol className="ip-list wipe wipe-d4">
            {data.disciplines.map((d, i) => (
              <li key={i} className="ip-list-item">
                <strong>{d.h}</strong> {d.body}
              </li>
            ))}
          </ol>
        </Section>

        {/* The Outcomes */}
        <Section>
          <div className="station-index wipe">The Outcomes</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>The metrics that move</span>
            <span className="pivot">when we engage.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>{data.outcomesIntro}</p>
          <ul className="ip-bullets wipe wipe-d4">
            {data.outcomesList.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
          <p className="brief-doc-body wipe wipe-d4" style={{ marginTop: 24, fontStyle: 'italic' }}>{data.outcomesClose}</p>
        </Section>

        {/* Sub-segments */}
        <Section style={{ background: '#f3f0e8' }}>
          <div className="station-index wipe">The Sub-segments We Serve</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>We work across the</span>
            <span className="pivot">{data.name.toLowerCase()} spectrum.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>{data.subSegmentsIntro}</p>
          <ul className="ip-bullets wipe wipe-d4">
            {data.subSegments.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className="brief-doc-body wipe wipe-d4" style={{ marginTop: 24, fontStyle: 'italic' }}>{data.subSegmentsClose}</p>
        </Section>

        {/* Why POWERS — dark navy */}
        <Section dark>
          <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>Why POWERS for {data.name}</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
            <span>We work</span>
            <span className="pivot">where value gets won or lost.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3" style={{ color: 'rgba(255,255,255,0.82)', marginTop: 24 }}>
            {data.whyBody.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Section>

        {/* Final CTA */}
        <section className="brief-doc-station brief-doc-cta" ref={ctaRef} style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>When You&rsquo;re Ready</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 820, alignItems: 'center', color: '#ffffff' }}>
              <span>{ctaH2.top}</span>
              <span className="pivot">{ctaH2.pivot}</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 680, color: 'rgba(255,255,255,0.82)' }}>{ctaBody}</p>
            <div style={{ marginTop: 36, display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid={`industry-cta-contact-${slug}`}>Start a Conversation</Link>
              <Link to="/case-studies" className="brief-doc-cta-button ip-cta-ghost" data-testid={`industry-cta-cases-${slug}`}>See the Case Studies</Link>
            </div>
            <p style={{ marginTop: 18, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              Looking for proof? Search our case study library by industry, service type, or operational challenge.
            </p>
          </div>
        </section>
      </main>

      <style>{`
        .ip-back-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: ${TYPE.mono}; font-size: 11px;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: ${GOLD_BRIGHT}; text-decoration: none;
          border-bottom: 1px solid transparent; padding-bottom: 2px;
          transition: border-color 160ms ease;
        }
        .ip-back-link:hover { border-color: ${GOLD_BRIGHT}; }

        .ip-list {
          list-style: none; padding: 0; margin: 36px 0 0;
          display: flex; flex-direction: column; gap: 22px;
        }
        .ip-list-item {
          font-family: ${TYPE.sans}; font-size: 16px; line-height: 1.65;
          color: ${TEXT_BODY}; padding-left: 0;
        }
        .ip-list-item strong {
          color: ${NAVY}; font-weight: 700;
        }

        .ip-bullets {
          margin: 24px 0 0; padding-left: 22px;
          font-family: ${TYPE.sans}; font-size: 16px; line-height: 1.65;
          color: ${TEXT_BODY};
        }
        .ip-bullets li { margin-bottom: 8px; }

        .brief-doc-cta-button.ip-cta-ghost {
          background: transparent; color: #ffffff;
          border: 1px solid rgba(255,255,255,0.45);
        }
        .brief-doc-cta-button.ip-cta-ghost:hover {
          border-color: ${GOLD_BRIGHT}; color: ${GOLD_BRIGHT};
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
