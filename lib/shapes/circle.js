class Circle extends Shape {
  constructor(center, radius, p = currentpen) {
    super();
    this.type = "circle";
    this.center = center;
    this.radius = radius;
    this.pen = p;
    this.createHandles();
  }
  static fromPoints(p1, p2) {
    const center = new Point(p1.x, p1.y);
    const radius = dist(p1, p2);
    return { center: center, radius: radius };
  }
  handlePoints() {
    let hL = [];
    let pt;
    pt = new Point(this.center.x, this.center.y);
    hL.push(pt);
    pt = new Point(this.center.x + this.radius, this.center.y);
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
      this.radius = dist(p, hP[0]);
    }
    this.updateHandles();
  }
  update(center, radius) {
    this.center = center;
    this.radius = radius;
    this.updateHandles();
  }
  draw() {
    const pL = this.computeFinalPoints([this.center]);
    drawCircle(pL[0], this.radius, this.pen);
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
      value.type === "circle" &&
      "center" in value &&
      "radius" in value &&
      "pen" in value
    ) {
      return new Circle(value.center, value.radius, value.pen);
    }
  }
  updateProperties() {
    super.updateProperties((html) => {
      html = replaceTokens(html, 1, this.center.x);
      html = replaceTokens(html, 2, this.center.y);
      html = replaceTokens(html, 3, this.radius);
      return html;
    });
  }
}
