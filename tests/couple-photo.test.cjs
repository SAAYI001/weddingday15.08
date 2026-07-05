const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");

const photoIndex = html.indexOf('class="section section-pad couple-section"');
const nextSectionIndex = html.indexOf('<section class="section section-pad" data-reveal>', photoIndex + 1);
const coupleSection = html.slice(photoIndex, nextSectionIndex);

assert.ok(photoIndex > -1, "Couple photo section should exist");
assert.ok(nextSectionIndex > -1, "Next content section should exist after the couple photo");
assert.doesNotMatch(html, /class="section countdown"/, "Standalone countdown section should be removed");

assert.match(
  html,
  /<img\s+src="assets\/newlyweds\.jpg"\s+alt="Сылдис и Алена">/,
  "Couple photo section should use the newlyweds image",
);

assert.doesNotMatch(
  coupleSection,
  /<figcaption|В ожидании нашего особенного дня|Сылдис & Алена/,
  "Couple photo should not show overlay captions",
);

assert.match(
  coupleSection,
  /class="couple-countdown"[\s\S]*data-countdown[\s\S]*data-countdown-days[\s\S]*data-countdown-hours[\s\S]*data-countdown-minutes[\s\S]*data-countdown-seconds/,
  "Wedding countdown should be overlaid inside the couple photo",
);

assert.ok(
  fs.existsSync(path.join(__dirname, "..", "assets", "newlyweds.jpg")),
  "Newlyweds photo asset should exist in the project",
);

assert.match(
  css,
  /\.couple-photo\s*{[\s\S]*border-radius:\s*30px;/,
  "Couple photo should have polished card styling",
);

assert.match(
  css,
  /\.couple-countdown\s*{[\s\S]*background:\s*rgba\(255,\s*255,\s*255,\s*\.36\);[\s\S]*backdrop-filter:\s*blur\(14px\);/,
  "Couple countdown should use transparent glass styling",
);

console.log("couple photo tests passed");
