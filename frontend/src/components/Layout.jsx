import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BriefHeader from './BriefHeader';
import BriefFooter from './BriefFooter';
import { useLegacyLinkIntercept, useScrollToTopOnNav } from '../lib/navHooks';

/**
 * Layout — the chrome wrapper for every interior page that has not
 * yet been individually migrated to the brief language.
 *
 * As of Feb 2026 it serves the new BriefHeader + BriefFooter (the
 * "Operating Brief" header/footer from the locked homepage). That
 * means every page rendered inside <Outlet /> — including pages
 * still using LegacyPage (Approach, Discovery Process, etc.),
 * skeleton pages, discipline pages, and bio pages — picks up the
 * new chrome automatically without per-page changes.
 *
 * Pages that have been individually redesigned (History, Careers,
 * Leadership) supply their own BriefHeader inline and so live in
 * the bare HomeLayout group in App.js, NOT inside this Layout.
 *
 * The legacy fixed-header body-class shim (.pw-has-fixed-header)
 * is no longer needed — BriefHeader is always fixed and consuming
 * pages are responsible for their own top spacing via the natural
 * height of their hero section, or padding-top on their main.
 */
export default function Layout() {
  useLegacyLinkIntercept();
  useScrollToTopOnNav();
  const { pathname } = useLocation();

  /* Keyed fader: remounts the route content on every pathname
     change so the CSS animation brief-route-enter (opacity + 6px
     lift) fires fresh each navigation. The BriefHeader + Footer
     stay mounted across navigations — their own gold-rule wipe
     (driven by RouteTransitionRule) handles the chrome's part of
     the transition. */
  return (
    <>
      {/* WCAG 2.4.1 — skip-to-content link is the first focusable
          element. Visually hidden until it receives keyboard focus.
          Anchors to id="main-content" below. */}
      <a href="#main-content" className="brief-skip-link">Skip to main content</a>
      <BriefHeader mode="interior" />
      <main id="main-content" tabIndex={-1}>
        <div key={pathname} className="brief-route-fader">
          <Outlet />
        </div>
      </main>
      <BriefFooter />
    </>
  );
}
