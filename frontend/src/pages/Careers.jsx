import React, { useEffect, useRef } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import { NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE } from '../lib/briefTokens';

/**
 * Careers — rebuilt Feb 2026 in the "Operating Brief" design
 * language. Copy preserved verbatim (with minor casing adjustments
 * matching the brief's sentence-case headline rhythm); copy revision
 * is a separate pass.
 *
 * Structure mirrors History as the validated pattern:
 *   Hero (navy)
 *   Section 1 — What the work actually looks like (paper)
 *   Section 2 — Who thrives here (paper-deep, split layout)
 *   Section 3 — What POWERS offers (paper)
 *   CTA (paper, ends on cream like History)
 *
 * Each H2 is split into a sans clause + italic-gold serif pivot to
 * carry the brief's signature tonal lift.
 */

function useInViewClass(ref, threshold = 0.18) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => el.classList.toggle('is-in', e.isIntersecting)),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
}

export default function Careers() {
  useEffect(() => { document.title = 'Careers | POWERS Manufacturing Consulting'; }, []);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <PageStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <HeroBeat />
        <SectionWhatTheWorkLooksLike />
        <SectionWhoThrivesHere />
        <SectionWhatPowersOffers />
        <SectionCTA />
      </main>
      <BriefFooter />
    </div>
  );
}

function HeroBeat() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-page-hero" style={{ background: NAVY }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ color: GOLD_BRIGHT, marginBottom: 24 }}>Join the Team</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>This work is not for everyone.</span>
            <span className="pivot">If it is for you, you will know.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ color: 'rgba(255,255,255,0.86)', marginTop: 28, maxWidth: 760 }}>
            POWERS consultants work on the floor, in the shifts, inside the operations where performance actually breaks down. If you want to make a real difference in American manufacturing, this is where that work happens.
          </p>
          <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 64 }} />
        </div>
      </div>
    </section>
  );
}

function SectionWhatTheWorkLooksLike() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">What the Work Actually Looks Like</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>You will be on the road. You will be on the floor.</span>
            <span className="pivot">That is the job.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>POWERS does not send reports from a distance. Our consultants are embedded inside client operations, working shoulder to shoulder with frontline leaders, plant managers, and executive teams to build the systems and disciplines that make performance stick.</p>
            <p>That means travel. It means early shifts and late debrief calls. It means being the person in the room who tells the truth about what is actually happening on the floor and then <em>doing the work to fix it</em>. If that sounds like the kind of consulting you have been looking for, keep reading.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionWhoThrivesHere() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER_DEEP }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-split">
          <div>
            <div className="station-index wipe">Who Thrives Here</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>We hire people who have been in the operation,</span>
              <span className="pivot">not just around it.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <div className="brief-doc-body wipe wipe-d3">
              <p>The POWERS team is built from people with real manufacturing operations experience. Former plant managers, operations directors, maintenance leaders, supply chain executives, and frontline supervisors who understand the work because they have done the work.</p>
              <p>What sets the people who thrive at POWERS apart is not their resume. It is their ability to build trust on a floor quickly, communicate clearly across every level of an organization, and sustain the discipline required to see an engagement through to <em>results that hold after they leave</em>.</p>
            </div>
          </div>
          <div className="brief-doc-placeholder wipe wipe-d3" aria-hidden="true">
            <span className="brief-doc-placeholder-label">
              Manufacturing floor /<br/>consultant on shift<br/>
              <em>placeholder</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionWhatPowersOffers() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">What POWERS Offers</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>A firm that operates by the same standards</span>
            <span className="pivot">it installs in its clients.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>POWERS holds itself to the same principles it brings to every client engagement. <em>Clients first, company second, self third.</em> We deliver on schedule, always. We earn the right to return every week by delivering on our commitments.</p>
            <p>That means when you join POWERS, you join a team that operates with the same discipline, transparency, and accountability it asks of the organizations it serves. The work is demanding. The standards are high. And the impact is real and measurable in every engagement.</p>
          </div>
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
        <h2 className="brief-doc-h2 wipe" style={{ margin: '0 auto', maxWidth: 760, alignItems: 'center' }}>
          <span>Ready to do work</span>
          <span className="pivot">that actually makes a difference?</span>
        </h2>
        <p className="brief-doc-lede wipe wipe-d1" style={{ marginTop: 18, color: TEXT_BODY, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
          See current openings and apply.
        </p>
        <div style={{ marginTop: 36 }} className="wipe wipe-d2">
          <a href="#" className="brief-doc-cta-button">View Open Positions</a>
        </div>
      </div>
    </section>
  );
}

function PageStyles() {
  return (
    <style>{`
      .brief-doc * { box-sizing: border-box; }
      .brief-page-hero {
        position: relative;
        padding: clamp(120px, 14vh, 180px) 0 clamp(96px, 12vh, 140px);
        overflow: hidden;
      }
      .brief-page-hero .brief-doc-inner { color: #ffffff; }
      .brief-doc-station { padding: clamp(80px, 10vh, 140px) 0; position: relative; }
      .brief-doc-inner {
        width: 100%;
        padding: 0 max(40px, calc((100% - 1240px) / 2 + 40px));
        box-sizing: border-box;
      }
      .brief-doc-col { max-width: 900px; }
      .brief-doc-split {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 80px;
        align-items: center;
      }
      @media (max-width: 1023px) {
        .brief-doc-split { grid-template-columns: 1fr; gap: 56px; }
      }
      .station-index {
        font-family: ${TYPE.mono};
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: ${GOLD_BRIGHT};
        margin-bottom: 20px;
      }
      .brief-doc-h1 {
        font-family: ${TYPE.sans};
        font-size: clamp(40px, 5vw, 64px);
        font-weight: 800;
        line-height: 1.04;
        letter-spacing: -0.012em;
        margin: 0;
        text-wrap: balance;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .brief-doc-h1 .pivot {
        font-family: ${TYPE.serif};
        font-style: italic;
        font-weight: 500;
        font-size: 1.02em;
        color: ${GOLD_BRIGHT};
        letter-spacing: -0.012em;
        text-wrap: pretty;
        margin-top: 0.04em;
      }
      .brief-doc-h2 {
        font-family: ${TYPE.sans};
        font-size: clamp(28px, 3.4vw, 40px);
        font-weight: 800;
        line-height: 1.12;
        letter-spacing: -0.008em;
        color: ${NAVY};
        margin: 0;
        text-wrap: balance;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .brief-doc-h2 .pivot {
        font-family: ${TYPE.serif};
        font-style: italic;
        font-weight: 500;
        font-size: 1.02em;
        color: ${GOLD_BRIGHT};
        letter-spacing: -0.012em;
        text-wrap: pretty;
        margin-top: 0.06em;
      }
      .brief-doc-lede {
        font-family: ${TYPE.sans};
        font-size: clamp(17px, 1.5vw, 21px);
        font-weight: 300;
        line-height: 1.55;
        text-wrap: pretty;
        margin: 0;
      }
      .brief-doc-body {
        font-family: ${TYPE.sans};
        font-size: 17px;
        font-weight: 300;
        line-height: 1.72;
        color: ${TEXT_BODY};
        margin-top: 28px;
        text-wrap: pretty;
        max-width: 720px;
      }
      .brief-doc-body p + p { margin-top: 1.1em; }
      .brief-doc-body em { font-style: italic; color: ${NAVY}; font-weight: 500; }
      .brief-doc-rule { width: 80px; height: 1px; background: ${GOLD_BRIGHT}; border: 0; }
      .brief-doc-rule-gold { width: 64px; height: 1px; background: ${GOLD_BRIGHT}; margin: 24px 0 0; }
      .wipe {
        clip-path: inset(-0.4em 100% -0.5em 0);
        transition: clip-path 900ms cubic-bezier(.4, 0, .2, 1);
      }
      .brief-doc-station.is-in .wipe,
      .brief-page-hero.is-in .wipe { clip-path: inset(-0.4em 0 -0.5em 0); }
      .wipe-d1 { transition-delay: 120ms; }
      .wipe-d2 { transition-delay: 240ms; }
      .wipe-d3 { transition-delay: 360ms; }
      .brief-doc-placeholder {
        width: 100%;
        aspect-ratio: 4 / 3;
        background: ${NAVY}
          repeating-linear-gradient(135deg, rgba(232,147,70,0.06) 0 12px, transparent 12px 24px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .brief-doc-placeholder-label {
        font-family: ${TYPE.mono};
        font-size: 11px;
        letter-spacing: 0.12em;
        color: rgba(232,147,70, 0.55);
        text-transform: uppercase;
        padding: 0 24px;
        text-align: center;
        line-height: 1.6;
      }
      /* Solid CTA button — Careers' primary action is a job-board
         link, which earns a filled gold button (stronger affordance
         than the underline-link CTA History uses for its case-study
         entry point). */
      .brief-doc-cta-button {
        display: inline-block;
        background: ${GOLD_BRIGHT};
        color: ${NAVY};
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        padding: 16px 36px;
        text-decoration: none;
        transition: background 160ms ease, transform 160ms ease, box-shadow 160ms ease;
      }
      .brief-doc-cta-button:hover {
        background: #d27a30;
        transform: translateY(-2px);
        box-shadow: 0 12px 24px -12px rgba(13, 36, 66, 0.4);
      }
      @media (prefers-reduced-motion: reduce) {
        .wipe { clip-path: none !important; }
      }
      @media (max-width: 767px) {
        .brief-doc-station { padding: 64px 0; }
        .brief-doc-body { font-size: 16px; }
      }
    `}</style>
  );
}
