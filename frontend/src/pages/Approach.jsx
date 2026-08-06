import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import SEO from '../components/SEO';
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
    body: 'Processes define how work, materials, information, and decisions move through the operation. POWERS works with your team to identify where flow breaks down, capacity is lost, handoffs fail, and unnecessary complexity creates cost and delay. We establish practical standard work, operating routines, daily management processes, escalation paths, and performance controls that reduce variation and make execution more predictable. The objective is not simply to document how the process should work. It is to build processes that continue working when demand changes, schedules tighten, staffing shifts, or unexpected problems occur.',
  },
  {
    num: '02',
    h: 'Systems',
    body: 'Systems create the management structure that converts business priorities into daily execution. POWERS designs or strengthens a custom Management Operating System that reflects how your business actually runs. This may include KPI ownership, daily and weekly performance reviews, reliability systems, communication flows, escalation routines, decision rights, and accountability structures. The system creates a consistent operating cadence from the frontline to senior leadership, makes performance visible, establishes who owns each result, and ensures that gaps trigger action rather than becoming accepted as part of the operation.',
  },
  {
    num: '03',
    h: 'Tools',
    /* Body is rendered via JSX to support the inline DPS link */
    body: null,
    bodyJsx: (
      <>
        Tools give leaders and teams the real-time visibility required to manage execution. Depending on the needs of the operation, this may include visual performance boards, SQDC management, hour-by-hour tracking, leader standard work, short-interval controls, action tracking, and structured root-cause problem solving. POWERS also integrates digital performance management through our{' '}
        <a
          href="https://www.powersdps.com"
          target="_blank"
          rel="noopener noreferrer"
          className="brief-inline-link"
          data-testid="approach-link-dps"
        >Digital Production System</a>
        {' '}(<a
          href="https://www.powersdps.com"
          target="_blank"
          rel="noopener noreferrer"
          className="brief-inline-link"
          data-testid="approach-link-dps-full"
        >DPS</a>), which reinforces operating discipline in real time by connecting frontline activity, performance visibility, action ownership, and management accountability. The objective is not to add more dashboards or reports. It is to give the frontline, plant leadership, and executive team a common operational truth so decisions are made from the same facts and performance drift is identified before it compounds.
      </>
    ),
  },
  {
    num: '04',
    h: 'Behaviors',
    body: 'Processes, systems, and tools only create results when leaders and employees consistently execute them. POWERS works with frontline supervisors, middle managers, and senior leaders to strengthen ownership, coaching, accountability, problem solving, and execution discipline. We help leaders develop the skills, routines, and confidence required to manage performance consistently across every shift. This is not a standalone training event. Leadership capability is built through daily application in the actual work environment—leaders learn while managing live performance, solving real problems, and reinforcing the operating standards the organization needs to sustain.',
  },
];

const ARC = [
  { stage: 'Stage I',   h: 'Underperformance',        body: 'Execution is largely reactive. Supervisors spend significant time firefighting, priorities shift throughout the day, and employees work around problems rather than eliminating their causes. Performance depends heavily on individual experience, effort, and informal knowledge. The goal is to replace reactive firefighting with structured execution.' },
  { stage: 'Stage II',  h: 'Stability',               body: 'The operation has introduced greater structure, clearer standards, and stronger management discipline. Performance is becoming more predictable, variability is declining, and margin recovery may already be visible. The goal is to make strong execution repeatable rather than situational.' },
  { stage: 'Stage III', h: 'High Performance',        body: 'The operation produces strong results under normal operating conditions. Improvements in throughput, productivity, quality, reliability, service, and cost are visible on the income statement. This is where many improvement efforts end—and where results often begin to drift. The goal is to make high performance part of how the organization operates every day.' },
  { stage: 'Stage IV',  h: 'Sustainable Performance', body: 'The organization continues to execute effectively as conditions change. Processes, systems, tools, and behaviors work together to identify gaps, trigger action, solve problems, and reinforce accountability. Leaders manage through a disciplined operating architecture rather than relying on extraordinary effort. The goal is to create an execution system that continues improving performance.' },
  { stage: 'Stage V',   h: 'Scaled Performance',      body: 'The organization can transfer effective execution across teams, facilities, business units, or portfolio companies without losing performance. Common standards, tools, management routines, and leadership behaviors create enterprise alignment while preserving the flexibility each operation requires. The goal is to make what works in one operation repeatable across the enterprise.' },
];

export default function Approach() {
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <SEO
        title="Our Approach — Operations Performance Consulting | POWERS"
        description="Our approach: build the operating discipline that produces results under any conditions. From underperformance to scalable, sustained execution — without the consultant dependency cycle."
        path="/approach"
      />
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
            <span>Building the execution capability</span>
            <span className="accent">that produces measurable results.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
            POWERS works with leaders and frontline teams to strengthen how the organization translates business priorities into consistent daily action. We do not stand outside the operation and prescribe change. Our senior practitioners work shoulder to shoulder with your people, under live operating conditions, to identify execution gaps, implement practical solutions, and build the internal capability required to sustain performance.
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
          <div className="station-index wipe">The Framework</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Our approach moves through</span>
            <span className="pivot">three connected phases.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p><strong>Discovery.</strong> Establishes the operational truth and quantifies the opportunity.</p>
            <p><strong>Implementation.</strong> Turns that opportunity into measurable performance.</p>
            <p><strong>Sustainability.</strong> Ensures the processes, systems, tools, and leadership behaviors continue producing results after the engagement ends.</p>
            <p>The approach is tailored to the organization&rsquo;s starting point, operating environment, and business objectives. Whether the need is to stabilize performance, unlock capacity, improve consistency, protect existing gains, or scale execution across multiple sites, POWERS builds the operating architecture required to move performance forward.</p>
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
            <div className="station-index wipe">Four Elements of Execution</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Better execution requires</span>
              <span className="pivot">an integrated operating architecture.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <div className="brief-doc-body wipe wipe-d3">
              <p>Processes, systems, tools, and behaviors cannot be improved independently and expected to produce sustainable results. A well-designed process will still fail without a management system that reinforces it. A strong management system will not produce results if leaders lack the tools or capability to use it. Technology will not improve performance if it only reports problems after they occur. Training will not change behavior if the operating environment does not reinforce what was taught.</p>
              <p><em>POWERS strengthens all four execution elements together. We build them with your team, on the floor, until the organization produces results through disciplined execution rather than individual effort.</em></p>
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
          <div className="station-index wipe">Execution at Every Stage</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ alignItems: 'center' }}>
            <span>Every operation has</span>
            <span className="pivot">a different starting point.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>Operational performance develops through distinct stages, each with different execution challenges, risks, and opportunities. Some organizations need to regain control of daily operations. Others need to reduce performance variation, sustain gains through changing conditions, or transfer a successful operating model across multiple facilities. An organization does not need to be underperforming to benefit from stronger execution.</p>
            <p>POWERS does not force every client through the same transformation sequence. We work with your team to understand where execution is today, identify what is limiting the next level of performance, and strengthen the elements of the operating architecture that matter most.</p>
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
            The right stage is diagnosed during{' '}
            <Link
              to="/discovery-process"
              className="brief-inline-link"
              data-testid="approach-link-discovery-arc"
            >Discovery</Link>.
            Every engagement is calibrated to move the operation one stage forward, structurally—not faster than the architecture can support.
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
          <div className="station-index wipe">Phase Two — Implementation</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
            <span>Turn the opportunity</span>
            <span className="pivot">into measurable performance.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3" style={{ color: 'rgba(255,255,255,0.82)' }}>
            <p>
              Discovery establishes the path. Implementation is where the operating capability is built and the results are produced. Once the findings, opportunity, and implementation approach are aligned, senior POWERS practitioners deploy into the operation for the duration defined by the roadmap and Key Event Schedule. We work shoulder to shoulder with leaders and frontline teams across the shifts and functions responsible for performance. Together, we implement the processes, Management Operating System, performance tools, and leadership behaviors required to close the identified execution gaps.
            </p>
            <p>Implementation is not performed from a project office or through periodic recommendations. Our practitioners work within the daily rhythm of the operation, helping leaders manage live performance, solve problems, reinforce accountability, and translate the future-state design into the way work is <em>actually executed</em>.</p>
            <p>The scope, staffing, timing, and governance are tailored to the opportunity identified during{' '}
              <Link
                to="/discovery-process"
                className="brief-inline-link brief-inline-link--on-dark"
                data-testid="approach-link-discovery-engagement"
              >Discovery</Link>. The engagement may include:
            </p>
            <ul className="approach-engagement-list">
              <li>A defined implementation roadmap and Key Event Schedule</li>
              <li>Clear scope, priorities, and ownership</li>
              <li>Dedicated senior practitioners working on-site</li>
              <li>Appropriate shift and functional coverage</li>
              <li>Weekly operational and financial performance tracking</li>
              <li>Leadership coaching and capability building</li>
              <li>Implementation of management routines, tools, and controls</li>
              <li>A defined partnership duration and sustainment plan</li>
            </ul>
            <p style={{ color: '#ffffff' }}><em>POWERS does not hand your organization a plan and leave your team to execute it alone. We work with your people until the new operating architecture is installed, leaders can manage it, and performance is moving against the agreed objectives.</em></p>
          </div>
          <div style={{ marginTop: 40 }} className="wipe wipe-d4">
            <Link to="/discovery-process" className="brief-doc-cta-link" style={{ color: GOLD_BRIGHT, borderColor: GOLD_BRIGHT }} data-testid="approach-engagement-cta">
              See how Discovery works <span className="brief-doc-cta-arrow">&rarr;</span>
            </Link>
            <p style={{ marginTop: 16, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              A field-based engagement. Five deliverables. A results-based Project Savings Commitment.
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
          <div className="station-index wipe">Phase Three — Sustainability and Results Validation</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Make better execution</span>
            <span className="pivot">the way the organization operates.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Performance improvement only creates lasting value when the organization can sustain it without depending on outside support. During the Sustainability phase, POWERS works with your leaders to reinforce the new operating architecture, transfer ownership, close remaining gaps, and verify that the improvements are producing measurable operational and financial results.</p>
            <p>Success is evaluated against your operating data and your financial performance—not against activity, presentation quality, or the number of consulting hours delivered. Where the engagement includes a validated savings model or Project Savings Commitment, performance is measured against the baseline and methodology agreed with your operational and financial leaders.</p>
            <p>Depending on the engagement, results validation may include:</p>
            <ul className="approach-engagement-list">
              <li>Performance against established operational KPIs</li>
              <li>Annualized savings and profit improvement</li>
              <li>Return on investment</li>
              <li>Weekly or monthly cash-flow impact</li>
              <li>Progress against the agreed savings model</li>
              <li>Project cost reconciled against measurable value delivered</li>
              <li>Leadership adoption and Management Operating System adherence</li>
              <li>Sustainment risks and remaining capability gaps</li>
              <li>Final results compared with the agreed commitment</li>
            </ul>
            <p><em>The objective is not simply to demonstrate that performance improved during the engagement. It is to confirm that the organization has the leadership capability, management discipline, processes, systems, and tools required to continue producing and improving those results.</em></p>
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
        <div className="station-index wipe" style={{ margin: '0 auto 18px' }}>Built With Your Team. Measured by Your Results.</div>
        <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 820, alignItems: 'center' }}>
          <span>Experienced practitioners. On the floor.</span>
          <span className="pivot">Working with your people until the capability is built.</span>
        </h2>
        <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 24, color: TEXT_BODY, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
          Every POWERS engagement begins at a different point, but the approach remains consistent. We establish the truth with your team. We build the solution with your team. We implement it inside the operation. We measure the results against your business performance. And we transfer the capability required to sustain and scale what works.
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

      /* Bulleted lists inside station bodies (Phase Two + Phase Three).
         Kept minimal — the bullets are gold hairline squares, the text
         is the same weight/size as the surrounding .brief-doc-body prose
         so the list feels like a natural extension of the paragraph
         rhythm, not a separate UI component. */
      .approach-engagement-list {
        list-style: none;
        padding: 0;
        margin: 20px 0 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .approach-engagement-list li {
        position: relative;
        padding-left: 22px;
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 300;
        line-height: 1.55;
      }
      .approach-engagement-list li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.62em;
        width: 8px;
        height: 1px;
        background: ${GOLD_BRIGHT};
      }

      @media (prefers-reduced-motion: reduce) {
        .approach-arc-card { opacity: 1 !important; transform: none !important; transition: none !important; }
      }
    `}</style>
  );
}
