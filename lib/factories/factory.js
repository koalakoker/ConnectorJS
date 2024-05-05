class Factory {
  constructor(createf) {
    this.isDown = false;
    this.createf = createf;
    this.newShape = undefined;
  }
  draw() {
    if (this.newShape !== undefined) {
      this.newShape.draw();
    }
  }
  updateFromPoints() {}
  mouseDown(p, obj) {
    if (this.isDown === false) {
      this.p1 = p;
      this.newShape = obj;
      this.isDown = true;
    }
  }
  mouseMove() {}
  mouseUp() {}
  wheel() {}
  event(e) {
    if (e === "update") {
      this.createf();
    }
  }
}
