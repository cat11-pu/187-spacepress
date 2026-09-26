// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，点压缩看结果。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const row = document.createElement("div");
    row.className = "row";
    const head = document.createElement("span");
    head.textContent = "压缩后长度";
    row.appendChild(head);
    const mark = document.createElement("span");
    mark.className = "chip ok";
    mark.textContent = view.length + " 个字符";
    row.appendChild(mark);
    parts.stage.appendChild(row);
    const row2 = document.createElement("div");
    row2.className = "row";
    row2.textContent = "压掉 " + view.saved + " 个字符，连续段 " + view.runs + " 处";
    parts.stage.appendChild(row2);
    parts.legend.textContent = "原长度 " + view.original + "，压缩后 " + view.length;
    parts.log.textContent = "最长连续段 " + view.longest_run;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "压缩连续空格";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加两个空格";
  addButton.addEventListener("click", function () {
    spec.text = String(spec.text || "") + "  ";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后两个字符";
  dropButton.addEventListener("click", function () {
    spec.text = String(spec.text || "").slice(0, -2);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "a  b";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 压缩后长度 " + view.length;
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看压掉几个字符";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "压掉 " + view.saved + " 个字符，连续段 " + view.runs + " 处";
  });
  parts.controls.appendChild(readButton);

  draw();
}
