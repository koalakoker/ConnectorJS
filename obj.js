class Obj {
  constructor(pos, len, name, align = null) {
    this.pos = pos;
    this.len = len;
    this.a = [];
    this.name = name;
    this.namePos = [0, 0];
    this.align = align;
  }

  addAnchorPoint(a) {
    this.a.push(a);
    return this.a.length - 1;
  }

  getAnchorPos(i) {
    return [this.pos[0] + this.a[i].pos[0], this.pos[1] + this.a[i].pos[1]];
  }

  setAnchorDirection(index, dir) {
    this.a[index].dir = dir;
  }

  setPos(pos) {
    this.pos = pos;
  }

  setLabel(name, namePos = [0, 0]) {
    this.name = name;
    this.namePos = namePos;
  }

  drawAnchorPos(i, drawOpt) {
    const dir = this.a[i].dir;
    const anchorPosBegin = this.getAnchorPos(i);
    const anchorPosEnd = [
      anchorPosBegin[0] + EndPointDelta[dir][0],
      anchorPosBegin[1] + EndPointDelta[dir][1],
    ];
    drawLine(anchorPosBegin, anchorPosEnd, "green");
    drawDot(anchorPosBegin);
    if (drawOpt.showAnchorLabel) {
      label(String(i), anchorPosEnd, LabelAlign[dir]);
    }
  }

  drawPointAndLabel(pos, label, align) {
    label(pos, label, align);
    const crossLength = 0.04;
    drawLine(
      [pos[0] + crossLength, pos[1] + crossLength],
      [pos[0] - crossLength, pos[1] - crossLength],
      "red"
    );
    drawLine(
      [pos[0] + crossLength, pos[1] - crossLength],
      [pos[0] - crossLength, pos[1] + crossLength],
      "red"
    );
  }

  draw(drawOpt = null) {
    if (drawOpt !== null) {
      if (drawOpt.showBounds) {
        const halfLen = this.len / 2;
        drawBox(
          [this.pos[0] - halfLen, this.pos[1] - halfLen],
          [this.pos[0] + halfLen, this.pos[1] + halfLen]
        );
        label(this.name, this.pos);
      }

      if (drawOpt.showAnchor) {
        for (let i = 0; i < this.a.length; i++) {
          this.drawAnchorPos(i, drawOpt);
        }
      }

      if (drawOpt.showOrigin) {
        this.drawPointAndLabel([0, 0], "$(0,0)$", drawOpt.originAlign);
        this.drawPointAndLabel([1, 0], "$(1,0)$", drawOpt.originAlign);
      }
    }
  }
}

function GetAnchorPos(o, i) {
  return o.getAnchorPos(i);
}

function AddAnchorPoint(o, pos, dir) {
  const a = new Anchor([pos[0] - o.pos[0], pos[1] - o.pos[1]], dir);
  return o.addAnchorPoint(a);
}

function setAnchorDirection(obj, index, dir) {
  obj.setAnchorDirection(index, dir);
}
