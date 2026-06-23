import React, { useEffect, useRef } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* Careers — copy preserved verbatim (sentence-case adjusted to
   match the brief's headline rhythm). Hero uses sans+accent only
   (no serif, no italic); body H2s use the sans+serif-italic-gold
   pivot pattern. */

export default function Careers() {
  useEffect(() => { document.title = 'Careers | POWERS Manufacturing Consulting'; }, []);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
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
    <section ref={ref} className="brief-page-hero">
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ marginBottom: 24 }}>Join the Team</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>This work is not for everyone.</span>
            <span className="accent">If it is for you, you will know.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
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
