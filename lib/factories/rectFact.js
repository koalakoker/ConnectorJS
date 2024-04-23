class RectFact {
  constructor(createf) {
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
      this.p2 = p;
      const center = new Point(
        (this.p1.x + this.p2.x) / 2,
        (this.p1.y + this.p2.y) / 2
      );
      const width = Math.abs(this.p1.x - this.p2.x);
      const height = Math.abs(this.p1.y - this.p2.y);
      this.newRect = new Rectangle(center, width, height);
      this.isDown = true;
    }
  }
  mouseMove(p) {
    if (this.isDown === true) {
      this.p2 = p;
      const center = new Point(
        (this.p1.x + this.p2.x) / 2,
        (this.p1.y + this.p2.y) / 2
      );
      const width = Math.abs(this.p1.x - this.p2.x);
      const height = Math.abs(this.p1.y - this.p2.y);
      this.newRect.center = center;
      this.newRect.width = width;
      this.newRect.height = height;
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
