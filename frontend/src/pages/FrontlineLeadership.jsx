import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Frontline Leadership
   ║  ─────────────────────────────────────────────────────────────
   ║  Chapter 2 of the Five Disciplines page series. Inherits the
   ║  full Operating Brief chassis established on
   ║  /operational-discipline:
   ║    1. Hero with H1 + serif-italic-gold supporting line
   ║    2. Reframe row (thesis + body + three-stat research strip)
   ║    3. "What it actually is" — four leadership capability
   ║       areas in the same stacked-blueprint visual the MOS
   ║       layers used on Op Discipline.
   ║    4. Compounding Cost — 6 collapsible cards (red ↓), plus a
   ║       new stat-callout block citing the unplanned-downtime
   ║       research figure.
   ║    5. How We Build It — 4-phase rail (Identify → Build →
   ║       Reinforce → Hand it off) + closing emphasis callout.
   ║    6. What It Produces — 5 collapsible gain cards (green ↑).
   ║    7. Lock-in mosaic — Frontline Leadership in the anchor
   ║       (02) tile, the other four disciplines as clickable
   ║       sister cards with FL-specific connection captions.
   ║    8. Canonical CTA — navy band, "Build the Leaders" eyebrow.
   ║
   ║  Every shared primitive (CollapseCard, capability stack,
   ║  build rail, mosaic, callout) carries the `fl-` prefix so
   ║  the variants on this page never collide with the `od-`
   ║  selectors from Operational Discipline. The hero <video>
   ║  uses the same .brief-page-hero-bg class and the same
   ║  CSS ghost+grit filter chain documented in BriefDocStyles.
   ╚══════════════════════════════════════════════════════════════════ */

const LEADERSHIP_CAPABILITIES = [
  { idx: 'C1', name: 'Strategic alignment.',                 body: 'Frontline leaders who understand how their shift\u2019s output connects to the operation\u2019s commercial outcomes. They translate boardroom strategy into daily decisions. They know what matters this week, this month, this quarter, and they keep their team pointed at the right priorities.' },
  { idx: 'C2', name: 'Communication and coaching.',          body: 'Clear directives. Active listening. Real-time feedback. The supervisor who can deliver a hard message without breaking the team, hold a coaching conversation without it becoming a confrontation, and listen to the operator who knows where the problem actually is.' },
  { idx: 'C3', name: 'Decision-making under pressure.',      body: 'The judgment to make a call when waiting for approval would cost the shift. Knowing when to stop a line, when to escalate, when to absorb a problem and when to surface it. Decision rights clear, decision speed fast.' },
  { idx: 'C4', name: 'Standard work and accountability.',    body: 'Frontline leaders who hold the standard with their team every shift. Who run the daily routines, document deviations, and reinforce the behaviors the operation depends on. Discipline as a leadership behavior, not just a performance metric.' },
];

const RESEARCH_STATS = [
  { figure: '~25%', caption: 'of first-time managers feel unprepared for leadership when they step into the role.' },
  { figure: '~60%', caption: 'receive no training at all when they are promoted into a supervisor position.' },
  { figure: '70%+',  caption: 'want more development and don\u2019t get it from the operation that promoted them.' },
];

const COSTS = [
  { num: '01', name: 'Throughput stalls.',         body: 'Decisions wait for the front office. Operators wait for direction. Bottlenecks form because no one on the floor has the authority or the judgment to clear them in real time.' },
  { num: '02', name: 'Quality drifts.',            body: 'Standards held inconsistently between shifts. Deviations missed because no one is enforcing the work. Defects rise. Rework hours expand. Customer escapes increase.' },
  { num: '03', name: 'Safety erodes.',             body: 'PPE rules followed when the supervisor is watching, ignored when they\u2019re not. Escalation protocols skipped under pressure. The behaviors that prevent incidents only hold when leaders model them every shift.' },
  { num: '04', name: 'Turnover climbs.',           body: 'Good operators leave. Tribal knowledge walks out the door. The cost of replacing experienced talent in a tight labor market exceeds anything an investment in frontline development would have cost.' },
  { num: '05', name: 'Change initiatives stall.',  body: 'New systems, new equipment, new processes get rolled out and never adopted because the supervisor running the shift doesn\u2019t have the change-management skill to bring the team along.' },
  { num: '06', name: 'Performance plateaus.',      body: 'Improvement initiatives launched from corporate die on the floor. The strategy deck and the execution diverge. The gap between intent and outcome compounds, quarter over quarter.' },
];

const BUILD_PHASES = [
  { num: '01', verb: 'Identify the gaps.',     body: 'We observe the leadership behaviors that already exist. We see how supervisors run a shift, manage a problem, hold a standard, communicate with their team. We identify the specific capability gaps that are costing the operation throughput, quality, safety, or engagement.' },
  { num: '02', verb: 'Build the skills.',      body: 'We coach supervisors directly in the moments that matter. The pre-shift huddle. The mid-shift problem. The end-of-shift handoff. The performance conversation. Skills get built in the situation that requires them, not in a classroom abstracted from the floor.' },
  { num: '03', verb: 'Reinforce the behaviors.', body: 'We work alongside the supervisor for the time it takes for the new behavior to become habit. Day after day, shift after shift, until the practice runs without prompting. Coaching, feedback, and accountability in the rhythm of execution.' },
  { num: '04', verb: 'Hand it off.',           body: 'We coach the next layer of leadership to coach the supervisors after we\u2019re gone. The plant manager, the operations director, the senior team. The system has to sustain itself. The frontline leadership capability has to stay built without us.' },
];

const GAINS = [
  { num: '01', name: 'Higher productivity.',     body: 'Industry research on operations that invest in frontline development consistently shows productivity gains in the high-double-digits. Our engagements regularly produce results above that baseline.' },
  { num: '02', name: 'Lower turnover.',          body: 'Operators stay because their supervisor is competent. Tribal knowledge stays in the building. The cost of replacing skilled labor in a tight market drops by an order of magnitude when frontline leadership holds.' },
  { num: '03', name: 'Faster decisions.',        body: 'Supervisors with clear decision rights and the judgment to use them remove the bottleneck of every operational decision routing through the front office. Throughput accelerates.' },
  { num: '04', name: 'Stronger safety culture.', body: 'Safety behaviors hold because leaders model them every shift. Incident rates fall. The cost of safety incidents \u2014 regulatory, reputational, human \u2014 doesn\u2019t hit the P&amp;L.' },
  { num: '05', name: 'Sustained improvement.',   body: 'Change initiatives stick because frontline leaders bring their teams through them. New systems get adopted. New processes get embedded. The gap between strategy and execution closes.' },
];

const SISTER_DISCIPLINES = [
  { slug: 'operational-discipline', num: '01', name: 'Operational Discipline',  caption: 'builds the system.',                            summary: 'Without frontline leaders capable of running it, the standards on paper don\u2019t translate to standards in practice.' },
  { slug: 'equipment-reliability',  num: '03', name: 'Equipment Reliability',   caption: 'gives the operation something to run on.',     summary: 'Frontline leaders enforce the maintenance practices that keep the asset base predictable.' },
  { slug: 'workforce-capability',   num: '04', name: 'Workforce Capability',    caption: 'develops in operators',                         summary: 'when their supervisor is capable of training, coaching, and holding standards with discipline.' },
  { slug: 'daily-accountability',   num: '05', name: 'Daily Accountability',    caption: 'lives or dies through frontline leadership behavior.', summary: 'Without leaders to run the cadence and close the loop, the system runs blind.' },
];

/* CollapseCard — shared accordion primitive for the Costs and
   Gains sections. Same component shape as Operational Discipline;
   styles below are page-scoped (`fl-collapse-*`) so the two pages
   never collide on selector matching even though the visual
   grammar is identical. */
function CollapseCard({ variant, num, name, body, indexLabel, dataTestid, delayClass }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      aria-expanded={open}
      className={`fl-collapse-card fl-collapse-card--${variant} ${open ? 'is-open' : ''} wipe ${delayClass || ''}`}
      data-testid={dataTestid}
    >
      <div className="fl-collapse-head">
        <span className={`fl-collapse-idx fl-collapse-idx--${variant}`}>{indexLabel}&nbsp;{num}</span>
        <span className="fl-collapse-marks" aria-hidden="true">
          <span className={`fl-collapse-arrow fl-collapse-arrow--${variant}`} />
          <span className="fl-collapse-toggle">{open ? '\u2212' : '+'}</span>
        </span>
      </div>
      <div className="fl-collapse-name">{name}</div>
      <div className="fl-collapse-body">
        <div className="fl-collapse-body-inner">
          <p>{body}</p>
        </div>
      </div>
    </button>
  );
}

export default function FrontlineLeadership() {
  useEffect(() => { document.title = 'Frontline Leadership Development for Manufacturers | POWERS'; }, []);
  const heroRef    = useRef(null); useInViewClass(heroRef);
  const reframeRef = useRef(null); useInViewClass(reframeRef, 0.20);
  const capRef     = useRef(null); useInViewClass(capRef, 0.18);
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
            poster="/uploads/videos/frontline-leadership-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            data-testid="frontline-leadership-hero-video"
          >
            <source src="/uploads/videos/frontline-leadership-hero.webm" type="video/webm" />
            <source src="/uploads/videos/frontline-leadership-hero.mp4"  type="video/mp4"  />
          </video>
          <div className="brief-page-hero-wash" aria-hidden="true" />
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>What We Build</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="fl-hero-h1">
                <span>Frontline Leadership.</span>
              </h1>
              <p className="fl-hero-sub wipe wipe-d2" data-testid="fl-hero-sub">
                The most consequential role in your operation. Where value is won or lost.
              </p>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 56, marginBottom: 40 }} />
              <p className="brief-doc-lede wipe wipe-d4">
                Supervisors who can plan a shift, run a problem to ground, and hold the standard with their team. The frontline leader is the closest layer of management to the work itself, and the layer through which every operational outcome eventually flows. Without capable frontline leadership, the system underneath has no one to run it on the floor.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ The Reframe ────────────────────────────── */}
        <section ref={reframeRef} className="brief-doc-station fl-reframe" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Reframe</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" data-testid="fl-reframe-h2">
              <span>Promoted on technical skill.</span>
              <span className="pivot">Left untrained as a leader.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 48 }}>
              <p>Walk into most underperforming operations and the frontline leadership story is the same. The supervisor was the best operator on the line. The best welder, the best machinist, the best assembler. Promoted on the strength of individual performance, handed a team, and expected to lead with no training, no coaching, and no operating model to follow.</p>
              <p>Technical excellence on the shop floor doesn&rsquo;t automatically translate to leadership capability. The skills that make someone an outstanding operator differ completely from those needed to manage a team of operators. The most consequential role in the operation gets the least preparation.</p>
            </div>

            {/* Research stat strip — three findings that quantify
                the gap the row's narrative is making. Sits between
                the body and the closing pull quote. Visual: three
                large gold serif numerals with sans-navy captions. */}
            <div className="fl-stat-strip wipe wipe-d4" data-testid="fl-stat-strip">
              <div className="fl-stat-strip-label">Industry Research</div>
              <div className="fl-stat-strip-grid">
                {RESEARCH_STATS.map((s, i) => (
                  <div key={i} className="fl-stat-strip-cell">
                    <div className="fl-stat-figure">{s.figure}</div>
                    <p className="fl-stat-caption">{s.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="brief-doc-body wipe wipe-d5" style={{ marginTop: 48 }}>
              <p>The consequences flow downstream every shift. Good employees leave. Not for higher compensation. They leave because poor supervision makes work frustrating and demoralizing. The talent shortage your operation is wrestling with is partly an external labor market problem and partly a self-inflicted one. Trained frontline leaders retain the workforce you have. Untrained ones drive that workforce out the door.</p>
              <p>Frontline Leadership isn&rsquo;t a soft investment. It&rsquo;s the highest-leverage operational decision in the building.</p>
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d5" data-testid="fl-reframe-pullquote">
              <span className="fl-pq-mark" aria-hidden="true">&ldquo;</span>
              Teams watch what their leaders do, not what they say.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 3 ─ What Frontline Leadership Actually Is ──── */}
        <section ref={capRef} className="brief-doc-station fl-cap" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What Frontline Leadership Actually Is</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>The bridge between boardroom strategy</span>
              <span className="pivot">and shop floor execution.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Frontline Leadership is the operational capability we build in supervisors, team leads, and shift managers so they can run their part of the operation with discipline, judgment, and confidence. It is not a training program. It is a daily practice that becomes how the operation gets run. It shows up across four areas of leadership capability we build directly into your supervisors:
            </p>

            <div className="fl-cap-stack" data-testid="fl-cap-stack">
              {LEADERSHIP_CAPABILITIES.map((c, i) => (
                <article
                  key={c.idx}
                  className={`fl-cap-layer wipe wipe-d${Math.min(4, i + 3)}`}
                  data-testid={`fl-cap-layer-${c.idx.toLowerCase()}`}
                >
                  <div className="fl-cap-layer-idx">{c.idx}</div>
                  <div className="fl-cap-layer-body">
                    <div className="fl-cap-layer-name">{c.name}</div>
                    <p>{c.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="brief-doc-lede wipe wipe-d5" style={{ marginTop: 40 }}>
              These four capabilities aren&rsquo;t personality traits. They are skills that can be developed, behaviors that can be reinforced, and practices that can be embedded into how a supervisor runs every shift.
            </p>
          </div>
        </section>

        {/* ─── ROW 4 ─ The Compounding Cost ───────────────────── */}
        <section ref={costsRef} className="brief-doc-station fl-costs" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Compounding Cost</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Without trained frontline leaders,</span>
              <span className="pivot">every operational dimension suffers.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Underprepared supervisors don&rsquo;t just create one isolated problem. They create a cascading pattern that compounds across the operation. Every shift the leadership gap stays open, the cost shows up somewhere on the P&amp;L.
            </p>

            <div className="fl-cost-grid" data-testid="fl-cost-grid">
              {COSTS.map((c, i) => (
                <CollapseCard
                  key={c.num}
                  variant="cost"
                  indexLabel="COST"
                  num={c.num}
                  name={c.name}
                  body={c.body}
                  dataTestid={`fl-cost-card-${c.num}`}
                  delayClass={`wipe-d${Math.min(6, i + 1)}`}
                />
              ))}
            </div>

            {/* Industry-research stat callout — sits below the
                cost grid. Distinct visual from a pull quote: cited
                fact, mono "INDUSTRY RESEARCH" label, italic body.
                Same visual family as the .fl-handoff callout used
                in the next row. */}
            <aside className="fl-stat-callout wipe wipe-d2" data-testid="fl-cost-callout">
              <div className="fl-stat-callout-label">Industry Research</div>
              <p>
                Communication failures and supervisory issues cause more unplanned downtime in manufacturing operations than equipment failures.
              </p>
            </aside>
          </div>
        </section>

        {/* ─── ROW 5 ─ How We Build It ────────────────────────── */}
        <section ref={buildRef} className="brief-doc-station fl-build" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">How We Build It</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>On the floor.</span>
              <span className="pivot">Shoulder to shoulder.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              We don&rsquo;t run classroom training. We don&rsquo;t deliver four-hour modules over Zoom. We don&rsquo;t hand out playbooks. Frontline Leadership is built where it has to live, on the floor, on every shift, in real conversations with real supervisors leading real teams under real conditions. Our build process moves through four phases that turn capable operators into capable leaders, and capable leaders into the people who run the operation after we leave:
            </p>

            <ol className="fl-build-rail" data-testid="fl-build-rail">
              <span className="fl-build-rail-line" aria-hidden="true" />
              {BUILD_PHASES.map((s, i) => (
                <li
                  key={s.num}
                  className={`fl-build-step wipe wipe-d${i + 2}`}
                  data-testid={`fl-build-step-${s.num}`}
                >
                  <span className="fl-build-step-node" aria-hidden="true" />
                  <div className="fl-build-step-idx">PHASE&nbsp;{s.num}</div>
                  <h3 className="fl-build-step-verb">{s.verb}</h3>
                  <p className="fl-build-step-body">{s.body}</p>
                </li>
              ))}
            </ol>

            {/* Closing emphasis callout — same visual treatment as
                the cross-discipline hand-off on /operational-
                discipline, but on this page the arrow points at
                the conceptual distinction (training vs practice),
                not at the next discipline. */}
            <div className="fl-handoff wipe" data-testid="fl-handoff">
              <span className="fl-handoff-arrow" aria-hidden="true">&rarr;</span>
              <div className="fl-handoff-text">
                <div className="fl-handoff-label">The Difference</div>
                <p>
                  That last point is the difference between a leadership development program and what we do. Classroom training teaches skills. We embed practices. Skills walk out the door when the individual leaves. Practices become how the operation runs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROW 6 ─ What You Gain ──────────────────────────── */}
        <section ref={produceRef} className="brief-doc-station fl-produce" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What You Gain</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Build capable frontline leaders.</span>
              <span className="pivot">The operation runs differently.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              With trained frontline leaders in place, the operational symptoms above start reversing themselves. Not because the workforce changed. Because the people running the workforce now have the capability to run it.
            </p>

            <div className="fl-gain-grid" data-testid="fl-gain-grid">
              {GAINS.map((g, i) => (
                <CollapseCard
                  key={g.num}
                  variant="gain"
                  indexLabel="GAIN"
                  num={g.num}
                  name={g.name}
                  body={g.body}
                  dataTestid={`fl-gain-card-${g.num}`}
                  delayClass={`wipe-d${Math.min(5, i + 1)}`}
                />
              ))}
            </div>

            <p className="brief-doc-lede wipe" style={{ marginTop: 40 }}>
              Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.
            </p>
          </div>
        </section>

        {/* ─── ROW 7 ─ Where This Discipline Locks In ─────────── */}
        <section ref={lockRef} className="brief-doc-station fl-lockin" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Where This Discipline Locks In</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Frontline Leadership runs the system</span>
              <span className="pivot">the other four disciplines depend on.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Frontline Leadership is the second of the five and the one that runs every other discipline on the floor. Without capable leaders, Operational Discipline drifts. Equipment Reliability slips. Workforce Capability stalls. Daily Accountability breaks down. Build them together and the foundation holds. Build any one of them alone and the operation underperforms.
            </p>

            <div className="fl-mosaic" data-testid="fl-mosaic">
              {/* 01 — Operational Discipline (clickable) */}
              <Link
                to={`/${SISTER_DISCIPLINES[0].slug}`}
                className="fl-mosaic-card wipe wipe-d3"
                data-testid={`fl-mosaic-link-${SISTER_DISCIPLINES[0].slug}`}
              >
                <div className="fl-mosaic-num">{SISTER_DISCIPLINES[0].num}</div>
                <div className="fl-mosaic-name">{SISTER_DISCIPLINES[0].name}</div>
                <p className="fl-mosaic-caption">
                  <em>{SISTER_DISCIPLINES[0].caption}</em> {SISTER_DISCIPLINES[0].summary}
                </p>
                <span className="fl-mosaic-arrow" aria-hidden="true">&rarr;</span>
              </Link>

              {/* 02 — Frontline Leadership (current / anchor) */}
              <article
                className="fl-mosaic-card fl-mosaic-card--current wipe wipe-d4"
                data-testid="fl-mosaic-current"
                aria-current="page"
              >
                <div className="fl-mosaic-num">02</div>
                <h3 className="fl-mosaic-name">Frontline Leadership</h3>
                <p className="fl-mosaic-caption">
                  Supervisors who plan shifts, coach teams, run problems to ground, and hold the standard every day.
                </p>
              </article>

              {/* 03 — 05 sister disciplines (clickable) */}
              {SISTER_DISCIPLINES.slice(1).map((d, i) => (
                <Link
                  key={d.slug}
                  to={`/${d.slug}`}
                  className={`fl-mosaic-card wipe wipe-d${i + 5}`}
                  data-testid={`fl-mosaic-link-${d.slug}`}
                >
                  <div className="fl-mosaic-num">{d.num}</div>
                  <div className="fl-mosaic-name">{d.name}</div>
                  <p className="fl-mosaic-caption">
                    <em>{d.caption}</em> {d.summary}
                  </p>
                  <span className="fl-mosaic-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="fl-lockin-pullquote">
              <span className="fl-pq-mark" aria-hidden="true">&ldquo;</span>
              Build them together and they interlock into something load-bearing.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 8 ─ CTA ─────────────────────────────────────── */}
        <section ref={ctaRef} className="brief-doc-station brief-doc-cta" style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>Build the Leaders</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 920, alignItems: 'center', color: '#ffffff' }}>
              <span>Let&rsquo;s build the frontline leaders</span>
              <span className="pivot">your operation needs.</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
              Tell us where the operation is feeling pressure. We&rsquo;ll come see it on the floor, identify where the leadership gap is costing you, and build the frontline capability that closes it.
            </p>
            <div style={{ marginTop: 36 }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid="fl-cta-contact">
                Start a Conversation <span className="brief-doc-cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 22, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)' }}>
              Looking for proof?{' '}
              <Link to="/case-studies" className="brief-inline-link brief-inline-link--on-dark" data-testid="fl-cta-cases">
                Search our case study library by industry, service type, or operational challenge &rarr;
              </Link>
            </p>
          </div>
        </section>
      </main>
      <BriefFooter />

      {/* ╔══ Page-scoped styles ════════════════════════════════════
          ║  Every primitive prefixed `fl-` so this page's variants
          ║  never collide with the `od-` styles on /operational-
          ║  discipline. The visual grammar is intentionally
          ║  identical so the two pages read as chapters of the
          ║  same document, but the selectors stay scoped.
          ╚════════════════════════════════════════════════════════ */}
      <style>{`
        /* ── Hero supporting line ─────────────────────────────── */
        .fl-hero-sub {
          margin: 12px 0 0;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          color: ${GOLD_BRIGHT};
          font-size: clamp(22px, 2.4vw, 32px);
          line-height: 1.2;
          letter-spacing: -0.005em;
        }

        /* ── Pull quote ──────────────────────────────────────── */
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
        .fl-pq-mark {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 1.6em;
          color: ${GOLD_BRIGHT};
          margin-right: 4px;
          line-height: 0;
          vertical-align: -0.06em;
        }

        /* ── Research stat strip (Row 2) ───────────────────────
           Three large gold serif figures with caption beneath
           each. Sits between the body paragraphs in the Reframe
           row to quantify the leadership-gap narrative. */
        .fl-stat-strip {
          margin: 56px 0 0;
          padding: 28px 0;
          border-top: 1px solid rgba(232, 147, 70, 0.35);
          border-bottom: 1px solid rgba(232, 147, 70, 0.35);
        }
        .fl-stat-strip-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .fl-stat-strip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .fl-stat-strip-cell {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .fl-stat-figure {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          color: ${GOLD_BRIGHT};
          font-size: clamp(36px, 4.4vw, 56px);
          line-height: 1;
          letter-spacing: -0.018em;
        }
        .fl-stat-caption {
          margin: 0;
          font-family: ${TYPE.sans};
          font-weight: 400;
          font-size: 15px;
          line-height: 1.5;
          color: ${NAVY};
        }

        /* ── Capability stack (Row 3) ──────────────────────────
           Same stacked-blueprint visual as the MOS layers on
           /operational-discipline. Four horizontal slabs, hairline
           gold rules between, mono index left + name + body
           right. Hover reveals a 3px gold left edge. */
        .fl-cap-stack {
          margin-top: 56px;
          border: 1px solid rgba(13, 36, 66, 0.12);
          background: ${PAPER};
          box-shadow: 0 1px 0 rgba(13, 36, 66, 0.04), 0 30px 80px -60px rgba(13, 36, 66, 0.35);
        }
        .fl-cap-layer {
          display: grid;
          grid-template-columns: 112px 1fr;
          gap: 32px;
          align-items: start;
          padding: 36px 40px;
          border-bottom: 1px solid rgba(232, 147, 70, 0.30);
          position: relative;
        }
        .fl-cap-layer:last-child { border-bottom: none; }
        .fl-cap-layer::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: ${GOLD_BRIGHT};
          opacity: 0.0;
          transition: opacity 240ms ease;
        }
        .fl-cap-layer:hover::before { opacity: 1; }
        .fl-cap-layer-idx {
          font-family: ${TYPE.mono};
          font-size: 13px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          padding-top: 6px;
        }
        .fl-cap-layer-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(22px, 2.1vw, 28px);
          line-height: 1.2;
          color: ${NAVY};
          margin-bottom: 12px;
          letter-spacing: -0.005em;
        }
        .fl-cap-layer-body p {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 16px;
          line-height: 1.65;
          color: ${TEXT_BODY};
        }

        /* ── Cost / Gain accordion grid (Rows 4 + 6) ──────────
           Shared CollapseCard primitive. Click to expand body.
           Red ↓ on costs, green ↑ on gains. */
        .fl-cost-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 56px;
          align-items: start;
        }
        .fl-gain-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-top: 56px;
          align-items: start;
        }
        .fl-collapse-card {
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
        .fl-collapse-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 2px;
        }
        .fl-collapse-card--cost:hover {
          border-color: rgba(224, 101, 79, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(224, 101, 79, 0.50);
        }
        .fl-collapse-card--gain:hover {
          border-color: rgba(91, 165, 110, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(91, 165, 110, 0.55);
        }
        .fl-collapse-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .fl-collapse-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }
        .fl-collapse-idx--cost { color: #c04a37; }
        .fl-collapse-idx--gain { color: #4a7a55; }
        .fl-collapse-marks {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .fl-collapse-arrow {
          width: 0; height: 0;
        }
        .fl-collapse-arrow--cost {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 9px solid rgba(224, 101, 79, 0.78);
        }
        .fl-collapse-arrow--gain {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 9px solid rgba(91, 165, 110, 0.85);
        }
        .fl-collapse-toggle {
          font-family: ${TYPE.mono};
          font-size: 16px;
          line-height: 1;
          color: ${TEXT_BODY};
          width: 18px; height: 18px;
          display: inline-flex;
          align-items: center; justify-content: center;
          transition: color 180ms ease, transform 220ms ease;
        }
        .fl-collapse-card--cost.is-open .fl-collapse-toggle { color: #c04a37; }
        .fl-collapse-card--gain.is-open .fl-collapse-toggle { color: #4a7a55; }
        .fl-collapse-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.3;
          color: ${NAVY};
          letter-spacing: -0.005em;
          padding-bottom: 24px;
        }
        .fl-collapse-body {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 320ms cubic-bezier(.2,.6,.2,1),
                      opacity 240ms ease 60ms;
        }
        .fl-collapse-card.is-open .fl-collapse-body {
          max-height: 360px;
          opacity: 1;
        }
        .fl-collapse-body-inner {
          padding: 4px 0 26px;
          border-top: 1px solid rgba(13, 36, 66, 0.08);
          margin-top: 4px;
        }
        .fl-collapse-body-inner p {
          margin: 18px 0 0;
          font-family: ${TYPE.sans};
          font-size: 14.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* ── Industry-research stat callout (Row 4) ──────────── */
        .fl-stat-callout {
          margin-top: 48px;
          padding: 28px 32px;
          background: ${PAPER};
          border-left: 3px solid ${GOLD_BRIGHT};
          max-width: 920px;
        }
        .fl-stat-callout-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .fl-stat-callout p {
          margin: 0;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(17px, 1.6vw, 20px);
          line-height: 1.45;
          color: ${NAVY};
        }

        /* ── Build phase rail (Row 5) ──────────────────────── */
        .fl-build-rail {
          list-style: none;
          padding: 0;
          margin: 64px 0 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          position: relative;
        }
        .fl-build-rail-line {
          position: absolute;
          left: 0; right: 0;
          top: 14px;
          height: 1px;
          background: ${GOLD_BRIGHT};
          opacity: 0.45;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1400ms cubic-bezier(.2,.6,.2,1) 250ms;
        }
        .fl-build.is-in .fl-build-rail-line { clip-path: inset(0 0 0 0); }
        .fl-build-step { position: relative; padding-top: 36px; }
        .fl-build-step-node {
          position: absolute;
          left: 0; top: 8px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: ${PAPER};
          border: 2px solid ${GOLD_BRIGHT};
          box-shadow: 0 0 0 4px ${PAPER};
        }
        .fl-build-step-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
        }
        .fl-build-step-verb {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 20px;
          line-height: 1.25;
          color: ${NAVY};
          margin: 10px 0;
          letter-spacing: -0.005em;
        }
        .fl-build-step-body {
          margin: 0;
          font-size: 14.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* ── Emphasis callout (Row 5 closer) ─────────────────── */
        .fl-handoff {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 24px;
          align-items: start;
          padding: 28px 32px;
          background: ${PAPER_DEEP};
          border-left: 3px solid ${GOLD_BRIGHT};
        }
        .fl-handoff-arrow {
          font-size: 38px;
          line-height: 1;
          color: ${GOLD_BRIGHT};
          padding-top: 4px;
        }
        .fl-handoff-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .fl-handoff-text p {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: ${NAVY};
        }

        /* ── Lock-in mosaic (Row 7) ──────────────────────────── */
        .fl-mosaic {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-top: 56px;
        }
        .fl-mosaic-card {
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
        .fl-mosaic-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .fl-mosaic-card--current {
          background: ${NAVY};
          color: #ffffff;
          border-color: ${NAVY};
          cursor: default;
        }
        .fl-mosaic-card--current:hover {
          transform: none;
          border-color: ${NAVY};
          box-shadow: none;
        }
        .fl-mosaic-card--current::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${GOLD_BRIGHT};
        }
        .fl-mosaic-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .fl-mosaic-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.25;
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        .fl-mosaic-card--current .fl-mosaic-name {
          font-size: 19px;
          color: #ffffff;
        }
        .fl-mosaic-caption {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.55;
          color: ${TEXT_BODY};
        }
        .fl-mosaic-card--current .fl-mosaic-caption {
          color: rgba(255, 255, 255, 0.78);
        }
        .fl-mosaic-caption em {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          color: ${NAVY};
        }
        .fl-mosaic-arrow {
          position: absolute;
          right: 18px; bottom: 16px;
          font-size: 18px;
          color: ${TEXT_BODY};
          opacity: 0.6;
          transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
        }
        .fl-mosaic-card:hover .fl-mosaic-arrow {
          color: ${GOLD_BRIGHT};
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .fl-cost-grid    { grid-template-columns: repeat(2, 1fr); }
          .fl-gain-grid    { grid-template-columns: repeat(2, 1fr); }
          .fl-mosaic       { grid-template-columns: repeat(2, 1fr); }
          .fl-build-rail   { grid-template-columns: repeat(2, 1fr); gap: 40px 32px; }
          .fl-build-rail-line { display: none; }
          .fl-stat-strip-grid { grid-template-columns: 1fr; gap: 22px; }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .fl-cap-layer    { grid-template-columns: 1fr; gap: 12px; padding: 28px 22px; }
          .fl-cap-layer-idx { padding-top: 0; }
          .fl-cost-grid,
          .fl-gain-grid,
          .fl-mosaic,
          .fl-build-rail   { grid-template-columns: 1fr; }
          .fl-handoff      { grid-template-columns: 1fr; gap: 8px; padding: 24px 22px; }
          .fl-handoff-arrow { font-size: 28px; }
          .fl-stat-callout { padding: 24px 22px; }
        }
      `}</style>
    </div>
  );
}
