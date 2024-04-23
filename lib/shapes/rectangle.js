class Rectangle extends Shape {
  constructor(center, width, height, angle = 0, p = currentpen) {
    super();
    this.center = center;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.pen = p;
  }
  getPoints() {
    const hw = this.width / 2;
    const hh = this.height / 2;
    let pt;
    let pL = [];

    pt = new Point(-hw, -hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);

    pt = new Point(hw, -hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);

    pt = new Point(hw, hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);

    pt = new Point(-hw, hh);
    pt = rotate(pt, this.angle);
    pt = translate(pt, this.center);
    pL.push(pt);
    return pL;
  }
  draw() {
    drawPoly(this.getPoints(), this.pen);
  }

  static createFormJSON(string) {
    return JSON.parse(jsonString, (key, value) => {
      if (
        key === "pen" &&
        typeof value === "object" &&
        value !== null &&
        "strokeColor" in value &&
        "fillColor" in value &&
        "width" in value &&
        "dash" in value
      ) {
        return new Pen(
          value.strokeColor,
          value.fillColor,
          value.width,
          value.dash
        );
      }
      if (
        typeof value === "object" &&
        value !== null &&
        "center" in value &&
        "width" in value &&
        "height" in value &&
        "angle" in value &&
        "pen" in value
      ) {
        return new Rectangle(
          value.center,
          value.width,
          value.height,
          value.angle,
          value.pen
        );
      }
      return value;
    });
  }
}
