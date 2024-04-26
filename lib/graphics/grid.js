class Grid {
  constructor(space) {
    this.space = space;
  }
  snap(p) {
    let x = p.x;
    x = Math.round(x / this.space) * this.space;
    let y = p.y;
    y = Math.round(y / this.space) * this.space;
    return new Point(x, y);
  }
}

const grid = new Grid(10);
