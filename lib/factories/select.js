class Select extends Factory {
  constructor(updatef) {
    super(updatef);
  }
  deselect() {
    scene.deselectAll();
    this.lastSelectedShape = undefined;
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
  onHandle(p, modifier) {
    let selection;
    if (modifier === "shift") {
      if (this.lastSelectedShape) {
        selection = this.lastSelectedShape.isOnHandle(p, true);
      }
    } else {
      selection = scene.isOnHandle(p);
    }
    if (selection.indexOnHandle !== -1) {
      selection.shapeOnHandle.showHandles(true);
      selection.shapeOnHandle.highLightHandle(selection.indexOnHandle);
      this.shapeOnHandle = selection.shapeOnHandle;
      this.indexOnHandle = selection.indexOnHandle;
      this.isDown = true;
    }
  }
  mouseDown(p, modifier) {
    if (modifier !== "shift") {
      this.deselect();
    }
    this.select(p, modifier);
    this.onHandle(p, modifier);
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
        obj.translate(10, 10);
        this.copiedShape.showHandles(false);
        obj.showHandles(true);
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
