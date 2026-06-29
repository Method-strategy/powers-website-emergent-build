import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Workforce Capability — Chapter 4 of the Five Disciplines.
   ║  ─────────────────────────────────────────────────────────────
   ║  Inherits the Operating Brief chassis (hero <video>, station
   ║  rows, lock-in mosaic, navy CTA) but introduces two new
   ║  primitives so the page reads as a fresh chapter rather than
   ║  a re-skin of OD / FL / ER:
   ║
   ║    • .wc-mosaic           — An asymmetric 5-tile magazine
   ║      layout for the "five interlocking capability streams"
   ║      argument. Row 1: 01 (wide) | 02 (narrow). Row 2: 03 spans
   ║      full width. Row 3: 04 (narrow) | 05 (wide). The
   ║      tessellation itself carries the "interlocking" idea
   ║      visually — fundamentally distinct from OD's vertical
   ║      stack, FL's 2x2 quadrant, ER's dual-channel.
   ║
   ║    • .wc-chevron-strip    — A horizontal 4-phase process strip
   ║      with gold ">" chevron separators between cards. Replaces
   ║      both the FL horizontal dot rail and the ER vertical
   ║      timeline — same "How We Build It" row, fresh primitive.
   ║
   ║  Reused primitives (intentional family resemblance): the
   ║  CollapseCard accordion for the cost/gain rows, the industry
   ║  research stat callout, the navy commercial-frame block, the
   ║  five-card lock-in mosaic, and the navy CTA band.
   ║
   ║  Every selector uses a `wc-` prefix so this page's variants
   ║  never collide with `od-`, `fl-`, or `er-` selectors.
   ╚══════════════════════════════════════════════════════════════════ */

const STREAMS = [
  { num: '01', name: 'Upskilling.',                          body: 'Building deeper capability in existing roles. The operator who needs to run new equipment well. The technician who needs to troubleshoot at a higher level. The specialist whose role is evolving rather than disappearing. We extend the capability your workforce already has so the people in the building can do what the operation now requires.' },
  { num: '02', name: 'Reskilling.',                          body: 'Redirecting workforce capability from disappearing roles into emerging ones. The data entry clerk moving into QA as that function automates. The traditional operator transitioning into a digitally-enabled role. We don\u2019t replace the worker. We replace the role they were doing with one the operation needs filled now.' },
  { num: '03', name: 'Foundational Capability Building.',    body: 'Root cause analysis. Problem-solving. Lean fundamentals. Continuous improvement mindset. The non-technical capabilities that let any worker, in any role, contribute beyond just executing the task in front of them. These are the skills that compound across every other discipline we build.' },
  { num: '04', name: 'Key Role Support.',                    body: 'When critical management or specialist roles sit unfilled, we provide highly-qualified interim leadership to keep the operation running while we build internal capability behind them. POWERS practitioners step into mission-critical positions. The operation doesn\u2019t lose momentum. The internal successor gets developed in parallel. By the time the interim role ends, the permanent capability is in place.' },
  { num: '05', name: 'Succession & Pipeline Development.',   body: 'Identifying the next generation of operators, technicians, supervisors, and specialists inside your existing workforce before you need them. Capturing legacy knowledge from retiring workers before it walks out the door. Building structured pathways that turn capable workers into the leadership and technical depth the operation will require five years from now.' },
];

const REFRAME_STATS = [
  { figure: '3.8M',  caption: 'U.S. manufacturing jobs projected to need filling through 2033.' },
  { figure: '1.9M',  caption: 'of those potentially unfilled if the capability gap isn\u2019t closed.' },
  { figure: '92%',   caption: 'of executives say retirements will worsen the worker shortage.' },
  { figure: '1 / 3', caption: 'of the current manufacturing workforce is already over 55.' },
  { figure: '2.5y',  caption: 'half-life of professional skills, and shrinking.' },
];

const COSTS = [
  { num: '01', name: 'Legacy knowledge walks out the door.', body: 'Industry research finds that a majority of retiring workers report sharing less than half of the knowledge needed to do their jobs with successors. As baby boomers exit, decades of operational expertise leave with them. The operation discovers the knowledge gap only when something breaks and no one in the building knows how to fix it.' },
  { num: '02', name: 'Operations can\u2019t scale.',         body: 'Scaling requires capability that can be replicated across shifts, sites, and new hires. An underdeveloped workforce produces results that depend on a small group of capable people doing extraordinary things. Take them out of the equation and the system stops working. Growth becomes a liability instead of an opportunity.' },
  { num: '03', name: 'Problem-solving collapses.',           body: 'Without foundational capability in root cause analysis and structured problem-solving, teams default to short-term fixes. The same problems recur. Recurring downtime. Recurring quality escapes. Recurring frustration. Capability deficits compound into a culture of firefighting that consumes leadership attention and productive hours.' },
  { num: '04', name: 'Turnover accelerates.',                body: 'Industry research shows employees under 25 stay with employers because of training and development opportunities, not in spite of them. When the operation underinvests in its people, the workforce votes with their feet. Manufacturing turnover is concentrated in the first 90 days, and the cause is supervisor support and skill development, not pay.' },
  { num: '05', name: 'Contractor dependency grows.',         body: 'When legacy knowledge erodes and internal capability isn\u2019t replenished, operations increasingly rely on external contractors for expertise. Contractors are expensive in emergencies, lack familiarity with the operation, and don\u2019t leave anything behind. The capability that used to be in the building becomes a recurring line item on the income statement.' },
  { num: '06', name: 'Digital investments stall.',           body: 'New equipment, new systems, new automation, all of it depends on a workforce capable of operating and improving it. An underdeveloped workforce can\u2019t absorb new technology effectively. Capital investments produce a fraction of their promised return because the people who need to run them weren\u2019t developed in parallel with the install.' },
];

const PHASES = [
  { num: '01', verb: 'Capability Assessment.',     body: 'We assess the current state of workforce capability across the operation. Skill levels mapped role-by-role and skill-by-skill in practice. Legacy knowledge inventoried. Retirement risk identified. Succession bench depth measured. Your leadership leaves the assessment with a clear quantified picture of where the capability gaps live and what it would take to close them.' },
  { num: '02', verb: 'Capability Design.',         body: 'We design the upskilling, reskilling, foundational training, and succession pathways specific to your operation. Not off-the-shelf programs. Custom-built capability paths that fit your products, your processes, your equipment, and the realities of how your workforce learns. Key Role Support is structured in parallel where critical gaps need immediate coverage.' },
  { num: '03', verb: 'Capability Build.',          body: 'We deploy practitioners directly into your operation, on every shift, to build capability with your workforce in the rhythm of execution. Hands-on coaching. Skill verification under live conditions. Structured knowledge transfer from experienced workers to emerging ones. Real problem-solving with real teams on real production issues. Capability built where it will be used.' },
  { num: '04', verb: 'Hand Off the System.',       body: 'By the time we leave, the workforce capability development engine is owned by your team. Your operations leaders are coaching your supervisors. Your supervisors are coaching their teams. Your senior workers are mentoring the next generation. Workforce Capability becomes a permanent feature of how your operation runs, not something we did for you once.' },
];

const GAINS = [
  { num: '01', name: 'Capability that compounds.',            body: 'Each year of capability investment makes the next year of investment more productive. Workers who were trained become trainers. Problem-solvers become problem-solving coaches. The capability development capability itself becomes part of how the operation runs.' },
  { num: '02', name: 'Operations that scale.',                body: 'When capability is documented, transferable, and embedded across the workforce, the operation can grow new sites, integrate acquisitions, and add capacity without performance degradation. Growth becomes a strength rather than a liability.' },
  { num: '03', name: 'Knowledge that transfers.',             body: 'Legacy knowledge gets captured and transferred before it retires. Succession bench depth builds. The next generation of operators, technicians, supervisors, and specialists is identified, developed, and ready before the role opens.' },
  { num: '04', name: 'Problem-solving in every shift.',       body: 'Foundational capability in root cause analysis, structured problem-solving, and continuous improvement is built into the workforce itself. The team identifies and resolves issues at the point of execution rather than escalating everything up. Throughput improves, recurring problems disappear, leadership attention is freed for higher-leverage work.' },
  { num: '05', name: 'Retention and pride.',                  body: 'Workers stay because they\u2019re developing. The workforce takes pride in capability they couldn\u2019t have built on their own. The operation becomes a place where people grow, which becomes a recruiting advantage in a market where most operations are bleeding talent.' },
];

const SISTER_DISCIPLINES = [
  { slug: 'operational-discipline', num: '01', name: 'Operational Discipline', caption: 'builds the system.',                                         summary: 'Without capable workers, the system holds standards no one is equipped to meet.' },
  { slug: 'frontline-leadership',   num: '02', name: 'Frontline Leadership',   caption: 'runs the system.',                                            summary: 'Without capable workers, frontline leaders manage people who can\u2019t do the work.' },
  { slug: 'equipment-reliability',  num: '03', name: 'Equipment Reliability',  caption: 'gives the operation something to run on.',                   summary: 'Without capable technicians, the maintenance practices we build can\u2019t be sustained.' },
  { slug: 'daily-accountability',   num: '05', name: 'Daily Accountability',   caption: 'makes the system visible and self-correcting.',              summary: 'Without capable workers, accountability becomes accountability for outcomes the workforce wasn\u2019t built to produce.' },
];

/* Shared CollapseCard primitive — identical visual shape as on ER,
   page-scoped `.wc-collapse-*` styles below. */
function CollapseCard({ variant, num, name, body, indexLabel, dataTestid, delayClass }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      aria-expanded={open}
      className={`wc-collapse-card wc-collapse-card--${variant} ${open ? 'is-open' : ''} wipe ${delayClass || ''}`}
      data-testid={dataTestid}
    >
      <div className="wc-collapse-head">
        <span className={`wc-collapse-idx wc-collapse-idx--${variant}`}>{indexLabel}&nbsp;{num}</span>
        <span className="wc-collapse-marks" aria-hidden="true">
          <span className={`wc-collapse-arrow wc-collapse-arrow--${variant}`} />
          <span className="wc-collapse-toggle">{open ? '\u2212' : '+'}</span>
        </span>
      </div>
      <div className="wc-collapse-name">{name}</div>
      <div className="wc-collapse-body">
        <div className="wc-collapse-body-inner">
          <p>{body}</p>
        </div>
      </div>
    </button>
  );
}

export default function WorkforceCapability() {
  useEffect(() => { document.title = 'Workforce Capability Development | POWERS'; }, []);
  const heroRef    = useRef(null); useInViewClass(heroRef);
  const reframeRef = useRef(null); useInViewClass(reframeRef, 0.20);
  const mosaicRef  = useRef(null); useInViewClass(mosaicRef, 0.16);
  const costsRef   = useRef(null); useInViewClass(costsRef, 0.16);
  const buildRef   = useRef(null); useInViewClass(buildRef, 0.18);
  const produceRef = useRef(null); useInViewClass(produceRef, 0.16);
  const lockRef    = useRef(null); useInViewClass(lockRef, 0.18);
  const ctaRef     = useRef(null); useInViewClass(ctaRef);

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>

        {/* ─── ROW 1 ─ Hero ───────────────────────────────────── */}
        <section ref={heroRef} className="brief-page-hero">
          <video
            className="brief-page-hero-bg brief-page-hero-bg--video"
            poster="/uploads/videos/workforce-capability-hero-poster.jpg"
            autoPlay muted loop playsInline preload="metadata"
            aria-hidden="true"
            data-testid="workforce-capability-hero-video"
          >
            <source src="/uploads/videos/workforce-capability-hero.webm" type="video/webm" />
            <source src="/uploads/videos/workforce-capability-hero.mp4"  type="video/mp4"  />
          </video>
          <div className="brief-page-hero-wash" aria-hidden="true" />
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>What We Build</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="wc-hero-h1">
                <span>Workforce Capability.</span>
                <span className="accent">The skilled hands the system needs.</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 56, marginBottom: 40 }} />
              <p className="brief-doc-lede wipe wipe-d4">
                The operator who runs new equipment cleanly. The technician who finds the root cause without three handoffs. The team that trains the next shift to the same standard. Workforce Capability is the discipline that builds the human capability the operation depends on. Built inside your operation. Built to stay.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ The Reframe ────────────────────────────── */}
        <section ref={reframeRef} className="brief-doc-station wc-reframe" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Reframe</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" data-testid="wc-reframe-h2">
              <span>The skilled labor shortage is real.</span>
              <span className="pivot">The capability gap inside the workforce you have is bigger.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 48 }}>
              <p>Industry projections through 2033 show U.S. manufacturers may need to fill as many as 3.8 million new jobs, with up to 1.9 million potentially going unfilled. Ninety-two percent of executives say they&rsquo;re concerned that retirements will worsen worker shortages. One-third of the current manufacturing workforce is over 55. The half-life of professional skills is shrinking to 2.5 years. Every metric the industry tracks is pointing in the same direction.</p>
            </div>

            {/* Five-figure stat ribbon — page-specific. The figures
                that anchor the reframe argument shown as serif gold
                italics in a single horizontal band, separated by
                hairline gold ticks. Wider than the 3-cell strip on
                FL so the five-stat composition reads as its own
                shape. */}
            <div className="wc-stat-ribbon wipe wipe-d4" data-testid="wc-stat-ribbon">
              <div className="wc-stat-ribbon-label">By the Numbers</div>
              <div className="wc-stat-ribbon-grid">
                {REFRAME_STATS.map((s, i) => (
                  <div key={i} className="wc-stat-ribbon-cell">
                    <div className="wc-stat-figure">{s.figure}</div>
                    <p className="wc-stat-caption">{s.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="brief-doc-body wipe wipe-d5" style={{ marginTop: 40 }}>
              <p>Every operation responds the same way. Recruit harder. Raise wages. Drop requirements. Chase candidates in a market that&rsquo;s running out of them. Meanwhile, the people already in the building stay underdeveloped. Operators trained for equipment that&rsquo;s being replaced. Technicians whose skills haven&rsquo;t kept pace with the equipment they&rsquo;re responsible for. Specialists whose deep knowledge will retire with them. Frontline workers whose ability to solve problems, train others, and lead small teams was never developed in the first place.</p>
              <p>The most accessible capability your operation has access to isn&rsquo;t at the next job fair. It&rsquo;s standing on your floor right now. It just hasn&rsquo;t been built.</p>
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d5" data-testid="wc-reframe-pullquote">
              <span className="wc-pq-mark" aria-hidden="true">&ldquo;</span>
              The capability standing on your floor today is the capability your operation will run on tomorrow.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 3 ─ What Workforce Capability Actually Is ──── */}
        <section ref={mosaicRef} className="brief-doc-station wc-streams" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What Workforce Capability Actually Is</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Built. Sustained. Renewed.</span>
              <span className="pivot">Five interlocking capability streams.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              The people side of the foundation. The skilled hands, the technical depth, the problem-solving ability, the institutional knowledge, and the leadership pipeline that determine whether the operation can produce, scale, and keep producing as conditions and people change. Five streams we build together:
            </p>

            {/* Capability Mosaic — signature primitive. 5 tiles in
                an asymmetric magazine layout: row 1 (01 wide | 02
                narrow), row 2 (03 full width), row 3 (04 narrow |
                05 wide). The tessellation itself visualises "five
                interlocking" — pieces of different shapes fitting
                together into a single foundation. */}
            <div className="wc-mosaic" data-testid="wc-mosaic-streams">
              {STREAMS.map((s, i) => (
                <article
                  key={s.num}
                  className={`wc-mosaic-tile wc-mosaic-tile--${s.num} wipe wipe-d${Math.min(5, i + 2)}`}
                  data-testid={`wc-stream-${s.num}`}
                >
                  <div className="wc-mosaic-tile-idx">STREAM&nbsp;{s.num}</div>
                  <h3 className="wc-mosaic-tile-name">{s.name}</h3>
                  <p className="wc-mosaic-tile-body">{s.body}</p>
                </article>
              ))}
            </div>

            <p className="brief-doc-lede wipe" style={{ marginTop: 48 }}>
              Upskilling and reskilling extend the capability of the people already in the building. Foundational capability building strengthens the universal skills every worker needs. Key Role Support keeps the operation running through the build. Succession planning makes sure the capability compounds across generations rather than disappearing with each retirement.
            </p>
          </div>
        </section>

        {/* ─── ROW 4 ─ The Compounding Cost ───────────────────── */}
        <section ref={costsRef} className="brief-doc-station wc-costs" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Compounding Cost</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Underdeveloped workforce.</span>
              <span className="pivot">Cost compounds in every direction.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              When workforce capability isn&rsquo;t actively built, the consequences don&rsquo;t stay contained in HR. They show up across every operational dimension the business measures.
            </p>

            <div className="wc-cost-grid" data-testid="wc-cost-grid">
              {COSTS.map((c, i) => (
                <CollapseCard
                  key={c.num}
                  variant="cost"
                  indexLabel="COST"
                  num={c.num}
                  name={c.name}
                  body={c.body}
                  dataTestid={`wc-cost-card-${c.num}`}
                  delayClass={`wipe-d${Math.min(6, i + 1)}`}
                />
              ))}
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="wc-cost-pullquote">
              <span className="wc-pq-mark" aria-hidden="true">&ldquo;</span>
              The workforce votes with their feet. Underdevelopment is the cause.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 5 ─ How We Build It ────────────────────────── */}
        <section ref={buildRef} className="brief-doc-station wc-build" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">How We Build It</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Hands-on capability building.</span>
              <span className="pivot">Inside your operation. On every shift.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              We don&rsquo;t deliver classroom training. We don&rsquo;t hand over a learning management system and walk away. Workforce Capability is built where it has to be used. On the floor, in real production conditions, with the operators, technicians, and specialists who will run the operation after we leave.
            </p>

            {/* Horizontal chevron strip — page-specific primitive.
                Four phase cards laid out in a single row with gold
                ">" chevron separators between them. Compact, left
                to right, suggests linear progression. Different
                from FL's horizontal dot rail and ER's vertical
                timeline. */}
            <ol className="wc-chevron-strip" data-testid="wc-chevron-strip">
              {PHASES.map((p, i) => (
                <React.Fragment key={p.num}>
                  <li
                    className={`wc-chevron-step wipe wipe-d${i + 2}`}
                    data-testid={`wc-phase-step-${p.num}`}
                  >
                    <div className="wc-chevron-idx">PHASE&nbsp;{p.num}</div>
                    <h3 className="wc-chevron-verb">{p.verb}</h3>
                    <p className="wc-chevron-body">{p.body}</p>
                  </li>
                  {i < PHASES.length - 1 && (
                    <span className={`wc-chevron-sep wipe wipe-d${i + 3}`} aria-hidden="true">
                      <svg viewBox="0 0 18 32" preserveAspectRatio="xMidYMid meet" width="18" height="32">
                        <path d="M2 2 L14 16 L2 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </React.Fragment>
              ))}
            </ol>

            <div className="wc-handoff wipe" data-testid="wc-handoff">
              <span className="wc-handoff-arrow" aria-hidden="true">&rarr;</span>
              <div className="wc-handoff-text">
                <div className="wc-handoff-label">The Commercial Frame</div>
                <p>
                  We get paid for capability the operation owns after we leave, not hours we logged while we were there. Engagement success is measured by what your workforce can do without us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROW 6 ─ What It Produces ───────────────────────── */}
        <section ref={produceRef} className="brief-doc-station wc-produce" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What It Produces</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Capable workforce.</span>
              <span className="pivot">Operation that scales.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              With Workforce Capability built in, the operation stops chasing labor and starts compounding capability inside the workforce it already has. The symptoms reverse themselves and the gains compound year over year.
            </p>

            <div className="wc-gain-grid" data-testid="wc-gain-grid">
              {GAINS.map((g, i) => (
                <CollapseCard
                  key={g.num}
                  variant="gain"
                  indexLabel="GAIN"
                  num={g.num}
                  name={g.name}
                  body={g.body}
                  dataTestid={`wc-gain-card-${g.num}`}
                  delayClass={`wipe-d${Math.min(5, i + 1)}`}
                />
              ))}
            </div>

            <p className="brief-doc-lede wipe" style={{ marginTop: 40 }}>
              Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered. Capability built into the workforce produces returns that compound for years after the engagement ends.
            </p>
          </div>
        </section>

        {/* ─── ROW 7 ─ Where This Discipline Locks In ─────────── */}
        <section ref={lockRef} className="brief-doc-station wc-lockin" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Where This Discipline Locks In</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Workforce Capability gives the foundation</span>
              <span className="pivot">the skilled hands it needs to perform.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Workforce Capability is the fourth of the five and the one that determines whether the rest of the foundation has the people to execute it. Without capable workers, Operational Discipline holds standards no one is equipped to meet. Frontline leaders manage workers who can&rsquo;t do the work. Reliable equipment depends on technicians who can&rsquo;t maintain it. Daily accountability becomes accountability for outcomes the workforce wasn&rsquo;t built to produce. Build them together and the foundation holds. Build any one of them alone and the operation underperforms.
            </p>

            <div className="wc-lockin-grid" data-testid="wc-lockin-grid">
              {SISTER_DISCIPLINES.slice(0, 3).map((d, i) => (
                <Link
                  key={d.slug}
                  to={`/${d.slug}`}
                  className={`wc-lockin-card wipe wipe-d${i + 3}`}
                  data-testid={`wc-lockin-link-${d.slug}`}
                >
                  <div className="wc-lockin-num">{d.num}</div>
                  <div className="wc-lockin-name">{d.name}</div>
                  <p className="wc-lockin-caption">
                    <em>{d.caption}</em> {d.summary}
                  </p>
                  <span className="wc-lockin-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              ))}

              <article
                className="wc-lockin-card wc-lockin-card--current wipe wipe-d6"
                data-testid="wc-lockin-current"
                aria-current="page"
              >
                <div className="wc-lockin-num">04</div>
                <h3 className="wc-lockin-name">Workforce Capability</h3>
                <p className="wc-lockin-caption">
                  Operators, technicians, specialists, and a leadership pipeline built inside the workforce you already have.
                </p>
              </article>

              {SISTER_DISCIPLINES.slice(3).map((d, i) => (
                <Link
                  key={d.slug}
                  to={`/${d.slug}`}
                  className={`wc-lockin-card wipe wipe-d${i + 7}`}
                  data-testid={`wc-lockin-link-${d.slug}`}
                >
                  <div className="wc-lockin-num">{d.num}</div>
                  <div className="wc-lockin-name">{d.name}</div>
                  <p className="wc-lockin-caption">
                    <em>{d.caption}</em> {d.summary}
                  </p>
                  <span className="wc-lockin-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="wc-lockin-pullquote">
              <span className="wc-pq-mark" aria-hidden="true">&ldquo;</span>
              Build them together and they interlock into something load-bearing.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 8 ─ CTA ─────────────────────────────────────── */}
        <section ref={ctaRef} className="brief-doc-station brief-doc-cta" style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>Start with the People in Your Building</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 920, alignItems: 'center', color: '#ffffff' }}>
              <span>Let&rsquo;s build the capability your workforce</span>
              <span className="pivot">already has the potential to deliver.</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
              Tell us where the operation is feeling pressure. We&rsquo;ll come see it on the floor, identify where the capability gaps are costing you, and build the workforce capability that closes them. Inside your operation. With your people.
            </p>
            <div style={{ marginTop: 36 }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid="wc-cta-contact">
                Start a Conversation <span className="brief-doc-cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 22, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)' }}>
              Looking for proof?{' '}
              <Link to="/case-studies" className="brief-inline-link brief-inline-link--on-dark" data-testid="wc-cta-cases">
                Search our case study library by industry, service type, or operational challenge &rarr;
              </Link>
            </p>
          </div>
        </section>
      </main>
      <BriefFooter />

      {/* ╔══ Page-scoped styles ════════════════════════════════════
          ║  All selectors `wc-` prefixed so this page's variants
          ║  never collide with `od-`, `fl-`, or `er-`. The mosaic
          ║  and chevron strip are the page's two signature
          ║  primitives — intentionally distinct from anything on
          ║  the earlier three discipline pages.
          ╚════════════════════════════════════════════════════════ */}
      <style>{`
        /* ── Pull quote (shared family visual) ─────────────── */
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
        .wc-pq-mark {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 1.6em;
          color: ${GOLD_BRIGHT};
          margin-right: 4px;
          line-height: 0;
          vertical-align: -0.06em;
        }

        /* ── Stat ribbon (Row 2 reframe) ───────────────────── */
        .wc-stat-ribbon {
          margin: 56px 0 0;
          padding: 32px 36px 30px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          box-shadow: 0 30px 80px -60px rgba(13, 36, 66, 0.35);
        }
        .wc-stat-ribbon-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 22px;
        }
        .wc-stat-ribbon-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          position: relative;
        }
        .wc-stat-ribbon-cell {
          padding: 6px 22px;
          border-left: 1px solid rgba(13, 36, 66, 0.10);
        }
        .wc-stat-ribbon-cell:first-child {
          padding-left: 4px;
          border-left: none;
        }
        .wc-stat-figure {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          color: ${GOLD_BRIGHT};
          font-size: clamp(32px, 3.8vw, 48px);
          line-height: 1;
          letter-spacing: -0.018em;
          margin-bottom: 10px;
        }
        .wc-stat-caption {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 13.5px;
          line-height: 1.55;
          color: ${NAVY};
        }

        /* ── Capability Mosaic (Row 3) ─────────────────────────
           5-tile asymmetric magazine layout on a 12-column grid:
              ┌────────────────────┬──────────────┐
              │  01  (cols 1–7)    │  02 (8–12)   │
              ├────────────────────┴──────────────┤
              │        03  (cols 1–12, full)      │
              ├──────────────┬────────────────────┤
              │  04 (1–5)    │  05  (cols 6–12)   │
              └──────────────┴────────────────────┘
           Row 3 mirrors row 1's column ratio (narrow / wide
           inverted), creating the signature ABA-with-reversed-A
           composition that visualises "five interlocking streams"
           — pieces of different shapes fitting together. Each
           tile keeps the same internal anatomy (index eyebrow /
           name / body) so the family feel holds while the grid
           rhythm is unique to this page. */
        .wc-mosaic {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(220px, auto);
          gap: 14px;
          margin-top: 56px;
        }
        .wc-mosaic-tile {
          position: relative;
          padding: 32px 36px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          transition: transform 220ms cubic-bezier(.2,.6,.2,1), border-color 220ms ease, box-shadow 220ms ease;
        }
        .wc-mosaic-tile:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .wc-mosaic-tile::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: ${GOLD_BRIGHT};
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .wc-mosaic-tile:hover::before { opacity: 0.7; }
        .wc-mosaic-tile--01 { grid-column: 1 / span 7;  grid-row: 1; }
        .wc-mosaic-tile--02 { grid-column: 8 / span 5;  grid-row: 1; background: ${PAPER_DEEP}; }
        .wc-mosaic-tile--03 { grid-column: 1 / span 12; grid-row: 2; }
        .wc-mosaic-tile--04 { grid-column: 1 / span 5;  grid-row: 3; background: ${PAPER_DEEP}; }
        .wc-mosaic-tile--05 { grid-column: 6 / span 7;  grid-row: 3; }
        .wc-mosaic-tile-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .wc-mosaic-tile-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(20px, 1.85vw, 23px);
          line-height: 1.22;
          color: ${NAVY};
          margin: 0 0 14px;
          letter-spacing: -0.005em;
        }
        .wc-mosaic-tile-body {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 14.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* ── Cost / Gain accordion grid (shared CollapseCard) ── */
        .wc-cost-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 56px;
          align-items: start;
        }
        .wc-gain-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-top: 56px;
          align-items: start;
        }
        .wc-collapse-card {
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
          transition: transform 220ms cubic-bezier(.2,.6,.2,1), border-color 220ms ease, box-shadow 220ms ease;
        }
        .wc-collapse-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 2px;
        }
        .wc-collapse-card--cost:hover {
          border-color: rgba(224, 101, 79, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(224, 101, 79, 0.50);
        }
        .wc-collapse-card--gain:hover {
          border-color: rgba(91, 165, 110, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(91, 165, 110, 0.55);
        }
        .wc-collapse-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .wc-collapse-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }
        .wc-collapse-idx--cost { color: #c04a37; }
        .wc-collapse-idx--gain { color: #4a7a55; }
        .wc-collapse-marks { display: inline-flex; align-items: center; gap: 10px; }
        .wc-collapse-arrow { width: 0; height: 0; }
        .wc-collapse-arrow--cost {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 9px solid rgba(224, 101, 79, 0.78);
        }
        .wc-collapse-arrow--gain {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 9px solid rgba(91, 165, 110, 0.85);
        }
        .wc-collapse-toggle {
          font-family: ${TYPE.mono};
          font-size: 16px;
          line-height: 1;
          color: ${TEXT_BODY};
          width: 18px; height: 18px;
          display: inline-flex; align-items: center; justify-content: center;
          transition: color 180ms ease, transform 220ms ease;
        }
        .wc-collapse-card--cost.is-open .wc-collapse-toggle { color: #c04a37; }
        .wc-collapse-card--gain.is-open .wc-collapse-toggle { color: #4a7a55; }
        .wc-collapse-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.3;
          color: ${NAVY};
          letter-spacing: -0.005em;
          padding-bottom: 24px;
        }
        .wc-collapse-body {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 320ms cubic-bezier(.2,.6,.2,1), opacity 240ms ease 60ms;
        }
        .wc-collapse-card.is-open .wc-collapse-body {
          max-height: 480px;
          opacity: 1;
        }
        .wc-collapse-body-inner {
          padding: 4px 0 26px;
          border-top: 1px solid rgba(13, 36, 66, 0.08);
          margin-top: 4px;
        }
        .wc-collapse-body-inner p {
          margin: 18px 0 0;
          font-family: ${TYPE.sans};
          font-size: 14.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* ── Chevron strip (Row 5) ───────────────────────────
           Four phase cards arranged horizontally with gold ">"
           chevron separators in between. Compact, left-to-right
           — different visual rhythm from FL's horizontal dot rail
           and ER's vertical timeline. */
        .wc-chevron-strip {
          list-style: none;
          padding: 0;
          margin: 56px 0 0;
          display: grid;
          grid-template-columns: 1fr 18px 1fr 18px 1fr 18px 1fr;
          gap: 0;
          align-items: stretch;
        }
        .wc-chevron-step {
          padding: 28px 28px 30px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          border-left: 3px solid ${GOLD_BRIGHT};
        }
        .wc-chevron-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .wc-chevron-verb {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(18px, 1.7vw, 21px);
          line-height: 1.22;
          color: ${NAVY};
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        .wc-chevron-body {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 14px;
          line-height: 1.55;
          color: ${TEXT_BODY};
        }
        .wc-chevron-sep {
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${GOLD_BRIGHT};
          opacity: 0.75;
        }

        /* Commercial-frame callout */
        .wc-handoff {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 24px;
          align-items: start;
          padding: 28px 32px;
          background: ${NAVY};
          border-left: 3px solid ${GOLD_BRIGHT};
        }
        .wc-handoff-arrow {
          font-size: 38px;
          line-height: 1;
          color: ${GOLD_BRIGHT};
          padding-top: 4px;
        }
        .wc-handoff-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .wc-handoff-text p {
          margin: 0;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: clamp(17px, 1.6vw, 20px);
          line-height: 1.5;
          color: #ffffff;
        }

        /* ── Lock-in mosaic (Row 7, shared family pattern) ─── */
        .wc-lockin-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-top: 56px;
        }
        .wc-lockin-card {
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
        .wc-lockin-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .wc-lockin-card--current {
          background: ${NAVY};
          color: #ffffff;
          border-color: ${NAVY};
          cursor: default;
        }
        .wc-lockin-card--current:hover {
          transform: none;
          border-color: ${NAVY};
          box-shadow: none;
        }
        .wc-lockin-card--current::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${GOLD_BRIGHT};
        }
        .wc-lockin-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .wc-lockin-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.25;
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        .wc-lockin-card--current .wc-lockin-name { font-size: 19px; color: #ffffff; }
        .wc-lockin-caption {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.55;
          color: ${TEXT_BODY};
        }
        .wc-lockin-card--current .wc-lockin-caption { color: rgba(255, 255, 255, 0.78); }
        .wc-lockin-caption em {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          color: ${NAVY};
        }
        .wc-lockin-card--current .wc-lockin-caption em { color: ${GOLD_BRIGHT}; }
        .wc-lockin-arrow {
          position: absolute;
          right: 18px; bottom: 16px;
          font-size: 18px;
          color: ${TEXT_BODY};
          opacity: 0.6;
          transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
        }
        .wc-lockin-card:hover .wc-lockin-arrow {
          color: ${GOLD_BRIGHT};
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .wc-stat-ribbon-grid   { grid-template-columns: repeat(2, 1fr); gap: 24px 0; }
          .wc-stat-ribbon-cell:nth-child(odd)  { border-left: none; padding-left: 4px; }
          .wc-stat-ribbon-cell:nth-child(even) { border-left: 1px solid rgba(13, 36, 66, 0.10); }
          .wc-mosaic             { grid-template-columns: 1fr; }
          .wc-mosaic-tile--01,
          .wc-mosaic-tile--02,
          .wc-mosaic-tile--03,
          .wc-mosaic-tile--04,
          .wc-mosaic-tile--05    { grid-column: 1 / -1; grid-row: auto; }
          .wc-cost-grid          { grid-template-columns: repeat(2, 1fr); }
          .wc-gain-grid          { grid-template-columns: repeat(2, 1fr); }
          .wc-lockin-grid        { grid-template-columns: repeat(2, 1fr); }
          .wc-chevron-strip      {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
            gap: 18px;
          }
          .wc-chevron-sep        { display: none; }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .wc-stat-ribbon-grid   { grid-template-columns: 1fr; gap: 22px; }
          .wc-stat-ribbon-cell,
          .wc-stat-ribbon-cell:nth-child(even),
          .wc-stat-ribbon-cell:nth-child(odd)  { border-left: none; padding-left: 0; }
          .wc-stat-ribbon        { padding: 24px 22px; }
          .wc-cost-grid,
          .wc-gain-grid,
          .wc-lockin-grid        { grid-template-columns: 1fr; }
          .wc-mosaic-tile        { padding: 28px 22px; }
          .wc-chevron-step       { padding: 24px 22px; }
          .wc-handoff            { grid-template-columns: 1fr; gap: 10px; padding: 24px 22px; }
          .wc-handoff-arrow      { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}
