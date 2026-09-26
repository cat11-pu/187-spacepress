import assert from "node:assert";
import { findRuns } from "../scan.js";
import { pressSpaces } from "../press.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("findRuns returns a list", () => {
  assert.ok(Array.isArray(findRuns("a  b")));
});

check("pressSpaces returns text", () => {
  assert.strictEqual(typeof pressSpaces("a  b").text, "string");
});

check("pressSpaces returns saved count", () => {
  assert.strictEqual(typeof pressSpaces("a  b").saved, "number");
});

check("render counts length", () => {
  assert.strictEqual(typeof render({ text: "a  b" }).length, "number");
});

check("render exposes runs", () => {
  assert.strictEqual(typeof render({ text: "a  b" }).runs, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
