// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

let modifier = "";
let scene = new Composition();
let factory = lineFact;

// Test
let nc = new Composition(new Point(0, 0), new Point(100, 100));
let r = new Rectangle(new Point(0, 0), 50, 50);
nc.addShape(r);
scene.addShape(nc);

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
