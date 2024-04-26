class RectFact extends Factory {
  constructor(createf) {
    super(createf);
  }
  mouseDown(p) {
    super.mouseDown(p, new Rectangle(p, 0, 0));
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { center, width, height } = Rectangle.fromPoints(this.p1, p);
      this.newShape.update(center, width, height);
    }
  }
  mouseUp() {
    if (this.isDown == true) {
      if (this.newShape.width > 0 && this.newShape.height > 0) {
        this.createf(this.newShape);
      }
      this.isDown = false;
      this.newShape = undefined;
    }
  }
  wheel(deltaY) {
    if (this.newShape !== undefined) {
      this.newShape.updateAngle(this.newShape.angle + gradToRad(deltaY * 10));
    }
  }
}
