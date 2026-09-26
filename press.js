// press.js：连续两个及以上空格压成一个，单个空格与其他字符原样保留。
import { findRuns } from "./scan.js";

export function pressSpaces(text) {
  const source = String(text);
  const runs = findRuns(source);
  let out = "";
  let saved = 0;
  let longest = 0;
  let cursor = 0;
  for (const run of runs) {
    out += source.slice(cursor, run.start) + " ";
    saved += run.length - 1;
    if (run.length > longest) longest = run.length;
    cursor = run.start + run.length;
  }
  out += source.slice(cursor);
  return { text: out, saved, runs: runs.length, longest_run: longest };
}
