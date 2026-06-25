import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT, TYPE,
} from '../components/BriefDocStyles';

/* History — POWERS' origin story, rebuilt in the brief language.
   All shared styles live in BriefDocStyles. This file only carries
   page-unique content + the principles-grid choreography. */

const FOUNDING_PRINCIPLES = [
  'We earn the right to return to a client every week by delivering on our commitments.',
  'Clients first, company second, self third.',
  'Frontline leadership is the most critical and most underinvested role in manufacturing.',
  'Behavioral change is a skill and an art that must be handled with discipline.',
  'We deliver on schedule, always.',
];

export default function History() {
  useEffect(() => { document.title = 'Our History — 25 Years Building Operations Discipline | POWERS'; }, []);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <PrinciplesStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <HeroBeat />
        <SectionWhereItStarted />
        <SectionHowWeEvolved />
        <SectionNewChapter />
        <SectionTheConstants />
        <SectionCTA />
      </main>
      <BriefFooter />
    </div>
  );
}

function HeroBeat() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-page-hero">
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ marginBottom: 24 }}>Our Story</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>Built from the shop floor up.</span>
            <span className="accent">Since 2004.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
            POWERS wasn&rsquo;t founded by academics or career consultants. It was founded by executives who had run manufacturing operations, managed P&amp;Ls, and understood firsthand where performance breaks down and why it stays broken.
          </p>
          <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 64 }} />
        </div>
      </div>
    </section>
  );
}

function SectionWhereItStarted() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">Where It Started</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Gainesville, Georgia.</span>
            <span className="pivot">2004.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Randall Powers founded POWERS in Gainesville, Georgia, with a team of C-level executives who shared a common conviction. That what separates the operations that perform from the ones that don&rsquo;t isn&rsquo;t a strategy problem. It&rsquo;s a systems, leadership, and discipline problem. And it can be solved, permanently, by working inside the operation rather than advising from outside it.</p>
            <p>That founding conviction has never changed. Every engagement we take on today is built on the same principle that drove the first one in 2004. <em>Get on the floor. Work with the people. Build what holds up.</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHowWeEvolved() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER_DEEP }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">How We Evolved</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Decades of shop floor insight built something</span>
            <span className="pivot">no competitor has.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Across more than twenty years of engagements in food and beverage, aerospace and defense, automotive, pharmaceuticals, metals and mining, medical devices, and private equity portfolio operations, we developed something that can only come from that kind of accumulated experience. A proprietary methodology that integrates management operating systems, frontline leadership development, and real-time operational visibility into a single coherent approach.</p>
            <p>That approach isn&rsquo;t a framework borrowed from Lean or Six Sigma. It&rsquo;s the direct result of watching what breaks, understanding why it breaks, and building the systems that prevent it from breaking again. The Management Operating System we install isn&rsquo;t a product. It&rsquo;s an outcome built from the inside, tailored to how each specific organization operates.</p>
            <p>
              <a
                href="https://www.powersdps.com"
                target="_blank"
                rel="noopener noreferrer"
                className="brief-inline-link"
                data-testid="history-link-dps"
              >DPS</a>
              , our{' '}
              <a
                href="https://www.powersdps.com"
                target="_blank"
                rel="noopener noreferrer"
                className="brief-inline-link"
                data-testid="history-link-dps-full"
              >Digital Production System</a>
              , came from the same place. Not from a software team working from a distance, but from practitioners on the floor who saw the same gap repeated across hundreds of engagements. Organizations had data, but the data wasn&rsquo;t driving decisions at the speed and level required to maintain execution consistency. DPS closes that gap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionNewChapter() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-split">
          <div>
            <div className="station-index wipe">A New Chapter</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Atlanta.</span>
              <span className="pivot">2021.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <div className="brief-doc-body wipe wipe-d3">
              <p>In 2021, we relocated corporate headquarters from Gainesville to Atlanta, establishing our offices at 1801 Peachtree Street NE. The move reflected what had been true for years. POWERS had grown into a firm operating at national and global scale, serving manufacturing leaders across industries and geographies, and the home base needed to reflect that ambition.</p>
              <p>The work still happens on the floor. <em>That has never changed.</em> But Atlanta positions us to attract the caliber of talent the firm&rsquo;s next chapter requires and keeps the firm connected to the broader business and investment community it increasingly serves.</p>
            </div>
          </div>
          <div className="brief-doc-placeholder wipe wipe-d3" aria-hidden="true">
            <span className="brief-doc-placeholder-label">
              Atlanta skyline / 1801 Peachtree St NE<br />
              <em>placeholder</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTheConstants() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: NAVY }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">The Constants</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
            <span>More than two decades in.</span>
            <span className="pivot">The founding principles still run the firm.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3" style={{ color: 'rgba(255,255,255,0.78)' }}>
            <p>The industries have expanded. The methodology has deepened. The team has grown. But the operating principles Randall Powers built the firm on in 2004 are the same ones that govern every engagement today.</p>
          </div>
        </div>
        <div className="principles-row">
          <div className="principles-rule" aria-hidden="true" />
          <ol className="principles-list">
            {FOUNDING_PRINCIPLES.map((p, i) => (
              <li key={i} className="principle-card" style={{ ['--i']: i }}>
                <span className="principle-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="principle-text">&ldquo;{p}&rdquo;</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SectionCTA() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station brief-doc-cta" style={{ background: PAPER }}>
      <div className="brief-doc-inner" style={{ textAlign: 'center', paddingTop: 96, paddingBottom: 96 }}>
        <div className="station-index wipe" style={{ margin: '0 auto 18px' }}>See the Results</div>
        <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 760, alignItems: 'center' }}>
          <span>See what more than two decades of this approach</span>
          <span className="pivot">produces.</span>
        </h2>
        <div style={{ marginTop: 36 }} className="wipe wipe-d2">
          <Link to="/case-studies" className="brief-doc-cta-button" data-testid="history-final-cta">
            Read the Case Studies &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Page-specific styles — the 5-card founding-principles grid uses
   the homepage Thesis beat's "rule strikes then cards drop" pattern.
   This is the only choreography unique to History. */
function PrinciplesStyles() {
  return (
    <style>{`
      .principles-row { position: relative; margin-top: 56px; }
      .principles-rule {
        height: 1px;
        background: ${GOLD_BRIGHT};
        width: 100%;
        margin-bottom: 28px;
        transform-origin: left center;
        transform: scaleX(0);
      }
      .brief-doc-station.is-in .principles-rule {
        animation: principles-rule-draw 360ms cubic-bezier(.4, 0, .2, 1) 320ms forwards;
      }
      @keyframes principles-rule-draw {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      .principles-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 1px;
        background: rgba(232,147,70, 0.18);
      }
      @media (max-width: 1100px) {
        .principles-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 600px) {
        .principles-list { grid-template-columns: 1fr; }
      }
      .principle-card {
        background: ${NAVY_DEEP};
        padding: 26px 22px 30px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        color: #ffffff;
        transition: transform 220ms cubic-bezier(.2, .8, .2, 1), background-color 220ms ease;
      }
      .principle-card:hover {
        background: #0e2542;
        transform: translateY(-3px);
      }
      .brief-doc-station.is-in .principle-card {
        animation: principle-drop 380ms cubic-bezier(.2, .85, .25, 1) backwards;
        animation-delay: calc(680ms + var(--i, 0) * 70ms);
      }
      @keyframes principle-drop {
        from { opacity: 0; transform: translateY(-12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .principle-num {
        font-family: ${TYPE.mono};
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: ${GOLD_BRIGHT};
        line-height: 1;
      }
      .principle-text {
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 400;
        line-height: 1.5;
        color: rgba(255,255,255,0.92);
        font-style: italic;
        text-wrap: pretty;
      }
      @media (prefers-reduced-motion: reduce) {
        .principles-rule { transform: scaleX(1) !important; }
        .brief-doc-station.is-in .principles-rule,
        .brief-doc-station.is-in .principle-card { animation: none !important; }
        .principle-card { opacity: 1 !important; transform: none !important; }
      }
    `}</style>
  );
}
