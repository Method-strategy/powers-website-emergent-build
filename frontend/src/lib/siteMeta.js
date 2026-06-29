/**
 * Site-wide SEO + Open Graph constants.
 *
 * Production domain is `thepowerscompany.com`. The canonical base URL is read
 * from a build-time env (`REACT_APP_SITE_URL`) so the same code ships to
 * staging + prod without per-environment edits — Netlify sets the env in the
 * build config, and the fallback below is the production domain.
 *
 * If a page doesn't supply its own `image`, the SEO component falls back to
 * the default OG card here.
 */

export const SITE_NAME = 'POWERS';

export const SITE_URL = (
  process.env.REACT_APP_SITE_URL || 'https://thepowerscompany.com'
).replace(/\/$/, '');

export const DEFAULT_OG_IMAGE = `${SITE_URL}/uploads/powers-banner-2026-v2-poster.jpg`;
export const DEFAULT_OG_IMAGE_ALT =
  'POWERS — Manufacturing Operations Management Consulting';

export const DEFAULT_DESCRIPTION =
  'POWERS is a manufacturing operations management consulting firm. We build the execution discipline that drives sustained operations performance — on the floor, with the team, where the work actually happens.';

export const TWITTER_HANDLE = '@thepowerscompany';

/**
 * Build an absolute URL from a route path. Used for og:url + canonical.
 */
export function absoluteUrl(path = '/') {
  if (!path.startsWith('/')) path = '/' + path;
  return `${SITE_URL}${path}`;
}
