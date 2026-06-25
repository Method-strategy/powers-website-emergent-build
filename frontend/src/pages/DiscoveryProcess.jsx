import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* Discovery Process — full content rewrite (2026-02-24 client draft).
   10 rows. Internal links to /approach, /case-studies, /contact use
   React Router <Link> for SPA navigation. */

const STUDY_AREAS = [
  { num: '01', h: 'Processes.',           items: ['Bottlenecks', 'Redundancies', 'Process complexities', 'Scheduling and planning', 'Inventory control', 'Organization structure', 'System integration issues'] },
  { num: '02', h: 'Systems.',             items: ['What management operating systems exist', 'Whether they\u2019re driving the right cadence', 'Key Performance Indicators and standards', 'Whether the KPIs and standards are correct', 'Reliability systems', 'Communication flow structures'] },
  { num: '03', h: 'Tools.',               items: ['What tools the operation has in place', 'Whether they\u2019re being utilized', 'Level of understanding across the team', 'Visual management', 'Hour-by-hour tracking', 'Root cause problem solving capability'] },
  { num: '04', h: 'People and Behaviors.', items: ['Process discipline gaps', 'Human errors and rework', 'Performance variation between employees', 'Allocation of work and resources', 'Frontline supervisor and middle management capability', 'Labor coverage and capacity'] },
];

const DELIVERABLES = [
  { num: '01', h: 'Operations Studies.',                                            body: 'A complete report including the studies our practitioners conducted on the floor, plus the informal observations of operational problems, opportunities, and best practices exhibited across operations and support activities. The studies become source material for the senior leadership presentation at the end of Discovery.' },
  { num: '02', h: 'Custom Management Operating System Design.',                     body: 'Not a template. A specific operating architecture designed for your site, defining the processes, the cadence, the meeting rhythm, the visual management, and the accountability structures that produce the right output, at the right time, at the right cost. The design accounts for your products, your people, and the conditions your operation actually runs under.' },
  { num: '03', h: 'Operational Cost Profile at Full Capacity Potential.',           body: 'Based on the observed and measured behavioral and performance gaps directly correlated to the current operating system, structure, skills, and operating environment, we identify the achievable performance levels and cost profiles your site could be operating at if the architecture above were in place.' },
  { num: '04', h: 'Project Savings Commitment.',                                    body: 'The difference between your current cost baseline and the operational cost profile at full capacity potential is the Project Savings Commitment we make to your organization. Not a projection. A commercial commitment that governs how we get compensated during Implementation.' },
  { num: '05', h: 'Project Cost Proposal.',                                         body: 'Based on the Key Event Schedule, the staffing and shift structure of your site, and the sequenced roadmap, we identify the number of weeks and the number of senior practitioners required to fully implement the custom Management Operating System. The cost proposal is built against the savings commitment, not against billable hours.' },
];

export default function DiscoveryProcess() {
  useEffect(() => { document.title = 'Discovery Process | POWERS Manufacturing Consulting'; }, []);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
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
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ marginBottom: 24 }}>Discovery Process</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>The roadmap to value creation,</span>
            <span className="accent">built in two weeks.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
            A paid, two-week, defined commercial engagement. Five named deliverables. A results-based Project Savings Commitment that governs everything that follows.
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
          <div className="station-index wipe">The Starting Point</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>A defined commercial engagement.</span>
            <span className="pivot">Not a sales call.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>Most operational consulting firms offer a free assessment to win the work. We don&rsquo;t. Discovery is the work. A paid two-week engagement with senior practitioners on the floor of your operation, conducting comprehensive studies across processes, systems and tools, and people and behaviors.</p>
            <p>The deliverable isn&rsquo;t a recommendation. It&rsquo;s a quantified roadmap with five named outputs and a results-based Project Savings Commitment we stand behind during Implementation. Most clients are surprised by the magnitude of opportunity Discovery uncovers. Many are surprised that the magnitude is detailed by line item on their own P&amp;L.</p>
            <p>If after Discovery you decide not to move forward, you keep the assessment, the studies, the custom Management Operating System design, and the savings model. <em>The relationship is structured so the value is delivered before the implementation decision is made.</em></p>
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
          <div className="station-index wipe">When the Scope is Larger</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>
            <span>Multi-site Discovery.</span>
            <span className="pivot">Same architecture, larger scope.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3">
            <p>A two-week Discovery is the right scope for a single-site operation. For multi-site enterprises, PE-backed portfolios, and operations spanning multiple sites or regions, the assessment needs the time to do justice to the operating realities at each site and the architecture that has to work across all of them.</p>
            <p>Multi-site Discovery runs four to eight weeks, scaled to the number of sites in scope, the operational complexity, and the depth of the assessment your team needs to take to the board. Senior practitioners deploy across the operation in a coordinated sequence, conducting the same studies, building the same five named deliverables, and standing behind the same Project Savings Commitment that governs a standard Discovery.</p>
            <p><em>What changes is scope, not method.</em> What scales is duration, practitioner deployment, and the size of the financial opportunity surfaced. What doesn&rsquo;t change is the commercial structure. Paid engagement. Results-based ROI. Skin in the game.</p>
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
            <span>Opportunities present themselves</span>
            <span className="pivot">in four areas.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>Discovery uses proven methods to perform comprehensive studies in four areas. The same four elements that comprise the operating architecture we build during Implementation. The studies often surface chronic operating issues that have become ingrained in how the operation runs but have never been quantified, never connected to a financial cost, and never built into a roadmap for resolution.</p>
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
            <div className="week-eyebrow wipe">Week One</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              <span>Discovery Assessment.</span>
              <span className="pivot">Establishing the current state.</span>
            </h2>
          </div>
          <div>
            <div className="brief-doc-body wipe wipe-d2" style={{ marginTop: 0 }}>
              <p>Senior practitioners deploy to your site for the first week and conduct comprehensive studies across operations and the support functions that surround them. Process flows are mapped. Operating data is analyzed. Inventory, labor utilization, equipment utilization, and the management cadence are all observed under live conditions, on every shift the operation runs.</p>
              <p>The findings are documented in a workbook that becomes the foundation for the second week. By the end of week one, your team has an honest, quantified read on the operational gaps the studies surface, with the magnitude of the cost detailed by line item on your P&amp;L.</p>
            </div>
            <div className="week-output wipe wipe-d3">
              <div className="week-output-cap">Week One Output</div>
              <div className="week-output-line">Comprehensive operational studies, with formal and informal observations.</div>
              <div className="week-output-line">Magnitude of savings detailed line-by-line on the P&amp;L.</div>
              <div className="week-output-line">Results-based ROI and cash flow commitments.</div>
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
            <div className="week-eyebrow wipe">Week Two</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              <span>Roadmap and Approach.</span>
              <span className="pivot">From current state to desired future state.</span>
            </h2>
          </div>
          <div>
            <div className="brief-doc-body wipe wipe-d2" style={{ marginTop: 0 }}>
              <p>Week two is where the assessment becomes a plan. We lay out the facts and connect the dots with your team to validate what the studies surfaced. From there, we set a course of action to bridge gaps, eliminate root causes, and build the roadmap from current state to the desired future state.</p>
              <p>Your business is unique. The roadmap is custom-built to fit your operation while maintaining the values and core beliefs that drive your organization. <em>The output isn&rsquo;t a templated playbook.</em> It&rsquo;s a specific, sequenced plan for your site, with the financial commitment behind it.</p>
            </div>
            <div className="week-output on-tint wipe wipe-d3">
              <div className="week-output-cap">Week Two Output</div>
              <div className="week-output-line">Validated findings, presented to senior leadership.</div>
              <div className="week-output-line">Custom roadmap to the desired future state.</div>
              <div className="week-output-line">Approach, sequencing, and the case for moving forward.</div>
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
            <span>Five deliverables.</span>
            <span className="pivot">One financial commitment.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 720 }}>
            <p>Discovery ends with five named deliverables in your hands. They are the basis on which your team decides whether to move into Implementation, and the commercial framework that governs the engagement if you do.</p>
          </div>
        </div>
        <ol className="deliv-list">
          {DELIVERABLES.map((d, i) => (
            <li key={d.num} className="deliv-row" style={{ ['--i']: i }}>
              <div className="deliv-num">{d.num}</div>
              <div>
                <h3 className="deliv-h">{d.h}</h3>
                <p className="deliv-body">{d.body}</p>
              </div>
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
            <span>We get paid for results,</span>
            <span className="pivot">not for time.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" style={{ margin: '24px auto 0' }} />
          <div className="brief-doc-body wipe wipe-d3" style={{ margin: '28px auto 0', maxWidth: 740, color: 'rgba(255,255,255,0.82)', textAlign: 'left' }}>
            <p>The Project Savings Commitment is the foundation of the commercial relationship that follows Discovery. We earn our fee against the savings delivered, tracked weekly and reconciled against the model your team agreed to at the close of week two. If we miss the commitment, the commercial structure absorbs that. <em>The risk isn&rsquo;t transferred back to your organization.</em></p>
            <p>This isn&rsquo;t how most consulting firms structure their work. We do it this way because we&rsquo;ve done it more than 250 times across the manufacturing sectors that matter, and the structure is what allows our practitioners to do the job the way it actually needs to be done. On the floor. Under live conditions. For as long as the architecture takes to build.</p>
          </div>
        </div>
        <ol className="skin-stats wipe wipe-d4">
          <li><div className="skin-stat-num">250+</div><div className="skin-stat-cap">Projects delivered</div></li>
          <li><div className="skin-stat-num">100%</div><div className="skin-stat-cap">Measurable returns</div></li>
          <li><div className="skin-stat-num">3</div><div className="skin-stat-cap">Compensation milestones tracked weekly</div></li>
        </ol>
        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
          Annualized savings rate. ROI. Weekly cash flow.
        </p>
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
          <div className="station-index wipe">Phases Two and Three</div>
          <h2 className="brief-doc-h2 wipe wipe-d1" style={{ alignItems: 'center' }}>
            <span>Discovery is the decision point.</span>
            <span className="pivot">What follows is the engagement.</span>
          </h2>
        </div>
        <div className="phases-grid">
          <div className="phase-col wipe wipe-d2">
            <div className="phase-eyebrow">Phase 2</div>
            <h3 className="phase-h">Implementation.</h3>
            <p className="phase-body">If your team approves the Discovery findings and the Project Savings Commitment, Implementation begins. Senior practitioners deploy to your site for the duration defined by the Key Event Schedule. We work shoulder to shoulder with your frontline leaders, on every shift, under live operating conditions, until the custom Management Operating System is built, the leadership behaviors are reinforced, and the financial performance is tracking against the commitment.</p>
            <ul className="phase-list">
              <li>A defined Key Event Schedule.</li>
              <li>A specified scope of engagement.</li>
              <li>A weekly financial performance tracking methodology.</li>
              <li>A defined partnership duration.</li>
            </ul>
          </div>
          <div className="phase-col wipe wipe-d3">
            <div className="phase-eyebrow">Phase 3</div>
            <h3 className="phase-h">Evaluate ROI &amp; Savings.</h3>
            <p className="phase-body">The success of the engagement is measured against your numbers, on your P&amp;L, using the savings model your team validated at the end of Discovery. Not against fuzzy outcomes, not against activity, not against billable hours. We provide a detailed analysis of the actual ROI and savings achieved, on the cadence agreed at engagement start.</p>
            <ul className="phase-list">
              <li>Annualized savings rate</li>
              <li>ROI</li>
              <li>Weekly cash flow against the model</li>
              <li>Total project cost reconciled against savings delivered</li>
              <li>Final report on results achieved against commitment</li>
            </ul>
          </div>
        </div>
        <div className="phases-footer wipe wipe-d4">
          <p>The architecture and the durability that follows are described on the <Link to="/approach" className="brief-inline-link" data-testid="discovery-link-approach-inline">Approach</Link> page. The <Link to="/case-studies" className="brief-inline-link" data-testid="discovery-link-cases-inline">Case Studies</Link> are the evidence.</p>
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
        <div className="station-index wipe" style={{ margin: '0 auto 18px' }}>When You&rsquo;re Ready</div>
        <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 820, alignItems: 'center' }}>
          <span>A defined process.</span>
          <span className="pivot">A roadmap that pays for itself.</span>
        </h2>
        <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 24, color: TEXT_BODY, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          The conversation that leads to Discovery is shorter than Discovery itself. If your operation has reached the point where the gaps are familiar but the cost has never been quantified, the next step is a call.
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
        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 24px;
        align-items: start;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 380ms cubic-bezier(.2,.85,.25,1), transform 380ms cubic-bezier(.2,.85,.25,1);
        transition-delay: calc(420ms + var(--i, 0) * 70ms);
        padding-bottom: 28px;
        border-bottom: 1px solid rgba(13,36,66,0.10);
      }
      .deliv-row:last-child { border-bottom: 0; }
      .brief-doc-station.is-in .deliv-row { opacity: 1; transform: translateY(0); }
      @media (max-width: 720px) { .deliv-row { grid-template-columns: 1fr; gap: 8px; } }
      .deliv-num {
        font-family: ${TYPE.mono};
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 0.02em;
        color: ${GOLD_BRIGHT};
        line-height: 1;
      }
      .deliv-h {
        font-family: ${TYPE.sans};
        font-size: 19px;
        font-weight: 700;
        color: ${NAVY};
        margin: 0 0 8px;
        line-height: 1.3;
      }
      .deliv-body {
        font-family: ${TYPE.sans};
        font-size: 15px;
        font-weight: 300;
        line-height: 1.65;
        color: ${TEXT_BODY};
        margin: 0;
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
