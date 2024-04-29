function getPosOnCanvas(p) {
  const rect = canvas.getBoundingClientRect();
  const cX = rect.left;
  const cY = rect.top;
  let pt = new Point(p.x - cX, p.y - cY);
  pt = pt.int();
  pt = grid.snap(pt);
  return pt;
}

function mouseDown(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  factory.mouseDown(p, "shift");
}

function mouseMove(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  factory.mouseMove(p);
}

function mouseUp(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  factory.mouseUp(p);
}

function wheel(e) {
  factory.wheel(Math.sign(e.deltaY));
}

function keypress(e) {
  if (e.key === "+") {
    factory.wheel(-1);
  }
  if (e.key === "-") {
    factory.wheel(1);
  }
}

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("wheel", wheel);
document.addEventListener("keypress", keypress);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    console.log("Call draw");
    draw();
  }
  if (e.key === "ArrowLeft") {
    console.log("Time freeze");
    clearInterval(intervalID);
  }
});

const txt = document.getElementById("txt");

function handleShapeChange() {
  var selectElement = document.getElementById("shape-select");
  var selectedValue = selectElement.value;

  if (selectedValue === "line") {
    factory = lineFact;
  }
  if (selectedValue === "circle") {
    factory = circleFact;
  }
  if (selectedValue === "arc") {
    factory = arcFact;
  }
  if (selectedValue === "rect") {
    factory = rectFact;
  }
  if (selectedValue === "poly") {
    factory = polyFact;
  }
  if (selectedValue === "composition") {
    factory = resFact;
  }
  if (selectedValue === "select") {
    factory = new Select(scene);
  }
}

function handleCompChange() {
  var selectElement = document.getElementById("compSelect");
  var selectedValue = selectElement.value;
  resFact.pathJSON = selectedValue;
  const shapeSelect = document.getElementById("shape-select");
  shapeSelect.value = "composition";
  shapeSelect.dispatchEvent(new Event("change"));
}

// window.onload = function () {
//   fetch("Scene.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const jsonString = JSON.stringify(data, null, 2);
//       document.getElementById("txt").value = jsonString;
//       scene = JSON.parse(jsonString, reviveScene);
//     })
//     .catch((error) => console.error("Error loading JSON file:", error));
// };
