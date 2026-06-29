import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* ╔══════════════════════════════════════════════════════════════════
   ║  RouteTransitionRule
   ║  ─────────────────────────────────────────────────────────────
   ║  Page-transition signature: a 700ms left-to-right scaleX wipe
   ║  of the gold hairline rule that sits along the bottom edge of
   ║  every .brief-header. Fires on every route change after the
   ║  initial mount. Pure CSS animation — this component only
   ║  toggles the trigger class on <html>.
   ║
   ║  Reinforces the "Operating Brief, chapter by chapter" reading
   ║  metaphor: navigating between disciplines feels like turning
   ║  a page rather than swapping React trees. Subtle enough that
   ║  it never competes with the content; deliberate enough that
   ║  the chrome reads as authored, not just functional.
   ║
   ║  The actual animation + the .brief-header::after rule that
   ║  carries it live in /app/frontend/src/index.css so both the
   ║  homepage's inline header and the shared BriefHeader pick up
   ║  the effect without per-component wiring.
   ║
   ║  Honors prefers-reduced-motion via the CSS guard in index.css.
   ╚══════════════════════════════════════════════════════════════════ */
export default function RouteTransitionRule() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the very first mount — the rule is already at scaleX(1)
    // by default and we don't want an entrance animation on the
    // initial page load (that's the homepage hero's job).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const root = document.documentElement;
    // Re-trigger by forcing class removal + reflow + re-add. Without
    // the reflow the browser collapses the two class toggles and the
    // animation never replays.
    root.classList.remove('brief-route-transitioning');
    // Force a reflow so the browser doesn't collapse the two class
    // toggles into one. Reading offsetWidth flushes pending style.
    void root.offsetWidth;
    root.classList.add('brief-route-transitioning');
    const t = setTimeout(() => {
      root.classList.remove('brief-route-transitioning');
    }, 800);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
