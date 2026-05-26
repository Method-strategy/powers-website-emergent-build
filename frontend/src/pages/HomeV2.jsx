/* eslint-disable */
/* This file is a lossless port of the legacy index.html homepage.
   Original lived as inline <script type="text/babel"> JSX. Do not refactor.
   Visual edits should be made in /tmp/powers-website/powers-website-evolution/index.html
   first, then re-generate via scripts/convert_homepage.py. */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { typo } from '../lib/typo';
import PowersMetrics from '../components/PowersMetrics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once. Safe to call multiple times — GSAP dedupes.
gsap.registerPlugin(ScrollTrigger);

/* ── Tokens ── */
const C = {
  // Primary navy stack — three depths for layering
  ink:     '#0a1421',  // Deepest. Used for max-emphasis surfaces (hero, footer CTA).
  navy900: '#0d2442',  // Deep — case-study masthead, footer
  navy:    '#183a61',  // Brand navy — primary copy, anchors
  navy700: '#234a78',  // Mid-tone navy — secondary fills, hover lifts
  navy400: '#4a6a8a',  // Muted navy — meta text, sub-labels

  // Gold accent stack — pale wash through deep emphasis
  gold200: '#f7e8c8',  // Pale gold wash — subtle backgrounds, surface lifts
  gold:    '#eabb71',  // Brand gold — primary accent
  gold600: '#c9963e',  // Deep gold — hover, emphasis on light
  gold800: '#8a6321',  // Deepest gold — used sparingly on light surfaces for max contrast

  // Secondary accent — copper (paired with gold sparingly for variety)
  copper:  '#a55a3e',  // Warm accent for one-off editorial moments

  // Neutrals — warm-to-cool spread for surface layering
  ivory:   '#fbf9f4',  // Warmest off-white — premium content surfaces
  bone:    '#f4efe4',  // Warm off-white — content sections
  paper:   '#f7f6f1',  // Neutral off-white — section bands (legacy bgLight)
  fog:     '#dcdfe3',  // Cool light gray — dividers, fine borders
  steel:   '#3d5876',  // Cool mid — captions on dark surfaces
  body:    '#3a3a38',  // Body text — warm dark gray
  white:   '#ffffff',
  gray50:  '#f5f5f3',
  gray100: '#e8e8e4',
  gray400: '#888884',
};

/* ── HOMEPAGE DESIGN SYSTEM ──────────────────────────────────────────
 * Single source of truth for the homepage's layout, type, and rhythm.
 *
 * Layout — three approved measures, used purposefully:
 *   maxNarrow  — 640px. Punchy hero / focal display content.
 *   maxRead    — 760px. Reading copy + display headings.
 *   maxWide    — 1240px. Card grids, the engine diagram, tool surfaces.
 *
 * Alignment regimen — left-anchored is the default voice. Centered
 * alignment is reserved for big moments only (hero, payoff lines,
 * single-thesis closers). This is the discipline that fixes "all
 * over the place" feeling.
 *
 * Type — every H2 on the page uses h2Size / h2Weight / h2LH /
 * h2Tracking. Editorial variation happens INSIDE the H2 via italic
 * or weight contrast, not by varying the H2 itself. The system is
 * what makes the site feel coherent.
 * ────────────────────────────────────────────────────────────────── */
const S = {
  // Surface tokens
  bgWhite: '#ffffff',
  bgIvory: '#fbf9f4',
  bgBone:  '#f4efe4',
  bgPaper: '#f7f6f1',
  bgNavy:  '#183a61',
  bgDeep:  '#0d2442',
  bgInk:   '#0a1421',

  // Vertical rhythm — every section uses these
  sectionPadY: 'clamp(96px, 9vw, 128px)',
  sectionPadX: 'clamp(24px, 4vw, 48px)',
  gapHeaderToBody: 64,

  // Measure widths — three only
  maxNarrow: 640,
  maxRead: 760,
  maxWide: 1240,

  // Display type
  h2Size: 'clamp(28px, 3.4vw, 42px)',
  h2Weight: 800,
  h2LH: 1.12,
  h2Tracking: '-0.012em',
  h3Size: 'clamp(20px, 2vw, 26px)',
  h3Weight: 700,

  // Body type
  ledeSize: 17,
  ledeLH: 1.65,
  ledeWeight: 300,
};

/* ── COMMON SECTION ATOMS ────────────────────────────────────────────
 * Shared building blocks so every section gets the same treatment
 * automatically instead of re-implementing the rhythm by hand.
 * ────────────────────────────────────────────────────────────────── */

/* SectionShell — every section wraps in this. Standardizes background,
   padding, and inner container width. Pass `align="left"` for the
   default editorial alignment, `align="center"` for the rare big
   moments. */
function SectionShell({ bg, maxWidth, align = 'left', overflow = false, style, children }) {
  return (
    <section style={{
      background: bg || S.bgWhite,
      padding: `${S.sectionPadY} ${S.sectionPadX}`,
      position: 'relative',
      overflow: overflow ? 'visible' : 'hidden',
      ...(style || {}),
    }}>
      <div style={{
        maxWidth: maxWidth || S.maxWide,
        margin: '0 auto',
        textAlign: align,
      }}>
        {children}
      </div>
    </section>
  );
}

/* SectionHeader — eyebrow + H2 + optional lede. One header treatment
   used across every section. Variants:
     tone="light" — for navy / ink surfaces (white type)
     tone="dark"  — for light surfaces (navy type, default)
     align        — inherits from parent shell unless overridden
   The lede always sits at maxRead width regardless of the shell, so
   long-form reading copy stays in a comfortable measure even when
   the surrounding tool surface is wider. */
function SectionHeader({ eyebrow, h2, lede, tone = 'dark', align = 'left' }) {
  const isLight = tone === 'light';
  const navyColor = isLight ? C.white : C.navy;
  const bodyColor = isLight ? 'rgba(255,255,255,0.78)' : C.body;
  return (
    <div style={{
      marginBottom: S.gapHeaderToBody,
      maxWidth: S.maxRead,
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0,
      textAlign: align,
    }}>
      <Eyebrow label={eyebrow} light={isLight} />
      <h2 style={{
        fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
        color: navyColor, fontFamily: 'inherit',
        margin: lede ? '16px 0 22px' : '16px 0 0',
        letterSpacing: S.h2Tracking, textWrap: 'pretty',
      }}>{h2}</h2>
      {lede && (
        <p style={{
          fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
          color: bodyColor, fontFamily: 'inherit',
          margin: 0, textWrap: 'pretty',
        }}>
          {typeof lede === 'string' ? typo(lede) : lede}
        </p>
      )}
    </div>
  );
}

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

        {/* H1 — Standalone provocation. The resolution lives in the
            subhead and rhymes with the closing CTA. Motion: three-beat
            opacity fade (Stop · Chasing · Results.), ~400ms per word,
            no overlap between beats, no slide/scale/drift. Plays once
            on first load only. Reduced-motion: renders fully resolved
            with zero animation. SEO/a11y: text is always present and
            readable to crawlers and assistive tech. */}
        <h1 style={{
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 800,
          lineHeight: 1.04,
          color: C.white,
          fontFamily: 'inherit',
          maxWidth: 900,
          margin: '0 0 28px',
          textWrap: 'pretty',
          letterSpacing: '-0.018em',
        }}>
          <HeroHeadline />
        </h1>

        {/* Subhead — contrast-structure subhead that reframes results
            as a readout and names a foundation underneath the operation,
            without revealing the number five. The "five disciplines"
            reveal happens in Row 2 by design. */}
        <p style={{
          fontSize: 18,
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.80)',
          fontFamily: 'inherit',
          maxWidth: 680,
          margin: '0 0 36px',
          textWrap: 'pretty',
        }}>
          {typo("Strong quarters and weak ones are both readouts of the same thing: the fundamentals at the root of your operation. When they\u2019re missing, performance is at the mercy of conditions. When they\u2019re built in, it isn\u2019t. That foundation is a specific set of disciplines we build into your operation to execute at the highest level and withstand whatever comes next.")}
        </p>

        {/* Scroll cue — minimal, gold, sits above the CTAs */}
        <div style={{
          fontSize: 12, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: C.gold, fontFamily: 'inherit',
          marginBottom: 28,
        }}>
          ↓ &nbsp;Start with the foundation
        </div>

        {/* CTAs intentionally removed from the hero per v2 copy spec.
            The hero is a provocation that deliberately does not resolve;
            scroll cue above is the only forward affordance. PrimaryCTA
            still ships in the closing CTA section. */}
      </div>

    </section>
  );
}

/* HeroHeadline — GSAP-driven three-beat reveal: Stop · Chasing · Results.
   Each word: opacity 0 + y 14 → opacity 1 + y 0, stagger 0.42s, eased
   with power4.out for the lift and power2.out for the opacity to keep
   the resolve crisp. The lift is intentionally small (14px) — the
   spec calls for "no slide," and at this distance the y motion reads
   as *weight settling* rather than slide-in. Period travels with
   "Results." as a single token.

   Accessibility / SEO: words render at their final state immediately
   in the DOM. GSAP overrides to the start state only after mount, so
   crawlers and reduced-motion users see the fully resolved headline
   with zero animation. */
function HeroHeadline() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const words = ref.current ? ref.current.querySelectorAll('[data-hero-word]') : [];
    if (!words.length) return;

    // Set initial state in the same frame to avoid a flash of the
    // resolved headline before the animation begins.
    gsap.set(words, { opacity: 0, y: 14, willChange: 'transform, opacity' });

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 0.18,
      onComplete: () => {
        // Drop willChange after the timeline resolves so it doesn't
        // sit on the GPU for the life of the page.
        gsap.set(words, { willChange: 'auto' });
      },
    });
    tl.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.62,
      stagger: 0.42,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <span ref={ref}>
      <span data-hero-word style={{ display: 'inline-block' }}>Stop</span>
      {'\u00A0'}
      <span data-hero-word style={{ display: 'inline-block' }}>Chasing</span>
      {'\u00A0'}
      <span data-hero-word style={{ display: 'inline-block' }}>Results.</span>
    </span>
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
    response: 'We connect production performance to outbound execution — building the scheduling and coordination disciplines that make delivery commitments stick.',
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
          body="POWERS consultants are on the floor, in the shifts, inside the systems where performance actually breaks down. We build the discipline that runs after we leave — in your supervisors, your standards, and your daily operating routines."
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
    <section style={{ background: S.bgWhite, width: '100%', padding: `${S.sectionPadY} ${S.sectionPadX}`, position: 'relative' }}>
      {/* Subtle off-page architectural mark — large outline "+" in
          pale gold sits at the top-right corner of the section as
          editorial punctuation. Aligns visually with the additive
          + joiners used in Row 2 above. */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: 'clamp(40px, 8vw, 120px)', top: 'clamp(56px, 6vw, 88px)',
        fontSize: 'clamp(120px, 14vw, 220px)', fontWeight: 200, lineHeight: 0.8,
        color: C.gold200, fontFamily: 'inherit',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>+</div>

      <div style={{ maxWidth: S.maxWide, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Left-anchored editorial header — eyebrow + H2 sit on the
            left rail, matching the section's body alignment. */}
        <div style={{ maxWidth: S.maxRead, marginBottom: 44 }}>
          <Eyebrow label={"Why We\u2019re Different"} />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Most Firms Chase the Symptom. <span style={{ color: C.gold800, fontStyle: 'italic', fontWeight: 700 }}>POWERS Fixes the Root.</span>
          </h2>
        </div>

        {/* Long-form narrative argument. Editorial layout: body sits
            in a reading column with a single inset pull-quote that
            breaks up the wall of text and gives the section a
            visual pivot point. */}
        <div style={{ maxWidth: S.maxRead }}>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: '0 0 22px', textWrap: 'pretty',
          }}>
            {typo("Most consulting firms work on the readout. They target the number, move it, write the deck, and leave. Then the number drifts back, because nothing underneath it changed.")}
          </p>

          {/* Pull-quote — editorial pivot. Serif italic for typographic
              contrast against the predominantly sans-serif page; left
              gold rule anchors it to the page's accent system. */}
          <blockquote style={{
            margin: '36px 0 36px -4px',
            paddingLeft: 28,
            borderLeft: `3px solid ${C.gold}`,
            fontSize: 'clamp(22px, 2.4vw, 28px)',
            lineHeight: 1.3,
            fontWeight: 500,
            fontStyle: 'italic',
            color: C.navy,
            fontFamily: 'inherit',
            letterSpacing: '-0.008em',
            textWrap: 'balance',
          }}>
            {typo("The tallest trees on earth don\u2019t stand because of what you can see. They stand because of a root system, decades deep, that most people never think about.")}
          </blockquote>

          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: '0 0 22px', textWrap: 'pretty',
          }}>
            {typo("Operations are no different. The ones that perform under pressure are the ones with something strong enough underneath to carry the weight. That\u2019s the level we work at.")}
          </p>

          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: '0 0 22px', textWrap: 'pretty',
          }}>
            {typo("Every operation has an inflection point, the moment execution stops depending on conditions and starts performing regardless of them. That moment comes when the right capability gets built into the operation itself. The kind that doesn\u2019t show up on the org chart or in the strategy. It\u2019s underneath. Load-bearing. The root system that keeps strong performance running under pressure.")}
          </p>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: '0 0 22px', textWrap: 'pretty',
          }}>
            {typo("When that system is in, the operation changes, and you can hear it. The line just runs. The team works any problems before they cascade. Bad shifts stay contained. Good shifts compound. ")}
            <span style={{ color: C.navy, fontWeight: 600 }}>The radios get quiet.</span>
            {typo(" That\u2019s the sound of an operation producing what it was built to produce. At rate. At margin. At scale.")}
          </p>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: 0, textWrap: 'pretty',
          }}>
            {typo("That\u2019s what POWERS builds, with your people, on the floor, in the shifts, inside the routines that make execution capability last long after we\u2019re gone.")}
          </p>
        </div>
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

/* ── SECTION — PRESSURE IN / PERFORMANCE OUT ──────────────────────
 *
 * GSAP scroll-driven three-act choreography:
 *
 *   Act 1 — Pressures arrive.
 *     Forces fade in from the left, one at a time, each preceded by
 *     a red trend-down marker. The arrivals are paced so the reader
 *     can register each pressure as it lands rather than seeing them
 *     all at once. A faint dashed flow line draws from each force
 *     toward the engine as it arrives — visualizing the absorption.
 *
 *   Act 2 — The engine absorbs.
 *     With every force that lands, the engine subtly intensifies:
 *     the navy block lifts in shadow, a gold ring breathes at a
 *     slightly faster rate, and a soft halo grows. By the time all
 *     forces are in, the engine is fully "loaded."
 *
 *   Act 3 — Results emit.
 *     The engine releases. Results emerge from the engine and
 *     travel rightward into the Consistent Results column, each
 *     preceded by a green trend-up marker. A solid gold flow line
 *     draws from the engine into each result as it lands.
 *
 * The scrub is set deliberately slow so the reader can absorb the
 * "absorbing → producing" beat. Reduced-motion renders the entire
 * diagram fully resolved and skips all GSAP setup.
 * ────────────────────────────────────────────────────────────────── */
function SectionExecutionEngine() {
  const sectionRef = useRef(null);
  const enginePanelRef = useRef(null);
  const engineHaloRef = useRef(null);
  const closerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const section = sectionRef.current;
    if (!section) return;

    const leftItems = section.querySelectorAll('[data-force-item]');
    const rightItems = section.querySelectorAll('[data-result-item]');
    const leftLines = section.querySelectorAll('[data-flow-line-left]');
    const rightLines = section.querySelectorAll('[data-flow-line-right]');
    const engine = enginePanelRef.current;
    const halo = engineHaloRef.current;
    const closer = closerRef.current;

    if (reduce) {
      // Resolved state — no animation, no GSAP setup.
      return;
    }

    // Initial states. Left items sit 24px left + invisible; right
    // items sit 24px right + invisible. Engine sits 14px lifted +
    // 0.96 scale. Halo invisible. Lines collapsed (scaleX 0).
    gsap.set(leftItems, { opacity: 0, x: -28, willChange: 'transform, opacity' });
    gsap.set(rightItems, { opacity: 0, x: 28, willChange: 'transform, opacity' });
    gsap.set(leftLines, { scaleX: 0, transformOrigin: '100% 50%' });
    gsap.set(rightLines, { scaleX: 0, transformOrigin: '0% 50%' });
    if (engine) gsap.set(engine, { y: 18, opacity: 0, scale: 0.965, willChange: 'transform, opacity' });
    if (halo) gsap.set(halo, { opacity: 0, scale: 0.8 });
    if (closer) gsap.set(closer, { opacity: 0, y: 14 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Range tuned for the section's natural height: starts as
          // the section comes into view, ends well past so the user
          // has a full screen of scroll to walk through Act 1 → 3.
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1.2,
        },
      });

      // Engine lifts into place first — establishes the system that
      // will absorb the inputs.
      if (engine) {
        tl.to(engine, {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'power3.out',
          duration: 1.2,
        }, 0);
      }
      if (halo) {
        tl.to(halo, {
          opacity: 0.45,
          scale: 1,
          ease: 'power2.out',
          duration: 1.0,
        }, 0.4);
      }

      // Act 1: each force arrives + draws a flow line toward the
      // engine. Stagger is generous so the reader has time to read
      // each force as it lands.
      const FORCE_STAGGER = 0.5;
      leftItems.forEach((item, i) => {
        const at = 1.0 + i * FORCE_STAGGER;
        tl.to(item, {
          opacity: 1,
          x: 0,
          ease: 'power3.out',
          duration: 0.7,
        }, at);
        if (leftLines[i]) {
          tl.to(leftLines[i], {
            scaleX: 1,
            ease: 'power2.inOut',
            duration: 0.55,
          }, at + 0.15);
        }
        // Subtle engine intensification with each force absorbed —
        // halo brightens and breathes faster the more loaded it gets.
        if (halo) {
          tl.to(halo, {
            opacity: 0.45 + (i + 1) * 0.04,
            scale: 1.0 + (i + 1) * 0.012,
            ease: 'power1.out',
            duration: 0.4,
          }, at + 0.05);
        }
      });

      // Act 2 → Act 3 bridge: engine "releases" with a small surge
      // before results emit.
      if (halo) {
        const releaseAt = 1.0 + leftItems.length * FORCE_STAGGER + 0.2;
        tl.to(halo, {
          opacity: 0.85,
          scale: 1.18,
          ease: 'power2.out',
          duration: 0.6,
        }, releaseAt)
          .to(halo, {
            opacity: 0.55,
            scale: 1.06,
            ease: 'power2.inOut',
            duration: 0.5,
          }, releaseAt + 0.6);
      }

      // Act 3: results emit + draw flow lines from the engine into
      // each result.
      const RESULT_START = 1.0 + leftItems.length * FORCE_STAGGER + 0.8;
      const RESULT_STAGGER = 0.46;
      rightItems.forEach((item, i) => {
        const at = RESULT_START + i * RESULT_STAGGER;
        if (rightLines[i]) {
          tl.to(rightLines[i], {
            scaleX: 1,
            ease: 'power2.inOut',
            duration: 0.5,
          }, at);
        }
        tl.to(item, {
          opacity: 1,
          x: 0,
          ease: 'power3.out',
          duration: 0.7,
        }, at + 0.18);
      });

      // Closer line settles in once everything's resolved.
      if (closer) {
        tl.to(closer, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.9,
        }, '>-0.2');
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: S.bgWhite, padding: `${S.sectionPadY} ${S.sectionPadX}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>

        {/* Header — left-anchored editorial. Eyebrow + H2 + lede sit
            in a reading column on the left rail to match the section
            rhythm established earlier on the page. */}
        <div style={{ marginBottom: S.gapHeaderToBody, maxWidth: S.maxRead }}>
          <Eyebrow label="How Execution Capability Creates Value" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Pressure In. <span style={{ color: C.gold800, fontStyle: 'italic', fontWeight: 700 }}>Performance Out.</span>
          </h2>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: 0,
            textWrap: 'pretty',
          }}>
            {typo("Every operation faces conditions it can\u2019t control. Market pressure. Workforce turnover. Equipment failure. Demand swings. The question isn\u2019t whether those pressures show up. They always do. The question is whether the operation has the foundation to absorb them and still produce.")}
          </p>
        </div>

        {/* DIAGRAM */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr 1fr',
          columnGap: 'clamp(20px, 4vw, 56px)',
          alignItems: 'stretch',
          position: 'relative',
        }}>
          {/* LEFT COLUMN — pressures (forces). Each item carries a red
              trend-down marker and a flow line that draws toward the
              engine as the item lands. */}
          <div style={{ position: 'relative', paddingTop: 8 }}>
            <DiagramColHead label="Varying Forces" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {VARYING_FORCES.map((item, i) => (
                <li key={i}
                  data-force-item
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontSize: 14.5, fontWeight: 500, color: C.navy, fontFamily: 'inherit',
                    padding: '12px 0', borderBottom: `1px solid ${C.fog}`,
                    position: 'relative',
                  }}>
                  <RedDownMarker color="#b8392d" />
                  <span>{item}</span>
                  {/* Flow line from this force toward the engine.
                      Sits in the column gap on the right of each item,
                      scaleX from 1 (right edge) toward 0 (left). */}
                  <span
                    data-flow-line-left
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      right: -12,
                      top: '50%',
                      width: 'clamp(20px, 4vw, 56px)',
                      height: 1,
                      background: `linear-gradient(to right, ${C.fog}, ${C.gold})`,
                      transform: 'scaleX(0)',
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER — the engine. Navy panel with a subtle gold halo
              that brightens and breathes as forces are absorbed. The
              halo is the load indicator: invisible at rest, ramping
              up to peak as the system reaches capacity. */}
          <div style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            paddingTop: 8,
          }}>
            {/* Halo — sits behind the engine panel. Gold radial blur
                that grows + brightens with each force. */}
            <div
              ref={engineHaloRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -28,
                borderRadius: 36,
                background: `radial-gradient(ellipse at center, ${C.gold200} 0%, rgba(234,187,113,0.25) 35%, rgba(234,187,113,0) 70%)`,
                pointerEvents: 'none',
                filter: 'blur(12px)',
                zIndex: 0,
              }}
            />
            {/* Engine panel */}
            <div
              ref={enginePanelRef}
              style={{
                position: 'relative', zIndex: 1,
                background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navy900} 100%)`,
                borderRadius: 18,
                color: C.white,
                padding: 'clamp(28px, 3vw, 40px) clamp(24px, 2.4vw, 34px) clamp(32px, 3vw, 44px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                flex: 1,
                boxShadow: `0 32px 80px -28px rgba(13,36,66,0.65), inset 0 0 0 1px rgba(234,187,113,0.22)`,
                overflow: 'hidden',
              }}
            >
              {/* Fine architectural grid texture */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, opacity: 0.14, pointerEvents: 'none',
                backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                mixBlendMode: 'overlay',
              }} />

              <h3 style={{
                fontSize: 'clamp(20px, 1.9vw, 24px)', fontWeight: 700, lineHeight: 1.2,
                color: C.white, fontFamily: 'inherit',
                margin: '0 0 14px', letterSpacing: '-0.012em',
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

          {/* RIGHT COLUMN — results. Mirror of left column with green
              up-markers and flow lines that draw from the engine
              outward as each result lands. */}
          <div style={{ position: 'relative', paddingTop: 8 }}>
            <DiagramColHead label="Consistent Results" align="left" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {CONSISTENT_RESULTS.map((item, i) => (
                <li key={i}
                  data-result-item
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontSize: 14.5, fontWeight: 500, color: C.navy, fontFamily: 'inherit',
                    padding: '12px 0', borderBottom: `1px solid ${C.fog}`,
                    position: 'relative',
                  }}>
                  {/* Flow line from engine into this result. */}
                  <span
                    data-flow-line-right
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: -12,
                      top: '50%',
                      width: 'clamp(20px, 4vw, 56px)',
                      height: 1,
                      background: `linear-gradient(to left, ${C.fog}, ${C.gold})`,
                      transform: 'scaleX(0)',
                      transformOrigin: '0% 50%',
                    }}
                  />
                  <GreenUpMarker color="#2d7a4f" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing line — settles in once both columns resolve. */}
        <p ref={closerRef} style={{
          fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 700, lineHeight: 1.25,
          color: C.navy, fontFamily: 'inherit',
          margin: '72px 0 0', maxWidth: S.maxRead,
          letterSpacing: '-0.012em', textWrap: 'balance',
        }}>
          {typo("When the foundation is strong, conditions stop determining outcomes.")}
        </p>
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
    body: 'The cadence, metrics, and conversations that close the loop every shift, every day. It\u2019s the keystone. Without it, the other four drift. With it, they lock together and compound.',
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

/* ExpertiseCard — Five Disciplines card. Visual treatment only; the
   lock-in animation is driven by the parent SectionExpertiseAreas
   through GSAP, which directly mutates opacity / transform on the
   card's root element. Hover state for the gold top rule stays here.

   The card also carries an opt-in keystone treatment used by
   SectionExpertiseAreas only on the 5th card (Daily Accountability).
   Keystone state is a derived prop driven by ScrollTrigger; when it
   activates, a gold top rule turns on permanently to signal that the
   structure has been completed. */
function ExpertiseCard({ headline, body, isKeystone, keystoneLocked }) {
  const [h, setH] = useState(false);
  // Keystone wins over hover state for the top rule once it locks.
  const topRule = isKeystone && keystoneLocked
    ? '#eabb71'
    : (h ? '#eabb71' : '#e8e8e4');
  return (
    <div
      data-discipline-card
      style={{
        background: '#ffffff',
        border: `1px solid #e8e8e4`,
        borderTop: `3px solid ${topRule}`,
        padding: '36px 28px 32px',
        display: 'flex', flexDirection: 'column', gap: 0,
        height: '100%',
        transition: 'border-top-color 320ms ease',
        // Starting state for the GSAP timeline. GSAP overwrites these
        // on mount; setting them inline ensures no FOUC before GSAP
        // runs. Reduced-motion users see the fully-resolved card (the
        // hook below short-circuits and leaves DOM at final state).
        opacity: 1,
        transform: 'translate3d(0,0,0)',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {/* Per-card [+] removed; the additive operators now live in
          PlusJoiner components between cards, so the row reads as
          card + card + card = result. */}
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

/* PlusJoiner — additive operator between cards. Gold "+" sign in a
   narrow flex column. Each joiner animates in with its right-hand
   neighbor card, so the build reads literally as
     card + card + card + card + card
   The 5 cards plus the 4 joiners are framed by the perimeter SVG. */
function PlusJoiner({ index }) {
  return (
    <div
      data-plus-joiner
      data-plus-index={index}
      aria-hidden="true"
      style={{
        flex: '0 0 44px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, fontWeight: 300, lineHeight: 1,
        color: '#eabb71',
        fontFamily: 'inherit',
        userSelect: 'none',
        // GSAP initial state set inline so there's no flash before
        // the timeline mounts.
        opacity: 1,
        transform: 'translate3d(0,0,0)',
      }}
    >+</div>
  );
}

/* PerimeterFrame — gold frame that wraps the 5-card row.
   Two layers:
     1. solid:  the perimeter rect, drawn on once via stroke-dashoffset.
        Tied to the scrubbed timeline so it draws in concert with the
        keystone landing.
     2. comet:  a smaller bright segment that traces the perimeter
        perpetually after the solid is drawn in. Independent of scroll;
        starts when the keystone locks, kills when the user scrolls
        back above the keystone trigger.
   The SVG sits absolutely positioned with a small negative inset so
   the line floats just outside the card edges instead of clipping
   against them. */
const PERIMETER_INSET = 10;
const PerimeterFrame = React.forwardRef(function PerimeterFrame(_props, ref) {
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        inset: -PERIMETER_INSET,
        width: `calc(100% + ${PERIMETER_INSET * 2}px)`,
        height: `calc(100% + ${PERIMETER_INSET * 2}px)`,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 2,
      }}
    >
      {/* Solid perimeter. pathLength normalizes the path to 1000 so
          the stroke-dasharray math is independent of element width.
          Initial dashoffset = 1000 makes it invisible. */}
      <rect
        data-perimeter-solid
        x="0.5" y="0.5"
        width="calc(100% - 1px)" height="calc(100% - 1px)"
        fill="none"
        stroke="#eabb71"
        strokeWidth="1.5"
        pathLength="1000"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
        }}
      />
      {/* Comet — short bright segment that perpetually circles after
          the solid finishes drawing. Brighter gold + slightly thicker
          + rounded ends so it reads as a moving light, not a second
          static line. Opacity starts at 0; GSAP turns it on after the
          solid finishes. */}
      <rect
        data-perimeter-comet
        x="0.5" y="0.5"
        width="calc(100% - 1px)" height="calc(100% - 1px)"
        fill="none"
        stroke="#fdd58a"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1000"
        style={{
          strokeDasharray: '70 930',
          strokeDashoffset: 0,
          opacity: 0,
          filter: 'drop-shadow(0 0 6px rgba(234, 187, 113, 0.55))',
        }}
      />
    </svg>
  );
});

function SectionExpertiseAreas() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const payoffRef = useRef(null);
  const perimeterRef = useRef(null);
  const cometTweenRef = useRef(null);
  const [keystoneLocked, setKeystoneLocked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setKeystoneLocked(true);
      return;
    }

    const section = sectionRef.current;
    const row = rowRef.current;
    const perimeter = perimeterRef.current;
    if (!section || !row) return;

    const cards = row.querySelectorAll('[data-discipline-card]');
    const joiners = row.querySelectorAll('[data-plus-joiner]');
    const solid = perimeter ? perimeter.querySelector('[data-perimeter-solid]') : null;
    const comet = perimeter ? perimeter.querySelector('[data-perimeter-comet]') : null;
    const payoff = payoffRef.current;
    if (!cards.length) return;

    // Initial states. Each card starts 80px below + invisible; each
    // joiner starts scaled-down + invisible so it reads as the
    // operator "snapping into place" between the neighbors.
    gsap.set(cards, { opacity: 0, y: 80, willChange: 'transform, opacity' });
    gsap.set(joiners, { opacity: 0, scale: 0.6, willChange: 'transform, opacity' });
    if (payoff) gsap.set(payoff, { opacity: 0, y: 18, willChange: 'transform, opacity' });
    if (solid) gsap.set(solid, { strokeDashoffset: 1000 });
    if (comet) gsap.set(comet, { opacity: 0 });

    const ctx = gsap.context(() => {
      // Helper: start the perpetual comet animation. Independent of
      // the scrubbed scroll timeline. Killed and reset when the user
      // scrolls back above the keystone (handled in onUpdate below).
      const startComet = () => {
        if (!comet || cometTweenRef.current) return;
        gsap.set(comet, { opacity: 1, strokeDashoffset: 0 });
        cometTweenRef.current = gsap.to(comet, {
          strokeDashoffset: -1000,
          duration: 5.6,
          ease: 'none',
          repeat: -1,
        });
      };
      const stopComet = () => {
        if (cometTweenRef.current) {
          cometTweenRef.current.kill();
          cometTweenRef.current = null;
        }
        if (comet) gsap.set(comet, { opacity: 0 });
      };

      // Main scrubbed timeline. Range extended so the user has to
      // scroll meaningfully through the section to land each card.
      // start: when the section top hits 95% of viewport (just
      // entering); end: when the section top is 25% above viewport
      // top (well past). That's ~120% of viewport-height of scroll
      // distance — slow and deliberate by design.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Tuned for Row 2 sitting directly under the hero: start
          // when the section top hits 75% of viewport (i.e., the
          // section header has properly entered) and end well past
          // viewport top, so the user has a full screen-worth of
          // scroll to land each discipline.
          start: 'top 75%',
          end: 'top -45%',
          scrub: 1.1,
          onUpdate: (self) => {
            const locked = self.progress >= 0.86;
            setKeystoneLocked(locked);
            if (locked && self.direction === 1) startComet();
            else if (!locked && self.direction === -1) stopComet();
          },
        },
      });

      // Card lock-ins with weighted easing. Stagger of 1.4s gives
      // each card its own deliberate "settle moment" before the next
      // arrives. Card duration of 1.2s keeps each lock-in heavy.
      const STAGGER = 1.4;
      cards.forEach((card, i) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 1.2,
        }, i * STAGGER);
      });

      // Joiners — each + appears as its right-neighbor card lands.
      // Joiner i sits between cards i and i+1, so it animates with
      // card i+1's timeline position, slightly delayed so it reads as
      // "this new card just got added by this operator."
      joiners.forEach((joiner, i) => {
        // joiner i is between cards[i] and cards[i+1] in DOM order.
        tl.to(joiner, {
          opacity: 1,
          scale: 1,
          ease: 'back.out(2)',
          duration: 0.55,
        }, (i + 1) * STAGGER - 0.25);
      });

      // Perimeter draw-on — begins as the keystone card is mid-lock
      // and completes a beat after the keystone lands. Eased in/out
      // so the line accelerates around the corners and slows as it
      // closes the loop.
      if (solid) {
        tl.to(solid, {
          strokeDashoffset: 0,
          ease: 'power2.inOut',
          duration: 1.8,
        }, 4 * STAGGER + 0.2);
      }

      // Payoff line — resolves just after the perimeter closes.
      if (payoff) {
        tl.to(payoff, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.9,
        }, '>-0.4');
      }
    }, section);

    return () => {
      if (cometTweenRef.current) {
        cometTweenRef.current.kill();
        cometTweenRef.current = null;
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: S.bgBone, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: S.gapHeaderToBody }}>
          <Eyebrow label="What We Build" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>Five Disciplines. One Operation That Doesn&rsquo;t Break Down.</h2>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            maxWidth: 720, margin: '0 auto', textAlign: 'left',
            textWrap: 'pretty',
          }}>
            {typo("The foundation is five disciplines. Not five initiatives or five priorities, five disciplines built into how the operation runs every shift. Weaken one and the others drift. Build them together and they interlock into something load-bearing, deep enough that performance doesn\u2019t break down when conditions do.")}
          </p>
        </div>

        {/* Row container — flex row of [card + joiner + card + joiner ... card]
            wrapped by an SVG perimeter frame. Position: relative anchors
            the absolute SVG. On narrow screens the row collapses to a
            column via flex-wrap; the joiners hide via media query so
            mobile shows just stacked cards. */}
        <div
          ref={rowRef}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            gap: 0,
            background: C.gray100,
          }}
        >
          <PerimeterFrame ref={perimeterRef} />
          {EXPERTISE_CARDS.map((card, i) => (
            <React.Fragment key={i}>
              {i > 0 && <PlusJoiner index={i - 1} />}
              <div style={{ flex: '1 1 200px', minWidth: 0, display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex' }}>
                  <ExpertiseCard
                    {...card}
                    isKeystone={i === EXPERTISE_CARDS.length - 1}
                    keystoneLocked={keystoneLocked}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <p ref={payoffRef} style={{
          marginTop: 64,
          fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 600, lineHeight: 1.35,
          color: C.navy, fontFamily: 'inherit',
          maxWidth: 920, textWrap: 'balance',
          letterSpacing: S.h2Tracking,
          textAlign: 'center', margin: '64px auto 0',
        }}>
          {typo("Five disciplines. One root system. An operation that stays standing when conditions don\u2019t.")}
        </p>
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
    <section style={{ background: S.bgPaper, padding: `${S.sectionPadY} 0` }}>
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
            {typo("That\u2019s how the ability to execute under any circumstances gets built. Not described, not recommended, built from the roots up. And it\u2019s why the gains keep running long after we\u2019re gone.")}
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
 * Capability presentation in prose. The 18-tile industry grid that was
 * here was removed per the v2 copy draft: the section now makes the
 * functional-scope and industry-range arguments in body copy and links
 * out to a dedicated Industries page for the deeper view.
 *
 * The INDUSTRY_TILES const and the IndustryTile component below remain
 * in the file but are no longer rendered on the homepage. Left in place
 * so they can be reused on /industries-served without a second port.
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

// Retained for future reuse on /industries-served. Not rendered here.
// eslint-disable-next-line no-unused-vars
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
  const [linkHover, setLinkHover] = useState(false);
  return (
    <section style={{ background: S.bgWhite, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>

        {/* Section header — left-anchored column. Single 920px measure
            for header + body so the section reads as one continuous
            argument rather than a header / multi-block stack. */}
        <div style={{ marginBottom: 36, maxWidth: 920 }}>
          <Eyebrow label="Where We Work" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 28px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Wherever the Work is Physical, Repeatable, and Measured.
          </h2>
        </div>

        {/* Body — single two-paragraph block that makes the
            functional-scope argument and then names the industry range
            as a credential. The 18-tile grid that used to live here was
            removed per the v2 copy draft; the breadth-of-industries
            argument is now made in prose, and the link below routes
            curious visitors to the dedicated Industries page. */}
        <div style={{ maxWidth: 920 }}>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: '0 0 22px',
            textWrap: 'pretty',
          }}>
            {typo("Execution capability doesn\u2019t belong to one corner of the operation. We build it across production and maintenance, supply chain and procurement, warehousing and logistics, quality and safety, and the working capital and financial flow the operation produces. Whenever the gap between intent and output shows up, that\u2019s where the work happens.")}
          </p>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit', margin: '0 0 22px',
            textWrap: 'pretty',
          }}>
            {typo("That work spans the industries where execution is measured every shift, from food and beverage and protein processing to automotive, aerospace and defense, industrial manufacturing, pharmaceuticals, and the private equity firms that own them. Different products. Different scales. Same problem. Turning intent into output, shift after shift, under whatever the quarter brings.")}
          </p>

          {/* Single explore link out to the dedicated Industries page. */}
          <Link
            to="/industries-served"
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
            style={{
              display: 'inline-block',
              marginTop: 6,
              fontSize: 15, fontWeight: 600,
              color: linkHover ? C.gold600 : C.gold,
              textDecoration: 'none', fontFamily: 'inherit',
              transition: 'color 150ms ease',
              letterSpacing: '0.01em',
            }}
          >
            Explore the industries we serve →
          </Link>
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
            color: C.white, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>Operations Built for Lasting Results.</h2>
          {/* Peer-proof intro — frames the case studies as proof that the
              reader's peers have built on the same five disciplines. */}
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: 'rgba(255,255,255,0.78)', fontFamily: 'inherit',
            maxWidth: 720, margin: '0 auto', textAlign: 'left',
            textWrap: 'pretty',
          }}>
            {typo("The operations below were built on the same five disciplines. Different industries, different pressures, the same foundation underneath.")}
          </p>
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
    summary: 'The competitive advantage in American manufacturing isn\u2019t technology. It\u2019s the operating discipline to deploy it effectively.',
  },
  {
    category: 'Frontline Leadership',
    headline: 'The Supervisor Gap: Why Most Improvement Programs Stall at the Floor Level',
    summary: 'When supervisors are firefighting instead of leading, the operation breaks down. Here\u2019s what changing that actually takes.',
  },
  {
    category: 'Operational Readiness',
    headline: 'What Consistent Performance Looks Like Across Shifts, Sites, and Holdings',
    summary: 'Consistency isn\u2019t a cultural value. It\u2019s a designed outcome. This is how POWERS builds it.',
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
    <section style={{ background: S.bgIvory, padding: `${S.sectionPadY} ${S.sectionPadX}` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: S.gapHeaderToBody }}>
          <Eyebrow label="Insights" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>The Thinking Behind the Roots.</h2>
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
        }}>{typo("Stop Chasing Results. Start Building the Foundation.")}</h2>
        <p style={{
          fontSize: 18, fontWeight: 300, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.70)', fontFamily: 'inherit', margin: 0,
          textWrap: 'pretty',
        }}>{typo("Tell us where the operation is underperforming. We\u2019ll come see it, on the floor, and show you what\u2019s missing.")}</p>
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
          }}>Strong Foundation. Strong Performance.</div>
          <p style={{
            fontSize: 13, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.60)', fontFamily: 'inherit', margin: 0,
          }}>
            Operations performance consulting that builds execution capability across teams, shifts, sites, and holdings.
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
function HomeV2() {
  return (
    <div style={{ fontFamily: 'inherit', minHeight: '100vh' }}>
      <Header />
      <Hero />
      <SectionExpertiseAreas />
      <SectionTheMoment />
      <PowersMetrics />
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
          POWERS Website Evolution — v0.3.0 · /v2 copy iteration
        </span>
      </div>
    </div>
  );
}

export default HomeV2;
