import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, PAPER_DEEP, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* ╔══════════════════════════════════════════════════════════════════
   ║  Contact — "Let's Talk"
   ║  ─────────────────────────────────────────────────────────────
   ║  Three rows (down from five — the earlier draft fragmented
   ║  the page into hero / channels / expect / form / offices,
   ║  each with its own background switch, which read as
   ║  disjointed):
   ║
   ║    1. Hero               — paper, H1 + gold rule + lede
   ║    2. What To Expect     — paper_deep, prose + "won't do" list
   ║    3. Send Us a Note     — paper, two-column composition:
   ║         left  : the contact form (primary action)
   ║         right : sidebar with phone / email / LinkedIn +
   ║                 hairline + corporate office address
   ║
   ║  This puts the form (the page's actual conversion) at the
   ║  visual centre instead of one of five equal-weight bands,
   ║  and reduces background-color switching to twice instead of
   ║  four times.  All content from the earlier draft is
   ║  preserved.
   ║
   ║  All selectors `ct-` prefixed.
   ╚══════════════════════════════════════════════════════════════════ */

const LINKEDIN_URL = 'https://www.linkedin.com/company/the-powers-company/';

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({
    firstName: '', lastName: '', title: '', company: '',
    website: '', email: '', phone: '', message: '',
  });
  const change = (k) => (e) => setValues(v => ({ ...v, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    // Mockup — Gravity Forms / WP REST integration lands at launch.
    setSent(true);
  };
  return (
    <form className="ct-form" onSubmit={submit} noValidate data-testid="ct-form">
      <div className="ct-form-row">
        <label className="ct-field">
          <span className="ct-field-label">First Name <em>*</em></span>
          <input type="text" required value={values.firstName} onChange={change('firstName')} data-testid="ct-field-firstName" autoComplete="given-name" />
        </label>
        <label className="ct-field">
          <span className="ct-field-label">Last Name <em>*</em></span>
          <input type="text" required value={values.lastName} onChange={change('lastName')} data-testid="ct-field-lastName" autoComplete="family-name" />
        </label>
      </div>

      <div className="ct-form-row">
        <label className="ct-field">
          <span className="ct-field-label">Title <em>*</em></span>
          <input type="text" required value={values.title} onChange={change('title')} data-testid="ct-field-title" autoComplete="organization-title" />
        </label>
        <label className="ct-field">
          <span className="ct-field-label">Company <em>*</em></span>
          <input type="text" required value={values.company} onChange={change('company')} data-testid="ct-field-company" autoComplete="organization" />
        </label>
      </div>

      <label className="ct-field">
        <span className="ct-field-label">Company Website <em>*</em></span>
        <input type="url" required placeholder="https://" value={values.website} onChange={change('website')} data-testid="ct-field-website" autoComplete="url" />
      </label>

      <div className="ct-form-row">
        <label className="ct-field">
          <span className="ct-field-label">Email <em>*</em></span>
          <input type="email" required value={values.email} onChange={change('email')} data-testid="ct-field-email" autoComplete="email" />
        </label>
        <label className="ct-field">
          <span className="ct-field-label">Phone <em>*</em></span>
          <input type="tel" required value={values.phone} onChange={change('phone')} data-testid="ct-field-phone" autoComplete="tel" />
        </label>
      </div>

      <label className="ct-field">
        <span className="ct-field-label">What&rsquo;s on your mind? <span className="ct-field-optional">optional</span></span>
        <textarea
          rows={4}
          value={values.message}
          onChange={change('message')}
          data-testid="ct-field-message"
          placeholder="A sentence or two about the operation, the pressure you&rsquo;re feeling, or the conversation you want to start."
        />
      </label>

      <div className="ct-form-footer">
        <button type="submit" className="ct-submit" disabled={sent} data-testid="ct-submit">
          {sent ? 'Note Received' : 'Send the Note'}
          <span aria-hidden="true" className="ct-submit-arrow">&rarr;</span>
        </button>
        <p className="ct-privacy" data-testid="ct-privacy">
          Your information stays with us. We don&rsquo;t share it, sell it, or add you to a marketing list.
        </p>
      </div>

      {sent && (
        <div className="ct-form-receipt" role="status" data-testid="ct-receipt">
          <span className="ct-form-receipt-mark" aria-hidden="true">&#10003;</span>
          <div>
            <div className="ct-form-receipt-label">Note Received</div>
            <p>Thank you, {values.firstName || 'we got your note'}. A member of the team will be in touch within one business day to set up the first conversation.</p>
          </div>
        </div>
      )}
    </form>
  );
}

export default function Contact() {
  useEffect(() => { document.title = "Let\u2019s Talk — Contact POWERS"; }, []);
  const heroRef   = useRef(null); useInViewClass(heroRef);
  const expectRef = useRef(null); useInViewClass(expectRef, 0.18);
  const formRef   = useRef(null); useInViewClass(formRef, 0.14);

  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>

        {/* ─── ROW 1 ─ Hero ───────────────────────────────────── */}
        <section ref={heroRef} className="brief-page-hero">
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>Let&rsquo;s Talk</div>
              <h1 className="brief-doc-h1 wipe wipe-d1" data-testid="ct-hero-h1">
                <span>Tell us where the operation</span>
                <span className="accent">is feeling pressure.</span>
              </h1>
              <div className="brief-doc-rule-gold wipe wipe-d3" style={{ marginTop: 48, marginBottom: 32 }} />
              <p className="brief-doc-lede wipe wipe-d4">
                We&rsquo;ll start with a conversation. Every POWERS engagement starts with a conversation. Not a sales process. Not a deck. Just a real discussion about what your operation is dealing with and whether what we do is what you need.
              </p>
            </div>
          </div>
        </section>

        {/* ─── ROW 2 ─ What to Expect ─────────────────────────── */}
        <section ref={expectRef} className="brief-doc-station" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">What to Expect</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>A real conversation.</span>
              <span className="pivot">Not a pitch.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 48 }}>
              <p>The first conversation happens by phone. It&rsquo;s a real conversation, not a sales call. We start by listening. To understand where the operation is underperforming, we ask the questions that decades of experience on the floor have taught us to ask. The numbers your team is chasing and not catching. The patterns underneath them. The implications you may or may not have connected yet. By the end of the call, we both have a sharper picture of the gaps in the operation, the challenges of closing them, and whether what we do is what you need.</p>
              <p>From there, the conversation goes wherever it needs to go. Another call. A wider discussion with more of your team. A deeper conversation about a specific part of the operation. Eventually, if it&rsquo;s a fit on both sides, an in-person meeting with your executive and senior operations leadership, and the intensive <Link to="/discovery-process" className="brief-inline-link" data-testid="ct-link-discovery">Discovery Process</Link> that begins every POWERS engagement.</p>
            </div>
          </div>
        </section>

        {/* ─── ROW 3 ─ Send Us a Note (form + sidebar) ────────── */}
        <section id="ct-form" ref={formRef} className="brief-doc-station ct-form-station" style={{ background: PAPER }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Send Us a Note</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Tell us a bit about your operation.</span>
              <span className="pivot">We&rsquo;ll be in touch.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="ct-grid wipe wipe-d3">
              {/* Left — form */}
              <div className="ct-form-shell">
                <ContactForm />
              </div>

              {/* Right — sidebar: alt channels + corporate offices */}
              <aside className="ct-sidebar" data-testid="ct-sidebar">
                <div className="ct-sidebar-block">
                  <div className="ct-sidebar-heading">Or reach us another way</div>
                  <ul className="ct-sidebar-list">
                    <li>
                      <span className="ct-sidebar-tag">Call</span>
                      <a className="ct-sidebar-value" href="tel:+16789714711" data-testid="ct-channel-call">
                        +1 678-971-4711
                      </a>
                    </li>
                    <li>
                      <span className="ct-sidebar-tag">Email</span>
                      <a className="ct-sidebar-value" href="mailto:info@thepowerscompany.com" data-testid="ct-channel-email">
                        info@thepowerscompany.com
                      </a>
                    </li>
                    <li>
                      <span className="ct-sidebar-tag">LinkedIn</span>
                      <a
                        className="ct-sidebar-value ct-sidebar-value--linkedin"
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="ct-channel-linkedin"
                      >
                        <svg className="ct-li-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                        </svg>
                        Connect on LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="ct-sidebar-divider" aria-hidden="true" />

                <div className="ct-sidebar-block">
                  <div className="ct-sidebar-heading">Corporate Office</div>
                  <address className="ct-sidebar-address" data-testid="ct-offices-address">
                    <div className="ct-sidebar-address-name">POWERS</div>
                    <div>1801 Peachtree Street NE, Suite 200</div>
                    <div>Atlanta, GA 30309</div>
                  </address>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <BriefFooter />

      <style>{`
        /* ── Row 3 grid: form (left) + sidebar (right) ─────── */
        .ct-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
          gap: 56px;
          align-items: start;
        }
        .ct-form-shell {
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          padding: 36px 40px;
        }
        .ct-form {
          display: grid;
          gap: 22px;
        }
        .ct-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }
        .ct-field { display: block; }
        .ct-field-label {
          display: block;
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.22em;
          color: ${NAVY};
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .ct-field-label em {
          font-style: normal;
          color: ${GOLD_BRIGHT};
          margin-left: 2px;
        }
        .ct-field-optional {
          font-style: italic;
          letter-spacing: 0.16em;
          font-family: ${TYPE.serif};
          font-size: 11px;
          color: ${TEXT_BODY};
          margin-left: 6px;
          text-transform: none;
        }
        .ct-field input,
        .ct-field textarea {
          width: 100%;
          font-family: ${TYPE.sans};
          font-size: 15px;
          line-height: 1.5;
          color: ${NAVY};
          background: transparent;
          border: none;
          border-bottom: 1.5px solid rgba(13, 36, 66, 0.20);
          padding: 10px 2px 8px;
          outline: none;
          transition: border-color 200ms ease, background 200ms ease;
          resize: vertical;
        }
        .ct-field input::placeholder,
        .ct-field textarea::placeholder {
          color: rgba(13, 36, 66, 0.32);
          font-style: italic;
        }
        .ct-field input:focus,
        .ct-field textarea:focus {
          border-bottom-color: ${GOLD_BRIGHT};
          background: rgba(232, 147, 70, 0.04);
        }
        .ct-form-footer {
          display: grid;
          gap: 14px;
          margin-top: 8px;
        }
        .ct-submit {
          appearance: none;
          font-family: ${TYPE.mono};
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${PAPER};
          background: ${NAVY};
          border: 2px solid ${NAVY};
          padding: 16px 28px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          justify-self: start;
          transition: background 200ms ease, border-color 200ms ease, color 200ms ease, transform 200ms ease;
        }
        .ct-submit:hover {
          background: ${GOLD_BRIGHT};
          border-color: ${GOLD_BRIGHT};
          color: ${NAVY};
          transform: translateY(-1px);
        }
        .ct-submit:disabled {
          background: rgba(91, 165, 110, 0.85);
          border-color: rgba(91, 165, 110, 0.85);
          color: ${PAPER};
          cursor: default;
          transform: none;
        }
        .ct-submit-arrow {
          font-size: 16px;
          line-height: 1;
        }
        .ct-privacy {
          margin: 0;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: 13px;
          color: ${TEXT_BODY};
          line-height: 1.5;
        }
        .ct-form-receipt {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 16px;
          align-items: start;
          padding: 20px 22px;
          margin-top: 8px;
          background: rgba(91, 165, 110, 0.08);
          border-left: 3px solid rgba(91, 165, 110, 0.85);
        }
        .ct-form-receipt-mark {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(91, 165, 110, 0.85);
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
        }
        .ct-form-receipt-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.24em;
          color: rgba(74, 122, 85, 1);
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .ct-form-receipt p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: ${NAVY};
        }

        /* ── Sidebar (right column of Row 3) ─────────────────── */
        .ct-sidebar {
          padding: 8px 0 0;
        }
        .ct-sidebar-block + .ct-sidebar-block {
          margin-top: 0;
        }
        .ct-sidebar-heading {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.28em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .ct-sidebar-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 18px;
        }
        .ct-sidebar-list li {
          display: grid;
          gap: 4px;
        }
        .ct-sidebar-tag {
          font-family: ${TYPE.mono};
          font-size: 10px;
          letter-spacing: 0.24em;
          color: ${TEXT_BODY};
          text-transform: uppercase;
        }
        .ct-sidebar-value {
          font-family: ${TYPE.sans};
          font-weight: 600;
          font-size: 17px;
          line-height: 1.35;
          color: ${NAVY};
          text-decoration: none;
          word-break: break-word;
          border-bottom: 1px solid rgba(13, 36, 66, 0.18);
          padding-bottom: 2px;
          align-self: start;
          transition: color 180ms ease, border-color 180ms ease;
        }
        .ct-sidebar-value:hover {
          color: ${GOLD_BRIGHT};
          border-bottom-color: ${GOLD_BRIGHT};
        }
        .ct-sidebar-value--linkedin {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .ct-li-icon {
          color: ${GOLD_BRIGHT};
          flex-shrink: 0;
        }
        .ct-sidebar-divider {
          height: 1px;
          background: rgba(13, 36, 66, 0.12);
          margin: 32px 0;
        }
        .ct-sidebar-address {
          font-style: normal;
          font-family: ${TYPE.sans};
          font-size: 15px;
          line-height: 1.7;
          color: ${NAVY};
        }
        .ct-sidebar-address-name {
          font-weight: 800;
        }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .ct-grid       { grid-template-columns: 1fr; gap: 40px; }
          .ct-form-shell { padding: 32px 32px; }
          .ct-sidebar    { padding: 0; }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .ct-form-row   { grid-template-columns: 1fr; }
          .ct-form-shell { padding: 26px 22px; }
        }
      `}</style>
    </div>
  );
}
