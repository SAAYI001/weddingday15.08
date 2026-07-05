const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "invite.html"), "utf8");

assert.match(
  html,
  /<form class="guest-form" data-guest-form>/,
  "Invite page should keep the guest form",
);

assert.doesNotMatch(
  html,
  /name="drinks"/,
  "Guest form should not ask for drink preferences",
);

assert.doesNotMatch(
  html,
  /Ваши предпочтения в напитках/,
  "Guest form should remove the drink preferences section title",
);

console.log("guest form tests passed");
