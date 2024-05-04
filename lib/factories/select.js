class Select extends Factory {
  constructor(updatef) {
    super(updatef);
  }
  deselect() {
    scene.deselectAll();
    this.selectedShapes = [];
  }
  mouseDown(p, modifier) {
    this.pivotManagement(p);
    if (modifier !== "shift") {
      this.deselect();
    }
    this.select(p, modifier);
    this.onHandle(p, modifier);
    this.drag = true;
    this.lastTouch = p;
  }
  mouseMove(p) {
    if (this.isOnHandle) {
      this.shapeOnHandle.handleMoved(this.indexOnHandle, p);
      return;
    }
    if (this.drag) {
      if (this.selectedShapes.length > 0) {
        const d = sub(p, this.lastTouch);
        for (let i = 0; i < this.selectedShapes.length; i++) {
          const shape = this.selectedShapes[i];
          shape.translate(d.x, d.y);
        }
        this.lastTouch = p;
      }
    }
  }
  mouseUp(p) {
    if (this.isOnHandle) {
      this.isOnHandle = false;
      this.createf();
    }
    if (this.drag) {
      this.drag = false;
      this.createf();
    }
  }
  event(e) {
    if (e === "setPivot") {
      const l = this.selectedShapes.length;
      if (l > 0) {
        const shape = this.selectedShapes[l - 1];
        if (shape.type === "composition") {
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
      const l = this.selectedShapes.length;
      if (l > 0) {
        const shape = this.selectedShapes[l - 1];
        this.copiedShape = shape;
      }
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
      this.selectedShapes.forEach((shape) => {
        if (shape.parent) {
          shape.parent.removeShape(shape);
          this.createf();
        }
      });
      this.selectedShapes = [];
    }
  }
  select(p, modifier) {
    let shape = scene.isOnItem(p);
    if (shape === undefined) return;
    if (shape.type === "composition") {
      if (modifier === "shift") {
        shape.showHandles(true);
        pushUnique(this.selectedShapes, shape);
      } else {
        shape = shape.isOnItem(p);
        if (shape) {
          shape.showHandles(true);
          pushUnique(this.selectedShapes, shape);
        }
      }
    } else {
      shape.showHandles(true);
      pushUnique(this.selectedShapes, shape);
      updateProperties(shape.type);
    }
  }
  onHandle(p, modifier) {
    let selection = {};
    if (modifier === "shift") {
      selection.indexOnHandle = -1;
      for (let i = 0; i < this.selectedShapes.length; i++) {
        const shape = this.selectedShapes[i];
        selection = shape.isOnHandle(p, true);
        if (selection.indexOnHandle !== -1) break;
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
      const l = this.selectedShapes.length;
      if (l > 1) {
        const shape = this.selectedShapes[l - 1];
        if (shape.type === "composition") {
          p.sub(shape.center);
          p.add(shape.pivot);
          this.selectedShapes[l - 1].updatePivot(p);
        }
        this.setPivot = false;
        canvas.style.cursor = "default";
        return;
      }
    }
  }
}
