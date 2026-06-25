import React, { useEffect, useRef } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, { useInViewClass, NAVY, PAPER, TYPE } from '../components/BriefDocStyles';

/* Operational Discipline — refactored onto the canonical "Operating
   Brief" shell. Title-only for now; the hero is structured to
   accept a ghosted + grit background image (drop the compressed
   JPG at /uploads/operational-discipline-hero-bg.jpg and uncomment
   the <img> + <div className="brief-page-hero-wash"> block). Body
   sections will land as copy is delivered. */

export default function OperationalDiscipline() {
  useEffect(() => { document.title = 'Operational Discipline — Eliminate Variation | POWERS'; }, []);
  const heroRef = useRef(null); useInViewClass(heroRef);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <section ref={heroRef} className="brief-page-hero">
          {/* Hero background image slot — uncomment when the
              compressed ghosted + grit hero is ready.
          <img
            className="brief-page-hero-bg"
            src="/uploads/operational-discipline-hero-bg.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            data-testid="operational-discipline-hero-bg"
          />
          <div className="brief-page-hero-wash" aria-hidden="true" /> */}
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>What We Build</div>
              <h1 className="brief-doc-h1 wipe wipe-d1">
                <span>Operational Discipline.</span>
              </h1>
              <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 64 }} />
            </div>
          </div>
        </section>
      </main>
      <BriefFooter />
    </div>
  );
}
