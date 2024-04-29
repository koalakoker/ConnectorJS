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
  computeFinalPoints(inPtL) {
    // This should compute the reuired points (in this case start and end)
    // Accordign to the value set in parent.center and parent.pivot
    // pt = translate(pt, parentCenter);
    // pt = translate(pt, parentPivot.neg());
    // Results of this computation will be dispatched to draw(), isOnItem(), handlePoints() methods
    // Data to be computed is passed as list
    // Computed points is returned as list
    const outPtL = [];
    if (this.parent === null) return inPtL;
    for (let i = 0; i < inPtL.length; i++) {
      let pt = inPtL[i];
      pt = translate(pt, this.parent.center);
      pt = translate(pt, this.parent.pivot.neg());
      outPtL.push(pt);
    }
    return outPtL;
  }
  handlePoints() {
    const pL = this.computeFinalPoints([this.start, this.end]);
    const hL = [];
    let pt;
    pt = new Point(pL[0].x, pL[0].y);
    hL.push(pt);
    pt = new Point(pL[1].x, pL[1].y);
    hL.push(pt);
    return hL;
  }
  update(start, end) {
    this.start = start;
    this.end = end;
    this.updateHandles();
  }
  draw() {
    const pL = this.computeFinalPoints([this.start, this.end]);
    drawLine(pL[0], pL[1], this.pen);
    super.draw();
  }
  isOnItem(p) {
    const pL = this.computeFinalPoints([this.start, this.end]);
    const l = dist(pL[0], pL[1]);
    const center = midPoint(pL[0], pL[1]);
    const angle = direction(pL[1], pL[0]);
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
