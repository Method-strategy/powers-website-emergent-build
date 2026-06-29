/**
 * Company News dataset — single source of truth for /company-news.
 *
 * Schema mirrors the WPGraphQL / SEOPress response shape so this file
 * can be replaced 1:1 with a `useQuery` call at launch without any
 * component edits:
 *
 *   slug          string   — internal-route-style slug, also the React key
 *   title         string   — full headline (rendered verbatim)
 *   date          string   — ISO-ish "Month DD, YYYY" date as the source site uses it
 *   dateISO       string   — YYYY-MM-DD for sorting
 *   category      string   — one of: 'Engagements' | 'Industry Commentary' | 'Leadership' | 'Recognition'
 *   excerpt       string   — ~2 lines, used by the aggregator card
 *   author        string   — byline (POWERS, or the named author)
 *   image         string   — absolute URL to the article hero/thumbnail (legacy WP path for now)
 *   externalUrl   string   — full URL to the legacy article on thepowerscompany.com
 *                            until the article-detail template lands as a native React page.
 *
 * IMAGES — currently sourced from the legacy WordPress upload paths
 * (cdn-stable). At launch, the WP REST API will return its own image
 * URLs; the component shape doesn't care.
 */

export const NEWS_CATEGORIES = [
  'All News',
  'Engagements',
  'Industry Commentary',
  'Leadership',
  'Recognition',
];

export const companyNews = [
  {
    slug: 'powers-partners-protein-processing-company',
    title: 'POWERS Partners With Leading U.S. Protein Processing Company to Improve Quality and Productivity Performance',
    date: 'May 28, 2026',
    dateISO: '2026-05-28',
    category: 'Engagements',
    excerpt: 'POWERS has announced a new partnership with a leading U.S. protein processing company focused on improving quality, performance, and productivity across a high-volume production environment.',
    author: 'POWERS',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/05/leading-protein-processing-blog.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-partners-protein-processing-company-quality-productivity-performance/',
  },
  {
    slug: 'powers-partners-global-industrial-technology-company',
    title: 'POWERS Partners With Leading Global Industrial Technology Company to Support Frontline Leadership Development During New Site Ramp-Up',
    date: 'May 20, 2026',
    dateISO: '2026-05-20',
    category: 'Engagements',
    excerpt: 'A new engagement supporting frontline leadership development through the ramp-up of a new production site for one of the largest industrial technology operators in the world.',
    author: 'POWERS',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/05/Leading-Global-Industrial-Technology-Company-news-B-768x401.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-partners-global-industrial-technology-company-new-site-ramp-up/',
  },
  {
    slug: 'powers-returns-safety-products-manufacturer',
    title: 'POWERS Returns to Build on Demonstrated Results for a Leading Safety Products Manufacturer',
    date: 'April 30, 2026',
    dateISO: '2026-04-30',
    category: 'Engagements',
    excerpt: 'A repeat engagement with a leading safety products manufacturer to extend the gains of an earlier project into the warehouse and distribution side of the operation.',
    author: 'POWERS',
    image: 'https://www.thepowerscompany.com/wp-content/uploads/2026/04/Safety-Equipment-Manufacturer-News-Post-Thumbnail-768x401.jpg',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-returns-safety-products-manufacturer-warehouse-performance/',
  },
  {
    slug: 'talent-matters-systems-win',
    title: 'Talent Matters. Systems Win.',
    date: 'June 17, 2026',
    dateISO: '2026-06-17',
    category: 'Leadership',
    excerpt: 'Strong people are necessary but not sufficient. The operations that compound performance over time are the ones where the system carries the weight.',
    author: 'Justin Pethick',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/talent-matters-systems-win/',
  },
  {
    slug: 'americas-manufacturing-challenge',
    title: "America's Manufacturing Challenge: You Can't Build Capacity Without Capability",
    date: 'June 2, 2026',
    dateISO: '2026-06-02',
    category: 'Industry Commentary',
    excerpt: 'Reshoring and capacity investment headlines miss the deeper constraint: capable people, capable supervisors, and the operating systems that hold both together.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/resources-americas-manufacturing-challenge-you-cant-build-capacity-without-capability/',
  },
  {
    slug: 'americas-manufacturing-problem-isnt-just-labor',
    title: "America's Manufacturing Problem Isn't Just Labor — It's Leadership",
    date: 'May 27, 2026',
    dateISO: '2026-05-27',
    category: 'Leadership',
    excerpt: 'The shortage everyone discusses is the labor pool. The shortage that actually limits performance sits one layer up — in the supervisor and team-lead population.',
    author: 'Justin Pethick',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/americas-manufacturing-problem-isnt-just-labor-its-leadership/',
  },
  {
    slug: 'future-of-american-manufacturing-frontline-leaders',
    title: 'The Future of American Manufacturing Will Be Won by Frontline Leaders — Not Technology Alone',
    date: 'May 19, 2026',
    dateISO: '2026-05-19',
    category: 'Leadership',
    excerpt: 'Technology accelerates capable operations and exposes underbuilt ones. The differentiator over the next decade will be the strength of the people running each shift.',
    author: 'Justin Pethick',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/the-future-of-american-manufacturing-will-be-won-by-frontline-leaders-not-technology-alone/',
  },
  {
    slug: 'hamilton-had-the-strategy',
    title: 'Hamilton Had the Strategy. Manufacturers Need the Execution',
    date: 'May 12, 2026',
    dateISO: '2026-05-12',
    category: 'Industry Commentary',
    excerpt: 'Industrial policy has always demanded an operational counterpart. The current policy window only converts into manufacturing strength if execution catches up.',
    author: 'Justin Pethick',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/hamilton-had-the-strategy-manufacturers-need-the-execution/',
  },
  {
    slug: 'packaging-manufacturer-delivers-1m-annualized-savings',
    title: 'How POWERS Helped A Manufacturer Deliver More Than $1M In Annualized Savings',
    date: 'May 7, 2026',
    dateISO: '2026-05-07',
    category: 'Recognition',
    excerpt: 'A packaging manufacturer turns operational gains into more than a million dollars of annualized savings, tracked against the financial model set at engagement start.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/packaging-manufacturer-delivers-1m-annualized-savings/',
  },
  {
    slug: 'powers-partners-food-manufacturer',
    title: 'POWERS Announces New Partnership with One of the Most Recognized Names in Food Manufacturing',
    date: 'April 15, 2026',
    dateISO: '2026-04-15',
    category: 'Engagements',
    excerpt: 'A partnership with one of the most recognized food manufacturers in the U.S. focused on productivity and frontline leadership development across multiple sites.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-partners-food-manufacturer-productivity-frontline-leadership/',
  },
  {
    slug: 'powers-engaged-dairy-producer',
    title: 'POWERS Engaged By Leading Dairy Producer To Improve Maintenance Performance And Develop Frontline Leadership',
    date: 'March 25, 2026',
    dateISO: '2026-03-25',
    category: 'Engagements',
    excerpt: 'An engagement with a leading dairy producer focused on the maintenance performance and frontline leadership disciplines that drive sustained operational gains.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-engaged-dairy-producer-maintenance-performance-frontline-leadership/',
  },
  {
    slug: 'powers-reengaged-food-manufacturer',
    title: 'POWERS Re-Engaged by Leading U.S. Food Manufacturer to Strengthen Capacity Utilization',
    date: 'March 12, 2026',
    dateISO: '2026-03-12',
    category: 'Engagements',
    excerpt: 'A returning client engagement focused on strengthening capacity utilization across a multi-site U.S. food manufacturing network.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-reengaged-food-manufacturer-capacity-utilization/',
  },
  {
    slug: 'powers-partners-defense-aerospace-security',
    title: 'POWERS Partners with Global Leader in the Defense, Aerospace, and Security Sector to Strengthen Productivity in Critical Manufacturing Operations',
    date: 'January 15, 2026',
    dateISO: '2026-01-15',
    category: 'Engagements',
    excerpt: 'A partnership with a global defense, aerospace, and security manufacturer focused on strengthening productivity in mission-critical production operations.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/global-leader-in-the-defense-aerospace-and-security/',
  },
  {
    slug: 'renewed-partnership-global-safety-manufacturer',
    title: 'POWERS Renews Partnership with Global Industrial Safety Manufacturer',
    date: 'December 11, 2025',
    dateISO: '2025-12-11',
    category: 'Engagements',
    excerpt: 'A renewed partnership with a global industrial safety manufacturer to extend prior operational gains into additional sites and product lines.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/renewed-partnership-global-safety-manufacturer/',
  },
  {
    slug: 'global-plastics-manufacturer',
    title: 'POWERS Announces New Partnership With a Global Plastics Manufacturer to Strengthen Performance',
    date: 'November 20, 2025',
    dateISO: '2025-11-20',
    category: 'Engagements',
    excerpt: 'A new partnership with a global plastics manufacturer focused on strengthening performance across operational, leadership, and reliability dimensions.',
    author: 'POWERS',
    image: null,
    externalUrl: 'https://www.thepowerscompany.com/resources/global-plastics-manufacturer/',
  },
];
