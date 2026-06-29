import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import SEO from '../components/SEO';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Equipment Reliability — Chapter 3 of the Five Disciplines.
   ║  ─────────────────────────────────────────────────────────────
   ║  Inherits the Operating Brief chassis (hero <video>, station
   ║  rows, lock-in mosaic, navy CTA) but introduces THREE new
   ║  custom primitives so the page doesn't read like a re-skin of
   ║  /operational-discipline or /frontline-leadership:
   ║
   ║    • .er-margin-gauge   — A horizontal bar visualisation of
   ║      the maintenance-spend gap (4–6% reactive vs 1.5–2.5%
   ║      world-class) with the recoverable margin band called
   ║      out in gold. Used in the Reframe row to quantify the
   ║      financial gap before the prose argues it.
   ║
   ║    • .er-amp-duo         — A two-channel parallel diagram
   ║      (Tactical || Technical) converging on a single AMP axis.
   ║      Replaces the vertical MOS stack on /operational-
   ║      discipline. Used in "What Equipment Reliability Actually
   ║      Is" to show the dual nature of the AMP program.
   ║
   ║    • .er-phase-timeline  — A vertical numbered timeline with
   ║      a left rail, phase nodes, and gantt-style phase blocks.
   ║      Replaces the horizontal dot rail used on FL. Used in
   ║      "How We Build It" to show the three AMP phases.
   ║
   ║  Reused primitives: CollapseCard (cost + gain variants), the
   ║  cross-discipline lock-in mosaic, the navy CTA band, and the
   ║  industry-research stat callout. Every selector uses an
   ║  `er-` prefix so this page's variants never collide with the
   ║  `od-` or `fl-` selectors elsewhere.
   ╚══════════════════════════════════════════════════════════════════ */

const COSTS = [
  { num: '01', name: 'OEE collapses.',                  body: 'Availability drops as unplanned downtime accumulates. Performance falls as equipment runs below capacity. Quality suffers as worn equipment introduces variability. Every dimension of OEE is governed by maintenance, and every dimension compounds the others.' },
  { num: '02', name: 'Throughput is lost.',             body: 'Reactive maintenance reduces OEE by 10–20% in operations that run it as their dominant model. That\u2019s not a productivity loss. That\u2019s lost throughput that compounds shift after shift, week after week, in margin the operation already had the capacity to produce.' },
  { num: '03', name: 'Costs spiral.',                   body: 'Reactive maintenance costs three to five times more than planned maintenance. Premium parts spend, expedited freight, emergency labor, contractor rates. The maintenance budget grows uncontrollably even as the underlying equipment performance gets worse.' },
  { num: '04', name: 'Assets are destroyed early.',     body: 'Poor maintenance practices shorten equipment lifespan by 30–50%. Capital that should depreciate over decades gets written off years early. Replacement capital that should have been growth capital becomes catch-up capital. ROA takes a permanent hit.' },
  { num: '05', name: 'The workforce gets worn down.',   body: 'Skilled technicians spend their days firefighting instead of building capability. Frontline leaders run shifts without knowing whether the equipment will hold up. Operators learn to live with equipment that doesn\u2019t work right. Engagement drops, turnover climbs, the talent pipeline that\u2019s already thin gets thinner.' },
  { num: '06', name: 'Safety and customers erode.',     body: 'Workplace incidents rise 10–20% with poor maintenance. Late deliveries chip away at customer trust. Quality lapses reach the customer. Competitors with reliable operations pull ahead. The downstream consequences of an unreliable asset base reach every part of the business eventually.' },
];

const PHASES = [
  { num: '01', verb: 'Maintenance Performance Assessment.', body: 'We conduct a comprehensive OEE analysis across your operation, assess the current state of your maintenance management systems and processes, and rigorously evaluate the technical skill level of every maintenance team member. By the end of the assessment, your leadership has a clear, quantified picture of where the margin is hiding and what it would take to recover it.' },
  { num: '02', verb: 'Tactical and Technical Build.',       body: 'We build the MMOS, install the leadership and communication practices, and train the team on the tactical fundamentals: planning, scheduling, resource allocation, short-interval follow-up, accountability. In parallel, we deliver hands-on technical training in the four critical areas and the additional skill areas the equipment requires. Both sides built together, on the floor, under live operating conditions.' },
  { num: '03', verb: 'Embed and Hand Off.',                  body: 'We work alongside your maintenance team and frontline leadership until the new practices are habitual and the new technical capabilities are embedded. We coach the next layer of leadership to coach the team after we\u2019re gone. By the time we leave, the AMP capability is owned by your team and the maintenance operation is producing reliable equipment performance without us.' },
];

const GAINS = [
  { num: '01', name: 'Higher OEE.',                          body: 'Availability recovers as unplanned downtime drops. Performance recovers as equipment runs at capacity. Quality recovers as variability comes out of the process. Industry research shows operations that move from reactive to proactive maintenance commonly recover 10–20% of OEE that was previously lost.' },
  { num: '02', name: 'Recovered throughput.',                body: 'Capacity that already exists in your assets starts producing. No new capital investment. The throughput recovery alone often pays back the AMP engagement within the engagement window itself.' },
  { num: '03', name: 'Lower maintenance spend.',             body: 'Reactive cost converted to planned cost. Premium spend reduced. Contractor reliance reduced. The maintenance budget shrinks while equipment performance improves. The opposite of what most operations experience.' },
  { num: '04', name: 'Extended asset life.',                 body: 'Proactive maintenance extends equipment lifespan by 20–40% in industry research. Capital investments deliver the full return they were underwritten for. ROA recovers.' },
  { num: '05', name: 'A workforce that compounds.',          body: 'Skilled technicians who can hand off knowledge to the next shift. A team building capability instead of firefighting. Engagement and retention that hold against the labor market pressure the industry is operating under.' },
];

const TACTICAL = [
  'Maintenance Management Operating System (MMOS)',
  'Planning, scheduling, labor assignment',
  'Resource allocation and work cycle management',
  'CMMS and technology integration',
  'Short-interval follow-up and accountability',
  'Conflict resolution and change management',
];

const TECHNICAL = [
  'Maintenance fundamentals',
  'Mechanical concepts',
  'Electrical power',
  'Electrical control',
  'Predictive maintenance',
  'Preventive maintenance, tools, parts, lubrication',
];

const RESULTS = [
  { figure: '47%',  caption: 'productivity gains documented in POWERS engagements driven by maintenance performance improvement.' },
  { figure: '85%',  caption: 'maintenance labor utilization improvements delivered through the AMP program.' },
  { figure: '$500+', caption: 'multi-million-dollar annualized savings from maintenance performance improvement alone.' },
];

const SISTER_DISCIPLINES = [
  { slug: 'operational-discipline', num: '01', name: 'Operational Discipline', caption: 'builds the system.',                                         summary: 'Without reliable equipment, the system holds standards the operation can\u2019t actually meet.' },
  { slug: 'frontline-leadership',   num: '02', name: 'Frontline Leadership',   caption: 'runs the system.',                                            summary: 'Without reliable equipment, supervisors manage chaos instead of running shifts.' },
  { slug: 'workforce-capability',   num: '04', name: 'Workforce Capability',   caption: 'gives the system the skilled hands it needs.',               summary: 'Without reliable equipment, operators can\u2019t develop the skills the work requires because the work itself is unreliable.' },
  { slug: 'daily-accountability',   num: '05', name: 'Daily Accountability',   caption: 'makes the system visible and self-correcting every shift.',  summary: 'Without reliable equipment, accountability becomes accountability for missed targets the assets couldn\u2019t have hit.' },
];

/* Shared accordion primitive — same shape as on OD/FL, page-scoped
   styles (`er-collapse-*`) below. */
function CollapseCard({ variant, num, name, body, indexLabel, dataTestid, delayClass }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      aria-expanded={open}
      className={`er-collapse-card er-collapse-card--${variant} ${open ? 'is-open' : ''} wipe ${delayClass || ''}`}
      data-testid={dataTestid}
    >
      <div className="er-collapse-head">
        <span className={`er-collapse-idx er-collapse-idx--${variant}`}>{indexLabel}&nbsp;{num}</span>
        <span className="er-collapse-marks" aria-hidden="true">
          <span className={`er-collapse-arrow er-collapse-arrow--${variant}`} />
          <span className="er-collapse-toggle">{open ? '\u2212' : '+'}</span>
        </span>
      </div>
      <div className="er-collapse-name">{name}</div>
      <div className="er-collapse-body">
        <div className="er-collapse-body-inner">
          <p>{body}</p>
        </div>
      </div>
    </button>
  );
}

export default function EquipmentReliability() {
  const heroRef    = useRef(null); useInViewClass(heroRef);
  const reframeRef = useRef(null); useInViewClass(reframeRef, 0.20);
  const ampRef     = useRef(null); useInViewClass(ampRef, 0.16);
  const costsRef   = useRef(null); useInViewClass(costsRef, 0.16);
  const buildRef   = useRef(null); useInViewClass(buildRef, 0.18);
  const produceRef = useRef(null); useInViewClass(produceRef, 0.16);
  const lockRef    = useRef(null); useInViewClass(lockRef, 0.18);
  const ctaRef     = useRef(null); useInViewClass(ctaRef);

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <SEO
        title="Equipment Reliability & Uptime Improvement | POWERS"
        description="Eliminate the unplanned downtime that quietly eats throughput and margin. POWERS builds the reliability discipline that keeps equipment producing at planned rate."
        path="/equipment-reliability"
      />
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>

        {/* ─── ROW 1 ─ Hero ───────────────────────────────────── */}
        <section ref={heroRef} className="brief-page-hero">
          <video
            className="brief-page-hero-bg brief-page-hero-bg--video"
            poster="/uploads/videos/equipment-reliability-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            data-testid="equipment-reliability-hero-video"
          >
            <source src="/uploads/videos/equipment-reliability-hero.webm" type="video/webm" />
            <source src="/uploads/videos/equipment-reliability-hero.mp4"  type="video/mp4"  />
          </video>
          <div className="brief-page-hero-wash" aria-hidden="true" />
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>What We Build</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="er-hero-h1">
                <span>Equipment Reliability.</span>
                <span className="accent">Where uptime, throughput, and margin meet.</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 56, marginBottom: 40 }} />
              <p className="brief-doc-lede wipe wipe-d4">
                The line runs. The asset holds up under load. The next shift inherits equipment in better shape than the last shift left it. Equipment Reliability is the discipline that turns maintenance from a cost line into a margin lever, and the maintenance team from a cost center into a margin center.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ The Reframe ────────────────────────────── */}
        <section ref={reframeRef} className="brief-doc-station er-reframe" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Reframe</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" data-testid="er-reframe-h2">
              <span>Most operations spend more on reactive maintenance</span>
              <span className="pivot">than they would on the system that prevents it.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 48 }}>
              <p>Industry research shows the average manufacturing operation spends 4 to 6% of its replacement asset value on maintenance every year. World-class operations spend 1.5 to 2.5%. The gap is almost entirely explained by reactive work. The premium paid for every emergency repair, every expedited part, every overtime shift covering an unplanned breakdown.</p>
            </div>

            {/* Margin-recovery gauge — a horizontal bar that calls
                out the recoverable margin band sitting between the
                average operation (4–6% RAV) and a world-class
                operation (1.5–2.5%). New page-specific primitive. */}
            <div className="er-margin-gauge wipe wipe-d4" data-testid="er-margin-gauge">
              <div className="er-margin-gauge-label">Annual Maintenance Spend, % of Replacement Asset Value</div>
              <div className="er-margin-gauge-bar" aria-hidden="true">
                <div className="er-margin-gauge-track" />
                <div className="er-margin-gauge-band er-margin-gauge-band--worldclass" />
                <div className="er-margin-gauge-band er-margin-gauge-band--gap" />
                <div className="er-margin-gauge-band er-margin-gauge-band--reactive" />
                <div className="er-margin-gauge-tick" style={{ left: '0%' }}><span>0%</span></div>
                <div className="er-margin-gauge-tick" style={{ left: '25%' }}><span>1.5%</span></div>
                <div className="er-margin-gauge-tick" style={{ left: '42%' }}><span>2.5%</span></div>
                <div className="er-margin-gauge-tick" style={{ left: '66%' }}><span>4%</span></div>
                <div className="er-margin-gauge-tick" style={{ left: '100%' }}><span>6%</span></div>
              </div>
              <div className="er-margin-gauge-legend">
                <div className="er-margin-gauge-legend-item">
                  <span className="er-margin-gauge-chip er-margin-gauge-chip--worldclass" /> World-class operations
                  <em>1.5 – 2.5%</em>
                </div>
                <div className="er-margin-gauge-legend-item er-margin-gauge-legend-item--gap">
                  <span className="er-margin-gauge-chip er-margin-gauge-chip--gap" /> The recoverable margin
                  <em>the performance gap AMP closes</em>
                </div>
                <div className="er-margin-gauge-legend-item">
                  <span className="er-margin-gauge-chip er-margin-gauge-chip--reactive" /> Average operations
                  <em>4 – 6%</em>
                </div>
              </div>
            </div>

            {/* Supporting facts — three concise tied figures that
                quantify the cost of the reactive model. Distinct
                from FL's stat strip: smaller, hairline-bordered,
                inline rather than headline. */}
            <ul className="er-reframe-facts wipe wipe-d5" data-testid="er-reframe-facts">
              <li><strong>3 – 5&times;</strong> the cost of planned maintenance for every reactive repair.</li>
              <li><strong>10 – 20%</strong> drop in OEE in operations where reactive is the dominant model.</li>
              <li><strong>30 – 50%</strong> reduction in equipment lifespan from poor maintenance practices.</li>
            </ul>

            <div className="brief-doc-body wipe wipe-d5" style={{ marginTop: 40 }}>
              <p>Across U.S. industrial manufacturing, unplanned downtime alone runs to an estimated $50 billion a year and can cost a single high-volume operation up to $260,000 per hour. The margin is sitting on the maintenance shelf. The question is whether the operation is structured to recover it.</p>
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d5" data-testid="er-reframe-pullquote">
              <span className="er-pq-mark" aria-hidden="true">&ldquo;</span>
              The maintenance budget is the lever. Margin is what it moves.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 3 ─ What Equipment Reliability Actually Is ─── */}
        <section ref={ampRef} className="brief-doc-station er-amp" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What Equipment Reliability Actually Is</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>A complete maintenance capability.</span>
              <span className="pivot">Tactical and technical, on every shift.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Equipment Reliability isn&rsquo;t a single program. It&rsquo;s the integrated maintenance capability we build through our <strong>AMP (Advanced Maintenance Performance)</strong> Program. A complete approach that addresses both halves of the maintenance equation simultaneously.
            </p>
            <p className="brief-doc-lede wipe wipe-d3">
              Most maintenance programs work one side or the other. Tactical training without technical depth produces well-organized teams who can&rsquo;t actually fix the equipment. Technical training without tactical structure produces skilled technicians working in chaos. We build both, together, because either side alone leaves margin on the table.
            </p>

            {/* Dual-channel AMP diagram — two parallel channels
                (Tactical || Technical) running side-by-side and
                converging on a central AMP axis. Replaces the
                vertical stack diagrams used on OD/FL. */}
            <div className="er-amp-duo wipe wipe-d4" data-testid="er-amp-duo">
              <article className="er-amp-channel er-amp-channel--tactical" data-testid="er-amp-channel-tactical">
                <div className="er-amp-channel-label">Tactical Layer</div>
                <h3 className="er-amp-channel-name">The system that runs the team.</h3>
                <p className="er-amp-channel-lede">
                  We build the Maintenance Management Operating System (MMOS) that runs the team. The leadership behaviors and communication practices that make maintenance teams effective.
                </p>
                <ul className="er-amp-channel-list">
                  {TACTICAL.map((t, i) => (
                    <li key={i} className="er-amp-channel-item">
                      <span className="er-amp-channel-bullet" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <div className="er-amp-axis" aria-hidden="true">
                <span className="er-amp-axis-cap er-amp-axis-cap--top">AMP</span>
                <span className="er-amp-axis-line" />
                <span className="er-amp-axis-cap er-amp-axis-cap--bottom">PROGRAM</span>
              </div>

              <article className="er-amp-channel er-amp-channel--technical" data-testid="er-amp-channel-technical">
                <div className="er-amp-channel-label">Technical Layer</div>
                <h3 className="er-amp-channel-name">The hands-on capability the equipment requires.</h3>
                <p className="er-amp-channel-lede">
                  We assess the technical skill level of every maintenance team member and build the technical foundation the team needs to keep the asset base predictable.
                </p>
                <ul className="er-amp-channel-list">
                  {TECHNICAL.map((t, i) => (
                    <li key={i} className="er-amp-channel-item">
                      <span className="er-amp-channel-bullet" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* Workforce-gap callout — sits below the dual-channel
                diagram. Frames why the tactical+technical build
                matters: the labor market won't solve this. */}
            <aside className="er-stat-callout wipe wipe-d5" data-testid="er-amp-callout">
              <div className="er-stat-callout-label">Industry Research</div>
              <p>
                Nearly <strong>60%</strong> of the current manufacturing maintenance workforce lacks the technical skills needed to keep modern equipment performing at the level the business requires. The retiring boomer generation is taking decades of equipment-specific knowledge with them. The pipeline of new technicians is running three to five years behind demand.
              </p>
              <p>
                The tactical and technical capability we build is what closes that gap inside your operation. Not five years from now. During the engagement.
              </p>
            </aside>
          </div>
        </section>

        {/* ─── ROW 4 ─ The Compounding Cost ───────────────────── */}
        <section ref={costsRef} className="brief-doc-station er-costs" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Compounding Cost</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Weak equipment reliability shows up everywhere.</span>
              <span className="pivot">Margin gets compressed from every direction.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Equipment reliability problems don&rsquo;t stay contained in the maintenance budget. They ripple across every operational dimension the business measures, and every one shows up somewhere on the P&amp;L.
            </p>

            <div className="er-cost-grid" data-testid="er-cost-grid">
              {COSTS.map((c, i) => (
                <CollapseCard
                  key={c.num}
                  variant="cost"
                  indexLabel="COST"
                  num={c.num}
                  name={c.name}
                  body={c.body}
                  dataTestid={`er-cost-card-${c.num}`}
                  delayClass={`wipe-d${Math.min(6, i + 1)}`}
                />
              ))}
            </div>

            <aside className="er-stat-callout wipe wipe-d2" data-testid="er-cost-callout">
              <div className="er-stat-callout-label">Industry Research</div>
              <p>
                Industry research puts the annual cost of unplanned downtime in U.S. industrial manufacturing at <strong>$50 billion</strong>.
              </p>
            </aside>
          </div>
        </section>

        {/* ─── ROW 5 ─ How We Build It ────────────────────────── */}
        <section ref={buildRef} className="brief-doc-station er-build" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">How We Build It</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>We deploy AMP.</span>
              <span className="pivot">Our Advanced Maintenance Performance program.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              AMP is our complete, end-to-end maintenance capability build. We don&rsquo;t classroom-train your team and leave. We don&rsquo;t drop a CMMS implementation and call it done. We deploy senior practitioners directly into your maintenance operation, on every shift, until the tactical and technical capability is built into the team that will run it after we leave.
            </p>

            {/* Vertical phase timeline — three phases stacked
                vertically with a left rail, gold phase nodes, and
                gantt-style phase content blocks. Replaces the
                horizontal dot rail used on /frontline-leadership. */}
            <ol className="er-phase-timeline" data-testid="er-phase-timeline">
              <span className="er-phase-timeline-rail" aria-hidden="true" />
              {PHASES.map((p, i) => (
                <li
                  key={p.num}
                  className={`er-phase-step wipe wipe-d${i + 2}`}
                  data-testid={`er-phase-step-${p.num}`}
                >
                  <span className="er-phase-node" aria-hidden="true">
                    <span className="er-phase-node-num">{p.num}</span>
                  </span>
                  <div className="er-phase-content">
                    <div className="er-phase-idx">PHASE&nbsp;{p.num}</div>
                    <h3 className="er-phase-verb">{p.verb}</h3>
                    <p className="er-phase-body">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="er-handoff wipe" data-testid="er-handoff">
              <span className="er-handoff-arrow" aria-hidden="true">&rarr;</span>
              <div className="er-handoff-text">
                <div className="er-handoff-label">The Commercial Frame</div>
                <p>
                  The cost proposal is built against the savings commitment, not against billable hours. We get paid for results, measured at the financial line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROW 6 ─ What It Produces ───────────────────────── */}
        <section ref={produceRef} className="brief-doc-station er-produce" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What It Produces</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Reliable equipment.</span>
              <span className="pivot">Reclaimed margin.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              With Equipment Reliability built in, the symptoms above start reversing themselves. OEE recovers. Throughput climbs. Costs come down. Capital lasts longer. Margin returns to the bottom line.
            </p>

            <div className="er-gain-grid" data-testid="er-gain-grid">
              {GAINS.map((g, i) => (
                <CollapseCard
                  key={g.num}
                  variant="gain"
                  indexLabel="GAIN"
                  num={g.num}
                  name={g.name}
                  body={g.body}
                  dataTestid={`er-gain-card-${g.num}`}
                  delayClass={`wipe-d${Math.min(5, i + 1)}`}
                />
              ))}
            </div>

            <p className="brief-doc-lede wipe" style={{ marginTop: 40 }}>
              Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.
            </p>

            {/* Documented-results stat strip — sits below the gain
                accordions to anchor the value claim in observed
                POWERS engagement outcomes. Three large gold serif
                figures with sans-navy captions. */}
            <div className="er-results-strip wipe wipe-d2" data-testid="er-results-strip">
              <div className="er-results-strip-label">POWERS Engagements &mdash; Documented Results</div>
              <div className="er-results-strip-grid">
                {RESULTS.map((r, i) => (
                  <div key={i} className="er-results-strip-cell">
                    <div className="er-result-figure">{r.figure}</div>
                    <p className="er-result-caption">{r.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROW 7 ─ Where This Discipline Locks In ─────────── */}
        <section ref={lockRef} className="brief-doc-station er-lockin" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Where This Discipline Locks In</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Equipment Reliability gives the operation</span>
              <span className="pivot">something to run on.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Equipment Reliability is the third of the five and the one that determines whether the rest of the foundation has anything to produce with. Without reliable equipment, Operational Discipline holds standards no operation can meet. Frontline leaders manage chaos instead of running shifts. Workforce Capability can&rsquo;t develop because operators are firefighting. Daily Accountability becomes accountability for missed targets. Build them together and the foundation holds. Build any one of them alone and the operation underperforms.
            </p>

            <div className="er-mosaic" data-testid="er-mosaic">
              {/* 01 — Operational Discipline */}
              <Link
                to={`/${SISTER_DISCIPLINES[0].slug}`}
                className="er-mosaic-card wipe wipe-d3"
                data-testid={`er-mosaic-link-${SISTER_DISCIPLINES[0].slug}`}
              >
                <div className="er-mosaic-num">{SISTER_DISCIPLINES[0].num}</div>
                <div className="er-mosaic-name">{SISTER_DISCIPLINES[0].name}</div>
                <p className="er-mosaic-caption">
                  <em>{SISTER_DISCIPLINES[0].caption}</em> {SISTER_DISCIPLINES[0].summary}
                </p>
                <span className="er-mosaic-arrow" aria-hidden="true">&rarr;</span>
              </Link>

              {/* 02 — Frontline Leadership */}
              <Link
                to={`/${SISTER_DISCIPLINES[1].slug}`}
                className="er-mosaic-card wipe wipe-d4"
                data-testid={`er-mosaic-link-${SISTER_DISCIPLINES[1].slug}`}
              >
                <div className="er-mosaic-num">{SISTER_DISCIPLINES[1].num}</div>
                <div className="er-mosaic-name">{SISTER_DISCIPLINES[1].name}</div>
                <p className="er-mosaic-caption">
                  <em>{SISTER_DISCIPLINES[1].caption}</em> {SISTER_DISCIPLINES[1].summary}
                </p>
                <span className="er-mosaic-arrow" aria-hidden="true">&rarr;</span>
              </Link>

              {/* 03 — Equipment Reliability (current / anchor) */}
              <article
                className="er-mosaic-card er-mosaic-card--current wipe wipe-d5"
                data-testid="er-mosaic-current"
                aria-current="page"
              >
                <div className="er-mosaic-num">03</div>
                <h3 className="er-mosaic-name">Equipment Reliability</h3>
                <p className="er-mosaic-caption">
                  Maintenance practices, asset reliability, and the technical and tactical capability that keeps equipment producing at the level the business needs.
                </p>
              </article>

              {/* 04 — 05 sister disciplines */}
              {SISTER_DISCIPLINES.slice(2).map((d, i) => (
                <Link
                  key={d.slug}
                  to={`/${d.slug}`}
                  className={`er-mosaic-card wipe wipe-d${i + 6}`}
                  data-testid={`er-mosaic-link-${d.slug}`}
                >
                  <div className="er-mosaic-num">{d.num}</div>
                  <div className="er-mosaic-name">{d.name}</div>
                  <p className="er-mosaic-caption">
                    <em>{d.caption}</em> {d.summary}
                  </p>
                  <span className="er-mosaic-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="er-lockin-pullquote">
              <span className="er-pq-mark" aria-hidden="true">&ldquo;</span>
              Build them together and they interlock into something load-bearing.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 8 ─ CTA ─────────────────────────────────────── */}
        <section ref={ctaRef} className="brief-doc-station brief-doc-cta" style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>Recover the Margin You&rsquo;re Already Paying For</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 920, alignItems: 'center', color: '#ffffff' }}>
              <span>Let&rsquo;s build the maintenance capability</span>
              <span className="pivot">your operation actually needs.</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
              Tell us where the operation is feeling pressure. We&rsquo;ll come see it on the floor, find where the maintenance gap is costing you, and build the equipment reliability that recovers the margin you&rsquo;re already paying for.
            </p>
            <div style={{ marginTop: 36 }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid="er-cta-contact">
                Start a Conversation <span className="brief-doc-cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 22, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)' }}>
              Looking for proof?{' '}
              <Link to="/case-studies" className="brief-inline-link brief-inline-link--on-dark" data-testid="er-cta-cases">
                Search our case study library by industry, service type, or operational challenge &rarr;
              </Link>
            </p>
          </div>
        </section>
      </main>
      <BriefFooter />

      {/* ╔══ Page-scoped styles ════════════════════════════════════
          ║  Every primitive prefixed `er-` so this page's variants
          ║  never collide with the `od-` or `fl-` selectors. The
          ║  three new primitives (margin gauge, AMP duo, phase
          ║  timeline) are intentionally distinct visual systems
          ║  from anything on OD or FL.
          ╚════════════════════════════════════════════════════════ */}
      <style>{`
        /* ── Pull quote (shared visual with OD/FL) ───────────── */
        .brief-doc-pullquote {
          margin: 56px auto;
          max-width: 880px;
          padding: 32px 24px;
          text-align: center;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(22px, 2.8vw, 32px);
          line-height: 1.34;
          color: ${GOLD_BRIGHT};
          letter-spacing: -0.005em;
          border-top: 1px solid rgba(232, 147, 70, 0.42);
          border-bottom: 1px solid rgba(232, 147, 70, 0.42);
        }
        .er-pq-mark {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 1.6em;
          color: ${GOLD_BRIGHT};
          margin-right: 4px;
          line-height: 0;
          vertical-align: -0.06em;
        }

        /* ── Reframe row ─────────────────────────────────────── */

        /* Margin gauge — horizontal stacked bar that visualises the
           recoverable maintenance-spend band. Animates open from
           left as the row enters the viewport. */
        .er-margin-gauge {
          margin: 56px 0 0;
          padding: 32px 36px 28px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.08);
          box-shadow: 0 30px 80px -60px rgba(13, 36, 66, 0.35);
        }
        .er-margin-gauge-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 26px;
        }
        .er-margin-gauge-bar {
          position: relative;
          height: 36px;
          margin: 8px 0 36px;
          isolation: isolate;
        }
        .er-margin-gauge-track {
          position: absolute;
          inset: 12px 0;
          background: rgba(13, 36, 66, 0.06);
          border-radius: 2px;
        }
        .er-margin-gauge-band {
          position: absolute;
          top: 12px; bottom: 12px;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1100ms cubic-bezier(.2,.6,.2,1);
          border-radius: 2px;
        }
        .er-margin-gauge-band--worldclass {
          left: 0%; width: 42%;
          background: linear-gradient(90deg, rgba(91, 165, 110, 0.40), rgba(91, 165, 110, 0.70));
          transition-delay: 150ms;
        }
        .er-margin-gauge-band--gap {
          left: 42%; width: 24%;
          background: linear-gradient(90deg, ${GOLD_BRIGHT}, rgba(232, 147, 70, 0.55));
          transition-delay: 450ms;
        }
        .er-margin-gauge-band--reactive {
          left: 66%; width: 34%;
          background: linear-gradient(90deg, rgba(224, 101, 79, 0.55), rgba(224, 101, 79, 0.85));
          transition-delay: 750ms;
        }
        .er-reframe.is-in .er-margin-gauge-band { clip-path: inset(0 0 0 0); }
        .er-margin-gauge-tick {
          position: absolute;
          bottom: -22px;
          transform: translateX(-50%);
          font-family: ${TYPE.mono};
          font-size: 10.5px;
          letter-spacing: 0.18em;
          color: ${TEXT_BODY};
          opacity: 0.78;
          white-space: nowrap;
        }
        .er-margin-gauge-tick::before {
          content: '';
          position: absolute;
          top: -8px; left: 50%;
          width: 1px; height: 6px;
          background: rgba(13, 36, 66, 0.30);
          transform: translateX(-0.5px);
        }
        .er-margin-gauge-legend {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 22px;
          margin-top: 14px;
        }
        .er-margin-gauge-legend-item {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 8px;
          font-family: ${TYPE.sans};
          font-size: 13.5px;
          color: ${NAVY};
        }
        .er-margin-gauge-legend-item em {
          width: 100%;
          padding-left: 22px;
          font-family: ${TYPE.serif};
          font-style: italic;
          color: ${TEXT_BODY};
          font-size: 13px;
        }
        .er-margin-gauge-legend-item--gap { color: ${GOLD_BRIGHT}; font-weight: 600; }
        .er-margin-gauge-chip {
          display: inline-block;
          width: 14px; height: 10px;
          border-radius: 1px;
        }
        .er-margin-gauge-chip--worldclass { background: rgba(91, 165, 110, 0.70); }
        .er-margin-gauge-chip--gap        { background: ${GOLD_BRIGHT}; }
        .er-margin-gauge-chip--reactive   { background: rgba(224, 101, 79, 0.78); }

        /* Reframe row hairline fact list */
        .er-reframe-facts {
          margin: 40px 0 0;
          padding: 20px 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          border-top: 1px solid rgba(13, 36, 66, 0.10);
          border-bottom: 1px solid rgba(13, 36, 66, 0.10);
        }
        .er-reframe-facts li {
          font-family: ${TYPE.sans};
          font-size: 14.5px;
          line-height: 1.55;
          color: ${TEXT_BODY};
        }
        .er-reframe-facts strong {
          display: block;
          margin-bottom: 4px;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          font-size: clamp(28px, 3vw, 38px);
          line-height: 1;
          color: ${GOLD_BRIGHT};
          letter-spacing: -0.012em;
        }

        /* ── AMP duo (Row 3) ─────────────────────────────────── */
        .er-amp-duo {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 1fr 100px 1fr;
          gap: 0;
          align-items: stretch;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          box-shadow: 0 1px 0 rgba(13, 36, 66, 0.04), 0 30px 80px -60px rgba(13, 36, 66, 0.35);
          position: relative;
        }
        .er-amp-axis {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          background: ${NAVY};
          color: #ffffff;
        }
        .er-amp-axis-cap {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.32em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          padding: 4px 0;
          z-index: 1;
        }
        .er-amp-axis-line {
          position: absolute;
          top: 60px; bottom: 60px; left: 50%;
          width: 2px;
          background: ${GOLD_BRIGHT};
          opacity: 0.65;
          transform: translateX(-1px);
          clip-path: inset(100% 0 0 0);
          transition: clip-path 1100ms cubic-bezier(.2,.6,.2,1) 400ms;
        }
        .er-amp.is-in .er-amp-axis-line { clip-path: inset(0 0 0 0); }
        .er-amp-channel {
          padding: 40px 40px 44px;
          position: relative;
        }
        .er-amp-channel::before {
          content: '';
          position: absolute;
          top: 50%; height: 1px; width: 24px;
          background: ${GOLD_BRIGHT};
          opacity: 0.55;
        }
        .er-amp-channel--tactical::before  { right: -12px; }
        .er-amp-channel--technical::before { left: -12px; }
        .er-amp-channel-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.32em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .er-amp-channel-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(22px, 2.1vw, 26px);
          line-height: 1.22;
          color: ${NAVY};
          margin: 0 0 18px;
          letter-spacing: -0.005em;
        }
        .er-amp-channel-lede {
          margin: 0 0 22px;
          font-family: ${TYPE.sans};
          font-size: 15px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }
        .er-amp-channel-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .er-amp-channel-item {
          display: grid;
          grid-template-columns: 14px 1fr;
          gap: 10px;
          align-items: baseline;
          font-family: ${TYPE.sans};
          font-size: 14px;
          line-height: 1.55;
          color: ${NAVY};
        }
        .er-amp-channel-bullet {
          width: 6px; height: 6px;
          margin-top: 6px;
          background: ${GOLD_BRIGHT};
          transform: rotate(45deg);
        }

        /* ── Industry-research callout (shared) ─────────────── */
        .er-stat-callout {
          margin-top: 48px;
          padding: 28px 32px;
          background: ${PAPER};
          border-left: 3px solid ${GOLD_BRIGHT};
          max-width: 920px;
        }
        .er-costs .er-stat-callout { background: ${PAPER}; }
        .er-stat-callout-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .er-stat-callout p {
          margin: 0 0 10px;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(16px, 1.5vw, 19px);
          line-height: 1.5;
          color: ${NAVY};
        }
        .er-stat-callout p:last-child { margin-bottom: 0; }
        .er-stat-callout strong {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 600;
          color: ${GOLD_BRIGHT};
        }

        /* ── Cost / Gain accordion grid ─────────────────────── */
        .er-cost-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 56px;
          align-items: start;
        }
        .er-gain-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-top: 56px;
          align-items: start;
        }
        .er-collapse-card {
          appearance: none;
          font: inherit;
          color: inherit;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          padding: 24px 24px 0;
          margin: 0;
          width: 100%;
          text-align: left;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1),
                      border-color 220ms ease,
                      box-shadow 220ms ease;
        }
        .er-collapse-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 2px;
        }
        .er-collapse-card--cost:hover {
          border-color: rgba(224, 101, 79, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(224, 101, 79, 0.50);
        }
        .er-collapse-card--gain:hover {
          border-color: rgba(91, 165, 110, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(91, 165, 110, 0.55);
        }
        .er-collapse-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .er-collapse-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }
        .er-collapse-idx--cost { color: #c04a37; }
        .er-collapse-idx--gain { color: #4a7a55; }
        .er-collapse-marks { display: inline-flex; align-items: center; gap: 10px; }
        .er-collapse-arrow { width: 0; height: 0; }
        .er-collapse-arrow--cost {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 9px solid rgba(224, 101, 79, 0.78);
        }
        .er-collapse-arrow--gain {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 9px solid rgba(91, 165, 110, 0.85);
        }
        .er-collapse-toggle {
          font-family: ${TYPE.mono};
          font-size: 16px;
          line-height: 1;
          color: ${TEXT_BODY};
          width: 18px; height: 18px;
          display: inline-flex; align-items: center; justify-content: center;
          transition: color 180ms ease, transform 220ms ease;
        }
        .er-collapse-card--cost.is-open .er-collapse-toggle { color: #c04a37; }
        .er-collapse-card--gain.is-open .er-collapse-toggle { color: #4a7a55; }
        .er-collapse-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.3;
          color: ${NAVY};
          letter-spacing: -0.005em;
          padding-bottom: 24px;
        }
        .er-collapse-body {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 320ms cubic-bezier(.2,.6,.2,1),
                      opacity 240ms ease 60ms;
        }
        .er-collapse-card.is-open .er-collapse-body {
          max-height: 420px;
          opacity: 1;
        }
        .er-collapse-body-inner {
          padding: 4px 0 26px;
          border-top: 1px solid rgba(13, 36, 66, 0.08);
          margin-top: 4px;
        }
        .er-collapse-body-inner p {
          margin: 18px 0 0;
          font-family: ${TYPE.sans};
          font-size: 14.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* ── Phase timeline (Row 5) ─────────────────────────── */
        .er-phase-timeline {
          list-style: none;
          padding: 0;
          margin: 56px 0 0;
          position: relative;
          display: grid;
          gap: 36px;
        }
        .er-phase-timeline-rail {
          position: absolute;
          left: 28px;
          top: 28px; bottom: 28px;
          width: 2px;
          background: ${GOLD_BRIGHT};
          opacity: 0.42;
          clip-path: inset(100% 0 0 0);
          transition: clip-path 1400ms cubic-bezier(.2,.6,.2,1) 250ms;
        }
        .er-build.is-in .er-phase-timeline-rail { clip-path: inset(0 0 0 0); }
        .er-phase-step {
          display: grid;
          grid-template-columns: 92px 1fr;
          gap: 28px;
          align-items: start;
          position: relative;
        }
        .er-phase-node {
          position: relative;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: ${PAPER};
          border: 2px solid ${GOLD_BRIGHT};
          display: inline-flex;
          align-items: center; justify-content: center;
          box-shadow: 0 0 0 6px ${PAPER};
        }
        .er-phase-node-num {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          font-size: 22px;
          color: ${GOLD_BRIGHT};
          line-height: 1;
        }
        .er-phase-content {
          padding: 18px 28px 22px;
          background: ${PAPER_DEEP};
          border-left: 3px solid ${GOLD_BRIGHT};
          position: relative;
        }
        .er-phase-content::before {
          content: '';
          position: absolute;
          left: -16px; top: 28px;
          width: 13px; height: 1px;
          background: ${GOLD_BRIGHT};
          opacity: 0.55;
        }
        .er-phase-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
        }
        .er-phase-verb {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(20px, 2vw, 24px);
          line-height: 1.22;
          color: ${NAVY};
          margin: 10px 0 12px;
          letter-spacing: -0.005em;
        }
        .er-phase-body {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* Commercial-frame callout */
        .er-handoff {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 24px;
          align-items: start;
          padding: 28px 32px;
          background: ${NAVY};
          border-left: 3px solid ${GOLD_BRIGHT};
        }
        .er-handoff-arrow {
          font-size: 38px;
          line-height: 1;
          color: ${GOLD_BRIGHT};
          padding-top: 4px;
        }
        .er-handoff-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .er-handoff-text p {
          margin: 0;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: clamp(17px, 1.6vw, 20px);
          line-height: 1.5;
          color: #ffffff;
        }

        /* ── Documented-results strip (Row 6 close) ─────────── */
        .er-results-strip {
          margin: 56px 0 0;
          padding: 28px 0;
          border-top: 1px solid rgba(232, 147, 70, 0.35);
          border-bottom: 1px solid rgba(232, 147, 70, 0.35);
        }
        .er-results-strip-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .er-results-strip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .er-results-strip-cell { display: flex; flex-direction: column; gap: 8px; }
        .er-result-figure {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          color: ${GOLD_BRIGHT};
          font-size: clamp(36px, 4.4vw, 56px);
          line-height: 1;
          letter-spacing: -0.018em;
        }
        .er-result-caption {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 15px;
          line-height: 1.5;
          color: ${NAVY};
        }

        /* ── Lock-in mosaic (Row 7) ─────────────────────────── */
        .er-mosaic {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-top: 56px;
        }
        .er-mosaic-card {
          position: relative;
          display: block;
          padding: 28px 24px 30px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          color: ${NAVY};
          text-decoration: none;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1), border-color 220ms ease, box-shadow 220ms ease;
          overflow: hidden;
        }
        .er-mosaic-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .er-mosaic-card--current {
          background: ${NAVY};
          color: #ffffff;
          border-color: ${NAVY};
          cursor: default;
        }
        .er-mosaic-card--current:hover {
          transform: none;
          border-color: ${NAVY};
          box-shadow: none;
        }
        .er-mosaic-card--current::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${GOLD_BRIGHT};
        }
        .er-mosaic-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .er-mosaic-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.25;
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        .er-mosaic-card--current .er-mosaic-name { font-size: 19px; color: #ffffff; }
        .er-mosaic-caption {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.55;
          color: ${TEXT_BODY};
        }
        .er-mosaic-card--current .er-mosaic-caption { color: rgba(255, 255, 255, 0.78); }
        .er-mosaic-caption em {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          color: ${NAVY};
        }
        .er-mosaic-card--current .er-mosaic-caption em { color: ${GOLD_BRIGHT}; }
        .er-mosaic-arrow {
          position: absolute;
          right: 18px; bottom: 16px;
          font-size: 18px;
          color: ${TEXT_BODY};
          opacity: 0.6;
          transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
        }
        .er-mosaic-card:hover .er-mosaic-arrow {
          color: ${GOLD_BRIGHT};
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .er-cost-grid              { grid-template-columns: repeat(2, 1fr); }
          .er-gain-grid              { grid-template-columns: repeat(2, 1fr); }
          .er-mosaic                 { grid-template-columns: repeat(2, 1fr); }
          .er-amp-duo                { grid-template-columns: 1fr; }
          .er-amp-axis               { flex-direction: row; padding: 16px 24px; }
          .er-amp-axis-line          { top: 50%; bottom: auto; left: 80px; right: 80px; width: auto; height: 2px; transform: translateY(-1px); clip-path: inset(0 100% 0 0); }
          .er-amp.is-in .er-amp-axis-line { clip-path: inset(0 0 0 0); }
          .er-amp-channel::before    { display: none; }
          .er-margin-gauge-legend    { grid-template-columns: 1fr; gap: 14px; }
          .er-reframe-facts          { grid-template-columns: 1fr; gap: 18px; }
          .er-results-strip-grid     { grid-template-columns: 1fr; gap: 22px; }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .er-cost-grid,
          .er-gain-grid,
          .er-mosaic                 { grid-template-columns: 1fr; }
          .er-margin-gauge           { padding: 24px 22px; }
          .er-margin-gauge-tick      { font-size: 9px; letter-spacing: 0.12em; }
          .er-amp-channel            { padding: 32px 26px; }
          .er-phase-step             { grid-template-columns: 60px 1fr; gap: 18px; }
          .er-phase-node             { width: 44px; height: 44px; }
          .er-phase-node-num         { font-size: 18px; }
          .er-phase-content          { padding: 16px 22px 20px; }
          .er-phase-content::before  { display: none; }
          .er-phase-timeline-rail    { left: 22px; }
          .er-handoff                { grid-template-columns: 1fr; gap: 10px; padding: 24px 22px; }
          .er-handoff-arrow          { font-size: 28px; }
          .er-stat-callout           { padding: 24px 22px; }
        }
      `}</style>
    </div>
  );
}
