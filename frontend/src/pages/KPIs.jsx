import React, { useEffect, useRef, useState } from 'react';
import KbPageShell from '../components/KbPageShell';
import {
  useInViewClass, NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { kpiCategories } from '../data/kpis';

/**
 * KPIs — /manufacturing-metrics
 *
 * Renders the 10 KPI category sections as scrollable editorial
 * tables. A sticky in-page nav (desktop) lets readers jump
 * between categories without losing the editorial frame.
 */

function CategorySection({ category }) {
  const ref = useRef(null);
  useInViewClass(ref, 0.08);
  return (
    <section
      id={`kpi-${category.slug}`}
      ref={ref}
      className="brief-doc-station kpi-section"
      style={{ background: PAPER }}
    >
      <div className="brief-doc-inner">
        <div className="station-index wipe">{category.title}</div>
        <h2 className="kpi-h2 wipe wipe-d1">
          <span>{category.title.replace(/ KPIs?$/i, '')}</span>
          <span className="pivot">KPIs.</span>
        </h2>
        <p className="kpi-intro wipe wipe-d2">{category.intro}</p>

        <ul className="kpi-list wipe wipe-d3">
          {category.kpis.map((k) => (
            <li key={k.name} className="kpi-row">
              <div className="kpi-row-name">{k.name}</div>
              <div className="kpi-row-def">{k.def}</div>
              <div className="kpi-row-formula">
                <span className="kpi-row-formula-label">Formula</span>
                <span className="kpi-row-formula-body">{k.formula}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StickyNav() {
  const [active, setActive] = useState(kpiCategories[0]?.slug);

  useEffect(() => {
    const sections = kpiCategories
      .map((c) => document.getElementById(`kpi-${c.slug}`))
      .filter(Boolean);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Prefer the section closest to the viewport top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const slug = visible[0].target.id.replace(/^kpi-/, '');
          setActive(slug);
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const onJump = (slug) => (e) => {
    e.preventDefault();
    const el = document.getElementById(`kpi-${slug}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="kpi-nav" aria-label="KPI categories">
      <div className="kpi-nav-eyebrow">Categories</div>
      <ul>
        {kpiCategories.map((c) => (
          <li key={c.slug}>
            <a
              href={`#kpi-${c.slug}`}
              onClick={onJump(c.slug)}
              className={active === c.slug ? 'is-active' : ''}
            >
              {c.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function KPIs() {
  return (
    <KbPageShell
      eyebrow="Knowledge Base · Manufacturing KPIs"
      titleTop="The metrics that move."
      titlePivot="Operations leaders actually use."
      lede={
        <>
          A working library of the metrics POWERS tracks alongside its clients
          — defined, contextualized, and tied to the formula behind them. Not a
          dictionary. The KPIs an operating team would actually run a Monday
          meeting against.
        </>
      }
      seoTitle="Manufacturing KPIs Library | POWERS"
      seoDescription="A categorized reference library of manufacturing KPIs — definitions and formulas for efficiency, cost, quality, maintenance, lean, and more."
      path="/manufacturing-metrics"
    >
      <div className="kpi-shell">
        <div className="kpi-shell-inner">
          <aside className="kpi-rail">
            <StickyNav />
          </aside>
          <div className="kpi-body">
            {kpiCategories.map((c) => (
              <CategorySection key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .kpi-shell-inner {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr);
          gap: 56px;
          padding: 0 max(40px, calc((100% - 1240px) / 2 + 40px));
          align-items: start;
        }
        @media (max-width: 1023px) {
          .kpi-shell-inner {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 0;
          }
        }

        .kpi-rail {
          padding-top: clamp(56px, 8vh, 96px);
          position: sticky;
          top: 140px;
          align-self: start;
          max-height: calc(100vh - 140px);
          overflow-y: auto;
        }
        @media (max-width: 1023px) { .kpi-rail { display: none; } }
        .kpi-nav {}
        .kpi-nav-eyebrow {
          font-family: ${TYPE.mono};
          font-size: 10.5px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 18px;
        }
        .kpi-nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 1px solid rgba(13, 36, 66, 0.12);
        }
        .kpi-nav li { margin: 0; }
        .kpi-nav a {
          display: block;
          padding: 10px 16px;
          font-family: ${TYPE.sans};
          font-size: 13.5px;
          line-height: 1.4;
          color: ${TEXT_BODY};
          text-decoration: none;
          border-left: 2px solid transparent;
          margin-left: -1px;
          transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
        }
        .kpi-nav a:hover { color: ${NAVY}; }
        .kpi-nav a.is-active {
          color: ${NAVY};
          border-left-color: ${GOLD_BRIGHT};
          font-weight: 600;
          background: rgba(232, 147, 70, 0.05);
        }

        .kpi-section {
          padding: clamp(56px, 8vh, 96px) 0;
          border-top: 1px solid rgba(13, 36, 66, 0.08);
        }
        .kpi-section:first-child { border-top: 0; }
        .kpi-section .brief-doc-inner {
          padding: 0;
        }
        @media (max-width: 1023px) {
          .kpi-section .brief-doc-inner {
            padding: 0 max(40px, calc((100% - 1240px) / 2 + 40px));
          }
        }

        .kpi-h2 {
          font-family: ${TYPE.sans};
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.014em;
          color: ${NAVY};
          margin: 0 0 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-wrap: balance;
        }
        .kpi-h2 .pivot {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          font-size: 1em;
          color: ${GOLD_BRIGHT};
        }
        .kpi-intro {
          font-family: ${TYPE.sans};
          font-size: 17px;
          line-height: 1.62;
          color: ${TEXT_BODY};
          margin: 0 0 36px;
          max-width: 760px;
        }

        .kpi-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(13, 36, 66, 0.12);
        }
        .kpi-row {
          display: grid;
          grid-template-columns: minmax(200px, 1.1fr) minmax(0, 1.8fr) minmax(0, 1.5fr);
          gap: 28px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(13, 36, 66, 0.10);
        }
        @media (max-width: 880px) {
          .kpi-row { grid-template-columns: 1fr; gap: 10px; }
        }
        .kpi-row-name {
          font-family: ${TYPE.sans};
          font-size: 16px;
          font-weight: 700;
          color: ${NAVY};
          line-height: 1.35;
        }
        .kpi-row-def {
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 300;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }
        .kpi-row-formula {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .kpi-row-formula-label {
          font-family: ${TYPE.mono};
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
        }
        .kpi-row-formula-body {
          font-family: ${TYPE.mono};
          font-size: 13px;
          line-height: 1.55;
          color: ${NAVY};
        }
      `}</style>
    </KbPageShell>
  );
}
