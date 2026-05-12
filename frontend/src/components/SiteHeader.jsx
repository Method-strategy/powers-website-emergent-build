import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toRoute } from '../lib/routes';

const FONT = "'proxima-nova','Proxima Nova',-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif";

const NC = {
  navy:    '#183a61',
  navy900: '#0d2442',
  navy400: '#4a6a8a',
  gold:    '#eabb71',
  gold50:  '#fdf6e8',
  gold600: '#c9963e',
  white:   '#ffffff',
  gray50:  '#f5f5f3',
  gray100: '#e8e8e4',
  gray400: '#888884',
};

const RESULTS_LEFT = {
  topLinks: [
    { label: 'Approach',          href: 'approach.html' },
    { label: 'Discovery Process', href: 'discovery-process.html' },
    { label: 'Industries Served', href: 'industries-served.html' },
    { label: 'Case Studies',      href: 'case-studies.html' },
  ],
};
const RESULTS_RIGHT = {
  groupLabel: 'Expertise Areas',
  subLinks: [
    { label: 'Operational Readiness and Discipline',              href: 'operational-readiness.html' },
    { label: 'Frontline Capability and Workforce Readiness',      href: 'frontline-leadership.html' },
    { label: 'Equipment Reliability and Maintenance Performance', href: 'equipment-reliability.html' },
    { label: 'Supply Chain and Distribution Performance',         href: 'supply-chain.html' },
  ],
};
const ABOUT_LINKS = [
  { label: 'History',       href: 'history.html' },
  { label: 'Leadership',    href: 'leadership.html' },
  { label: 'Company News',  href: 'company-news.html' },
  { label: 'Careers',       href: 'careers.html' },
];

// Universal Link that handles internal/external/mailto/tel
function Anchor({ href, style, children, onMouseEnter, onMouseLeave, ...rest }) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return <a href={href || '#'} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>{children}</a>;
  }
  return <Link to={toRoute(href)} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>{children}</Link>;
}

function NMegaLink({ href, children, dataTestId }) {
  const [h, setH] = useState(false);
  return (
    <Anchor href={href}
      data-testid={dataTestId}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'block', padding: '7px 0',
        fontSize: 14, fontWeight: 400,
        color: h ? NC.gold : NC.navy,
        textDecoration: 'none', fontFamily: FONT,
        transition: 'color 130ms ease',
        borderLeft: h ? `2px solid ${NC.gold}` : '2px solid transparent',
        paddingLeft: h ? 8 : 0,
      }}>{children}</Anchor>
  );
}

function NMegaSubLink({ href, children, dataTestId }) {
  const [h, setH] = useState(false);
  return (
    <Anchor href={href}
      data-testid={dataTestId}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'block', padding: '6px 0 6px 16px',
        fontSize: 13, fontWeight: 300,
        color: h ? NC.gold : NC.navy,
        textDecoration: 'none', fontFamily: FONT,
        transition: 'color 130ms ease',
        borderLeft: `1px solid ${h ? NC.gold : NC.gray100}`,
      }}>{children}</Anchor>
  );
}

function NNavLink({ label, hasMega, isOpen, onMouseEnter, onMouseLeave, href, dataTestId }) {
  const [h, setH] = useState(false);
  const active = h || isOpen;
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => { setH(true); onMouseEnter && onMouseEnter(); }}
      onMouseLeave={() => { setH(false); onMouseLeave && onMouseLeave(); }}
    >
      <Anchor href={href || '#'} data-testid={dataTestId} style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 13, fontWeight: 400,
        color: active ? NC.gold : NC.navy,
        textDecoration: 'none', fontFamily: FONT,
        letterSpacing: '0.01em', transition: 'color 150ms ease',
        padding: '4px 0', whiteSpace: 'nowrap',
      }}>
        {label}
        {hasMega && (
          <svg width="9" height="5" viewBox="0 0 9 5" fill="none"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease', marginTop: 1 }}>
            <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </Anchor>
    </div>
  );
}

function NGhostBtn() {
  const [h, setH] = useState(false);
  return (
    <Anchor href="contact.html"
      data-testid="header-lets-talk-btn"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontSize: 13, fontWeight: 400,
        color: h ? NC.gold : NC.navy,
        border: `1px solid ${h ? NC.gold : NC.navy}`,
        padding: '7px 20px', textDecoration: 'none',
        fontFamily: FONT, letterSpacing: '0.01em',
        transition: 'color 150ms ease, border-color 150ms ease',
        whiteSpace: 'nowrap', lineHeight: 1,
      }}>Let&apos;s Talk</Anchor>
  );
}

function NSearchBtn() {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} aria-label="Search"
      data-testid="header-search-btn"
      style={{
        width: 27, height: 27,
        border: `1px solid ${h ? NC.gold : NC.gray100}`,
        borderRadius: 4, background: h ? NC.gold50 : 'transparent',
        color: h ? NC.navy : NC.navy400, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 160ms ease', flexShrink: 0,
      }}>
      <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

function NDrawer({ open, onClose }) {
  const [openSection, setOpenSection] = useState(null);

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(24,58,97,0.35)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', zIndex: 300,
      }} />
      <div data-testid="mobile-drawer" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(320px, 85vw)',
        background: NC.white,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
        zIndex: 301, display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: `1px solid ${NC.gold}`,
        }}>
          <Anchor href="index.html" style={{ textDecoration: 'none' }}>
            <img src="/uploads/powers-logo-refined-2026.png" alt="POWERS" style={{ height: 40, width: 'auto' }} />
          </Anchor>
          <button onClick={onClose} aria-label="Close" data-testid="mobile-drawer-close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: NC.navy, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            {
              label: 'Results',
              items: [
                { type: 'link', label: 'Approach',          href: 'approach.html' },
                { type: 'link', label: 'Discovery Process', href: 'discovery-process.html' },
                { type: 'link', label: 'Industries Served', href: 'industries-served.html' },
                { type: 'link', label: 'Case Studies',      href: 'case-studies.html' },
                { type: 'group', label: 'Expertise Areas', children: [
                  { label: 'Operational Readiness and Discipline',              href: 'operational-readiness.html' },
                  { label: 'Frontline Capability and Workforce Readiness',      href: 'frontline-leadership.html' },
                  { label: 'Equipment Reliability and Maintenance Performance', href: 'equipment-reliability.html' },
                  { label: 'Supply Chain and Distribution Performance',         href: 'supply-chain.html' },
                ]},
              ],
            },
            {
              label: 'About',
              items: [
                { type: 'link', label: 'History',      href: 'history.html' },
                { type: 'link', label: 'Leadership',   href: 'leadership.html' },
                { type: 'link', label: 'Company News', href: 'company-news.html' },
                { type: 'link', label: 'Careers',      href: 'careers.html' },
              ],
            },
          ].map((section) => (
            <div key={section.label}>
              <button
                data-testid={`mobile-section-${section.label.toLowerCase()}`}
                onClick={() => setOpenSection(openSection === section.label ? null : section.label)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '15px 24px', color: NC.navy, fontSize: 15, fontWeight: 400,
                  cursor: 'pointer', fontFamily: FONT, borderBottom: `1px solid ${NC.gray100}`,
                }}>
                {section.label}
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none"
                  style={{ transform: openSection === section.label ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }}>
                  <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openSection === section.label && (
                <div style={{ background: NC.gray50, borderBottom: `1px solid ${NC.gray100}` }}>
                  {section.items.map((item, i) => (
                    item.type === 'link' ? (
                      <Anchor key={i} href={item.href} onClick={onClose}
                        style={{ display: 'block', padding: '11px 24px 11px 32px', fontSize: 14, fontWeight: 400, color: NC.navy, textDecoration: 'none', fontFamily: FONT, borderBottom: `1px solid ${NC.gray100}` }}>
                        {item.label}
                      </Anchor>
                    ) : (
                      <div key={i}>
                        <div style={{ padding: '10px 24px 6px 32px', fontSize: 14, fontWeight: 400, color: NC.navy, fontFamily: FONT }}>{item.label}</div>
                        {item.children.map((child, ci) => (
                          <Anchor key={ci} href={child.href} onClick={onClose}
                            style={{ display: 'block', padding: '9px 24px 9px 44px', fontSize: 13, fontWeight: 300, color: NC.navy, textDecoration: 'none', fontFamily: FONT, borderBottom: ci < item.children.length - 1 ? `1px solid ${NC.gray100}` : 'none' }}>
                            {child.label}
                          </Anchor>
                        ))}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}

          <Anchor href="insights.html" onClick={onClose}
            style={{ display: 'block', padding: '15px 24px', fontSize: 15, fontWeight: 400, color: NC.navy, textDecoration: 'none', fontFamily: FONT, borderBottom: `1px solid ${NC.gray100}` }}>
            Insights
          </Anchor>
          <Anchor href="contact.html" onClick={onClose}
            style={{ display: 'block', padding: '15px 24px', fontSize: 15, fontWeight: 500, color: NC.gold, textDecoration: 'none', fontFamily: FONT }}>
            Let&apos;s Talk
          </Anchor>
        </nav>
      </div>
    </>
  );
}

export default function SiteHeader({ fixed = true }) {
  const [openMega, setOpenMega] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef(null);
  const open   = (name) => { clearTimeout(closeTimer.current); setOpenMega(name); };
  const sched  = ()     => { closeTimer.current = setTimeout(() => setOpenMega(null), 140); };
  const cancel = ()     => clearTimeout(closeTimer.current);

  const headerWrapStyle = fixed
    ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: NC.white, borderBottom: `1px solid ${NC.gold}`, fontFamily: FONT, overflow: 'visible' }
    : { background: NC.white, borderBottom: `1px solid ${NC.gold}`, fontFamily: FONT, overflow: 'visible' };

  return (
    <header data-testid="site-header" style={headerWrapStyle}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', height: 84, display: 'flex', alignItems: 'center', gap: 48 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <Anchor href="index.html" data-testid="header-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/uploads/powers-logo-refined-2026.png" alt="POWERS" style={{ height: 57, width: 'auto', display: 'block' }} />
          </Anchor>
          <span style={{ fontSize: 12, fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.01em', color: NC.navy400, lineHeight: 1, whiteSpace: 'nowrap', fontFamily: FONT }} className="nav-tagline">
            Make Performance Stick
          </span>
        </div>

        <div style={{ flex: 1 }} />

        <nav className="nav-desktop" onMouseLeave={sched} onMouseEnter={cancel}
          style={{ display: 'flex', alignItems: 'center', gap: 44, position: 'relative' }}>
          <div style={{ position: 'relative' }} onMouseEnter={() => open('results')}>
            <NNavLink label="Results" hasMega isOpen={openMega === 'results'} dataTestId="nav-results" />
          </div>
          <div style={{ position: 'relative' }} onMouseEnter={() => open('about')}>
            <NNavLink label="About" hasMega isOpen={openMega === 'about'} dataTestId="nav-about" />
          </div>
          <NNavLink label="Insights" href="insights.html" onMouseEnter={() => setOpenMega(null)} dataTestId="nav-insights" />
          <NGhostBtn />
        </nav>

        <div className="nav-desktop" style={{ flexShrink: 0 }}><NSearchBtn /></div>

        <button className="nav-mobile" onClick={() => setDrawerOpen(true)} aria-label="Open menu" data-testid="mobile-hamburger"
          style={{ width: 40, height: 40, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: NC.navy, padding: 0 }}>
          <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
            <line x1="0" y1="1.75" x2="22" y2="1.75" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="0" y1="7.5"  x2="22" y2="7.5"  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="0" y1="13.25" x2="22" y2="13.25" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div onMouseEnter={cancel} onMouseLeave={sched} style={{ position: 'relative', marginTop: -1 }}>
        <div data-testid="mega-results" style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          pointerEvents: openMega === 'results' ? 'auto' : 'none', zIndex: 200,
        }}>
          <div style={{
            width: 640, background: NC.white,
            border: `1px solid ${NC.gray100}`, borderTop: `1px solid ${NC.gold}`,
            boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
            opacity: openMega === 'results' ? 1 : 0,
            transform: openMega === 'results' ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 180ms ease, transform 180ms ease',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
          }}>
            <div style={{ padding: '28px 28px 32px', borderRight: `1px solid ${NC.gray100}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {RESULTS_LEFT.topLinks.map((l, i) => <NMegaLink key={i} href={l.href} dataTestId={`mega-results-${l.label.toLowerCase().replace(/\s+/g, '-')}`}>{l.label}</NMegaLink>)}
            </div>
            <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 400, color: NC.navy, fontFamily: FONT, padding: '7px 0', marginBottom: 2 }}>
                {RESULTS_RIGHT.groupLabel}
              </div>
              {RESULTS_RIGHT.subLinks.map((l, i) => <NMegaSubLink key={i} href={l.href}>{l.label}</NMegaSubLink>)}
            </div>
          </div>
        </div>

        <div data-testid="mega-about" style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          pointerEvents: openMega === 'about' ? 'auto' : 'none', zIndex: 200,
        }}>
          <div style={{
            width: 260, background: NC.white,
            border: `1px solid ${NC.gray100}`, borderTop: `1px solid ${NC.gold}`,
            boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
            opacity: openMega === 'about' ? 1 : 0,
            transform: openMega === 'about' ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 180ms ease, transform 180ms ease',
          }}>
            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {ABOUT_LINKS.map((l, i) => <NMegaLink key={i} href={l.href} dataTestId={`mega-about-${l.label.toLowerCase().replace(/\s+/g, '-')}`}>{l.label}</NMegaLink>)}
            </div>
          </div>
        </div>
      </div>

      <NDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
