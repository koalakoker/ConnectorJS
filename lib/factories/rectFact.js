class RectFact extends Factory {
  constructor(createf) {
    super();
    this.isDown = false;
    this.createf = createf;
  }
  draw() {
    if (this.newRect !== undefined) {
      this.newRect.draw();
    }
  }
  mouseDown(p) {
    if (this.isDown === false) {
      if (!isInCanvas(p)) return;
      this.p1 = p;
      this.newRect = new Rectangle(p, 0, 0);
      this.isDown = true;
    }
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { center, width, height } = Rectangle.fromPoints(this.p1, p);
      this.newRect.update(center, width, height);
    }
  }
  mouseUp() {
    if (this.isDown == true) {
      this.createf(this.newRect);
      this.isDown = false;
      this.newRect = undefined;
    }
  }
  wheel(deltaY) {
    if (this.newRect !== undefined) {
      this.newRect.updateAngle(this.newRect.angle + gradToRad(deltaY * 10));
    }
  }
}
