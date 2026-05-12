import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HTML_TO_ROUTE, toRoute } from './routes';

/**
 * Intercepts clicks on legacy `<a href="*.html">` links rendered via
 * dangerouslySetInnerHTML on LegacyPage modules and routes them through
 * React Router instead of triggering a full page reload.
 */
export function useLegacyLinkIntercept() {
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

/** Scroll to top (or to hash target) after every navigation. */
export function useScrollToTopOnNav() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
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
