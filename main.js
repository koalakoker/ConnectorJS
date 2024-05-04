// Animation Set and run
const fps = 60;
const dt = 1 / fps;
const intervalID = setInterval(draw, 1000 / fps);

let scene = new Composition();
let factory = lineFact;

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

function updateProperties(selectedObject) {
  var propertiesContainer = document.getElementById("propertiesContainer");
  propertiesContainer.innerHTML = ""; // Clear previous properties

  // Dynamically load HTML content for selected object
  fetch(`properties/object_${selectedObject}.html`)
    .then((response) => response.text())
    .then((html) => {
      propertiesContainer.innerHTML = html;
    })
    .catch((error) => console.error("Error fetching object HTML:", error));
}
