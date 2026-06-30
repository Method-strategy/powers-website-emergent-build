import { useEffect } from 'react';

/**
 * useHashScroll — when a page mounts (or `location.hash` changes
 * via Cmd-K / external link / paste), scroll the element with the
 * matching id into view, anchored just below the fixed BriefHeader.
 *
 * Optional onMatch callback fires with the resolved slug so
 * consumers can do extra work (e.g. open an accordion item, apply
 * a transient flash class).
 *
 * Replaces three near-identical useEffects in FAQs.jsx,
 * Glossary.jsx, and KPIs.jsx — DRYs the hash deep-link mechanic
 * without changing any user-visible behavior.
 */
export function useHashScroll({
  resolveId = (hash) => hash,
  topOffset = 130,
  onMatch,
} = {}) {
  useEffect(() => {
    const applyHash = () => {
      const hash = (window.location.hash || '').replace(/^#/, '');
      if (!hash) return;
      const id = resolveId(hash);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - topOffset;
        window.scrollTo({ top, behavior: 'smooth' });
        if (onMatch) onMatch(hash);
      });
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
    // Empty deps intentional — listener installed once for the
    // lifetime of the consumer.
  }, []);
}
