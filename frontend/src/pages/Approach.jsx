import React, { useEffect, useRef } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* Approach — rebuilt in brief language. Copy preserved verbatim
   from the legacy V0.3 version (with sentence-case adjustments to
   match the brief headline rhythm). 9 stations. */

const DISCIPLINES = [
  { num: '01', h: 'Management operating system, built for your operation.',          body: 'The cadence, signals, and accountability structures that make performance visible and manageable across shifts and sites. Not a product we install. A custom system, designed for how your business actually runs, that drives long-term, sustainable improvement.' },
  { num: '02', h: 'Process discipline at the point of execution.',                   body: "Standards that survive pressure. Routines that don't relax when the schedule tightens. The structural elimination of the variation that quietly erodes margin between Monday morning and Friday afternoon." },
  { num: '03', h: 'Frontline leadership behavior, reinforced daily.',                body: 'Capable supervisors on every shift, equipped with the skills, language, and standard work to lead consistently. Not a training event. A daily practice that becomes how the operation is run.' },
  { num: '04', h: 'Visibility across every level of the organization.',              body: 'The same operational truth available to the floor, the plant, and the executive team. Decisions made on the same data. Drift detected before it compounds. The Digital Production System enforces the discipline rather than just reporting it.' },
];

const ARC = [
  { stage: 'Stage I',   h: 'Underperformance',         body: 'Reactive execution. Effort consumed by problems a disciplined system would prevent.' },
  { stage: 'Stage II',  h: 'Stability',                body: 'Variability reduced. Structure introduced. Still sensitive to staffing, demand, and leadership coverage.' },
  { stage: 'Stage III', h: 'High performance',         body: 'Consistent results under normal conditions. The stage where most engagements end and most improvement begins to drift.' },
  { stage: 'Stage IV',  h: 'Sustainable performance',  body: 'Performance continues despite changes in conditions, schedules, and leadership. The architecture is doing the work.' },
  { stage: 'Stage V',   h: 'Scaled performance',       body: 'What works at one site works at the next. Performance transfers across teams, sites, and holdings without degradation.' },
];

export default function Approach() {
  useEffect(() => { document.title = 'Approach | POWERS Manufacturing Consulting'; }, []);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <ApproachStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <Hero />
        <TheGap />
        <TheMechanism />
        <PerformanceArc />
        <TheEngagement />
        <Durability />
        <ApproachCTA />
      </main>
      <BriefFooter />
    </div>
  );
}

function Hero() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-page-hero">
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ marginBottom: 24 }}>Approach</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>Where executive intent</span>
            <span className="accent">meets shop floor execution.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
            We build the operating architecture that makes manufacturing performance sustainable, and scalable across shifts, sites, and the next phase of your business.
          </p>
          <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 64 }} />
        </div>
      </div>
    </section>
  );
}

function TheGap() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">The Gap</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Strategy doesn&rsquo;t fail in the boardroom.</span>
            <span className="pivot">It fails on the way to the floor.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Every credible firm in this market can demonstrate that performance gets better when they engage. That&rsquo;s not differentiation anymore. It&rsquo;s the price of admission.</p>
            <p>The harder question, the one most engagements aren&rsquo;t designed to answer, is what happens after the consultant leaves. Whether the operation continues to perform when conditions change. Whether the gains transfer when leadership turns over. Whether what works at one site works at the next one.</p>
            <p>The reason most improvement does not sustain is structural. The operating architecture required to keep it in place was never fully built. Performance was achieved through external effort rather than internal design. When the external effort stops, the performance follows.</p>
            <p><em>We exist to close that gap.</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TheMechanism() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER_DEEP }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-split">
          <div>
            <div className="station-index wipe">The Mechanism</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>We build the operating architecture</span>
              <span className="pivot">that makes performance sustainable.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <div className="brief-doc-body wipe wipe-d3">
              <p>The four disciplines below are not a service menu. They are an integrated system. A management operating system without leadership behavior produces documentation, not performance. Leadership development without a defined operating architecture produces individual improvement that walks out the door when the individual does.</p>
              <p><em>We build all four together, on the floor, until the operation runs by design rather than by effort.</em></p>
            </div>
          </div>
          <ol className="approach-mech-list">
            {DISCIPLINES.map((d, i) => (
              <li key={d.num} className="approach-mech-block wipe" style={{ ['--i']: i, transitionDelay: `${360 + i*90}ms` }}>
                <div className="approach-mech-num">{d.num}</div>
                <div>
                  <h3 className="approach-mech-h">{d.h}</h3>
                  <p className="approach-mech-body">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PerformanceArc() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col" style={{ margin: '0 auto', textAlign: 'center' }}>
          <div className="station-index wipe">How Performance Evolves</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ alignItems: 'center' }}>
            <span>Performance does not move in a straight line.</span>
            <span className="pivot">It moves in stages.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>Manufacturing operations evolve through five distinct stages. Each one carries different risks. The most common failure mode in this industry is attempting to skip a stage, scaling before performance is sustainable, sustaining before performance is consistent, optimizing before the system is stable.</p>
            <p>Our work begins with an honest read of where your operation actually is, not where the strategy deck says it should be.</p>
          </div>
        </div>
        <ol className="approach-arc">
          {ARC.map((s, i) => (
            <li key={i} className="approach-arc-card" style={{ ['--i']: i }}>
              <div className="approach-arc-dot" aria-hidden="true" />
              <div className="approach-arc-stage">{s.stage}</div>
              <div className="approach-arc-h">{s.h}</div>
              <p className="approach-arc-body">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="approach-arc-cap wipe wipe-d4">
          <em>We diagnose the stage during Discovery. Every engagement is calibrated to move the operation one stage forward, structurally. Not faster than the architecture can support.</em>
        </p>
      </div>
    </section>
  );
}

function TheEngagement() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: NAVY }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">The Engagement</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
            <span>We don&rsquo;t deliver a recommendation</span>
            <span className="pivot">and exit.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3" style={{ color: 'rgba(255,255,255,0.82)' }}>
            <p>The architecture above is not built from a deck. It is built on the floor, on every shift, under real operating conditions, alongside the leaders who will run it after we leave.</p>
            <p>Our engagement begins with a two-week Discovery, a paid assessment that maps the current state of your operation, quantifies the cost of the gaps your team has lived with long enough to consider normal, and delivers a custom roadmap with a results-based ROI commitment. From there, Implementation runs the roadmap. Evaluate ROI &amp; Savings closes the engagement against the financial commitment we made at the start.</p>
            <p style={{ color: '#ffffff' }}><em>POWERS gets paid for results, not for time. That structure is the commercial expression of how seriously we take the work.</em></p>
          </div>
          <div style={{ marginTop: 40 }} className="wipe wipe-d4">
            <a href="/discovery-process" className="brief-doc-cta-link" style={{ color: GOLD_BRIGHT, borderColor: GOLD_BRIGHT }}>
              See how the engagement runs <span className="brief-doc-cta-arrow">&rarr;</span>
            </a>
            <p style={{ marginTop: 16, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              Two weeks. Five deliverables. A defined commercial process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Durability() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER_DEEP }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">Durability</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>What&rsquo;s different</span>
            <span className="pivot">after we leave.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>The result of a POWERS engagement is not a higher number on a single KPI. It is an operation that produces that number consistently, under varying conditions, with internal leadership running it.</p>
            <p>Standards hold when conditions change. Frontline supervisors lead with the discipline our team modeled. The management operating system continues to surface drift before it compounds. Performance no longer depends on extraordinary effort. It is the byproduct of a properly built system, running by design.</p>
            <p><em>That is the durability we build to.</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachCTA() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station brief-doc-cta" style={{ background: PAPER }}>
      <div className="brief-doc-inner" style={{ textAlign: 'center', paddingTop: 96, paddingBottom: 96 }}>
        <div className="station-index wipe" style={{ margin: '0 auto 18px' }}>When You&rsquo;re Ready</div>
        <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 820, alignItems: 'center' }}>
          <span>If you&rsquo;re working through a performance challenge,</span>
          <span className="pivot">we should talk.</span>
        </h2>
        <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 24, color: TEXT_BODY, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          The conversation starts with a call. No deck. No pitch. Just a real discussion about whether what we do is what you need.
        </p>
        <div style={{ marginTop: 36 }} className="wipe wipe-d3">
          <a href="/contact" className="brief-doc-cta-button">Start the conversation</a>
        </div>
      </div>
    </section>
  );
}

function ApproachStyles() {
  return (
    <style>{`
      /* Mechanism — 4-block list on right of the split */
      .approach-mech-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 28px; }
      .approach-mech-block { display: grid; grid-template-columns: 56px 1fr; gap: 18px; align-items: start; }
      .approach-mech-num {
        font-family: ${TYPE.mono};
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.18em;
        color: ${GOLD_BRIGHT};
        padding-top: 6px;
        border-top: 1px solid ${GOLD_BRIGHT};
      }
      .approach-mech-h {
        font-family: ${TYPE.sans};
        font-size: 17px;
        font-weight: 700;
        line-height: 1.3;
        color: ${NAVY};
        margin: 0 0 8px;
      }
      .approach-mech-body {
        font-family: ${TYPE.sans};
        font-size: 14.5px;
        font-weight: 300;
        line-height: 1.6;
        color: ${TEXT_BODY};
        margin: 0;
      }

      /* Performance arc — 5-stage row */
      .approach-arc {
        list-style: none;
        padding: 0;
        margin: 72px 0 0;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 1px;
        background: rgba(13, 36, 66, 0.10);
      }
      @media (max-width: 1100px) {
        .approach-arc { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 600px) {
        .approach-arc { grid-template-columns: 1fr; }
      }
      .approach-arc-card {
        background: ${PAPER};
        padding: 26px 22px 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        opacity: 0;
        transform: translateY(-12px);
        transition: opacity 380ms cubic-bezier(.2,.85,.25,1),
                    transform 380ms cubic-bezier(.2,.85,.25,1);
        transition-delay: calc(560ms + var(--i, 0) * 80ms);
      }
      .brief-doc-station.is-in .approach-arc-card { opacity: 1; transform: translateY(0); }
      .approach-arc-dot {
        width: 10px; height: 10px;
        border-radius: 50%;
        background: ${GOLD_BRIGHT};
      }
      .approach-arc-stage {
        font-family: ${TYPE.mono};
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: ${GOLD_BRIGHT};
      }
      .approach-arc-h {
        font-family: ${TYPE.sans};
        font-size: 17px;
        font-weight: 700;
        color: ${NAVY};
        line-height: 1.25;
      }
      .approach-arc-body {
        font-family: ${TYPE.sans};
        font-size: 13.5px;
        font-weight: 300;
        line-height: 1.6;
        color: ${TEXT_BODY};
        margin: 0;
      }
      .approach-arc-cap {
        text-align: center;
        max-width: 640px;
        margin: 56px auto 0;
        font-family: ${TYPE.sans};
        font-size: 16px;
        font-weight: 300;
        line-height: 1.55;
        color: ${TEXT_BODY};
      }
      .approach-arc-cap em { font-style: italic; color: ${NAVY}; }

      @media (prefers-reduced-motion: reduce) {
        .approach-arc-card { opacity: 1 !important; transform: none !important; transition: none !important; }
      }
    `}</style>
  );
}
