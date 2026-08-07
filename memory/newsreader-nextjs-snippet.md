# Newsreader — Next.js Font Loading Snippet for Patrik

The POWERS site uses **Newsreader** from Google Fonts in three variants:
- Italic 400 (body editorial pivots)
- Italic 500 (display editorial pivots)
- Normal 500 (occasionally)

URL: `https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;1,400;1,500&display=swap`

---

## Option A — `_document.tsx` (Pages Router)

Drop these tags inside `<Head>` in your `pages/_document.tsx`.
This mirrors what the CRA build already does in `public/index.html`.

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Newsreader — editorial serif used sitewide */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;1,400;1,500&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

---

## Option B — `next/font/google` (App Router or Next 13+)

Zero layout shift, font is self-hosted by Vercel/WP Engine automatically.
Add to your root layout (`app/layout.tsx`) or `pages/_app.tsx`.

### App Router (`app/layout.tsx`)
```tsx
import { Newsreader } from 'next/font/google'

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-newsreader',   // exposes CSS var if needed
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Pages Router (`pages/_app.tsx`)
```tsx
import { Newsreader } from 'next/font/google'
import type { AppProps } from 'next/app'

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-newsreader',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={newsreader.variable}>
      <Component {...pageProps} />
    </main>
  )
}
```

Then in your global CSS, add the font-family rule so the `font-family` declarations
already in the site pick it up:

```css
/* globals.css */
:root {
  --font-newsreader: 'Newsreader', Georgia, serif; /* fallback if next/font not loaded */
}
```

---

## Which option to use?

| | Option A `_document` | Option B `next/font` |
|---|---|---|
| Pages Router | ✅ Drop-in | ✅ Preferred |
| App Router | ❌ Not used | ✅ Required |
| Self-hosted (no Google CDN) | ❌ | ✅ |
| Matches CRA build exactly | ✅ | Close |

**Recommendation**: Use **Option B** if on Next 13+ — it eliminates the Google Fonts network
request and guarantees zero FOUT. Use **Option A** if a quick drop-in is needed today.

---

## CSS reference — where Newsreader is used in the codebase

```css
/* BriefDocStyles.jsx — TYPE.serif */
font-family: 'Newsreader', Georgia, serif;

/* Used on: */
/* - .brief-doc-h1 .accent   (hero accent lines) */
/* - .brief-doc-h2 .pivot    (section pivot lines, italic gold) */
/* - .brief-doc-h2 .accent   (same pattern) */
/* - inline <em> editorial pivots sitewide */
```
