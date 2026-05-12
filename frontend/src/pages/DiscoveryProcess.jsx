import React from 'react';
import LegacyPage from '../components/LegacyPage';

const CSS = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      font-family: 'proxima-nova','Proxima Nova',-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;
      background: #ffffff;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    body { padding-top: 84px; }
    .nav-desktop { display: flex !important; }
    .nav-mobile  { display: none !important; }
    .nav-tagline { display: inline !important; }
    @media (max-width: 767px) {
      .nav-desktop { display: none !important; }
      .nav-mobile  { display: flex !important; }
      .nav-tagline { display: none !important; }
    }

    /* ── Typography QC — global per CLAUDE.md ── */
    h1, h2, h3, .pw-eyebrow { text-wrap: balance; }
    .pw-body p, .pw-body li { text-wrap: pretty; }
    @media (max-width: 767px) { .hero-headline br { display: none; } }

    /* ── Section scaffolding ── */
    .pw-section-outer { width: 100%; }
    .pw-section-inner { max-width: 1280px; margin: 0 auto; padding: 120px 48px; }
    .pw-section-inner.tight { padding: 80px 48px; }
    .pw-col-720 { max-width: 720px; margin: 0 auto; }
    .pw-col-1100 { max-width: 1100px; margin: 0 auto; }
    .pw-col-1200 { max-width: 1200px; margin: 0 auto; }
    .pw-col-960 { max-width: 960px; margin: 0 auto; }
    .pw-col-640 { max-width: 640px; margin: 0 auto; }
    .pw-col-600 { max-width: 600px; margin: 0 auto; }

    /* ── Type ── */
    .pw-eyebrow {
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #eabb71;
      font-family: inherit; margin-bottom: 24px;
    }
    .pw-h1 { font-size: clamp(36px, 4.2vw, 56px); font-weight: 800; line-height: 1.08; color: #ffffff; letter-spacing: -0.01em; font-family: inherit; }
    .pw-subhead-hero {
      font-size: clamp(16px, 1.4vw, 20px); font-weight: 300;
      line-height: 1.5; color: rgba(255,255,255,0.90);
      font-family: inherit; max-width: 60ch; margin-top: 28px;
    }
    .pw-h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; line-height: 1.1; color: #183a61; letter-spacing: -0.005em; font-family: inherit; }
    .pw-h2-on-tint { color: #183a61; }
    .pw-h2-on-navy { color: #ffffff; }
    .pw-h2-strong { font-size: clamp(28px, 3.5vw, 44px); }
    .pw-h2-week {
      font-size: clamp(28px, 3vw, 36px); font-weight: 700;
      line-height: 1.1; color: #183a61;
      font-family: inherit; letter-spacing: -0.01em;
    }
    .pw-h2-25 {
      font-size: clamp(22px, 2.4vw, 28px); font-weight: 700;
      line-height: 1.2; color: #183a61;
      font-family: inherit; letter-spacing: -0.005em;
    }
    .pw-h3 {
      font-size: 22px; font-weight: 600; line-height: 1.25;
      color: #183a61; font-family: inherit;
    }
    .pw-h3-on-navy { color: #ffffff; }
    .pw-h3-sm { font-size: 20px; }
    .pw-body {
      font-size: 18px; font-weight: 300; line-height: 1.6;
      color: #3a3a38; font-family: inherit;
    }
    .pw-body p + p { margin-top: 1.1em; }
    .pw-body-md { font-size: 17px; }
    .pw-body-sm { font-size: 16px; }
    .pw-body-xs { font-size: 15px; }
    .pw-body-on-navy { color: rgba(255,255,255,0.90); }
    .pw-body-on-navy-soft { color: rgba(255,255,255,0.85); }
    .pw-subhead-italic {
      font-size: 17px; font-weight: 400; font-style: italic;
      color: #4a6a8a; font-family: inherit; line-height: 1.4;
      margin-top: 12px;
    }

    /* ── Rules ── */
    .pw-rule-gold-80 { width: 80px; height: 1px; background: #eabb71; border: 0; }
    .pw-rule-gold-full { width: 100%; height: 1px; background: #eabb71; border: 0; }

    /* ── Multi-site aside microcopy ── */
    .pw-aside-microcopy {
      font-size: 14px; font-weight: 300; font-style: italic;
      color: #3a3a38; font-family: inherit; line-height: 1.6;
      text-align: center; margin-top: 32px;
    }
    .pw-aside-microcopy a {
      color: #2b5070; text-decoration: none; font-weight: 500;
      font-style: normal;
    }
    .pw-aside-microcopy a:hover { color: #183a61; text-decoration: underline; }

    /* ── Section 3 — three-column opportunity grid ── */
    .pw-opp-grid {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 32px; margin-top: 56px;
    }
    .pw-opp-col {
      background: #ffffff;
      border: 1px solid #e8e8e4;
      padding: 32px;
      display: flex; flex-direction: column; gap: 18px;
    }
    .pw-opp-numeral {
      font-size: 24px; font-weight: 200;
      color: #eabb71; font-family: inherit;
      line-height: 1.0; letter-spacing: -0.02em;
    }
    .pw-opp-h3 {
      font-size: 22px; font-weight: 600;
      color: #183a61; font-family: inherit;
      line-height: 1.25;
    }
    .pw-opp-list {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 10px;
    }
    .pw-opp-list li {
      font-size: 15px; font-weight: 300; line-height: 1.5;
      color: #3a3a38; font-family: inherit;
      border-left: 1px solid #eabb71;
      padding-left: 12px;
    }

    /* ── Consequences callout ── */
    .pw-consequences {
      max-width: 640px; margin: 56px auto 0;
      background: #f0f4f8;
      border: 1px solid #a8c0d6;
      padding: 32px;
      text-align: center;
    }
    .pw-consequences-caption {
      font-size: 13px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #3a3a38;
      font-family: inherit; margin-bottom: 16px;
    }
    .pw-consequences-body {
      font-size: 17px; font-weight: 400; line-height: 1.5;
      color: #183a61; font-family: inherit;
    }

    /* ── Section 4/5 — Week split ── */
    .pw-week-grid {
      display: grid;
      grid-template-columns: 45fr 55fr;
      gap: 80px;
      align-items: start;
    }
    .pw-week-eyebrow {
      font-size: 14px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #eabb71;
      font-family: inherit; margin-bottom: 20px;
    }
    .pw-week-output {
      margin-top: 32px;
      background: #f0f4f8;
      border-left: 1px solid #eabb71;
      padding: 24px;
    }
    .pw-week-output.on-tint {
      background: #ffffff;
    }
    .pw-week-output-caption {
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #eabb71;
      font-family: inherit; margin-bottom: 14px;
    }
    .pw-week-output-line {
      font-size: 15px; font-weight: 500; line-height: 1.45;
      color: #183a61; font-family: inherit;
      padding: 6px 0;
    }
    .pw-week-output-line + .pw-week-output-line {
      border-top: 1px solid rgba(168,192,214,0.35);
    }
    .pw-thread-tie {
      font-size: 14px; font-weight: 300; font-style: italic;
      color: #3a3a38; font-family: inherit; line-height: 1.6;
      margin-top: 24px;
    }

    /* ── Section 6 — five deliverables list ── */
    .pw-deliv-list {
      max-width: 960px; margin: 56px auto 0;
      border-top: 1px solid #e8e8e4;
    }
    .pw-deliv-row {
      display: grid; grid-template-columns: 80px 1fr;
      gap: 32px; padding: 28px 0;
      border-bottom: 1px solid #e8e8e4;
      align-items: start;
    }
    .pw-deliv-numeral {
      font-size: 64px; font-weight: 200; line-height: 1.0;
      color: #eabb71; font-family: inherit; letter-spacing: -0.02em;
    }
    .pw-deliv-h3 {
      font-size: 20px; font-weight: 600; line-height: 1.25;
      color: #183a61; font-family: inherit;
      margin-bottom: 10px;
    }
    .pw-deliv-body {
      font-size: 16px; font-weight: 300; line-height: 1.6;
      color: #3a3a38; font-family: inherit;
    }

    /* ── Section 7 — three-stat row ── */
    .pw-stats-row {
      display: grid; grid-template-columns: repeat(3, 1fr);
      max-width: 600px; margin: 56px auto 0;
    }
    .pw-stat {
      text-align: center; padding: 0 16px;
    }
    .pw-stat + .pw-stat { border-left: 1px solid #eabb71; }
    .pw-stat-num {
      font-size: 28px; font-weight: 700; line-height: 1.0;
      color: #ffffff; font-family: inherit; letter-spacing: -0.01em;
      margin-bottom: 10px;
    }
    .pw-stat-cap {
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: rgba(232,232,228,0.85);
      font-family: inherit; line-height: 1.4;
    }
    .pw-stats-footer {
      font-size: 13px; font-weight: 300; font-style: italic;
      color: rgba(255,255,255,0.70); font-family: inherit;
      text-align: center; margin-top: 24px;
    }

    /* ── Section 8 — phases two and three split ── */
    .pw-phases-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 56px; margin-top: 56px;
    }
    .pw-phase-col {
      display: flex; flex-direction: column; gap: 14px;
    }
    .pw-phase-eyebrow {
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #eabb71;
      font-family: inherit;
    }
    .pw-phase-h3 {
      font-size: 22px; font-weight: 600; line-height: 1.2;
      color: #183a61; font-family: inherit;
    }
    .pw-phase-body {
      font-size: 16px; font-weight: 300; line-height: 1.6;
      color: #3a3a38; font-family: inherit;
    }
    .pw-phase-list {
      list-style: none; padding: 0; margin: 16px 0 0;
      display: flex; flex-direction: column; gap: 8px;
    }
    .pw-phase-list li {
      font-size: 15px; font-weight: 400; line-height: 1.45;
      color: #3a3a38; font-family: inherit;
      border-left: 1px solid #eabb71;
      padding-left: 12px;
    }
    .pw-phases-footer {
      max-width: 720px; margin: 56px auto 0;
      text-align: center;
      font-size: 16px; font-weight: 300; line-height: 1.6;
      color: #3a3a38; font-family: inherit;
    }
    .pw-phases-footer-links {
      margin-top: 18px;
      display: inline-flex; align-items: center; gap: 20px;
      font-size: 14px; font-weight: 500;
    }
    .pw-phases-footer-links a {
      color: #2b5070; text-decoration: none; font-family: inherit;
      transition: color 150ms ease;
    }
    .pw-phases-footer-links a:hover { color: #183a61; }
    .pw-phases-footer-divider {
      display: inline-block; width: 1px; height: 14px;
      background: #c4c4be;
    }

    /* ── Read-on caption ── */
    .pw-readon {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #888884;
      font-family: inherit; margin-top: 28px;
    }
    .pw-readon-chevron { color: #eabb71; }

    /* ── CTA button (Section 9) ── */
    .pw-cta-btn {
      display: inline-block;
      background: #0d2442; color: #ffffff;
      border: 1px solid #eabb71;
      padding: 16px 32px;
      font-size: 14px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      text-decoration: none; font-family: inherit;
      transition: background 200ms ease, color 200ms ease;
      white-space: nowrap;
    }
    .pw-cta-btn:hover { background: #eabb71; color: #0d2442; }

    /* ── Contact block ── */
    .pw-contact-block {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      margin-top: 32px;
    }
    .pw-contact-phone {
      color: #ffffff; font-size: 22px; font-weight: 500;
      text-decoration: none; font-family: inherit; letter-spacing: 0.01em;
    }
    .pw-contact-email {
      color: #eabb71; font-size: 18px; font-weight: 400;
      text-decoration: none; font-family: inherit;
    }
    .pw-contact-email:hover { text-decoration: underline; }

    /* ── Mobile ── */
    @media (max-width: 1023px) {
      .pw-opp-grid { grid-template-columns: 1fr; gap: 16px; }
      .pw-week-grid { grid-template-columns: 1fr; gap: 32px; }
      .pw-phases-grid { grid-template-columns: 1fr; gap: 40px; }
    }
    @media (max-width: 767px) {
      .pw-section-inner { padding: 80px 24px; }
      .pw-section-inner.tight { padding: 60px 24px; }
      .pw-body { font-size: 16px; }
      .pw-deliv-row { grid-template-columns: 1fr; gap: 8px; padding: 24px 0; }
      .pw-deliv-numeral { font-size: 44px; }
      .pw-stats-row { grid-template-columns: 1fr; max-width: 360px; gap: 0; }
      .pw-stat { padding: 18px 0; }
      .pw-stat + .pw-stat { border-left: 0; border-top: 1px solid #eabb71; }
      .pw-contact-phone { font-size: 18px; }
      .pw-contact-email { font-size: 16px; }
    }`;

const HTML = `<!-- ============================================================ -->
<!-- SECTION 1 — HERO                                              -->
<!-- ============================================================ -->
<section data-screen-label="01 Hero" class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner" style="min-height:600px;display:flex;flex-direction:column;justify-content:center;padding-top:120px;padding-bottom:120px;">
    <div class="pw-eyebrow">Discovery Process</div>
    <h1 class="pw-h1 hero-headline">The Roadmap to Value Creation, Built in Two Weeks</h1>
    <p class="pw-subhead-hero">Discovery is a paid, two-week assessment. Five deliverables. A line-item P&amp;L savings model. A results-based ROI commitment. Everything you need to decide whether to move forward, with the financial substance to take to your board.</p>
    <hr class="pw-rule-gold-80" style="margin-top:64px;" />
    <div class="pw-readon">
      Read on
      <svg class="pw-readon-chevron" width="11" height="6" viewBox="0 0 11 6" fill="none" aria-hidden="true">
        <path d="M1 1L5.5 5L10 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 2 — WHAT DISCOVERY IS                                 -->
<!-- ============================================================ -->
<section data-screen-label="02 The Starting Point" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-720">
      <div class="pw-eyebrow">The Starting Point</div>
      <h2 class="pw-h2">A Defined Commercial Engagement. Not a Sales Call.</h2>
      <div class="pw-body" style="margin-top:32px;">
        <p>Most operational consulting firms offer a free assessment to win the work. POWERS does not. Discovery is the work. It is a paid two-week engagement with senior practitioners on the floor of your operation, conducting comprehensive studies across processes, systems and tools, and people and behaviors.</p>
        <p>The deliverable is not a recommendation. It is a quantified roadmap with five named outputs and a results-based savings commitment that POWERS will stand behind during implementation. Most clients are surprised by the magnitude of opportunity Discovery uncovers. Many are surprised that the magnitude is detailed by line item on their own P&amp;L.</p>
        <p>If after Discovery you decide not to move forward, you keep the assessment, the studies, the custom Management Operating System design, and the savings model. The relationship is structured so the value is delivered before the implementation decision is made.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 2.5 — MULTI-SITE ASIDE                                -->
<!-- ============================================================ -->
<section data-screen-label="02.5 Multi-site Discovery" class="pw-section-outer" style="background:#f0f4f8;">
  <div class="pw-section-inner tight">
    <div class="pw-col-720">
      <div class="pw-eyebrow">When the Scope is Larger</div>
      <h2 class="pw-h2 pw-h2-25">Multi-Site Discovery. Four to Eight Weeks. Same Architecture, Larger Scope.</h2>
      <div class="pw-body pw-body-md" style="margin-top:28px;">
        <p>A two-week Discovery is the right scope for a single-site operation. For multi-site enterprises, PE-backed portfolios, and operations spanning multiple sites or regions, the assessment needs the time to do justice to the operating realities at each site and the architecture that has to work across all of them.</p>
        <p>Multi-site Discovery runs four to eight weeks, scaled to the number of sites in scope, the operational complexity, and the depth of the assessment your team needs to take to the board. Senior POWERS practitioners deploy across the operation in a coordinated sequence, conducting the same studies, building the same five named deliverables, and standing behind the same Project Savings Commitment that governs a standard Discovery.</p>
        <p>What changes is scope, not method. What scales is duration, practitioner deployment, and the size of the financial opportunity surfaced. What does not change is the commercial structure: paid engagement, results-based ROI, skin in the game.</p>
      </div>
      <p class="pw-aside-microcopy">If your operation runs across more than one site, the conversation about scope starts before Discovery does. <a href="contact.html">Start it on the contact page <span aria-hidden="true">&rarr;</span></a></p>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 3 — THREE OPPORTUNITY AREAS                           -->
<!-- ============================================================ -->
<section data-screen-label="03 What We Study" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-720" style="text-align:center;">
      <div class="pw-eyebrow">What We Study</div>
      <h2 class="pw-h2 pw-h2-on-tint">Opportunities Present Themselves in Three Areas.</h2>
      <div class="pw-body pw-body-md" style="margin-top:28px;">
        <p>Discovery uses proven methods to perform comprehensive studies in three areas. The studies often surface chronic operating issues that have become ingrained in how the operation runs but have never been quantified, never connected to a financial cost, and never built into a roadmap for resolution.</p>
      </div>
    </div>

    <div class="pw-col-1100">
      <div class="pw-opp-grid">

        <div class="pw-opp-col">
          <div class="pw-opp-numeral">01</div>
          <h3 class="pw-opp-h3">Processes.</h3>
          <ul class="pw-opp-list">
            <li>Bottlenecks</li>
            <li>Redundancies</li>
            <li>System integration issues</li>
            <li>Organization structure</li>
            <li>Process complexities</li>
            <li>Scheduling and planning</li>
            <li>Inventory control</li>
          </ul>
        </div>

        <div class="pw-opp-col">
          <div class="pw-opp-numeral">02</div>
          <h3 class="pw-opp-h3">Systems and tools.</h3>
          <ul class="pw-opp-list">
            <li>What systems and tools exist</li>
            <li>Whether they are being utilized</li>
            <li>Level of understanding across the team</li>
            <li>Key Performance Indicators and standards</li>
            <li>Whether the KPIs and standards are correct</li>
          </ul>
        </div>

        <div class="pw-opp-col">
          <div class="pw-opp-numeral">03</div>
          <h3 class="pw-opp-h3">People and behaviors.</h3>
          <ul class="pw-opp-list">
            <li>Process discipline gaps</li>
            <li>Human errors and rework</li>
            <li>Performance variation between employees</li>
            <li>Allocation of work and resources</li>
            <li>Frontline supervisor and middle management capability</li>
            <li>Labor coverage and capacity</li>
          </ul>
        </div>

      </div>

      <div class="pw-consequences">
        <div class="pw-consequences-caption">The Cost of Leaving This Unresolved</div>
        <p class="pw-consequences-body">Lost performance and productivity. Lagging production. Faulty product, poor service. Lost revenue, squandered resources. Increased cost, inefficient distribution of work. Compliance and security risk. Customer attrition.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 4 — WEEK ONE                                          -->
<!-- ============================================================ -->
<section data-screen-label="04 Week One" class="pw-section-outer" style="background:#ffffff;border-top:1px solid #e8e8e4;">
  <div class="pw-section-inner">
    <div class="pw-col-1100">
      <div class="pw-week-grid">

        <div>
          <div class="pw-week-eyebrow">Week One</div>
          <h2 class="pw-h2-week">Discovery Assessment.</h2>
          <p class="pw-subhead-italic">Establishing the current state.</p>
        </div>

        <div>
          <div class="pw-body pw-body-md">
            <p>Senior POWERS practitioners deploy to your site for the first week and conduct comprehensive studies across operations and the support functions that surround them. Process flows are mapped. Operating data is analyzed. Inventory, labor utilization, equipment utilization, and the management cadence are all observed under live conditions, on every shift the operation runs.</p>
            <p>The findings are documented in a workbook that becomes the foundation for the second week. By the end of week one, your team will have an honest, quantified read on the operational gaps the studies surface, with the magnitude of the cost detailed by line item on your P&amp;L.</p>
          </div>

          <div class="pw-week-output">
            <div class="pw-week-output-caption">Week One Output</div>
            <div class="pw-week-output-line">Comprehensive operational studies, with formal and informal observations</div>
            <div class="pw-week-output-line">Magnitude of savings, detailed line-by-line on the P&amp;L</div>
            <div class="pw-week-output-line">Results-based ROI and cash flow commitments</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 5 — WEEK TWO                                          -->
<!-- ============================================================ -->
<section data-screen-label="05 Week Two" class="pw-section-outer" style="background:#f0f4f8;">
  <div class="pw-section-inner">
    <div class="pw-col-1100">
      <div class="pw-week-grid">

        <div>
          <div class="pw-week-eyebrow">Week Two</div>
          <h2 class="pw-h2-week">Roadmap and Approach.</h2>
          <p class="pw-subhead-italic">From current state to desired future state.</p>
        </div>

        <div>
          <div class="pw-body pw-body-md">
            <p>Week two is where the assessment becomes a plan. POWERS lays out the facts and connects the dots with your team to validate what the studies surfaced. From there, we set a course of action to bridge gaps, eliminate root causes, and build the roadmap from current state to the desired future state.</p>
            <p>Your business is unique. The roadmap is custom-built to fit your operation while maintaining the values and core beliefs that drive your organization. The output is not a templated playbook. It is a specific, sequenced plan for your site, with the financial commitment behind it.</p>
          </div>

          <div class="pw-week-output on-tint">
            <div class="pw-week-output-caption">Week Two Output</div>
            <div class="pw-week-output-line">Validated findings, presented to senior leadership</div>
            <div class="pw-week-output-line">Custom roadmap to the desired future state</div>
            <div class="pw-week-output-line">Approach, sequencing, and the case for moving forward</div>
          </div>

          <p class="pw-thread-tie">Multi-site Discovery extends this rhythm across the operation. Scope and duration are scaled to the assessment needed.</p>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 6 — FIVE DELIVERABLES                                 -->
<!-- ============================================================ -->
<section data-screen-label="06 Five Deliverables" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-720" style="text-align:center;">
      <div class="pw-eyebrow">What You Receive</div>
      <h2 class="pw-h2">Five Deliverables. One Financial Commitment.</h2>
      <div class="pw-body pw-body-md" style="margin-top:28px;">
        <p>Discovery ends with five named deliverables in your hands. They are the basis on which your team decides whether to move into Implementation, and the commercial framework that governs the engagement if you do.</p>
      </div>
    </div>

    <div class="pw-deliv-list">

      <div class="pw-deliv-row">
        <div class="pw-deliv-numeral">01</div>
        <div>
          <h3 class="pw-deliv-h3">Operations Studies.</h3>
          <p class="pw-deliv-body">A complete report including the studies our practitioners conducted on the floor, plus the informal observations of operational problems, opportunities, and best practices exhibited across operations and support activities. The studies become source material for the senior leadership presentation at the end of Discovery.</p>
        </div>
      </div>

      <div class="pw-deliv-row">
        <div class="pw-deliv-numeral">02</div>
        <div>
          <h3 class="pw-deliv-h3">Custom Management Operating System Design.</h3>
          <p class="pw-deliv-body">Not a template. A specific operating architecture designed for your site, defining the processes, the cadence, the meeting rhythm, the visual management, and the accountability structures that produce the right output, at the right time, at the right cost. The design accounts for your products, your people, and the conditions your operation actually runs under.</p>
        </div>
      </div>

      <div class="pw-deliv-row">
        <div class="pw-deliv-numeral">03</div>
        <div>
          <h3 class="pw-deliv-h3">Operational Cost Profile at Full Capacity Potential.</h3>
          <p class="pw-deliv-body">Based on the observed and measured behavioral and performance gaps directly correlated to the current operating system, structure, skills, and operating environment, we identify the achievable performance levels and cost profiles your site could be operating at if the architecture above were in place.</p>
        </div>
      </div>

      <div class="pw-deliv-row">
        <div class="pw-deliv-numeral">04</div>
        <div>
          <h3 class="pw-deliv-h3">Project Savings Commitment.</h3>
          <p class="pw-deliv-body">The difference between your current cost baseline and the operational cost profile at full capacity potential is the Project Savings Commitment that POWERS makes to your organization. This is not a projection. It is a commercial commitment that governs how POWERS gets compensated during Implementation.</p>
        </div>
      </div>

      <div class="pw-deliv-row">
        <div class="pw-deliv-numeral">05</div>
        <div>
          <h3 class="pw-deliv-h3">Project Cost Proposal.</h3>
          <p class="pw-deliv-body">Based on the Key Event Schedule, the staffing and shift structure of your site, and the sequenced roadmap, we identify the number of weeks and the number of senior practitioners required to fully implement the custom Management Operating System. The cost proposal is built against the savings commitment, not against billable hours.</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 7 — COMMERCIAL STRUCTURE                              -->
<!-- ============================================================ -->
<section data-screen-label="07 Skin in the Game" class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner">
    <div class="pw-col-720" style="text-align:center;">
      <div class="pw-eyebrow">Skin in the Game</div>
      <h2 class="pw-h2 pw-h2-on-navy pw-h2-strong">We Get Paid for Results, Not for Time.</h2>
      <div class="pw-body pw-body-on-navy" style="margin-top:28px;text-align:left;">
        <p>The Project Savings Commitment is the foundation of the commercial relationship that follows Discovery. POWERS earns its fee against the savings delivered, tracked weekly and reconciled against the model your team agreed to at the close of week two. If we miss the commitment, the commercial structure absorbs that. The risk is not transferred back to your organization.</p>
        <p>This is not how most consulting firms structure their work. We do it this way because we have done it more than 250 times across the manufacturing sectors that matter, and the structure is what allows our practitioners to do the job the way it actually needs to be done. On the floor. Under live conditions. For as long as the architecture takes to build.</p>
      </div>

      <div class="pw-stats-row">
        <div class="pw-stat">
          <div class="pw-stat-num">250+</div>
          <div class="pw-stat-cap">Projects delivered</div>
        </div>
        <div class="pw-stat">
          <div class="pw-stat-num">100%</div>
          <div class="pw-stat-cap">Measurable returns</div>
        </div>
        <div class="pw-stat">
          <div class="pw-stat-num">3</div>
          <div class="pw-stat-cap">Compensation milestones tracked weekly</div>
        </div>
      </div>
      <p class="pw-stats-footer">Annualized savings rate ROI. Weekly cash flow. Total project cost.</p>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 8 — PHASES TWO AND THREE                              -->
<!-- ============================================================ -->
<section data-screen-label="08 What Follows Discovery" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-1100">
      <div style="text-align:center;">
        <div class="pw-eyebrow">Phases Two and Three</div>
        <h2 class="pw-h2">Discovery Is the Decision Point. What Follows Is the Engagement.</h2>
      </div>

      <div class="pw-phases-grid">

        <div class="pw-phase-col">
          <div class="pw-phase-eyebrow">Phase 2</div>
          <h3 class="pw-phase-h3">Implementation.</h3>
          <p class="pw-phase-body">If your team approves the Discovery findings and the Project Savings Commitment, Implementation begins. POWERS practitioners deploy to your site for the duration defined by the Key Event Schedule. We work shoulder to shoulder with your frontline leaders, on every shift, under live operating conditions, until the custom Management Operating System is built, the leadership behaviors are reinforced, and the financial performance is tracking against the commitment.</p>
          <ul class="pw-phase-list">
            <li>A defined Key Event Schedule</li>
            <li>A specified scope of engagement</li>
            <li>A weekly financial performance tracking methodology</li>
            <li>A defined partnership duration</li>
          </ul>
        </div>

        <div class="pw-phase-col">
          <div class="pw-phase-eyebrow">Phase 3</div>
          <h3 class="pw-phase-h3">Evaluate ROI &amp; Savings.</h3>
          <p class="pw-phase-body">The success of the engagement is measured against your numbers, on your P&amp;L, using the savings model your team validated at the end of Discovery. Not against fuzzy outcomes, not against activity, not against billable hours. POWERS provides a detailed analysis of the actual ROI and savings achieved, on the cadence agreed at engagement start.</p>
          <ul class="pw-phase-list">
            <li>Annualized savings rate ROI</li>
            <li>Weekly cash flow against the model</li>
            <li>Total project cost reconciled against savings delivered</li>
            <li>Final report on results achieved against commitment</li>
          </ul>
        </div>

      </div>

      <div class="pw-phases-footer">
        <p>The architecture and the durability that follows are described on the Approach page. The case studies on the Results page are the evidence.</p>
        <div class="pw-phases-footer-links">
          <a href="approach.html">See the Approach <span aria-hidden="true">&rarr;</span></a>
          <span class="pw-phases-footer-divider" aria-hidden="true"></span>
          <a href="case-studies.html">See the Results <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 9 — CTA                                               -->
<!-- ============================================================ -->
<section data-screen-label="09 CTA" class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner">
    <div class="pw-col-720" style="text-align:center;">
      <div class="pw-eyebrow">When You're Ready</div>
      <h2 class="pw-h2 pw-h2-on-navy pw-h2-strong">A Defined Process. A Roadmap That Pays for Itself.</h2>
      <p class="pw-body pw-body-on-navy-soft pw-col-600" style="margin-top:24px;">The conversation that leads to Discovery is shorter than Discovery itself. If your operation has reached the point where the gaps are familiar but the cost has never been quantified, the next step is a call to talk through what Discovery would surface in your specific situation.</p>

      <hr class="pw-rule-gold-80" style="margin:48px auto 0;" />

      <div class="pw-contact-block">
        <a href="tel:+16789714711" class="pw-contact-phone">+1 678-971-4711</a>
        <a href="mailto:info@thepowerscompany.com" class="pw-contact-email">info@thepowerscompany.com</a>
        <a href="contact.html" class="pw-cta-btn" style="margin-top:20px;">Start the conversation <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </div>
</section>`;

const SCRIPT = ``;

export default function DiscoveryProcess() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Discovery Process | POWERS. Two-Week Manufacturing Operations Assessment. v0.3.0`}
      metaDescription={`POWERS Discovery is a paid two-week assessment of manufacturing operations, delivering five named outputs, a custom Management Operating System design, and a results-based Project Savings Commitment.`}
    />
  );
}
