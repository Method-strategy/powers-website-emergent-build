import React, { useMemo, useRef, useState } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import SEO from '../components/SEO';
import BriefDocStyles, {
  useInViewClass, NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { companyNews, NEWS_CATEGORIES } from '../data/companyNews';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Company News — aggregator layout per 2026-06-29 client brief.
   ║  ─────────────────────────────────────────────────────────────
   ║  Four rows:
   ║    1. Hero          ─ "Company News" eyebrow + headline + 5-line
   ║                       lede stack ("Engagement announcements.
   ║                       Industry commentary. Leadership voices.
   ║                       Recognition and recaps. What's happening
   ║                       across POWERS…")
   ║    2. Featured grid ─ 1 large card (left) + 2 stacked smaller
   ║                       cards (right). Pulls the 3 most recent
   ║                       articles in reverse chronological order
   ║                       across the entire dataset (not the
   ║                       currently filtered subset — featured stays
   ║                       editorial regardless of filter).
   ║    3. Category bar  ─ All News / Engagements / Industry
   ║                       Commentary / Leadership / Recognition.
   ║                       Active pill underlines in gold.
   ║    4. Standard grid ─ 3-per-row card grid showing articles
   ║                       4 through 12 by default. "Load More"
   ║                       reveals the next 9 cards.
   ║
   ║  Article links go to the legacy WP URLs on thepowerscompany.com
   ║  until the native article-detail template lands. Open in new
   ║  tab so the visitor doesn't lose the React SPA context.
   ║
   ║  All selectors `cn-` prefixed.
   ╚══════════════════════════════════════════════════════════════════ */

const STANDARD_PAGE_SIZE = 9;     // articles 4-12 by default
const LOAD_MORE_INCREMENT = 9;    // batch size on Load More

/* Sort newest first by ISO date. Stable across renders. */
const SORTED = [...companyNews].sort((a, b) =>
  (b.dateISO || '').localeCompare(a.dateISO || '')
);

/* Editorial color block fallback for cards without a real article
   image. Three muted brand-aligned blocks so the grid still reads
   as a designed page even before WP supplies thumbnails. */
const PLACEHOLDER_GRADIENTS = {
  'Engagements':         `linear-gradient(135deg, ${NAVY} 0%, #1a3a5f 100%)`,
  'Industry Commentary': `linear-gradient(135deg, #2a4a3a 0%, #3d6b52 100%)`,
  'Leadership':          `linear-gradient(135deg, #8a5024 0%, #b87338 100%)`,
  'Recognition':         `linear-gradient(135deg, #4a3a6f 0%, #6b5a8f 100%)`,
};

function CardImage({ article, ratio = '16 / 9' }) {
  if (article.image) {
    return (
      <div className="cn-card-image" style={{ aspectRatio: ratio }}>
        <img src={article.image} alt="" loading="lazy" decoding="async" />
      </div>
    );
  }
  return (
    <div
      className="cn-card-image cn-card-image--placeholder"
      style={{
        aspectRatio: ratio,
        background: PLACEHOLDER_GRADIENTS[article.category] || PLACEHOLDER_GRADIENTS.Engagements,
      }}
      aria-hidden="true"
    >
      <span className="cn-card-image-mark">POWERS</span>
    </div>
  );
}

function CardLink({ article, className, children, ...rest }) {
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
    <CardLink article={article} className="cn-featured cn-featured--large">
      <CardImage article={article} ratio="16 / 10" />
      <div className="cn-card-body">
        <div className="cn-card-meta">
          <span className="cn-card-date">{article.date}</span>
          <span className="cn-card-divider" aria-hidden="true" />
          <span className="cn-card-cat">{article.category}</span>
        </div>
        <h3 className="cn-featured-title">{article.title}</h3>
        <p className="cn-featured-excerpt">{article.excerpt}</p>
        <span className="cn-card-cta">
          Read the article <span aria-hidden="true" className="cn-card-arrow">&rarr;</span>
        </span>
      </div>
    </CardLink>
  );
}

function FeaturedStacked({ article }) {
  return (
    <CardLink article={article} className="cn-featured cn-featured--stacked">
      <CardImage article={article} ratio="16 / 9" />
      <div className="cn-card-body">
        <div className="cn-card-meta">
          <span className="cn-card-date">{article.date}</span>
          <span className="cn-card-divider" aria-hidden="true" />
          <span className="cn-card-cat">{article.category}</span>
        </div>
        <h3 className="cn-stacked-title">{article.title}</h3>
        <span className="cn-card-cta">
          Read <span aria-hidden="true" className="cn-card-arrow">&rarr;</span>
        </span>
      </div>
    </CardLink>
  );
}

function StandardCard({ article }) {
  return (
    <CardLink article={article} className="cn-card">
      <CardImage article={article} ratio="16 / 9" />
      <div className="cn-card-body">
        <div className="cn-card-meta">
          <span className="cn-card-date">{article.date}</span>
          <span className="cn-card-divider" aria-hidden="true" />
          <span className="cn-card-cat">{article.category}</span>
        </div>
        <h3 className="cn-card-title">{article.title}</h3>
        <span className="cn-card-cta">
          Read <span aria-hidden="true" className="cn-card-arrow">&rarr;</span>
        </span>
      </div>
    </CardLink>
  );
}

export default function CompanyNews() {
  const heroRef     = useRef(null); useInViewClass(heroRef);
  const featuredRef = useRef(null); useInViewClass(featuredRef, 0.18);
  const filterRef   = useRef(null); useInViewClass(filterRef, 0.22);
  const gridRef     = useRef(null); useInViewClass(gridRef, 0.10);

  const [category, setCategory] = useState('All News');
  const [visible, setVisible]   = useState(STANDARD_PAGE_SIZE);

  /* Featured = the 3 most recent across the entire dataset, regardless
     of filter. The aggregator's editorial top-of-page never shifts
     when you toggle a category — only the standard grid below does. */
  const featured = SORTED.slice(0, 3);
  const featuredSlugs = new Set(featured.map(a => a.slug));

  /* Standard grid = everything else, filtered by category. */
  const standardAll = useMemo(() => {
    const pool = SORTED.filter(a => !featuredSlugs.has(a.slug));
    if (category === 'All News') return pool;
    return pool.filter(a => a.category === category);
  }, [category, featuredSlugs]);

  const standardVisible = standardAll.slice(0, visible);
  const hasMore = visible < standardAll.length;

  const onCategory = (c) => {
    setCategory(c);
    setVisible(STANDARD_PAGE_SIZE);   // reset paging on filter change
  };

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <SEO
        title="Company News & Announcements | POWERS"
        description="News and updates from POWERS. Engagement announcements, industry commentary, leadership voices, recognition, and recaps from across our manufacturing operations consulting work."
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
              <ul className="cn-hero-stack" data-testid="cn-hero-stack">
                <li className="wipe wipe-d2">Engagement announcements.</li>
                <li className="wipe wipe-d3">Industry commentary.</li>
                <li className="wipe wipe-d4">Leadership voices.</li>
                <li className="wipe wipe-d5">Recognition and recaps.</li>
              </ul>
              <p className="brief-doc-lede wipe wipe-d5" style={{ marginTop: 36, maxWidth: 720 }}>
                What&rsquo;s happening across POWERS and the work we&rsquo;re doing.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ Featured Grid ───────────────────────────── */}
        <section ref={featuredRef} className="brief-doc-station cn-featured-row" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Featured</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>The latest from the firm.</span>
              <span className="pivot">Hand-picked.</span>
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

        {/* ─── ROW 3 ─ Category Filter ─────────────────────────── */}
        <section ref={filterRef} className="cn-filter-band" data-testid="cn-filter-band">
          <div className="brief-doc-inner">
            <div className="cn-filter-label wipe">Browse by</div>
            <div className="cn-filter-pills wipe wipe-d1" role="tablist" aria-label="Filter news by category">
              {NEWS_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={category === c}
                  className={`cn-filter-pill ${category === c ? 'is-active' : ''}`}
                  onClick={() => onCategory(c)}
                  data-testid={`cn-filter-${c.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ROW 4 ─ Standard Card Grid + Load More ──────────── */}
        <section ref={gridRef} className="brief-doc-station cn-grid-station" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="cn-grid-meta wipe">
              <span className="cn-grid-count" data-testid="cn-grid-count">
                {standardAll.length} {standardAll.length === 1 ? 'article' : 'articles'}
                {category !== 'All News' && (
                  <> in <em>{category}</em></>
                )}
              </span>
            </div>

            {standardVisible.length === 0 ? (
              <div className="cn-empty" data-testid="cn-empty">
                <p>No articles in this category yet.</p>
                <button
                  type="button"
                  className="cn-empty-clear"
                  onClick={() => onCategory('All News')}
                  data-testid="cn-empty-clear"
                >
                  Show All News &rarr;
                </button>
              </div>
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
        /* ── Hero stack (Row 1) ─────────────────────────────────
           Five lines from the brief, set in serif italic with the
           lede line and a gold tick on each. Reads as an editorial
           manifest of what shows up on the page below. */
        .cn-hero-stack {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }
        .cn-hero-stack li {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(20px, 2.1vw, 26px);
          line-height: 1.32;
          color: ${NAVY};
          padding-left: 22px;
          position: relative;
          letter-spacing: -0.005em;
        }
        .cn-hero-stack li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.85em;
          width: 12px;
          height: 1px;
          background: ${GOLD_BRIGHT};
        }

        /* ── Featured grid (Row 2) ─────────────────────────────
           Magazine-style asymmetric layout. Large card spans the
           full left column at desktop (2/3 width), two stacked
           cards in the right column. Collapses to a single column
           on tablet/mobile. */
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
        .cn-featured-stack {
          gap: 28px;
        }
        .cn-featured-stack > div {
          flex: 1;
          display: flex;
        }

        /* Shared card chrome (featured + standard) */
        .cn-featured,
        .cn-card {
          display: block;
          width: 100%;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          color: ${NAVY};
          text-decoration: none;
          overflow: hidden;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1),
                      border-color 220ms ease,
                      box-shadow 220ms ease;
          position: relative;
        }
        .cn-featured { height: 100%; display: flex; flex-direction: column; }
        .cn-featured:hover,
        .cn-card:hover {
          transform: translateY(-3px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 18px 38px -22px rgba(13, 36, 66, 0.30);
        }
        .cn-featured:focus-visible,
        .cn-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 3px;
        }

        .cn-card-image {
          width: 100%;
          background: ${PAPER_DEEP};
          overflow: hidden;
          position: relative;
        }
        .cn-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 600ms cubic-bezier(.2,.6,.2,1);
        }
        .cn-featured:hover .cn-card-image img,
        .cn-card:hover .cn-card-image img {
          transform: scale(1.035);
        }
        .cn-card-image--placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cn-card-image-mark {
          font-family: ${TYPE.mono};
          font-size: 14px;
          letter-spacing: 0.42em;
          color: rgba(255, 255, 255, 0.50);
          text-transform: uppercase;
        }

        .cn-card-body {
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .cn-featured--large .cn-card-body {
          padding: 32px 36px 34px;
          gap: 16px;
        }

        .cn-card-meta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.20em;
          color: ${TEXT_BODY};
          text-transform: uppercase;
        }
        .cn-card-date { white-space: nowrap; }
        .cn-card-divider {
          width: 14px;
          height: 1px;
          background: rgba(13, 36, 66, 0.30);
        }
        .cn-card-cat {
          color: ${GOLD_BRIGHT};
          font-weight: 600;
          letter-spacing: 0.22em;
        }

        .cn-featured-title {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(24px, 2.4vw, 32px);
          line-height: 1.22;
          margin: 0;
          color: ${NAVY};
          letter-spacing: -0.012em;
        }
        .cn-featured-excerpt {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 15.5px;
          line-height: 1.6;
          color: ${TEXT_BODY};
          font-weight: 300;
        }
        .cn-stacked-title {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.28;
          margin: 0;
          color: ${NAVY};
          letter-spacing: -0.005em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .cn-card-title {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          line-height: 1.28;
          margin: 0;
          color: ${NAVY};
          letter-spacing: -0.005em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          min-height: 3.84em;
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
          padding-top: 4px;
        }
        .cn-card-arrow {
          font-size: 14px;
          letter-spacing: 0;
          transition: transform 200ms ease;
        }
        .cn-featured:hover .cn-card-arrow,
        .cn-card:hover .cn-card-arrow {
          transform: translateX(4px);
        }

        /* ── Filter band (Row 3) ─────────────────────────────── */
        .cn-filter-band {
          padding: 36px 0 32px;
          background: ${PAPER};
          border-top: 1px solid rgba(13, 36, 66, 0.08);
          border-bottom: 1px solid rgba(13, 36, 66, 0.08);
          position: relative;
          z-index: 1;
        }
        .cn-filter-band .brief-doc-inner {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }
        .cn-filter-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .cn-filter-pills {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          align-items: center;
        }
        .cn-filter-pill {
          appearance: none;
          background: transparent;
          border: none;
          padding: 10px 18px;
          font-family: ${TYPE.sans};
          font-size: 14px;
          font-weight: 500;
          color: ${TEXT_BODY};
          cursor: pointer;
          letter-spacing: -0.005em;
          position: relative;
          transition: color 200ms ease;
        }
        .cn-filter-pill::after {
          content: '';
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 6px;
          height: 1px;
          background: ${GOLD_BRIGHT};
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1);
        }
        .cn-filter-pill:hover {
          color: ${NAVY};
        }
        .cn-filter-pill:hover::after {
          transform: scaleX(0.5);
        }
        .cn-filter-pill.is-active {
          color: ${NAVY};
          font-weight: 700;
        }
        .cn-filter-pill.is-active::after {
          transform: scaleX(1);
          height: 2px;
        }
        .cn-filter-pill:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 2px;
        }

        /* ── Standard grid (Row 4) ─────────────────────────────── */
        .cn-grid-station {
          padding-top: clamp(48px, 6vh, 72px) !important;
        }
        .cn-grid-meta {
          margin-bottom: 28px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${TEXT_BODY};
          text-transform: uppercase;
        }
        .cn-grid-count em {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          color: ${GOLD_BRIGHT};
          letter-spacing: 0.02em;
          text-transform: none;
          font-size: 14px;
        }
        .cn-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
        }
        .cn-grid > div {
          display: flex;
        }

        .cn-empty {
          padding: 64px 32px;
          text-align: center;
          background: ${PAPER_DEEP};
          border: 1px dashed rgba(13, 36, 66, 0.18);
        }
        .cn-empty p {
          margin: 0 0 16px;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 18px;
          color: ${TEXT_BODY};
        }
        .cn-empty-clear {
          appearance: none;
          border: none;
          background: transparent;
          font-family: ${TYPE.mono};
          font-size: 12px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 0;
          border-bottom: 1px solid ${GOLD_BRIGHT};
        }
        .cn-empty-clear:hover { color: ${NAVY}; border-bottom-color: ${NAVY}; }

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
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .cn-hero-stack li { font-size: 18px; }
          .cn-featured-stack { grid-template-columns: 1fr; }
          .cn-featured--large .cn-card-body { padding: 24px 22px 26px; }
          .cn-card-body { padding: 18px 20px 22px; }
          .cn-grid { grid-template-columns: 1fr; gap: 22px; }
          .cn-filter-band .brief-doc-inner { gap: 14px; }
          .cn-filter-pill { padding: 8px 14px; font-size: 13.5px; }
          .cn-load-more { padding: 14px 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cn-card-image img,
          .cn-card-arrow,
          .cn-filter-pill::after,
          .cn-load-more,
          .cn-featured,
          .cn-card { transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
