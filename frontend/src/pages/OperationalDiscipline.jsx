import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Operational Discipline
   ║  ─────────────────────────────────────────────────────────────
   ║  This is the page the Operational Discipline card on the
   ║  homepage links to. It carries the rhetorical core of the
   ║  POWERS sales argument (the people-problem-vs-system-problem
   ║  reframe in Row 2) and acts as the template the four sister
   ║  disciplines will follow once their copy lands.
   ║
   ║  Eight-row narrative, each beat with its own design move:
   ║   1. Hero       — discipline name + supporting line in italic gold
   ║   2. Reframe    — animated strikethrough on "people problem",
   ║                   write-in on "system problem". The page's
   ║                   thesis statement, rendered as a typographic
   ║                   moment, not a paragraph.
   ║   3. MOS Stack  — four-layer stacked blueprint of the
   ║                   Management Operating System (Standards /
   ║                   Routines / Cadence / Visual Management).
   ║                   Layers animate in bottom-up so the structure
   ║                   appears to assemble as the user reads it.
   ║   4. Costs      — six failure modes as red ↓ cards, staggered
   ║                   entrance. Echoes the homepage red "Pressures"
   ║                   rain. Closes with the "ten different
   ║                   symptoms" pull quote.
   ║   5. Build      — four-step horizontal process (Diagnose →
   ║                   Co-design → Embed → Reinforce) with a gold
   ║                   connector line that draws left-to-right.
   ║                   Ends in the hand-off-to-Frontline-Leadership
   ║                   forward arrow callout.
   ║   6. Produces   — five outcomes as green ↑ cards, mirroring
   ║                   the cost cascade's grammar in reverse colour
   ║                   and direction. The visual pairing is the
   ║                   page's payoff.
   ║   7. Lock-in    — five-discipline mosaic (Op Discipline +
   ║                   the four sisters as equal siblings). The
   ║                   current discipline is visually distinguished
   ║                   without going literal on the backbone
   ║                   metaphor; the other four are clickable.
   ║                   Closes with the "load-bearing" pull quote.
   ║   8. CTA        — canonical navy band, matches the grammar of
   ║                   /industries-served + /leadership/:slug.
   ║
   ║  All visual primitives inherit from BriefDocStyles; only the
   ║  page-specific scoped CSS lives in the <style> block at the
   ║  bottom of this file. Every reusable beat (.od-reframe,
   ║  .od-mos-layer, .od-cost-card, .od-build-step, .od-outcome-card,
   ║  .od-mosaic-card) is named with a hard-prefix so the four
   ║  remaining discipline pages can lift the patterns directly
   ║  without selector collisions.
   ╚══════════════════════════════════════════════════════════════════ */

const SISTER_DISCIPLINES = [
  { slug: 'frontline-leadership',  num: '02', name: 'Frontline Leadership',  caption: 'runs the system on the floor.',                       summary: 'Without leaders to hold the standard with their teams, routines drift the moment we leave.' },
  { slug: 'equipment-reliability', num: '03', name: 'Equipment Reliability', caption: 'gives the system something to run on.',                summary: 'Without reliable uptime, the best operating system in the world produces no output.' },
  { slug: 'workforce-capability',  num: '04', name: 'Workforce Capability',  caption: 'gives the system the skilled hands it needs.',         summary: 'Without them, the standards on paper don\u2019t translate to standards in practice.' },
  { slug: 'daily-accountability',  num: '05', name: 'Daily Accountability',  caption: 'makes the system visible and self-correcting every shift.', summary: 'Without it, drift goes undetected until it shows up on the income statement.' },
];

const MOS_LAYERS = [
  { idx: 'L1', name: 'Standards',             body: 'Documented expectations for how the work gets done. Standard operating procedures, work instructions, quality requirements, safety protocols. Not binders that sit on a shelf. The actual reference the floor runs by.' },
  { idx: 'L2', name: 'Routines',              body: 'Daily production meetings, plan vs. actual reviews, tiered escalation, layered accountability. The recurring operating practices that make performance visible, manageable, and self-correcting.' },
  { idx: 'L3', name: 'Cadence',               body: 'The rhythm of structured communication and decision-making. Daily huddles. Weekly business reviews. Monthly operational reviews. The drumbeat that ties the floor to the plant to the executive team in real time.' },
  { idx: 'L4', name: 'Visual Management',     body: 'Standards made visible. Performance made visible. Drift made visible. The visual triggers and controls at every workstation that let an operator assess in seconds whether the operation is running to standard.' },
  { idx: 'L5', name: 'Financial Discipline',  body: 'AR/AP forensic analysis and operating cash recovery. AI-enhanced review of accounts receivable and accounts payable to find the cash that\u2019s already yours but isn\u2019t on the balance sheet yet. The financial layer of operational discipline. Cash that funds the rest of the work.' },
  { idx: 'L6', name: 'Supply Chain Discipline', body: 'Demand planning, procurement, logistics, inventory, distribution, and risk management as disciplined operating practices, not departmental silos. The same discipline that holds execution on the floor, applied to the flow of goods, materials, and information into and out of the operation.' },
];

const COSTS = [
  { num: '01', name: 'Efficiency erodes.', body: 'Bottlenecks become unpredictable. Inventory swings between extremes. Procurement runs reactive. Capacity sits unused on one line while another runs overtime. The operation produces less than it could with the same resources.' },
  { num: '02', name: 'Quality drifts.',    body: 'Without standard work and consistent process control, variation creeps in. Defects rise. Rework hours expand. Customer escapes increase. The cost shows up on the income statement long after the root cause showed up on the floor.' },
  { num: '03', name: 'Decisions stall.',   body: 'Without a structured decision-making cadence, calls don\u2019t get made. Or they get made by the wrong person at the wrong level with incomplete information. Minutes of decision delay turn into hours of downtime.' },
  { num: '04', name: 'Costs climb.',       body: 'Reactive maintenance. Overtime to cover slack. Expedited freight. Premium spend on rush parts. Every category of avoidable cost expands when the underlying system isn\u2019t holding execution together.' },
  { num: '05', name: 'Scaling stalls.',    body: 'Operations that depend on individual effort don\u2019t replicate cleanly. The second site doesn\u2019t perform like the first. The acquisition doesn\u2019t integrate. The growth thesis depends on operational discipline the platform doesn\u2019t have.' },
  { num: '06', name: 'Engagement drops.',  body: 'Working in chaos burns people out. Frontline leaders become firefighters. Operators stop flagging problems because flagging them doesn\u2019t produce solutions. Turnover increases. Tribal knowledge walks out the door.' },
  { num: '07', name: 'Cash leaks.',        body: 'AR sitting uncollected. AP overpaid. Supply chain costs absorbing margin that should have been protected. The financial dimensions of operational discipline get treated as someone else\u2019s problem until the operating cash dries up.' },
];

const BUILD_STEPS = [
  { num: '01', verb: 'Diagnose the gaps.',          body: 'We observe the operation under live conditions, on every shift. We map the existing routines, standards, and cadence. We identify where the system is missing, where it exists but isn\u2019t followed, and where it\u2019s followed but doesn\u2019t serve the business it was designed for.' },
  { num: '02', verb: 'Co-design the architecture.', body: 'We build the MOS to fit how your business actually runs. We design the daily production meeting structure. We define plan vs. actual reporting. We set up tiered escalation. We establish the layered accountability cadence. We document the standards. We build the visual management system. Custom-fit at every layer.' },
  { num: '03', verb: 'Embed it on the floor.',      body: 'We don\u2019t leave binders behind. We work the routines on every shift, under live conditions, alongside your supervisors and operators until the practices are running themselves. The system isn\u2019t real until it\u2019s habitual.' },
  { num: '04', verb: 'Reinforce the behaviors.',    body: 'Operational Discipline lives or dies through frontline leadership behavior. We coach the supervisors who will run the system after we\u2019re gone. The standards hold because the leaders enforce them. The cadence holds because the leaders run it. The system becomes self-sustaining because the human layer makes it sustain.' },
];

const OUTCOMES = [
  { num: '01', name: 'Predictable execution.',     body: 'Standards hold across shifts. Routines run without supervision. Plan vs. actual variance shrinks. The operation produces consistent output without depending on heroic individual effort.' },
  { num: '02', name: 'Better decisions.',  body: 'The cadence surfaces issues early. Tiered escalation routes problems to the right level. Decision rights are clear. Information moves at the speed the operation requires.' },
  { num: '03', name: 'Margin recovery.',           body: 'Bottlenecks identified. Variation reduced. Reactive spend converted to planned spend. Capacity recovered without capital investment. The operational efficiency gains translate directly to bottom-line value.' },
  { num: '04', name: 'Scalability.',               body: 'What works at one site works at the next. The system transfers because it\u2019s documented and embedded, not because the right people happen to be on staff. Operations can grow without performance degradation.' },
  { num: '05', name: 'Durability.',                body: 'The gains stay built. Performance no longer depends on extraordinary effort. It\u2019s the byproduct of a properly built system running by design. The architecture is doing the work.' },
];

/* CollapseCard — shared accordion primitive for the Costs and
   Gains sections. Title is always visible; clicking the card
   toggles the body open/closed. Keyboard accessible via the
   underlying <button> element + aria-expanded. Variant prop
   drives the red-↓ (cost) vs green-↑ (gain) colour signal that
   mirrors the homepage Pressures/Outcomes animation. */
function CollapseCard({ variant, num, name, body, indexLabel, dataTestid, delayClass }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      aria-expanded={open}
      className={`od-collapse-card od-collapse-card--${variant} ${open ? 'is-open' : ''} wipe ${delayClass || ''}`}
      data-testid={dataTestid}
    >
      <div className="od-collapse-head">
        <span className={`od-collapse-idx od-collapse-idx--${variant}`}>{indexLabel}&nbsp;{num}</span>
        <span className="od-collapse-marks" aria-hidden="true">
          <span className={`od-collapse-arrow od-collapse-arrow--${variant}`} />
          <span className="od-collapse-toggle">{open ? '\u2212' : '+'}</span>
        </span>
      </div>
      <div className="od-collapse-name">{name}</div>
      <div className="od-collapse-body">
        <div className="od-collapse-body-inner">
          <p>{body}</p>
        </div>
      </div>
    </button>
  );
}

export default function OperationalDiscipline() {
  useEffect(() => { document.title = 'Operational Discipline — Eliminate Variation | POWERS'; }, []);
  const heroRef    = useRef(null); useInViewClass(heroRef);
  const reframeRef = useRef(null); useInViewClass(reframeRef, 0.32);
  const mosRef     = useRef(null); useInViewClass(mosRef, 0.20);
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
          {/* Hero motion — atmospheric loop of the discipline's
              human moment, lifted from a longer cut of the homepage
              montage. Same ghosted + grit treatment as the static
              brief heros (sepia + brightness + cream wash + grain),
              applied via CSS so the look stays in sync with the
              static-image heros and can be tuned globally. */}
          <video
            className="brief-page-hero-bg brief-page-hero-bg--video"
            poster="/uploads/videos/operational-discipline-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            data-testid="operational-discipline-hero-video"
          >
            <source src="/uploads/videos/operational-discipline-hero.webm" type="video/webm" />
            <source src="/uploads/videos/operational-discipline-hero.mp4" type="video/mp4" />
          </video>
          <div className="brief-page-hero-wash" aria-hidden="true" />
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>What We Build</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="od-hero-h1">
                <span>Operational Discipline.</span>
                <span className="accent">The backbone of the foundation.</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 56, marginBottom: 40 }} />
              <p className="brief-doc-lede wipe wipe-d4">
                Standards. Routines. Cadence. The structured practices that run through every shift and hold execution together up and down the value chain. From financial discipline to supply chain discipline to shop floor discipline. Operational Discipline is the first of the five disciplines and the one the other four attach to. Without it, the foundation has nothing holding it upright.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ The Reframe ────────────────────────────── */}
        <section ref={reframeRef} className="brief-doc-station od-reframe" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Reframe</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" data-testid="od-reframe-h2">
              <span>Most underperforming operations don&rsquo;t have a people problem.</span>
              <span className="pivot">They have a system problem.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 48 }}>
              <p>Walk an underperforming plant and the symptoms look like a people problem. Supervisors firefighting. Standards drifting between shifts. The same issues recurring on the same lines. Effort going in, results not coming out. The diagnosis usually runs to the workforce. Hire better. Train more. Hold people accountable. And the cycle continues, because the workforce wasn&rsquo;t the cause.</p>
              <p>The cause is the absence of the system that would make consistent execution the default. The standards aren&rsquo;t documented or aren&rsquo;t enforced. The operating routines vary shift to shift. The cadence that surfaces drift before it compounds doesn&rsquo;t exist. Performance is the byproduct of individual effort rather than structural design.</p>
              <p>When the system isn&rsquo;t there, the best people in the world produce the same outcome as the average people: a lot of effort, inconsistent results, and a slow grinding-down of the team. That isn&rsquo;t a workforce failure. That&rsquo;s a system failure expressed through the workforce.</p>
              <p>Operational Discipline is what makes execution repeatable. The framework that holds the operation together when individual effort can&rsquo;t carry the load alone.</p>
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d4" data-testid="od-reframe-pullquote">
              <span className="od-pq-mark" aria-hidden="true">&ldquo;</span>
              Discipline, not just experience.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 3 ─ What Operational Discipline Actually Is ─── */}
        <section ref={mosRef} className="brief-doc-station od-mos" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What Operational Discipline Actually Is</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Standards. Routines. Cadence.</span>
              <span className="pivot">The structure that makes execution the default.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Operational Discipline is the integrated system we build. Standards, routines, structured practices, and management rhythm that keep an operation aligned to its commitments shift after shift. We build the <em>Management Operating System</em> that connects strategic intent to daily execution. The MOS we build isn&rsquo;t a product. It&rsquo;s a custom architecture, designed and built for how your specific business actually runs. It shows up across the operational layers that hold execution together on the floor, and extends into the financial and supply chain layers that hold execution together up and down the value chain:
            </p>

            {/* Four-layer stacked blueprint. Layers reveal in order
                bottom-up so the structure visually assembles as the
                reader scrolls down through the section. */}
            <div className="od-mos-stack" data-testid="od-mos-stack">
              {MOS_LAYERS.map((layer, i) => (
                <article
                  key={layer.idx}
                  className={`od-mos-layer wipe wipe-d${Math.min(4, i + 3)}`}
                  data-testid={`od-mos-layer-${layer.idx.toLowerCase()}`}
                >
                  <div className="od-mos-layer-idx">{layer.idx}</div>
                  <div className="od-mos-layer-body">
                    <div className="od-mos-layer-name">{layer.name}</div>
                    <p>{layer.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="brief-doc-lede wipe wipe-d5" style={{ marginTop: 40 }}>
              Together these layers form the Management Operating System we build. We start the build during the <Link className="brief-inline-link" to="/discovery-process">Discovery Process</Link>. We deepen it across every week of the engagement. By the time we leave, the MOS is owned by your team and running by itself.
            </p>
          </div>
        </section>

        {/* ─── ROW 4 ─ The Compounding Cost ───────────────────── */}
        <section ref={costsRef} className="brief-doc-station od-costs" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">The Compounding Cost</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>The cost of weak operational discipline</span>
              <span className="pivot">shows up everywhere it matters.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              The absence of operational discipline doesn&rsquo;t produce one isolated problem. It produces a cascading failure pattern that compounds across every dimension of the business. The same root cause expressed as ten different symptoms on ten different P&amp;L lines.
            </p>

            <div className="od-cost-grid" data-testid="od-cost-grid">
              {COSTS.map((c, i) => (
                <CollapseCard
                  key={c.num}
                  variant="cost"
                  indexLabel="COST"
                  num={c.num}
                  name={c.name}
                  body={c.body}
                  dataTestid={`od-cost-card-${c.num}`}
                  delayClass={`wipe-d${Math.min(6, i + 1)}`}
                />
              ))}
            </div>

            <p className="brief-doc-lede wipe" style={{ marginTop: 40 }}>
              These aren&rsquo;t isolated issues. They compound. Left unchecked, they create a culture of firefighting, inconsistent quality, and chronic underperformance. Leadership spends more time chasing problems than building capability.
            </p>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="od-costs-pullquote">
              <span className="od-pq-mark" aria-hidden="true">&ldquo;</span>
              One root cause. Many costly symptoms.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 5 ─ How We Build It ────────────────────────── */}
        <section ref={buildRef} className="brief-doc-station od-build" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">How We Build It</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>We build the system</span>
              <span className="pivot">your operation actually needs.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              We don&rsquo;t install templates. We build a custom Management Operating System designed for how your specific operation actually runs. Our practitioners start the build during the Discovery Process, deepen it across every week of the engagement, and embed it on the floor until the system is running itself. Your team owns it after we leave. Our build process moves through four parallel workstreams that come together as one functioning Management Operating System:
            </p>

            <ol className="od-build-rail" data-testid="od-build-rail">
              <span className="od-build-rail-line" aria-hidden="true" />
              {BUILD_STEPS.map((s, i) => (
                <li
                  key={s.num}
                  className={`od-build-step wipe wipe-d${i + 2}`}
                  data-testid={`od-build-step-${s.num}`}
                >
                  <span className="od-build-step-node" aria-hidden="true" />
                  <div className="od-build-step-idx">STEP&nbsp;{s.num}</div>
                  <h3 className="od-build-step-verb">{s.verb}</h3>
                  <p className="od-build-step-body">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="od-handoff wipe" data-testid="od-handoff">
              <span className="od-handoff-arrow" aria-hidden="true">&rarr;</span>
              <div className="od-handoff-text">
                <div className="od-handoff-label">Hand-off</div>
                <p>
                  That last point is where Operational Discipline hands off to{' '}
                  <Link to="/frontline-leadership" className="brief-inline-link" data-testid="od-handoff-link">Frontline Leadership</Link>.
                  The system we build needs people who can run it. That&rsquo;s the next discipline in the foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROW 6 ─ What You Gain ──────────────────────────── */}
        <section ref={produceRef} className="brief-doc-station od-produce" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What You Gain</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Build the Management Operating System.</span>
              <span className="pivot">The operation runs by design.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              With Operational Discipline built in, the symptoms above start reversing themselves. Not because the workforce changed. Because the system the workforce runs inside changed.
            </p>

            <div className="od-outcome-grid" data-testid="od-gain-grid">
              {OUTCOMES.map((o, i) => (
                <CollapseCard
                  key={o.num}
                  variant="gain"
                  indexLabel="GAIN"
                  num={o.num}
                  name={o.name}
                  body={o.body}
                  dataTestid={`od-gain-card-${o.num}`}
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
        <section ref={lockRef} className="brief-doc-station od-lockin" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Where This Discipline Locks In</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>None of the five disciplines</span>
              <span className="pivot">stands alone.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />
            <p className="brief-doc-lede wipe wipe-d3">
              Operational Discipline is the first of the five and the backbone the other four attach to. None of them can do its job without it, and on its own it can&rsquo;t do their jobs either. Build them together and the foundation holds. Build any one of them alone and the operation underperforms.
            </p>

            {/* Five-discipline mosaic. The current discipline (01)
                is rendered as the "anchor" tile — same grid cell as
                the others, but visually distinguished by a gold
                inner rule and the FOUNDATION label. The other four
                are clickable and link to their respective pages. */}
            <div className="od-mosaic" data-testid="od-mosaic">
              <article
                className="od-mosaic-card od-mosaic-card--current wipe wipe-d3"
                data-testid="od-mosaic-current"
                aria-current="page"
              >
                <div className="od-mosaic-num">01</div>
                <h3 className="od-mosaic-name">Operational Discipline</h3>
                <p className="od-mosaic-caption">
                  Standards, routines, cadence. The backbone of the foundation.
                </p>
              </article>
              {SISTER_DISCIPLINES.map((d, i) => (
                <Link
                  key={d.slug}
                  to={`/${d.slug}`}
                  className={`od-mosaic-card wipe wipe-d${i + 4}`}
                  data-testid={`od-mosaic-link-${d.slug}`}
                >
                  <div className="od-mosaic-num">{d.num}</div>
                  <div className="od-mosaic-name">{d.name}</div>
                  <p className="od-mosaic-caption">
                    <em>{d.caption}</em> {d.summary}
                  </p>
                  <span className="od-mosaic-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>

            <blockquote className="brief-doc-pullquote wipe wipe-d2" data-testid="od-lockin-pullquote">
              <span className="od-pq-mark" aria-hidden="true">&ldquo;</span>
              Build them together and they interlock into something load-bearing.
            </blockquote>
          </div>
        </section>

        {/* ─── ROW 8 ─ CTA ─────────────────────────────────────── */}
        <section ref={ctaRef} className="brief-doc-station brief-doc-cta" style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>Build the System</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 880, alignItems: 'center', color: '#ffffff' }}>
              <span>Let&rsquo;s build the system</span>
              <span className="pivot">your operation actually needs.</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
              Tell us where the operation is feeling pressure. We&rsquo;ll come see it on the floor, find where the system is missing or breaking down, and build the operational discipline that holds execution together.
            </p>
            <div style={{ marginTop: 36 }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid="od-cta-contact">
                Start a Conversation <span className="brief-doc-cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 22, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)' }}>
              Looking for proof?{' '}
              <Link to="/case-studies" className="brief-inline-link brief-inline-link--on-dark" data-testid="od-cta-cases">
                Search our case study library by industry, service type, or operational challenge &rarr;
              </Link>
            </p>
          </div>
        </section>
      </main>
      <BriefFooter />

      {/* ╔══ Page-scoped styles ════════════════════════════════════
          ║  Every primitive is prefixed `od-` so the next four
          ║  discipline pages can share or fork these patterns
          ║  without selector collisions.
          ╚════════════════════════════════════════════════════════ */}
      <style>{`
        /* (legacy .od-hero-sub removed — hero supporting line now
           lives inside the H1 as a second .accent span, matching
           the Approach + Discovery + homepage hero standard.) */

        /* ── MOS stacked blueprint ─────────────────────────────
           Four horizontal slabs separated by hairline gold rules.
           Layer index in mono gold (left rail), name + body in
           the right rail. The whole stack feels like a section
           drawing of the Management Operating System. */
        .od-mos-stack {
          margin-top: 56px;
          border: 1px solid rgba(13, 36, 66, 0.12);
          background:
            linear-gradient(180deg, ${PAPER} 0%, ${PAPER} 100%);
          box-shadow: 0 1px 0 rgba(13, 36, 66, 0.04), 0 30px 80px -60px rgba(13, 36, 66, 0.35);
        }
        .od-mos-layer {
          display: grid;
          grid-template-columns: 112px 1fr;
          gap: 32px;
          align-items: start;
          padding: 36px 40px;
          border-bottom: 1px solid rgba(232, 147, 70, 0.30);
          position: relative;
        }
        .od-mos-layer:last-child { border-bottom: none; }
        .od-mos-layer::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: ${GOLD_BRIGHT};
          opacity: 0.0;
          transition: opacity 240ms ease;
        }
        .od-mos-layer:hover::before { opacity: 1; }
        .od-mos-layer-idx {
          font-family: ${TYPE.mono};
          font-size: 13px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          padding-top: 6px;
        }
        .od-mos-layer-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(22px, 2.1vw, 28px);
          line-height: 1.2;
          color: ${NAVY};
          margin-bottom: 12px;
          letter-spacing: -0.005em;
        }
        .od-mos-layer-body p {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 16px;
          line-height: 1.65;
          color: ${TEXT_BODY};
        }

        /* ── Cost / Gain accordion grid ─────────────────────────
           Shared "CollapseCard" primitive. Each card:
            • renders as a <button> for keyboard accessibility +
              aria-expanded toggle
            • shows the gold mono index + colour-coded triangle
              (red ↓ cost / green ↑ gain) + the +/− toggle mark
              + the name (always visible)
            • body is height-animated open on click
           The cost grid is 3-up on desktop, the gain grid is
           5-up. Both collapse to 1-up on mobile via the shared
           media query at the bottom of this file. */
        .od-cost-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 56px;
          align-items: start;
        }
        .od-outcome-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-top: 56px;
          align-items: start;
        }
        .od-collapse-card {
          /* Reset native <button> chrome before applying our look. */
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
        .od-collapse-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 2px;
        }
        .od-collapse-card--cost:hover {
          border-color: rgba(224, 101, 79, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(224, 101, 79, 0.50);
        }
        .od-collapse-card--gain:hover {
          border-color: rgba(91, 165, 110, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -22px rgba(91, 165, 110, 0.55);
        }
        .od-collapse-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .od-collapse-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }
        .od-collapse-idx--cost { color: #c04a37; }
        .od-collapse-idx--gain { color: #4a7a55; }
        .od-collapse-marks {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .od-collapse-arrow {
          width: 0; height: 0;
        }
        .od-collapse-arrow--cost {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 9px solid rgba(224, 101, 79, 0.78);
        }
        .od-collapse-arrow--gain {
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 9px solid rgba(91, 165, 110, 0.85);
        }
        .od-collapse-toggle {
          font-family: ${TYPE.mono};
          font-size: 16px;
          line-height: 1;
          color: ${TEXT_BODY};
          width: 18px; height: 18px;
          display: inline-flex;
          align-items: center; justify-content: center;
          transition: color 180ms ease, transform 220ms ease;
        }
        .od-collapse-card--cost.is-open .od-collapse-toggle { color: #c04a37; }
        .od-collapse-card--gain.is-open .od-collapse-toggle { color: #4a7a55; }
        .od-collapse-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.3;
          color: ${NAVY};
          letter-spacing: -0.005em;
          padding-bottom: 24px;
        }
        /* Body slot — height animated from collapsed to open.
           Using max-height + grid-template-rows would be ideal
           but the simpler max-height trick reads well at the
           short content lengths used here. */
        .od-collapse-body {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 320ms cubic-bezier(.2,.6,.2,1),
                      opacity 240ms ease 60ms;
        }
        .od-collapse-card.is-open .od-collapse-body {
          max-height: 360px;
          opacity: 1;
        }
        .od-collapse-body-inner {
          padding: 4px 0 26px;
          border-top: 1px solid rgba(13, 36, 66, 0.08);
          margin-top: 4px;
        }
        .od-collapse-body-inner p {
          margin: 18px 0 0;
          font-family: ${TYPE.sans};
          font-size: 14.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* ── Build process rail ────────────────────────────────
           Four steps laid out horizontally on a single rail. A
           thin gold line connects all four nodes. On scroll-in
           the rail draws left-to-right via clip-path. */
        .od-build-rail {
          list-style: none;
          padding: 0;
          margin: 64px 0 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          position: relative;
        }
        .od-build-rail-line {
          position: absolute;
          left: 0; right: 0;
          top: 14px;
          height: 1px;
          background: ${GOLD_BRIGHT};
          opacity: 0.45;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1400ms cubic-bezier(.2,.6,.2,1) 250ms;
        }
        .od-build.is-in .od-build-rail-line { clip-path: inset(0 0 0 0); }
        .od-build-step {
          position: relative;
          padding-top: 36px;
        }
        .od-build-step-node {
          position: absolute;
          left: 0; top: 8px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: ${PAPER};
          border: 2px solid ${GOLD_BRIGHT};
          box-shadow: 0 0 0 4px ${PAPER};
        }
        .od-build-step-idx {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
        }
        .od-build-step-verb {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 20px;
          line-height: 1.25;
          color: ${NAVY};
          margin: 10px 0 10px;
          letter-spacing: -0.005em;
        }
        .od-build-step-body {
          margin: 0;
          font-size: 14.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        /* ── Hand-off callout ──────────────────────────────────
           Sits at the bottom of the build section pointing forward
           to Frontline Leadership. Communicates the chain to the
           next discipline without forcing chapter pagination. */
        .od-handoff {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 24px;
          align-items: start;
          padding: 28px 32px;
          background: ${PAPER_DEEP};
          border-left: 3px solid ${GOLD_BRIGHT};
        }
        .od-handoff-arrow {
          font-size: 38px;
          line-height: 1;
          color: ${GOLD_BRIGHT};
          padding-top: 4px;
        }
        .od-handoff-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .od-handoff-text p {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: ${NAVY};
        }

        /* ── Lock-in mosaic ────────────────────────────────────
           Five tiles in a 5-up grid. The current discipline is
           the "anchor" with a gold-rule treatment and FOUNDATION
           label; the other four are clickable cards that link
           to their respective discipline pages. */
        .od-mosaic {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-top: 56px;
        }
        .od-mosaic-card {
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
        .od-mosaic-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .od-mosaic-card--current {
          background: ${NAVY};
          color: #ffffff;
          border-color: ${NAVY};
          cursor: default;
        }
        .od-mosaic-card--current:hover {
          transform: none;
          border-color: ${NAVY};
          box-shadow: none;
        }
        .od-mosaic-card--current::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: ${GOLD_BRIGHT};
        }
        .od-mosaic-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .od-mosaic-label {
          font-family: ${TYPE.mono};
          font-size: 10px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .od-mosaic-name {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.25;
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        .od-mosaic-card--current .od-mosaic-name {
          font-size: 19px;
          color: #ffffff;
        }
        .od-mosaic-caption {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.55;
          color: ${TEXT_BODY};
        }
        .od-mosaic-card--current .od-mosaic-caption {
          color: rgba(255, 255, 255, 0.78);
        }
        .od-mosaic-caption em {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          color: ${NAVY};
        }
        .od-mosaic-arrow {
          position: absolute;
          right: 18px; bottom: 16px;
          font-size: 18px;
          color: ${TEXT_BODY};
          opacity: 0.6;
          transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
        }
        .od-mosaic-card:hover .od-mosaic-arrow {
          color: ${GOLD_BRIGHT};
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── Pull-quote opening mark ────────────────────────── */
        .od-pq-mark {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 1.6em;
          color: ${GOLD_BRIGHT};
          margin-right: 4px;
          line-height: 0;
          vertical-align: -0.06em;
        }
        /* ── Pull quote ────────────────────────────────────────
           Centered, oversized serif-italic gold, with a thin gold
           rule above and below for visual containment. Used three
           times across the page (Reframe, Costs, Lock-in). */
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

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .od-cost-grid    { grid-template-columns: repeat(2, 1fr); }
          .od-outcome-grid { grid-template-columns: repeat(2, 1fr); }
          .od-mosaic       { grid-template-columns: repeat(2, 1fr); }
          .od-build-rail   { grid-template-columns: repeat(2, 1fr); gap: 40px 32px; }
          .od-build-rail-line { display: none; }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .od-mos-layer       { grid-template-columns: 1fr; gap: 12px; padding: 28px 22px; }
          .od-mos-layer-idx   { padding-top: 0; }
          .od-cost-grid,
          .od-outcome-grid,
          .od-mosaic,
          .od-build-rail      { grid-template-columns: 1fr; }
          .od-handoff         { grid-template-columns: 1fr; gap: 8px; padding: 24px 22px; }
          .od-handoff-arrow   { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}
