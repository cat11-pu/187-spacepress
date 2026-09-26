// scan.js：找连续空格段（只收长度不小于二的段），单次扫描
export function findRuns(text) {
  const source = String(text);
  const runs = [];
  let start = -1;
  for (let index = 0; index <= source.length; index += 1) {
    if (index < source.length && source[index] === " ") {
      if (start === -1) start = index;
    } else if (start !== -1) {
      const length = index - start;
      if (length >= 2) runs.push({ start, length });
      start = -1;
    }
  }
  return runs;
}
