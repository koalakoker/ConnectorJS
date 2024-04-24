class Composition {
  constructor() {
    this.shapes = [];
  }
  addShape(s) {
    this.shapes.push(s);
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
