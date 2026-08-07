import { useEffect } from 'react';

/**
 * <SchemaOrg schema={object} /> — injects a JSON-LD <script> into
 * <head> for the current page.
 *
 * Usage:
 *   <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "FAQPage", ... }} />
 *
 * One component per page; multiple schemas should be combined into
 * a single @graph array.  The script is removed when the component
 * unmounts so navigating away from the page cleans up correctly.
 */
export default function SchemaOrg({ schema }) {
  useEffect(() => {
    if (!schema) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id   = `schema-${schema['@type'] || 'custom'}`;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [schema]);
  return null;
}
