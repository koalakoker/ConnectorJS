class Composition {
  constructor() {
    this.shapes = [];
  }
  addShape(s) {
    this.shapes.push(s);
  }
  isOnItem(p) {
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      if (shape.isOnItem(p)) return shape;
    }
  }
  isOnHandle(p) {
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      let index = shape.isOnHandle(p);
      if (index !== undefined) return { shape: shape, index: index };
    }
    return { shape: null, index: -1 };
  }
  deselectAll() {
    this.shapes.forEach((shape) => {
      shape.showHandles(false);
    });
  }
  draw() {
    this.shapes.forEach((shape) => {
      shape.draw();
    });
  }
  reset() {
    this.shapes = [];
  }
  static revive(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "shapes" in value &&
      Array.isArray(value.shapes)
    ) {
      const nC = new Composition();
      value.shapes.map((shape) => nC.addShape(shape));
      return nC;
    }
  }
}
