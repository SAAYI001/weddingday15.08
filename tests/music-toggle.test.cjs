const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");
const openingHtml = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

assert.match(
  openingHtml,
  /<audio\s+id="opening-music"[^>]+src="assets\/ishkin-oglu-churjejem-typ-aar\.mp3"[^>]+loop[^>]*>/,
  "Opening page should include the same looping music file so the envelope click can start playback",
);

assert.match(
  html,
  /<audio\s+id="wedding-music"[^>]+src="assets\/ishkin-oglu-churjejem-typ-aar\.mp3"[^>]+loop[^>]*>/,
  "Invite page should preload the supplied looping music file",
);

assert.match(
  html,
  /<button\s+class="music-toggle"[^>]+data-music-toggle[^>]+aria-pressed="false"[^>]*>/,
  "Invite page should include a music toggle button",
);

assert.match(
  css,
  /\.music-toggle\s*{[\s\S]*position:\s*fixed;[\s\S]*top:\s*max\(16px,\s*env\(safe-area-inset-top\)\);[\s\S]*right:\s*16px;/,
  "Music toggle should be fixed at the top right of the mobile screen",
);

assert.match(
  script,
  /function initMusicToggle\(\)/,
  "Music toggle behavior should be initialized in script.js",
);

assert.match(
  script,
  /music\.play\(\)/,
  "Music toggle should play the audio",
);

assert.match(
  script,
  /sessionStorage\.setItem\("weddingMusicRequested",\s*"true"\)/,
  "Envelope click should remember that music was requested by the visitor",
);

assert.match(
  script,
  /sessionStorage\.getItem\("weddingMusicRequested"\)\s*===\s*"true"/,
  "Invite page should detect that the envelope click requested music",
);

assert.match(
  script,
  /music\.pause\(\)/,
  "Music toggle should pause the audio",
);

assert.match(
  script,
  /toggle\.setAttribute\("aria-pressed",\s*String\(isPlaying\)\)/,
  "Music toggle should expose its active state",
);

assert.ok(
  fs.existsSync(path.join(__dirname, "..", "assets", "ishkin-oglu-churjejem-typ-aar.mp3")),
  "Music asset should exist",
);

console.log("music toggle tests passed");
