class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  add(x, y) {
    return new Point(this.x + x, this.y + y);
  }
  int() {
    return new Point(Math.round(this.x), Math.round(this.y));
  }
}

function lerpPoint(a, b, o) {
  let x = lerp(a.x, b.x, o);
  let y = lerp(a.y, b.y, o);
  return new Point(x, y);
}
