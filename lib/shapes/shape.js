class Shape {
  constructor() {
    this.type = "shape";
    this.showHandlesState = false;
    this.highLightHandleIndex = -1;
  }
  draw() {}
  showHandles(newState) {
    this.showHandlesState = newState;
  }
  toggleHandles() {
    this.showHandlesState = !this.showHandlesState;
  }
  isOnItem(p) {
    return false;
  }
  highLightHandle(handleIndex) {
    this.highLightHandleIndex = handleIndex;
  }
}
