class Select extends Factory {
  constructor(composition) {
    super();
    this.composition = composition;
  }
  mouseDown(p) {
    this.composition.deselectAll();
    let shape = this.composition.isOnItem(p);
    if (shape) {
      shape.showHandles(true);
    }
    let hIndex = this.composition.isOnHandle(p);
    if (hIndex !== undefined) {
      shape.highLightHandle(hIndex);
    }
  }
}
