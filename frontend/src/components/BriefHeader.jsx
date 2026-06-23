import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAVY, GOLD, GOLD_BRIGHT, TYPE } from '../lib/briefTokens';

/**
 * BriefHeader — reusable header for every page using the "Operating
 * Brief" design language.
 *
 * Currently used by interior pages (History, Leadership, Careers,
 * etc.). HomeV5 keeps its own inlined version for now because it
 * couples tightly to the homepage's scroll-snap container + past-
 * hero tagline reveal. When HomeV5 is refactored later, it will
 * collapse onto this component with mode="homepage".
 *
 * Props:
 *   mode  — "interior" (default): tagline always visible
 *           "homepage": tagline hidden by default, revealed when a
 *                       parent element gains the class .past-hero
 *                       (the scroll handler on HomeV5 toggles this)
 *
 * Visual treatment matches HomeV5 verbatim:
 *   - Fixed-position navy strip across viewport, 112px desktop /
 *     72px mobile, with a 1px gold rule along the bottom edge.
 *   - POWERS mark on the left + italic running tagline.
 *   - Mega-menu nav (Results / About) with hover-with-timer open
 *     behavior, plus single-link Insights + Let's Talk CTA.
 *   - Mobile: hamburger toggles a right-side slide-in drawer with
 *     nested-collapsible Results > Areas of Expertise.
 *
 * Routing: uses React Router <Link> for in-app routes so navigation
 * never round-trips the page. External links use <a>.
 *
 * Important: this header is position: fixed, so the consuming page
 * must allocate top space for it. The standard pattern (matching
 * HomeV5's .brief-page padding-top: var(--header-h)) is:
 *
 *     <BriefHeader />
 *     <main style={{ paddingTop: 'var(--header-h, 112px)' }}>...
 *
 * Or the consuming page can rely on its hero section to push content
 * below the strip with margin-top.
 */
export default function BriefHeader({ mode = 'interior' }) {
  const [openMega, setOpenMega] = useState(null); // 'results' | 'about' | null
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null); // 'results' | 'about'
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const closeTimer = useRef(null);

  // Hover-with-timer open/close — matches HomeV5 + legacy V4 behavior
  // so users who cross between menu button and panel don't see the
  // panel snap closed before they reach it.
  const openMenu = (which) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMega(which);
  };
  const schedClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMega(null), 160);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  // Close drawer on Esc
  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileNavOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileNavOpen]);

  return (
    <>
      <style>{styles}</style>

      <header className="brief-header" data-mode={mode}>
        <div className="brief-header-inner">
          <div className="brief-header-mark">
            <Link to="/" className="brief-logo" aria-label="POWERS">
              <img src="/uploads/powers-logo-dark.png" alt="POWERS" />
            </Link>
            <span className="brief-header-tagline" aria-hidden="true">
              Stronger Execution. Stronger Performance.
            </span>
          </div>

          <nav
            className="brief-nav"
            data-testid="brief-nav"
            onMouseLeave={schedClose}
            onMouseEnter={cancelClose}
          >
            <button
              type="button"
              className="brief-nav-link"
              data-open={openMega === 'results'}
              data-testid="brief-nav-results"
              onMouseEnter={() => openMenu('results')}
              onClick={() => openMenu(openMega === 'results' ? null : 'results')}
              aria-haspopup="true"
              aria-expanded={openMega === 'results'}
            >Results <span className="caret" aria-hidden="true" /></button>
            <button
              type="button"
              className="brief-nav-link"
              data-open={openMega === 'about'}
              data-testid="brief-nav-about"
              onMouseEnter={() => openMenu('about')}
              onClick={() => openMenu(openMega === 'about' ? null : 'about')}
              aria-haspopup="true"
              aria-expanded={openMega === 'about'}
            >About <span className="caret" aria-hidden="true" /></button>
            <Link
              to="/insights"
              className="brief-nav-link"
              data-testid="brief-nav-insights"
              onMouseEnter={() => setOpenMega(null)}
            >Insights</Link>
            <Link
              to="/contact"
              className="brief-nav-link cta"
              data-testid="brief-nav-cta"
              onMouseEnter={() => setOpenMega(null)}
            >Let&rsquo;s Talk</Link>
          </nav>

          <button
            type="button"
            className="brief-burger"
            data-testid="brief-burger"
            data-open={mobileNavOpen}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(v => !v)}
          >
            <span className="brief-burger-bar" />
            <span className="brief-burger-bar" />
            <span className="brief-burger-bar" />
          </button>
        </div>

        <div
          className="brief-mega-wrap"
          onMouseEnter={cancelClose}
          onMouseLeave={schedClose}
        >
          {/* Results — 2-column */}
          <div className="brief-mega" aria-hidden={openMega !== 'results'}>
            <div
              className="brief-mega-panel"
              data-open={openMega === 'results'}
              data-testid="brief-mega-results"
              style={{ width: 640, display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            >
              <div style={{ padding: '24px 28px 28px', borderRight: '1px solid rgba(232,147,70,0.14)' }}>
                <Link to="/approach"          className="brief-mega-link">Approach</Link>
                <Link to="/discovery-process" className="brief-mega-link">Discovery Process</Link>
                <Link to="/industries-served" className="brief-mega-link">Industries Served</Link>
                <Link to="/case-studies"      className="brief-mega-link">Case Studies</Link>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div className="brief-mega-link brief-mega-parent" aria-hidden="true">Areas of Expertise</div>
                <Link to="/operational-discipline" className="brief-mega-link brief-mega-nested">Operational Discipline</Link>
                <Link to="/frontline-leadership"   className="brief-mega-link brief-mega-nested">Frontline Leadership</Link>
                <Link to="/equipment-reliability"  className="brief-mega-link brief-mega-nested">Equipment Reliability</Link>
                <Link to="/workforce-capability"   className="brief-mega-link brief-mega-nested">Workforce Capability</Link>
                <Link to="/daily-accountability"   className="brief-mega-link brief-mega-nested">Daily Accountability</Link>
              </div>
            </div>
          </div>

          {/* About — single column */}
          <div className="brief-mega" aria-hidden={openMega !== 'about'}>
            <div
              className="brief-mega-panel"
              data-open={openMega === 'about'}
              data-testid="brief-mega-about"
              style={{ width: 260 }}
            >
              <div style={{ padding: '20px 24px 24px' }}>
                <Link to="/history"      className="brief-mega-link">History</Link>
                <Link to="/leadership"   className="brief-mega-link">Leadership</Link>
                <Link to="/company-news" className="brief-mega-link">Company News</Link>
                <Link to="/careers"      className="brief-mega-link">Careers</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="brief-drawer-backdrop"
        data-open={mobileNavOpen}
        aria-hidden={!mobileNavOpen}
        onClick={() => setMobileNavOpen(false)}
      />
      <aside
        className="brief-drawer"
        data-open={mobileNavOpen}
        data-testid="brief-drawer"
        aria-hidden={!mobileNavOpen}
      >
        <div className="brief-drawer-inner">
          <button
            type="button"
            className="brief-drawer-section"
            data-open={mobileExpanded === 'results'}
            data-testid="brief-drawer-results"
            onClick={() => setMobileExpanded(v => v === 'results' ? null : 'results')}
            aria-expanded={mobileExpanded === 'results'}
          >
            Results
            <span className="brief-drawer-caret" aria-hidden="true" />
          </button>
          <div className="brief-drawer-sub" data-open={mobileExpanded === 'results'}>
            <Link to="/approach"               className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Approach</Link>
            <Link to="/discovery-process"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Discovery Process</Link>
            <Link to="/industries-served"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Industries Served</Link>
            <Link to="/case-studies"           className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Case Studies</Link>
            <button
              type="button"
              className="brief-drawer-sublink brief-drawer-subparent"
              data-open={mobileExpertiseOpen}
              onClick={() => setMobileExpertiseOpen(v => !v)}
              aria-expanded={mobileExpertiseOpen}
            >
              Areas of Expertise
              <span className="brief-drawer-caret" aria-hidden="true" />
            </button>
            <div className="brief-drawer-subsub" data-open={mobileExpertiseOpen}>
              <Link to="/operational-discipline" className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Operational Discipline</Link>
              <Link to="/frontline-leadership"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Frontline Leadership</Link>
              <Link to="/equipment-reliability"  className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Equipment Reliability</Link>
              <Link to="/workforce-capability"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Workforce Capability</Link>
              <Link to="/daily-accountability"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Daily Accountability</Link>
            </div>
          </div>

          <button
            type="button"
            className="brief-drawer-section"
            data-open={mobileExpanded === 'about'}
            onClick={() => setMobileExpanded(v => v === 'about' ? null : 'about')}
            aria-expanded={mobileExpanded === 'about'}
          >
            About
            <span className="brief-drawer-caret" aria-hidden="true" />
          </button>
          <div className="brief-drawer-sub" data-open={mobileExpanded === 'about'}>
            <Link to="/history"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>History</Link>
            <Link to="/leadership"   className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Leadership</Link>
            <Link to="/company-news" className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Company News</Link>
            <Link to="/careers"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Careers</Link>
          </div>

          <Link to="/insights"  className="brief-drawer-section"  onClick={() => setMobileNavOpen(false)}>Insights</Link>
          <Link to="/contact"   className="brief-drawer-cta"      onClick={() => setMobileNavOpen(false)}>Let&rsquo;s Talk</Link>
        </div>
      </aside>
    </>
  );
}

const styles = `
  :root { --header-h: 112px; }
  @media (max-width: 900px) {
    :root { --header-h: 72px; }
  }

  /* Disable native pull-to-refresh + horizontal back-swipe (mirrors
     HomeV5 protection). Safe globally — page-level scroll behavior
     is otherwise unchanged. */
  html, body { overscroll-behavior: none; }

  .brief-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    background: ${NAVY};
    border-bottom: 1px solid ${GOLD_BRIGHT};
  }
  .brief-header-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 40px;
    height: var(--header-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }
  .brief-logo img {
    height: 57px;
    width: auto;
    display: block;
  }
  .brief-header-mark {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  /* Interior mode: tagline always visible.
     Homepage mode: tagline hidden by default, revealed when a parent
     gains .past-hero. Achieved via the data-mode attribute on the
     header itself. */
  .brief-header-tagline {
    font-family: ${TYPE.sans};
    font-size: 13px;
    font-weight: 400;
    font-style: italic;
    letter-spacing: 0.01em;
    line-height: 1;
    color: rgba(243, 240, 232, 0.66);
    white-space: nowrap;
    margin-left: 14px;
    pointer-events: none;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 480ms ease-out, transform 480ms ease-out;
  }
  .brief-header[data-mode="homepage"] .brief-header-tagline {
    opacity: 0;
    transform: translateY(4px);
  }
  .brief-page.past-hero .brief-header[data-mode="homepage"] .brief-header-tagline,
  .brief-header[data-mode="homepage"].is-past-hero .brief-header-tagline {
    opacity: 1;
    transform: translateY(0);
  }

  .brief-nav {
    display: flex;
    align-items: center;
    gap: 36px;
  }
  .brief-nav-link {
    font-family: ${TYPE.sans};
    font-size: 14px;
    font-weight: 500;
    color: #f3f0e8;
    background: transparent;
    border: none;
    text-decoration: none;
    letter-spacing: 0.01em;
    opacity: 0.92;
    padding: 6px 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 160ms ease, opacity 160ms ease;
  }
  .brief-nav-link:hover,
  .brief-nav-link[data-open="true"] { color: ${GOLD_BRIGHT}; opacity: 1; }
  .brief-nav-link .caret {
    display: inline-block;
    width: 0; height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid currentColor;
    opacity: 0.7;
    transition: transform 180ms ease;
  }
  .brief-nav-link[data-open="true"] .caret { transform: rotate(180deg); }
  .brief-nav-link.cta {
    border: 1px solid ${GOLD_BRIGHT};
    padding: 10px 18px;
    color: ${GOLD_BRIGHT};
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .brief-nav-link.cta:hover { background: ${GOLD_BRIGHT}; color: ${NAVY}; }

  .brief-burger {
    display: none;
    width: 44px; height: 44px;
    background: transparent; border: none; padding: 0;
    cursor: pointer; position: relative;
  }
  .brief-burger-bar {
    position: absolute; left: 8px; right: 8px;
    height: 2px; background: #f3f0e8; border-radius: 1px;
    transition: transform 220ms cubic-bezier(.6,.2,.2,1),
                opacity 180ms ease,
                top 220ms cubic-bezier(.6,.2,.2,1);
  }
  .brief-burger-bar:nth-child(1) { top: 14px; }
  .brief-burger-bar:nth-child(2) { top: 21px; }
  .brief-burger-bar:nth-child(3) { top: 28px; }
  .brief-burger[data-open="true"] .brief-burger-bar:nth-child(1) { top: 21px; transform: rotate(45deg); }
  .brief-burger[data-open="true"] .brief-burger-bar:nth-child(2) { opacity: 0; }
  .brief-burger[data-open="true"] .brief-burger-bar:nth-child(3) { top: 21px; transform: rotate(-45deg); }

  .brief-drawer-backdrop {
    position: fixed; inset: 0;
    background: rgba(8, 22, 42, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0; pointer-events: none;
    transition: opacity 220ms ease;
    z-index: 300;
  }
  .brief-drawer-backdrop[data-open="true"] { opacity: 1; pointer-events: auto; }
  .brief-drawer {
    position: fixed; top: 0; right: 0;
    width: min(360px, 84vw); height: 100dvh;
    background: ${NAVY};
    border-left: 1px solid rgba(232,147,70, 0.22);
    box-shadow: -16px 0 48px rgba(8, 22, 42, 0.55);
    transform: translateX(100%);
    transition: transform 280ms cubic-bezier(.6,.2,.2,1);
    z-index: 301;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .brief-drawer[data-open="true"] { transform: translateX(0); }
  .brief-drawer-inner {
    padding: 96px 24px 32px;
    display: flex; flex-direction: column;
  }
  .brief-drawer-section {
    font-family: ${TYPE.sans};
    font-size: 18px; font-weight: 600;
    color: #f3f0e8;
    background: transparent; border: none;
    border-bottom: 1px solid rgba(232,147,70, 0.16);
    text-align: left; text-decoration: none;
    padding: 18px 4px;
    letter-spacing: 0.01em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    width: 100%;
  }
  .brief-drawer-section:hover { color: ${GOLD_BRIGHT}; }
  .brief-drawer-caret {
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid currentColor;
    opacity: 0.7;
    transition: transform 200ms ease;
  }
  .brief-drawer-section[aria-expanded="true"] .brief-drawer-caret { transform: rotate(180deg); }
  .brief-drawer-sub {
    max-height: 0; overflow: hidden;
    transition: max-height 280ms cubic-bezier(.6,.2,.2,1);
  }
  .brief-drawer-sub[data-open="true"] { max-height: 720px; }
  .brief-drawer-sublink {
    display: block;
    font-family: ${TYPE.sans};
    font-size: 15px; font-weight: 400;
    color: rgba(243, 240, 232, 0.78);
    text-decoration: none;
    padding: 11px 4px 11px 20px;
    letter-spacing: 0.005em;
  }
  .brief-drawer-sublink:hover { color: ${GOLD_BRIGHT}; }
  .brief-drawer-sublink.brief-drawer-subparent {
    background: transparent; border: none;
    width: 100%; text-align: left; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    font: inherit;
    font-family: ${TYPE.sans};
    font-size: 15px; font-weight: 400;
    color: rgba(243, 240, 232, 0.78);
  }
  .brief-drawer-sublink.brief-drawer-subparent[aria-expanded="true"] .brief-drawer-caret { transform: rotate(180deg); }
  .brief-drawer-subsub {
    max-height: 0; overflow: hidden;
    transition: max-height 280ms cubic-bezier(.6,.2,.2,1);
  }
  .brief-drawer-subsub[data-open="true"] { max-height: 520px; }
  .brief-drawer-sublink.nested {
    padding-left: 36px;
    position: relative;
    font-size: 14px;
    color: rgba(243, 240, 232, 0.66);
  }
  .brief-drawer-sublink.nested::before {
    content: '';
    position: absolute;
    left: 20px; top: 50%;
    width: 8px; height: 1px;
    background: rgba(232,147,70, 0.5);
  }
  .brief-drawer-cta {
    margin-top: 32px;
    display: inline-flex; justify-content: center; align-items: center;
    padding: 16px 24px;
    font-family: ${TYPE.sans};
    font-size: 15px; font-weight: 600;
    color: ${NAVY};
    background: ${GOLD_BRIGHT};
    text-decoration: none;
    letter-spacing: 0.02em;
    border: 1px solid ${GOLD_BRIGHT};
    transition: background 180ms ease;
  }
  .brief-drawer-cta:hover { background: ${GOLD}; }

  .brief-mega-wrap {
    position: relative;
    margin-top: -1px;
  }
  .brief-mega {
    position: absolute; top: 0; left: 0; right: 0;
    display: flex; justify-content: center;
    z-index: 200;
    /* See HomeV5 comment: critical for wheel-to-scroll pass-through. */
    pointer-events: none;
  }
  .brief-mega-panel {
    background: ${NAVY};
    border: 1px solid rgba(232,147,70, 0.14);
    border-top: 1px solid ${GOLD_BRIGHT};
    box-shadow: 0 12px 40px rgba(8, 22, 42, 0.55);
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 180ms ease, transform 180ms ease;
    pointer-events: none;
  }
  .brief-mega-panel[data-open="true"] {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .brief-mega-link {
    display: block;
    font-family: ${TYPE.sans};
    font-size: 14px; font-weight: 500;
    color: #f3f0e8;
    text-decoration: none;
    padding: 9px 0;
    letter-spacing: 0.005em;
    opacity: 0.88;
    transition: color 140ms ease, opacity 140ms ease;
  }
  .brief-mega-link:hover { color: ${GOLD_BRIGHT}; opacity: 1; }
  .brief-mega-link.brief-mega-parent {
    color: rgba(243, 240, 232, 0.55);
    opacity: 1;
    cursor: default;
    margin-bottom: 4px;
  }
  .brief-mega-link.brief-mega-parent:hover { color: rgba(243, 240, 232, 0.55); }
  .brief-mega-link.brief-mega-nested {
    padding-left: 18px;
    position: relative;
  }
  .brief-mega-link.brief-mega-nested::before {
    content: '';
    position: absolute;
    left: 4px; top: 50%;
    width: 6px; height: 1px;
    background: rgba(232,147,70, 0.5);
  }

  @media (max-width: 900px) {
    .brief-logo img { height: 40px; }
    .brief-header-tagline { display: none; }
    .brief-nav { display: none; }
    .brief-burger { display: block; }
  }
`;
