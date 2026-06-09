/* ════════════════════════════════════════════════════════════════════
 *  HERO PRESSURE EXHIBIT  (Feb 2026 — V4 spine)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Variant of the mid-page pressure exhibit, hoisted to the TOP of the
 *  homepage as the new hero. Forked from SectionPressureExhibit so the
 *  animation engine (chips, core, particle bursts, controls, ghost
 *  drop-in entry) is preserved verbatim. Two things are new:
 *
 *    1. Copy. H1 (not H2) — "Strong execution. Strong performance.
 *       Regardless of conditions." Size lives between the legacy hero
 *       H1 (clamp 56→128px) and the S4 H2 (clamp 30→46px) — sized for
 *       a longer line at hero scale. No eyebrow. Lede reframes
 *       "capacity" → "ability to execute no matter what" per the
 *       Sean/Justin pivot.
 *
 *    2. Two stepped chart lines flanking the core:
 *         • RED, left side — starts upper-left, steps DOWN and to the
 *           right toward the core. Reads as performance trending down
 *           under the cascade of pressures arriving from the same side.
 *         • GREEN, right side — starts at the core, steps UP and to
 *           the right out to the upper edge. Reads as outcomes lifting
 *           performance back above the line.
 *       Both lines draw progressively, starting ~500ms AFTER the chip
 *       swarm activates so causation reads "pressures cause the
 *       descent / outcomes cause the rise" rather than appearing in
 *       parallel. Their draw speed is decoupled from chip speed (the
 *       operator can drag the Operating Pressure slider without
 *       affecting how the chart steps).
 *
 *  CSS prefix: `hpe-*` (Hero Pressure Exhibit) — DO NOT use `s4-*`
 *  here, those classes are shared with the mid-page SectionPressureExhibit
 *  and we want zero collision when both live on the same page.
 *
 *  This file is self-contained (its own tokens + chip pools) so the
 *  hero text/chip vocabulary can diverge from the mid-page exhibit
 *  without coupling.
 * ════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef } from 'react';

/* ── Locked design tokens (mirrors DisciplinesAndPressureExhibit) ── */
const SANS  = '"proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif';
const SERIF = '"Newsreader","Source Serif 4","Tiempos Headline",Georgia,"Times New Roman",serif';
const MONO  = '"JetBrains Mono","IBM Plex Mono",ui-monospace,"SFMono-Regular",Menlo,Consolas,monospace';

const C = {
  navy:     '#143257',
  navyDeep: '#0f2a47',
  body:     '#4a5568',
  gold:     '#e89346',
  paper:    '#ffffff',
  line:     'rgba(20,50,87,.14)',
  red:      '#d8523c',
  green:    '#3fb364',
};

/* Chip vocabularies — duplicated from the mid-page exhibit on purpose
 * so the hero can evolve its own curated set independently if needed.
 * (Today they're identical.) */
const PRESSURES = [
  'Market volatility','Tariff & trade shifts','Demand swings','Workforce turnover',
  'Equipment breakdowns','Inexperienced supervisors','Margin compression','Schedule misses',
  'Supply chain disruption','New site ramp-up','Raw material shortfall','Quality escapes',
  'Absenteeism','Changeover delays','Unplanned downtime','Skilled labor shortage',
  'Aging equipment','Rising input costs','Capacity constraints','Supplier delays',
  'Rework & scrap','Safety incidents','Tribal knowledge loss','Forecast misses',
  'Inventory imbalance','Shipping delays','Energy cost spikes','Regulatory changes',
  'Customer escalations','Maintenance backlog','Bottleneck operations','Shift variance',
  'Overtime creep','Yield loss','Material price swings',
];
const OUTCOMES = [
  'Increased throughput','Higher OEE','Reduced downtime','Improved labor productivity',
  'Expanded margin','Recovered working capital','Stronger frontline leadership','Sustained performance',
  'Lower cost per unit','Workforce stability','Increased capacity','Higher quality','Less waste','Higher yield',
  'Faster changeovers','On-time delivery','Predictable schedules','Fewer safety incidents',
  'Improved first-pass yield','Lower scrap rate','Better asset reliability','Shorter lead times',
  'Consistent shift output','Reduced overtime','Stronger accountability','Improved morale',
  'Tighter cost control','Scalable operations','Repeatable execution','Higher utilization',
];

/* Trend-line behavior — generators, not fixed waypoints.
 *
 * Each cycle, we generate a fresh randomized polyline that ALWAYS:
 *   • Red:   starts upper-left (~0.02–0.06, ~0.06–0.13), ends at the
 *            literal core center (0.50, 0.50). Net trend down with
 *            2–3 counter-trend upticks (failed bounces) scattered
 *            through the middle.
 *   • Green: starts at the core center (0.50, 0.50), ends upper-right
 *            (~0.94–0.98, ~0.04–0.12). Net trend up with 2–3
 *            counter-trend dips (setbacks) scattered through.
 *
 * Both lines share a cycle clock so they animate as a paired pulse:
 *
 *   draw  (3500ms)  →  hold (1500ms)  →  fade (700ms)  →  regenerate
 *
 * The result reads as the operation's performance trend continuously
 * recomposing under a steady cascade of pressures — same story, never
 * the same exact curve. The chip swarm (already on its own clock,
 * driven by the Operating Pressure slider) and this cycle clock are
 * fully decoupled. */
const LINE_DRAW_MS = 3500;
const LINE_HOLD_MS = 1500;
const LINE_FADE_MS = 700;
const LINE_CYCLE_MS = LINE_DRAW_MS + LINE_HOLD_MS + LINE_FADE_MS;

function generateLeftWaypoints() {
  const N = 12; // number of segments
  const startX = 0.02 + Math.random() * 0.04;
  const startY = 0.06 + Math.random() * 0.07;
  const endX = 0.50, endY = 0.50;

  // 2–3 middle segments will counter-trend (small uptick within the
  // overall descent — a failed bounce).
  const counterTrend = new Set();
  const numCT = 2 + (Math.random() < 0.5 ? 0 : 1);
  while (counterTrend.size < numCT) {
    counterTrend.add(2 + Math.floor(Math.random() * (N - 3)));
  }

  // Build x positions evenly spaced with small jitter so the polyline
  // doesn't read as a metronomic grid.
  const xs = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    let x = startX + (endX - startX) * t;
    if (i > 0 && i < N) x += (Math.random() - 0.5) * 0.012;
    xs.push(x);
  }

  // Allocate descent across non-counter-trend segments so the line
  // still lands at (endX, endY) regardless of how many CT bumps we
  // injected.
  const ctMagnitude = 0.035;
  const totalDescent = (endY - startY) + numCT * ctMagnitude;
  const descentSegments = N - numCT;
  const avgDescent = totalDescent / descentSegments;

  const points = [[xs[0], startY]];
  let y = startY;
  for (let i = 1; i < N; i++) {
    let dy;
    if (counterTrend.has(i)) {
      dy = -(0.020 + Math.random() * 0.030);
    } else {
      // 0.55× – 1.45× the average descent — uneven amplitudes
      dy = avgDescent * (0.55 + Math.random() * 0.9);
    }
    y = Math.max(0.05, Math.min(0.52, y + dy));
    points.push([xs[i], y]);
  }
  points.push([endX, endY]);
  return points;
}

function generateRightWaypoints() {
  const N = 12;
  const startX = 0.50, startY = 0.50;
  const endX = 0.94 + Math.random() * 0.04;
  const endY = 0.04 + Math.random() * 0.08;

  const counterTrend = new Set();
  const numCT = 2 + (Math.random() < 0.5 ? 0 : 1);
  while (counterTrend.size < numCT) {
    counterTrend.add(2 + Math.floor(Math.random() * (N - 3)));
  }

  const xs = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    let x = startX + (endX - startX) * t;
    if (i > 0 && i < N) x += (Math.random() - 0.5) * 0.012;
    xs.push(x);
  }

  const ctMagnitude = 0.035;
  const totalAscent = (startY - endY) + numCT * ctMagnitude; // y decreases as we climb
  const ascentSegments = N - numCT;
  const avgAscent = totalAscent / ascentSegments;

  const points = [[xs[0], startY]];
  let y = startY;
  for (let i = 1; i < N; i++) {
    let dy;
    if (counterTrend.has(i)) {
      dy = +(0.020 + Math.random() * 0.030); // small dip (y increases)
    } else {
      dy = -avgAscent * (0.55 + Math.random() * 0.9);
    }
    y = Math.max(0.04, Math.min(0.55, y + dy));
    points.push([xs[i], y]);
  }
  points.push([endX, endY]);
  return points;
}

/* Brighter than the chip palette per the brief ("fairly thick, brighter
 * red"). These read as the dominant chart layer; chips remain legible
 * because we draw chips AFTER the lines (and after the core), so the
 * lines sit in the environmental layer. */
const LINE_RED   = '#ff2d2d';
const LINE_GREEN = '#19d76a';
const LINE_WIDTH = 3.5;

const LINE_DELAY_AFTER_ENTRY_MS = 500;   // wait for chips to start before drawing

function buildPath(waypoints, W, H) {
  const points = waypoints.map(([nx, ny]) => ({ x: nx * W, y: ny * H }));
  const segments = [];
  let totalLength = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const len = Math.hypot(dx, dy);
    segments.push({ from: points[i], to: points[i + 1], length: len, start: totalLength });
    totalLength += len;
  }
  return { points, segments, totalLength };
}

function drawProgressivePath(ctx, path, progress, color, lineWidth, alpha) {
  if (!path || path.totalLength === 0) return;
  const a = (alpha == null) ? 1 : Math.max(0, Math.min(1, alpha));
  if (a <= 0.001) return;
  const targetLen = path.totalLength * Math.max(0, Math.min(1, progress));
  ctx.save();
  ctx.globalAlpha = a;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(path.points[0].x, path.points[0].y);
  for (const seg of path.segments) {
    if (seg.start + seg.length <= targetLen) {
      ctx.lineTo(seg.to.x, seg.to.y);
    } else if (seg.start < targetLen) {
      const partial = (targetLen - seg.start) / seg.length;
      const px = seg.from.x + (seg.to.x - seg.from.x) * partial;
      const py = seg.from.y + (seg.to.y - seg.from.y) * partial;
      ctx.lineTo(px, py);
      break;
    } else {
      break;
    }
  }
  ctx.stroke();
  ctx.restore();
}

export default function HeroPressureExhibit() {
  const sectionRef    = useRef(null);
  const exhibitRef    = useRef(null);
  const canvasRef     = useRef(null);
  const copyRef       = useRef(null);
  const ghostWrapRef  = useRef(null);
  const controlsRef   = useRef(null);
  const toggleRef     = useRef(null);
  const loadRef       = useRef(null);
  const loadValRef    = useRef(null);
  const burstRef      = useRef(null);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const copyEl    = copyRef.current;
    const controlsEl= controlsRef.current;
    const ghostWrap = ghostWrapRef.current;
    const exhibitEl = exhibitRef.current;
    const toggleEl  = toggleRef.current;
    const loadEl    = loadRef.current;
    const loadValEl = loadValRef.current;
    const burstEl   = burstRef.current;
    if (!canvas || !exhibitEl) return;

    const ctx = canvas.getContext('2d');
    const NAVY_DEEP = '#0f2a47';
    const RED = '#fa4b4b', GREEN = '#4dc774', GOLD = '#e89346';

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let core = { x: 0, y: 0, r: 0 };

    let leftPath = null, rightPath = null;
    let lineStart = 0; // ms when the trend lines began their first cycle
    let lineCycleIdx = -1; // which cycle we're currently in; -1 sentinel = not yet started

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function aspectFor(w) {
      if (w < 480) return 0.56;
      if (w < 768) return 0.46;
      return 0.38;
    }
    function coreSizeFor(w) {
      if (w < 480) return 150;
      if (w < 880) return 170;
      return 188;
    }
    function resize() {
      const cssW = canvas.clientWidth || canvas.parentElement.clientWidth;
      const cssH = Math.round(cssW * aspectFor(cssW));
      canvas.style.height = cssH + 'px';
      W = cssW; H = cssH;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      core.x = W * 0.5;
      core.y = H * 0.5;
      const coreDiameter = coreSizeFor(window.innerWidth);
      core.r = coreDiameter / 2;
      if (ghostWrap) {
        ghostWrap.style.width  = coreDiameter + 'px';
        ghostWrap.style.height = coreDiameter + 'px';
      }
      // Invalidate cached line paths so they rebuild against the new W/H.
      // Force a regenerate on the next frame by resetting the cycle index.
      leftPath = null;
      rightPath = null;
      lineCycleIdx = -1;
    }

    function rand(a, b) { return a + Math.random() * (b - a); }
    function pick(arr)  { return arr[(Math.random() * arr.length) | 0]; }

    const inbound = [];
    const outbound = [];
    const particles = [];

    function spawnPressure() {
      inbound.push({
        text: pick(PRESSURES),
        x: -30,
        y: rand(0.08, 0.92) * H,
        speed: rand(2.0, 4.2),
        wobble: rand(0, Math.PI * 2),
        wobAmp: rand(0.15, 0.7),
        size: rand(12, 17),
        opacity: 0,
        state: 'fly',
        tAbsorb: 0,
      });
    }
    function emitOutcome() {
      outbound.push({
        text: pick(OUTCOMES),
        x: core.x + core.r * 0.2,
        y: core.y + rand(-core.r * 0.5, core.r * 0.5),
        targetY: core.y + rand(-H * 0.30, H * 0.30),
        vx: 1.9,
        size: 14,
        opacity: 0,
        life: 0,
        state: 'birth',
      });
    }
    function burstAbsorb(x, y, color) {
      for (let i = 0; i < 14; i++) {
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.6, 2.6);
        particles.push({
          x, y,
          vx: Math.cos(a) * sp - 1.2,
          vy: Math.sin(a) * sp,
          r: rand(1, 2.6),
          life: 1,
          decay: rand(0.012, 0.03),
          color,
        });
      }
    }
    function burstEmit(x, y, color) {
      for (let i = 0; i < 10; i++) {
        const a = rand(-0.7, 0.7);
        const sp = rand(0.8, 2.2);
        particles.push({
          x, y,
          vx: Math.cos(a) * sp + 0.8,
          vy: Math.sin(a) * sp * 0.6,
          r: rand(1, 2.4),
          life: 1,
          decay: rand(0.012, 0.028),
          color,
        });
      }
    }

    let loadLevel = 6;
    let lastSpawn = 0;
    let lastEmit = 0;
    const EMIT_GAP = 1150;
    let surgeUntil = 0;
    let surgeStart = 0;
    const SURGE_DUR = 2600;
    let surgeEase = 0;

    let entryStart = 0;
    let entryProgress = 0;
    let entryTriggered = false;
    let entryComplete = false;
    const ENTRY_DUR = 1600;

    function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }

    function positionGhostStart() {
      if (!ghostWrap || !canvas) return { startY: 0, endY: 0 };
      const exhibitRect = exhibitEl.getBoundingClientRect();
      const canvasRect  = canvas.getBoundingClientRect();
      const ghostSize   = coreSizeFor(window.innerWidth);
      const startY = 0;
      const endY = (canvasRect.top - exhibitRect.top) + (canvasRect.height / 2) - (ghostSize / 2);
      return { startY, endY };
    }
    let ghostPositions = { startY: 0, endY: 0 };

    function updateEntry(t) {
      if (!entryTriggered) return;
      if (entryStart === 0) return;
      const elapsed = t - entryStart;
      if (!entryComplete) {
        const p = Math.max(0, Math.min(1, elapsed / ENTRY_DUR));
        const eased = easeOutCubic(p);
        const opacity = p < 0.15 ? (p / 0.15) : 1;
        const y = ghostPositions.startY + (ghostPositions.endY - ghostPositions.startY) * eased;
        ghostWrap.style.transform = 'translateX(-50%) translateY(' + y + 'px)';
        ghostWrap.style.opacity = opacity;
        if (p >= 1) {
          entryComplete = true;
          ghostWrap.style.opacity = 0;
          ghostWrap.style.transition = 'opacity .3s ease-out';
          controlsEl.classList.add('hpe-in');
          spawnPressure();
          const gap = computeSpawnGap();
          lastSpawn = t - gap * 0.55;
          lastEmit = t;
          // Schedule the trend lines to begin drawing — independently
          // of chip speed. Once lineStart is non-zero, frame() starts
          // ticking the chart progress on its own clock.
          setTimeout(() => { lineStart = performance.now(); }, LINE_DELAY_AFTER_ENTRY_MS);
        }
      } else {
        const fadeElapsed = elapsed - ENTRY_DUR;
        const fadeP = Math.max(0, Math.min(1, fadeElapsed / 300));
        entryProgress = fadeP;
      }
    }

    function triggerEntry() {
      if (entryTriggered) return;
      entryTriggered = true;
      ghostPositions = positionGhostStart();
      ghostWrap.style.transform = 'translateX(-50%) translateY(' + ghostPositions.startY + 'px)';
      copyEl.classList.add('hpe-in');
      setTimeout(() => { entryStart = performance.now(); }, 400);
    }

    function resetExhibit() {
      if (entryTriggered && !entryComplete) return;
      entryTriggered = false;
      entryComplete = false;
      entryStart = 0;
      entryProgress = 0;
      copyEl.classList.remove('hpe-in');
      controlsEl.classList.remove('hpe-in');
      ghostWrap.style.transition = '';
      ghostWrap.style.opacity = 0;
      ghostWrap.style.transform = 'translateX(-50%) translateY(0px)';
      inbound.length = 0;
      outbound.length = 0;
      particles.length = 0;
      lineStart = 0;
      lineCycleIdx = -1;
    }

    function computeSpawnGap() {
      return 1150 - (loadLevel - 1) * 95;
    }

    function updateSurgeEase(t) {
      if (t >= surgeUntil) {
        surgeEase += (0 - surgeEase) * 0.06;
        if (surgeEase < 0.002) surgeEase = 0;
        return;
      }
      const elapsed = t - surgeStart;
      const p = Math.max(0, Math.min(1, elapsed / SURGE_DUR));
      const target = Math.sin(p * Math.PI);
      surgeEase += (target - surgeEase) * 0.08;
    }

    let running = true;
    let speedScale = reduceMotion ? 0.35 : 1;
    let pulse = 0;
    let rafId = 0;

    function fadeNearCore(dist) {
      const edge = core.r * 1.25;
      if (dist > edge) return 1;
      return Math.max(0.15, (dist - core.r * 0.9) / (edge - core.r * 0.9));
    }

    function drawLabel(x, y, text, color, opacity, size) {
      if (opacity <= 0.01) return;
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      ctx.fillStyle = color;
      ctx.font = '600 ' + size.toFixed(1) + 'px ' + SANS;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1;
    }
    function drawTracked(text, cx, y, tracking) {
      ctx.textAlign = 'left';
      const widths = [];
      let total = 0;
      for (const ch of text) {
        const w = ctx.measureText(ch).width;
        widths.push(w);
        total += w + tracking;
      }
      total -= tracking;
      let x = cx - total / 2;
      let k = 0;
      for (const ch of text) {
        ctx.fillText(ch, x, y);
        x += widths[k] + tracking;
        k++;
      }
      ctx.textAlign = 'center';
    }
    function drawCore(t) {
      const baseBreath = Math.sin(t * 0.0015) * 0.012;
      const surgeBreath = Math.sin(t * 0.0011) * 0.05 * surgeEase;
      const swell = 1 + baseBreath + surgeBreath + surgeEase * 0.04;
      const r = core.r * swell + pulse * 4;
      const entryAlpha = entryProgress;
      const drawX = core.x;
      const drawY = core.y;
      if (entryAlpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = entryAlpha;
      const haloR = r * (1.5 + surgeEase * 0.5);
      const haloAlpha = 0.12 + pulse * 0.06 + surgeEase * 0.10;
      const halo = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, haloR);
      halo.addColorStop(0,    'rgba(232,147,70,' + haloAlpha.toFixed(3) + ')');
      halo.addColorStop(0.50, 'rgba(232,147,70,' + (haloAlpha * 0.5).toFixed(3) + ')');
      halo.addColorStop(0.75, 'rgba(232,147,70,0)');
      halo.addColorStop(1,    'rgba(232,147,70,0)');
      ctx.beginPath();
      ctx.arc(drawX, drawY, haloR, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
      ctx.fillStyle = NAVY_DEEP;
      ctx.fill();
      ctx.lineWidth = 1.5 + surgeEase * 1.0;
      ctx.strokeStyle = 'rgba(232,147,70,' + (0.95 + surgeEase * 0.05).toFixed(2) + ')';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(drawX, drawY, r * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(232,147,70,0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.textBaseline = 'middle';
      const titleSize = Math.max(12, r * 0.150);
      ctx.font = '500 ' + titleSize.toFixed(0) + 'px ' + SANS;
      ctx.fillStyle = GOLD;
      const lines = ['EXECUTION', 'CAPABILITY', 'ROOTED IN', 'DISCIPLINE'];
      const lh = titleSize * 1.42;
      const startY = drawY - lh * 1.5;
      const tracking = titleSize * 0.18;
      for (let i = 0; i < lines.length; i++) {
        drawTracked(lines[i], drawX, startY + i * lh, tracking);
      }
      ctx.restore();
    }

    function frame(ts) {
      const t = ts;
      ctx.clearRect(0, 0, W, H);
      updateSurgeEase(t);
      updateEntry(t);

      // Trend lines drawn FIRST so the core (drawn next) overpaints
      // their inner endpoints. Each line's literal terminus is (0.50,
      // 0.50) — dead center of the canvas, which is also the core's
      // center — so the lines visually "feed into" / "emerge from"
      // the core rather than terminating at its edge in a hard stop.
      //
      // CYCLING: every LINE_CYCLE_MS we regenerate a fresh randomized
      // path for both lines so the chart continually recomposes —
      // same story (down on the left, up on the right), never the
      // exact same curve. Phases within each cycle:
      //   [0,                  LINE_DRAW_MS)              draw progressively (α=1)
      //   [LINE_DRAW_MS,       +LINE_HOLD_MS)             hold fully drawn  (α=1)
      //   [+HOLD,              +LINE_FADE_MS)             fade out          (α→0)
      if (lineStart > 0) {
        const elapsed = ts - lineStart;
        const idx = Math.floor(elapsed / LINE_CYCLE_MS);
        const cycleT = elapsed - idx * LINE_CYCLE_MS;
        if (idx !== lineCycleIdx) {
          // New cycle (or first time after a reset) — regenerate.
          lineCycleIdx = idx;
          leftPath  = buildPath(generateLeftWaypoints(),  W, H);
          rightPath = buildPath(generateRightWaypoints(), W, H);
        }
        let progress, alpha;
        if (cycleT < LINE_DRAW_MS) {
          progress = cycleT / LINE_DRAW_MS;
          alpha = 1;
        } else if (cycleT < LINE_DRAW_MS + LINE_HOLD_MS) {
          progress = 1;
          alpha = 1;
        } else {
          progress = 1;
          const fadeT = (cycleT - LINE_DRAW_MS - LINE_HOLD_MS) / LINE_FADE_MS;
          alpha = 1 - fadeT;
        }
        drawProgressivePath(ctx, leftPath,  progress, LINE_RED,   LINE_WIDTH, alpha);
        drawProgressivePath(ctx, rightPath, progress, LINE_GREEN, LINE_WIDTH, alpha);
      }

      drawCore(t);

      const swarmActive = entryComplete;
      const surging = t < surgeUntil;
      const gap = surging ? 180 : computeSpawnGap();
      if (swarmActive && running && t - lastSpawn > gap) {
        spawnPressure();
        if (surging && Math.random() < 0.6) spawnPressure();
        lastSpawn = t;
      }
      if (swarmActive && running && t - lastEmit > EMIT_GAP) {
        emitOutcome();
        lastEmit = t;
      }
      for (let i = inbound.length - 1; i >= 0; i--) {
        const p = inbound[i];
        if (p.state === 'fly') {
          p.opacity = Math.min(1, p.opacity + 0.06);
          if (running) {
            const dx = core.x - p.x, dy = core.y - p.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist, uy = dy / dist;
            const perpx = -uy, perpy = ux;
            p.wobble += 0.05;
            const wob = Math.sin(p.wobble) * p.wobAmp;
            p.x += (ux * p.speed + perpx * wob) * speedScale;
            p.y += (uy * p.speed + perpy * wob) * speedScale;
            if (dist < core.r * 0.95) {
              p.state = 'absorb'; p.tAbsorb = 0;
              burstAbsorb(p.x, p.y, RED);
            }
          }
          const ddx = core.x - p.x, ddy = core.y - p.y;
          const ddist = Math.hypot(ddx, ddy);
          drawLabel(p.x, p.y, p.text, RED, p.opacity * fadeNearCore(ddist), p.size);
        } else if (p.state === 'absorb') {
          p.tAbsorb += 0.06;
          const k = 1 - p.tAbsorb;
          if (running) {
            p.x += (core.x - p.x) * 0.18;
            p.y += (core.y - p.y) * 0.18;
          }
          drawLabel(p.x, p.y, p.text, RED, Math.max(0, k) * 0.6, p.size * Math.max(0.2, k));
          if (p.tAbsorb >= 1) {
            inbound.splice(i, 1);
            pulse = Math.min(1, pulse + 0.10);
          }
        }
      }
      for (let i = outbound.length - 1; i >= 0; i--) {
        const o = outbound[i];
        if (o.state === 'birth') {
          o.life += 0.05;
          o.opacity = Math.min(1, o.opacity + 0.05);
          if (running) {
            o.y += (o.targetY - o.y) * 0.04;
            o.x += o.vx * 0.4 * speedScale;
          }
          if (o.life >= 1) {
            o.state = 'glide';
            burstEmit(o.x, o.y, GREEN);
          }
          drawLabel(o.x, o.y, o.text, GREEN, o.opacity * 0.85, o.size);
        } else {
          if (running) {
            o.x += o.vx * speedScale;
            o.y += (o.targetY - o.y) * 0.02;
          }
          let op = o.opacity;
          if (o.x > W * 0.86) { op = Math.max(0, op - 0.02); o.opacity = op; }
          drawLabel(o.x, o.y, o.text, GREEN, op, o.size);
          if (o.x > W + 40 || op <= 0.02) {
            outbound.splice(i, 1);
          }
        }
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const pa = particles[i];
        if (running) { pa.x += pa.vx * speedScale; pa.y += pa.vy * speedScale; }
        pa.life -= pa.decay;
        if (pa.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, pa.life) * 0.7;
        ctx.fillStyle = pa.color;
        ctx.beginPath();
        ctx.arc(pa.x, pa.y, pa.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      pulse *= 0.94;
      rafId = requestAnimationFrame(frame);
    }

    // Controls listeners
    const onToggle = () => {
      running = !running;
      toggleEl.textContent = running ? 'Pause' : 'Play';
    };
    const onLoad = (e) => {
      loadLevel = +e.target.value;
      loadValEl.textContent = e.target.value;
    };
    const onBurst = () => {
      surgeStart = performance.now();
      surgeUntil = surgeStart + SURGE_DUR;
    };
    toggleEl.addEventListener('click', onToggle);
    loadEl.addEventListener('input', onLoad);
    burstEl.addEventListener('click', onBurst);

    // Resize
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    // Boot
    resize();

    let observer = null;
    if (reduceMotion) {
      entryProgress = 1;
      entryTriggered = true;
      entryComplete = true;
      copyEl.classList.add('hpe-in');
      controlsEl.classList.add('hpe-in');
      ghostWrap.style.display = 'none';
      // In reduce-motion mode, snap the chart lines into their final
      // state (drawn fully) so the message lands without animation.
      // We still want a chart visible, so seed lineStart in the past
      // so the first frame computes progress=1, alpha=1 immediately.
      lineStart = performance.now() - LINE_DRAW_MS;
      for (let i = 0; i < 3; i++) {
        setTimeout(spawnPressure, i * 250);
      }
    } else if ('IntersectionObserver' in window) {
      // Hero sits at the very top of the page, so the observer fires
      // on mount. Same replay-on-reentry contract as the mid-page
      // exhibit — if the reader scrolls all the way back up, the
      // entry animation replays.
      let exhibitInView = false;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            if (!exhibitInView) {
              exhibitInView = true;
              if (!entryTriggered || entryComplete) {
                resetExhibit();
                triggerEntry();
              }
            }
          } else {
            exhibitInView = false;
          }
        });
      }, { threshold: 0.25 });
      observer.observe(exhibitEl);
    } else {
      triggerEntry();
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', onResize);
      toggleEl.removeEventListener('click', onToggle);
      loadEl.removeEventListener('input', onLoad);
      burstEl.removeEventListener('click', onBurst);
    };
  }, []);

  return (
    <>
      <style>{`
        /* ── HERO PRESSURE EXHIBIT (hpe-) — scoped to this component ── */
        .hpe-section { background: ${C.paper}; }
        .hpe-exhibit {
          position: relative;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 72px 56px 64px;
        }
        .hpe-copy {
          max-width: 1040px;
          margin: 0 auto;
          text-align: center;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity .9s cubic-bezier(.22,.61,.36,1),
            transform .9s cubic-bezier(.22,.61,.36,1);
        }
        .hpe-copy.hpe-in { opacity: 1; transform: translateY(0); }
        /* Hero-scale H1 — same sans+serif-italic pairing as the legacy
           Hero ("Stop chasing / Numbers."), sized down because the new
           line is three sentences instead of two display words. Lands
           between the legacy H1 (clamp 56→128px) and the standard H2
           (clamp 30→46px). */
        .hpe-h1 {
          line-height: 1.06;
          letter-spacing: -.014em;
          margin: 0 0 22px;
        }
        .hpe-h1 .sans {
          display: block;
          font-family: ${SANS};
          font-weight: 800;
          font-size: clamp(44px, 6.5vw, 92px);
          color: ${C.navy};
        }
        .hpe-h1 .serif {
          display: block;
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 500;
          font-size: clamp(44px, 6.5vw, 92px);
          color: ${C.gold};
          margin-top: .06em;
        }
        .hpe-lede {
          font-family: ${SANS};
          font-size: clamp(16px, 1.3vw, 19px);
          font-weight: 300;
          line-height: 1.6;
          color: ${C.body};
          max-width: 56em;
          margin: 0 auto;
        }
        .hpe-stage-wrap { position: relative; width: 100%; margin-top: 12px; }
        .hpe-canvas { display: block; width: 100%; height: auto; }
        .hpe-ghost-wrap {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 188px;
          height: 188px;
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          will-change: transform, opacity;
        }
        .hpe-ghost-wrap::before {
          content: "";
          position: absolute;
          inset: -47px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(232,147,70,0.12) 0%,
            rgba(232,147,70,0.06) 50%,
            rgba(232,147,70,0) 75%);
          pointer-events: none;
        }
        .hpe-ghost-core {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1.5px solid rgba(232,147,70,0.95);
          border-radius: 50%;
          background: ${C.navyDeep};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hpe-ghost-core::before {
          content: "";
          position: absolute;
          inset: 14%;
          border: 1px solid rgba(232,147,70,0.22);
          border-radius: 50%;
        }
        .hpe-ghost-core-text {
          color: ${C.gold};
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .18em;
          line-height: 1.42;
          text-transform: uppercase;
          text-align: center;
        }
        .hpe-ghost-core-text span { display: block; }

        .hpe-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          margin-top: 14px;
          flex-wrap: wrap;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(.22,.61,.36,1);
        }
        .hpe-controls.hpe-in { opacity: 1; }
        .hpe-controls button {
          background: transparent;
          border: 1px solid ${C.line};
          color: ${C.navy};
          font-size: 12.5px;
          letter-spacing: .04em;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all .15s;
          font-family: ${SANS};
          font-weight: 500;
        }
        .hpe-controls button:hover  { background: rgba(20,50,87,.04); border-color: rgba(20,50,87,.28); }
        .hpe-controls button:active { transform: scale(.97); }
        .hpe-controls .val {
          font-variant-numeric: tabular-nums;
          min-width: 34px;
          text-align: center;
          color: ${C.gold};
          font-weight: 500;
          font-family: ${MONO};
          font-size: 12.5px;
        }
        .hpe-controls label {
          font-family: ${SANS};
          font-size: 12px;
          color: ${C.body};
          letter-spacing: .04em;
        }
        .hpe-controls input[type=range] {
          accent-color: ${C.gold};
          width: 120px;
        }
        @media (prefers-reduced-motion: reduce) {
          .hpe-copy, .hpe-controls {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 880px) {
          .hpe-exhibit { padding: 64px 32px 56px; }
        }
        @media (max-width: 480px) {
          .hpe-exhibit { padding: 48px 22px 40px; }
        }
      `}</style>

      <section ref={sectionRef} className="hpe-section" data-testid="hero-pressure-exhibit">
        <div className="hpe-exhibit" ref={exhibitRef}>
          <div className="hpe-copy" ref={copyRef}>
            <h1 className="hpe-h1" data-testid="hero-h1">
              <span className="sans">Strong execution. Strong performance.</span>
              <span className="serif">Regardless of conditions.</span>
            </h1>
            <p className="hpe-lede">
              Market conditions don&rsquo;t stop changing. Your ability to execute no matter what decides whether performance tanks or holds up under pressure.
            </p>
          </div>

          <div className="hpe-ghost-wrap" ref={ghostWrapRef} aria-hidden="true">
            <div className="hpe-ghost-core">
              <div className="hpe-ghost-core-text">
                <span>EXECUTION</span>
                <span>CAPABILITY</span>
                <span>ROOTED IN</span>
                <span>DISCIPLINE</span>
              </div>
            </div>
          </div>

          <div className="hpe-stage-wrap">
            <canvas
              ref={canvasRef}
              className="hpe-canvas"
              aria-label="Animated hero exhibit: varied operational pressures arrive from the left while a red performance line steps downward; a steady execution-capability core absorbs them; positive outcomes emit on the right while a green performance line steps upward."
            />
          </div>

          <div className="hpe-controls" ref={controlsRef}>
            <button ref={toggleRef} type="button">Pause</button>
            <label htmlFor="hpe-load">Operating pressure</label>
            <input ref={loadRef} id="hpe-load" type="range" min="1" max="10" defaultValue="6" />
            <span className="val" ref={loadValRef}>6</span>
            <button ref={burstRef} type="button">Surge</button>
          </div>
        </div>
      </section>
    </>
  );
}
