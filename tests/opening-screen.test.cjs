const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

assert.match(
  html,
  /<section\s+class="opening\s+section"[^>]*>[\s\S]*<a\s+class="opening__arrow"\s+href="#invitation"/,
  "Opening screen should include a bottom arrow link to the invitation site",
);

assert.match(
  html,
  /<section\s+class="hero\s+section"\s+id="invitation"/,
  'Main invitation screen should expose id="invitation"',
);

assert.match(
  css,
  /url\("assets\/opening-invitation\.png"\)/,
  "Opening screen should use the supplied invitation image",
);

assert.ok(
  fs.existsSync(path.join(__dirname, "..", "assets", "opening-invitation.png")),
  "Opening invitation image asset should exist in the project",
);

console.log("opening screen tests passed");
