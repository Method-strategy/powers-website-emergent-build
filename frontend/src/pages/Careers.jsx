import React from 'react';
import LegacyPage from '../components/LegacyPage';

const CSS = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      font-family: 'proxima-nova','Proxima Nova',-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;
      background: #ffffff;
      min-height: 100vh;
    }
    body { padding-top: 84px; }
    .nav-desktop { display: flex !important; }
    .nav-mobile  { display: none !important; }
    .nav-tagline { display: inline !important; }
    @media (max-width: 767px) {
      .nav-desktop { display: none !important; }
      .nav-mobile  { display: flex !important; }
      .nav-tagline { display: none !important; }
    }`;

const HTML = `<style>
  /* Typography QC — global balancing per CLAUDE.md standing instruction */
  h1, h2, h3, .pw-eyebrow { text-wrap: balance; }
  @media (max-width: 767px) { .hero-headline br { display: none; } }
  .pw-eyebrow { font-size:12px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#eabb71; font-family:inherit; margin-bottom:24px; }
  .pw-section-outer { width:100%; }
  .pw-section-inner { max-width:1280px; margin:0 auto; padding:96px 48px; }
  .pw-col-narrow { max-width:780px; margin:0 auto; }
  .pw-h1 { font-size:clamp(36px,4.2vw,56px); font-weight:800; line-height:1.08; color:#ffffff; font-family:inherit; letter-spacing:-0.01em; }
  .pw-subhead-hero { font-size:clamp(17px,1.5vw,22px); font-weight:300; line-height:1.5; color:rgba(255,255,255,0.90); font-family:inherit; max-width:60ch; margin-top:28px; text-wrap:pretty; }
  .pw-rule-gold-hero { width:80px; height:1px; background:#eabb71; border:0; margin-top:64px; }
  .pw-h2 { font-size:clamp(28px,3.4vw,36px); font-weight:800; line-height:1.15; color:#183a61; font-family:inherit; letter-spacing:-0.005em; max-width:680px; }
  .pw-h2-light { color:#ffffff; }
  .pw-body { font-size:18px; font-weight:300; line-height:1.7; color:#3a3a38; font-family:inherit; margin-top:24px; }
  .pw-body p + p { margin-top:1.1em; }
  .pw-rule-gold { width:64px; height:1px; background:#eabb71; margin:24px 0 0 0; border:0; }
  .pw-split { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
  .pw-img-ph { width:100%; aspect-ratio:4/3; background:#0d2442 repeating-linear-gradient(135deg, rgba(234,187,113,0.06) 0 12px, transparent 12px 24px); display:flex; align-items:center; justify-content:center; }
  .pw-img-ph-label { font-family:'SF Mono','Menlo',Consolas,monospace; font-size:11px; letter-spacing:0.12em; color:rgba(234,187,113,0.55); text-transform:uppercase; padding:0 24px; text-align:center; }
  .pw-cta-btn { display:inline-block; background:#eabb71; color:#183a61; font-size:15px; font-weight:600; letter-spacing:0.02em; padding:16px 36px; text-decoration:none; font-family:inherit; transition:background 160ms ease, color 160ms ease; }
  .pw-cta-btn:hover { background:#c9963e; color:#183a61; }
  .pw-subhead-cta { font-size:18px; font-weight:300; line-height:1.55; color:rgba(255,255,255,0.70); font-family:inherit; margin-top:18px; }
  @media (max-width:1023px) {
    .pw-split { grid-template-columns:1fr; gap:48px; }
  }
  @media (max-width:767px) {
    .pw-section-inner { padding:64px 24px; }
    .pw-body { font-size:16px; }
  }
</style>

<!-- HERO -->
<section class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner" style="min-height:600px;display:flex;flex-direction:column;justify-content:center;padding-top:120px;padding-bottom:120px;">
    <div class="pw-eyebrow">Join The Team</div>
    <h1 class="pw-h1">This Work Is Not for Everyone. If It Is for You, You Will Know.</h1>
    <p class="pw-subhead-hero">POWERS consultants work on the floor, in the shifts, inside the operations where performance actually breaks down. If you want to make a real difference in American manufacturing, this is where that work happens.</p>
    <hr class="pw-rule-gold-hero" />
  </div>
</section>

<!-- SECTION 1 — WHAT THE WORK ACTUALLY LOOKS LIKE -->
<section class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-narrow">
      <div class="pw-eyebrow">What The Work Actually Looks Like</div>
      <h2 class="pw-h2">You Will Be on the Road. You Will Be on the Floor. That Is the Job.</h2>
      <hr class="pw-rule-gold" />
      <div class="pw-body">
        <p>POWERS does not send reports from a distance. Our consultants are embedded inside client operations, working shoulder to shoulder with frontline leaders, plant managers, and executive teams to build the systems and disciplines that make performance stick.</p>
        <p>That means travel. It means early shifts and late debrief calls. It means being the person in the room who tells the truth about what is actually happening on the floor and then doing the work to fix it. If that sounds like the kind of consulting you have been looking for, keep reading.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 2 — WHO THRIVES HERE -->
<section class="pw-section-outer" style="background:#f5f5f3;">
  <div class="pw-section-inner">
    <div class="pw-split">
      <div>
        <div class="pw-eyebrow">Who Thrives Here</div>
        <h2 class="pw-h2">We Hire People Who Have Been in the Operation, Not Just Around It.</h2>
        <hr class="pw-rule-gold" />
        <div class="pw-body">
          <p>The POWERS team is built from people with real manufacturing operations experience. Former plant managers, operations directors, maintenance leaders, supply chain executives, and frontline supervisors who understand the work because they have done the work.</p>
          <p>What sets the people who thrive at POWERS apart is not their resume. It is their ability to build trust on a floor quickly, communicate clearly across every level of an organization, and sustain the discipline required to see an engagement through to results that hold after they leave.</p>
        </div>
      </div>
      <div class="pw-img-ph" aria-hidden="true">
        <span class="pw-img-ph-label">Manufacturing floor / consultant on shift<br/>placeholder</span>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 3 — WHAT POWERS OFFERS -->
<section class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-narrow">
      <div class="pw-eyebrow">What POWERS Offers</div>
      <h2 class="pw-h2">A Firm That Operates by the Same Standards It Installs in Its Clients.</h2>
      <hr class="pw-rule-gold" />
      <div class="pw-body">
        <p>POWERS holds itself to the same principles it brings to every client engagement. Clients first, company second, self third. We deliver on schedule, always. We earn the right to return every week by delivering on our commitments.</p>
        <p>That means when you join POWERS, you join a team that operates with the same discipline, transparency, and accountability it asks of the organizations it serves. The work is demanding. The standards are high. And the impact is real and measurable in every engagement.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 4 — CTA -->
<section class="pw-section-outer" style="background:#0d2442;">
  <div class="pw-section-inner" style="padding-top:96px; padding-bottom:96px; text-align:center;">
    <h2 class="pw-h2 pw-h2-light" style="margin:0 auto;">Ready to Do Work That Actually Makes a Difference?</h2>
    <p class="pw-subhead-cta">See current openings and apply.</p>
    <div style="margin-top:36px;">
      <a href="#" class="pw-cta-btn">View Open Positions</a>
    </div>
  </div>
</section>`;

const SCRIPT = ``;

export default function Careers() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Careers — POWERS Manufacturing Performance Consulting v0.3.0`}
      metaDescription={`POWERS consultants work on the floor, in the shifts, inside the operations where performance breaks down. If you want to make a real difference in American manufacturing, this is where that work happens.`}
    />
  );
}
