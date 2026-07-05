const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const inviteHtml = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

assert.match(
  html,
  /<button\s+class="envelope"[^>]+data-envelope[^>]*>/,
  "Opening screen should expose a clickable envelope button",
);

assert.match(
  html,
  /<div\s+class="envelope__flap"[^>]*>/,
  "Opening envelope should include a flap for the reveal animation",
);

assert.match(
  html,
  /<div\s+class="envelope__letter"[^>]*>/,
  "Opening envelope should include a letter that can slide upward",
);

assert.match(
  css,
  /\.opening\.is-opening[\s\S]*\.envelope__flap[\s\S]*rotateX\(-/,
  "Opening state should rotate the envelope flap open",
);

assert.match(
  css,
  /\.opening\.is-opening[\s\S]*\.envelope__letter[\s\S]*translate3d\(0,\s*-/,
  "Opening state should slide the letter upward",
);

assert.match(
  css,
  /cubic-bezier\(/,
  "Envelope animation should use a smooth custom easing curve",
);

assert.match(
  script,
  /function initEnvelopeOpening\(\)/,
  "Envelope click behavior should be initialized in script.js",
);

assert.match(
  script,
  /window\.location\.href\s*=\s*"invite\.html"/,
  "Envelope animation should redirect to invite.html",
);

assert.match(
  script,
  /setTimeout\([\s\S]*1[2-5]00/,
  "Redirect should happen after roughly 1.2-1.5 seconds",
);

assert.match(
  inviteHtml,
  /<section\s+class="hero\s+section"\s+id="invitation"/,
  'Invite page should contain the main invitation content',
);

console.log("opening screen tests passed");
