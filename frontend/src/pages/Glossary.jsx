import React, { useEffect, useMemo, useState } from 'react';
import { Link as RRLink } from 'react-router-dom';
import KbPageShell from '../components/KbPageShell';
import {
  NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { glossarySections } from '../data/glossary';

/**
 * Glossary — /glossary
 *
 * Operational performance vocabulary, defined by practitioners.
 * Two sections: POWERS' Core Terms + Industry Standard Terms.
 *
 * Page mechanics:
 *   - Client-side search (term + definition substring, case-insensitive).
 *   - Each term has a slug → #term-slug deep-links scroll to it on
 *     load and on hashchange; matching row gets a brief gold flash.
 *   - Per-term copy-link icon (same UX as FAQs).
 *   - JSON-LD DefinedTermSet schema injected for SEO.
 *
 * Legacy slug preserved per the path-proxy launch architecture:
 * `/glossary` ↔ thepowerscompany.com/glossary/. `knowledgeBase.js`
 * glossary entry is flipped to internal: true.
 */

// Build a flat highlighted dataset filtered by query. We highlight
// matching substrings in both the term name and definition so it's
// obvious why a row matched.
function useFiltered(query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      const total = glossarySections.reduce((n, s) => n + s.terms.length, 0);
      return { sections: glossarySections, total, filtered: false };
    }
    const filteredSections = glossarySections
      .map((s) => ({
        ...s,
        terms: s.terms.filter(
          (t) =>
            t.term.toLowerCase().includes(q) ||
            t.def.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.terms.length > 0);
    const total = filteredSections.reduce((n, s) => n + s.terms.length, 0);
    return { sections: filteredSections, total, filtered: true };
  }, [query]);
}

// Inline highlighter for matched substrings. Splits the source on a
// case-insensitive query and wraps every hit in a <mark>.
function Highlight({ text, query }) {
  if (!query) return text;
  const q = query.trim();
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? <mark key={i} className="gl-mark">{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

function TermRow({ entry, query, copied, onCopy, flash }) {
  return (
    <article
      id={`term-${entry.slug}`}
      className={`gl-term ${flash ? 'is-flash' : ''}`}
    >
      <header className="gl-term-head">
        <h3 className="gl-term-name">
          <Highlight text={entry.term} query={query} />
        </h3>
        <button
          type="button"
          className="gl-copy"
          aria-label={copied ? 'Link copied' : 'Copy link to this term'}
          title={copied ? 'Link copied' : 'Copy link'}
          onClick={onCopy}
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M2 7.5 L5.5 11 L12 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M5.5 8.5 a2 2 0 0 1 0 -2.8 L7.5 3.7 a2 2 0 0 1 2.8 2.8 L9 7.8 M8.5 5.5 a2 2 0 0 1 0 2.8 L6.5 10.3 a2 2 0 0 1 -2.8 -2.8 L5 6.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </header>
      <p className="gl-term-def">
        <Highlight text={entry.def} query={query} />
      </p>
    </article>
  );
}

export default function Glossary() {
  const [query, setQuery] = useState('');
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [flashSlug, setFlashSlug] = useState(null);

  const { sections, total, filtered } = useFiltered(query);

  // Honor incoming #slug hash on mount + on hashchange. We scroll
  // the matching term into view and apply a brief gold flash so the
  // reader's eye lands on it immediately.
  useEffect(() => {
    const applyHash = () => {
      const hash = (window.location.hash || '').replace(/^#/, '');
      if (!hash) return;
      const el = document.getElementById(`term-${hash}`);
      if (!el) return;
      requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: 'smooth' });
        setFlashSlug(hash);
        setTimeout(() => setFlashSlug((s) => (s === hash ? null : s)), 2200);
      });
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const handleCopy = async (slug) => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) { /* noop */ }
      document.body.removeChild(ta);
    }
    // Also mirror the slug into the URL so a subsequent paste still
    // resolves to the right spot.
    window.history.replaceState(null, '', `#${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug((s) => (s === slug ? null : s)), 1800);
  };

  // JSON-LD DefinedTermSet — gives Google a structured map of every
  // term + definition. Free SERP real-estate for ops leaders Googling
  // "OEE definition", "TPM manufacturing", etc.
  const jsonLd = useMemo(() => {
    const allTerms = glossarySections.flatMap((s) => s.terms);
    return {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'POWERS Operational Performance Glossary',
      url: typeof window !== 'undefined'
        ? `${window.location.origin}/glossary`
        : 'https://www.thepowerscompany.com/glossary',
      hasDefinedTerm: allTerms.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.term,
        description: t.def,
        url: typeof window !== 'undefined'
          ? `${window.location.origin}/glossary#${t.slug}`
          : `https://www.thepowerscompany.com/glossary#${t.slug}`,
      })),
    };
  }, []);

  return (
    <KbPageShell
      eyebrow="Knowledge Base · Glossary"
      titleTop="Operational vocabulary."
      titlePivot="Defined by practitioners."
      lede={
        <>
          The terms POWERS uses to describe how operations get built, run, and
          improved. The five disciplines that anchor everything we do. The
          programs and platforms we&rsquo;ve developed. And the industry-standard
          concepts and methodologies that surround the work.
        </>
      }
      seoTitle="Glossary | POWERS Knowledge Base"
      seoDescription="Operational performance vocabulary, defined by practitioners. POWERS' core terms and industry-standard methodologies that anchor manufacturing execution."
      path="/glossary"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="brief-doc-station gl-section" style={{ background: PAPER }}>
        <div className="brief-doc-inner">
          <div className="gl-search-wrap">
            <label className="gl-search">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="gl-search-icon">
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search 30 terms by name or definition"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search the glossary"
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="gl-search-clear"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  title="Clear"
                >
                  ×
                </button>
              )}
            </label>
            <div className="gl-search-meta">
              {filtered ? (
                total === 0 ? (
                  <span>
                    No terms match &ldquo;<em>{query}</em>&rdquo;.
                  </span>
                ) : (
                  <span>
                    Showing <strong>{total}</strong> of 30 terms.
                  </span>
                )
              ) : (
                <span>30 terms across two sections.</span>
              )}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.slug} className="gl-block">
              <div className="station-index">{section.title}</div>
              <p className="gl-block-intro">{section.intro}</p>
              <div className="gl-list">
                {section.terms.map((t) => (
                  <TermRow
                    key={t.slug}
                    entry={t}
                    query={filtered ? query : ''}
                    copied={copiedSlug === t.slug}
                    onCopy={() => handleCopy(t.slug)}
                    flash={flashSlug === t.slug}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="gl-closer">
            <div className="station-index">Need a definition we haven&rsquo;t covered?</div>
            <h2 className="brief-doc-h2 gl-closer-h2">
              <span>The vocabulary above is the foundation.</span>
              <span className="pivot">Let&rsquo;s talk about the rest.</span>
            </h2>
            <RRLink to="/contact" className="brief-doc-cta-button" style={{ marginTop: 28 }}>
              Start a conversation
            </RRLink>
          </div>
        </div>
      </section>

      <style>{`
        .gl-section { padding-top: clamp(40px, 6vh, 80px); }

        /* Sticky search bar at the top of the body so the reader can
           filter without scrolling back up. The fixed BriefHeader is
           112px so we anchor just below it. */
        .gl-search-wrap {
          position: sticky;
          top: 120px;
          z-index: 5;
          background: ${PAPER};
          padding: 18px 0 20px;
          border-bottom: 1px solid rgba(13, 36, 66, 0.1);
          margin-bottom: 56px;
        }
        .gl-search {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(13, 36, 66, 0.18);
          padding: 14px 18px;
          background: #fff;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .gl-search:focus-within {
          border-color: ${GOLD_BRIGHT};
          box-shadow: 0 0 0 3px rgba(232, 147, 70, 0.18);
        }
        .gl-search-icon { color: ${GOLD_BRIGHT}; flex-shrink: 0; }
        .gl-search input {
          flex: 1;
          border: 0;
          background: transparent;
          font-family: ${TYPE.sans};
          font-size: 16px;
          color: ${NAVY};
          outline: 0;
          min-width: 0;
        }
        .gl-search input::placeholder { color: rgba(13, 36, 66, 0.42); }
        .gl-search-clear {
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 0;
          color: rgba(13, 36, 66, 0.5);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          border-radius: 50%;
          transition: color 160ms ease, background 160ms ease;
        }
        .gl-search-clear:hover { color: ${NAVY}; background: rgba(13, 36, 66, 0.06); }
        .gl-search-meta {
          margin-top: 10px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${TEXT_BODY};
        }
        .gl-search-meta strong { color: ${GOLD_BRIGHT}; font-weight: 600; }
        .gl-search-meta em { font-style: italic; color: ${NAVY}; }

        .gl-block { margin-bottom: 96px; }
        .gl-block:last-of-type { margin-bottom: 56px; }
        .gl-block-intro {
          font-family: ${TYPE.sans};
          font-size: 17px;
          line-height: 1.62;
          color: ${TEXT_BODY};
          margin: 8px 0 36px;
          max-width: 720px;
          text-wrap: pretty;
        }

        .gl-list { border-top: 1px solid rgba(13, 36, 66, 0.14); }

        .gl-term {
          padding: 26px 0;
          border-bottom: 1px solid rgba(13, 36, 66, 0.10);
          display: grid;
          grid-template-columns: minmax(220px, 0.85fr) minmax(0, 2.1fr);
          gap: 36px;
          align-items: start;
          scroll-margin-top: 140px;
          position: relative;
          transition: background 600ms ease;
        }
        .gl-term.is-flash {
          background: rgba(232, 147, 70, 0.10);
        }

        @media (max-width: 880px) {
          .gl-term { grid-template-columns: 1fr; gap: 8px; }
        }

        .gl-term-head {
          display: flex;
          align-items: start;
          gap: 8px;
        }
        .gl-term-name {
          font-family: ${TYPE.sans};
          font-size: 18px;
          font-weight: 700;
          line-height: 1.32;
          letter-spacing: -0.004em;
          color: ${NAVY};
          margin: 0;
          text-wrap: balance;
          flex: 1;
        }
        .gl-copy {
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 0;
          color: rgba(13, 36, 66, 0.28);
          opacity: 0;
          cursor: pointer;
          border-radius: 4px;
          transition: opacity 180ms ease, color 180ms ease, transform 180ms ease;
          flex-shrink: 0;
        }
        .gl-term:hover .gl-copy,
        .gl-copy:focus-visible { opacity: 1; }
        .gl-copy:hover { color: ${GOLD_BRIGHT}; transform: scale(1.08); }
        .gl-copy:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 3px;
        }
        @media (max-width: 880px) {
          .gl-copy { opacity: 1; } /* always visible on touch */
        }

        .gl-term-def {
          font-family: ${TYPE.sans};
          font-size: 15.5px;
          line-height: 1.66;
          font-weight: 300;
          color: ${TEXT_BODY};
          margin: 0;
          text-wrap: pretty;
        }

        .gl-mark {
          background: rgba(232, 147, 70, 0.22);
          color: ${NAVY};
          padding: 1px 2px;
          border-radius: 2px;
        }

        .gl-closer {
          margin-top: 40px;
          padding-top: 56px;
          border-top: 1px solid rgba(232, 147, 70, 0.4);
          max-width: 760px;
        }
        .gl-closer-h2 {
          margin-top: 18px;
          font-size: clamp(28px, 3vw, 40px);
        }

        @media (prefers-reduced-motion: reduce) {
          .gl-term { transition: none; }
        }
      `}</style>
    </KbPageShell>
  );
}
