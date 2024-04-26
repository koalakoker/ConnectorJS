class Shape {
  constructor() {
    this.type = "shape";
    this.showHandlesState = false;
    this.highLightHandleIndex = -1;
    this.hanldeMargin = 10;
  }
  draw() {}
  updateHandle() {
    if (this.showHandlesState === false) {
      this.highLightHandleIndex = -1;
    }
  }
  showHandles(newState) {
    this.showHandlesState = newState;
    this.updateHandle();
  }
  toggleHandles() {
    this.showHandlesState = !this.showHandlesState;
    this.updateHandle();
  }
  isOnItem(p) {
    return false;
  }
  isOnHandle(p) {
    return false;
  }
  highLightHandle(handleIndex) {
    this.highLightHandleIndex = handleIndex;
  }
}
