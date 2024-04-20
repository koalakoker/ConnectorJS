function drawIGBT(o, orient = 0, p = currentpen) {
  drawLine([o[0], o[1]], [o[0] + 0.25, o[1]], p);
  drawLine([o[0] + 0.25, o[1] - 0.1], [o[0] + 0.25, o[1] + 0.1], p);
  drawLine([o[0] + 0.3, o[1] - 0.2], [o[0] + 0.3, o[1] + 0.2], p);
  drawLine([o[0] + 0.3, o[1] - 0.1], [o[0] + 0.5, o[1] - 0.3], p);
  drawArrow([o[0] + 0.3, o[1] + 0.1], [o[0] + 0.5, o[1] + 0.3], 0.8, p);
}

class Igbt extends Obj {
  constructor(pos = [0, 0], name = "", orient = 0) {
    super(pos, 0, name);
    this.showAnchor = false;
    this.orient = 0;
    this.setOrient(orient);
    const aL = [];
    let a = new Anchor([0, 0], DW);
    aL.push(a);
    a = new Anchor([0.5, 0.5], DN);
    aL.push(a);
    a = new Anchor([0.5, -0.5], DS);
    aL.push(a);
    this.a = aL;
  }

  setOrient(orient) {
    if (orient !== 0) {
      this.orient = 0;
      console.log("Wrong orient in " + this.name + ". Forced to 0");
    } else {
      this.orient = orient;
    }
  }

  draw(drawOpt = null) {
    drawIGBT(this.pos);
    if (this.orient === 0) {
      label(this.name, [this.pos[0] + 0.1, this.pos[1] + 0.4]);
    } else {
      label(this.name, [this.pos[0] + 0.8, this.pos[1] + 0.5]);
    }
    super.draw(drawOpt);
  }

  setPos(pos) {
    this.setPos(pos);
  }

  setLabel(name, namePos = [0, 0]) {
    this.setLabel(name, namePos);
  }
}
