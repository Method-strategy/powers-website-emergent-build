# Section Choreography

The animations are the parts most likely to break in another dev's hands. This doc captures the *intent* and *exact mechanics* of each animated section so you can rebuild or relocate them confidently.

If any of this feels overdetailed: that's because the brief explicitly flagged these as "tuned — don't change without testing."

---

## Hero — perpetual 4-phase cycle

**Location:** `HomeV3.jsx` function `Hero()` line 1117
**Reference HTML:** `powers-hero-3.html` (latest of three iterations)
**Animation trigger:** Page load. Not scroll-triggered.

### Phases

| Phase | Duration | What's happening |
|---|---|---|
| BUILD | 4400ms | Numbers spawn one-by-one into the right-side canvas zone, fading up. Headline words + lede + closing line stagger in (5 reveals total) |
| PEAK | 3500ms | All numbers held at final positions. Continuous low-rate respawn so the field stays alive. Headline + copy held visible |
| COLLAPSE | 1500ms | All numbers begin falling with simulated gravity, fading as they fall. Headline dims to opacity 0.22. Lede and closing line fade fully out. |
| EMPTY | 650ms | Brief pause. Canvas cleared. Text invisible. The pause is what makes the next BUILD feel like a beat. |

Then BUILD again, indefinitely.

### Word reveal milestones (5)

Inside BUILD, five elements reveal at staggered milestones (fraction of BUILD duration):

| Element | Milestone | Effect |
|---|---|---|
| `Stop` | `elapsed > 200ms` | sans 800 white fades up |
| `Chasing` | `elapsed > BUILD * 0.30` | sans 800 white fades up |
| `Numbers.` | `elapsed > BUILD * 0.58` | newsreader italic gold fades up (with period as part of the italic span) |
| Lede | `elapsed > BUILD * 0.78` | body copy fades up |
| Closing line | `elapsed > BUILD * 0.92` | "We build the foundation." fades up |

All reveals reset at the EMPTY→BUILD transition and replay every cycle.

### Number swarm specifics

- **Spawn zone (desktop, >880px):** right 60% of canvas, top 6% to 78% of height. Avoids the headline column.
- **Spawn zone (mobile, ≤880px):** top 46% of canvas, full width. Headline stacks above the swarm.
- **Text exclusion zone:** padded rectangle around the right-column text (26px padding). Numbers landing inside this zone are heavily de-opacity'd (0.18x) and large numbers (>26px) are skipped entirely.
- **Sign/color correlation:** **Always paired.** Green = `+`, red = `-`. The fix that landed this was passing the spawn-time `positive` flag into `fmt()` instead of rolling an independent random sign. Don't decouple these.
- **Size distribution:** 60% small (13-22px), 28% medium (22-40px), 12% large (40-72px). Large sizes scale with build intensity for the chaos crescendo.
- **Opacity distribution:** 65% low (0.06-0.16), 25% medium (0.16-0.32), 10% high (0.32-0.55). The mix is what reads as "field of readouts" rather than "labels."

### Reduced motion

`prefers-reduced-motion: reduce` triggers a static state: 26 numbers pre-spawned at full opacity, no animation, all headline/copy fully visible from t=0.

### Why these timings

Lengthening PEAK from 1100ms to 3500ms (per the latest brief) is what gives the "see how many readouts the executive is tracking" moment time to land emotionally. Earlier shorter PEAK felt like a flash; the new duration registers as chaos.

The 5-element reveal (vs the previous 3) means lede + closing line ride the cycle rather than freezing after first reveal. This keeps the section *alive* — every cycle is an emotional beat, not background animation behind static text.

---

## Section 3: Disciplines Foundation

**Location:** `/components/DisciplinesAndPressureExhibit.jsx` export `SectionDisciplinesFoundation`
**Reference HTML:** `powers-combined.html` (S3 portion)
**Animation trigger:** IntersectionObserver, threshold 0.18.
**Replay on re-entry:** **YES** — resets and re-animates every time the section re-enters the viewport. This is critical and was specifically flagged in the brief.

### Entry sequence

| t (ms) | What happens |
|---|---|
| 0 | Trigger fires. State resets. |
| 220 | Discipline card #1 fades in + translates to position |
| 400 | Discipline card #2 |
| 580 | Discipline card #3 |
| 760 | Discipline card #4 |
| 940 | Discipline card #5 |
| 1300 | Core materializes (scale .85 → 1, opacity 0 → 1, breathing animation begins) and soft radial halo fades in |
| 2000 | Canvas connector lines start drawing — dotted gold (#e89346 at 50% alpha), rect→circle calculation, animated over 900ms |
| 2800 | Payoff line "Together, they form your *ability to execute…*" fades up |

Total entry: ~3.2 seconds.

### Card positions (clockwise around core)

| Card | Position | Class |
|---|---|---|
| 01 Operational Discipline | top-left | `.d1` |
| 02 Frontline Leadership | top-right | `.d2` |
| 03 Equipment Reliability | mid-left | `.d3` |
| 04 Workforce Capability | mid-right | `.d4` |
| 05 Daily Accountability | bottom-center | `.d5` |

### Core spec (LOCKED)

- Size: 188px desktop / 170px tablet / 150px mobile
- Background: `#0f2a47` (navyDeep)
- Border: 1.5px solid `rgba(232,147,70,0.95)` (gold at 95%)
- Inner ring: 14% inset, 1px `rgba(232,147,70,0.22)`
- Radial halo: behind the core, 47px outward, gold gradient fading to transparent
- Text: 4 lines of `EXECUTION / CAPABILITY / ROOTED IN / DISCIPLINE` in mono 14px gold, 0.18em tracked, uppercase
- Each text line fades in with 120ms stagger after core materializes
- Breathing scale animation: 4.2s ease-in-out infinite, 1% scale variation

### Connector line drawing

Custom canvas math: from each card's rectangle, compute the point on the rectangle's edge closest to the core's center; from the core, compute the point on its circle closest to that rect-edge point; animate a dashed line drawing from rect-edge → circle-edge.

Don't lift this into SVG — the canvas approach is what allows the animation to be smooth at 60fps across all 5 lines simultaneously without nested DOM nodes.

### Exit sequence

Trigger: a bottom-of-section `<div>` sentinel crosses into the viewport at `rootMargin: '0px 0px -70% 0px'`. This means "when the section's bottom edge is 70% of the way up the viewport."

When exit fires:
- Core anchor div gets `.s3-exiting` class → CSS transition: `translateY(220px)` + `opacity: 0` over 1.2s with cubic-bezier(.42,0,.58,1)
- All discipline cards get `.s3-fading` → fade to 0 over 1s
- Payoff gets `.s3-fading` → fade to 0
- Canvas connector opacity is animated to 0 via RAF (so the lines fade with everything else)

The 220px downward translation is what sells the illusion that the core is *leaving* Section 3 to travel into Section 4. **This number is tuned** — change it and the optical-continuity illusion breaks. The brief specifically flagged this.

---

## Section 4: Pressure Exhibit

**Location:** `/components/DisciplinesAndPressureExhibit.jsx` export `SectionPressureExhibit`
**Reference HTML:** `powers-combined.html` (S4 portion)
**Animation trigger:** IntersectionObserver, threshold 0.25.
**Replay on re-entry:** **YES**.

### Entry sequence

| t (ms) | What happens |
|---|---|
| 0 | Trigger fires. State resets. Copy block gets `.s4-in` class, fades up over 900ms |
| 400 | Ghost core (HTML element identical to the S3 core spec) begins descending from `top: 0` to its operating position (calculated to land at the canvas core's resting Y) |
| 2000 | Ghost lands. Ghost opacity fades to 0 over 300ms. Canvas core's entry progress simultaneously fades from 0 to 1 — this is the **handoff**. |
| 2300 | Controls (Pause/Play, slider, Surge button) fade in over 1.2s |
| 2300+ | Swarm activates: first red pressure label spawns. Spawn rate is `1150 - (loadLevel-1) * 95` ms gap. |

### The core-travel illusion

This is the centerpiece of the S3→S4 narrative trick:

1. S3's core descends out the bottom of S3, fading.
2. White space between S3 and S4 — no interruption.
3. S4's ghost core descends from the top of S4 into position.
4. Ghost fades out as canvas core fades in at the same position.

The reader's eye tracks "the core" as one continuous object traveling through space. **This only works because:**
- Both sections share the same white background
- The ghost core's HTML/CSS is byte-identical to the S3 core (same dimensions, border, halo, text)
- The handoff between ghost and canvas-drawn core is timed to be invisible

If you change anything about either core's appearance, change both at once.

### Swarm mechanics

- **Pressures (red):** spawn from the left edge (`x: -30`), fly toward the core with wobble (sin-based perpendicular oscillation), fade in opacity over ~10 frames, get absorbed by the core (state transition `'fly' → 'absorb'`), and emit a particle burst on contact.
- **Outcomes (green):** spawn at the core's right edge (`x: core.x + core.r * 0.2`), drift rightward with vertical settle, emit a small green particle burst on "birth," fade out as they exit the right side of the canvas.
- **Core breathing:** subtle sine-driven scale + a secondary scale modulated by `surgeEase` (driven by the Surge button). When Surge fires, the core swells slightly and the halo intensifies.
- **Particle bursts:** 14 particles per absorb, 10 per emit. They radiate outward, decay with random rates.

### Operator controls

Three controls render below the canvas. Currently visible by default; consider hiding for production.

- **Pause / Play:** toggles `running` flag. Animations freeze in place. Useful for demos.
- **Operating pressure slider (1-10):** adjusts spawn gap. Higher = faster spawn rate. Default 6.
- **Surge:** triggers a 2.6-second swell where spawn gap drops to 180ms and the core halo intensifies. Useful for demos to show "the system under sudden pressure."

These were included because they helped during stakeholder presentations. For client-facing production you may want to remove them — they're not part of the narrative.

### Reduced motion

In `prefers-reduced-motion`, the entry sequence skips. Copy and controls render statically. 3 pressure labels spawn over the first 750ms so the canvas has visible content. No core animation, no continuous swarm.

---

## How We Work — looping video crossfade

**Location:** `<LoopingVideoWithCrossfade>` inline component at `HomeV3.jsx` line 1702.

### Mechanic

The video file has a hard cut at the loop boundary (the `loop` attribute on HTML5 video doesn't blend frame N to frame 0 — it just jumps). To hide this, the component:

1. Extracts the video's first frame as a poster JPG (done once at build time, stored at `/uploads/powers-banner-2026-v2-poster.jpg`)
2. Renders the poster as a `<img>` underneath the `<video>`
3. RAF-interpolates the `<video>` element's opacity:
   - Final 0.7s of playback: opacity → 0 (poster visible underneath)
   - Just after `loop` resets to t=0: opacity → 1 (over 0.7s)
4. Because the poster *is* the video's first frame, the crossfade is visually invisible — the reader perceives one continuous shot

### Why RAF instead of CSS animation

The video's `loop` event fires after the seek-to-zero. By the time you'd kick off a CSS transition in response, you've missed the frame. RAF lets you compute opacity from `video.currentTime` on every frame, so the fade is in sync with playback at sub-frame precision.

### Files involved

- `/uploads/powers-banner-2026-v2.webm` (6.8MB, VP9, primary)
- `/uploads/powers-banner-2026-v2.mp4` (8.1MB, H.264, fallback)
- `/uploads/powers-banner-2026-v2-poster.jpg` (134KB, first frame)

---

## Subhead staggered reveal — global

**Location:** `useSubheadReveal()` hook at `HomeV3.jsx` line 72.

Page-wide IntersectionObserver that fires on any `<h2 data-subhead-reveal>` as it enters the viewport at threshold 0.25.

When triggered:
1. The h2 fades up + lifts 14px → 0 over 0.85s
2. 280ms later, any inline `<span>` child (the italic gold accent) fades in over 0.7s

This produces the editorial "statement → accent" beat on every section heading. The 280ms stagger is what makes it feel intentional rather than mechanical.

To opt a heading in, add `data-subhead-reveal` to its `<h2>`:

```jsx
<h2 data-subhead-reveal style={{...}}>
  Heading lead
  <span>italic gold accent</span>
</h2>
```

Currently applied to 5 of the homepage subheads. Honors `prefers-reduced-motion` (renders end-state immediately, no animation).

---

## Tuning levers summary

Things the briefs explicitly flagged as likely to need tweaking in production:

| Lever | Where | Why |
|---|---|---|
| Hero BUILD/PEAK timings | `HomeV3.jsx` line ~1280 | Affects perceived rhythm of "watching readouts you can't control" |
| Hero text-exclusion padding | `HomeV3.jsx` `measure()` function, `const pad = 26` | May need to grow/shrink depending on production line lengths and column widths |
| S3 exit rootMargin | `DisciplinesAndPressureExhibit.jsx` exitIO setup, `-70%` value | When this fires affects the apparent "speed" of the core descending |
| S4 entry threshold | `DisciplinesAndPressureExhibit.jsx` observer setup, `threshold: 0.25` | Determines when ghost core starts descending |
| S4 400ms copy→ghost beat | `DisciplinesAndPressureExhibit.jsx` `triggerEntry()`, `setTimeout(... 400)` | If copy reveal feels off-rhythm vs ghost descent |
| Hero "Numbers." vertical alignment | `HomeV3.jsx` styles for the numbers span, `marginTop: '0.02em'` | Newsreader vs Proxima cap-height mismatch will likely need a sub-em tweak after Adobe Fonts loads in production |
