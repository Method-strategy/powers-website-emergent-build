/**
 * <SEO /> — single source of truth for per-page document metadata.
 *
 * Replaces the legacy `useEffect(() => { document.title = ... })` pattern.
 * One <SEO /> call per page sets:
 *   - <title>
 *   - <meta name="description">
 *   - <link rel="canonical">
 *   - Open Graph (og:title, og:description, og:url, og:type, og:image,
 *     og:image:alt, og:site_name, og:locale)
 *   - Twitter Card (twitter:card, twitter:title, twitter:description,
 *     twitter:image, twitter:image:alt, twitter:site)
 *
 * No external deps (no react-helmet) — uses the same direct DOM-update
 * pattern the rest of the codebase already uses for document.title.
 *
 * USAGE:
 *   <SEO
 *     title="Our Approach — Operations Performance Consulting | POWERS"
 *     description="…"
 *     path="/approach"           // becomes the canonical + og:url
 *     image="/uploads/foo.jpg"   // optional, falls back to DEFAULT_OG_IMAGE
 *     type="website"             // optional, default 'website'
 *   />
 */

import { useEffect } from 'react';
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_DESCRIPTION,
  TWITTER_HANDLE,
  absoluteUrl,
} from '../lib/siteMeta';

/** Upsert a <meta> tag by `name` (or `property` for OG tags). */
function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Upsert <link rel="canonical">. */
function upsertCanonical(href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = 'website',
}) {
  useEffect(() => {
    const canonical = absoluteUrl(path);
    const ogImage = image
      ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
      : DEFAULT_OG_IMAGE;

    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertCanonical(canonical);

    // Open Graph
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_US');

    // Twitter Card
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
    upsertMeta('name', 'twitter:site', TWITTER_HANDLE);
  }, [title, description, path, image, imageAlt, type]);

  return null;
}
