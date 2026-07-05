const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");

assert.match(
  css,
  /--wedding-red:\s*#ad575b;/,
  "Site should define the requested wedding red tone",
);

assert.match(
  css,
  /body\s*{[\s\S]*color:\s*var\(--wedding-red\);/,
  "Body text should use the wedding red tone",
);

assert.match(
  css,
  /\.button\s*{[\s\S]*background:\s*var\(--wedding-red\);/,
  "Button backgrounds should use the wedding red tone",
);

assert.doesNotMatch(
  html,
  /--swatch:\s*#4b3328/,
  "Dress code palette should not include the dark almost-black swatch",
);

assert.match(
  css,
  /\.palette\s*{[\s\S]*display:\s*flex;[\s\S]*justify-content:\s*center;/,
  "Dress code palette swatches should be centered on the mobile page",
);

console.log("site color tests passed");
