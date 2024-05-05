class Shape {
  constructor() {
    this.type = "shape";
    this.hanldeMargin = 10;
    this.shapeMargin = 10;
    this.handles = [];
    this.parent = null;
    this.propertiesContainer = document.getElementById("propertiesContainer");
  }
  computeFinalPoints(inPtL) {
    // This should compute the required points (in this case start and end)
    // Accordign to the value set in parent.center and parent.pivot
    // pt = translate(pt, parentCenter);
    // pt = translate(pt, parentPivot.neg());
    // Results of this computation will be dispatched to draw(), isOnItem(), handlePoints() methods
    // Data to be computed is passed as list
    // Computed points is returned as list
    const outPtL = [];
    if (this.parent === null) return inPtL;
    for (let i = 0; i < inPtL.length; i++) {
      let pt = inPtL[i];
      pt = translate(pt, this.parent.center);
      pt = translate(pt, this.parent.pivot.neg());
      outPtL.push(pt);
    }
    return outPtL;
  }
  draw() {
    this.handles.forEach((handle) => {
      handle.draw();
    });
  }
  createHandles() {
    const hL = this.handlePoints();
    hL.forEach((pt) => {
      this.handles.push(new Handle(pt));
    });
  }
  updateHandles() {
    const hL = this.handlePoints();
    hL.forEach((pt, i) => {
      this.handles[i].pos = pt;
    });
    this.updateProperties();
  }
  showHandles(newState) {
    this.handles.forEach((handle) => {
      handle.show = newState;
    });
    if (newState === false) {
      this.deHighLighAllHandles();
    }
  }
  isOnItem(p) {
    return false;
  }
  isOnHandle(p) {
    for (let i = 0; i < this.handles.length; i++) {
      const handle = this.handles[i];
      if (dist(p, handle.pos) < this.hanldeMargin)
        return { shapeOnHandle: this, indexOnHandle: i };
    }
    return { shapeOnHandle: null, indexOnHandle: -1 };
  }
  highLightHandle(handleIndex) {
    this.deHighLighAllHandles();
    this.handles[handleIndex].highLight = true;
  }
  deHighLighAllHandles() {
    this.handles.forEach((handle) => {
      handle.highLight = false;
    });
  }
  translate(x, y) {
    if (this.center) {
      this.center.x += x;
      this.center.y += y;
      this.updateHandles();
    } else {
      console.log("center is missing");
    }
  }
  static serialize(key) {
    const exludeKeys = [
      "hanldeMargin",
      "shapeMargin",
      "handles",
      "parent",
      "propertiesContainer",
      "propertyHTML",
    ];
    if (exludeKeys.includes(key)) {
      return false;
    }
    return true;
  }
  updateProperties(tokenUpdate) {
    if (this.propertiesContainer === undefined) return;
    this.propertiesContainer.innerHTML = "";
    if (this.propertyHTML !== undefined) {
      let html = this.propertyHTML;
      if (tokenUpdate) {
        html = tokenUpdate(html);
      }
      this.propertiesContainer.innerHTML = html;
      this.addInputListener();
    }
  }
  addInputListener() {
    this.propertiesContainer
      .querySelectorAll('input[type="number"]')
      .forEach((input) => {
        console.log(input);
        input.addEventListener("change", (e) => {
          console.log(e);
          this.valueChanged(e.target.id, parseInt(e.target.value));
        });
      });
  }
  valueChanged(id, value) {
    try {
      updateNestedProperty(this, id, value);
    } catch (error) {
      console.log(error);
    }
    this.updateHandles();
    factory.event("update");
  }
}
