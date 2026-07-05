const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");

const dayProgramIndex = html.indexOf('class="section section-pad day-program-section"');
const secondPhotoIndex = html.indexOf('class="section section-pad newlyweds-second-section"', dayProgramIndex);
const locationIndex = html.indexOf('class="card location-card"', dayProgramIndex);

assert.ok(dayProgramIndex > -1, "Day program section should exist");
assert.ok(secondPhotoIndex > -1, "Second newlyweds photo section should exist after the day program");
assert.ok(locationIndex > -1, "Location section should exist after the day program");
assert.ok(
  dayProgramIndex < secondPhotoIndex && secondPhotoIndex < locationIndex,
  "Second newlyweds photo should be placed between the day program and location sections",
);

assert.match(
  html,
  /<figure class="newlyweds-second-card" data-reveal>[\s\S]*<img src="assets\/newlyweds-second\.jpg" alt="Сылдис и Алена в национальных свадебных образах">[\s\S]*<\/figure>/,
  "Second newlyweds photo should use the provided local image asset",
);

assert.ok(
  fs.existsSync(path.join(__dirname, "..", "assets", "newlyweds-second.jpg")),
  "Second newlyweds photo asset should exist in the project",
);

assert.match(
  css,
  /\.newlyweds-second-card\s*{(?=[\s\S]*border-radius:\s*30px;)(?=[\s\S]*overflow:\s*hidden;)(?=[\s\S]*box-shadow:)[\s\S]*}/,
  "Second newlyweds photo should use a polished rounded card style",
);

assert.match(
  css,
  /\.newlyweds-second-card img\s*{(?=[\s\S]*width:\s*100%;)(?=[\s\S]*aspect-ratio:\s*4 \/ 5;)(?=[\s\S]*object-fit:\s*cover;)[\s\S]*}/,
  "Second newlyweds photo should crop cleanly for mobile",
);

console.log("second newlyweds photo tests passed");
