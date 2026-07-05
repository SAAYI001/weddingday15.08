const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");

for (const label of ["Look", "Detail", "Suit", "Palette", "Dress", "Texture"]) {
  assert.doesNotMatch(
    html,
    new RegExp(`>${label}<`),
    `Moodboard should not include the old decorative ${label} block`,
  );
}

assert.match(
  html,
  /<figure class="moodboard__image-card" data-reveal>/,
  "Moodboard should include one revealable image card",
);

assert.match(
  html,
  /<img src="assets\/dress-moodboard-girls\.png" alt="Девушки в пастельных платьях для дресс-кода">/,
  "Moodboard should use the provided girls photo asset",
);

assert.match(
  css,
  /\.moodboard__image-card\s*{(?=[\s\S]*width:\s*100%;)(?=[\s\S]*border-radius:\s*24px;)(?=[\s\S]*overflow:\s*hidden;)(?=[\s\S]*box-shadow:\s*0 10px 30px rgba\(0,\s*0,\s*0,\s*\.08\);)[\s\S]*}/,
  "Moodboard image card should be full-width, rounded, clipped, and softly shadowed",
);

assert.match(
  css,
  /\.moodboard__image-card img\s*{(?=[\s\S]*width:\s*100%;)(?=[\s\S]*aspect-ratio:\s*4 \/ 3;)(?=[\s\S]*object-fit:\s*cover;)[\s\S]*}/,
  "Moodboard image should cover a mobile-friendly 4:3 frame",
);

console.log("moodboard image tests passed");
