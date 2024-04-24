// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

let scene = new Composition();
const factory = new RectFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});

function reset() {
  scene.reset();
}

function reviveScene(key, value) {
  if (
    key === "pen" &&
    typeof value === "object" &&
    value !== null &&
    "strokeColor" in value &&
    "fillColor" in value &&
    "width" in value &&
    "dash" in value
  ) {
    return new Pen(value.strokeColor, value.fillColor, value.width, value.dash);
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "center" in value &&
    "width" in value &&
    "height" in value &&
    "angle" in value &&
    "pen" in value
  ) {
    return new Rectangle(
      value.center,
      value.width,
      value.height,
      value.angle,
      value.pen
    );
  }
  if (typeof value === "object" && value !== null && "shapes" in value) {
    const nC = new Composition();
    value.shapes.map((shape) => nC.addShape(shape));
    return nC;
  }
  return value;
}

function load() {
  console.log(scene);
  scene.reset();
  const jsonString = txt.value;
  scene = JSON.parse(jsonString, reviveScene);
  console.log(scene);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  factory.draw();
  scene.draw();
}
