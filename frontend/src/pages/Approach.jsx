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

    /* ── Type ── */
    .pw-eyebrow {
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #eabb71;
      font-family: inherit; margin-bottom: 24px;
    }
    .pw-eyebrow-light { color: #eabb71; }
    .pw-h1 { font-size: clamp(36px, 4.2vw, 56px); font-weight: 800; line-height: 1.08; color: #ffffff; letter-spacing: -0.01em; font-family: inherit; }
    .pw-subhead-hero {
      font-size: clamp(17px, 1.5vw, 22px); font-weight: 300;
      line-height: 1.5; color: rgba(255,255,255,0.90);
      font-family: inherit; max-width: 60ch; margin-top: 28px;
    }
    .pw-h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; line-height: 1.1; color: #183a61; letter-spacing: -0.005em; font-family: inherit; }
    .pw-h2-on-tint { color: #183a61; }
    .pw-h2-on-navy { color: #ffffff; }
    .pw-h2-strong { font-size: clamp(28px, 3.5vw, 44px); }
    .pw-h3 {
      font-size: 22px; font-weight: 600; line-height: 1.25;
      color: #183a61; font-family: inherit;
    }
    .pw-h3-on-navy { color: #ffffff; }
    .pw-h3-sm { font-size: 18px; }
    .pw-h3-md { font-size: 20px; }
    .pw-body {
      font-size: 18px; font-weight: 300; line-height: 1.6;
      color: #3a3a38; font-family: inherit;
    }
    .pw-body p + p { margin-top: 1.1em; }
    .pw-body-sm { font-size: 16px; }
    .pw-body-xs { font-size: 15px; }
    .pw-body-on-navy { color: rgba(255,255,255,0.90); }
    .pw-body-on-navy-soft { color: rgba(255,255,255,0.85); }
    .pw-caption-italic {
      font-size: 13px; font-weight: 300; font-style: italic;
      color: #888884; line-height: 1.5; font-family: inherit;
    }
    .pw-caption-on-navy { color: rgba(255,255,255,0.70); }

    /* ── Rules and dividers ── */
    .pw-rule-gold-80 { width: 80px; height: 1px; background: #eabb71; border: 0; }

    /* ── Read-on caption ── */
    .pw-readon {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #888884;
      font-family: inherit; margin-top: 28px;
    }
    .pw-readon-chevron { color: #eabb71; }

    /* ── In-line CTA link ── */
    .pw-inline-cta {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 17px; font-weight: 500;
      color: #ffffff; text-decoration: none;
      font-family: inherit; transition: color 150ms ease;
    }
    .pw-inline-cta:hover { color: #eabb71; }
    .pw-inline-cta .pw-arrow { transition: transform 200ms ease; }
    .pw-inline-cta:hover .pw-arrow { transform: translateX(4px); }

    /* ── Centered link below cards ── */
    .pw-centered-link {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 16px; font-weight: 500;
      color: #2b5070; text-decoration: none;
      font-family: inherit; transition: color 150ms ease;
    }
    .pw-centered-link:hover { color: #183a61; }
    .pw-centered-link .pw-arrow { transition: transform 200ms ease; }
    .pw-centered-link:hover .pw-arrow { transform: translateX(4px); }

    /* ── Mechanism (Section 3) discipline blocks ── */
    .pw-mech-grid {
      display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
      gap: 64px; align-items: start;
    }
    .pw-mech-block {
      display: grid; grid-template-columns: 64px 1fr; gap: 24px;
      padding: 28px 0;
      border-top: 1px solid #e8e8e4;
    }
    .pw-mech-block:last-child { border-bottom: 1px solid #e8e8e4; }
    .pw-mech-numeral {
      font-size: 48px; font-weight: 200; line-height: 1.0;
      color: #eabb71; font-family: inherit; letter-spacing: -0.02em;
    }
    .pw-mech-h3 {
      font-size: 18px; font-weight: 600; color: #183a61;
      font-family: inherit; line-height: 1.3; margin-bottom: 10px;
    }
    .pw-mech-body {
      font-size: 15px; font-weight: 300; line-height: 1.6;
      color: #3a3a38; font-family: inherit;
    }

    /* ── Performance Arc (Section 4) ── */
    .pw-arc {
      position: relative;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 16px;
      margin-top: 64px;
      padding: 24px 0 0 0;
    }
    .pw-arc::before {
      content: '';
      position: absolute;
      top: 38px; left: 8%; right: 8%; height: 1px;
      background: #eabb71;
      z-index: 0;
    }
    .pw-arc-card {
      position: relative;
      background: #ffffff;
      border: 1px solid #e8e8e4;
      padding: 36px 20px 22px;
      display: flex; flex-direction: column; gap: 6px;
      z-index: 1;
    }
    .pw-arc-dot {
      position: absolute;
      top: -6px; left: 50%; transform: translateX(-50%);
      width: 12px; height: 12px; border-radius: 50%;
      background: #eabb71;
      z-index: 2;
    }
    .pw-arc-stage {
      font-size: 11px; font-weight: 500; letter-spacing: 0.16em;
      text-transform: uppercase; color: #4a6a8a;
      font-family: inherit; margin-bottom: 4px;
    }
    .pw-arc-h3 {
      font-size: 16px; font-weight: 600; color: #183a61;
      font-family: inherit; line-height: 1.25;
    }
    .pw-arc-body {
      font-size: 13px; font-weight: 300; line-height: 1.5;
      color: #3a3a38; font-family: inherit; margin-top: 6px;
    }

    /* ── Expertise cards (Section 6) ── */
    .pw-expertise-grid {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px; margin-top: 56px;
    }
    .pw-expertise-card {
      background: #ffffff;
      border: 1px solid #e8e8e4;
      padding: 32px;
      display: flex; flex-direction: column; gap: 14px;
      text-decoration: none;
      transition: border-color 180ms ease;
    }
    .pw-expertise-card:hover { border-color: #eabb71; }
    .pw-expertise-card .pw-h3 { transition: color 180ms ease; }
    .pw-expertise-card:hover .pw-h3 { color: #2b5070; }
    .pw-expertise-eyebrow {
      font-size: 12px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #eabb71; font-family: inherit;
    }
    .pw-expertise-body {
      font-size: 15px; font-weight: 300; line-height: 1.6;
      color: #3a3a38; font-family: inherit;
    }
    .pw-expertise-link {
      font-size: 14px; font-weight: 500;
      color: #2b5070; font-family: inherit;
      margin-top: auto; padding-top: 8px;
      display: inline-flex; align-items: center; gap: 6px;
    }

    /* ── Case study cards (Section 8) ── */
    .pw-case-grid {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px; margin-top: 56px;
    }
    .pw-case-card {
      background: #ffffff;
      border: 1px solid #e8e8e4;
      display: flex; flex-direction: column;
      text-decoration: none;
      transition: border-color 180ms ease;
    }
    .pw-case-card:hover { border-color: #eabb71; }
    .pw-case-img {
      aspect-ratio: 16 / 9;
      background: #f0f4f8 repeating-linear-gradient(135deg, rgba(24,58,97,0.04) 0 12px, transparent 12px 24px);
      display: flex; align-items: center; justify-content: center;
    }
    .pw-case-img-label {
      font-family: 'SF Mono', Menlo, Consolas, monospace;
      font-size: 10px; letter-spacing: 0.14em;
      text-transform: uppercase; color: rgba(24,58,97,0.55);
      padding: 0 16px; text-align: center;
    }
    .pw-case-text { padding: 28px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
    .pw-case-eyebrow {
      font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: #eabb71; font-family: inherit;
    }
    .pw-case-headline {
      font-size: 26px; font-weight: 700; line-height: 1.15;
      color: #183a61; font-family: inherit; letter-spacing: -0.01em;
    }
    .pw-case-desc {
      font-size: 14px; font-weight: 300; line-height: 1.5;
      color: #3a3a38; font-family: inherit;
    }
    .pw-case-link {
      font-size: 13px; font-weight: 500;
      color: #2b5070; font-family: inherit;
      margin-top: auto; padding-top: 8px;
      display: inline-flex; align-items: center; gap: 6px;
    }

    /* ── Section 5 inline CTA block ── */
    .pw-inline-cta-block {
      display: flex; flex-direction: column; align-items: center;
      gap: 18px; margin-top: 56px;
    }

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

    /* ── Section 5 microcopy ── */
    .pw-microcopy-italic {
      font-size: 13px; font-weight: 300; font-style: italic;
      color: rgba(255,255,255,0.70); font-family: inherit;
      text-align: center; margin-top: 8px;
    }

    /* ── Mobile ── */
    @media (max-width: 1023px) {
      .pw-mech-grid { grid-template-columns: 1fr; gap: 40px; }
      .pw-arc { grid-template-columns: 1fr; gap: 16px; padding: 0 0 0 24px; }
      .pw-arc::before { top: 0; bottom: 0; left: 6px; right: auto; width: 1px; height: auto; }
      .pw-arc-card { padding: 20px 24px; }
      .pw-arc-dot { top: 50%; left: -22px; transform: translateY(-50%); }
      .pw-expertise-grid { grid-template-columns: 1fr; gap: 16px; }
      .pw-case-grid { grid-template-columns: 1fr; gap: 24px; }
    }
    @media (max-width: 767px) {
      .pw-section-inner { padding: 80px 24px; }
      .pw-section-inner.tight { padding: 60px 24px; }
      .pw-body { font-size: 16px; }
      .pw-mech-block { grid-template-columns: 1fr; gap: 8px; padding: 24px 0; }
      .pw-mech-numeral { font-size: 36px; }
      .pw-h3 { font-size: 20px; }
      .pw-case-headline { font-size: 22px; }
      .pw-contact-phone { font-size: 18px; }
      .pw-contact-email { font-size: 16px; }
    }`;

const HTML = `<!-- ============================================================ -->
<!-- SECTION 1 — HERO                                              -->
<!-- ============================================================ -->
<section data-screen-label="01 Hero" class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner" style="min-height:600px;display:flex;flex-direction:column;justify-content:center;padding-top:120px;padding-bottom:120px;">
    <div class="pw-eyebrow pw-eyebrow-light">Approach</div>
    <h1 class="pw-h1 hero-headline">Where Executive Intent Meets Shop Floor Execution</h1>
    <p class="pw-subhead-hero">We build the operating architecture that makes manufacturing performance sustainable, and scalable across shifts, sites, and the next phase of your business.</p>
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
<!-- SECTION 2 — THE GAP                                           -->
<!-- ============================================================ -->
<section data-screen-label="02 The Gap" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-720">
      <div class="pw-eyebrow">The Gap</div>
      <h2 class="pw-h2">Strategy Doesn't Fail in the Boardroom. It Fails on the Way to the Floor.</h2>
      <div class="pw-body" style="margin-top:32px;">
        <p>Every credible firm in this market can demonstrate that performance gets better when they engage. That's not differentiation anymore. It's the price of admission.</p>
        <p>The harder question, the one most engagements aren't designed to answer, is what happens after the consultant leaves. Whether the operation continues to perform when conditions change. Whether the gains transfer when leadership turns over. Whether what works at one site works at the next one.</p>
        <p>The reason most improvement does not sustain is structural. The operating architecture required to keep it in place was never fully built. Performance was achieved through external effort rather than internal design. When the external effort stops, the performance follows.</p>
        <p style="font-weight:500;color:#183a61;">We exist to close that gap.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 3 — THE MECHANISM                                     -->
<!-- ============================================================ -->
<section data-screen-label="03 The Mechanism" class="pw-section-outer" style="background:#f0f4f8;">
  <div class="pw-section-inner">
    <div class="pw-mech-grid">

      <!-- Left -->
      <div>
        <div class="pw-eyebrow">The Mechanism</div>
        <h2 class="pw-h2 pw-h2-on-tint">We Build the Operating Architecture That Makes Performance Sustainable.</h2>
        <div class="pw-body pw-body-sm" style="margin-top:24px;">
          <p>The four disciplines below are not a service menu. They are an integrated system. A management operating system without leadership behavior produces documentation, not performance. Leadership development without a defined operating architecture produces individual improvement that walks out the door when the individual does.</p>
          <p>We build all four together, on the floor, until the operation runs by design rather than by effort.</p>
        </div>
      </div>

      <!-- Right: four discipline blocks -->
      <div>
        <div class="pw-mech-block">
          <div class="pw-mech-numeral">01</div>
          <div>
            <h3 class="pw-mech-h3">Management operating system, built for your operation.</h3>
            <p class="pw-mech-body">The cadence, signals, and accountability structures that make performance visible and manageable across shifts and sites. Not a product we install. A custom system, designed for how your business actually runs, that drives long-term, sustainable improvement.</p>
          </div>
        </div>

        <div class="pw-mech-block">
          <div class="pw-mech-numeral">02</div>
          <div>
            <h3 class="pw-mech-h3">Process discipline at the point of execution.</h3>
            <p class="pw-mech-body">Standards that survive pressure. Routines that don't relax when the schedule tightens. The structural elimination of the variation that quietly erodes margin between Monday morning and Friday afternoon.</p>
          </div>
        </div>

        <div class="pw-mech-block">
          <div class="pw-mech-numeral">03</div>
          <div>
            <h3 class="pw-mech-h3">Frontline leadership behavior, reinforced daily.</h3>
            <p class="pw-mech-body">Capable supervisors on every shift, equipped with the skills, language, and standard work to lead consistently. Not a training event. A daily practice that becomes how the operation is run.</p>
          </div>
        </div>

        <div class="pw-mech-block">
          <div class="pw-mech-numeral">04</div>
          <div>
            <h3 class="pw-mech-h3">Visibility across every level of the organization.</h3>
            <p class="pw-mech-body">The same operational truth available to the floor, the plant, and the executive team. Decisions made on the same data. Drift detected before it compounds. The Digital Production System enforces the discipline rather than just reporting it.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 4 — THE PERFORMANCE ARC                               -->
<!-- ============================================================ -->
<section data-screen-label="04 Performance Arc" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-720" style="text-align:center;">
      <div class="pw-eyebrow">How Performance Evolves</div>
      <h2 class="pw-h2">Performance Does Not Move in a Straight Line. It Moves in Stages.</h2>
      <div class="pw-body" style="margin-top:32px;">
        <p>Manufacturing operations evolve through five distinct stages. Each one carries different risks. The most common failure mode in this industry is attempting to skip a stage, scaling before performance is sustainable, sustaining before performance is consistent, optimizing before the system is stable.</p>
        <p>Our work begins with an honest read of where your operation actually is, not where the strategy deck says it should be.</p>
      </div>
    </div>

    <div class="pw-col-1200">
      <div class="pw-arc">
        <div class="pw-arc-card">
          <div class="pw-arc-dot" aria-hidden="true"></div>
          <div class="pw-arc-stage">Stage I</div>
          <div class="pw-arc-h3">Underperformance</div>
          <p class="pw-arc-body">Reactive execution. Effort consumed by problems a disciplined system would prevent.</p>
        </div>
        <div class="pw-arc-card">
          <div class="pw-arc-dot" aria-hidden="true"></div>
          <div class="pw-arc-stage">Stage II</div>
          <div class="pw-arc-h3">Stability</div>
          <p class="pw-arc-body">Variability reduced. Structure introduced. Still sensitive to staffing, demand, and leadership coverage.</p>
        </div>
        <div class="pw-arc-card">
          <div class="pw-arc-dot" aria-hidden="true"></div>
          <div class="pw-arc-stage">Stage III</div>
          <div class="pw-arc-h3">High performance</div>
          <p class="pw-arc-body">Consistent results under normal conditions. The stage where most engagements end and most improvement begins to drift.</p>
        </div>
        <div class="pw-arc-card">
          <div class="pw-arc-dot" aria-hidden="true"></div>
          <div class="pw-arc-stage">Stage IV</div>
          <div class="pw-arc-h3">Sustainable performance</div>
          <p class="pw-arc-body">Performance continues despite changes in conditions, schedules, and leadership. The architecture is doing the work.</p>
        </div>
        <div class="pw-arc-card">
          <div class="pw-arc-dot" aria-hidden="true"></div>
          <div class="pw-arc-stage">Stage V</div>
          <div class="pw-arc-h3">Scaled performance</div>
          <p class="pw-arc-body">What works at one site works at the next. Performance transfers across teams, sites, and holdings without degradation.</p>
        </div>
      </div>

      <p class="pw-caption-italic" style="text-align:center;max-width:600px;margin:48px auto 0;">We diagnose the stage during Discovery. Every engagement is calibrated to move the operation one stage forward, structurally. Not faster than the architecture can support.</p>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 5 — THE ENGAGEMENT                                    -->
<!-- ============================================================ -->
<section data-screen-label="05 The Engagement" class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner">
    <div class="pw-col-720">
      <div class="pw-eyebrow">The Engagement</div>
      <h2 class="pw-h2 pw-h2-on-navy">We Don't Deliver a Recommendation and Exit.</h2>
      <div class="pw-body pw-body-on-navy" style="margin-top:32px;">
        <p>The architecture above is not built from a deck. It is built on the floor, on every shift, under real operating conditions, alongside the leaders who will run it after we leave.</p>
        <p>Our engagement begins with a two-week Discovery, a paid assessment that maps the current state of your operation, quantifies the cost of the gaps your team has lived with long enough to consider normal, and delivers a custom roadmap with a results-based ROI commitment. From there, Implementation runs the roadmap. Evaluate ROI &amp; Savings closes the engagement against the financial commitment we made at the start.</p>
        <p>POWERS gets paid for results, not for time. That structure is the commercial expression of how seriously we take the work.</p>
      </div>

      <div class="pw-inline-cta-block">
        <hr class="pw-rule-gold-80" />
        <a href="discovery-process.html" class="pw-inline-cta">See how the engagement runs <span class="pw-arrow">&rarr;</span></a>
        <hr class="pw-rule-gold-80" />
        <p class="pw-microcopy-italic">Two weeks. Five deliverables. A defined commercial process.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 6 — THE FOUR EXPERTISE AREAS                          -->
<!-- ============================================================ -->
<section data-screen-label="06 Expertise Areas" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-720" style="text-align:center;">
      <div class="pw-eyebrow">Where We Work</div>
      <h2 class="pw-h2">The Four Disciplines Come Together in Four Places.</h2>
      <div class="pw-body" style="margin-top:32px;">
        <p>Every engagement integrates all four disciplines, but the work has a center of gravity. The expertise areas below are how the architecture meets the operation. Each one links to a deeper view of the work, the proof, and the specific gaps it closes.</p>
      </div>
    </div>

    <div class="pw-col-1100">
      <div class="pw-expertise-grid">

        <a href="operational-readiness.html" class="pw-expertise-card">
          <div class="pw-expertise-eyebrow">Operational Foundation</div>
          <h3 class="pw-h3">Operational readiness and discipline.</h3>
          <p class="pw-expertise-body">The management operating system, daily execution discipline, and the standard work that makes safety, quality, delivery, and cost manageable across every shift and every site. This is where most performance issues are actually solved, even when they look like something else.</p>
          <span class="pw-expertise-link">See the work <span aria-hidden="true">&rarr;</span></span>
        </a>

        <a href="frontline-leadership.html" class="pw-expertise-card">
          <div class="pw-expertise-eyebrow">People at the Execution Layer</div>
          <h3 class="pw-h3">Frontline capability and workforce readiness.</h3>
          <p class="pw-expertise-body">Capable supervisors on every shift. Operators trained to production standard. The leadership behaviors that turn the operating system from a binder into how the floor actually runs. Includes Key Role Support during ramps, transitions, or leadership gaps.</p>
          <span class="pw-expertise-link">See the work <span aria-hidden="true">&rarr;</span></span>
        </a>

        <a href="equipment-reliability.html" class="pw-expertise-card">
          <div class="pw-expertise-eyebrow">Asset Performance</div>
          <h3 class="pw-h3">Equipment reliability and maintenance performance.</h3>
          <p class="pw-expertise-body">OEE-driven maintenance discipline, advanced maintenance practices, and the operating cadence that keeps equipment performing when production schedules don't allow for unplanned downtime. Maintenance as a performance lever, not an expense category.</p>
          <span class="pw-expertise-link">See the work <span aria-hidden="true">&rarr;</span></span>
        </a>

        <a href="supply-chain.html" class="pw-expertise-card">
          <div class="pw-expertise-eyebrow">Flow and Distribution</div>
          <h3 class="pw-h3">Supply chain and distribution performance.</h3>
          <p class="pw-expertise-body">Warehouse operations, inventory control, distribution discipline, and the process architecture that keeps product moving from inputs to outputs without the silos that quietly cost margin. Where flow breaks down, performance follows.</p>
          <span class="pw-expertise-link">See the work <span aria-hidden="true">&rarr;</span></span>
        </a>

      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 7 — DURABILITY                                        -->
<!-- ============================================================ -->
<section data-screen-label="07 Durability" class="pw-section-outer" style="background:#f0f4f8;">
  <div class="pw-section-inner">
    <div class="pw-col-720">
      <div class="pw-eyebrow">Durability</div>
      <h2 class="pw-h2 pw-h2-on-tint">What's Different After We Leave.</h2>
      <div class="pw-body" style="margin-top:32px;">
        <p>The standard most consultants are measured against is whether performance improves during an engagement. We hold ourselves to a different one. Whether it sustains after, and whether it scales when the next site needs it.</p>
        <p>The architecture we build does not depend on us being there. The operating system runs on its own cadence. The leadership behaviors are practiced daily. The visibility layer is producing the same operational truth at every level. Drift is detectable. Standards are reinforced. Performance is the output of a system, not the byproduct of effort.</p>
        <p>This is what twenty years of engagements taught us, and what the case studies on the next page are evidence of. Operations that built the architecture sustain their gains and transfer them across additional sites when growth requires it. Operations that did not, lose them, on a measurable timeline, regardless of how strong the original results were.</p>
        <p style="font-weight:500;color:#183a61;font-size:1.05em;">Performance that does not sustain is not performance. It is a moment.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- SECTION 8 — PROOF                                             -->
<!-- ============================================================ -->
<section data-screen-label="08 Proof" class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-720" style="text-align:center;">
      <div class="pw-eyebrow">The Evidence</div>
      <h2 class="pw-h2">The Architecture, in the Operations That Ran It.</h2>
      <p class="pw-body" style="margin-top:24px;font-size:17px;max-width:640px;margin-left:auto;margin-right:auto;">Three engagements. Different industries, different stages, the same architecture. The full library of seventy-plus case studies lives on the Results page.</p>
    </div>

    <div class="pw-col-1100">
      <div class="pw-case-grid">

        <a href="case-studies.html" class="pw-case-card">
          <div class="pw-case-img" aria-hidden="true">
            <span class="pw-case-img-label">Value-added meats<br/>image placeholder</span>
          </div>
          <div class="pw-case-text">
            <div class="pw-case-eyebrow">Value-Added Meats</div>
            <h3 class="pw-case-headline">$70M in total savings.</h3>
            <p class="pw-case-desc">A division of a global food manufacturer rebuilt execution discipline, lifted operating efficiency 19%, and cut equipment downtime 62% across multiple production lines.</p>
            <span class="pw-case-link">Read the case <span aria-hidden="true">&rarr;</span></span>
          </div>
        </a>

        <a href="case-studies.html" class="pw-case-card">
          <div class="pw-case-img" aria-hidden="true">
            <span class="pw-case-img-label">International food processing<br/>image placeholder</span>
          </div>
          <div class="pw-case-text">
            <div class="pw-case-eyebrow">International Food Processing</div>
            <h3 class="pw-case-headline">$42.2M in annualized savings.</h3>
            <p class="pw-case-desc">A structured management operating system replaced inconsistent execution, producing durable productivity and yield gains across the engagement and beyond.</p>
            <span class="pw-case-link">Read the case <span aria-hidden="true">&rarr;</span></span>
          </div>
        </a>

        <a href="case-studies.html" class="pw-case-card">
          <div class="pw-case-img" aria-hidden="true">
            <span class="pw-case-img-label">Industrial manufacturing<br/>image placeholder</span>
          </div>
          <div class="pw-case-text">
            <div class="pw-case-eyebrow">Industrial Manufacturing</div>
            <h3 class="pw-case-headline">23% productivity surge.</h3>
            <p class="pw-case-desc">During an ERP transition and pending plant relocation, POWERS stabilized operations and laid the foundation for sustainable operational excellence under pressure.</p>
            <span class="pw-case-link">Read the case <span aria-hidden="true">&rarr;</span></span>
          </div>
        </a>

      </div>

      <div style="text-align:center;margin-top:48px;">
        <a href="case-studies.html" class="pw-centered-link">See the full case study library <span class="pw-arrow">&rarr;</span></a>
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
      <h2 class="pw-h2 pw-h2-on-navy pw-h2-strong">If You're Working Through a Performance Challenge, We Should Talk.</h2>
      <p class="pw-body pw-body-on-navy-soft" style="margin-top:24px;max-width:600px;margin-left:auto;margin-right:auto;">The Discovery is two weeks. The conversation that leads to it is shorter. If your operation is in one of the stages above and you want a clear-eyed read on where it actually is and what it would take to move forward, the next step is a call.</p>

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

export default function Approach() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Approach | POWERS. Sustainable Manufacturing Performance. v0.3.0`}
      metaDescription={`POWERS builds the operating architecture, the management operating system, process discipline, frontline leadership behavior, and visibility, that makes manufacturing performance sustainable and scalable across shifts, sites, and growth phases.`}
    />
  );
}
