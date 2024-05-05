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
  if (!isInCanvas(p)) return;
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

function noModifier() {
  return mControl === false && mAlt === false && mShift === false;
}

function keydown(e) {
  // if (e.key === "ArrowRight") {
  //   console.log("Call draw");
  //   draw();
  // }
  // if (e.key === "ArrowLeft") {
  //   console.log("Time freeze");
  //   clearInterval(intervalID);
  // }
  if (e.code === "KeyL" && noModifier()) {
    setMode("line");
    e.preventDefault();
  }
  if (e.code === "KeyC" && noModifier()) {
    setMode("circle");
    e.preventDefault();
  }
  if (e.code === "KeyA" && noModifier()) {
    setMode("arc");
    e.preventDefault();
  }
  if (e.code === "KeyR" && noModifier()) {
    setMode("rect");
    e.preventDefault();
  }
  if (e.code === "KeyP" && noModifier()) {
    setMode("poly");
    e.preventDefault();
  }
  if (e.key === "Escape") {
    if (factory !== selectFact) {
      setMode("select");
    }
    factory.event("deselect");
    factory.event("escape");
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
  if (e.code === "KeyC" && mControl) {
    factory.event("copy");
  }
  if (e.code === "KeyV" && mControl) {
    factory.event("paste");
  }
  if (e.code === "Delete" || e.code === "Backspace") {
    factory.event("canc");
  }
  console.log(e.code);
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
function txtToggleVisibility() {
  if (txt.style.display === "") {
    txt.style.display = "none";
    document.getElementById("txtToggleVisibility").value = ">";
  } else {
    txt.style.display = "";
    document.getElementById("txtToggleVisibility").value = "x";
  }
}

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

function setMode(mode) {
  const shapeSelect = document.getElementById("shape-select");
  shapeSelect.value = mode;
  shapeSelect.dispatchEvent(new Event("change"));
}

function handleCompChange() {
  var selectElement = document.getElementById("compSelect");
  var selectedValue = selectElement.value;
  resFact.pathJSON = selectedValue;
  setMode("composition");
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

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function createPenFromGui() {
  const sc = strokeColor.value;
  const fc = fillColor.value;
  let ss = parseInt(strokeSize.value);
  let sd = strokeDash.value;

  if (!isNumber(ss)) return;
  if (ss < 0 || ss > 100) return;
  ss = Math.round(ss);

  sd = JSON.parse(sd);
  if (!isArray(sd)) return;

  setCurrentPen(new Pen(sc, fc, ss, sd));
  console.log("Set new pen", sc, fc, ss, sd);
}

const strokeColor = document.getElementById("strokeColor");
strokeColor.addEventListener("input", createPenFromGui);
const fillColor = document.getElementById("fillColor");
fillColor.addEventListener("input", createPenFromGui);
const strokeSize = document.getElementById("strokeSize");
strokeSize.addEventListener("input", createPenFromGui);
const strokeDash = document.getElementById("strokeDash");
strokeDash.addEventListener("input", createPenFromGui);
