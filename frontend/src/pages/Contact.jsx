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
   ║  Plain hero (no video, no background image — same chassis as
   ║  the About-menu pages like /leadership). Five rows:
   ║    1. Hero — H1 + lede + gold rule
   ║    2. How To Reach Us — three channels (call / email / online)
   ║    3. What To Expect — prose about the first conversation
   ║    4. Contact Form — mockup placeholder (8 fields). Submit is
   ║       a no-op until the Gravity Forms / WP REST integration
   ║       lands at launch. Submitting shows an inline "received"
   ║       confirmation so the affordance is testable.
   ║    5. Corporate Offices — address block + LinkedIn link
   ║
   ║  All selectors `ct-` prefixed so this page's form + offices
   ║  styles never collide with any discipline page.
   ╚══════════════════════════════════════════════════════════════════ */

const CHANNELS = [
  { kind: 'Call',   tag: 'Call',   value: '+1 678-971-4711',          href: 'tel:+16789714711',                  testid: 'ct-channel-call'  },
  { kind: 'Email',  tag: 'Email',  value: 'info@thepowerscompany.com', href: 'mailto:info@thepowerscompany.com',  testid: 'ct-channel-email' },
  { kind: 'Online', tag: 'Online', value: 'Send the note below',       href: '#ct-form',                          testid: 'ct-channel-online'},
];

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
    // Mockup behaviour — Gravity Forms / WP REST integration ships at
    // launch. For now, show the affordance and acknowledge receipt
    // inline so testing + visual review can exercise the flow.
    setSent(true);
  };

  return (
    <form className="ct-form" onSubmit={submit} noValidate data-testid="ct-form">
      <div className="ct-form-row">
        <label className="ct-field">
          <span className="ct-field-label">First Name <em>*</em></span>
          <input
            type="text" required
            value={values.firstName} onChange={change('firstName')}
            data-testid="ct-field-firstName" autoComplete="given-name"
          />
        </label>
        <label className="ct-field">
          <span className="ct-field-label">Last Name <em>*</em></span>
          <input
            type="text" required
            value={values.lastName} onChange={change('lastName')}
            data-testid="ct-field-lastName" autoComplete="family-name"
          />
        </label>
      </div>

      <label className="ct-field">
        <span className="ct-field-label">Title <em>*</em></span>
        <input
          type="text" required
          value={values.title} onChange={change('title')}
          data-testid="ct-field-title" autoComplete="organization-title"
        />
      </label>

      <label className="ct-field">
        <span className="ct-field-label">Company <em>*</em></span>
        <input
          type="text" required
          value={values.company} onChange={change('company')}
          data-testid="ct-field-company" autoComplete="organization"
        />
      </label>

      <label className="ct-field">
        <span className="ct-field-label">Company Website <em>*</em></span>
        <input
          type="url" required placeholder="https://"
          value={values.website} onChange={change('website')}
          data-testid="ct-field-website" autoComplete="url"
        />
      </label>

      <div className="ct-form-row">
        <label className="ct-field">
          <span className="ct-field-label">Email <em>*</em></span>
          <input
            type="email" required
            value={values.email} onChange={change('email')}
            data-testid="ct-field-email" autoComplete="email"
          />
        </label>
        <label className="ct-field">
          <span className="ct-field-label">Phone <em>*</em></span>
          <input
            type="tel" required
            value={values.phone} onChange={change('phone')}
            data-testid="ct-field-phone" autoComplete="tel"
          />
        </label>
      </div>

      <label className="ct-field">
        <span className="ct-field-label">What&rsquo;s on your mind? <span className="ct-field-optional">optional</span></span>
        <textarea
          rows={5}
          value={values.message} onChange={change('message')}
          data-testid="ct-field-message"
          placeholder="A sentence or two about the operation, the pressure you&rsquo;re feeling, or the conversation you want to start."
        />
      </label>

      <div className="ct-form-footer">
        <button
          type="submit"
          className="ct-submit"
          disabled={sent}
          data-testid="ct-submit"
        >
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
  const heroRef    = useRef(null); useInViewClass(heroRef);
  const reachRef   = useRef(null); useInViewClass(reachRef, 0.20);
  const expectRef  = useRef(null); useInViewClass(expectRef, 0.18);
  const formRef    = useRef(null); useInViewClass(formRef, 0.14);
  const officesRef = useRef(null); useInViewClass(officesRef, 0.18);

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

        {/* ─── ROW 2 ─ How to Reach Us ────────────────────────── */}
        <section ref={reachRef} className="brief-doc-station ct-reach" style={{ background: PAPER_DEEP }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe">Start the Conversation</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Three ways to reach us.</span>
              <span className="pivot">Whichever fits how you work.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="ct-channels" data-testid="ct-channels">
              {CHANNELS.map((c, i) => (
                <a
                  key={c.kind}
                  href={c.href}
                  className={`ct-channel wipe wipe-d${i + 3}`}
                  data-testid={c.testid}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <div className="ct-channel-tag">{c.tag}</div>
                  <div className="ct-channel-value">{c.value}</div>
                  <span className="ct-channel-arrow" aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ROW 3 ─ What to Expect ─────────────────────────── */}
        <section ref={expectRef} className="brief-doc-station" style={{ background: PAPER }}>
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

            <aside className="ct-wont wipe wipe-d4" data-testid="ct-wont">
              <div className="ct-wont-label">What We Won&rsquo;t Do</div>
              <ul>
                <li>Send a generic capability deck.</li>
                <li>Route you through a junior gatekeeper.</li>
                <li>Treat the first conversation as a qualifying call.</li>
              </ul>
              <p className="ct-wont-tag">The first conversation is just a conversation.</p>
            </aside>
          </div>
        </section>

        {/* ─── ROW 4 ─ Contact Form ───────────────────────────── */}
        <section
          id="ct-form"
          ref={formRef}
          className="brief-doc-station ct-form-station"
          style={{ background: PAPER_DEEP }}
        >
          <div className="brief-doc-inner">
            <div className="station-index wipe">Send Us a Note</div>
            <h2 className="brief-doc-h2 wipe wipe-d1">
              <span>Tell us a bit about your operation.</span>
              <span className="pivot">We&rsquo;ll be in touch.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="ct-form-shell wipe wipe-d3">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ─── ROW 5 ─ Corporate Offices ──────────────────────── */}
        <section ref={officesRef} className="brief-doc-station ct-offices" style={{ background: NAVY }}>
          <div className="brief-doc-inner">
            <div className="station-index wipe" style={{ color: GOLD_BRIGHT }}>Corporate Offices</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ color: '#ffffff' }}>
              <span>POWERS</span>
              <span className="pivot" style={{ color: GOLD_BRIGHT }}>Atlanta, GA.</span>
            </h2>
            <div className="brief-doc-rule-gold wipe wipe-d2" />

            <div className="ct-offices-grid wipe wipe-d3">
              <address className="ct-offices-address" data-testid="ct-offices-address">
                <div className="ct-offices-line ct-offices-line--name">POWERS</div>
                <div className="ct-offices-line">1801 Peachtree Street NE, Suite 200</div>
                <div className="ct-offices-line">Atlanta, GA 30309</div>
                <div className="ct-offices-line ct-offices-line--gap">
                  <a href="tel:+16789714711" className="ct-offices-link" data-testid="ct-offices-phone">+1 678-971-4711</a>
                </div>
                <div className="ct-offices-line">
                  <a href="mailto:info@thepowerscompany.com" className="ct-offices-link" data-testid="ct-offices-email">info@thepowerscompany.com</a>
                </div>
              </address>

              <div className="ct-offices-social">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-offices-linkedin"
                  data-testid="ct-offices-linkedin"
                >
                  <span className="ct-offices-linkedin-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                    </svg>
                  </span>
                  <div>
                    <div className="ct-offices-linkedin-label">Connect on LinkedIn</div>
                    <div className="ct-offices-linkedin-handle">/company/the-powers-company</div>
                  </div>
                  <span className="ct-offices-linkedin-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BriefFooter />

      <style>{`
        /* ── Channels strip (Row 2) ────────────────────────── */
        .ct-channels {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 56px;
        }
        .ct-channel {
          position: relative;
          display: block;
          padding: 32px 32px 36px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          color: ${NAVY};
          text-decoration: none;
          overflow: hidden;
          transition: transform 220ms cubic-bezier(.2,.6,.2,1), border-color 220ms ease, box-shadow 220ms ease;
        }
        .ct-channel::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: ${GOLD_BRIGHT};
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .ct-channel:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 147, 70, 0.55);
          box-shadow: 0 14px 30px -22px rgba(232, 147, 70, 0.45);
        }
        .ct-channel:hover::before { opacity: 0.85; }
        .ct-channel-tag {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .ct-channel-value {
          font-family: ${TYPE.serif};
          font-style: italic;
          font-weight: 500;
          font-size: clamp(22px, 2.1vw, 28px);
          line-height: 1.18;
          color: ${NAVY};
          letter-spacing: -0.005em;
        }
        .ct-channel-arrow {
          position: absolute;
          right: 22px; bottom: 18px;
          font-size: 18px;
          color: ${TEXT_BODY};
          opacity: 0.6;
          transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
        }
        .ct-channel:hover .ct-channel-arrow {
          color: ${GOLD_BRIGHT};
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── "What we won't do" callout (Row 3) ────────────── */
        .ct-wont {
          margin: 40px 0 0;
          padding: 28px 32px;
          background: ${PAPER_DEEP};
          border-left: 3px solid ${GOLD_BRIGHT};
          max-width: 880px;
        }
        .ct-wont-label {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ct-wont ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
        }
        .ct-wont li {
          padding-left: 22px;
          position: relative;
          font-family: ${TYPE.sans};
          font-size: 15.5px;
          line-height: 1.55;
          color: ${NAVY};
        }
        .ct-wont li::before {
          content: '\u2014';
          position: absolute;
          left: 0;
          color: ${GOLD_BRIGHT};
          font-weight: 700;
        }
        .ct-wont-tag {
          margin: 18px 0 0;
          font-family: ${TYPE.serif};
          font-style: italic;
          font-size: clamp(17px, 1.5vw, 19px);
          color: ${GOLD_BRIGHT};
        }

        /* ── Contact form (Row 4) ───────────────────────────── */
        .ct-form-shell {
          margin-top: 56px;
          max-width: 760px;
          padding: 44px 48px;
          background: ${PAPER};
          border: 1px solid rgba(13, 36, 66, 0.10);
          box-shadow: 0 30px 80px -60px rgba(13, 36, 66, 0.35);
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
        .ct-field {
          display: block;
        }
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

        /* ── Corporate offices (Row 5) ──────────────────────── */
        .ct-offices-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .ct-offices-address {
          font-style: normal;
          color: rgba(255, 255, 255, 0.86);
        }
        .ct-offices-line {
          font-family: ${TYPE.sans};
          font-size: 16px;
          line-height: 1.75;
        }
        .ct-offices-line--name {
          font-family: ${TYPE.mono};
          font-size: 11px;
          letter-spacing: 0.30em;
          color: ${GOLD_BRIGHT};
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .ct-offices-line--gap { margin-top: 18px; }
        .ct-offices-link {
          color: rgba(255, 255, 255, 0.86);
          text-decoration: none;
          border-bottom: 1px solid rgba(232, 147, 70, 0.4);
          transition: color 200ms ease, border-color 200ms ease;
        }
        .ct-offices-link:hover {
          color: ${GOLD_BRIGHT};
          border-bottom-color: ${GOLD_BRIGHT};
        }
        .ct-offices-linkedin {
          display: grid;
          grid-template-columns: 56px 1fr 24px;
          gap: 22px;
          align-items: center;
          padding: 24px 28px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: #ffffff;
          text-decoration: none;
          transition: background 220ms ease, border-color 220ms ease, transform 220ms ease;
        }
        .ct-offices-linkedin:hover {
          background: rgba(232, 147, 70, 0.10);
          border-color: rgba(232, 147, 70, 0.5);
          transform: translateY(-1px);
        }
        .ct-offices-linkedin-icon {
          width: 56px; height: 56px;
          background: ${GOLD_BRIGHT};
          color: ${NAVY};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
        .ct-offices-linkedin-label {
          font-family: ${TYPE.sans};
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -0.005em;
          color: #ffffff;
        }
        .ct-offices-linkedin-handle {
          font-family: ${TYPE.mono};
          font-size: 11.5px;
          letter-spacing: 0.18em;
          color: ${GOLD_BRIGHT};
          margin-top: 4px;
        }
        .ct-offices-linkedin-arrow {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.6);
          transition: transform 220ms ease, color 220ms ease;
        }
        .ct-offices-linkedin:hover .ct-offices-linkedin-arrow {
          color: ${GOLD_BRIGHT};
          transform: translateX(4px);
        }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 1099px) {
          .ct-channels         { grid-template-columns: 1fr; gap: 14px; }
          .ct-offices-grid     { grid-template-columns: 1fr; gap: 32px; }
          .ct-form-shell       { padding: 36px 32px; }
        }
        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 639px) {
          .ct-form-row         { grid-template-columns: 1fr; }
          .ct-form-shell       { padding: 28px 22px; }
          .ct-channel          { padding: 26px 22px 30px; }
          .ct-offices-linkedin { grid-template-columns: 48px 1fr; gap: 16px; padding: 20px 22px; }
          .ct-offices-linkedin-arrow { display: none; }
        }
      `}</style>
    </div>
  );
}
