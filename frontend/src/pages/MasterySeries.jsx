import React, { useRef } from 'react';
import KbPageShell from '../components/KbPageShell';
import {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { masterySeries } from '../data/masterySeries';

/**
 * MasterySeries — /manufacturing-mastery-series
 *
 * Renders the 15 multi-part Mastery Series as a stacked editorial
 * grid. Each series row has:
 *   - mono eyebrow (publication date)
 *   - series title in NAVY sans
 *   - 2-up layout: pillar card (image + headline → pillarUrl) on
 *     the left, numbered list of part links on the right
 *
 * All pillar + part links remain absolute WP URLs (target=_blank,
 * rel=noopener noreferrer) — the legacy slug authority is preserved
 * per the launch-architecture decision.
 */

function SeriesRow({ series }) {
  const ref = useRef(null);
  useInViewClass(ref, 0.12);

  return (
    <article
      ref={ref}
      className="brief-doc-station ms-row"
      style={{
        background: PAPER,
        borderTop: `1px solid rgba(13, 36, 66, 0.08)`,
      }}
    >
      <div className="brief-doc-inner">
        <div className="station-index wipe">{series.date}</div>
        <h2 className="ms-title wipe wipe-d1">{series.title}</h2>
        <p className="ms-intro wipe wipe-d2">{series.intro}</p>
        <div className="ms-split wipe wipe-d3">
          <a
            className="ms-pillar"
            href={series.pillarUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read pillar article: ${series.pillarTitle}`}
          >
            <div className="ms-pillar-thumb">
              <img
                src={series.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ms-pillar-meta">
              <div className="ms-pillar-eyebrow">Pillar article</div>
              <h3 className="ms-pillar-title">{series.pillarTitle}</h3>
              <span className="ms-pillar-cta">
                Read the pillar
                <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
                  <path d="M0 5 H14 M10 1 L14 5 L10 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
          </a>

          <ol className="ms-parts">
            {series.parts.map((p, i) => (
              <li key={p.url} className="ms-part">
                <span className="ms-part-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <a
                  className="ms-part-link"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

export default function MasterySeries() {
  return (
    <KbPageShell
      eyebrow="Knowledge Base · Mastery Series"
      titleTop="15 deep dives."
      titlePivot="One operational thesis at a time."
      lede={
        <>
          The Mastery Series is how POWERS thinks out loud. Each entry is a
          long-form pillar paired with ten chapter articles that work the
          subject all the way through — from the symptom on the floor to the
          economics behind it. Roughly 150 articles in total, written by
          operators for operators.
        </>
      }
      seoTitle="Manufacturing Mastery Series | POWERS"
      seoDescription="15 multi-part deep dives on the topics that move operational performance — productivity, OEE, cost reduction, downtime, leadership, and more."
      path="/manufacturing-mastery-series"
    >
      <div style={{ background: PAPER_DEEP }}>
        {masterySeries.map((s) => (
          <SeriesRow key={s.slug} series={s} />
        ))}
      </div>

      <style>{`
        .ms-row { padding: clamp(56px, 8vh, 96px) 0; }
        .ms-row:first-child { border-top: 0; }

        .ms-title {
          font-family: ${TYPE.sans};
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.012em;
          color: ${NAVY};
          margin: 0 0 18px;
          text-wrap: balance;
          max-width: 900px;
        }
        .ms-intro {
          font-family: ${TYPE.sans};
          font-size: 17px;
          line-height: 1.62;
          font-weight: 400;
          color: ${TEXT_BODY};
          margin: 0 0 40px;
          max-width: 760px;
          text-wrap: pretty;
        }

        .ms-split {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) 1.35fr;
          gap: 56px;
          align-items: start;
        }
        @media (max-width: 980px) {
          .ms-split { grid-template-columns: 1fr; gap: 40px; }
        }

        .ms-pillar {
          display: block;
          color: inherit;
          text-decoration: none;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
        }
        .ms-pillar:hover {
          border-color: ${GOLD_BRIGHT};
          transform: translateY(-2px);
          box-shadow: 0 16px 32px -20px rgba(13, 36, 66, 0.35);
        }
        .ms-pillar-thumb {
          width: 100%;
          aspect-ratio: 1.91 / 1;
          background: ${NAVY};
          overflow: hidden;
        }
        .ms-pillar-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ms-pillar-meta { padding: 22px 24px 26px; }
        .ms-pillar-eyebrow {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 12px;
        }
        .ms-pillar-title {
          font-family: ${TYPE.sans};
          font-size: 19px;
          font-weight: 700;
          line-height: 1.32;
          letter-spacing: -0.005em;
          color: ${NAVY};
          margin: 0 0 18px;
          text-wrap: balance;
        }
        .ms-pillar-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: ${TYPE.sans};
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
        }
        .ms-pillar:hover .ms-pillar-cta { color: #d27d2e; }
        .ms-pillar:hover .ms-pillar-cta svg { transform: translateX(3px); }
        .ms-pillar-cta svg { transition: transform 180ms ease; }

        .ms-parts {
          list-style: none;
          margin: 0;
          padding: 0;
          counter-reset: ms-part;
          column-count: 1;
        }
        @media (min-width: 1200px) {
          .ms-parts { column-count: 2; column-gap: 36px; }
        }

        .ms-part {
          break-inside: avoid;
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 14px;
          align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid rgba(13, 36, 66, 0.08);
        }
        .ms-part-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.18em;
          color: ${GOLD_BRIGHT};
          padding-top: 2px;
        }
        .ms-part-link {
          font-family: ${TYPE.sans};
          font-size: 15.5px;
          font-weight: 500;
          line-height: 1.45;
          color: ${NAVY};
          text-decoration: none;
          transition: color 160ms ease;
        }
        .ms-part-link:hover { color: ${GOLD_BRIGHT}; }
      `}</style>
    </KbPageShell>
  );
}
