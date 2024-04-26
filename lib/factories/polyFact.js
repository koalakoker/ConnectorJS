class PolyFact extends Factory {
  constructor(createf) {
    super(createf);
  }
  mouseDown(p) {
    super.mouseDown(p, new Polygon(p, 0, 5));
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { center, radius, angle } = Polygon.fromPoints(this.p1, p);
      this.newShape.update(center, radius, angle);
    }
  }
  mouseUp() {
    if (this.isDown == true) {
      if (this.newShape.radius > 2) {
        this.createf(this.newShape);
      }
      this.isDown = false;
      this.newShape = undefined;
    }
  }
  wheel(deltaY) {
    if (this.newShape !== undefined) {
      this.newShape.updateSides(this.newShape.sides + deltaY);
    }
  }
}
