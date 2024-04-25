class PolyFact extends Factory {
  constructor(createf) {
    super();
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
      this.newPoly = new Polygon(p, 0, 5);
      this.isDown = true;
    }
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { center, radius, angle } = Polygon.fromPoints(this.p1, p);
      this.newPoly.update(center, radius, angle);
    }
  }
  mouseUp() {
    if (this.isDown == true) {
      this.createf(this.newPoly);
      this.isDown = false;
      this.newPoly = undefined;
    }
  }
  wheel(deltaY) {
    this.newPoly.updateSides(this.newPoly.sides + deltaY);
  }
}
