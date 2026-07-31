// Build script for Isshiki.
//
// Bundles src/index.jsx into dist/bundle.js, copies the static app-shell
// files (index.html, manifest.json, icons) into dist/, and stamps a fresh
// build ID into the service worker so every deploy automatically busts
// the cache for anyone with the app already open or installed — no manual
// steps needed. This is what both `npm run build` and your host's CI
// (Netlify/Vercel) run.
import { build } from "esbuild";
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "fs";

const DIST = "dist";

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
mkdirSync(`${DIST}/icons`, { recursive: true });

await build({
  entryPoints: ["src/index.jsx"],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: `${DIST}/bundle.js`,
  loader: { ".js": "jsx" },
});

cpSync("src/index.html", `${DIST}/index.html`);
cpSync("src/manifest.json", `${DIST}/manifest.json`);
cpSync("src/icons", `${DIST}/icons`, { recursive: true });

// Stamp a unique build ID (timestamp) into the service worker so its cache
// name changes on every build, forcing browsers to fetch the new version
// instead of getting stuck on a stale cached copy.
const buildId = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14); // e.g. 20260731153000
const swSource = readFileSync("src/sw.js", "utf8").replace(/__BUILD_ID__/g, buildId);
writeFileSync(`${DIST}/sw.js`, swSource);

console.log(`Build complete → ${DIST}/ (build id: ${buildId})`);
