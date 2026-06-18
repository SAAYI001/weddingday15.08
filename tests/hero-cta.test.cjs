const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

assert.match(
  html,
  /<a\s+class="button\s+hero__cta"[^>]+href="#guest-form"[^>]*>\s*ПОДТВЕРДИТЬ УЧАСТИЕ\s*<\/a>/,
  "Hero should include a confirmation button linking to the guest form",
);

assert.match(
  html,
  /<section\s+class="section\s+section-pad"[^>]+id="guest-form"[^>]*>/,
  "Guest form section should expose id=\"guest-form\" for smooth scrolling",
);

console.log("hero CTA tests passed");

assert.match(
  css,
  /url\("assets\/hero-wedding-reference\.png"\)/,
  "Hero should use the supplied wedding reference image as its background",
);

assert.ok(
  fs.existsSync(path.join(__dirname, "..", "assets", "hero-wedding-reference.png")),
  "Hero background image asset should exist in the project",
);

console.log("hero background tests passed");
