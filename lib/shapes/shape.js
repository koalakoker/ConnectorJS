class Shape {
  constructor() {
    this.type = "shape";
    this.hanldeMargin = 10;
    this.shapeMargin = 10;
    this.handles = [];
    this.parent = null;
  }
  draw() {
    this.handles.forEach((handle) => {
      handle.draw();
    });
  }
  createHandles() {
    const hL = this.handlePoints();
    hL.forEach((pt) => {
      this.handles.push(new Handle(pt));
    });
  }
  updateHandles() {
    const hL = this.handlePoints();
    hL.forEach((pt, i) => {
      this.handles[i].pos = pt;
    });
  }
  showHandles(newState) {
    this.handles.forEach((handle) => {
      handle.show = newState;
    });
    if (newState === false) {
      this.deHighLighAllHandles();
    }
  }
  isOnItem(p) {
    return false;
  }
  isOnHandle(p) {
    for (let i = 0; i < this.handles.length; i++) {
      const handle = this.handles[i];
      if (dist(p, handle.pos) < this.hanldeMargin)
        return { shapeOnHandle: this, indexOnHandle: i };
    }
    return { shapeOnHandle: null, indexOnHandle: -1 };
  }
  highLightHandle(handleIndex) {
    this.deHighLighAllHandles();
    console.log(handleIndex);
    this.handles[handleIndex].highLight = true;
  }
  deHighLighAllHandles() {
    this.handles.forEach((handle) => {
      handle.highLight = false;
    });
  }
  static serialize(key) {
    if (key === "hanldeMargin") return false;
    if (key === "shapeMargin") return false;
    if (key === "handles") return false;
    if (key === "parent") return false;
    return true;
  }
}
