import React, { useEffect, useRef } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, { useInViewClass, NAVY, PAPER, TYPE } from '../components/BriefDocStyles';

/* Daily Accountability — refactored onto the canonical "Operating
   Brief" shell. See OperationalDiscipline.jsx for the hero-image
   convention; drop the compressed JPG at
   /uploads/daily-accountability-hero-bg.jpg and uncomment the
   <img> + <div className="brief-page-hero-wash"> block when ready. */

export default function DailyAccountability() {
  useEffect(() => { document.title = 'Daily Accountability | POWERS Manufacturing Consulting'; }, []);
  const heroRef = useRef(null); useInViewClass(heroRef);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <section ref={heroRef} className="brief-page-hero">
          {/* Hero background image slot — uncomment when ready.
          <img
            className="brief-page-hero-bg"
            src="/uploads/daily-accountability-hero-bg.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            data-testid="daily-accountability-hero-bg"
          />
          <div className="brief-page-hero-wash" aria-hidden="true" /> */}
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>What We Build</div>
              <h1 className="brief-doc-h1 wipe wipe-d1">
                <span>Daily Accountability.</span>
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
