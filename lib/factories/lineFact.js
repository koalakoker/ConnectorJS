class LineFact extends Factory {
  constructor(createf) {
    super(createf);
  }
  mouseDown(p) {
    super.mouseDown(p, new Line(p, p));
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { start, end } = Line.fromPoints(this.p1, p);
      this.newShape.update(start, end);
    }
  }
  mouseUp() {
    if (this.isDown == true) {
      if (dist(this.newShape.start, this.newShape.end) > 0) {
        this.createf(this.newShape);
      }
      this.isDown = false;
      this.newShape = undefined;
    }
  }
}
