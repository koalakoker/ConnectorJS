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
  updateFromPoints() {
    const center = new Point(
      (this.p1.x + this.p2.x) / 2,
      (this.p1.y + this.p2.y) / 2
    );
    const radius = Math.abs(this.p1.x - this.p2.x);
    const height = Math.abs(this.p1.y - this.p2.y);
    return { center: center, radius: radius };
  }
  mouseDown(p) {
    if (this.isDown === false) {
      if (!isInCanvas(p)) return;
      this.p1 = p;
      this.p2 = p;
      const { center, radius } = this.updateFromPoints();
      this.newPoly = new Polygon(center, radius, 5);
      this.isDown = true;
    }
  }
  mouseMove(p) {
    if (this.isDown === true) {
      this.p2 = p;
      const { center, radius } = this.updateFromPoints();
      this.newPoly.update(center, radius);
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
    const { center, radius } = this.updateFromPoints();
    this.newPoly.update(center, radius, this.newPoly.sides + deltaY);
  }
}
