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
  .pw-body-light { color:rgba(255,255,255,0.80); max-width:640px; }
  .pw-rule-gold { width:64px; height:1px; background:#eabb71; margin:0 0 32px 0; border:0; }
  .pw-cta-link { display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:500; letter-spacing:0.06em; color:#eabb71; text-decoration:none; font-family:inherit; transition:color 150ms ease; }
  .pw-cta-link:hover { color:#ffffff; }
  .pw-cta-link .pw-arrow { transition:transform 200ms ease; }
  .pw-cta-link:hover .pw-arrow { transform:translateX(4px); }
  .pw-split { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
  .pw-img-ph { width:100%; aspect-ratio:4/3; background:#0d2442 repeating-linear-gradient(135deg, rgba(234,187,113,0.06) 0 12px, transparent 12px 24px); display:flex; align-items:center; justify-content:center; }
  .pw-img-ph-label { font-family:'SF Mono','Menlo',Consolas,monospace; font-size:11px; letter-spacing:0.12em; color:rgba(234,187,113,0.55); text-transform:uppercase; padding:0 24px; text-align:center; }
  .pw-quote-list { list-style:none; margin:48px 0 0 0; padding:0; }
  .pw-quote-item { padding:22px 0; border-top:1px solid rgba(234,187,113,0.30); display:flex; gap:18px; align-items:flex-start; }
  .pw-quote-item:last-child { border-bottom:1px solid rgba(234,187,113,0.30); }
  .pw-quote-mark { font-size:34px; line-height:0.8; color:#eabb71; font-family:Georgia,serif; flex-shrink:0; margin-top:6px; }
  .pw-quote-text { font-size:17px; font-weight:300; line-height:1.55; color:#ffffff; font-family:inherit; }
  @media (max-width:1023px) {
    .pw-split { grid-template-columns:1fr; gap:48px; }
  }
  @media (max-width:767px) {
    .pw-section-inner { padding:64px 24px; }
    .pw-body { font-size:16px; }
    .pw-quote-text { font-size:15px; }
  }
</style>

<!-- HERO -->
<section class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner" style="min-height:600px;display:flex;flex-direction:column;justify-content:center;padding-top:120px;padding-bottom:120px;">
    <div class="pw-eyebrow">Our Story</div>
    <h1 class="pw-h1 hero-headline">Built From the Floor Up.<br/>Since 2004.</h1>
    <p class="pw-subhead-hero">POWERS was not founded by academics or career consultants. It was founded by executives who had run manufacturing operations, managed P&amp;Ls, and understood firsthand where performance breaks down and why it stays broken.</p>
    <hr class="pw-rule-gold-hero" />
  </div>
</section>

<!-- SECTION 1 — WHERE IT STARTED -->
<section class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-col-narrow">
      <div class="pw-eyebrow">Where It Started</div>
      <h2 class="pw-h2">Gainesville, Georgia. 2004.</h2>
      <hr class="pw-rule-gold" style="margin-top:24px;" />
      <div class="pw-body">
        <p>Randall Powers founded POWERS in Gainesville, Georgia, with a team of C-level executives who shared a common conviction: that the gap between executive intent and shop floor performance was not a strategy problem. It was a systems, leadership, and discipline problem. And it could be solved, permanently, by working inside the operation rather than advising from outside it.</p>
        <p>That founding conviction has never changed. Every engagement POWERS takes on today is built on the same principle that drove the first one in 2004. Get on the floor. Work with the people. Build what holds.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 2 — HOW WE EVOLVED -->
<section class="pw-section-outer" style="background:#f5f5f3;">
  <div class="pw-section-inner">
    <div class="pw-col-narrow">
      <div class="pw-eyebrow">How We Evolved</div>
      <h2 class="pw-h2">Two Decades of Floor-Level Experience Built Something No Competitor Has.</h2>
      <hr class="pw-rule-gold" style="margin-top:24px;" />
      <div class="pw-body">
        <p>Over twenty years of engagements across food and beverage, aerospace and defense, automotive, pharmaceutical, metals and mining, medical devices, and private equity portfolio operations, POWERS developed something that can only come from that kind of accumulated experience: a proprietary methodology that integrates management operating systems, frontline leadership development, and real-time operational visibility into a single coherent approach.</p>
        <p>That approach is not a framework borrowed from Lean or Six Sigma. It is the direct result of watching what breaks, understanding why it breaks, and building the systems that prevent it from breaking again. The Management Operating System POWERS installs is not a product. It is an outcome built from the inside, tailored to how each specific organization operates.</p>
        <p>The Digital Production System, POWERS' proprietary execution layer, came from the same place. Not from a software team working from a distance, but from consultants on the floor who saw the same gap repeated across hundreds of engagements: organizations had data, but the data was not driving decisions at the speed and level required to maintain execution consistency. DPS closes that gap.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 3 — A NEW CHAPTER -->
<section class="pw-section-outer" style="background:#ffffff;">
  <div class="pw-section-inner">
    <div class="pw-split">
      <div>
        <div class="pw-eyebrow">A New Chapter</div>
        <h2 class="pw-h2">Atlanta. 2021.</h2>
        <hr class="pw-rule-gold" style="margin-top:24px;" />
        <div class="pw-body">
          <p>In 2021, POWERS relocated its corporate headquarters from Gainesville to Atlanta, Georgia, establishing its offices at 1801 Peachtree Street NE. The move reflected what had been true for years: POWERS had grown into a firm operating at national and global scale, serving manufacturing leaders across industries and geographies, and its home base needed to reflect that ambition.</p>
          <p>The work still happens on the floor. That has never changed. But Atlanta positions POWERS to attract the caliber of talent the firm's next chapter requires and keeps it connected to the broader business and investment community it increasingly serves.</p>
        </div>
      </div>
      <div class="pw-img-ph" aria-hidden="true">
        <span class="pw-img-ph-label">Atlanta skyline / 1801 Peachtree St NE<br/>placeholder</span>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 4 — THE CONSTANTS -->
<section class="pw-section-outer" style="background:#183a61;">
  <div class="pw-section-inner">
    <div class="pw-col-narrow">
      <div class="pw-eyebrow">The Constants</div>
      <h2 class="pw-h2 pw-h2-light">Twenty Years In. The Founding Principles Still Run the Firm.</h2>
      <hr class="pw-rule-gold" style="margin-top:24px;" />
      <div class="pw-body pw-body-light">
        <p>The industries have expanded. The methodology has deepened. The team has grown. But the operating principles Randall Powers built the firm on in 2004 are the same ones that govern every engagement today.</p>
      </div>
      <ul class="pw-quote-list">
        <li class="pw-quote-item"><span class="pw-quote-mark">&ldquo;</span><span class="pw-quote-text">We earn the right to return to a client every week by delivering on our commitments.</span></li>
        <li class="pw-quote-item"><span class="pw-quote-mark">&ldquo;</span><span class="pw-quote-text">Clients first, company second, self third.</span></li>
        <li class="pw-quote-item"><span class="pw-quote-mark">&ldquo;</span><span class="pw-quote-text">Frontline leadership is the most critical and most underinvested role in manufacturing.</span></li>
        <li class="pw-quote-item"><span class="pw-quote-mark">&ldquo;</span><span class="pw-quote-text">Behavioral change is a skill and an art that must be handled with discipline.</span></li>
        <li class="pw-quote-item"><span class="pw-quote-mark">&ldquo;</span><span class="pw-quote-text">We deliver on schedule, always.</span></li>
      </ul>
    </div>
  </div>
</section>

<!-- SECTION 5 — CTA -->
<section class="pw-section-outer" style="background:#0d2442;">
  <div class="pw-section-inner" style="padding-top:96px; padding-bottom:96px; text-align:center;">
    <h2 class="pw-h2 pw-h2-light" style="margin:0 auto;">See What Twenty Years of This Approach Produces.</h2>
    <div style="margin-top:32px;">
      <a href="case-studies.html" class="pw-cta-link">Read the Case Studies <span class="pw-arrow">&rarr;</span></a>
    </div>
  </div>
</section>`;

const SCRIPT = ``;

export default function History() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`History — POWERS Manufacturing Performance Consulting v0.3.0`}
      metaDescription={`POWERS was founded in 2004 in Gainesville, Georgia by executives who had run manufacturing operations. Two decades later, the founding principles still run the firm.`}
    />
  );
}
