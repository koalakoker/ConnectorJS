class Shape {
  constructor() {
    this.type = "shape";
    this.hanldeMargin = 10;
    this.handles = [];
  }
  draw() {}
  updateHandleState() {
    if (this.showHandlesState === false) {
      this.highLightHandleIndex = -1;
    }
  }
  showHandles(newState) {
    this.handles.forEach((handle) => {
      handle.show = newState;
    });
    //this.updateHandle();
  }
  isOnItem(p) {
    return false;
  }
  isOnHandle(p) {
    return false;
  }
  highLightHandle(handleIndex) {
    //this.highLightHandleIndex = handleIndex;
  }
}
