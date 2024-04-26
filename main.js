// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

const lineFact = new LineFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const circleFact = new CircleFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const rectFact = new RectFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const polyFact = new PolyFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});

let scene = new Composition();
let factory = lineFact;

function reset() {
  scene.reset();
}

function reviveScene(key, value) {
  let rObj;

  rObj = Composition.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Pen.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Line.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Circle.revive(value);
  if (rObj !== undefined) return rObj;

  // rObj = Arc.revive(value);
  // if (rObj !== undefined) return rObj;

  rObj = Rectangle.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Polygon.revive(value);
  if (rObj !== undefined) return rObj;

  return value;
}

function load() {
  scene.reset();
  const jsonString = txt.value;
  scene = JSON.parse(jsonString, reviveScene);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  factory.draw();
  scene.draw();
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
  if (selectedValue === "select") {
    factory = new Select(scene);
  }
}

window.onload = function () {
  fetch("Scene.json")
    .then((response) => response.json())
    .then((data) => {
      const jsonString = JSON.stringify(data, null, 2);
      document.getElementById("txt").value = jsonString;
      scene = JSON.parse(jsonString, reviveScene);
    })
    .catch((error) => console.error("Error loading JSON file:", error));
};
