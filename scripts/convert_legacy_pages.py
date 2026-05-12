#!/usr/bin/env python3
"""
Convert legacy POWERS .html pages into React page modules.

For each .html file in SRC_DIR, extract:
  - <title>
  - <meta name="description">
  - All <style> blocks from <head>
  - Body content between `<div id="site-header-root">...</div>` (or start of body)
    and `<div id="site-footer-root">...</div>` (or end of body),
    excluding the babel <script type="text/babel"> tag.

Emit a JSX component that renders via the shared <LegacyPage /> wrapper.

The homepage (index.html) is handled separately because its content is built
inside a <script type="text/babel"> tag and not as static HTML.
"""
import re
import os
import json
import pathlib

SRC_DIR = pathlib.Path('/tmp/powers-website/powers-website-evolution')
OUT_DIR = pathlib.Path('/app/frontend/src/pages')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Pages we generate as LegacyPage wrappers (everything except index.html).
PAGES = {
    'approach.html': ('Approach', '/approach'),
    'discovery-process.html': ('DiscoveryProcess', '/discovery-process'),
    'industries-served.html': ('IndustriesServed', '/industries-served'),
    'case-studies.html': ('CaseStudies', '/case-studies'),
    'operational-readiness.html': ('OperationalReadiness', '/operational-readiness'),
    'frontline-leadership.html': ('FrontlineLeadership', '/frontline-leadership'),
    'equipment-reliability.html': ('EquipmentReliability', '/equipment-reliability'),
    'supply-chain.html': ('SupplyChain', '/supply-chain'),
    'history.html': ('History', '/history'),
    'leadership.html': ('Leadership', '/leadership'),
    'company-news.html': ('CompanyNews', '/company-news'),
    'careers.html': ('Careers', '/careers'),
    'insights.html': ('Insights', '/insights'),
    'contact.html': ('Contact', '/contact'),
    'randall-powers.html': ('BioRandallPowers', '/leadership/randall-powers'),
    'sean-hart.html': ('BioSeanHart', '/leadership/sean-hart'),
    'saul-bautista.html': ('BioSaulBautista', '/leadership/saul-bautista'),
    'ken-wiesinger.html': ('BioKenWiesinger', '/leadership/ken-wiesinger'),
    'justin-pethick.html': ('BioJustinPethick', '/leadership/justin-pethick'),
    'kevin-sabany.html': ('BioKevinSabany', '/leadership/kevin-sabany'),
    'case-study-defense-aerospace-otd.html': ('CaseStudyDefenseAerospaceOTD', '/case-studies/defense-aerospace-otd'),
}


def extract_styles(head_html: str) -> str:
    """Return concatenated CSS from all <style> blocks in head."""
    blocks = re.findall(r'<style[^>]*>(.*?)</style>', head_html, re.DOTALL | re.IGNORECASE)
    return '\n'.join(b.strip() for b in blocks)


def extract_meta(head_html: str, name: str) -> str:
    m = re.search(r'<meta[^>]*name=["\']' + re.escape(name) + r'["\'][^>]*content=["\']([^"\']*)["\']',
                  head_html, re.IGNORECASE)
    return m.group(1) if m else ''


def extract_title(head_html: str) -> str:
    m = re.search(r'<title[^>]*>(.*?)</title>', head_html, re.DOTALL | re.IGNORECASE)
    return m.group(1).strip() if m else ''


def extract_body_content(body_html: str):
    """Strip site-header/footer mount points + babel scripts.

    Returns (cleaned_body_html, plain_script_js).

    plain_script_js contains any inline `<script>...</script>` (NOT `type="text/babel"`,
    NOT `src="..."`) — these are page-level vanilla-JS modules that drive things like
    the case-studies filter grid. We'll re-run them via a useEffect after mount.
    """
    # Capture plain-JS inline scripts first (before stripping)
    plain_scripts = []
    for m in re.finditer(r'<script(?![^>]*\btype=["\']text/babel["\'])(?![^>]*\bsrc=)[^>]*>(.*?)</script>',
                         body_html, flags=re.DOTALL | re.IGNORECASE):
        plain_scripts.append(m.group(1))
    plain_js = '\n'.join(plain_scripts).strip()

    # Remove the <script type="text/babel"> block
    body = re.sub(r'<script\s+type=["\']text/babel["\'][^>]*>.*?</script>',
                  '', body_html, flags=re.DOTALL | re.IGNORECASE)
    # Remove all other <script> tags (we already captured the inline JS above)
    body = re.sub(r'<script[^>]*>.*?</script>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<script[^>]*/>', '', body, flags=re.IGNORECASE)
    # Remove site-header-root + site-footer-root mount divs
    body = re.sub(r'<div\s+id=["\']site-header-root["\'][^>]*>\s*</div>',
                  '', body, flags=re.IGNORECASE)
    body = re.sub(r'<div\s+id=["\']site-footer-root["\'][^>]*>\s*</div>',
                  '', body, flags=re.IGNORECASE)
    return body.strip(), plain_js


def wrap_inline_script(js: str) -> str:
    """Wrap legacy inline JS so it can run idempotently on re-mount.

    1. Find all top-level `function name(...)` declarations.
    2. Wrap the whole body in an IIFE so top-level `const`/`let` (e.g. `DATA`,
       `state`) are scoped to the function and don't collide on re-execution.
    3. Inside the IIFE, after the body, expose each top-level function on
       `window` so injected inline `onclick="funcName(...)"` handlers still
       resolve. The legacy case-studies page relies on `clearFilter` being
       globally callable from HTML it builds via `innerHTML`.
    """
    if not js or not js.strip():
        return js
    fn_names = re.findall(r'(?m)^\s*function\s+(\w+)\s*\(', js)
    fn_names = list(dict.fromkeys(fn_names))  # de-dup, preserve order
    hoist = '\n'.join(f'  try {{ window.{n} = {n}; }} catch(_) {{}}' for n in fn_names)
    return ';(function(){\n' + js + '\n' + hoist + '\n})();'



def js_string_literal(s: str) -> str:
    """Encode string as a JS backtick template literal-safe string."""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def apply_page_patches(filename: str, js: str) -> str:
    """Apply per-page semantic patches to the legacy inline JS.

    Patches are kept here (not as edits to the source HTML) so the React
    port stays in sync if/when the source HTML is regenerated.
    """
    if filename == 'case-studies.html':
        # 1. Re-target the Defense & Aerospace card (#54) at the locked
        #    internal detail route instead of the public-site PDF blurb.
        js = js.replace(
            'url:"https://www.thepowerscompany.com/resources/defense-industry/"',
            'url:"/case-studies/defense-aerospace-otd"',
        )

        # 2. Render each card as an <a href> wrapper so the global
        #    useLegacyLinkIntercept routes internal `/...` URLs via React
        #    Router while external `http://...` URLs open in a new tab.
        #    Replaces the original `<article onclick="window.open">` +
        #    inner `<a class="card-link" target="_blank">` pattern (which
        #    would force a full reload for the internal Defense detail
        #    card and is also invalid nested-anchor HTML once we wrap).
        old_render = '''grid.innerHTML = filtered.map((d, i) => `
    <article class="case-card" style="animation-delay:${Math.min(i * 0.04, 0.4)}s" onclick="window.open('${d.url}','_blank')">
      <div class="card-header">
        <div class="card-industry">${d.industry}</div>
        <div class="card-num">#${String(d.num).padStart(2,'0')}</div>
      </div>
      <h2 class="card-title">${highlight(d.title, s)}</h2>
      <div class="card-result">${highlight(d.result, s)}</div>
      <div class="card-tags">
        ${d.engagement.map(e => `<span class="tag tag-engagement">${e}</span>`).join('')}
        ${d.challenges.slice(0,2).map(c => `<span class="tag tag-challenge">${c}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span class="card-date">${formatDate(d.date)}</span>
        <a class="card-link" href="${d.url}" target="_blank" onclick="event.stopPropagation()">
          Read Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  `).join('');'''

        new_render = '''grid.innerHTML = filtered.map((d, i) => {
    const isInternal = typeof d.url === 'string' && d.url.startsWith('/');
    const targetAttr = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
    return `
    <a class="case-card-link" href="${d.url}"${targetAttr} style="display:block;text-decoration:none;color:inherit;">
      <article class="case-card" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
        <div class="card-header">
          <div class="card-industry">${d.industry}</div>
          <div class="card-num">#${String(d.num).padStart(2,'0')}</div>
        </div>
        <h2 class="card-title">${highlight(d.title, s)}</h2>
        <div class="card-result">${highlight(d.result, s)}</div>
        <div class="card-tags">
          ${d.engagement.map(e => `<span class="tag tag-engagement">${e}</span>`).join('')}
          ${d.challenges.slice(0,2).map(c => `<span class="tag tag-challenge">${c}</span>`).join('')}
        </div>
        <div class="card-footer">
          <span class="card-date">${formatDate(d.date)}</span>
          <span class="card-link">
            Read Case Study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </article>
    </a>
  `;}).join('');'''

        js = js.replace(old_render, new_render)
    return js


def convert(src_path: pathlib.Path, component_name: str) -> str:
    text = src_path.read_text(encoding='utf-8')
    head_m = re.search(r'<head[^>]*>(.*?)</head>', text, re.DOTALL | re.IGNORECASE)
    body_m = re.search(r'<body[^>]*>(.*?)</body>', text, re.DOTALL | re.IGNORECASE)
    head_html = head_m.group(1) if head_m else ''
    body_html = body_m.group(1) if body_m else text
    css = extract_styles(head_html)
    title = extract_title(head_html)
    meta_desc = extract_meta(head_html, 'description')
    body_content, plain_js = extract_body_content(body_html)
    plain_js = apply_page_patches(src_path.name, plain_js)
    plain_js = wrap_inline_script(plain_js)

    # Repath asset references: uploads/... -> /uploads/... (absolute from public/)
    body_content = re.sub(r'(src|href)=(["\'])uploads/', r'\1=\2/uploads/', body_content)
    # url(uploads/...) inside style attributes/blocks
    body_content = re.sub(r'url\((["\']?)uploads/', r'url(\1/uploads/', body_content)
    css = re.sub(r'url\((["\']?)uploads/', r'url(\1/uploads/', css)

    return f"""import React from 'react';
import LegacyPage from '../components/LegacyPage';

const CSS = `{js_string_literal(css)}`;

const HTML = `{js_string_literal(body_content)}`;

const SCRIPT = `{js_string_literal(plain_js)}`;

export default function {component_name}() {{
  return (
    <LegacyPage
      css={{CSS}}
      html={{HTML}}
      script={{SCRIPT}}
      title={{`{js_string_literal(title)}`}}
      metaDescription={{`{js_string_literal(meta_desc)}`}}
    />
  );
}}
"""


def main():
    manifest = []
    for filename, (component, route) in PAGES.items():
        src = SRC_DIR / filename
        if not src.exists():
            print(f"!! Missing: {filename}")
            continue
        out_path = OUT_DIR / f'{component}.jsx'
        out_path.write_text(convert(src, component), encoding='utf-8')
        manifest.append({'file': filename, 'component': component, 'route': route})
        print(f"   {filename} -> {out_path.name}")

    # Emit a JS manifest for App.js to consume
    manifest_path = OUT_DIR / 'manifest.json'
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(f"\nWrote {len(manifest)} pages, manifest: {manifest_path}")


if __name__ == '__main__':
    main()
