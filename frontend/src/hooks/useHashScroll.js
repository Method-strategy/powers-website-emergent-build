import { useEffect, useRef } from 'react';

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
 *
 * Implementation note: the consumer-supplied callbacks live in a
 * ref so the `hashchange` listener can be attached exactly once,
 * yet always read the latest closure. This sidesteps the
 * exhaustive-deps lint complaint without an eslint-disable and
 * without re-binding the listener on every render.
 */
export function useHashScroll({
  resolveId = (hash) => hash,
  topOffset = 130,
  onMatch,
} = {}) {
  const optsRef = useRef({ resolveId, topOffset, onMatch });
  // Keep the ref current. Cheap; runs after every render.
  optsRef.current = { resolveId, topOffset, onMatch };

  useEffect(() => {
    const applyHash = () => {
      const hash = (window.location.hash || '').replace(/^#/, '');
      if (!hash) return;
      const { resolveId: rid, topOffset: top, onMatch: cb } = optsRef.current;
      const id = rid(hash);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      requestAnimationFrame(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - top;
        window.scrollTo({ top: y, behavior: 'smooth' });
        if (cb) cb(hash);
      });
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);
}
