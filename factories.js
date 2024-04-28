const lineFact = new LineFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const circleFact = new CircleFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const arcFact = new ArcFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const rectFact = new RectFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const polyFact = new PolyFact((s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
const resFact = new CompFact("compositions/resistor.json", (s) => {
  scene.addShape(s);
  txt.value = JSON.stringify(scene);
});
