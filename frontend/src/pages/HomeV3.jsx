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

/* Inject Newsreader (serif) + JetBrains Mono (mono) from Google Fonts.
   Proxima Nova is loaded site-wide via Adobe Typekit in index.html,
   so we just reference it in the font stack below — no link needed. */
const V3_FONT_LINKS = [
  { id: 'v3-preconnect-g',  href: 'https://fonts.googleapis.com', rel: 'preconnect' },
  { id: 'v3-preconnect-gs', href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
  { id: 'v3-newsreader',    href: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700&display=swap' },
  { id: 'v3-jetbrains',     href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap' },
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

/* useSubheadReveal — page-wide IntersectionObserver that fades in any
   <h2 data-subhead-reveal /> as it enters the viewport. The h2 itself
   rises with opacity, then its inline <span> accent (the italic serif
   pivot) fades in ~280ms later — producing the editorial
   "statement → accent" beat on every subhead. Honors
   prefers-reduced-motion (handled in CSS). */
const useSubheadReveal = () => {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-subhead-reveal]'));
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-subhead-in', 'true'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-subhead-in', 'true');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// Sans-serif workhorse — Proxima Nova (Adobe Typekit, loaded site-wide
// in index.html). Reads clean, modern, and confident at every weight.
const SANS = "'proxima-nova', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// Editorial serif — Newsreader is the workhorse for italic display
// moments. Its italics are drawn with restrained terminals (no rounded
// flourish), so the letter-tracking issues that showed up on Fraunces
// / Playfair don't appear here.
const SERIF = "'Newsreader', 'Source Serif 4', 'Tiempos Headline', 'Domine', Georgia, 'Times New Roman', serif";

// Mono — JetBrains Mono. Reserved for technical / metric-label
// moments where a monospaced rhythm reads as engineered.
const MONO = "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

/* ChapterMark — INTENTIONALLY DISABLED.
   The earlier design numbered every section (00 — / 01 — / 02 —) as
   chapter markers. We removed that system because it directly
   contradicts the homepage thesis ("Stop Chasing Numbers"). All
   <ChapterMark /> call sites are kept intact (they're scattered across
   every section) but render nothing. The reading-progress rail on the
   right edge replaces them as a navigation/orientation device. */
function ChapterMark(_props) {
  return null;
}

/* ReadingProgress — Apple-level reading rail pinned to the right edge
   of the viewport. 11 hairline tick dots map to the 11 sections of
   the page; a copper hairline connects them and fills in as the
   reader scrolls. When the reader crosses a section boundary, the
   newly-active dot flashes (brief copper pulse + halo) — replacing
   the chapter-number system we removed from the page body.
   Vertically centered, hidden on mobile and for `prefers-reduced-motion`. */
const SECTION_COUNT = 11;
function ReadingProgress() {
  const fillRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Hide entirely on small screens — the chrome is busy enough.
    if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) return;

    let raf = 0;
    let lastIdx = -1;

    const flash = (el) => {
      if (!el) return;
      // Brief blue pulse — scale up + bright #3e80c1 + soft glow,
      // then settle back to the resting passed-dot state.
      gsap.fromTo(el, {
        scale: 2.4,
        boxShadow: '0 0 0 6px rgba(62,128,193,0.30), 0 0 14px rgba(62,128,193,0.65)',
      }, {
        scale: 1.4,
        boxShadow: '0 0 0 0 rgba(62,128,193,0), 0 0 0 rgba(62,128,193,0)',
        duration: 0.9,
        ease: 'power3.out',
      });
    };

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;

      // Connector fill — scaleY from top down through the rail.
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p})`;
      }

      // Active section index — clamped to dot count.
      const idx = Math.min(SECTION_COUNT - 1, Math.floor(p * SECTION_COUNT));

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const passed = i <= idx;
        dot.style.background = passed ? '#3e80c1' : 'rgba(62,128,193,0.22)';
        // The active dot stays slightly larger; flash adds a brief
        // pulse on crossing (handled below).
        if (i !== idx) dot.style.transform = 'scale(1)';
      });

      if (idx !== lastIdx) {
        lastIdx = idx;
        if (!reduce) flash(dotsRef.current[idx]);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
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
        background: 'rgba(62,128,193,0.10)',
      }} />
      {/* Fill — blue hairline, scales from top down */}
      <div ref={fillRef} style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%',
        width: 1, transform: 'translateX(-50%) scaleY(0)',
        transformOrigin: '50% 0%',
        background: '#3e80c1',
        transition: 'transform 0.18s ease-out',
      }} />
      {/* Tick dots — one per section, evenly distributed */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { dotsRef.current[i] = el; }}
            style={{
              width: 5, height: 5, borderRadius: '50%',
              background: 'rgba(62,128,193,0.22)',
              transformOrigin: '50% 50%',
              willChange: 'transform, box-shadow',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Tokens — locked to the Type & Color System Spec ──
   The spec defines: navy primary, navy deep, body-on-light, body-on-dark,
   single gold accent, single structural blue, hairline rule, paper, plus
   the canvas-only signal red/green for the hero swarm + execution exhibit.
   No copper, no amber, no rust, no second gold, no cobalt/sapphire/ice/mist.
   Deprecated aliases below are kept ONLY as redirects to spec colors so
   ongoing call sites resolve correctly while we sweep the codebase. */
const C = {
  // ── SPEC: navy & deep navy
  navy:     '#143257',  // Navy primary — text on light, surface on dark
  navyDeep: '#0f2a47',  // Navy deep — hero backgrounds, dark sections

  // ── SPEC: body text
  body:     '#4a5568',  // Body text on light (LOCKED)
  bodyDark: 'rgba(230,237,246,0.78)',  // Body text on dark (LOCKED)

  // ── SPEC: single gold accent (precious — max 3 per row)
  gold:     '#e89346',

  // ── SPEC: structural blue (non-text only — dividers, borders, illustrative line work)
  blue:     '#3e80c1',

  // ── SPEC: hairline rules + paper
  hairline: 'rgba(20, 50, 87, 0.14)',
  paper:    '#ffffff',
  white:    '#ffffff',

  // ── Canvas-only signal colors (hero swarm + execution exhibit ONLY)
  signalRed:   '#e0654f',
  signalGreen: '#5bbf73',

  // ── Deprecated aliases → spec-equivalent values.
  // These exist solely so legacy `C.copper`, `C.gold600`, `C.body` etc.
  // call sites continue to render correctly until they're all swept out.
  // DO NOT use these names in new code.
  ink:      '#0f2a47',
  navy900:  '#0f2a47',
  navy400:  '#4a5568',
  copper:   '#e89346',
  gold200:  '#e89346',
  gold600:  '#e89346',
  amber:    '#e89346',
  rust:     '#e89346',

  // Neutral surface tones (used sparingly; preserved for off-white section bands)
  ivory:    '#ffffff',
  bone:     '#ffffff',

  // Gray ramp — only for dividers / captions where pure navy is too heavy.
  // Spec prefers hairline rgba(20,50,87,0.14) for most divider work.
  gray50:   '#f7f8fa',
  gray100:  '#eceef2',
  gray200:  '#dcdfe4',
  gray300:  '#c1c6cd',
  gray400:  '#8a9098',
  gray500:  '#6b7280',
  fog:      '#dcdfe3',
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
  // Surface tokens — pure white is the default for every content row.
  // `bgGoldWash` is an opt-in low-opacity gold tint that any single
  // section can use as a deliberate alternation between two white
  // sections — a quiet warm break that doesn't jump to dark navy.
  // Dark sections (Hero, Principle, Pressure In/Out, Metrics, CTA)
  // use their own navy backgrounds inline.
  bgWhite:     '#ffffff',
  bgPaper:     '#ffffff',
  bgIvory:     '#ffffff',
  bgBone:      '#ffffff',
  bgGoldWash:  'rgba(232,147,70,0.04)',
  bgNavy:  '#143257',
  bgDeep:  '#0f2a47',
  bgInk:   '#0f2a47',

  // Vertical rhythm — every section uses these. Tuned so that a
  // typical content section lands around 720px total at desktop,
  // fitting comfortably on a single laptop viewport with a slim
  // "next-section peek" at the bottom. Hero is exempt (uses its own
  // padding) and is intentionally taller.
  // sectionPadX is the INNER gutter applied inside the maxWidth
  // container so content edges align with the header.
  sectionPadY: 'clamp(56px, 5vw, 72px)',
  sectionPadX: 'clamp(24px, 4vw, 48px)',
  gapHeaderToBody: 36,

  // Measure widths — three only
  maxNarrow: 640,
  maxRead: 760,
  maxWide: 1280,

  // Display type
  // H2 ladder — single size used by every content row + the CTA.
  // Tuned as a balance between the previous section H2 (too small at
  // 46px max) and the CTA H2 (too large at 84px max). At wide desktop
  // this lands at 56px — emphatic but not shouting; at mobile 34px
  // for clear readability without dominating the column.
  h2Size: 'clamp(34px, 4.2vw, 56px)',
  h2Weight: 800,
  h2LH: 1.08,
  h2Tracking: '-0.014em',
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
      padding: `${S.sectionPadY} 0`,
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
        background: h ? 'rgba(232,147,70,0.10)' : 'transparent',
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
            fontFamily: SANS,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: C.navy,
            lineHeight: 1,
            whiteSpace: 'nowrap',
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
/* Hero — canvas-driven "number swarm" hero.
   Ported verbatim from the user-provided powers-hero.html. Visual
   thesis: a swarm of green +/red - percentage tickers builds, peaks,
   and collapses behind the lede column — visualising the very thing
   the operator is told to stop chasing. The H1 reveals word-by-word
   ("Stop" → "Chasing" → "Numbers.") timed to the swarm's build, then
   the lede + "We build the foundation." + scroll cue resolve in
   sequence as the swarm collapses.

   The animation runs as a perpetual 4-phase cycle:
     build (3.6s) → peak (1.1s) → collapse (1.5s) → empty (0.65s)

   Honors `prefers-reduced-motion`: numbers spawn once at low intensity,
   freeze, and all type renders at full opacity with zero motion. */
function Hero() {
  const swarmRef = useRef(null);
  const rightRef = useRef(null);
  const stopRef = useRef(null);
  const chasingRef = useRef(null);
  const numbersRef = useRef(null);
  const ledeRef = useRef(null);
  const buildRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const stopEl = stopRef.current;
    const chasingEl = chasingRef.current;
    const numbersEl = numbersRef.current;
    const rightEl = rightRef.current;
    const buildEl = buildRef.current;
    const ledeEl = ledeRef.current;
    const headWords = [stopEl, chasingEl, numbersEl];

    headWords.forEach((el) => {
      if (!el) return;
      el.style.transition = 'opacity .9s cubic-bezier(.22,.61,.36,1), transform .9s cubic-bezier(.22,.61,.36,1)';
    });
    function showWord(el) { if (!el) return; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
    function dimWord(el) { if (!el) return; el.style.opacity = '0.22'; el.style.transform = 'translateY(0)'; }

    function revealStatic(el, delay) {
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 1.1s cubic-bezier(.22,.61,.36,1), transform 1.1s cubic-bezier(.22,.61,.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    }
    const timeouts = [];
    if (!reduce) {
      revealStatic(ledeEl, 3500);
      const buildT = setTimeout(() => {
        if (buildEl) {
          buildEl.style.transition = 'opacity 1.3s cubic-bezier(.2,.6,.3,1), transform 1.3s cubic-bezier(.2,.6,.3,1)';
          buildEl.style.opacity = '1';
          buildEl.style.transform = 'translateY(0)';
        }
      }, 4500);
      timeouts.push(buildT);
    }

    const canvas = swarmRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const RED = '#e0654f', GREEN = '#5bbf73';
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const zone = { x: 0, y: 0, w: 0, h: 0 };
    let textBox = null;

    function measure() {
      const cssW = canvas.clientWidth, cssH = canvas.clientHeight;
      W = cssW; H = cssH;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const narrow = W < 880;
      if (narrow) {
        zone.x = 0; zone.y = 0; zone.w = W; zone.h = H * 0.46;
      } else {
        zone.x = W * 0.40; zone.y = H * 0.06; zone.w = W * 0.60; zone.h = H * 0.72;
      }

      if (rightEl) {
        const cRect = canvas.getBoundingClientRect();
        const rRect = rightEl.getBoundingClientRect();
        const pad = 26;
        textBox = {
          x: rRect.left - cRect.left - pad,
          y: rRect.top - cRect.top - pad,
          w: rRect.width + pad * 2,
          h: rRect.height + pad * 2,
        };
      }
    }

    function inTextBox(x, y) {
      if (!textBox) return false;
      return x > textBox.x && x < textBox.x + textBox.w && y > textBox.y && y < textBox.y + textBox.h;
    }

    function rand(a, b) { return a + Math.random() * (b - a); }
    function fmt() {
      const sign = Math.random() < 0.5 ? -1 : 1;
      const mag = Math.random();
      let v;
      if (mag < 0.6) v = rand(1, 18).toFixed(0);
      else if (mag < 0.9) v = rand(18, 45).toFixed(0);
      else v = rand(45, 120).toFixed(0);
      return (sign < 0 ? '-' : '+') + v + '%';
    }

    const nums = [];
    function spawnNum(intensity) {
      const positive = Math.random() < 0.5;
      let size;
      const r = Math.random();
      if (r < 0.6) size = rand(13, 22);
      else if (r < 0.88) size = rand(22, 40);
      else size = rand(40, 72) * (0.7 + intensity * 0.5);

      const x = zone.x + rand(0.04, 0.96) * zone.w;
      const y = zone.y + rand(0.04, 0.96) * zone.h;

      let maxOp;
      const opr = Math.random();
      if (opr < 0.65) maxOp = rand(0.06, 0.16);
      else if (opr < 0.9) maxOp = rand(0.16, 0.32);
      else maxOp = rand(0.32, 0.55);

      if (inTextBox(x, y)) {
        if (size > 26) return;
        maxOp *= 0.18;
      }

      nums.push({
        text: fmt(),
        x, y, size,
        color: positive ? GREEN : RED,
        op: 0, maxOp,
        vIn: rand(0.06, 0.16),
        state: 'in',
        hold: rand(140, 520),
        tHold: 0,
        vy: 0,
      });
    }

    let phase = 'build';
    let cycleStart = performance.now();
    const BUILD = 3600, PEAK = 1100, COLLAPSE = 1500, EMPTY = 650;
    let lastSpawn = 0;
    let wordShown = [false, false, false];
    function resetWords() { wordShown = [false, false, false]; }

    let rafId = 0;
    function step(now) {
      ctx.clearRect(0, 0, W, H);
      const elapsed = now - cycleStart;
      let intensity = 0;
      if (phase === 'build') {
        intensity = Math.min(1, elapsed / BUILD);
        const eased = intensity * intensity;
        if (!reduce) {
          if (!wordShown[0] && elapsed > 200) { showWord(stopEl); wordShown[0] = true; }
          if (!wordShown[1] && elapsed > BUILD * 0.34) { showWord(chasingEl); wordShown[1] = true; }
          if (!wordShown[2] && elapsed > BUILD * 0.66) { showWord(numbersEl); wordShown[2] = true; }
        }
        const spawnGap = 320 - eased * 295;
        if (now - lastSpawn > spawnGap) {
          const burst = 1 + Math.floor(eased * 4);
          for (let i = 0; i < burst; i++) spawnNum(eased);
          lastSpawn = now;
        }
        if (elapsed >= BUILD) { phase = 'peak'; cycleStart = now; }
      } else if (phase === 'peak') {
        if (now - lastSpawn > 70) { for (let i = 0; i < 3; i++) spawnNum(1); lastSpawn = now; }
        if (now - cycleStart >= PEAK) {
          phase = 'collapse'; cycleStart = now;
          for (const n of nums) { n.state = 'fall'; n.vy = rand(0.4, 1.4); }
          if (!reduce) headWords.forEach(dimWord);
        }
      } else if (phase === 'collapse') {
        if (now - cycleStart >= COLLAPSE) { phase = 'empty'; cycleStart = now; }
      } else if (phase === 'empty') {
        if (now - cycleStart >= EMPTY) { phase = 'build'; cycleStart = now; resetWords(); }
      }

      for (let i = nums.length - 1; i >= 0; i--) {
        const n = nums[i];
        if (n.state === 'in') {
          n.op = Math.min(n.maxOp, n.op + n.vIn);
          if (n.op >= n.maxOp) { n.state = 'hold'; }
        } else if (n.state === 'hold') {
          n.tHold += 16;
          if (phase === 'collapse') { n.state = 'fall'; n.vy = rand(0.4, 1.4); }
        } else if (n.state === 'fall') {
          n.vy += 0.06;
          n.y += n.vy;
          n.op *= 0.94;
          if (n.op < 0.012) { nums.splice(i, 1); continue; }
        }
        drawNum(n);
      }

      rafId = requestAnimationFrame(step);
    }

    function drawNum(n) {
      ctx.globalAlpha = Math.max(0, Math.min(1, n.op));
      ctx.fillStyle = n.color;
      ctx.font = '700 ' + n.size.toFixed(1) + 'px ' + SANS;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(n.text, n.x, n.y);
      ctx.globalAlpha = 1;
    }

    measure();
    if (reduce) {
      for (let i = 0; i < 26; i++) { spawnNum(0.4); }
      for (const n of nums) { n.op = n.maxOp; n.state = 'hold'; }
      const frameFn = () => { ctx.clearRect(0, 0, W, H); for (const n of nums) drawNum(n); };
      frameFn();
      const onResize = () => { measure(); frameFn(); };
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
        timeouts.forEach(clearTimeout);
      };
    }

    const onResize = () => { measure(); };
    window.addEventListener('resize', onResize);
    cycleStart = performance.now();
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      aria-label="POWERS hero. Headline: Stop chasing numbers."
      style={{
        position: 'relative',
        width: '100%',
        // Hero is allowed to run on the upper side of typical row
        // height since it's the page entrance. Tightened from 100vh
        // (~1080px) to ~860px now that the scroll cue is gone.
        minHeight: '86vh',
        overflow: 'hidden',
        background: `
          radial-gradient(120% 90% at 78% 18%, rgba(60,40,40,0.28) 0%, rgba(15,42,71,0) 55%),
          radial-gradient(100% 100% at 50% 0%, #14304f 0%, #0f2a47 45%, #0a1f38 100%)
        `,
      }}
    >
      {/* Number swarm — full-bleed canvas behind the content */}
      <canvas
        ref={swarmRef}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 1, pointerEvents: 'none',
        }}
      />

      {/* Content — asymmetric two-column at desktop */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1280, margin: '0 auto',
        minHeight: '86vh',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        alignItems: 'center',
        gap: 48,
        padding: '88px 48px 56px',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          margin: 0,
          textWrap: 'balance',
        }}>
          <span
            ref={stopRef}
            style={{
              display: 'block',
              opacity: 0,
              transform: 'translateY(14px)',
              fontWeight: 800,
              color: '#fff',
              fontSize: 'clamp(56px, 9vw, 128px)',
              textTransform: 'none',
            }}
          >Stop</span>
          <span
            ref={chasingRef}
            style={{
              display: 'block',
              opacity: 0,
              transform: 'translateY(14px)',
              fontWeight: 800,
              color: '#fff',
              fontSize: 'clamp(56px, 9vw, 128px)',
              textTransform: 'none',
            }}
          >Chasing</span>
          <span
            ref={numbersRef}
            style={{
              display: 'block',
              opacity: 0,
              transform: 'translateY(14px)',
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 500,
              color: '#e89346',
              fontSize: 'clamp(56px, 9vw, 128px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginTop: '0.02em',
            }}
          >Numbers<span style={{ color: '#e89346' }}>.</span></span>
        </h1>

        <div ref={rightRef} style={{ alignSelf: 'center', maxWidth: 430 }}>
          <p ref={ledeRef} style={{
            fontSize: 17, lineHeight: 1.65,
            color: 'rgba(230, 237, 246, 0.78)',
            fontWeight: 300,
            opacity: 0,
            transform: 'translateY(12px)',
            margin: 0,
            textWrap: 'pretty',
          }}>
            {typo("Strong quarters and weak ones are both readouts of the same thing: the fundamentals at the root of your operation. When they\u2019re missing, your ability to execute is at the mercy of conditions. When they\u2019re built in, it isn\u2019t.")}
          </p>
          <p ref={buildRef} style={{
            marginTop: 24,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(24px, 2.8vw, 34px)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#e89346',
            opacity: 0,
            transform: 'translateY(14px)',
            marginBottom: 0,
          }}>We build the foundation.</p>
        </div>
      </div>

      {/* Scroll cue removed — copy direction was to drop the
          "Start with the foundation" line and let the hero close
          tighter against Row 2. */}
    </section>
  );
}

function Eyebrow({ label, light }) { // eslint-disable-line no-unused-vars
  return (
    <div style={{
      fontFamily: MONO,
      fontSize: 11.5, fontWeight: 500,
      letterSpacing: '0.24em', textTransform: 'uppercase',
      color: C.gold,
      marginBottom: 32,
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
/* SectionThePrinciple — ARCHIVED (not currently rendered).
   Kept in source so it can be re-introduced later if needed. The
   redwood thesis line is slated to be absorbed into the closing CTA
   copy in a future pass per direction.

   Compact "design violator" divider band, modeled after the metrics
   row's proportions (~365px tall) so it functions as a quiet visual
   breaker between two white sections — not a full-bleed editorial
   cinema moment. Single-line redwood thesis in Newsreader italic on
   navy, with a gold rule + small closing line. Reads as a punctuation
   mark in the page rhythm, not as its own argument. */
// eslint-disable-next-line no-unused-vars
function SectionThePrinciple() {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !ref.current) return;
    const target = ref.current.querySelector('[data-principle-quote]');
    const attr = ref.current.querySelector('[data-principle-attr]');
    if (!target) return;
    gsap.set([target, attr].filter(Boolean), { opacity: 0, y: 14 });
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.8,
        },
      })
        .to(target, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.0 }, 0)
        .to(attr,   { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 }, 0.3);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navyDeep} 100%)`,
      padding: `clamp(54px, 6vw, 76px) 0`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Faint warm radial — same fireside glow used elsewhere on
          navy surfaces, kept low so the band reads as a single
          calm punctuation mark, not a moment. */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 50% 60% at 22% 50%, rgba(232,147,70,0.10) 0%, rgba(232,147,70,0) 70%)`,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1280, margin: '0 auto',
        padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box',
        display: 'grid',
        // Two-column: thesis on the left, attribution on the right.
        // Stacks at narrow widths via the auto-fit on minimax.
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(220px, 1fr)',
        alignItems: 'center',
        gap: 'clamp(28px, 4vw, 56px)',
      }}>
        {/* The principle — single line, navy serif italic, gold period.
            Set markedly smaller than the previous cinematic treatment so
            the band lands at metrics-row height. */}
        <blockquote data-principle-quote style={{
          margin: 0,
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 'clamp(22px, 2.6vw, 34px)',
          lineHeight: 1.22,
          color: C.white,
          letterSpacing: '-0.014em',
          textWrap: 'balance',
        }}>
          The tallest trees on earth don&rsquo;t stand because of what you can see<span style={{ color: '#e89346' }}>.</span>
        </blockquote>

        {/* Attribution — gold left rule + one body line + closing tag */}
        <div data-principle-attr style={{
          paddingLeft: 22,
          borderLeft: `1px solid rgba(232,147,70,0.6)`,
        }}>
          <p style={{
            fontSize: 14, fontWeight: 300, lineHeight: 1.55,
            color: 'rgba(255,255,255,0.78)', fontFamily: SANS,
            margin: '0 0 10px', textWrap: 'pretty',
          }}>
            {typo("Operations are no different. The ones that perform under pressure are the ones built on something strong enough underneath to carry the weight.")}
          </p>
          <div style={{
            fontFamily: MONO,
            fontSize: 11.5, fontWeight: 500,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#e89346',
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
    headline: 'Reliable Equipment',
    body: 'Uptime, changeovers, and maintenance practices that make the asset base predictable. When equipment performs, scheduling works, throughput stays consistent, and labor stops absorbing the variability the machines should have absorbed.',
  },
  {
    headline: 'Workforce Capability',
    body: "Skilled, engaged operators who know the work, own the outcome, and can train the next shift. Capability isn\u2019t a headcount problem. It\u2019s what each person on the line can actually do when the day gets hard.",
  },
  {
    headline: 'Daily Accountability',
    body: "The cadence, metrics, and conversations that close the loop every shift, every day. Without it, the other four drift. With it, they lock together and compound.",
  },
];

function IconPlaceholder() {
  return (
    <div style={{
      width: 32, height: 32, marginBottom: 20,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="1" y="1" width="30" height="30" rx="0" stroke="#143257" strokeWidth="1.5"/>
        <line x1="8" y1="16" x2="24" y2="16" stroke="#143257" strokeWidth="1.5"/>
        <line x1="16" y1="8" x2="16" y2="24" stroke="#143257" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

/* ExpertiseCard — Five Disciplines accordion card. All five cards are
   equal-weight (no keystone treatment); clicking the [+] toggles an
   expansion that reveals the body text below the title. Closes when
   another card opens (radio behavior). The card is white with no
   internal border — the copper outer frame on the row carries the
   structural weight. */
/* DisciplineTab — small/short card. Just the title + [+/×] toggle.
   Body text lives in a single shared panel below the row, not inside
   the card. When this tab is active, a copper border highlights it
   and the toggle rotates to ×. */
function DisciplineTab({ headline, isOpen, onToggle, isLastInRow }) {
  return (
    <button
      type="button"
      data-discipline-tab
      aria-expanded={isOpen}
      onClick={onToggle}
      style={{
        background: '#ffffff',
        // The active tab gets a copper outline that visually "extends"
        // into the panel below via the panel's matching border.
        border: isOpen
          ? `1px solid ${C.gold600}`
          : `1px solid transparent`,
        // Subtle inter-card divider on non-active tabs.
        borderRight: isOpen
          ? `1px solid ${C.gold600}`
          : (isLastInRow ? '1px solid transparent' : `1px solid rgba(232, 147, 70, 0.08)`),
        padding: '32px 26px',
        margin: 0,
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'inherit',
        color: 'inherit',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        // Short, fixed height — only enough for the title.
        minHeight: 138,
        position: 'relative',
        outline: 'none',
        transition: 'border-color 220ms ease, background 220ms ease',
      }}
      onMouseEnter={(e) => {
        if (!isOpen) e.currentTarget.style.background = 'rgba(247, 232, 200, 0.20)';
      }}
      onMouseLeave={(e) => {
        if (!isOpen) e.currentTarget.style.background = '#ffffff';
      }}
    >
      <div style={{
        fontFamily: 'inherit',
        fontSize: 'clamp(18px, 1.4vw, 21px)',
        fontWeight: 700, lineHeight: 1.18,
        color: C.navy,
        letterSpacing: '-0.012em',
      }}>{headline}</div>
      {/* [+] toggle — copper, rotates 45° to × when open */}
      <span aria-hidden="true" style={{
        flex: '0 0 auto',
        width: 16, height: 16, position: 'relative',
        color: C.copper,
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1)',
        marginTop: 4,
      }}>
        <span style={{
          position: 'absolute', top: '50%', left: 0,
          width: '100%', height: 1.5,
          background: 'currentColor',
          transform: 'translateY(-50%)',
        }} />
        <span style={{
          position: 'absolute', left: '50%', top: 0,
          width: 1.5, height: '100%',
          background: 'currentColor',
          transform: 'translateX(-50%)',
        }} />
      </span>
    </button>
  );
}

function LearnMoreLink({ href }) {
  const [h, setH] = useState(false);
  return (
    <a href={href || '#'} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontSize: 14, fontWeight: 500, color: '#e89346',
        textDecoration: h ? 'underline' : 'none',
        textUnderlineOffset: 3, fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
      Learn More
      <span style={{ transform: h ? 'translateX(3px)' : 'none', transition: 'transform 160ms ease', display: 'inline-block' }}>→</span>
    </a>
  );
}

/* SectionExpertiseAreas — Five Disciplines, "tab-strip + drawer" layout.
   Top row: 5 short equal-weight cards, each showing only the discipline
   title + a [+] toggle. The whole strip is wrapped in a single copper
   hairline frame.

   Below the strip: a single shared panel that opens when any tab is
   activated. The panel reserves a 5-column grid the same width as the
   row above, and the body text sits in the column matching the active
   tab — so the text appears to "drop down" out of the clicked card.
   Radio behavior: opening one closes any other; the panel itself slides
   open/closed via max-height + opacity. */
function SectionExpertiseAreas() {
  const [openIdx, setOpenIdx] = useState(null);
  const panelRef = useRef(null);
  const [panelHeight, setPanelHeight] = useState(0);

  // Measure the open card's body height so the panel animates to the
  // real natural height. We measure the tallest body so the panel doesn't
  // jump between card switches; this keeps the closing copper border
  // sitting at a consistent baseline as the user clicks through tabs.
  const bodyRefs = useRef([]);
  useEffect(() => {
    const measure = () => {
      const heights = bodyRefs.current.map((el) => (el ? el.scrollHeight : 0));
      const max = Math.max(0, ...heights);
      setPanelHeight(max);
    };
    measure();
    const ro = new ResizeObserver(measure);
    bodyRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  return (
    <section style={{ background: C.white, padding: `${S.sectionPadY} 0` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto', padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box' }}>
        {/* Header — left-anchored editorial */}
        <div style={{ marginBottom: 64, maxWidth: S.maxRead }}>
          <ChapterMark n="01" />
          <Eyebrow label="What Gets Built In" />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: SANS, margin: '0 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Five disciplines.{' '}
            <span style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
              color: C.gold600,
            }}>One operation that doesn{'\u2019'}t break down.</span>
          </h2>
        </div>

        {/* Tab strip + drawer panel wrapped in a single copper frame. */}
        <div style={{
          position: 'relative',
          border: `1px solid ${C.gold600}`,
          padding: 10,
          background: 'rgba(255, 255, 255, 0.4)',
        }}>
          {/* Row — 5 short cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 0,
            background: '#ffffff',
          }}>
            {EXPERTISE_CARDS.map((card, i) => (
              <DisciplineTab
                key={card.headline}
                headline={card.headline}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                isLastInRow={i === EXPERTISE_CARDS.length - 1}
              />
            ))}
          </div>

          {/* Drawer — single shared panel below the row. Reserves the
              same 5-column grid so the active body text drops into the
              column of the clicked card. Other columns stay empty. */}
          <div
            ref={panelRef}
            style={{
              overflow: 'hidden',
              maxHeight: openIdx !== null ? panelHeight + 64 : 0,
              opacity: openIdx !== null ? 1 : 0,
              transition: 'max-height 460ms cubic-bezier(0.4, 0, 0.2, 1), opacity 320ms ease',
              willChange: 'max-height, opacity',
              marginTop: openIdx !== null ? 0 : 0,
              background: '#ffffff',
              borderTop: openIdx !== null ? `1px solid ${C.gold600}` : '1px solid transparent',
              transitionProperty: 'max-height, opacity, border-top-color',
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              padding: '28px 0 36px',
            }}>
              {EXPERTISE_CARDS.map((card, i) => (
                <div
                  key={card.headline}
                  style={{
                    padding: '0 26px',
                    visibility: openIdx === i ? 'visible' : 'hidden',
                    // Keep refs measurable while hidden — `visibility:
                    // hidden` preserves layout, unlike `display: none`.
                    height: openIdx === i ? 'auto' : 0,
                  }}
                >
                  <p
                    ref={(el) => { bodyRefs.current[i] = el; }}
                    style={{
                      fontFamily: SANS,
                      fontSize: 15, fontWeight: 300, lineHeight: 1.7,
                      color: C.body, margin: 0, textWrap: 'pretty',
                    }}
                  >{typo(card.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing paragraph — sits below the framed row */}
        <p style={{
          fontFamily: SANS,
          marginTop: 56,
          fontSize: S.ledeSize, fontWeight: 300, lineHeight: 1.65,
          color: C.body, maxWidth: S.maxRead,
          textWrap: 'pretty', margin: '56px 0 0',
        }}>
          {typo("Not five initiatives or five priorities. Five disciplines built into how the operation runs every shift. Weaken one and the others drift. Build them together and they interlock into something load-bearing, deep enough that performance doesn\u2019t break down when conditions do.")}
        </p>
      </div>
    </section>
  );
}

function ExecutionExhibit() {
  const canvasRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const loadInputRef = useRef(null);
  const loadValRef = useRef(null);
  const burstBtnRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const NAVY_DEEP = '#0f2a47';
    const RED = '#e0654f';
    const GREEN = '#5bbf73';
    const GOLD = '#e89346';

    const pressures = [
      'Market volatility', 'Tariff & trade shifts', 'Demand swings', 'Workforce turnover',
      'Equipment breakdowns', 'Inexperienced supervisors', 'Margin compression', 'Schedule misses',
      'Supply chain disruption', 'New site ramp-up', 'Raw material shortfall', 'Quality escapes',
      'Absenteeism', 'Changeover delays', 'Unplanned downtime', 'Skilled labor shortage',
      'Aging equipment', 'Rising input costs', 'Capacity constraints', 'Supplier delays',
      'Rework & scrap', 'Safety incidents', 'Tribal knowledge loss', 'Forecast misses',
      'Inventory imbalance', 'Shipping delays', 'Energy cost spikes', 'Regulatory changes',
      'Customer escalations', 'Maintenance backlog', 'Bottleneck operations', 'Shift variance',
      'Overtime creep', 'Yield loss', 'Material price swings',
    ];
    const outcomes = [
      'Increased throughput', 'Higher OEE', 'Reduced downtime', 'Improved labor productivity',
      'Expanded margin', 'Recovered working capital', 'Stronger frontline leadership', 'Sustained performance',
      'Lower cost per unit', 'Workforce stability', 'Increased capacity', 'Higher quality', 'Less waste', 'Higher yield',
      'Faster changeovers', 'On-time delivery', 'Predictable schedules', 'Fewer safety incidents',
      'Improved first-pass yield', 'Lower scrap rate', 'Better asset reliability', 'Shorter lead times',
      'Consistent shift output', 'Reduced overtime', 'Stronger accountability', 'Improved morale',
      'Tighter cost control', 'Scalable operations', 'Repeatable execution', 'Higher utilization',
    ];

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const core = { x: 0, y: 0, r: 0 };

    function aspectFor(w) {
      // Shorter canvas → less dead space inside the stage. Core circle
      // stays the same physical size (radius is floor-locked at 82px),
      // so this only removes empty vertical room above and below the
      // circle — labels still have plenty of horizontal travel.
      if (w < 480) return 0.50;
      if (w < 768) return 0.42;
      return 0.32;
    }

    function resize() {
      const cssW = canvas.clientWidth || canvas.parentElement.clientWidth;
      const cssH = Math.round(cssW * aspectFor(cssW));
      canvas.style.height = cssH + 'px';
      W = cssW; H = cssH;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      core.x = W * 0.5;
      core.y = H * 0.5;
      core.r = Math.max(82, Math.min(W, H) * 0.17);
    }

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function rand(a, b) { return a + Math.random() * (b - a); }
    function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

    const inbound = [];
    const outbound = [];
    const particles = [];

    function spawnPressure() {
      const startX = -30;
      const startY = rand(0.08, 0.92) * H;
      inbound.push({
        text: pick(pressures),
        x: startX, y: startY,
        speed: rand(2.0, 4.2),
        wobble: rand(0, Math.PI * 2),
        wobAmp: rand(0.15, 0.7),
        size: rand(12, 17),
        opacity: 0,
        state: 'fly',
        tAbsorb: 0,
      });
    }

    function emitOutcome() {
      outbound.push({
        text: pick(outcomes),
        x: core.x + core.r * 0.2,
        y: core.y + rand(-core.r * 0.5, core.r * 0.5),
        targetY: 0,
        vx: 1.9,
        size: 14,
        opacity: 0,
        life: 0,
        state: 'birth',
      });
      const last = outbound[outbound.length - 1];
      last.targetY = core.y + rand(-H * 0.30, H * 0.30);
    }

    function burstAbsorb(x, y, color) {
      const n = 14;
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.6, 2.6);
        particles.push({
          x, y,
          vx: Math.cos(a) * sp - 1.2,
          vy: Math.sin(a) * sp,
          r: rand(1, 2.6),
          life: 1,
          decay: rand(0.012, 0.03),
          color,
        });
      }
    }
    function burstEmit(x, y, color) {
      const n = 10;
      for (let i = 0; i < n; i++) {
        const a = rand(-0.7, 0.7);
        const sp = rand(0.8, 2.2);
        particles.push({
          x, y,
          vx: Math.cos(a) * sp + 0.8,
          vy: Math.sin(a) * sp * 0.6,
          r: rand(1, 2.4),
          life: 1,
          decay: rand(0.012, 0.028),
          color,
        });
      }
    }

    let loadLevel = 6;
    let lastSpawn = 0;
    let lastEmit = 0;
    const EMIT_GAP = 1150;
    let surgeUntil = 0;
    let surgeStart = 0;
    const SURGE_DUR = 2600;
    let surgeEase = 0;

    function computeSpawnGap() {
      const base = 1150 - (loadLevel - 1) * 95;
      return base;
    }

    function updateSurgeEase(t) {
      if (t >= surgeUntil) {
        surgeEase += (0 - surgeEase) * 0.06;
        if (surgeEase < 0.002) surgeEase = 0;
        return;
      }
      const elapsed = t - surgeStart;
      const p = Math.max(0, Math.min(1, elapsed / SURGE_DUR));
      const target = Math.sin(p * Math.PI);
      surgeEase += (target - surgeEase) * 0.08;
    }

    let running = true;
    const speedScale = reduceMotion ? 0.35 : 1;
    let pulse = 0;
    let rafId = 0;

    function frame(ts) {
      const t = ts;
      ctx.clearRect(0, 0, W, H);

      updateSurgeEase(t);
      drawCore(t);

      const surging = t < surgeUntil;
      const gap = surging ? 180 : computeSpawnGap();
      if (running && t - lastSpawn > gap) {
        spawnPressure();
        if (surging && Math.random() < 0.6) spawnPressure();
        lastSpawn = t;
      }

      if (running && t - lastEmit > EMIT_GAP) {
        emitOutcome();
        lastEmit = t;
      }

      for (let i = inbound.length - 1; i >= 0; i--) {
        const p = inbound[i];
        if (p.state === 'fly') {
          p.opacity = Math.min(1, p.opacity + 0.06);
          if (running) {
            const dx = core.x - p.x, dy = core.y - p.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist, uy = dy / dist;
            const perpx = -uy, perpy = ux;
            p.wobble += 0.05;
            const wob = Math.sin(p.wobble) * p.wobAmp;
            p.x += (ux * p.speed + perpx * wob) * speedScale;
            p.y += (uy * p.speed + perpy * wob) * speedScale;
            if (dist < core.r * 0.95) {
              p.state = 'absorb';
              p.tAbsorb = 0;
              burstAbsorb(p.x, p.y, RED);
            }
          }
          const ddx = core.x - p.x, ddy = core.y - p.y;
          const ddist = Math.hypot(ddx, ddy);
          drawLabel(p.x, p.y, p.text, RED, p.opacity * fadeNearCore(ddist), p.size);
        } else if (p.state === 'absorb') {
          p.tAbsorb += 0.06;
          const k = 1 - p.tAbsorb;
          if (running) {
            p.x += (core.x - p.x) * 0.18;
            p.y += (core.y - p.y) * 0.18;
          }
          drawLabel(p.x, p.y, p.text, RED, Math.max(0, k) * 0.6, p.size * Math.max(0.2, k));
          if (p.tAbsorb >= 1) {
            inbound.splice(i, 1);
            pulse = Math.min(1, pulse + 0.10);
          }
        }
      }

      for (let i = outbound.length - 1; i >= 0; i--) {
        const o = outbound[i];
        if (o.state === 'birth') {
          o.life += 0.05;
          o.opacity = Math.min(1, o.opacity + 0.05);
          if (running) {
            o.y += (o.targetY - o.y) * 0.04;
            o.x += o.vx * 0.4 * speedScale;
          }
          if (o.life >= 1) {
            o.state = 'glide';
            burstEmit(o.x, o.y, GREEN);
          }
          drawLabel(o.x, o.y, o.text, GREEN, o.opacity * 0.85, o.size);
        } else {
          if (running) {
            o.x += o.vx * speedScale;
            o.y += (o.targetY - o.y) * 0.02;
          }
          let op = o.opacity;
          if (o.x > W * 0.86) { op = Math.max(0, op - 0.02); o.opacity = op; }
          drawLabel(o.x, o.y, o.text, GREEN, op, o.size);
          if (o.x > W + 40 || op <= 0.02) { outbound.splice(i, 1); }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const pa = particles[i];
        if (running) { pa.x += pa.vx * speedScale; pa.y += pa.vy * speedScale; }
        pa.life -= pa.decay;
        if (pa.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, pa.life) * 0.7;
        ctx.fillStyle = pa.color;
        ctx.beginPath();
        ctx.arc(pa.x, pa.y, pa.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      pulse *= 0.94;

      rafId = requestAnimationFrame(frame);
    }

    function fadeNearCore(dist) {
      const edge = core.r * 1.25;
      if (dist > edge) return 1;
      return Math.max(0.15, (dist - core.r * 0.9) / (edge - core.r * 0.9));
    }

    function drawLabel(x, y, text, color, opacity, size) {
      if (opacity <= 0.01) return;
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      ctx.fillStyle = color;
      ctx.font = '500 ' + size.toFixed(1) + 'px ' + SANS;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1;
    }

    function drawCore(t) {
      const baseBreath = Math.sin(t * 0.0015) * 0.012;
      const surgeBreath = Math.sin(t * 0.0011) * 0.05 * surgeEase;
      const swell = 1 + baseBreath + surgeBreath + surgeEase * 0.04;
      const r = core.r * swell + pulse * 4;

      ctx.save();
      ctx.beginPath();
      ctx.arc(core.x, core.y, r * (1.5 + surgeEase * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232,147,70,' + (0.05 + pulse * 0.05 + surgeEase * 0.07).toFixed(3) + ')';
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(core.x, core.y, r, 0, Math.PI * 2);
      ctx.fillStyle = NAVY_DEEP;
      ctx.fill();
      ctx.lineWidth = 1.5 + surgeEase * 1.0;
      ctx.strokeStyle = 'rgba(232,147,70,' + (0.85 + surgeEase * 0.15).toFixed(2) + ')';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(core.x, core.y, r * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(232,147,70,0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.textBaseline = 'middle';
      const titleSize = Math.max(12, r * 0.150);
      ctx.font = '500 ' + titleSize.toFixed(0) + 'px ' + SANS;
      ctx.fillStyle = GOLD;
      const lines = ['EXECUTION', 'CAPABILITY', 'ROOTED IN', 'DISCIPLINE'];
      const lh = titleSize * 1.42;
      const startY = core.y - lh * 1.5;
      const tracking = titleSize * 0.18;
      for (let i = 0; i < lines.length; i++) {
        drawTracked(lines[i], core.x, startY + i * lh, tracking);
      }
    }

    function drawTracked(text, cx, y, tracking) {
      ctx.textAlign = 'left';
      const widths = [];
      let total = 0;
      for (const ch of text) {
        const w = ctx.measureText(ch).width;
        widths.push(w);
        total += w + tracking;
      }
      total -= tracking;
      let x = cx - total / 2;
      let k = 0;
      for (const ch of text) {
        ctx.fillText(ch, x, y);
        x += widths[k] + tracking;
        k++;
      }
      ctx.textAlign = 'center';
    }

    const onToggle = () => {
      running = !running;
      if (toggleBtnRef.current) toggleBtnRef.current.textContent = running ? 'Pause' : 'Play';
    };
    const onLoadInput = (e) => {
      loadLevel = +e.target.value;
      if (loadValRef.current) loadValRef.current.textContent = e.target.value;
    };
    const onBurst = () => {
      surgeStart = performance.now();
      surgeUntil = surgeStart + SURGE_DUR;
    };

    const toggleBtn = toggleBtnRef.current;
    const loadInput = loadInputRef.current;
    const burstBtn = burstBtnRef.current;
    toggleBtn && toggleBtn.addEventListener('click', onToggle);
    loadInput && loadInput.addEventListener('input', onLoadInput);
    burstBtn && burstBtn.addEventListener('click', onBurst);
    window.addEventListener('resize', resize);

    resize();
    for (let i = 0; i < 4; i++) { setTimeout(spawnPressure, i * 220); }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      toggleBtn && toggleBtn.removeEventListener('click', onToggle);
      loadInput && loadInput.removeEventListener('input', onLoadInput);
      burstBtn && burstBtn.removeEventListener('click', onBurst);
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Stage — canvas auto-sizes to parent width */}
      <div style={{ position: 'relative', width: '100%', marginTop: 0 }}>
        <canvas
          ref={canvasRef}
          aria-label="Animated exhibit: varied operational pressures are all absorbed by a steady execution-capability core, which emits a calm, even stream of positive outcomes."
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>

      {/* Controls — Pause/Play, Operating pressure slider, Surge.
          Sit close to the canvas (marginTop tightened) so the exhibit
          + controls read as a single composed unit, not two stacked
          blocks. */}
      <div style={{
        display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center',
        marginTop: 6, flexWrap: 'wrap',
      }}>
        <button
          ref={toggleBtnRef}
          type="button"
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 12.5, letterSpacing: '0.04em',
            padding: '8px 16px', borderRadius: 0,
            cursor: 'pointer', fontFamily: SANS,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
        >Pause</button>

        <label style={{
          fontSize: 12, color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.04em', fontFamily: SANS,
        }}>Operating pressure</label>

        <input
          ref={loadInputRef}
          type="range" min="1" max="10" defaultValue="6"
          style={{ accentColor: C.gold, width: 120 }}
        />

        <span
          ref={loadValRef}
          style={{
            fontVariantNumeric: 'tabular-nums',
            minWidth: 34, textAlign: 'center', color: C.gold,
            fontFamily: MONO, fontSize: 13,
          }}
        >6</span>

        <button
          ref={burstBtnRef}
          type="button"
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 12.5, letterSpacing: '0.04em',
            padding: '8px 16px', borderRadius: 0,
            cursor: 'pointer', fontFamily: SANS,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
        >Surge</button>
      </div>
    </div>
  );
}

function SectionExecutionEngine() {
  return (
    <section style={{
      background: `linear-gradient(180deg, ${C.navy900} 0%, ${C.ink} 100%)`,
      padding: `${S.sectionPadY} 0`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Faint cobalt wash on the right, ice-blue glow on the left, to add
          chromatic depth to the navy field without breaking the brand. */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 80% 60% at 12% 30%, rgba(44,95,163,0.18) 0%, rgba(44,95,163,0) 60%), radial-gradient(ellipse 70% 50% at 88% 70%, rgba(72,120,184,0.12) 0%, rgba(72,120,184,0) 60%)`,
      }} />

      <div style={{ maxWidth: S.maxWide, margin: '0 auto', padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box', position: 'relative' }}>

        {/* Header — left-anchored editorial, on dark. UNCHANGED from
            previous version per user direction; only the diagram block
            below has been swapped. Margin tightened so the exhibit
            sits closer to the body copy. */}
        <div style={{ marginBottom: 36, maxWidth: S.maxRead }}>
          <ChapterMark n="04" light />
          <Eyebrow label="When Everything Works Together" light />
          <h2 style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.white, fontFamily: SANS, margin: '0 0 28px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Pressure in. <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.gold }}>Performance out.</span>
          </h2>
          <p style={{
            fontSize: S.ledeSize, fontWeight: 300, lineHeight: 1.6,
            color: 'rgba(230, 237, 246, 0.78)', fontFamily: SANS, margin: 0,
            textWrap: 'pretty', maxWidth: 640,
          }}>
            {typo("The market forces don\u2019t stop coming. The foundation you build at the root level of your operation decides whether they impact production or get handled before they do.")}
          </p>
        </div>

        {/* EXHIBIT — canvas-based animated demonstration of the engine. */}
        <ExecutionExhibit />
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

/* LoopingVideoWithCrossfade — seamless-loop video component.
   The video's first frame is captured into a separate poster JPG and
   the component crossfades between the video and that poster image at
   each loop boundary, hiding the hard cut. The poster matches the
   video's first frame, so the transition is visually invisible — the
   reader perceives a single continuous shot.

   Implementation: the video fades to opacity 0 in the final
   `FADE_SECONDS` of each playback, revealing the poster underneath.
   After `loop` restarts playback at t=0, the video fades back in over
   the next `FADE_SECONDS`. A rAF loop drives the fade for smoothness
   (timeupdate only fires ~4x/sec which would step visibly).

   Honors `prefers-reduced-motion` by disabling the fade and leaving
   the video at full opacity — the loop seam stays visible but the
   page doesn't animate. */
const LoopingVideoWithCrossfade = ({ poster, sources, ariaLabel }) => {
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setOpacity(1); return; }

    const FADE_SECONDS = 0.7;
    let rafId = 0;
    const tick = () => {
      const dur = v.duration;
      const t = v.currentTime;
      if (!isFinite(dur) || dur <= 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      let next = 1;
      if (t < FADE_SECONDS) {
        // fade in after the loop reset
        next = Math.min(1, t / FADE_SECONDS);
      } else if (dur - t < FADE_SECONDS) {
        // fade out toward the loop seam
        next = Math.max(0, (dur - t) / FADE_SECONDS);
      }
      setOpacity(next);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      minHeight: 400,
    }}>
      {/* Poster — sits behind the video, visible through the video's
          opacity at the loop seam. Same first-frame image so the
          crossfade is invisible. */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
        }}
      />
      <video
        ref={videoRef}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          opacity,
        }}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
};


function SectionHowWeWork() {
  return (
    <section style={{ background: C.white, padding: `${S.sectionPadY} 0` }}>
      <div style={{
        maxWidth: S.maxWide, margin: '0 auto', padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        minHeight: 520,
        alignItems: 'stretch',
        gap: 0,
      }}>
        {/* Left: copy */}
        <div style={{
          padding: `0 clamp(24px, 4vw, 56px) 0 0`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22,
        }}>
          <ChapterMark n="05" />
          <Eyebrow label="How We Work" />
          <h2 data-subhead-reveal style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: 0,
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            We work where value gets&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>won or lost.</span>
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
                fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, fontStyle: 'italic',
                color: C.white, fontFamily: SERIF, lineHeight: 1.3,
                letterSpacing: '-0.008em',
              }}>
                {typo("\u201cIf you\u2019re working, we\u2019re working.\u201d")}
              </span>
            </div>
          </div>
        </div>

        {/* Right: media — flush bleed to right edge of the container.
            Auto-playing, looping, muted background video replaces the
            static placeholder. The <LoopingVideoWithCrossfade /> component
            crossfades to the first-frame poster image at each loop
            boundary, hiding the hard cut and producing a seamless loop.
            `playsInline` is required for iOS Safari to keep it inline
            (not fullscreen) and `muted` is required for `autoPlay` to be
            honored on every modern browser. */}
        <div style={{
          background: C.navy900,
          minHeight: 400,
          display: 'flex', alignItems: 'stretch',
          position: 'relative', overflow: 'hidden',
        }}>
          <LoopingVideoWithCrossfade
            poster="/uploads/powers-banner-2026-v2-poster.jpg"
            sources={[
              { src: '/uploads/powers-banner-2026-v2.webm', type: 'video/webm' },
              { src: '/uploads/powers-banner-2026-v2.mp4',  type: 'video/mp4'  },
            ]}
            ariaLabel="POWERS consultants working on the manufacturing floor"
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
        background: hovered ? '#143257' : '#ffffff',
        color: hovered ? '#ffffff' : '#143257',
        border: `1px solid ${hovered ? '#143257' : '#e2e2dc'}`,
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
        color: hovered ? '#e89346' : 'transparent',
        transition: 'color 180ms ease',
        lineHeight: 1,
      }}>→</span>
    </Link>
  );
}

function SectionWhereWeWork() {
  const [linkHover, setLinkHover] = useState(false);
  return (
    <section style={{ background: S.bgGoldWash, padding: `${S.sectionPadY} 0` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto', padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box' }}>

        {/* Section header — left-anchored column. Single 920px measure
            for header + body so the section reads as one continuous
            argument rather than a header / multi-block stack. */}
        <div style={{ marginBottom: 36, maxWidth: 920 }}>
          <Eyebrow label="Where We Work" />
          <h2 data-subhead-reveal style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 28px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>
            Wherever the work is&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>physical, repeatable, and measured.</span>
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
        borderTop: `3px solid #143257`,
        padding: '32px 28px 28px',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'border-top-color 200ms ease',
      }}
    >
      <div style={{
        fontFamily: MONO,
        fontSize: 11.5, fontWeight: 500, letterSpacing: '0.24em',
        textTransform: 'uppercase', color: '#e89346',
      }}>{industry}</div>
      <div style={{
        fontSize: 17, fontWeight: 700, lineHeight: 1.3,
        color: '#143257', fontFamily: 'inherit',
      }}>{result}</div>
      <p style={{
        fontSize: 14, fontWeight: 300, lineHeight: 1.65,
        color: '#4a5568', fontFamily: 'inherit', margin: 0, flex: 1,
        textWrap: 'pretty',
      }}>{summary}</p>
      <a href="#" style={{
        fontSize: 13, fontWeight: 500, color: h ? '#e89346' : '#e89346',
        textDecoration: 'none', fontFamily: 'inherit',
        transition: 'color 150ms ease',
      }}>Read the case study →</a>
    </div>
  );
}

function SectionResultsEntryPoint() {
  const [h, setH] = useState(false);
  return (
    <section style={{ background: S.bgNavy, padding: `${S.sectionPadY} 0` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto', padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: S.gapHeaderToBody }}>
          <ChapterMark n="08" light />
          <Eyebrow label="Proven Results" />
          <h2 data-subhead-reveal style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.white, fontFamily: 'inherit', margin: '16px 0 22px',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>The work, on the&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.gold }}>floor.</span></h2>
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
        fontFamily: MONO,
        fontSize: 11.5, fontWeight: 500, letterSpacing: '0.24em',
        textTransform: 'uppercase', color: '#e89346',
      }}>{category}</div>
      <div style={{
        fontSize: 18, fontWeight: 700, lineHeight: 1.3,
        color: h ? '#4a6a8a' : '#143257', fontFamily: 'inherit',
        transition: 'color 150ms ease',
        textWrap: 'pretty',
      }}>{headline}</div>
      <p style={{
        fontSize: 14, fontWeight: 300, lineHeight: 1.65,
        color: '#4a5568', fontFamily: 'inherit', margin: 0, flex: 1,
        textWrap: 'pretty',
      }}>{summary}</p>
      <a href="#" style={{
        fontSize: 13, fontWeight: 500, color: '#e89346',
        textDecoration: h ? 'underline' : 'none',
        textUnderlineOffset: 3, fontFamily: 'inherit',
      }}>Read more →</a>
    </div>
  );
}

function SectionInsightsEntryPoint() {
  const [h, setH] = useState(false);
  return (
    <section style={{ background: S.bgIvory, padding: `${S.sectionPadY} 0` }}>
      <div style={{ maxWidth: S.maxWide, margin: '0 auto', padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: S.gapHeaderToBody }}>
          <ChapterMark n="09" />
          <Eyebrow label="Insights" />
          <h2 data-subhead-reveal style={{
            fontSize: S.h2Size, fontWeight: S.h2Weight, lineHeight: S.h2LH,
            color: C.navy, fontFamily: 'inherit', margin: '16px 0 0',
            letterSpacing: S.h2Tracking, textWrap: 'pretty',
          }}>The&nbsp;<span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: C.copper }}>thinking</span>&nbsp;behind the work.</h2>
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
      // Gold-wash light surface — differentiates the closing CTA
      // from the navy footer directly below it. The very subtle
      // warm tint reads as a coda to the page, not another dark
      // panel stacked on dark.
      background: S.bgGoldWash,
      padding: `clamp(80px, 9vw, 120px) 0`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Faint warm radial — kept low so it reads as light on the
          wash rather than competing color. */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 60% at 75% 30%, rgba(232,147,70,0.06) 0%, rgba(232,147,70,0) 70%)`,
      }} />

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: `0 ${S.sectionPadX}`, boxSizing: 'border-box',
        position: 'relative', zIndex: 1,
      }}>
        {/* H2 — editorial echo of the hero. Hero pairing was sans-navy
            statement + serif-italic gold pivot ("Stop Chasing" /
            "Numbers."). The CTA mirrors that exact pairing as the
            page-closing resolve. Sits on the gold-wash surface so
            both colors hold their full weight. */}
        <h2 data-subhead-reveal style={{
          fontSize: S.h2Size,
          fontWeight: S.h2Weight, lineHeight: S.h2LH,
          fontFamily: SANS,
          margin: '0 0 36px', maxWidth: 900,
          letterSpacing: S.h2Tracking, textWrap: 'balance',
        }}>
          <span style={{ display: 'block', color: C.navy }}>Stop chasing numbers.</span>
          <span style={{
            display: 'block',
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500,
            color: '#e89346', letterSpacing: '-0.014em',
            marginTop: '0.05em',
          }}>Start building the foundation.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(280px,1fr)', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'end' }}>
          <p style={{
            fontSize: 17, fontWeight: 300, lineHeight: 1.65,
            color: C.body, fontFamily: SANS,
            margin: 0, maxWidth: 600, textWrap: 'pretty',
          }}>{typo("Tell us where the operation is underperforming. We\u2019ll come see it, on the floor, and show you what\u2019s missing.")}</p>

          <div>
            <a href="contact.html"
              onMouseEnter={() => setH(true)}
              onMouseLeave={() => setH(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                background: h ? '#143257' : '#e89346',
                color: h ? '#ffffff' : '#143257',
                fontSize: 15, fontWeight: 600,
                padding: '18px 32px', textDecoration: 'none',
                fontFamily: SANS, letterSpacing: 0,
                transition: 'background 160ms ease, color 160ms ease, transform 160ms ease',
                transform: h ? 'translateY(-1px)' : 'translateY(0)',
              }}>
              Start a Conversation
              <span style={{ fontFamily: SERIF, fontSize: 17 }}>→</span>
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
      fontFamily: MONO,
      fontSize: 11.5, fontWeight: 500,
      letterSpacing: '0.24em', textTransform: 'uppercase',
      color: '#ffffff',
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
      style={{ display: 'inline-block', marginTop: 20, color: h ? '#e89346' : '#ffffff', transition: 'color 160ms ease' }}
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
        color: h ? '#143257' : '#e89346',
        background: h ? '#e89346' : 'transparent',
        border: '1px solid #e89346',
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
    <footer style={{ background: '#0f2a47', fontFamily: 'inherit', borderTop: '1px solid #e89346' }}>
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
            color: '#e89346', fontFamily: 'inherit', marginBottom: 14,
          }}>Strong Foundation. Strong Performance.</div>
          <p style={{
            fontSize: 13, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.60)', fontFamily: 'inherit', margin: 0,
            textWrap: 'pretty',
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
          background: 'rgba(232,147,70,0.20)',
          marginBottom: 20,
        }} />
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', gap: '6px 12px',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 300,
            color: 'rgba(255,255,255,0.40)', fontFamily: 'inherit',
          }}>Copyright 2026 The POWERS Company, Inc. All Rights Reserved.</span>
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
/* SectionDifferentApproach — Row 2, sits directly below the hero.
   Ported verbatim from the user-provided powers-row2.html.
   Two-column layout: lead column carries the H2 + prose narrative,
   right sticky aside carries the "radios get quiet" pull quote inside
   a gold-rule left frame. Sequential 80ms-staggered reveal as each
   element scrolls into view, honoring `prefers-reduced-motion`.
   This replaces the previous SectionTheMoment / Diagnostic Chain. */
function SectionDifferentApproach() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('[data-reveal]'));
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-revealed', 'true'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const i = els.indexOf(el);
          setTimeout(() => el.setAttribute('data-revealed', 'true'), Math.max(0, i) * 80);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Shared "reveal" base style applied to every animated element.
  // The actual transition uses the `[data-revealed="true"]` attribute,
  // which the IntersectionObserver flips on enter. We inline both
  // states because we don't have a stylesheet here.
  const revealBase = {
    opacity: 0,
    transform: 'translateY(14px)',
    transition: 'opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)',
  };
  // The CSS attribute selector trick is replaced here with an inline
  // ref-based toggle: the IntersectionObserver flips `data-revealed`,
  // and we read that on mount via a small style override placed in a
  // <style> tag scoped by an id. Cleaner than threading state up to
  // every child.
  return (
    <section
      ref={sectionRef}
      aria-label="A different approach"
      style={{
        background: S.bgGoldWash,
      }}
    >
      <style>{`
        [data-reveal][data-revealed="true"] {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: `clamp(56px, 7vw, 104px) ${S.sectionPadX} clamp(68px, 7vw, 112px)`,
        boxSizing: 'border-box',
      }}>
        <p data-reveal style={{
          ...revealBase,
          fontFamily: MONO,
          fontSize: 11.5,
          fontWeight: 500,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#e89346',
          marginBottom: 34,
        }}>A Different Approach</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: 72,
          alignItems: 'start',
        }}
          // Tailwind-style fluid override at narrow widths — kept
          // inline by reading window width via a CSS media query in
          // the outer <style> below.
        >
          {/* Main column */}
          <div data-row2-main>
            <h2 data-reveal style={{
              ...revealBase,
              lineHeight: 1.08,
              letterSpacing: '-0.012em',
              marginBottom: 40,
              textWrap: 'pretty',
            }}>
              <span style={{
                display: 'block',
                fontFamily: SANS,
                fontWeight: S.h2Weight,
                fontSize: S.h2Size,
                color: '#143257',
              }}>We don&rsquo;t work on the numbers.</span>
              <span style={{
                display: 'block',
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: S.h2Size,
                color: '#e89346',
                marginTop: '0.05em',
              }}>We work where the numbers come from.</span>
            </h2>

            <div>
              <p data-reveal style={{
                ...revealBase,
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#4a5568',
                marginBottom: '1.25em',
                maxWidth: '34em',
              }}>
                {typo('Every firm in this category gets hired to improve the same metrics: throughput, OEE, downtime, margin. Most work on the numbers themselves. Move the metric, build the deck, present the gains.')}
              </p>

              <p data-reveal style={{
                ...revealBase,
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#4a5568',
                marginBottom: '1.25em',
                maxWidth: '34em',
              }}>
                {typo('The number lifts for a quarter, then drifts back, because nothing underneath the operation actually changed. Supervisors are still firefighting instead of leading. Standards still break down shift to shift. Daily execution is still unstable.')}
              </p>

              <p data-reveal style={{
                ...revealBase,
                fontFamily: SANS,
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.65,
                color: '#4a5568',
                marginBottom: '1.25em',
                maxWidth: '34em',
              }}>
                That&rsquo;s where we work.
              </p>

              <p data-reveal style={{
                ...revealBase,
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#4a5568',
                marginBottom: '1.25em',
                maxWidth: '34em',
              }}>
                {typo('Not in the boardroom or on the dashboard. Where the work actually happens \u2014 on the floor, in the shifts, with the people, inside the standards, the supplier relationships, the AP/AR process. Wherever performance either holds up or breaks down.')}
              </p>

              <p data-reveal style={{
                ...revealBase,
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#4a5568',
                marginBottom: 0,
                maxWidth: '34em',
              }}>
                {typo('That\u2019s what we build \u2014 with your people, inside your operation, in the routines that sustain performance long after we\u2019re gone.')}
              </p>
            </div>
          </div>

          {/* Aside — sticky pull quote in a gold-rule left frame */}
          <aside
            data-reveal
            aria-label="What it sounds like when the foundation is in"
            style={{
              ...revealBase,
              position: 'sticky',
              top: 80,
              padding: '8px 0 8px 28px',
              borderLeft: '2px solid #e89346',
              marginTop: 90,
            }}
          >
            <p style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(20px, 1.6vw, 23px)',
              lineHeight: 1.45,
              color: '#143257',
              textWrap: 'balance',
            }}>
              When the foundation is in place, the operation changes. The line runs. The team works problems before they cascade. <span style={{ color: '#e89346' }}>The radios get quiet.</span>
            </p>
          </aside>
        </div>
      </div>

      {/* Narrow-width responsive override — at <=900px the grid stacks
          and the aside un-sticks. We can't write a media query inline
          on a style object, so we use a scoped <style> block here. */}
      <style>{`
        @media (max-width: 900px) {
          section[aria-label="A different approach"] > div > div {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          section[aria-label="A different approach"] aside {
            position: static !important;
            margin-top: 8px !important;
            padding-left: 22px !important;
          }
        }
      `}</style>
    </section>
  );
}

function HomeV3() {
  useV3Fonts();
  useSubheadReveal();
  return (
    <div style={{ fontFamily: SANS, minHeight: '100vh', background: '#ffffff' }}>
      <style>{`
        [data-subhead-reveal] {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.85s cubic-bezier(0.22, 0.61, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        [data-subhead-reveal] > span {
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        [data-subhead-reveal][data-subhead-in="true"] {
          opacity: 1;
          transform: translateY(0);
        }
        [data-subhead-reveal][data-subhead-in="true"] > span {
          opacity: 1;
          transition-delay: 0.28s;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-subhead-reveal],
          [data-subhead-reveal] > span {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <ReadingProgress />
      <Header />
      <Hero />
      <SectionDifferentApproach />
      {/* Section order matches the v3 copy spine:
            01 — A Different Approach (sits directly under hero)
            02 — Five Disciplines (the foundation, made concrete)
            03 — Pressure In / Performance Out (visual restatement of the thesis)
            04 — How We Work (where the work happens)
            05 — The Proof, at Scale (metric stats)
            06 — Where We Work (industries prose)
            07 — Proven Results (peer evidence)
            08 — Insights (thinking)
            09 — Principle + CTA (redwood beat + closing CTA, paired) */}
      <SectionExpertiseAreas />
      <SectionExecutionEngine />
      <SectionHowWeWork />
      <PowersMetrics />
      <SectionWhereWeWork />
      <SectionResultsEntryPoint />
      <SectionInsightsEntryPoint />
      {/* <SectionThePrinciple /> — archived. The component definition
          remains in this file (search for `function SectionThePrinciple`)
          so it can be re-introduced later if needed. The redwood thesis
          line is being absorbed into the closing CTA copy in a future
          pass per direction. */}
      <FooterCTA />
      <Footer />
      {/* Version indicator */}
      <div style={{
        background: '#0f2a47',
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
