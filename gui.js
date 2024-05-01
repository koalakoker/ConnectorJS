function getPosOnCanvas(p) {
  const rect = canvas.getBoundingClientRect();
  const cX = rect.left;
  const cY = rect.top;
  let pt = new Point(p.x - cX, p.y - cY);
  pt = pt.int();
  pt = grid.snap(pt);
  return pt;
}

let modifier = "";
let mControl = false;
let mShift = false;
let mAlt = false;

function mouseDown(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  factory.mouseDown(p, modifier);
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

function keydown(e) {
  if (e.key === "ArrowRight") {
    console.log("Call draw");
    draw();
  }
  if (e.key === "ArrowLeft") {
    console.log("Time freeze");
    clearInterval(intervalID);
  }
  if (e.key === "Escape") {
    factory.event("deselect");
  }
  if (e.key === "Control" || e.code === "MetaLeft" || e.code === "MetaRight") {
    mControl = true;
  }
  if (e.key === "Shift") {
    modifier = "shift";
    mShift = true;
  }
  if (e.key === "Alt") {
    mAlt = true;
  }
  if (e.code === "KeyP" && mAlt) {
    factory.event("setPivot");
  }
  if (e.code === "Escape") {
    factory.event("escape");
  }
  if (e.code === "KeyC" && mControl) {
    e.preventDefault();
    factory.event("copy");
  }
  if (e.code === "KeyV" && mControl) {
    factory.event("paste");
  }
  if (e.code === "Delete" || e.code === "Backspace") {
    factory.event("canc");
  }
  //console.log(e.code);
}

function keyup(e) {
  if (e.key === "Control" || e.code === "MetaLeft" || e.code === "MetaRight") {
    mControl = false;
  }
  if (e.key === "Shift") {
    modifier = "";
    mShift = false;
  }
  if (e.key === "Alt") {
    mAlt = false;
  }
}

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("wheel", wheel);
document.addEventListener("keypress", keypress);
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

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
    factory = selectFact;
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

const strokeColor = document.getElementById("strokeColor");
strokeColor.addEventListener("input", (e) => {
  const selectedColor = e.target.value;
  setCurrentPen(new Pen(selectedColor));
});
const fillColor = document.getElementById("fillColor");
fillColor.addEventListener("input", (e) => {
  const selectedColor = e.target.value;
  setCurrentPen(new Pen("", selectedColor));
});
