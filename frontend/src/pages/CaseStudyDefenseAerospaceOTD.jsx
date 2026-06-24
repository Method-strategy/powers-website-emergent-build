import React, { useEffect } from 'react';
import { getCaseStudy } from '../data/caseStudies';
import { caseStudyStyles } from '../components/caseStudy/caseStudyStyles';
import CaseStudyHero from '../components/caseStudy/CaseStudyHero';
import CaseStudyBody from '../components/caseStudy/CaseStudyBody';
import CaseStudyPrintDoc from '../components/caseStudy/CaseStudyPrintDoc';
import { TYPE, GOLD_BRIGHT, NAVY, PAPER, TEXT_BODY } from '../lib/briefTokens';

/* Brief-alignment overlay for the case-study detail page.
   Targets the ACTUAL screen-only hero (.cs-hero-dense) and body
   section (.cs-section) selectors emitted by CaseStudyHero /
   CaseStudyBody — the earlier overlay pointed at .case-hero /
   .case-section which never matched. The shell layout stays
   intact (dark-navy hero, white text on navy, 3-col stat grid,
   right-rail exec brief + DOWNLOAD PDF button, section stack);
   what this overlay normalizes is:
     • Gold accents → brand copper (#e89346 via --gold remap)
     • Navy → brief NAVY (#0d2442 via --navy remap)
     • Hero H1 / section H2 → brief typographic scale + italic
       serif gold pivot on emphasis spans
     • Section eyebrows → mono+gold per brief grammar
   All token swaps come from briefTokens.js; ${TYPE.sans|serif|mono}
   refs ensure the font stacks match the rest of the site exactly. */
const briefAlignmentOverlay = `
  /* Hero — keep dark navy shell, normalize typography + tokens */
  .cs-hero-dense {
    background: ${NAVY} !important;
  }
  .cs-hero-dense .cs-hd-h1 {
    font-family: ${TYPE.sans} !important;
    font-size: clamp(40px, 4.6vw, 64px) !important;
    font-weight: 800 !important;
    line-height: 1.06 !important;
    letter-spacing: -0.014em !important;
    color: #ffffff !important;
  }
  .cs-hero-dense .cs-hd-h1 em,
  .cs-hero-dense .cs-hd-h1 i {
    font-family: ${TYPE.serif} !important;
    font-style: italic !important;
    font-weight: 500 !important;
    color: ${GOLD_BRIGHT} !important;
  }
  .cs-hero-dense .cs-hd-descriptor {
    font-family: ${TYPE.serif} !important;
    font-style: italic !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    letter-spacing: 0 !important;
    color: ${GOLD_BRIGHT} !important;
    margin-top: 22px !important;
  }
  .cs-hero-dense .cs-hd-tags,
  .cs-hero-dense .cs-hd-results-eyebrow,
  .cs-hero-dense .cs-hd-brief-label,
  .cs-hero-dense .cs-hd-meta {
    font-family: ${TYPE.mono} !important;
    letter-spacing: 0.28em !important;
    font-size: 11px !important;
  }
  .cs-hero-dense .cs-hd-tag-cs,
  .cs-hero-dense .cs-hd-tag-bar,
  .cs-hero-dense .cs-hd-tag-industry,
  .cs-hero-dense .cs-hd-results-eyebrow,
  .cs-hero-dense .cs-hd-brief-label,
  .cs-hero-dense .cs-hd-meta {
    color: ${GOLD_BRIGHT} !important;
  }
  .cs-hero-dense .cs-hd-tag-industry { color: #ffffff !important; }
  .cs-hero-dense .cs-hd-stat-icon { color: ${GOLD_BRIGHT} !important; }
  .cs-hero-dense .cs-hd-brief { border-left-color: ${GOLD_BRIGHT} !important; }
  .cs-hero-dense .cs-hd-pdf {
    background: ${GOLD_BRIGHT} !important;
    color: ${NAVY} !important;
  }

  /* Body sections — sans clause + italic-serif-gold pivot on H2,
     mono eyebrows, brief body text color (NAVY @ 72%). */
  .cs-section,
  .cs-section * { font-family: ${TYPE.sans}; }
  .cs-section { color: ${TEXT_BODY}; background: ${PAPER}; }
  .cs-section h2,
  .cs-section .cs-h2,
  .cs-section .cs-section-h2,
  .cs-body h2 {
    font-family: ${TYPE.sans} !important;
    font-size: clamp(30px, 3.4vw, 48px) !important;
    font-weight: 800 !important;
    line-height: 1.06 !important;
    letter-spacing: -0.014em !important;
    color: ${NAVY} !important;
  }
  .cs-section h2 em,
  .cs-section h2 i,
  .cs-section .cs-h2 em,
  .cs-section .cs-section-h2 em,
  .cs-body h2 em {
    font-family: ${TYPE.serif} !important;
    font-style: italic !important;
    font-weight: 500 !important;
    color: ${GOLD_BRIGHT} !important;
  }
  .cs-section .cs-eyebrow-dark,
  .cs-section .cs-section-eyebrow,
  .cs-section .eyebrow,
  .cs-body .eyebrow {
    font-family: ${TYPE.mono} !important;
    font-size: 11px !important;
    letter-spacing: 0.28em !important;
    text-transform: uppercase !important;
    color: ${GOLD_BRIGHT} !important;
  }
  .cs-section p,
  .cs-section li,
  .cs-body p,
  .cs-body li {
    color: ${TEXT_BODY};
    font-size: 17px;
    line-height: 1.7;
  }
  .cs-section em,
  .cs-body em {
    font-family: ${TYPE.serif};
    font-style: italic;
    color: ${GOLD_BRIGHT};
    font-weight: 500;
  }

  /* CTA card / footer band on the detail page — keep navy chassis,
     swap gold to brief value (handled by --gold remap, but force it
     here too in case any inline rule overrides). */
  .cs-cta-secondary,
  .cs-cta-primary {
    font-family: ${TYPE.sans} !important;
    letter-spacing: 0.04em !important;
  }
  .cs-cta-primary { background: ${GOLD_BRIGHT} !important; color: ${NAVY} !important; }
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
