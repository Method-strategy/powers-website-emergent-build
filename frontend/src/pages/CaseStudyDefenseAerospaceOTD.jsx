import React from 'react';
import LegacyPage from '../components/LegacyPage';

const CSS = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #183a61;
    --navy900: #0d2442;
    --navy400: #4a6a8a;
    --navy100: #d6e2ee;
    --navy50: #f0f4f8;
    --gold: #eabb71;
    --gold600: #c9963e;
    --white: #ffffff;
    --gray50: #f5f5f3;
    --gray100: #e8e8e4;
    --gray400: #888884;
    --gray700: #3a3a38;
    --gray900: #1a1a18;
  }

  html, body {
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: var(--white);
    color: var(--gray700);
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
    body { padding-top: 84px; }

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
      padding: 96px 48px 80px;
    }
    .cs-hero-dense-inner {
      max-width: 1280px;
      margin: 0 auto;
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
      background: #d9a85a;
      color: var(--navy-mid);
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
        padding: 72px 32px 64px;
      }
      .cs-hero-dense-inner {
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
        padding: 56px 24px 48px;
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
    }
    /* Hide all screen chrome */
    #site-header-root,
    #site-footer-root,
    .cs-hero,
    .cs-actions,
    .cs-stats,
    .cs-section,
    .cs-cta,
    .screen-only { display: none !important; }

    /* Show print doc */
    .print-doc {
      display: block !important;
    }
  }

  /* PRINT DOC STYLES — also visible in screen-preview wrapper if user wants */
  .print-doc {
    font-family: 'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: var(--gray700);
  }

  .print-page {
    width: 8.5in;
    height: 11in;
    padding: 0.55in 0.6in 0.55in 0.6in;
    box-sizing: border-box;
    background: var(--white);
    position: relative;
    page-break-after: always;
    overflow: hidden;
  }
  .print-page:last-child { page-break-after: auto; }

  /* Print masthead */
  .pp-mast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 0.5px solid var(--gray100);
  }
  .pp-mast-logo img {
    height: 41px;
    width: auto;
    display: block;
  }
  .pp-mast-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
  }
  .pp-mast-meta .pp-tag {
    color: var(--gray400);
  }
  .pp-mast-meta .pp-bar { color: var(--gold); }
  .pp-mast-meta .pp-industry {
    color: var(--navy);
    font-weight: 600;
  }

  /* Page 1 hero */
  .pp-hero {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 32px;
    margin-top: 24px;
  }
  .pp-eyebrow {
    font-size: 9.5px;
    color: var(--navy400);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .pp-h1 {
    font-size: 32px;
    line-height: 1.06;
    font-weight: 800;
    color: var(--navy);
    margin: 12px 0 0;
    letter-spacing: -0.022em;
    text-wrap: balance;
  }
  .pp-brief {
    border-left: 2px solid var(--gold);
    padding: 14px 16px 14px 16px;
    background: #fdf6e8;
  }
  .pp-brief-label {
    font-size: 9px;
    color: var(--navy400);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .pp-brief-body {
    font-size: 11px;
    line-height: 1.5;
    color: var(--gray700);
    font-weight: 400;
  }

  .pp-rule-gold {
    height: 2px;
    background: var(--gold);
    margin-top: 22px;
    width: 100%;
  }

  /* Page 1 stat strip */
  .pp-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    margin-top: 22px;
    padding-bottom: 22px;
    border-bottom: 0.5px solid var(--gray100);
  }
  .pp-stat {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .pp-stat-icon {
    font-size: 28px;
    color: var(--navy);
    line-height: 1;
    margin-top: 4px;
  }
  .pp-stat-num {
    font-size: 36px;
    font-weight: 800;
    color: var(--navy);
    color: var(--navy);
    letter-spacing: -0.025em;
    line-height: 1;
    margin-bottom: 8px;
  }
  .pp-stat-label {
    font-size: 10.5px;
    color: var(--navy400);
    line-height: 1.35;
    font-weight: 500;
  }

  /* Section block (situation, diagnosis, etc.) */
  .pp-section { margin-top: 24px; }
  .pp-section-eyebrow {
    font-size: 10px;
    color: #eabb71;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .pp-section-h2 {
    font-size: 17px;
    line-height: 1.2;
    font-weight: 600;
    color: var(--navy400);
    margin: 0 0 12px;
    letter-spacing: -0.01em;
  }
  .pp-section-p {
    font-size: 11.5px;
    line-height: 1.55;
    color: var(--gray700);
    font-weight: 400;
    margin: 0 0 8px;
  }
  .pp-section-p:last-child { margin: 0; }

  /* Page 2 diagnosis grid */
  .pp-diag-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 28px;
    margin-top: 4px;
  }
  .pp-diag-title {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 4px;
    letter-spacing: -0.005em;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--gold);
    display: inline-block;
  }
  .pp-diag-body {
    font-size: 11px;
    line-height: 1.45;
    color: var(--gray700);
    margin: 0;
    font-weight: 400;
  }

  /* Page 2 result list */
  .pp-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 28px;
    margin-top: 6px;
  }
  .pp-result {
    display: flex;
    gap: 14px;
  }
  .pp-result-num {
    font-size: 22px;
    line-height: 1;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.02em;
    min-width: 56px;
    padding: 2px 0 2px 10px;
    border-left: 2px solid var(--gold);
  }
  .pp-result-label {
    font-size: 10.5px;
    color: var(--navy);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .pp-result-body {
    font-size: 11px;
    line-height: 1.4;
    color: var(--gray700);
    margin: 0;
    font-weight: 400;
  }

  /* Print footer */
  .pp-foot {
    position: absolute;
    bottom: 0.4in;
    left: 0.6in;
    right: 0.6in;
    padding-top: 10px;
    border-top: 1px solid var(--gold);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 9.5px;
    color: var(--gray400);
    letter-spacing: 0.04em;
    flex-wrap: wrap;
  }
  .pp-foot-sep { color: var(--gold); }
  .pp-foot-brand {
    color: var(--navy);
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .pp-foot-mid {
    text-align: center;
    font-weight: 400;
  }
  .pp-foot-page {
    font-weight: 500;
    color: var(--navy400);
  }

  /* Page 2 continuation header */
  .pp-cont-mast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 0.5px solid var(--gray100);
    font-size: 10px;
  }
  .pp-cont-title {
    color: var(--navy);
    font-weight: 500;
  }
  .pp-cont-title .pp-cont-tag {
    color: var(--gray400);
    font-weight: 300;
  }
  .pp-cont-label {
    font-size: 9px;
    color: var(--navy400);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
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
  @media print { .cs-hero-dense[data-hero="dense"] { display: none !important; } }
  `;

const HTML = `<!-- ─────────── SCREEN HERO (original, simple) ─────────── -->
<section class="cs-hero screen-only" data-hero="simple">
  <div class="cs-hero-inner">
    <div class="cs-eyebrow">Case Study · Defense &amp; Aerospace</div>
    <h1 class="cs-h1">On-Time Performance Climbed From 56% to 89% Inside a Defense Operation Running on Opinion.</h1>
    <p class="cs-sub">Schedules shifted hourly, supervisors couldn't tell operators what to work on, and rework time nearly equaled first-pass assembly. POWERS installed a unified production schedule, a working capacity model, and the leadership routines required to hold both.</p>
    <div class="cs-rule"></div>
  </div>
</section>

<!-- ─────────── SCREEN HERO (dense, full-content) ─────────── -->
<!--
  DOM order = content priority order (drives mobile stack + a11y + SEO):
  1. Tags (Case Study | Industry)
  2. H1
  3. Descriptor
  4. Results-at-a-Glance eyebrow
  5. Three stats
  6. Executive Brief
  7. Disciplines metadata
  8. Download PDF button
  Desktop layout: CSS Grid named areas rearranges into 2 columns.
-->
<section class="cs-hero-dense screen-only" data-hero="dense">
  <div class="cs-hero-dense-inner">

    <div class="cs-hd-left">
    <div class="cs-hd-tags">
      <span class="cs-hd-tag-cs">Case Study</span>
      <span class="cs-hd-tag-bar">|</span>
      <span class="cs-hd-tag-industry">Defense &amp; Aerospace</span>
    </div>

    <h1 class="cs-hd-h1">On-time performance climbed from 56% to 89% inside a make-to-order defense operation that had been running on opinion.</h1>

    <div class="cs-hd-descriptor">Make-to-Order Defense Manufacturer</div>

    <div class="cs-hd-results-eyebrow">Results at a Glance</div>

    <div class="cs-hd-stats">
      <div class="cs-hd-stat">
        <i class="ti ti-target-arrow cs-hd-stat-icon"></i>
        <div>
          <div class="cs-hd-stat-num">59%</div>
          <div class="cs-hd-stat-label">On-time performance,<br/>56% to 89%</div>
        </div>
      </div>
      <div class="cs-hd-stat">
        <i class="ti ti-clock-bolt cs-hd-stat-icon"></i>
        <div>
          <div class="cs-hd-stat-num">65%</div>
          <div class="cs-hd-stat-label">Lead time in testing,<br/>7.5 days to 2.5</div>
        </div>
      </div>
      <div class="cs-hd-stat">
        <i class="ti ti-trending-down cs-hd-stat-icon"></i>
        <div>
          <div class="cs-hd-stat-num">69%</div>
          <div class="cs-hd-stat-label">Lost time reduction<br/>in SMT operations</div>
        </div>
      </div>
    </div>
    </div>

    <div class="cs-hd-right">
    <div class="cs-hd-brief">
      <div class="cs-hd-brief-label">Executive Brief</div>
      <p class="cs-hd-brief-body">Schedules shifted hourly, supervisors couldn't tell operators what to work on, and rework time nearly equaled first-pass assembly. POWERS installed a unified production schedule, a working capacity model, and the leadership routines required to hold both. On-time performance improved 59% without expansion, hiring, or new equipment.</p>
      <div class="cs-hd-meta">MOS &middot; Frontline Leadership &middot; Supply Chain</div>
    </div>

    <button class="cs-hd-pdf" onclick="window.print()" aria-label="Download this case study as PDF">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1v9M4 6.5L8 10.5L12 6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 13h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
      Download PDF
    </button>
    </div>

  </div>
</section>

<!-- ─────────── SITUATION ─────────── -->
<section class="cs-section screen-only" data-row="situation">
  <div class="cs-section-inner">
    <div class="cs-eyebrow-dark">The Situation</div>
    <h2 class="cs-h2">Outdated Paradigms, a Generational Management Transition, and a Culture Where Everything Was Priority One.</h2>
    <div class="cs-body">
      <p>A competitive bidding environment, disrupted supply chains, and a manufacturing department with little internal predictability had left this make-to-order defense manufacturer struggling to deliver on time and under budget. Production paradigms that had worked for decades no longer scaled with the operation, and the organization was simultaneously absorbing a generational management transition. Leaders carrying twenty-plus years of institutional knowledge were approaching retirement.</p>
      <p>With programs behind schedule and customers to satisfy, program managers competed for limited resources while senior leadership had little visibility into how individual decisions affected the whole. The result was an opaque operation, a culture without accountability, and rework time that nearly equaled first-pass assembly. Every order was urgent, which meant nothing was.</p>
      <p>Beneath the urgency, the foundations had eroded. Production data could not be trusted to plan or forecast, no unified schedule reconciled program demands against capacity, and supervisors were spending their shifts deciding what could be worked on rather than getting it done.</p>
    </div>
  </div>
</section>

<!-- ─────────── DIAGNOSIS ─────────── -->
<section class="cs-section alt screen-only" data-row="diagnosis">
  <div class="cs-section-inner">
    <div class="cs-eyebrow-dark" style="text-align: center">The Diagnosis</div>
    <h2 class="cs-h2" style="text-align: center">Six Structural Gaps Producing the Same Outcome From Six Directions.</h2>

    <div class="cs-diag-grid">
      <div class="cs-diag-item">
        <div class="cs-diag-num">01</div>
        <div class="cs-diag-title">Inaccurate, Insufficient Production Data</div>
        <p class="cs-diag-body">Work and time relationship studies showed the operation could not reliably plan or forecast resources. The underlying database was inaccurate and incomplete.</p>
      </div>
      <div class="cs-diag-item">
        <div class="cs-diag-num">02</div>
        <div class="cs-diag-title">No Unified Production Schedule</div>
        <p class="cs-diag-body">A patchwork of constantly shifting hot lists had taken the place of a real schedule. Reactive production became the default operating mode.</p>
      </div>
      <div class="cs-diag-item">
        <div class="cs-diag-num">03</div>
        <div class="cs-diag-title">Poor Cross-Program Collaboration</div>
        <p class="cs-diag-body">Program timelines were built in silos without reconciling production resources across the enterprise. Programs were planned as if they were the only program.</p>
      </div>
      <div class="cs-diag-item">
        <div class="cs-diag-num">04</div>
        <div class="cs-diag-title">Weak Shop Floor Control</div>
        <p class="cs-diag-body">Without a unified schedule, supervisors couldn't reliably assign work. Time was lost determining what could be worked on rather than executing it.</p>
      </div>
      <div class="cs-diag-item">
        <div class="cs-diag-num">05</div>
        <div class="cs-diag-title">Manufacturing Status as a Research Project</div>
        <p class="cs-diag-body">Determining where work actually stood diverted manufacturing, scheduling, operators, and program managers from their primary responsibilities.</p>
      </div>
      <div class="cs-diag-item">
        <div class="cs-diag-num">06</div>
        <div class="cs-diag-title">No Reporting, No Evaluation</div>
        <p class="cs-diag-body">Without operating reports, performance was unmeasurable. Past performance was never reviewed at the process or department level. There was no mechanism to see it.</p>
      </div>
    </div>
  </div>
</section>

<!-- ─────────── WHAT POWERS DID ─────────── -->
<section class="cs-section screen-only" data-row="powers">
  <div class="cs-section-inner">
    <div class="cs-eyebrow-dark">What POWERS Did</div>
    <h2 class="cs-h2">Built the Operating System the Manufacturer Had Grown Beyond.</h2>
    <div class="cs-body">
      <p>Working with manufacturing engineers, the POWERS team constructed observations and time studies that established defensible expectations across hundreds of unique routing operations. With the planning department, a capacity model was developed that supported both short-term scheduling and long-term resource forecasting. Frontline leadership received hands-on coaching on short-interval scheduling, follow-up, and barrier identification. Supervisors gained the means to spot variance and act on it.</p>
      <p>Lost time was captured to root cause and converted into corrective actions. Working with IT, operating reports were built to make production performance visible to management, identify variance down to the operation level, and close the feedback loop to program management and scheduling. The cumulative effect was a singular priority focus replacing an environment in which everything had been priority one.</p>
    </div>
  </div>
</section>

<!-- ─────────── FULL RESULTS ─────────── -->
<section class="cs-section alt screen-only" data-row="results">
  <div class="cs-section-inner">
    <div class="cs-eyebrow-dark">The Full Result</div>
    <h2 class="cs-h2">Six Measurable Gains, All Without Expansion, Hiring, or New Equipment.</h2>

    <div class="cs-results-grid">
      <div class="cs-result">
        <i class="ti ti-target-arrow cs-result-icon"></i>
        <div class="cs-result-num">59%</div>
        <div class="cs-result-label">On-Time Performance</div>
        <p class="cs-result-body">From 56% to 89%. Real-time ERP usage and shop floor planning visibility fed near real-time information to program managers and customers, reducing expedites.</p>
      </div>
      <div class="cs-result">
        <i class="ti ti-clock-bolt cs-result-icon"></i>
        <div class="cs-result-num">65%</div>
        <div class="cs-result-label">Lead Time Reduction</div>
        <p class="cs-result-body">Lead time in testing fell from 7.5 days to 2.5 as fewer scheduling changes and tighter upstream coordination improved flow through the work center.</p>
      </div>
      <div class="cs-result">
        <i class="ti ti-trending-down cs-result-icon"></i>
        <div class="cs-result-num">69%</div>
        <div class="cs-result-label">Lost Time Reduction</div>
        <p class="cs-result-body">Surface Mount Technology lost time fell after SMED analysis, structured start-up routines, and root-cause corrective action.</p>
      </div>
      <div class="cs-result">
        <i class="ti ti-hourglass-low cs-result-icon"></i>
        <div class="cs-result-num">56%</div>
        <div class="cs-result-label">Indirect Time Reduction</div>
        <p class="cs-result-body">Manufacturing operators saw indirect time charged drop by more than half as work cells reorganized around a clearer schedule.</p>
      </div>
      <div class="cs-result">
        <i class="ti ti-package cs-result-icon"></i>
        <div class="cs-result-num">22%</div>
        <div class="cs-result-label">Stock Room Output Gain</div>
        <p class="cs-result-body">Root-cause focus on lost-time drivers improved stock room throughput without adding headcount.</p>
      </div>
      <div class="cs-result">
        <i class="ti ti-calendar-check cs-result-icon"></i>
        <div class="cs-result-num">20%</div>
        <div class="cs-result-label">Scheduling Accuracy Gain</div>
        <p class="cs-result-body">Time studies and feedback loops between production management and engineering improved schedule accuracy in cable and wire.</p>
      </div>
    </div>
  </div>
</section>

<!-- ─────────── BOTTOM CTA ─────────── -->
<section class="cs-cta screen-only">
  <div class="cs-cta-inner">
    <h2>Ready to Make Performance Stick in Your Operation?</h2>
    <p>Every POWERS engagement starts with a two-week Discovery. We document the gap between executive intent and shop floor performance, then build the system to close it.</p>
    <div class="cs-cta-actions">
      <a href="contact.html" class="cs-cta-primary">Start a Conversation</a>
      <button class="cs-cta-secondary" onclick="window.print()">Download This Case Study</button>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     PRINT DOCUMENT (hidden on screen, shown on print)
     ════════════════════════════════════════════ -->
<div class="print-doc" id="print-doc">

  <!-- ── PAGE 1 ── -->
  <div class="print-page">
    <div class="pp-mast">
      <div class="pp-mast-logo">
        <img src="/uploads/powers-logo-refined-2026.png" alt="POWERS" />
      </div>
      <div class="pp-mast-meta">
        <span class="pp-tag">Case Study</span>
        <span class="pp-bar">|</span>
        <span class="pp-industry">Defense &amp; Aerospace</span>
      </div>
    </div>

    <div class="pp-hero">
      <div>
        <div class="pp-eyebrow">MOS &nbsp;·&nbsp; Supply Chain &nbsp;·&nbsp; Frontline Leadership</div>
        <h1 class="pp-h1">On-time performance climbed from 56% to 89% inside a make-to-order defense operation that had been running on opinion.</h1>
      </div>
      <div class="pp-brief">
        <div class="pp-brief-label">Executive Brief</div>
        <p class="pp-brief-body">Schedules shifted hourly, supervisors couldn't tell operators what to work on, and rework time nearly equaled first-pass assembly. POWERS installed a unified production schedule, a working capacity model, and the leadership routines required to hold both. On-time performance improved 59% without expansion, hiring, or new equipment.</p>
      </div>
    </div>

    <div class="pp-rule-gold"></div>

    <div class="pp-section-eyebrow" style="margin-top: 24px; margin-bottom: 12px;">Results at a Glance</div>

    <div class="pp-stats" style="margin-top: 0;">
      <div class="pp-stat">
        <i class="ti ti-target-arrow pp-stat-icon"></i>
        <div>
          <div class="pp-stat-num">59%</div>
          <div class="pp-stat-label">On-time performance,<br/>56% to 89%</div>
        </div>
      </div>
      <div class="pp-stat">
        <i class="ti ti-clock-bolt pp-stat-icon"></i>
        <div>
          <div class="pp-stat-num">65%</div>
          <div class="pp-stat-label">Lead time in testing,<br/>7.5 days to 2.5</div>
        </div>
      </div>
      <div class="pp-stat">
        <i class="ti ti-trending-down pp-stat-icon"></i>
        <div>
          <div class="pp-stat-num">69%</div>
          <div class="pp-stat-label">Lost time reduction<br/>in SMT operations</div>
        </div>
      </div>
    </div>

    <div class="pp-section">
      <div class="pp-section-eyebrow">The Situation</div>
      <h2 class="pp-section-h2">Outdated paradigms, a generational management transition, and a culture where everything was priority one.</h2>
      <p class="pp-section-p">A competitive bidding environment, disrupted supply chains, and a manufacturing department with little internal predictability had left this make-to-order defense manufacturer struggling to deliver on time and under budget. Production paradigms that had worked for decades no longer scaled with the operation, and the organization was simultaneously absorbing a generational management transition. Leaders carrying twenty-plus years of institutional knowledge were approaching retirement.</p>
      <p class="pp-section-p">With programs behind schedule and customers to satisfy, program managers competed for limited resources while senior leadership had little visibility into how individual decisions affected the whole. The result was an opaque operation, a culture without accountability, and rework time that nearly equaled first-pass assembly. Every order was urgent, which meant nothing was.</p>
      <p class="pp-section-p">Beneath the urgency, the foundations had eroded. Production data could not be trusted to plan or forecast, no unified schedule reconciled program demands against capacity, and supervisors were spending their shifts deciding what could be worked on rather than getting it done.</p>
    </div>

    <div class="pp-foot">
      <span class="pp-foot-brand">POWERS</span>
      <span class="pp-foot-sep">|</span>
      <span>+1 678-971-4711</span>
      <span class="pp-foot-sep">|</span>
      <span>info@thepowerscompany.com</span>
      <span class="pp-foot-sep">|</span>
      <span>1801 Peachtree St NE, Suite 200</span>
      <span class="pp-foot-sep">|</span>
      <span>Atlanta, GA 30309</span>
      <span class="pp-foot-page" style="margin-left:auto">1 / 2</span>
    </div>
  </div>

  <!-- ── PAGE 2 ── -->
  <div class="print-page">
    <div class="pp-cont-mast">
      <div class="pp-cont-title">
        <span class="pp-cont-tag">Case Study &nbsp;|&nbsp; Defense &amp; Aerospace &nbsp;·&nbsp; </span>On-time performance from 56% to 89%
      </div>
      <div class="pp-cont-label">Continued</div>
    </div>

    <div class="pp-section">
      <div class="pp-section-eyebrow">The Diagnosis</div>
      <h2 class="pp-section-h2">Six structural gaps producing the same outcome from six directions.</h2>

      <div class="pp-diag-grid">
        <div>
          <div class="pp-diag-title">Inaccurate, insufficient production data</div>
          <p class="pp-diag-body">Work and time relationship studies showed the operation could not reliably plan or forecast resources. The underlying database was inaccurate and incomplete.</p>
        </div>
        <div>
          <div class="pp-diag-title">No unified production schedule</div>
          <p class="pp-diag-body">A patchwork of constantly shifting hot lists had taken the place of a real schedule. Reactive production became the default operating mode.</p>
        </div>
        <div>
          <div class="pp-diag-title">Poor cross-program collaboration</div>
          <p class="pp-diag-body">Program timelines were built in silos without reconciling production resources across the enterprise. Programs were planned as if they were the only program.</p>
        </div>
        <div>
          <div class="pp-diag-title">Weak shop floor control</div>
          <p class="pp-diag-body">Without a unified schedule, supervisors couldn't reliably assign work. Time was lost determining what could be worked on rather than executing it.</p>
        </div>
        <div>
          <div class="pp-diag-title">Manufacturing status as a research project</div>
          <p class="pp-diag-body">Determining where work actually stood diverted manufacturing, scheduling, operators, and program managers from their primary responsibilities.</p>
        </div>
        <div>
          <div class="pp-diag-title">No reporting, no evaluation</div>
          <p class="pp-diag-body">Without operating reports, performance was unmeasurable. Past performance was never reviewed at the process or department level. There was no mechanism to see it.</p>
        </div>
      </div>
    </div>

    <div class="pp-section">
      <div class="pp-section-eyebrow">What POWERS Did</div>
      <h2 class="pp-section-h2">Built the operating system the manufacturer had grown beyond.</h2>
      <p class="pp-section-p">Working with manufacturing engineers, the POWERS team constructed observations and time studies that established defensible expectations across hundreds of unique routing operations. With the planning department, a capacity model was developed that supported both short-term scheduling and long-term resource forecasting. Frontline leadership received hands-on coaching on short-interval scheduling, follow-up, and barrier identification. Supervisors gained the means to spot variance and act on it.</p>
      <p class="pp-section-p">Lost time was captured to root cause and converted into corrective actions. Working with IT, operating reports were built to make production performance visible to management, identify variance down to the operation level, and close the feedback loop to program management and scheduling. The cumulative effect was a singular priority focus replacing an environment in which everything had been priority one.</p>
    </div>

    <div class="pp-section">
      <div class="pp-section-eyebrow">The Full Result</div>

      <div class="pp-results">
        <div class="pp-result">
          <div class="pp-result-num">59%</div>
          <div>
            <div class="pp-result-label">On-Time Performance</div>
            <p class="pp-result-body">From 56% to 89%. Real-time ERP usage and shop floor planning visibility fed near real-time information to program managers and customers, reducing expedites.</p>
          </div>
        </div>
        <div class="pp-result">
          <div class="pp-result-num">65%</div>
          <div>
            <div class="pp-result-label">Lead Time Reduction</div>
            <p class="pp-result-body">Lead time in testing fell from 7.5 days to 2.5 as fewer scheduling changes and tighter upstream coordination improved flow through the work center.</p>
          </div>
        </div>
        <div class="pp-result">
          <div class="pp-result-num">69%</div>
          <div>
            <div class="pp-result-label">Lost Time Reduction</div>
            <p class="pp-result-body">Surface Mount Technology lost time fell after SMED analysis, structured start-up routines, and root-cause corrective action.</p>
          </div>
        </div>
        <div class="pp-result">
          <div class="pp-result-num">56%</div>
          <div>
            <div class="pp-result-label">Indirect Time Reduction</div>
            <p class="pp-result-body">Manufacturing operators saw indirect time charged drop by more than half as work cells reorganized around a clearer schedule.</p>
          </div>
        </div>
        <div class="pp-result">
          <div class="pp-result-num">22%</div>
          <div>
            <div class="pp-result-label">Stock Room Output Gain</div>
            <p class="pp-result-body">Root-cause focus on lost-time drivers improved stock room throughput without adding headcount.</p>
          </div>
        </div>
        <div class="pp-result">
          <div class="pp-result-num">20%</div>
          <div>
            <div class="pp-result-label">Scheduling Accuracy Gain</div>
            <p class="pp-result-body">Time studies and feedback loops between production management and engineering improved schedule accuracy in cable and wire.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pp-foot">
      <span class="pp-foot-brand">POWERS</span>
      <span class="pp-foot-sep">|</span>
      <span>+1 678-971-4711</span>
      <span class="pp-foot-sep">|</span>
      <span>info@thepowerscompany.com</span>
      <span class="pp-foot-sep">|</span>
      <span>1801 Peachtree St NE, Suite 200</span>
      <span class="pp-foot-sep">|</span>
      <span>Atlanta, GA 30309</span>
      <span class="pp-foot-page" style="margin-left:auto">2 / 2</span>
    </div>
  </div>

</div>



<!-- SHARED HEADER + FOOTER -->








<!-- ── TWEAKS ── -->
<style>
  section[data-row].is-centered .cs-section-inner { text-align: center; }
  section[data-row].is-centered .cs-h2 { margin-left: auto; margin-right: auto; }
  section[data-row].is-centered .cs-body { margin-left: auto; margin-right: auto; max-width: 76ch; }
  section[data-row].is-centered .cs-body p { text-wrap: balance; }
  section[data-row].is-centered .cs-diag-grid,
  section[data-row].is-centered .cs-results-grid { text-align: left; }

  /* ── Phone-portrait overrides (≤540px) ──
     Auto-center section eyebrows + H2s and decorative rules,
     restructure stat blocks to icon-on-top, center diagnosis card titles.
     Body copy stays left-aligned for readability. */
  @media (max-width: 540px) {
    /* 1. Section eyebrows + H2s — auto-center regardless of toggle */
    section[data-row] .cs-eyebrow-dark,
    section[data-row] .cs-h2 {
      text-align: center;
    }
    section[data-row] .cs-h2 {
      margin-left: auto;
      margin-right: auto;
    }

    /* 2. Decorative gold rules — center on phone */
    .cs-rule {
      margin-left: auto;
      margin-right: auto;
    }

    /* 3. Diagnosis cards — center the bold title, body stays left */
    .cs-diag-title {
      text-align: center;
    }
    .cs-diag-num {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    /* 3b. Body copy stays left-aligned even when section is .is-centered
       (override the Tweaks toggle on phone — body always reads left) */
    section[data-row].is-centered .cs-section-inner { text-align: left; }
    section[data-row].is-centered .cs-eyebrow-dark,
    section[data-row].is-centered .cs-h2 { text-align: center; }
    section[data-row].is-centered .cs-body { text-align: left; }
    section[data-row].is-centered .cs-body p { text-wrap: pretty; }

    /* 4. Full Result stat blocks — restructure to centered icon-on-top stack
       (mirrors hero stats treatment we just did) */
    .cs-result {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .cs-result-icon {
      margin: 0 0 12px 0;
    }
    .cs-result-num,
    .cs-result-label {
      text-align: center;
    }
    .cs-result-body {
      text-align: left;
      max-width: 32ch;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
<div id="tweaks-root"></div>



<!-- Set print filename hint via document title swap on print -->`;

const SCRIPT = `;(function(){
(function() {
  const originalTitle = document.title;
  const printTitle = 'POWERS-Case-Study-Defense-Aerospace-OTD';
  window.addEventListener('beforeprint', () => { document.title = printTitle; });
  window.addEventListener('afterprint', () => { document.title = originalTitle; });
})();

})();`;

export default function CaseStudyDefenseAerospaceOTD() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`On-Time Performance From 56% to 89% — POWERS Case Study`}
      metaDescription={`A make-to-order defense manufacturer lifted on-time performance from 56% to 89% by installing a unified production schedule, capacity model, and frontline leadership routines.`}
    />
  );
}
