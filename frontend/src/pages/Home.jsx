/* eslint-disable */
/* This file is a lossless port of the legacy index.html homepage.
   Original lived as inline <script type="text/babel"> JSX. Do not refactor.
   Visual edits should be made in /tmp/powers-website/powers-website-evolution/index.html
   first, then re-generate via scripts/convert_homepage.py. */
import React, { useState, useRef, useEffect } from 'react';
import { typo } from '../lib/typo';

/* ── Tokens ── */
const C = {
  navy:    '#183a61',
  navy900: '#0d2442',
  navy400: '#4a6a8a',
  gold:    '#eabb71',
  gold50:  '#fdf6e8',
  gold600: '#c9963e',
  body:    '#3a3a38',
  white:   '#ffffff',
  gray50:  '#f5f5f3',
  gray100: '#e8e8e4',
  gray400: '#888884',
};

/* ── MEGA MENU — RESULTS ── */
function MegaMenuResults({ visible }) {
  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: '50%',
      width: 640,
      background: C.white,
      border: `1px solid ${C.gray100}`,
      borderTop: `1px solid ${C.gray100}`,
      boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-4px)',
      transition: 'opacity 180ms ease, transform 180ms ease',
      zIndex: 200,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
    }}>
      {/* Left col */}
      <div style={{
        padding: '28px 28px 32px',
        borderRight: `1px solid ${C.gray100}`,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <MegaLink href="approach.html">Approach</MegaLink>
        <div style={{ height: 8 }} />
        <MegaLink href="discovery-process.html">Discovery Process</MegaLink>
        <div style={{ height: 8 }} />
        <MegaLink href="industries-served.html">Industries Served</MegaLink>
        <div style={{ height: 8 }} />
        <MegaLink href="case-studies.html">Case Studies</MegaLink>
      </div>

      {/* Right col */}
      <div style={{
        padding: '28px 28px 32px',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 400,
          color: C.navy,
          fontFamily: 'inherit',
          padding: '7px 0',
          marginBottom: 2,
        }}>
          Expertise Areas
        </div>
        {[
          { label: 'Operational Readiness and Discipline',            href: 'operational-readiness.html' },
          { label: 'Frontline Capability and Workforce Readiness',    href: 'frontline-leadership.html' },
          { label: 'Equipment Reliability and Maintenance Performance', href: 'equipment-reliability.html' },
          { label: 'Supply Chain and Distribution Performance',       href: 'supply-chain.html' },
        ].map((item, i) => (
          <MegaSubLink key={i} href={item.href}>{item.label}</MegaSubLink>
        ))}
      </div>
    </div>
  );
}

/* ── MEGA MENU — RESULTS — STATIC (for demo) ── */
function MegaMenuResultsStatic() {
  return (
    <div style={{
      width: 640,
      background: C.white,
      border: `1px solid ${C.gray100}`,
      borderTop: `1px solid ${C.gray100}`,
      boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
    }}>
      <div style={{
        padding: '28px 28px 32px',
        borderRight: `1px solid ${C.gray100}`,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <MegaLink href="approach.html">Approach</MegaLink>
        <div style={{ height: 8 }} />
        <MegaLink href="discovery-process.html">Discovery Process</MegaLink>
        <div style={{ height: 8 }} />
        <MegaLink href="industries-served.html">Industries Served</MegaLink>
        <div style={{ height: 8 }} />
        <MegaLink href="case-studies.html">Case Studies</MegaLink>
      </div>
      <div style={{
        padding: '28px 28px 32px',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 400,
          color: C.navy,
          fontFamily: 'inherit', marginBottom: 2, padding: '7px 0',
        }}>Expertise Areas</div>
        {[
          { label: 'Operational Readiness and Discipline',            href: 'operational-readiness.html' },
          { label: 'Frontline Capability and Workforce Readiness',    href: 'frontline-leadership.html' },
          { label: 'Equipment Reliability and Maintenance Performance', href: 'equipment-reliability.html' },
          { label: 'Supply Chain and Distribution Performance',       href: 'supply-chain.html' },
        ].map((item, i) => (
          <MegaSubLink key={i} href={item.href}>{item.label}</MegaSubLink>
        ))}
      </div>
    </div>
  );
}

function MegaMenuAboutStatic() {
  return (
    <div style={{
      width: 260,
      background: C.white,
      border: `1px solid ${C.gray100}`,
      borderTop: `1px solid ${C.gray100}`,
      boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
    }}>
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          {label:'History',href:'history.html'},
          {label:'Leadership',href:'leadership.html'},
          {label:'Company News',href:'company-news.html'},
          {label:'Careers',href:'careers.html'},
        ].map((l, i) => <MegaLink key={i} href={l.href}>{l.label}</MegaLink>)}
      </div>
    </div>
  );
}
function MegaMenuAbout({ visible }) {
  const links = [{label:'History',href:'history.html'},{label:'Leadership',href:'leadership.html'},{label:'Company News',href:'company-news.html'},{label:'Careers',href:'careers.html'}];
  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: '50%',
      width: 260,
      background: C.white,
      border: `1px solid ${C.gray100}`,
      borderTop: `2px solid ${C.gold}`,
      boxShadow: '0 8px 32px rgba(24,58,97,0.10)',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-4px)',
      transition: 'opacity 180ms ease, transform 180ms ease',
      zIndex: 200,
      border: `1px solid ${C.gray100}`,
      borderTop: `1px solid ${C.gray100}`,
      boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
    }}>
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {links.map((l, i) => <MegaLink key={i} href={l.href}>{l.label}</MegaLink>)}
      </div>
    </div>
  );
}

function MegaLink({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href || '#'}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'block',
        padding: '7px 0',
        fontSize: 14,
        fontWeight: 400,
        color: h ? C.gold : C.navy,
        textDecoration: 'none',
        fontFamily: 'inherit',
        transition: 'color 130ms ease',
        borderLeft: h ? `2px solid ${C.gold}` : '2px solid transparent',
        paddingLeft: h ? 8 : 0,
      }}
    >
      {children}
    </a>
  );
}

function MegaSubLink({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href || '#'}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'block',
        padding: '6px 0 6px 16px',
        fontSize: 13,
        fontWeight: 300,
        color: h ? C.gold : C.navy,
        textDecoration: 'none',
        fontFamily: 'inherit',
        transition: 'color 130ms ease',
        borderLeft: `1px solid ${h ? C.gold : C.gray100}`,
      }}
    >
      {children}
    </a>
  );
}

/* ── NAV LINK ── */
function NavLink({ label, hasMega, onMouseEnter, onMouseLeave, isOpen, href }) {
  const [h, setH] = useState(false);
  const active = h || isOpen;
  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => { setH(true); onMouseEnter && onMouseEnter(); }}
      onMouseLeave={() => { setH(false); onMouseLeave && onMouseLeave(); }}
    >
      <a href={href || '#'} style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 13,
        fontWeight: 400,
        color: active ? C.gold : C.navy,
        textDecoration: 'none',
        fontFamily: 'inherit',
        letterSpacing: '0.01em',
        transition: 'color 150ms ease',
        padding: '4px 0',
        whiteSpace: 'nowrap',
      }}>
        {label}
        {hasMega && (
          <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 180ms ease',
            marginTop: 1,
          }}>
            <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </a>
    </div>
  );
}

/* ── GHOST BUTTON ── */
function GhostBtn({ label }) {
  const [h, setH] = useState(false);
  return (
    <a
      href="contact.html"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block',
        fontSize: 13,
        fontWeight: 400,
        color: h ? C.gold : C.navy,
        border: `1px solid ${h ? C.gold : C.navy}`,
        padding: '7px 20px',
        textDecoration: 'none',
        fontFamily: 'inherit',
        letterSpacing: '0.01em',
        transition: 'color 150ms ease, border-color 150ms ease',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      {label}
    </a>
  );
}

/* ── SEARCH BUTTON ── */
function SearchBtn() {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      aria-label="Search"
      style={{
        width: 27, height: 27,
        border: `1px solid ${h ? C.gold : C.gray100}`,
        borderRadius: 4,
        background: h ? C.gold50 : 'transparent',
        color: h ? C.navy : C.navy400,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 160ms ease',
        flexShrink: 0,
      }}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

/* ── HAMBURGER ── */
function Hamburger({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      style={{
        width: 40, height: 40,
        background: 'none', border: 'none',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.navy,
        padding: 0,
      }}
    >
      <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
        <line x1="0" y1="1.75" x2="22" y2="1.75" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="0" y1="7.5"  x2="22" y2="7.5"  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="0" y1="13.25" x2="22" y2="13.25" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

/* ── MOBILE DRAWER ── */
function Drawer({ open, onClose }) {
  const [openSection, setOpenSection] = useState(null);

  const sections = {
    Results: [
      { type: 'link',  label: 'Approach' },
      { type: 'link',  label: 'Discovery Process' },
      { type: 'group', label: 'Expertise Areas', children: [
        'Operational Readiness and Discipline',
        'Frontline Capability and Workforce Readiness',
        'Equipment Reliability and Maintenance Performance',
        'Supply Chain and Distribution Performance',
      ]},
      { type: 'link', label: 'Industries Served' },
      { type: 'link', label: 'Case Studies', href: 'case-studies.html' },
    ],
    About: [
      { type: 'link', label: 'History',      href: 'history.html' },
      { type: 'link', label: 'Leadership',   href: 'leadership.html' },
      { type: 'link', label: 'Company News', href: 'company-news.html' },
      { type: 'link', label: 'Careers',      href: 'careers.html' },
    ],
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(24,58,97,0.35)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease',
        zIndex: 300,
      }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(320px, 85vw)',
        background: C.white,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
        zIndex: 301,
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        {/* Drawer top */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: `1px solid ${C.gold}`,
        }}>
          <a href="index.html" style={{ textDecoration: 'none' }}>
            <img src="/uploads/powers-logo-refined-2026.png" alt="POWERS" style={{ height: 40, width: 'auto' }} />
          </a>
          <button onClick={onClose} aria-label="Close" style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: C.navy, width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {/* Results accordion */}
          {['Results', 'About'].map((section) => (
            <div key={section}>
              <button
                onClick={() => setOpenSection(openSection === section ? null : section)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '15px 24px',
                  color: C.navy, fontSize: 15, fontWeight: 400,
                  cursor: 'pointer', fontFamily: 'inherit',
                  borderBottom: `1px solid ${C.gray100}`,
                }}
              >
                {section}
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{
                  transform: openSection === section ? 'rotate(180deg)' : 'none',
                  transition: 'transform 180ms ease',
                }}>
                  <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openSection === section && (
                <div style={{ background: C.gray50, borderBottom: `1px solid ${C.gray100}` }}>
                  {sections[section].map((item, i) => (
                    item.type === 'link' ? (
                      <a key={i} href={item.href || '#'} style={{
                        display: 'block', padding: '11px 24px 11px 32px',
                        fontSize: 14, fontWeight: 400, color: C.navy,
                        textDecoration: 'none', fontFamily: 'inherit',
                        borderBottom: `1px solid ${C.gray100}`,
                      }}>{item.label}</a>
                    ) : (
                      <div key={i}>
                        <div style={{
                          padding: '10px 24px 6px 32px',
                          fontSize: 14, fontWeight: 400,
                          color: C.navy, fontFamily: 'inherit',
                        }}>{item.label}</div>
                        {item.children.map((child, ci) => (
                          <a key={ci} href="#" style={{
                            display: 'block', padding: '9px 24px 9px 44px',
                            fontSize: 13, fontWeight: 300, color: C.navy,
                            textDecoration: 'none', fontFamily: 'inherit',
                            borderBottom: ci < item.children.length - 1 ? `1px solid ${C.gray100}` : 'none',
                          }}>{child}</a>
                        ))}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}

          <a href="#" style={{
            display: 'block', padding: '15px 24px',
            fontSize: 15, fontWeight: 400, color: C.navy,
            textDecoration: 'none', fontFamily: 'inherit',
            borderBottom: `1px solid ${C.gray100}`,
          }}>Insights</a>

          <a href="#" style={{
            display: 'block', padding: '15px 24px',
            fontSize: 15, fontWeight: 500, color: C.gold,
            textDecoration: 'none', fontFamily: 'inherit',
          }}>Let's Talk</a>
        </nav>
      </div>
    </>
  );
}

/* ── HEADER ── */
function Header() {
  const [openMega, setOpenMega] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef(null);

  const open  = (name) => { clearTimeout(closeTimer.current); setOpenMega(name); };
  const sched = ()     => { closeTimer.current = setTimeout(() => setOpenMega(null), 140); };
  const cancel= ()     => clearTimeout(closeTimer.current);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: C.white,
      borderBottom: `1px solid ${C.gold}`,
      fontFamily: 'inherit',
      overflow: 'visible',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 48px',
        height: 84,
        display: 'flex',
        alignItems: 'center',
        gap: 48,
      }}>

        {/* Logo + tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <a href="index.html" style={{ textDecoration: 'none' }}>
            <img
              src="/uploads/powers-logo-refined-2026.png"
              alt="POWERS"
              style={{ height: 57, width: 'auto', display: 'block' }}
            />
          </a>
          <span className="tagline-text desktop-only" style={{
            fontSize: 12,
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.01em',
            color: C.navy400,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
            paddingTop: 1,
          }}>
            Strong Foundation. Strong Performance.
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop nav */}
        <nav
          className="desktop-only"
          onMouseLeave={sched}
          onMouseEnter={cancel}
          style={{ display: 'flex', alignItems: 'center', gap: 44, position: 'relative' }}
        >
          {/* Results — mega menu */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => open('results')}
          >
            <NavLink label="Results" hasMega isOpen={openMega === 'results'} />
          </div>

          {/* About — mega menu */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => open('about')}
          >
            <NavLink label="About" hasMega isOpen={openMega === 'about'} />
          </div>

          {/* Insights — direct link */}
          <NavLink label="Insights" href="insights.html" onMouseEnter={() => setOpenMega(null)} />
          <GhostBtn label="Let's Talk" />
        </nav>

        {/* Search button — desktop only */}
        <div className="desktop-only" style={{ flexShrink: 0 }}>
          <SearchBtn />
        </div>

        {/* Mobile hamburger */}
        <div className="mobile-only" style={{ alignItems: 'center' }}>
          <Hamburger onClick={() => setDrawerOpen(true)} />
        </div>
      </div>

      {/* Mega menus — anchored to header bottom edge, flush */}
      <div
        onMouseEnter={cancel}
        onMouseLeave={sched}
        style={{ position: 'relative', marginTop: -1 }}
      >
        {/* Results */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: openMega === 'results' ? 'auto' : 'none',
          zIndex: 200,
        }}>
          <div style={{
            width: 640,
            background: C.white,
            border: `1px solid ${C.gray100}`,
            borderTop: `1px solid ${C.gold}`,
            boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
            opacity: openMega === 'results' ? 1 : 0,
            transform: openMega === 'results' ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 180ms ease, transform 180ms ease',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}>
            <div style={{
              padding: '28px 28px 32px',
              borderRight: `1px solid ${C.gray100}`,
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <MegaLink href="approach.html">Approach</MegaLink>
              <div style={{ height: 8 }} />
              <MegaLink href="discovery-process.html">Discovery Process</MegaLink>
              <div style={{ height: 8 }} />
              <MegaLink href="industries-served.html">Industries Served</MegaLink>
              <div style={{ height: 8 }} />
              <MegaLink href="case-studies.html">Case Studies</MegaLink>
            </div>
            <div style={{
              padding: '28px 28px 32px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{
                fontSize: 14,
                fontWeight: 400,
                color: C.navy,
                fontFamily: 'inherit', marginBottom: 2, padding: '7px 0',
              }}>Expertise Areas</div>
              {[
                { label: 'Operational Readiness and Discipline',            href: 'operational-readiness.html' },
                { label: 'Frontline Capability and Workforce Readiness',    href: 'frontline-leadership.html' },
                { label: 'Equipment Reliability and Maintenance Performance', href: 'equipment-reliability.html' },
                { label: 'Supply Chain and Distribution Performance',       href: 'supply-chain.html' },
              ].map((item, i) => (
                <MegaSubLink key={i} href={item.href}>{item.label}</MegaSubLink>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: openMega === 'about' ? 'auto' : 'none',
          zIndex: 200,
        }}>
          <div style={{
            width: 260,
            background: C.white,
            border: `1px solid ${C.gray100}`,
            borderTop: `1px solid ${C.gold}`,
            boxShadow: '0 8px 24px rgba(24,58,97,0.08)',
            opacity: openMega === 'about' ? 1 : 0,
            transform: openMega === 'about' ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 180ms ease, transform 180ms ease',
          }}>
            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
              {label:'History',href:'history.html'},
              {label:'Leadership',href:'leadership.html'},
              {label:'Company News',href:'company-news.html'},
              {label:'Careers',href:'careers.html'},
            ].map((l, i) => <MegaLink key={i} href={l.href}>{l.label}</MegaLink>)}
            </div>
          </div>
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

/* ── HERO ── */
function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: 700,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: C.navy900,
      overflow: 'hidden',
    }}>

      {/* Video */}
      {!isMobile && (
        <video
          autoPlay muted loop playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1000ms ease',
            zIndex: 0,
          }}
        >
          <source src="https://www.thepowerscompany.com/wp-content/uploads/2025/10/POWERS-Banner-Video-2026.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay: navy at 60% */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(24,58,97,0.60)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1280,
        margin: '0 auto',
        padding: '100px 48px 0',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 0,
      }}>

        {/* Eyebrow */}
        <div style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: C.gold,
          fontFamily: 'inherit',
          marginBottom: 24,
        }}>
          Operations Performance Consulting
        </div>

        {/* H1 */}
        <h1 style={{
          fontSize: 'clamp(36px, 4.2vw, 56px)',
          fontWeight: 800,
          lineHeight: 1.08,
          color: C.white,
          fontFamily: 'inherit',
          maxWidth: 700,
          margin: '0 0 28px',
          textWrap: 'pretty',
        }}>
          Strong Operations Don&rsquo;t Happen. They Get Built on Strong Roots.
        </h1>

        {/* Subhead */}
        <p style={{
          fontSize: 18,
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.80)',
          fontFamily: 'inherit',
          maxWidth: 600,
          margin: '0 0 44px',
          textWrap: 'pretty',
        }}>
          POWERS builds execution capability. The discipline, leadership, and accountability that make performance durable regardless of conditions. With{'\u00A0'}your people, on the floor, where value gets created.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <PrimaryCTA />
          <SecondaryCTA />
        </div>
      </div>

    </section>
  );
}

function PrimaryCTA() {
  const [h, setH] = useState(false);
  return (
    <a
      href="contact.html"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block',
        fontSize: 14,
        fontWeight: 600,
        color: C.navy,
        background: h ? C.gold600 : C.gold,
        padding: '14px 32px',
        textDecoration: 'none',
        fontFamily: 'inherit',
        letterSpacing: '0.02em',
        transition: 'background 160ms ease',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      Start a Conversation
    </a>
  );
}

function SecondaryCTA() {
  const [h, setH] = useState(false);
  return (
    <a
      href="case-studies.html"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 14,
        fontWeight: 400,
        color: C.white,
        textDecoration: 'none',
        fontFamily: 'inherit',
        letterSpacing: '0.02em',
        transition: 'gap 160ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      See Our Results
      <span style={{
        display: 'inline-block',
        transform: h ? 'translateX(3px)' : 'translateX(0)',
        transition: 'transform 160ms ease',
      }}>→</span>
    </a>
  );
}

/* ── SECTION 5 — VALUE CHAIN DIAGRAM ── */
const VALUE_CHAIN = [
  {
    id: 'supply',
    label: 'Supply Chain',
    powers: true,
    challenge: 'Supplier variability and inbound disruptions absorb management bandwidth and create production instability.',
    response: 'POWERS installs supplier performance standards and internal scheduling disciplines that absorb variability before it reaches the floor.',
  },
  {
    id: 'inbound',
    label: 'Inbound Logistics',
    powers: true,
    challenge: 'Materials arrive inconsistently. Receiving backlogs and inventory inaccuracies create unnecessary downtime and expediting costs.',
    response: 'We establish receiving standards, inventory accuracy routines, and material flow disciplines that feed production reliably.',
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing & Operations',
    powers: true,
    challenge: 'Performance varies by shift, by supervisor, and by day. The operation runs on heroics instead of systems.',
    response: 'POWERS builds the operating system — standards, routines, accountability structures — that makes performance consistent regardless of who is on shift.',
  },
  {
    id: 'outbound',
    label: 'Outbound Logistics',
    powers: true,
    challenge: 'On-time delivery suffers when production variability hits the shipping dock. Customer commitments become reactive rather than planned.',
    response: 'We connect production performance to outbound execution — building the scheduling and coordination disciplines that make delivery commitments holdable.',
  },
  {
    id: 'marketing',
    label: 'Marketing & Sales',
    powers: false,
    challenge: null,
    response: null,
  },
  {
    id: 'aftersales',
    label: 'After-Sales Service',
    powers: false,
    challenge: null,
    response: null,
  },
];

function ValueChainDiagram() {
  const [active, setActive] = useState(null);
  const [wavePos, setWavePos] = useState(0);
  const animRef = useRef(null);

  // Wave animation across POWERS segments
  useEffect(() => {
    let start = null;
    const duration = 3000;
    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = (ts - start) % duration;
      setWavePos(elapsed / duration);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const activeData = VALUE_CHAIN.find(s => s.id === active);

  return (
    <section style={{
      background: C.gray50,
      fontFamily: 'inherit',
      padding: '88px 0 0',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 48px',
      }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: C.gold,
          marginBottom: 16, fontFamily: 'inherit',
        }}>The Value Chain</div>

        {/* Section headline */}
        <h2 style={{
          fontSize: 'clamp(24px, 2.4vw, 32px)',
          fontWeight: 700,
          lineHeight: 1.2,
          color: C.navy,
          fontFamily: 'inherit',
          margin: '0 0 56px',
          maxWidth: 640,
          textWrap: 'pretty',
        }}>
          Where in Your Operations Does Performance Break Down?
        </h2>
      </div>

      {/* Segments row */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 0,
        position: 'relative',
      }}>
        {VALUE_CHAIN.map((seg, i) => {
          const isActive = active === seg.id;
          // Wave highlight: compute local wave brightness for POWERS segments
          const powersSegments = VALUE_CHAIN.filter(s => s.powers);
          const powersIdx = powersSegments.findIndex(s => s.id === seg.id);
          const waveIntensity = seg.powers
            ? Math.max(0, Math.sin((wavePos * 2 * Math.PI) - (powersIdx / powersSegments.length) * Math.PI * 2) * 0.5 + 0.5)
            : 0;

          return (
            <div
              key={seg.id}
              onMouseEnter={() => seg.powers && setActive(seg.id)}
              onMouseLeave={() => setActive(null)}
              style={{
                padding: '24px 20px 28px',
                background: isActive
                  ? C.gold
                  : seg.powers
                    ? `rgba(247,228,184,${0.3 + waveIntensity * 0.25})`
                    : C.white,
                borderTop: seg.powers
                  ? `3px solid ${isActive ? C.gold600 : C.gold}`
                  : `3px solid ${C.gray100}`,
                borderRight: i < 5 ? `1px solid ${C.gray100}` : 'none',
                cursor: seg.powers ? 'pointer' : 'default',
                transition: 'background 200ms ease',
                position: 'relative',
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* POWERS EXPERTISE badge */}
              {seg.powers && (
                <div style={{
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: isActive ? C.navy : C.gold600,
                  fontFamily: 'inherit',
                  marginBottom: 12,
                }}>
                  POWERS Expertise
                </div>
              )}
              {!seg.powers && <div style={{ height: 21 }} />}

              {/* Segment label */}
              <div style={{
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                lineHeight: 1.3,
                color: isActive ? C.navy : seg.powers ? C.navy : C.gray400,
                fontFamily: 'inherit',
                transition: 'color 200ms ease',
                flex: 1,
                display: 'flex',
                alignItems: 'flex-end',
              }}>
                {seg.label}
              </div>

              {/* Hover indicator */}
              {seg.powers && (
                <div style={{
                  marginTop: 14,
                  fontSize: 11,
                  color: isActive ? C.navy : 'rgba(234,187,113,0.6)',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'color 200ms ease',
                }}>
                  {isActive ? '↑ collapse' : '↓ explore'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 48px',
        overflow: 'hidden',
        maxHeight: activeData ? 300 : 0,
        transition: 'max-height 300ms ease',
      }}>
        {activeData && (
          <div style={{
            background: C.navy,
            padding: '36px 40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
          }}>
            {/* Challenge */}
            <div>
              <div style={{
                fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(234,187,113,0.7)',
                marginBottom: 12, fontFamily: 'inherit',
              }}>The Challenge</div>
              <p style={{
                fontSize: 15, fontWeight: 300, lineHeight: 1.65,
                color: 'rgba(255,255,255,0.85)', fontFamily: 'inherit', margin: 0,
              }}>{activeData.challenge}</p>
            </div>
            {/* POWERS Response */}
            <div>
              <div style={{
                fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: C.gold,
                marginBottom: 12, fontFamily: 'inherit',
              }}>What POWERS Builds</div>
              <p style={{
                fontSize: 15, fontWeight: 300, lineHeight: 1.65,
                color: C.white, fontFamily: 'inherit', margin: 0,
              }}>{activeData.response}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom padding */}
      <div style={{ height: 88 }} />
    </section>
  );
}

/* ── SECTION 4 — STRATEGY TO EXECUTION ── */
function ImagePlaceholder({ label }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '4 / 3',
      background: C.navy,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(234,187,113,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(234,187,113,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <span style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'rgba(234,187,113,0.5)',
        fontFamily: 'inherit', position: 'relative', zIndex: 1,
        textAlign: 'center', padding: '0 24px',
      }}>{label}</span>
    </div>
  );
}

function StrategyBlock({ imageLeft, eyebrow, headline, body, italic }) {
  const textCol = (
    <div style={{
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: 20,
      padding: imageLeft ? '0 0 0 48px' : '0 48px 0 0',
    }}>
      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: C.gold,
        fontFamily: 'inherit',
      }}>{eyebrow}</div>
      <h2 style={{
        fontSize: 'clamp(24px, 2.4vw, 32px)',
        fontWeight: 700,
        lineHeight: 1.2,
        color: C.navy,
        fontFamily: 'inherit',
        margin: 0,
        textWrap: 'pretty',
      }}>{headline}</h2>
      <div style={{
        width: 40, height: 1,
        background: C.gold, opacity: 0.5,
      }} />
      <p style={{
        fontSize: 17,
        fontWeight: 300,
        lineHeight: 1.7,
        color: C.body,
        fontFamily: 'inherit',
        margin: 0,
        textWrap: 'pretty',
      }}>{body}</p>
      {italic && (
        <p style={{
          fontSize: 16,
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.6,
          color: C.navy400,
          fontFamily: 'inherit',
          margin: 0,
        }}>{italic}</p>
      )}
    </div>
  );

  const imageCol = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ImagePlaceholder label="Manufacturing floor photography" />
    </div>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
      alignItems: 'center',
      minHeight: 480,
    }}>
      {imageLeft ? imageCol : textCol}
      {imageLeft ? textCol : imageCol}
    </div>
  );
}

function StrategyToExecution() {
  return (
    <section style={{ background: C.white, fontFamily: 'inherit' }}>
      {/* Block 1 — text left, image right, white bg */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '96px 48px',
      }}>
        <StrategyBlock
          imageLeft={false}
          eyebrow="Our Work"
          headline="From Strategy To Execution — And Every Shift In Between."
          body="Most improvement programs stall between the boardroom and the floor. POWERS closes that gap by working directly inside the operation — with your people, on your processes, during your shifts. We don't hand off a playbook and leave."
        />
      </div>

      {/* Divider */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 48px',
      }}>
        <div style={{ height: 1, background: C.gray100 }} />
      </div>

      {/* Block 2 — image left, text right, white bg */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '96px 48px',
      }}>
        <StrategyBlock
          imageLeft={true}
          eyebrow="How We Operate"
          headline="We Work Where Performance Happens."
          body="POWERS consultants are on the floor, in the shifts, inside the systems where performance actually breaks down. We build the discipline that holds after we leave — in your supervisors, your standards, and your daily operating routines."
          italic={`"If you're working, we're working."`}
        />
      </div>
    </section>
  );
}

/* ── SECTION 3 — REINDUSTRIALIZATION BRIDGE ── */
function ReindustrializationBridge() {
  return (
    <section style={{
      background: C.navy,
      width: '100%',
      padding: '88px 48px',
      fontFamily: 'inherit',
    }}>
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
      }}>
        {/* Optional gold rule above */}
        <div style={{
          width: 48,
          height: 1,
          background: C.gold,
          marginBottom: 40,
          opacity: 0.7,
        }} />

        {/* Statement */}
        <p style={{
          fontSize: 'clamp(22px, 2.8vw, 32px)',
          fontWeight: 300,
          lineHeight: 1.6,
          color: C.white,
          fontFamily: 'inherit',
          textWrap: 'pretty',
          margin: 0,
        }}>
          American manufacturing is being rebuilt. The firms that outperform
          in this moment are the ones that built operational discipline before
          the pressure arrived — and sustain it regardless of what comes next.{' '}
          <span style={{ fontWeight: 600 }}>That is what POWERS builds.</span>
        </p>
      </div>
    </section>
  );
}

/* ── SHARED: EYEBROW ── */
function Eyebrow({ label, light }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 500, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: '#eabb71',
      fontFamily: 'inherit', marginBottom: 16,
    }}>{label}</div>
  );
}

/* ── SECTION 2 — WHY WE'RE DIFFERENT ── */
function SectionTheMoment() {
  return (
    <section style={{ background: '#183a61', width: '100%', padding: '100px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow label={"Why We\u2019re Different"} />
        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.1,
          color: '#ffffff', fontFamily: 'inherit', margin: '0 0 36px',
          textWrap: 'pretty',
        }}>
          The Fundamentals That Strong Performance is Actually Built on.
        </h2>

        {/* Left-aligned narrative column, centered on the row.
            Long-form body copy gets an anchored left edge so the eye can
            settle into the rhythm; the centered eyebrow + H2 above and
            centered closer below frame it. Width sits close to the H2
            measure so the visual cadence between display and body type
            stays tight. */}
        <div style={{
          maxWidth: 720, margin: '0 auto 28px', textAlign: 'left',
        }}>
          <p style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.80)', fontFamily: 'inherit',
            margin: '0 0 18px', textWrap: 'pretty',
          }}>
            {typo("Every operation has an inflection point, the moment execution stops depending on conditions and starts performing regardless of them. That moment is when the right capability gets built into the operation. The kind of capability that doesn\u2019t show up on the org chart or in the strategy. It\u2019s underneath. Load-bearing. The roots of execution that hold strong performance in place.")}
          </p>
          <p style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.80)', fontFamily: 'inherit',
            margin: 0, textWrap: 'pretty',
          }}>
            {typo("When that root system is in, the operation changes. You can hear it. The line just runs. The team works any problems before they cascade. Bad shifts stay contained. Good shifts compound. The radios get quiet. That\u2019s the sound of an operation producing what it was built to produce. At rate. At margin. At scale.")}
          </p>
        </div>

        {/* Centered closing declaration — different register from the
            narrative above, intentionally returns to center alignment. */}
        <p style={{
          fontSize: 18, fontWeight: 300, lineHeight: 1.65,
          color: 'rgba(255,255,255,0.80)', fontFamily: 'inherit',
          margin: '0 auto', maxWidth: 720,
          textWrap: 'pretty',
        }}>
          {typo("POWERS builds those roots with your people, on the floor, in the shifts, and inside the routines that build the execution capability that lasts long after we\u2019re gone.")}
        </p>
      </div>
    </section>
  );
}

/* ── NEW SECTION — THE ROOT CAUSE ── */
function RootCauseLink() {
  const [h, setH] = useState(false);
  return (
    <a
      href="frontline-leadership.html"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block',
        marginTop: 24,
        fontSize: 16,
        fontWeight: 600,
        color: h ? '#c9963e' : '#eabb71',
        textDecoration: 'none',
        fontFamily: 'inherit',
        transition: 'color 150ms ease',
      }}
    >
      Build the Frontline Leaders That Will Make Performance Stick →
    </a>
  );
}

function SectionRootCause() {
  return (
    <section style={{ background: '#ffffff', width: '100%', padding: '100px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow label="The Root Cause" />
        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.1,
          color: '#183a61', fontFamily: 'inherit', margin: '0 0 28px',
          textWrap: 'pretty',
        }}>
          Most Performance Problems Start at the Front Line.
        </h2>
        <p style={{
          fontSize: 18, fontWeight: 300, lineHeight: 1.65,
          color: '#3a3a38', fontFamily: 'inherit',
          margin: '0 auto', maxWidth: 620,
          textWrap: 'pretty',
        }}>
          Ninety-five percent of your variable costs flow through the decisions and behaviors of your frontline leaders. When those leaders do not have the right systems, skills, and daily disciplines, performance degrades the moment pressure arrives. No strategy survives a supervisor who is firefighting instead of leading. POWERS builds the Management Operating System and frontline leadership capability that close that gap permanently, not just during the engagement.
        </p>
        <RootCauseLink />
      </div>
    </section>
  );
}

/* ── SECTION 3 — WHAT POWERS DOES ── */
function DifferentLink() {
  const [h, setH] = useState(false);
  return (
    <a
      href="approach.html"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block',
        marginTop: 24,
        fontSize: 16, fontWeight: 600,
        color: h ? '#c9963e' : '#eabb71',
        textDecoration: 'none', fontFamily: 'inherit',
        transition: 'color 150ms ease',
      }}
    >
      See What That Looks Like in Practice →
    </a>
  );
}

function SectionWhatPowersDoes() {
  return (
    <section style={{ background: '#183a61', width: '100%', padding: '100px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow label="How We're Different" />
        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.1,
          color: '#ffffff', fontFamily: 'inherit', margin: '0 0 28px',
          textWrap: 'pretty',
        }}>
          We Close the Gap Between Executive Intent and Shop Floor Performance
        </h2>
        <p style={{
          fontSize: 18, fontWeight: 300, lineHeight: 1.65,
          color: 'rgba(255,255,255,0.80)', fontFamily: 'inherit',
          margin: '0 auto 32px', maxWidth: 620,
          textWrap: 'pretty',
        }}>
          Most consulting firms hand off a playbook and leave. POWERS works differently. We embed inside your operation, with your people, on your processes, during your shifts, building the systems, leadership behaviors, and daily disciplines that make improvement stick long after we're gone.
        </p>
        <DifferentLink />
      </div>
    </section>
  );
}

/* ── SECTION (now position 3) — FIVE FUNDAMENTALS ── */
const EXPERTISE_CARDS = [
  {
    headline: 'Operational Discipline',
    body: 'Standards, routines, and structured practices that make consistent execution the default. When discipline is built in, the floor stops running on heroics and starts running on the system.',
  },
  {
    headline: 'Frontline Leadership',
    body: 'Supervisors who can plan a shift, run a problem to ground, and enforce the standard with their team. The single highest-leverage role in the operation, and the one most often handed a clipboard and left to figure it out alone.',
  },
  {
    headline: 'Reliable Equipment Performance',
    body: 'Uptime, changeovers, and maintenance practices that make the asset base predictable. When equipment performs, scheduling works, throughput stays consistent, and labor stops absorbing the variability the machines should have absorbed.',
  },
  {
    headline: 'Workforce Capability',
    body: "Skilled, engaged operators who know the work, own the outcome, and can train the next shift. Capability isn\u2019t a headcount problem. It\u2019s what each person on the line can actually do when the day gets hard.",
  },
  {
    headline: 'Daily Accountability',
    body: 'The cadence, metrics, and conversations that close the loop every shift, every day. Without it, the other four fundamentals drift. With it, they compound.',
  },
];

function IconPlaceholder() {
  return (
    <div style={{
      width: 32, height: 32, marginBottom: 20,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="1" y="1" width="30" height="30" rx="0" stroke="#183a61" strokeWidth="1.5"/>
        <line x1="8" y1="16" x2="24" y2="16" stroke="#183a61" strokeWidth="1.5"/>
        <line x1="16" y1="8" x2="16" y2="24" stroke="#183a61" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

function ExpertiseCard({ headline, body }) {
  const [h, setH] = useState(false);
  return (
    <div style={{
      background: '#ffffff',
      border: `1px solid #e8e8e4`,
      borderTop: `3px solid ${h ? '#eabb71' : '#e8e8e4'}`,
      padding: '36px 28px 32px',
      display: 'flex', flexDirection: 'column', gap: 0,
      transition: 'border-top-color 200ms ease',
      height: '100%',
    }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <IconPlaceholder />
      <div style={{
        fontSize: 18, fontWeight: 700, lineHeight: 1.3,
        color: '#183a61', fontFamily: 'inherit', marginBottom: 12,
      }}>{headline}</div>
      <p style={{
        fontSize: 15, fontWeight: 300, lineHeight: 1.65,
        color: '#3a3a38', fontFamily: 'inherit', margin: 0, flex: 1,
        textWrap: 'pretty',
      }}>{typo(body)}</p>
    </div>
  );
}

function LearnMoreLink({ href }) {
  const [h, setH] = useState(false);
  return (
    <a href={href || '#'} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontSize: 14, fontWeight: 500, color: '#eabb71',
        textDecoration: h ? 'underline' : 'none',
        textUnderlineOffset: 3, fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
      Learn More
      <span style={{ transform: h ? 'translateX(3px)' : 'none', transition: 'transform 160ms ease', display: 'inline-block' }}>→</span>
    </a>
  );
}

function SectionExpertiseAreas() {
  return (
    <section style={{ background: '#f5f5f3', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow label="What We Build" />
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.1,
            color: '#183a61', fontFamily: 'inherit', margin: '0 0 28px',
            textWrap: 'pretty',
          }}>The Five Fundamentals We Instill to Build Execution Capability.</h2>
          {/* Left-aligned intro column to keep long-form body readable;
              centered within the row to preserve the section's symmetry. */}
          <p style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.65,
            color: '#3a3a38', fontFamily: 'inherit',
            maxWidth: 720, margin: '0 auto', textAlign: 'left',
            textWrap: 'pretty',
          }}>
            {typo("Execution capability isn\u2019t one fix. It\u2019s five fundamentals working together, built into the daily rhythm of the operation. Weaken any one and the others drift. Instill them together and the operation produces what it\u2019s supposed to produce, on the floor, on the financial statement, across whatever comes next.")}
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 1,
          background: '#e8e8e4',
        }}>
          {EXPERTISE_CARDS.map((card, i) => (
            <ExpertiseCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 5 — HOW WE WORK ── */
function SectionHowWeWork() {
  return (
    <section style={{ background: '#ffffff' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        minHeight: 560,
      }}>
        {/* Left: copy */}
        <div style={{
          padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 64px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24,
        }}>
          <Eyebrow label="How We Work" />
          <h2 style={{
            fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 800, lineHeight: 1.15,
            color: '#183a61', fontFamily: 'inherit', margin: 0, textWrap: 'pretty',
          }}>We Work Where Performance Happens.</h2>
          <p style={{
            fontSize: 17, fontWeight: 300, lineHeight: 1.7,
            color: '#3a3a38', fontFamily: 'inherit', margin: 0, textWrap: 'pretty',
          }}>
            POWERS consultants are on the floor, in the shifts, inside the systems where performance actually breaks down. We do not observe from the outside. We build discipline directly into your supervisors, your standards, and your daily operating routines.
          </p>
          {/* Gold rule + pull quote */}
          <div>
            <div style={{ height: 1, background: '#eabb71', marginBottom: 24, width: 48 }} />
            <div style={{
              background: '#183a61',
              padding: '20px 24px',
              display: 'inline-block',
            }}>
              <span style={{
                fontSize: 22, fontWeight: 700, fontStyle: 'italic',
                color: '#ffffff', fontFamily: 'inherit', lineHeight: 1.3,
              }}>"If you're working, we're working."</span>
            </div>
          </div>
        </div>

        {/* Right: image placeholder */}
        <div style={{
          background: '#0d2442',
          minHeight: 400,
          display: 'flex', alignItems: 'stretch',
          position: 'relative', overflow: 'hidden',
          padding: 0,
        }}>
          <img
            src="/uploads/POWERS Homepage Placeholder 1280 x 960.png"
            alt="POWERS consultants working on the manufacturing floor"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              minHeight: 400,
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 6 — RESULTS ENTRY POINT ── */
const CASE_STUDIES = [
  {
    industry: 'Food Manufacturing',
    result: '$70M value-added meats operation: 34% labor productivity improvement',
    summary: 'A multi-site food manufacturer engaged POWERS to address inconsistent shift performance and rising labor costs. Sustainable gains achieved within 18 months.',
  },
  {
    industry: 'Defense and Aerospace',
    result: '59% on-time delivery improvement across three facilities',
    summary: 'A defense contractor facing chronic schedule slippage built new production discipline and accountability structures across their entire operation.',
  },
  {
    industry: 'Consumer Packaged Goods',
    result: '$42.2M international food processor: 28% throughput increase',
    summary: 'An international processor expanded capacity without capital investment by eliminating systemic performance losses at the supervisory level.',
  },
];

function CaseStudyCard({ industry, result, summary }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: '#ffffff',
        borderTop: `3px solid #183a61`,
        padding: '32px 28px 28px',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'border-top-color 200ms ease',
      }}
    >
      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: '#eabb71', fontFamily: 'inherit',
      }}>{industry}</div>
      <div style={{
        fontSize: 17, fontWeight: 700, lineHeight: 1.3,
        color: '#183a61', fontFamily: 'inherit',
      }}>{result}</div>
      <p style={{
        fontSize: 14, fontWeight: 300, lineHeight: 1.65,
        color: '#3a3a38', fontFamily: 'inherit', margin: 0, flex: 1,
      }}>{summary}</p>
      <a href="#" style={{
        fontSize: 13, fontWeight: 500, color: h ? '#c9963e' : '#eabb71',
        textDecoration: 'none', fontFamily: 'inherit',
        transition: 'color 150ms ease',
      }}>Read the case study →</a>
    </div>
  );
}

function SectionResultsEntryPoint() {
  const [h, setH] = useState(false);
  return (
    <section style={{ background: '#183a61', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow label="Proven Results" />
          <h2 style={{
            fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 800, lineHeight: 1.15,
            color: '#ffffff', fontFamily: 'inherit', margin: 0,
          }}>The Work Speaks for Itself.</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 1, background: '#e8e8e4', marginBottom: 56,
        }}>
          {CASE_STUDIES.map((cs, i) => <CaseStudyCard key={i} {...cs} />)}
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="case-studies.html"
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
              fontSize: 16, fontWeight: 600,
              color: h ? '#c9963e' : '#eabb71',
              textDecoration: 'none', fontFamily: 'inherit',
              transition: 'color 150ms ease',
            }}>
            See All Case Studies →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 7 — INSIGHTS ENTRY POINT ── */
const INSIGHTS = [
  {
    category: 'Reindustrialization',
    headline: 'Why the Firms That Built Discipline Early Will Win the Reshoring Decade',
    summary: 'The competitive advantage in American manufacturing is not technology. It is the operating discipline to deploy it effectively.',
  },
  {
    category: 'Frontline Leadership',
    headline: 'The Supervisor Gap: Why Most Improvement Programs Stall at the Floor Level',
    summary: 'When supervisors are firefighting instead of leading, no system holds. Here is what changing that actually takes.',
  },
  {
    category: 'Operational Readiness',
    headline: 'What Consistent Performance Looks Like Across Shifts, Sites, and Holdings',
    summary: 'Consistency is not a cultural value. It is a designed outcome. This is how POWERS builds it.',
  },
];

function InsightCard({ category, headline, summary }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: '#ffffff',
        border: `1px solid #e8e8e4`,
        padding: '28px 24px 24px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: '#eabb71', fontFamily: 'inherit',
      }}>{category}</div>
      <div style={{
        fontSize: 18, fontWeight: 700, lineHeight: 1.3,
        color: h ? '#4a6a8a' : '#183a61', fontFamily: 'inherit',
        transition: 'color 150ms ease',
        textWrap: 'pretty',
      }}>{headline}</div>
      <p style={{
        fontSize: 14, fontWeight: 300, lineHeight: 1.65,
        color: '#3a3a38', fontFamily: 'inherit', margin: 0, flex: 1,
      }}>{summary}</p>
      <a href="#" style={{
        fontSize: 13, fontWeight: 500, color: '#eabb71',
        textDecoration: h ? 'underline' : 'none',
        textUnderlineOffset: 3, fontFamily: 'inherit',
      }}>Read more →</a>
    </div>
  );
}

function SectionInsightsEntryPoint() {
  const [h, setH] = useState(false);
  return (
    <section style={{ background: '#f5f5f3', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow label="Insights" />
          <h2 style={{
            fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 800, lineHeight: 1.15,
            color: '#183a61', fontFamily: 'inherit', margin: 0,
          }}>The Ideas Behind the Work.</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24, marginBottom: 56,
        }}>
          {INSIGHTS.map((item, i) => <InsightCard key={i} {...item} />)}
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="insights.html"
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
              fontSize: 16, fontWeight: 600,
              color: h ? '#4a6a8a' : '#183a61',
              textDecoration: 'none', fontFamily: 'inherit',
              transition: 'color 150ms ease',
            }}>
            Visit the Insights Hub →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 8 — FOOTER CTA ── */
function FooterCTA() {
  const [h, setH] = useState(false);
  return (
    <section style={{ background: '#0d2442', padding: '100px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.1,
          color: '#ffffff', fontFamily: 'inherit', margin: 0, textWrap: 'pretty',
        }}>Ready to Make Performance Stick?</h2>
        <p style={{
          fontSize: 18, fontWeight: 300, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.70)', fontFamily: 'inherit', margin: 0,
        }}>Let's talk about what's possible inside your operation.</p>
        <a href="contact.html"
          onMouseEnter={() => setH(true)}
          onMouseLeave={() => setH(false)}
          style={{
            display: 'inline-block',
            background: h ? '#c9963e' : '#eabb71',
            color: '#183a61', fontSize: 16, fontWeight: 600,
            padding: '16px 40px', textDecoration: 'none',
            fontFamily: 'inherit', letterSpacing: '0.01em',
            transition: 'background 160ms ease',
          }}>
          Start a Conversation
        </a>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function FooterLink({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a href={href || '#'}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'block',
        fontSize: 13, fontWeight: 300,
        color: h ? '#ffffff' : 'rgba(255,255,255,0.70)',
        textDecoration: 'none', fontFamily: 'inherit',
        padding: '4px 0',
        transition: 'color 150ms ease',
      }}>{children}</a>
  );
}

function FooterColHeader({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: '#ffffff', fontFamily: 'inherit',
      marginBottom: 16,
    }}>{children}</div>
  );
}

function LinkedInIcon() {
  const [h, setH] = useState(false);
  return (
    <a href="#" aria-label="POWERS on LinkedIn"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: 'inline-block', marginTop: 20, color: h ? '#eabb71' : '#ffffff', transition: 'color 160ms ease' }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="4" y="8" width="2.2" height="7" fill="currentColor"/>
        <circle cx="5.1" cy="5.5" r="1.3" fill="currentColor"/>
        <path d="M9 8v7M9 11c0-1.66 1.34-3 3-3s3 1.34 3 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </a>
  );
}

function FooterGhostBtn() {
  const [h, setH] = useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block',
        marginTop: 20,
        fontSize: 13, fontWeight: 500,
        color: h ? '#183a61' : '#eabb71',
        background: h ? '#eabb71' : 'transparent',
        border: '1px solid #eabb71',
        padding: '9px 20px',
        textDecoration: 'none', fontFamily: 'inherit',
        letterSpacing: '0.02em',
        transition: 'color 150ms ease, background 150ms ease',
        whiteSpace: 'nowrap',
      }}>Start a Conversation</a>
  );
}

function LegalLink({ children }) {
  const [h, setH] = useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontSize: 11, fontWeight: 300,
        color: h ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.40)',
        textDecoration: 'none', fontFamily: 'inherit',
        transition: 'color 150ms ease',
      }}>{children}</a>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#0d2442', fontFamily: 'inherit', borderTop: '1px solid #eabb71' }}>
      {/* Main columns */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '72px 48px 64px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '48px 40px',
      }}>

        {/* Col 1: Brand */}
        <div style={{ maxWidth: 280 }}>
          <a href="index.html" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img
              src="/uploads/powers-logo-refined-for-dark-backgrounds-2026.png"
              alt="POWERS"
              style={{ width: 140, height: 'auto', display: 'block', marginBottom: 16 }}
            />
          </a>
          <div style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.14em',
            color: '#eabb71', fontFamily: 'inherit', marginBottom: 14,
          }}>Make Performance Stick.</div>
          <p style={{
            fontSize: 13, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.60)', fontFamily: 'inherit', margin: 0,
          }}>
            Management consulting for manufacturers who need performance that holds across teams, shifts, sites, and holdings.
          </p>
          <LinkedInIcon />
        </div>

        {/* Col 2: Results */}
        <div>
          <FooterColHeader>Results</FooterColHeader>
          <FooterLink href="approach.html">Approach</FooterLink>
          <FooterLink href="discovery-process.html">Discovery Process</FooterLink>
          <FooterLink href="operational-readiness.html">Expertise Areas</FooterLink>
          <FooterLink href="industries-served.html">Industries Served</FooterLink>
          <FooterLink href="case-studies.html">Case Studies</FooterLink>
        </div>

        {/* Col 3: About */}
        <div>
          <FooterColHeader>About</FooterColHeader>
          <FooterLink href="history.html">History</FooterLink>
          <FooterLink href="leadership.html">Leadership</FooterLink>
          <FooterLink href="company-news.html">Company News</FooterLink>
          <FooterLink href="careers.html">Careers</FooterLink>
        </div>

        {/* Col 4: Contact */}
        <div>
          <FooterColHeader>Let's Talk</FooterColHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <a href="tel:+16789714711" style={{
              fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)',
              textDecoration: 'none', fontFamily: 'inherit', padding: '4px 0',
            }}>+1 678-971-4711</a>
            <a href="mailto:info@thepowerscompany.com" style={{
              fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)',
              textDecoration: 'none', fontFamily: 'inherit', padding: '4px 0',
            }}>info@thepowerscompany.com</a>
            <div style={{
              fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)',
              fontFamily: 'inherit', padding: '4px 0', lineHeight: 1.5,
            }}>
              1801 Peachtree St NE, Suite 200<br />Atlanta, GA 30309
            </div>
          </div>
          <FooterGhostBtn />
        </div>
      </div>

      {/* Legal bar */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 48px 40px',
      }}>
        <div style={{
          height: 1,
          background: 'rgba(234,187,113,0.20)',
          marginBottom: 20,
        }} />
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', gap: '6px 12px',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 300,
            color: 'rgba(255,255,255,0.40)', fontFamily: 'inherit',
          }}>Copyright 2025 The POWERS Company, Inc. All Rights Reserved.</span>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <LegalLink>Sitemap</LegalLink>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <LegalLink>Privacy Policy</LegalLink>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)', fontFamily: 'inherit' }}>
            Powered by <LegalLink>Method Marketing</LegalLink>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ── */
function App() {
  return (
    <div style={{ fontFamily: 'inherit', minHeight: '100vh' }}>
      <Header />
      <Hero />
      <SectionTheMoment />
      <SectionExpertiseAreas />
      <SectionRootCause />
      <SectionWhatPowersDoes />
      <SectionHowWeWork />
      <SectionResultsEntryPoint />
      <SectionInsightsEntryPoint />
      <FooterCTA />
      <Footer />
      {/* Version indicator */}
      <div style={{
        background: '#0d2442',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '10px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      }}>
        <span style={{
          fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.20)',
          fontFamily: 'inherit', letterSpacing: '0.06em',
        }}>
          POWERS Website Evolution — v0.3.0
        </span>
      </div>
    </div>
  );
}

export default App;
