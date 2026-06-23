import React from 'react';
import { Outlet } from 'react-router-dom';
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

  return (
    <>
      <BriefHeader mode="interior" />
      <Outlet />
      <BriefFooter />
    </>
  );
}
