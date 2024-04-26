class Line extends Shape {
  constructor(start, end, p = currentpen) {
    super();
    this.type = "line";
    this.start = start;
    this.end = end;
    this.pen = p;
    this.createHandles();
  }
  static fromPoints(p1, p2) {
    const start = new Point(p1.x, p1.y);
    const end = new Point(p2.x, p2.y);
    return { start: start, end: end };
  }
  handlePoints() {
    const hL = [];
    let pt;
    pt = new Point(this.start.x, this.start.y);
    hL.push(pt);
    pt = new Point(this.end.x, this.end.y);
    hL.push(pt);
    return hL;
  }
  update(start, end) {
    this.start = start;
    this.end = end;
    this.updateHandles();
  }
  draw() {
    drawLine(this.start, this.end, this.pen);
    super.draw();
  }
  isOnItem(p) {
    const l = dist(this.start, this.end);
    const center = midPoint(this.start, this.end);
    const angle = direction(this.end, this.start);
    const hw = l / 2 + this.shapeMargin;
    const hh = this.shapeMargin;
    let pt = translate(p, new Point(-center.x, -center.y));
    pt = rotate(pt, -angle);
    return pt.x >= -hw && pt.x <= hw && pt.y >= -hh && pt.y <= hh;
  }
  static revive(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "type" in value &&
      value.type === "line" &&
      "start" in value &&
      "end" in value &&
      "pen" in value
    ) {
      return new Line(value.start, value.end, value.pen);
    }
  }
}
