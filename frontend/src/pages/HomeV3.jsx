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

/* ─── HomeV3 — Editorial design iteration ───────────────────────────
 *
 * This variant is a ground-up *design* pass on the same copy spine
 * shipped in HomeV2. The goal is to read as a serious editorial
 * publication, not a SaaS landing page. The differentiating moves:
 *
 *   • Serif/sans pairing — Fraunces (display/italic emphasis) +
 *     Proxima Nova (body). The serif appears at every editorial
 *     pivot: the H1 emphasis word, the redwood pull quote, chapter
 *     numbers, the case-study featured stat.
 *
 *   • Chapter numbering — every section carries a small "00 / 01 /
 *     02..." numeral in copper Fraunces top-left. The page reads as
 *     a chaptered article instead of a stack of cards.
 *
 *   • Asymmetric layouts — sections break out of centered, full-
 *     width grids. Heroes are left-anchored at oversized scale;
 *     editorial sections use offset columns and deep negative space.
 *
 *   • A reading-progress rail — a fixed thin gold bar along the
 *     right edge tracks scroll progress through the page, like a
 *     printed-magazine page indicator.
 *
 *   • Restraint in motion — every motion moment earns its place by
 *     enacting an argument the copy is making. No decoration.
 * ────────────────────────────────────────────────────────────────── */

/* Inject Fraunces (Google Fonts) — used for editorial italic + display
   moments. Loaded once per session via id-deduped <link> tags. Pattern
   matches the PowersMetrics font injection. */
const V3_FONT_LINKS = [
  { id: 'v3-preconnect-g',  href: 'https://fonts.googleapis.com', rel: 'preconnect' },
  { id: 'v3-preconnect-gs', href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
  { id: 'v3-fraunces',      href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&display=swap' },
];
const useV3Fonts = () => {
  useEffect(() => {
    V3_FONT_LINKS.forEach(({ id, href, rel = 'stylesheet', crossOrigin }) => {
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id; link.rel = rel; link.href = href;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    });
  }, []);
};

// Editorial serif stack — Fraunces is the workhorse for italic
// display + chapter numbers. Optical sizing axis means it renders
// well from tiny (chapter numbers at 11px) to huge (hero H1 emphasis
// at 124px).
const SERIF = "'Fraunces', 'Georgia', 'Times New Roman', serif";

/* ChapterMark — small typographic chapter indicator that opens each
   section. "00" through "10" set in copper Fraunces italic, sitting
   above the eyebrow. Creates the magazine-spread rhythm. */
function ChapterMark({ n, light = false }) {
  return (
    <div style={{
      fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
      fontSize: 13, letterSpacing: '0.06em',
      color: light ? '#e89346' : '#b85f33',
      marginBottom: 14,
      display: 'flex', alignItems: 'baseline', gap: 10,
    }}>
      <span style={{ fontSize: 28, fontWeight: 400, lineHeight: 1 }}>{n}</span>
      <span style={{ height: 1, width: 28, background: light ? 'rgba(232,147,70,0.5)' : 'rgba(184,95,51,0.55)' }} />
    </div>
  );
}

/* ReadingProgress — Apple-level "chapter scrubber" pinned to the right
   edge of the viewport. 11 hairline tick dots map to the 11 editorial
   chapters (00–10). A copper hairline connects them; tick dots fill in
   as the reader passes each chapter. The active chapter's number (e.g.
   "03") fades in adjacent to the dot, then fades out after the reader
   stops scrolling. Vertically centered, lives inside a ~280px band so
   it never crowds the chrome above or footer below. Hidden on mobile
   and for `prefers-reduced-motion`. */
const CHAPTER_LABELS = [
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
];
function ReadingProgress() {
  const fillRef = useRef(null);
  const dotsRef = useRef([]);
  const badgeRef = useRef(null);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Hide entirely on small screens — the chrome is busy enough.
    if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) return;

    let raf = 0;
    let lastChapterIdx = -1;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;

      // Connector fill — scaleY from top down through the rail.
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p})`;
      }

      // Active chapter — the dot the reader has most recently passed.
      // p=0 → -1 (none yet), then 0..10 across the page.
      const chapterIdx = Math.min(
        CHAPTER_LABELS.length - 1,
        Math.floor(p * CHAPTER_LABELS.length)
      );
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const passed = i <= chapterIdx;
        dot.style.background = passed ? '#b85f33' : 'rgba(184,95,51,0.18)';
        dot.style.transform = i === chapterIdx ? 'scale(1.6)' : 'scale(1)';
      });

      // Badge — show current chapter label, fade out after idle.
      if (badgeRef.current) {
        badgeRef.current.textContent = CHAPTER_LABELS[chapterIdx] ?? '00';
        if (chapterIdx !== lastChapterIdx) {
          lastChapterIdx = chapterIdx;
        }
        badgeRef.current.style.opacity = '1';
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          if (badgeRef.current) badgeRef.current.style.opacity = '0';
        }, 1100);
      }
    };

    const onScroll = () => {
      if (raf || reduce) return;
      raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    update();
    if (!reduce) window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{
      position: 'fixed',
      top: '50%', right: 28,
      transform: 'translateY(-50%)',
      height: 'min(360px, 56vh)',
      width: 20,
      zIndex: 60, pointerEvents: 'none',
      display: 'flex', alignItems: 'stretch', justifyContent: 'center',
    }}>
      {/* Track — empty hairline, full height */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%',
        width: 1, transform: 'translateX(-50%)',
        background: 'rgba(184,95,51,0.10)',
      }} />
      {/* Fill — copper hairline, scales from top down */}
      <div ref={fillRef} style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%',
        width: 1, transform: 'translateX(-50%) scaleY(0)',
        transformOrigin: '50% 0%',
        background: '#b85f33',
        transition: 'transform 0.18s ease-out',
      }} />
      {/* Tick dots — one per chapter, evenly distributed */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {CHAPTER_LABELS.map((label, i) => (
          <div
            key={label}
            ref={(el) => { dotsRef.current[i] = el; }}
            style={{
              width: 5, height: 5, borderRadius: '50%',
              background: 'rgba(184,95,51,0.18)',
              transition: 'background 0.25s ease, transform 0.25s ease',
              transformOrigin: '50% 50%',
            }}
          />
        ))}
      </div>
      {/* Active chapter badge — Fraunces italic, fades out on idle */}
      <span ref={badgeRef} style={{
        position: 'absolute', right: 22, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
        fontSize: 13, letterSpacing: '0.06em',
        color: '#b85f33',
        opacity: 0,
        transition: 'opacity 0.45s ease',
        whiteSpace: 'nowrap',
      }}>00</span>
    </div>
  );
}

/* ── Tokens ── */
const C = {
  // Primary navy stack — five depths for layering
  ink:     '#0a1421',  // Deepest. Used for max-emphasis surfaces (hero, footer CTA).
  navy900: '#0d2442',  // Deep — case-study masthead, footer
  navy:    '#183a61',  // Brand navy — primary copy, anchors
  navy700: '#234a78',  // Mid-tone navy — secondary fills, hover lifts
  navy600: '#3a5d8a',  // Mid-tone navy — UI accents
  navy400: '#4a6a8a',  // Muted navy — meta text, sub-labels
  slate:   '#5c7896',  // Cool slate-blue — accent for technical UI
  steel:   '#7a93b0',  // Lighter cool blue — secondary accent

  // Gold accent stack — pale wash through emphasis
  gold200: '#f7e8c8',  // Pale gold wash — subtle backgrounds, surface lifts
  gold:    '#eabb71',  // Brand gold — primary accent
  gold600: '#c9963e',  // Deep gold — hover, emphasis on light surfaces

  // Orange / copper / rust stack — warm secondary accent paired with gold
  // for variety. Reads as industrial heritage, not decorative.
  amber:   '#e89346',  // Bright amber — accent on light backgrounds
  copper:  '#b85f33',  // Copper — primary emphasis color (replaces gold800)
  rust:    '#8a3f1f',  // Deep rust — max-emphasis warm accent

  // Neutral warm-light surface tones
  ivory:   '#fbf9f4',  // Warmest off-white — premium content surfaces
  bone:    '#f4efe4',  // Warm off-white — content sections
  paper:   '#f7f6f1',  // Neutral off-white — section bands
  white:   '#ffffff',

  // True gray ramp — cool, neutral. For dividers, captions, secondary type.
  gray50:  '#f7f8fa',
  gray100: '#eceef2',
  gray200: '#dcdfe4',
  gray300: '#c1c6cd',
  gray400: '#8a9098',
  gray500: '#6b7280',
  gray600: '#4b5360',
  gray700: '#363c47',
  gray800: '#22262e',

  // Legacy aliases (kept for compatibility through ongoing migration)
  fog:     '#dcdfe3',  // Cool light gray — dividers, fine borders
  body:    '#3a3a38',  // Body text — warm dark gray
  gray100Legacy: '#e8e8e4',
  gray400Legacy: '#888884',
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
      minHeight: 760,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      // Layered ink + navy background with a soft warm radial light
      // from upper-right — suggests something on the horizon without
      // illustrating it.
      background: `
        radial-gradient(ellipse 60% 40% at 85% 20%, rgba(184,95,51,0.22) 0%, rgba(184,95,51,0) 70%),
        radial-gradient(ellipse 80% 60% at 20% 90%, rgba(35, 74, 120, 0.45) 0%, rgba(35, 74, 120, 0) 65%),
        linear-gradient(165deg, ${C.ink} 0%, ${C.navy900} 100%)
      `,
      overflow: 'hidden',
    }}>
      {/* Editorial chapter mark — "00" in copper Fraunces, top-left.
          The hero is the prologue; the chaptered sections begin at 01. */}
      <div style={{
        position: 'absolute',
        top: 'clamp(100px, 12vh, 140px)',
        left: 'clamp(24px, 4vw, 64px)',
        zIndex: 3,
      }}>
        <ChapterMark n="00" light />
      </div>

      {/* Architectural rule — single thin copper line across 70%
          of the hero, anchored at the bottom of the H1 baseline.
          Editorial moment, not decoration. */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: 'clamp(24px, 4vw, 64px)',
        right: 'clamp(80px, 10vw, 220px)',
        bottom: 'clamp(160px, 18vh, 220px)',
        height: 1,
        background: 'linear-gradient(to right, rgba(184,95,51,0.6), rgba(184,95,51,0))',
        zIndex: 1,
      }} />

      {/* Content — asymmetric two-column at the lower third. Left
          column carries the H1 at oversized scale; right column
          carries the subhead at a narrower measure, offset lower so
          the layout has tension rather than symmetry. */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1440,
        margin: '0 auto',
        padding: 'clamp(140px, 18vh, 200px) clamp(24px, 4vw, 64px) clamp(80px, 10vh, 120px)',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 1fr)',
        gap: 'clamp(32px, 5vw, 80px)',
        alignItems: 'end',
      }}>
        {/* H1 — oversized typographic moment.
            "Stop Chasing" in sans 800 (the brand voice declaring).
            "Numbers." in Fraunces italic — typographic break that
            does the differentiation work the copy can't do alone. */}
        <h1 style={{
          fontSize: 'clamp(56px, 8vw, 124px)',
          fontWeight: 800,
          lineHeight: 0.95,
          color: C.white,
          fontFamily: 'inherit',
          margin: 0,
          letterSpacing: '-0.028em',
          textWrap: 'balance',
        }}>
          <HeroHeadline />
        </h1>

        {/* Subhead — sits in the right column, narrow measure, smaller
            than typical so it reads as caption-against-display. */}
        <div>
          <p style={{
            fontSize: 17, fontWeight: 300, lineHeight: 1.6,
            color: 'rgba(255,255,255,0.78)', fontFamily: 'inherit',
            maxWidth: 380, margin: '0 0 28px', textWrap: 'pretty',
          }}>
            {typo("Strong quarters and weak ones are both readouts of the same thing: the fundamentals at the root of your operation. When they\u2019re missing, your ability to execute is at the mercy of conditions. When they\u2019re built in, it isn\u2019t.")}
          </p>
          <p style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
            fontSize: 20, lineHeight: 1.35,
            color: C.gold, margin: 0,
            letterSpacing: '-0.005em',
            textWrap: 'balance', maxWidth: 380,
          }}>
            We build them in.
          </p>
        </div>
      </div>

      {/* Scroll cue — bottom-left, vertical rule + copper italic label.
          Editorial signal that the document continues below. */}
      <div style={{
        position: 'absolute',
        left: 'clamp(24px, 4vw, 64px)',
        bottom: 'clamp(28px, 4vh, 44px)',
        display: 'flex', alignItems: 'center', gap: 14,
        zIndex: 3,
      }}>
        <div style={{
          width: 1, height: 38, background: 'rgba(232,147,70,0.55)',
        }} />
        <div style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
          fontSize: 13, color: '#e89346', letterSpacing: '0.04em',
        }}>
          Start with the foundation
        </div>
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
      <span data-hero-word style={{
        display: 'inline-block',
        fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
        color: '#e89346',
        letterSpacing: '-0.025em',
      }}>Numbers.</span>
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
/* ── SECTION — THE PRINCIPLE (Row 3) ────────────────────────────────
 *
 * Full-bleed deep-ink editorial moment. The redwood metaphor is
 * extracted from the body and given its own page-turn beat. Single
 * oversized Fraunces italic quote, copper rule beneath, attribution
 * at right in small caps.
 *
 * This is the editorial pivot of the homepage — a high-altitude
 * declaration of principle before the page descends into the
 * mechanism. No motion beyond a slow fade-up on scroll-in.
 * ────────────────────────────────────────────────────────────────── */
function SectionThePrinciple() {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !ref.current) return;
    const target = ref.current.querySelector('[data-principle-quote]');
    const attr = ref.current.querySelector('[data-principle-attr]');
    if (!target) return;
    gsap.set([target, attr].filter(Boolean), { opacity: 0, y: 20 });
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 0.8,
        },
      })
        .to(target, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 0)
        .to(attr,  { opacity: 1, y: 0, ease: 'power2.out', duration: 1.0 }, 0.4);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      background: `linear-gradient(180deg, ${C.ink} 0%, ${C.navy900} 100%)`,
      padding: `clamp(120px, 14vw, 200px) ${S.sectionPadX}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grain — faint warm radial that gives the deep-
          ink surface a hint of dimensional warmth. */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 30% 50%, rgba(184,95,51,0.10) 0%, rgba(184,95,51,0) 70%)`,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1240, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 48,
      }}>
        <ChapterMark n="02" light />

        {/* The principle — set huge, Fraunces italic, off-center left.
            Treated like a magazine pull-spread, not a marketing
            headline. The italic + copper period at the end is the
            editorial signature. */}
        <blockquote data-principle-quote style={{
          margin: 0,
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(32px, 5.4vw, 76px)',
          lineHeight: 1.05,
          color: C.white,
          letterSpacing: '-0.020em',
          textWrap: 'balance',
          maxWidth: '14ch',
        }}>
          The tallest trees on earth don&rsquo;t stand because of what you can see<span style={{ color: '#e89346' }}>.</span>
        </blockquote>

        {/* Attribution — sits right, small caps in sans, copper rule
            above. Editorial signature. */}
        <div data-principle-attr style={{
          justifySelf: 'end',
          maxWidth: 460,
          paddingTop: 28,
          borderTop: `1px solid rgba(232,147,70,0.4)`,
        }}>
          <p style={{
            fontSize: 17, fontWeight: 300, lineHeight: 1.6,
            color: 'rgba(255,255,255,0.78)', fontFamily: 'inherit',
            margin: '0 0 18px', textWrap: 'pretty',
          }}>
            {typo("They stand because of a root system, decades deep, that most people never think about. Operations are no different. The ones that perform under pressure are the ones with something strong enough underneath to carry the weight.")}
          </p>
          <div style={{
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#e89346', fontFamily: 'inherit',
          }}>
            That&rsquo;s the level we work at.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SECTION — A DIFFERENT APPROACH (Row 4) ─────────────────────────
 *
 * The diagnostic chain section: numbers miss → firefighting on the
 * floor → foundation not built. This is the page's load-bearing
 * argument, set as a serious editorial essay with three editorial
 * moves:
 *
 *   1. A typographic chain — three bold statements stacked with
 *      copper "BECAUSE" links between them, mid-section. Reads like
 *      a logical proof, not a list.
 *
 *   2. A "where they go to do it" competitive cut treated as a
 *      pull-quote moment, since it's the sharpest sentence in the
 *      section.
 *
 *   3. The "radios get quiet" line set oversized inline serif italic
 *      mid-paragraph for typographic punctuation.
 * ────────────────────────────────────────────────────────────────── */
function SectionTheMoment() {
  return (
    <section style={{ background: S.bgWhite, width: '100%', padding: `${S.sectionPadY} ${S.sectionPadX}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ChapterMark n="03" />

        {/* Header */}
        <div style={{ maxWidth: S.maxRead, marginBottom: 56 }}>
          <Eyebrow label={"A Different Approach"} />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            We Don&rsquo;t Work on the Numbers.<br/>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>We Work Where the Numbers Come From.</span>
          </h2>
        </div>

        {/* Opening — frames the antagonist */}
        <div style={{ maxWidth: S.maxRead, marginBottom: 56 }}>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: '0 0 22px', textWrap: 'pretty',
          }}>
            {typo("Every firm in this category gets hired to move the same numbers. Throughput. OEE. Downtime. Labor productivity. Margin. The difference is where they go to do it.")}
          </p>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: 0, textWrap: 'pretty',
          }}>
            {typo("Most consulting firms work on the numbers themselves. They target a metric, move it, write the deck, and leave. The result lifts for a quarter, then drifts back, because nothing underneath the number actually changed.")}
          </p>
        </div>

        {/* THE DIAGNOSTIC CHAIN — typographic proof
            Three bold conclusions stacked with copper "BECAUSE"
            connectors. Each line is set at a step down from the H2
            scale but well above body — a register that reads as
            "stated truth" rather than narration. */}
        <div style={{
          maxWidth: 920,
          margin: '0 0 72px',
          padding: '40px 0',
          borderTop: `1px solid ${C.gray200}`,
          borderBottom: `1px solid ${C.gray200}`,
        }}>
          <DiagnosticLink>
            The numbers miss
          </DiagnosticLink>
          <DiagnosticConnector />
          <DiagnosticLink>
            Your supervisors are firefighting instead of leading
          </DiagnosticLink>
          <DiagnosticConnector />
          <DiagnosticLink emphasized>
            The foundation underneath the operation isn&rsquo;t built
          </DiagnosticLink>
        </div>

        {/* The continuation — body + the "where they go to do it" pull */}
        <div style={{ maxWidth: S.maxRead, marginBottom: 36 }}>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: '0 0 22px', textWrap: 'pretty',
          }}>
            {typo("That\u2019s where POWERS works. Not on the deck, not in the boardroom, not on the dashboard. On the floor. In the shifts. Inside the supervisors, the standards, and the daily operating routines where execution either holds up or breaks down.")}
          </p>
        </div>

        {/* Editorial pull — large Fraunces italic, off-center to the
            right, copper rule beneath. The "radios get quiet"
            landing as a discrete typographic moment. */}
        <div style={{
          maxWidth: 980, margin: '0 auto 56px 0',
          padding: '56px 0 56px clamp(0px, 6vw, 80px)',
          position: 'relative',
        }}>
          {/* Vertical copper rule on the left — anchors the quote */}
          <div aria-hidden="true" style={{
            position: 'absolute', left: 'clamp(0px, 3vw, 40px)', top: 56, bottom: 56,
            width: 1, background: C.copper,
          }} />
          <blockquote style={{
            margin: 0,
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(26px, 3.4vw, 44px)',
            lineHeight: 1.18, letterSpacing: '-0.012em',
            color: C.navy,
            textWrap: 'balance',
            maxWidth: 720,
          }}>
            When the foundation is in, the operation changes. The line runs. The team works problems before they cascade.
            <span style={{ color: C.copper, fontWeight: 500 }}> The radios get quiet.</span>
          </blockquote>
        </div>

        {/* Closing — the resolution */}
        <div style={{ maxWidth: S.maxRead }}>
          <p style={{
            fontSize: 18, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            margin: 0, textWrap: 'pretty',
          }}>
            {typo("That\u2019s what POWERS builds. With your people, in your operation, in the routines that make the work execute itself long after we\u2019re gone.")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* DiagnosticLink — one line in the typographic chain. Editorial
   scale, navy, weight-700. Variant `emphasized` lifts the final link
   to gold-emphasis to signal the diagnostic landing. */
function DiagnosticLink({ children, emphasized = false }) {
  return (
    <div style={{
      fontSize: 'clamp(20px, 2.6vw, 32px)',
      fontWeight: 700, lineHeight: 1.18,
      color: emphasized ? C.navy : C.navy,
      fontFamily: 'inherit',
      letterSpacing: '-0.012em',
      textWrap: 'balance',
      display: 'flex', alignItems: 'baseline', gap: 18,
    }}>
      <span aria-hidden="true" style={{
        fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
        fontSize: 'clamp(15px, 1.6vw, 20px)',
        color: emphasized ? C.copper : C.gray400,
        flex: '0 0 auto',
      }}>↳</span>
      <span style={emphasized ? {
        background: `linear-gradient(180deg, transparent 65%, ${C.gold200} 65%)`,
        paddingRight: 6,
      } : {}}>
        {children}
      </span>
    </div>
  );
}

/* DiagnosticConnector — small "BECAUSE" link between chain items.
   Tracked uppercase, copper italic small-caps register. Vertical
   spacing on either side gives the chain visual breath. */
function DiagnosticConnector() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      margin: '18px 0 18px 32px',
    }}>
      <div aria-hidden="true" style={{
        width: 28, height: 1, background: C.copper,
      }} />
      <div style={{
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: C.copper, fontFamily: 'inherit',
      }}>because</div>
    </div>
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

/* ── PRESSURE IN / PERFORMANCE OUT — continuous ambient choreography ─
 *
 * Concept: an immovable engine in the center; ever-changing forces on
 * the left arrive against it; ever-changing results on the right are
 * produced by it. No scroll trigger — the diagram runs constantly,
 * autonomously, like a live system dashboard.
 *
 * Mechanics: 5 visible slots per side. Each slot independently cycles
 * through a pool of forces (left) or results (right) on a randomized
 * 2.8-4.4 second interval, with per-slot stagger so the columns
 * shimmer rather than tick in sync. The slot animation is a small
 * fade-up exit followed by a fade-down entrance; reads as turbulence
 * on the left and production on the right.
 *
 * The engine card is treated to match the 5-Disciplines card
 * vocabulary: square corners, 3px gold top rule (matching the
 * keystone treatment from Row 2), thin border, fine grid pattern
 * inside, ambient gold halo behind. Content is top-justified so the
 * card has presence at the top edge of the column. The halo
 * perpetually breathes at a slow cadence — a heartbeat for the
 * "system active" idea, without the literal pulse dot.
 *
 * Reduced-motion: rotation interval is skipped; initial slot items
 * are rendered statically; halo holds at its mid state.
 * ────────────────────────────────────────────────────────────────── */

const FORCES_POOL = [
  'Market volatility', 'Tariff and trade shifts', 'Demand swings',
  'Workforce turnover', 'Equipment breakdowns', 'Inexperienced supervisors',
  'Margin compression', 'Schedule misses', 'Supply chain disruption',
  'Raw material cost spikes', 'Quality variation', 'Capacity constraints',
  'Energy cost swings', 'Regulatory pressure', 'Customer escalations',
];

const RESULTS_POOL = [
  'Increased throughput', 'Higher OEE', 'Reduced downtime',
  'Improved labor productivity', 'Expanded margin', 'Recovered working capital',
  'Stronger frontline leadership', 'Sustained operational performance',
  'Faster cycle times', 'Lower scrap rates', 'Predictable on-time delivery',
  'Resilient supply', 'Stable cost structure', 'Compounding shift performance',
];

/* RotatingPaneList — continuous slot-rotation primitive.

   Renders `slotCount` <li>s. Each slot owns a cursor into the pool
   and independently cycles to its next pool item on a randomized
   interval. Animation is driven directly through GSAP into the DOM
   so cycles don't trigger React re-renders. Initial items are
   evenly distributed across the pool so the visible set starts
   diverse from frame one.

   Props:
     pool         — array of strings to rotate through
     slotCount    — number of visible slots
     Marker       — component that renders the per-row indicator
     markerColor  — color passed to the marker
     side         — 'left' or 'right'; controls exit direction so
                    forces feel like they leave inward toward the
                    engine, results feel like they leave outward
     intervalMs   — base interval between cycles per slot
     jitter       — randomized addition to interval
     baseDelay    — global delay before the first cycle starts */
function RotatingPaneList({
  pool, slotCount = 5, Marker, markerColor, side = 'left',
  intervalMs = 3000, jitter = 1800, baseDelay = 800,
}) {
  const ulRef = useRef(null);
  // Per-slot cursors live in a ref so cycles don't cause re-renders.
  // Initial values evenly stride across the pool.
  const stride = Math.max(1, Math.floor(pool.length / slotCount));
  const cursorsRef = useRef(
    Array.from({ length: slotCount }, (_, i) => (i * stride) % pool.length)
  );
  const reduceRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reduceRef.current = reduce;
    if (reduce) return;

    const ul = ulRef.current;
    if (!ul) return;
    const slots = Array.from(ul.querySelectorAll('[data-slot-text]'));
    const timers = [];

    // Cycle one slot: animate text out, swap, animate new text in,
    // schedule next cycle with randomized delay.
    const cycle = (slotIdx) => {
      const textEl = slots[slotIdx];
      if (!textEl) return;

      // Pick next pool index. Skips ahead by slotCount to ensure
      // adjacent slots don't all land on the same item; modulo by
      // pool.length keeps it in range. Then steps an extra +1 with
      // a 30% probability for a small amount of unpredictability.
      let nextCursor = (cursorsRef.current[slotIdx] + slotCount) % pool.length;
      if (Math.random() < 0.3) nextCursor = (nextCursor + 1) % pool.length;
      cursorsRef.current[slotIdx] = nextCursor;

      gsap.timeline()
        .to(textEl, {
          opacity: 0,
          y: -10,
          duration: 0.42,
          ease: 'power2.in',
        })
        .call(() => {
          textEl.textContent = pool[nextCursor];
        })
        .fromTo(textEl,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
        );

      const nextDelay = intervalMs + Math.random() * jitter;
      timers[slotIdx] = setTimeout(() => cycle(slotIdx), nextDelay);
    };

    // Initial start — each slot gets its own delay so they rotate
    // out of phase. Without this they'd all fire together on the
    // first cycle and the column would tick like a clock.
    slots.forEach((_, i) => {
      const initial = baseDelay + i * 420 + Math.random() * 280;
      timers[i] = setTimeout(() => cycle(i), initial);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [pool, slotCount, intervalMs, jitter, baseDelay]);

  // Initial render — populate each slot with the item at its cursor.
  const initial = cursorsRef.current.map((idx) => pool[idx]);

  return (
    <ul ref={ulRef} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {initial.map((item, i) => (
        <li key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 14.5, fontWeight: 500, color: C.navy, fontFamily: 'inherit',
          padding: '14px 0', borderBottom: `1px solid ${C.gray200}`,
          position: 'relative',
          minHeight: 48,
        }}>
          <Marker color={markerColor} />
          <span
            data-slot-text
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity',
              flex: 1,
              textAlign: side === 'right' ? 'left' : 'left',
            }}
          >{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionExecutionEngine() {
  const haloRef = useRef(null);

  // Continuous engine halo "heartbeat" — independent of scroll.
  // Slow, even, ambient. Communicates "running" without using a
  // literal pulse dot.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    if (!haloRef.current) return;

    const tween = gsap.to(haloRef.current, {
      opacity: 0.85,
      scale: 1.06,
      duration: 3.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    return () => tween.kill();
  }, []);

  return (
    <section style={{ background: S.bgWhite, padding: `${S.sectionPadY} ${S.sectionPadX}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto' }}>

        {/* Header — left-anchored editorial */}
        <div style={{ marginBottom: S.gapHeaderToBody, maxWidth: S.maxRead }}>
          <ChapterMark n="04" />
          <Eyebrow label="How Execution Capability Creates Value" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Pressure In. <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>Performance Out.</span>
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
          alignItems: 'start',
          position: 'relative',
        }}>
          {/* LEFT — Varying Forces, continuously rotating */}
          <div style={{ position: 'relative', paddingTop: 8 }}>
            <DiagramColHead label="Varying Forces" />
            <RotatingPaneList
              pool={FORCES_POOL}
              slotCount={5}
              Marker={RedDownMarker}
              markerColor={C.copper}
              side="left"
              intervalMs={2900}
              jitter={1700}
              baseDelay={1200}
            />
          </div>

          {/* CENTER — the immovable engine.
              Square corners + thin border + permanent gold top rule
              to match the 5-Disciplines keystone treatment, so this
              card reads as visually consistent with Row 2. Content
              is top-justified (alignItems: flex-start on column)
              so the title and description sit at the top edge of
              the card, with a quiet anchor below. */}
          <div style={{ position: 'relative', paddingTop: 8 }}>
            <DiagramColHead label="Execution Capability" />
            <div style={{
              position: 'relative',
            }}>
              {/* Ambient halo — perpetual slow breath */}
              <div
                ref={haloRef}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: -24,
                  background: `radial-gradient(ellipse at center, ${C.gold200} 0%, rgba(234,187,113,0.20) 38%, rgba(234,187,113,0) 72%)`,
                  pointerEvents: 'none',
                  filter: 'blur(14px)',
                  opacity: 0.6,
                  zIndex: 0,
                }}
              />
              {/* Engine card — matches 5-Disciplines card vocabulary */}
              <div style={{
                position: 'relative', zIndex: 1,
                background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navy900} 100%)`,
                border: `1px solid ${C.gray200}`,
                borderTop: `3px solid ${C.gold}`,
                color: C.white,
                padding: '36px 30px 34px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                boxShadow: `0 28px 64px -28px rgba(13,36,66,0.55)`,
                overflow: 'hidden',
                minHeight: 320,
              }}>
                {/* Inner architectural grid */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, opacity: 0.10, pointerEvents: 'none',
                  backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                  mixBlendMode: 'overlay',
                }} />

                {/* Heading */}
                <h3 style={{
                  fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, lineHeight: 1.2,
                  color: C.white, fontFamily: 'inherit',
                  margin: '0 0 14px', letterSpacing: '-0.012em',
                  position: 'relative', zIndex: 1,
                }}>
                  Built on the Five Disciplines.
                </h3>

                {/* Body — top-justified above the discipline anchor list */}
                <p style={{
                  fontSize: 15, fontWeight: 300, lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.86)', fontFamily: 'inherit',
                  margin: '0 0 22px', textWrap: 'pretty',
                  position: 'relative', zIndex: 1,
                }}>
                  {typo("The engine that turns variable inputs into reliable outputs. Immovable against changing conditions because the foundation underneath it doesn\u2019t bend.")}
                </p>

                {/* Quiet anchor — the five disciplines listed at small
                    scale at the bottom of the card. Tells the reader
                    exactly what the engine is built on, without
                    repeating Row 2's animation. */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  marginTop: 'auto', paddingTop: 18,
                  borderTop: `1px solid rgba(234, 187, 113, 0.28)`,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px 18px',
                  fontSize: 11.5,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: 'rgba(255,255,255,0.78)',
                }}>
                  {EXPERTISE_CARDS.map((card) => (
                    <div key={card.headline} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}>
                      <span style={{
                        width: 4, height: 4, borderRadius: 50, background: C.gold,
                        flex: '0 0 auto',
                      }} />
                      {card.headline}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Consistent Results, continuously rotating */}
          <div style={{ position: 'relative', paddingTop: 8 }}>
            <DiagramColHead label="Consistent Results" />
            <RotatingPaneList
              pool={RESULTS_POOL}
              slotCount={5}
              Marker={GreenUpMarker}
              markerColor="#2d7a4f"
              side="right"
              intervalMs={3200}
              jitter={1700}
              baseDelay={1500}
            />
          </div>
        </div>

        {/* Closing line */}
        <p style={{
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
          <ChapterMark n="01" />
          <Eyebrow label="What We Build" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>Five Disciplines. <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>One Foundation.</span></h2>
          <p style={{
            fontSize: S.ledeSize, fontWeight: S.ledeWeight, lineHeight: S.ledeLH,
            color: C.body, fontFamily: 'inherit',
            maxWidth: 720, margin: '0 auto', textAlign: 'left',
            textWrap: 'pretty',
          }}>
            {typo("Five disciplines, built into how the operation runs every shift. Weaken one and the others drift. Build them together and they interlock into something load-bearing, deep enough that performance holds up under whatever pressure comes next.")}
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
          {typo("Five disciplines. One foundation. An operation that produces when conditions don\u2019t cooperate.")}
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
          <ChapterMark n="05" />
          <Eyebrow label="How We Work" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: 0,
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            We Work Where Value Gets&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>Won or Lost.</span>
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
          <ChapterMark n="07" />
          <Eyebrow label="Where We Work" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 28px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Wherever the Work is&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>Physical, Repeatable, and Measured.</span>
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
          <ChapterMark n="08" light />
          <Eyebrow label="Proven Results" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.white, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>The Work, on the&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.gold }}>Floor.</span></h2>
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
          <ChapterMark n="09" />
          <Eyebrow label="Insights" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>The&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>Thinking</span>&nbsp;Behind the Work.</h2>
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
    <section style={{
      background: `radial-gradient(ellipse 50% 50% at 70% 30%, rgba(184,95,51,0.18) 0%, rgba(184,95,51,0) 70%), linear-gradient(165deg, ${C.ink} 0%, ${C.navy900} 100%)`,
      padding: `clamp(120px, 14vw, 180px) ${S.sectionPadX}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ChapterMark n="10" light />

        {/* H2 — editorial echo of the hero. "Stop Chasing Numbers."
            now faded back, "Start Building the Foundation." in
            full-bright Fraunces italic. The page closes by resolving
            the provocation it opened with. */}
        <h2 style={{
          fontSize: 'clamp(40px, 6vw, 84px)',
          fontWeight: 800, lineHeight: 0.98,
          color: C.white, fontFamily: 'inherit',
          margin: '0 0 56px', maxWidth: 1000,
          letterSpacing: '-0.022em', textWrap: 'balance',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.32)' }}>Stop Chasing Numbers.</span><br/>
          <span style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
            color: '#e89346', letterSpacing: '-0.025em',
          }}>Start Building the Foundation.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(280px,1fr)', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'end' }}>
          <p style={{
            fontSize: 19, fontWeight: 300, lineHeight: 1.55,
            color: 'rgba(255,255,255,0.78)', fontFamily: 'inherit',
            margin: 0, maxWidth: 600, textWrap: 'pretty',
          }}>{typo("Tell us where the operation is underperforming. We\u2019ll come see it, on the floor, and show you what\u2019s missing.")}</p>

          <div>
            <a href="contact.html"
              onMouseEnter={() => setH(true)}
              onMouseLeave={() => setH(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                background: h ? '#c9963e' : '#eabb71',
                color: '#183a61', fontSize: 15, fontWeight: 600,
                padding: '18px 32px', textDecoration: 'none',
                fontFamily: 'inherit', letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'background 160ms ease, transform 160ms ease',
                transform: h ? 'translateY(-1px)' : 'translateY(0)',
              }}>
              Start a Conversation
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 17 }}>→</span>
            </a>
          </div>
        </div>
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
function HomeV3() {
  useV3Fonts();
  return (
    <div style={{ fontFamily: 'inherit', minHeight: '100vh', background: '#fbf9f4' }}>
      <ReadingProgress />
      <Header />
      <Hero />
      {/* Section order matches the v3 copy spine:
            01 — Five Disciplines (the foundation, made concrete)
            02 — The Principle (redwood beat, single high-altitude moment)
            03 — A Different Approach (the diagnostic chain + competitive cut)
            04 — Pressure In / Performance Out (visual restatement of the thesis)
            05 — How We Work (where the work happens)
            06 — The Proof, at Scale (metric stats)
            07 — Where We Work (industries prose)
            08 — Proven Results (peer evidence)
            09 — Insights (thinking) */}
      <SectionExpertiseAreas />
      <SectionThePrinciple />
      <SectionTheMoment />
      <SectionExecutionEngine />
      <SectionHowWeWork />
      <PowersMetrics />
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
          POWERS Website Evolution — v0.4.0 · /v3 design iteration
        </span>
      </div>
    </div>
  );
}

export default HomeV3;
