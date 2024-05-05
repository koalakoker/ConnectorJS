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
    getComponent(`properties/${this.type}.html`).then((html) => {
      this.propertyHTML = html;
    });
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
      this.angle = direction(hP[0], p);
    }
    this.updateHandles();
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
        value.angle,
        value.pen
      );
    }
  }
  updateProperties() {
    super.updateProperties((html) => {
      html = replaceTokens(html, 1, this.center.x);
      html = replaceTokens(html, 2, this.center.y);
      html = replaceTokens(html, 3, this.radius);
      html = replaceTokens(html, 4, this.sides);
      html = replaceTokens(html, 5, Math.round(radToGrad(this.angle)));
      return html;
    });
  }
  valueChanged(id, value) {
    if (id === "angle") {
      super.valueChanged(id, gradToRad(value));
    } else {
      super.valueChanged(id, value);
    }
  }
}
