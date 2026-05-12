/**
 * Canonical case-study dataset — single source of truth for both the detail
 * page hero and the library card.
 *
 * Schema mirrors the ACF field map documented in CLAUDE.md "Case Study Detail
 * Template — LOCKED v0.2.1" so the future Faust/WordPress build can drop a
 * WPGraphQL query in place of this static export without touching React.
 *
 * Field map (HTML hero element  →  field name):
 *   eyebrow industry tag        →  industry
 *   H1 headline result          →  headlineResult
 *   italic descriptor           →  subtitle
 *   Executive Brief body        →  summary
 *   disciplines line            →  serviceLines (multi-tag)
 *   stat tiles (3-up)           →  statTiles  [{icon,value,label}]
 *
 * Only the Defense & Aerospace case study has an internal detail route today;
 * the other 66 continue to link out to thepowerscompany.com. As the rest are
 * refreshed against the master spreadsheet, append entries here and create
 * `/case-studies/<slug>` routes that consume the same data.
 */

export const caseStudies = {
  'defense-aerospace-otd': {
    slug: 'defense-aerospace-otd',
    num: 54,
    industry: 'Defense & Aerospace',
    headlineResult:
      'On-time performance climbed from 56% to 89% inside a make-to-order defense operation that had been running on opinion.',
    subtitle: 'Make-to-Order Defense Manufacturer',
    summary:
      "Schedules shifted hourly, supervisors couldn't tell operators what to work on, and rework time nearly equaled first-pass assembly. POWERS installed a unified production schedule, a working capacity model, and the leadership routines required to hold both. On-time performance improved 59% without expansion, hiring, or new equipment.",
    serviceLines: ['MOS', 'Frontline Leadership', 'Supply Chain'],
    statTiles: [
      { icon: 'target', value: '59%', label: 'On-time performance,\n56% to 89%' },
      { icon: 'clock-bolt', value: '65%', label: 'Lead time in testing,\n7.5 days to 2.5' },
      { icon: 'trending-down', value: '69%', label: 'Lost time reduction\nin SMT operations' },
    ],
    // Library card metadata (used only by CaseStudies.jsx data merge)
    date: '2021-08-18',
    challenges: ['Poor on-time delivery and schedule attainment', 'Inconsistent performance across shifts or sites'],
    internalRoute: '/case-studies/defense-aerospace-otd',
  },
};

export function getCaseStudy(slug) {
  return caseStudies[slug] || null;
}
