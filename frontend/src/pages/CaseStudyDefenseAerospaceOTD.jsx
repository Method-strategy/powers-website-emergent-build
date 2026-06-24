import React, { useEffect } from 'react';
import { getCaseStudy } from '../data/caseStudies';
import { caseStudyStyles } from '../components/caseStudy/caseStudyStyles';
import CaseStudyHero from '../components/caseStudy/CaseStudyHero';
import CaseStudyBody from '../components/caseStudy/CaseStudyBody';
import CaseStudyPrintDoc from '../components/caseStudy/CaseStudyPrintDoc';
import { TYPE, GOLD_BRIGHT, NAVY, PAPER, TEXT_BODY } from '../lib/briefTokens';

/* Minimal brief-alignment overlay for the case-study detail page.
   Per the client direction, the existing layout is mostly right —
   this page is the prototype template for all future case studies
   and the structure should not change much. The overlay below
   tunes only what was visually inconsistent with the rest of the
   brief: hero scale + typeface, italic accents pulled to the
   Newsreader serif, gold values normalized to the brand copper.
   Layout, sections, PDF download chrome, and component structure
   are untouched. */
const briefAlignmentOverlay = `
  .case-hero { background: ${PAPER} !important; }
  .case-hero,
  .case-hero * { color: ${NAVY}; }
  .case-hero .case-headline,
  .case-hero h1 {
    font-family: ${TYPE.sans} !important;
    font-size: clamp(36px, 4.4vw, 64px) !important;
    font-weight: 800 !important;
    line-height: 1.06 !important;
    letter-spacing: -0.012em !important;
    color: ${NAVY} !important;
  }
  .case-hero em,
  .case-hero i,
  .case-hero .case-headline em {
    font-family: ${TYPE.serif} !important;
    font-style: italic !important;
    font-weight: 500 !important;
    color: ${GOLD_BRIGHT} !important;
  }
  .case-hero .case-eyebrow,
  .case-hero .eyebrow {
    font-family: ${TYPE.mono} !important;
    font-size: 11px !important;
    letter-spacing: 0.28em !important;
    text-transform: uppercase !important;
    color: ${GOLD_BRIGHT} !important;
  }
  .case-section h2,
  .case-body h2 {
    font-family: ${TYPE.sans} !important;
    font-weight: 800 !important;
    color: ${NAVY} !important;
  }
  .case-section em,
  .case-body em {
    font-family: ${TYPE.serif} !important;
    font-style: italic;
    color: ${GOLD_BRIGHT};
  }
  .case-section,
  .case-body { font-family: ${TYPE.sans}; color: ${TEXT_BODY}; }
`;

/**
 * CaseStudyDefenseAerospaceOTD — case-study detail route at
 *   /case-studies/defense-aerospace-otd
 * Prototype layout for all future case studies. Three parametric
 * components rendered from the canonical caseStudies record;
 * structure preserved. Brief alignment via overlay only.
 */
export default function CaseStudyDefenseAerospaceOTD() {
  const data = getCaseStudy('defense-aerospace-otd');

  useEffect(() => {
    if (!data) return;
    document.title = `${data.headlineResult.slice(0, 80)} | POWERS Case Study`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', data.summary || '');
  }, [data]);

  if (!data) {
    return <div style={{ padding: 96, textAlign: 'center' }}>Case study not found.</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: caseStudyStyles }} />
      <style dangerouslySetInnerHTML={{ __html: briefAlignmentOverlay }} />
      <CaseStudyHero data={data} />
      <CaseStudyBody data={data} />
      <CaseStudyPrintDoc data={data} />
    </>
  );
}
