/**
 * POWERS Knowledge Base destinations — 5 hub-level resources that
 * /insights jumps off to.
 *
 * Per 2026-06-29 architectural decision: each destination renders
 * as a full editorial card in a row on the Insights Hub (not a
 * floating side rail). Blurb copy is verbatim from the client brief.
 *
 * Currently links to the legacy WordPress URLs, opened in a new tab
 * (matches the established pattern for case studies + company news
 * external articles). Each destination is a future candidate for
 * native React port — captured in /app/memory/PRD.md backlog.
 *
 * Order is editorial, per the client brief.
 */

export const knowledgeBase = [
  {
    slug: 'mastery-series',
    label: 'Mastery Series',
    blurb: '15 multi-part deep dives on the topics that move operational performance. Roughly 150 articles in all.',
    externalUrl: 'https://www.thepowerscompany.com/manufacturing-mastery-series/',
    badge: '150 articles',
  },
  {
    slug: 'manufacturing-kpis',
    label: 'Manufacturing KPIs',
    blurb: 'The metrics operations leaders actually use. Defined, contextualized, and tied to what they move.',
    externalUrl: 'https://www.thepowerscompany.com/manufacturing-metrics/',
    badge: 'Metrics library',
  },
  {
    slug: 'glossary',
    label: 'Glossary',
    blurb: 'Operational performance vocabulary. Definitions written by practitioners, not dictionary entries.',
    externalUrl: 'https://www.thepowerscompany.com/glossary/',
    badge: 'A–Z reference',
  },
  {
    slug: 'faqs',
    label: 'FAQs',
    blurb: 'The questions operations leaders ask before engaging POWERS. Answered directly.',
    externalUrl: 'https://www.thepowerscompany.com/frequently-asked-questions-faqs/',
    badge: 'Direct answers',
  },
  {
    slug: 'downloadables',
    label: 'Downloadables',
    blurb: 'Field-ready guides, frameworks, and reference materials.',
    externalUrl: 'https://www.thepowerscompany.com/downloadables/',
    badge: 'Guides & frameworks',
  },
];
