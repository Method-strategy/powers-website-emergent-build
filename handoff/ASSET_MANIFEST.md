# Asset Manifest

## Fonts

### In production

Patrik to decide loading strategy. Three options:

1. **Adobe Fonts (recommended for Proxima Nova)** — POWERS likely already has an Adobe Fonts kit licensed. Replace the Google Fonts `<link>` tags with the Adobe kit `<link>`. Patrik to provide kit ID.
2. **Self-hosted woff2** — Download licensed font files, serve from CDN, declare via `@font-face`. Better performance, requires explicit licensing.
3. **Current prototype state** — Google Fonts CDN for Newsreader + JetBrains Mono only. **Proxima Nova is not loaded** — the prototype falls back to system sans (`-apple-system`, etc.). This is intentional during prototyping.

### Font face declarations

Currently loaded in `HomeV3.jsx` via the `V3_FONT_LINKS` constant (search for it):

```html
<!-- Newsreader (italic accent keywords) -->
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,500&display=swap" rel="stylesheet">

<!-- JetBrains Mono (eyebrows) -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

### Family fallback stacks

```css
font-family: "proxima-nova","Proxima Nova",-apple-system,BlinkMacSystemFont,
             "Segoe UI","Helvetica Neue",Arial,sans-serif;

font-family: "Newsreader","Source Serif 4","Tiempos Headline",
             Georgia,"Times New Roman",serif;

font-family: "JetBrains Mono","IBM Plex Mono",ui-monospace,
             "SFMono-Regular",Menlo,Consolas,monospace;
```

### FOUT considerations

The hero's "Numbers." word and the closing "We build the foundation." line both use Newsreader italic. Watch for font-swap during the headline reveal animation. Recommended:

- `font-display: swap` on font-face declarations (already implicit via Google Fonts URLs)
- Preload critical weights: `<link rel="preload" as="font" href="..." crossorigin>`
- Test the hero on a throttled connection to confirm the swap doesn't jolt mid-reveal

---

## Images & graphics

### Logo files

All in `/app/frontend/public/uploads/`:

| File | Use |
|---|---|
| `powers-logo-refined-2026.svg` | Default logo (light backgrounds) — **prefer SVG** |
| `powers-logo-refined-2026.png` | Same, PNG fallback |
| `powers-logo-refined-for-dark-backgrounds-2026.svg` | White logo for navy/dark backgrounds |
| `powers-logo-refined-for-dark-backgrounds-2026.png` | Same, PNG fallback |

### Homepage placeholder image (now retired)

- `POWERS Homepage Placeholder 1280 x 960.png` — was used in How We Work before the video replaced it. Kept for emergency fallback.

### Leadership headshots

In `/app/frontend/public/uploads/leaders/` and at the root:

- `Randall-Powers-headshot-newsite.webp`
- `Sean-Hart-Headshot-newsite.webp`
- `Saul-Bautista-headshot-newsite.webp`
- `Ken-Wiesinger-headshot-newsite.webp`
- `Justin-Pethick-Headshot-newsite.webp`
- `Kevin-Sabany-headshot-newsite.webp`

All webp format, used in the individual Bio* pages.

### Screenshots / reference

Several `Screenshot 2026-XX-XX*.png` files are present at root. These are stakeholder reference shots, not production assets. Safe to leave; can be moved to a `/reference/` subfolder if cleaning up.

---

## Video

### Homepage hero loop ("How We Work")

| File | Format | Size | Use |
|---|---|---|---|
| `powers-banner-2026-v2.webm` | VP9 / Opus | 6.8MB | **Primary source** — Chromium-based browsers prefer this |
| `powers-banner-2026-v2.mp4` | H.264 (Main 4.0) / AAC | 8.1MB | Fallback for Safari/iOS |
| `powers-banner-2026-v2-poster.jpg` | JPEG | 134KB | First-frame poster for the crossfade loop trick |

**Source-of-truth note:** the original uploaded video (`POWERS Banner Video 2026 (1080 x 1350 px).mp4`) was re-encoded for web playback because its MOOV atom was at the end of the file (preventing progressive streaming). The web-optimized files were created via:

```bash
# H.264 web-optimized
ffmpeg -i source.mp4 -c:v libx264 -profile:v main -level 4.0 -pix_fmt yuv420p \
  -crf 23 -preset medium -c:a aac -b:a 128k -ac 2 \
  -movflags +faststart powers-banner-2026-v2.mp4

# VP9 / WebM
ffmpeg -i source.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 \
  -deadline good -cpu-used 4 -c:a libopus -b:a 96k \
  powers-banner-2026-v2.webm

# Poster
ffmpeg -i powers-banner-2026-v2.mp4 -vf "select=eq(n\,0)" \
  -frames:v 1 -q:v 2 powers-banner-2026-v2-poster.jpg
```

If swapping the source video, regenerate all three derivatives.

### To replace the video

1. Generate the three derivatives (commands above)
2. Drop into `/app/frontend/public/uploads/`
3. Update the `sources` array in `SectionHowWeWork` (in `HomeV3.jsx`)

If the new video has a different aspect ratio, you may need to adjust `objectFit: 'cover'` vs `'contain'` on the `<video>` element. Currently `cover` with `objectPosition: 'center'`.

---

## Documents (PDFs)

| File | Purpose |
|---|---|
| `powers-case-study-library.html` | Legacy static case study library page (used as content source for the React port) |
| `case-study-defense-aerospace-otd_v0.3.4.pdf` | Print-ready case study PDF (links from the case study page) |
| `case-study-draft.pdf`, `case-study-defense-aerospace-otd_v0.3.1.pdf` through `_v0.3.4.pdf` | Earlier draft revisions |
| `POWERS Defense & Aerospace Case Study v1 Draft.pdf` | Earlier draft |

These are content assets, not code dependencies. The case study HTML page is parsed/referenced during the case study React port; the PDFs link from the printed-card UI.

---

## Brand / spec documents

In `/app/frontend/public/uploads/`:

| File | Contents |
|---|---|
| `POWERS_Brand_Design_Tokens.docx` (and `-6ec238cd` duplicate) | **The locked type & color spec.** Source of truth for everything in `DESIGN_SYSTEM.md`. |
| `POWERS_Design_Technical_Brief_v2.docx` | Earlier overall technical brief |
| `POWERS_Approach_and_Discovery_Process_Copy_and_Specs v2.docx` | Approach + Discovery page copy + specs |
| `POWERS_Leadership_Pages_Copy_and_Specs.docx` | Bio page copy + specs |
| `_approach_doc.txt` / `_approach_doc.xml` | Plain-text extracts of the approach doc |

**These should be moved out of `/public/` for production** — they're served as static files and would be indexable by search engines. Recommend moving to `/handoff/source-docs/` or out of the repo entirely.

---

## CSS background gradients (no asset, but locked)

The hero's navy gradient — recreate this exactly if you build a new hero:

```css
background:
  radial-gradient(120% 90% at 78% 18%,
                  rgba(60,40,40,0.28) 0%,
                  rgba(15,42,71,0) 55%),
  radial-gradient(100% 100% at 50% 0%,
                  #14304f 0%, #0f2a47 45%, #0a1f38 100%);
```

The first gradient is a subtle warm spotlight in the upper-right (~78% across, 18% down). It's nearly invisible but adds depth to what would otherwise be flat navy. Don't remove.
