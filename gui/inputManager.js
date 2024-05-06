class InputManager {
  constructor() {
    this.minMouseDeltaPixel = 10;
  }
  addInputListener(shape) {
    this.shape = shape;
    shape.propertiesContainer
      .querySelectorAll('input[type="number"]')
      .forEach((input) => {
        input.addEventListener("change", (e) => {
          this.valueChanged(e.target.id, parseInt(e.target.value));
        });
        input.addEventListener("mousedown", (e) => {
          this.mouseDown(e.target);
        });
        document.addEventListener("mousemove", (e) => {
          this.mouseMove();
        });
        document.addEventListener("mouseup", (e) => {
          this.mouseUp();
        });
      });
  }
  valueChanged(id, value) {
    let updateFunction = true;
    if (this.shape.valueChanged) {
      updateFunction = this.shape.valueChanged(id, value);
    }
    InputManager.updateNested(this.shape, id, value, updateFunction);
    this.shape.updateHandles();
    factory.event("update");
  }
  static updateNested(shape, id, value, updateFunction) {
    if (updateFunction === false) return;
    try {
      if (updateFunction === true) {
        updateNestedProperty(shape, id, value);
      } else if (typeof updateFunction === "function") {
        updateNestedProperty(shape, id, updateFunction(value));
      }
    } catch (error) {
      console.log(error);
    }
  }
  mouseDown(e) {
    this.mouseIsDown = true;
    this.lastY = mouse.y;
    this.targetId = e.id;
    this.tagetValue = parseInt(e.value);
  }
  mouseMove() {
    if (this.mouseIsDown === true) {
      const dY = Math.sign(mouse.y - this.lastY) * this.minMouseDeltaPixel;
      if (dY !== 0) {
        const value = parseInt(this.tagetValue);
        this.valueChanged(this.targetId, value + dY);
        this.lastY = mouse.y;
        this.tagetValue = value + dY;
      }
    }
  }
  mouseUp() {
    this.mouseIsDown = false;
  }
}
