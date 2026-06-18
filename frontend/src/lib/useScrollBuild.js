/* ════════════════════════════════════════════════════════════════════
 *  useScrollBuild — RETIRED (Feb 2026)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Per direction, all text fade/build animations were removed from the
 *  homepage spine. Fade-in didn't read as "building" — it read as
 *  weak/subtle. Until a proper motion language is in (slide-ins from
 *  offscreen, clip-path reveals, character stagger, etc.), the copy
 *  just renders statically.
 *
 *  This hook is preserved as a no-op so existing callers don't need
 *  to be torn out. It still scans for [data-build] descendants and
 *  snaps them to fully visible on mount — that's it. No scroll
 *  listener, no resize listener, no rAF.
 *
 *  The earlier scroll-driven implementation is in git history if it's
 *  ever wanted back.
 * ════════════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
export function useScrollBuild(sectionRef, options = {}) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll('[data-build]');
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.willChange = 'auto';
    });
  }, [sectionRef]);
}
