class ResFact extends Factory {
  constructor(createf) {
    super(createf);
  }
  mouseDown(p) {
    let res;
    fetch("compositions/resistor.json")
      .then((response) => response.json())
      .then((data) => {
        res = JSON.parse(JSON.stringify(data, null, 2), reviveScene);
        res.center = p;
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
      //if (this.newShape.radius > 2) {
      this.createf(this.newShape);
      //}
      this.isDown = false;
      this.newShape = undefined;
    }
  }
}
