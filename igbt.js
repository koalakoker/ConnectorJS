function drawIGBT(origin, orient = 0, p = currentpen) {
  drawLine([origin[0], origin[1]], [origin[0] + 0.25 * factor, origin[1]], p);
  drawLine(
    [origin[0] + 0.25 * factor, origin[1] - 0.1 * factor],
    [origin[0] + 0.25 * factor, origin[1] + 0.1 * factor],
    p
  );
  drawLine(
    [origin[0] + 0.3 * factor, origin[1] - 0.2 * factor],
    [origin[0] + 0.3 * factor, origin[1] + 0.2 * factor],
    p
  );
  drawLine(
    [origin[0] + 0.3 * factor, origin[1] + 0.1 * factor],
    [origin[0] + 0.5 * factor, origin[1] + 0.3 * factor],
    p
  );
  drawLine(
    [origin[0] + 0.3 * factor, origin[1] - 0.1 * factor],
    [origin[0] + 0.5 * factor, origin[1] - 0.3 * factor],
    p
  );
}

class Igbt {
  constructor(pos = [0, 0], name = "", orient = 0) {
    this.obj = new Obj(pos, 0, name);
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
    this.obj.a = aL;
  }

  setOrient(orient) {
    if (orient !== 0) {
      this.orient = 0;
      console.log("Wrong orient in " + this.obj.name + ". Forced to 0");
    } else {
      this.orient = orient;
    }
  }

  draw(drawOpt = null) {
    drawIGBT(this.obj.pos);
    if (this.orient === 0) {
      label(this.obj.name, [this.obj.pos[0] + 0.2, this.obj.pos[1] + 0.3]);
    } else {
      label(this.obj.name, [this.obj.pos[0] + 0.8, this.obj.pos[1] + 0.5]);
    }
    this.obj.draw(drawOpt);
  }

  setPos(pos) {
    this.obj.setPos(pos);
  }

  setLabel(name, namePos = [0, 0]) {
    this.obj.setLabel(name, namePos);
  }
}
