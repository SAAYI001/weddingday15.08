const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");
const indexHtml = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

assert.doesNotMatch(
  html,
  /data-map-toggle/,
  "Location card should not hide the map behind an in-page button",
);

assert.match(
  html,
  /<p class="location-card__address">[^<]*106<\/p>/,
  "Location card should show the venue address",
);

for (const page of [html, indexHtml]) {
  assert.match(
    page,
    /<p>Праздничный банкет будут проходить в банкетном зале "Рояль-Холл"<\/p>/,
    "Location copy should start with capitalized 'Праздничный банкет'",
  );

  assert.doesNotMatch(
    page,
    /Выездная церемония и/,
    "Location copy should not mention the outgoing ceremony text",
  );
}

assert.match(
  html,
  /<div\s+class="location-card__map"\s+id="location-map"\s+data-location-map>/,
  "Location card map should be visible by default",
);

assert.doesNotMatch(
  html,
  /data-location-map\s+hidden/,
  "Location card map should not use the hidden attribute",
);

assert.match(
  html,
  /<iframe[^>]+src="https:\/\/yandex\.ru\/map-widget\/v1\/\?[^"]*ll=94\.740760%2C51\.701650[^"]*pt=94\.740760%2C51\.701650%2Cpm2rdm[^"]*z=18/,
  "Location card should embed a Yandex Maps POI marker on building 106",
);

assert.match(
  html,
  /<a\s+class="location-card__map-link"[^>]+href="https:\/\/yandex\.ru\/maps\/\?[^"]*ll=94\.740760%2C51\.701650[^"]*pt=94\.740760%2C51\.701650%2Cpm2rdm[^"]*z=18/,
  "Location card should include a fallback Yandex Maps link with the building 106 marker",
);

assert.match(
  css,
  /\.location-card__map\s*{[\s\S]*height:\s*clamp\(260px,\s*74vw,\s*320px\)/,
  "Location map should have a mobile-friendly height",
);

assert.doesNotMatch(
  script,
  /function initLocationMap\(\)/,
  "Location map should not need click behavior when it is always open",
);

console.log("location map tests passed");
