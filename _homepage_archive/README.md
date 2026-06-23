# Homepage version archive

This folder is **outside** `/app/frontend/src/`, so its contents are
**not** compiled into the React build. It exists as a safety net.

## What's here

- `Home_v1.jsx`  — Original copy port from the legacy static HTML.
- `HomeV2.jsx`   — First copy rewrite.
- `HomeV3.jsx`   — Pre-pivot editorial homepage. Was the production
                   homepage briefly.
- `HomeV4.jsx`   — Polished editorial spine. Was the production
                   homepage between V3 and V5.
- *(V5 is the live homepage and now lives at
  `/app/frontend/src/pages/Home.jsx`.)*

## Why these were moved

Patrik (senior dev / WP headless deployment) reviewed the GitHub
branch and flagged that having multiple `Home*.jsx` files in
`pages/` confused his Claude during the WP environment work. The
versions were development checkpoints, not production artifacts —
Netlify only ever needs to serve one homepage.

## Restoring (if ever needed)

If a future client review wants to A/B against an older treatment:

1. Copy the desired file back into `/app/frontend/src/pages/`.
2. Add an import + a route in `/app/frontend/src/App.js`:
   ```js
   import HomeV4 from './pages/HomeV4';
   // ...
   <Route path="/v4-archive" element={<HomeV4 />} />
   ```

That's it. These files compile cleanly in isolation and don't
share state with the live app.

## Removing entirely

Once the V5 design has been live for ~6 months without a rollback
request, this folder is safe to delete.
