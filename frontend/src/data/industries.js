/* industries.js — single source of truth for the 14 industry landing
   pages + the Industries Served hub copy.

   Each industry follows the lean 4-section shape (2026 rewrite):
     heroLede, pressures, whatWeBuild, whyBody, cta fields.

   INDUSTRY_GROUPS drives the /industries-served hub page navigation
   and must not be changed without also updating that page. */

export const INDUSTRY_GROUPS = [
  {
    label: 'FOOD, BEVERAGE & CONSUMER',
    items: [
      { slug: 'food-beverage-manufacturing',         name: 'Food & Beverage Manufacturing',        blurb: 'Plant capacity, line speed, changeover discipline, and food safety compliance across the broadest sector we serve.' },
      { slug: 'meat-poultry-processing',             name: 'Meat & Poultry Processing',            blurb: 'Yield recovery, labor productivity, USDA compliance, and the operational realities of protein processing at scale.' },
      { slug: 'consumer-packaged-goods',             name: 'Consumer Packaged Goods',              blurb: 'Demand variability, SKU complexity, retail responsiveness, and the multi-plant coordination CPG margins depend on.' },
      { slug: 'animal-nutrition-feed-manufacturing', name: 'Animal Nutrition & Feed Manufacturing', blurb: 'Feed mill efficiency, batch precision, ingredient cost management, and FDA-CVM compliance discipline.' },
      { slug: 'agribusiness',                        name: 'Agribusiness',                          blurb: 'Commodity throughput, seasonal capacity, transportation coordination, and processing yield across ag operations.' },
    ],
  },
  {
    label: 'REGULATED MANUFACTURING',
    items: [
      { slug: 'pharmaceuticals-medical-devices', name: 'Pharmaceuticals & Medical Devices', blurb: 'Sterile manufacturing, validated processes, FDA and global regulatory discipline, and execution under audit conditions.' },
      { slug: 'aerospace-defense',               name: 'Aerospace & Defense',               blurb: 'AS9100 compliance, fixed-price contract discipline, low-volume high-mix production, and competitive bid posture.' },
      { slug: 'automotive-manufacturing',        name: 'Automotive Manufacturing',          blurb: 'Tier-1 supplier qualification, changeover time, cost per unit, and the OEM cadence automotive lives under.' },
    ],
  },
  {
    label: 'INDUSTRIAL & HEAVY INDUSTRY',
    items: [
      { slug: 'industrial-manufacturing', name: 'Industrial Manufacturing', blurb: "Durable goods, fabrication, furniture, and the manufacturing breadth where the legacy taxonomy doesn't fit." },
      { slug: 'metals-mining',            name: 'Metals & Mining',          blurb: 'Primary metals, fabricated products, mining operations, and the heavy-industry pressures that compound at scale.' },
      { slug: 'oil-gas',                  name: 'Oil & Gas',                blurb: 'Upstream, midstream, and downstream operations under capital discipline and commodity-price volatility.' },
      { slug: 'chemicals',                name: 'Chemicals',                blurb: 'Process manufacturing, batch and continuous production, EPA compliance, and the safety discipline chemical operations require.' },
    ],
  },
  {
    label: 'OPERATIONS & LOGISTICS',
    items: [
      { slug: 'warehouse-distribution', name: 'Warehouse & Distribution', blurb: 'Throughput, labor productivity, accuracy, and the operational discipline that distribution centers depend on.' },
    ],
  },
  {
    label: 'STRATEGIC PARTNERS',
    items: [
      { slug: 'private-equity-portfolio-operations', name: 'Private Equity Portfolio Operations', blurb: 'EBITDA expansion, integration support, exit preparation, and the operating partner relationships our PE clients build with us.' },
    ],
  },
];

/* Helper — flat lookup map */
const INDUSTRIES_BY_SLUG = {};

/* ─────────────────────────────────────────────────────────────────
   INDUSTRIES — lean 4-section shape (2026 copy rewrite)
   Each entry:
     slug, name, eyebrow                (routing + hub display)
     seoTitle, metaDescription          (SEO)
     heroLede                           (hero paragraph)
     pressures  { h2top, h2pivot, body }
     whatWeBuild{ h2top, h2pivot, body }
     whyBody                            (single paragraph, navy section)
     ctaH2top, ctaH2pivot               (two-tone CTA headline)
     ctaBody                            (CTA sub-copy)
     ctaCaseStudiesLabel                (case study link label, no arrow)
───────────────────────────────────────────────────────────────── */

const INDUSTRIES = [

  /* ── 1. Food & Beverage Manufacturing ──────────────────────── */
  {
    slug: 'food-beverage-manufacturing',
    name: 'Food & Beverage Manufacturing',
    eyebrow: 'Food, Beverage & Consumer',
    seoTitle: 'Food & Beverage Manufacturing Consulting | POWERS',
    metaDescription: 'Execution capability built into food and beverage plants: OEE, changeover, food safety, and throughput that hold on every shift.',
    heroLede: "High-volume production. Demand that never stops. The line runs. Cookies packaged, beverages bottled, yogurt filled, under conditions that don't pause for a market shift, a labor gap, or a commodity swing. We build the execution capability that holds up regardless.",
    pressures: {
      h2top:  'The pressures',
      h2pivot: 'you already know.',
      body: "Demand that moves faster than planning. Food safety that runs on every shift, under SQF, BRC, and FSMA. Turnover that hits the floor directly. Changeovers that eat capacity. Aging equipment and unplanned downtime. A supply chain that compounds variability into every schedule. In food and beverage manufacturing, they all land at once.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "Not a program we hand you. We build execution capability into how the plant already runs, its standards, its supervisors, its daily rhythm, until consistent execution is simply how the operation works, carrying food safety and throughput in the same motion. That is the difference between a program and a capability. A program is handed over. A capability is owned, built into your people and your floor. It lasts because it is yours, and it cannot be borrowed.",
    },
    whyBody: "Most firms diagnose, recommend, and leave. We are on the floor, on the shift, building the capability into your operation until it performs without us. And we are paid on results, not recommendations.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "execute under any circumstances.",
    ctaBody: "Tell us where the operation is under pressure. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 2. Meat & Poultry Processing ──────────────────────────── */
  {
    slug: 'meat-poultry-processing',
    name: 'Meat & Poultry Processing',
    eyebrow: 'Food, Beverage & Consumer',
    seoTitle: 'Meat & Poultry Processing Consulting | POWERS',
    metaDescription: 'Protect yield, throughput, and USDA readiness in meat and poultry processing with execution capability built into your floor.',
    heroLede: "Yield lives in basis points. Basis points live in millions. No manufacturing floor is more operationally intensive than protein. Live supply, USDA inspection on the line, labor-heavy execution, and a sanitation window that eats the clock. Every basis point of yield you hold, or lose, is real money. We build the execution capability that protects all of it, shift after shift.",
    pressures: {
      h2top:  'What the floor',
      h2pivot: 'is up against.',
      body: "Yield variance between shifts and lines. HACCP and USDA inspection running every minute of production. Frontline turnover in the most labor-intensive category in food. Live-weight and sizing variability the plant has to absorb. Continuous lines with no room for unplanned downtime. A daily sanitation cycle that compresses the production window.",
    },
    whatWeBuild: {
      h2top:  'What we build, and why',
      h2pivot: "it\u2019s the work we know best.",
      body: "We build execution capability into the operation itself, the supervisors, the standards, the daily rhythm, so yield holds and throughput holds no matter who is running the line. The yield conversation happens every shift. USDA readiness becomes routine. Sanitation and production stop trading against each other. It is the deepest body of proof we have, more published results in meat and poultry than any category we serve, because it is the work we know cold. And because the capability is built into your floor rather than handed to you on paper, it stays after we go.",
    },
    whyBody: "Most firms study the plant, write the deck, and leave. We are on the line, on every shift, inside the operating system that holds yield, throughput, safety, and labor together. Paid on the results, not the recommendation.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "hold yield under any conditions.",
    ctaBody: "Tell us where yield and throughput are slipping. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'See the proof: our deepest case study library is in protein',
  },

  /* ── 3. Consumer Packaged Goods ─────────────────────────────── */
  {
    slug: 'consumer-packaged-goods',
    name: 'Consumer Packaged Goods',
    eyebrow: 'Food, Beverage & Consumer',
    seoTitle: 'Consumer Packaged Goods Manufacturing Consulting | POWERS',
    metaDescription: 'Hold margin across SKUs, plants, and retail cadence with execution capability built into CPG operations.',
    heroLede: "The brand makes a promise. The floor has to keep it. In consumer packaged goods, the retailer sets the cadence, the brand sets the standard, and the plant delivers both at once, across a SKU list that keeps growing. We build the execution capability that keeps margin intact when demand, complexity, and cost all move together.",
    pressures: {
      h2top:  'Where the margin',
      h2pivot: 'leaks.',
      body: "SKU proliferation that turns every changeover into a margin event. Retail fill-rate expectations with no slack. Promotional and seasonal demand that legacy planning cannot absorb. Input, packaging, and freight costs rising at once. Performance that varies plant to plant on identical SKUs. Execution discipline is the margin lever here, because pricing power usually is not.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into how the operation runs, so the same product comes off every line at the same quality, changeovers stop bleeding capacity, and multi-plant variance closes. Not a set of recommendations. A capability your supervisors and your floor own. Handed-over programs fade the quarter after the consultants leave. A capability built into your people holds, because it belongs to them.",
    },
    whyBody: "Most firms diagnose, recommend, and leave. We deploy on the floor, across plants when the scope calls for it, inside the operating system that holds production, quality, fill rate, and cost together. Paid on results, not recommendations.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "perform across every plant.",
    ctaBody: "Tell us where the network is inconsistent. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 4. Animal Nutrition & Feed Manufacturing ───────────────── */
  {
    slug: 'animal-nutrition-feed-manufacturing',
    name: 'Animal Nutrition & Feed Manufacturing',
    eyebrow: 'Food, Beverage & Consumer',
    seoTitle: 'Animal Nutrition & Feed Manufacturing Consulting | POWERS',
    metaDescription: 'Batch precision, cost per ton, and throughput that hold in feed and animal nutrition manufacturing.',
    heroLede: "Ingredient cost sets the margin. Batch precision protects it. Feed and animal nutrition run on two numbers: what the ingredients cost, and how precisely you blend them. Miss on either and margin goes with it, before the product ever reaches the customer\u2019s herd or flock. We build the execution capability that holds precision and cost discipline together, every batch.",
    pressures: {
      h2top:  'The pressures the mill',
      h2pivot: 'runs under.',
      body: "Commodity ingredient costs that move continuously. Formulation tolerances with real downstream consequences. FDA-CVM oversight and medicated-feed documentation. Customers expecting a precision and transparency that legacy mills were not built for. Pellet mills, mixers, and conditioners with hard uptime targets. Specialized operators who are hard to recruit and harder to keep.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the mill, the routines, the supervisors, the daily accountability, so batch precision holds across shifts and throughput holds against the weekly target. Formulation accuracy becomes routine rather than heroic, and cost per ton comes down without cutting corners. We do not hand you a binder. We build the capability into your operation so it lasts once we are gone. It cannot be copied off a shelf, because it lives in your people.",
    },
    whyBody: "Most firms recommend and leave. We are in the mill, on the shift, inside the operating system that holds production, quality, ingredient cost, and customer service together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "hold precision at cost.",
    ctaBody: "Tell us where cost and precision are drifting. We\u2019ll come see the mill.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 5. Agribusiness ────────────────────────────────────────── */
  {
    slug: 'agribusiness',
    name: 'Agribusiness',
    eyebrow: 'Food, Beverage & Consumer',
    seoTitle: 'Agribusiness Operations Consulting | POWERS',
    metaDescription: 'Throughput and yield that hold through peak season across grain handling, processing, and agribusiness operations.',
    heroLede: "The season doesn\u2019t wait. The operation can\u2019t either. Agribusiness runs on a clock nature sets. Peak throughput arrives whether the operation is ready or not, and commodity flow, storage, transportation, and downstream customers all have to move in step. We build the execution capability that holds throughput and yield together through the pressure the season brings.",
    pressures: {
      h2top:  'What agribusiness',
      h2pivot: 'runs under.',
      body: "Peak-season capacity that tests labor, equipment, and throughput at once. Grain handling, storage cycling, and quality preservation that drift fast without discipline. Milling, crushing, and drying yields measured in basis points. Rail, truck, and barge coordination, and the demurrage clock. Rural labor markets with real continuity constraints. Downstream customers whose cadence leaves no slack.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so it holds in peak season and funds itself in the off season, throughput steady, yield protected, the daily rhythm intact whatever the weather and supply are doing. Built into your supervisors and your floor, not handed over on paper. A program ends when the engagement does. A capability keeps working, because your people own it.",
    },
    whyBody: "Most firms deliver a deck and move on. We are on site, through the season, inside the operating system that holds throughput, processing, transportation, and customer commitments together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "hold through the season.",
    ctaBody: "Tell us where the season breaks the plan. We\u2019ll come see it.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 6. Pharmaceuticals & Medical Devices ───────────────────── */
  {
    slug: 'pharmaceuticals-medical-devices',
    name: 'Pharmaceuticals & Medical Devices',
    eyebrow: 'Regulated Manufacturing',
    seoTitle: 'Pharmaceutical & Medical Device Manufacturing Consulting | POWERS',
    metaDescription: 'Sustainable performance under FDA and audit pressure, built into pharmaceutical and medical device operations.',
    heroLede: "Every unit reaches a patient. Every deviation carries weight. In life sciences manufacturing, the outcome is patient-bound and the regulator is never far from the line. Demand shifts, supply chains strain, and validated processes leave little room to absorb either. We build the execution capability that makes performance sustainable without ever putting compliance at risk.",
    pressures: {
      h2top:  'The pressures,',
      h2pivot: 'at combined intensity.',
      body: "Demand volatility across a shifting therapeutic mix. Single-source suppliers and concentrated API and component manufacturing. FDA and global regulators raising the floor on data integrity and traceability. Sterile, fill-finish, and precision device lines with no tolerance for downtime. An aging skilled workforce. And consolidation that leaves operations running on mismatched systems and parallel cultures.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation, the supervisors, the standard work, the daily accountability, so performance holds and compliance holds in the same motion. Audit-ready becomes the default. Deviations get run to ground. Production and quality stop competing for attention. We build it into your people rather than hand over a document. That is why it survives an audit, and why it survives our departure.",
    },
    whyBody: "Most firms diagnose, cite Part 211 and ISO 13485, and leave. We are on the floor and in the suites, inside the operating system that holds production, quality, and compliance together. Paid on results, not recommendations.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "perform under audit and pressure.",
    ctaBody: "Tell us where performance and compliance are straining. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 7. Aerospace & Defense ─────────────────────────────────── */
  {
    slug: 'aerospace-defense',
    name: 'Aerospace & Defense',
    eyebrow: 'Regulated Manufacturing',
    seoTitle: 'Aerospace & Defense Manufacturing Consulting | POWERS',
    metaDescription: 'Hold schedule, first-pass yield, and AS9100 compliance under fixed-price contracts in aerospace and defense manufacturing.',
    heroLede: "A fixed price forgives nothing. Execution is the only margin lever. In aerospace and defense, the contract is priced, the schedule is watched, and every overrun comes straight out of the program. Behind-schedule work does not just cost margin, it threatens the next bid. We build the execution capability that turns schedule and quality into competitive posture.",
    pressures: {
      h2top:  'The moment, and the pressure',
      h2pivot: 'underneath it.',
      body: "Defense demand and reshoring are pulling volume back onshore faster than many suppliers can scale to meet it. That runs straight into the sector\u2019s standing pressures: fixed-price contract economics, AS9100 and NADCAP compliance that gates eligibility, low-volume high-mix production, qualified-supplier requirements, and a cleared, skilled workforce that is hard to grow quickly. Capacity is available. The capability to execute against it is the constraint.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so programs hold schedule, first-pass yield holds, and cost stays inside the contract, run by your supervisors on your floor. Source inspection becomes routine. Behind-schedule programs find velocity. The standard holds whoever is on shift. A method in a binder is easy to copy and easy to lose. A capability built into your people is neither.",
    },
    whyBody: "Most firms audit the program, reference the standard, and leave. We are on the floor, on the shift, inside the operating system that holds program performance, quality, schedule, and cost together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to hold schedule",
    ctaH2pivot: "and win the next bid.",
    ctaBody: "Tell us where programs are slipping. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 8. Automotive Manufacturing ────────────────────────────── */
  {
    slug: 'automotive-manufacturing',
    name: 'Automotive Manufacturing',
    eyebrow: 'Regulated Manufacturing',
    seoTitle: 'Automotive Manufacturing Consulting | POWERS',
    metaDescription: 'Meet OEM cadence, cost-down, and IATF quality with execution capability built into tier-1 automotive operations.',
    heroLede: "The OEM sets the cadence. And the cost-down, every year. Tier-1 automotive lives on someone else\u2019s clock. Just-in-time delivery, year-over-year cost-down, and continuous quality regimes leave no slack for executional drift. You hold the OEM relationship or you lose it. We build the execution capability that protects the program and the margin under all of it.",
    pressures: {
      h2top:  'What tier-1',
      h2pivot: 'runs under.',
      body: "OEM schedules and fill-rate expectations with zero tolerance for a miss. Year-over-year cost-down that flows straight through operational efficiency. Model changeovers and customer-specific runs that make changeover time a top capacity lever. PPAP and IATF 16949 quality discipline. Supervisor depth and turnover cost. Just-in-time production that punishes every unplanned stop.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so throughput holds, defects fall to PPM, and OTIF holds to the OEM\u2019s standard, run by your people on your floor. Changeovers stop costing capacity. The quality conversation drives root cause, not defect counts. We build it in rather than hand it over. A capability your team owns holds long after we are gone, and it cannot be lifted off a website.",
    },
    whyBody: "Most firms diagnose, cite IATF and OEE, and leave. We are on the floor, on every shift, inside the operating system that holds production, quality, schedule, and cost together. Paid on results, not recommendations.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "hold the OEM\u2019s standard.",
    ctaBody: "Tell us where the program is under pressure. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 9. Industrial Manufacturing ────────────────────────────── */
  {
    slug: 'industrial-manufacturing',
    name: 'Industrial Manufacturing',
    eyebrow: 'Industrial & Heavy Industry',
    seoTitle: 'Industrial Manufacturing Consulting | POWERS',
    metaDescription: 'Productivity, floor space, and cost per unit that improve across durable-goods and industrial manufacturing operations.',
    heroLede: "No pricing power. Only execution. Industrial manufacturing is where durable goods get made: fabrication, furniture, wood and metal products, engineered-to-order runs. Costs rise, competition undercuts, and pricing power is thin. Execution is the margin. We build the capability that protects it.",
    pressures: {
      h2top:  'What compounds',
      h2pivot: 'on the floor.',
      body: "Material, energy, freight, and labor costs rising together. Skilled-operator shortages and thin supervisor benches. Capital-intensive equipment that cannot afford unplanned downtime. Custom and configured runs that turn changeover into a constant. Global competition on price. And facilities the current product mix has outgrown, where floor space and material flow are quietly costing capacity.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so productivity climbs, floor space comes back, and cost per unit drops, held by your supervisors and your daily routines whatever the product mix. Not a recommendation. A capability the operation owns. Programs fade. Capabilities compound, because they live in your people, not in our slides.",
    },
    whyBody: "Most firms study the plant, write the deck, and leave. We are on the floor, on the shift, inside the operating system that holds production, quality, schedule, and cost together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "win on execution.",
    ctaBody: "Tell us where margin is leaking. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 10. Metals & Mining ────────────────────────────────────── */
  {
    slug: 'metals-mining',
    name: 'Metals & Mining',
    eyebrow: 'Industrial & Heavy Industry',
    seoTitle: 'Metals & Mining Operations Consulting | POWERS',
    metaDescription: 'Asset productivity, cost per ton, and safety that hold across the cycle in metals and mining operations.',
    heroLede: "You don\u2019t set the price. You set the cost. Metals and mining live on a commodity cycle no operation controls, against a capital base that demands productivity every day of it. When prices fall, cost discipline is the only lever left. We build the execution capability that protects margin across the cycle, safely and at scale.",
    pressures: {
      h2top:  'What heavy industry',
      h2pivot: 'carries.',
      body: "Output prices set by the market, not the plant. Capital-intensive assets where uptime is return on capital. Energy intensity among the highest in manufacturing. Safety expectations and incident consequences that exceed almost any other category. Skilled-labor continuity in remote operations. And environmental compliance raising the operational floor.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so asset productivity holds, energy and cost per ton come down, and safety and production run on the same discipline, owned by your supervisors and your floor. Not a method on paper. A capability that carries through the cycle. Handed-over programs do not survive a downturn. A capability built into your people does.",
    },
    whyBody: "Most firms deliver a deck and move on. We are on the floor, on the shift, inside the operating system that holds production, safety, environmental compliance, and cost together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "hold margin through the cycle.",
    ctaBody: "Tell us where cost and reliability are slipping. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 11. Oil & Gas ──────────────────────────────────────────── */
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    eyebrow: 'Industrial & Heavy Industry',
    seoTitle: 'Oil & Gas Operations Consulting | POWERS',
    metaDescription: 'Uptime, turnaround performance, and safety built into upstream, midstream, and downstream oil and gas operations.',
    heroLede: "Capital-intensive. Commodity-exposed. Unforgiving of downtime. Oil and gas run on capital that has to keep producing and a commodity price that swings without warning. Across upstream, midstream, and downstream, reliability and safety decide whether the asset returns its capital. We build the execution capability that protects both through the cycle.",
    pressures: {
      h2top:  'What the operation',
      h2pivot: 'runs under.',
      body: "Prices set by the market, not the operation. Capital assets where every hour of downtime is production and return lost. Safety and environmental consequences that exceed most other sectors. Skilled-operator continuity under pressure. Turnaround and maintenance windows with hard schedules. And regulators steadily raising the discipline required to operate.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so uptime holds, turnarounds land on schedule, and safety and production run on one system, owned by your people, not by ours. Not a binder of recommendations. A capability that holds when the cycle turns. A program leaves when we do. A capability stays, because it is built into how your operation runs.",
    },
    whyBody: "Most firms recommend and leave. We are on the floor, on the shift, inside the operating system that holds production, safety, environmental compliance, and cost together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "hold through the cycle.",
    ctaBody: "Tell us where reliability and cost are under pressure. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 12. Chemicals ──────────────────────────────────────────── */
  {
    slug: 'chemicals',
    name: 'Chemicals',
    eyebrow: 'Industrial & Heavy Industry',
    seoTitle: 'Chemical Manufacturing Consulting | POWERS',
    metaDescription: 'Reliability, yield, and process safety that run on one discipline across batch and continuous chemical manufacturing.',
    heroLede: "Process safety and production run on the same discipline. Chemical manufacturing carries process complexity, regulatory weight, and capital intensity in the same operation, batch and continuous, with safety consequences that never leave the room. We build the execution capability that protects margin, reliability, and safety at once.",
    pressures: {
      h2top:  'What chemical operations',
      h2pivot: 'run under.',
      body: "EPA, OSHA, REACH, and TSCA raising the documentation and control floor. Process safety management where discipline runs continuously. Reactor systems and processing equipment carrying heavy capital weight. Multi-step batch and continuous processes with real execution complexity. Skilled-operator continuity. And energy intensity among the highest in industry.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so production rate and yield hold, energy and cost per ton come down, and safety and process discipline run as one, owned by your supervisors and your floor. Not a set of recommendations. A capability that holds under inspection and under load. A program is easy to copy and easy to lose. A capability built into your people is neither.",
    },
    whyBody: "Most firms cite reliability and process safety, write the deck, and leave. We are on the floor, on the shift, inside the operating system that holds production, safety, environmental compliance, and cost together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to",
    ctaH2pivot: "run safe, reliable, and lean.",
    ctaBody: "Tell us where reliability and cost are under pressure. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 13. Warehouse & Distribution ───────────────────────────── */
  {
    slug: 'warehouse-distribution',
    name: 'Warehouse & Distribution',
    eyebrow: 'Operations & Logistics',
    seoTitle: 'Warehouse & Distribution Operations Consulting | POWERS',
    metaDescription: 'Throughput per labor hour, accuracy, and cost per unit handled that hold at scale in distribution operations.',
    heroLede: "The customer sets the clock. Labor and accuracy keep it. Distribution lives where fill-rate expectations, labor economics, and throughput all meet at once. Miss the window or the count and it shows up in cost and in the customer relationship the same day. We build the execution capability that holds accuracy and productivity at scale.",
    pressures: {
      h2top:  'What the DC',
      h2pivot: 'runs under.',
      body: "Fill-rate and delivery windows with no slack. Deeply labor-intensive work where supervisor capability and picker productivity set cost per unit handled. SKU counts and slotting complexity legacy operations were not built for. Peak and omnichannel volume that tests capacity all at once. Accuracy and returns that move straight through cost. And material-handling systems with hard uptime targets.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "We build execution capability into the operation so throughput per labor hour climbs, accuracy holds, and cost per unit handled falls, run by your supervisors through peak and off-peak alike. Not a playbook. A capability the operation owns. Handed-over programs fade. A capability built into your people holds, shift after shift.",
    },
    whyBody: "Most firms diagnose, recommend, and leave. We are on the floor, on the shift, inside the operating system that holds throughput, accuracy, productivity, and service together. Paid on results.",
    ctaH2top:  "Let\u2019s build your operation to hold accuracy",
    ctaH2pivot: "and throughput at scale.",
    ctaBody: "Tell us where the operation is under pressure. We\u2019ll come see it on the floor.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library',
  },

  /* ── 14. Private Equity Portfolio Operations ────────────────── */
  {
    slug: 'private-equity-portfolio-operations',
    name: 'Private Equity Portfolio Operations',
    eyebrow: 'Strategic Partners',
    seoTitle: 'Private Equity Portfolio Operations Consulting | POWERS',
    metaDescription: 'EBITDA gains that land inside the hold: operating-partner support, integration, and exit readiness across the portfolio.',
    heroLede: "The thesis is underwritten. The gain has to land inside the hold. Portfolio operations run on a different clock than corporate-owned plants. The value creation plan is committed, the hold period is finite, and operational improvement has to show up as EBITDA before exit, not someday. We work with operating partners and portfolio leadership to make the gain real inside the timeline.",
    pressures: {
      h2top:  'What the hold',
      h2pivot: 'demands.',
      body: "A deal clock that compresses the time for improvement to become EBITDA. Value creation plans the deal team already underwrote. Add-ons and carve-outs running on inherited systems and parallel cultures. Portfolio leadership that often lacks the operating depth the plan assumes. And an exit window where operating performance sets the multiple.",
    },
    whatWeBuild: {
      h2top:  'What we',
      h2pivot: 'build.',
      body: "Inside the hold, not after it. We build execution capability into the portfolio company itself, its supervisors, its operating system, its daily accountability, so the gains land inside the hold and stand up in diligence. We do not hand the operating partner a plan. We build the capability that produces the number, on the timeline the thesis assumed. Because it is built into the company\u2019s own people, it survives the ownership change and reads as durable to a buyer. That is what protects the multiple.",
    },
    whyBody: "Most operations firms brief the partner, reference EBITDA, and leave. We deploy into the operation, on the floor, inside the system that holds production, quality, cost, and value-creation-plan accountability together. And our structure aligns with yours: we are paid on the results we deliver.",
    ctaH2top:  "Let\u2019s build your portfolio company to",
    ctaH2pivot: "execute against the plan.",
    ctaBody: "Tell us where the thesis is meeting operational reality. Let\u2019s talk about the hold.",
    ctaCaseStudiesLabel: 'Looking for proof? Search the case study library by result and industry',
  },

];

INDUSTRIES.forEach(i => { INDUSTRIES_BY_SLUG[i.slug] = i; });

export function getIndustry(slug) {
  return INDUSTRIES_BY_SLUG[slug] || null;
}

export default INDUSTRIES;
