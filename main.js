// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

const scene = new Composition();
const factory = new RectFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});

function load() {
  console.log("Load");
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  factory.draw();
  scene.draw();
}
