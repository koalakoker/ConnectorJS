class Polygon {
  constructor(pos, radius, sides, angleOffset = 0) {
    this.pos = pos;
    this.radius = radius;
    this.sides = sides;
    this.angleOffset = angleOffset;
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
      angle += (Math.PI * 2) / 5;
    }
    return pL;
  }
  draw() {
    drawPoly(this.getPoints());
  }
}
