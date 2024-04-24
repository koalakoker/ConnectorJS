class PolyFact {
  constructor(createf) {
    this.isDown = false;
    this.createf = createf;
  }
  draw() {
    if (this.newPoly !== undefined) {
      this.newPoly.draw();
    }
  }
  mouseDown(p) {
    if (this.isDown === false) {
      if (!isInCanvas(p)) return;
      this.p1 = p;
      this.p2 = p;
      const center = new Point(
        (this.p1.x + this.p2.x) / 2,
        (this.p1.y + this.p2.y) / 2
      );
      const width = Math.abs(this.p1.x - this.p2.x);
      const height = Math.abs(this.p1.y - this.p2.y);
      this.newPoly = new Polygon(center, width, 5);
      this.isDown = true;
    }
  }
  mouseMove(p) {
    if (this.isDown === true) {
      this.p2 = p;
      const center = new Point(
        (this.p1.x + this.p2.x) / 2,
        (this.p1.y + this.p2.y) / 2
      );
      const width = Math.abs(this.p1.x - this.p2.x);
      const height = Math.abs(this.p1.y - this.p2.y);
      this.newPoly.pos = center;
      this.newPoly.radius = width;
    }
  }
  mouseUp() {
    if (this.isDown == true) {
      this.createf(this.newPoly);
      this.isDown = false;
      this.newPoly = undefined;
    }
  }
}
