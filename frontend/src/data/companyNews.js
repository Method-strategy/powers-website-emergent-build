/**
 * Company News dataset — single source of truth for /company-news.
 *
 * Scope per 2026-06-29 client direction: ENGAGEMENT ANNOUNCEMENTS ONLY.
 * Editorial/blog content (industry commentary, leadership voices,
 * Justin Pethick op-eds) lives elsewhere on the site (Insights Hub).
 *
 * Schema mirrors the WPGraphQL / SEOPress response shape so this file
 * can be replaced 1:1 with a `useQuery` call at launch with zero
 * component edits:
 *
 *   slug          string   — internal-route-style slug, also the React key
 *   title         string   — full headline (rendered verbatim)
 *   date          string   — "Month DD, YYYY" display date
 *   dateISO       string   — YYYY-MM-DD for sorting
 *   excerpt       string   — ~2 lines, used by the aggregator card
 *   externalUrl   string   — full URL to the legacy article on
 *                            thepowerscompany.com until the native
 *                            React article-detail template lands.
 *
 * Listed in reverse chronological order to match the source URL list
 * supplied by the client.
 */

export const companyNews = [
  {
    slug: 'powers-partners-protein-processing-company',
    title: 'POWERS Partners With Leading U.S. Protein Processing Company to Improve Quality and Productivity Performance',
    date: 'May 28, 2026',
    dateISO: '2026-05-28',
    excerpt: 'A new partnership with a leading U.S. protein processing company focused on improving quality, performance, and productivity across a high-volume production environment.',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-partners-protein-processing-company-quality-productivity-performance/',
  },
  {
    slug: 'powers-partners-global-industrial-technology-company',
    title: 'POWERS Partners With Leading Global Industrial Technology Company to Support Frontline Leadership Development During New Site Ramp-Up',
    date: 'May 20, 2026',
    dateISO: '2026-05-20',
    excerpt: 'A new engagement supporting frontline leadership development through the ramp-up of a new production site for one of the largest industrial technology operators in the world.',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-partners-global-industrial-technology-company-new-site-ramp-up/',
  },
  {
    slug: 'powers-returns-safety-products-manufacturer',
    title: 'POWERS Returns to Build on Demonstrated Results for a Leading Safety Products Manufacturer',
    date: 'April 30, 2026',
    dateISO: '2026-04-30',
    excerpt: 'A repeat engagement with a leading safety products manufacturer to extend the gains of an earlier project into the warehouse and distribution side of the operation.',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-returns-safety-products-manufacturer-warehouse-performance/',
  },
  {
    slug: 'powers-partners-food-manufacturer',
    title: 'POWERS Announces New Partnership with One of the Most Recognized Names in Food Manufacturing',
    date: 'April 15, 2026',
    dateISO: '2026-04-15',
    excerpt: 'A partnership with one of the most recognized food manufacturers in the U.S. focused on productivity and frontline leadership development across multiple sites.',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-partners-food-manufacturer-productivity-frontline-leadership/',
  },
  {
    slug: 'powers-engaged-dairy-producer',
    title: 'POWERS Engaged By Leading Dairy Producer To Improve Maintenance Performance And Develop Frontline Leadership',
    date: 'March 25, 2026',
    dateISO: '2026-03-25',
    excerpt: 'An engagement with a leading dairy producer focused on the maintenance performance and frontline leadership disciplines that drive sustained operational gains.',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-engaged-dairy-producer-maintenance-performance-frontline-leadership/',
  },
  {
    slug: 'powers-reengaged-food-manufacturer',
    title: 'POWERS Re-Engaged by Leading U.S. Food Manufacturer to Strengthen Capacity Utilization',
    date: 'March 12, 2026',
    dateISO: '2026-03-12',
    excerpt: 'A returning client engagement focused on strengthening capacity utilization across a multi-site U.S. food manufacturing network.',
    externalUrl: 'https://www.thepowerscompany.com/resources/powers-reengaged-food-manufacturer-capacity-utilization/',
  },
  {
    slug: 'powers-partners-defense-aerospace-security',
    title: 'POWERS Partners with Global Leader in the Defense, Aerospace, and Security Sector to Strengthen Productivity in Critical Manufacturing Operations',
    date: 'January 15, 2026',
    dateISO: '2026-01-15',
    excerpt: 'A partnership with a global defense, aerospace, and security manufacturer focused on strengthening productivity in mission-critical production operations.',
    externalUrl: 'https://www.thepowerscompany.com/resources/global-leader-in-the-defense-aerospace-and-security/',
  },
  {
    slug: 'renewed-partnership-global-safety-manufacturer',
    title: 'POWERS Renews Partnership with Global Industrial Safety Manufacturer',
    date: 'December 11, 2025',
    dateISO: '2025-12-11',
    excerpt: 'A renewed partnership with a global industrial safety manufacturer to extend prior operational gains into additional sites and product lines.',
    externalUrl: 'https://www.thepowerscompany.com/resources/renewed-partnership-global-safety-manufacturer/',
  },
  {
    slug: 'global-plastics-manufacturer',
    title: 'POWERS Announces New Partnership With a Global Plastics Manufacturer to Strengthen Performance',
    date: 'November 20, 2025',
    dateISO: '2025-11-20',
    excerpt: 'A new partnership with a global plastics manufacturer focused on strengthening performance across operational, leadership, and reliability dimensions.',
    externalUrl: 'https://www.thepowerscompany.com/resources/global-plastics-manufacturer/',
  },
];
