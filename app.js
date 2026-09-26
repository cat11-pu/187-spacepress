// app.js：渲染结果
import { findRuns } from "./scan.js";
import { pressSpaces } from "./press.js";

export function render(spec) {
  const text = String(spec.text || "");
  const view = pressSpaces(text);
  const out = String(view.text || "");
  const runs = findRuns(text);
  return { text: out, saved: view.saved || 0, runs: view.runs || 0,
           longest_run: view.longest_run || 0, length: out.length,
           original: text.length, segment_count: runs.length };
}
