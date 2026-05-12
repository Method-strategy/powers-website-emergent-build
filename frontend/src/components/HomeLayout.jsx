import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HTML_TO_ROUTE, toRoute } from '../lib/routes';

/**
 * HomeLayout — wraps the homepage route only.
 *
 * The homepage renders its own inline Header + Footer (a custom video-overlay
 * treatment that's intentionally different from the shared site chrome per
 * CLAUDE.md "Hero Spec" + "Homepage Section Architecture"), so we don't
 * decorate it with SiteHeader/SiteFooter. We still want the legacy link
 * intercept + scroll-restoration behavior that Layout provides.
 */
function useLegacyLinkIntercept() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      let el = e.target;
      while (el && el !== document.body && el.tagName !== 'A') el = el.parentElement;
      if (!el || el.tagName !== 'A') return;
      const raw = el.getAttribute('href');
      if (!raw) return;
      if (raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('#')) return;
      const [bare] = raw.split('#');
      if (!HTML_TO_ROUTE[bare] && !bare.startsWith('/')) return;
      e.preventDefault();
      navigate(toRoute(raw));
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [navigate]);
}

export default function HomeLayout() {
  useLegacyLinkIntercept();
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.classList.remove('pw-has-fixed-header');
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return <Outlet />;
}
