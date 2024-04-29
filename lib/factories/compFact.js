class CompFact extends Factory {
  constructor(pathJSON, createf) {
    super(createf);
    this.pathJSON = pathJSON;
  }
  mouseDown(p) {
    let res;
    fetch(this.pathJSON)
      .then((response) => response.json())
      .then((data) => {
        res = JSON.parse(JSON.stringify(data, null, 2), reviveScene);
        res.center = p;
        res.updateHandles();
        super.mouseDown(p, res);
      })
      .catch((error) => console.error("Error loading JSON file:", error));
  }
  mouseMove(p) {
    if (this.isDown === true) {
      const { center, radius, angle } = Composition.fromPoints(this.p1, p);
      this.newShape.update(center, radius, angle);
    }
  }
  mouseUp() {
    if (this.isDown == true) {
      this.createf(this.newShape);
      this.isDown = false;
      this.newShape = undefined;
    }
  }
}
