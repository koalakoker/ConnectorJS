class Select extends Factory {
  constructor(updatef) {
    super(updatef);
  }
  deselect() {
    scene.deselectAll();
    this.lastSelectedShape = undefined;
  }
  mouseDown(p, modifier) {
    this.pivotManagement(p);
    if (modifier !== "shift") {
      this.deselect();
    }
    this.select(p, modifier);
    this.onHandle(p, modifier);
  }
  mouseMove(p) {
    if (this.isOnHandle) {
      this.shapeOnHandle.handleMoved(this.indexOnHandle, p);
      return;
    }
    if (this.isOnShape) {
      if (this.lastSelectedShape) {
        p.sub(this.lastSelectedShape.center);
        this.lastSelectedShape.translate(p.x, p.y);
      }
    }
  }
  mouseUp(p) {
    if (this.isOnHandle) {
      this.isOnHandle = false;
      this.createf();
    }
    if (this.isOnShape) {
      this.isOnShape = false;
      this.createf();
    }
  }
  event(e) {
    if (e === "setPivot") {
      if (this.lastSelectedShape) {
        if (this.lastSelectedShape.type === "composition") {
          this.setPivot = true;
          canvas.style.cursor = "crosshair";
        }
      }
    }
    if (e === "escape") {
      this.setPivot = false;
      canvas.style.cursor = "default";
    }
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
          this.lastSelectedShape = undefined;
          this.createf();
        }
      }
    }
  }
  select(p, modifier) {
    let shape = scene.isOnItem(p);
    if (shape === undefined) return;
    if (shape.type === "composition") {
      if (modifier === "shift") {
        shape.showHandles(true);
        this.lastSelectedShape = shape;
        this.isOnShape = true;
      } else {
        shape = shape.isOnItem(p);
        if (shape) {
          shape.showHandles(true);
          this.lastSelectedShape = shape;
          this.isOnShape = true;
        }
      }
    } else {
      shape.showHandles(true);
      this.lastSelectedShape = shape;
      this.isOnShape = true;
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
      this.isOnHandle = true;
    }
  }
  pivotManagement(p) {
    if (this.setPivot === true) {
      const shape = this.lastSelectedShape;
      if (shape.type === "composition") {
        p.sub(shape.center);
        p.add(shape.pivot);
        this.lastSelectedShape.updatePivot(p);
      }
      this.setPivot = false;
      canvas.style.cursor = "default";
      return;
    }
  }
}
