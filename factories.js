function newShape(s) {
  scene.addShape(s);
  txt.value = JSON.stringify(scene, (key, value) => {
    if (key === "parent") return;
    return value;
  });
}

const lineFact = new LineFact(newShape);
const circleFact = new CircleFact(newShape);
const arcFact = new ArcFact(newShape);
const rectFact = new RectFact(newShape);
const polyFact = new PolyFact(newShape);
const resFact = new CompFact("compositions/resistor.json", newShape);
