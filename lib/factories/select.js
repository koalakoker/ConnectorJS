class Select extends Factory {
  constructor(composition) {
    super(() => {});
    this.composition = composition;
  }
  mouseDown(p) {
    this.composition.deselectAll();
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
