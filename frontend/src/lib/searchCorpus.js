/**
 * searchCorpus — unified omni-search index for the global Cmd-K
 * modal. Pulls from every knowledge-base data source and normalizes
 * every entry into the same shape so the modal can render mixed
 * result groups without per-source branching.
 *
 *   group       : human label for the result section
 *   groupOrder  : stable ordering when results from multiple sources
 *                 tie on relevance
 *   label       : primary display text (term, question, article title)
 *   subtitle    : optional context line (definition snippet, author,
 *                 discipline tag, etc.)
 *   to          : SPA route (passed to <Link>) — when present
 *   href        : external URL (opens in new tab) — when present
 *   keywords    : full search corpus (label + subtitle + body)
 *
 * Built lazily once on module load; the data sources are static so a
 * single pass is enough.
 */

import { glossarySections } from '../data/glossary';
import { masterySeries } from '../data/masterySeries';
import { downloadables } from '../data/downloadables';
import { kpiCategories } from '../data/kpis';
import { insights } from '../data/insights';

// FAQs are inlined inside the page module. We mirror the slug → label
// map here so we don't have to import a JSX module from a data util.
const FAQ_ENTRIES = [
  { slug: 'consulting-difference', q: 'How is POWERS different from a typical management consulting firm?' },
  { slug: 'how-we-work',           q: 'How does POWERS work?' },
  { slug: 'cost',                  q: 'What does it cost? And how do you charge?' },
  { slug: 'timeline',              q: 'How long does an engagement take?' },
  { slug: 'engagement-start',      q: 'Where do POWERS engagements start?' },
  { slug: 'industries',            q: 'What industries does POWERS work in?' },
  { slug: 'size',                  q: 'What size operations does POWERS work with?' },
  { slug: 'guarantee',             q: 'Do you guarantee results?' },
  { slug: 'internal-ci-opex',      q: 'How is POWERS different from our internal continuous improvement or operational excellence team?' },
  { slug: 'after-engagement',      q: 'What happens after the engagement ends?' },
  { slug: 'name',                  q: 'Why "POWERS"?' },
];

function snippet(text, n = 110) {
  if (!text) return '';
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t;
}

const corpus = [];

// 1. Glossary terms — 30
glossarySections.forEach((section) => {
  section.terms.forEach((t) => {
    corpus.push({
      id: `glossary:${t.slug}`,
      group: 'Glossary',
      groupOrder: 1,
      label: t.term,
      subtitle: snippet(t.def, 130),
      to: `/glossary#${t.slug}`,
      keywords: `${t.term} ${t.def}`.toLowerCase(),
    });
  });
});

// 2. FAQs — 11
FAQ_ENTRIES.forEach((f) => {
  corpus.push({
    id: `faq:${f.slug}`,
    group: 'FAQs',
    groupOrder: 2,
    label: f.q,
    subtitle: 'Frequently asked question',
    to: `/frequently-asked-questions-faqs#${f.slug}`,
    keywords: f.q.toLowerCase(),
  });
});

// 3. Insights blog posts (external WP URLs)
insights.forEach((a) => {
  corpus.push({
    id: `insight:${a.slug}`,
    group: 'Insights',
    groupOrder: 3,
    label: a.title,
    subtitle: `${a.discipline} · ${a.date}`,
    href: a.externalUrl,
    external: true,
    keywords: `${a.title} ${a.excerpt || ''} ${a.discipline} ${a.author || ''}`.toLowerCase(),
  });
});

// 4. Mastery Series — pillars + every numbered part
masterySeries.forEach((s) => {
  corpus.push({
    id: `mastery-pillar:${s.slug}`,
    group: 'Mastery Series',
    groupOrder: 4,
    label: s.pillarTitle,
    subtitle: `${s.title} · Pillar`,
    href: s.pillarUrl,
    external: true,
    keywords: `${s.title} ${s.pillarTitle} ${s.intro}`.toLowerCase(),
  });
  s.parts.forEach((p, i) => {
    corpus.push({
      id: `mastery-part:${s.slug}:${i}`,
      group: 'Mastery Series',
      groupOrder: 4,
      label: p.title,
      subtitle: `${s.title} · Part ${String(i + 1).padStart(2, '0')}`,
      href: p.url,
      external: true,
      keywords: `${s.title} ${p.title}`.toLowerCase(),
    });
  });
});

// 5. Downloadables (PDFs)
downloadables.forEach((d) => {
  corpus.push({
    id: `download:${d.slug}`,
    group: 'Downloadables',
    groupOrder: 5,
    label: d.title,
    subtitle: snippet(d.description, 130),
    href: d.pdf,
    external: true,
    isPdf: true,
    keywords: `${d.title} ${d.description}`.toLowerCase(),
  });
});

// 6. KPI categories (in-page anchor jump)
kpiCategories.forEach((c) => {
  corpus.push({
    id: `kpi:${c.slug}`,
    group: 'Manufacturing KPIs',
    groupOrder: 6,
    label: c.title,
    subtitle: snippet(c.intro, 130),
    to: `/manufacturing-metrics#kpi-${c.slug}`,
    keywords: `${c.title} ${c.intro} ${c.kpis.map((k) => k.name).join(' ')}`.toLowerCase(),
  });
});

export const SEARCH_CORPUS = corpus;

// Scoring: exact-word matches in label outrank partial matches in
// subtitle / keywords. Empty query returns nothing — the modal shows
// an empty-state with category browse buttons instead.
export function searchCorpus(query, limit = 40) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = [];
  for (const item of corpus) {
    const labelLc = item.label.toLowerCase();
    let score = 0;
    let allTokensHit = true;
    for (const t of tokens) {
      if (labelLc.startsWith(t)) score += 100;
      else if (labelLc.includes(` ${t}`) || labelLc.includes(`(${t}`) || labelLc.includes(`${t} `)) score += 60;
      else if (labelLc.includes(t)) score += 40;
      else if (item.keywords.includes(t)) score += 20;
      else { allTokensHit = false; break; }
    }
    if (allTokensHit && score > 0) {
      scored.push({ ...item, _score: score });
    }
  }
  scored.sort((a, b) => b._score - a._score || a.groupOrder - b.groupOrder);
  return scored.slice(0, limit);
}
