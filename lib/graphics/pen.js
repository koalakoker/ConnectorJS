const defaultPenColor = "black";
const defaultPenWidth = 3;
const defaultPenDash = [];
class Pen {
  constructor(
    color = defaultPenColor,
    width = defaultPenWidth,
    dash = defaultPenDash
  ) {
    this.color = color;
    this.width = width;
    this.dash = dash;
  }
}

let currentpen;

function restoreDeafultPen() {
  currentpen = new Pen();
}

function setCurrentPen(p) {
  currentpen = p;
}

restoreDeafultPen();
