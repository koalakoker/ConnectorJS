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
    let hL = [];
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
    hL = this.computeFinalPoints(hL);
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
    const pL = this.computeFinalPoints(this.getPoints());
    drawPoly(pL, this.pen);
    super.draw();
  }
  isOnItem(p) {
    const pL = this.computeFinalPoints([this.center]);
    const hw = this.width / 2;
    const hh = this.height / 2;
    let pt = translate(p, new Point(-pL[0].x, -pL[0].y));
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
