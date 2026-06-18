const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

assert.match(
  html,
  /<button\s+class="button\s+location-card__button"[^>]+data-map-toggle[^>]*>\s*НА КАРТЕ\s*<\/button>/,
  "Location card should use an in-page button for opening the map",
);

assert.match(
  html,
  /г\. Кызыл,\s*ул\. Каа-Хем,\s*106/,
  "Location card should show the venue address",
);

assert.match(
  html,
  /<iframe[^>]+src="https:\/\/yandex\.ru\/map-widget\/v1\/\?[^"]*text=/,
  "Location card should embed a Yandex Maps iframe search for the address",
);

assert.match(
  html,
  /<a\s+class="location-card__map-link"[^>]+href="https:\/\/yandex\.ru\/maps\/\?[^"]*text=/,
  "Location card should include a fallback Yandex Maps link",
);

assert.match(
  css,
  /\.location-card__map\s*{[\s\S]*height:\s*clamp\(260px,\s*74vw,\s*320px\)/,
  "Location map should have a mobile-friendly height",
);

assert.match(
  script,
  /function initLocationMap\(\)/,
  "Location map should have click behavior initialized in script.js",
);

console.log("location map tests passed");
