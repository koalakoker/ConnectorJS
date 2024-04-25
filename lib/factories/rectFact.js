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
  updateFromPoints() {
    const center = new Point(
      (this.p1.x + this.p2.x) / 2,
      (this.p1.y + this.p2.y) / 2
    );
    const width = Math.abs(this.p1.x - this.p2.x);
    const height = Math.abs(this.p1.y - this.p2.y);
    return { center: center, width: width, height: height };
  }
  mouseDown(p) {
    if (this.isDown === false) {
      if (!isInCanvas(p)) return;
      this.p1 = p;
      this.p2 = p;
      const { center, width, height } = this.updateFromPoints();
      this.newRect = new Rectangle(center, width, height);
      this.isDown = true;
    }
  }
  mouseMove(p) {
    if (this.isDown === true) {
      this.p2 = p;
      const { center, width, height } = this.updateFromPoints();
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
}
