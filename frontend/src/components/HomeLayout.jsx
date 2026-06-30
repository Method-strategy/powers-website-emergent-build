import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLegacyLinkIntercept } from '../lib/navHooks';

/**
 * HomeLayout — wraps the homepage route only.
 * The homepage renders its own inline Header + Footer (a custom video-overlay
 * treatment intentionally different from the shared site chrome per CLAUDE.md
 * Hero Spec + Homepage Section Architecture), so we don't decorate it with
 * SiteHeader/SiteFooter. We still want the legacy link intercept here.
 */
export default function HomeLayout() {
  useLegacyLinkIntercept();
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.classList.remove('pw-has-fixed-header');
    window.scrollTo({ top: 0 });
  }, [pathname]);
  /* Keyed wrapper: remounts on every pathname change so the
     CSS animation brief-route-enter (opacity + 6px lift) fires
     fresh each navigation. Layouts/headers stay mounted; only
     the page content under <Outlet /> cross-fades. Pairs with
     the .brief-header gold-rule wipe driven by RouteTransitionRule
     for a single coordinated 700ms page transition. */
  return (
    <>
      {/* WCAG 2.4.1 — skip-to-content link is the first focusable
          element. Visually hidden until it receives keyboard focus,
          then anchors to the page's <main> content (the keyed
          wrapper below has id="main-content"). */}
      <a href="#main-content" className="brief-skip-link">Skip to main content</a>
      <div key={pathname} id="main-content" className="brief-route-fader" tabIndex={-1}>
        <Outlet />
      </div>
    </>
  );
}
