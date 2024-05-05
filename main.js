// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

let scene = new Composition();
let factory = lineFact;
let inputManager = new InputManager();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  factory.draw();
  scene.draw();
}

function reset() {
  scene.reset();
}

function load() {
  scene.reset();
  const jsonString = txt.value;
  scene = JSON.parse(jsonString, reviveScene);
}
