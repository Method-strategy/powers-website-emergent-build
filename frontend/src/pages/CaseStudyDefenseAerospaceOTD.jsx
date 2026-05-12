import React, { useEffect } from 'react';
import { getCaseStudy } from '../data/caseStudies';
import { caseStudyStyles } from '../components/caseStudy/caseStudyStyles';
import CaseStudyHero from '../components/caseStudy/CaseStudyHero';
import CaseStudyBody from '../components/caseStudy/CaseStudyBody';
import CaseStudyPrintDoc from '../components/caseStudy/CaseStudyPrintDoc';

/**
 * CaseStudyDefenseAerospaceOTD — case-study detail route at
 *   /case-studies/defense-aerospace-otd
 *
 * Now a thin shell that reads the canonical record from caseStudies.js
 * and renders three parametric components:
 *
 *   <CaseStudyHero />     — screen-only locked dense hero
 *   <CaseStudyBody />     — screen-only situation/diagnosis/powers/results + CTA
 *   <CaseStudyPrintDoc /> — print-only 2-page PDF document
 *
 * The single legacy stylesheet (caseStudyStyles.js) drives both screen and
 * print presentation, including the @media print rules that toggle
 * .screen-only / .print-doc visibility.
 *
 * Adding the next case study is: add an entry to caseStudies.js and add a
 * route in App.js that points at this same shell (or a per-slug shell that
 * passes the slug to getCaseStudy).
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
      <CaseStudyHero data={data} />
      <CaseStudyBody data={data} />
      <CaseStudyPrintDoc data={data} />
    </>
  );
}
