/* ════════════════════════════════════════════════════════════════════
 *  PRESSURE EXHIBIT — ROW 2  (Feb 2026 — V4 spine)
 * ════════════════════════════════════════════════════════════════════
 *
 *  Was the V4 hero. Repurposed Feb 2026 as the page's Row 2 — the
 *  *proof* row that sits below the navy typography hero. Hosts the
 *  red-descent / green-rise chart, the chip swarm, the ambient ±%
 *  number background, and the animated core. The hero above
 *  ("Strong execution. Strong performance. Regardless of conditions.")
 *  states the thesis; this row shows the diagnostic underneath.
 *
 *  Copy structure was inverted in this pass:
 *    OLD: H1 + long four-sentence lede
 *    NEW: H2 subhead (problem statement) + short italic-gold lede
 *         (the resolution clause)
 *      Subhead: "When the fundamentals are missing, performance is
 *                at the mercy of conditions."
 *      Lede:    "When they're built in, it isn't."
 *
 *  Theme inverted from dark→light: section bg back to white, copy
 *  back to navy/body, core text back to gold, controls back to
 *  navy-on-light. Animation engine unchanged.
 *
 *  CSS prefix: `hpe-*` retained for git-diff legibility — the file
 *  used to be the hero so the class lineage tells the history. (If
 *  we ever spin off another pressure exhibit on the page we'll need
 *  to rename to avoid collision, but right now this is the only one.)
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
  const numbersRef    = useRef(null); // ambient ±% number swarm (full-hero layer)
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

    /* ── Ambient ±% number swarm (background layer) ─────────────────
     * Mirrors the legacy hero's number swarm character (value/size/
     * opacity distributions identical) but hemisphere-locked by sign:
     * red negatives on the left half of the hero, green positives on
     * the right. Lives on its OWN canvas (behind everything else),
     * not the chip exhibit canvas — so the numbers appear across the
     * full hero region, including behind the H1 / lede / chart area.
     * Continuous churn (no phased cycle), capped population, low
     * opacity — reads as atmosphere, not headline. */
    const numbersCanvas = numbersRef.current;
    const nctx = numbersCanvas ? numbersCanvas.getContext('2d') : null;
    let NW = 0, NH = 0;
    const numSwarm = [];
    const NUM_RED   = '#fa4b4b';
    const NUM_GREEN = '#4dc774';
    const NUM_MAX_POP = 18;
    const NUM_SPAWN_GAP = 150; // ms between spawns
    let lastNumSpawn = 0;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let core = { x: 0, y: 0, r: 0 };

    let leftPath = null, rightPath = null;
    let lineStart = 0; // ms when the trend lines began their first cycle
    let lineCycleIdx = -1; // which cycle we're currently in; -1 sentinel = not yet started

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function aspectFor(w) {
      // Row-2 aspect ratios — taller than the hero version was
      // (the chart is now the dominant element of its row, not a
      // supporting actor in a hero), so the trend lines have proper
      // vertical room to read as trends.
      if (w < 480) return 0.56;
      if (w < 768) return 0.46;
      return 0.38;
    }
    function coreSizeFor(w) {
      // Restored to the original hero proportions — the chart band is
      // taller now (row-2 aspect), so the core can be larger without
      // crowding the trend lines.
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

      // Resize the ambient number-swarm canvas to fill the full
      // exhibit (parent of both canvases). Numbers spawn across this
      // wider field, not just within the chip-flight band.
      if (numbersCanvas && nctx) {
        const swarmCssW = exhibitEl.clientWidth;
        const swarmCssH = exhibitEl.clientHeight;
        NW = swarmCssW; NH = swarmCssH;
        numbersCanvas.style.width  = swarmCssW + 'px';
        numbersCanvas.style.height = swarmCssH + 'px';
        numbersCanvas.width  = Math.round(NW * DPR);
        numbersCanvas.height = Math.round(NH * DPR);
        nctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }
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
    let lastTs = 0;

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

    /* ── Number-swarm helpers ──────────────────────────────────────
     * Distributions are 1:1 with the legacy hero. Differences from
     * the legacy implementation:
     *   • Sign is determined by spawn hemisphere, not coin flip — red
     *     negatives only spawn on the left half, green positives only
     *     on the right.
     *   • Lifecycle is a self-contained churn (in → hold → out),
     *     not phased with a build/peak/collapse cycle. Each number
     *     spawns, peaks at its random maxOp, holds, then fades on its
     *     own schedule. New ones spawn at NUM_SPAWN_GAP ms.
     *   • Population capped at NUM_MAX_POP so the layer never gets
     *     loud enough to fight the H1/lede/chart. */
    function fmtPct(positive) {
      const mag = Math.random();
      let v;
      if (mag < 0.6) v = rand(1, 18).toFixed(0);
      else if (mag < 0.9) v = rand(18, 45).toFixed(0);
      else v = rand(45, 120).toFixed(0);
      return (positive ? '+' : '-') + v + '%';
    }
    function spawnNumber() {
      if (numSwarm.length >= NUM_MAX_POP) return;
      const positive = Math.random() < 0.5; // left/right hemisphere choice
      let size;
      const r = Math.random();
      if (r < 0.60) size = rand(13, 22);       // small everyday — 60%
      else if (r < 0.94) size = rand(22, 40);  // medium — 34%
      else size = rand(40, 72);                // large dramatic — 6%

      // Hemisphere-locked: negatives on the left, positives on the right.
      const xMin = positive ? NW * 0.52 : NW * 0.02;
      const xMax = positive ? NW * 0.98 : NW * 0.48;
      const x = rand(xMin, xMax);
      const y = rand(NH * 0.04, NH * 0.96);

      let maxOp;
      const opr = Math.random();
      if (opr < 0.65) maxOp = rand(0.06, 0.16);
      else if (opr < 0.9) maxOp = rand(0.16, 0.32);
      else maxOp = rand(0.32, 0.55);

      numSwarm.push({
        text: fmtPct(positive),
        x, y, size,
        color: positive ? NUM_GREEN : NUM_RED,
        op: 0, maxOp,
        vIn:  rand(0.012, 0.024),  // per-frame opacity rise during 'in'
        vOut: rand(0.006, 0.014),  // per-frame opacity decay during 'out'
        state: 'in',
        hold: rand(900, 2400),     // ms to hold at maxOp
        tHold: 0,
      });
    }
    function drawNumberSwarm(dtMs) {
      if (!nctx) return;
      nctx.clearRect(0, 0, NW, NH);
      for (let i = numSwarm.length - 1; i >= 0; i--) {
        const n = numSwarm[i];
        if (n.state === 'in') {
          n.op = Math.min(n.maxOp, n.op + n.vIn);
          if (n.op >= n.maxOp) n.state = 'hold';
        } else if (n.state === 'hold') {
          n.tHold += dtMs;
          if (n.tHold >= n.hold) n.state = 'out';
        } else {
          n.op -= n.vOut;
          if (n.op <= 0) { numSwarm.splice(i, 1); continue; }
        }
        nctx.globalAlpha = Math.max(0, n.op);
        nctx.fillStyle = n.color;
        nctx.font = '700 ' + n.size.toFixed(1) + 'px ' + SANS;
        nctx.textBaseline = 'middle';
        nctx.textAlign = 'center';
        nctx.fillText(n.text, n.x, n.y);
      }
      nctx.globalAlpha = 1;
    }

    function frame(ts) {
      const t = ts;
      const dtMs = lastTs ? Math.min(64, ts - lastTs) : 16; // clamp to avoid huge jumps after tab-idle
      lastTs = ts;

      // Ambient number swarm — its own canvas (behind everything),
      // continuous spawn + churn. Gated on `lineStart` so the swarm
      // begins at the same moment the trend lines do (i.e., 500ms
      // after the chip entry completes — see LINE_DELAY_AFTER_ENTRY_MS).
      // Before that, the canvas stays blank.
      if (running && nctx && NW > 0 && lineStart > 0 && ts - lastNumSpawn > NUM_SPAWN_GAP) {
        spawnNumber();
        lastNumSpawn = ts;
      }
      drawNumberSwarm(dtMs);

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
      // Play-once-on-first-entry contract.
      //
      // The exhibit lives mid-page (Row 3), so we want the entry
      // sequence to fire exactly ONCE — when the reader first scrolls
      // it into view. After that, the chart cycle, chip swarm, and
      // number swarm all run steady-state forever. Scrolling away and
      // back does NOT replay the entry.
      //
      // (Earlier rev had a replay-on-reenter contract, but that
      // caused visible hiccups: the IntersectionObserver could fire
      // multiple times during a scroll-back, calling resetExhibit()
      // mid-animation and stomping the in-flight draw loop. We
      // keep state once it's been built.)
      observer = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !entryTriggered) {
            triggerEntry();
            observer.disconnect();
            observer = null;
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
        /* ── PRESSURE EXHIBIT ROW (hpe-) — scoped to this component ─
         * Row 2 of the V4 spine. White background, navy + gold copy,
         * gold core text. The hero above sets the claim; this row
         * delivers the diagnostic + proof. */
        .hpe-section { background: ${C.paper}; }
        .hpe-exhibit {
          position: relative;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 96px 56px 80px;
        }
        /* Ambient number swarm — absolutely positioned across the full
           exhibit, behind every other layer. pointer-events:none so it
           never intercepts cursor; aria-hidden in markup. */
        .hpe-numbers {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .hpe-copy {
          max-width: 920px;
          margin: 0 auto 24px;
          text-align: center;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity .9s cubic-bezier(.22,.61,.36,1),
            transform .9s cubic-bezier(.22,.61,.36,1);
        }
        .hpe-copy.hpe-in { opacity: 1; transform: translateY(0); }

        /* H2 subhead — the diagnostic. Matches the Row 2 H2 size
           (clamp 30→46) so the two beats read at the same display
           level. Sans navy for the problem; italic-gold pivot inline
           for the resolution clause. */
        .hpe-subhead {
          font-family: ${SANS};
          font-weight: 800;
          font-size: clamp(30px, 3.6vw, 46px);
          line-height: 1.10;
          letter-spacing: -.012em;
          color: ${C.navy};
          margin: 0;
          text-wrap: pretty;
        }
        .hpe-subhead .pivot {
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 500;
          color: ${C.gold};
        }

        /* Lede — the payoff paragraph that sits below the subhead.
           Body-weight prose, navy body color, narrow column for
           readability. */
        .hpe-lede {
          font-family: ${SANS};
          font-size: clamp(16px, 1.25vw, 19px);
          font-weight: 300;
          line-height: 1.6;
          color: ${C.body};
          max-width: 720px;
          margin: 18px auto 0;
          text-wrap: pretty;
        }
        .hpe-stage-wrap { position: relative; z-index: 1; width: 100%; margin-top: 12px; }
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
          position: relative;
          z-index: 1;
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
          {/* Ambient ±% number swarm — sits BEHIND everything else
              in the hero. Red negatives spawn in the left hemisphere,
              green positives in the right. Continuous low-opacity
              churn (~28 alive max) so it reads as environmental
              atmosphere, not a feature. aria-hidden because it's
              decorative; the chart canvas below carries the
              semantic aria-label. */}
          <canvas
            ref={numbersRef}
            className="hpe-numbers"
            aria-hidden="true"
          />
          <div className="hpe-copy" ref={copyRef}>
            <h2 className="hpe-subhead">
              When execution is built on these disciplines, <span className="pivot">performance is not at the mercy of conditions.</span>
            </h2>
            <p className="hpe-lede">
              Market pressures don&rsquo;t stop. Operations built with these core disciplines as their foundation don&rsquo;t lose ground when conditions shift. They hold position, recover faster, and compound gains regardless of conditions.
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
