const assert = require("node:assert/strict");

const { getCountdownParts } = require("../script.js");

const target = new Date("2026-08-15T00:00:00+07:00");
const now = new Date("2026-08-14T22:30:15+07:00");

assert.deepEqual(getCountdownParts(target, now), {
  days: 0,
  hours: 1,
  minutes: 29,
  seconds: 45,
});

assert.deepEqual(getCountdownParts(target, new Date("2026-08-16T00:00:00+07:00")), {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

console.log("countdown tests passed");
