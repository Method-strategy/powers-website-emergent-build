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
  return <Outlet />;
}
