class Polygon extends Shape {
  constructor(center, radius, sides, angleOffset = 0, p = currentpen) {
    super();
    this.type = "polygon";
    this.center = center;
    this.radius = radius;
    this.sides = sides;
    this.angleOffset = angleOffset;
    this.pen = p;
  }
  static fromPoints(p1, p2) {
    const center = new Point(p1.x, p1.y);
    const radius = Math.sqrt(
      (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    );
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    return { center: center, radius: radius, angle: angle };
  }
  static fromCenter(center, radius, angle) {
    const p1 = new Point(center.x, center.y);
    let p2 = new Point(p1.x, p1.y);
    p2 = p2.add(radius * Math.cos(angle), radius * Math.sin(angle));
    return { p1: p1, p2: p2 };
  }
  update(center, radius, angleOffset) {
    this.center = center;
    this.radius = radius;
    this.angleOffset = angleOffset ? angleOffset : this.angleOffset;
  }
  updateSides(sides) {
    if (sides > 2) {
      this.sides = sides;
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
    const { p1, p2 } = Polygon.fromCenter(
      this.center,
      this.radius,
      this.angleOffset
    );
    const pointPen = new Pen("black", "black", 4);
    drawPoint(p1, pointPen);
    drawPoint(p2, pointPen);
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
