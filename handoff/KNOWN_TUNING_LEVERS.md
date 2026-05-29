# Known Tuning Levers

Things the briefs explicitly called out as "tuned — likely to need adjustment in production." None of these are bugs; they're decisions that may need to be re-validated once the production environment (real fonts, real CDN, real device matrix) is in place.

---

## Hero

### "Numbers." vertical alignment

**File:** `/app/frontend/src/pages/HomeV3.jsx` — `<Hero>` component, look for the `.numbers` span styles.

**Current:** `marginTop: '0.02em'`

**Why it's a lever:** "Stop" / "Chasing" are Proxima Nova 800. "Numbers." is Newsreader italic 500. Different typefaces have different cap-heights and visual baselines. The 0.02em margin compensates for the mismatch so the three stacked words read as one block.

**When to revisit:** As soon as Adobe Fonts loads the real Proxima Nova in production. The fallback `-apple-system` you see locally has different metrics. Expect to nudge this a few hundredths of an em either way.

### Hero BUILD / PEAK timings

**File:** `HomeV3.jsx` — search for `const BUILD = 4400, PEAK = 3500`.

**Current:** BUILD 4400, PEAK 3500, COLLAPSE 1500, EMPTY 650 (all ms).

**Why it's a lever:** Affects the perceived rhythm of "watching readouts you can't control." The previous values (BUILD 3600 / PEAK 1100) felt rushed. The newer values give the chaos beat time to register. If stakeholder feedback says the hero "drags," reduce PEAK first (try 2800).

### Number swarm spawn-zone padding

**File:** `HomeV3.jsx` — `<Hero>` component, `measure()` function, `const pad = 26`.

**Current:** 26px text-exclusion padding around the right column.

**Why it's a lever:** Numbers landing inside this padded rectangle around the right-column text either get heavily de-opacity'd or skipped. If production line lengths in the lede shift (different copy, different breakpoint widths), numbers may start crowding the text or leaving too much dead space. Adjust upward (more breathing room) or downward (more swarm density) as needed.

### "Headline animation only first cycle" alternative

**Where:** The brief mentions this as an option that was considered and rejected. Currently the headline + lede + closing line participate in *every* cycle (BUILD/PEAK/COLLAPSE/EMPTY).

**If you ever need to switch back:** Move the five reveal triggers out of the `step()` loop and into a one-shot `useEffect` setTimeout chain that fires only on mount. Then guard the COLLAPSE-phase `hideSupport(...)` calls with a `firstCycle` flag.

Reason for the current choice: the per-cycle reveal makes the hero feel alive after the first ~5 seconds. The first-cycle-only alternative makes it feel like an ad with a moving background once the text freezes. Stakeholder preference was the per-cycle version, but you have license to flip this.

---

## Section 3 — Disciplines Foundation

### Exit trigger rootMargin

**File:** `/app/frontend/src/components/DisciplinesAndPressureExhibit.jsx` — `SectionDisciplinesFoundation`, look for `rootMargin: '0px 0px -70% 0px'`.

**Current:** `-70%` — exit fires when the bottom of the section is 70% of the way up the viewport.

**Why it's a lever:** Determines when the core's "descent" animation starts. Too early and it triggers before the reader has finished reading the payoff line. Too late and the core stays in view as the reader scrolls into Section 4, breaking the optical illusion. If your build has different section heights, you may need to adjust.

Reasonable range: `-50%` to `-80%`. Default `-70%` works on a standard laptop viewport (~900px tall).

### Core exit translateY distance

**File:** Same file — `.s3-core-anchor.s3-exiting` CSS rule, `transform: translate(-50%, calc(-50% + 220px))`.

**Current:** 220px downward translation.

**Why it's a lever:** This is the distance the core appears to travel downward during exit. It needs to be **enough to feel like the core is leaving the section**, but **not so much that the core visibly enters the gap between S3 and S4 and looks lost**. 220px is tuned for the current section heights.

If you tighten or expand the spacing between S3 and S4 in production, retune this in proportion.

### Card stagger timing

**File:** Same file — `runSequence()` function, the `[0,1,2,3,4].forEach((i) => { ... 220 + i * 180 })` block.

**Current:** First card at 220ms, then 180ms between each.

**Why it's a lever:** Total entry sequence is ~3.2 seconds. If that feels slow, reduce the gap (try 140ms). If individual cards land too fast to be readable as they appear, increase (try 220ms).

---

## Section 4 — Pressure Exhibit

### Entry observer threshold

**File:** `DisciplinesAndPressureExhibit.jsx` — `SectionPressureExhibit`, `threshold: 0.25` on the IntersectionObserver.

**Current:** Fires when 25% of the section is visible.

**Why it's a lever:** Determines when the ghost core starts descending. If your build introduces extra whitespace before S4, the section may be too late entering the viewport and the choreography breaks.

### Copy → ghost descent beat

**File:** Same file — `triggerEntry()` function, `setTimeout(() => { entryStart = performance.now(); }, 400)`.

**Current:** 400ms beat between copy fade-in starting and ghost descent starting.

**Why it's a lever:** This is the rest moment that lets the eyebrow + h2 + lede land before the ghost starts moving. Too short and the eye doesn't have time to read; too long and the section feels static. Try 300-600ms range if you want to tune.

### Ghost-to-canvas-core handoff

**File:** Same file — `updateEntry()` function. Look for the `entryProgress` interpolation that transitions ghost opacity → 0 and canvas core opacity → 1.

**Current:** 300ms crossfade after ghost lands.

**Why it's a lever:** This crossfade is what sells "the ghost core became the canvas core." If you see a flash or pop at this handoff, the timing is off. Watch this on a slow GPU.

### Spawn rate / operating pressure default

**File:** Same file — `SectionPressureExhibit`, `let loadLevel = 6`.

**Current:** Default operating pressure 6 of 10. Spawn gap = `1150 - (loadLevel-1) * 95` = 675ms.

**Why it's a lever:** "Default chaos level." If stakeholders say the swarm feels too sparse or too overwhelming, change the default. The slider control lets the demo audience explore both ends.

### Show / hide operator controls

**File:** Same file — search for `.s4-controls` markup.

**Current:** Pause/Play, slider, and Surge button render on every viewport.

**Decision needed:** Are these production controls (e.g., useful for client-side accessibility) or demo-only? If demo-only, hide them in production via a `showControls` prop.

---

## Section 5 — How We Work video

### Crossfade duration

**File:** `HomeV3.jsx` — `<LoopingVideoWithCrossfade>` component, `const FADE_SECONDS = 0.7`.

**Current:** 0.7 seconds in, 0.7 seconds out at every loop boundary.

**Why it's a lever:** Long enough that the eye can't see the hard cut, short enough that the video appears continuously playing. If the loop transition still feels visible, increase to 1.0. If it feels too "soft" / dreamy, decrease to 0.4.

---

## Subhead reveal (global)

### Observer threshold

**File:** `HomeV3.jsx` — `useSubheadReveal()` hook, `threshold: 0.25`.

**Current:** 25% — fires when 25% of the subhead is visible.

**Why it's a lever:** If subheads near the bottom of the page never trigger (because the reader stops scrolling before they're 25% visible), reduce to 0.1. The current value is set conservatively to prevent premature triggers when the user is just glancing past.

### Italic accent stagger

**File:** Same file — CSS for `[data-subhead-reveal] > span`, `transition-delay: 0.28s`.

**Current:** 280ms after the headline starts fading up, the italic gold accent span begins its own fade.

**Why it's a lever:** This is what makes "Five disciplines. *One foundation.*" read as a beat-then-accent rather than appearing all at once. Reasonable range: 200-400ms.

---

## Type rendering

### Font load timing across the hero animation

**Where:** Adobe Fonts kit URL must load before the hero begins animating. Currently in prototype the Newsreader span uses Google Fonts fallback.

**Risk:** If Adobe Fonts is slow to load, the headline's "Numbers." word may swap typeface mid-animation. The brief specifically flagged this. Mitigate with `<link rel="preload">` on the critical font weights, or trigger the animation only after `document.fonts.ready`.

**Recommended pattern:**

```js
useEffect(() => {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      // Start hero animation here instead of immediately
    });
  } else {
    // Fallback: start immediately
  }
}, []);
```

This wasn't implemented in the prototype because the fallback fonts are visually close enough. In production with real Proxima Nova, gate the animation start on font readiness.

---

## What's *not* a tuning lever

Things that look adjustable but are LOCKED by the spec — do not tune these:

- The gold color (`#e89346`). Changing it affects 50+ usages and breaks the spec.
- The H2 size ladder. Single h2Size value used by every section by design.
- The S/N/M/L breakpoints (480 / 880 / 1280). The whole layout is calibrated to these.
- Sentence case vs Title Case. Stakeholder-approved sentence case is locked.
- The hero copy (the three locked strings — headline, lede, closing).
- The Section 3 and Section 4 copy (locked).
- The four-phase animation cycle order (BUILD → PEAK → COLLAPSE → EMPTY).
- The replay-on-re-entry behavior in S3 and S4 (this is the choreography).
- The white-background continuity between S3 and S4 (this is the choreography).
