import React, { useEffect, useRef } from 'react';

/**
 * LegacyPage — renders a lossless, 1:1 port of a static HTML page.
 *
 * - `css` — the page's original <style> blocks (from <head>), injected as
 *   a <style> tag. These legacy pages were designed standalone so we keep
 *   their CSS scoped via the original class names.
 * - `html` — the page's <body> content (between `#site-header-root` and
 *   `#site-footer-root` mount points). Rendered via dangerouslySetInnerHTML
 *   to preserve every attribute and inline style verbatim.
 * - `script` — any plain-JS inline scripts from the original page (e.g.
 *   the case-studies filter grid logic). Executed once after mount.
 *
 * Internal `<a href="*.html">` links are intercepted by Layout's
 * useLegacyLinkIntercept hook and re-routed through React Router.
 */
export default function LegacyPage({ css, html, script, title, metaDescription }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (title) document.title = title;
    if (metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', metaDescription);
    }
  }, [title, metaDescription]);

  // Run the page's inline JS once after the markup is in the DOM.
  // Using a real <script> element (not eval) so it picks up document.getElementById
  // and global function declarations the way the legacy page expected.
  useEffect(() => {
    if (!script || !script.trim()) return;
    const tag = document.createElement('script');
    tag.type = 'text/javascript';
    tag.text = script;
    document.body.appendChild(tag);
    return () => {
      try { document.body.removeChild(tag); } catch (e) { /* already gone */ }
    };
  }, [script]);

  return (
    <>
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
