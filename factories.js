function updateScene(s) {
  if (s instanceof Shape) {
    scene.addShape(s);
  }
  txt.value = JSON.stringify(scene, serialize, 2);
}

const lineFact = new LineFact(updateScene);
const circleFact = new CircleFact(updateScene);
const arcFact = new ArcFact(updateScene);
const rectFact = new RectFact(updateScene);
const polyFact = new PolyFact(updateScene);
const resFact = new CompFact("compositions/resistor.json", updateScene);
const selectFact = new Select(updateScene);
