class Shape {
  constructor() {
    this.type = "shape";
    this.hanldeMargin = 10;
    this.handles = [];
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
      if (dist(p, handle.pos) < this.hanldeMargin) return i;
    }
  }
  highLightHandle(handleIndex) {
    this.deHighLighAllHandles();
    this.handles[handleIndex].highLight = true;
  }
  deHighLighAllHandles() {
    this.handles.forEach((handle) => {
      handle.highLight = false;
    });
  }
}
