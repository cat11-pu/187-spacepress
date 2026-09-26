// press.js：压缩（连续两个及以上空格压成一个），单次扫描
export function pressSpaces(text) {
  const source = String(text);
  if (source.includes("\t")) {
    const error = new Error("tab character found");
    error.code = "E_TAB_FOUND";
    throw error;
  }
  let out = "";
  let saved = 0;
  let runs = 0;
  let longestRun = 0;
  let runLength = 0;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === " ") {
      runLength += 1;
      if (runLength === 1) {
        out += char;
      } else {
        saved += 1;
        if (runLength === 2) runs += 1;
        if (runLength > longestRun) longestRun = runLength;
      }
    } else {
      runLength = 0;
      out += char;
    }
  }
  return { text: out, saved, runs, longest_run: longestRun };
}
