class Select extends Factory {
  constructor(updatef) {
    super(updatef);
  }
  mouseDown(p, modifier) {
    scene.deselectAll();

    this.select(p, modifier);

    const { shapeOnHandle, indexOnHandle } = scene.isOnHandle(p);
    if (indexOnHandle !== -1) {
      shapeOnHandle.showHandles(true);
      shapeOnHandle.highLightHandle(indexOnHandle);
      this.shapeOnHandle = shapeOnHandle;
      this.indexOnHandle = indexOnHandle;
      this.isDown = true;
    }
  }
  mouseMove(p) {
    if (this.isDown) {
      //console.log("Moved", p, this.shapeOnHandle, this.indexOnHandle);
      this.shapeOnHandle.handleMoved(this.indexOnHandle, p);
    }
  }
  mouseUp(p) {
    if (this.isDown) {
      this.isDown = false;
      this.createf();
    }
  }
  select(p, modifier) {
    let shape = scene.isOnItem(p);
    if (shape === undefined) return;
    if (shape.type === "composition") {
      if (modifier === "shift") {
        shape.showHandles(true);
        this.lastSelectedShape = shape;
      } else {
        shape = shape.isOnItem(p);
        if (shape) {
          shape.showHandles(true);
          this.lastSelectedShape = shape;
        }
      }
    } else {
      shape.showHandles(true);
      this.lastSelectedShape = shape;
    }
  }
  event(e) {
    if (e === "copy") {
      console.log("Copy");
    }
    if (e === "paste") {
      console.log("Paste");
    }
    if (e === "canc") {
      this.lastSelectedShape.parent.removeShape(this.lastSelectedShape);
      this.createf();
    }
  }
}
