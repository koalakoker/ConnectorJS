class Shape {
  constructor() {
    this.type = "shape";
    this.showHandlesState = false;
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
}
