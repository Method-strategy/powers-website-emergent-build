import React, { useRef } from 'react';
import BriefHeader from './BriefHeader';
import BriefFooter from './BriefFooter';
import SEO from './SEO';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from './BriefDocStyles';

/**
 * KbPageShell — shared chrome for the 3 Knowledge Base landing
 * pages (Mastery Series, Downloadables, Manufacturing KPIs).
 *
 * Renders the BriefHeader, the editorial hero (eyebrow + H1 +
 * lede), the gold rule, and the BriefFooter. The page body is
 * passed as children so each KB page can render its own content
 * shape (series rows / downloadable cards / KPI tables).
 */
export default function KbPageShell({
  eyebrow,
  titleTop,
  titlePivot,
  lede,
  seoTitle,
  seoDescription,
  path,
  children,
}) {
  const heroRef = useRef(null); useInViewClass(heroRef);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <SEO title={seoTitle} description={seoDescription} path={path} />
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <section ref={heroRef} className="brief-page-hero">
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>{eyebrow}</div>
              <h1 className="brief-doc-h1 wipe wipe-d1">
                <span>{titleTop}</span>
                <span className="accent">{titlePivot}</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 48, marginBottom: 36 }} />
              <p className="brief-doc-lede wipe wipe-d4">{lede}</p>
            </div>
          </div>
        </section>
        {children}
      </main>
      <BriefFooter />
      <style>{`
        .kb-cta-card-link { color: ${GOLD_BRIGHT}; text-decoration: none; }
        .kb-cta-card-link:hover { color: ${NAVY}; }
        .kb-meta-mono {
          font-family: ${TYPE.mono}; font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase; color: ${TEXT_BODY};
        }
      `}</style>
    </div>
  );
}
