/* ════════════════════════════════════════════════════════════════════
 *  clientLogos.js — single source of truth for the client logo crawl
 * ════════════════════════════════════════════════════════════════════
 *
 *  The marquee originally lived in Home.jsx (Beat VI — Where We Work).
 *  Feb 2026: extracted here so the Case Studies hero ("Trusted By")
 *  can render the same row from the same data without copy/paste.
 *
 *  Each entry pairs a display name with either:
 *    • `local`  — a path under /uploads/client-logos served by the
 *      site itself (preferred for production — no CDN risk).
 *    • `domain` — a domain string handed to logo.dev's free CDN so
 *      we don't need to source brand SVGs ourselves during prototyping.
 *
 *  When the client provides final brand-asset SVGs for the entire
 *  list, swap each remaining `domain` entry for a `local` path and
 *  the LOGO_DEV_TOKEN below becomes dead code (safe to remove). */

export const CLIENT_LOGOS = [
  { name: 'Kraft Heinz',  local: '/uploads/client-logos/kraft-heinz.png' },
  { name: 'ADM',          local: '/uploads/client-logos/adm.png' },
  { name: 'Alcoa',        local: '/uploads/client-logos/alcoa.png' },
  { name: 'BAE Systems',  local: '/uploads/client-logos/bae-systems.svg' },
  { name: 'BMW',          local: '/uploads/client-logos/bmw.svg' },
  { name: 'Volkswagen',   local: '/uploads/client-logos/volkswagen.png' },
  { name: 'Corning',      local: '/uploads/client-logos/corning.png' },
  { name: 'Simplot',      local: '/uploads/client-logos/simplot.svg' },
  { name: 'RJ Reynolds',  local: '/uploads/client-logos/rjreynolds.png' },
  { name: 'Cargill',      local: '/uploads/client-logos/cargill.png' },
  { name: 'Mitsubishi',   local: '/uploads/client-logos/mitsubishi.svg' },
  { name: 'Bain Capital', local: '/uploads/client-logos/bain-capital.svg' },
  { name: 'Medline',      local: '/uploads/client-logos/medline.png' },
  { name: 'Blackstone',   local: '/uploads/client-logos/blackstone.png' },
  { name: 'Givaudan',     local: '/uploads/client-logos/givaudan.png' },
  { name: 'KKR',          local: '/uploads/client-logos/kkr.svg' },
  { name: 'Costco',       local: '/uploads/client-logos/costco.png' },
  { name: 'Agropur',      local: '/uploads/client-logos/agropur.svg' },
];

/* logo.dev free public token — fine for prototype + client review.
 * For production, swap each remaining `domain` entry above for a
 * locally-hosted SVG path so we own the CDN with no rate-limit risk. */
const LOGO_DEV_TOKEN = 'pk_X-1ZO13GSgeOoUrIuJ6GMQ';

export const logoSrc = (l) =>
  l.local
    ? l.local
    : `https://img.logo.dev/${l.domain}?token=${LOGO_DEV_TOKEN}&size=400&format=png&retina=true`;
