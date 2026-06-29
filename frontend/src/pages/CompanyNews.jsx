import React, { useRef, useState } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import SEO from '../components/SEO';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { companyNews } from '../data/companyNews';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Company News — engagement announcements aggregator.
   ║
   ║  Scope (per 2026-06-29 client direction): this page lists
   ║  ENGAGEMENT ANNOUNCEMENTS only. Editorial / industry
   ║  commentary / leadership voices live on the Insights Hub.
   ║  Because there's only one content type, the category filter
   ║  from the earlier draft is dropped — the "filter" is the page
   ║  itself.
   ║
   ║  No featured images: cards are pure typographic. Matches the
   ║  rest of the Operating Brief design system better than
   ║  thumbnail-driven cards, and removes the dependency on legacy
   ║  WP image paths during the React port.
   ║
   ║  Three rows:
   ║    1. Hero          ─ eyebrow + H1 + lede
   ║    2. Featured      ─ 1 wide top card + 2 stacked smaller cards
   ║                       (3 most recent engagements, text-only)
   ║    3. Standard grid ─ remaining engagements in a 3-up grid
   ║                       with "Load More" pagination
   ║
   ║  All selectors `cn-` prefixed.
   ╚══════════════════════════════════════════════════════════════════ */

const STANDARD_PAGE_SIZE = 12;     // 4 rows × 3 cols — a natural visual page
const LOAD_MORE_INCREMENT = 12;

const SORTED = [...companyNews].sort((a, b) =>
  (b.dateISO || '').localeCompare(a.dateISO || '')
);

function NewsLink({ article, className, children, ...rest }) {
  return (
    <a
      className={className}
      href={article.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`cn-card-${article.slug}`}
      {...rest}
    >
      {children}
    </a>
  );
}

function FeaturedLarge({ article }) {
  return (
    <NewsLink article={article} className="cn-card cn-card--featured-large">
      <div className="cn-card-meta">
        <span className="cn-card-date">{article.date}</span>
      </div>
      <h3 className="cn-card-title cn-card-title--xl">{article.title}</h3>
      <p className="cn-card-excerpt">{article.excerpt}</p>
      <span className="cn-card-cta">
        Read the article <span aria-hidden="true" className="cn-card-arrow">&rarr;</span>
      </span>
    </NewsLink>
  );
}

function FeaturedStacked({ article }) {
  return (
    <NewsLink article={article} className="cn-card cn-card--featured-stacked">
      <div className="cn-card-meta">
        <span className="cn-card-date">{article.date}</span>
      </div>
      <h3 className="cn-card-title cn-card-title--md">{article.title}</h3>
      <span className="cn-card-cta">
        Read <span aria-hidden="true" className="cn-card-arrow">&rarr;</span>
      </span>
    </NewsLink>
  );
}

function StandardCard({ article }) {
  return (
    <NewsLink article={article} className="cn-card cn-card--standard">
      <div className="cn-card-meta">
        <span className="cn-card-date">{article.date}</span>
      </div>
      <h3 className="cn-card-title cn-card-title--sm">{article.title}</h3>
      <p className="cn-card-excerpt cn-card-excerpt--clamp">{article.excerpt}</p>
      <span className="cn-card-cta">
        Read <span aria-hidden="true" className="cn-card-arrow">&rarr;</span>
      </span>
    </NewsLink>
  );
}

export default function CompanyNews() {
  const heroRef     = useRef(null); useInViewClass(heroRef);
  const featuredRef = useRef(null); useInViewClass(featuredRef, 0.18);
  const gridRef     = useRef(null); useInViewClass(gridRef, 0.10);

  const [visible, setVisible] = useState(STANDARD_PAGE_SIZE);

  const featured = SORTED.slice(0, 3);
  const standardAll = SORTED.slice(3);
  const standardVisible = standardAll.slice(0, visible);
  const hasMore = visible < standardAll.length;

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <SEO
        title="Company News & Engagement Announcements | POWERS"
        description="Engagement announcements from POWERS — partnerships with manufacturers across food and beverage, aerospace and defense, industrial, dairy, plastics, and safety sectors."
        path="/company-news"
      />
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>

        {/* ─── ROW 1 ─ Hero ────────────────────────────────────── */}
        <section ref={heroRef} className="brief-page-hero">
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>Company News</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="cn-hero-h1">
                <span>News and updates</span>
                <span className="accent">from POWERS.</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 48, marginBottom: 36 }} />
              <p className="brief-doc-lede wipe wipe-d4" style={{ maxWidth: 720 }}>
                New partnerships. Repeat engagements. The operators choosing to build with us across food and beverage, aerospace and defense, industrial, and the sectors where execution decides the outcome.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ Featured (3 most recent, text-only) ─────── */}
        <section ref={featuredRef} className="brief-doc-station cn-featured-row" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Latest</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Featured stories of new partnerships</span>
              <span className="pivot">and operational improvement.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="cn-featured-grid" data-testid="cn-featured-grid">
              <div className="cn-featured-large wipe wipe-d3">
                <FeaturedLarge article={featured[0]} />
              </div>
              <div className="cn-featured-stack">
                <div className="wipe wipe-d4">
                  <FeaturedStacked article={featured[1]} />
                </div>
                <div className="wipe wipe-d5">
                  <FeaturedStacked article={featured[2]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROW 3 ─ Standard grid + Load More ───────────────── */}
        <section ref={gridRef} className="brief-doc-station cn-grid-station" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <h2 className="brief-doc-h2 wipe">
              <span>Earlier news and engagements.</span>
              <span className="pivot">Partnerships, promotions, milestones, and the work behind them.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d1" />

            <div className="cn-grid-meta wipe wipe-d2">
              <span className="cn-grid-count" data-testid="cn-grid-count">
                {standardAll.length} {standardAll.length === 1 ? 'announcement' : 'announcements'}
              </span>
            </div>

            {standardVisible.length === 0 ? (
              <p className="cn-empty" data-testid="cn-empty">
                More announcements coming soon.
              </p>
            ) : (
              <div className="cn-grid" data-testid="cn-grid">
                {standardVisible.map((a, i) => (
                  <div key={a.slug} className={`wipe wipe-d${Math.min(6, (i % 6) + 1)}`}>
                    <StandardCard article={a} />
                  </div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="cn-load-more-wrap">
                <button
                  type="button"
                  className="cn-load-more"
                  onClick={() => setVisible(v => v + LOAD_MORE_INCREMENT)}
                  data-testid="cn-load-more"
                >
                  Load More <span aria-hidden="true" className="cn-load-more-arrow">&rarr;</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <BriefFooter />

      <style>{`
        /* ── Featured grid (Row 2) ─────────────────────────────
           Magazine-style asymmetric: 1 large card (2/3 width on
           desktop) + 2 stacked smaller cards in the right column.
           Text-only — no images. Card chrome is the cream paper
           surface with a gold inner border that warms on hover. */
        .cn-featured-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .cn-featured-large,
        .cn-featured-stack {
          display: flex;
          flex-direction: column;
        }
        .cn-featured-stack { gap: 28px; }
        .cn-featured-stack > div { flex: 1; display: flex; }

        /* ── Shared card chrome ────────────────────────────────
           One base class (.cn-card) — three size variants for the
           three contexts. All text-only. The gold left-edge rule
           is the only ornament — fills in on hover so the card
           still feels like it "responds" without an image. */
        .cn-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          color: ${NAVY};
          text-decoration: none;
          padding: 28px 32px 30px;
          position: relative;
          overflow: hidden;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1),
                      border-color 220ms ease,
                      box-shadow 220ms ease;
        }
        .cn-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: ${GOLD_BRIGHT};
          transform: scaleY(0);
          transform-origin: top center;
          transition: transform 320ms cubic-bezier(.2,.6,.2,1);
        }
        .cn-card:hover {
          transform: translateY(-3px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 18px 38px -22px rgba(13, 36, 66, 0.30);
        }
        .cn-card:hover::before { transform: scaleY(1); }
        .cn-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 3px;
        }
        .cn-card--featured-large {
          padding: 44px 48px 46px;
          flex: 1;
          justify-content: flex-start;
          gap: 20px;
        }
        .cn-card--featured-stacked {
          padding: 28px 32px 30px;
          flex: 1;
          gap: 14px;
        }
        .cn-card--standard {
          padding: 28px 30px 30px;
          flex: 1;
          gap: 14px;
        }

        .cn-card-meta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.22em;
          color: ${TEXT_BODY};
          text-transform: uppercase;
        }
        .cn-card-date { white-space: nowrap; }
        .cn-card-divider {
          width: 14px;
          height: 1px;
          background: rgba(13, 36, 66, 0.30);
        }
        .cn-card-kicker {
          color: ${GOLD_BRIGHT};
          font-weight: 600;
          letter-spacing: 0.24em;
        }

        .cn-card-title {
          font-family: ${TYPE.sans};
          font-weight: 700;
          color: ${NAVY};
          margin: 0;
          letter-spacing: -0.008em;
        }
        .cn-card-title--xl {
          font-size: clamp(26px, 2.6vw, 34px);
          line-height: 1.18;
        }
        .cn-card-title--md {
          font-size: 17px;
          line-height: 1.28;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
        .cn-card-title--sm {
          font-size: 17px;
          line-height: 1.28;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          min-height: 3.84em;
        }

        .cn-card-excerpt {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 15px;
          line-height: 1.6;
          color: ${TEXT_BODY};
          font-weight: 300;
        }
        .cn-card-excerpt--clamp {
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .cn-card-cta {
          margin-top: auto;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-top: 8px;
        }
        .cn-card-arrow {
          font-size: 14px;
          letter-spacing: 0;
          transition: transform 200ms ease;
        }
        .cn-card:hover .cn-card-arrow { transform: translateX(4px); }

        /* ── Standard grid ────────────────────────────────────── */
        .cn-grid-meta {
          margin-bottom: 28px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${TEXT_BODY};
          text-transform: uppercase;
        }
        .cn-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .cn-grid > div { display: flex; }

        .cn-empty {
          padding: 56px 32px;
          text-align: center;
          background: ${PAPER_DEEP};
          border: 1px dashed rgba(13, 36, 66, 0.18);
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 17px;
          color: ${TEXT_BODY};
        }

        .cn-load-more-wrap {
          margin-top: 56px;
          display: flex;
          justify-content: center;
        }
        .cn-load-more {
          appearance: none;
          font-family: ${TYPE.mono};
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${NAVY};
          background: transparent;
          border: 2px solid ${NAVY};
          padding: 16px 36px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: background 200ms ease, color 200ms ease, border-color 200ms ease, transform 200ms ease;
        }
        .cn-load-more:hover {
          background: ${NAVY};
          color: ${PAPER};
          transform: translateY(-1px);
        }
        .cn-load-more:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 3px;
        }
        .cn-load-more-arrow { font-size: 16px; }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .cn-featured-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .cn-featured-stack {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .cn-grid { grid-template-columns: repeat(2, 1fr); }
          .cn-card--featured-large {
            padding: 36px 36px 38px;
          }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .cn-featured-stack { grid-template-columns: 1fr; }
          .cn-card--featured-large { padding: 28px 24px 30px; }
          .cn-card--featured-stacked,
          .cn-card--standard { padding: 24px 22px 26px; }
          .cn-grid { grid-template-columns: 1fr; gap: 18px; }
          .cn-load-more { padding: 14px 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cn-card,
          .cn-card::before,
          .cn-card-arrow,
          .cn-load-more { transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
