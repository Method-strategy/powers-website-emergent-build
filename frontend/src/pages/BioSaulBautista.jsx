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
      <img src="/uploads/leaders/saul-bautista.webp" alt="Saul Bautista" />
    </div>
    <div class="bio-right">
      <div class="pw-eyebrow">Chief Operating Officer</div>
      <h1>Saul Bautista</h1>
      <div class="bio-body">
        <p>Saul Bautista is one of the founders of POWERS and brings nearly thirty years of operational leadership in pharmaceutical manufacturing and management consulting. He has run the full span of pharmaceutical planning, operations, and production, and he is the executive who keeps POWERS engagements moving on the ground.</p>
        <p>Saul has managed operations of up to 160 people across management, technical, and hourly teams, and built and developed the operating discipline that allows those teams to perform under regulatory pressure. He carries an outstanding record in major FDA, DEA, and internal audits, the kind of result that does not happen by accident in pharmaceutical environments.</p>
        <p>He holds an MBA from Florida International University and a BS in Industrial Engineering from Tecnologico de Monterrey.</p>
      </div>
      <div class="bio-contact">
        <a href="https://www.linkedin.com/in/saulbautista/" target="_blank" rel="noopener" aria-label="Connect with Saul Bautista on LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</section>


<section class="bio-insights">
  <div class="bio-insights-inner">
    <div class="pw-eyebrow">More Insights from Saul</div>
    <h2>Saul on building high performers under operating pressure.</h2>
    <div class="bio-insights-list">
      
      <a class="bio-insight" href="https://www.thepowerscompany.com/resources/high-performers/">
        <div>
          <div class="ins-date">March 9, 2023</div>
          <div class="ins-title">Want to Build High Performers in Your Organization? Follow the Two-Step V-Process to Help Challenge and Support Your People Into the High Performer Zone</div>
        </div>
        <div class="ins-arrow">&rarr;</div>
      </a>
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

export default function BioSaulBautista() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Saul Bautista, Chief Operating Officer | POWERS v0.3.0`}
      metaDescription={`Saul Bautista is one of the founders of POWERS and brings nearly thirty years of operational leadership in pharmaceutical manufacturing and management consulting. He has run the full span of pharmaceutical planning, operations, and production, and he is the executive who keeps POWERS engagements moving on the ground.`}
    />
  );
}
