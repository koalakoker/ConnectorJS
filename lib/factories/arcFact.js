class ArcFact extends Factory {
  constructor(createf) {
    super(createf);
  }
  mouseDown(p) {
    super.mouseDown(p, new Arc(p, 0, 0, Math.PI * 2));
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { center, radius, startAngle, stopAngle } = Arc.fromPoints(
        this.p1,
        p
      );
      this.newShape.update(center, radius, startAngle, stopAngle);
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
}
