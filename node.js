class Node extends Obj {
  constructor(pos, name = "", align = null) {
    super(pos, 0, name, align);

    const aL = [];
    let a = new Anchor([0, 0], DN);
    aL.push(a);
    a = new Anchor([0, 0], DS);
    aL.push(a);
    a = new Anchor([0, 0], DE);
    aL.push(a);
    a = new Anchor([0, 0], DW);
    aL.push(a);
    this.a = aL;
  }

  draw(p = currentpen, drawOpt = null) {
    if (this.name !== "") {
      label(this.name, this.pos, this.align);
    }
    drawDot(this.pos, p);
    super.draw(drawOpt);
  }
}
