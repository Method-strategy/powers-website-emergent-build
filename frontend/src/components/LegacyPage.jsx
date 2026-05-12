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

  // Run the page's inline JS once per component instance after the markup is
  // in the DOM. We use a real <script> element (not eval) so it picks up
  // document.getElementById and registers global functions the way the
  // legacy page expected.
  //
  // Idempotency: a useRef guard prevents StrictMode's dev double-invocation
  // from running the script twice (which would, e.g., duplicate `<option>`
  // children inside the case-studies filter selects). The ref resets
  // naturally on a real component remount (e.g. SPA navigation away and
  // back), so the script will re-execute against the fresh DOM.
  //
  // The converter additionally wraps the inline JS body in an IIFE so
  // top-level `const`/`let` declarations are scoped to the function and
  // can't collide in the shared global execution context.
  const hasRunRef = useRef(false);
  useEffect(() => {
    if (!script || !script.trim()) return undefined;
    if (hasRunRef.current) return undefined;
    hasRunRef.current = true;
    const tag = document.createElement('script');
    tag.type = 'text/javascript';
    tag.text = script;
    document.body.appendChild(tag);
    return undefined; // intentionally leave script in DOM so injected handlers keep working
  }, [script]);

  return (
    <>
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
