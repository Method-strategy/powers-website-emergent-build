/* ════════════════════════════════════════════════════════════════════
 *  HomeV5 — "The Operating Brief" (2026-06-18, foundation pass v2)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Paradigm pivot from "The Shift" (operator-floor) to "The Operating
 *  Brief" (C-suite). Per direction:
 *   • Dark mode is OUT (client previously rejected). Light dominant
 *     paper background with one navy beat reserved for the pressure
 *     exhibit.
 *   • Voice shifts from shift/operator vocabulary to board-room
 *     vocabulary. Eyebrows were rewritten Feb 2026 from filing-
 *     cabinet section labels ("I/Position", "II/Thesis") to
 *     plainspoken concept titles ("The Foundation", "Performance
 *     Under Pressure", "Our Work Ethic", "The Ledger", "Where We
 *     Work", "Client Success Stories", "Field Notes", "Next Move").
 *   • Header uses NAVY background with the dark-bg POWERS logo. Menu
 *     items match the V4 spec exactly (Results / About / Insights /
 *     Let's Talk) — those are pre-planned pages.
 *
 *  Grammar that stays from "The Shift":
 *   1. No section borders — page reads as one continuous document.
 *   2. Right-rail line (now navy on cream, with gold "earned" fill).
 *   3. Character-assembly H1 (letters fly into place).
 *   4. Clip-path wipe reveals for H2/lede (left-to-right "print on
 *      a standard").
 *   5. Italics ONLY for direct attributable quotes — at most 3 in
 *      the whole document.
 *   6. Gold is a signal color, used sparingly.
 *
 *  V4 lives on at / for the client side-by-side comparison; V5 is
 *  served at /v5 for client review. Routing not changed in this file. */

import React, { useEffect, useRef, useState } from 'react';
import { TYPE } from '../lib/designSpec';

/* ── Palette (this paradigm) ──────────────────────────────────────
 *  PAPER  — bright, near-white with a faint warmth. Lightened
 *           Feb 2026 from #f6f4ee (read as too yellow/beige) so the
 *           paper feel comes from texture, not color.
 *  NAVY   — primary text + the dark beat surface
 *  GOLD   — bright copper accent (unified with V4's gold). Was
 *           split into a muddy #c8821f for indices + a bright
 *           #e89346 for hovers; collapsed to one bright value so
 *           accents in indices, italic pivots, and CTAs all carry
 *           the same temperature.
 *  RULE   — hairline rule color (navy at low alpha) */
const PAPER       = '#fbfaf6';
const PAPER_DEEP  = '#f3f0e8';
const NAVY        = '#0d2442';
const NAVY_DEEP   = '#0a1e36';
const GOLD        = '#e89346';
const GOLD_BRIGHT = '#e89346';
const RULE        = 'rgba(13, 36, 66, 0.16)';
const RULE_SOFT   = 'rgba(13, 36, 66, 0.08)';
const TEXT_BODY   = 'rgba(13, 36, 66, 0.72)';
const TEXT_MUTED  = 'rgba(13, 36, 66, 0.54)';

/* Hero H1 lines — module-level so the array isn't reallocated on
 * every HomeV5 render. The `accent` flag flips that line to the
 * gold .accent class (used for the third "Regardless of conditions."
 * payoff). */
const HERO_LINES = [
  { text: 'Strong execution.',         accent: false },
  { text: 'Strong performance.',       accent: false },
  { text: 'Regardless of conditions.', accent: true },
];

/* Client logo crawl for Beat VI (Where We Work). First-draft brand
 * list provided by the client. Each entry pairs a display name with
 * the domain we hand to logo.dev's free CDN — logos are pulled at
 * runtime, then knocked down to a flat dark-navy silhouette via a
 * CSS grayscale + brightness(0) + opacity filter so all 18 marks
 * read as a single cohesive set rather than a brand-color carnival.
 * Hover restores the original brand color + full opacity. */
const CLIENT_LOGOS = [
  { name: 'Kraft Heinz',  local: '/uploads/client-logos/kraft-heinz.png' },
  { name: 'ADM',          local: '/uploads/client-logos/adm.png' },
  { name: 'Alcoa',        local: '/uploads/client-logos/alcoa.png' },
  { name: 'BAE Systems',  local: '/uploads/client-logos/bae-systems.svg' },
  { name: 'BMW',          local: '/uploads/client-logos/bmw.svg' },
  { name: 'Volkswagen',   local: '/uploads/client-logos/volkswagen.png' },
  { name: 'Corning',      local: '/uploads/client-logos/corning.png' },
  { name: 'Simplot',      local: '/uploads/client-logos/simplot.svg' },
  { name: 'RJ Reynolds',  local: '/uploads/client-logos/rjreynolds.png' },
  { name: 'Cargill',      local: '/uploads/client-logos/cargill.png' },
  { name: 'Mitsubishi',   local: '/uploads/client-logos/mitsubishi.svg' },
  { name: 'Bain Capital', local: '/uploads/client-logos/bain-capital.svg' },
  { name: 'Medline',      local: '/uploads/client-logos/medline.png' },
  { name: 'Blackstone',   local: '/uploads/client-logos/blackstone.png' },
  { name: 'Givaudan',     local: '/uploads/client-logos/givaudan.png' },
  { name: 'KKR',          local: '/uploads/client-logos/kkr.svg' },
  { name: 'Costco',       local: '/uploads/client-logos/costco.png' },
  { name: 'Agropur',      local: '/uploads/client-logos/agropur.svg' },
];
/* logo.dev free public token — fine for prototype + client review.
 * For production, swap each remaining `domain` entry above for a
 * locally-hosted SVG path (like the three `local` entries above) so
 * we own the CDN with no rate-limit risk. */
const LOGO_DEV_TOKEN = 'pk_X-1ZO13GSgeOoUrIuJ6GMQ';
const logoSrc = (l) =>
  l.local
    ? l.local
    : `https://img.logo.dev/${l.domain}?token=${LOGO_DEV_TOKEN}&size=400&format=png&retina=true`;

function HomeV5() {
  const pageRef  = useRef(null);
  const railFill = useRef(null);
  const heroRef  = useRef(null);
  const [mounted, setMounted] = useState(false);
  /* Mega-menu state — mirrors V4's hover-with-timer pattern so the
   * pre-planned menu and submenu structure ports over intact. */
  const [openMega, setOpenMega] = useState(null);
  const closeTimer = useRef(null);
  const openMenu  = (name) => { clearTimeout(closeTimer.current); setOpenMega(name); };
  const schedClose = ()     => { closeTimer.current = setTimeout(() => setOpenMega(null), 140); };
  const cancelClose = ()    => clearTimeout(closeTimer.current);

  /* Mobile drawer state (≤ 900px) — hamburger button toggles a
   * full-height slide-in panel. `mobileExpanded` tracks which of
   * the two nested sections (Results / About) is expanded inside
   * the drawer so the menu doesn't open as a wall of every link
   * at once. Body scroll is locked while the drawer is open. */
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  useEffect(() => {
    if (mobileNavOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileNavOpen]);

  /* Activate scroll-snap by making `.brief-page` itself the scroll
   * container. Previous attempts set scroll-snap-type on <html>,
   * which is spec-compliant but inconsistently honored in real
   * browsers when the page is naturally-scrolling (no explicit
   * overflow). Making .brief-page a fixed-height + overflow:auto
   * container removes all ambiguity — the scroller is unambiguous
   * and scroll-snap engages reliably across Chrome / Safari /
   * Firefox / iOS Safari. */
  useEffect(() => {
    /* The class lives on the page itself; pageRef hasn't mounted
     * yet at the time of this effect's first render, so we add the
     * marker class to <html> as well so the legacy V4/etc routes
     * can still detect we're on V5 if they care. */
    document.documentElement.classList.add('v5-snap');
    return () => document.documentElement.classList.remove('v5-snap');
  }, []);

  /* Hero H1 hammer-strike replay on scroll-up. The .is-mounted
   * class on .brief-page kicks the strike off on first load, but
   * once added it never comes back off — so scrolling away and
   * back to the hero left the chars frozen in their settled state.
   * This IO toggles .is-in on the hero section so the strike
   * replays every time the hero re-enters the viewport. CSS rule
   * (.brief-hero:not(.is-in) .brief-h1 .ch) instantly resets the
   * pre-strike position (no reverse animation) on leave. */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        el.classList.toggle('is-in', e.isIntersecting);
      }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Scroll-bound ambient progress 0→1. Listens to the .brief-page
   * scroll container (not window) — .brief-page is the scroll
   * container now, so window.scrollY never moves. Single rAF loop
   * drives the right-rail fill height + exposes --brief-progress
   * as a CSS variable for any element bound to document position.
   *
   * Per senior dev (Feb 2026): the right rail should NOT begin
   * filling during the hero (Beat 1) — reading the hero is the
   * "cover" of the brief; the spine only earns ink once the
   * argument actually starts at Beat 2 (Thesis). We compute a
   * second progress value (railProgress) that ignores hero scroll
   * entirely and treats Beat 2's top as 0% / document bottom as
   * 100%. The rail element itself is hidden via a body-level class
   * (`past-hero`) so it fades in on Beat 2's entrance and isn't
   * just sitting empty on the hero. */
  useEffect(() => {
    setMounted(true);
    const root = pageRef.current;
    if (!root) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, root.scrollHeight - root.clientHeight);
      const p = Math.max(0, Math.min(1, root.scrollTop / max));
      root.style.setProperty('--brief-progress', p.toFixed(4));
      // Rail progress: the rail is the "spine of the brief." Each
      // beat after the hero is one earned page; advancing into the
      // next beat earns the next chunk of gold. Mapping is discrete-
      // looking at snap points but smooth between them:
      //
      //   • At Beat 2's snap → fill = 1/N   (you're on page 1 of N)
      //   • At Beat 3's snap → fill = 2/N
      //   • At final beat   → fill = N/N = 100%
      //
      // Where N = total beats after the hero (8 today). Computing N
      // dynamically from the live section count so adding a beat
      // doesn't require touching this math.
      //
      // Implementation: get the continuous post-hero progress
      // baseP ∈ [0, 1] (was the prior formula), then remap to
      // [1/N, 1] so Beat 2 already shows a tick of gold instead of
      // sitting at empty. Earlier "0 at Beat 2" formula made Row 2
      // look indistinguishable from "still in hero" — a regression
      // from the rail's narrative purpose. Senior dev caught it.
      const pcs = window.getComputedStyle(root);
      const headerH = parseFloat(pcs.scrollPaddingTop) || 0;
      const hero = heroRef.current;
      const heroDocBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      const railZero = Math.max(0, heroDocBottom - headerH);
      const allSections = root.querySelectorAll(':scope > section');
      const N = Math.max(1, allSections.length - 1); // beats after hero
      const baseP = Math.max(0, Math.min(1, (root.scrollTop - railZero) / Math.max(1, max - railZero)));
      const railP = (1 + baseP * (N - 1)) / N;
      if (railFill.current) railFill.current.style.height = (railP * 100).toFixed(2) + '%';
      // Toggle `past-hero` once the user is essentially on Beat 2.
      // Trigger slightly before the exact snap point (railZero − 1px
      // buffer) so the rail fades up just as Beat 2 enters, not a
      // beat later.
      const past = root.scrollTop >= Math.max(1, railZero - 1);
      root.classList.toggle('past-hero', past);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    root.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // HERO_LINES is module-level (above) so the array doesn't reallocate per render.

  return (
    <div
      ref={pageRef}
      className={`brief-page ${mounted ? 'is-mounted' : ''}`}
      style={{
        background: PAPER,
        color: NAVY,
        fontFamily: TYPE.sans,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        :root { --brief-progress: 0; }

        /* Disable the browser's native pull-to-refresh and the
           horizontal back-swipe gesture on the *root* document. On
           Android Chrome, pull-to-refresh is wired to the root
           scrolling element — and because our actual scroll container
           is .brief-page (an inner element), the browser still treats
           the root as "at top" all the time. Result: every time the
           user scrolled .brief-page back up to its top edge (e.g.
           snapping from Beat 2 back to the Hero), the next downward
           touch gesture would be intercepted by Chrome as a refresh
           pull. Field report from a colleague on a Galaxy S26 Ultra
           (Android 16) confirmed: snap-back triggers reload. Setting
           overscroll-behavior: none on html + body removes the
           gesture entirely. iOS Safari ignores this property for
           rubber-band (which we've already neutralized via fixed
           header + overscroll-behavior: contain on .brief-page), so
           no iOS regression. */
        html, body { overscroll-behavior: none; }

        /* .brief-page IS the scroll container. Fixed height +
         * overflow-y:auto + scroll-snap-type all live here so the
         * browser has zero ambiguity about which element scrolls
         * and where snap applies. Removes the inconsistent
         * real-browser behavior we saw when snap was set on <html>.
         * Header (FIXED to viewport, not inside this container),
         * drawer (fixed), and rail (fixed) all live outside the
         * scroll flow so iOS rubber-band on the scroll container
         * can't drag them. dvh keeps the height accurate when iOS
         * Safari's address bar collapses.
         *
         * --header-h is the single source of truth for the navy
         * header strip. Sections use it to size their min-height
         * to fit cleanly below the fixed header, and scroll-padding-
         * top uses it so scroll-snap aligns sections' tops
         * *visually* below the header (not tucked behind it). On
         * mobile we collapse the header to 72px to recover vertical
         * real estate — 112px ate 13% of an iPhone viewport. */
        .brief-page {
          --header-h: 112px;
          height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          /* Push the start of scrollable content below the fixed
             header. Without this, the hero (first child) would sit
             under the header at scrollTop=0 because position:fixed
             takes the header out of normal flow. */
          padding-top: var(--header-h);
          scroll-snap-type: y mandatory;
          /* scroll-padding-top tells snap "treat this slice of the
             scrollport as obscured by the fixed header" — snap
             alignment for "start" now lands sections at y = header-h,
             not y = 0. Combined with padding-top above, the first
             section snaps cleanly to scrollTop=0 with its content
             starting just under the header. */
          scroll-padding-top: var(--header-h);
          /* Stop Chrome's trackpad rubber-band bounce at the
             top/bottom edges of the scroll container — combined
             with mandatory snap, the bounce produced a visible
             "fight" against the snap pulling content back. Contain
             also prevents the scroll from chaining out to any
             parent scroller (irrelevant here since the body doesn't
             scroll, but cheap insurance). */
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          /* Paper texture — extremely subtle warm vignette on the
             right edge to anchor the rail. NOT a gradient that
             dominates; a faint warm wash that disappears as you
             scroll past the hero. */
          background:
            radial-gradient(900px 600px at 92% 6%,
              rgba(232,147,70, calc(0.06 - var(--brief-progress) * 0.06)) 0%,
              transparent 60%),
            ${PAPER};
        }
        /* Every top-level section snaps to the top of the scroll
           container and is sized to fill the visible area BELOW the
           fixed header. Was min-height: 100dvh (full viewport
           height) — that ignored the header strip, so on sections
           taller than 100dvh the top of the section's content fell
           behind the header on every snap. Subtracting header-h
           keeps tight 1-screen beats centered cleanly within the
           reading area and gives over-tall beats a header-clear
           top edge to snap to. */
        .brief-page > section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          min-height: calc(100dvh - var(--header-h));
          box-sizing: border-box;
        }
        /* Footer is shorter than 100dvh and lives outside the beat
           rhythm — but it still needs to be a snap target, otherwise
           mandatory snap drags the user back to ActionBeat the
           moment they try to scroll past it ("locks so hard you
           can't scroll to the footer"). Aligning to "end" snaps
           footer-bottom to viewport-bottom, which composites the
           tail of the CTA section with the full footer in one frame
           — a clean closing beat without forcing the footer into
           its own 100dvh slot. */
        .brief-page > footer {
          scroll-snap-align: end;
          scroll-snap-stop: always;
        }
        .brief-station {
          align-content: center;
        }

        /* ── Right rail (the spine of the brief) ──────────────────
           Navy hairline with a gold "earned progress" fill. The gold
           grows as the reader advances — the metaphor is that
           reading the brief IS earning the gold.
           Per senior dev (Feb 2026): the rail must NOT show during
           the hero. The hero is the brief's "cover" — the rail's
           visible appearance is the moment the document begins,
           which is Beat 2 (Thesis). We render the rail conditionally
           visible: opacity 0 while .brief-page is in the hero,
           opacity 1 once .brief-page gains the "past-hero" class
           (toggled by the scroll handler when scrollTop > 60% of
           the hero's height). */
        .brief-rail {
          /* Fixed to the viewport so the rail stays anchored to the
             right edge regardless of the .brief-page scroll position.
             Before .brief-page became its own scroll container, the
             rail was position:absolute inside the page body and
             effectively viewport-anchored because the page scrolled
             at the document level. Now that the page scrolls
             internally, absolute positioning would scroll the rail
             UP with the content; fixed keeps it pinned. Top is
             offset by header-h so the rail starts under the fixed
             header bar, not behind it. */
          position: fixed;
          top: var(--header-h, 112px);
          /* Moved 24px closer to viewport edge so there's a real
             gutter between the section content (which ends at the
             station's right-padding line) and the rail itself. The
             previous formula aligned the rail flush with the content
             edge, making lede text feel crowded against the gold
             line. */
          right: max(16px, calc((100% - 1240px) / 2 + 16px));
          width: 1px;
          height: calc(100dvh - var(--header-h, 112px));
          background: ${RULE};
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 320ms ease;
        }
        .brief-page.past-hero .brief-rail { opacity: 1; }
        .brief-rail-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 0%;
          background: ${GOLD};
          box-shadow: 0 0 8px rgba(200, 130, 31, 0.32);
          transition: height 60ms linear;
        }
        .brief-tick {
          position: absolute;
          top: 8vh;
          right: 0;
          width: 28px;
          height: 1px;
          background: ${RULE};
        }

        /* ── Page header strip ────────────────────────────────────
           The cover-meta strip ("Operating Brief 2026 / POWERS /
           Confidential…") was removed Feb 2026 — the publication
           identity moved into the hero section-num as a single
           cleaner mark. Styles deleted here; the responsive override
           below was scoped to that element and is also gone. */

        /* ── Beat: Hero ───────────────────────────────────────────
           Same character-assembly motion as the paradigm prototype.
           Letters fly in along per-character vectors, snap-settle.
           Reads on cream paper with navy text — confident, restrained. */
        .brief-hero {
          position: relative;
          /* min-height now reads from --header-h. Previously was
             hardcoded to 100dvh - 112px - 50px; with the .brief-page
             > section rule now setting min-height to 100dvh -
             header-h, the only thing the hero needs to subtract on
             top of that is the 50px breathing-room nudge that
             keeps "Find out how" off the viewport bottom edge. */
          min-height: calc(100dvh - var(--header-h) - 50px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px max(40px, calc((100% - 1240px) / 2 + 40px));
          box-sizing: border-box;
          overflow: hidden;
        }
        /* Background video — manufacturing / shop-floor montage.
           Pulled from V4's hero. Heavy sepia + saturation + a
           hue-rotate toward gold give it a warm work-ethic tint;
           multiply blend mode stains the cream paper without
           darkening it into mud; low opacity keeps the navy H1
           legible on top. Object-cover so the clip fills any aspect
           ratio without letterboxing. */
        .brief-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
          z-index: 0;
          opacity: 0.22;
          filter: sepia(0.95) saturate(1.55) hue-rotate(-10deg) brightness(1.06) contrast(0.92);
          mix-blend-mode: multiply;
          pointer-events: none;
        }
        /* Cream wash sitting between the video and the H1. Knocks
           the video back another stop and re-anchors the "paper"
           feel — without this, the video can crowd the navy text
           contrast at certain frames. The wash is a subtle radial
           that's most opaque on the left (where the H1 sits) and
           transparent on the right (where the video can read more
           freely). */
        .brief-hero-wash {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(1100px 700px at 20% 50%,
              rgba(251, 250, 246, 0.78) 0%,
              rgba(251, 250, 246, 0.45) 45%,
              rgba(251, 250, 246, 0.18) 80%,
              rgba(251, 250, 246, 0.00) 100%);
        }
        .brief-hero > .brief-h1,
        .brief-hero > .brief-hero-footer {
          position: relative;
          z-index: 2;
        }
        /* Tick keeps its absolute positioning from the base .brief-tick
           rule (top: 8vh, right: 0). Folding it into the position:
           relative block above accidentally downgraded it to a relative
           inline element, which then flowed in at the H1's top-left
           edge as a stray 28px hairline 1px above the H1 — visible as
           the "rogue gray line above Strong execution." Splitting the
           selectors lets us keep z-index lift on the tick without
           clobbering its absolute coords. */
        .brief-hero > .brief-tick {
          z-index: 2;
        }
        @media (prefers-reduced-motion: reduce) {
          .brief-hero-video { animation-play-state: paused; }
        }
        .brief-section-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.30em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 56px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brief-section-num::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: ${GOLD};
        }
        .brief-h1 {
          font-family: ${TYPE.sans};
          font-weight: 800;
          font-size: clamp(48px, 6.2vw, 96px);
          line-height: 1.03;
          letter-spacing: -0.022em;
          margin: 0;
          max-width: 1180px;
          color: ${NAVY};
        }
        .brief-h1 .line {
          display: block;
          /* Was overflow: hidden, which clipped both top AND bottom
             of each line box. At line-height 1.03 + 800-weight sans
             at clamp(48–96px), the line box has no descender room —
             the "g" in "Regardless" was getting sliced at the box
             bottom. We only need to hide the pre-strike position
             (chars are translateY(-22px) above their resting spot),
             so clip the TOP at 0 and extend the BOTTOM 0.5em past
             the box so descenders render fully. */
          clip-path: inset(0 0 -0.5em 0);
        }
        /* Word group — keeps each word's per-character spans on the
           same line. Without this, individual .ch spans (display:
           inline-block) are valid line-break candidates between
           every character, which is why iOS Safari was breaking
           "execution" mid-word at narrow portrait widths. The word
           wrapper is inline-block + nowrap so breaks only happen
           between words at real spaces. */
        .brief-h1 .word {
          display: inline-block;
          white-space: nowrap;
        }
        .brief-h1 .ch {
          display: inline-block;
          white-space: pre;
          /* Hammer-strike entrance (Feb 2026 rev) — replaces the
             soft curl+fade. Each character starts 22px above its
             resting position with zero opacity, then SNAPS down
             with a tight recoil ease (cubic-bezier(.34,1.3,.5,1)
             — the 1.3 second value gives a sub-pixel overshoot at
             landing, reading as a hammer striking and bouncing
             back into place, not a graceful settle). Opacity flips
             on at the start of motion (40ms linear) so the
             character appears WITH the strike, not before it.
             Total per-character motion: 110ms. Per-character delay
             is set inline as 28ms × index, giving a fast typewriter-
             strike cadence rather than the previous wave. */
          opacity: 0;
          transform: translateY(-22px);
          transition: opacity 40ms linear, transform 110ms cubic-bezier(.34, 1.3, .5, 1);
        }
        /* Hero H1 strike state — controlled exclusively by the
           .is-in class on .brief-hero (toggled by an IntersectionObserver
           in HomeV5). Previously the .brief-page.is-mounted class was
           also forcing chars to their settled state — but that class
           is permanent once added on first render, so the strike
           could never replay when scrolling back up to the hero. */
        .brief-hero.is-in .brief-h1 .ch {
          opacity: 1;
          transform: translateY(0);
        }
        /* When the hero leaves the viewport, instantly reset the
           chars to their pre-strike position (no reverse animation).
           When the hero re-enters, the typewriter strike replays. */
        .brief-hero:not(.is-in) .brief-h1 .ch {
          transition: none;
        }
        .brief-h1 .accent { color: ${GOLD}; }

        .brief-hero-footer {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          margin-top: 64px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .brief-hero-footer .rule {
          flex: 1 1 auto;
          height: 1px;
          background: ${RULE_SOFT};
        }

        /* ── Beat 02 (demo) — Position / What we build ────────────
           Two-column. Left: section index + H2. Right: lede + the
           earned italic quote. Reveals via clip-path wipe in a
           cascade as it enters the viewport. */
        .brief-station {
          position: relative;
          /* Symmetric horizontal padding — matches header & footer
             content alignment. At wide viewports (>1240px), content
             area = 1240 - 80 = 1160px, centered. The previous version
             added +40px ONLY to the right side, which made the
             station content area extend 40px wider than the header,
             producing visible misalignment at desktop. */
          padding: 8vh max(40px, calc((100% - 1240px) / 2 + 40px));
          box-sizing: border-box;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
          /* COLUMN-gap only — the previous "gap" shorthand applied
             to row-gap too, injecting a 96px ghost row between every
             stacked item in single-column beats (Thesis, Pressure,
             Evidence, Cards, Action). That ghost stacked on top of
             each item's own marginBottom, producing the blown-out
             "X" gaps. Vertical rhythm now comes from explicit item
             margins only. */
          column-gap: clamp(40px, 6vw, 96px);
          align-items: center;
        }
        .station-divider {
          /* A hairline rule above each station — marks the page
             "section break" in the brief without using a thick line
             or color band. Edges aligned to the symmetric station
             padding so the rule spans the content frame, not the
             whole viewport. */
          position: absolute;
          top: 0;
          left: max(40px, calc((100% - 1240px) / 2 + 40px));
          right: max(40px, calc((100% - 1240px) / 2 + 40px));
          height: 1px;
          background: ${RULE_SOFT};
        }
        .station-index {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.30em;
          text-transform: uppercase;
          color: ${GOLD};
        }
        .station-h2 {
          font-family: ${TYPE.sans};
          font-weight: 800;
          /* Tightened cap Feb 2026 (54 → 48) so the longest sans
             clause on the page ("Operations built on strong
             execution produce" = 44 chars) fits on one line within
             the 1240 station frame at every viewport from 900px up.
             Previously the 54px cap force-wrapped "produce" onto
             its own line above ~1700px viewport. */
          font-size: clamp(30px, 3.4vw, 48px);
          line-height: 1.06;
          letter-spacing: -0.014em;
          color: ${NAVY};
          margin: 18px 0 0;
          text-wrap: pretty;
        }
        /* Serif-italic-gold pivot — the "earned" clause inside each
           H2. Reintroduced Feb 2026 from V4 (this concept's voice
           wants the same sans→italic-gold tonal lift on the
           resolution phrase). Sized to match the sans clause so
           cap height aligns. */
        .station-h2 .pivot {
          display: block;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          color: ${GOLD_BRIGHT};
          letter-spacing: -0.012em;
          margin-top: 0.06em;
        }
        .station-lede {
          font-family: ${TYPE.sans};
          font-weight: 400;
          font-size: 17px;
          line-height: 1.62;
          color: ${TEXT_BODY};
          margin: 0;
          max-width: 580px;
          /* Lets the browser optimize line breaks across the
             paragraph to avoid orphan words at the end of a line
             (e.g. "Not" hanging alone after the previous sentence
             ends mid-line). Falls back gracefully on older browsers. */
          text-wrap: pretty;
        }

        /* Clip-path wipe reveal — left-to-right "print onto a
           standard" pattern. Replaces fade-ins.

           NOTE (Feb 2026, root-cause fix): the previous values were
           inset(0 100% 0 0) → inset(0 0 0 0). The zero top/bottom
           insets clipped **exactly** at the element's content-box
           edges, which sliced descenders off any serif italic (the
           gold .pivot clauses) and any ascenders on tall caps.
           Layout still allocated that descender region, producing a
           ghost gap below the visible text — which is the "big
           vertical space between subhead and lede" the page kept
           showing. Negative top/bottom insets let glyphs render past
           the box edges; horizontal insets continue to drive the
           wipe sweep. */
        .wipe {
          clip-path: inset(-0.4em 100% -0.5em 0);
          transition: clip-path 1000ms cubic-bezier(.2,.7,.2,1);
        }
        .brief-station.is-in .wipe { clip-path: inset(-0.4em 0 -0.5em 0); }
        /* When the section leaves the viewport, INSTANTLY reset the
           wipe (no reverse animation). When it re-enters, the wipe
           plays forward cleanly again. Without this, scrolling up
           through a section produces a backwards "wipe out to the
           left" — readable but odd. */
        .brief-station:not(.is-in) .wipe { transition: none; }
        .brief-station.is-in .wipe-d1 { transition-delay: 120ms; }
        .brief-station.is-in .wipe-d2 { transition-delay: 280ms; }
        .brief-station.is-in .wipe-d3 { transition-delay: 460ms; }

        .brief-quote {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(22px, 2.2vw, 28px);
          line-height: 1.34;
          color: ${NAVY};
          margin: 32px 0 12px;
          max-width: 540px;
        }
        .brief-quote-attr {
          font-family: ${TYPE.mono};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
        }

        /* ── Logo crawl (Beat VI — Where We Work) ─────────────────
           Horizontal infinite-marquee of client wordmarks. Two
           identical rows track left at the same speed; when the
           first reaches translateX(-100%) the second is at 0%, so
           the loop has no visible seam. Hover pauses. Soft fades on
           each edge keep the crawl from "popping" at the viewport
           boundaries. Logos are text wordmarks (not real SVGs) for
           the prototype — the client will provide brand-asset SVGs
           for production; swap each .logo-crawl-item span for an
           <img> at that point. */
        .industries-logos-row {
          margin-top: clamp(40px, 6vh, 80px);
          /* CRITICAL on mobile: this row is a CSS Grid item whose
             child .logo-crawl-track sets width: max-content (the
             full marquee = ~7000px wide). By default a grid item's
             min-width is "auto", which resolves to the min-content
             size of its descendants — that lets the track's massive
             width blow the grid column out past the viewport, and
             since .brief-station's padding is symmetric, the row
             bleeds off the right edge. Setting min-width: 0
             unblocks the grid column from intrinsic sizing so the
             column respects its actual track width, and .logo-crawl's
             overflow:hidden can clip the marquee cleanly. */
          min-width: 0;
        }
        .industries-logos-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 22px;
        }
        .logo-crawl {
          position: relative;
          overflow: hidden;
          padding: 4px 0;
          /* Belt-and-suspenders companion to the min-width:0 fix on
             the parent .industries-logos-row — if anything ever
             reparents the crawl into another grid/flex container,
             this keeps the marquee constrained to its parent's
             actual width instead of expanding to fit the max-content
             track inside. */
          min-width: 0;
        }
        .logo-crawl-track {
          display: flex;
          width: max-content;
        }
        .logo-crawl-row {
          display: flex;
          flex-shrink: 0;
          /* Tightened from clamp(48, 6vw, 96px) — at the new 56px
             logo height + 130px min-width per item, 96px between
             items felt over-spaced. 60px reads as cohesive rhythm. */
          gap: clamp(36px, 4vw, 60px);
          padding-right: clamp(36px, 4vw, 60px);
          animation: logo-crawl-marquee 72s linear infinite;
          will-change: transform;
        }
        .logo-crawl:hover .logo-crawl-row {
          animation-play-state: paused;
        }
        @keyframes logo-crawl-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        .logo-crawl-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 72px;
          /* Reserve a minimum horizontal slot per item so the
             square-aspect logos (Medline, BMW, VW, Corning,
             Mitsubishi) — which would otherwise render at only
             ~56px wide — don't create whitespace "islands" between
             their wider neighbors. The user saw this as a "big gap
             between Bain and Blackstone" when Medline sat between
             them at native square width. Now every item occupies
             at least 130px of layout, centered, producing a more
             uniform marquee rhythm. */
          min-width: 130px;
          flex-shrink: 0;
        }
        /* Real logos pulled from logo.dev's CDN at runtime (or local
           SVG/PNG for the 3 user-provided assets), knocked down to a
           flat dark silhouette so all 18 marks read as a single
           cohesive set. Treatment:
             - mix-blend-mode: multiply — logo.dev returns PNGs with
               white backgrounds; multiply blends those white pixels
               into the cream paper (effectively transparent), while
               colored logo pixels darken. The user-provided ADM and
               RJ Reynolds logos had black backgrounds — those were
               pre-processed to transparent so multiply leaves them
               clean too.
             - grayscale(1) + contrast(1.2) — strips brand color and
               sharpens the silhouette.
             - opacity: 0.55 — knocks the whole set back so the H2
               and lede stay the dominant reads.
           Hover restores the original brand color + full opacity. */
        .logo-crawl-item img {
          height: 56px;
          max-width: 220px;
          width: auto;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: grayscale(1) contrast(1.2);
          opacity: 0.55;
          transition: opacity 220ms ease, filter 220ms ease, transform 220ms ease, mix-blend-mode 220ms ease;
          background: transparent;
        }
        .logo-crawl-item:hover img {
          mix-blend-mode: normal;
          filter: grayscale(0) contrast(1);
          opacity: 1;
          transform: translateY(-1px);
        }
        .logo-crawl-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .logo-crawl-fade-l {
          left: 0;
          background: linear-gradient(to right, ${PAPER} 0%, rgba(251,250,246,0) 100%);
        }
        .logo-crawl-fade-r {
          right: 0;
          background: linear-gradient(to left, ${PAPER} 0%, rgba(251,250,246,0) 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-crawl-row { animation: none; }
        }


        /* ── Header (navy chrome) ─────────────────────────────────
           Navy background with the dark-bg POWERS logo. Menu items +
           submenu structure are LOCKED — match V4 exactly because
           those map to pre-planned pages. */
        .brief-header {
          /* Was position:sticky inside the .brief-page scroll
             container. On iOS Safari, sticky inside an overflow:auto
             container interacts badly with momentum scrolling — the
             header would visibly "rubber band" downward when the
             user flicked at the top of the scrollport because the
             sticky element is still technically inside the scroll
             flow. position:fixed pins the header to the viewport,
             outside the scrollable area entirely, so no amount of
             overscroll on .brief-page can drag it. .brief-page
             padding-top: var(--header-h) ensures content doesn't
             start tucked behind the fixed header. */
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 100;
          background: ${NAVY};
          /* Gold hairline restored Feb 2026 (V5 carryover from V3).
             A single 1px gold rule along the bottom edge of the
             header — same value as the right rail, so the rule
             reads as the *top edge of the brief itself*. The
             earlier removal was a misdiagnosis: the "stray grey
             line above the hero H1" the user reported turned out
             to be the .brief-tick element being demoted from
             position:absolute to position:relative by an over-
             eager selector rollup, not the header rule. With the
             tick fixed at the source, the header rule is back
             in its rightful place and adds the document-grade
             "page break" finish the navy strip needs. */
          border-bottom: 1px solid ${GOLD_BRIGHT};
        }
        .brief-header-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          /* Header chrome height bound to --header-h so changing
             one variable updates the strip, the page padding-top,
             the scroll-padding, the rail offset, and every section's
             min-height in one place. */
          height: var(--header-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .brief-logo img {
          height: 57px;
          width: auto;
          display: block;
        }
        /* Logo + tagline group — flex row that keeps the tagline
           parked tight against the logo no matter how the parent
           .brief-header-inner distributes space. Without this
           wrapper, the inner's justify-content: space-between
           would scatter logo, tagline, and nav into thirds. */
        .brief-header-mark {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        /* ── Header tagline — homepage / desktop / past-hero only ──
           The .brief-header-inner is a flex row: [logo] [nav] [CTA].
           We inject the tagline as a sibling of the logo so it sits
           immediately to its right, baseline-aligned, with a 14px
           gutter — matching the legacy V4 header treatment used on
           every interior page (where the tagline is always-on).
           Here the appearance is *earned*: hidden during the hero
           (4px below resting + opacity 0), gently rises into place
           with a 480ms ease-out when .brief-page gains .past-hero.
           Italic for "voice," small caps tracking turned off — this
           reads as the SITE talking, not a label. Pointer-events
           none so it never intercepts clicks intended for the logo
           or the nav button to its right. */
        .brief-header-tagline {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 400;
          font-style: italic;
          letter-spacing: 0.01em;
          line-height: 1;
          color: rgba(243, 240, 232, 0.66);
          white-space: nowrap;
          margin-left: 14px;
          /* Hidden until past-hero. translateY gives the rise-into-
             place feel; opacity does the actual disclosure. */
          opacity: 0;
          transform: translateY(4px);
          transition:
            opacity 480ms ease-out,
            transform 480ms ease-out;
          pointer-events: none;
        }
        .brief-page.past-hero .brief-header-tagline {
          opacity: 1;
          transform: translateY(0);
        }
        .brief-nav {
          display: flex;
          align-items: center;
          gap: 36px;
        }
        .brief-nav-link {
          font-family: ${TYPE.sans};
          font-size: 14px;
          font-weight: 500;
          color: #f3f0e8;
          background: transparent;
          border: none;
          text-decoration: none;
          letter-spacing: 0.01em;
          opacity: 0.92;
          padding: 6px 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 160ms ease, opacity 160ms ease;
        }
        .brief-nav-link:hover,
        .brief-nav-link[data-open="true"] {
          color: ${GOLD_BRIGHT};
          opacity: 1;
        }
        .brief-nav-link .caret {
          display: inline-block;
          width: 0; height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid currentColor;
          opacity: 0.7;
          transition: transform 180ms ease;
        }
        .brief-nav-link[data-open="true"] .caret { transform: rotate(180deg); }
        .brief-nav-link.cta {
          border: 1px solid ${GOLD_BRIGHT};
          padding: 10px 18px;
          color: ${GOLD_BRIGHT};
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .brief-nav-link.cta:hover {
          background: ${GOLD_BRIGHT};
          color: ${NAVY};
        }

        /* ── Hamburger button (≤ 900px only) ──────────────────────
           Standard 3-line button with morph-to-X on open. Sits where
           the desktop nav lives, swapped via display: none on each
           per the breakpoint below. */
        .brief-burger {
          display: none;
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          position: relative;
        }
        .brief-burger-bar {
          position: absolute;
          left: 8px;
          right: 8px;
          height: 2px;
          background: #f3f0e8;
          border-radius: 1px;
          transition: transform 220ms cubic-bezier(.6,.2,.2,1),
                      opacity 180ms ease,
                      top 220ms cubic-bezier(.6,.2,.2,1);
        }
        .brief-burger-bar:nth-child(1) { top: 14px; }
        .brief-burger-bar:nth-child(2) { top: 21px; }
        .brief-burger-bar:nth-child(3) { top: 28px; }
        .brief-burger[data-open="true"] .brief-burger-bar:nth-child(1) {
          top: 21px;
          transform: rotate(45deg);
        }
        .brief-burger[data-open="true"] .brief-burger-bar:nth-child(2) {
          opacity: 0;
        }
        .brief-burger[data-open="true"] .brief-burger-bar:nth-child(3) {
          top: 21px;
          transform: rotate(-45deg);
        }

        /* ── Mobile drawer ────────────────────────────────────────
           Full-height slide-in panel from the right. Sits ABOVE
           every section in z-index. Backdrop blurs the page behind.
           Drawer interior scrolls independently if its content
           exceeds the viewport. */
        .brief-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 22, 42, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 220ms ease;
          z-index: 300;
        }
        .brief-drawer-backdrop[data-open="true"] {
          opacity: 1;
          pointer-events: auto;
        }
        .brief-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(360px, 84vw);
          height: 100dvh;
          background: ${NAVY};
          border-left: 1px solid rgba(232,147,70, 0.22);
          box-shadow: -16px 0 48px rgba(8, 22, 42, 0.55);
          transform: translateX(100%);
          transition: transform 280ms cubic-bezier(.6,.2,.2,1);
          z-index: 301;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .brief-drawer[data-open="true"] { transform: translateX(0); }
        .brief-drawer-inner {
          padding: 96px 24px 32px;
          display: flex;
          flex-direction: column;
        }
        .brief-drawer-section {
          font-family: ${TYPE.sans};
          font-size: 18px;
          font-weight: 600;
          color: #f3f0e8;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(232,147,70, 0.16);
          text-align: left;
          text-decoration: none;
          padding: 18px 4px;
          letter-spacing: 0.01em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .brief-drawer-section:hover { color: ${GOLD_BRIGHT}; }
        .brief-drawer-caret {
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid currentColor;
          opacity: 0.7;
          transition: transform 200ms ease;
        }
        .brief-drawer-section[aria-expanded="true"] .brief-drawer-caret {
          transform: rotate(180deg);
        }
        .brief-drawer-sub {
          max-height: 0;
          overflow: hidden;
          transition: max-height 280ms cubic-bezier(.6,.2,.2,1);
        }
        .brief-drawer-sub[data-open="true"] {
          max-height: 720px;
        }
        .brief-drawer-sublink {
          display: block;
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 400;
          color: rgba(243, 240, 232, 0.78);
          text-decoration: none;
          padding: 11px 4px 11px 20px;
          letter-spacing: 0.005em;
        }
        .brief-drawer-sublink:hover { color: ${GOLD_BRIGHT}; }
        /* Sub-parent button — "Areas of Expertise" inside Results.
           Same font as the sibling sublinks but rendered as a button
           with a caret (no destination of its own). Tapping expands
           the nested .brief-drawer-subsub group below. */
        .brief-drawer-sublink.brief-drawer-subparent {
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font: inherit;
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 400;
          color: rgba(243, 240, 232, 0.78);
        }
        .brief-drawer-sublink.brief-drawer-subparent[aria-expanded="true"] .brief-drawer-caret {
          transform: rotate(180deg);
        }
        /* Nested sub-sub level: indented one further step + thin
           gold leader to mark the discipline-list relationship. */
        .brief-drawer-subsub {
          max-height: 0;
          overflow: hidden;
          transition: max-height 280ms cubic-bezier(.6,.2,.2,1);
        }
        .brief-drawer-subsub[data-open="true"] {
          max-height: 520px;
        }
        .brief-drawer-sublink.nested {
          padding-left: 36px;
          position: relative;
          font-size: 14px;
          color: rgba(243, 240, 232, 0.66);
        }
        .brief-drawer-sublink.nested::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 50%;
          width: 8px;
          height: 1px;
          background: rgba(232,147,70, 0.5);
        }
        .brief-drawer-sublabel {
          font-family: ${TYPE.mono};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          padding: 16px 4px 6px 20px;
        }
        .brief-drawer-cta {
          margin-top: 32px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 16px 24px;
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 600;
          color: ${NAVY};
          background: ${GOLD_BRIGHT};
          text-decoration: none;
          letter-spacing: 0.02em;
          border: 1px solid ${GOLD_BRIGHT};
          transition: background 180ms ease;
        }
        .brief-drawer-cta:hover { background: ${GOLD}; }

        /* Mega menu panel container — flush below the header.
           Uses opacity + transform for the open/close transition so
           the panel sits at z-index above the page body. */
        .brief-mega-wrap {
          position: relative;
          margin-top: -1px;
        }
        .brief-mega {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 200;
          /* CRITICAL: the wrapper itself must be invisible to the
             pointer. The mega panel inside already handles its own
             pointer-events (none when closed, auto when open), but
             this wrapper — which stretches edge-to-edge under the
             header and takes on the height of its (opacity 0)
             child — was capturing the cursor across roughly the
             top third of the hero. Result: when the user's cursor
             sat over that band, wheel events fired on a
             position:absolute element nested inside the
             position:fixed header, and Chrome's wheel-to-scroll
             routing failed to walk back out to .brief-page (the
             actual scroll container). Scroll would "freeze" until
             the cursor moved low enough to be over the hero proper.
             pointer-events: none here lets the cursor fall through
             to the hero, where wheel events bubble correctly.
             Child .brief-mega-panel re-enables pointer-events: auto
             when [data-open="true"] — CSS allows a child to opt
             back in even when its parent is none, so menu
             interactions are unaffected. */
          pointer-events: none;
        }
        .brief-mega-panel {
          background: ${NAVY};
          border: 1px solid rgba(232,147,70, 0.14);
          border-top: 1px solid ${GOLD_BRIGHT};
          box-shadow: 0 12px 40px rgba(8, 22, 42, 0.55);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 180ms ease, transform 180ms ease;
          pointer-events: none;
        }
        .brief-mega-panel[data-open="true"] {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .brief-mega-link {
          display: block;
          font-family: ${TYPE.sans};
          font-size: 14px;
          font-weight: 500;
          color: #f3f0e8;
          text-decoration: none;
          padding: 9px 0;
          letter-spacing: 0.005em;
          opacity: 0.88;
          transition: color 140ms ease, opacity 140ms ease;
        }
        .brief-mega-link:hover { color: ${GOLD_BRIGHT}; opacity: 1; }
        /* Parent label inside a mega-menu column. Same font as the
           sibling links but no hover, no cursor — it's a category
           heading, not a destination. The 5 nested discipline links
           below it are indented to communicate the parent/child
           relationship visually without using a small-caps label. */
        .brief-mega-link.brief-mega-parent {
          color: rgba(243, 240, 232, 0.55);
          opacity: 1;
          cursor: default;
          margin-bottom: 4px;
        }
        .brief-mega-link.brief-mega-parent:hover { color: rgba(243, 240, 232, 0.55); }
        .brief-mega-link.brief-mega-nested {
          padding-left: 18px;
          position: relative;
        }
        .brief-mega-link.brief-mega-nested::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 50%;
          width: 6px;
          height: 1px;
          background: rgba(232,147,70, 0.5);
        }
        .brief-mega-section-label {
          font-family: ${TYPE.mono};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 8px;
        }

        /* ── Footer ───────────────────────────────────────────── */
        .brief-footer {
          background: ${NAVY_DEEP};
          color: rgba(243, 240, 232, 0.78);
          padding: 56px max(40px, calc((100% - 1240px) / 2));
          font-family: ${TYPE.mono};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-align: center;
          border-top: 1px solid rgba(232,147,70, 0.18);
        }
        .brief-footer-tag {
          display: block;
          margin-top: 8px;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0;
          text-transform: none;
          color: rgba(243, 240, 232, 0.92);
        }

        @media (max-width: 900px) {
          /* Shrink the navy header strip on mobile. 112px ate 13%
             of an iPhone-sized viewport; 72px gives back ~5vh of
             content room and keeps the POWERS mark + hamburger
             centered without compression. --header-h cascades to
             .brief-page padding-top, scroll-padding-top, every
             section's min-height, the rail offset, and rail height
             — single source of truth. */
          .brief-page { --header-h: 72px; }
          .brief-logo img { height: 40px; }
          /* Tagline is desktop-only. No room next to the hamburger
             on a 390px viewport, and the homepage hero already
             delivers the line at full size — mobile readers get
             the message in the hero and don't need the running
             chrome equivalent. */
          .brief-header-tagline { display: none; }
          .brief-station { grid-template-columns: 1fr; column-gap: 24px; }
          .brief-rail { right: 24px; }
          /* Swap desktop nav for hamburger. The mega-menu panels are
             hover/click triggered only from the desktop nav buttons —
             with the nav hidden, the panels become unreachable and
             the drawer becomes the sole navigation surface. */
          .brief-nav { display: none; }
          .brief-burger { display: block; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brief-h1 .ch { opacity: 1; transform: none; transition: none; }
          .wipe { clip-path: inset(-0.4em 0 -0.5em 0); transition: none; }
        }
      `}</style>

      {/* ── Navy header (V4 menu + submenu structure, locked) ────
          Mega menus mirror V4's hover-with-timer behavior so users
          who landed on /v4-locked vs / see identical menu pages and
          identical menu interaction. Only the palette differs (navy
          vs white). */}
      <header className="brief-header">
        <div className="brief-header-inner">
          <div className="brief-header-mark">
            <a href="/" className="brief-logo" aria-label="POWERS">
              <img src="/uploads/powers-logo-dark.png" alt="POWERS" />
            </a>
            {/* Tagline — appears only on the homepage, only on
                desktop, and only after the reader has scrolled past
                the hero. Narrative continuity device: the hero H1
                ("Strong execution. Strong performance.") delivers the
                promise at full size; as the reader moves into the
                brief, that same promise rises into the header as the
                standing site tagline. Doesn't interrupt the hero, but
                becomes the running header for the rest of the read.
                Visibility is gated entirely by the .past-hero class
                that the scroll handler toggles on .brief-page; mobile
                hides the tagline outright (no room next to the
                hamburger on a 390px viewport). aria-hidden so screen
                readers don't repeat the H1 in the chrome. */}
            <span className="brief-header-tagline" aria-hidden="true">
              Strong Execution. Strong Performance.
            </span>
          </div>
          <nav
            className="brief-nav"
            data-testid="brief-nav"
            onMouseLeave={schedClose}
            onMouseEnter={cancelClose}
          >
            <button
              type="button"
              className="brief-nav-link"
              data-open={openMega === 'results'}
              data-testid="brief-nav-results"
              onMouseEnter={() => openMenu('results')}
              onClick={() => openMenu(openMega === 'results' ? null : 'results')}
              aria-haspopup="true"
              aria-expanded={openMega === 'results'}
            >Results <span className="caret" aria-hidden="true" /></button>
            <button
              type="button"
              className="brief-nav-link"
              data-open={openMega === 'about'}
              data-testid="brief-nav-about"
              onMouseEnter={() => openMenu('about')}
              onClick={() => openMenu(openMega === 'about' ? null : 'about')}
              aria-haspopup="true"
              aria-expanded={openMega === 'about'}
            >About <span className="caret" aria-hidden="true" /></button>
            <a
              href="/insights"
              className="brief-nav-link"
              data-testid="brief-nav-insights"
              onMouseEnter={() => setOpenMega(null)}
            >Insights</a>
            <a
              href="/contact"
              className="brief-nav-link cta"
              data-testid="brief-nav-cta"
              onMouseEnter={() => setOpenMega(null)}
            >Let&rsquo;s Talk</a>
          </nav>

          {/* Hamburger toggle — visible only at ≤900px via CSS. */}
          <button
            type="button"
            className="brief-burger"
            data-testid="brief-burger"
            data-open={mobileNavOpen}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(v => !v)}
          >
            <span className="brief-burger-bar" />
            <span className="brief-burger-bar" />
            <span className="brief-burger-bar" />
          </button>
        </div>

        {/* Mega menu panels — flush below the header bar. */}
        <div
          className="brief-mega-wrap"
          onMouseEnter={cancelClose}
          onMouseLeave={schedClose}
        >
          {/* Results — 2-column mega (matches V4 exactly) */}
          <div className="brief-mega" aria-hidden={openMega !== 'results'}>
            <div
              className="brief-mega-panel"
              data-open={openMega === 'results'}
              data-testid="brief-mega-results"
              style={{ width: 640, display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            >
              <div style={{ padding: '24px 28px 28px', borderRight: '1px solid rgba(232,147,70,0.14)' }}>
                <a href="/approach"          className="brief-mega-link">Approach</a>
                <a href="/discovery-process" className="brief-mega-link">Discovery Process</a>
                <a href="/industries-served" className="brief-mega-link">Industries Served</a>
                <a href="/case-studies"      className="brief-mega-link">Case Studies</a>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                {/* Non-clickable parent label, standard menu font.
                    Was uppercase tracked .brief-mega-section-label —
                    that read as a "category" but didn't make the
                    parent/child relationship clear. The 5 discipline
                    links sit indented underneath it as the visual
                    submenu. */}
                <div className="brief-mega-link brief-mega-parent" aria-hidden="true">Areas of Expertise</div>
                <a href="/operational-discipline" className="brief-mega-link brief-mega-nested">Operational Discipline</a>
                <a href="/frontline-leadership"   className="brief-mega-link brief-mega-nested">Frontline Leadership</a>
                <a href="/equipment-reliability"  className="brief-mega-link brief-mega-nested">Equipment Reliability</a>
                <a href="/workforce-capability"   className="brief-mega-link brief-mega-nested">Workforce Capability</a>
                <a href="/daily-accountability"   className="brief-mega-link brief-mega-nested">Daily Accountability</a>
              </div>
            </div>
          </div>

          {/* About — single column (matches V4 exactly) */}
          <div className="brief-mega" aria-hidden={openMega !== 'about'}>
            <div
              className="brief-mega-panel"
              data-open={openMega === 'about'}
              data-testid="brief-mega-about"
              style={{ width: 260 }}
            >
              <div style={{ padding: '20px 24px 24px' }}>
                <a href="/history"      className="brief-mega-link">History</a>
                <a href="/leadership"   className="brief-mega-link">Leadership</a>
                <a href="/company-news" className="brief-mega-link">Company News</a>
                <a href="/careers"      className="brief-mega-link">Careers</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer (≤900px) ───────────────────────────────
          Slides in from the right. Two collapsible sections mirror
          the desktop mega-menus (Results / About), then the standalone
          Insights link, then the Let's Talk CTA pinned at the bottom.
          Closes on any link click + on backdrop click + on Escape
          (handled by the close button). */}
      <div
        className="brief-drawer-backdrop"
        data-open={mobileNavOpen}
        aria-hidden={!mobileNavOpen}
        onClick={() => setMobileNavOpen(false)}
      />
      <aside
        className="brief-drawer"
        data-open={mobileNavOpen}
        data-testid="brief-drawer"
        aria-hidden={!mobileNavOpen}
      >
        <div className="brief-drawer-inner">
          <button
            type="button"
            className="brief-drawer-section"
            data-open={mobileExpanded === 'results'}
            data-testid="brief-drawer-results"
            onClick={() => setMobileExpanded(v => v === 'results' ? null : 'results')}
            aria-expanded={mobileExpanded === 'results'}
          >
            Results
            <span className="brief-drawer-caret" aria-hidden="true" />
          </button>
          <div className="brief-drawer-sub" data-open={mobileExpanded === 'results'}>
            <a href="/approach"               className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Approach</a>
            <a href="/discovery-process"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Discovery Process</a>
            <a href="/industries-served"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Industries Served</a>
            <a href="/case-studies"           className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Case Studies</a>
            {/* Areas of Expertise — nested sub-expansion. Tapping
                toggles the 5 discipline links beneath it. Styled
                like the other Results items (standard menu font)
                with its own caret. */}
            <button
              type="button"
              className="brief-drawer-sublink brief-drawer-subparent"
              data-open={mobileExpertiseOpen}
              data-testid="brief-drawer-expertise"
              onClick={() => setMobileExpertiseOpen(v => !v)}
              aria-expanded={mobileExpertiseOpen}
            >
              Areas of Expertise
              <span className="brief-drawer-caret" aria-hidden="true" />
            </button>
            <div className="brief-drawer-subsub" data-open={mobileExpertiseOpen}>
              <a href="/operational-discipline" className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Operational Discipline</a>
              <a href="/frontline-leadership"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Frontline Leadership</a>
              <a href="/equipment-reliability"  className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Equipment Reliability</a>
              <a href="/workforce-capability"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Workforce Capability</a>
              <a href="/daily-accountability"   className="brief-drawer-sublink nested" onClick={() => setMobileNavOpen(false)}>Daily Accountability</a>
            </div>
          </div>

          <button
            type="button"
            className="brief-drawer-section"
            data-open={mobileExpanded === 'about'}
            data-testid="brief-drawer-about"
            onClick={() => setMobileExpanded(v => v === 'about' ? null : 'about')}
            aria-expanded={mobileExpanded === 'about'}
          >
            About
            <span className="brief-drawer-caret" aria-hidden="true" />
          </button>
          <div className="brief-drawer-sub" data-open={mobileExpanded === 'about'}>
            <a href="/history"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>History</a>
            <a href="/leadership"   className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Leadership</a>
            <a href="/company-news" className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Company News</a>
            <a href="/careers"      className="brief-drawer-sublink" onClick={() => setMobileNavOpen(false)}>Careers</a>
          </div>

          <a
            href="/insights"
            className="brief-drawer-section"
            data-testid="brief-drawer-insights"
            onClick={() => setMobileNavOpen(false)}
          >Insights</a>

          <a
            href="/contact"
            className="brief-drawer-cta"
            data-testid="brief-drawer-cta"
            onClick={() => setMobileNavOpen(false)}
          >Let&rsquo;s Talk</a>
        </div>
      </aside>

      {/* ── Right-rail spine ───────────────────────────────────── */}
      <div className="brief-rail" aria-hidden="true">
        <div className="brief-rail-fill" ref={railFill} />
      </div>

      {/* ── Beat 01 — Position ─────────────────────────────────── */}
      <section className="brief-hero" ref={heroRef}>
        {/* Hero-only background video. Acts as the visual "audience
            line" now that the explicit text eyebrow ("For the
            operator accountable for the number") was removed — the
            manufacturing/shop-floor montage tells the reader, at a
            glance, who this brief is for. Heavily sepia-toned and
            multiplied into the cream paper at low opacity so it
            reads as a warm work-ethic wash, not a marketing reel.
            Paused under prefers-reduced-motion. */}
        <video
          className="brief-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/uploads/powers-hero-bg-poster.jpg"
          aria-hidden="true"
          data-testid="brief-hero-video"
        >
          {/* 2.1MB H.264 1280×720 encode of the V4 hero (was 21MB
              1920×1080@10Mbps — overkill behind a 22%-opacity sepia
              multiply wash). Source clip is a manufacturing/shop-
              floor montage with dissolves. The poster JPG (95KB)
              renders instantly so the hero never shows as blank
              while the video buffers. */}
          <source src="/uploads/powers-hero-bg.mp4" type="video/mp4" />
        </video>
        <span className="brief-hero-wash" aria-hidden="true" />
        <span className="brief-tick" style={{ top: '52%' }} aria-hidden="true" />
        <h1 className="brief-h1" data-testid="hero-h1">
          {HERO_LINES.map((line, li) => {
            /* Render chars grouped by word. Each word is its own
             * inline-block + nowrap wrapper so chars inside a word
             * can never line-break. Real space characters sit
             * BETWEEN word wrappers as direct children of the line —
             * they remain valid line-break opportunities for the
             * browser. The running `ci` counter still ticks through
             * spaces (without rendering them as .ch spans) so the
             * 28ms-per-char typewriter cadence stays identical to
             * the original. */
            const words = line.text.split(' ');
            let ci = 0;
            return (
              <span className="line" key={li}>
                {words.map((word, wi) => {
                  if (wi > 0) ci += 1;
                  const wordSpans = Array.from(word).map((c) => {
                    const delay = (li * 320) + (ci * 28);
                    ci += 1;
                    return (
                      <span
                        key={ci}
                        className={`ch${line.accent ? ' accent' : ''}`}
                        style={{ transitionDelay: delay + 'ms' }}
                      >{c}</span>
                    );
                  });
                  return (
                    <React.Fragment key={wi}>
                      {wi > 0 && ' '}
                      <span className="word">{wordSpans}</span>
                    </React.Fragment>
                  );
                })}
              </span>
            );
          })}
        </h1>
        <div className="brief-hero-footer">
          {/* The audience line. Was "For the operator accountable for
              the number" → updated to a forward-leaning CTA-style
              hook. "Scroll to read" was removed; the document
              builds itself as the reader advances. */}
          <span>Find out how</span>
          <span className="rule" />
        </div>
      </section>

      {/* ── Beat II — Thesis ─────────────────────────────────────
          Headline + lede + earned italic quote, then the FIVE
          DISCIPLINE CARDS as the jump-off points to their dedicated
          pages. Locked content per direction — copy + URLs match
          V4 exactly. */}
      <ThesisBeat />

      {/* ── Beat III — Pressure (the dramatic dark spread) ───────
          The single navy beat. Reserved for the moment in the
          document where the argument has to land with weight: the
          conditions under which most operations break, and what
          built-in discipline does about that. Everything else is
          paper; this is the one moment of dark. */}
      <PressureBeat />

      {/* ── Beat IV — Mechanism ─────────────────────────────────── */}
      <Station
        index="Our Work Ethic"
        headline="We work where value gets"
        pivot="won or lost."
        body="Most consulting firms diagnose, recommend, and leave. They’re out the door at 3pm and don’t work Fridays. The slide decks are sharp. The results don’t last. Our approach is very different. We build the disciplines where the work actually happens and value is created. On the floor. In the shifts. Inside the standards, the supplier relationships, the AP/AR process. We put skin in the game — paid on results, not recommendations."
        quote="If you’re working, we’re working."
        attr="The POWERS guiding principle"
      />

      {/* ── Beat V — Evidence (metrics) ─────────────────────────── */}
      <EvidenceBeat />

      {/* ── Beat VI — Industries ────────────────────────────────── */}
      <IndustriesBeat />

      {/* ── Beat VII — Results (case study entry point) ─────────── */}
      <CardsBeat
        index="Client Success Stories"
        headline="Building a strong execution capability"
        pivot="produces results that speak for themselves."
        body="Different operations. Different pressures. The same five disciplines underneath. The successes below are what that execution looks like in operations like yours."
        cards={[
          { kind: 'Case study', title: 'Defense & aerospace OTD lift', meta: '$2.4B platform · 18 mo' },
          { kind: 'Case study', title: 'Food & beverage labor productivity', meta: 'PE-backed multi-site · 9 mo' },
          { kind: 'Case study', title: 'Metals throughput recovery', meta: '$700M operator · 12 mo' },
        ]}
        cta={{ label: 'See all case studies', href: '/case-studies' }}
      />

      {/* ── Beat VIII — Insights (blog entry point) ─────────────── */}
      <CardsBeat
        index="Field Notes"
        headline="Dig deeper into the"
        pivot="discipline of execution."
        body="Nearly thirty years of helping build some of the top-performing operations on the planet. Read how we install the five disciplines and produce sustainable, scalable financial gains."
        cards={[
          { kind: 'Field note',  title: 'Why standards drift the moment the consultant leaves', meta: '6 min read' },
          { kind: 'Field note',  title: 'The third-shift maintenance gap nobody is measuring',  meta: '8 min read' },
          { kind: 'Field note',  title: 'Why pay-for-results changes which problems get solved', meta: '7 min read' },
        ]}
        cta={{ label: 'Visit the Insights Hub', href: '/insights' }}
      />

      {/* ── Beat IX — Action (closing CTA) ─────────────────────── */}
      <ActionBeat />

      {/* ── V4 Footer (locked — replicated exactly) ─────────────── */}
      <SiteFooter />
    </div>
  );
}

/* ── V4 Footer (locked structure) ────────────────────────────────
 * Replicated verbatim from V4's <Footer /> so the home grid +
 * legal bar + brand block + 3 link columns + contact column are
 * identical to /v4-locked. Only thing that differs is which page
 * embeds it. Menu items, copy, and link targets are all locked. */
function SiteFooter() {
  return (
    <footer style={{ background: '#0f2a47', fontFamily: TYPE.sans, borderTop: '1px solid #e89346' }}>
      <style>{`
        .v5-footer-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 72px 48px 64px;
          display: grid;
          gap: 56px 32px;
          grid-template-columns: minmax(340px, 1.7fr) repeat(3, minmax(140px, 1fr));
          box-sizing: border-box;
        }
        @media (max-width: 980px) {
          .v5-footer-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 48px 32px;
          }
        }
        @media (max-width: 560px) {
          .v5-footer-grid {
            grid-template-columns: 1fr;
            gap: 40px 0;
            padding: 56px 24px 48px;
          }
        }
        .v5-foot-link {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.70);
          text-decoration: none;
          padding: 4px 0;
          display: block;
          transition: color 140ms ease;
        }
        .v5-foot-link:hover { color: ${GOLD_BRIGHT}; }
        .v5-foot-head {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
      `}</style>

      <div className="v5-footer-grid">
        {/* Col 1: Brand */}
        <div style={{ maxWidth: 380 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img
              src="/uploads/powers-logo-dark.png"
              alt="POWERS"
              style={{ width: 140, height: 'auto', display: 'block', marginBottom: 16 }}
            />
          </a>
          <div style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.10em',
            color: GOLD_BRIGHT, marginBottom: 14,
          }}>
            <span style={{ whiteSpace: 'nowrap' }}>Strong Execution.</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>Strong Performance.</span>
          </div>
          <p style={{
            fontSize: 13, fontWeight: 300, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.60)', margin: 0,
            textWrap: 'pretty',
          }}>
            Operations performance consulting that builds execution capability across teams, shifts, sites, and holdings.
          </p>
        </div>

        {/* Col 2: Results */}
        <div>
          <div className="v5-foot-head">Results</div>
          <a className="v5-foot-link" href="/approach">Approach</a>
          <a className="v5-foot-link" href="/discovery-process">Discovery Process</a>
          <a className="v5-foot-link" href="/operational-readiness">Expertise Areas</a>
          <a className="v5-foot-link" href="/industries-served">Industries Served</a>
          <a className="v5-foot-link" href="/case-studies">Case Studies</a>
        </div>

        {/* Col 3: About */}
        <div>
          <div className="v5-foot-head">About</div>
          <a className="v5-foot-link" href="/history">History</a>
          <a className="v5-foot-link" href="/leadership">Leadership</a>
          <a className="v5-foot-link" href="/company-news">Company News</a>
          <a className="v5-foot-link" href="/careers">Careers</a>
        </div>

        {/* Col 4: Let's Talk */}
        <div>
          <div className="v5-foot-head">Let&rsquo;s Talk</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <a className="v5-foot-link" href="tel:+16789714711">+1 678-971-4711</a>
            <a className="v5-foot-link" href="mailto:info@thepowerscompany.com">info@thepowerscompany.com</a>
            <div style={{
              fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)',
              padding: '4px 0', lineHeight: 1.5,
            }}>
              1801 Peachtree St NE, Suite 200<br />Atlanta, GA 30309
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '0 48px 40px',
      }}>
        <div style={{ height: 1, background: 'rgba(232,147,70,0.20)', marginBottom: 20 }} />
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', gap: '6px 12px',
        }}>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)' }}>
            Copyright 2026 The POWERS Company, Inc. All Rights Reserved.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <a className="v5-foot-link" href="/sitemap" style={{ fontSize: 11, padding: 0 }}>Sitemap</a>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <a className="v5-foot-link" href="/privacy" style={{ fontSize: 11, padding: 0 }}>Privacy Policy</a>
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 11 }}>|</span>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.40)' }}>
            Powered by <a className="v5-foot-link" href="https://methodmarketing.com" style={{ fontSize: 11, padding: 0, display: 'inline' }}>Method Marketing</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── Pressures + Outcomes (Beat III ambient swarm) ───────────────
 * Two independent particle fields split into LEFT and RIGHT
 * hemispheres of the navy "Performance Under Pressure" beat.
 *
 *   LEFT  — red pressures rain straight down, then SHATTER at a
 *           shared baseline ~56vh from section top (opacity collapse
 *           + scaleY crush + letter-spacing widen-out). Reads as the
 *           operating pressures hitting the disciplines and breaking.
 *   RIGHT — green outcomes EMERGE from the exact same baseline and
 *           rise straight up, untouched, fading near the top. Reads
 *           as outcomes compounding above the same horizon.
 *
 * Implementation notes:
 *   - Positions are STRATIFIED across each hemisphere (one slot per
 *     phrase + small intra-slot jitter) so coverage is uniform, not
 *     clustered.
 *   - Greens are anchored by the RIGHT edge (`right: Xvw` instead of
 *     `left:`) so long phrases like "+34% labor productivity" extend
 *     leftward into their band without overflowing the viewport.
 *   - Speed contrast carries the narrative: reds 9–14s (urgent),
 *     greens 22–32s (patient/compounding).
 *   - Each phrase trails a directional border-triangle (red ▾ left,
 *     green ▴ right) — drawn via CSS borders so the rendering is
 *     identical across fonts (the mono face was substituting the
 *     unicode glyphs with missing-glyph asterisks). */
const FALLING_PRESSURES = [
  'Demand spike', 'Leadership change', 'PE timeline', 'New site online',
  'Labor shortage', 'Supply disruption', 'Margin compression',
  'Equipment failure', 'Working-capital crunch', 'Customer escalation',
  'Raw-material spike', 'Integration deadline',
];
const RISING_OUTCOMES = [
  '+22% throughput', '+34% labor productivity', '+18% margin', '96% OTD',
  '−41% scrap', '5-week ROI', '+28% safety', '1.8× uptime',
  '2.4× inventory turn', '$3.2M WC freed', '$14M run-rate', '+12% yield',
];

function PressureSwarm() {
  const swarm = React.useMemo(() => {
    const seeded = (i) => {
      const x = Math.sin(i * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };
    /* HEMISPHERE SPLIT + STRATIFIED POSITIONS (Feb 2026 rev):
     *   - Red pressures: LEFT hemisphere only, anchored by LEFT
     *     edge of the word. X range 4–38vw — kept under 38 so the
     *     longest phrase ("Working-capital crunch") doesn't bleed
     *     across the centerline.
     *   - Green outcomes: RIGHT hemisphere only, anchored by RIGHT
     *     edge of the word (CSS `right:` instead of `left:`). X
     *     range 62–96vw measured from the LEFT viewport edge — kept
     *     above 62 so long phrases extend leftward without crossing
     *     center.
     *
     *   Previously: pure-random seeded X distribution produced
     *   visible clustering on the green side. Switched to
     *   STRATIFIED sampling — each phrase gets its own slot in the
     *   band, with a small intra-slot jitter — so coverage is
     *   guaranteed even across both hemispheres.
     *
     * COMMON BASELINE:
     *   - Reds fall and SHATTER at ~56vh from section top.
     *   - Greens EMERGE from exactly the same line and rise to the
     *     top — same scar in the page, two opposite directions.
     *
     * SPEED CONTRAST:
     *   - Reds: 9–14s. Loud, urgent, plural.
     *   - Greens: 22–32s. Patient, steady, compounding.
     */
    const STRAT = (slot, n, lo, hi, jitterSeed) => {
      const slotW = (hi - lo) / n;
      const jitter = (seeded(jitterSeed) - 0.5) * slotW * 0.55;
      return lo + slotW * (slot + 0.5) + jitter;
    };
    const buildFall = (words) => words.map((w, i) => {
      const r2 = seeded(i + 117);
      const r3 = seeded(i + 217);
      const x = STRAT(i, words.length, 4, 38, i + 9100);   // left hemisphere
      const duration = 9 + r2 * 5;
      const delay = -(r3 * 18);
      return { word: w, x, duration, delay };
    });
    const buildRise = (words) => words.map((w, i) => {
      const r2 = seeded(i + 5103);
      const r3 = seeded(i + 5203);
      // For RIGHT-anchored greens, x is the offset from the RIGHT
      // viewport edge. Distributing 4–38 here puts word right-edges
      // between 62vw and 96vw measured from the left.
      const x = STRAT(i, words.length, 4, 38, i + 9200);
      const duration = 22 + r2 * 10;
      const delay = -(r3 * 36);
      return { word: w, x, duration, delay };
    });
    return {
      falling: buildFall(FALLING_PRESSURES),
      rising:  buildRise(RISING_OUTCOMES),
    };
  }, []);
  return (
    <div className="ps-swarm" aria-hidden="true">
      <style>{`
        .ps-swarm {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .ps-p {
          position: absolute;
          font-family: ${TYPE.mono};
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
          will-change: transform, opacity, letter-spacing;
          opacity: 0;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          transform-origin: center center;
        }
        /* Trailing triangle: red ▾ on falling pressures, green ▴ on
           rising outcomes. Reinforces the directionality of each
           hemisphere at a glance — left is downward force, right is
           upward lift. Implemented as a CSS border triangle (not a
           unicode glyph) — the mono font we use was substituting the
           ▾/▴ codepoints with the missing-glyph asterisk. Border
           triangles render identically across every font and OS. */
        .ps-arrow {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 0.55em;
          vertical-align: 1px;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
        }
        .ps-p.fall .ps-arrow {
          /* Downward red triangle — points toward the baseline. */
          border-top: 5px solid rgba(224, 101, 79, 0.62);
        }
        .ps-p.rise .ps-arrow {
          /* Upward green triangle — points away from the baseline,
             toward the top (the compounding direction). */
          border-bottom: 5px solid rgba(91, 191, 115, 0.62);
        }
        /* Red pressure: rains straight down, shatters at baseline. */
        .ps-p.fall {
          top: -32px;
          color: rgba(224, 101, 79, 0.62);
          animation-name: ps-fall;
        }
        /* Green outcome: EMERGES at the baseline (~56vh — the same
           line where reds shatter), rises straight up, fades out
           near the top. The shared horizon is the disciplines. */
        .ps-p.rise {
          top: 56vh;
          color: rgba(91, 191, 115, 0.62);
          animation-name: ps-rise;
          animation-timing-function: cubic-bezier(.5,.0,.5,1);
        }
        @keyframes ps-fall {
          0%   { transform: translateY(0) scaleY(1);         opacity: 0;    letter-spacing: 0.18em; }
          8%   { opacity: 0.62; }
          /* Travel down to baseline, intact. */
          76%  { transform: translateY(54vh) scaleY(1);      opacity: 0.62; letter-spacing: 0.18em; }
          /* First shatter beat — letter-spacing starts to spread,
             opacity dips, the word stretches just enough to register
             as 'breaking'. */
          86%  { transform: translateY(56vh) scaleY(0.85);   opacity: 0.45; letter-spacing: 0.46em; }
          /* Full disintegration: letters fly apart laterally,
             vertical scale crushes to nothing, opacity to zero. */
          100% { transform: translateY(58vh) scaleY(0.30);   opacity: 0;    letter-spacing: 0.95em; }
        }
        @keyframes ps-rise {
          /* Emerges AT the baseline (translateY 0 from top: 56vh),
             rises upward, fades near the top of the section. */
          0%   { transform: translateY(0);          opacity: 0; }
          14%  { opacity: 0.62; }
          88%  { transform: translateY(-52vh);      opacity: 0.62; }
          100% { transform: translateY(-58vh);      opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-p { animation: none; opacity: 0.30; }
          .ps-p.fall { top: 18%; }
          .ps-p.rise { top: 56vh; }
        }
      `}</style>
      {swarm.falling.map((p, i) => (
        <span
          key={'f' + i}
          className="ps-p fall"
          style={{
            left: p.x + 'vw',
            animationDuration: p.duration.toFixed(2) + 's',
            animationDelay: p.delay.toFixed(2) + 's',
          }}
        >{p.word}<span className="ps-arrow" aria-hidden="true" /></span>
      ))}
      {swarm.rising.map((p, i) => (
        <span
          key={'r' + i}
          className="ps-p rise"
          style={{
            right: p.x + 'vw',
            animationDuration: p.duration.toFixed(2) + 's',
            animationDelay: p.delay.toFixed(2) + 's',
          }}
        >{p.word}<span className="ps-arrow" aria-hidden="true" /></span>
      ))}
    </div>
  );
}

function PressureBeat() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { el.classList.toggle('is-in', e.isIntersecting); }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="brief-station" style={{
      background: NAVY_DEEP,
      color: '#f3f0e8',
      gridTemplateColumns: '1fr',
      borderTop: '1px solid rgba(232,147,70, 0.22)',
      borderBottom: '1px solid rgba(232,147,70, 0.22)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <PressureSwarm />
      <span className="brief-tick" style={{ background: 'rgba(232,147,70,0.32)', zIndex: 2 }} aria-hidden="true" />
      <div style={{ marginBottom: 18, position: 'relative', zIndex: 2 }}>
        <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>Performance Under Pressure</div>
        <h2 className="station-h2 wipe wipe-d1" style={{ color: '#f3f0e8' }}>
          <span>When execution is built on these disciplines,</span>
          <span className="pivot" style={{ color: GOLD_BRIGHT }}>performance is not at the mercy of conditions.</span>
        </h2>
      </div>
      <div className="wipe wipe-d2" style={{ maxWidth: 720, position: 'relative', zIndex: 2 }}>
        <p className="station-lede" style={{ color: 'rgba(243,240,232,0.78)', maxWidth: 720 }}>
          Market pressures don&rsquo;t stop. The question isn&rsquo;t whether you can get better. It&rsquo;s whether what you built stays built when demand spikes, leadership changes, a new site comes online, or a PE timeline compresses. Operations built with these five core disciplines as their foundation hold position, recover faster, and compound gains regardless.
        </p>
      </div>
      {/* Closing kicker lives OUTSIDE the 720px lede wrapper so it can
          breathe to its own wider 1040px measure. Was previously nested
          inside .wipe.wipe-d2 (maxWidth: 720), which clipped the line
          and forced "Quarter after quarter." to wrap on desktop even
          though the subhead above it is much wider. */}
      <p className="station-lede wipe wipe-d3" style={{
        marginTop: 18, color: '#f3f0e8', fontWeight: 600, fontSize: 'clamp(18px, 1.4vw, 22px)',
        maxWidth: 1040, textWrap: 'pretty', position: 'relative', zIndex: 2,
      }}>
        Greater margins. Stronger performance. Better results. Quarter after quarter.
      </p>
    </section>
  );
}

/* ── Beat V: Evidence (5-stat ledger with count-up) ────────────── */
function EvidenceBeat() {
  const ref = useRef(null);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        el.classList.toggle('is-in', e.isIntersecting);
        /* Reset on leave so the stat-number count-up replays each
         * time the section is scrolled back into view. */
        setAnimating(e.isIntersecting);
      }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const STATS = [
    /* $1B+ counts up through real millions ($600M → $700M → $800M
       → $900M → $1B+) and only swaps the M-denominated string for
       the brand "$1B+" string at the final frame. Target is 1000
       (millions), so the rAF tick has 1000 integer steps of
       visible resolution instead of the previous 0→1 (which only
       ever rendered two frames). Duration bumped to 1800ms to let
       the eye actually catch the count happening. */
    { target: 1000, duration: 1800, label: 'Annualized savings produced across all engagements',
      format: (v, t) => (v >= t ? '$1B+' : '$' + Math.round(v) + 'M') },
    { target: 98,  prefix: '',  suffix: '%',   decimals: 0, duration: 1400, label: 'Client retention across nearly thirty years' },
    { target: 5,   prefix: '',  suffix: ' wks', decimals: 0, duration: 1200, label: 'Median time to first measurable impact' },
    { target: 500, prefix: '',  suffix: '+',   decimals: 0, duration: 1800, label: 'Operations strengthened across industries, sites, and holdings' },
    { target: 30,  prefix: '',  suffix: '+',   decimals: 0, duration: 1400, label: 'Years of frontline operations leadership' },
  ];
  return (
    <section ref={ref} className="brief-station" style={{
      gridTemplateColumns: '1fr',
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
      {/* Header takes full station width so neither H2 clause wraps
          internally; lede below is body-width-constrained (none here
          — Evidence has no lede paragraph). */}
      <div style={{ marginBottom: 64 }}>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>The Ledger</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>Decades of partnership.</span>
          <span className="pivot">Outcomes that last.</span>
        </h2>
      </div>
      <div className="wipe wipe-d2" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '40px 48px',
      }}>
        {STATS.map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: TYPE.sans,
              fontWeight: 800,
              fontSize: 'clamp(40px, 4.4vw, 64px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: NAVY,
              marginBottom: 12,
            }}>
              <CountUp run={animating} {...s} delay={120 + i * 110} />
            </div>
            <div style={{
              fontFamily: TYPE.sans,
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.5,
              color: TEXT_BODY,
              maxWidth: 240,
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CountUp — single-shot count-up tied to scroll entry.
 *   Runs only when `run` becomes true. Eases out cubic so the
 *   ramp lands cleanly on the target. Prefix/suffix stick.
 *
 *   `format` (optional) lets a stat override default rendering
 *   (prefix + value + suffix). Used by the $1B+ stat which counts
 *   from 0 to 1000 (in millions) and renders "$XXXM" along the
 *   way, only switching to "$1B+" at the finish — otherwise an
 *   integer target of 1 with no decimals only ever displayed two
 *   frames (0, then 1) and the count-up was effectively invisible. */
function CountUp({ run, target, prefix = '', suffix = '', decimals = 0, duration = 1400, delay = 0, format }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const tick = (t) => {
      if (!start) start = t + delay;
      const elapsed = Math.max(0, t - start);
      const p = Math.max(0, Math.min(1, elapsed / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration, delay]);
  if (typeof format === 'function') {
    return <span>{format(val, target)}</span>;
  }
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return <span>{prefix}{display}{suffix}</span>;
}

/* ── Beat VII/VIII: Cards (case studies + insights) ────────────── */
function CardsBeat({ index, headline, pivot, body, cards, cta }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { el.classList.toggle('is-in', e.isIntersecting); }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="brief-station" style={{
      gridTemplateColumns: '1fr',
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
      {/* Header: index + H2 occupy the full station frame width so
          the sans clause ("Operations built on strong execution
          produce") doesn't get force-wrapped by a narrow column.
          The lede that follows stays in a MEASURE.read-ish column
          for prose legibility. */}
      <div style={{ marginBottom: 36 }}>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>{index}</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>{headline}</span>
          {pivot && <span className="pivot">{pivot}</span>}
        </h2>
      </div>
      <p className="station-lede wipe wipe-d2" style={{ marginBottom: 56, maxWidth: 640 }}>{body}</p>
      <div className="wipe wipe-d3" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 1,
        background: RULE_SOFT,
        marginBottom: 36,
      }}>
        {cards.map((c, i) => (
          <a key={i} href={cta.href} style={{
            display: 'block',
            background: PAPER,
            padding: '28px 28px 32px',
            textDecoration: 'none',
            color: NAVY,
            transition: 'background 200ms ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = PAPER_DEEP}
            onMouseLeave={(e) => e.currentTarget.style.background = PAPER}
          >
            <div style={{
              fontFamily: TYPE.mono, fontSize: 10, fontWeight: 500,
              letterSpacing: '0.26em', textTransform: 'uppercase',
              color: GOLD, marginBottom: 18,
            }}>{c.kind}</div>
            <div style={{
              fontFamily: TYPE.sans, fontSize: 18, fontWeight: 600,
              lineHeight: 1.32, color: NAVY, marginBottom: 18,
              minHeight: '3.2em',
            }}>{c.title}</div>
            <div style={{
              fontFamily: TYPE.mono, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: TEXT_MUTED,
            }}>{c.meta}</div>
          </a>
        ))}
      </div>
      <a href={cta.href} style={{
        fontFamily: TYPE.sans, fontSize: 14, fontWeight: 600,
        color: GOLD, textDecoration: 'none',
        letterSpacing: '0.04em',
        borderBottom: '1px solid ' + GOLD,
        paddingBottom: 2,
        display: 'inline-block',
        alignSelf: 'flex-start',
      }}>{cta.label} →</a>
    </section>
  );
}

/* ── Beat IX: Action (closing CTA) ────────────────────────────── */
function ActionBeat() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { el.classList.toggle('is-in', e.isIntersecting); }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="brief-station" style={{ gridTemplateColumns: '1fr' }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
      <div>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>Next Move</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>Let&rsquo;s build your operation</span>
          <span className="pivot">to execute under any circumstances.</span>
        </h2>
        <p className="station-lede wipe wipe-d2" style={{ marginTop: 24, maxWidth: 600 }}>
          Tell us where the operation is feeling pressure. We&rsquo;ll come see it on the floor, find the gaps that are hiding inside it, and build the disciplines that close them.
        </p>
        <div className="wipe wipe-d3" style={{ marginTop: 40 }}>
          <a href="/contact" style={{
            fontFamily: TYPE.sans, fontSize: 15, fontWeight: 600,
            background: GOLD_BRIGHT, color: NAVY,
            padding: '18px 32px',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            transition: 'background 180ms ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = GOLD}
            onMouseLeave={(e) => e.currentTarget.style.background = GOLD_BRIGHT}
          >Start a conversation <span>→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ── Beat II: Thesis — H2 + lede + earned italic quote + the
 *    FIVE DISCIPLINE CARDS as jump-off points. Card content +
 *    URLs are LOCKED (per direction) — match V4's DISCIPLINES
 *    array verbatim. Each card links to its own page. */
const DISCIPLINES = [
  { num: '01', name: 'Operational Discipline', body: 'Standards, routines, and structured practices that make consistent execution the default.', href: '/operational-discipline' },
  { num: '02', name: 'Frontline Leadership',   body: 'Supervisors who can plan a shift, run a problem to ground, and hold the standard with their team.', href: '/frontline-leadership' },
  { num: '03', name: 'Equipment Reliability',  body: 'Uptime, changeovers, and maintenance practices that make the asset base predictable.', href: '/equipment-reliability' },
  { num: '04', name: 'Workforce Capability',   body: 'Skilled, engaged operators who know the work, own the outcome, and can train the next shift.', href: '/workforce-capability' },
  { num: '05', name: 'Daily Accountability',   body: 'The cadence, metrics, and conversations that close the loop every shift, every day.', href: '/daily-accountability' },
];

function ThesisBeat() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { el.classList.toggle('is-in', e.isIntersecting); }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="brief-station" style={{
      gridTemplateColumns: '1fr',
    }}>
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />

      <div style={{ marginBottom: 32, maxWidth: 920 }}>
        <div className="station-index wipe" style={{ marginBottom: 14 }}>The Foundation</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>We build the disciplines to execute.</span>
          <span className="pivot">No matter what.</span>
        </h2>
      </div>

      {/* Lede sits on its own measure column — quote that used to
          live here has been moved to Beat IV (Work Ethic), where it
          functions as POWERS' guiding principle, not floor practice. */}
      <p className="station-lede wipe wipe-d2" style={{ marginBottom: 48, maxWidth: 720 }}>
        Five disciplines built into how the operation executes every shift, every day, every quarter. Not five initiatives. Not five priorities. Weaken one and the others drift. Build them together and they interlock into something load&#8209;bearing, deep enough that performance doesn&rsquo;t break down when conditions do.
      </p>

      {/* ── Five discipline cards — locked content, locked URLs.
         Each card is the jump-off to its dedicated discipline page.
         5-up row at desktop; collapses cleanly to 2-up / 1-up.
         Custom entry (Option B, Feb 2026): gold rule strikes
         across the row first, then cards drop in from 12px above
         with a 70ms left → right stagger. Uniquely choreographed
         vs. the rest of the page because these 5 things are the
         load-bearing claim of the brief. */}
      <div className="discipline-row">
        <div className="discipline-rule" aria-hidden="true" />
        <div className="discipline-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: 1,
          background: RULE_SOFT,
        }}>
          {DISCIPLINES.map((d, i) => (
            <a
              key={d.num}
              href={d.href}
              className="discipline-card"
              style={{
                background: PAPER,
                padding: '28px 24px 32px',
                textDecoration: 'none',
                color: NAVY,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                position: 'relative',
                /* --i is the card's column index (0..4). The CSS
                   entry animation uses it to stagger delay 70ms
                   per card across the row. */
                ['--i']: i,
              }}
            >
              <div style={{
                fontFamily: TYPE.mono, fontSize: 10, fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD_BRIGHT,
              }}>{d.num} &nbsp;&middot;&nbsp; Discipline</div>
              <div style={{
                fontFamily: TYPE.sans, fontSize: 17, fontWeight: 700,
                lineHeight: 1.25, color: NAVY,
              }}>{d.name}</div>
              <div style={{
                fontFamily: TYPE.sans, fontSize: 13, fontWeight: 400,
                lineHeight: 1.55, color: TEXT_BODY,
                flex: 1,
              }}>{d.body}</div>
              <div style={{
                fontFamily: TYPE.mono, fontSize: 10, fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: GOLD_BRIGHT, marginTop: 8,
              }}>Learn more &rarr;</div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        /* ── Discipline card hover ─────────────────────────────────
           Cards lift slightly (3px) + scale (1.025) on hover, with a
           soft elevated shadow + warm paper-deep background. The
           scale value is intentionally subtle — at 1.025 the card
           appears to "step forward" without obviously overlapping
           its neighbors at the 1px gutter, and the elevation cue
           does the rest of the heavy lifting. Transform-origin
           defaults to center, which keeps the lift symmetric across
           the 5-up row so no card disturbs the row's optical
           baseline. z-index lift ensures the growing card stencils
           cleanly over its neighbors during the transition.
           Transitions are property-specific (not transition: all)
           so they don't fight the entry animation's transforms.
           background-color uses a slightly snappier 160ms so the
           color "lands" with the lift instead of trailing it. */
        .discipline-card {
          transition:
            transform 220ms cubic-bezier(.2, .8, .2, 1),
            box-shadow 220ms cubic-bezier(.2, .8, .2, 1),
            background-color 160ms ease;
          will-change: transform;
        }
        .discipline-card:hover {
          background-color: ${PAPER_DEEP};
          transform: translateY(-3px) scale(1.025);
          box-shadow:
            0 18px 36px -18px rgba(13, 36, 66, 0.28),
            0 4px 12px -6px rgba(13, 36, 66, 0.18);
          z-index: 3;
        }
        .discipline-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 4px;
        }

        /* ── Discipline row entry choreography (Option B) ──────────
           Two-stage build, uniquely choreographed for the brief's
           load-bearing claim (the five disciplines):

             1) Gold rule strikes across the row left → right
                (320ms delay, 360ms duration). This appears at
                the same beat in the section's timeline that the
                lede's wipe is completing — the eye is now
                "at the bottom of the paragraph and ready to
                receive the artifact below it."
             2) Cards drop in from 12px above with opacity,
                staggered 70ms left → right (delay = 680ms +
                i*70ms, duration 380ms each). Five distinct
                landings instead of one continuous sweep — feels
                like type slugs being set into the chase rather
                than a curtain being pulled.

           Animation uses fill-mode: backwards so the FROM state
           (opacity 0, transform translateY(-12px)) holds during
           the delay window without flashing the natural style
           first. After the animation ends, we DO NOT use forwards
           — the element returns to its natural .discipline-card
           style (opacity 1, transform: none), which then lets
           the :hover transform compose cleanly. With "forwards"
           the keyframe's "to" would persist forever and override
           hover transforms; backwards-only is the trick that
           reconciles entry animation with hover transform on the
           same element.

           Rule uses forwards because the rule must stay drawn
           after the animation ends. When .is-in is removed (user
           scrolls out), the rule rule reverts to scaleX(0) via
           the natural .discipline-rule style. Replay-on-return:
           the animation re-triggers each time .is-in lands.
        */
        .discipline-row {
          position: relative;
        }
        .discipline-rule {
          height: 1px;
          background: ${GOLD_BRIGHT};
          width: 100%;
          margin-bottom: 28px;
          transform-origin: left center;
          transform: scaleX(0);
        }
        .brief-station.is-in .discipline-rule {
          animation: discipline-rule-draw 360ms cubic-bezier(.4, 0, .2, 1) 320ms forwards;
        }
        @keyframes discipline-rule-draw {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .brief-station.is-in .discipline-card {
          animation: discipline-card-drop 380ms cubic-bezier(.2, .85, .25, 1) backwards;
          animation-delay: calc(680ms + var(--i, 0) * 70ms);
        }
        @keyframes discipline-card-drop {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Respect prefers-reduced-motion: shrink the build to a
           plain opacity crossfade, no transforms or rule sweep. */
        @media (prefers-reduced-motion: reduce) {
          .discipline-rule {
            transform: scaleX(1) !important;
          }
          .brief-station.is-in .discipline-rule,
          .brief-station.is-in .discipline-card {
            animation: none !important;
          }
        }

        /* Note: the former .thesis-body two-column with quote sidebar
           was removed Feb 2026 — the "If you're working, we're
           working" credo moved to Beat IV (Work Ethic) where it now
           functions as POWERS' guiding principle. The Thesis lede
           now sits on a single measure column above the cards. */
        @media (max-width: 1100px) {
          .discipline-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 720px) {
          .discipline-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 480px) {
          .discipline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}


/* ── Industries beat (Beat VI) — Where We Work
 *   Extends the Station layout with a full-width client logo crawl
 *   row beneath the headline + body. The crawl spans both grid
 *   columns and uses CLIENT_LOGOS (module-level) for the brand list. */
function IndustriesBeat() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { el.classList.toggle('is-in', e.isIntersecting); }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="brief-station">
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
      <div>
        <div className="station-index wipe">Where We Work</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>Different industries.</span>
          <span className="pivot">The same execution discipline.</span>
        </h2>
      </div>
      <div className="wipe wipe-d2">
        <p className="station-lede">
          We work with multi-site operators, PE-backed platforms, and organizations in active growth or integration. From food and beverage and protein processing to automotive, aerospace and defense, pharmaceuticals and medical devices, consumer packaged goods, agriculture, metals and mining, chemicals, oil and gas, and the private equity firms behind many of them. Different products. Different scales. Different pressures. The same financial result: stronger margins, faster recovery, gains that compound.
        </p>
      </div>
      {/* Full-width logo crawl spans both grid columns. */}
      <div className="industries-logos-row wipe wipe-d3" style={{ gridColumn: '1 / -1' }}>
        <div className="industries-logos-label">Shoulder to shoulder with</div>
        <div className="logo-crawl" data-testid="logo-crawl">
          <div className="logo-crawl-fade logo-crawl-fade-l" aria-hidden="true" />
          <div className="logo-crawl-fade logo-crawl-fade-r" aria-hidden="true" />
          <div className="logo-crawl-track">
            <div className="logo-crawl-row">
              {CLIENT_LOGOS.map((l, i) => (
                <span key={i} className="logo-crawl-item" title={l.name}>
                  <img src={logoSrc(l)} alt={l.name} loading="lazy" />
                </span>
              ))}
            </div>
            {/* Duplicate set for seamless infinite loop — when the
                first set finishes at translateX(-100%), the duplicate
                lands at translateX(0), so the cycle has no visible seam. */}
            <div className="logo-crawl-row" aria-hidden="true">
              {CLIENT_LOGOS.map((l, i) => (
                <span key={'b' + i} className="logo-crawl-item">
                  <img src={logoSrc(l)} alt="" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Station component — every beat below the hero uses this.
 *   `headline` is the sans-navy lead clause. `pivot` is the
 *   serif-italic-gold resolution clause that lands on its own line. */
function Station({ index, headline, pivot, body, quote, attr }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { el.classList.toggle('is-in', e.isIntersecting); }),
      { root: document.querySelector('.brief-page'), threshold: 0.30 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="brief-station">
      <span className="station-divider" aria-hidden="true" />
      <span className="brief-tick" aria-hidden="true" />
      <div>
        <div className="station-index wipe">{index}</div>
        <h2 className="station-h2 wipe wipe-d1">
          <span>{headline}</span>
          {pivot && <span className="pivot">{pivot}</span>}
        </h2>
      </div>
      <div className="wipe wipe-d2">
        <p className="station-lede">{body}</p>
        {quote && (
          <div className="wipe wipe-d3">
            <p className="brief-quote">&ldquo;{quote}&rdquo;</p>
            <div className="brief-quote-attr">{attr}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeV5;
