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
    let index;
    ({ shape, index } = this.composition.isOnHandle(p));
    if (index !== -1) {
      shape.showHandles(true);
      shape.highLightHandle(index);
    }
  }
}
