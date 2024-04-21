function drawDiode(o, orient = 0, p = currentpen) {
  const rotatedOrigin = [o[0], o[1]]; // Copy origin
  const endX = rotatedOrigin[0] + Math.cos(orient);
  const endY = rotatedOrigin[1] + Math.sin(orient);

  // Draw diode body
  drawLine(rotatedOrigin, [endX, endY], p);

  let pL = [];
  let v = [0.4, -0.1];
  v = rotate(v, orient);
  v = translate(v, o);
  pL.push(v);

  v = [0.4, 0.1];
  v = rotate(v, orient);
  v = translate(v, o);
  pL.push(v);

  v = [0.5, 0.0];
  v = rotate(v, orient);
  v = translate(v, o);
  pL.push(v);

  drawPolygon(pL, p);
  // drawPolygon(
  //   [
  //     [
  //       rotatedOrigin[0] + Math.cos(orient) * 0.4,
  //       rotatedOrigin[1] - Math.sin(orient) * 0.1,
  //     ],
  //     [
  //       rotatedOrigin[0] + Math.cos(orient) * 0.4,
  //       rotatedOrigin[1] + Math.sin(orient) * 0.1,
  //     ],
  //     [endX - Math.cos(orient) * 0.4, endY - Math.sin(orient) * 0.1],
  //     [endX - Math.cos(orient) * 0.4, endY + Math.sin(orient) * 0.1],
  //   ],
  //   p
  // );
  // Draw connection line
  // drawLine(
  //   [
  //     rotatedOrigin[0] + Math.cos(orient) * 0.6,
  //     rotatedOrigin[1] - Math.sin(orient) * 0.1,
  //   ],
  //   [
  //     rotatedOrigin[0] + Math.cos(orient) * 0.6,
  //     rotatedOrigin[1] + Math.sin(orient) * 0.1,
  //   ],
  //   p
  // );
}

class Diode extends Obj {
  constructor(pos = [0, 0], name = "", orient = 0) {
    super(pos, 0, name);
    this.orient = 0;
    this.setOrient(orient);

    const aL = [];
    let a = new Anchor(
      [Math.cos(orient) * 0, -Math.sin(orient) * 0],
      rotateDir(DW, orient)
    );
    aL.push(a);
    a = new Anchor(
      [Math.cos(orient) * 1, -Math.sin(orient) * 1],
      rotateDir(DE, orient)
    );
    aL.push(a);
    this.a = aL;
  }

  setOrient(orient) {
    if (orient !== 0 && orient !== Math.PI / 2 && orient !== -Math.PI / 2) {
      this.orient = 0;
      console.log("Wrong orient in " + this.name + ". Forced to 0");
    } else {
      this.orient = orient;
    }
  }

  draw(p = currentpen, drawOpt = null) {
    drawDiode(this.pos, this.orient, p);

    label(this.name, [
      this.pos[0] + Math.cos(this.orient) * 0.5,
      this.pos[1] - Math.sin(this.orient) * 0.5,
    ]);

    super.draw(drawOpt);
  }

  setPos(pos) {
    this.setPos(pos);
  }

  setLabel(name, namePos = [0, 0]) {
    this.setLabel(name, namePos);
  }
}
