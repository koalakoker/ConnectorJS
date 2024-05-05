class InputManager {
  constructor() {}
  addInputListener(shape) {
    this.shape = shape;
    shape.propertiesContainer
      .querySelectorAll('input[type="number"]')
      .forEach((input) => {
        input.addEventListener("change", (e) => {
          this.valueChanged(e.target.id, parseInt(e.target.value));
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
}
