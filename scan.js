// scan.js：找连续空格段，返回每段的起点与长度（只收长度不小于二的段）。
// 单次扫描，每字符只看一次；制表符报 E_TAB_FOUND；其他空白字符不参与。
export function findRuns(text) {
  const source = String(text);
  const runs = [];
  let start = -1;
  for (let index = 0; index < source.length; index += 1) {
    const ch = source[index];
    if (ch === "\t") {
      const error = new Error("tab character found at index " + index);
      error.code = "E_TAB_FOUND";
      throw error;
    }
    if (ch === " ") {
      if (start < 0) start = index;
    } else if (start >= 0) {
      const length = index - start;
      if (length >= 2) runs.push({ start, length });
      start = -1;
    }
  }
  if (start >= 0) {
    const length = source.length - start;
    if (length >= 2) runs.push({ start, length });
  }
  return runs;
}
