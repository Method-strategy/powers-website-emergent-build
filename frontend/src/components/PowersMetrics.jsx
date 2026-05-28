/* =============================================================
 * POWERS — Metrics Section (self-contained, single file)
 * =============================================================
 *
 * USAGE:
 *   import PowersMetrics from './PowersMetrics';
 *   <PowersMetrics />
 *
 * WHAT THIS IS:
 *   The 4-card stat grid (98%, 3 WKS, 500+, 30+) with count-up
 *   animation that triggers on scroll into view. No eyebrow,
 *   no closing paragraph, no separator line — just the cards.
 *
 * REQUIREMENTS:
 *   - React 17+, no external libraries
 *   - Fonts (IBM Plex Sans + Barlow Condensed) auto-injected on
 *     mount. Dedupes by id — safe with PowersHero on same page.
 *
 * CUSTOMIZATION KNOBS (search for "// TWEAK:"):
 *   - STATS array (values, suffixes, labels, descriptions)
 *   - Count-up duration
 *   - Trigger threshold for scroll-in
 *   - Stagger delay between cards
 * ============================================================= */

import { useEffect, useRef, useState, useCallback } from 'react';

/* ---------- TWEAK: stat data ---------- */
const STATS = [
  {
    value: 98,
    suffix: '%',
    label: 'Client Retention',
    description: 'Sustained improvement long after the engagement ends.',
  },
  {
    value: 5,
    suffix: ' WKS',
    label: 'Time to Impact',
    description: 'Average time from engagement start to measurable floor-level gains.',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Operations Strengthened',
    description: 'Manufacturing, processing, and distribution operations with built-in execution capability.',
  },
  {
    value: 30,
    suffix: '+',
    label: 'Years of Expertise',
    description: 'Frontline operations leadership, building execution capability where the work happens.',
  },
];

/* ---------- Font injection intentionally removed ─────────────────────
 * The original component loaded Barlow Condensed + IBM Plex Sans, but
 * the rest of the POWERS site runs on Proxima Nova (Adobe Typekit,
 * loaded globally in index.html). To keep typography consistent we
 * inherit the site font everywhere in this section. The "look and
 * feel" of the metrics block — oversized gold numerals, small tracked
 * white labels, muted body — is preserved through weight, size, and
 * letter-spacing rather than typeface choice.
 * ──────────────────────────────────────────────────────────────── */
const useFontLoader = () => {};

/* ---------- Scoped CSS (injected once, idempotent) ---------- */
const STYLE_ID = 'powers-metrics-styles';
const STYLES = `
.pm-section {
  --pm-navy-surface: #0f2a47;
  --pm-gold: #e89346;
  --pm-white: #ffffff;
  --pm-muted: #94a3b8;
  --pm-border: rgba(255, 255, 255, 0.07);
  --pm-gold-border: rgba(232, 147, 70, 0.22);

  background: var(--pm-navy-surface);
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  /* Inherit Proxima Nova from the rest of the site */
  font-family: inherit;
  box-sizing: border-box;
}
.pm-section *, .pm-section *::before, .pm-section *::after { box-sizing: border-box; }

.pm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: 100%;
  max-width: 960px;
  background: var(--pm-border);
  gap: 1px;
}

.pm-card {
  background: var(--pm-navy-surface);
  padding: 1.9rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.55s ease-out, transform 0.55s ease-out,
    border-color 0.2s ease, background 0.2s ease;
  border: 1px solid transparent;
}
.pm-card.is-visible { opacity: 1; transform: translateY(0); }
.pm-card:hover {
  background: rgba(24, 58, 97, 0.55);
  border-color: var(--pm-gold-border);
}

/* Big gold numeral — Proxima Nova 800 (matches site H2 weight) at a
   display scale. Tight tracking + line-height pulls the figure tight
   so it still reads as a "stat" not a heading. */
.pm-value {
  font-family: inherit;
  font-size: clamp(2.4rem, 4.6vw, 3.2rem);
  font-weight: 800;
  color: var(--pm-gold);
  line-height: 1;
  letter-spacing: -0.02em;
}

/* Small all-caps white label — matches the site's eyebrow rhythm
   (12px / 600 / 0.18em tracked) so it sits in the same typographic
   family as every other eyebrow on the page. */
.pm-label {
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--pm-white);
  margin-top: 0.4rem;
}

/* Muted descriptive line — matches site body-small treatment. */
.pm-desc {
  font-family: inherit;
  font-size: 13px;
  font-weight: 300;
  color: var(--pm-muted);
  line-height: 1.55;
  margin: 0.3rem 0 0;
}

@media (prefers-reduced-motion: reduce) {
  .pm-card { opacity: 1 !important; transform: none !important; transition: none !important; }
}
`;

const useStyleInjector = () => {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = STYLES;
    document.head.appendChild(style);
  }, []);
};

/* ---------- Count-up sub-component ---------- */
const CountUp = ({ target, suffix, active }) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  const animate = useCallback(() => {
    const duration = 1800; // TWEAK: count-up duration in ms
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [target]);

  useEffect(() => {
    if (!active) return;
    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, animate]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

/* ---------- Component ---------- */
const PowersMetrics = () => {
  useFontLoader();
  useStyleInjector();

  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.25 } // TWEAK: how much of the section must be visible to trigger
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pm-section" ref={sectionRef} data-testid="metrics-section">
      <div className="pm-grid">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`pm-card${active ? ' is-visible' : ''}`}
            style={{ transitionDelay: `${i * 0.12}s` }} // TWEAK: stagger between cards
            data-testid={`metric-card-${i}`}
          >
            <div className="pm-value" data-testid={`metric-value-${i}`}>
              <CountUp target={stat.value} suffix={stat.suffix} active={active} />
            </div>
            <div className="pm-label">{stat.label}</div>
            <p className="pm-desc">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PowersMetrics;
