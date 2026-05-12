import React from 'react';
import LegacyPage from '../components/LegacyPage';

const CSS = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #183a61;
    --navy-mid: #0d2442;
    --navy-light: #4a6a8a;
    --gold: #eabb71;
    --gold-bright: #eabb71;
    --gold-muted: #c9963e;
    --white: #ffffff;
    --off-white: #f5f5f3;
    --text-main: #1a1a18;
    --text-muted: #888884;
    --border: #e8e8e4;
    --card-bg: #ffffff;
    --tag-bg: #eef1f7;
  }

  body {
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: var(--off-white);
    color: var(--text-main);
    min-height: 100vh;
  }
/* HERO */
  .library-hero {
    background: var(--navy);
    padding: 0;
    position: relative;
    overflow: hidden;
    min-height: 600px;
    display: flex;
    align-items: center;
  }
  .library-hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 120px 48px;
    width: 100%;
  }

  .hero-eyebrow {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
  }

  .hero-headline {
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: clamp(36px, 4.2vw, 56px);
    font-weight: 800;
    color: var(--white);
    line-height: 1.08;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }

  .hero-sub {
    font-size: clamp(17px, 1.5vw, 22px);
    font-weight: 300;
    color: rgba(255,255,255,0.90);
    max-width: 60ch;
    line-height: 1.5;
    margin-top: 28px;
    text-wrap: pretty;
  }

  .hero-rule-gold { width: 80px; height: 1px; background: #eabb71; border: 0; margin-top: 64px; }

  .stats-row {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .stat-num {
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
  }
  .stat-label {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* SEARCH + FILTERS */
  .controls-bar {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    padding: 0;
    position: sticky;
    z-index: 90;
    box-shadow: 0 2px 12px rgba(13,31,60,0.06);
  }
  .controls-bar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 48px;
  }

  .search-row {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: center;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    max-width: 480px;
  }
  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 16px;
  }
  #searchInput {
    width: 100%;
    padding: 12px 16px 12px 42px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: var(--text-main);
    background: var(--off-white);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  #searchInput:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(234,187,113,0.12);
    background: var(--white);
  }
  #searchInput::placeholder { color: var(--text-muted); }

  .result-count {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 500;
    white-space: nowrap;
  }
  .result-count strong {
    color: var(--navy);
    font-weight: 600;
  }

  .clear-btn {
    padding: 10px 18px;
    background: transparent;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .clear-btn:hover {
    border-color: var(--navy);
    color: var(--navy);
  }

  .filters-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .filter-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--text-muted);
  }
  .filter-select {
    padding: 8px 32px 8px 12px;
    border: 1.5px solid var(--border);
    border-radius: 6px;
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 13px;
    color: var(--text-main);
    background: var(--off-white);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a6580' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    cursor: pointer;
    transition: border-color 0.2s;
    outline: none;
    min-width: 160px;
  }
  .filter-select:focus { border-color: var(--gold); }
  .filter-select.active {
    border-color: var(--navy);
    background-color: var(--navy);
    color: var(--white);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffffff' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  }

  /* SORT */
  .sort-group {
    margin-left: auto;
  }

  /* MAIN LAYOUT */
  .main-content {
    padding: 32px 48px 64px;
    max-width: 1280px;
    margin: 0 auto;
  }

  /* CARDS GRID */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }

  .case-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 0;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 0;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .case-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--gold);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .case-card:hover {
    border-color: var(--gold);
    border-color: rgba(234,187,113,0.3);
  }
  .case-card:hover::before { opacity: 1; }

  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .card-industry {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--gold-muted);
    line-height: 1;
  }

  .card-num {
    font-size: 11px;
    font-weight: 500;
    color: var(--border);
    white-space: nowrap;
  }

  .card-title {
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--navy);
    line-height: 1.4;
    margin-bottom: 16px;
    flex: 1;
  }

  .card-result {
    background: linear-gradient(135deg, rgba(13,31,60,0.04), rgba(234,187,113,0.06));
    border-left: 3px solid var(--gold);
    padding: 10px 14px;
    border-radius: 0 6px 6px 0;
    margin-bottom: 16px;
    font-size: 13px;
    font-weight: 500;
    color: var(--navy);
    line-height: 1.5;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 20px;
    flex: 1;
  }

  .tag {
    font-size: 11px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 4px;
    line-height: 1;
  }
  .tag-engagement {
    background: rgba(13,31,60,0.08);
    color: var(--navy);
  }
  .tag-challenge {
    background: rgba(234,187,113,0.12);
    color: var(--gold-muted);
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    margin-top: auto;
  }

  .card-date {
    font-size: 11px;
    color: var(--text-muted);
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--navy);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.2s;
  }
  .card-link:hover { color: var(--gold); }
  .card-link svg { transition: transform 0.2s; }
  .card-link:hover svg { transform: translateX(3px); }

  /* NO RESULTS */
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 40px;
    color: var(--text-muted);
  }
  .no-results-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.3;
  }
  .no-results h3 {
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 20px;
    color: var(--navy);
    margin-bottom: 8px;
  }
  .no-results p { font-size: 14px; }

  /* ACTIVE FILTER PILLS */
  .active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .active-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px 4px 12px;
    background: var(--navy);
    color: var(--white);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  .pill-remove {
    background: none;
    border: none;
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    padding: 0;
    transition: color 0.15s;
  }
  .pill-remove:hover { color: var(--white); }

  /* FADE IN */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .case-card { animation: fadeUp 0.3s ease both; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .site-header, .library-hero-inner, .controls-bar-inner, .main-content { padding-left: 20px; padding-right: 20px; }
    .stats-row { gap: 24px; }
    .filters-row { gap: 10px; }
    .filter-select { min-width: 130px; }
    .cards-grid { grid-template-columns: 1fr; }
    .sort-group { margin-left: 0; }
  }`;

const HTML = `<section class="library-hero">
  <div class="library-hero-inner">
  <div class="hero-eyebrow">Case Studies</div>
  <h1 class="hero-headline">The Work Speaks for Itself.</h1>
  <p class="hero-sub">Every engagement is a real operation, a real challenge, and a measurable result. Find the proof most relevant to your situation.</p>
  <hr class="hero-rule-gold" />
  </div>
</section>

<div class="controls-bar">
  <div class="controls-bar-inner">
  <div class="search-row">
    <div class="search-wrap">
      <span class="search-icon">&#128269;</span>
      <input type="text" id="searchInput" placeholder="Search by keyword, industry, result..." autocomplete="off">
    </div>
    <button class="clear-btn" id="clearBtn">Clear All</button>
  </div>
  <div class="filters-row">
    <div class="filter-group">
      <div class="filter-label">Industry</div>
      <select class="filter-select" id="industryFilter">
        <option value="">All Industries</option>
      </select>
    </div>
    <div class="filter-group">
      <div class="filter-label">Service Type</div>
      <select class="filter-select" id="engagementFilter">
        <option value="">All Service Types</option>
      </select>
    </div>
    <div class="filter-group">
      <div class="filter-label">Primary Challenge</div>
      <select class="filter-select" id="challengeFilter">
        <option value="">All Challenges</option>
      </select>
    </div>
    <div class="filter-group sort-group">
      <div class="filter-label">Sort By</div>
      <select class="filter-select" id="sortFilter">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="num-asc">Case # (Ascending)</option>
        <option value="num-desc">Case # (Descending)</option>
      </select>
    </div>
  </div>
  <div class="active-filters" id="activePills"></div>
  </div>
</div>

<main class="main-content">
  <div class="cards-grid" id="cardsGrid"></div>
</main>





<!-- SHARED HEADER + FOOTER -->







<style>
  /* Push header above the hero, footer below content */
  #site-header-root {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
  }
  body {
    padding-top: 84px; /* header height */
  }
  /* Controls bar sticky offset to account for fixed header */
  .controls-bar {
    top: 84px !important;
  }
</style>



<style>
  @media (min-width: 768px) {
    .nav-desktop { display: flex !important; }
    .nav-mobile  { display: none !important; }
    .nav-tagline { display: inline !important; }
  }
  @media (max-width: 767px) {
    .nav-desktop { display: none !important; }
    .nav-mobile  { display: flex !important; }
    .nav-tagline { display: none !important; }
  }
</style>`;

const SCRIPT = `;(function(){
const DATA = [
  {num:1, title:"How Honest Discovery Led To A Blind Deployment And A 17% Productivity Gain", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Inconsistent performance across shifts or sites","Supervisors firefighting instead of leading"], result:"17% productivity gain; 2M lbs additional output annually; zero headcount added", date:"2026-03-19", url:"https://www.thepowerscompany.com/resources/honest-discovery-blind-deployment-17-percent-productivity-gain/"},
  {num:2, title:"POWERS Turns Discipline into $6.3M in Annualized Savings for Manufacturing Giant", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Inconsistent performance across shifts or sites","Supervisors firefighting instead of leading"], result:"$6.3M annualized savings; 26.9% labor productivity gain; 40% Gemba score improvement", date:"2026-03-05", url:"https://www.thepowerscompany.com/resources/mos-transformation-turns-discipline-into-savings/"},
  {num:3, title:"When Zero Is the Only Acceptable Outcome: How POWERS Strengthened Food Manufacturing Safety And Quality Under Pressure", industry:"Food Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Quality and safety gaps","Supervisors firefighting instead of leading"], result:"Zero tolerance safety and quality standard achieved under pressure", date:"2026-02-19", url:"https://www.thepowerscompany.com/resources/food-manufacturing-safety-quality-case-study/"},
  {num:4, title:"How POWERS Helped a Premium Protein Manufacturer Recover Yield and Deliver $1.25M In Annualized Savings During Peak Season", industry:"Meat Processing", engagement:["Yield & Throughput Improvement","MOS"], challenges:["Yield loss and product giveaway","Inconsistent performance across shifts or sites"], result:"$1.25M annualized savings; give-away reduced 17.8%; bloodloss improved 66.7%", date:"2026-02-05", url:"https://www.thepowerscompany.com/resources/recover-yield-and-deliver-annualized-savings-protein-manufacturer/"},
  {num:5, title:"POWERS Turns a Structured Management System into $42.2M in Annualized Savings for International Food Processor", industry:"Food Manufacturing", engagement:["MOS","Frontline Leadership Development","Maintenance Transformation"], challenges:["Inconsistent performance across shifts or sites","High overtime and labor costs"], result:"$42.2M annualized savings; 620% ROI; outside labor costs reduced 33.5%", date:"2026-01-22", url:"https://www.thepowerscompany.com/resources/structured-management-system-42m-operational-savings/"},
  {num:6, title:"POWERS Delivers Record Throughput and 11% Labor Productivity Gains for National Food Manufacturer", industry:"Food Manufacturing", engagement:["MOS","Frontline Leadership Development","Labor & Workforce Optimization"], challenges:["Supervisors firefighting instead of leading","High overtime and labor costs"], result:"11% labor productivity gain; 10% labor cost reduction; 87% safety incident reduction", date:"2026-01-08", url:"https://www.thepowerscompany.com/resources/powers-delivers-record-throughput/"},
  {num:7, title:"POWERS Stabilizes Quality and Reduces Transit Damage During Rapid Product Line Expansion", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Quality and safety gaps","Scaling operations without losing performance"], result:"Quality stabilized; transit damage reduced during rapid product line expansion", date:"2025-12-18", url:"https://www.thepowerscompany.com/resources/powers-stabilizes-quality/"},
  {num:8, title:"POWERS Helps Leading Tier 1 Automotive Supplier Reduce Changeover Time by 50%", industry:"Automotive Manufacturing", engagement:["MOS","Yield & Throughput Improvement"], challenges:["Poor on-time delivery and schedule attainment","Inconsistent performance across shifts or sites"], result:"50% changeover time reduction", date:"2025-11-13", url:"https://www.thepowerscompany.com/resources/leading-tier-1-automotive-supplier/"},
  {num:9, title:"POWERS Presses Home $2M in Annualized Savings for Global Aluminum Producer", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development","Maintenance Transformation"], challenges:["Inconsistent performance across shifts or sites","Yield loss and product giveaway"], result:"$2M annualized savings; 15% coil yield increase; 49% table efficiency increase; 60% sow quality increase", date:"2025-10-02", url:"https://www.thepowerscompany.com/resources/savings-for-global-aluminum-producer/"},
  {num:10, title:"Stronger Systems and Smarter Leadership Drive 65% Scrap Reduction for Renowned Animal Nutrition Producer", industry:"Animal Food Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Yield loss and product giveaway","Supervisors firefighting instead of leading"], result:"65% scrap reduction", date:"2025-05-01", url:"https://www.thepowerscompany.com/resources/stronger-systems-and-smarter-leadership/"},
  {num:11, title:"POWERS Unlocks a 23% Productivity Surge While Laying the Foundation for Operational Excellence", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Supervisors firefighting instead of leading","Inconsistent performance across shifts or sites"], result:"23% productivity surge", date:"2024-10-17", url:"https://www.thepowerscompany.com/resources/productivity-surge/"},
  {num:12, title:"POWERS Unlocks Capacity and Cuts $2.4M in Costs for Global Nutrition Company", industry:"Animal Food Manufacturing", engagement:["MOS","Maintenance Transformation","Labor & Workforce Optimization"], challenges:["Inconsistent performance across shifts or sites","Reactive maintenance and unplanned downtime"], result:"$2.4M cost reduction; OEE 71% to 95%; 87% turnover reduction; customer complaints down 68%", date:"2025-09-04", url:"https://www.thepowerscompany.com/resources/capacity-global-nutrition-company/"},
  {num:13, title:"POWERS Drives Partners' 34% Boost in Productivity Through a Successful Transition to Warehouse-Only", industry:"Warehouse & Distribution", engagement:["MOS","Labor & Workforce Optimization"], challenges:["Scaling operations without losing performance","Inconsistent performance across shifts or sites"], result:"34% productivity boost through warehouse-only transition", date:"2025-09-18", url:"https://www.thepowerscompany.com/resources/productivity-successful-transition/"},
  {num:14, title:"POWERS Elevates Operational Performance and Workplace Culture for Leading Animal Nutrition Supplier", industry:"Animal Food Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Supervisors firefighting instead of leading","Labor turnover and workforce instability"], result:"2.1:1 ROI; 4.5% cost per ton reduction; improved employee morale", date:"2024-10-30", url:"https://www.thepowerscompany.com/resources/leading-animal-nutrition-supplier/"},
  {num:15, title:"POWERS Cuts Through Inefficiency, Delivering $500K in Savings for Lumber Industry Leader", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development","Multi-Site / Scaling"], challenges:["Inconsistent performance across shifts or sites","Poor on-time delivery and schedule attainment"], result:"$500K annualized savings; 20% on-time delivery improvement; scaled to 20+ sites", date:"2024-10-03", url:"https://www.thepowerscompany.com/resources/lumber-industry-leader/"},
  {num:16, title:"POWERS Reduces Labor Costs by 30% With Smarter Processes", industry:"Industrial Manufacturing", engagement:["MOS","Labor & Workforce Optimization","Frontline Leadership Development"], challenges:["High overtime and labor costs","Supervisors firefighting instead of leading"], result:"30% labor cost reduction; labor from 10% to 7% of budget; startup performance 60% to 90%", date:"2025-08-21", url:"https://www.thepowerscompany.com/resources/reduces-labor-costs/"},
  {num:17, title:"Quick Service Restaurant Franchise Replicates a Secret Sauce Across Hundreds of Locations with POWERS", industry:"Food Service", engagement:["MOS","Multi-Site / Scaling","Frontline Leadership Development"], challenges:["Scaling operations without losing performance","Inconsistent performance across shifts or sites"], result:"Standardized performance system replicated across hundreds of QSR locations", date:"2024-11-14", url:"https://www.thepowerscompany.com/resources/restaurant-franchise/"},
  {num:18, title:"POWERS Prescribes Operational Health Boost for Medical Supply Chain Leader, Injecting $2.4M in Annualized Savings", industry:"Warehouse & Distribution", engagement:["MOS","Labor & Workforce Optimization"], challenges:["High overtime and labor costs","Supervisors firefighting instead of leading"], result:"$2.4M annualized savings; 47% overtime reduction; 9% labor cost reduction", date:"2024-09-19", url:"https://www.thepowerscompany.com/resources/operational-health-boost/"},
  {num:19, title:"Overcoming Operational Challenges in Specialty Baked Goods Manufacturer to Achieve a 19% Boost in Productivity", industry:"Bakery & Snack Food Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Supervisors firefighting instead of leading","Inconsistent performance across shifts or sites"], result:"19% productivity boost", date:"2024-09-05", url:"https://www.thepowerscompany.com/resources/challenges-in-baked-goods/"},
  {num:20, title:"Industry Leader Taps POWERS to Optimize Material and Personnel Flows, Achieving 20% Productivity Gains", industry:"Automotive Manufacturing", engagement:["MOS","Labor & Workforce Optimization"], challenges:["Inconsistent performance across shifts or sites","Scaling operations without losing performance"], result:"20% productivity gain; material and personnel flow optimized across two sites", date:"2024-08-22", url:"https://www.thepowerscompany.com/resources/material-and-personnel-flows/"},
  {num:21, title:"POWERS' Strategic Recipe Revives Growth, Saves $4M Annually for Storied Company", industry:"Food Manufacturing", engagement:["MOS","Frontline Leadership Development","Yield & Throughput Improvement"], challenges:["Inconsistent performance across shifts or sites","Supervisors firefighting instead of leading"], result:"$4M annual savings; growth revived for long-established manufacturer", date:"2024-08-08", url:"https://www.thepowerscompany.com/resources/strategic-growth/"},
  {num:22, title:"From Heroic Individual Efforts to Team Excellence: Transforming Maintenance Culture for Enhanced Productivity", industry:"Industrial Manufacturing", engagement:["Maintenance Transformation","Frontline Leadership Development"], challenges:["Reactive maintenance and unplanned downtime","Supervisors firefighting instead of leading"], result:"Maintenance culture transformed from heroic individual effort to team-based system", date:"2024-07-08", url:"https://www.thepowerscompany.com/resources/transforming-maintenance-culture/"},
  {num:23, title:"POWERS Unlocks Floor Space And Builds $2M+ In Annualized Savings For Home Furnishings Manufacturer", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development","Labor & Workforce Optimization"], challenges:["Inconsistent performance across shifts or sites","Supervisors firefighting instead of leading"], result:"$2M+ annualized savings; 40% volume increase; 18% cost per unit reduction; 1/3 of 400k sq ft recovered", date:"2024-04-12", url:"https://www.thepowerscompany.com/resources/furnishings-manufacturer/"},
  {num:24, title:"Recipe for Success: A Food Manufacturer Achieves 208% Annualized ROI with POWERS", industry:"Bakery & Snack Food Manufacturing", engagement:["MOS","Frontline Leadership Development","Yield & Throughput Improvement"], challenges:["Supervisors firefighting instead of leading","Labor turnover and workforce instability"], result:"208% annualized ROI; filling yield 75% to 89%; 50% labor efficiency increase", date:"2023-11-16", url:"https://www.thepowerscompany.com/resources/recipe-for-success/"},
  {num:25, title:"From Tradition To Innovation: Restructuring Operations With LCT Captures $3.46M In Annualized Savings", industry:"Food Manufacturing", engagement:["MOS","Yield & Throughput Improvement","Frontline Leadership Development"], challenges:["Inconsistent performance across shifts or sites","Yield loss and product giveaway"], result:"$3.46M annualized savings; Line Centric Team (LCT) model implemented", date:"2023-10-26", url:"https://www.thepowerscompany.com/resources/from-tradition-to-innovation-restructuring-operations-with-lct-captures-3-46-million-in-annualized-savings/"},
  {num:26, title:"Powers Revitalizes Operational Excellence With $1.2M In Annualized Savings For A Tier 1 Automotive Manufacturer", industry:"Automotive Manufacturing", engagement:["MOS","Frontline Leadership Development","Labor & Workforce Optimization"], challenges:["Poor on-time delivery and schedule attainment","High overtime and labor costs"], result:"$1.2M annualized savings; 30% productivity gain; 87% overtime reduction; 80% OTIF improvement", date:"2023-10-04", url:"https://www.thepowerscompany.com/resources/automotive-manufacturer/"},
  {num:27, title:"Through Cutting Costs, Not Quality, POWERS Achieves $2.3M in Maintenance Savings for Prominent Beef Processor", industry:"Meat Processing", engagement:["Maintenance Transformation","Frontline Leadership Development"], challenges:["Reactive maintenance and unplanned downtime","High overtime and labor costs"], result:"$2.3M maintenance savings; proactive maintenance culture established", date:"2023-09-21", url:"https://www.thepowerscompany.com/resources/maintenance-savings/"},
  {num:28, title:"How POWERS Catalyzed Growth for a Frozen Food Distribution Giant", industry:"Food Manufacturing", engagement:["MOS","Yield & Throughput Improvement"], challenges:["Supervisors firefighting instead of leading","Poor on-time delivery and schedule attainment"], result:"$2.5M savings; 42% production increase; 8.4% schedule attainment improvement", date:"2023-09-08", url:"https://www.thepowerscompany.com/resources/how-powers-catalyzed-growth-for-a-frozen-food-distribution-giant/"},
  {num:29, title:"How POWERS Transformed this Supply Chain Giant's Labor Challenges Into a $1.25M Triumph", industry:"Warehouse & Distribution", engagement:["MOS","Labor & Workforce Optimization","Supply Chain & Distribution"], challenges:["High overtime and labor costs","Poor on-time delivery and schedule attainment"], result:"$1.25M savings; labor challenges resolved across supply chain operation", date:"2023-08-31", url:"https://www.thepowerscompany.com/resources/supply-chain/"},
  {num:30, title:"Powers Bakes in $3.4M in OEE Savings and 50% Uptime Improvement for Category-Leading Consumer Baked Goods Producer", industry:"Bakery & Snack Food Manufacturing", engagement:["MOS","Maintenance Transformation","Yield & Throughput Improvement"], challenges:["Reactive maintenance and unplanned downtime","Yield loss and product giveaway"], result:"$3.4M OEE savings; 50% uptime improvement", date:"2023-08-17", url:"https://www.thepowerscompany.com/resources/consumer-baked-goods/"},
  {num:31, title:"Installing Supply Chain Best Practices Saves Leading Raw Pet Food Manufacturer $7M in Inventory", industry:"Animal Food Manufacturing", engagement:["Supply Chain & Distribution","MOS"], challenges:["Poor on-time delivery and schedule attainment","Scaling operations without losing performance"], result:"$7M inventory savings; supply chain best practices installed", date:"2023-07-06", url:"https://www.thepowerscompany.com/resources/supply-chain-best-practices/"},
  {num:32, title:"POWERS Helps One of the World's Largest Agribusiness Manufacturers Improve Throughput by 24% and Uptime by 11%", industry:"Agribusiness", engagement:["MOS","Maintenance Transformation","Yield & Throughput Improvement"], challenges:["Reactive maintenance and unplanned downtime","Yield loss and product giveaway"], result:"24% throughput improvement; 11% uptime improvement", date:"2023-03-16", url:"https://www.thepowerscompany.com/resources/agribusiness-throughput/"},
  {num:33, title:"Maintenance Improvement Proves to Be Much-Needed Performance Boost for One of the Nation's Largest Poultry Processors", industry:"Poultry Processing", engagement:["Maintenance Transformation","MOS"], challenges:["Reactive maintenance and unplanned downtime","Inconsistent performance across shifts or sites"], result:"Maintenance performance boost; one of the nation's largest poultry processors", date:"2023-02-16", url:"https://www.thepowerscompany.com/resources/maintenance-improvement/"},
  {num:34, title:"Mass Retail Poultry Processor Racks Up Massive Productivity Gains With Over $6M in Savings and 6% Yield Increase", industry:"Poultry Processing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Yield loss and product giveaway","Labor turnover and workforce instability"], result:"$6M+ savings; 6% yield increase; 45% overtime reduction", date:"2022-11-03", url:"https://www.thepowerscompany.com/resources/poultry-processor/"},
  {num:35, title:"POWERS' Productivity Sprint Drives Tasty 36% Improvement in Throughput for Global Food, Beverage, and Household Goods Manufacturer", industry:"Consumer Packaged Goods", engagement:["MOS","Yield & Throughput Improvement","Frontline Leadership Development"], challenges:["Inconsistent performance across shifts or sites","Poor on-time delivery and schedule attainment"], result:"36% throughput improvement", date:"2022-10-19", url:"https://www.thepowerscompany.com/resources/throughput/"},
  {num:36, title:"Meat Processing Plant Grinds Out Beefy 1% Yield Increase and 16% Productivity Improvement With POWERS", industry:"Meat Processing", engagement:["MOS","Yield & Throughput Improvement"], challenges:["Yield loss and product giveaway","Inconsistent performance across shifts or sites"], result:"1% yield increase; 16% productivity improvement", date:"2022-09-01", url:"https://www.thepowerscompany.com/resources/meat-processing-productivity-improvement-case-study/"},
  {num:37, title:"POWERS Helps Global Dairy Producer Unblock Production and Sprint to Sharp 41% Performance Boost to Meet New Plant ROI", industry:"Dairy Manufacturing", engagement:["MOS","Yield & Throughput Improvement","Maintenance Transformation"], challenges:["Inconsistent performance across shifts or sites","Reactive maintenance and unplanned downtime"], result:"41% performance boost; new plant ROI target met", date:"2022-08-24", url:"https://www.thepowerscompany.com/resources/dairy-producer-case-study/"},
  {num:38, title:"POWERS Sparks $30M Turnaround for One of the Largest Independent Poultry Producers in the World", industry:"Poultry Processing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Inconsistent performance across shifts or sites","High overtime and labor costs"], result:"$30M turnaround; one of world's largest independent poultry producers", date:"2022-08-17", url:"https://www.thepowerscompany.com/resources/poultry-producer-turnaround/"},
  {num:39, title:"One of Puerto Rico's Largest Distributors Enjoys Massive Increase in Productivity and Reduces Overtime by Putting POWERS in the Mix", industry:"Warehouse & Distribution", engagement:["MOS","Labor & Workforce Optimization"], challenges:["High overtime and labor costs","Inconsistent performance across shifts or sites"], result:"Massive productivity increase; overtime reduced; 333% ROI", date:"2022-08-04", url:"https://www.thepowerscompany.com/resources/distributor-case-study/"},
  {num:40, title:"POWERS Shelves Inefficiencies, Unlocks $2.1M in Annualized Labor Savings for Library Supplier", industry:"Industrial Manufacturing", engagement:["MOS","Labor & Workforce Optimization","Frontline Leadership Development"], challenges:["High overtime and labor costs","Supervisors firefighting instead of leading"], result:"$2.1M annualized labor savings; 20% productivity improvement; 35% customer service improvement", date:"2022-07-06", url:"https://www.thepowerscompany.com/resources/library-supply-company-productivity-gains/"},
  {num:41, title:"This Stalwart Global Meat Processing Industry Leader Engaged POWERS to Lean Up Production While Beefing Up Performance", industry:"Meat Processing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Yield loss and product giveaway","High overtime and labor costs"], result:"Production leaned; performance improved for global meat processing leader", date:"2022-06-30", url:"https://www.thepowerscompany.com/resources/meat-processing-industry-leader-case-study/"},
  {num:42, title:"New Management Operating System Helps Special-Risk Insurer Reduce Costs, Increase Productivity, and Prepare for Growth", industry:"Insurance & Financial Services", engagement:["MOS","Frontline Leadership Development"], challenges:["Supervisors firefighting instead of leading","Scaling operations without losing performance"], result:"Costs reduced; productivity increased; growth capacity established", date:"2022-06-23", url:"https://www.thepowerscompany.com/resources/insurer-management-operating-system/"},
  {num:43, title:"Top-Shelf Meat Packing Company Sees Meaty Gains in Productivity and a Healthy $5.8M Added to the Bottom Line", industry:"Meat Processing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Yield loss and product giveaway","Poor on-time delivery and schedule attainment"], result:"$5.8M annualized; ham yield 99% to 104%; 11% daily pounds increase", date:"2022-05-19", url:"https://www.thepowerscompany.com/resources/meat-packing-company-case-study/"},
  {num:44, title:"New Frontline Leadership Skills and Controls Boost On-Time Completion By 60% For Large Group Insurance Provider", industry:"Insurance & Financial Services", engagement:["MOS","Frontline Leadership Development"], challenges:["Poor on-time delivery and schedule attainment","Supervisors firefighting instead of leading"], result:"60% on-time completion increase; 62% backlog reduction; 50% late completion reduction", date:"2022-05-12", url:"https://www.thepowerscompany.com/resources/insurance-boost-time/"},
  {num:45, title:"POWERS Helps Global Specialty Pharmaceutical Company Turn Back the Clock and Reduce Product Release Time by 46%", industry:"Pharmaceutical & Medical Manufacturing", engagement:["MOS","Frontline Leadership Development","Supply Chain & Distribution"], challenges:["Poor on-time delivery and schedule attainment","Supervisors firefighting instead of leading"], result:"46% product release time reduction", date:"2022-04-26", url:"https://www.thepowerscompany.com/resources/global-specialty-pharmaceutical-company/"},
  {num:46, title:"Aligning Performance With Capacity Helps Medical Device Manufacturer See 25% Productivity Gain and $4.5M in Annual Savings", industry:"Pharmaceutical & Medical Manufacturing", engagement:["MOS","Labor & Workforce Optimization","Supply Chain & Distribution"], challenges:["Poor on-time delivery and schedule attainment","High overtime and labor costs"], result:"$4.5M annual savings; 57%+ productivity improvement; 333% ROI; 93% inventory error reduction", date:"2022-04-07", url:"https://www.thepowerscompany.com/resources/medical-device-manufacturer-operates-at-full-potential/"},
  {num:47, title:"BBQ Producer Chops $2.2M in Annual Costs, Boosts Yield a Meaty 1.5% With POWERS", industry:"Meat Processing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Yield loss and product giveaway","High overtime and labor costs"], result:"$2.2M annual cost reduction; 1.5% yield boost; 27% rework efficiency improvement", date:"2022-03-31", url:"https://www.thepowerscompany.com/resources/bbq-producer-chops-annual-costs-boosts-yield/"},
  {num:48, title:"Measurable Labor and Productivity Improvements Help Grower See More Green", industry:"Agribusiness", engagement:["MOS","Labor & Workforce Optimization"], challenges:["High overtime and labor costs","Supervisors firefighting instead of leading"], result:"Measurable labor and productivity improvements for agricultural grower", date:"2022-03-22", url:"https://www.thepowerscompany.com/resources/measurable-labor-and-productivity-improvements-help-grower-see-more-green/"},
  {num:49, title:"POWERS leads pioneering snack food industry giant to topple performance barriers and achieve results that are simply nuts", industry:"Bakery & Snack Food Manufacturing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Poor on-time delivery and schedule attainment","Labor turnover and workforce instability"], result:"16% annualized productivity increase; 99% schedule attainment; 25% changeover downtime reduction", date:"2022-02-10", url:"https://www.thepowerscompany.com/resources/snack-food-industry-giant-topples-performance-barriers-achieves-results/"},
  {num:50, title:"POWERS facilitates game-changing uptime, throughput, and on-time delivery improvements for global food industry leader", industry:"Food Manufacturing", engagement:["MOS","Maintenance Transformation","Yield & Throughput Improvement"], challenges:["Reactive maintenance and unplanned downtime","Poor on-time delivery and schedule attainment"], result:"Game-changing uptime, throughput, and on-time delivery improvements", date:"2022-01-18", url:"https://www.thepowerscompany.com/resources/powers-facilitates-game-changing-improvements-for-global-food-industry-leader/"},
  {num:51, title:"POWERS leads 26% Capacity Utilization Turnaround at Client's Newly Acquired Plant-Based Meat Processing Site", industry:"Meat Processing", engagement:["New Facility / Greenfield Launch","MOS","Frontline Leadership Development"], challenges:["Newly acquired or launched facility","Labor turnover and workforce instability"], result:"26% capacity utilization increase; 2% yield increase; 18% maintenance overtime reduction", date:"2021-12-13", url:"https://www.thepowerscompany.com/resources/powers-leads-26-capacity-utilization-turnaround-at-partners-newly-acquired-plant-based-meat-processing-site/"},
  {num:52, title:"POWERS Partners With World-Class Meat Processor for Huge Performance Gains: Productivity up 47%, Yield up .41%", industry:"Meat Processing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Yield loss and product giveaway","Inconsistent performance across shifts or sites"], result:"47% productivity gain; 0.41% yield increase", date:"2021-09-16", url:"https://www.thepowerscompany.com/resources/powers-increases-yield-productivity-for-meat-processor/"},
  {num:53, title:"POWERS Energizes Bottom Line with $1.2M in Annualized Savings for Global Energy-Sector Manufacturer", industry:"Industrial Manufacturing", engagement:["MOS","Frontline Leadership Development"], challenges:["Supervisors firefighting instead of leading","Inconsistent performance across shifts or sites"], result:"$1.2M annualized savings", date:"2021-09-07", url:"https://www.thepowerscompany.com/resources/energy-sector-manufacturer/"},
  {num:54, title:"POWERS Boosts On-time Performance by a Staggering 59% for Defense Industry Make-to-Order Manufacturer", industry:"Defense & Aerospace", engagement:["MOS","Supply Chain & Distribution","Frontline Leadership Development"], challenges:["Poor on-time delivery and schedule attainment","Inconsistent performance across shifts or sites"], result:"59% on-time performance improvement", date:"2021-08-18", url:"https://www.thepowerscompany.com/resources/defense-industry/"},
  {num:55, title:"POWERS Nearly Doubles Promised Savings for Our Pet Food Partner Fetching $13.8M Annualized Savings", industry:"Animal Food Manufacturing", engagement:["MOS","Yield & Throughput Improvement","Maintenance Transformation"], challenges:["Inconsistent performance across shifts or sites","Reactive maintenance and unplanned downtime"], result:"$13.8M annualized savings; nearly doubled promised savings", date:"2021-07-08", url:"https://www.thepowerscompany.com/resources/powers-crushes-promised-annualized-savings-rate-of-7-5m-for-pet-food-partner-fetching-13-8m-only-23-weeks-into-the-project/"},
  {num:56, title:"POWERS Drives 7% YOY Output Gain in Turnaround for Major Beverage Manufacturer", industry:"Beverage Manufacturing", engagement:["MOS","Yield & Throughput Improvement"], challenges:["Inconsistent performance across shifts or sites","Supervisors firefighting instead of leading"], result:"7% year-over-year output gain", date:"2021-04-16", url:"https://www.thepowerscompany.com/resources/powers-removes-performance-bottlenecks-from-major-beverage-manufacturer-facing-unprecedented-demand/"},
  {num:57, title:"POWERS Energizes Dairy and Coffee Beverage Company's Capacity and Capability While Lowering Costs", industry:"Dairy Manufacturing", engagement:["MOS","Labor & Workforce Optimization","Yield & Throughput Improvement"], challenges:["Scaling operations without losing performance","High overtime and labor costs"], result:"Capacity and capability increased; costs lowered simultaneously", date:"2020-06-16", url:"https://www.thepowerscompany.com/resources/dairy-beverage-capacity-capability/"},
  {num:58, title:"POWERS Sparks $4M Turnaround for Cold Storage Distribution Center, Transforms Management Operating System", industry:"Warehouse & Distribution", engagement:["MOS","Frontline Leadership Development","Labor & Workforce Optimization"], challenges:["Supervisors firefighting instead of leading","High overtime and labor costs"], result:"$4M turnaround; MOS transformed for cold storage distribution center", date:"2020-06-15", url:"https://www.thepowerscompany.com/resources/cold-storage-distribution-center-management-operations/"},
  {num:59, title:"A Tale of 3 Supply Tiers: POWERS Helps International Automaker Fix Supply Chain Woes and Boost Productivity", industry:"Automotive Manufacturing", engagement:["Supply Chain & Distribution","MOS","Frontline Leadership Development"], challenges:["Poor on-time delivery and schedule attainment","Scaling operations without losing performance"], result:"Supply chain woes fixed; productivity boosted across 3 supply tiers", date:"2020-05-07", url:"https://www.thepowerscompany.com/resources/international-automaker-supply-chain-productivity-fix/"},
  {num:60, title:"POWERS Helps Agricultural Giant Rein in HR Issues Caused by Rapid Growth", industry:"Agribusiness", engagement:["MOS","Labor & Workforce Optimization","Multi-Site / Scaling"], challenges:["Labor turnover and workforce instability","Scaling operations without losing performance"], result:"HR and people management issues resolved; rapid growth stabilized", date:"2020-05-03", url:"https://www.thepowerscompany.com/resources/agricultural-giant-rapid-growth-human-resources/"},
  {num:61, title:"Maintenance Overhaul Delivers $2M in Annual Savings for Turkey Producer", industry:"Poultry Processing", engagement:["Maintenance Transformation","MOS"], challenges:["Reactive maintenance and unplanned downtime","High overtime and labor costs"], result:"$2M annual savings; maintenance overhaul delivered", date:"2020-05-03", url:"https://www.thepowerscompany.com/resources/midwestern-turkey-producer-maintenance-upgrade/"},
  {num:62, title:"POWERS provides expertise for new facility built by major food producer", industry:"Food Manufacturing", engagement:["New Facility / Greenfield Launch","MOS"], challenges:["Newly acquired or launched facility"], result:"Ramp-up achieved on schedule; full MOS implemented prior to launch", date:"2020-04-23", url:"https://www.thepowerscompany.com/resources/food-producer-new-facility/"},
  {num:63, title:"POWERS Saves Major Food Processor $6 Million in Annualized Savings", industry:"Food Manufacturing", engagement:["MOS","Yield & Throughput Improvement","Labor & Workforce Optimization"], challenges:["Inconsistent performance across shifts or sites","High overtime and labor costs"], result:"$6M annualized savings", date:"2020-04-15", url:"https://www.thepowerscompany.com/resources/food-processor-6-million-savings/"},
  {num:64, title:"Yield and Productivity Improvements Generate $10.8 Million for Pork Products Producer", industry:"Meat Processing", engagement:["MOS","Yield & Throughput Improvement","Maintenance Transformation","Supply Chain & Distribution"], challenges:["Yield loss and product giveaway","Reactive maintenance and unplanned downtime","Labor turnover and workforce instability"], result:"$10.8M total annualized savings; $6.5M yield recovery; $2.6M R&M savings; 19% maintenance overtime reduction", date:"2019-04-01", url:"https://www.thepowerscompany.com/resources/yield-productivity-improvements-processing/"},
  {num:65, title:"Global Specialty Pharmaceutical Maker Gets Breakthrough Prescription for the Perfect Production Schedule", industry:"Pharmaceutical & Medical Manufacturing", engagement:["MOS","Supply Chain & Distribution","Frontline Leadership Development"], challenges:["Poor on-time delivery and schedule attainment","Supervisors firefighting instead of leading"], result:"46% product release time reduction", date:"2022-04-26", url:"https://www.thepowerscompany.com/resources/global-specialty-pharmaceutical-company/"},
  {num:66, title:"Upgraded Management Operating System Helps Library Supply Company Book Epic Productivity Gains", industry:"Industrial Manufacturing", engagement:["MOS","Labor & Workforce Optimization","Frontline Leadership Development"], challenges:["High overtime and labor costs","Supervisors firefighting instead of leading"], result:"$2.1M annual labor savings; 20% productivity improvement; 35% customer service improvement", date:"2016-12-13", url:"https://www.thepowerscompany.com/resources/operating-system-library-supply/"},
  {num:67, title:"Reined-in Giveaway, Rework and M&R Costs Help Meats Processor Recoup $70M Over Three Years", industry:"Meat Processing", engagement:["MOS","Yield & Throughput Improvement","Maintenance Transformation","Labor & Workforce Optimization"], challenges:["Yield loss and product giveaway","Reactive maintenance and unplanned downtime","High overtime and labor costs"], result:"$70M total savings over 3 years; 19% operating efficiency gain; 33% direct labor reduction; 62% downtime reduction", date:"2016-12-01", url:"https://www.thepowerscompany.com/resources/meat-processor-rework/"},
  {num:68, title:"New M&R Controls, Scheduled Maintenance, and Planning Equip Potato Processor to Slice Maintenance Spend and Downtime", industry:"Food Manufacturing", engagement:["Maintenance Transformation","MOS"], challenges:["Reactive maintenance and unplanned downtime","High overtime and labor costs"], result:"Maintenance spend reduced; downtime sliced for potato processor", date:"2016-12-13", url:"https://www.thepowerscompany.com/resources/potato-processor/"}
];

// --- Populate Filters ---
function unique(arr) { return [...new Set(arr)].sort(); }

const industries = unique(DATA.map(d => d.industry));
const engagements = unique(DATA.flatMap(d => d.engagement));
const challenges = unique(DATA.flatMap(d => d.challenges));

function populate(selectId, options) {
  const sel = document.getElementById(selectId);
  options.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o; opt.textContent = o;
    sel.appendChild(opt);
  });
}
populate('industryFilter', industries);
populate('engagementFilter', engagements);
populate('challengeFilter', challenges);

// --- State ---
let state = { search: '', industry: '', engagement: '', challenge: '', sort: 'newest' };

// --- Render ---
function formatDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(\`(\${query.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&')})\`, 'gi');
  return text.replace(regex, '<mark style="background:rgba(234,187,113,0.3);border-radius:2px;padding:0 1px">$1</mark>');
}

function render() {
  const grid = document.getElementById('cardsGrid');
  const s = state.search.toLowerCase().trim();

  let filtered = DATA.filter(d => {
    if (state.industry && d.industry !== state.industry) return false;
    if (state.engagement && !d.engagement.includes(state.engagement)) return false;
    if (state.challenge && !d.challenges.includes(state.challenge)) return false;
    if (s) {
      const blob = [d.title, d.industry, d.result, ...d.engagement, ...d.challenges].join(' ').toLowerCase();
      if (!blob.includes(s)) return false;
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (state.sort === 'newest') return new Date(b.date) - new Date(a.date);
    if (state.sort === 'oldest') return new Date(a.date) - new Date(b.date);
    if (state.sort === 'num-asc') return a.num - b.num;
    if (state.sort === 'num-desc') return b.num - a.num;
    return 0;
  });


  if (filtered.length === 0) {
    grid.innerHTML = \`<div class="no-results">
      <div class="no-results-icon">📋</div>
      <h3>No case studies match your filters</h3>
      <p>Try adjusting your search or clearing one of the active filters.</p>
    </div>\`;
    return;
  }

  grid.innerHTML = filtered.map((d, i) => \`
    <article class="case-card" style="animation-delay:\${Math.min(i * 0.04, 0.4)}s" onclick="window.open('\${d.url}','_blank')">
      <div class="card-header">
        <div class="card-industry">\${d.industry}</div>
        <div class="card-num">#\${String(d.num).padStart(2,'0')}</div>
      </div>
      <h2 class="card-title">\${highlight(d.title, s)}</h2>
      <div class="card-result">\${highlight(d.result, s)}</div>
      <div class="card-tags">
        \${d.engagement.map(e => \`<span class="tag tag-engagement">\${e}</span>\`).join('')}
        \${d.challenges.slice(0,2).map(c => \`<span class="tag tag-challenge">\${c}</span>\`).join('')}
      </div>
      <div class="card-footer">
        <span class="card-date">\${formatDate(d.date)}</span>
        <a class="card-link" href="\${d.url}" target="_blank" onclick="event.stopPropagation()">
          Read Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  \`).join('');
}

// --- Active pills ---
function renderPills() {
  const container = document.getElementById('activePills');
  const pills = [];
  if (state.industry) pills.push({key:'industry', label:\`Industry: \${state.industry}\`});
  if (state.engagement) pills.push({key:'engagement', label:\`Service: \${state.engagement}\`});
  if (state.challenge) pills.push({key:'challenge', label:\`Challenge: \${state.challenge}\`});
  if (state.search) pills.push({key:'search', label:\`Search: "\${state.search}"\`});

  container.innerHTML = pills.map(p => \`
    <div class="active-pill">
      \${p.label}
      <button class="pill-remove" onclick="clearFilter('\${p.key}')">✕</button>
    </div>
  \`).join('');
}

function clearFilter(key) {
  if (key === 'industry') { state.industry = ''; document.getElementById('industryFilter').value = ''; document.getElementById('industryFilter').classList.remove('active'); }
  if (key === 'engagement') { state.engagement = ''; document.getElementById('engagementFilter').value = ''; document.getElementById('engagementFilter').classList.remove('active'); }
  if (key === 'challenge') { state.challenge = ''; document.getElementById('challengeFilter').value = ''; document.getElementById('challengeFilter').classList.remove('active'); }
  if (key === 'search') { state.search = ''; document.getElementById('searchInput').value = ''; }
  renderPills(); render();
}

function update() { renderPills(); render(); }

// --- Event Listeners ---
let debounce;
document.getElementById('searchInput').addEventListener('input', e => {
  clearTimeout(debounce);
  debounce = setTimeout(() => { state.search = e.target.value; update(); }, 200);
});

document.getElementById('industryFilter').addEventListener('change', e => {
  state.industry = e.target.value;
  e.target.classList.toggle('active', !!e.target.value);
  update();
});
document.getElementById('engagementFilter').addEventListener('change', e => {
  state.engagement = e.target.value;
  e.target.classList.toggle('active', !!e.target.value);
  update();
});
document.getElementById('challengeFilter').addEventListener('change', e => {
  state.challenge = e.target.value;
  e.target.classList.toggle('active', !!e.target.value);
  update();
});
document.getElementById('sortFilter').addEventListener('change', e => {
  state.sort = e.target.value;
  update();
});
document.getElementById('clearBtn').addEventListener('click', () => {
  state = { search: '', industry: '', engagement: '', challenge: '', sort: 'newest' };
  document.getElementById('searchInput').value = '';
  ['industryFilter','engagementFilter','challengeFilter'].forEach(id => {
    document.getElementById(id).value = '';
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById('sortFilter').value = 'newest';
  update();
});

// --- Init ---
render();
  try { window.unique = unique; } catch(_) {}
  try { window.populate = populate; } catch(_) {}
  try { window.formatDate = formatDate; } catch(_) {}
  try { window.highlight = highlight; } catch(_) {}
  try { window.render = render; } catch(_) {}
  try { window.renderPills = renderPills; } catch(_) {}
  try { window.clearFilter = clearFilter; } catch(_) {}
  try { window.update = update; } catch(_) {}
})();`;

export default function CaseStudies() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Case Studies — POWERS Manufacturing Performance Consulting`}
      metaDescription={`68 POWERS case studies across manufacturing, defense, food production, and distribution. Real operations, real challenges, measurable results.`}
    />
  );
}
