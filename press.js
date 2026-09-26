// press.js：压缩（基线：原样返回）
import { findRuns } from "./scan.js";

export function pressSpaces(text) {
  return { text: String(text), saved: 0, runs: 0, longest_run: 0 };
}
