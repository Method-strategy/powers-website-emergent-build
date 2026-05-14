/* eslint-disable */
/* This file is a lossless port of the legacy index.html homepage.
   Original lived as inline <script type="text/babel"> JSX. Do not refactor.
   Visual edits should be made in /tmp/powers-website/powers-website-evolution/index.html
   first, then re-generate via scripts/convert_homepage.py. */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

/* ── HOMEPAGE SECTION TOKENS ─────────────────────────────────────────
 * Single source of truth for the homepage's vertical rhythm. Sections
 * read top→bottom as alternating tonal bands so the page has a real
 * cadence instead of a row-by-row feel.
 *
 * Surfaces (in order of how often they appear):
 *   bgWhite   — neutral content surface
 *   bgLight   — warm off-white, sits between content blocks
 *   bgNavy    — content highlight (Results section)
 *   bgDeep    — bookend surface (Hero, FooterCTA, Footer)
 *
 * Vertical rhythm:
 *   sectionPadY   — top + bottom on every section
 *   sectionPadX   — left + right on every section
 *   maxWide       — content container width on every section
 *   gapHeaderToBody — distance from section header → first content block
 *
 * Type:
 *   h2Size   — every section H2 uses this exact clamp
 *   h2Weight, h2LH, h2Tracking — every section H2's display treatment
 *   ledeSize, ledeLH, ledeWeight — every section's intro body paragraph
 * ────────────────────────────────────────────────────────────────── */
const S = {
  bgWhite: '#ffffff',
  bgLight: '#f7f6f1',
  bgNavy:  '#183a61',
  bgDeep:  '#0d2442',
  sectionPadY: 'clamp(96px, 9vw, 128px)',
  sectionPadX: 'clamp(24px, 4vw, 48px)',
  maxWide: 1240,
  maxRead: 760,
  gapHeaderToBody: 64,
  h2Size: 'clamp(28px, 3.4vw, 42px)',
  h2Weight: 800,
  h2LH: 1.12,
  h2Tracking: '-0.012em',
  ledeSize: 17,
  ledeLH: 1.65,
  ledeWeight: 300,
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
    <section style={{ background: S.bgWhite, width: '100%', padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxRead, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow label={"Why We\u2019re Different"} />
        <h2 style={{
          fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
          color: C.navy, fontFamily: 'inherit', margin: '16px 0 36px',
          letterSpacing: S.h2Tracking, textWrap: 'pretty',
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
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: '0 0 18px', textWrap: 'pretty',
          }}>
            {typo("Every operation has an inflection point, the moment execution stops depending on conditions and starts performing regardless of them. That moment is when the right capability gets built into the operation. The kind of capability that doesn\u2019t show up on the org chart or in the strategy. It\u2019s underneath. Load-bearing. The roots of execution that hold strong performance in place.")}
          </p>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: 0, textWrap: 'pretty',
          }}>
            {typo("When that root system is in, the operation changes. You can hear it. The line just runs. The team works any problems before they cascade. Bad shifts stay contained. Good shifts compound. The radios get quiet. That\u2019s the sound of an operation producing what it was built to produce. At rate. At margin. At scale.")}
          </p>
        </div>

        {/* Centered closing declaration — different register from the
            narrative above, intentionally returns to center alignment. */}
        <p style={{
          fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
          color: C.body, fontFamily: 'inherit',
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
/* ── SECTION 4 — HOW EXECUTION CAPABILITY CREATES VALUE ─────────────
 *
 * Three-column diagram + thesis. This is the load-bearing visual of the
 * homepage, illustrating how "Execution Capability" (the center engine)
 * converts uncontrollable inputs (left, "Varying Forces") into reliable
 * outputs (right, "Consistent Results").
 *
 * Visual intent:
 *   - Left column = pressures arriving. Slight amber tension on each item.
 *   - Center column = the architecture. Heavy navy panel. Carries a
 *     small "ACTIVE" indicator with a slowly pulsing gold dot — the only
 *     persistent motion on the page.
 *   - Right column = outputs leaving. Lighter, gold accent on each item.
 *   - Flow indicators: 3 dashed lines between columns that "draw" from
 *     left to right when the section enters the viewport, then settle.
 *
 * Motion: an IntersectionObserver triggers a one-time stagger reveal
 * when the section scrolls into view. Header → left items (top-down)
 * → flow lines draw → center engine establishes → right items (top-down).
 * Honors `prefers-reduced-motion`: when reduced motion is requested,
 * everything renders in its final state with no animation.
 * ──────────────────────────────────────────────────────────────────── */
const VARYING_FORCES = [
  'Market volatility',
  'Tariff and trade shifts',
  'Demand swings',
  'Workforce turnover',
  'Equipment breakdowns',
  'Inexperienced supervisors',
  'Margin compression',
  'Schedule misses',
];

const CONSISTENT_RESULTS = [
  'Increased throughput',
  'Higher OEE',
  'Reduced downtime',
  'Improved labor productivity',
  'Expanded margin',
  'Recovered working capital',
  'Stronger frontline leadership',
  'Sustained operational performance',
];

function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === 'undefined') return;
    // Honor reduced-motion: snap straight to revealed state, skip observer.
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setSeen(true); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, seen];
}

function SectionExecutionEngine() {
  const [ref, seen] = useReveal();

  // Stagger timings (ms after seen=true)
  const T_HEADER  = 0;
  const T_LEFT0   = 220;
  const T_LEFTGAP = 45;     // per-item stagger (tightened)
  const T_FLOW    = T_LEFT0 + VARYING_FORCES.length * T_LEFTGAP + 60;
  const T_CENTER  = T_FLOW + 180;
  const T_RIGHT0  = T_CENTER + 200;
  const T_RIGHTGAP = 45;
  const T_CLOSE   = T_RIGHT0 + CONSISTENT_RESULTS.length * T_RIGHTGAP + 100;

  const G = '#eabb71';      // gold
  const NAVY = '#183a61';
  const TEXT = '#3a3a38';
  const RED   = '#b8392d';  // "red number" — pressure-side indicator
  const GREEN = '#2d7a4f';  // "green number" — result-side indicator

  // Inline keyframes — kept here so the section is self-contained.
  const styles = `
    @keyframes pw-enter-left {
      0%   { opacity: 0; transform: translateX(-12px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes pw-enter-right {
      0%   { opacity: 0; transform: translateX(12px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes pw-enter-up {
      0%   { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pw-scale-in {
      0%   { opacity: 0; transform: scale(0.96); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes pw-flow-draw {
      0%   { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }
    @keyframes pw-carat-drift-1 {
      0%   { transform: translate3d(-20%, 0, 0); opacity: 0; }
      14%  { opacity: 0.92; }
      86%  { opacity: 0.92; }
      100% { transform: translate3d(120%, 0, 0); opacity: 0; }
    }
    @keyframes pw-carat-drift-2 {
      0%   { transform: translate3d(-20%, 0, 0); opacity: 0; }
      18%  { opacity: 0.78; }
      82%  { opacity: 0.78; }
      100% { transform: translate3d(120%, 0, 0); opacity: 0; }
    }
    @keyframes pw-carat-drift-3 {
      0%   { transform: translate3d(-20%, 0, 0); opacity: 0; }
      22%  { opacity: 0.85; }
      78%  { opacity: 0.85; }
      100% { transform: translate3d(120%, 0, 0); opacity: 0; }
    }
    @keyframes pw-carat-march {
      0%   { transform: translate3d(-20%, 0, 0); opacity: 0; }
      12%  { opacity: 0.95; }
      88%  { opacity: 0.95; }
      100% { transform: translate3d(120%, 0, 0); opacity: 0; }
    }
    @keyframes pw-pulse {
      0%, 100% { opacity: 0.45; transform: scale(1); }
      50%      { opacity: 1;    transform: scale(1.18); }
    }
    @media (prefers-reduced-motion: reduce) {
      .pw-engine *, .pw-engine *::before, .pw-engine *::after {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  const willReveal = (delayMs, kf = 'pw-enter-up') => ({
    opacity: 0,
    animation: seen ? `${kf} 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms forwards` : 'none',
  });

  // ── Carat particles ─────────────────────────────────────────────
  // Left gutter: chaotic slate-blue arrows arriving at irregular intervals.
  // Reads as unpredictable pressures arriving — never quite repeats.
  // Right gutter: gold arrows leaving on a perfectly even cadence.
  // Reads as regimented, predictable output.
  const SLATE = '#7c9ab8';   // muted slate-blue

  // Triple-chevron arrow (">>>") — reads as directional flow, much more
  // legible than a single chevron at small sizes.
  const makeCarat = (color) => {
    const svg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='18' viewBox='0 0 44 18'>` +
      `<g fill='none' stroke='${color}' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'>` +
      `<path d='M3 3 L11 9 L3 15' opacity='0.45'/>` +
      `<path d='M16 3 L24 9 L16 15' opacity='0.75'/>` +
      `<path d='M29 3 L37 9 L29 15'/>` +
      `</g>` +
      `</svg>`
    );
    return `url("data:image/svg+xml,${svg}")`;
  };

  // Left gutter: 4 chaotic arrows — faster baseline + tighter randomized
  // start delays so the eye reads "input is unpredictable AND coming at
  // you quickly." Faster duration on the left vs right reinforces the
  // chaos/pressure side of the diagram.
  const LEFT_CARATS = [
    { top: '14%', delay: 0,    duration: 2.4, kf: 'pw-carat-drift-1' },
    { top: '38%', delay: 0.6,  duration: 3.1, kf: 'pw-carat-drift-2' },
    { top: '62%', delay: 0.2,  duration: 2.7, kf: 'pw-carat-drift-3' },
    { top: '84%', delay: 1.4,  duration: 3.4, kf: 'pw-carat-drift-1' },
  ];

  // Right gutter: 4 arrows, evenly distributed top-to-bottom, identical
  // duration, evenly staggered start delays. The cadence is the signal:
  // output arrives on a beat.
  const RIGHT_CARATS_COUNT = 4;
  const RIGHT_DURATION = 4.2;
  const RIGHT_CARATS = Array.from({ length: RIGHT_CARATS_COUNT }, (_, i) => ({
    top: `${18 + i * 22}%`,
    delay: (RIGHT_DURATION / RIGHT_CARATS_COUNT) * i,
    duration: RIGHT_DURATION,
    kf: 'pw-carat-march',
  }));

  const caratSpan = (color, { top, delay, duration, kf }, i) => (
    <span key={i} aria-hidden="true" style={{
      position: 'absolute', top, left: 0, width: 44, height: 18,
      backgroundImage: makeCarat(color),
      backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
      transform: 'translate3d(-20%, 0, 0)',
      opacity: 0,
      animation: seen
        ? `${kf} ${duration}s linear ${T_FLOW / 1000 + delay}s infinite`
        : 'none',
      willChange: 'transform, opacity',
    }} />
  );

  return (
    <section ref={ref} className="pw-engine" style={{ background: S.bgWhite, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40, ...willReveal(T_HEADER) }}>
          <Eyebrow label="How Execution Capability Creates Value" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Pressure Becomes Positive Results When Performance is Rooted in the Fundamentals.
          </h2>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            maxWidth: 720, margin: '0 auto', textAlign: 'left',
            textWrap: 'pretty',
          }}>
            {typo("Every operation faces conditions it can\u2019t control. Market pressure. Workforce turnover. Equipment failures. Demand swings. The question isn\u2019t whether those pressures show up. They always do. The question is whether the operation has the architecture to absorb them and still produce.")}
          </p>
        </div>

        {/* DIAGRAM — three columns + flow rails */}
        <div style={{
          marginTop: 40,
          display: 'grid',
          gridTemplateColumns: '1fr 1.18fr 1fr',
          columnGap: 72,
          alignItems: 'stretch',
          position: 'relative',
        }}>
          {/* Animated flow arrows — live in the column gaps, full gap width,
              so they read as actual directional flow rather than incidental
              ornament. Left = chaotic slate arrival, right = regimented
              gold output. */}
          <div aria-hidden="true" className="pw-carat-gutter pw-carat-gutter-left" style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: 'calc(33.33% - 60px)', width: 80,
            pointerEvents: 'none', zIndex: 0,
          }}>
            {LEFT_CARATS.map((c, i) => caratSpan(SLATE, c, i))}
          </div>
          <div aria-hidden="true" className="pw-carat-gutter pw-carat-gutter-right" style={{
            position: 'absolute',
            top: 0, bottom: 0,
            right: 'calc(33.33% - 60px)', width: 80,
            pointerEvents: 'none', zIndex: 0,
          }}>
            {RIGHT_CARATS.map((c, i) => caratSpan(G, c, i))}
          </div>

          {/* LEFT COLUMN — Varying Forces. Each line carries a red trend-
              down marker. These are the "red numbers" CEOs and ops execs
              are trying to convert. */}
          <div style={{ position: 'relative', zIndex: 1, paddingTop: 8 }}>
            <DiagramColHead label="Varying Forces" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {VARYING_FORCES.map((item, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 14.5, fontWeight: 500, color: NAVY, fontFamily: 'inherit',
                  padding: '10px 0', borderBottom: '1px solid #e8e8e4',
                  ...willReveal(T_LEFT0 + i * T_LEFTGAP, 'pw-enter-left'),
                }}>
                  <RedDownMarker color={RED} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER COLUMN — Execution Capability (load-bearing). Rounded
              navy panel is the engine that converts red inputs to green
              outputs. The column title lives inside the panel in white so
              the engine is visually one self-contained unit. */}
          <div style={{
            position: 'relative', zIndex: 2,
            display: 'flex', flexDirection: 'column',
            paddingTop: 8,
          }}>
            <div style={{
              background: NAVY, borderRadius: 14,
              color: '#ffffff', padding: '34px 30px 36px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              flex: 1,
              boxShadow: `0 28px 64px -28px rgba(13,36,66,0.55), inset 0 0 0 1px rgba(234,187,113,0.18)`,
              position: 'relative', overflow: 'hidden',
              ...willReveal(T_CENTER, 'pw-scale-in'),
            }}>
              {/* Fine architectural grid texture in background */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none',
                backgroundImage: `linear-gradient(${G} 1px, transparent 1px), linear-gradient(90deg, ${G} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                backgroundPosition: 'center center',
                mixBlendMode: 'overlay',
              }} />

              {/* Column title — same family as the section subhead, white,
                  smaller scale so it functions as a column head not a hero
                  treatment. */}
              <h3 style={{
                fontSize: 'clamp(20px, 1.9vw, 24px)', fontWeight: 700, lineHeight: 1.2,
                color: '#ffffff', fontFamily: 'inherit',
                margin: '0 0 16px', letterSpacing: '-0.012em',
                position: 'relative', zIndex: 1,
              }}>
                Execution Capability
              </h3>

              <p style={{
                fontSize: 15, fontWeight: 300, lineHeight: 1.55,
                color: 'rgba(255,255,255,0.92)', fontFamily: 'inherit',
                margin: 0, textWrap: 'pretty', position: 'relative', zIndex: 1,
              }}>
                {typo("The ability to execute at a high level regardless of conditions. The discipline, leadership, and accountability that turn variable inputs into reliable outputs.")}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN — Consistent Results. Each line carries a green
              trend-up marker. These are the "green numbers" the engine
              produces from the red ones on the left. */}
          <div style={{ position: 'relative', zIndex: 1, paddingTop: 8 }}>
            <DiagramColHead label="Consistent Results" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {CONSISTENT_RESULTS.map((item, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 14.5, fontWeight: 500, color: NAVY, fontFamily: 'inherit',
                  padding: '10px 0', borderBottom: '1px solid #e8e8e4',
                  ...willReveal(T_RIGHT0 + i * T_RIGHTGAP, 'pw-enter-right'),
                }}>
                  <GreenUpMarker color={GREEN} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing subhead — section-anchor declaration. */}
        <div style={{ textAlign: 'center', marginTop: 56, ...willReveal(T_CLOSE) }}>
          <p style={{
            fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 700, lineHeight: 1.25,
            color: NAVY, fontFamily: 'inherit', margin: '0 auto', maxWidth: 760,
            letterSpacing: '-0.012em', textWrap: 'balance',
          }}>
            {typo("When the fundamentals are strong, the operation absorbs whatever comes at it and still produces.")}
          </p>
        </div>
      </div>
    </section>
  );
}

function DiagramColHead({ label }) {
  // Column titles use the same display family + bold weight as the section
  // subhead, sized down so they sit one tier below the section H2. No rule
  // above — the title alone carries the weight. (Center column has its
  // title inside the navy panel, so this only renders on left + right.)
  return (
    <h3 style={{
      fontSize: 'clamp(20px, 1.9vw, 24px)', fontWeight: 700, lineHeight: 1.2,
      color: '#183a61', fontFamily: 'inherit',
      margin: '0 0 16px', letterSpacing: '-0.012em',
    }}>{label}</h3>
  );
}

/* Red trend-down marker — appears next to every "Varying Forces" line.
   Reads as "this is a red number." Filled triangle + small descending
   tick gives it the feel of a financial dashboard down-indicator without
   importing an icon library. */
function RedDownMarker({ color }) {
  return (
    <span aria-hidden="true" style={{
      flex: '0 0 auto', width: 14, height: 14, display: 'inline-block',
      lineHeight: 0,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M2 4 L12 4 L7 12 Z" fill={color} />
      </svg>
    </span>
  );
}

/* Green trend-up marker — mirror of the red one. Reads as "this is a
   green number." Same visual weight so the columns balance. */
function GreenUpMarker({ color }) {
  return (
    <span aria-hidden="true" style={{
      flex: '0 0 auto', width: 14, height: 14, display: 'inline-block',
      lineHeight: 0,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 2 L12 10 L2 10 Z" fill={color} />
      </svg>
    </span>
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
    <section style={{ background: S.bgLight, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: S.gapHeaderToBody }}>
          <Eyebrow label="What We Build" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>The Five Fundamentals We Instill to Build Execution Capability.</h2>
          {/* Left-aligned intro column to keep long-form body readable;
              centered within the row to preserve the section's symmetry. */}
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
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
          background: C.gray100,
        }}>
          {EXPERTISE_CARDS.map((card, i) => (
            <ExpertiseCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 5 — HOW WE WORK ──────────────────────────────────────────
 * Two-column layout: copy on the left, image on the right. Copy carries
 * three body paragraphs that establish POWERS' floor-level presence as
 * the differentiator vs. traditional consulting firms. The pull quote
 * "If you're working, we're working." sits beneath the body as a navy
 * pull-block — same device used elsewhere on the homepage so anchoring
 * declarations get the same visual weight.
 * ──────────────────────────────────────────────────────────────────── */
function SectionHowWeWork() {
  return (
    <section style={{ background: S.bgLight, padding: `${S.sectionPadY} 0` }}>
      <div style={{
        maxWidth: S.maxWide, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        minHeight: 520,
        alignItems: 'stretch',
        gap: 0,
      }}>
        {/* Left: copy */}
        <div style={{
          padding: `0 clamp(24px, 4vw, 56px) 0 ${S.sectionPadX}`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22,
        }}>
          <Eyebrow label="How We Work" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: 0,
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            We Work Where Value Gets Won or Lost.
          </h2>

          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: 0, textWrap: 'pretty',
          }}>
            {typo("Most consulting firms diagnose, recommend, and leave. They\u2019re out the door at 3pm and don\u2019t work Fridays. The slide decks are sharp. The results never last.")}
          </p>

          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: 0, textWrap: 'pretty',
          }}>
            {typo("POWERS works differently. We\u2019re on the floor, in the shifts, inside the systems and understanding the behaviors where performance actually breaks down. We build discipline directly into your supervisors, your standards, and your daily operating routines. If the problem is on third-shift maintenance, we\u2019re there on third shift. If the decision gets made at 5\u00a0a.m. before the line starts, we\u2019re there at 5\u00a0a.m.")}
          </p>

          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: 0, textWrap: 'pretty',
          }}>
            {typo("That\u2019s how the ability to execute under any circumstances gets built. Not described, not recommended, built from the roots up. And it\u2019s why the gains stay durable when we\u2019re gone.")}
          </p>

          {/* Pull quote — navy panel mirrors the engine treatment in the
              diagram above, so the anchoring declaration carries the same
              visual signature. */}
          <div style={{ marginTop: 4 }}>
            <div style={{
              background: C.navy, borderRadius: 14,
              padding: '22px 26px',
              display: 'inline-block',
              boxShadow: `0 24px 60px -32px rgba(13,36,66,0.45)`,
            }}>
              <span style={{
                fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 700, fontStyle: 'italic',
                color: C.white, fontFamily: 'inherit', lineHeight: 1.3,
                letterSpacing: '-0.008em',
              }}>
                {typo("\u201cIf you\u2019re working, we\u2019re working.\u201d")}
              </span>
            </div>
          </div>
        </div>

        {/* Right: image — flush bleed to right edge of the container */}
        <div style={{
          background: C.navy900,
          minHeight: 400,
          display: 'flex', alignItems: 'stretch',
          position: 'relative', overflow: 'hidden',
        }}>
          <img
            src="/uploads/POWERS Homepage Placeholder 1280 x 960.png"
            alt="POWERS consultants working on the manufacturing floor"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center', display: 'block', minHeight: 400,
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 6 — WHERE WE WORK ────────────────────────────────────────
 * Capability presentation, not industry marketing. Two sub-sections:
 *   1. Across the Operation — body paragraph naming the functional areas
 *      POWERS works inside.
 *   2. Across Industries — an 18-tile grid of industries served, sized
 *      6-up on desktop / 3-up on tablet / 2-up on mobile.
 *
 * Visual language harmonizes with the Execution Capability diagram above:
 * navy ink, white tiles with a thin border, hover lifts to a navy fill
 * with white text. Quiet and confident — no industry iconography, no
 * stock photography. The breadth of the list is the message.
 *
 * All tiles route to /industries-served until per-industry pages exist.
 * The hash on each link is a forward-compatible anchor target for future
 * deep-link to a specific industry section on that page.
 * ──────────────────────────────────────────────────────────────────── */
const INDUSTRY_TILES = [
  { label: 'Food & Beverage',                slug: 'food-beverage' },
  { label: 'Meat Processing',                slug: 'meat-processing' },
  { label: 'Poultry Processing',             slug: 'poultry-processing' },
  { label: 'Dairy',                          slug: 'dairy' },
  { label: 'Bakery & Snack',                 slug: 'bakery-snack' },
  { label: 'Consumer Packaged Goods',        slug: 'cpg' },
  { label: 'Animal Nutrition',               slug: 'animal-nutrition' },
  { label: 'Agribusiness',                   slug: 'agribusiness' },
  { label: 'Industrial Manufacturing',       slug: 'industrial-manufacturing' },
  { label: 'Automotive',                     slug: 'automotive' },
  { label: 'Aerospace & Defense',            slug: 'aerospace-defense' },
  { label: 'Pharmaceutical & Medical Devices', slug: 'pharma-medical' },
  { label: 'Chemicals',                      slug: 'chemicals' },
  { label: 'Oil & Gas',                      slug: 'oil-gas' },
  { label: 'Metals & Mining',                slug: 'metals-mining' },
  { label: 'Warehouse & Distribution',       slug: 'warehouse-distribution' },
  { label: 'Food Service',                   slug: 'food-service' },
  { label: 'Private Equity & M&A',           slug: 'private-equity-ma' },
];

function IndustryTile({ label, slug }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/industries-served#${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '28px 18px',
        minHeight: 96,
        background: hovered ? '#183a61' : '#ffffff',
        color: hovered ? '#ffffff' : '#183a61',
        border: `1px solid ${hovered ? '#183a61' : '#e2e2dc'}`,
        textDecoration: 'none',
        fontFamily: 'inherit',
        fontSize: 15, fontWeight: 600, lineHeight: 1.25,
        letterSpacing: '-0.005em',
        transition: 'background-color 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        textWrap: 'balance',
      }}
    >
      <span>{label}</span>
      {/* Hover-only arrow — sits in the bottom-right, signals interactivity
          without adding clutter in resting state. */}
      <span aria-hidden="true" style={{
        position: 'absolute', right: 12, bottom: 10,
        fontSize: 14, fontWeight: 500,
        color: hovered ? '#eabb71' : 'transparent',
        transition: 'color 180ms ease',
        lineHeight: 1,
      }}>→</span>
    </Link>
  );
}

function SectionWhereWeWork() {
  return (
    <section style={{ background: S.bgWhite, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>

        {/* Section header — left-aligned to match the subsection rhythm
            below, so the whole section reads as a single anchored column
            instead of a centered-header / left-content mash-up. */}
        <div style={{ marginBottom: S.gapHeaderToBody, maxWidth: 920 }}>
          <Eyebrow label="Where We Work" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Wherever the Work is Physical, Repeatable, and Measured.
          </h2>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: 0,
            textWrap: 'pretty',
          }}>
            {typo("Execution capability gets built wherever value gets won or lost. Across the operation, and across the industries that depend on it.")}
          </p>
        </div>

        {/* Across the Operation — single content block aligned to the same
            left rail as the section header. Body width capped at a
            comfortable reading measure (~920) so the line lengths stay
            consistent throughout the section. */}
        <div style={{ marginBottom: 72, maxWidth: 920 }}>
          <h3 style={{
            fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, lineHeight: 1.2,
            color: C.navy, fontFamily: 'inherit',
            margin: '0 0 18px', letterSpacing: S.h2Tracking,
          }}>Across the Operation</h3>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: 0,
            textWrap: 'pretty',
          }}>
            {typo("Production and operations. Maintenance and reliability. Supply chain and procurement. Warehousing and logistics. Quality and safety. Working capital and financial flow. Wherever the gap between intent and output is showing up, that\u2019s where POWERS works.")}
          </p>
        </div>

        {/* Across Industries — same left rail. The grid stretches the full
            container width (so the tiles get the breadth they need to
            land the breadth-of-capability message) but its left edge
            aligns with the H3 above it. */}
        <div>
          <h3 style={{
            fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, lineHeight: 1.2,
            color: C.navy, fontFamily: 'inherit',
            margin: '0 0 22px', letterSpacing: S.h2Tracking,
          }}>Across Industries</h3>

          {/* Tile grid:
                desktop  ≥1024px : 6 columns
                tablet   ≥640px  : 3 columns
                mobile           : 2 columns
              Implemented with auto-fit + minmax so the grid degrades
              gracefully at every viewport without media queries. */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 1,
            background: C.gray100,
            border: `1px solid ${C.gray100}`,
          }}>
            {INDUSTRY_TILES.map((t) => (
              <IndustryTile key={t.slug} {...t} />
            ))}
          </div>

          {/* Closing line — single thesis statement closing the section.
              Treated as a display pull quote (not body) so it actually
              announces itself rather than getting lost beneath the grid.
              Same left rail + 920 measure as the rest of the section. */}
          <p style={{
            marginTop: 56,
            fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 600, lineHeight: 1.35,
            color: C.navy, fontFamily: 'inherit',
            maxWidth: 920, textWrap: 'balance',
            letterSpacing: S.h2Tracking,
            margin: '56px 0 0',
          }}>
            {typo("Different products. Different scales. Same problem. Turning intent into output, shift after shift, under whatever the quarter brings.")}
          </p>
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
    industry: 'Aerospace & Defense',
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
    <section style={{ background: S.bgNavy, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: S.gapHeaderToBody }}>
          <Eyebrow label="Proven Results" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.white, fontFamily: 'inherit', margin: '16px 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>The Work Speaks for Itself.</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 1, background: C.gray100, marginBottom: 56,
        }}>
          {CASE_STUDIES.map((cs, i) => <CaseStudyCard key={i} {...cs} />)}
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="case-studies.html"
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
              fontSize: 16, fontWeight: 600,
              color: h ? C.gold600 : C.gold,
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
    <section style={{ background: S.bgLight, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: S.gapHeaderToBody }}>
          <Eyebrow label="Insights" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
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
              color: h ? C.navy400 : C.navy,
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
    <section style={{ background: S.bgDeep, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <h2 style={{
          fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
          color: C.white, fontFamily: 'inherit', margin: 0,
          letterSpacing: S.h2Tracking, textWrap: 'pretty',
        }}>{typo("Build Execution Capability that Lasts.")}</h2>
        <p style={{
          fontSize: 18, fontWeight: 300, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.70)', fontFamily: 'inherit', margin: 0,
          textWrap: 'pretty',
        }}>{typo("Let\u2019s talk about what\u2019s possible inside your operation.")}</p>
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
      <SectionExecutionEngine />
      <SectionHowWeWork />
      <SectionWhereWeWork />
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
