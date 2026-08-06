import React, { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import BriefDocStyles, { useInViewClass, NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE } from './BriefDocStyles';
import SEO from './SEO';
import { getIndustry } from '../data/industries';

/* Generic <IndustryPage> — renders any /industries-served/:slug from
   the data file at /data/industries.js. Lean 4-section structure per
   the 2026 copy rewrite: Hero, Pressures, What We Build, Why POWERS, CTA. */

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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);
  if (!data) return <Navigate to="/industries-served" replace />;

  return (
    <>
      <SEO
        title={data.seoTitle || `${data.name} Consulting | POWERS`}
        description={data.metaDescription || data.heroLede || `POWERS operations consulting for ${data.name}.`}
        path={`/industries-served/${slug}`}
      />
      <BriefDocStyles />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section ref={heroRef} className="brief-page-hero">
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 16 }}>
                <Link to="/industries-served" className="ip-back-link" data-testid={`industry-back-${slug}`}>
                  &larr; Return to Industries Served
                </Link>
              </div>
              <div className="station-index wipe" style={{ marginBottom: 24, opacity: 0.85 }}>
                {data.eyebrow} &middot; {data.name}
              </div>
              <h1 className="brief-doc-h1 wipe wipe-d1" style={{ fontStyle: 'normal' }}>
                {data.name}
              </h1>
              <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 780 }}>
                {data.heroLede}
              </p>
              <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 56 }} />
            </div>
          </div>
        </section>

        {/* ── The Pressures ───────────────────────────────────── */}
        <Section>
          <div className="station-index wipe">The Pressures</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>{data.pressures.h2top}</span>
            <span className="pivot">{data.pressures.h2pivot}</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>{data.pressures.body}</p>
        </Section>

        {/* ── What We Build ────────────────────────────────────── */}
        <Section style={{ background: '#f3f0e8' }}>
          <div className="station-index wipe">The Work</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>{data.whatWeBuild.h2top}</span>
            <span className="pivot">{data.whatWeBuild.h2pivot}</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>{data.whatWeBuild.body}</p>
        </Section>

        {/* ── Why POWERS ─ dark navy ───────────────────────────── */}
        <Section dark>
          <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>
            Why POWERS for {data.name}
          </div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
            <span>We work when and where value gets</span>
            <span className="pivot">won or lost.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ color: 'rgba(255,255,255,0.82)', marginTop: 24 }}>
            {data.whyBody}
          </p>
        </Section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section className="brief-doc-station brief-doc-cta" ref={ctaRef} style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>
              When You&rsquo;re Ready
            </div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 820, alignItems: 'center', color: '#ffffff' }}>
              <span>{data.ctaH2top}</span>
              <span className="pivot">{data.ctaH2pivot}</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 660, color: 'rgba(255,255,255,0.82)' }}>
              {data.ctaBody}
            </p>
            <div style={{ marginTop: 36, display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid={`industry-cta-contact-${slug}`}>
                Start a Conversation
              </Link>
              <Link to="/case-studies" className="brief-doc-cta-button ip-cta-ghost" data-testid={`industry-cta-cases-${slug}`}>
                See the Case Studies
              </Link>
            </div>
            <p style={{ marginTop: 18, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              {data.ctaCaseStudiesLabel} &rarr;
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
