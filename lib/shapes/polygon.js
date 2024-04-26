class Polygon extends Shape {
  constructor(center, radius, sides, angleOffset = 0, p = currentpen) {
    super();
    this.type = "polygon";
    this.center = center;
    this.radius = radius;
    this.sides = sides;
    this.angleOffset = angleOffset;
    this.pen = p;
    this.createHandles();
  }
  static fromPoints(p1, p2) {
    const center = new Point(p1.x, p1.y);
    const radius = Math.round(dist(p1, p2));
    const angle = direction(p1, p2);
    return { center: center, radius: radius, angle: angle };
  }
  static fromCenter(center, radius, angle) {
    const p1 = new Point(center.x, center.y);
    let p2 = new Point(p1.x, p1.y);
    p2 = p2.add(radius * Math.cos(angle), radius * Math.sin(angle));
    return { p1: p1, p2: p2 };
  }
  createHandles() {
    const { p1, p2 } = Polygon.fromCenter(
      this.center,
      this.radius,
      this.angleOffset
    );
    this.handles.push(new Handle(p1));
    this.handles.push(new Handle(p2));
  }
  updateHandles() {
    const { p1, p2 } = Polygon.fromCenter(
      this.center,
      this.radius,
      this.angleOffset
    );
    this.handles[0].pos = p1;
    this.handles[1].pos = p2;
  }
  update(center, radius, angleOffset) {
    this.center = center;
    this.radius = radius;
    this.angleOffset = angleOffset ? angleOffset : this.angleOffset;
    this.updateHandles();
  }
  updateSides(sides) {
    if (sides > 2) {
      this.sides = sides;
      this.updateHandles();
    }
  }
  getPoints() {
    let angle = this.angleOffset;
    let rad = this.radius;
    let pL = [];
    for (let i = 0; i < this.sides; i++) {
      let pt = new Point(
        this.center.x + rad * Math.cos(angle),
        this.center.y + rad * Math.sin(angle)
      );
      pL.push(pt);
      angle += (Math.PI * 2) / this.sides;
    }
    return pL;
  }
  draw() {
    drawPoly(this.getPoints(), this.pen);
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
      value.type === "polygon" &&
      "center" in value &&
      "radius" in value &&
      "sides" in value &&
      "angleOffset" in value &&
      "pen" in value
    ) {
      return new Polygon(
        value.center,
        value.radius,
        value.sides,
        value.angleOffset,
        value.pen
      );
    }
  }
}
