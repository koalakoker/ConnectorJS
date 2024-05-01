function newShape(s) {
  scene.addShape(s);
  const jsonTxt = JSON.stringify(scene, serialize, 2);
  txt.value = jsonTxt;
}

function updateScene() {
  txt.value = JSON.stringify(scene, serialize);
}

const lineFact = new LineFact(newShape);
const circleFact = new CircleFact(newShape);
const arcFact = new ArcFact(newShape);
const rectFact = new RectFact(newShape);
const polyFact = new PolyFact(newShape);
const resFact = new CompFact("compositions/resistor.json", newShape);
const selectFact = new Select(updateScene);
