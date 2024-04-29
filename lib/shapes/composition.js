class Composition extends Shape {
  constructor(pivot = new Point(0, 0), center = new Point(0, 0)) {
    super();
    this.type = "composition";
    this.shapes = [];
    this.pivot = pivot;
    this.center = center;
    this.angle = 0;
    this.createHandles();
  }
  addShape(s) {
    s.parent = this;
    this.shapes.push(s);
  }
  static fromPoints(p1, p2) {
    const center = p2;
    const radius = dist(p1, p2);
    const angle = direction(p1, p2);
    return { center: center, radius, radius, angle: angle };
  }
  handlePoints() {
    const hL = [];
    let pt;
    hL.push(this.pivot);
    hL.push(this.center);
    pt = new Point(this.radius, 0);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    hL.push(pt);
    return hL;
  }
  update(center) {
    this.center = center;
    this.updateHandles();
  }
  updateAngle(angle) {
    this.angle = angle;
    this.updateHandles();
  }
  updatePivot(pivot) {
    this.pivot = pivot;
    this.updateHandles();
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
      if (indexOnHandle !== undefined)
        return { shapeOnHandle: shapeOnHandle, indexOnHandle: indexOnHandle };
    }
    return { shapeOnHandle: null, indexOnHandle: -1 };
  }
  deselectAll() {
    this.shapes.forEach((shape) => {
      shape.showHandles(false);
    });
  }
  draw() {
    this.shapes.forEach((shape) => {
      shape.draw(this.center, this.pivot);
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
