/* ════════════════════════════════════════════════════════════════════
 *  useScrollBuild — scroll-progress-driven build/unbuild for typography
 * ════════════════════════════════════════════════════════════════════
 *
 *  Wires editorial copy in a section to the section's scroll progress
 *  through the viewport so the lines "lay in" as the user scrolls down
 *  into the row and "lift out" as they scroll past it.
 *
 *  Behavior:
 *    • Each [data-build] descendant inside the section ref animates on
 *      its own staggered window based on its document-order index.
 *    • As section enters viewport (progress 0 → ~0.3), lines rise
 *      from below in sequence (translateY +14 → 0, opacity 0 → 1).
 *    • Lines hold visible through the middle of the section.
 *    • As section exits viewport (progress ~0.7 → 1), lines lift OUT
 *      the top of the section, same sequence (translateY 0 → -14,
 *      opacity 1 → 0).
 *    • Reverse scroll un-builds → rebuilds → un-builds naturally
 *      because everything is bound to scroll position, not to a clock.
 *      Scrolling fast compresses the animation into the scroll
 *      duration; scrolling slowly stretches it out. The user is
 *      literally driving the construction.
 *
 *  Reduced motion: snaps all targets to fully visible, no scroll
 *  listener attached.
 *
 *  Performance: one global scroll listener per hook call, rAF-
 *  throttled. Three calls (one per top section) ≈ 30 DOM writes per
 *  frame, well within budget.
 *
 *  Element requirements:
 *    • Elements must be display:block or display:inline-block so the
 *      browser honors the translateY transform. (Inline elements
 *      ignore transforms — this is a CSS-spec constraint, not a hook
 *      limitation.)
 * ════════════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';

export function useScrollBuild(sectionRef, options = {}) {
  const {
    /* `stagger` is the section-progress delta between consecutive
       [data-build] elements. 0.03 means line 2 builds ~3% of section
       scroll-distance after line 1. Tighten for snappier, loosen for
       more leisurely. */
    stagger      = 0.03,
    /* `buildAt` is the section-progress at which the FIRST line is
       mid-build (i.e., at opacity 0.5). Lines stagger forward from
       here. Keep low so the build happens as the section enters the
       viewport, not when it's already fully in view. */
    buildAt      = 0.10,
    /* `buildSpread` is how wide (in section-progress) each line's
       build phase is. Narrow = snappy; wide = lazy. */
    buildSpread  = 0.10,
    /* `unbuildAt` is the section-progress at which the FIRST line is
       mid-unbuild. Lines stagger forward from here in the same order
       (top line out first). */
    unbuildAt    = 0.80,
    unbuildSpread = 0.10,
    /* `travel` is how far (px) each line moves vertically. Small
       enough to feel deliberate, not theatrical. */
    travel       = 14,
  } = options;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll('[data-build]'));
    if (!targets.length) return;

    /* Reduced motion — snap all targets visible, no animation. */
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) {
      targets.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    /* Per-target windows. Each line gets a (bs, be, us, ue) tuple
       describing when its build and unbuild phases happen within the
       section's overall progress. */
    const windows = targets.map((el, i) => {
      const off = i * stagger;
      return {
        el,
        bs: buildAt + off - buildSpread / 2,
        be: buildAt + off + buildSpread / 2,
        us: unbuildAt + off - unbuildSpread / 2,
        ue: unbuildAt + off + unbuildSpread / 2,
      };
    });

    let rafPending = false;

    function update() {
      rafPending = false;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      /* progress: 0 = section's top edge just touched the viewport
         bottom (about to enter). 1 = section's bottom edge just
         touched the viewport top (fully exited). */
      const denom = vh + r.height;
      let p = 1 - (r.top + r.height) / denom;
      if (p < 0) p = 0; else if (p > 1) p = 1;

      for (let i = 0; i < windows.length; i++) {
        const w = windows[i];
        let opacity, ty;
        if (p < w.bs) {
          opacity = 0; ty = travel;                          // below, hidden
        } else if (p < w.be) {
          const t = (p - w.bs) / (w.be - w.bs);              // building (rising)
          opacity = t;
          ty = travel * (1 - t);
        } else if (p < w.us) {
          opacity = 1; ty = 0;                               // in place, fully built
        } else if (p < w.ue) {
          const t = (p - w.us) / (w.ue - w.us);              // unbuilding (lifting)
          opacity = 1 - t;
          ty = -travel * t;
        } else {
          opacity = 0; ty = -travel;                         // above, hidden
        }
        w.el.style.opacity = opacity.toFixed(3);
        w.el.style.transform = 'translateY(' + ty.toFixed(2) + 'px)';
      }
    }

    function onScroll() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(update);
    }

    /* Prime the initial state immediately so the page doesn't flash
       with everything fully visible before the first scroll event. */
    update();
    window.addEventListener('scroll',  onScroll, { passive: true });
    window.addEventListener('resize',  onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef, stagger, buildAt, buildSpread, unbuildAt, unbuildSpread, travel]);
}
