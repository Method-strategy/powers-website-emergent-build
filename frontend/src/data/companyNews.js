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
    slug: 'powers-partners-aerospace-defense-security',
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

  /* ╔══════════════════════════════════════════════════════════════
     ║  PLACEHOLDER FILLER — REMOVE BEFORE LAUNCH
     ║  ─────────────────────────────────────────────────────────────
     ║  Dummy entries seeded purely so the Load More UI + dense
     ║  archive layout can be validated visually. The titles are
     ║  composed from real engagement-type patterns POWERS uses
     ║  (industry × outcome) so the cards read realistically.
     ║  Mix includes a handful of internal news items (promotions,
     ║  new hires) per the 2026-06-29 client note that "there are
     ║  a couple of employee promotions and new hires" in the real
     ║  archive — and the page should handle them gracefully.
     ║
     ║  DELETE THIS WHOLE BLOCK (down to the closing ║) when wiring
     ║  the WordPress data layer at launch.
     ╚══════════════════════════════════════════════════════════════ */
  { slug: 'demo-1',  title: 'POWERS Promotes Justin Pethick to Chief Marketing Officer',                                              date: 'October 30, 2025',  dateISO: '2025-10-30', excerpt: 'POWERS announces the promotion of Justin Pethick to Chief Marketing Officer, reflecting his expanded leadership in shaping the firm’s strategy, voice, and growth.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-2',  title: 'POWERS Welcomes Three Senior Operations Practitioners to the Engagement Team',                            date: 'October 14, 2025',  dateISO: '2025-10-14', excerpt: 'Three veteran operations leaders join the POWERS engagement team, expanding capacity across food and beverage, aerospace, and industrial manufacturing.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-3',  title: 'POWERS Partners With Leading North American Beverage Producer to Improve OEE and Reduce Changeover Time', date: 'September 28, 2025', dateISO: '2025-09-28', excerpt: 'A new engagement with a leading North American beverage producer focused on equipment effectiveness and changeover-time reduction across high-velocity lines.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-4',  title: 'POWERS Re-Engaged by Specialty Chemicals Manufacturer to Scale Reliability Program to Additional Sites',  date: 'September 12, 2025', dateISO: '2025-09-12', excerpt: 'A returning client engagement extending the reliability discipline established in the first project across a multi-site specialty chemicals network.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-5',  title: 'POWERS Partners with Top-5 Pet Food Manufacturer on Frontline Leadership and Throughput Initiative',      date: 'August 28, 2025',    dateISO: '2025-08-28', excerpt: 'A frontline leadership and throughput improvement engagement with one of the top-five pet food manufacturers in the United States.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-6',  title: 'POWERS Engaged by Leading Building Products Manufacturer to Strengthen Operational Discipline',           date: 'August 14, 2025',    dateISO: '2025-08-14', excerpt: 'A new engagement focused on operational discipline and daily accountability across a multi-site building products manufacturing network.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-7',  title: 'POWERS Promotes Sean Hart to Chief Executive Officer and Managing Partner',                               date: 'July 30, 2025',      dateISO: '2025-07-30', excerpt: 'POWERS announces the promotion of Sean Hart to Chief Executive Officer and Managing Partner, formalizing his leadership of the firm and its next chapter.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-8',  title: 'POWERS Partners with Leading Personal Care Manufacturer to Strengthen Capacity Utilization',              date: 'July 16, 2025',      dateISO: '2025-07-16', excerpt: 'A new partnership with a leading personal care products manufacturer focused on capacity utilization and asset productivity.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-9',  title: 'POWERS Engaged by Tier-1 Automotive Supplier to Improve Quality Performance Across Three Plants',         date: 'June 28, 2025',      dateISO: '2025-06-28', excerpt: 'A new engagement with a Tier-1 automotive supplier focused on quality performance across three production sites supplying global OEM programs.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-10', title: 'POWERS Welcomes Two Senior Engagement Leaders in the Food and Beverage Sector',                           date: 'June 12, 2025',      dateISO: '2025-06-12', excerpt: 'Two senior engagement leaders with deep food and beverage operations experience join POWERS, expanding the firm’s capacity in the sector.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-11', title: 'POWERS Re-Engaged by Leading Bakery Manufacturer to Expand Reliability Program Network-Wide',             date: 'May 30, 2025',       dateISO: '2025-05-30', excerpt: 'A returning client extends an earlier reliability engagement across its full North American bakery manufacturing network.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-12', title: 'POWERS Partners with Global Medical Devices Manufacturer to Strengthen Frontline Leadership',             date: 'May 14, 2025',       dateISO: '2025-05-14', excerpt: 'A new partnership with a global medical devices manufacturer focused on supervisor and team-lead capability across regulated production environments.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-13', title: 'POWERS Engaged by Leading Frozen Foods Manufacturer to Improve On-Time-In-Full Performance',              date: 'April 28, 2025',     dateISO: '2025-04-28', excerpt: 'A new engagement with a leading frozen foods manufacturer focused on on-time-in-full delivery performance during a high-growth period.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-14', title: 'POWERS Partners with Leading Confectionery Manufacturer to Improve Productivity Across Three Sites',      date: 'April 14, 2025',     dateISO: '2025-04-14', excerpt: 'A new partnership with a leading North American confectionery manufacturer focused on productivity improvement across three production sites.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-15', title: 'POWERS Promotes Saul Bautista to Senior Partner',                                                          date: 'March 28, 2025',     dateISO: '2025-03-28', excerpt: 'POWERS announces the promotion of Saul Bautista to Senior Partner, recognizing his leadership across complex engagements in food and beverage operations.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-16', title: 'POWERS Engaged by Specialty Paper Manufacturer to Strengthen Maintenance Performance',                    date: 'March 12, 2025',     dateISO: '2025-03-12', excerpt: 'A new engagement with a specialty paper manufacturer focused on maintenance performance, reliability, and unplanned downtime reduction.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-17', title: 'POWERS Re-Engaged by Global Industrial Manufacturer to Extend Operational Discipline to European Plants', date: 'February 26, 2025', dateISO: '2025-02-26', excerpt: 'A returning client engagement extends the operational discipline program built at U.S. sites into four additional European production plants.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-18', title: 'POWERS Partners with Leading Coffee Roaster to Improve Throughput and Quality',                           date: 'February 12, 2025', dateISO: '2025-02-12', excerpt: 'A new partnership with a leading specialty coffee roaster focused on throughput, quality consistency, and frontline leadership development.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-19', title: 'POWERS Engaged by Leading Dietary Supplements Manufacturer to Improve Capacity and Reliability',          date: 'January 28, 2025',   dateISO: '2025-01-28', excerpt: 'A new engagement with a leading dietary supplements manufacturer focused on capacity utilization and equipment reliability across two production sites.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-20', title: 'POWERS Partners with Leading Heavy Equipment Manufacturer on Frontline Leadership Initiative',            date: 'January 14, 2025',   dateISO: '2025-01-14', excerpt: 'A frontline leadership engagement with a leading heavy equipment manufacturer focused on supervisor capability and shift-level execution.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-21', title: 'POWERS Welcomes Two Senior Reliability Practitioners to the Engagement Team',                              date: 'December 18, 2024', dateISO: '2024-12-18', excerpt: 'Two senior reliability and maintenance practitioners join POWERS, expanding the firm’s equipment reliability capability ahead of a strong 2025 pipeline.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-22', title: 'POWERS Re-Engaged by Global Beverage Producer to Strengthen OEE Across European Network',                  date: 'December 4, 2024',  dateISO: '2024-12-04', excerpt: 'A returning client engagement focused on OEE and reliability across a European beverage production network.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-23', title: 'POWERS Engaged by Leading Cosmetics Manufacturer to Improve Productivity and Daily Accountability',       date: 'November 14, 2024', dateISO: '2024-11-14', excerpt: 'A new engagement with a leading cosmetics manufacturer focused on productivity, daily accountability, and frontline operating rhythm.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-24', title: 'POWERS Partners with Global Adhesives Manufacturer on Multi-Site Reliability Initiative',                  date: 'October 30, 2024',  dateISO: '2024-10-30', excerpt: 'A new partnership with a global adhesives manufacturer focused on equipment reliability and unplanned downtime reduction across multiple sites.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-25', title: 'POWERS Engaged by Leading Snack Foods Manufacturer to Improve Changeover and Throughput',                  date: 'October 16, 2024',  dateISO: '2024-10-16', excerpt: 'A new engagement with a leading snack foods manufacturer focused on changeover-time reduction and throughput improvement on high-velocity lines.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-26', title: 'POWERS Promotes Ken Wiesinger to Senior Partner',                                                          date: 'September 30, 2024', dateISO: '2024-09-30', excerpt: 'POWERS announces the promotion of Ken Wiesinger to Senior Partner, recognizing his leadership in equipment reliability and capital-intensive engagements.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-27', title: 'POWERS Partners with Leading Industrial Coatings Manufacturer to Strengthen Operational Discipline',      date: 'September 12, 2024', dateISO: '2024-09-12', excerpt: 'A new partnership with a leading industrial coatings manufacturer focused on operational discipline and shift-level execution.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-28', title: 'POWERS Re-Engaged by Leading Consumer Goods Manufacturer to Extend Productivity Gains',                    date: 'August 28, 2024',   dateISO: '2024-08-28', excerpt: 'A returning client engagement extends earlier productivity gains across additional production lines at a leading consumer goods manufacturer.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-29', title: 'POWERS Engaged by Tier-1 Aerospace Component Manufacturer to Improve On-Time Delivery Performance',       date: 'August 14, 2024',   dateISO: '2024-08-14', excerpt: 'A new engagement with a Tier-1 aerospace component manufacturer focused on on-time delivery performance under fixed-price program pressure.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  { slug: 'demo-30', title: 'POWERS Welcomes Three Engagement Leaders in the Industrial and Heavy Manufacturing Sectors',              date: 'July 30, 2024',     dateISO: '2024-07-30', excerpt: 'Three senior engagement leaders with deep industrial and heavy manufacturing experience join POWERS, broadening the firm’s sector capacity.', externalUrl: 'https://www.thepowerscompany.com/news/' },
  /* ══════════ END PLACEHOLDER FILLER — REMOVE BEFORE LAUNCH ══════════ */
];
