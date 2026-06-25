/* industries.js — single source of truth for the 14 industry landing
   pages + the Industries Served hub copy (2026-02-25 client draft).

   Each industry follows the same 7-row template, so we keep the data
   structured and the IndustryPage component renders any slug from
   this array. Hub-only nav: these pages do NOT appear in the main
   menu; they're only reachable from /industries-served. */

export const INDUSTRY_GROUPS = [
  {
    label: 'FOOD, BEVERAGE & CONSUMER',
    items: [
      { slug: 'food-beverage-manufacturing',        name: 'Food & Beverage Manufacturing',        blurb: 'Plant capacity, line speed, changeover discipline, and food safety compliance across the broadest sector we serve.' },
      { slug: 'meat-poultry-processing',            name: 'Meat & Poultry Processing',            blurb: 'Yield recovery, labor productivity, USDA compliance, and the operational realities of protein processing at scale.' },
      { slug: 'consumer-packaged-goods',            name: 'Consumer Packaged Goods',              blurb: 'Demand variability, SKU complexity, retail responsiveness, and the multi-plant coordination CPG margins depend on.' },
      { slug: 'animal-nutrition-feed-manufacturing', name: 'Animal Nutrition & Feed Manufacturing', blurb: 'Feed mill efficiency, batch precision, ingredient cost management, and FDA-CVM compliance discipline.' },
      { slug: 'agribusiness',                       name: 'Agribusiness',                          blurb: 'Commodity throughput, seasonal capacity, transportation coordination, and processing yield across ag operations.' },
    ],
  },
  {
    label: 'REGULATED MANUFACTURING',
    items: [
      { slug: 'pharmaceuticals-medical-devices', name: 'Pharmaceuticals & Medical Devices', blurb: 'Sterile manufacturing, validated processes, FDA and global regulatory discipline, and execution under audit conditions.' },
      { slug: 'aerospace-defense',                name: 'Aerospace & Defense',                blurb: 'AS9100 compliance, fixed-price contract discipline, low-volume high-mix production, and competitive bid posture.' },
      { slug: 'automotive-manufacturing',         name: 'Automotive Manufacturing',           blurb: 'Tier-1 supplier qualification, changeover time, cost per unit, and the OEM cadence automotive lives under.' },
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

/* Each industry follows the same shape:
   hero: { h1Top, h1Accent, lede }
   pressuresIntro, pressures[] (each {h, body})
   workIntro, disciplines[] (each {h, body})
   outcomesIntro, outcomesList[] (string), outcomesClose (string)
   subSegmentsIntro, subSegments[] (string), subSegmentsClose
   whyBody[] (array of paragraph strings, first may have leading <em>)
   ctaH2 (object with h1Top + pivot)
*/

const INDUSTRIES = [
  /* ── 1. Food & Beverage Manufacturing ─────────────── */
  {
    slug: 'food-beverage-manufacturing',
    name: 'Food & Beverage Manufacturing',
    eyebrow: 'Food, Beverage & Consumer',
    hero: {
      h1Top: 'High-volume production.',
      h1Accent: 'Demand that never stops.',
      lede: "The assembly line runs. Cookies are packaged. Beverages are bottled. Yogurt is filled. The product on the table at dinner tonight was made under operational conditions that don't pause for market shifts, labor disruption, or commodity swings. We build the execution capability that holds up regardless.",
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'food and beverage manufacturing.' },
    pressuresIntro: 'Food and beverage operates under conditions that compress margin from every direction at once. Pressures that used to land sequentially now land simultaneously.',
    pressures: [
      { h: 'Demand volatility.',          body: "Consumer trends shift faster than legacy planning systems can adapt. Plant-based, functional beverages, ready-meals, and premium SKUs all move demand in directions traditional volumes don't cover." },
      { h: 'Food safety compliance.',     body: 'SQF, BRC, FSMA, and customer audit regimes have raised the floor on documentation, traceability, and process discipline. Compliance is now an operational performance dimension, not just a quality function.' },
      { h: 'Labor instability.',          body: 'Frontline turnover, supervisor capability gaps, and the cost of recruiting and training in production environments have made workforce execution one of the largest variables in margin.' },
      { h: 'Changeover and SKU complexity.', body: "Co-packed and contract operations face changeover demands that the plant wasn't designed for. Every minute of changeover lost is capacity lost." },
      { h: 'Equipment reliability.',      body: 'Aging assets, mixed equipment fleets from acquisitions, and the cost of unplanned downtime on high-volume lines make maintenance discipline a direct margin lever.' },
      { h: 'Supply chain stress.',        body: 'Single-source ingredients, packaging shortages, transportation costs, and freight reliability create variability that compounds through every production schedule.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied where high-volume execution meets food safety.' },
    workIntro: "The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In food and beverage manufacturing, every discipline has to honor food safety from the first hour we're on the floor.",
    disciplines: [
      { h: 'Operational Discipline:',   body: 'Standards that survive audit. Routines documented to SQF, BRC, and FSMA expectations. The structural elimination of variation in environments where deviation has reputational, regulatory, and consumer-safety consequences.' },
      { h: 'Frontline Leadership:',     body: 'Supervisors who can plan a shift, run a changeover, manage a deviation, and hold the standard during a customer audit. The behavioral skill set is wider because the consequences run wider.' },
      { h: 'Equipment Reliability:',    body: 'Maintenance practices designed around food-grade equipment, sanitation cycles, and the changeover demands that high-mix production carries. Uptime matters financially. Sanitation status matters operationally.' },
      { h: 'Workforce Capability:',     body: 'Operators who hold the standard during inspection, train the next shift through documented procedures, and own the outcome in environments where the outcome reaches the consumer.' },
      { h: 'Daily Accountability:',     body: 'The cadence, metrics, and structured conversations that close the loop on production, quality, food safety, and sanitation in the same daily rhythm. Four streams of accountability, one operating system.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in food and beverage engagements include:',
    outcomesList: ['Overall Equipment Effectiveness (OEE)','Line speed and capacity utilization','Changeover time across multi-product lines','First-pass yield and quality rate','Production volume against demand forecast','Throughput across high-volume packaging and processing lines','Labor productivity and cost per unit','Waste and giveaway reduction','Sanitation cycle efficiency','On-time delivery to customer','Schedule attainment','Audit readiness and inspection outcomes'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Food and beverage is one of the broadest manufacturing categories in the U.S. economy. Our engagement experience spans the operational realities of each sub-segment.',
    subSegments: ['Bakery and snack food manufacturing','Beverage manufacturing including non-alcoholic, carbonated, juice, and functional categories','Dairy manufacturing including fluid milk, cultured products, and cheese','Frozen food manufacturing','Ready-meal and prepared food operations','Co-packed and contract manufacturing','CPG-branded food operations','Specialty and artisanal food producers operating at scale','Plant-based and alternative protein manufacturing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the food safety architecture, and the customer cadence we build inside.',
    whyBody: [
      "Most consulting firms in food and beverage diagnose, recommend, and leave. The slide decks reference SQF, OEE, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, quality, food safety, and sanitation together. We build the execution capability directly into your supervisors, your standard work, your daily operating routines. And what we build sustains performance long after we\u2019re gone.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 2. Meat & Poultry Processing ─────────────── */
  {
    slug: 'meat-poultry-processing',
    name: 'Meat & Poultry Processing',
    eyebrow: 'Food, Beverage & Consumer',
    hero: {
      h1Top: 'Yield, throughput, safety.',
      h1Accent: 'All three, every shift.',
      lede: 'Protein processing is the most operationally intensive manufacturing category we serve. Live-bird and live-animal supply, USDA inspection cadence, labor-intensive execution, and yield economics that turn on basis points. We build the execution capability that protects all of it under pressure.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'meat and poultry processing.' },
    pressuresIntro: 'Meat and poultry processors operate under conditions no other manufacturing category fully replicates. The pressures land daily and the financial consequence of underperformance is direct.',
    pressures: [
      { h: 'Yield economics.',         body: 'Every basis point of yield improvement on protein lines moves directly to the bottom line. Yield variance across shifts, lines, and operators is where the largest unclaimed margin lives.' },
      { h: 'USDA inspection cadence.', body: 'Federal inspection presence on the line, HACCP discipline, and regulatory expectations on food safety make compliance an operational performance dimension that runs every minute of production.' },
      { h: 'Labor execution.',         body: 'Protein processing remains one of the most labor-intensive food manufacturing categories. Frontline supervisor capability, training continuity, and labor coverage are direct margin levers.' },
      { h: 'Live supply variability.', body: 'Bird and animal weights, sizing variability, seasonal supply patterns, and grower coordination all introduce upstream variability that the plant has to absorb without losing yield or throughput.' },
      { h: 'Equipment uptime.',        body: 'Continuous processing lines carry no tolerance for unplanned downtime. Maintenance discipline and reliability practices determine whether shifts hit target or miss.' },
      { h: 'Sanitation cycles.',       body: 'Daily sanitation requirements compress the production window. Sanitation efficiency and changeover discipline determine how much of each day is available for revenue-generating production.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied where yield, throughput, and safety converge.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In meat and poultry processing, every discipline has to honor yield economics, USDA inspection, and live supply variability simultaneously.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that survive USDA inspection. Yield-discipline routines documented to consistent execution. The structural elimination of variation in environments where every basis point of yield translates to bottom-line impact.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage live supply variability, run a yield conversation with the line, and hold the standard during inspection. The shift superintendent role carries more operational weight in protein than almost any other manufacturing category.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around continuous processing lines, sanitation cycles, and the throughput demands protein operations carry. Uptime is yield. Sanitation status is compliance.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the yield standard, train the next shift, and own the outcome in environments where labor execution is one of the largest variables in margin.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on yield, throughput, food safety, and labor in the same daily rhythm. Four streams of accountability, one operating system.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in protein processing engagements include:',
    outcomesList: ['Yield against standard','Throughput per labor hour','Pounds-per-bird and yield-per-head economics','Line speed and capacity utilization','First-pass yield and giveaway reduction','Schedule attainment by shift','Labor productivity and cost per pound','Sanitation cycle efficiency','Maintenance and reliability spend','Overtime reduction','Workforce retention and training continuity','USDA-related compliance outcomes'],
    outcomesClose: 'Our published case study work in meat and poultry processing includes multi-million-dollar annualized savings, double-digit productivity gains, and yield recoveries that pay back engagement costs within months. Operational gains translate into annualized savings rate, weekly cash flow, and total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Protein processing is a deeply varied category operationally. Our engagement experience spans the realities of each sub-segment.',
    subSegments: ['Poultry processing including broiler operations, turkey processing, and independent poultry producers','Beef processing including primary processing, fabrication, and value-added meat operations','Pork processing including primary and further processing','Premium and specialty protein manufacturing','Ground and case-ready meat operations','Value-added meats and prepared protein products','Cold storage and protein distribution operations connected to processing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the yield economics, and the inspection architecture we build inside.',
    whyBody: [
      "Most consulting firms in protein processing diagnose, recommend, and leave. The slide decks reference HACCP, yield, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds yield, throughput, safety, and labor together. We have more published case study depth in meat and poultry processing than in any other manufacturing category we serve. The work we do here is the work we know best.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 3. Consumer Packaged Goods ─────────────── */
  {
    slug: 'consumer-packaged-goods',
    name: 'Consumer Packaged Goods',
    eyebrow: 'Food, Beverage & Consumer',
    hero: {
      h1Top: 'Demand that shifts daily.',
      h1Accent: 'Operations that have to keep up.',
      lede: 'CPG operations live at the intersection of retail responsiveness, brand commitments, and the multi-plant coordination that consumer markets require. We build the execution capability that holds margin together when demand, SKU complexity, and supply chain all move at once.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'consumer packaged goods.' },
    pressuresIntro: "CPG manufacturers operate under retail and consumer pressures that compound quickly. The operational discipline required to absorb that compound pressure is what separates the platforms that perform from the ones that don't.",
    pressures: [
      { h: 'SKU complexity.',           body: 'Brand extensions, package variants, regional formulations, and private label commitments multiply the operational complexity of every line. Changeover discipline becomes a margin lever, not an operational nuisance.' },
      { h: 'Retail cadence.',           body: 'Large retail customers operate on planning cadences that compress production lead time. Fill-rate expectations leave no operational slack for executional drift.' },
      { h: 'Demand variability.',       body: "Promotional cycles, seasonal patterns, and channel-specific demand create planning challenges that legacy ERP systems can't fully absorb." },
      { h: 'Cost pressure.',            body: 'Commodity inputs, packaging costs, freight rates, and labor inflation all move at once. Margin protection runs through operational discipline rather than pricing power for most CPG categories.' },
      { h: 'Multi-plant coordination.', body: 'Many CPG operations run multiple plants producing related or identical SKUs. Performance variance across plants represents one of the largest unclaimed efficiencies in the category.' },
      { h: 'Sustainability commitments.', body: 'Brand-level sustainability targets translate into operational requirements at the plant level: waste reduction, water efficiency, energy intensity, packaging optimization.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied where retail meets the production floor.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In CPG, every discipline has to honor brand commitments, retail expectations, and multi-plant consistency at the same time.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that produce the same product at the same quality across plants, shifts, and regions. The structural elimination of variation in environments where brand consistency is the customer commitment.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage a SKU changeover, hold the brand standard, and run an operational conversation that aligns with corporate operating cadence.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around high-mix production, packaging line uptime, and the operational tempo CPG retail commitments require.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the standard across SKUs, train the next shift, and own the outcome in environments where the outcome reaches the consumer at retail.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, quality, customer fill rate, and cost in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in CPG engagements include:',
    outcomesList: ['Overall Equipment Effectiveness (OEE)','Line speed and capacity utilization','Changeover time on high-mix lines','First-pass yield and quality rate','Customer fill rate','Schedule attainment','Cost per unit','Labor productivity','Waste and scrap reduction','Cross-plant performance variance reduction','Sustainability metrics including energy intensity and packaging waste','On-time delivery to retail'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'CPG covers more product categories than any single industry term can hold. Our engagement experience spans the operational realities of each.',
    subSegments: ['Food CPG including center-store, frozen, and refrigerated categories','Beverage CPG including non-alcoholic and alcoholic beverage operations','Household and personal care manufacturing','Health and wellness CPG','Pet food and pet care products','Specialty and niche CPG operations under private equity ownership','Co-packed and contract manufacturing operations serving CPG brand owners','Private label manufacturing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context and the customer architecture we build inside.',
    whyBody: [
      "Most consulting firms in CPG diagnose, recommend, and leave. The slide decks reference OEE, changeover, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, across multiple plants when scope requires, inside the management operating system that holds production, quality, fulfillment, and cost together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 4. Animal Nutrition & Feed Manufacturing ─────────────── */
  {
    slug: 'animal-nutrition-feed-manufacturing',
    name: 'Animal Nutrition & Feed Manufacturing',
    eyebrow: 'Food, Beverage & Consumer',
    hero: {
      h1Top: 'Precision blending, batch discipline,',
      h1Accent: 'ingredient cost on the line.',
      lede: 'Animal nutrition and feed manufacturing operate on margins that ingredient cost and batch precision define. We build the execution capability that protects margin when commodity inputs move and when customer requirements get more specific.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'animal nutrition and feed.' },
    pressuresIntro: 'Feed and animal nutrition manufacturers operate in conditions where commodity costs, customer specificity, and regulatory requirements all run in parallel. Operational discipline is what separates the operations that hold margin from the ones that absorb it.',
    pressures: [
      { h: 'Ingredient cost volatility.', body: 'Commodity inputs across grains, oilseeds, vitamins, and specialty additives move continuously. Operational efficiency is one of the few levers that protects margin when input costs shift.' },
      { h: 'Batch precision.',            body: 'Customer formulations carry tight tolerance on ingredient inclusion rates. Batch variance has direct downstream consequences in livestock, dairy, poultry, aquaculture, and pet feed customers.' },
      { h: 'FDA-CVM compliance.',         body: 'FDA Center for Veterinary Medicine oversight, medicated feed regulations, and ingredient traceability requirements have raised the floor on documentation and process discipline.' },
      { h: 'Customer specificity.',       body: "Modern animal nutrition customers expect formulation precision, ingredient transparency, and operational responsiveness that legacy feed mill operations weren't designed for." },
      { h: 'Equipment uptime.',           body: 'Pellet mills, mixers, conditioners, and packaging lines all carry uptime requirements that determine whether the mill can hit weekly throughput targets.' },
      { h: 'Labor and training continuity.', body: 'Feed mill operations require specialized operator skills that recruiting and training programs increasingly struggle to maintain at scale.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to feed manufacturing realities.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In animal nutrition, every discipline has to honor batch precision, ingredient cost discipline, and customer-specific formulation requirements.',
    disciplines: [
      { h: 'Operational Discipline:', body: "Standards that produce consistent batch precision across shifts, mills, and operators. The structural elimination of variation in environments where formulation accuracy reaches the customer's herd or flock." },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage a formulation change, hold the standard during a customer audit, and run a yield conversation with the mill.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around pellet mills, mixers, conditioners, and the operational tempo feed mills require. Uptime is throughput. Throughput is customer service.' },
      { h: 'Workforce Capability:',   body: "Operators who hold the precision standard, train the next shift, and own the outcome in environments where outcome reaches the customer's animals." },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, quality, ingredient cost, and customer service in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in animal nutrition engagements include:',
    outcomesList: ['Batch precision and formulation accuracy','Throughput per mill','Pellet mill production rate and conversion efficiency','Ingredient yield and shrink reduction','Maintenance reliability and spend','Labor productivity and cost per ton','Schedule attainment','Customer fill rate','Quality and compliance outcomes','Energy intensity per ton'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Animal nutrition covers a wider range of operations than the term sometimes suggests. Our engagement experience spans the operational realities of each.',
    subSegments: ['Livestock feed manufacturing including cattle, swine, and small ruminant nutrition','Poultry feed manufacturing including broiler, layer, and turkey nutrition','Dairy nutrition','Aquaculture feed manufacturing','Pet food manufacturing including dry, wet, and specialty pet nutrition','Equine nutrition','Specialty and premium nutrition manufacturing','Premix and ingredient manufacturing supplying the broader feed industry'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the regulatory architecture, and the customer cadence we build inside.',
    whyBody: [
      "Most consulting firms in animal nutrition diagnose, recommend, and leave. The slide decks reference batch precision, yield, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, quality, ingredient cost, and customer service together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 5. Agribusiness ─────────────── */
  {
    slug: 'agribusiness',
    name: 'Agribusiness',
    eyebrow: 'Food, Beverage & Consumer',
    hero: {
      h1Top: 'Commodity throughput, seasonal capacity,',
      h1Accent: 'the integration of ag and operations.',
      lede: 'Agribusiness operates where commodity flow, processing, transportation, and customer commitments converge. We build the execution capability that holds throughput and margin together across the seasonal and structural pressures the sector lives under.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'agribusiness.' },
    pressuresIntro: 'Agribusiness operations live with structural pressures that few other manufacturing categories carry simultaneously. The discipline required to operate under all of them is what separates the platforms that compound from those that absorb their margins.',
    pressures: [
      { h: 'Seasonal capacity.',         body: 'Many agribusiness operations face peak-season throughput demands that test capacity, labor coverage, and equipment reliability all at once. Off-season margin discipline is what funds peak-season execution.' },
      { h: 'Commodity flow management.', body: 'Grain handling, storage cycling, transportation coordination, and quality preservation through the supply chain all carry operational discipline requirements that drift quickly without active management.' },
      { h: 'Processing yield.',          body: 'Milling, crushing, drying, and processing operations all live on yield economics where basis-point improvements translate directly to margin.' },
      { h: 'Transportation coordination.', body: 'Rail, truck, and barge logistics, demurrage management, and shipping window discipline all introduce variability that compounds through every customer commitment.' },
      { h: 'Workforce continuity.',      body: 'Agribusiness operations often run in rural and semi-rural labor markets where workforce capability, training continuity, and leadership development face distinct constraints.' },
      { h: 'Customer cadence.',          body: 'Downstream food, feed, and industrial customers operate on cadences that compress agribusiness lead time and leave little slack for executional drift.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to agribusiness operating reality.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In agribusiness, every discipline has to honor commodity flow, seasonal pressure, and the customer commitments downstream depend on.',
    disciplines: [
      { h: 'Operational Discipline:', body: "Standards that hold during peak season and off season alike. The structural elimination of variation in environments where commodity flow and customer cadence don't pause for executional drift." },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage seasonal labor, run a yield conversation, and hold the standard when conditions and weather and supply all shift at once.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around processing equipment, storage infrastructure, and transportation loading operations. Uptime determines whether the operation can meet downstream customer commitments.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the standard through seasonal pressure, train the next shift, and own the outcome in environments where rural labor markets carry distinct constraints.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on throughput, yield, quality, and customer service in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in agribusiness engagements include:',
    outcomesList: ['Throughput per facility per day','Processing yield and shrink reduction','Storage cycle efficiency','Transportation utilization and demurrage reduction','Equipment reliability and uptime','Labor productivity','Peak-season capacity utilization','Schedule attainment','Customer fill rate','Quality outcomes through the supply chain'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Agribusiness covers a broader operational range than any single label can hold. Our engagement experience spans the realities of each sub-segment.',
    subSegments: ['Grain handling and storage operations including country and terminal elevators','Oilseed crushing and refining','Sugar and sweetener processing','Specialty crop processing including nuts, fruit, and produce','Grower-cooperative operations','Agricultural input manufacturing and distribution','Logistics and transportation operations supporting agribusiness flow','Integrated agribusiness operations connecting commodity flow to processing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the commodity dynamics, and the customer architecture we build inside.',
    whyBody: [
      "Most consulting firms in agribusiness diagnose, recommend, and leave. The slide decks reference throughput, yield, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds throughput, processing, transportation, and customer commitments together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 6. Pharmaceuticals & Medical Devices ─────────────── */
  {
    slug: 'pharmaceuticals-medical-devices',
    name: 'Pharmaceuticals & Medical Devices',
    eyebrow: 'Regulated Manufacturing',
    hero: {
      h1Top: 'Regulated manufacturing,',
      h1Accent: 'under pressure to perform.',
      lede: "Volatile demand. Global supply chain stress. Tightening regulatory regimes. And operational performance expectations that don't bend when the conditions do. We build the execution capability that makes performance sustainable across all of it.",
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'pharma and medical devices.' },
    pressuresIntro: "Pharmaceutical and medical device manufacturing now operates in conditions the industry hasn't seen at this combined intensity before. The pressures are familiar individually. What's new is how many of them are landing at once, on operations that were built for steadier conditions.",
    pressures: [
      { h: 'Demand volatility.',       body: 'Shifts in therapeutic mix, post-pandemic baseline resets, niche medicine growth, and biologics expansion are all moving demand patterns faster than legacy planning systems can track.' },
      { h: 'Supply chain stress.',     body: 'Single-source suppliers, transportation bottlenecks, ingredient costs, and geographic concentration of API and component manufacturing create variability that compounds through the operation.' },
      { h: 'Regulatory expansion.',    body: "FDA, EMA, and emerging regional regulators have raised the floor on data integrity, traceability, and process documentation. Compliance is no longer a quality function. It's an operational performance dimension." },
      { h: 'Equipment uptime.',        body: 'Sterile processing, fill-finish, and high-precision device assembly carry no tolerance for unplanned downtime. Maintenance discipline has become a financial lever rather than a cost center.' },
      { h: 'Workforce capability.',    body: 'Aging skilled operators, training gap inheritance from previous reductions, and the cost of recruiting qualified talent in regulated manufacturing have all increased the financial cost of execution variability.' },
      { h: 'M&A integration.',         body: "Industry consolidation has produced operations running on inherited systems, mismatched standards, and parallel cultures that the merger thesis didn't fully account for." },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied where regulation meets operation.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In life sciences manufacturing, every discipline carries a regulatory dimension that has to be honored from day one.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that survive audit. Routines documented to FDA expectations. The structural elimination of variation in environments where deviation has reputational, regulatory, and patient-safety consequences.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can lead a shift, manage a deviation, and run a CAPA conversation with the same fluency they bring to hourly production targets. The behavioral skill set is wider because the consequences run wider.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around qualified equipment, validated processes, and the change-control implications that follow every adjustment. Uptime matters financially. Validation status matters operationally.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the standard during inspection, train the next shift through documented procedures, and own the outcome in environments where the outcome reaches the patient.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, quality, compliance, and safety in the same daily rhythm. Four streams of accountability, one operating system.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in pharma and medical device engagements include:',
    outcomesList: ['Overall Equipment Effectiveness (OEE)','Right-First-Time (RFT) production','Batch release cycle time','Cost of quality and deviation rate','Schedule attainment','Labor productivity','Capacity utilization','Maintenance reliability and spend','Audit readiness and inspection outcomes','Cross-site performance variance reduction'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Life sciences manufacturing covers a wide operational spectrum. Our engagement experience spans the realities of each sub-segment.',
    subSegments: ['Sterile manufacturing including fill-finish and aseptic operations','Solid dose pharmaceutical manufacturing','Biologics and biopharmaceutical operations','API and intermediate manufacturing','Medical device manufacturing including Class I, II, and III devices','Combination products','Contract development and manufacturing organizations (CDMOs)','Specialty and orphan drug manufacturing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the regulatory architecture, and the validation framework we build inside.',
    whyBody: [
      "Most consulting firms in life sciences diagnose, recommend, and leave. The slide decks reference FDA, OEE, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, quality, compliance, and safety together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 7. Aerospace & Defense ─────────────── */
  {
    slug: 'aerospace-defense',
    name: 'Aerospace & Defense',
    eyebrow: 'Regulated Manufacturing',
    hero: {
      h1Top: 'Fixed price. Compliance. Make-to-order.',
      h1Accent: 'The operating reality of aerospace and defense.',
      lede: 'Aerospace and defense operations live where AS9100 compliance, fixed-price contract economics, low-volume high-mix production, and the competitive bid posture meet on the same floor. We build the execution capability that holds margin and reliability together in environments where the customer cares about both.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'aerospace and defense.' },
    pressuresIntro: 'Aerospace and defense manufacturers operate under a combination of pressures that few other manufacturing categories carry. The financial consequence of executional drift is direct and visible.',
    pressures: [
      { h: 'Fixed-price contract economics.', body: 'Cost overruns absorb margin directly. Schedule slippage produces liquidated damages. Operational discipline is the largest variable in whether the bid is a winner or a write-down.' },
      { h: 'AS9100 and regulatory discipline.', body: 'Aerospace quality system requirements, customer-specific quality requirements, and government contracting compliance have raised the floor on documentation, traceability, and process discipline.' },
      { h: 'Make-to-order, low-volume high-mix.', body: 'Aerospace and defense production rarely benefits from the volume economics other manufacturing categories run on. Operational efficiency lives in changeover discipline, setup reduction, and configuration management.' },
      { h: 'Competitive bid posture.',         body: 'New contract awards depend on operational track record. On-time delivery, quality outcomes, and cost performance from previous engagements set the bid posture for future business.' },
      { h: 'Workforce capability.',            body: 'Skilled aerospace and defense operators, supervisor capability gaps, and the cost of training continuity in clearance-required environments are direct variables in operational performance.' },
      { h: 'Equipment uptime.',                body: 'High-precision manufacturing, machining centers, and specialized equipment carry uptime requirements that determine whether contractual commitments hold.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied where AS9100 meets fixed-price discipline.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In aerospace and defense, every discipline has to honor AS9100 compliance, fixed-price economics, and customer-driven schedule commitments simultaneously.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that survive customer audit and government inspection. Routines documented to AS9100 and customer-specific quality expectations. The structural elimination of variation in environments where every deviation carries contractual consequence.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage a contract change, hold the standard during a customer audit, and run an operational conversation that drives root cause rather than just activity.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around high-precision manufacturing, specialized equipment, and the configuration management implications that follow every change.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the quality standard, train the next shift, and own the outcome in environments where skilled aerospace labor is scarce and the customer cares about traceability.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, quality, schedule, and cost in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in aerospace and defense engagements include:',
    outcomesList: ['On-time delivery to customer','First-pass yield and right-first-time production','Schedule attainment','Cost performance against fixed-price contract baseline','Capacity utilization on low-volume high-mix lines','Changeover and setup time reduction','Labor productivity','Maintenance reliability and spend','Customer audit outcomes','Configuration management discipline'],
    outcomesClose: 'Our published case study work in aerospace and defense includes on-time performance moving from 56% to 89% inside a make-to-order defense operation. Operational gains translate into annualized savings rate, weekly cash flow, and total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Aerospace and defense covers a wide operational spectrum. Our engagement experience spans the realities of each sub-segment.',
    subSegments: ['Defense contractor manufacturing including make-to-order operations','Commercial aerospace including structures, engines, and components','Tier-1 aerospace suppliers','Tier-2 and Tier-3 aerospace and defense subcontractors','Aerospace MRO (maintenance, repair, overhaul) operations','Specialty aerospace manufacturing including composites and additive','Government contracting operations including DoD prime and subcontract work','Space sector manufacturing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the regulatory architecture, and the customer cadence we build inside.',
    whyBody: [
      "Most consulting firms in aerospace and defense diagnose, recommend, and leave. The slide decks reference AS9100, OEE, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, quality, schedule, and cost together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 8. Automotive Manufacturing ─────────────── */
  {
    slug: 'automotive-manufacturing',
    name: 'Automotive Manufacturing',
    eyebrow: 'Regulated Manufacturing',
    hero: {
      h1Top: 'OEM cadence. Tier-1 discipline.',
      h1Accent: 'Cost per unit that holds.',
      lede: 'Automotive manufacturers operate under OEM-driven schedule pressure, tier qualification requirements, and cost-per-unit economics that compound through every component. We build the execution capability that protects margin and customer relationships across the cadence automotive lives under.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'automotive manufacturing.' },
    pressuresIntro: 'Automotive operations face pressures that no other manufacturing category combines in quite the same way. The discipline required to hold all of them simultaneously is what separates the suppliers that compound from those that absorb pricing pressure.',
    pressures: [
      { h: 'OEM-driven schedule pressure.', body: 'Customer build schedules, just-in-time delivery, and OTIF expectations leave no operational slack for executional drift. Schedule attainment is a direct variable in customer relationship and future business.' },
      { h: 'Tier qualification requirements.', body: 'IATF 16949, customer-specific quality requirements, and APQP/PPAP discipline have raised the floor on documentation and process integrity throughout the supplier base.' },
      { h: 'Cost-per-unit economics.',      body: 'Annual price-down expectations from OEMs require operational efficiency gains every year. The supplier that holds margin is the supplier that builds operational discipline.' },
      { h: 'EV and product transition.',    body: 'Electric vehicle programs, propulsion changes, and product architecture shifts are reshuffling product mix faster than legacy operations can adapt.' },
      { h: 'Workforce capability.',         body: 'Skilled automotive operators, supervisor capability gaps, and the cost of training continuity in tier-1 and tier-2 environments are direct variables in operational performance.' },
      { h: 'Equipment uptime.',             body: 'Press operations, assembly lines, and high-precision component manufacturing all carry uptime requirements that determine whether customer commitments hold.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied where OEM cadence meets the production floor.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In automotive, every discipline has to honor OEM expectations, tier qualification, and cost-per-unit discipline simultaneously.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that survive IATF audit and customer inspection. Routines documented to IATF 16949 and customer-specific quality requirements. The structural elimination of variation in environments where customer commitments compound across thousands of parts per day.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage a changeover, hold the standard during a customer audit, and run a productivity conversation that drives root cause.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around continuous high-volume production, customer-driven schedule pressure, and the changeover demands automotive operations carry.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the quality standard, train the next shift, and own the outcome in environments where customer cadence determines weekly performance.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, quality, schedule, and cost in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in automotive engagements include:',
    outcomesList: ['Overall Equipment Effectiveness (OEE)','Throughput per line','Changeover time','First-pass yield and PPM defect rate','On-time-in-full (OTIF) delivery','Schedule attainment','Labor productivity and cost per unit','Overtime reduction','Maintenance reliability and spend','Capacity utilization','Customer-driven quality outcomes including PPAP performance'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered. Our published case study work in automotive includes productivity gains over 30%, OTIF improvements over 80%, and overtime reductions over 85%.',
    subSegmentsIntro: 'Automotive covers a wide operational range. Our engagement experience spans the sub-segments that carry distinct execution challenges.',
    subSegments: ['Tier-1 suppliers including blow and injection mold parts, electronics, and assemblies','Tier-2 component manufacturers','Powertrain and propulsion components','Electric vehicle and EV-component manufacturing','Body, chassis, and structural components','Interior components and trim','Aftermarket and replacement parts manufacturing','Specialty automotive suppliers'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific OEM relationship architecture and the customer cadence we build inside.',
    whyBody: [
      "Most consulting firms in automotive diagnose, recommend, and leave. The slide decks reference IATF 16949, OEE, OTIF, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, quality, schedule, and cost together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 9. Industrial Manufacturing ─────────────── */
  {
    slug: 'industrial-manufacturing',
    name: 'Industrial Manufacturing',
    eyebrow: 'Industrial & Heavy Industry',
    hero: {
      h1Top: 'Durable goods. Fabrication. Furniture.',
      h1Accent: 'The breadth where execution wins.',
      lede: "Industrial manufacturing covers the operational categories where durable products get made: fabrication, furniture, wood products, primary metals, and the broader manufacturing operations that don't fit a more specific vertical. We build the execution capability that protects margin and capacity across all of them.",
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'industrial manufacturing.' },
    pressuresIntro: 'Industrial manufacturers face pressures that compound across cost, complexity, and capability. Operational discipline is what separates the platforms that scale from the ones that absorb pressure as margin compression.',
    pressures: [
      { h: 'Cost pressure.',          body: 'Material costs, energy intensity, freight rates, and labor inflation all move at once. Margin protection runs through operational discipline rather than pricing power for most industrial categories.' },
      { h: 'Skilled labor shortages.', body: 'Skilled operator shortages, supervisor capability gaps, and the cost of training continuity in industrial environments are direct variables in operational performance.' },
      { h: 'Equipment reliability.',  body: 'Capital-intensive industrial production carries no tolerance for unplanned downtime. Maintenance discipline determines whether the operation hits schedule.' },
      { h: 'Product mix complexity.', body: "Custom orders, configured products, and customer-specific runs introduce changeover demands legacy operations weren't designed for." },
      { h: 'Global competition.',     body: 'Domestic industrial manufacturers face international competition that compresses pricing while domestic cost bases continue rising. Operational efficiency is one of the few durable competitive levers.' },
      { h: 'Floor space and layout.', body: 'Many industrial operations have grown into facilities that the current product mix has outgrown. Floor utilization, layout discipline, and material flow are often unclaimed performance levers.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to industrial manufacturing reality.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In industrial manufacturing, every discipline has to honor cost discipline, schedule attainment, and the operational breadth durable goods require.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that hold across custom runs, configured products, and high-mix production. The structural elimination of variation in environments where every operational handoff is a margin event.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage product-mix complexity, hold the standard during customer inspection, and run an operational conversation that drives root cause rather than just activity.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around capital-intensive equipment, configured tooling, and the operational tempo industrial production carries.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the standard across product mix, train the next shift, and own the outcome in environments where skilled labor is scarce.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, quality, schedule, and cost in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in industrial manufacturing engagements include:',
    outcomesList: ['Productivity per labor hour','Throughput per cell','Changeover time','First-pass yield','Cost per unit','Capacity utilization','Floor space recovery','Maintenance reliability and spend','Schedule attainment','Customer fill rate','Material yield and scrap reduction'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered. Our published case study work in industrial manufacturing includes productivity gains of 49% with simultaneous labor cost reduction and wage increases, and over $2M in annualized savings.',
    subSegmentsIntro: 'Industrial manufacturing is one of the broadest categories we serve. Our engagement experience spans the sub-segments that carry distinct execution challenges.',
    subSegments: ['Home furnishings and furniture manufacturing','Wood products manufacturing','Fabricated metal products','Primary metal manufacturing','Industrial equipment manufacturing','Building products manufacturing','Specialty industrial products','Configured-to-order industrial operations','Engineered-to-order industrial operations'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the product architecture, and the customer cadence we build inside.',
    whyBody: [
      "Most consulting firms in industrial manufacturing diagnose, recommend, and leave. The slide decks reference productivity, yield, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, quality, schedule, and cost together. We build the execution capability directly into your supervisors, your standard work, your daily operating routines.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 10. Metals & Mining ─────────────── */
  {
    slug: 'metals-mining',
    name: 'Metals & Mining',
    eyebrow: 'Industrial & Heavy Industry',
    hero: {
      h1Top: 'Heavy industry, scale economics,',
      h1Accent: 'execution that holds under pressure.',
      lede: 'Metals and mining operate where commodity-price volatility, capital intensity, and operational complexity converge. We build the execution capability that protects margin across the cycle and the operational pressure that defines the sector.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'metals and mining.' },
    pressuresIntro: 'Metals and mining operations live with structural pressures that few other industries carry at the same combined intensity. Operational discipline is what separates the operations that hold margin from the ones that absorb commodity downcycles.',
    pressures: [
      { h: 'Commodity price exposure.', body: "Output prices move on commodity markets the operation doesn't control. Margin protection runs through cost discipline and operational efficiency across the full cycle." },
      { h: 'Capital intensity.',        body: 'Equipment investment, plant maintenance, and capacity utilization all carry outsized financial weight. Asset productivity is one of the largest single variables in returns.' },
      { h: 'Energy intensity.',         body: 'Metals and mining operations are among the most energy-intensive manufacturing categories. Energy efficiency, process optimization, and operational discipline all translate directly to margin.' },
      { h: 'Safety discipline.',        body: 'Heavy industry operations carry safety expectations and incident consequences that exceed most other manufacturing categories. Operational discipline and safety discipline run on the same systems.' },
      { h: 'Workforce continuity.',     body: 'Skilled metals and mining operators, supervisor depth, and training continuity in heavy industry are direct variables in operational performance.' },
      { h: 'Environmental compliance.', body: 'EPA, state, and emerging international environmental regulations have raised the floor on operational discipline, documentation, and process controls.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to heavy industry reality.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In metals and mining, every discipline has to honor safety, environmental compliance, and asset productivity simultaneously.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that hold across commodity downcycles and upcycles alike. The structural elimination of variation in environments where every operational deviation carries safety, environmental, and financial consequences.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage a safety conversation, hold the standard during operational disruption, and run an asset-productivity conversation that drives root cause.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around capital-intensive equipment, mining infrastructure, and the operational tempo heavy industry requires. Uptime is asset productivity. Asset productivity is return on capital.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the safety standard, train the next shift, and own the outcome in environments where skilled heavy-industry labor is increasingly scarce.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, safety, environmental, and cost in the same daily rhythm. Four streams of accountability, one operating system.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in metals and mining engagements include:',
    outcomesList: ['Throughput and capacity utilization','Equipment reliability and uptime','Energy intensity per ton','Maintenance and reliability spend','Labor productivity','Yield and recovery rates','Cost per ton','Safety incident rates','Environmental compliance outcomes','Schedule attainment','Asset productivity per capital dollar deployed'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered. Our published case study work in metals manufacturing includes annualized savings exceeding $2M for global aluminum producers.',
    subSegmentsIntro: 'Metals and mining covers a broad range of operations from extraction through finished products. Our engagement experience spans the sub-segments that carry distinct execution challenges.',
    subSegments: ['Primary metal manufacturing including aluminum and steel production','Fabricated metal products','Mining operations including extraction, processing, and beneficiation','Metals processing including extrusion, rolling, and casting','Specialty metals and alloys','Recycling and secondary metals operations','Mining equipment and services'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the regulatory architecture, and the asset structure we build inside.',
    whyBody: [
      "Most consulting firms in metals and mining diagnose, recommend, and leave. The slide decks reference asset productivity, OEE, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, safety, environmental compliance, and cost together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 11. Oil & Gas ─────────────── */
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    eyebrow: 'Industrial & Heavy Industry',
    hero: {
      h1Top: 'Capital discipline, commodity exposure,',
      h1Accent: 'execution that holds across the cycle.',
      lede: 'Oil and gas operations live where capital intensity, commodity-price volatility, and operational complexity meet. We build the execution capability that protects margin and capital efficiency across upstream, midstream, and downstream operations.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'oil and gas.' },
    pressuresIntro: 'Oil and gas operators face pressures that compound across cost, capital, and regulatory dimensions. Operational discipline is what separates the platforms that compound returns through the cycle from those that absorb commodity downcycles as margin destruction.',
    pressures: [
      { h: 'Commodity-price exposure.',     body: "Output prices move on commodity markets the operation doesn't control. Cost discipline and operational efficiency determine whether the asset returns capital across the cycle." },
      { h: 'Capital intensity.',            body: 'Drilling, completion, processing, and pipeline operations all carry capital weight that demands asset productivity discipline.' },
      { h: 'Safety and environmental discipline.', body: 'Operational incidents carry consequences that exceed most other manufacturing categories. Safety discipline, operational discipline, and environmental compliance all run on the same systems.' },
      { h: 'Workforce continuity.',         body: 'Skilled operators, supervisor depth, and training continuity in oil and gas operations are direct variables in operational performance and safety outcomes.' },
      { h: 'Asset reliability.',            body: 'Capital-intensive infrastructure carries no tolerance for unplanned downtime. Maintenance and reliability discipline directly determine production rate and return on assets.' },
      { h: 'Regulatory expansion.',         body: 'EPA, state, federal, and international regulators have raised the floor on operational discipline, documentation, and process controls across the sector.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to oil and gas operating reality.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In oil and gas, every discipline has to honor safety, environmental compliance, capital productivity, and the commodity cycle simultaneously.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that hold across commodity cycles and operational disruption. The structural elimination of variation in environments where every deviation carries safety, environmental, and financial consequences.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan operations, manage safety, hold the standard during operational disruption, and run a reliability conversation that drives root cause.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around capital infrastructure, processing equipment, and the operational tempo upstream, midstream, and downstream operations require.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the safety standard, train the next shift, and own the outcome in environments where skilled oil and gas labor is increasingly scarce.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, safety, environmental compliance, and cost in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in oil and gas engagements include:',
    outcomesList: ['Production rate and uptime','Asset reliability and equipment effectiveness','Maintenance and reliability spend','Labor productivity','Cost per unit (per barrel, per MCF, per ton)','Safety incident rates','Environmental compliance outcomes','Operational efficiency across the value chain','Capital productivity','Schedule attainment on turnarounds and maintenance windows'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Oil and gas covers the full value chain from extraction through finished products. Our engagement experience spans the sub-segments that carry distinct execution challenges.',
    subSegments: ['Upstream operations including drilling, completion, and production','Midstream operations including gathering, processing, transportation, and storage','Downstream operations including refining, petrochemicals, and finished products','Oilfield services','LNG operations','Specialty chemicals tied to the oil and gas value chain','Pipeline operations','Refining and downstream processing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the regulatory architecture, and the asset structure we build inside.',
    whyBody: [
      "Most consulting firms in oil and gas diagnose, recommend, and leave. The slide decks reference asset productivity, OEE, reliability, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, safety, environmental compliance, and cost together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 12. Chemicals ─────────────── */
  {
    slug: 'chemicals',
    name: 'Chemicals',
    eyebrow: 'Industrial & Heavy Industry',
    hero: {
      h1Top: 'Process manufacturing, batch and continuous,',
      h1Accent: 'operational discipline that holds.',
      lede: 'Chemical manufacturing operates where process complexity, regulatory expectations, and capital intensity converge. We build the execution capability that protects margin and reliability across batch and continuous chemical operations.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'chemical manufacturing.' },
    pressuresIntro: 'Chemical manufacturers face pressures that combine regulatory weight, capital intensity, and process complexity in ways few other industries do. Operational discipline is what separates the platforms that compound returns from those that absorb regulatory and operational risk as margin compression.',
    pressures: [
      { h: 'Regulatory expansion.', body: 'EPA, OSHA, REACH, TSCA, and emerging international chemical regulations have raised the floor on documentation, process discipline, and environmental controls.' },
      { h: 'Safety discipline.',    body: 'Process safety management, incident prevention, and reactive chemistry risk make safety discipline an operational performance dimension that runs continuously.' },
      { h: 'Capital intensity.',    body: 'Reactor systems, processing equipment, and pipeline infrastructure all carry capital weight that demands asset productivity discipline.' },
      { h: 'Process complexity.',   body: "Multi-step processes, batch operations, and continuous chemical production all carry execution complexity that legacy operations weren't designed for at modern margins." },
      { h: 'Workforce capability.', body: 'Skilled chemical operators, supervisor capability gaps, and the cost of training continuity are direct variables in operational performance and safety outcomes.' },
      { h: 'Energy intensity.',     body: 'Chemical manufacturing is among the most energy-intensive industries. Process efficiency and operational discipline translate directly to margin.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to chemical manufacturing reality.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In chemical manufacturing, every discipline has to honor safety, regulatory compliance, and process integrity simultaneously.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that survive regulatory inspection and process safety audit. The structural elimination of variation in environments where deviation has safety, environmental, and operational consequences.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage a safety conversation, hold the standard during regulatory inspection, and run a process reliability conversation.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around reactor systems, processing equipment, and the operational tempo chemical operations require.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the safety and process standards, train the next shift, and own the outcome in environments where skilled chemical labor is scarce.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on production, safety, environmental compliance, and cost in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in chemical manufacturing engagements include:',
    outcomesList: ['Production rate and throughput','Equipment reliability and uptime','Yield and product purity','Energy intensity per ton','Maintenance and reliability spend','Labor productivity','Cost per ton','Safety incident rates','Environmental compliance outcomes','Schedule attainment on turnarounds and maintenance windows','Process safety management compliance'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered.',
    subSegmentsIntro: 'Chemical manufacturing covers a broad range of operations from commodity chemicals through specialty products. Our engagement experience spans the sub-segments that carry distinct execution challenges.',
    subSegments: ['Commodity chemical manufacturing','Specialty chemical operations','Petrochemicals','Industrial gas operations','Coatings and surface treatment chemistry','Polymer and resin manufacturing','Agricultural chemicals','Performance chemicals serving downstream industries','Fine chemicals and intermediates'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the regulatory architecture, and the process complexity we build inside.',
    whyBody: [
      "Most consulting firms in chemicals diagnose, recommend, and leave. The slide decks reference reliability, OEE, process safety, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, safety, environmental compliance, and cost together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 13. Warehouse & Distribution ─────────────── */
  {
    slug: 'warehouse-distribution',
    name: 'Warehouse & Distribution',
    eyebrow: 'Operations & Logistics',
    hero: {
      h1Top: 'Throughput, accuracy, labor productivity.',
      h1Accent: 'The execution discipline distribution depends on.',
      lede: 'Warehouse and distribution operations live where customer service expectations, labor economics, and throughput requirements converge. We build the execution capability that protects accuracy, productivity, and service across the operational pressure distribution centers carry.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'warehouse and distribution.' },
    pressuresIntro: 'Distribution operations face pressures that combine customer service expectations, labor cost discipline, and operational complexity. The discipline required to operate under all of them simultaneously is what separates the platforms that scale from the ones that absorb pressure as service degradation.',
    pressures: [
      { h: 'Customer service cadence.', body: 'Modern distribution lives under fill-rate expectations, delivery windows, and accuracy requirements that leave no operational slack for executional drift.' },
      { h: 'Labor economics.',          body: 'Distribution operations are deeply labor-intensive. Frontline supervisor capability, picker productivity, and training continuity are direct variables in cost per unit handled.' },
      { h: 'SKU complexity and inventory pressure.', body: "Modern distribution carries SKU counts, slotting complexity, and inventory pressure that legacy operations weren't designed for." },
      { h: 'Throughput and capacity.',  body: 'Peak-season throughput demands, omnichannel order patterns, and customer-driven cadence test capacity, labor coverage, and equipment reliability simultaneously.' },
      { h: 'Accuracy and quality.',     body: 'Customer returns, accuracy failures, and quality lapses move directly through cost. Operational discipline determines whether accuracy holds at scale.' },
      { h: 'Equipment and material handling reliability.', body: 'Conveyors, sortation systems, and material handling equipment carry uptime requirements that determine whether the operation hits daily targets.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to distribution operating reality.' },
    workIntro: 'The disciplines we build are the same in every industry. What changes is how they land in the conditions you actually run under. In warehouse and distribution, every discipline has to honor customer service cadence, labor productivity, and accuracy simultaneously.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that hold across shifts, peak periods, and seasonal pressure. The structural elimination of variation in environments where customer service depends on consistent execution.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors who can plan a shift, manage labor coverage, hold the standard during peak operations, and run a productivity conversation that drives root cause rather than just activity.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices designed around material handling systems, conveyors, sortation equipment, and the operational tempo distribution operations require.' },
      { h: 'Workforce Capability:',   body: 'Operators who hold the accuracy standard, train the next shift, and own the outcome in environments where labor productivity is one of the largest variables in cost per unit.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on throughput, accuracy, productivity, and customer service in the same daily rhythm.' },
    ],
    outcomesIntro: 'We track impact on the operational metrics the business already measures, and we translate operational gains into bottom-line value reported in your existing financial language. The metrics we move in warehouse and distribution engagements include:',
    outcomesList: ['Throughput per labor hour','Cost per unit handled','Accuracy rate and error reduction','Inventory accuracy','Order fill rate','On-time shipping','Schedule attainment','Labor productivity and overtime reduction','Equipment uptime and reliability','Customer return rate','Cross-DC performance variance'],
    outcomesClose: 'Operational gains translate into the financial dimensions your CFO is already reporting on: annualized savings rate, weekly cash flow, total project cost reconciled against savings delivered. Our published case study work in warehouse and distribution includes productivity gains over 30%, shipping improvements over 50%, and labor cost reductions over 30%.',
    subSegmentsIntro: 'Warehouse and distribution covers a wide operational range from manufacturing-adjacent distribution to dedicated 3PL operations. Our engagement experience spans the sub-segments that carry distinct execution challenges.',
    subSegments: ['Manufacturer-owned distribution centers','Third-party logistics (3PL) operations','Cold storage and temperature-controlled distribution','E-commerce fulfillment operations','Retail distribution networks','Wholesale and B2B distribution','Cross-dock operations','Specialty distribution including high-value, regulated, and hazardous materials','Reverse logistics and returns processing'],
    subSegmentsClose: 'The execution disciplines we build are the same across the spectrum. What changes is the specific operating context, the customer architecture, and the material handling complexity we build inside.',
    whyBody: [
      "Most consulting firms in distribution diagnose, recommend, and leave. The slide decks reference productivity, accuracy, and the right vocabulary. The results don't last.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds throughput, accuracy, productivity, and customer service together.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial expression of how seriously we take the work.",
    ],
  },

  /* ── 14. Private Equity Portfolio Operations ─────────────── */
  {
    slug: 'private-equity-portfolio-operations',
    name: 'Private Equity Portfolio Operations',
    eyebrow: 'Strategic Partners',
    hero: {
      h1Top: 'EBITDA expansion, integration, exit readiness.',
      h1Accent: 'The operating partner you actually need.',
      lede: 'Private equity portfolio operations require a different relationship with operational improvement than corporate-owned platforms do. Deal timeline, EBITDA expansion targets, integration realities, and exit preparation all compress the time available for operational execution. We work with PE operating partners and portfolio company leadership to deliver the execution gains the investment thesis depends on.',
    },
    pressuresH2: { top: 'The pressures specific to', pivot: 'portfolio operations.' },
    pressuresIntro: "PE-backed platforms operate under pressures that corporate-owned operations don't fully replicate. Deal-clock urgency, value creation plan accountability, and exit-preparation discipline all run on a cadence that legacy operating teams aren't always built for.",
    pressures: [
      { h: 'Deal-clock urgency.',            body: 'Investment hold periods compress the time available for operational improvement to materialize as EBITDA expansion. Gains need to land within the hold, not in some future state.' },
      { h: 'Value creation plan accountability.', body: 'PE operating partners commit to value creation plans the deal team underwrote. Operating reality and value creation plan accountability have to align.' },
      { h: 'Integration complexity.',        body: 'Add-on acquisitions, carve-outs, and platform combinations produce operations running on inherited systems and parallel cultures. Integration friction can absorb the gains the deal model assumed.' },
      { h: 'Operating leadership depth.',    body: 'Portfolio companies often lack the operating leadership depth the value creation plan requires. Building that depth quickly is one of the largest operating-partner challenges.' },
      { h: 'Exit readiness.',                body: 'Operational performance leading into exit determines the multiple. Operating discipline through the exit window is one of the highest-leverage activities in the hold.' },
      { h: 'Capital efficiency.',            body: 'PE-backed operations face cost-of-capital expectations that demand asset productivity, working capital discipline, and operational efficiency far beyond corporate-owned norms.' },
    ],
    workH2: { top: 'The five disciplines,', pivot: 'applied to PE-backed platform reality.' },
    workIntro: 'The disciplines we build are the same in every engagement. In PE portfolio operations, those disciplines compress timelines and translate directly into EBITDA expansion, integration acceleration, and exit-multiple protection.',
    disciplines: [
      { h: 'Operational Discipline:', body: 'Standards that produce the EBITDA expansion the value creation plan committed to. The structural elimination of variation in operations whose performance has to compound through the hold.' },
      { h: 'Frontline Leadership:',   body: 'Supervisors and operating leaders capable of running the operation at the performance level the value creation plan assumed. Building that capability inside the hold is one of the highest-return activities in the engagement.' },
      { h: 'Equipment Reliability:',  body: 'Maintenance practices that protect asset productivity through the hold period and present well to a buyer at exit.' },
      { h: 'Workforce Capability:',   body: 'Operators and supervisors who hold the standard through ownership transitions, integration disruption, and exit-preparation pressure.' },
      { h: 'Daily Accountability:',   body: 'The cadence, metrics, and structured conversations that close the loop on operational performance and EBITDA contribution in the same daily rhythm the value creation plan tracks.' },
    ],
    outcomesIntro: 'We track impact on the operational and financial dimensions PE operating partners actually care about. The outcomes we move in portfolio operations engagements include:',
    outcomesList: ['EBITDA expansion against the value creation plan','Operating margin improvement','Working capital efficiency','Integration acceleration on add-on acquisitions','Operational performance variance reduction across multi-site portfolio companies','Exit-readiness operational metrics','Asset productivity','Labor productivity','Customer-driven operational outcomes','Throughput against capacity'],
    outcomesClose: 'Operational gains translate directly into the financial dimensions PE firms underwrite: EBITDA contribution, annualized savings rate, working capital release, and exit multiple protection.',
    subSegmentsIntro: 'Our engagement experience with PE operating partners and their portfolio companies spans the situations that define modern portfolio operations.',
    subSegments: ['Carve-out integration','Add-on acquisition integration','EBITDA expansion engagements in early and mid-hold periods','Exit preparation and operational readiness for sale','Operating partner advisory engagements supporting portfolio company leadership','Multi-site portfolio operations requiring performance variance reduction across sites','Industry-specific portfolio operations across manufacturing, food and beverage, industrial, and specialty categories','Operations supporting platform thesis validation'],
    subSegmentsClose: "What changes engagement to engagement is the deal-thesis architecture and the value creation plan we build inside. What doesn't change is the commercial structure or the discipline we bring to it.",
    whyBody: [
      "Most operations consulting firms working with PE-backed platforms diagnose, recommend, and leave. The slide decks reference EBITDA, operating improvement, and the right vocabulary. The results don't land within the hold.",
      'We work differently. Our senior practitioners deploy on the floor, on every shift, inside the management operating system that holds production, quality, financial performance, and value creation plan accountability together. We get the gains to land within the hold period because we build the execution capability that produces them rather than just recommending it.',
      "We put skin in the game. We only get paid when we deliver the results we promised. That's the commercial structure that aligns POWERS interests with PE operating partner interests at the moment of every engagement.",
    ],
    ctaH2: { top: "Let's build your portfolio company to", pivot: 'execute against the value creation plan.' },
    ctaBody: "Tell us where the operation is feeling pressure. We'll come see it on the floor, find the gaps that are hiding inside it, and build the disciplines that close them within the hold period.",
  },
];

INDUSTRIES.forEach(i => { INDUSTRIES_BY_SLUG[i.slug] = i; });

export function getIndustry(slug) {
  return INDUSTRIES_BY_SLUG[slug] || null;
}

export default INDUSTRIES;
