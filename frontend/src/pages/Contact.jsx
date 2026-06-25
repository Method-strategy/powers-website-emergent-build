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

const HTML = `<section style="background:#183a61;">
  <div style="max-width:1280px;margin:0 auto;width:100%;padding:120px 48px;min-height:600px;display:flex;flex-direction:column;justify-content:center;">
    <div style="font-size:12px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#eabb71;font-family:inherit;margin-bottom:24px;">Let's Talk</div>
    <h1 style="font-size:clamp(36px,4.2vw,56px);font-weight:800;line-height:1.08;color:#ffffff;letter-spacing:-0.01em;font-family:inherit;max-width:920px;text-wrap:balance;">Start a Conversation.</h1>
  </div>
</section>`;

const SCRIPT = ``;

export default function Contact() {
  return (
    <LegacyPage
      css={CSS}
      html={HTML}
      script={SCRIPT}
      title={`Contact POWERS — Start a Manufacturing Operations Conversation`}
      metaDescription={``}
    />
  );
}
