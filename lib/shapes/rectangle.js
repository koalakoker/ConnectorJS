class Rectangle extends Shape {
  constructor(center, width, height, angle = 0, p = currentpen) {
    super();
    this.type = "rectangle";
    this.center = center;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.pen = p;
    this.createHandles();
  }
  static fromPoints(p1, p2) {
    const center = midPoint(p1, p2);
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    return { center: center, width: width, height: height };
  }
  handlePoints() {
    const hw = this.width / 2;
    const hh = this.height / 2;
    const hL = [];
    let pt;
    pt = new Point(-hw, -hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    hL.push(pt);
    pt = new Point(hw, hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    hL.push(pt);
    pt = new Point(hw, 0);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    hL.push(pt);
    return hL;
  }
  update(center, width, height) {
    this.center = center;
    this.width = width;
    this.height = height;
    this.updateHandles();
  }
  updateAngle(angle) {
    this.angle = angle;
    this.updateHandles();
  }
  getPoints(parentCenter, parentPivot) {
    const hw = this.width / 2;
    const hh = this.height / 2;
    let pt;
    let pL = [];

    pt = new Point(-hw, -hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pt = translate(pt, parentCenter);
    pt = translate(pt, parentPivot.neg());
    pL.push(pt);

    pt = new Point(hw, -hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pt = translate(pt, parentCenter);
    pt = translate(pt, parentPivot.neg());
    pL.push(pt);

    pt = new Point(hw, hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pt = translate(pt, parentCenter);
    pt = translate(pt, parentPivot.neg());
    pL.push(pt);

    pt = new Point(-hw, hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pt = translate(pt, parentCenter);
    pt = translate(pt, parentPivot.neg());
    pL.push(pt);
    return pL;
  }
  draw(parentCenter = new Point(), parentPivot = new Point()) {
    drawPoly(this.getPoints(parentCenter, parentPivot), this.pen);
    super.draw();
  }
  isOnItem(p) {
    const hw = this.width / 2;
    const hh = this.height / 2;
    let pt = translate(p, new Point(-this.center.x, -this.center.y));
    pt = rotate(pt, -this.angle);
    return pt.x >= -hw && pt.x <= hw && pt.y >= -hh && pt.y <= hh;
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
