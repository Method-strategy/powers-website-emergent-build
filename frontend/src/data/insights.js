/**
 * Insights articles dataset — feeds /insights blog aggregator.
 *
 * Schema mirrors the WPGraphQL / SEOPress response shape so this file
 * can be swapped 1:1 with a `useQuery` at launch:
 *
 *   slug          string   — internal-route-style slug, React key
 *   title         string   — full headline (rendered verbatim)
 *   date          string   — "Month DD, YYYY" display date
 *   dateISO       string   — YYYY-MM-DD for sorting
 *   author        string   — byline (Justin Pethick, Sean Hart, POWERS)
 *   excerpt       string   — 1–2 line excerpt for the card
 *   image         string   — absolute URL to the article hero/thumb
 *                            (legacy WP path while we share the CDN)
 *   discipline    string   — soft tag, surfaced in card meta. We do
 *                            NOT filter by discipline (per 2026-06-29
 *                            client direction — content isn't fully
 *                            categorized yet); it's used purely as
 *                            a visual eyebrow chip on each card.
 *   externalUrl   string   — full URL to the live article on
 *                            thepowerscompany.com/resources/ — the
 *                            cards open in a new tab until the
 *                            native React article-detail template
 *                            lands. SEO authority stays on the WP
 *                            URLs in the meantime.
 *
 * Sort = reverse chronological by `dateISO`. The first ~12 entries
 * here are real articles pulled from the legacy aggregator; the
 * remainder is a marked placeholder block to stress-test the Load
 * More UI + keyword search.
 */

export const insights = [
  {
    slug: 'talent-matters-systems-win',
    title: 'Talent Matters. Systems Win.',
    date: 'June 17, 2026',
    dateISO: '2026-06-17',
    author: 'Justin Pethick',
    discipline: 'Frontline Leadership',
    excerpt: 'Manufacturers invest heavily in talent, technology, equipment, and strategy. Yet potential alone does not create results. The organizations that consistently outperform are those that build the systems, leadership routines, and operational discipline required to turn talent into performance.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/06/talent-and-system-wins-post.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/talent-matters-systems-win/',
  },
  {
    slug: 'americas-manufacturing-challenge',
    title: "America's Manufacturing Challenge: You Can't Build Capacity Without Capability",
    date: 'June 2, 2026',
    dateISO: '2026-06-02',
    author: 'POWERS',
    discipline: 'Workforce Capability',
    excerpt: 'Reshoring and capacity investment headlines miss the deeper constraint: capable people, capable supervisors, and the operating systems that hold both together.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/06/Capacity-with-Capability-Post-768x401.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/resources-americas-manufacturing-challenge-you-cant-build-capacity-without-capability/',
  },
  {
    slug: 'americas-manufacturing-problem-isnt-just-labor',
    title: "America's Manufacturing Problem Isn't Just Labor — It's Leadership",
    date: 'May 27, 2026',
    dateISO: '2026-05-27',
    author: 'Justin Pethick',
    discipline: 'Frontline Leadership',
    excerpt: 'The shortage everyone discusses is the labor pool. The shortage that actually limits performance sits one layer up — in the supervisor and team-lead population.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/05/not-just-labor-but-leadership-post-768x401.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/americas-manufacturing-problem-isnt-just-labor-its-leadership/',
  },
  {
    slug: 'future-of-american-manufacturing-frontline-leaders',
    title: 'The Future of American Manufacturing Will Be Won by Frontline Leaders — Not Technology Alone',
    date: 'May 19, 2026',
    dateISO: '2026-05-19',
    author: 'Justin Pethick',
    discipline: 'Frontline Leadership',
    excerpt: 'Technology accelerates capable operations and exposes underbuilt ones. The differentiator over the next decade will be the strength of the people running each shift.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/05/future-of-manufacturing-post.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/the-future-of-american-manufacturing-will-be-won-by-frontline-leaders-not-technology-alone/',
  },
  {
    slug: 'hamilton-had-the-strategy',
    title: 'Hamilton Had the Strategy. Manufacturers Need the Execution',
    date: 'May 12, 2026',
    dateISO: '2026-05-12',
    author: 'Justin Pethick',
    discipline: 'Operational Discipline',
    excerpt: 'Industrial policy has always demanded an operational counterpart. The current policy window only converts into manufacturing strength if execution catches up.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/05/hamilton-had-a-strategy.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/hamilton-had-the-strategy-manufacturers-need-the-execution/',
  },
  {
    slug: 'americas-industrial-reset',
    title: "America's Industrial Reset: Is Your Operation Ready for It?",
    date: 'May 5, 2026',
    dateISO: '2026-05-05',
    author: 'Justin Pethick',
    discipline: 'Operational Discipline',
    excerpt: 'A reindustrialization cycle is underway. The operations ready for it look different from the operations being carried by the last twenty years of cheap capital.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/05/Americas-Industrial-Reset-Post-Thumbnail.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/americas-industrial-reset-manufacturing-readiness/',
  },
  {
    slug: 'frontline-leadership-problem',
    title: 'You Have a Frontline Leadership Problem. The Numbers Show It.',
    date: 'April 20, 2026',
    dateISO: '2026-04-20',
    author: 'POWERS',
    discipline: 'Frontline Leadership',
    excerpt: 'Variation by shift, by line, by supervisor. The numbers are telling you where capability is missing — and where investment will actually convert.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/04/frontline-leadership-problem-post.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/frontline-leadership-problem-manufacturing-performance/',
  },
  {
    slug: 'unlocking-ma-value-operating-model',
    title: "Unlocking M&A Value: You Didn't Buy Capacity. You Took On Another Operating Model.",
    date: 'April 13, 2026',
    dateISO: '2026-04-13',
    author: 'Justin Pethick',
    discipline: 'Operational Discipline',
    excerpt: 'The acquired operation has its own habits, its own escalation paths, its own definition of "good." Integration value lives in reconciling them — quickly and visibly.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/04/You-Didnt-Buy-Capacity-post-thumb.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/unlocking-ma-value-operating-model-integration-manufacturing/',
  },
  {
    slug: 'where-execution-breaks-first',
    title: 'Where Execution Breaks First When a Scaled Operation Is Put Under Pressure',
    date: 'April 6, 2026',
    dateISO: '2026-04-06',
    author: 'Sean Hart',
    discipline: 'Daily Accountability',
    excerpt: 'Pressure exposes the seams. The first cracks always show up in the same places — and they tell you where the operating system is underbuilt.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/04/Execution-breaks-first-post.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/where-execution-breaks-first-under-pressure/',
  },
  {
    slug: 'what-can-you-actually-count-on',
    title: 'When Your Operation Is Tested, What Can You Actually Count On?',
    date: 'March 31, 2026',
    dateISO: '2026-03-31',
    author: 'Sean Hart',
    discipline: 'Operational Discipline',
    excerpt: 'Every operation has a story it tells about itself. Pressure tells you which parts of that story are documented, drilled, and actually load-bearing.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/03/What-can-you-actually-count-on-post.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/when-your-operation-is-tested-what-can-you-actually-count-on/',
  },
  {
    slug: 'scaling-success-defined-formalized-enforced',
    title: 'What Has to Be Defined, Formalized, and Enforced as You Scale',
    date: 'March 23, 2026',
    dateISO: '2026-03-23',
    author: 'Sean Hart',
    discipline: 'Operational Discipline',
    excerpt: 'Growth surfaces every implicit standard your operation has been carrying. The ones you can\'t articulate are the ones that break first.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/03/Enforced-as-You-Scale-post.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/scaling-success-defined-formalized-enforced-operations/',
  },
  {
    slug: 'unlocking-ma-value-can-operating-model-scale',
    title: 'Unlocking M&A Value: Can Your Operating Model Scale Across The Portfolio?',
    date: 'March 17, 2026',
    dateISO: '2026-03-17',
    author: 'Justin Pethick',
    discipline: 'Operational Discipline',
    excerpt: 'The model that built the platform isn\'t automatically the model that scales across the portfolio. Knowing where it breaks is the first integration deliverable.',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/03/Can-Your-Operating-Model-Scale-post.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/unlocking-ma-value-can-your-operating-model-scale-across-the-portfolio/',
  },

  /* ╔══════════════════════════════════════════════════════════════
     ║  PLACEHOLDER FILLER — REMOVE BEFORE LAUNCH
     ║  ─────────────────────────────────────────────────────────────
     ║  Dummy entries seeded purely so the Load More UI + keyword
     ║  search + dense archive layout can be validated visually with
     ║  realistic article density. Titles + excerpts are composed
     ║  from real POWERS editorial themes (the five disciplines and
     ║  cross-cutting dimensions called out in the hero copy) so the
     ║  cards read like the genuine catalog.
     ║
     ║  No images are set on placeholders — they render with the
     ║  discipline-tinted gradient fallback so the difference between
     ║  "real article" and "placeholder" is visually obvious during
     ║  client review.
     ║
     ║  DELETE THIS WHOLE BLOCK when wiring the WordPress data
     ║  layer at launch.
     ╚══════════════════════════════════════════════════════════════ */
  { slug: 'demo-i1',  title: 'The Standard Work That Actually Holds — and the Kind That Quietly Doesn\'t',                          date: 'March 10, 2026',     dateISO: '2026-03-10', author: 'POWERS',         discipline: 'Operational Discipline', excerpt: 'Standard work that lives in a binder is not standard work. The difference between documented and operating is where most performance leaks happen.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i2',  title: 'The Tier 1 Huddle: How a 15-Minute Routine Decides the Rest of the Shift',                              date: 'March 3, 2026',      dateISO: '2026-03-03', author: 'Justin Pethick', discipline: 'Daily Accountability',  excerpt: 'The shift-start huddle is either the most useful 15 minutes in your operation, or the most performative. There is no middle position.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i3',  title: 'OEE Is a Number. What You Do With It Is a Discipline.',                                                date: 'February 24, 2026',  dateISO: '2026-02-24', author: 'Sean Hart',      discipline: 'Equipment Reliability', excerpt: 'Operations report OEE every week. Far fewer convert that number into action that compounds. Here\'s the gap, and how to close it.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i4',  title: 'The Frontline Promotion Problem — and Why It\'s Costing You More Than You Think',                      date: 'February 17, 2026',  dateISO: '2026-02-17', author: 'POWERS',         discipline: 'Frontline Leadership',  excerpt: 'Promoting your best operator into a supervisor role without development isn\'t a promotion. It\'s a loss of two performers.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i5',  title: 'Capacity Utilization Isn\'t a Number — It\'s a Habit System',                                          date: 'February 10, 2026',  dateISO: '2026-02-10', author: 'Justin Pethick', discipline: 'Operational Discipline', excerpt: 'Operations chasing capacity often have the assets. What they don\'t have are the routines that consistently extract output from them.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i6',  title: 'Why Most Continuous Improvement Programs Slow Down at Year Three',                                     date: 'February 3, 2026',   dateISO: '2026-02-03', author: 'Sean Hart',      discipline: 'Operational Discipline', excerpt: 'The early wins were tool-led. The plateau is leadership-led. Most CI programs never make that handoff cleanly.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i7',  title: 'Reliability Centered Maintenance Is Cheap. Reliability Centered Leadership Is Where the Cost Hides.', date: 'January 27, 2026',   dateISO: '2026-01-27', author: 'POWERS',         discipline: 'Equipment Reliability', excerpt: 'You can buy the program. You can\'t buy the supervisors who actually carry it on the shop floor.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i8',  title: 'The Audit That Tells You Whether Your Operation Will Survive the Next Pressure Test',                  date: 'January 20, 2026',   dateISO: '2026-01-20', author: 'Justin Pethick', discipline: 'Operational Discipline', excerpt: 'Twelve questions. Ask them honestly, and you\'ll know whether your operating system is structural or theatrical.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i9',  title: 'Root Cause Analysis: The Five Whys Stop Working Around Year Two',                                      date: 'January 13, 2026',   dateISO: '2026-01-13', author: 'Sean Hart',      discipline: 'Operational Discipline', excerpt: 'The teams asking the Five Whys forever are usually solving the wrong layer of the problem. Here\'s what comes next.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i10', title: 'The Operations Job Description That Filters for Capability Instead of Tenure',                          date: 'January 6, 2026',    dateISO: '2026-01-06', author: 'POWERS',         discipline: 'Workforce Capability',  excerpt: 'Most operations hiring filters for resume keywords. The operations that win filter for the habits that compound performance.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i11', title: 'How To Read Variability — What Your KPI Range Is Actually Telling You',                                date: 'December 16, 2025',  dateISO: '2025-12-16', author: 'Justin Pethick', discipline: 'Daily Accountability',  excerpt: 'The mean tells you the story you want. The range tells you the story your operation is actually living.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i12', title: 'The Hidden Cost of Heroes — Why Top Performers Mask Operational Risk',                                  date: 'December 9, 2025',   dateISO: '2025-12-09', author: 'Sean Hart',      discipline: 'Workforce Capability',  excerpt: 'Heroes carry the operation. They also obscure where the system is missing. Both things are true at the same time.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i13', title: 'Cost Reduction That Compounds — and Cost Reduction That Comes Back as a Bigger Number',                date: 'December 2, 2025',   dateISO: '2025-12-02', author: 'POWERS',         discipline: 'Operational Discipline', excerpt: 'A budget cut that erodes capability returns as a larger number later. The discipline is knowing which is which.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i14', title: 'PM Compliance Is Not Equipment Reliability — Here\'s the Difference',                                  date: 'November 25, 2025', dateISO: '2025-11-25', author: 'Justin Pethick', discipline: 'Equipment Reliability', excerpt: 'A compliance score tells you whether the work order closed. A reliability program tells you whether the equipment is healthier.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i15', title: 'The Two Conversations Your Tier 2 Meetings Should Be Having — But Usually Aren\'t',                    date: 'November 18, 2025', dateISO: '2025-11-18', author: 'Sean Hart',      discipline: 'Daily Accountability',  excerpt: 'Yesterday\'s misses and today\'s commitments. Tier 2 lives or dies on whether the room can hold both honestly.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i16', title: 'Profitability Per Hour: The Operating Metric Most Plants Don\'t Track — and Should',                   date: 'November 11, 2025', dateISO: '2025-11-11', author: 'POWERS',         discipline: 'Operational Discipline', excerpt: 'Output per hour is operations\' language. Profitability per hour is finance\'s. The plants that close the gap are the ones that compound.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i17', title: 'The Frontline Supervisor Span of Control — When Bigger Becomes Broken',                                 date: 'November 4, 2025',  dateISO: '2025-11-04', author: 'Justin Pethick', discipline: 'Frontline Leadership',  excerpt: 'There is a span beyond which the supervisor role becomes administrative. Below it, it\'s leadership. The difference shows up in your numbers.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i18', title: 'Why Lean Implementations Quietly Stop Working — and How to Restart Them',                              date: 'October 28, 2025',  dateISO: '2025-10-28', author: 'Sean Hart',      discipline: 'Operational Discipline', excerpt: 'Lean stops working when it becomes a project. The reset is making it a habit system again — held by the line, not by the office.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i19', title: 'Capacity Utilization vs. Capacity Capability — and Why the Distinction Matters',                       date: 'October 21, 2025',  dateISO: '2025-10-21', author: 'POWERS',         discipline: 'Workforce Capability',  excerpt: 'You can drive utilization without ever building capability. The result is short-term throughput and long-term fragility.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i20', title: 'The Daily Accountability Routine That Survives a Plant Manager Change',                                 date: 'October 14, 2025',  dateISO: '2025-10-14', author: 'Justin Pethick', discipline: 'Daily Accountability',  excerpt: 'Personality-led operating rhythms collapse with the personality. Structural ones outlast the org chart.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i21', title: 'Workforce Capability Development — The Curriculum Most Operations Don\'t Have',                        date: 'October 7, 2025',   dateISO: '2025-10-07', author: 'Sean Hart',      discipline: 'Workforce Capability',  excerpt: 'A trained workforce is the output of a designed curriculum. Most operations have neither — and discover the gap during the next product launch.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i22', title: 'Changeover Time Is a Leadership Number Before It\'s an Engineering Number',                            date: 'September 30, 2025', dateISO: '2025-09-30', author: 'POWERS',         discipline: 'Equipment Reliability', excerpt: 'SMED methodology assumes the team owns the changeover. Most teams have never been given that ownership clearly.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i23', title: 'Three KPIs You Don\'t Need at the Tier 1 Board — and Two You\'re Missing',                             date: 'September 23, 2025', dateISO: '2025-09-23', author: 'Justin Pethick', discipline: 'Daily Accountability',  excerpt: 'A crowded huddle board signals an operation that hasn\'t decided what matters. The discipline is subtraction, not addition.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i24', title: 'The Equipment Reliability Triangle: People, Process, Predictive — and Which One Breaks First',         date: 'September 16, 2025', dateISO: '2025-09-16', author: 'Sean Hart',      discipline: 'Equipment Reliability', excerpt: 'Predictive technology is the easiest to buy and the easiest to underutilize. The people layer determines what the data converts to.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i25', title: 'The Operating Brief — Why Every Operation Needs One, and How to Write It',                              date: 'September 9, 2025',  dateISO: '2025-09-09', author: 'POWERS',         discipline: 'Operational Discipline', excerpt: 'A one-page operating brief is the test of whether leadership actually knows what it expects from the operation. Most don\'t pass the test.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i26', title: 'Lagging KPIs vs. Leading KPIs — A Practitioner\'s Test for Telling Them Apart',                         date: 'September 2, 2025',  dateISO: '2025-09-02', author: 'Justin Pethick', discipline: 'Daily Accountability',  excerpt: 'Most operations report leading and lagging indicators in the same column. The distinction is structural and it shows up in your trend lines.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i27', title: 'The Cost of Inconsistent Standards Across Shifts — and How to Surface It',                              date: 'August 26, 2025',   dateISO: '2025-08-26', author: 'Sean Hart',      discipline: 'Operational Discipline', excerpt: 'Inconsistency between shifts is the most expensive line item nobody is tracking. It hides in your yield, your scrap, your overtime, and your quality holds.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i28', title: 'Frontline Coaching: The Five-Minute Conversation That Decides the Shift',                              date: 'August 19, 2025',   dateISO: '2025-08-19', author: 'POWERS',         discipline: 'Frontline Leadership',  excerpt: 'The conversation a supervisor has during their floor walk is the operating system. Everything else is documentation.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i29', title: 'When to Standardize, When to Adapt — A Multi-Site Operations Heuristic',                                 date: 'August 12, 2025',   dateISO: '2025-08-12', author: 'Justin Pethick', discipline: 'Operational Discipline', excerpt: 'The wrong things get standardized. The wrong things get localized. The plants that get this right run a quiet kind of network.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  { slug: 'demo-i30', title: 'The Operations Maturity Curve — Where You Are, and Where the Next Inflection Sits',                    date: 'August 5, 2025',    dateISO: '2025-08-05', author: 'Sean Hart',      discipline: 'Operational Discipline', excerpt: 'Maturity isn\'t age. It\'s the level of discipline the operation can carry without leadership intervention. Most ops misjudge where they are by a full level.', image: null, externalUrl: 'https://www.thepowerscompany.com/manufacturing-productivity-insights-blog/' },
  /* ══════════ END PLACEHOLDER FILLER — REMOVE BEFORE LAUNCH ══════════ */
];

/** WordPress search-results URL used by the "Search the full archive →"
 *  escape hatch in the search bar. Appended with the user's query at
 *  click time. */
export const WP_SEARCH_BASE = 'https://www.thepowerscompany.com/?s=';
