class Select extends Factory {
  constructor(updatef) {
    super(updatef);
  }
  deselect() {
    scene.deselectAll();
    this.lastSelectedShape = undefined;
  }
  mouseDown(p, modifier) {
    this.deselect();

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
    if (e === "deselect") {
      this.deselect();
    }
    if (e === "copy") {
      this.copiedShape = this.lastSelectedShape;
    }
    if (e === "paste") {
      if (this.copiedShape) {
        const json = JSON.stringify(this.copiedShape, serialize);
        const obj = JSON.parse(json, reviveScene);
        scene.addShape(obj);
        this.createf();
      }
    }
    if (e === "canc") {
      if (this.lastSelectedShape) {
        if (this.lastSelectedShape.parent) {
          this.lastSelectedShape.parent.removeShape(this.lastSelectedShape);
          this.createf();
        }
      }
    }
  }
}
