# 一式 (Isshiki) — All-in-One Japanese

A free, ad-free, self-contained Japanese study app: kana, kanji (N5–N1),
vocabulary, stroke-order writing practice, grammar basics, and common
phrases — all with spaced repetition. No backend, no accounts, no
subscriptions. Progress is stored locally in the browser.

## Running locally

```
npm install
npm run build      # bundles src/ into dist/
npm run serve       # serves dist/ at http://localhost:8000
```

## Deploying (so updates reach everyone automatically)

The important thing about this app: once it's live at a stable URL,
**you never need anyone to redownload or reinstall anything.** The
service worker (`src/sw.js`) is network-first with a build ID that
changes on every build, so the next time someone opens the app (even
one they've already installed to their home screen), it quietly
fetches whatever you most recently deployed.

That only works if updates go to the *same URL* every time — which is
exactly what a git-connected host gives you.

### Why no App Store

This is a PWA (Progressive Web App) — people install it straight from
their browser via "Add to Home Screen." There's no Apple/Google review
process, no developer fee, and no revenue cut, which fits an app being given away for free.

## Project structure

```
src/            source files (App.jsx is the whole app)
build.js        bundles + stamps a fresh cache-busting build ID
dist/           build output (git-ignored, regenerated on every build)
```

## License

License

PolyForm Noncommercial License 1.0.0 — free to use, modify, and share for any non-commercial purpose. Nobody but Milky Way Media, LLC may sell, monetize, or profit from this software or any derivative of it.
