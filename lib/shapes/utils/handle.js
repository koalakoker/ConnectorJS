class Handle {
  constructor(p) {
    this.pos = p;
    this.show = false;
    this.highLight = false;
  }
  draw() {
    if (this.show === true) {
      if (this.highLight === true) {
        drawPoint(this.pos, Handle.highLightPen());
      } else {
        console.log(this);
        drawPoint(this.pos, Handle.showPen());
      }
    }
  }
  static showPen() {
    return new Pen("black", "black", 4);
  }
  static highLightPen() {
    return new Pen("red", "red", 4);
  }
}
