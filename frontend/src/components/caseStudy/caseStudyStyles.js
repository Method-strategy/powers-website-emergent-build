export const caseStudyStyles = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* Brief-aligned tokens — promoted from briefTokens.js so every
     case-study page renders in the same palette as the homepage and
     the rest of the brief. Local var names preserved so existing
     selectors throughout this file (var(--navy), var(--gold), etc.)
     keep working without rewrites. */
  :root {
    --navy: #0d2442;             /* brief NAVY (was #183a61) */
    --navy900: #0a1e36;          /* brief NAVY_DEEP */
    --navy400: rgba(13, 36, 66, 0.54);  /* brief TEXT_MUTED */
    --navy100: #d6e2ee;
    --navy50: #fbfaf6;           /* aligned to PAPER */
    --gold: #e89346;             /* brief GOLD_BRIGHT (was #eabb71) */
    --gold600: #e89346;          /* collapsed per briefTokens */
    --white: #ffffff;
    --gray50: #fbfaf6;           /* brief PAPER */
    --gray100: #f3f0e8;          /* brief PAPER_DEEP */
    --gray400: rgba(13, 36, 66, 0.54);  /* brief TEXT_MUTED */
    --gray700: rgba(13, 36, 66, 0.72);  /* brief TEXT_BODY */
    --gray900: #0d2442;          /* brief NAVY */
  }

  html, body {
    font-family: 'proxima-nova', 'Proxima Nova', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: var(--white);
    color: var(--gray700);
    /* Ensure proper kerning + ligatures even when the browser falls back from
       Proxima Nova to Inter (or system) during a partial font load. Without
       these declarations some browsers (notably headless Chromium during PDF
       generation) skip kerning pairs, producing the uneven word spacing the
       user reported in body paragraphs. */
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    font-kerning: normal;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, .eyebrow { text-wrap: balance; }
  p, li { text-wrap: pretty; }

  a { color: inherit; }

  /* ───── PRINT-ONLY DOC HIDDEN ON SCREEN ───── */
  .print-doc { display: none; }

  /* ════════════════════════════════════════════
     SCREEN LAYOUT
     ════════════════════════════════════════════ */
  @media screen {
    body { padding-top: var(--header-h, 112px); }

    /* Site nav responsive show/hide — !important needed because site-nav.jsx
       uses inline style={{display:'flex'}} on both nav and hamburger */
    .nav-desktop { display: flex !important; }
    .nav-mobile { display: none !important; }
    .nav-tagline { display: inline !important; }

    #site-header-root {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 200;
    }

    /* HERO */
    .cs-hero {
      background: var(--navy);
      min-height: 600px;
      display: flex;
      align-items: center;
    }
    .cs-hero-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 120px 48px;
      width: 100%;
    }

    /* ── DENSE HERO (toggleable) ── */
    .cs-hero-dense {
      background: var(--navy);
      padding: 96px 0 80px;  /* horizontal padding lives on the 1280 inner so content aligns with the site header */
    }
    .cs-hero-dense-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 48px;       /* matches SiteHeader.jsx: max-width 1280 + padding 0 48 → 1184px content area */
      display: grid;
      grid-template-columns: 1fr 320px;
      column-gap: 64px;
      align-items: stretch;
    }
    .cs-hd-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100%;
    }
    .cs-hd-right {
      display: flex;
      flex-direction: column;
    }

    .cs-hd-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 14px;
      align-items: center;
      margin-bottom: 22px;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .cs-hd-tag-cs { color: rgba(255,255,255,0.55); }
    .cs-hd-tag-bar { color: var(--gold); }
    .cs-hd-tag-industry { color: #ffffff; }
    .cs-hd-h1 {
      font-size: clamp(34px, 3.6vw, 48px);
      font-weight: 800;
      color: var(--white);
      line-height: 1.06;
      letter-spacing: -0.012em;
      margin: 0;
      text-wrap: balance;
    }
    .cs-hd-descriptor {
      margin-top: 18px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: rgba(255,255,255,0.70);
      font-style: italic;
    }
    .cs-hd-results-eyebrow {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-top: 44px;
      margin-bottom: 22px;
    }
    .cs-hd-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 36px;
    }
    .cs-hd-stat {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    .cs-hd-stat-icon {
      font-size: 30px;
      color: var(--gold);
      line-height: 1;
      margin-top: 4px;
    }
    .cs-hd-stat-num {
      font-size: 42px;
      font-weight: 800;
      color: var(--white);
      line-height: 0.95;
      letter-spacing: -0.025em;
      margin-bottom: 6px;
    }
    .cs-hd-stat-label {
      font-size: 12px;
      color: rgba(255,255,255,0.75);
      font-weight: 400;
      line-height: 1.35;
    }

    /* Executive brief block */
    .cs-hd-brief {
      border-left: 2px solid var(--gold);
      padding: 4px 0 4px 22px;
    }
    .cs-hd-brief-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 14px;
    }
    .cs-hd-brief-body {
      font-size: 14.5px;
      line-height: 1.75;
      color: rgba(255,255,255,0.88);
      font-weight: 300;
      margin: 0;
    }

    /* Disciplines caption (nested inside brief, follows brief copy) */
    .cs-hd-meta {
      margin-top: 18px;
      font-size: 10.5px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      line-height: 1.5;
    }

    .cs-hd-pdf {
      align-self: flex-end;
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 11px 20px;
      background: var(--gold);
      color: var(--navy);
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      transition: background 160ms ease, color 160ms ease;
    }
    .cs-hd-pdf:hover {
      background: #d27d2e;       /* brief GOLD darkened ~10% for hover */
      color: var(--navy);
    }

    /* ── Tablet: brief column narrows, H1 scales ── */
    @media (max-width: 1100px) {
      .cs-hero-dense-inner {
        grid-template-columns: 1fr 280px;
        column-gap: 44px;
      }
      .cs-hd-stats { gap: 24px; }
      .cs-hd-stat-num { font-size: 38px; }
    }

    /* ── Mobile: linear stack in priority order ── */
    @media (max-width: 860px) {
      .cs-hero-dense {
        padding: 72px 0 64px;
      }
      .cs-hero-dense-inner {
        padding: 0 32px;
        grid-template-columns: 1fr;
        grid-template-areas:
          "tags"
          "h1"
          "desc"
          "reb"
          "stats"
          "brief"
          "meta"
          "pdf";
        row-gap: 0;
      }
      .cs-hd-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      .cs-hd-stat {
        flex-direction: column;
        gap: 8px;
      }
      .cs-hd-stat-icon { font-size: 24px; }
      .cs-hd-stat-num  { font-size: 32px; }
      .cs-hd-brief {
        margin-top: 40px;
        padding-left: 18px;
      }
      .cs-hd-meta {
        padding-left: 18px;
      }
      .cs-hd-pdf {
        justify-self: stretch;
        margin-top: 24px;
        justify-content: center;
        padding: 14px 20px;
      }
    }

    /* ── Phone: stats stack vertically and center, hero padding tightens ── */
    @media (max-width: 540px) {
      .cs-hero-dense {
        padding: 56px 0 48px;
      }
      .cs-hero-dense-inner {
        padding: 0 24px;
      }
      .cs-hd-tags { gap: 8px 12px; font-size: 10px; }
      .cs-hd-h1 { font-size: clamp(26px, 7.5vw, 34px); }
      .cs-hd-results-eyebrow { text-align: center; }
      .cs-hd-stats {
        grid-template-columns: 1fr;
        gap: 22px;
        justify-items: center;
      }
      .cs-hd-stat {
        flex-direction: column;
        gap: 8px;
        align-items: center;
        text-align: center;
      }
      .cs-hd-stat-num { font-size: 40px; }
      .cs-hd-stat-label { text-align: center; }
      .cs-hd-brief {
        border-left: none;
        border-top: 1px solid var(--gold);
        padding: 24px 0 0 0;
        margin-top: 36px;
      }
      .cs-hd-meta { padding-left: 0; }
      .cs-hd-pdf {
        align-self: center;
        margin-top: 28px;
        max-width: 280px;
        width: 100%;
      }
    }
    .cs-eyebrow {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 24px;
    }
    .cs-h1 {
      font-size: clamp(36px, 4.2vw, 56px);
      font-weight: 800;
      color: var(--white);
      line-height: 1.08;
      letter-spacing: -0.01em;
      max-width: 22ch;
    }
    .cs-sub {
      font-size: clamp(17px, 1.5vw, 22px);
      font-weight: 300;
      color: rgba(255,255,255,0.90);
      max-width: 60ch;
      line-height: 1.5;
      margin-top: 28px;
    }
    .cs-rule {
      width: 80px;
      height: 1px;
      background: var(--gold);
      margin-top: 64px;
    }

    /* DOWNLOAD STRIP */
    .cs-actions {
      background: var(--gray50);
      border-bottom: 1px solid var(--gray100);
    }
    .cs-actions-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }
    .cs-meta {
      font-size: 13px;
      color: var(--navy400);
      font-weight: 400;
      letter-spacing: 0.02em;
    }
    .cs-meta strong {
      color: var(--navy);
      font-weight: 600;
    }
    .cs-pdf-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--navy);
      color: var(--white);
      border: 1px solid var(--navy);
      padding: 12px 22px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
      text-decoration: none;
      transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
    }
    .cs-pdf-btn:hover {
      background: var(--gold);
      color: var(--navy);
      border-color: var(--gold);
    }
    .cs-pdf-btn svg { display: block; }

    /* STAT STRIP */
    .cs-stats {
      background: var(--white);
      border-bottom: 1px solid var(--gray100);
    }
    .cs-stats-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 64px 48px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 48px;
    }
    .cs-stat {
      display: flex;
      flex-direction: column;
      gap: 14px;
      border-top: 2px solid var(--gold);
      padding-top: 24px;
    }
    .cs-stat-icon {
      font-size: 32px;
      color: var(--navy);
      line-height: 1;
      margin-bottom: 4px;
    }
    .cs-stat-num {
      font-size: clamp(56px, 6vw, 80px);
      font-weight: 800;
      color: var(--navy);
      line-height: 0.95;
      letter-spacing: -0.03em;
    }
    .cs-stat-label {
      font-size: 16px;
      color: var(--navy400);
      font-weight: 500;
      line-height: 1.4;
      max-width: 28ch;
    }

    /* BODY SECTIONS */
    .cs-section {
      padding: 96px 0;
    }
    .cs-section.alt { background: var(--gray50); }
    .cs-section-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 48px;
    }
    .cs-eyebrow-dark {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold600);
      margin-bottom: 20px;
    }
    .cs-h2 {
      font-size: clamp(28px, 3vw, 40px);
      font-weight: 700;
      color: var(--navy400);
      line-height: 1.15;
      letter-spacing: -0.01em;
      max-width: 30ch;
      margin-bottom: 32px;
    }
    .cs-body {
      max-width: 68ch;
    }
    .cs-body p {
      font-size: 18px;
      line-height: 1.65;
      font-weight: 300;
      color: var(--gray700);
      margin-bottom: 20px;
    }
    .cs-body p:last-child { margin-bottom: 0; }

    /* DIAGNOSIS GRID */
    .cs-diag-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px 56px;
      margin-top: 8px;
    }
    .cs-diag-item {
      border-top: 1px solid var(--gray100);
      padding-top: 24px;
    }
    .cs-diag-num {
      font-size: 13px;
      font-weight: 600;
      color: var(--gold600);
      letter-spacing: 0.18em;
      margin-bottom: 12px;
    }
    .cs-diag-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--navy);
      line-height: 1.25;
      margin-bottom: 10px;
      letter-spacing: -0.005em;
    }
    .cs-diag-body {
      font-size: 16px;
      line-height: 1.55;
      color: var(--gray700);
      font-weight: 300;
    }

    /* RESULTS GRID */
    .cs-results-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 48px 40px;
      margin-top: 16px;
    }
    .cs-result {
      border-top: 1px solid var(--gray100);
      padding-top: 24px;
    }
    .cs-result-icon {
      font-size: 24px;
      color: var(--gold600);
      line-height: 1;
      margin-bottom: 12px;
    }
    .cs-result-num {
      font-size: 56px;
      font-weight: 800;
      color: var(--navy);
      line-height: 1;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
    }
    .cs-result-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--gold600);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .cs-result-body {
      font-size: 15px;
      line-height: 1.55;
      color: var(--gray700);
      font-weight: 300;
    }

    /* CTA */
    .cs-cta {
      background: var(--navy900);
      padding: 96px 0;
    }
    .cs-cta-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 48px;
      text-align: center;
    }
    .cs-cta h2 {
      font-size: clamp(28px, 3.2vw, 44px);
      font-weight: 800;
      color: var(--white);
      line-height: 1.15;
      letter-spacing: -0.01em;
      max-width: 24ch;
      margin: 0 auto 28px;
    }
    .cs-cta p {
      font-size: 18px;
      line-height: 1.6;
      color: rgba(255,255,255,0.80);
      max-width: 56ch;
      margin: 0 auto 40px;
      font-weight: 300;
    }
    .cs-cta-actions {
      display: inline-flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .cs-cta-primary {
      background: var(--gold);
      color: var(--navy);
      border: 1px solid var(--gold);
      padding: 16px 32px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
      text-decoration: none;
      transition: background 160ms ease;
    }
    .cs-cta-primary:hover { background: var(--gold600); border-color: var(--gold600); }
    .cs-cta-secondary {
      background: transparent;
      color: var(--white);
      border: 1px solid rgba(255,255,255,0.40);
      padding: 16px 32px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
      text-decoration: none;
      transition: border-color 160ms ease, color 160ms ease;
    }
    .cs-cta-secondary:hover { border-color: var(--gold); color: var(--gold); }

    /* MOBILE */
    @media (max-width: 900px) {
      .cs-stats-inner { grid-template-columns: 1fr; gap: 40px; padding: 56px 32px; }
      .cs-section { padding: 64px 0; }
      .cs-section-inner { padding: 0 32px; }
      .cs-diag-grid { grid-template-columns: 1fr; gap: 32px; }
      .cs-results-grid { grid-template-columns: 1fr; gap: 40px; }
      .cs-actions-inner { padding: 20px 32px; }
      .cs-cta-inner { padding: 0 32px; }
    }
  }

  /* Site nav responsive — top-level so it isn't trapped in @media screen */
  @media (max-width: 900px) {
    .nav-desktop { display: none !important; }
    .nav-mobile { display: flex !important; }
    .nav-tagline { display: none !important; }
  }

  /* ════════════════════════════════════════════
     PRINT LAYOUT — letter size, designed document
     ════════════════════════════════════════════ */
  @page {
    size: letter;
    margin: 0;
  }

  @media print {
    body {
      background: var(--white) !important;
      padding: 0 !important;
      margin: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    /* Hide all screen chrome — both legacy (#site-header-root /
       #site-footer-root) and the current Brief* layout (.brief-header,
       .brief-footer, mobile drawer overlays, sticky CTAs, etc.). The
       brief-* rules are what the user reported as "PDF download is
       broken" — the print-doc was still rendering, but the new
       header/footer were bleeding into the printed page. */
    #site-header-root,
    #site-footer-root,
    .brief-header,
    .brief-footer,
    .brief-mobile-drawer,
    .brief-mobile-drawer-scrim,
    .cs-hero,
    .cs-actions,
    .cs-stats,
    .cs-section,
    .cs-cta,
    .screen-only { display: none !important; }

    /* Reset any sticky/min-height the brief layout enforces so the
       print doc starts at the very top of page 1. */
    html, body {
      min-height: 0 !important;
      height: auto !important;
    }

    /* Show print doc */
    .print-doc {
      display: block !important;
    }
  }

  /* ════════════════════════════════════════════════════════════════════
     PRINT DOCUMENT — refined v0.3.1 (matches legacy Adobe Illustrator
     design language: full-bleed navy masthead, navy stat block, gold
     section rules, navy footer band). Density tightened ~25% vs v0.3.0.
     ════════════════════════════════════════════════════════════════════ */

  .print-doc {
    font-family: 'proxima-nova', 'Proxima Nova', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: var(--gray700);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    /* Print-context kerning + feature settings — see comment on html/body
       above. Doubled here so the rules apply even if the html/body cascade
       is broken by a parent override during print rendering. */
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    font-kerning: normal;
    text-rendering: optimizeLegibility;
  }
  .print-doc * {
    font-feature-settings: inherit;
    font-kerning: inherit;
  }

  .print-page {
    width: 8.5in;
    height: 11in;
    padding: 0;          /* full-bleed page; sections control their own padding */
    box-sizing: border-box;
    background: var(--white);
    position: relative;
    page-break-after: always;
    overflow: hidden;
  }
  .print-page:last-child { page-break-after: auto; }

  /* Inner content area — every non-bleed section sits inside this padding */
  .pp-content {
    padding: 0 0.55in;
  }

  /* ── PAGE 1 — SLIM FULL-BLEED NAVY MASTHEAD ───────────────────────
     Masthead contains ONLY the POWERS logo (top-left) and the eyebrow
     ("CASE STUDY | AEROSPACE & DEFENSE", right-justified). The H1
     moves below the masthead into the white content area where it's
     the dominant typographic moment in navy-800. The big "Results at
     a Glance" stat block is then the strong navy color moment on the
     page. ──────────────────────────────────────────────────────── */
  .pp-mast {
    background: var(--navy);
    padding: 0.30in 0.55in;
    margin: 0;
    border-bottom: 3px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pp-mast-logo img {
    height: 52px;
    width: auto;
    display: block;
  }
  .pp-mast-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .pp-mast-meta .pp-tag      { color: var(--gold); }
  .pp-mast-meta .pp-bar      { color: rgba(232, 147, 70, 0.55); font-weight: 400; }
  .pp-mast-meta .pp-industry { color: var(--gold); }

  /* ── PAGE 1 — BODY ─────────────────────────────────────────────── */
  .pp-disciplines {
    font-size: 9.5px;
    color: var(--navy400);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
    padding-top: 22px;
    margin-bottom: 14px;
  }

  /* Dominant H1 — now sits on white between the slim masthead and the
     navy stat block. Navy-800 (#183a61), large, sentence case. */
  .pp-h1 {
    font-size: 28px;
    line-height: 1.10;
    font-weight: 700;
    color: var(--navy);
    margin: 0 0 18px;
    letter-spacing: -0.018em;
    text-wrap: balance;
    max-width: 7in;
  }

  /* H1 descriptor — sits directly beneath the H1 like the web hero's
     italic descriptor. Same role: a one-line clarifier identifying the
     client archetype. Print-scaled (~11pt) so it doesn't crowd the
     stat block beneath it. */
  .pp-h1-descriptor {
    font-size: 11px;
    font-weight: 500;
    font-style: italic;
    letter-spacing: 0.04em;
    color: var(--navy400);
    margin: -8px 0 18px;
    max-width: 7in;
  }

  .pp-brief {
    border-left: 3px solid var(--gold);
    padding: 12px 16px;
    background: #fdf6e8;
    margin-bottom: 18px;
  }
  .pp-brief-label {
    font-size: 9px;
    color: var(--navy400);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .pp-brief-body {
    font-size: 11px;
    line-height: 1.5;
    color: var(--gray700);
    font-weight: 400;
  }

  /* Stat strip — RESULTS AT A GLANCE — full-bleed navy block with white
     stat values + gold accent labels per the legacy design language */
  .pp-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    background: var(--navy);
    margin: 8px -0.55in 22px;
    padding: 20px 0.55in 20px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pp-stat {
    display: flex;
    gap: 11px;
    align-items: flex-start;
    color: var(--white);
  }
  .pp-stat-icon {
    font-size: 26px;
    color: var(--gold);
    line-height: 1;
    margin-top: 4px;
  }
  .pp-stat-num {
    font-size: 34px;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.025em;
    line-height: 1;
    margin-bottom: 6px;
  }
  .pp-stat-label {
    font-size: 9.5px;
    color: var(--gold);
    line-height: 1.32;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  /* Section block (Situation, Diagnosis, etc.) — tighter spacing */
  .pp-section { margin-top: 18px; }
  .pp-section-eyebrow {
    font-size: 9.5px;
    color: var(--gold);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 6px;
    padding-top: 0;
  }
  /* Gold rule above section eyebrows — the key "color blocking through the
     document" treatment the user called for */
  .pp-section-eyebrow--ruled::before {
    content: "";
    display: block;
    width: 36px;
    height: 2px;
    background: var(--gold);
    margin-bottom: 8px;
  }
  .pp-section-h2 {
    font-size: 16px;
    line-height: 1.22;
    font-weight: 700;
    color: var(--navy);
    margin: 0 0 9px;
    letter-spacing: -0.012em;
    text-wrap: balance;
  }
  .pp-section-p {
    font-size: 11px;
    line-height: 1.5;
    color: var(--gray700);
    font-weight: 400;
    margin: 0 0 6px;
  }
  .pp-section-p:last-child { margin: 0; }

  /* ── PAGE 2 — CONTINUATION NAVY BAND ───────────────────────────── */
  /* Vertical height intentionally deepened so the band content sits
     below typical printer hardware-margin clipping (~0.25–0.4in from
     the top edge). Mirrors the bottom navy footer band. */
  .pp-cont-mast {
    background: var(--navy);
    padding: 0.40in 0.55in 0.20in;
    margin: 0;
    border-bottom: 2px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pp-cont-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--gold);
  }
  .pp-cont-meta .pp-cont-bar      { color: rgba(232, 147, 70, 0.55); font-weight: 400; }
  .pp-cont-meta .pp-cont-industry { color: var(--gold); }
  .pp-cont-meta .pp-cont-tag      { color: var(--gold); }
  .pp-cont-label {
    font-size: 9px;
    color: var(--white);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    opacity: 0.85;
  }

  /* Page 2 diagnosis grid — gold rule above each card */
  .pp-diag-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 24px;
    margin-top: 4px;
  }
  .pp-diag-grid > div {
    padding-top: 8px;
    border-top: 1.5px solid var(--gold);
  }
  .pp-diag-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 4px;
    letter-spacing: -0.005em;
  }
  .pp-diag-body {
    font-size: 10.5px;
    line-height: 1.42;
    color: var(--gray700);
    margin: 0;
    font-weight: 400;
  }

  /* Page 2 result list — gold rule above each stat card */
  .pp-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 24px;
    margin-top: 4px;
  }
  .pp-result {
    display: flex;
    gap: 14px;
    padding-top: 8px;
    border-top: 1.5px solid var(--gold);
  }
  .pp-result-num {
    font-size: 22px;
    line-height: 1;
    font-weight: 800;
    color: var(--navy);
    letter-spacing: -0.02em;
    min-width: 52px;
    padding: 1px 0 0 0;
  }
  .pp-result-label {
    font-size: 10px;
    color: var(--navy);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .pp-result-body {
    font-size: 10.5px;
    line-height: 1.4;
    color: var(--gray700);
    margin: 0;
    font-weight: 400;
  }

  /* ── NAVY FOOTER BAND — full-bleed, both pages ─────────────────────
     Vertical height intentionally deepened so the band content (POWERS
     brand, phone, email, address, page indicator) sits above typical
     printer hardware-margin clipping (~0.25–0.4in from the bottom
     edge). Mirrors the page-2 continuation header band. */
  .pp-foot {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--navy);
    padding: 0.20in 0.55in 0.40in;
    border-top: 2px solid var(--gold);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pp-foot-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 8.5px;
    color: rgba(255,255,255,0.92);
    letter-spacing: 0.06em;
    flex-wrap: nowrap;
  }
  .pp-foot-sep      { color: var(--gold); }
  .pp-foot-brand {
    color: var(--gold);
    font-weight: 700;
    letter-spacing: 0.14em;
    font-size: 10px;
  }
  .pp-foot-page {
    margin-left: auto;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.14em;
    font-size: 9px;
  }

  /* SCREEN-ONLY preview wrapper for print pages
     — when user clicks "Preview Print Layout" we show this on screen */
  .print-preview-mode .print-doc {
    display: block;
    background: var(--gray100);
    padding: 32px 0;
  }
  .print-preview-mode .print-page {
    margin: 0 auto 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  }

  /* PW patch: hero redesign — show dense hero on screen, keep print path */
  @media screen { .cs-hero[data-hero="simple"] { display: none !important; } }
  @media print { .cs-hero-dense[data-hero="dense"] { display: none !important; } }`;
