import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import SEO from '../components/SEO';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* Discovery Process — full content rewrite (2026-02-24 client draft).
   10 rows. Internal links to /approach, /case-studies, /contact use
   React Router <Link> for SPA navigation. */

const STUDY_AREAS = [
  { num: '01', h: 'Processes.',            items: ['Bottlenecks and operating constraints', 'Process redundancies and unnecessary complexity', 'Production flow and material movement', 'Planning, scheduling, and schedule adherence', 'Inventory control and working-capital performance', 'Capacity, staffing, and labor requirements', 'Organizational structure and decision rights', 'System, department, and functional integration gaps'] },
  { num: '02', h: 'Systems.',              items: ['Existing Management Operating System routines', 'Daily, weekly, and monthly management cadence', 'KPI definitions, standards, ownership, and accuracy', 'Performance visibility from the shop floor to senior leadership', 'Reliability and maintenance-management systems', 'Escalation, decision-making, and accountability processes', 'Communication flow and cross-functional coordination', 'Alignment between operational activity and financial priorities'] },
  { num: '03', h: 'Tools.',                items: ['Visual management and performance boards', 'Hour-by-hour and short-interval performance tracking', 'Leader standard work', 'Problem-solving and root-cause analysis', 'Action tracking, ownership, and follow-up', 'Planning and scheduling tools', 'Digital performance-management systems', 'Tool adoption, utilization, and user capability'] },
  { num: '04', h: 'People and Behaviors.', items: ['Process discipline and standard-work adherence', 'Frontline supervisor and middle-management capability', 'Ownership, follow-up, and accountability', 'Human errors, quality losses, scrap, and rework', 'Performance variation between teams, shifts, and employees', 'Allocation of labor, time, and resources', 'Coaching, leadership, and problem-solving capability', 'Labor coverage, skill requirements, and workforce capacity'] },
];

const DELIVERABLES = [
  { num: '01', h: 'Where Is Execution Being Lost?',           teaser: 'Formal operating studies documenting how work actually happens across every shift.', body: 'POWERS conducts formal operating studies and documents what our practitioners observe across the operation. We work alongside your leaders and frontline teams to understand how work is actually performed—not simply how procedures, systems, or reports suggest it should be performed. The assessment identifies execution strengths, bottlenecks, chronic losses, performance variation, leadership gaps, and best practices across production and the supporting functions that influence results. Each material finding is connected to its operational impact, likely root cause, and financial significance.' },
  { num: '02', h: 'What Should the Future State Look Like?',  teaser: 'The future-state operating architecture, designed around your business — not a template.', body: 'Where appropriate, Discovery defines the future-state operating architecture required to improve and sustain execution. This may include the processes, KPIs, meeting rhythms, visual-management tools, leader routines, communication structures, escalation paths, and accountability mechanisms needed to translate business priorities into consistent daily action. The future state is not a standardized consulting template. It is designed around your products, customers, workforce, leadership structure, shift patterns, systems, culture, and operating environment—and built with your team, not imposed on it.' },
  { num: '03', h: 'What Performance Is Realistically Achievable?', teaser: 'A defensible performance profile across throughput, productivity, uptime, quality, and cost.', body: 'Discovery establishes what the operation could realistically achieve if the identified execution gaps were addressed. Using observed performance, operating data, measured losses, available capacity, and financial information, POWERS works with your operational and financial leaders to define an achievable future-state performance profile across throughput and capacity, labor productivity, equipment uptime and reliability, quality, inventory and working capital, planning and schedule adherence, service performance, and operating cost.' },
  { num: '04', h: 'What Is the Opportunity Worth?',            teaser: 'Execution gaps connected to financial impact — the basis for a Project Savings Commitment.', body: 'POWERS connects the identified execution gaps to their operational and financial impact. The resulting opportunity model shows leadership where performance is being lost, how much those losses are costing the business, and what value could be created by closing the gaps. Where the data and scope support it, this analysis may form the basis of a Project Savings Commitment that POWERS is prepared to stand behind during Implementation. This moves the discussion beyond recommendations and estimates—it creates a measurable financial case that can be reviewed with your team and used to govern performance if the engagement moves forward.' },
  { num: '05', h: 'What Will It Take to Capture the Opportunity?', teaser: 'A prioritized roadmap, sequenced Key Event Schedule, and defined ownership.', body: 'Discovery defines the practical path from the current state to the desired future state. This may include a prioritized opportunity register, implementation roadmap, Key Event Schedule, recommended sequencing, governance structure, resource requirements, shift coverage, leadership involvement, and expected timing. The roadmap separates immediate execution opportunities from foundational system changes and longer-term capability requirements. It identifies what should happen first, what must be built before other improvements can succeed, and where leadership ownership is required.' },
];

export default function DiscoveryProcess() {
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <SEO
        title="Discovery — Manufacturing Operations Execution Assessment | POWERS"
        description="POWERS Discovery — a field-based Execution Strengths and Gap Analysis that establishes the operational truth, quantifies the opportunity, and builds a practical path to better execution."
        path="/discovery-process"
      />
      <BriefDocStyles />
      <DiscoveryStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <Hero />
        <StartingPoint />
        <MultiSite />
        <WhatWeStudy />
        <WeekOne />
        <WeekTwo />
        <Deliverables />
        <SkinInTheGame />
        <PhasesTwoThree />
        <DiscoveryCTA />
      </main>
      <BriefFooter />
    </div>
  );
}

function Hero() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-page-hero">
      {/* Ghosted discovery walk — three engineers in hi-vis walking
          into a heavy industrial facility. "We come on the floor"
          visual for the assessment story. Same sepia + multiply +
          cream wash + film grain primitives as /case-studies and
          /approach — pattern lives in BriefDocStyles. */}
      <img
        className="brief-page-hero-bg"
        src="/uploads/discovery-process-hero-bg.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        data-testid="discovery-process-hero-bg"
      />
      <div className="brief-page-hero-wash" aria-hidden="true" />
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ marginBottom: 24 }}>POWERS Operational Execution Discovery</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>Find the truth.</span>
            <span>Quantify the opportunity.</span>
            <span className="accent">Build the path to better execution.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
            The first step toward improved business performance is understanding how execution actually happens across the operation today. POWERS Discovery is a comprehensive Execution Strengths and Gap Analysis conducted in partnership with your team—not in judgment of it and never from the sidelines.
          </p>
          <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 64 }} />
        </div>
      </div>
    </section>
  );
}

function StartingPoint() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">Discovery Is the Work</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Not a sales activity.</span>
            <span className="pivot">A paid, field-based engagement.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Most organizations do not have one overwhelming issue holding them back. They have hundreds—or even thousands—of smaller execution losses occurring every day across processes, handoffs, management routines, systems, tools, and leadership behaviors. Individually, these losses can appear insignificant. Collectively, they reduce throughput, consume capacity, increase costs, create unnecessary firefighting, frustrate employees, and prevent the organization from consistently achieving its goals.</p>
            <p>Discovery makes these execution losses visible and measurable. We work with your team to separate facts from assumptions, connect operational gaps to their financial impact, and organize the opportunities into a clear sequence of action. Discovery is led by experienced senior practitioners working inside your operation, under live conditions, across the shifts and functions responsible for performance. We observe the work as it happens, conduct comprehensive operating studies, analyze operational and financial data, and validate the findings alongside your team.</p>
            <p>The result is not a collection of observations or recommendations. It is a quantified execution roadmap supported by defined deliverables and a results-based Project Savings Commitment that POWERS is prepared to stand behind during Implementation.</p>
            <p><em>Discovery is not something POWERS does to your organization. It is work we do with your organization to build the clarity, alignment, ownership, and execution capability required to produce better results.</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MultiSite() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER_DEEP, paddingTop: 'clamp(56px, 7vh, 96px)', paddingBottom: 'clamp(56px, 7vh, 96px)' }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe">Multi-Site and Enterprise Discovery</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>The same approach,</span>
            <span className="pivot">scaled to the enterprise.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>For organizations operating across multiple facilities, regions, or portfolio companies, Discovery scales to match the complexity of the enterprise. The core approach remains the same: establish the operational truth, quantify the opportunity, and build a practical path to better execution. What changes is the scale, sequencing, and level of coordination required to understand performance across multiple operating environments.</p>
            <p>Each facility is assessed within the realities of its products, processes, workforce, leadership structure, systems, customers, and local operating conditions. Multi-site organizations often face two execution challenges at once—some performance gaps are specific to an individual site, while others are systemic issues created by inconsistent processes, unclear standards, fragmented management routines, or weak coordination across the enterprise. Discovery helps distinguish between the two.</p>
            <p>The scope and duration are tailored to the questions the organization needs answered. A multi-site Discovery may be completed over several weeks or extend across multiple months depending on the number of locations, geographic coverage, operational complexity, differences between sites, depth of financial analysis, and level of detail required for executive, investment committee, or board decisions.</p>
            <p><em>For private equity firms, Discovery can also provide a consistent view of execution capability and value-creation potential across a portfolio</em>—allowing leadership to distinguish isolated operating issues from broader patterns and determine where resources, investment, and implementation support can create the greatest return.</p>
          </div>
          <p className="wipe wipe-d4" style={{ marginTop: 24, fontSize: 14, color: TEXT_BODY, fontStyle: 'italic' }}>
            If your operation runs across more than one site, the conversation about scope starts before Discovery does.{' '}
            <Link to="/contact" style={{ color: GOLD_BRIGHT, textDecoration: 'none', borderBottom: `1px solid ${GOLD_BRIGHT}` }} data-testid="discovery-multisite-contact">Start it on the contact page &rarr;</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatWeStudy() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col" style={{ margin: '0 auto', textAlign: 'center' }}>
          <div className="station-index wipe">What We Study</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ alignItems: 'center' }}>
            <span>The four interconnected areas</span>
            <span className="pivot">that determine how strategy becomes daily execution.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>Discovery examines the four interconnected areas that determine how effectively an organization turns strategy into daily execution: processes, systems, tools, and people and behaviors. These elements cannot be evaluated in isolation. A strong process will still fail without the right management system. A good tool will not produce results if leaders do not use it consistently. Capable employees cannot execute effectively when priorities, standards, and decision rights are unclear. We do not assess the organization from the outside and hand back a list of deficiencies—we work shoulder to shoulder with the people doing the work.</p>
          </div>
        </div>
        <ol className="study-grid">
          {STUDY_AREAS.map((s, i) => (
            <li key={s.num} className="study-col" style={{ ['--i']: i }}>
              <div className="study-num">{s.num}</div>
              <h3 className="study-h">{s.h}</h3>
              <ul className="study-list">
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WeekOne() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER, borderTop: '1px solid rgba(13,36,66,0.08)' }}>
      <div className="brief-doc-inner">
        <div className="week-grid">
          <div>
            <div className="week-eyebrow wipe">Phase One</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Establish the current state.</span>
              <span className="pivot">Under live operating conditions.</span>
            </h2>
          </div>
          <div>
            <div className="brief-doc-body wipe wipe-d2" style={{ marginTop: 0 }}>
              <p>During Phase One, senior POWERS practitioners deploy directly into your operation to understand how performance is created—or lost—under live operating conditions. We work across production and the supporting functions that influence execution, including planning, maintenance, quality, supply chain, materials, engineering, finance, and leadership. Processes are mapped, operating data is analyzed, and leaders and employees are observed performing the actual work.</p>
              <p>Where appropriate, our practitioners work across multiple shifts to identify variations in performance, leadership discipline, staffing, handoffs, standards, and operating practices. These differences often reveal execution losses that cannot be seen through plant-level averages or monthly reporting alone. Findings are reviewed through regular working debriefs with your leaders—this allows the team to validate what we are seeing, provide context, challenge assumptions, and align around what is real versus anecdotal.</p>
            </div>
            <div className="week-output wipe wipe-d3">
              <div className="week-output-cap">Phase One Output</div>
              <div className="week-output-line">Comprehensive operating studies and documented observations.</div>
              <div className="week-output-line">Current-state assessment of processes, systems, tools, people, and behaviors.</div>
              <div className="week-output-line">Identified execution strengths and performance gaps.</div>
              <div className="week-output-line">Preliminary register of opportunities, losses, and operating constraints.</div>
              <div className="week-output-line">Financial magnitude connected to operating costs and the P&amp;L.</div>
              <div className="week-output-line">Initial results-based ROI and cash-flow model.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeekTwo() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER_DEEP }}>
      <div className="brief-doc-inner">
        <div className="week-grid">
          <div>
            <div className="week-eyebrow wipe">Phase Two</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Build the roadmap</span>
              <span className="pivot">to the desired future state.</span>
            </h2>
          </div>
          <div>
            <div className="brief-doc-body wipe wipe-d2" style={{ marginTop: 0 }}>
              <p>Phase Two converts the operational facts into an executable plan. POWERS works with your leaders to validate the findings, connect operational gaps to their financial impact, identify the underlying root causes, and determine the right sequence for addressing them. Opportunities are prioritized based on financial value, speed to impact, implementation complexity, operational dependencies, and the organization&rsquo;s ability to absorb change. Immediate execution opportunities are separated from foundational system requirements and longer-term capability needs.</p>
              <p>The future state is not designed behind closed doors and presented to your team at the end of the engagement. POWERS builds it with your organization. Your leaders help validate the priorities, test the practicality of the proposed changes, identify operational constraints, and define the ownership required to execute the roadmap. The resulting plan is specific to your business—<em>a practical, sequenced execution roadmap with defined ownership, implementation requirements, timing, financial expectations, and a results-based commercial commitment behind it.</em></p>
            </div>
            <div className="week-output on-tint wipe wipe-d3">
              <div className="week-output-cap">Phase Two Output</div>
              <div className="week-output-line">Findings validated with the organization and presented to senior leadership.</div>
              <div className="week-output-line">Prioritized and quantified opportunity register.</div>
              <div className="week-output-line">Custom future-state Management Operating System design.</div>
              <div className="week-output-line">Sequenced implementation roadmap and Key Event Schedule.</div>
              <div className="week-output-line">Financial business case and Project Savings Commitment.</div>
              <div className="week-output-line">Recommended implementation scope, staffing, governance, and timing.</div>
              <div className="week-output-line">Clear go / no-go decision for Implementation.</div>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 24, fontSize: 13, color: TEXT_BODY, fontStyle: 'italic' }}>
              Multi-site Discovery extends this rhythm across the operation. Scope and duration are scaled to the assessment needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Deliverables() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col" style={{ margin: '0 auto', textAlign: 'center' }}>
          <div className="station-index wipe">What You Receive</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ alignItems: 'center' }}>
            <span>Five questions.</span>
            <span className="pivot">Answered from the operational truth.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>POWERS Discovery is structured to answer five specific questions leadership needs answered before committing to broader operational change. Together, they form a decision framework built around your business.</p>
          </div>
        </div>
        <ol className="deliv-list">
          {DELIVERABLES.map((d, i) => (
            <li key={d.num} className="deliv-row" style={{ ['--i']: i }}>
              <details className="brief-accordion">
                <summary>
                  <span className="deliv-num">{d.num}</span>
                  <span className="brief-accordion-title">
                    <span className="deliv-h">{d.h}</span>
                    <span className="brief-accordion-teaser">{d.teaser}</span>
                  </span>
                  <span className="brief-accordion-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="brief-accordion-panel">
                  <p className="deliv-body">{d.body}</p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SkinInTheGame() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: NAVY }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col" style={{ margin: '0 auto', textAlign: 'center' }}>
          <div className="station-index wipe">Skin in the Game</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff', alignItems: 'center' }}>
            <span>Our success is tied</span>
            <span className="pivot">to your results.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 740, color: 'rgba(255,255,255,0.82)', textAlign: 'left' }}>
            <p>POWERS is not a traditional consulting firm, and Discovery is not a traditional consulting proposal. Where the operating conditions, data availability, and analytical scope allow for a defensible savings model, Discovery may include a Project Savings Commitment that POWERS is prepared to stand behind during Implementation. The commitment is developed with your operational and financial leaders, grounded in your data, and validated against your P&amp;L—not built from consulting benchmarks, industry averages, or aspirational forecasts.</p>
            <p>Where a validated savings commitment is included, our compensation during Implementation is tied to delivering the results agreed. If the results are not delivered, we do not receive full value under the agreement. This structure aligns our success with yours and ensures that Discovery is not designed to sell more consulting—it is designed to identify real opportunity, build the right plan, and produce measurable operational and financial performance.</p>
            <p><em>Discovery is the beginning of a partnership—not a proposal. It is designed to give your leadership the clarity, evidence, and confidence required to make a sound business decision. From that decision, POWERS is prepared to work alongside your team to implement the roadmap, build the operating capability required to sustain results, and deliver the performance the analysis identified.</em></p>
          </div>
        </div>
        <ol className="skin-stats wipe wipe-d4">
          <li><div className="skin-stat-num">500+</div><div className="skin-stat-cap">Engagements delivered</div></li>
          <li><div className="skin-stat-num">100%</div><div className="skin-stat-cap">Field-based practitioners</div></li>
          <li><div className="skin-stat-num">1</div><div className="skin-stat-cap">Standard: your operational and financial results</div></li>
        </ol>
      </div>
    </section>
  );
}

function PhasesTwoThree() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <div className="brief-doc-col" style={{ margin: '0 auto', textAlign: 'center' }}>
          <div className="station-index wipe">A Decision Framework Built Around Your Business</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ alignItems: 'center' }}>
            <span>Discovery gives leadership</span>
            <span className="pivot">a clear framework to decide.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>Together, the Discovery outputs create a clear framework leadership can use to answer the questions that matter before committing to broader operational change:</p>
          </div>
        </div>
        <ul className="decision-framework wipe wipe-d4">
          <li>What are our most significant execution gaps, and what is causing them?</li>
          <li>Where is performance being lost, and what is it costing the business?</li>
          <li>What could performance realistically look like if we address these gaps?</li>
          <li>How much operational and financial value is available to be captured?</li>
          <li>What is the practical implementation path from where we are to where we need to be?</li>
          <li>What capabilities do we need to strengthen internally to sustain the gains?</li>
          <li>What sequence, timeline, and investment are required?</li>
          <li>Do we want POWERS to partner with our team to implement the roadmap?</li>
        </ul>
        <div className="phases-footer wipe wipe-d4" style={{ marginTop: 48 }}>
          <p>The implementation architecture and the sustainability that follows are described on the <Link to="/approach" className="brief-inline-link" data-testid="discovery-link-approach-inline">Approach</Link> page. The <Link to="/case-studies" className="brief-inline-link" data-testid="discovery-link-cases-inline">Case Studies</Link> are the evidence.</p>
          <div className="phases-footer-links">
            <Link to="/approach" data-testid="discovery-link-approach">See the Approach &rarr;</Link>
            <span aria-hidden="true">·</span>
            <Link to="/case-studies" data-testid="discovery-link-cases">See the Results &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscoveryCTA() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station brief-doc-cta" style={{ background: PAPER }}>
      <div className="brief-doc-inner" style={{ textAlign: 'center', paddingTop: 96, paddingBottom: 96 }}>
        <div className="station-index wipe" style={{ margin: '0 auto 18px' }}>Ready to Start</div>
        <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 820, alignItems: 'center' }}>
          <span>Find the truth. Quantify the opportunity.</span>
          <span className="pivot">Build the path to better execution.</span>
        </h2>
        <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 24, color: TEXT_BODY, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
          The conversation that leads to Discovery is shorter than Discovery itself. If your organization is ready to understand what is really happening across the operation and turn that clarity into measurable performance, the next step is a call.
        </p>
        <div className="cta-contact wipe wipe-d3">
          <a href="tel:+16789714711" className="cta-phone">+1 678-971-4711</a>
          <a href="mailto:info@thepowerscompany.com" className="cta-email">info@thepowerscompany.com</a>
        </div>
        <div style={{ marginTop: 32 }} className="wipe wipe-d4">
          <Link to="/contact" className="brief-doc-cta-button" data-testid="discovery-final-cta">Start the conversation &rarr;</Link>
        </div>
      </div>
    </section>
  );
}

function DiscoveryStyles() {
  return (
    <style>{`
      /* Study area 4-col grid (was 3-col; client added "Tools" as
         its own column in the 2026-02-24 draft so Processes /
         Systems / Tools / People & Behaviors each render in their
         own column). On mid-width screens it falls to 2-col, then
         1-col on phones. */
      .study-grid {
        list-style: none;
        padding: 0;
        margin: 72px 0 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 40px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }
      @media (max-width: 1100px) { .study-grid { grid-template-columns: repeat(2, 1fr); gap: 44px; } }
      @media (max-width: 600px)  { .study-grid { grid-template-columns: 1fr; gap: 40px; } }
      .study-col {
        opacity: 0;
        transform: translateY(-12px);
        transition: opacity 380ms cubic-bezier(.2,.85,.25,1), transform 380ms cubic-bezier(.2,.85,.25,1);
        transition-delay: calc(420ms + var(--i, 0) * 90ms);
      }
      .brief-doc-station.is-in .study-col { opacity: 1; transform: translateY(0); }
      .study-num {
        font-family: ${TYPE.mono};
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.18em;
        color: ${GOLD_BRIGHT};
        padding-bottom: 8px;
        border-bottom: 1px solid ${GOLD_BRIGHT};
        display: inline-block;
        margin-bottom: 16px;
      }
      .study-h {
        font-family: ${TYPE.sans};
        font-size: 19px;
        font-weight: 700;
        color: ${NAVY};
        margin: 0 0 16px;
      }
      .study-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-family: ${TYPE.sans};
        font-size: 14.5px;
        font-weight: 300;
        line-height: 1.65;
        color: ${TEXT_BODY};
      }
      .study-list li { padding: 4px 0; border-bottom: 1px solid rgba(13,36,66,0.06); }
      .study-list li:last-child { border-bottom: 0; }

      /* Week sections: 2-col grid with eyebrow/h2 left, body+output right */
      .week-grid {
        display: grid;
        grid-template-columns: 1fr 1.4fr;
        gap: 56px;
        align-items: start;
      }
      @media (max-width: 1023px) { .week-grid { grid-template-columns: 1fr; gap: 32px; } }
      .week-eyebrow {
        font-family: ${TYPE.mono};
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.22em;
        color: ${GOLD_BRIGHT};
        text-transform: uppercase;
        margin-bottom: 14px;
      }
      .week-output {
        margin-top: 32px;
        padding: 24px 28px;
        background: rgba(13,36,66,0.04);
        border-left: 3px solid ${GOLD_BRIGHT};
      }
      .week-output.on-tint { background: rgba(255,255,255,0.6); }
      .week-output-cap {
        font-family: ${TYPE.mono};
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: ${GOLD_BRIGHT};
        margin-bottom: 12px;
      }
      .week-output-line {
        font-family: ${TYPE.sans};
        font-size: 14.5px;
        font-weight: 400;
        line-height: 1.55;
        color: ${NAVY};
        padding: 6px 0;
      }
      .week-output-line + .week-output-line { border-top: 1px solid rgba(13,36,66,0.08); }

      /* Deliverables — 5 rows */
      .deliv-list {
        list-style: none;
        padding: 0;
        margin: 72px auto 0;
        max-width: 1080px;
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
      .deliv-row {
        display: block;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 380ms cubic-bezier(.2,.85,.25,1), transform 380ms cubic-bezier(.2,.85,.25,1);
        transition-delay: calc(420ms + var(--i, 0) * 70ms);
      }
      .deliv-row:last-child { border-bottom: 0; }
      .brief-doc-station.is-in .deliv-row { opacity: 1; transform: translateY(0); }

      /* ── Shared editorial accordion (mirrored from Approach.jsx) ──
         Native <details>/<summary>. Gold hairline dividers, gold mono
         +/× toggle, keyboard-native, zero JS. Same pattern used by
         the Four Elements of Execution on the Approach page. */
      .brief-accordion { border-top: 1px solid rgba(232,147,70,0.30); }
      .deliv-list li:last-child .brief-accordion { border-bottom: 1px solid rgba(232,147,70,0.30); }
      .brief-accordion > summary {
        list-style: none;
        cursor: pointer;
        display: grid;
        grid-template-columns: 78px 1fr auto;
        gap: 24px;
        align-items: baseline;
        padding: 26px 4px 26px 0;
        outline: none;
        user-select: none;
      }
      .brief-accordion > summary::-webkit-details-marker,
      .brief-accordion > summary::marker { display: none; }
      .brief-accordion > summary:hover .deliv-h { color: ${GOLD_BRIGHT}; }
      .brief-accordion > summary:focus-visible { outline: 2px solid ${GOLD_BRIGHT}; outline-offset: 4px; border-radius: 2px; }
      .brief-accordion-title { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
      .brief-accordion-teaser {
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 300;
        line-height: 1.4;
        color: ${TEXT_BODY};
        font-style: italic;
      }
      .brief-accordion-toggle {
        font-family: ${TYPE.mono};
        font-size: 22px;
        font-weight: 400;
        color: ${GOLD_BRIGHT};
        line-height: 1;
        transition: transform 240ms cubic-bezier(.2,.7,.2,1);
        padding-top: 4px;
      }
      details[open] > summary .brief-accordion-toggle { transform: rotate(45deg); }
      .brief-accordion-panel {
        padding: 0 4px 30px 102px;
        animation: accordion-fade 300ms cubic-bezier(.2,.7,.2,1);
      }
      @keyframes accordion-fade {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @media (max-width: 720px) {
        .brief-accordion > summary { grid-template-columns: 56px 1fr auto; gap: 16px; padding: 22px 0; }
        .brief-accordion-panel { padding-left: 72px; padding-right: 0; padding-bottom: 24px; }
      }
      .brief-accordion .deliv-num {
        margin-top: 4px;
        font-family: ${TYPE.mono};
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 0.02em;
        color: ${GOLD_BRIGHT};
        line-height: 1;
      }
      .brief-accordion .deliv-h {
        margin: 0;
        font-family: ${TYPE.serif};
        font-style: italic;
        font-weight: 500;
        font-size: clamp(20px, 2vw, 25px);
        line-height: 1.25;
        color: ${NAVY};
        letter-spacing: -0.005em;
      }
      .brief-accordion .deliv-body {
        margin: 0;
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 300;
        line-height: 1.65;
        color: ${TEXT_BODY};
      }

      /* Skin in the Game — stats row */
      .skin-stats {
        list-style: none;
        padding: 0;
        margin: 64px auto 0;
        max-width: 880px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
        text-align: center;
      }
      @media (max-width: 720px) { .skin-stats { grid-template-columns: 1fr; gap: 32px; } }
      .skin-stats li { padding: 20px 24px; border-right: 1px solid rgba(232,147,70,0.20); }
      .skin-stats li:last-child { border-right: 0; }
      @media (max-width: 720px) { .skin-stats li { border-right: 0; border-bottom: 1px solid rgba(232,147,70,0.20); padding-bottom: 32px; } .skin-stats li:last-child { border-bottom: 0; } }
      .skin-stat-num {
        font-family: ${TYPE.sans};
        font-size: clamp(40px, 4.5vw, 56px);
        font-weight: 800;
        color: ${GOLD_BRIGHT};
        line-height: 1;
        letter-spacing: -0.01em;
      }
      .skin-stat-cap {
        font-family: ${TYPE.sans};
        font-size: 13px;
        color: rgba(255,255,255,0.66);
        margin-top: 10px;
        line-height: 1.4;
      }

      /* Phases 2-col grid */
      .phases-grid {
        margin: 72px auto 0;
        max-width: 1080px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 56px;
      }
      @media (max-width: 900px) { .phases-grid { grid-template-columns: 1fr; gap: 48px; } }
      .phase-col {
        background: rgba(13,36,66,0.025);
        border-top: 3px solid ${GOLD_BRIGHT};
        padding: 32px 28px;
      }
      .phase-eyebrow {
        font-family: ${TYPE.mono};
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: ${GOLD_BRIGHT};
        margin-bottom: 14px;
      }
      .phase-h {
        font-family: ${TYPE.sans};
        font-size: 22px;
        font-weight: 700;
        color: ${NAVY};
        margin: 0 0 16px;
      }
      .phase-body {
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 300;
        line-height: 1.65;
        color: ${TEXT_BODY};
        margin: 0 0 18px;
      }
      .phase-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-family: ${TYPE.sans};
        font-size: 14px;
        font-weight: 400;
        line-height: 1.6;
        color: ${NAVY};
      }
      .phase-list li { padding: 6px 0 6px 18px; position: relative; }
      .phase-list li::before {
        content: '';
        position: absolute;
        left: 0; top: 14px;
        width: 8px; height: 1px;
        background: ${GOLD_BRIGHT};
      }
      .phases-footer {
        max-width: 720px;
        margin: 56px auto 0;
        text-align: center;
        font-family: ${TYPE.sans};
        font-size: 14px;
        color: ${TEXT_BODY};
      }
      .phases-footer p { margin: 0 0 16px; }
      .phases-footer-links { display: flex; justify-content: center; align-items: center; gap: 14px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600; }
      .phases-footer-links a { color: ${GOLD_BRIGHT}; text-decoration: none; border-bottom: 1px solid ${GOLD_BRIGHT}; padding-bottom: 2px; }
      .phases-footer-links a:hover { color: ${NAVY}; border-color: ${NAVY}; }

      /* Decision framework — 8-question checklist grid.
         Two-column on desktop for scannable pairing, single-column on
         mobile. Each row is a serifed question with a mono numeric
         marker in gold, matching the visual grammar of .study-col and
         .deliv-row while reading as a lighter, more editorial list.
         The questions are pulled from the client's Discovery rewrite
         ("A Decision Framework Built Around Your Business") and serve
         as the reader's mental checklist before Implementation. */
      .decision-framework {
        list-style: none;
        padding: 0;
        margin: 40px 0 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 22px 48px;
        counter-reset: dfq;
        max-width: 1120px;
        margin-left: auto;
        margin-right: auto;
      }
      .decision-framework li {
        counter-increment: dfq;
        position: relative;
        padding: 22px 24px 22px 66px;
        background: ${PAPER};
        border: 1px solid rgba(13,36,66,0.10);
        border-radius: 0;
        font-family: ${TYPE.sans};
        font-size: 16px;
        font-weight: 400;
        line-height: 1.45;
        color: ${TEXT_BODY};
        min-height: 88px;
        /* Simple block layout — flex + padding-left had a rendering
           interaction where long single-clause questions ("...strengthen
           internally to sustain the gains?") overflowed the card
           instead of wrapping. Block layout wraps text naturally
           and the vertical rhythm holds via min-height + padding. */
        display: block;
        overflow-wrap: break-word;
      }
      .decision-framework li::before {
        content: counter(dfq, decimal-leading-zero);
        position: absolute;
        top: 22px;
        left: 24px;
        font-family: ${TYPE.mono};
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.14em;
        color: ${GOLD_BRIGHT};
      }
      @media (max-width: 720px) {
        .decision-framework {
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .decision-framework li {
          padding: 20px 20px 20px 60px;
          font-size: 15px;
          min-height: 0;
        }
        .decision-framework li::before { top: 20px; left: 20px; }
      }

      /* CTA contact block (same as Leadership) */
      .cta-contact { margin-top: 28px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
      .cta-phone { font-family: ${TYPE.sans}; font-size: 22px; font-weight: 500; color: ${NAVY}; text-decoration: none; }
      .cta-email { font-family: ${TYPE.sans}; font-size: 16px; font-weight: 400; color: ${GOLD_BRIGHT}; text-decoration: none; }
      .cta-email:hover { color: ${NAVY}; }

      @media (prefers-reduced-motion: reduce) {
        .study-col, .deliv-row { opacity: 1 !important; transform: none !important; transition: none !important; }
      }
    `}</style>
  );
}
