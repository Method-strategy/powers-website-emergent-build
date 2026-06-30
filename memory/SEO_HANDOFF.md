# POWERS — SEO Handoff Sheet

**Generated:** 2026-02-13
**Source of truth:** static `<SEO />` component on every route + `<script type="application/ld+json">` schema where applicable
**Production domain (at launch):** `https://thepowerscompany.com`
**Default OG image (all routes):** `https://thepowerscompany.com/uploads/powers-banner-2026-v2-poster.jpg`
**Default Twitter card type (all routes):** `summary_large_image`

---

## How to read this sheet

For each of the 22 React routes you'll find:

- **Title** — what shows as the clickable headline in Google search results and on browser tabs.
- **Description** — the ~150-char snippet under the title in Google results.
- **OG type** — `website` for hubs / landing pages, `article` for long-form content like a case study.
- **Canonical URL** — the "official" version of the page (prevents duplicate-content penalties when query strings or trailing slashes vary).
- **Structured data** — JSON-LD schema injected on the page so Google can show rich results (FAQ accordions, definition cards, etc.) directly in SERPs.

If Patrik wires SEOPress at launch and you want SEOPress to **override** any of these values, hand him this sheet so he knows what the current production defaults are and where the edges are (FAQ + Glossary JSON-LD in particular need to stay in the React code OR be replicated by SEOPress — they don't fall out of standard meta-tag fields).

---

## 1. Home

- **Path:** `/`
- **Title:** POWERS — Manufacturing Operations Management Consulting
- **Description:** POWERS is a manufacturing operations management consulting firm. We build the execution discipline that drives sustained operations performance — on the floor, with the team.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/`
- **Structured data:** Organization + WebSite (in `index.html`)

## 2. Approach

- **Path:** `/approach`
- **Title:** Our Approach — Operations Performance Consulting | POWERS
- **Description:** Our approach: build the operating discipline that produces results under any conditions. From underperformance to scalable, sustained execution — without the consultant dependency cycle.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/approach`

## 3. Discovery Process

- **Path:** `/discovery-process`
- **Title:** Discovery Process — Manufacturing Operations Assessment | POWERS
- **Description:** POWERS Discovery — a structured two-week operations diagnostic that finds the gap between current performance and the result your operation should be producing.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/discovery-process`

## 4. Operational Discipline

- **Path:** `/operational-discipline`
- **Title:** Operational Discipline — Eliminate Variation | POWERS
- **Description:** Build the operating discipline that holds your numbers under pressure. Standard work, daily routines, and escalation paths that structurally eliminate variation.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/operational-discipline`

## 5. Frontline Leadership

- **Path:** `/frontline-leadership`
- **Title:** Frontline Leadership Development for Manufacturers | POWERS
- **Description:** Develop the supervisors and team leads who hold daily performance. POWERS builds frontline leadership capability that converts plans into consistent floor execution.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/frontline-leadership`

## 6. Equipment Reliability

- **Path:** `/equipment-reliability`
- **Title:** Equipment Reliability & Uptime Improvement | POWERS
- **Description:** Eliminate the unplanned downtime that quietly eats throughput and margin. POWERS builds the reliability discipline that keeps equipment producing at planned rate.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/equipment-reliability`

## 7. Workforce Capability

- **Path:** `/workforce-capability`
- **Title:** Workforce Capability Development | POWERS
- **Description:** Build the workforce capability that converts headcount into trained, deployable production hours. POWERS develops skills, certifications, and bench depth.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/workforce-capability`

## 8. Daily Accountability

- **Path:** `/daily-accountability`
- **Title:** Daily Accountability & Operating Rhythm | POWERS
- **Description:** Install the daily operating rhythm — tier huddles, KPI ownership, and floor walks — that makes operations performance visible, owned, and corrected in hours.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/daily-accountability`

## 9. Industries Served

- **Path:** `/industries-served`
- **Title:** Manufacturing Industries We Serve | POWERS Consulting
- **Description:** POWERS serves manufacturers across food & beverage, aerospace & defense, automotive, pharma, consumer goods, chemicals, metals, oil & gas, and PE portfolio operations.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/industries-served`
- **Note:** Individual `/industries-served/:slug` pages (dynamic) inherit the meta from `<IndustryPage />` — each slug carries its own title + description derived from the industry data file.

## 10. Case Studies (Index)

- **Path:** `/case-studies`
- **Title:** Manufacturing Case Studies — Proven Operations Results | POWERS
- **Description:** Real operations. Real pressure. Measurable results. Every POWERS case is an operation that had to execute and perform under conditions like yours.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/case-studies`
- **Pending:** when Patrik wires the case studies database, individual case-study detail routes should each carry their own title + description per case.

## 11. Case Study — Aerospace & Defense On-Time Delivery

- **Path:** `/case-studies/aerospace-defense-on-time-delivery`
- **Title:** Aerospace & Defense On-Time Delivery Case Study | POWERS
- **Description:** Schedules shifted hourly, supervisors couldn't tell operators what to work on, and rework time nearly equaled first-pass assembly. POWERS installed a unified production schedule, a working capacity model, and the leadership routines required to hold both. On-time performance improved 59% without expansion, hiring, or new equipment.
- **OG type:** **article** (only route with article-type — appropriate for long-form case content)
- **Canonical:** `https://thepowerscompany.com/case-studies/aerospace-defense-on-time-delivery`

## 12. History

- **Path:** `/history`
- **Title:** Our History — 25 Years Building Operations Discipline | POWERS
- **Description:** POWERS — more than two decades of building operations discipline. From the original engagement model to 500+ operations strengthened across the industries that build.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/history`

## 13. Leadership

- **Path:** `/leadership`
- **Title:** Leadership Team — Senior Manufacturing Practitioners | POWERS
- **Description:** Meet the POWERS leadership team — senior manufacturing practitioners with multi-decade plant, operations, and PE-portfolio operating experience.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/leadership`
- **Note:** Individual `/leadership/:slug` bio pages (dynamic) inherit meta from `<LeaderBio />` — each carries title + description tailored to the leader.

## 14. Careers

- **Path:** `/careers`
- **Title:** Manufacturing Consulting Careers — Join POWERS
- **Description:** Join POWERS — a senior-only manufacturing operations consulting firm. We hire experienced practitioners who lead from the floor, not from a slide deck.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/careers`

## 15. Company News

- **Path:** `/company-news`
- **Title:** Company News & Engagement Announcements | POWERS
- **Description:** Engagement announcements from POWERS — partnerships with manufacturers across food and beverage, aerospace and defense, industrial, dairy, plastics, and safety sectors.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/company-news`

## 16. Insights Hub

- **Path:** `/insights`
- **Title:** Manufacturing Operations Insights & Knowledge Base | POWERS
- **Description:** Decades of operational insights from POWERS — articles, deep-dive series, KPIs, glossary, FAQs, and downloadables on the disciplines that drive sustained manufacturing performance.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/insights`

## 17. Mastery Series

- **Path:** `/manufacturing-mastery-series`
- **Title:** Manufacturing Mastery Series | POWERS
- **Description:** 15 multi-part deep dives on the topics that move operational performance — productivity, OEE, cost reduction, downtime, leadership, and more.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/manufacturing-mastery-series`

## 18. Downloadables

- **Path:** `/downloadables`
- **Title:** Downloadables | POWERS Knowledge Base
- **Description:** Field-ready guides, checklists, and frameworks from POWERS — ready to put to work on your next shift.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/downloadables`

## 19. Manufacturing KPIs

- **Path:** `/manufacturing-metrics`
- **Title:** Manufacturing KPIs Library | POWERS
- **Description:** A categorized reference library of manufacturing KPIs — definitions and formulas for efficiency, cost, quality, maintenance, lean, and more.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/manufacturing-metrics`

## 20. FAQs

- **Path:** `/frequently-asked-questions-faqs`
- **Title:** Frequently Asked Questions | POWERS
- **Description:** Direct answers to the questions operations leaders ask before engaging POWERS — how we work, what we cost, how long it takes, and how we're different.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/frequently-asked-questions-faqs`
- **Structured data:** **FAQPage JSON-LD** — Google may surface the 11 Q&A pairs directly as a collapsible rich result in search.

## 21. Glossary

- **Path:** `/glossary`
- **Title:** Glossary | POWERS Knowledge Base
- **Description:** Operational performance vocabulary, defined by practitioners. POWERS' core terms and industry-standard methodologies that anchor manufacturing execution.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/glossary`
- **Structured data:** **DefinedTermSet JSON-LD** — all 30 terms are exposed to Google with their canonical deep-link URLs (`/glossary#oee`, etc.). Strong positioning for "OEE definition", "TPM manufacturing", "EBITDA manufacturing", etc.

## 22. Contact

- **Path:** `/contact`
- **Title:** Let's Talk — Contact POWERS
- **Description:** Talk to POWERS about your operation. We respond within one business day and start with a structured discovery, not a sales pitch.
- **OG type:** website
- **Canonical:** `https://thepowerscompany.com/contact`

---

## Launch checklist (when you flip from staging to production)

These three things need to happen on launch day. They're all documented inside the codebase with launch-mode comments at the top of each file:

1. **`public/index.html`** — delete both `<meta name="robots" content="noindex, nofollow" />` and `<meta name="googlebot" content="noindex, nofollow" />` so search engines can crawl.
2. **`public/robots.txt`** — swap the staging block for the launch-mode block already commented inside the file.
3. **`public/sitemap.xml`** — confirm every route below is listed with `https://thepowerscompany.com` as the production domain and the sitemap is reachable at `https://thepowerscompany.com/sitemap.xml`.

After launch:
4. Submit the sitemap to **Google Search Console** so Google indexes the 22 routes quickly instead of waiting for organic discovery.
5. Run a **Google Rich Results Test** on `/frequently-asked-questions-faqs` and `/glossary` to confirm the FAQ + DefinedTerm schemas are detected.

---

## How SEOPress fits in (for Patrik)

The current React code has *everything* needed for a clean launch — every route has unique title, description, OG, Twitter card, canonical, and rich-result schema where applicable. **SEOPress is optional for a successful launch.** Where SEOPress helps is:

- **Editorial flexibility** — letting the team edit any title or description without a code deploy.
- **Per-article SEO** for Mastery Series chapters + Insights articles (these live on the WP CDN at launch and SEOPress already manages them; React just deep-links).
- **Structured snippet management** — if the team wants to A/B test alternative descriptions for any high-traffic page.

Three integration patterns are documented in `/app/memory/PRD.md` (search "SEOPress REST integration"). The default-recommended pattern is **edge-side injection** (Cloudflare Worker or WP Engine edge layer) so SEOPress meta lands in the initial HTML response — works for Twitter / LinkedIn / Facebook unfurls, not just Google. If edge injection is out of scope at launch, the React app's existing `<SEO />` system is launch-ready as-is.

---

*Generated by main agent. Re-run `grep -l "SEO\\|seoTitle" /app/frontend/src/pages/*.jsx /app/frontend/src/components/{LeaderBio,IndustryPage}.jsx` to audit; full route crawl available via the diagnostic script that produced this sheet.*
