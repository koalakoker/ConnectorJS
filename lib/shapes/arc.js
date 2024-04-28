class Arc extends Shape {
  constructor(center, radius, startAngle, stopAngle, p = currentpen) {
    super();
    this.type = "arc";
    this.center = center;
    this.radius = radius;
    this.startAngle = startAngle;
    this.stopAngle = stopAngle;
    this.pen = p;
    this.createHandles();
  }
  static fromPoints(p1, p2) {
    const center = new Point(p1.x, p1.y);
    const radius = dist(p1, p2);
    const startAngle = 0;
    const stopAngle = direction(p1, p2);
    return {
      center: center,
      radius: radius,
      startAngle: startAngle,
      stopAngle: stopAngle,
    };
  }
  handlePoints() {
    const hL = [];
    let pt;
    pt = new Point(this.center.x, this.center.y);
    hL.push(pt);
    pt.add(
      new Point(
        this.radius * Math.cos(this.startAngle),
        this.radius * Math.sin(this.startAngle)
      )
    );
    hL.push(pt);
    pt = new Point(this.center.x, this.center.y);
    pt.add(
      new Point(
        this.radius * Math.cos(this.stopAngle),
        this.radius * Math.sin(this.stopAngle)
      )
    );
    hL.push(pt);
    return hL;
  }
  update(center, radius, startAngle, stopAngle) {
    this.center = center;
    this.radius = radius;
    this.startAngle = startAngle ? startAngle : this.startAngle;
    this.stopAngle = stopAngle ? stopAngle : this.stopAngle;
    this.updateHandles();
  }
  updateStopAngle(angle) {
    this.stopAngle = angle;
  }
  draw(parentCenter = new Point(), parentPivot = new Point()) {
    const center = new Point(this.center.x, this.center.y);
    center.add(parentCenter);
    center.add(parentPivot.neg());
    drawArc(center, this.radius, this.startAngle, this.stopAngle, this.pen);
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
      value.type === "arc" &&
      "center" in value &&
      "radius" in value &&
      "startAngle" in value &&
      "stopAngle" in value &&
      "pen" in value
    ) {
      return new Arc(
        value.center,
        value.radius,
        value.startAngle,
        value.stopAngle,
        value.pen
      );
    }
  }
}
