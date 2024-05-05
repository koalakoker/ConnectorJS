class Composition extends Shape {
  constructor(pivot = new Point(0, 0), center = new Point(0, 0)) {
    super();
    this.type = "composition";
    this.shapes = [];
    this.pivot = pivot;
    this.center = center;
    this.createHandles();
    getComponent(`properties/${this.type}.html`).then((html) => {
      this.propertyHTML = html;
    });
    getComponent(`properties/shape.html`).then((html) => {
      this.shapeHTML = html;
    });
  }
  addShape(s) {
    s.parent = this;
    s.updateHandles();
    this.shapes.push(s);
  }
  removeShape(s) {
    const i = this.shapes.findIndex((value) => {
      return value === s;
    });
    if (i >= 0 && i < this.shapes.length) {
      this.shapes.splice(i, 1);
    }
  }
  static fromPoints(p1, p2) {
    return { center: p2 };
  }
  handlePoints() {
    const hL = [];
    let pt;
    hL.push(this.center);
    return hL;
  }
  handleMoved(index, p) {
    const hP = this.handlePoints();
    const dX = p.x - hP[index].x;
    const dY = p.y - hP[index].y;
    if (index === 0) {
      this.center.x += dX;
      this.center.y += dY;
    }
    this.updateHandles();
  }
  update(center) {
    this.center = center;
    this.updateHandles();
  }
  updatePivot(pivot) {
    this.pivot = pivot;
    this.updateHandles();
  }
  updateHandles() {
    this.shapes.forEach((shape) => {
      shape.updateHandles();
    });
    super.updateHandles();
  }
  isOnItem(p) {
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      if (shape.isOnItem(p)) return shape;
    }
  }
  isOnHandle(p, proper = false) {
    if (proper) {
      return super.isOnHandle(p);
    }
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      const { shapeOnHandle, indexOnHandle } = shape.isOnHandle(p);
      if (indexOnHandle !== undefined && indexOnHandle !== -1)
        return { shapeOnHandle: shapeOnHandle, indexOnHandle: indexOnHandle };
    }
    return { shapeOnHandle: null, indexOnHandle: -1 };
  }
  deselectAll() {
    this.shapes.forEach((shape) => {
      shape.showHandles(false);
      if (shape.type === "composition") {
        shape.deselectAll();
      }
    });
  }
  draw() {
    this.shapes.forEach((shape) => {
      shape.draw();
    });
    super.draw();
  }
  reset() {
    this.shapes = [];
  }
  static revive(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      "shapes" in value &&
      "center" in value &&
      "pivot" in value &&
      Array.isArray(value.shapes)
    ) {
      const nC = new Composition(value.pivot, value.center);
      value.shapes.map((shape) => nC.addShape(shape));
      return nC;
    }
  }
  static serialize(key) {
    if (key === "shapeHTML") return false;
    return true;
  }
  updateProperties() {
    super.updateProperties((html) => {
      html = replaceTokens(html, 1, this.center.x);
      html = replaceTokens(html, 2, this.center.y);
      html = replaceTokens(html, 3, this.pivot.x);
      html = replaceTokens(html, 4, this.pivot.y);
      return html;
    });
    this.shapes.forEach((shape, index) => {
      let html = this.shapeHTML;
      if (html !== undefined) {
        html = replaceTokens(html, 1, shape.type);
        html = replaceTokens(html, 2, index);
        this.propertiesContainer.innerHTML += html;
      }
    });
    inputManager.addInputListener(this);
    this.propertiesContainer.querySelectorAll(".itemElem").forEach((div) => {
      div.addEventListener("click", (e) => {
        this.clickOnShape(e.target);
      });
    });
  }
  clickOnShape(e) {
    const parts = e.id.split(".");
    const action = parts[0];
    const index = parts[1];
    switch (action) {
      case "select":
        if (factory !== selectFact) {
          setMode("select");
        }
        factory.selectShape(this.shapes[index]);
        break;
      case "delete":
        this.removeShape(this.shapes[index]);
        this.updateProperties();
        factory.createf();
        break;
      case "moveup":
        console.log("moveup index", index);
        break;
      case "movedown":
        console.log("movedown index", index);
        break;
      default:
        break;
    }
  }
}
