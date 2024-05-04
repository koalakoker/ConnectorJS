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
    let hL = [];
    let pt;
    pt = new Point(this.center.x, this.center.y);
    hL.push(pt);
    pt = new Point(this.center.x, this.center.y);
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
    hL = this.computeFinalPoints(hL);
    return hL;
  }
  handleMoved(index, p) {
    const hP = this.handlePoints();
    const dX = p.x - hP[index].x;
    const dY = p.y - hP[index].y;
    if (index === 0) {
      this.center.x += dX;
      this.center.y += dY;
    }
    if (index === 1) {
      this.radius = dist(hP[0], p);
      this.startAngle = direction(hP[0], p);
    }
    if (index === 2) {
      this.radius = dist(hP[0], p);
      this.stopAngle = direction(hP[0], p);
    }
    this.updateHandles();
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
  draw() {
    const pL = this.computeFinalPoints([this.center]);
    drawArc(pL[0], this.radius, this.startAngle, this.stopAngle, this.pen);
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
  updateProperties() {
    super.updateProperties((html) => {
      html = replaceTokens(html, 1, this.center.x);
      html = replaceTokens(html, 2, this.center.y);
      html = replaceTokens(html, 3, this.radius);
      html = replaceTokens(html, 4, Math.round(radToGrad(this.startAngle)));
      html = replaceTokens(html, 5, Math.round(radToGrad(this.stopAngle)));
      return html;
    });
  }
  valueChanged(id, value) {
    if (id === "startAngle" || id === "stopAngle") {
      super.valueChanged(id, gradToRad(value));
    } else {
      super.valueChanged(id, value);
    }
  }
}
