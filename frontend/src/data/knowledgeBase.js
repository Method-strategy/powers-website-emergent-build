/**
 * POWERS Knowledge Base destinations — 5 hub-level resources that
 * /insights jumps off to.
 *
 * Per 2026-06-29 architectural decision: each destination renders
 * as a full editorial card in a row on the Insights Hub (not a
 * floating side rail). Blurb copy is verbatim from the client brief.
 *
 *   internal: true  → React Router <Link> to a native page within the SPA.
 *   internal: false → <a target="_blank"> to the legacy WP URL.
 *
 * As KB destinations get ported into React, flip their `internal`
 * flag and update `path` to the canonical legacy slug (URLs are
 * preserved 1:1 to keep their accumulated link authority — at
 * launch, Patrik's path-proxy at WP Engine serves React for these
 * paths while sub-content under /resources, /wp-content, etc.
 * continues to be served from WordPress).
 */

export const knowledgeBase = [
  {
    slug: 'mastery-series',
    label: 'Mastery Series',
    blurb: '15 multi-part deep dives on the topics that move operational performance. Roughly 150 articles in all.',
    internal: true,
    path: '/manufacturing-mastery-series',
    externalUrl: 'https://www.thepowerscompany.com/manufacturing-mastery-series/',
    badge: '150 articles',
  },
  {
    slug: 'downloadables',
    label: 'Downloadables',
    blurb: 'Field-ready guides, frameworks, and reference materials.',
    internal: true,
    path: '/downloadables',
    externalUrl: 'https://www.thepowerscompany.com/downloadables/',
    badge: 'Guides & frameworks',
  },
  {
    slug: 'manufacturing-kpis',
    label: 'Manufacturing KPIs',
    blurb: 'The metrics operations leaders actually use. Defined, contextualized, and tied to what they move.',
    internal: true,
    path: '/manufacturing-metrics',
    externalUrl: 'https://www.thepowerscompany.com/manufacturing-metrics/',
    badge: 'Metrics library',
  },
  {
    slug: 'faqs',
    label: 'FAQs',
    blurb: 'The questions operations leaders ask before engaging POWERS. Answered directly.',
    internal: true,
    path: '/frequently-asked-questions-faqs',
    externalUrl: 'https://www.thepowerscompany.com/frequently-asked-questions-faqs/',
    badge: 'Direct answers',
  },
  {
    slug: 'glossary',
    label: 'Glossary',
    blurb: 'Operational performance vocabulary. Definitions written by practitioners, not dictionary entries.',
    internal: false,
    externalUrl: 'https://www.thepowerscompany.com/glossary/',
    badge: 'A–Z reference',
  },
];
