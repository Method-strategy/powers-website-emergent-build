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
    }

    h1, h2, h3, .pw-eyebrow { text-wrap: balance; }
    p, li { text-wrap: pretty; }

    .pw-eyebrow { font-size:12px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#eabb71; font-family:inherit; margin-bottom:24px; }

    /* Bio Hero */
    .bio-hero { background:#ffffff; }
    .bio-hero-inner { max-width:1100px; margin:0 auto; padding:80px 48px; display:grid; grid-template-columns:32fr 68fr; gap:64px; align-items:start; }
    .bio-photo { width:100%; max-width:300px; aspect-ratio:1/1; overflow:hidden; background:#f5f5f3; border:1px solid #e8e8e4; }
    .bio-photo img { width:100%; height:100%; object-fit:cover; display:block; }
    .bio-right .pw-eyebrow { color:#eabb71; margin-bottom:16px; }
    .bio-right h1 { font-size:clamp(34px,4.2vw,44px); font-weight:800; line-height:1.05; color:#183a61; letter-spacing:-0.01em; }
    .bio-right .bio-body { margin-top:28px; }
    .bio-right .bio-body p { font-size:17px; font-weight:300; line-height:1.65; color:#3a3a38; }
    .bio-right .bio-body p + p { margin-top:1.1em; }
    .bio-contact { margin-top:36px; padding-top:28px; border-top:1px solid #e8e8e4; display:flex; gap:28px; flex-wrap:wrap; }
    .bio-contact a { display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:400; color:#3a3a38; text-decoration:none; transition:color 150ms ease; }
    .bio-contact a:hover { color:#183a61; }
    .bio-contact svg { color:#eabb71; flex-shrink:0; }

    /* Insights */
    .bio-insights { background:#f0f4f8; }
    .bio-insights-inner { max-width:960px; margin:0 auto; padding:96px 48px; }
    .bio-insights .pw-eyebrow { margin-bottom:18px; }
    .bio-insights h2 { font-size:clamp(24px,2.6vw,28px); font-weight:700; line-height:1.2; color:#183a61; max-width:760px; }
    .bio-insights-list { margin-top:40px; }
    .bio-insight { display:grid; grid-template-columns:1fr auto; gap:24px; align-items:center; padding:24px 0; border-top:1px solid #e8e8e4; text-decoration:none; color:inherit; transition:border-color 180ms ease; }
    .bio-insight:last-child { border-bottom:1px solid #e8e8e4; }
    .bio-insight:hover { border-top-color:#eabb71; }
    .bio-insight:hover + .bio-insight { border-top-color:#eabb71; }
    .bio-insight .ins-date { font-size:12px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#eabb71; margin-bottom:8px; }
    .bio-insight .ins-title { font-size:20px; font-weight:600; line-height:1.3; color:#183a61; transition:color 150ms ease; }
    .bio-insight:hover .ins-title { color:#2b5070; }
    .bio-insight .ins-arrow { font-size:20px; color:#2b5070; transition:color 150ms ease, transform 200ms ease; }
    .bio-insight:hover .ins-arrow { color:#eabb71; transform:translateX(4px); }

    /* Back link */
    .bio-back-section { background:#ffffff; }
    .bio-back-inner { max-width:1100px; margin:0 auto; padding:40px 48px; display:flex; align-items:center; min-height:96px; }
    .bio-back { display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:500; color:#2b5070; text-decoration:none; transition:color 150ms ease; }
    .bio-back:hover { color:#eabb71; }
    .bio-back .arr { transition:transform 200ms ease; display:inline-block; }
    .bio-back:hover .arr { transform:translateX(-4px); }

    /* CTA shared */
    .lead-cta { background:#183a61; }
    .lead-cta-inner { max-width:780px; margin:0 auto; padding:96px 48px; text-align:center; }
    .lead-cta .pw-eyebrow { color:#eabb71; }
    .lead-cta h2 { font-size:clamp(28px,3.5vw,44px); font-weight:800; line-height:1.1; letter-spacing:-0.005em; color:#ffffff; max-width:760px; margin:0 auto; }
    .lead-cta p.body { font-size:18px; font-weight:300; line-height:1.6; color:rgba(255,255,255,0.85); max-width:640px; margin:28px auto 0; }
    .lead-cta .contact-row { margin-top:36px; display:flex; flex-direction:column; align-items:center; gap:6px; }
    .lead-cta .phone { font-size:22px; font-weight:500; color:#ffffff; text-decoration:none; }
    .lead-cta .email { font-size:18px; font-weight:400; color:#eabb71; text-decoration:none; }
    .lead-cta .email:hover { color:#ffffff; }
    .lead-cta .cta-btn { display:inline-block; margin-top:32px; font-size:14px; font-weight:500; color:#183a61; background:#eabb71; padding:14px 28px; text-decoration:none; transition:background 160ms ease, color 160ms ease; }
    .lead-cta .cta-btn:hover { background:#c9963e; color:#183a61; }

    @media (max-width:899px) {
      .bio-hero-inner { grid-template-columns:1fr; gap:40px; max-width:640px; }
      .bio-photo { max-width:380px; }
    }
    @media (max-width:639px) {
      .bio-hero-inner, .bio-insights-inner, .lead-cta-inner, .bio-back-inner { padding-left:24px; padding-right:24px; }
      .bio-hero-inner { padding-top:56px; padding-bottom:56px; }
      .bio-insights-inner, .lead-cta-inner { padding-top:64px; padding-bottom:64px; }
      .bio-insight { grid-template-columns:1fr; gap:8px; }
      .bio-insight .ins-arrow { display:none; }
    }`;

const HTML = `<!-- BIO HERO -->
<section class="bio-hero">
  <div class="bio-hero-inner">
    <div class="bio-photo">
      <img src="/uploads/leaders/randall-powers.webp" alt="Randall Powers" />
    </div>
    <div class="bio-right">
      <div class="pw-eyebrow">Managing Partner</div>
      <h1>Randall Powers</h1>
      <div class="bio-body">
        <p>Randall Powers founded POWERS to build a different kind of operational consulting firm: one that works inside manufacturing operations rather than around them. He concentrates on operational and financial due diligence, strategic development, and the engagements that establish the operating architecture clients rely on after POWERS exits.</p>
        <p>His background is twenty years of operational leadership in manufacturing. Before founding POWERS, Randall served as President and Chief Operating Officer of Wise Metals Group, and as Chief of Operations for an operational improvement firm for more than a decade. He started at United Parcel Service in operating roles that put him on the floor early.</p>
        <p>Randall holds an MA in Communications and Management and BAs in Economics and Philosophy from the University of Georgia.</p>
      </div>
      
    </div>
  </div>
</section>



<!-- BACK LINK -->
<section class="bio-back-section">
  <div class="bio-back-inner">
    <a href="leadership.html" class="bio-back"><span class="arr">&larr;</span> Back to Leadership</a>
  </div>
</section>

<!-- CTA -->
<section class="lead-cta">
  <div class="lead-cta-inner">
    <div class="pw-eyebrow">Working with the Team</div>
    <h2>The Leadership Team Works the Engagement, Not Just the Contract.</h2>
    <p class="body">POWERS engagements are led by senior practitioners. The names above are the people you will work with, on the floor, during Discovery and Implementation. If you want to meet the team before scoping a Discovery, the conversation starts with a call.</p>
    <div class="contact-row">
      <a href="tel:+16789714711" class="phone">+1 678-971-4711</a>
      <a href="mailto:info@thepowerscompany.com" class="email">info@thepowerscompany.com</a>
    </div>
    <a href="contact.html" class="cta-btn">Start the conversation &rarr;</a>
  </div>
</section>`;

const SCRIPT = ``;

export default function BioRandallPowers() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Randall Powers, Managing Partner | POWERS v0.3.0`}
      metaDescription={`Randall Powers founded POWERS to build a different kind of operational consulting firm: one that works inside manufacturing operations rather than around them. He concentrates on operational and financial due diligence, strategic development, and the engagements that establish the operating architecture clients rely on after POWERS exits.`}
    />
  );
}
