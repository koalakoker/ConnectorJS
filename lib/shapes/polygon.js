class Polygon extends Shape {
  constructor(center, radius, sides, angleOffset = 0, p = currentpen) {
    super();
    this.type = "polygon";
    this.center = center;
    this.radius = radius;
    this.sides = sides;
    this.angleOffset = angleOffset;
    this.pen = p;
  }
  update(center, radius, sides, angleOffset) {
    this.center = center;
    this.radius = radius;
    //this.sides = sides ? sides : this.sides;
    //this.angleOffset = angleOffset ? angleOffset : this.angleOffset;
  }
  getPoints() {
    let angle = this.angleOffset;
    let rad = this.radius;
    let pL = [];
    for (let i = 0; i < this.sides; i++) {
      let pt = new Point(
        this.center.x + rad * Math.sin(angle),
        this.center.y - rad * Math.cos(angle)
      );
      pL.push(pt);
      angle += (Math.PI * 2) / this.sides;
    }
    return pL;
  }
  draw() {
    drawPoly(this.getPoints(), this.pen);
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
      "angleOffset" in value &&
      "pen" in value
    ) {
      return new Polygon(
        value.center,
        value.radius,
        value.sides,
        value.angleOffset,
        value.pen
      );
    }
  }
}
