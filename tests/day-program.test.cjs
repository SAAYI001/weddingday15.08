const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const requiredEvents = [
  ["09:00", "Утро жениха и невесты", "Подготовка, спокойное начало самого важного дня."],
  ["12:00", "Бракосочетание", "Торжественный момент создания семьи."],
  ["14:00", "Прогулка и свадебная фотосессия", "Тёплые кадры и первые воспоминания."],
  ["16:00", "Свадебный банкет", "Музыка, еда, танцы и поздравления."],
  ["22:00", "Завершение торжества", "Финал красивого дня с благодарностью гостям."],
];

assert.match(
  html,
  /<article class="card day-program-card">/,
  "Day program should use its own styled card",
);

for (const [time, title, description] of requiredEvents) {
  assert.match(html, new RegExp(`<time>${time}</time>`), `Day program should include ${time}`);
  assert.match(html, new RegExp(title), `Day program should include ${title}`);
  assert.match(html, new RegExp(description), `Day program should include ${description}`);
}

assert.equal(
  (html.match(/class="timeline__icon"/g) || []).length,
  5,
  "Each day program item should include an event icon",
);

assert.equal(
  (html.match(/data-timeline-item/g) || []).length,
  5,
  "Each day program item should have its own scroll animation hook",
);

assert.match(
  css,
  /\.day-program-card\s*{(?=[\s\S]*border-radius:\s*28px;)(?=[\s\S]*background:[\s\S]*#fff8f2)(?=[\s\S]*box-shadow:)[\s\S]*}/,
  "Day program card should use a soft pastel rounded style",
);

assert.match(
  css,
  /\.timeline\s*{[\s\S]*position:\s*relative;[\s\S]*display:\s*grid;/,
  "Timeline should be a vertical layout",
);

assert.match(
  css,
  /\.timeline::before\s*{[\s\S]*position:\s*absolute;[\s\S]*width:\s*1px;/,
  "Timeline should include a thin vertical decorative line",
);

assert.match(
  css,
  /\.timeline__item:hover\s+\.timeline__content\s*{[\s\S]*transform:\s*translateY\(-3px\)\s*scale\(1\.015\);[\s\S]*box-shadow:/,
  "Timeline cards should have a subtle hover lift",
);

assert.match(
  css,
  /\[data-timeline-item\]\s*{[\s\S]*opacity:\s*0;[\s\S]*translateY\(18px\)/,
  "Timeline items should fade and slide up before reveal",
);

assert.match(
  script,
  /document\.querySelectorAll\("\[data-reveal\],\s*\[data-timeline-item\]"\)/,
  "Scroll reveal should include individual timeline items",
);

console.log("day program tests passed");
