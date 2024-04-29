class Select extends Factory {
  constructor(composition) {
    super(() => {});
    this.composition = composition;
  }
  mouseDown(p, modifier) {
    this.composition.deselectAll();

    if (modifier === "shift") {
      let shape = this.composition.isOnItem(p);
      if (shape === undefined) return;
      if (shape.type === "composition") {
        console.log(shape);
        shape.deselectAll();
        shape = shape.isOnItem(p);
        if (shape) {
          shape.showHandles(true);
        }
      } else {
        console.log("Is a ", shape.type);
      }
    } else {
      const shape = this.composition.isOnItem(p);
      if (shape) {
        shape.showHandles(true);
      }

      const { shapeOnHandle, indexOnHandle } = this.composition.isOnHandle(p);
      if (indexOnHandle !== -1) {
        shapeOnHandle.showHandles(true);
        shapeOnHandle.highLightHandle(indexOnHandle);
      }
    }
  }
}
