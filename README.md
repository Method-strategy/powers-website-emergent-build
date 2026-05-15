# powers-faust-test

Throwaway sandbox for validating the **GitHub -> WP Engine Atlas -> live URL** deployment pipeline for a Faust.js app, before wiring up the real WordPress backend.

This is NOT the production scaffold. The production scaffold lives at `../powers-faust/`. Once Atlas deployment is proven here, this folder can be deleted.

## What this sandbox does

- Renders a single static page at `/` saying "Hello from Faust on WP Engine Atlas."
- Has all the Faust scaffolding intact (faust.config.js, wp-templates/, Faust dependencies, FaustProvider in `_app.js`) so the Atlas build exercises the real Faust toolchain.
- Does NOT query WordPress. The page makes zero GraphQL calls.

## Two sandbox-specific deviations from the upstream Faust starter

1. **`build` script swapped from `faust build` to `next build`.** `faust build` runs `faust generatePossibleTypes`, which introspects a live WPGraphQL endpoint to refresh `possibleTypes.json`. With no real WordPress yet, that step fails. Bypassing it lets Next build against the checked-in `possibleTypes.json` (which came from the upstream template's example WP and is fine as static config). The original Faust build command is preserved as `build:full` for when WordPress is connected later.

2. **Three WP-dependent page files deleted from `pages/`:** `[...wordpressNode].js`, `preview.js`, `example.js`. All three call `getWordPressProps`, which fires GraphQL at build or request time. They are not needed for the static hello-world test.

Everything else (faust.config, next.config, FaustProvider, wp-templates, components, fragments, possibleTypes.json) is the unmodified upstream starter.

## Local test

```bash
cp .env.local.sample .env.local
npm install
npm run build          # next build
npm start              # faust start  (serves the built app at http://localhost:3000)
```

If `npm run build` exits 0 and `npm start` serves the hello message at `localhost:3000`, the sandbox is ready to push to GitHub.

### Windows-only quirk: `npm start` (faust start) crashes locally

On Windows, `faust start` hits a libuv assertion (`Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)`) immediately after binding. This is a known Faust/Node Windows-only issue and does NOT affect Atlas, which runs Linux. To verify the production bundle locally on Windows, bypass the Faust wrapper:

```bash
npx next start -p 3000
```

The Atlas deployment uses `npm start` unchanged.

## Push to GitHub + Atlas

1. Create a new GitHub repo (private or public, your choice). Suggested name: `powers-faust-test`.
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial Faust sandbox for Atlas pipeline validation"
   git branch -M main
   git remote add origin <github-repo-url>
   git push -u origin main
   ```
3. Update `wpe.json` `repo` field to match the actual `<github-org>/powers-faust-test` slug.
4. In WP Engine User Portal -> Headless Platform -> Create app:
   - Connect the GitHub repo
   - Build command: `npm run build`
   - Start command: `npm start`
   - Node version: 20+
   - Environment variable: `NEXT_PUBLIC_WORDPRESS_URL=https://faustexample.wpengine.com`
5. First Atlas build runs automatically. Watch the build log. On success, Atlas issues a sandbox URL like `https://powers-faust-test.wpengine.com` (or similar).
6. Visit the URL and confirm the hello message renders.

## When to delete this sandbox

Once Atlas has successfully built and served this sandbox, the pipeline is proven. Future deployments use the production scaffold at `../powers-faust/`. Delete this folder to keep `Power Site New/` tidy.
