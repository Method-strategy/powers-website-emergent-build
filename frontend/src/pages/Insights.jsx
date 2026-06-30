import React, { useMemo, useRef, useState } from 'react';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import SEO from '../components/SEO';
import BriefDocStyles, {
  useInViewClass, NAVY, NAVY_DEEP, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { insights, WP_SEARCH_BASE } from '../data/insights';
import { knowledgeBase } from '../data/knowledgeBase';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Insights Hub — POWERS blog aggregator + Knowledge Base hub.
   ║
   ║  Six rows, in order:
   ║    1. Hero                ─ "Decades of operational insights…"
   ║                             + 5-discipline italic stack + cross-
   ║                             cutting dimensions sub-stack
   ║    2. Knowledge Base row  ─ 5 destination cards with promo blurbs
   ║                             (Mastery / KPIs / Glossary / FAQs /
   ║                             Downloadables) — placed here per
   ║                             2026-06-29 architectural decision
   ║                             (no floating side rail).
   ║    3. Featured + Top      ─ 1 large featured card (left) + 2
   ║                             stacked smaller cards (right). Real
   ║                             article images for editorial weight.
   ║    4. Search bar          ─ keyword/phrase input, client-side
   ║                             filter on local cards, with an
   ║                             explicit escape hatch to the WP
   ║                             full-archive search. No category
   ║                             filter (content isn't catalogued).
   ║    5. Standard grid       ─ 3-up card grid, 9 per page, Load
   ║                             More batches of 9. Image + meta +
   ║                             title + Read CTA per card.
   ║    6. Footer              ─ canonical BriefFooter
   ║
   ║  Article links go to the live legacy URLs on
   ║  thepowerscompany.com/resources/{slug}/ — preserves WP SEO
   ║  authority while the native React article-detail template is
   ║  still pending.
   ║
   ║  All selectors `ih-` prefixed (Insights Hub).
   ╚══════════════════════════════════════════════════════════════════ */

const STANDARD_PAGE_SIZE = 12;   // 3 rows × 4 cols — a natural visual page
const LOAD_MORE_INCREMENT = 12;

const SORTED = [...insights].sort((a, b) =>
  (b.dateISO || '').localeCompare(a.dateISO || '')
);

/* Discipline-tinted gradient fallback for placeholder cards (until
   WP supplies real images). Same family as Company News card
   fallback — but keyed to the five POWERS disciplines instead of
   news categories. Stays muted so it never competes with real
   article photography next to it. */
const DISCIPLINE_GRADIENTS = {
  'Operational Discipline': `linear-gradient(135deg, ${NAVY} 0%, #1a3a5f 100%)`,
  'Frontline Leadership':   `linear-gradient(135deg, #8a5024 0%, #b87338 100%)`,
  'Equipment Reliability':  `linear-gradient(135deg, #2a4a3a 0%, #3d6b52 100%)`,
  'Workforce Capability':   `linear-gradient(135deg, #4a3a6f 0%, #6b5a8f 100%)`,
  'Daily Accountability':   `linear-gradient(135deg, #5a4520 0%, #8a6d34 100%)`,
};

function ArticleImage({ article }) {
  if (article.image) {
    return (
      <div className="ih-card-image">
        <img src={article.image} alt="" loading="lazy" decoding="async" />
      </div>
    );
  }
  return (
    <div
      className="ih-card-image ih-card-image--fallback"
      style={{
        background: DISCIPLINE_GRADIENTS[article.discipline] || DISCIPLINE_GRADIENTS['Operational Discipline'],
      }}
      aria-hidden="true"
    >
      <span className="ih-card-image-mark">{article.discipline}</span>
    </div>
  );
}

function ArticleLink({ article, className, children, ...rest }) {
  return (
    <a
      className={className}
      href={article.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`ih-card-${article.slug}`}
      {...rest}
    >
      {children}
    </a>
  );
}

function FeaturedLarge({ article }) {
  return (
    <ArticleLink article={article} className="ih-card ih-card--featured-large">
      <ArticleImage article={article} />
      <div className="ih-card-body">
        <div className="ih-card-meta">
          <span className="ih-card-date">{article.date}</span>
          <span className="ih-card-divider" aria-hidden="true" />
          <span className="ih-card-discipline">{article.discipline}</span>
        </div>
        <h3 className="ih-card-title ih-card-title--xl">{article.title}</h3>
        <p className="ih-card-excerpt">{article.excerpt}</p>
        <div className="ih-card-foot">
          <span className="ih-card-byline">By {article.author}</span>
          <span className="ih-card-cta">
            Read the article <span aria-hidden="true" className="ih-card-arrow">&rarr;</span>
          </span>
        </div>
      </div>
    </ArticleLink>
  );
}

function FeaturedStacked({ article }) {
  return (
    <ArticleLink article={article} className="ih-card ih-card--featured-stacked">
      <ArticleImage article={article} />
      <div className="ih-card-body">
        <div className="ih-card-meta">
          <span className="ih-card-date">{article.date}</span>
          <span className="ih-card-divider" aria-hidden="true" />
          <span className="ih-card-discipline">{article.discipline}</span>
        </div>
        <h3 className="ih-card-title ih-card-title--md">{article.title}</h3>
        <div className="ih-card-foot">
          <span className="ih-card-byline">By {article.author}</span>
          <span className="ih-card-cta">
            Read <span aria-hidden="true" className="ih-card-arrow">&rarr;</span>
          </span>
        </div>
      </div>
    </ArticleLink>
  );
}

function StandardCard({ article }) {
  return (
    <ArticleLink article={article} className="ih-card ih-card--standard">
      <ArticleImage article={article} />
      <div className="ih-card-body">
        <div className="ih-card-meta">
          <span className="ih-card-date">{article.date}</span>
          <span className="ih-card-divider" aria-hidden="true" />
          <span className="ih-card-discipline">{article.discipline}</span>
        </div>
        <h3 className="ih-card-title ih-card-title--sm">{article.title}</h3>
        <span className="ih-card-byline">By {article.author}</span>
        <span className="ih-card-cta">
          Read <span aria-hidden="true" className="ih-card-arrow">&rarr;</span>
        </span>
      </div>
    </ArticleLink>
  );
}

function KnowledgeBaseCard({ destination, index }) {
  return (
    <a
      className="ih-kb-card"
      href={destination.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`ih-kb-${destination.slug}`}
    >
      <span className="ih-kb-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="ih-kb-body">
        <div className="ih-kb-badge">{destination.badge}</div>
        <h3 className="ih-kb-label">{destination.label}</h3>
        <p className="ih-kb-blurb">{destination.blurb}</p>
      </div>
      <span className="ih-kb-cta" aria-hidden="true">
        Open <span className="ih-kb-arrow">&rarr;</span>
      </span>
    </a>
  );
}

export default function Insights() {
  const heroRef     = useRef(null); useInViewClass(heroRef);
  const kbRef       = useRef(null); useInViewClass(kbRef, 0.10);
  const featuredRef = useRef(null); useInViewClass(featuredRef, 0.18);
  const searchRef   = useRef(null); useInViewClass(searchRef, 0.22);
  const gridRef     = useRef(null); useInViewClass(gridRef, 0.10);

  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(STANDARD_PAGE_SIZE);

  /* Featured = top 3 most recent across the unfiltered dataset.
     The editorial top of the page is editorially fixed — searches
     filter the standard grid below, not the featured set. */
  const featured = SORTED.slice(0, 3);
  const featuredSlugs = useMemo(
    () => new Set(featured.map(a => a.slug)),
    [featured]
  );

  /* Standard pool = everything else. Search applies here. */
  const standardAll = useMemo(() => {
    const pool = SORTED.filter(a => !featuredSlugs.has(a.slug));
    const query = q.trim().toLowerCase();
    if (!query) return pool;
    return pool.filter(a => {
      const hay = `${a.title} ${a.excerpt} ${a.author} ${a.discipline}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, featuredSlugs]);

  const standardVisible = standardAll.slice(0, visible);
  const hasMore = visible < standardAll.length;

  const onSearchChange = (e) => {
    setQ(e.target.value);
    setVisible(STANDARD_PAGE_SIZE);
  };
  const clearSearch = () => {
    setQ('');
    setVisible(STANDARD_PAGE_SIZE);
  };

  const wpSearchUrl = q.trim()
    ? `${WP_SEARCH_BASE}${encodeURIComponent(q.trim())}`
    : 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/';

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <SEO
        title="Manufacturing Operations Insights & Knowledge Base | POWERS"
        description="Decades of operational insights from POWERS — articles, deep-dive series, KPIs, glossary, FAQs, and downloadables on the disciplines that drive sustained manufacturing performance."
        path="/insights"
      />
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>

        {/* ─── ROW 1 ─ Hero ────────────────────────────────────── */}
        <section ref={heroRef} className="brief-page-hero">
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>Insights Hub</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="ih-hero-h1">
                <span>Decades of operational insights driving</span>
                <span className="accent">stronger execution. Stronger performance.</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 48, marginBottom: 36 }} />
              <p className="brief-doc-lede wipe wipe-d4">
                We&rsquo;ve been writing on what we&rsquo;ve observed and executed on thousands of shop floors, solving the most embedded operational challenges manufacturers face.
              </p>
              <p className="brief-doc-lede wipe wipe-d5" style={{ marginTop: 24 }}>
                The disciplines that drive sustainable performance &mdash; operational discipline, frontline leadership, equipment reliability, workforce capability, daily accountability &mdash; and the dimensions that cut across all five: continuous improvement, cost reduction, capacity utilization, root cause analysis, profitability.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ Featured + Top Stories (moved up per client) ── */}
        <section ref={featuredRef} className="brief-doc-station ih-featured-row" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Featured</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>The latest from the field,</span>
              <span className="pivot">and the conversations ops leaders are having now.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="ih-featured-grid" data-testid="ih-featured-grid">
              <div className="ih-featured-large wipe wipe-d3">
                <FeaturedLarge article={featured[0]} />
              </div>
              <div className="ih-featured-stack">
                <div className="wipe wipe-d4">
                  <FeaturedStacked article={featured[1]} />
                </div>
                <div className="wipe wipe-d5">
                  <FeaturedStacked article={featured[2]} />
                </div>
              </div>
            </div>

            {/* In-page anchor jump: lets the visitor skip past the
                Knowledge Base + search and dive straight into the
                full article archive below. */}
            <div className="ih-featured-jump wipe wipe-d6">
              <a
                href="#insights-archive"
                className="ih-featured-jump-link"
                data-testid="ih-featured-jump"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('insights-archive')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Browse the full insights archive
                <span aria-hidden="true" className="ih-featured-jump-arrow">&darr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── ROW 3 ─ Knowledge Base (moved down from Row 2) ─── */}
        <section ref={kbRef} className="brief-doc-station ih-kb-station" style={{ background: NAVY }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>Knowledge Base</div>
            <h2 className="brief-doc-h2 wipe wipe-d1 ih-kb-h2">
              <span style={{ color: PAPER }}>Structured resources.</span>
              <span className="pivot">Built by practitioners, for practitioners.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="ih-kb-grid" data-testid="ih-kb-grid">
              {knowledgeBase.map((d, i) => (
                <div key={d.slug} className={`wipe wipe-d${Math.min(6, i + 3)}`}>
                  <KnowledgeBaseCard destination={d} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ROW 4 ─ Search Bar ───────────────────────────── */}
        {/* NOTE: children intentionally do NOT use the .wipe entrance
            animation. The .wipe reveal selector keys off
            `.brief-doc-station.is-in` / `.brief-page-hero.is-in`
            (see BriefDocStyles.jsx line ~355). This section uses its
            own .ih-search-band class, so wipe children would stay
            permanently clipped. Render the search controls statically. */}
        <section ref={searchRef} className="ih-search-band" data-testid="ih-search-band" id="insights-archive">
          <div className="brief-doc-inner">
            <label htmlFor="ih-search-input" className="ih-search-label">
              Search the insights
            </label>
            <div className="ih-search-row">
              <div className="ih-search-input-wrap">
                <span className="ih-search-icon" aria-hidden="true">&#x2315;</span>
                <input
                  id="ih-search-input"
                  type="search"
                  className="ih-search-input"
                  placeholder="Search insights by topic, keyword, or phrase…"
                  value={q}
                  onChange={onSearchChange}
                  data-testid="ih-search-input"
                  autoComplete="off"
                />
                {q && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="ih-search-clear"
                    aria-label="Clear search"
                    data-testid="ih-search-clear"
                  >
                    &times;
                  </button>
                )}
              </div>
              <a
                className="ih-search-archive"
                href={wpSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="ih-search-archive"
              >
                Search the full archive <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="ih-search-help">
              Search across the most recent articles below. The full archive on POWERS.com has hundreds more.
            </p>
          </div>
        </section>

        {/* ─── ROW 5 ─ Standard Article Grid ──────────────────── */}
        <section ref={gridRef} className="brief-doc-station ih-grid-station" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">More Insights</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>More from the field.</span>
              <span className="pivot">Practitioner perspectives on why building execution capability is a competitive advantage.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="ih-grid-meta wipe wipe-d3">
              <span className="ih-grid-count" data-testid="ih-grid-count">
                {q.trim() ? (
                  <>{standardAll.length} {standardAll.length === 1 ? 'article' : 'articles'} matching <em>&ldquo;{q.trim()}&rdquo;</em></>
                ) : (
                  <>Showing the most recent articles &mdash; hundreds more in the full archive</>
                )}
              </span>
            </div>

            {standardVisible.length === 0 ? (
              <div className="ih-empty" data-testid="ih-empty">
                <p>No articles in the local cache match <em>&ldquo;{q.trim()}&rdquo;</em>.</p>
                <a
                  className="ih-empty-archive"
                  href={wpSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="ih-empty-archive"
                >
                  Search the full archive on POWERS.com <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            ) : (
              <div className="ih-grid" data-testid="ih-grid">
                {standardVisible.map((a, i) => (
                  <div key={a.slug} className={`wipe wipe-d${Math.min(6, (i % 6) + 1)}`}>
                    <StandardCard article={a} />
                  </div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="ih-load-more-wrap">
                <button
                  type="button"
                  className="ih-load-more"
                  onClick={() => setVisible(v => v + LOAD_MORE_INCREMENT)}
                  data-testid="ih-load-more"
                >
                  Load More <span aria-hidden="true" className="ih-load-more-arrow">&rarr;</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <BriefFooter />

      <style>{`
        /* ── Hero foundations (2-column grid below the lede) ─
           Tightens the hero vertically by setting the disciplines
           list and cross-cutting dimensions list side-by-side. Sits
           OUTSIDE .brief-doc-col so it spans the full inner width. */
        .ih-hero-foundations {
          margin-top: 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .ih-hero-foundations-col {}
        .ih-hero-pillar-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.26em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .ih-hero-stack {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }
        .ih-hero-stack li {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 400;
          font-size: clamp(18px, 1.6vw, 21px);
          line-height: 1.32;
          color: ${NAVY};
          padding-left: 22px;
          position: relative;
          letter-spacing: -0.005em;
        }
        .ih-hero-stack li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.85em;
          width: 12px;
          height: 1px;
          background: ${GOLD_BRIGHT};
        }

        /* ── Featured row — jump to archive ──────────────────
           At the end of the featured row, a soft typographic CTA
           that scrolls past the Knowledge Base + search and lands
           on the standard article grid. Keeps the editorial top of
           the page strong while letting the article-hungry visitor
           skip the structural content cleanly. */
        .ih-featured-jump {
          margin-top: 56px;
          display: flex;
          justify-content: center;
        }
        .ih-featured-jump-link {
          font-family: ${TYPE.mono};
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${NAVY};
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 28px;
          border-top: 1px solid rgba(13, 36, 66, 0.20);
          border-bottom: 1px solid rgba(13, 36, 66, 0.20);
          transition: color 200ms ease, border-color 200ms ease;
        }
        .ih-featured-jump-link:hover {
          color: ${GOLD_BRIGHT};
          border-top-color: ${GOLD_BRIGHT};
          border-bottom-color: ${GOLD_BRIGHT};
        }
        .ih-featured-jump-link:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 4px;
        }
        .ih-featured-jump-arrow {
          font-size: 16px;
          letter-spacing: 0;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1);
        }
        .ih-featured-jump-link:hover .ih-featured-jump-arrow {
          transform: translateY(3px);
        }

        /* ── Knowledge Base row (dark, premium) ────────────────
           Five typographic "shelves" — numbered, with a small
           badge over the label, a long descriptive blurb, and a
           gold arrow CTA. The dark navy background sets KB apart
           visually from the article-aggregator rows above and
           below, signalling "this is structural content, not the
           news stream." */
        .ih-kb-station {
          color: ${PAPER};
        }
        .ih-kb-h2 .pivot { color: ${GOLD_BRIGHT}; }
        .ih-kb-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-top: 1px solid rgba(232, 147, 70, 0.20);
        }
        .ih-kb-card {
          display: grid;
          grid-template-columns: 64px 1fr auto;
          gap: 28px;
          align-items: center;
          padding: 28px 0;
          border-bottom: 1px solid rgba(232, 147, 70, 0.20);
          color: ${PAPER};
          text-decoration: none;
          position: relative;
          transition: background 220ms ease, padding-left 220ms ease;
        }
        .ih-kb-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: ${GOLD_BRIGHT};
          transform: scaleY(0);
          transform-origin: top center;
          transition: transform 320ms cubic-bezier(.2,.6,.2,1);
        }
        .ih-kb-card:hover {
          background: rgba(232, 147, 70, 0.06);
          padding-left: 16px;
        }
        .ih-kb-card:hover::before { transform: scaleY(1); }
        .ih-kb-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 4px;
        }
        .ih-kb-num {
          font-family: ${TYPE.mono};
          font-size: 13px;
          letter-spacing: 0.18em;
          color: ${GOLD_BRIGHT};
          opacity: 0.75;
        }
        .ih-kb-body { min-width: 0; }
        .ih-kb-badge {
          display: inline-block;
          font-family: ${TYPE.mono};
          font-size: 10px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          padding: 3px 8px;
          border: 1px solid rgba(232, 147, 70, 0.40);
          margin-bottom: 10px;
        }
        .ih-kb-label {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: clamp(22px, 2.2vw, 28px);
          line-height: 1.18;
          letter-spacing: -0.012em;
          color: ${PAPER};
          margin: 0 0 8px;
        }
        .ih-kb-blurb {
          font-family: ${TYPE.sans};
          font-size: 15px;
          line-height: 1.55;
          color: rgba(251, 250, 246, 0.72);
          font-weight: 300;
          margin: 0;
          max-width: 720px;
        }
        .ih-kb-cta {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .ih-kb-arrow {
          font-size: 14px;
          letter-spacing: 0;
          transition: transform 200ms ease;
        }
        .ih-kb-card:hover .ih-kb-arrow { transform: translateX(4px); }

        /* ── Featured + Top Stories row ──────────────────────── */
        .ih-featured-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .ih-featured-large,
        .ih-featured-stack { display: flex; flex-direction: column; }
        .ih-featured-stack { gap: 28px; }
        .ih-featured-stack > div { flex: 1; display: flex; }

        /* ── Shared article card ────────────────────────────── */
        .ih-card {
          display: block;
          width: 100%;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          color: ${NAVY};
          text-decoration: none;
          overflow: hidden;
          position: relative;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1),
                      border-color 220ms ease,
                      box-shadow 220ms ease;
        }
        .ih-card--featured-large,
        .ih-card--featured-stacked { height: 100%; display: flex; flex-direction: column; }
        .ih-card:hover {
          transform: translateY(-3px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 18px 38px -22px rgba(13, 36, 66, 0.30);
        }
        .ih-card:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 3px;
        }

        .ih-card-image {
          width: 100%;
          background: ${PAPER_DEEP};
          overflow: hidden;
          position: relative;
          /* Match the legacy WP thumbnail crop (1200x627 → 768x401 → 1.91:1)
             so object-fit: contain doesn't letterbox the typical article
             image. contain is used so that any non-conforming future
             upload still renders fully — no embedded headline ever gets
             cropped. */
          aspect-ratio: 1.91 / 1;
        }
        .ih-card-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: transform 600ms cubic-bezier(.2,.6,.2,1);
        }
        .ih-card:hover .ih-card-image img { transform: scale(1.035); }
        .ih-card-image--fallback {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ih-card-image-mark {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
          padding: 0 12px;
          text-align: center;
        }

        .ih-card-body {
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .ih-card--featured-large .ih-card-body {
          padding: 32px 36px 34px;
          gap: 16px;
        }

        .ih-card-meta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.20em;
          color: ${TEXT_BODY};
          text-transform: uppercase;
          flex-wrap: wrap;
        }
        .ih-card-date { white-space: nowrap; }
        .ih-card-divider {
          width: 14px;
          height: 1px;
          background: rgba(13, 36, 66, 0.30);
        }
        .ih-card-discipline {
          color: ${GOLD_BRIGHT};
          font-weight: 600;
          letter-spacing: 0.22em;
        }

        .ih-card-title {
          font-family: ${TYPE.sans};
          font-weight: 700;
          color: ${NAVY};
          margin: 0;
          letter-spacing: -0.010em;
        }
        .ih-card-title--xl {
          font-size: clamp(24px, 2.3vw, 30px);
          line-height: 1.20;
        }
        .ih-card-title--md {
          font-size: 17px;
          line-height: 1.28;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .ih-card-title--sm {
          font-size: 17px;
          line-height: 1.28;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          min-height: 3.84em;
        }

        .ih-card-excerpt {
          margin: 0;
          font-family: ${TYPE.sans};
          font-size: 15px;
          line-height: 1.6;
          color: ${TEXT_BODY};
          font-weight: 300;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .ih-card-foot {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 6px;
          border-top: 1px solid rgba(13, 36, 66, 0.08);
        }
        .ih-card-byline {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 13px;
          color: ${TEXT_BODY};
          letter-spacing: -0.003em;
        }
        .ih-card-cta {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .ih-card-arrow {
          font-size: 14px;
          letter-spacing: 0;
          transition: transform 200ms ease;
        }
        .ih-card:hover .ih-card-arrow { transform: translateX(4px); }

        /* ── Standard cards in 4-up grid get tighter padding so
           three lines of title don't crush the byline + CTA. */
        .ih-card--standard .ih-card-body { padding: 20px 22px 22px; gap: 10px; }
        .ih-card--standard .ih-card-byline { margin-top: 2px; }
        .ih-card--standard .ih-card-cta { margin-top: auto; padding-top: 6px; }

        /* ── Search band ─────────────────────────────────────── */
        .ih-search-band {
          padding: 56px 0 48px;
          background: ${PAPER_DEEP};
          border-top: 1px solid rgba(13, 36, 66, 0.08);
          border-bottom: 1px solid rgba(13, 36, 66, 0.08);
          /* Offset for the fixed BriefHeader (~112px) so the
             "Browse the full insights archive ↓" jump lands with
             the SEARCH THE INSIGHTS eyebrow fully visible, not
             hidden under the header. */
          scroll-margin-top: 120px;
        }
        .ih-search-label {
          display: block;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ih-search-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: center;
        }
        .ih-search-input-wrap {
          position: relative;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.15);
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .ih-search-input-wrap:focus-within {
          border-color: ${GOLD_BRIGHT};
          box-shadow: 0 0 0 3px rgba(232, 147, 70, 0.18);
        }
        .ih-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: ${TEXT_BODY};
          pointer-events: none;
        }
        .ih-search-input {
          width: 100%;
          padding: 18px 52px 18px 50px;
          border: none;
          background: transparent;
          font-family: ${TYPE.sans};
          font-size: 16px;
          color: ${NAVY};
          outline: none;
          letter-spacing: -0.005em;
        }
        .ih-search-input::placeholder { color: rgba(86, 99, 119, 0.7); }
        .ih-search-input::-webkit-search-cancel-button { display: none; }
        .ih-search-clear {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          appearance: none;
          background: transparent;
          border: none;
          font-size: 22px;
          line-height: 1;
          color: ${TEXT_BODY};
          cursor: pointer;
          padding: 4px 8px;
          transition: color 200ms ease;
        }
        .ih-search-clear:hover { color: ${NAVY}; }
        .ih-search-archive {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          transition: border-color 200ms ease;
        }
        .ih-search-archive:hover { border-bottom-color: ${GOLD_BRIGHT}; }
        .ih-search-help {
          margin: 16px 0 0;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 14px;
          color: ${TEXT_BODY};
        }

        /* ── Standard grid ──────────────────────────────────── */
        .ih-grid-station { padding-top: clamp(48px, 6vh, 72px) !important; }
        .ih-grid-meta {
          margin-bottom: 28px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${TEXT_BODY};
          text-transform: uppercase;
        }
        .ih-grid-count em {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          color: ${GOLD_BRIGHT};
          letter-spacing: 0.02em;
          text-transform: none;
          font-size: 14px;
        }
        .ih-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .ih-grid > div { display: flex; }

        .ih-empty {
          padding: 64px 32px;
          text-align: center;
          background: ${PAPER_DEEP};
          border: 1px dashed rgba(13, 36, 66, 0.18);
        }
        .ih-empty p {
          margin: 0 0 16px;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 18px;
          color: ${TEXT_BODY};
        }
        .ih-empty-archive {
          font-family: ${TYPE.mono};
          font-size: 12px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid ${GOLD_BRIGHT};
        }
        .ih-empty-archive:hover { color: ${NAVY}; border-bottom-color: ${NAVY}; }

        .ih-load-more-wrap {
          margin-top: 56px;
          display: flex;
          justify-content: center;
        }
        .ih-load-more {
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
          transition: background 200ms ease, color 200ms ease, transform 200ms ease;
        }
        .ih-load-more:hover {
          background: ${NAVY};
          color: ${PAPER};
          transform: translateY(-1px);
        }
        .ih-load-more:focus-visible { outline: 2px solid ${GOLD_BRIGHT}; outline-offset: 3px; }
        .ih-load-more-arrow { font-size: 16px; }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1199px) {
          .ih-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 1099px) {
          .ih-hero-foundations { grid-template-columns: 1fr; gap: 32px; }
          .ih-kb-card { grid-template-columns: 48px 1fr; }
          .ih-kb-card .ih-kb-cta {
            grid-column: 2 / -1;
            margin-top: 6px;
            justify-self: start;
          }
          .ih-featured-grid { grid-template-columns: 1fr; gap: 24px; }
          .ih-featured-stack { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .ih-search-row { grid-template-columns: 1fr; gap: 14px; }
          .ih-search-archive { justify-self: start; }
        }
        @media (max-width: 879px) {
          .ih-grid { grid-template-columns: repeat(2, 1fr); }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .ih-hero-stack li { font-size: 18px; }
          .ih-kb-card {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 22px 0;
          }
          .ih-kb-num { font-size: 11px; }
          .ih-card--featured-large .ih-card-body { padding: 24px 22px 26px; }
          .ih-card-body { padding: 18px 20px 22px; }
          .ih-featured-stack { grid-template-columns: 1fr; }
          .ih-grid { grid-template-columns: 1fr; gap: 22px; }
          .ih-search-input { padding: 16px 50px 16px 46px; font-size: 15px; }
          .ih-load-more { padding: 14px 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ih-card-image img,
          .ih-card-arrow,
          .ih-kb-arrow,
          .ih-kb-card,
          .ih-card,
          .ih-load-more {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
