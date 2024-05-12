function getPosOnCanvas(p) {
  const rect = canvas.getBoundingClientRect();
  const cX = rect.left;
  const cY = rect.top;
  let pt = new Point(p.x - cX, p.y - cY);
  pt = pt.int();
  pt = grid.snap(pt);
  return pt;
}

let mouse = new Point(0, 0);

function mouseDown(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  const p = getPosOnCanvas(mouse);
  if (!isInCanvas(p)) return;
  factory.mouseDown(p, modifier);
}

function mouseMove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  const p = getPosOnCanvas(mouse);
  if (!isInCanvas(p)) return;
  factory.mouseMove(p);
}

function mouseUp(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  const p = getPosOnCanvas(mouse);
  if (!isInCanvas(p)) return;
  factory.mouseUp(p);
}

function wheel(e) {
  factory.wheel(Math.sign(e.deltaY));
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
