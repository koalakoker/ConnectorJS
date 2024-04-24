// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

let scene = new Composition();
let factory = new RectFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});

function reset() {
  scene.reset();
}

function reviveScene(key, value) {
  const nc = Composition.revive(value);
  if (nc !== undefined) return nc;

  const pen = Pen.revive(value);
  if (pen !== undefined) return pen;

  const rect = Rectangle.revive(value);
  if (rect !== undefined) return rect;

  const poly = Polygon.revive(value);
  if (poly !== undefined) return poly;

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

  if (selectedValue === "rect") {
    factory = new RectFact((s) => {
      scene.addShape(s);
      txt.value = JSON.stringify(scene);
    });
  } else if (selectedValue === "poly") {
    factory = new PolyFact((s) => {
      scene.addShape(s);
      txt.value = JSON.stringify(scene);
    });
  }
}
