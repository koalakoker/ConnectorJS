class Polygon extends Shape {
  constructor(pos, radius, sides, angleOffset = 0, p = currentpen) {
    super();
    this.type = "polygon";
    this.pos = pos;
    this.radius = radius;
    this.sides = sides;
    this.angleOffset = angleOffset;
    this.pen = p;
  }
  getPoints() {
    let angle = this.angleOffset;
    let rad = this.radius;
    let pL = [];
    for (let i = 0; i < this.sides; i++) {
      let pt = new Point(
        this.pos.x + rad * Math.sin(angle),
        this.pos.y - rad * Math.cos(angle)
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
      "pos" in value &&
      "radius" in value &&
      "sides" in value &&
      "angleOffset" in value &&
      "pen" in value
    ) {
      return new Polygon(
        value.pos,
        value.radius,
        value.sides,
        value.angleOffset,
        value.pen
      );
    }
  }
}
