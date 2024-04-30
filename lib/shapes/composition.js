class Composition extends Shape {
  constructor(pivot = new Point(0, 0), center = new Point(0, 0)) {
    super();
    this.type = "composition";
    this.shapes = [];
    this.pivot = pivot;
    this.center = center;
    this.createHandles();
  }
  addShape(s) {
    s.parent = this;
    s.updateHandles();
    this.shapes.push(s);
  }
  removeShape(s) {
    const i = this.shapes.findIndex((value) => {
      return value === s;
    });
    if (i >= 0 && i < this.shapes.length) {
      this.shapes.splice(i, 1);
    }
  }
  static fromPoints(p1, p2) {
    return { center: p2 };
  }
  handlePoints() {
    const hL = [];
    let pt;
    hL.push(this.pivot);
    hL.push(this.center);
    return hL;
  }
  update(center) {
    this.center = center;
    this.updateHandles();
  }
  updatePivot(pivot) {
    this.pivot = pivot;
    this.updateHandles();
  }
  updateHandles() {
    this.shapes.forEach((shape) => {
      shape.updateHandles();
    });
    super.updateHandles();
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
      const { shapeOnHandle, indexOnHandle } = shape.isOnHandle(p);
      if (indexOnHandle !== undefined && indexOnHandle !== -1)
        return { shapeOnHandle: shapeOnHandle, indexOnHandle: indexOnHandle };
    }
    return { shapeOnHandle: null, indexOnHandle: -1 };
  }
  deselectAll() {
    this.shapes.forEach((shape) => {
      shape.showHandles(false);
      if (shape.type === "composition") {
        shape.deselectAll();
      }
    });
  }
  draw() {
    this.shapes.forEach((shape) => {
      shape.draw();
    });
    super.draw();
  }
  reset() {
    this.shapes = [];
  }
  static revive(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "shapes" in value &&
      "center" in value &&
      "pivot" in value &&
      Array.isArray(value.shapes)
    ) {
      const nC = new Composition(value.pivot, value.center);
      value.shapes.map((shape) => nC.addShape(shape));
      return nC;
    }
  }
}
