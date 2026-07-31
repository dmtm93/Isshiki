// Build script for Isshiki.
//
// Bundles index.jsx into dist/bundle.js, copies the static app-shell files
// (index.html, manifest.json, icons) into dist/, and stamps a fresh build ID
// into the service worker so every deploy automatically busts the cache for
// anyone with the app already open or installed — no manual steps needed.
// This is what both `npm run build` and your host's CI (Netlify/Vercel) run.
import { build } from "esbuild";
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "fs";

const DIST = "dist";

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
mkdirSync(`${DIST}/icons`, { recursive: true });

await build({
  entryPoints: ["index.jsx"],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: `${DIST}/bundle.js`,
  loader: { ".js": "jsx" },
});

cpSync("index.html", `${DIST}/index.html`);
cpSync("manifest.json", `${DIST}/manifest.json`);

// index.html and manifest.json both expect icons under "./icons/", so we
// recreate that folder inside dist/ even though the source icons currently
// sit at the repo root.
for (const icon of ["icon-192.png", "icon-512.png", "icon-512-maskable.png", "apple-touch-icon.png"]) {
  cpSync(icon, `${DIST}/icons/${icon}`);
}

// Stamp a unique build ID (timestamp) into the service worker so its cache
// name changes on every build, forcing browsers to fetch the new version
// instead of getting stuck on a stale cached copy.
const buildId = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14); // e.g. 20260731153000
const swSource = readFileSync("sw.js", "utf8").replace(/__BUILD_ID__/g, buildId);
writeFileSync(`${DIST}/sw.js`, swSource);

console.log(`Build complete → ${DIST}/ (build id: ${buildId})`);
