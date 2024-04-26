class Circle extends Shape {
  constructor(center, radius, p = currentpen) {
    super();
    this.type = "circle";
    this.center = center;
    this.radius = radius;
    this.pen = p;
    this.createHandles();
  }
  static fromPoints(p1, p2) {
    const center = new Point(p1.x, p1.y);
    const radius = dist(p1, p2);
    return { center: center, radius: radius };
  }
  handlePoints() {
    const hL = [];
    let pt;
    pt = new Point(this.center.x, this.center.y);
    hL.push(pt);
    pt = new Point(this.center.x + this.radius, this.center.y);
    hL.push(pt);
    return hL;
  }
  update(center, radius) {
    this.center = center;
    this.radius = radius;
    this.updateHandles();
  }
  draw() {
    drawCircle(this.center, this.radius, this.pen);
    super.draw();
  }
  isOnItem(p) {
    return dist(p, this.center) <= this.radius;
  }
  static revive(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "type" in value &&
      value.type === "circle" &&
      "center" in value &&
      "radius" in value &&
      "pen" in value
    ) {
      return new Circle(value.center, value.radius, value.pen);
    }
  }
}
