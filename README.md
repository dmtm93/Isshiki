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

### Recommended: Netlify or Vercel, connected to GitHub

1. Push this folder to a new GitHub repository.
2. On [netlify.com](https://netlify.com) (or [vercel.com](https://vercel.com)),
   choose "Import from Git" and pick the repo. Both will auto-detect the
   settings from `netlify.toml` / `vercel.json` in this repo — you
   shouldn't need to configure anything by hand.
3. You'll get a stable URL immediately (e.g. `isshiki.netlify.app`).
4. From then on: **push to GitHub → site rebuilds and redeploys
   automatically → everyone's app updates itself.** No zip files, no
   manual redeploy step.

### Optional: a custom domain

Once the site is live, both Netlify and Vercel let you attach a custom
domain (e.g. `isshiki.app`) for free — you just need to buy the domain
itself somewhere (Namecheap, Cloudflare, etc., usually $10–20/year) and
point its DNS at your host. Not required, just nicer for sharing.

### Why no App Store

This is a PWA (Progressive Web App) — people install it straight from
their browser via "Add to Home Screen." There's no Apple/Google review
process, no developer fee, and no revenue cut, which fits an app you're
giving away for free.

## Project structure

```
src/            source files (App.jsx is the whole app)
build.js        bundles + stamps a fresh cache-busting build ID
dist/           build output (git-ignored, regenerated on every build)
```

## License

MIT — do whatever you like with it. (Change this if you'd prefer
something else; it's just a sensible free default.)
