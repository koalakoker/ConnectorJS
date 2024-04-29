class Polygon extends Shape {
  constructor(center, radius, sides, angle = 0, p = currentpen) {
    super();
    this.type = "polygon";
    this.center = center;
    this.radius = radius;
    this.sides = sides;
    this.angle = angle;
    this.pen = p;
    this.createHandles();
  }
  static fromPoints(p1, p2) {
    const center = new Point(p1.x, p1.y);
    const radius = Math.round(dist(p1, p2));
    const angle = direction(p1, p2);
    return { center: center, radius: radius, angle: angle };
  }
  handlePoints() {
    let hL = [];
    let pt = new Point(this.center.x, this.center.y);
    hL.push(pt);
    pt = new Point(pt.x, pt.y);
    pt.add(
      new Point(
        this.radius * Math.cos(this.angle),
        this.radius * Math.sin(this.angle)
      )
    );
    pt = pt.int();
    hL.push(pt);
    hL = this.computeFinalPoints(hL);
    return hL;
  }
  update(center, radius, angle) {
    this.center = center;
    this.radius = radius;
    this.angle = angle ? angle : this.angle;
    this.updateHandles();
  }
  updateSides(sides) {
    if (sides > 2) {
      this.sides = sides;
      this.updateHandles();
    }
  }
  getPoints() {
    let angle = this.angle;
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
    drawPoly(this.computeFinalPoints(this.getPoints()), this.pen);
    super.draw();
  }
  isOnItem(p) {
    const pL = this.computeFinalPoints([this.center]);
    return dist(p, pL[0]) <= this.radius;
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
      "angle" in value &&
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
