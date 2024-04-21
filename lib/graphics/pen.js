const defaultPenStrokeColor = "black";
const defaultPenFillColor = "";
const defaultPenWidth = 3;
const defaultPenDash = [];
class Pen {
  constructor(
    strokeColor = defaultPenStrokeColor,
    fillColor = defaultPenFillColor,
    width = defaultPenWidth,
    dash = defaultPenDash
  ) {
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.width = width;
    this.dash = dash;
  }
  setStyle(ctx) {
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.width;
    ctx.setLineDash(this.dash);
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
