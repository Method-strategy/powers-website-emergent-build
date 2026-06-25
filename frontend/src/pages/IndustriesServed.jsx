import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BriefDocStyles, { useInViewClass, NAVY, PAPER, GOLD_BRIGHT, TEXT_BODY, TYPE } from '../components/BriefDocStyles';
import { INDUSTRY_GROUPS } from '../data/industries';

function Section({ children, dark, style }) {
  const ref = useRef(null); useInViewClass(ref);
  return (
    <section ref={ref} className="brief-doc-station" style={{ background: dark ? NAVY : PAPER, ...style }}>
      <div className="brief-doc-inner">{children}</div>
    </section>
  );
}

export default function IndustriesServed() {
  useEffect(() => { document.title = 'Manufacturing Industries We Serve | POWERS Consulting'; }, []);
  const heroRef = useRef(null); useInViewClass(heroRef);
  const ctaRef = useRef(null); useInViewClass(ctaRef);
  return (
    <>
      <BriefDocStyles />
      <main style={{ paddingTop: 'var(--header-h, 112px)' }}>
        <section ref={heroRef} className="brief-page-hero">
          <img
            className="brief-page-hero-bg"
            src="/uploads/industries-served-hero-bg.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            data-testid="industries-served-hero-bg"
          />
          <div className="brief-page-hero-wash" aria-hidden="true" />
          <div className="brief-doc-inner">
            <div className="brief-doc-col">
              <div className="station-index wipe" style={{ marginBottom: 24 }}>Industries Served</div>
              <h1 className="brief-doc-h1 wipe wipe-d1">
                <span>Different industries.</span>
                <span className="accent">The same execution discipline.</span>
              </h1>
              <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
                We work in industries where the conditions look completely different on the surface and remarkably similar underneath. Different products. Different scales. Different regulatory regimes. The same five disciplines underneath the operations that perform. The same financial result when those disciplines hold up under pressure.
              </p>
              <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 56 }} />
            </div>
          </div>
        </section>

        <Section>
          <div className="station-index wipe">The Pattern Across Industries</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>From the vantage point of execution,</span>
            <span className="pivot">industries look more similar than different.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <div className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>
            <p>A multi-site protein processor and a PE-backed metals platform produce completely different outputs. But the operational pressures that put their performance at risk look remarkably alike. Demand volatility. Supply chain stress. Workforce capability gaps. Regulatory and compliance expansion. Equipment reliability under conditions the operation wasn&rsquo;t designed for. The drift between executive intent and shop floor execution that quietly erodes margin between Monday morning and Friday afternoon.</p>
            <p>What changes industry to industry is the specific operational vocabulary, the regulatory architecture, and the buyer&rsquo;s language. What doesn&rsquo;t change is the diagnostic frame, the disciplines we build, or the commercial structure we work under. <em>Paid engagement. Results-based ROI. Skin in the game.</em></p>
            <p>That&rsquo;s why the pattern of our work travels. The operations we&rsquo;ve strengthened in food and beverage manufacturing taught us things that landed cleanly in metals and mining. The lessons from aerospace and defense translated into pharmaceutical and medical device engagements. The disciplines we built in automotive tier-1 supplier operations now serve consumer packaged goods platforms.</p>
          </div>
        </Section>

        <Section style={{ background: '#f3f0e8' }}>
          <div className="station-index wipe">Who We Work With</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Multi-site operators. PE-backed platforms.</span>
            <span className="pivot">Organizations under real-world pressure to perform.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>
            We work with manufacturers, processors, and distributors operating at scale across one to many sites. Operating leaders running production environments where execution gets measured every shift. PE operating partners who need an EBITDA improvement strategy that compounds rather than fades. Corporate executives managing integrations, growth initiatives, or footprint expansions that require operating capacity the legacy organization can&rsquo;t yet sustain.
          </p>
          <p className="brief-doc-body wipe wipe-d4" style={{ marginTop: 16, fontStyle: 'italic' }}>
            If your operation runs across more than one site, the conversation about scope starts on the{' '}
            <Link to="/contact" className="brief-inline-link" data-testid="hub-link-contact">contact page</Link>.
          </p>
        </Section>

        <Section>
          <div className="station-index wipe">Industries Grid</div>
          <h2 className="brief-doc-h2 wipe wipe-d1">
            <span>Experience that crosses many industries.</span>
            <span className="pivot">One execution discipline underneath.</span>
          </h2>
          <div className="brief-doc-rule-gold wipe wipe-d2" />
          <p className="brief-doc-body wipe wipe-d3" style={{ marginTop: 24 }}>
            Each industry page below names the specific pressures, the operational vocabulary, the sub-segments we work in, and the metrics we move. The disciplines we build are the same. The application is industry-specific.
          </p>
          <div className="hub-groups wipe wipe-d4">
            {INDUSTRY_GROUPS.map((group, gi) => (
              <div key={gi} className="hub-group">
                <div className="hub-group-label">{group.label}</div>
                <ul className="hub-cards">
                  {group.items.map(item => (
                    <li key={item.slug} className="hub-card">
                      <Link to={`/industries-served/${item.slug}`} className="hub-card-link" data-testid={`industry-card-${item.slug}`}>
                        <div className="hub-card-name">{item.name}</div>
                        <div className="hub-card-blurb">{item.blurb}</div>
                        <div className="hub-card-arrow">&rarr;</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <section className="brief-doc-station brief-doc-cta" ref={ctaRef} style={{ background: NAVY }}>
          <div className="brief-doc-inner" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
            <div className="station-index wipe" style={{ margin: '0 auto 18px', color: GOLD_BRIGHT }}>Ready to Talk</div>
            <h2 className="brief-doc-h2 wipe wipe-d1" style={{ margin: '0 auto', maxWidth: 880, alignItems: 'center', color: '#ffffff' }}>
              <span>The disciplines that drive performance</span>
              <span className="pivot">travel across every industry we serve.</span>
            </h2>
            <p className="brief-doc-lede wipe wipe-d2" style={{ margin: '24px auto 0', maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
              The execution challenges that compress margin look remarkably similar across industries. The operational gaps that erode margin between Monday morning and Friday afternoon don&rsquo;t recognize industry boundaries. Whether your operation is listed above, adjacent to one that is, or in a category we haven&rsquo;t named, the disciplines we build apply. Let&rsquo;s talk about your operation.
            </p>
            <div style={{ marginTop: 36 }} className="wipe wipe-d3">
              <Link to="/contact" className="brief-doc-cta-button" data-testid="hub-cta-contact">
                Start a Conversation <span className="brief-doc-cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="wipe wipe-d4" style={{ marginTop: 22, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)' }}>
              Looking for proof?{' '}
              <Link
                to="/case-studies"
                className="brief-inline-link brief-inline-link--on-dark"
                data-testid="hub-cta-cases"
              >Search our case study library by industry, service type, or operational challenge &rarr;</Link>
            </p>
          </div>
        </section>
      </main>

      <style>{`
        .hub-groups { margin-top: 56px; display: flex; flex-direction: column; gap: 56px; }
        .hub-group-label {
          font-family: ${TYPE.mono}; font-size: 11px;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: ${GOLD_BRIGHT}; margin-bottom: 24px;
          padding-bottom: 12px; border-bottom: 1px solid rgba(13,36,66,0.16);
        }
        .hub-cards { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        @media (max-width: 768px) { .hub-cards { grid-template-columns: 1fr; } }
        .hub-card-link {
          display: block; padding: 24px; background: #ffffff;
          border: 1px solid rgba(13,36,66,0.12); text-decoration: none; color: ${NAVY};
          transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
          position: relative; height: 100%;
        }
        .hub-card-link:hover {
          border-color: ${GOLD_BRIGHT}; transform: translateY(-2px);
          box-shadow: 0 16px 40px -16px rgba(13,36,66,0.18);
        }
        .hub-card-name { font-family: ${TYPE.sans}; font-size: 18px; font-weight: 700; color: ${NAVY}; margin-bottom: 8px; letter-spacing: -0.005em; }
        .hub-card-blurb { font-family: ${TYPE.sans}; font-size: 14px; line-height: 1.55; color: ${TEXT_BODY}; padding-right: 32px; }
        .hub-card-arrow { position: absolute; right: 20px; top: 24px; color: ${GOLD_BRIGHT}; font-size: 18px; transition: transform 200ms ease; }
        .hub-card-link:hover .hub-card-arrow { transform: translateX(4px); }

        .brief-doc-cta-button.ip-cta-ghost { background: transparent; color: #ffffff; border: 1px solid rgba(255,255,255,0.45); }
        .brief-doc-cta-button.ip-cta-ghost:hover { border-color: ${GOLD_BRIGHT}; color: ${GOLD_BRIGHT}; transform: translateY(-2px); }
      `}</style>
    </>
  );
}
