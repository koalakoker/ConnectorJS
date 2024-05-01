class Select extends Factory {
  constructor(updatef) {
    super(updatef);
  }
  deselect() {
    scene.deselectAll();
    this.selectedShape = [];
  }
  mouseDown(p, modifier) {
    this.pivotManagement(p);
    if (modifier !== "shift") {
      this.deselect();
    }
    this.select(p, modifier);
    this.onHandle(p, modifier);
    this.isOnShape = true;
  }
  mouseMove(p) {
    if (this.isOnHandle) {
      this.shapeOnHandle.handleMoved(this.indexOnHandle, p);
      return;
    }
    if (this.isOnShape) {
      if (this.selectedShape.length > 0) {
        this.selectedShape.forEach((shape) => {
          p.sub(shape.center);
          shape.translate(p.x, p.y);
        });
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
      const l = this.selectedShape.length;
      if (l > 0) {
        const shape = this.selectedShape[l - 1];
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
      const l = this.selectedShape.length;
      if (l > 0) {
        const shape = this.selectedShape[l - 1];
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
      this.selectedShape.forEach((shape) => {
        if (shape.parent) {
          shape.parent.removeShape(shape);
          this.createf();
        }
      });
      this.selectedShape = [];
    }
  }
  select(p, modifier) {
    let shape = scene.isOnItem(p);
    if (shape === undefined) return;
    if (shape.type === "composition") {
      if (modifier === "shift") {
        shape.showHandles(true);
        this.selectedShape.push(shape);
      } else {
        shape = shape.isOnItem(p);
        if (shape) {
          shape.showHandles(true);
          this.selectedShape.push(shape);
        }
      }
    } else {
      shape.showHandles(true);
      this.selectedShape.push(shape);
    }
  }
  onHandle(p, modifier) {
    let selection = {};
    if (modifier === "shift") {
      selection.indexOnHandle = -1;
      for (let i = 0; i < this.selectedShape.length; i++) {
        const shape = this.selectedShape[i];
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
      const l = this.selectedShape.length;
      if (l > 1) {
        const shape = this.selectedShape[l - 1];
        if (shape.type === "composition") {
          p.sub(shape.center);
          p.add(shape.pivot);
          this.selectedShape[l - 1].updatePivot(p);
        }
        this.setPivot = false;
        canvas.style.cursor = "default";
        return;
      }
    }
  }
}
