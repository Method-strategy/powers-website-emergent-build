import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BriefHeader from '../components/BriefHeader';
import BriefFooter from '../components/BriefFooter';
import BriefDocStyles, {
  useInViewClass, NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE,
} from '../components/BriefDocStyles';

/* Leadership — bio card grid in the brief language.
   Copy preserved verbatim. 6 cards, 3-up at desktop, 2-up at
   tablet, 1-up at mobile. Each card uses the brief's paper
   surface with a 1px navy hairline border, photo at 1:1, name
   in sans-bold-navy, title in sans-light-text-body. */

const LEADERS = [
  { slug: 'randall-powers',  photo: 'randall-powers.webp',  name: 'Randall Powers',  title: 'Managing Partner',                                              linkedin: null },
  { slug: 'sean-hart',       photo: 'sean-hart.webp',       name: 'Sean Hart',       title: 'Chief Executive Officer and Managing Partner',                  linkedin: 'https://www.linkedin.com/in/seanphart/' },
  { slug: 'saul-bautista',   photo: 'saul-bautista.webp',   name: 'Saul Bautista',   title: 'Chief Operating Officer',                                       linkedin: 'https://www.linkedin.com/in/saulbautista/' },
  { slug: 'ken-wiesinger',   photo: 'ken-wiesinger.webp',   name: 'Ken Wiesinger',   title: 'Chief Delivery Officer',                                        linkedin: 'https://www.linkedin.com/in/kenwiesinger/' },
  { slug: 'justin-pethick',  photo: 'justin-pethick.webp',  name: 'Justin Pethick',  title: 'Senior Vice President of Strategy and Business Development',    linkedin: 'https://www.linkedin.com/in/justin-pethick-ab5388181/' },
  { slug: 'kevin-sabany',    photo: 'kevin-sabany.webp',    name: 'Kevin Sabany',    title: 'Analyst',                                                       linkedin: 'https://www.linkedin.com/in/kevin-sabany-901339174/' },
];

export default function Leadership() {
  useEffect(() => { document.title = 'Leadership Team — Senior Manufacturing Practitioners | POWERS'; }, []);
  return (
    <div className="brief-doc" style={{ background: PAPER, fontFamily: TYPE.sans, color: NAVY }}>
      <BriefDocStyles />
      <LeadershipStyles />
      <BriefHeader mode="interior" />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <HeroBeat />
        <LeadersGrid />
        <SectionCTA />
      </main>
      <BriefFooter />
    </div>
  );
}

function HeroBeat() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-page-hero">
      <div className="brief-doc-inner">
        <div className="brief-doc-col">
          <div className="station-index wipe" style={{ marginBottom: 24 }}>Leadership</div>
          <h1 className="brief-doc-h1 wipe wipe-d1">
            <span>The team that built</span>
            <span className="accent">the architecture.</span>
          </h1>
          <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 720 }}>
            POWERS leadership comes from inside manufacturing operations. Plant floors, production lines, finance functions, and the rooms where operating decisions get made under real pressure. Not advisors who studied the work. Practitioners who did it.
          </p>
          <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 64 }} />
        </div>
      </div>
    </section>
  );
}

function LeadersGrid() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: PAPER }}>
      <div className="brief-doc-inner">
        <ol className="leaders-grid">
          {LEADERS.map((p, i) => (
            <li key={p.slug} className="leader-card" style={{ ['--i']: i }}>
              <Link className="leader-card-link" to={`/leadership/${p.slug}`} data-testid={`leader-card-${p.slug}`}>
                <div className="leader-photo">
                  <img src={`/uploads/leaders/${p.photo}`} alt={p.name} loading="lazy" />
                </div>
                <div className="leader-name">{p.name}</div>
                <div className="leader-title">{p.title}</div>
              </Link>
              {p.linkedin && (
                <a className="leader-linkedin" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${p.name} on LinkedIn`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SectionCTA() {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station brief-doc-cta" style={{ background: PAPER }}>
      <div className="brief-doc-inner" style={{ textAlign: 'center', paddingTop: 96, paddingBottom: 96 }}>
        <div className="station-index wipe" style={{ margin: '0 auto 18px' }}>Working with the Team</div>
        <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 820, alignItems: 'center' }}>
          <span>The leadership team works the engagement,</span>
          <span className="pivot">not just the contract.</span>
        </h2>
        <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 24, color: TEXT_BODY, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          POWERS engagements are led by senior practitioners. The names above are the people you will work with, on the floor, during Discovery and Implementation. If you want to meet the team before scoping a Discovery, the conversation starts with a call.
        </p>
        <div className="cta-contact wipe wipe-d3">
          <a href="tel:+16789714711" className="cta-phone">+1 678-971-4711</a>
          <a href="mailto:info@thepowerscompany.com" className="cta-email">info@thepowerscompany.com</a>
        </div>
        <div style={{ marginTop: 32 }} className="wipe wipe-d4">
          <Link to="/contact" className="brief-doc-cta-button" data-testid="leadership-final-cta">Start the conversation &rarr;</Link>
        </div>
      </div>
    </section>
  );
}

function LeadershipStyles() {
  return (
    <style>{`
      .leaders-grid {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        max-width: 1080px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 36px 28px;
      }
      @media (max-width: 1023px) {
        .leaders-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 639px) {
        .leaders-grid { grid-template-columns: 1fr; gap: 36px; }
      }
      .leader-card {
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 480ms cubic-bezier(.2,.85,.25,1),
                    transform 480ms cubic-bezier(.2,.85,.25,1);
        transition-delay: calc(120ms + var(--i, 0) * 70ms);
      }
      .brief-doc-station.is-in .leader-card { opacity: 1; transform: translateY(0); }
      .leader-card-link {
        display: block;
        text-decoration: none;
        color: inherit;
      }
      .leader-photo {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        background: ${PAPER};
        border: 1px solid rgba(13, 36, 66, 0.10);
        transition: border-color 220ms ease, transform 220ms ease;
      }
      .leader-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 400ms ease;
      }
      .leader-card-link:hover .leader-photo {
        border-color: ${GOLD_BRIGHT};
        transform: translateY(-3px);
      }
      .leader-card-link:hover .leader-photo img {
        transform: scale(1.03);
      }
      .leader-name {
        font-family: ${TYPE.sans};
        font-size: 19px;
        font-weight: 700;
        color: ${NAVY};
        margin-top: 18px;
        line-height: 1.2;
        letter-spacing: -0.003em;
        transition: color 160ms ease;
      }
      .leader-card-link:hover .leader-name { color: ${GOLD_BRIGHT}; }
      .leader-title {
        font-family: ${TYPE.sans};
        font-size: 13px;
        font-weight: 400;
        color: ${TEXT_BODY};
        line-height: 1.45;
        margin-top: 6px;
      }
      .leader-linkedin {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 14px;
        font-family: ${TYPE.sans};
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.12em;
        color: ${NAVY};
        text-transform: uppercase;
        text-decoration: none;
        transition: color 160ms ease;
        align-self: flex-start;
      }
      .leader-linkedin svg { color: ${GOLD_BRIGHT}; flex-shrink: 0; }
      .leader-linkedin:hover { color: ${GOLD_BRIGHT}; }

      /* CTA contact block — sits between the H2 lede and the
         button, picking up the phone/email pair from the legacy
         page. Phone uses navy sans-bold; email uses gold-link
         treatment that matches the brief's voice. */
      .cta-contact {
        margin-top: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .cta-phone {
        font-family: ${TYPE.sans};
        font-size: 22px;
        font-weight: 500;
        color: ${NAVY};
        text-decoration: none;
        letter-spacing: 0.005em;
      }
      .cta-email {
        font-family: ${TYPE.sans};
        font-size: 16px;
        font-weight: 400;
        color: ${GOLD_BRIGHT};
        text-decoration: none;
        transition: color 160ms ease;
      }
      .cta-email:hover { color: ${NAVY}; }

      @media (prefers-reduced-motion: reduce) {
        .leader-card { opacity: 1 !important; transform: none !important; transition: none !important; }
      }
    `}</style>
  );
}
