import React, { useEffect, useRef, useState } from 'react';
import { Link as RRLink } from 'react-router-dom';
import KbPageShell from '../components/KbPageShell';
import {
  NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';
import { faqs as FAQS } from '../data/faqs';
import { useHashScroll } from '../hooks/useHashScroll';

/**
 * FAQs — /frequently-asked-questions-faqs
 *
 * Eleven Q&A pairs (sourced from /data/faqs.js — shared with the
 * global search corpus) + a closing "didn't see your question?"
 * CTA pointing to /contact.
 *
 * Accordion behavior is single-open / radio — opening a new
 * question closes any other. Substantial answer lengths made
 * "all open" unreadable; staggered numbered eyebrows + a tall
 * plus-to-X toggle keep the screen interesting while only one
 * answer is live at a time.
 *
 * Per-question copy-link button is a sibling of the question
 * button (not nested) to keep activation targets unambiguous
 * for keyboard and screen-reader users.
 */


function FaqItem({ index, slug, q, a, open, onToggle, onCopy, copied }) {
  const panelId = `faq-panel-${slug}`;
  const buttonId = `faq-question-${slug}`;
  return (
    <li
      id={`faq-${slug}`}
      className={`faq-item ${open ? 'is-open' : ''}`}
    >
      {/* Question + copy-link as SIBLINGS, not nested. Nesting a
          role=button span inside a real <button> makes activation
          targets ambiguous for screen readers. */}
      <div className="faq-q-row">
        <button
          id={buttonId}
          type="button"
          className="faq-q"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
          <span className="faq-q-text">{q}</span>
          <span className="faq-toggle" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.6" />
              <line className="faq-toggle-v" x1="9" y1="2" x2="9" y2="16" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </button>
        <button
          type="button"
          className="faq-copy"
          aria-label={copied ? 'Link copied' : 'Copy link to this question'}
          aria-describedby={buttonId}
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
      </div>
      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        aria-labelledby={buttonId}
        className="faq-a-wrap"
      >
        <div className="faq-a">
          {a.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function FAQs() {
  // First question open by default — gives the page an immediate
  // editorial beat instead of presenting as 11 closed bars.
  const [open, setOpen] = useState(0);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const copyTimerRef = useRef(null);

  // Honor incoming hash via the shared hook — opens the matching
  // question, then scrolls into view. The hook also handles
  // window 'hashchange' so external paste/SPA-nav still works.
  useHashScroll({
    resolveId: (hash) => {
      const idx = FAQS.findIndex((f) => f.slug === hash);
      if (idx === -1) return null;
      setOpen(idx);
      return `faq-${hash}`;
    },
  });

  // Clear any pending copy-feedback timer on unmount so we never
  // call setState on an unmounted component.
  useEffect(() => () => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
  }, []);

  const handleToggle = (i) => {
    const next = open === i ? -1 : i;
    setOpen(next);
    // Mirror the open question into the URL hash without polluting
    // history (back button still returns the user one page back).
    if (next === -1) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      const slug = FAQS[next].slug;
      window.history.replaceState(null, '', `#${slug}`);
    }
  };

  const handleCopy = async (slug) => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers without async clipboard — synchronous
      // selection-based copy. Rare on modern devices but harmless.
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) { /* noop */ }
      document.body.removeChild(ta);
    }
    setCopiedSlug(slug);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setCopiedSlug((s) => (s === slug ? null : s));
    }, 1800);
  };

  return (
    <KbPageShell
      eyebrow="Knowledge Base · FAQs"
      titleTop="Frequently asked questions."
      titlePivot="Direct answers."
      lede={
        <>
          The questions operations leaders ask before they engage POWERS — about how
          we work, what we cost, how long it takes, and how we&rsquo;re different. If your
          question isn&rsquo;t here, the{' '}
          <RRLink to="/contact" className="brief-inline-link">
            contact page
          </RRLink>{' '}
          is the right next step.
        </>
      }
      seoTitle="Frequently Asked Questions | POWERS"
      seoDescription="Direct answers to the questions operations leaders ask before engaging POWERS — how we work, what we cost, how long it takes, and how we're different."
      path="/frequently-asked-questions-faqs"
    >
      {/* JSON-LD FAQPage schema — gives Google a structured map of
          every Q&A so the page can be surfaced as a rich result in
          SERP. Same dataset, no design impact. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a.replace(/\n\n/g, ' '),
            },
          })),
        }) }}
      />

      <section className="brief-doc-station faq-section" style={{ background: PAPER }}>
        <div className="brief-doc-inner">
          <ol className="faq-list">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.slug}
                index={i}
                slug={f.slug}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => handleToggle(i)}
                onCopy={() => handleCopy(f.slug)}
                copied={copiedSlug === f.slug}
              />
            ))}
          </ol>

          {/* Polite live region for copy-link confirmation — when
              a user copies a link, this announces it without
              hijacking focus. */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {copiedSlug ? 'Link copied to clipboard.' : ''}
          </div>

          <div className="faq-closer">
            <div className="station-index">Still have a question?</div>
            <h2 className="brief-doc-h2 faq-closer-h2">
              <span>The contact page is</span>
              <span className="pivot">the right next step.</span>
            </h2>
            <RRLink to="/contact" className="brief-doc-cta-button" style={{ marginTop: 28 }}>
              Let&rsquo;s talk
            </RRLink>
          </div>
        </div>
      </section>

      <style>{`
        .faq-section { padding-top: clamp(40px, 6vh, 80px); }

        .faq-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(13, 36, 66, 0.14);
        }

        .faq-item {
          border-bottom: 1px solid rgba(13, 36, 66, 0.14);
        }

        /* Sibling layout: question button (.faq-q) takes most of
           the row width; copy button sits to the right as its own
           tab stop. .faq-q reverts to a 3-col grid (no copy column
           any more). */
        .faq-q-row {
          display: grid;
          grid-template-columns: 1fr 44px;
          align-items: stretch;
        }
        .faq-q {
          width: 100%;
          background: transparent;
          border: 0;
          padding: 28px 0;
          display: grid;
          grid-template-columns: 56px 1fr 32px;
          gap: 14px;
          align-items: baseline;
          cursor: pointer;
          text-align: left;
          color: ${NAVY};
          transition: color 160ms ease;
        }
        .faq-q:hover { color: ${GOLD_BRIGHT}; }
        .faq-q:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 6px;
        }

        .faq-num {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: ${GOLD_BRIGHT};
          padding-top: 6px;
        }
        .faq-q-text {
          font-family: ${TYPE.sans};
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 700;
          line-height: 1.28;
          letter-spacing: -0.008em;
          text-wrap: balance;
        }
        .faq-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          color: ${GOLD_BRIGHT};
          transition: transform 280ms cubic-bezier(.4, 0, .2, 1);
          align-self: center;
        }

        /* Copy-link button — sibling of .faq-q. 44×44 touch target
           on every viewport (WCAG 2.5.5). Stays subtle until the
           row is hovered, the question is open, or the button has
           focus. Confirmation checkmark replaces the icon for 1.8s
           after a successful copy. */
        .faq-copy {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          min-height: 44px;
          background: transparent;
          border: 0;
          color: rgba(13, 36, 66, 0.28);
          opacity: 0;
          transition: opacity 180ms ease, color 180ms ease, transform 180ms ease;
          cursor: pointer;
          border-radius: 4px;
        }
        .faq-q-row:hover .faq-copy,
        .faq-item.is-open .faq-copy { opacity: 1; }
        .faq-copy:hover { color: ${GOLD_BRIGHT}; transform: scale(1.08); }
        .faq-copy:focus-visible {
          outline: 2px solid ${GOLD_BRIGHT};
          outline-offset: 3px;
          opacity: 1;
        }
        .faq-item.is-open .faq-copy { color: ${GOLD_BRIGHT}; }

        .faq-item.is-open .faq-toggle { transform: rotate(45deg); }
        .faq-toggle-v {
          transition: opacity 220ms ease;
        }
        /* Animate the vertical bar into a hyphen on open — the
           rotation handles the orientation, opacity sells the
           "transforming" feel. */
        .faq-item.is-open .faq-toggle-v { opacity: 1; }

        .faq-a-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 360ms cubic-bezier(.4, 0, .2, 1);
        }
        .faq-item.is-open .faq-a-wrap { grid-template-rows: 1fr; }
        .faq-a {
          overflow: hidden;
          min-height: 0;
        }
        .faq-a > div { display: contents; }

        .faq-a p {
          font-family: ${TYPE.sans};
          font-size: 17px;
          line-height: 1.72;
          font-weight: 300;
          color: ${TEXT_BODY};
          margin: 0 0 1em;
          /* Align with the question text — skip the 56px num gutter
             so the body reads to the same left edge as the headline. */
          padding-left: 76px;
          padding-right: 32px;
          max-width: 820px;
          text-wrap: pretty;
        }
        .faq-a p:first-child { margin-top: -4px; }
        .faq-a p:last-child { margin-bottom: 28px; }

        @media (max-width: 720px) {
          .faq-q-row { grid-template-columns: 1fr 44px; }
          .faq-q { grid-template-columns: 44px 1fr 28px; gap: 10px; padding: 22px 0; }
          .faq-q-text { font-size: 18px; }
          .faq-copy { opacity: 1; } /* always visible on touch — no hover */
          .faq-a p {
            padding-left: 58px;
            padding-right: 0;
            font-size: 16px;
          }
        }

        /* Visually-hidden but available to assistive tech — used
           for the polite live region announcing copy confirmation. */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Closer: editorial CTA band, not a dark chassis — keeps the
           page feeling continuous with the FAQ rhythm and matches
           the rest of the KB pages. */
        .faq-closer {
          margin-top: 80px;
          padding-top: 56px;
          border-top: 1px solid rgba(232, 147, 70, 0.4);
          max-width: 760px;
        }
        .faq-closer-h2 {
          margin-top: 18px;
          font-size: clamp(28px, 3vw, 40px);
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-toggle,
          .faq-a-wrap { transition: none; }
        }
      `}</style>
    </KbPageShell>
  );
}
