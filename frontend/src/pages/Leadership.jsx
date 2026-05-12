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

    /* Typography QC — global balancing per CLAUDE.md standing instruction */
    h1, h2, h3, .pw-eyebrow { text-wrap: balance; }
    p, li { text-wrap: pretty; }
    @media (max-width: 767px) { .hero-headline br { display: none; } }

    /* Page tokens */
    .pw-eyebrow { font-size:12px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#eabb71; font-family:inherit; margin-bottom:24px; }
    .pw-section-outer { width:100%; }
    .pw-section-inner { max-width:1280px; margin:0 auto; padding:96px 48px; }

    /* Hero */
    .lead-hero { background:#183a61; }
    .lead-hero-inner { max-width:1280px; margin:0 auto; padding:120px 48px; width:100%; min-height:600px; display:flex; flex-direction:column; justify-content:center; }
    .lead-hero h1 { font-size:clamp(36px,4.2vw,56px); font-weight:800; line-height:1.08; color:#ffffff; letter-spacing:-0.01em; max-width:920px; }
    .lead-hero p.subhead { font-size:clamp(17px,1.5vw,22px); font-weight:300; line-height:1.5; color:rgba(255,255,255,0.90); margin-top:28px; max-width:60ch; text-wrap:balance; }
    .lead-hero hr.gold-rule { width:80px; height:1px; background:#eabb71; border:0; margin-top:64px; }

    /* Grid — scaled down ~20% from prior 1100px container */
    .lead-grid-section { background:#ffffff; }
    .lead-grid-inner { max-width:880px; margin:0 auto; padding:96px 48px; }
    .lead-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:28px; }
    .lead-card-wrap { display:flex; flex-direction:column; }
    .lead-card { display:block; text-decoration:none; color:inherit; transition:transform 220ms ease; }
    .lead-card .photo-wrap { width:100%; aspect-ratio:1/1; overflow:hidden; background:#f5f5f3; border:1px solid #e8e8e4; transition:transform 220ms ease; }
    .lead-card .photo-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 400ms ease; }
    .lead-card:hover .photo-wrap { transform:translateY(-2px); }
    .lead-card:hover .photo-wrap img { transform:scale(1.02); }
    .lead-card .name { font-size:18px; font-weight:700; color:#183a61; margin-top:16px; line-height:1.2; transition:color 150ms ease; }
    .lead-card:hover .name { color:#2b5070; }
    .lead-card .title { font-size:12.5px; font-weight:400; color:#3a3a38; line-height:1.4; margin-top:5px; }
    .lead-card-wrap > .linkedin { display:inline-flex; align-items:center; gap:6px; margin-top:12px; font-size:11px; font-weight:500; letter-spacing:0.06em; color:#2b5070; text-transform:uppercase; text-decoration:none; transition:color 150ms ease; align-self:flex-start; }
    .lead-card-wrap > .linkedin:hover { color:#eabb71; }
    .lead-card-wrap > .linkedin svg { color:#eabb71; flex-shrink:0; transition:color 150ms ease; }
    .lead-card-wrap > .linkedin:hover svg { color:#c9963e; }

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

    @media (max-width:1023px) {
      .lead-grid { grid-template-columns:repeat(2, 1fr); gap:28px; }
    }
    @media (max-width:639px) {
      .lead-grid { grid-template-columns:1fr; gap:36px; }
      .lead-grid-inner, .lead-cta-inner, .lead-hero-inner { padding-left:24px; padding-right:24px; }
      .lead-grid-inner, .lead-cta-inner { padding-top:64px; padding-bottom:64px; }
      .lead-hero-inner { padding-top:64px; padding-bottom:64px; min-height:0; }
    }`;

const HTML = `<!-- HERO -->
<section class="lead-hero">
  <div class="lead-hero-inner">
    <div class="pw-eyebrow">Leadership</div>
    <h1 class="hero-headline">The Team That Built<br/>the Architecture</h1>
    <p class="subhead">POWERS leadership comes from inside manufacturing operations. Plant floors, production lines, finance functions, and the rooms where operating decisions get made under real pressure. Not advisors who studied the work. Practitioners who did it.</p>
    <hr class="gold-rule" />
  </div>
</section>

<!-- GRID -->
<section class="lead-grid-section">
  <div class="lead-grid-inner">
    <div class="lead-grid">

      <div class="lead-card-wrap">
        <a class="lead-card" href="randall-powers.html">
          <div class="photo-wrap"><img src="/uploads/leaders/randall-powers.webp" alt="Randall Powers" loading="lazy" /></div>
          <div class="name">Randall Powers</div>
          <div class="title">Managing Partner</div>
        </a>
      </div>

      <div class="lead-card-wrap">
        <a class="lead-card" href="sean-hart.html">
          <div class="photo-wrap"><img src="/uploads/leaders/sean-hart.webp" alt="Sean Hart" loading="lazy" /></div>
          <div class="name">Sean Hart</div>
          <div class="title">Chief Executive Officer and Managing Partner</div>
        </a>
        <a class="linkedin" href="https://www.linkedin.com/in/seanphart/" target="_blank" rel="noopener" aria-label="Connect with Sean Hart on LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>

      <div class="lead-card-wrap">
        <a class="lead-card" href="saul-bautista.html">
          <div class="photo-wrap"><img src="/uploads/leaders/saul-bautista.webp" alt="Saul Bautista" loading="lazy" /></div>
          <div class="name">Saul Bautista</div>
          <div class="title">Chief Operating Officer</div>
        </a>
        <a class="linkedin" href="https://www.linkedin.com/in/saulbautista/" target="_blank" rel="noopener" aria-label="Connect with Saul Bautista on LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>

      <div class="lead-card-wrap">
        <a class="lead-card" href="ken-wiesinger.html">
          <div class="photo-wrap"><img src="/uploads/leaders/ken-wiesinger.webp" alt="Ken Wiesinger" loading="lazy" /></div>
          <div class="name">Ken Wiesinger</div>
          <div class="title">Chief Delivery Officer</div>
        </a>
        <a class="linkedin" href="https://www.linkedin.com/in/kenwiesinger/" target="_blank" rel="noopener" aria-label="Connect with Ken Wiesinger on LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>

      <div class="lead-card-wrap">
        <a class="lead-card" href="justin-pethick.html">
          <div class="photo-wrap"><img src="/uploads/leaders/justin-pethick.webp" alt="Justin Pethick" loading="lazy" /></div>
          <div class="name">Justin Pethick</div>
          <div class="title">Senior Vice President of Strategy and Business Development</div>
        </a>
        <a class="linkedin" href="https://www.linkedin.com/in/justin-pethick-ab5388181/" target="_blank" rel="noopener" aria-label="Connect with Justin Pethick on LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>

      <div class="lead-card-wrap">
        <a class="lead-card" href="kevin-sabany.html">
          <div class="photo-wrap"><img src="/uploads/leaders/kevin-sabany.webp" alt="Kevin Sabany" loading="lazy" /></div>
          <div class="name">Kevin Sabany</div>
          <div class="title">Analyst</div>
        </a>
        <a class="linkedin" href="https://www.linkedin.com/in/kevin-sabany-901339174/" target="_blank" rel="noopener" aria-label="Connect with Kevin Sabany on LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>

    </div>
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

export default function Leadership() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Leadership | POWERS v0.3.0`}
      metaDescription={`POWERS leadership comes from inside manufacturing operations. Practitioners who have run plants and operations before they became consultants.`}
    />
  );
}
