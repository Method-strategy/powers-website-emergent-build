import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { HTML_TO_ROUTE, toRoute } from '../lib/routes';

// Intercepts clicks on legacy `<a href="*.html">` links (rendered via
// dangerouslySetInnerHTML on legacy pages) and routes them through React Router.
function useLegacyLinkIntercept() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = (e) => {
      // Already cmd/ctrl-clicked or middle-clicked? Let browser handle it
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      let el = e.target;
      while (el && el !== document.body && el.tagName !== 'A') el = el.parentElement;
      if (!el || el.tagName !== 'A') return;
      const raw = el.getAttribute('href');
      if (!raw) return;
      // External, mailto, tel, hash-only — leave alone
      if (raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      // Pure hash anchor on same page — leave alone
      if (raw.startsWith('#')) return;
      // Only handle .html or known route slugs
      const [bare, hash] = raw.split('#');
      if (!HTML_TO_ROUTE[bare] && !bare.startsWith('/')) return;
      e.preventDefault();
      navigate(toRoute(raw));
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [navigate]);
}

// Scroll to top on route change (default browser behavior in SPA navigation is to stay put)
function useScrollToTopOnNav() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Allow target element to render then scroll
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
        else window.scrollTo({ top: 0 });
      }, 0);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
}

export default function Layout() {
  useLegacyLinkIntercept();
  useScrollToTopOnNav();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // Homepage uses non-fixed header (its hero sits flush behind the header overlay region).
  // All other pages use fixed header with 84px body padding.
  useEffect(() => {
    if (isHome) {
      document.body.classList.remove('pw-has-fixed-header');
    } else {
      document.body.classList.add('pw-has-fixed-header');
    }
    return () => document.body.classList.remove('pw-has-fixed-header');
  }, [isHome]);

  return (
    <>
      <SiteHeader fixed={!isHome} />
      <Outlet />
      <SiteFooter />
    </>
  );
}
