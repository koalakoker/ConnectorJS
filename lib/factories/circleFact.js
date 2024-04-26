class CircleFact extends Factory {
  constructor(createf) {
    super(createf);
  }
  mouseDown(p) {
    super.mouseDown(p, new Circle(p, 0));
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { center, radius } = Circle.fromPoints(this.p1, p);
      this.newShape.update(center, radius);
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
