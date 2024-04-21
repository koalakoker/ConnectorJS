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
}
