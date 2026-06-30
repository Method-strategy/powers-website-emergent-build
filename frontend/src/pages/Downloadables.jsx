import React, { useRef } from 'react';
import KbPageShell from '../components/KbPageShell';
import {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { downloadables } from '../data/downloadables';

/**
 * Downloadables — /downloadables
 *
 * Editorial card grid of every quick-win tool, checklist, and
 * guide POWERS has published. All PDFs continue to live on the
 * legacy WP CDN — links open in a new tab.
 */

function DownloadCard({ item, index }) {
  // Stagger first cards across .wipe-d1 → .wipe-d4 buckets so
  // the grid reveals as a soft wave instead of all at once. The
  // .is-in trigger comes from the parent .brief-doc-station, not
  // the card itself — that's how every other interior page in this
  // design system handles the wipe choreography.
  const wipeBucket = ['', 'wipe-d1', 'wipe-d2', 'wipe-d3', 'wipe-d4'][index % 5];
  return (
    <a
      className={`dl-card wipe ${wipeBucket}`}
      href={item.pdf}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="dl-card-eyebrow">
        <span>PDF · Download</span>
        <span className="dl-card-num">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h2 className="dl-card-title">{item.title}</h2>
      <p className="dl-card-desc">{item.description}</p>
      <span className="dl-card-cta">
        Download
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M7 1 V9 M3.5 6 L7 9.5 L10.5 6 M2 12 H12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        </svg>
      </span>
    </a>
  );
}

export default function Downloadables() {
  const sectionRef = useRef(null);
  useInViewClass(sectionRef, 0.08);
  return (
    <KbPageShell
      eyebrow="Knowledge Base · Downloadables"
      titleTop="Field-ready tools."
      titlePivot="Built for the floor."
      lede={
        <>
          One-page checklists, audits, and frameworks you can put to work on the
          next shift. Each download distills a POWERS engagement pattern into a
          tool a frontline leader can pick up and use without a translator.
        </>
      }
      seoTitle="Downloadables | POWERS Knowledge Base"
      seoDescription="Field-ready guides, checklists, and frameworks from POWERS — ready to put to work on your next shift."
      path="/downloadables"
    >
      <section
        ref={sectionRef}
        className="brief-doc-station"
        style={{ background: PAPER_DEEP, paddingTop: 'clamp(40px, 6vh, 80px)' }}
      >
        <div className="brief-doc-inner">
          <div className="dl-grid">
            {downloadables.map((d, i) => (
              <DownloadCard key={d.slug} item={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .dl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .dl-card {
          display: flex;
          flex-direction: column;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.12);
          padding: 28px 26px 26px;
          color: inherit;
          text-decoration: none;
          transition:
            border-color 200ms ease,
            transform 200ms ease,
            box-shadow 200ms ease;
          min-height: 280px;
        }
        .dl-card:hover {
          border-color: ${GOLD_BRIGHT};
          transform: translateY(-3px);
          box-shadow: 0 18px 30px -22px rgba(13, 36, 66, 0.4);
        }
        .dl-card-eyebrow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: ${TYPE.mono};
          font-size: 10.5px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 18px;
        }
        .dl-card-num { color: rgba(13, 36, 66, 0.4); }
        .dl-card-title {
          font-family: ${TYPE.sans};
          font-size: 19px;
          font-weight: 700;
          line-height: 1.28;
          letter-spacing: -0.005em;
          color: ${NAVY};
          margin: 0 0 12px;
          text-wrap: balance;
        }
        .dl-card-desc {
          font-family: ${TYPE.sans};
          font-size: 14.5px;
          line-height: 1.55;
          font-weight: 300;
          color: ${TEXT_BODY};
          margin: 0 0 24px;
          flex: 1;
          text-wrap: pretty;
        }
        .dl-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: ${TYPE.sans};
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          border-top: 1px solid rgba(232, 147, 70, 0.3);
          padding-top: 18px;
          margin-top: auto;
        }
        .dl-card:hover .dl-card-cta { color: #d27d2e; }
        .dl-card:hover .dl-card-cta svg { transform: translateY(2px); }
        .dl-card-cta svg { transition: transform 180ms ease; }
      `}</style>
    </KbPageShell>
  );
}
