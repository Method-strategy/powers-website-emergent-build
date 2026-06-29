import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Daily Accountability — Chapter 5 of 5 (the FINAL discipline).
   ║  ─────────────────────────────────────────────────────────────
   ║  Inherits the Operating Brief chassis but introduces this
   ║  chapter's own primitives:
   ║
   ║    • .da-cadence-loop  — 6 cadence-layer cards in a
   ║      serpentine grid: row 1 left→right (01 02 03), row 2
   ║      right→left (06 05 04), with a soft gold "return" arc
   ║      connecting the two rows. The serpentine itself reads
   ║      as the loop that closes every shift. Different from
   ║      OD's stack, FL's quadrant, ER's duo, WC's mosaic.
   ║
   ║    • .da-dps-band      — A unique product-showcase row only
   ║      this chapter has. Navy band with the DPS positioning
   ║      and four feature cards in a 2x2 grid + a "Learn more"
   ║      CTA. Visually clearly the product spotlight.
   ║
   ║  Cost row, gain row, lock-in mosaic, navy CTA all use the
   ║  shared family patterns. All selectors `da-` prefixed.
   ╚══════════════════════════════════════════════════════════════════ */

const LAYERS = [
  { num: '01', name: 'Pre-shift huddles.',           body: 'Short, structured, time-boxed. Ten to fifteen minutes at the start of every shift. The team aligns on the day\u2019s targets, reviews issues carried forward from the prior shift, and surfaces what they\u2019re walking into. Standing up, around the board, focused on what needs to happen now.' },
  { num: '02', name: 'Visual performance management.',body: 'Plan vs. actual visible from any line, in real time. Safety, quality, delivery, cost. The metrics structured so a supervisor can scan the board in seconds and know whether the shift is normal or abnormal. Green means hold the line. Red triggers the conversation.' },
  { num: '03', name: 'Tiered escalation.',           body: 'Issues route to the right level at the right speed. Tier 1 at the operator and team-lead level. Tier 2 at the supervisor level. Tier 3 at the plant manager. Tier 4 at the executive level for systemic problems. Problems move up only when they need to, and they move fast when they do.' },
  { num: '04', name: 'Short-interval follow-up.',    body: 'The hourly or sub-hourly check-ins that keep the shift on plan. Operators flag issues at the moment they appear. Supervisors verify countermeasures are working. The lag between problem and action shrinks from days to hours, from hours to minutes.' },
  { num: '05', name: 'End-of-shift wrap-ups.',       body: 'Five-minute structured handoffs between shifts. What got done. What didn\u2019t. What the incoming shift is walking into. Continuity protected across shifts and across sites. The day shift starts knowing what the night shift saw.' },
  { num: '06', name: 'KPIs that drive execution.',   body: 'First-Pass Yield. OEE. Schedule attainment. Plan vs. actual. The metrics that drive a specific action when they move, not the vanity numbers that look impressive on a quarterly report and tell the floor nothing it can act on. Leading where they matter. Lagging where they verify. Few enough that the team can actually manage them.' },
];

const DPS_FEATURES = [
  { name: 'DPS Dashboard.',                            body: 'A real-time view of your site\u2019s production performance. Dynamic dashboards refresh continuously, surfacing the metrics that matter at every level of the operation. AI-powered insights turn data into action.' },
  { name: 'Daily Schedule Control & Startup Scorecard.',body: 'Plan vs. actual at the line level, tracked and measured for repeatability and scalability. Dedicated startup scorecards covering Setup Time, Line Readiness, First-Hour Uptime, and the metrics that decide whether the shift starts strong.' },
  { name: 'Downtime Tracker & Action Item Log.',       body: 'Capture and manage downtime events the moment they happen. Track corrective actions across In-Progress, Due Today, Past Due, and Backlog states. Accountability is built in. Nothing falls through the cracks.' },
  { name: 'Built-in Messaging & Knowledge Hub.',       body: 'Direct messaging with media + voice-to-text and real-time notifications keeps the team connected across shifts and sites. A company-wide Knowledge Hub puts SOPs, equipment manuals, and announcements where the floor can find them in seconds.' },
];

const COSTS = [
  { num: '01', name: 'Performance drift goes undetected.', body: 'Standards held inconsistently. Performance variance between shifts. Equipment running below capacity. The drift compounds for days or weeks before anyone with authority to act sees it. By the time it surfaces on a quarterly review, the variance has already cost the operation hundreds of thousands of dollars in unclaimed throughput, scrap, and overtime.' },
  { num: '02', name: 'Issues recur. Costs repeat with them.', body: 'Without a structured cadence for root cause and countermeasure verification, the same problems happen again. The same quality escapes. The same downtime causes. The same customer escalations. Each recurrence is the same cost paid twice, three times, ten times.' },
  { num: '03', name: 'Tribal knowledge becomes the escalation path.', body: 'When the cadence isn\u2019t structured, issues route through whoever knows the right person to call. The supervisor who\u2019s been there twenty years gets every call. The new supervisor gets none. When the experienced supervisor retires, the institutional knowledge retires with her.' },
  { num: '04', name: 'Consultant gains evaporate.',         body: 'The gains the engagement built start eroding the moment the cadence stops running. Standards drift. Behaviors revert. Within a quarter, the operation is back toward where it was. The seven-figure improvement investment shows up on the next quarterly review as a question without an answer.' },
  { num: '05', name: 'Sites can\u2019t be compared.',       body: 'Multi-site operations without a uniform daily cadence can\u2019t benchmark across plants. Each site reports differently. Best practices don\u2019t spread. Underperforming sites stay underperforming, and the EBITDA gap between the best plant and the worst plant stays invisible to the executive team that should be closing it.' },
  { num: '06', name: 'Decisions stall. Opportunities expire.', body: 'The data the executive team needs to act lives in spreadsheets updated weekly, reports reviewed monthly, conversations that happen quarterly. The operation runs blind between reports. By the time a margin-impacting issue surfaces, the window for cost recovery is closed and the cost is permanent.' },
];

const PHASES = [
  { num: '01', verb: 'Diagnose the cadence gap.', body: 'We observe the operation under live conditions, on every shift. We map the existing meetings, visual management, escalation paths, and KPI structure. We identify where the cadence is missing, where it exists but isn\u2019t followed, and where it\u2019s followed but doesn\u2019t serve the operation it was designed for.' },
  { num: '02', verb: 'Design the daily rhythm.',  body: 'We design the pre-shift huddle structure, visual management layout, tiered escalation protocols, short-interval follow-up cadence, and end-of-shift handoff routine. Custom-built for how your operation actually runs. We integrate DPS where it accelerates the rhythm.' },
  { num: '03', verb: 'Embed it on the floor.',    body: 'We work the cadence on every shift, alongside your supervisors and operators, until the rhythm is habitual. Coaching the conversations. Verifying the escalations. Reinforcing the discipline that turns a meeting structure into a daily operating routine.' },
  { num: '04', verb: 'Hand it off.',              body: 'By the time we leave, your operations leaders are running the cadence. Your supervisors are leading the huddles. Your operators are driving the updates. The system runs without us. It keeps running because the cadence is now how the operation works, not something we did for you.' },
];

const SISTER_DISCIPLINES = [
  { slug: 'operational-discipline', num: '01', name: 'Operational Discipline', caption: 'builds the system.',                                summary: 'Without the daily cadence, the system runs without feedback and drift goes undetected until it shows up on the income statement.' },
  { slug: 'frontline-leadership',   num: '02', name: 'Frontline Leadership',   caption: 'runs the system.',                                   summary: 'The daily cadence is the rhythm frontline leaders run inside. Without it, leadership becomes reactive instead of structured.' },
  { slug: 'equipment-reliability',  num: '03', name: 'Equipment Reliability',  caption: 'gives the operation something to run on.',          summary: 'The daily cadence is how reliability gets verified shift by shift. Without it, equipment performance drifts back toward reactive.' },
  { slug: 'workforce-capability',   num: '04', name: 'Workforce Capability',   caption: 'gives the system the skilled hands.',               summary: 'The daily cadence is where capability gets reinforced, practiced, and verified. Without it, training fades.' },
];

function CollapseCard({ variant, num, name, body, indexLabel, dataTestid, delayClass }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      aria-expanded={open}
      className={`da-collapse-card da-collapse-card--${variant} ${open ? 'is-open' : ''} wipe ${delayClass || ''}`}
      data-testid={dataTestid}
    >
      <div className="da-collapse-head">
        <span className={`da-collapse-idx da-collapse-idx--${variant}`}>{indexLabel}&nbsp;{num}</span>
        <span className="da-collapse-marks" aria-hidden="true">
          <span className={`da-collapse-arrow da-collapse-arrow--${variant}`} />
          <span className="da-collapse-toggle">{open ? '\u2212' : '+'}</span>
        </span>
      </div>
      <div className="da-collapse-name">{name}</div>
      <div className="da-collapse-body">
        <div className="da-collapse-body-inner">
          <p>{body}</p>
        </div>
      </div>
    </button>
  );
}

export default function DailyAccountability() {
  useEffect(() => { document.title = 'Daily Accountability & Operating Rhythm | POWERS'; }, []);
  const heroRef    = useRef(null); useInViewClass(heroRef);
  const reframeRef = useRef(null); useInViewClass(reframeRef, 0.20);
  const loopRef    = useRef(null); useInViewClass(loopRef, 0.14);
  const dpsRef     = useRef(null); useInViewClass(dpsRef, 0.18);
  const costsRef   = useRef(null); useInViewClass(costsRef, 0.16);
  const buildRef   = useRef(null); useInViewClass(buildRef, 0.18);
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
            poster="/uploads/videos/daily-accountability-hero-poster.jpg"
            autoPlay muted loop playsInline preload="metadata"
            aria-hidden="true"
            data-testid="daily-accountability-hero-video"
          >
            <source src="/uploads/videos/daily-accountability-hero.webm" type="video/webm" />
            <source src="/uploads/videos/daily-accountability-hero.mp4"  type="video/mp4"  />
          </video>
          <div className="brief-page-hero-wash" aria-hidden="true" />
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>What We Build</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="da-hero-h1">
                <span>Daily Accountability.</span>
                <span className="accent">The cadence that closes the loop.</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 56, marginBottom: 40 }} />
              <p className="brief-doc-lede wipe wipe-d4">
                The pre-shift huddle. The plan-vs-actual review. The short-interval follow-up. The escalation when a number drifts. The end-of-shift handoff. Daily Accountability is the operating rhythm that makes the other four disciplines visible, manageable, and self-correcting every day. The cadence that turns systems and standards into measured execution.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ The Reframe ────────────────────────────── */}
        <section ref={reframeRef} className="brief-doc-station da-reframe" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Reframe</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" data-testid="da-reframe-h2">
              <span>The foundation doesn&rsquo;t sustain itself.</span>
              <span className="pivot">A daily rhythm keeps it standing.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 48 }}>
              <p>Operational Discipline builds the system. Frontline Leadership runs it on the floor. Equipment Reliability gives the operation something to run on. Workforce Capability gives it the skilled hands. Each one is essential. None of them sustains itself. Without a daily cadence that surfaces drift before it compounds, the system erodes.</p>
              <p>Standards held inconsistently from one shift to the next. Decisions delayed because the data showed up too late. Issues that should have been caught at the operator level escalate to the plant manager three days after they mattered. Performance that looked locked in during the engagement quietly degrades back to the baseline within a quarter.</p>
              <p>The cadence is what makes the foundation hold. Pre-shift huddles surface what the team is walking into. Plan-vs-actual reviews catch drift inside the hour, not at end of shift. Tiered escalation routes problems to the right level at the right speed. End-of-shift handoffs protect continuity across shifts and across sites. The rhythm runs every day, on every shift, in every operation that wants its gains to stay built.</p>
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d4" data-testid="da-reframe-pullquote">
              <span className="da-pq-mark" aria-hidden="true">&ldquo;</span>
              The gains stay where the cadence runs.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 3 ─ Cadence Loop (signature primitive) ─────── */}
        <section ref={loopRef} className="brief-doc-station da-cadence" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What Daily Accountability Actually Is</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Cadence. Metrics. Conversations.</span>
              <span className="pivot">The daily rhythm that closes the loop.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Daily Accountability is the structured operating rhythm that runs every day in every operation we build. Not a meeting cadence layered on top of the work. It&rsquo;s the way the work gets managed, shift by shift, with the disciplines we build embedded into every routine. Six interlocking layers, run in a daily loop.
            </p>

            {/* Cadence Loop — 6 cadence-layer cards in a clean
                3+2 grid reading naturally 01-02-03 across the
                top row, 04-05-06 across the bottom row. The
                closed-loop metaphor lives in the gold italic
                label below ("A daily loop, run every shift.")
                rather than serpentine reading direction or arc
                connectors — numerical clarity wins over the
                visual flourish so users can scan the layers in
                order. */}
            <div className="da-cadence-loop" data-testid="da-cadence-loop">
              <div className="da-cadence-row da-cadence-row--top">
                {LAYERS.slice(0, 3).map((l, i) => (
                  <article key={l.num} className={`da-cadence-card wipe wipe-d${i + 2}`} data-testid={`da-layer-${l.num}`}>
                    <div className="da-cadence-card-idx">LAYER&nbsp;{l.num}</div>
                    <h3 className="da-cadence-card-name">{l.name}</h3>
                    <p className="da-cadence-card-body">{l.body}</p>
                  </article>
                ))}
              </div>

              <div className="da-cadence-row da-cadence-row--bottom">
                {LAYERS.slice(3).map((l, i) => (
                  <article key={l.num} className={`da-cadence-card wipe wipe-d${i + 3}`} data-testid={`da-layer-${l.num}`}>
                    <div className="da-cadence-card-idx">LAYER&nbsp;{l.num}</div>
                    <h3 className="da-cadence-card-name">{l.name}</h3>
                    <p className="da-cadence-card-body">{l.body}</p>
                  </article>
                ))}
              </div>

              <div className="da-cadence-loop-label">
                <svg className="da-cadence-loop-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
                A daily loop, run every shift.
              </div>
            </div>

            <p className="brief-doc-lede wipe" style={{ marginTop: 48 }}>
              Together these six layers form the daily cadence. Run them with discipline and the foundation stays standing. Skip any of them and the cadence breaks down at the weakest point.
            </p>
          </div>
        </section>

        {/* ─── ROW 4 ─ The Modern Enabler: DPS ────────────────── */}
        <section ref={dpsRef} className="brief-doc-station da-dps-band" style={{ background: NAVY }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>The Modern Enabler</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
              <span>Built into the cadence.</span>
              <span className="pivot" style={{ color: GOLD_BRIGHT }}>DPS.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3" style={{ color: 'rgba(255,255,255,0.86)' }}>
              The cadence works on a whiteboard. It works better with a real-time digital system built into the rhythm. That&rsquo;s why we built <strong style={{ color: GOLD_BRIGHT, fontWeight: 700 }}>DPS</strong>, our Digital Production System. The first manufacturing operating system built by operations teams for operations teams. A next-generation platform that combines lean and continuous improvement principles with smart manufacturing technology and AI-powered insights. The right production insights, in the right hands, at the right time. Every shift.
            </p>
            <p className="brief-doc-lede wipe wipe-d4" style={{ color: 'rgba(255,255,255,0.72)', marginTop: 24 }}>
              DPS doesn&rsquo;t replace the discipline. It enables it. The pre-shift huddle still happens. The tiered escalation still routes by Tier. The KPIs still drive daily decisions. DPS makes all of it visible in real time, actionable on the floor, and consistent across every site you operate.
            </p>

            <div className="da-dps-grid" data-testid="da-dps-grid">
              {DPS_FEATURES.map((f, i) => (
                <article key={i} className={`da-dps-card wipe wipe-d${i + 3}`} data-testid={`da-dps-card-${i + 1}`}>
                  <div className="da-dps-card-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="da-dps-card-name">{f.name}</h3>
                  <p className="da-dps-card-body">{f.body}</p>
                </article>
              ))}
            </div>

            <div className="da-dps-cta-wrap wipe">
              <Link to="/dps" className="da-dps-cta" data-testid="da-dps-cta">
                Learn more about DPS <span aria-hidden="true" className="da-dps-cta-arrow">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── ROW 5 ─ The Compounding Cost ───────────────────── */}
        <section ref={costsRef} className="brief-doc-station da-costs" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Compounding Cost</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Without the daily cadence,</span>
              <span className="pivot">the system runs blind.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Daily Accountability isn&rsquo;t one of those operational practices where the absence shows up in a single dramatic failure. The absence shows up as drift. Quiet, steady, compounding degradation across every other dimension the operation depends on.
            </p>

            <div className="da-cost-grid" data-testid="da-cost-grid">
              {COSTS.map((c, i) => (
                <CollapseCard
                  key={c.num}
                  variant="cost"
                  indexLabel="COST"
                  num={c.num}
                  name={c.name}
                  body={c.body}
                  dataTestid={`da-cost-card-${c.num}`}
                  delayClass={`wipe-d${Math.min(6, i + 1)}`}
                />
              ))}
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="da-cost-pullquote">
              <span className="da-pq-mark" aria-hidden="true">&ldquo;</span>
              Without the cadence, the operation runs on the lingering effects of work that&rsquo;s already wearing off.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 6 ─ How We Build It ────────────────────────── */}
        <section ref={buildRef} className="brief-doc-station da-build" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">How We Build It</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>We install the cadence.</span>
              <span className="pivot">We embed it on the floor. We hand it off.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              We don&rsquo;t deliver a meeting template and walk away. The cadence has to be installed where it will run, with the people who will run it, until the rhythm is habitual and self-sustaining. Four phases.
            </p>

            <div className="da-phase-grid" data-testid="da-phase-grid">
              {PHASES.map((p, i) => (
                <article
                  key={p.num}
                  className={`da-phase-card wipe wipe-d${i + 2}`}
                  data-testid={`da-phase-card-${p.num}`}
                >
                  <div className="da-phase-idx">PHASE&nbsp;{p.num}</div>
                  <h3 className="da-phase-verb">{p.verb}</h3>
                  <p className="da-phase-body">{p.body}</p>
                </article>
              ))}
            </div>

            <div className="da-handoff wipe" data-testid="da-handoff">
              <span className="da-handoff-arrow" aria-hidden="true">&rarr;</span>
              <div className="da-handoff-text">
                <div className="da-handoff-label">The Commercial Frame</div>
                <p>
                  The cost proposal is built against the savings commitment. We get paid for results, measured at the financial line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROW 7 ─ Lock-in mosaic (5th is current) ────────── */}
        <section ref={lockRef} className="brief-doc-station da-lockin" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Where This Discipline Locks In</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Daily Accountability is the rhythm</span>
              <span className="pivot">that keeps the foundation standing.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Daily Accountability is the fifth of the five and the one that makes the other four sustain themselves. Without the cadence, Operational Discipline drifts. Frontline leaders manage by exception instead of by design. Equipment reliability degrades because no one&rsquo;s tracking the routines. Workforce capability stalls because development isn&rsquo;t reinforced in the daily rhythm. Build them together and the foundation holds. The foundation is now complete.
            </p>

            <div className="da-lockin-grid" data-testid="da-lockin-grid">
              {SISTER_DISCIPLINES.map((d, i) => (
                <Link
                  key={d.slug}
                  to={`/${d.slug}`}
                  className={`da-lockin-card wipe wipe-d${i + 3}`}
                  data-testid={`da-lockin-link-${d.slug}`}
                >
                  <div className="da-lockin-num">{d.num}</div>
                  <div className="da-lockin-name">{d.name}</div>
                  <p className="da-lockin-caption">
                    <em>{d.caption}</em> {d.summary}
                  </p>
                  <span className="da-lockin-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              ))}

              <article
                className="da-lockin-card da-lockin-card--current wipe wipe-d7"
                data-testid="da-lockin-current"
                aria-current="page"
              >
                <div className="da-lockin-num">05</div>
                <h3 className="da-lockin-name">Daily Accountability</h3>
                <p className="da-lockin-caption">
                  The cadence, metrics, and conversations that close the loop every shift, every day.
                </p>
              </article>
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="da-lockin-pullquote">
              <span className="da-pq-mark" aria-hidden="true">&ldquo;</span>
              Build them together and they interlock into something load-bearing. The foundation is now complete.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 8 ─ CTA ─────────────────────────────────────── */}
        <section ref={ctaRef} className="brief-doc-station brief-doc-cta" style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>Build the Cadence That Keeps the Gains</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 920, alignItems: 'center', color: '#ffffff' }}>
              <span>Let&rsquo;s install the daily rhythm</span>
              <span className="pivot">your operation needs to sustain its performance.</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
              Tell us where the operation is feeling pressure. We&rsquo;ll come see it, find where the cadence is missing or breaking down, and build the daily accountability that keeps the foundation standing.
            </p>
            <div style={{ marginTop: 36 }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid="da-cta-contact">
                Start a Conversation <span className="brief-doc-cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 22, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)' }}>
              Looking for proof?{' '}
              <Link to="/case-studies" className="brief-inline-link brief-inline-link--on-dark" data-testid="da-cta-cases">
                Search our case study library by industry, service type, or operational challenge &rarr;
              </Link>
            </p>
          </div>
        </section>
      </main>
      <BriefFooter />

      <style>{`
        /* ── Pull quote ─────────────────────────────────────── */
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
        .da-pq-mark {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 1.6em;
          color: ${GOLD_BRIGHT};
          margin-right: 4px;
          line-height: 0;
          vertical-align: -0.06em;
        }

        /* ── Cadence Loop (Row 3 signature primitive) ───────── */
        .da-cadence-loop {
          margin: 56px 0 0;
          position: relative;
        }
        .da-cadence-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          position: relative;
        }
        .da-cadence-row--top { margin-bottom: 18px; }
        .da-cadence-card {
          position: relative;
          padding: 28px 28px 30px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          transition: transform 220ms cubic-bezier(.2,.6,.2,1), border-color 220ms ease, box-shadow 220ms ease;
        }
        .da-cadence-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .da-cadence-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: ${GOLD_BRIGHT};
          opacity: 0.45;
        }
        .da-cadence-card-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .da-cadence-card-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(18px, 1.65vw, 21px);
          line-height: 1.22;
          color: ${NAVY};
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        .da-cadence-card-body {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 14px;
          line-height: 1.55;
          color: ${TEXT_BODY};
        }
        .da-cadence-loop-label {
          margin-top: 28px;
          text-align: center;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: clamp(15px, 1.4vw, 17px);
          color: ${GOLD_BRIGHT};
          display: inline-flex;
          align-items: center;
          gap: 10px;
          justify-self: center;
          width: 100%;
          justify-content: center;
        }
        .da-cadence-loop-icon {
          flex-shrink: 0;
          opacity: 0.85;
        }

        /* ── DPS Band (Row 4 — unique to DA) ─────────────────── */
        .da-dps-band .station-index { color: ${GOLD_BRIGHT}; }
        .da-dps-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        .da-dps-card {
          padding: 28px 32px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(232, 147, 70, 0.30);
          color: #ffffff;
          position: relative;
          transition: background 220ms ease, border-color 220ms ease, transform 220ms ease;
        }
        .da-dps-card:hover {
          background: rgba(232, 147, 70, 0.08);
          border-color: rgba(232, 147, 70, 0.65);
          transform: translateY(-2px);
        }
        .da-dps-card-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .da-dps-card-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(18px, 1.6vw, 20px);
          line-height: 1.22;
          color: #ffffff;
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        .da-dps-card-body {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
        }
        .da-dps-cta-wrap { margin-top: 40px; }
        .da-dps-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 26px;
          font-family: ${TYPE.mono};
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${NAVY};
          background: ${GOLD_BRIGHT};
          border: 2px solid ${GOLD_BRIGHT};
          text-decoration: none;
          transition: background 200ms ease, color 200ms ease, transform 200ms ease;
        }
        .da-dps-cta:hover {
          background: transparent;
          color: ${GOLD_BRIGHT};
          transform: translateY(-1px);
        }
        .da-dps-cta-arrow { font-size: 16px; line-height: 1; }

        /* ── Cost accordion grid ─────────────────────────────── */
        .da-cost-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 56px;
          align-items: start;
        }
        .da-collapse-card {
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
        .da-collapse-card:focus-visible { outline: 2px solid ${GOLD_BRIGHT}; outline-offset: 2px; }
        .da-collapse-card--cost:hover {
          border-color: rgba(224, 101, 79, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(224, 101, 79, 0.50);
        }
        .da-collapse-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .da-collapse-idx { font-family: ${TYPE.mono}; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; }
        .da-collapse-idx--cost { color: #c04a37; }
        .da-collapse-marks { display: inline-flex; align-items: center; gap: 10px; }
        .da-collapse-arrow { width: 0; height: 0; }
        .da-collapse-arrow--cost {
          border-left: 6px solid transparent; border-right: 6px solid transparent;
          border-top: 9px solid rgba(224, 101, 79, 0.78);
        }
        .da-collapse-toggle {
          font-family: ${TYPE.mono}; font-size: 16px; line-height: 1; color: ${TEXT_BODY};
          width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center;
          transition: color 180ms ease;
        }
        .da-collapse-card--cost.is-open .da-collapse-toggle { color: #c04a37; }
        .da-collapse-name {
          font-family: ${TYPE.sans}; font-weight: 700; font-size: 17px; line-height: 1.3;
          color: ${NAVY}; letter-spacing: -0.005em; padding-bottom: 24px;
        }
        .da-collapse-body { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 320ms cubic-bezier(.2,.6,.2,1), opacity 240ms ease 60ms; }
        .da-collapse-card.is-open .da-collapse-body { max-height: 480px; opacity: 1; }
        .da-collapse-body-inner { padding: 4px 0 26px; border-top: 1px solid rgba(13, 36, 66, 0.08); margin-top: 4px; }
        .da-collapse-body-inner p { margin: 18px 0 0; font-family: ${TYPE.sans}; font-size: 14.5px; line-height: 1.6; color: ${TEXT_BODY}; }

        /* ── Phase grid (Row 6) ─────────────────────────────── */
        .da-phase-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .da-phase-card {
          padding: 28px 28px 30px;
          background: ${PAPER_DEEP};
          border: 1px solid rgba(13, 36, 66, 0.08);
          border-top: 3px solid ${GOLD_BRIGHT};
        }
        .da-phase-idx {
          font-family: ${TYPE.mono}; font-size: 11px; letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT}; text-transform: uppercase; margin-bottom: 10px;
        }
        .da-phase-verb {
          font-family: ${TYPE.sans}; font-weight: 700; font-size: clamp(18px, 1.65vw, 21px);
          line-height: 1.22; color: ${NAVY}; margin: 0 0 12px; letter-spacing: -0.005em;
        }
        .da-phase-body { margin: 0; font-family: ${TYPE.sans}; font-size: 14px; line-height: 1.55; color: ${TEXT_BODY}; }

        .da-handoff {
          margin-top: 56px;
          display: grid; grid-template-columns: 56px 1fr; gap: 24px; align-items: start;
          padding: 28px 32px;
          background: ${NAVY}; border-left: 3px solid ${GOLD_BRIGHT};
        }
        .da-handoff-arrow { font-size: 38px; line-height: 1; color: ${GOLD_BRIGHT}; padding-top: 4px; }
        .da-handoff-label {
          font-family: ${TYPE.mono}; font-size: 11px; letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT}; text-transform: uppercase; margin-bottom: 6px;
        }
        .da-handoff-text p {
          margin: 0;
          font-family: ${TYPE.serif}; font-style: italic;
          font-size: clamp(17px, 1.6vw, 20px); line-height: 1.5; color: #ffffff;
        }

        /* ── Lock-in mosaic ─────────────────────────────────── */
        .da-lockin-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-top: 56px;
        }
        .da-lockin-card {
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
        .da-lockin-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .da-lockin-card--current {
          background: ${NAVY};
          color: #ffffff;
          border-color: ${NAVY};
          cursor: default;
        }
        .da-lockin-card--current:hover { transform: none; border-color: ${NAVY}; box-shadow: none; }
        .da-lockin-card--current::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${GOLD_BRIGHT};
        }
        .da-lockin-num {
          font-family: ${TYPE.mono}; font-size: 11px; letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT}; text-transform: uppercase; margin-bottom: 10px;
        }
        .da-lockin-name {
          font-family: ${TYPE.sans}; font-weight: 700; font-size: 17px;
          line-height: 1.25; margin: 0 0 12px; letter-spacing: -0.005em;
        }
        .da-lockin-card--current .da-lockin-name { font-size: 19px; color: #ffffff; }
        .da-lockin-caption { margin: 0; font-size: 13.5px; line-height: 1.55; color: ${TEXT_BODY}; }
        .da-lockin-card--current .da-lockin-caption { color: rgba(255, 255, 255, 0.78); }
        .da-lockin-caption em {
          font-family: ${TYPE.serif}; font-style: italic; font-weight: 400; color: ${NAVY};
        }
        .da-lockin-card--current .da-lockin-caption em { color: ${GOLD_BRIGHT}; }
        .da-lockin-arrow {
          position: absolute; right: 18px; bottom: 16px;
          font-size: 18px; color: ${TEXT_BODY}; opacity: 0.6;
          transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
        }
        .da-lockin-card:hover .da-lockin-arrow {
          color: ${GOLD_BRIGHT}; opacity: 1; transform: translateX(4px);
        }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .da-cadence-row        { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .da-cadence-row--top   { margin-bottom: 12px; }
          .da-dps-grid           { grid-template-columns: 1fr; }
          .da-cost-grid          { grid-template-columns: repeat(2, 1fr); }
          .da-phase-grid         { grid-template-columns: repeat(2, 1fr); }
          .da-lockin-grid        { grid-template-columns: repeat(2, 1fr); }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .da-cadence-row        { grid-template-columns: 1fr; }
          .da-cadence-row--top   { margin-bottom: 14px; }
          .da-cost-grid,
          .da-phase-grid,
          .da-lockin-grid        { grid-template-columns: 1fr; }
          .da-cadence-card,
          .da-phase-card,
          .da-dps-card           { padding: 24px 22px; }
          .da-handoff            { grid-template-columns: 1fr; gap: 10px; padding: 24px 22px; }
          .da-handoff-arrow      { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}
