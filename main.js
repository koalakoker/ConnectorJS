// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

const history = new History();
const scene = new Scene(new Composition());
history.push(scene.createMemento());

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
  scene.setContent(JSON.parse(jsonString, reviveScene));
}

function undo() {
  scene.restoreFromMemento(history.undo());
}

function redo() {
  scene.restoreFromMemento(history.redo());
}
