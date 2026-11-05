(() => {
  const diagram = document.querySelector("#triangle");
  if (!diagram) return;

  const slider = diagram.querySelector("#slice-position");
  const fixed = diagram.querySelector("#fixed-variable");
  const value = diagram.querySelector("#slice-value");
  const description = diagram.querySelector("#slice-description");
  const line = diagram.querySelector("#slice-line");
  const start = diagram.querySelector("#slice-start");
  const end = diagram.querySelector("#slice-end");
  const format = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function place(point, x, y) {
    point.setAttribute("cx", x);
    point.setAttribute("cy", y);
  }

  function drawSlice() {
    const position = Number(slider.value) / 100;
    const display = format.format(position);
    const x = 52 + 200 * position;
    const y = 218 - 180 * position;
    const vertical = diagram.querySelector("input[name=direction]:checked").value === "vertical";
    value.value = display;
    slider.setAttribute("aria-valuetext", display);

    if (vertical) {
      fixed.textContent = "Фиксируем x";
      line.setAttribute("d", `M${x} 218 V${y}`);
      place(start, x, 218);
      place(end, x, y);
      description.textContent = `При x = ${display} переменная y пробегает от 0 до ${display}.`;
    } else {
      fixed.textContent = "Фиксируем y";
      line.setAttribute("d", `M${x} ${y} H252`);
      place(start, x, y);
      place(end, 252, y);
      description.textContent = `При y = ${display} переменная x пробегает от ${display} до 1.`;
    }
  }

  diagram.addEventListener("change", drawSlice);
  slider.addEventListener("input", drawSlice);
  drawSlice();
})();
