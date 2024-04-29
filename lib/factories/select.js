class Select extends Factory {
  constructor() {
    super(() => {});
  }
  mouseDown(p, modifier) {
    scene.deselectAll();

    this.select(p, modifier);

    const { shapeOnHandle, indexOnHandle } = scene.isOnHandle(p);
    if (indexOnHandle !== -1) {
      shapeOnHandle.showHandles(true);
      shapeOnHandle.highLightHandle(indexOnHandle);
    }
  }
  select(p, modifier) {
    let shape = scene.isOnItem(p);
    if (shape === undefined) return;
    if (shape.type === "composition") {
      if (modifier === "shift") {
        shape.showHandles(true);
      } else {
        shape = shape.isOnItem(p);
        if (shape) {
          shape.showHandles(true);
        }
      }
    } else {
      shape.showHandles(true);
    }
  }
}
