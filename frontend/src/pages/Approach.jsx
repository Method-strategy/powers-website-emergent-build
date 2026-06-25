import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* Approach — new copy (2026-02-24 client draft). 7 rows. Two
   link targets:
     • "Discovery Process" → internal /discovery-process (Row 4
       caption and Row 5 lede)
     • "DPS" / "Digital Production System" → external
       https://www.powersdps.com (Row 3 Tools card) */

const DISCIPLINES = [
  {
    num: '01',
    h: 'Processes',
    body: "Standard work. Operating routines. Daily management systems. Escalation processes. Visual performance management. The work that survives pressure. Routines that don\u2019t relax when the schedule tightens. The structural elimination of variation that quietly erodes margin between Monday morning and Friday afternoon.",
  },
  {
    num: '02',
    h: 'Systems',
    body: 'Management Operating System (MOS). KPI accountability cadence. Digital production systems. Reliability systems. Communication flow structures. The cadence, signals, and accountability structures that make performance visible and manageable across shifts and sites. A custom system designed for how your business actually runs.',
  },
  {
    num: '03',
    h: 'Tools',
    /* Body is rendered via JSX to support the inline DPS link */
    body: null,
    bodyJsx: (
      <>
        SQDC boards. Hour-by-hour tracking. Leader standard work. Root cause problem solving. Short-interval controls.{' '}
        <a
          href="https://www.powersdps.com"
          target="_blank"
          rel="noopener noreferrer"
          className="brief-inline-link"
          data-testid="approach-link-dps"
        >DPS</a>
        , our{' '}
        <a
          href="https://www.powersdps.com"
          target="_blank"
          rel="noopener noreferrer"
          className="brief-inline-link"
          data-testid="approach-link-dps-full"
        >Digital Production System</a>
        , enforces the discipline in real time rather than just reporting on it. The instruments that give the floor, the plant, and the executive team the same operational truth. Decisions made on the same data. Drift detected before it compounds.
      </>
    ),
  },
  {
    num: '04',
    h: 'Behaviors',
    body: 'Frontline ownership. Coaching leadership. Daily accountability. Execution discipline. A continuous improvement mindset. Capable supervisors on every shift, equipped with the skills, language, and standard work to lead consistently. Not a training event. A daily practice that becomes how the operation is run.',
  },
];

const ARC = [
  { stage: 'Stage I',   h: 'Underperformance',         body: 'Reactive execution. Supervisors firefighting. Effort consumed by problems a disciplined system would prevent.' },
  { stage: 'Stage II',  h: 'Stability',                body: 'Variability reduced. Structure introduced. Margin recovery begins. Still sensitive to staffing, demand, and leadership coverage.' },
  { stage: 'Stage III', h: 'High performance',         body: 'Consistent results under normal conditions. Returns visible on the income statement. The stage where most engagements end and most improvement begins to drift.' },
  { stage: 'Stage IV',  h: 'Sustainable performance',  body: 'Performance continues despite changes in conditions, schedules, and leadership. Returns compound quarter over quarter. The architecture is doing the work.' },
  { stage: 'Stage V',   h: 'Scaled performance',       body: 'What works at one site works at the next. Performance transfers across teams, sites, and holdings without degradation. The enterprise-level return.' },
];

export default function Approach() {
  useEffect(() => { document.title = 'Our Approach — Operations Performance Consulting | POWERS'; }, []);
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
      {/* Ghosted bottling-line pair — beverage operations,
          tablet + clipboard. "We work with everyone on your
          team" visual. Same sepia + multiply + cream wash + film
          grain primitives as /case-studies — pattern lives in
          BriefDocStyles. */}
      <img
        className="brief-page-hero-bg"
        src="/uploads/approach-hero-bg.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        data-testid="approach-hero-bg"
      />
      <div className="brief-page-hero-wash" aria-hidden="true" />
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ marginBottom: 24 }}>Approach</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>How stronger execution</span>
            <span className="accent">gets built.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
            This is where we show you how. The operating architecture at the roots of your operation. The mechanism that makes performance sustainable across shifts, sites, holdings, and operating conditions. Built on the floor, alongside the leaders who will run it after we leave.
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
            <p>Every credible consulting firm can demonstrate that performance improves while they&rsquo;re engaged and on site. It&rsquo;s not unique. It&rsquo;s the price of admission.</p>
            <p>The harder question, the one most engagements aren&rsquo;t built to answer, is what happens after the consulting team leaves. Whether the operation keeps performing when conditions change. Whether the gains transfer when leadership turns over. Whether what works at one site works at the next.</p>
            <p>Performance improvement came because the consultants were on site, keeping things together. Not internal design. When they leave, the performance follows them out the door.</p>
            <p><em>That&rsquo;s the gap we close.</em></p>
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
              <span>We build the foundation</span>
              <span className="pivot">that makes performance hold up long after we&rsquo;re gone.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <div className="brief-doc-body wipe wipe-d3">
              <p>We build the processes, systems, tools, and behaviors that comprise sustained performance in each of the five discipline areas. Together they form the operating architecture beneath every engagement.</p>
              <p>A management operating system without leadership behavior produces documentation, not performance. Leadership development without process discipline produces individual improvement that walks out the door when the individual does. Tools without systems produce dashboards no one acts on.</p>
              <p><em>The four elements only work as an integrated whole. We build all four together, on the floor, until the operation runs by design rather than by effort.</em></p>
            </div>
          </div>
          <ol className="approach-mech-list">
            {DISCIPLINES.map((d, i) => (
              <li key={d.num} className="approach-mech-block wipe" style={{ ['--i']: i, transitionDelay: `${360 + i*90}ms` }}>
                <div className="approach-mech-num">{d.num}</div>
                <div>
                  <h3 className="approach-mech-h">{d.h}</h3>
                  <p className="approach-mech-body">{d.bodyJsx || d.body}</p>
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
            <span>Performance doesn&rsquo;t move in a straight line.</span>
            <span className="pivot">It moves in stages.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>Operations evolve through five distinct stages. Each one carries different risks. The most common failure mode in this industry is trying to skip a stage. Scaling before performance is sustainable. Sustaining before performance is consistent. Optimizing before the system is stable.</p>
            <p>Our work begins with an honest read of where your operation actually is. Not where the strategy deck says it should be.</p>
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
          <em>
            We diagnose the stage during the{' '}
            <Link
              to="/discovery-process"
              className="brief-inline-link"
              data-testid="approach-link-discovery-arc"
            >Discovery Process</Link>.
            Every engagement is calibrated to move the operation one stage forward, structurally. Not faster than the architecture can support.
          </em>
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
            <p>The architecture above isn&rsquo;t built from a deck. It&rsquo;s built on the floor, on every shift, under real operating conditions, alongside the leaders who&rsquo;ll run it after we leave.</p>
            <p>
              Every engagement starts with an intensive{' '}
              <Link
                to="/discovery-process"
                className="brief-inline-link brief-inline-link--on-dark"
                data-testid="approach-link-discovery-engagement"
              >Discovery Process</Link>.
              A paid assessment that maps the current state of your operation, quantifies the cost of the gaps your team has lived with long enough to consider normal, and delivers a custom roadmap with a results-based ROI commitment.
            </p>
            <p>From there, Implementation runs the roadmap. We translate productivity and efficiency gains into bottom-line value and report them in three ways: annualized savings rate, weekly cash flow, and total project cost. Most engagements deliver positive cash flow within the engagement window itself. The architecture we build keeps returning long after we&rsquo;re off-site, which is why our average client is still seeing the gains years after we leave.</p>
            <p>Evaluate ROI &amp; Savings closes the engagement against the financial commitment we made at the start.</p>
            <p style={{ color: '#ffffff' }}><em>We get paid for results, measured at the financial line, not for time on site. That structure is the commercial expression of how seriously we take the work.</em></p>
          </div>
          <div style={{ marginTop: 40 }} className="wipe wipe-d4">
            <Link to="/discovery-process" className="brief-doc-cta-link" style={{ color: GOLD_BRIGHT, borderColor: GOLD_BRIGHT }} data-testid="approach-engagement-cta">
              See how the engagement runs <span className="brief-doc-cta-arrow">&rarr;</span>
            </Link>
            <p style={{ marginTop: 16, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              A few short weeks. Five deliverables. A defined commercial process.
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
            <p>The result of a POWERS engagement isn&rsquo;t a higher number on a single KPI. It&rsquo;s an operation that produces that number consistently, under varying conditions, with internal leadership running it.</p>
            <p>Standards hold up when conditions change. Frontline supervisors lead with the discipline our team modeled. The management operating system continues to surface drift before it compounds. Performance no longer depends on extraordinary effort. It&rsquo;s the byproduct of a properly built system running by design.</p>
            <p>When the roots are strong, results don&rsquo;t have to be chased. They grow. Which means the return on a POWERS engagement compounds for years. The number our client signed for at the start keeps growing after the contract closes.</p>
            <p><em>That&rsquo;s the durability we build to.</em></p>
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
          The conversation starts with a call. No slide deck promises. Only durable performance. Just a real discussion about whether what we do is what you need.
        </p>
        <div style={{ marginTop: 36 }} className="wipe wipe-d3">
          <Link to="/contact" className="brief-doc-cta-button" data-testid="approach-final-cta">Start the conversation</Link>
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
