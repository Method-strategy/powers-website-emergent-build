// Maps the legacy .html href slugs (per site-nav.jsx) to React Router paths.
// Kept centrally so both header + footer + legacy-page link-intercept share the same mapping.
export const HTML_TO_ROUTE = {
  'index.html': '/',
  'approach.html': '/approach',
  'discovery-process.html': '/discovery-process',
  'industries-served.html': '/industries-served',
  'case-studies.html': '/case-studies',
  'powers-case-study-library.html': '/case-studies',
  'operational-discipline.html': '/operational-discipline',
  'operational-readiness.html': '/operational-discipline', // retired alias — renamed
  'frontline-leadership.html': '/frontline-leadership',
  'equipment-reliability.html': '/equipment-reliability',
  'workforce-capability.html': '/workforce-capability',
  'supply-chain.html': '/workforce-capability', // retired alias — replaced
  'daily-accountability.html': '/daily-accountability',
  'history.html': '/history',
  'leadership.html': '/leadership',
  'company-news.html': '/company-news',
  'careers.html': '/careers',
  'insights.html': '/insights',
  'contact.html': '/contact',
  'randall-powers.html': '/leadership/randall-powers',
  'sean-hart.html': '/leadership/sean-hart',
  'saul-bautista.html': '/leadership/saul-bautista',
  'ken-wiesinger.html': '/leadership/ken-wiesinger',
  'justin-pethick.html': '/leadership/justin-pethick',
  'kevin-sabany.html': '/leadership/kevin-sabany',
  'case-study-defense-aerospace-otd.html': '/case-studies/defense-aerospace-otd',
  'our-approach.html': '/approach', // retired alias
};

export function toRoute(href) {
  if (!href) return '#';
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return href;
  }
  // strip hash and query
  const [bare, hash] = href.split('#');
  const mapped = HTML_TO_ROUTE[bare];
  if (mapped) return hash ? `${mapped}#${hash}` : mapped;
  return href;
}

// Returns true if the href should be handled by react-router (i.e. internal)
export function isInternal(href) {
  if (!href) return false;
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  return true;
}
