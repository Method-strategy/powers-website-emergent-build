// Library page CSS, extracted verbatim from the legacy case-studies.html so
// the new React library page reuses the same visual treatment.
export const caseStudiesLibraryStyles = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* Brief-aligned tokens — promoted from briefTokens.js so the case-
     study library palette matches the homepage and every other brief
     page. Local var names preserved so existing selectors throughout
     this stylesheet keep working without rewrites. */
  :root {
    --navy: #0d2442;             /* brief NAVY (was #183a61) */
    --navy-mid: #0d2442;
    --navy-light: rgba(13, 36, 66, 0.54);  /* TEXT_MUTED */
    --gold: #e89346;             /* brief GOLD_BRIGHT (was #eabb71) */
    --gold-bright: #e89346;
    --gold-muted: #e89346;
    --white: #ffffff;
    --off-white: #fbfaf6;        /* brief PAPER (was #f5f5f3) */
    --text-main: #0d2442;        /* brief NAVY (was #1a1a18) */
    --text-muted: rgba(13, 36, 66, 0.54);  /* brief TEXT_MUTED */
    --border: rgba(13, 36, 66, 0.16);      /* brief RULE */
    --card-bg: #ffffff;
    --tag-bg: #f3f0e8;           /* brief PAPER_DEEP */
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
