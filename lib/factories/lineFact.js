class LineFact extends Factory {
  constructor(createf) {
    super();
    this.isDown = false;
    this.createf = createf;
  }
  draw() {
    if (this.newShape !== undefined) {
      this.newShape.draw();
    }
  }
  mouseDown(p) {
    if (this.isDown === false) {
      if (!isInCanvas(p)) return;
      this.p1 = p;
      this.newShape = new Line(p, p);
      this.isDown = true;
    }
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
