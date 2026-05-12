#!/usr/bin/env python3
"""
Convert the legacy /tmp/powers-website/.../index.html homepage (inline babel JSX)
into a single React module at /app/frontend/src/pages/Home.jsx.

Steps:
  1. Extract the `<script type="text/babel">...</script>` block.
  2. Remove the destructuring `const { useState, useRef, useEffect } = React;`
     line — those names are now imported from 'react' at the top.
  3. Replace the trailing `ReactDOM.createRoot(...).render(<App />);` with
     `export default App;`.
  4. Replace `src="uploads/...` (legacy relative paths) with `src="/uploads/...`
     so the SPA serves them from /public.
  5. Prepend React + hooks imports.
"""
import re
import pathlib

SRC = pathlib.Path('/tmp/powers-website/powers-website-evolution/index.html')
OUT = pathlib.Path('/app/frontend/src/pages/Home.jsx')


def main():
    text = SRC.read_text(encoding='utf-8')
    m = re.search(r'<script\s+type=["\']text/babel["\'][^>]*>(.*?)</script>',
                  text, re.DOTALL | re.IGNORECASE)
    if not m:
        raise SystemExit("Babel script not found in index.html")
    script = m.group(1)

    # Drop the destructuring header
    script = re.sub(r'^\s*const\s*\{\s*useState\s*,\s*useRef\s*,\s*useEffect\s*\}\s*=\s*React\s*;\s*',
                    '', script, count=1, flags=re.MULTILINE)

    # Replace the createRoot trailer
    script = re.sub(r'ReactDOM\.createRoot\s*\(\s*document\.getElementById\(["\']root["\']\)\s*\)\s*\.render\s*\(\s*<App\s*/>\s*\)\s*;?\s*$',
                    'export default App;', script.rstrip())

    # Asset paths: uploads/ -> /uploads/
    script = re.sub(r'src=(["\'])uploads/', r'src=\1/uploads/', script)

    out = '''/* eslint-disable */
/* This file is a lossless port of the legacy index.html homepage.
   Original lived as inline <script type="text/babel"> JSX. Do not refactor.
   Visual edits should be made in /tmp/powers-website/powers-website-evolution/index.html
   first, then re-generate via scripts/convert_homepage.py. */
import React, { useState, useRef, useEffect } from 'react';

''' + script + '\n'

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(out, encoding='utf-8')
    print(f"Wrote {OUT}")


if __name__ == '__main__':
    main()
