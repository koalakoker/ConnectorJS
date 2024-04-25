class Rectangle extends Shape {
  constructor(center, width, height, angle = 0, p = currentpen) {
    super();
    this.type = "rectangle";
    this.center = center;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.pen = p;
  }
  static fromPoints(p1, p2) {
    const center = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    return { center: center, width: width, height: height };
  }
  static fromCenter(center, width, height, angle) {
    const p1 = new Point(center.x, center.y);
    const p2 = new Point(p1.x, p1.y);
    p2.add(radius * Math.cos(angle), radius * Math.sin(angle));
    return { p1: p1, p2: p2 };
  }
  update(center, width, height) {
    this.center = center;
    this.width = width;
    this.height = height;
  }
  updateAngle(angle) {
    this.angle = angle;
  }
  getPoints() {
    const hw = this.width / 2;
    const hh = this.height / 2;
    let pt;
    let pL = [];

    pt = new Point(-hw, -hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);

    pt = new Point(hw, -hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);

    pt = new Point(hw, hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);

    pt = new Point(-hw, hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);
    return pL;
  }
  draw() {
    drawPoly(this.getPoints(), this.pen);
    const { p1, p2 } = Polygon.fromCenter(this.center, this.radius, this.angle);
    const pointPen = new Pen("black", "black", 4);
    drawPoint(p1, pointPen);
    drawPoint(p2, pointPen);
  }

  static revive(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "type" in value &&
      value.type === "rectangle" &&
      "center" in value &&
      "width" in value &&
      "height" in value &&
      "angle" in value &&
      "pen" in value
    ) {
      return new Rectangle(
        value.center,
        value.width,
        value.height,
        value.angle,
        value.pen
      );
    }
  }
}
