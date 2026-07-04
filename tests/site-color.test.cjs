const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

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

console.log("site color tests passed");
