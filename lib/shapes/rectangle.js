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
    const hw = width / 2;
    const hh = height / 2;
    let p1 = new Point(-hw, -hh);
    p1 = rotate(p1, angle);
    p1 = translate(p1, center);
    let p2 = new Point(hw, hh);
    p2 = rotate(p2, angle);
    p2 = translate(p2, center);
    let p3 = new Point(hw, 0);
    p3 = rotate(p3, angle);
    p3 = translate(p3, center);
    return { p1: p1, p2: p2, p3: p3 };
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
    if (this.showHandlesState) {
      const { p1, p2, p3 } = Rectangle.fromCenter(
        this.center,
        this.width,
        this.height,
        this.angle
      );
      const pointPen = new Pen("black", "black", 4);
      const pointPenHigh = new Pen("red", "red", 4);
      if (this.highLightHandleIndex === 0) {
        drawPoint(p1, pointPenHigh);
      } else {
        drawPoint(p1, pointPen);
      }
      if (this.highLightHandleIndex === 1) {
        drawPoint(p2, pointPenHigh);
      } else {
        drawPoint(p2, pointPen);
      }
      if (this.highLightHandleIndex === 2) {
        drawPoint(p3, pointPenHigh);
      } else {
        drawPoint(p3, pointPen);
      }
    }
  }
  isOnItem(p) {
    const hw = this.width / 2;
    const hh = this.height / 2;
    let pt = translate(p, new Point(-this.center.x, -this.center.y));
    pt = rotate(pt, -this.angle);
    return pt.x >= -hw && pt.x <= hw && pt.y >= -hh && pt.y <= hh;
  }
  isOnHandle(p) {
    const { p1, p2, p3 } = Rectangle.fromCenter(
      this.center,
      this.width,
      this.height,
      this.angle
    );
    const margin = 10;
    if (dist(p, p1) < margin) return 0;
    if (dist(p, p2) < margin) return 1;
    if (dist(p, p3) < margin) return 2;
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
