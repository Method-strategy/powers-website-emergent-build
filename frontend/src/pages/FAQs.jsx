import React, { useState } from 'react';
import { Link as RRLink } from 'react-router-dom';
import KbPageShell from '../components/KbPageShell';
import {
  NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/**
 * FAQs — /frequently-asked-questions-faqs
 *
 * Eleven Q&A pairs (verbatim from POWERS_FAQs_Page_Full_Draft) +
 * a closing "didn't see your question?" CTA pointing to /contact.
 *
 * Accordion behavior is single-open / radio — opening a new
 * question closes any other. Substantial answer lengths made
 * "all open" unreadable; staggered numbered eyebrows + a tall
 * plus-to-X toggle keep the screen interesting while only one
 * answer is live at a time.
 *
 * Legacy slug preserved per the path-proxy launch architecture
 * (knowledgeBase.js's faqs entry is flipped to internal: true).
 */

const FAQS = [
  {
    q: 'How is POWERS different from a typical management consulting firm?',
    a: `Most management consulting firms diagnose, recommend, and leave. The slide deck is polished. The implementation isn't. What gets built during the engagement degrades back to the baseline within a quarter or two of the consultants going home.

We work differently. Our senior practitioners deploy directly into your operation, on every shift, alongside your supervisors and operators, until the disciplines we build are embedded in how your team runs the operation every day.

We don't leave you with binders. We leave you with a workforce that runs the system without us. And we get paid for results, not billable hours. Our commercial structure puts our compensation on the line against the savings we commit to during Discovery. If we don't deliver, we don't earn.`,
  },
  {
    q: 'How does POWERS work?',
    a: `Every POWERS engagement starts with a conversation. From there, if the fit is right, we move into the intensive Discovery Process that begins every engagement.

During Discovery, we quantify the operational gaps, design the custom build that closes them, and commit to a specific savings outcome with a cost proposal built against it.

Implementation deploys senior practitioners onto your floor, on every shift, building the five disciplines that drive sustainable performance. Operational discipline. Frontline leadership. Equipment reliability. Workforce capability. Daily accountability.

The work is hands-on, embedded, and built into the rhythm of your operation, not layered on top of it. By the time we leave, the system runs without us. Your team owns it. The gains stay built.`,
  },
  {
    q: 'What does it cost? And how do you charge?',
    a: `Engagement cost varies with scope. What doesn't vary is how we structure it.

During the Discovery Process, we quantify the savings opportunity in your operation. We then build the cost proposal against that savings commitment, not against an hourly billing rate. This is what we mean when we say we put skin in the game. We commit to a specific operational and financial outcome. If we don't deliver, we don't earn.

Most engagements pay back the full cost within the engagement window itself, with the gains continuing to compound after we leave.`,
  },
  {
    q: 'How long does an engagement take?',
    a: `The Discovery Process typically runs two to six weeks, depending on the scope of the operation and the number of sites involved.

Implementation engagements typically run several months to a year, scaled to the complexity of the build and the size of the operation.

We don't run forever. The whole point of how we work is to build the system, embed it on the floor, and hand it off. If an engagement is running long, that's a signal something isn't working, and we address it directly with you.`,
  },
  {
    q: 'Where do POWERS engagements start?',
    a: `They start at the executive and senior operations leadership level. The first phone conversation. The follow-up calls. The eventual in-person meeting with the decision-makers who will sponsor the engagement.

The Discovery Process itself begins with the leadership alignment that has to be in place before any work hits the shop floor.

From there, we move down through the operation. Plant leadership. Frontline supervisors. Operators and technicians. The build extends through every layer of the operation, but the engagement always starts with the leaders who will own the outcome.`,
  },
  {
    q: 'What industries does POWERS work in?',
    a: `Food and beverage manufacturing. Meat and poultry processing. Consumer packaged goods. Pharmaceuticals and medical devices. Aerospace and defense. Automotive. Industrial manufacturing. Metals and mining. Oil and gas. Chemicals. Warehouse and distribution. Animal nutrition and feed. Agribusiness. Plus dedicated work with private equity portfolio operations across multiple sectors.

What changes industry to industry is the operational vocabulary, the regulatory architecture, and the buyer's language. What doesn't change is the execution discipline underneath.

The five disciplines we build apply wherever consistent, sustainable operational performance is the goal.`,
  },
  {
    q: 'What size operations does POWERS work with?',
    a: `Multi-site manufacturers and processors. PE-backed platforms. Corporate operations groups running integrations, growth initiatives, or footprint expansions. Operating leaders responsible for production environments where execution gets measured every shift.

Our engagements are designed for operations at meaningful scale. If your operation runs across more than one site, the conversation about scope starts on the contact page.`,
  },
  {
    q: 'Do you guarantee results?',
    a: `We commit to specific savings outcomes during the Discovery Process. The cost proposal is built against that savings commitment. If we don't deliver the results we commit to, we don't earn the full fee.

That's as close to a guarantee as a serious operational engagement can responsibly make. What we won't do is promise outcomes we haven't validated through Discovery.

That's where the operational diagnosis happens. That's where the savings commitment gets quantified. The Discovery Process is the structural mechanism that lets us put commercial skin in the game with confidence.`,
  },
  {
    q: 'How is POWERS different from our internal continuous improvement or operational excellence team?',
    a: `Internal CI and OpEx teams are usually excellent at identifying improvements and constrained on implementation. The reason is structural, not capability. Internal teams typically operate one or two layers up from the shop floor, work across multiple initiatives, and don't have the floor-level coaching and supervisory development capability that an embedded engagement requires.

We don't replace your internal teams. We work with them. We bring senior practitioners onto every shift, build the disciplines directly into your supervisors and operators, and embed the system into how the operation runs.

Your internal CI and OpEx team comes out of the engagement stronger, with more capacity, and with the disciplines we built embedded in the operation they support.`,
  },
  {
    q: 'What happens after the engagement ends?',
    a: `The system stays built. That's the whole point of how we work. The five disciplines we install during the engagement are embedded in your supervisors, your standard work, your daily operating routines, and the management operating system we build with your team. The capability sustains itself because we built it to.

Many of our clients continue the relationship after the initial engagement, often deploying DPS, our Digital Production System, to maintain real-time visibility across the operation and accelerate the daily cadence we installed.

Some clients re-engage us for additional disciplines, additional sites, or new operational pressures. The relationship is durable because the work was.`,
  },
  {
    q: 'Why "POWERS"?',
    a: `Randall Powers founded the firm in 2004 after decades of operations work in manufacturing. The name is his. The work we do still carries his discipline.`,
  },
];

function FaqItem({ index, q, a, open, onToggle }) {
  const id = `faq-panel-${index}`;
  return (
    <li className={`faq-item ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={open}
        aria-controls={id}
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
      <div
        id={id}
        role="region"
        aria-hidden={!open}
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
      <section className="brief-doc-station faq-section" style={{ background: PAPER }}>
        <div className="brief-doc-inner">
          <ol className="faq-list">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                index={i}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ol>

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

        .faq-q {
          width: 100%;
          background: transparent;
          border: 0;
          padding: 28px 0;
          display: grid;
          grid-template-columns: 56px 1fr 32px;
          gap: 20px;
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
          .faq-q { grid-template-columns: 44px 1fr 28px; gap: 14px; padding: 22px 0; }
          .faq-q-text { font-size: 18px; }
          .faq-a p {
            padding-left: 58px;
            padding-right: 0;
            font-size: 16px;
          }
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
