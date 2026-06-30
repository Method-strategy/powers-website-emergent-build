import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCorpus, SEARCH_CORPUS } from '../lib/searchCorpus';
import { NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE } from './BriefDocStyles';

/**
 * SearchModal — global Cmd-K / Ctrl-K omni-search.
 *
 * Mounts once at the app level. Listens for the global keyboard
 * trigger, exposes an imperative `open()` for the header search
 * button, renders a centered editorial-card modal with grouped
 * results across every knowledge-base source.
 *
 * Keyboard:
 *   ⌘K / Ctrl+K   open
 *   /             open (when not focused inside an input)
 *   Esc           close
 *   ↑ / ↓         move highlight
 *   Enter         navigate to highlighted result
 *
 * The trigger is exposed via window.__openSearchModal for the
 * BriefHeader search button (avoids prop-drilling through routing).
 */

const GROUP_ORDER = [
  'Glossary', 'FAQs', 'Insights', 'Mastery Series', 'Downloadables', 'Manufacturing KPIs',
];

// A small icon set used inline so the modal stays self-contained.
function SearchIcon({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden="true">
      <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
      <path d="M0 5 H12 M8 1 L12 5 L8 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? <mark key={i} className="omn-mark">{p}</mark> : <React.Fragment key={i}>{p}</React.Fragment>
  );
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchCorpus(query, 40), [query]);

  // Stable grouping for render — items within each group are
  // already in score order from searchCorpus. We sort the GROUPS
  // by the score of their top item so the most semantically
  // relevant section floats to the top (e.g. searching "cost"
  // surfaces the FAQ section above the glossary section that
  // incidentally mentions "cost"). Falls back to the canonical
  // GROUP_ORDER for ties or empty query.
  const grouped = useMemo(() => {
    if (!results.length) return [];
    const buckets = new Map();
    for (const r of results) {
      if (!buckets.has(r.group)) buckets.set(r.group, []);
      buckets.get(r.group).push(r);
    }
    const canonicalIndex = (g) => {
      const i = GROUP_ORDER.indexOf(g);
      return i === -1 ? 999 : i;
    };
    return Array.from(buckets.entries())
      .map(([group, items]) => ({ group, items, _max: items[0]._score || 0 }))
      .sort((a, b) => b._max - a._max || canonicalIndex(a.group) - canonicalIndex(b.group));
  }, [results]);

  // Flat list for ↑/↓ navigation — must mirror render order exactly.
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const open = useCallback(() => {
    setIsOpen(true);
    setActiveIdx(0);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveIdx(0);
  }, []);

  // Expose `open()` to the rest of the app (BriefHeader search button).
  useEffect(() => {
    window.__openSearchModal = open;
    return () => {
      if (window.__openSearchModal === open) delete window.__openSearchModal;
    };
  }, [open]);

  // Global keyboard listener — ⌘K / Ctrl+K open, "/" open (unless
  // user is typing in an input/textarea/contenteditable already),
  // Esc close.
  useEffect(() => {
    const onKey = (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        isOpen ? close() : open();
        return;
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
        return;
      }
      if (!isOpen && e.key === '/') {
        const t = e.target;
        const tag = t && t.tagName;
        const editable = t && (tag === 'INPUT' || tag === 'TEXTAREA' || t.isContentEditable);
        if (!editable) {
          e.preventDefault();
          open();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, open, close]);

  // Focus input + lock body scroll when modal opens.
  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [isOpen]);

  // Reset highlight when query changes.
  useEffect(() => { setActiveIdx(0); }, [query]);

  // ↑/↓ + Enter handled at input level so they don't bubble up.
  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      const r = flat[activeIdx];
      if (r) goTo(r);
    }
  };

  const goTo = (r) => {
    close();
    if (r.to) {
      // Use react-router for internal SPA navigation.
      navigate(r.to);
      // navigate doesn't always handle hash + scroll on the same path
      // perfectly — if we're already on the target path, force a
      // hashchange so the destination page's listener re-applies.
      requestAnimationFrame(() => {
        const [path, hash] = r.to.split('#');
        if (hash && window.location.pathname === path) {
          window.location.hash = hash;
        }
      });
    } else if (r.href) {
      window.open(r.href, '_blank', 'noopener,noreferrer');
    }
  };

  // Scroll the active result into view as the user arrows down.
  useEffect(() => {
    if (!isOpen) return;
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [activeIdx, isOpen]);

  if (!isOpen) return null;

  // Map each result to its flat-list index so we can drive the
  // highlight from the rendered row.
  const indexById = new Map(flat.map((r, i) => [r.id, i]));

  return (
    <div
      className="omn-overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target.classList.contains('omn-overlay')) close(); }}
    >
      <div className="omn-modal" role="dialog" aria-modal="true" aria-label="Search">
        <div className="omn-input-row">
          <SearchIcon className="omn-input-icon" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search glossary, FAQs, insights, mastery series…"
            autoComplete="off"
            aria-label="Search the POWERS knowledge base"
          />
          <button
            type="button"
            className="omn-close"
            aria-label="Close search"
            onClick={close}
          >
            <span className="omn-esc-hint">Esc</span>
          </button>
        </div>

        <div className="omn-body" ref={listRef}>
          {!query.trim() ? (
            <div className="omn-empty">
              <div className="omn-empty-eyebrow">Type to search across</div>
              <ul className="omn-empty-list">
                {GROUP_ORDER.map((g) => (
                  <li key={g}>
                    <span className="omn-empty-dot" />
                    {g}
                    <span className="omn-empty-count">
                      {SEARCH_CORPUS.filter((r) => r.group === g).length}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="omn-empty-hint">
                <kbd>↑</kbd> <kbd>↓</kbd> navigate &nbsp;·&nbsp; <kbd>↵</kbd> open &nbsp;·&nbsp; <kbd>esc</kbd> close
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="omn-zero">
              <p>
                No results for &ldquo;<em>{query}</em>&rdquo;.
              </p>
              <p className="omn-zero-hint">
                Try a different term — or head to{' '}
                <button type="button" className="omn-zero-link" onClick={() => { close(); navigate('/contact'); }}>
                  the contact page
                </button>.
              </p>
            </div>
          ) : (
            grouped.map((g) => (
              <section key={g.group} className="omn-group">
                <header className="omn-group-head">{g.group}</header>
                <ul>
                  {g.items.map((r) => {
                    const idx = indexById.get(r.id);
                    const isActive = idx === activeIdx;
                    return (
                      <li key={r.id} data-idx={idx}>
                        <button
                          type="button"
                          className={`omn-row ${isActive ? 'is-active' : ''}`}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => goTo(r)}
                        >
                          <span className="omn-row-label">
                            {highlight(r.label, query.trim())}
                          </span>
                          {r.subtitle && (
                            <span className="omn-row-sub">
                              {highlight(r.subtitle, query.trim())}
                            </span>
                          )}
                          <span className="omn-row-meta">
                            {r.external ? (
                              <span className="omn-row-badge">
                                {r.isPdf ? 'PDF' : 'WP'}
                              </span>
                            ) : null}
                            <span className="omn-row-arrow"><ArrowIcon /></span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </div>

        <footer className="omn-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
          <span className="omn-foot-spacer" />
          <span className="omn-foot-count">
            {results.length > 0 ? `${results.length} result${results.length === 1 ? '' : 's'}` : ''}
          </span>
        </footer>
      </div>

      <style>{`
        .omn-overlay {
          position: fixed;
          inset: 0;
          background: rgba(7, 18, 36, 0.62);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 200;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(56px, 12vh, 140px) 20px 20px;
          animation: omn-fade-in 160ms ease-out;
        }
        @keyframes omn-fade-in { from { opacity: 0 } to { opacity: 1 } }

        .omn-modal {
          width: 100%;
          max-width: 720px;
          max-height: calc(100vh - 200px);
          background: ${PAPER};
          color: ${NAVY};
          border: 1px solid rgba(232, 147, 70, 0.4);
          box-shadow:
            0 24px 60px -20px rgba(7, 18, 36, 0.55),
            0 0 0 1px rgba(13, 36, 66, 0.04);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: omn-rise 200ms cubic-bezier(.2, .8, .2, 1);
        }
        @keyframes omn-rise {
          from { opacity: 0; transform: translateY(-12px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .omn-input-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 18px 18px 22px;
          border-bottom: 1px solid rgba(13, 36, 66, 0.10);
          background: #fff;
        }
        .omn-input-icon { color: ${GOLD_BRIGHT}; flex-shrink: 0; }
        .omn-input-row input {
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          font-family: ${TYPE.sans};
          font-size: 17px;
          font-weight: 400;
          color: ${NAVY};
          min-width: 0;
        }
        .omn-input-row input::placeholder { color: rgba(13, 36, 66, 0.42); }

        .omn-close {
          background: transparent;
          border: 1px solid rgba(13, 36, 66, 0.18);
          padding: 4px 10px;
          cursor: pointer;
          color: ${TEXT_BODY};
          font-family: ${TYPE.mono};
          font-size: 10.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .omn-close:hover { color: ${NAVY}; border-color: ${NAVY}; }

        .omn-body {
          flex: 1;
          overflow-y: auto;
          padding: 4px 0;
        }

        .omn-empty {
          padding: 28px 22px 32px;
        }
        .omn-empty-eyebrow {
          font-family: ${TYPE.mono};
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          margin-bottom: 14px;
        }
        .omn-empty-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
        }
        @media (max-width: 520px) {
          .omn-empty-list { grid-template-columns: 1fr; }
        }
        .omn-empty-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: ${TYPE.sans};
          font-size: 14px;
          font-weight: 500;
          color: ${NAVY};
        }
        .omn-empty-dot {
          width: 6px; height: 6px;
          background: ${GOLD_BRIGHT};
          border-radius: 50%;
          flex-shrink: 0;
        }
        .omn-empty-count {
          margin-left: auto;
          font-family: ${TYPE.mono};
          font-size: 11px;
          color: ${TEXT_BODY};
        }
        .omn-empty-hint {
          margin-top: 26px;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${TEXT_BODY};
        }

        .omn-zero { padding: 36px 22px; font-family: ${TYPE.sans}; font-size: 15px; color: ${TEXT_BODY}; }
        .omn-zero em { font-style: italic; color: ${NAVY}; }
        .omn-zero-hint { margin-top: 8px; font-size: 14px; }
        .omn-zero-link {
          background: transparent; border: 0; padding: 0;
          color: ${GOLD_BRIGHT};
          text-decoration: underline;
          text-decoration-color: rgba(232, 147, 70, 0.45);
          text-underline-offset: 3px;
          font: inherit;
          cursor: pointer;
        }
        .omn-zero-link:hover { color: #d27d2e; text-decoration-color: ${GOLD_BRIGHT}; }

        .omn-group { padding: 12px 0 4px; }
        .omn-group-head {
          font-family: ${TYPE.mono};
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${GOLD_BRIGHT};
          padding: 10px 22px 6px;
        }
        .omn-group ul { list-style: none; margin: 0; padding: 0; }

        .omn-row {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          column-gap: 14px;
          width: 100%;
          padding: 12px 22px;
          background: transparent;
          border: 0;
          text-align: left;
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: background 120ms ease, border-color 120ms ease;
        }
        .omn-row.is-active {
          background: rgba(232, 147, 70, 0.08);
          border-left-color: ${GOLD_BRIGHT};
        }
        .omn-row-label {
          font-family: ${TYPE.sans};
          font-size: 15px;
          font-weight: 600;
          color: ${NAVY};
          line-height: 1.4;
          grid-column: 1;
          grid-row: 1;
        }
        .omn-row-sub {
          font-family: ${TYPE.sans};
          font-size: 13px;
          font-weight: 300;
          color: ${TEXT_BODY};
          line-height: 1.5;
          grid-column: 1;
          grid-row: 2;
          margin-top: 2px;
        }
        .omn-row-meta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          grid-column: 2;
          grid-row: 1 / span 2;
          align-self: center;
          color: rgba(13, 36, 66, 0.28);
        }
        .omn-row.is-active .omn-row-meta { color: ${GOLD_BRIGHT}; }
        .omn-row-arrow { transition: transform 180ms ease; }
        .omn-row.is-active .omn-row-arrow { transform: translateX(3px); }
        .omn-row-badge {
          font-family: ${TYPE.mono};
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid currentColor;
          padding: 1px 5px;
        }
        .omn-mark {
          background: rgba(232, 147, 70, 0.24);
          color: inherit;
          padding: 1px 1px;
          border-radius: 2px;
        }

        .omn-foot {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 18px;
          border-top: 1px solid rgba(13, 36, 66, 0.08);
          background: rgba(13, 36, 66, 0.03);
          font-family: ${TYPE.mono};
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${TEXT_BODY};
        }
        .omn-foot-spacer { flex: 1; }
        .omn-foot-count { color: ${NAVY}; }
        .omn-foot kbd,
        .omn-empty-hint kbd {
          display: inline-block;
          font-family: ${TYPE.mono};
          font-size: 10px;
          padding: 1px 5px;
          margin: 0 2px;
          background: #fff;
          border: 1px solid rgba(13, 36, 66, 0.2);
          border-bottom-width: 2px;
          color: ${NAVY};
          letter-spacing: 0;
          text-transform: none;
          line-height: 1.4;
        }

        @media (prefers-reduced-motion: reduce) {
          .omn-overlay, .omn-modal { animation: none; }
        }
      `}</style>
    </div>
  );
}
