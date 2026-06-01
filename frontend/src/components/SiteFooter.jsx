import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toRoute } from '../lib/routes';

const FONT = "'proxima-nova','Proxima Nova',-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif";
const NC = {
  navy900: '#0d2442',
  navy:    '#183a61',
  gold:    '#eabb71',
};

function Anchor({ href, style, children, onMouseEnter, onMouseLeave, ...rest }) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return <a href={href || '#'} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>{children}</a>;
  }
  return <Link to={toRoute(href)} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>{children}</Link>;
}

function NFooterLink({ href, children, dataTestId }) {
  const [h, setH] = useState(false);
  return (
    <Anchor href={href || '#'} data-testid={dataTestId}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'block', fontSize: 13, fontWeight: 300, color: h ? '#ffffff' : 'rgba(255,255,255,0.70)', textDecoration: 'none', fontFamily: FONT, padding: '4px 0', transition: 'color 150ms ease' }}>
      {children}
    </Anchor>
  );
}

function NFooterColHeader({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ffffff', fontFamily: FONT, marginBottom: 16 }}>{children}</div>;
}

function NLinkedIn() {
  const [h, setH] = useState(false);
  return (
    <a href="#" aria-label="POWERS on LinkedIn" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-block', marginTop: 20, color: h ? NC.gold : '#ffffff', transition: 'color 160ms ease' }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="4" y="8" width="2.2" height="7" fill="currentColor"/>
        <circle cx="5.1" cy="5.5" r="1.3" fill="currentColor"/>
        <path d="M9 8v7M9 11c0-1.66 1.34-3 3-3s3 1.34 3 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </a>
  );
}

function NFooterGhostBtn() {
  const [h, setH] = useState(false);
  return (
    <Anchor href="contact.html"
      data-testid="footer-start-conversation-btn"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-block', marginTop: 20, fontSize: 13, fontWeight: 500, color: h ? NC.navy : NC.gold, background: h ? NC.gold : 'transparent', border: `1px solid ${NC.gold}`, padding: '9px 20px', textDecoration: 'none', fontFamily: FONT, transition: 'color 150ms ease, background 150ms ease', whiteSpace: 'nowrap' }}>
      Start a Conversation
    </Anchor>
  );
}

function NLegalLink({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <Anchor href={href || '#'} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontSize: 11, fontWeight: 300, color: h ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.40)', textDecoration: 'none', fontFamily: FONT, transition: 'color 150ms ease' }}>
      {children}
    </Anchor>
  );
}

export default function SiteFooter() {
  return (
    <footer data-testid="site-footer" style={{ background: NC.navy900, fontFamily: FONT, borderTop: `1px solid ${NC.gold}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px 64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px 40px' }}>

        <div style={{ maxWidth: 340 }}>
          <Anchor href="index.html" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img src="/uploads/powers-logo-refined-for-dark-backgrounds-2026.png" alt="POWERS" style={{ width: 140, height: 'auto', display: 'block', marginBottom: 16 }} />
          </Anchor>
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.10em', color: NC.gold, fontFamily: FONT, marginBottom: 14 }}>
            {/* Two-span structure: each sentence is unbreakable, but the
                container can wrap between them. Result: at any column
                width that fits both sentences, the tagline reads on one
                line; at any narrower width, the break always lands
                between the sentences and never inside one. */}
            <span style={{ whiteSpace: 'nowrap' }}>Strong Execution.</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>Strong Performance.</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.60)', fontFamily: FONT, margin: 0 }}>
            Management consulting for manufacturers who need performance that holds across teams, shifts, sites, and holdings.
          </p>
          <NLinkedIn />
        </div>

        <div>
          <NFooterColHeader>Results</NFooterColHeader>
          <NFooterLink href="approach.html" dataTestId="footer-approach">Approach</NFooterLink>
          <NFooterLink href="discovery-process.html" dataTestId="footer-discovery">Discovery Process</NFooterLink>
          <NFooterLink href="industries-served.html" dataTestId="footer-industries">Industries Served</NFooterLink>
          <NFooterLink href="case-studies.html" dataTestId="footer-case-studies">Case Studies</NFooterLink>
        </div>

        <div>
          <NFooterColHeader>About</NFooterColHeader>
          <NFooterLink href="history.html" dataTestId="footer-history">History</NFooterLink>
          <NFooterLink href="leadership.html" dataTestId="footer-leadership">Leadership</NFooterLink>
          <NFooterLink href="company-news.html" dataTestId="footer-company-news">Company News</NFooterLink>
          <NFooterLink href="careers.html" dataTestId="footer-careers">Careers</NFooterLink>
        </div>

        <div>
          <NFooterColHeader>Let&apos;s Talk</NFooterColHeader>
          <a href="tel:+16789714711" style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)', textDecoration: 'none', fontFamily: FONT, padding: '4px 0', display: 'block' }}>+1 678-971-4711</a>
          <a href="mailto:info@thepowerscompany.com" style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)', textDecoration: 'none', fontFamily: FONT, padding: '4px 0', display: 'block' }}>info@thepowerscompany.com</a>
          <div style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)', fontFamily: FONT, padding: '4px 0', lineHeight: 1.5 }}>1801 Peachtree St NE, Suite 200<br />Atlanta, GA 30309</div>
          <NFooterGhostBtn />
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px 40px' }}>
        <div style={{ height: 1, background: 'rgba(234,187,113,0.20)', marginBottom: 20 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 12px' }}>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)', fontFamily: FONT }}>Copyright 2025 The POWERS Company, Inc. All Rights Reserved.</span>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <NLegalLink>Sitemap</NLegalLink>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <NLegalLink>Privacy Policy</NLegalLink>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)', fontFamily: FONT }}>Powered by <NLegalLink>Method Marketing</NLegalLink></span>
        </div>
      </div>
    </footer>
  );
}
