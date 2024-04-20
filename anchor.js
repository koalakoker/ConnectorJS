class Anchor {
  constructor(pos, dir) {
    this.pos = pos;
    this.dir = dir;
  }
}

const DN = 1;
const DS = 2;
const DE = 3;
const DW = 4;
const DH = 10;
const DV = 11;

const anchorLength = 0.2;
const EndPointDelta = [
  [0, 0],
  [0, anchorLength], // DN
  [0, -anchorLength], // DS
  [anchorLength, 0], // DE
  [-anchorLength, 0], // DW
];

const LabelAlign = [null, "NE", "SE", "NE", "NW"];

function getOrientation(dir) {
  let retVal = 0;
  if (dir === DN || dir === DS) {
    retVal = DV;
  }
  if (dir === DE || dir === DW) {
    retVal = DH;
  }
  return retVal;
}

function sameOrientation(dir1, dir2) {
  return getOrientation(dir1) === getOrientation(dir2);
}

function sameDirection(dir1, dir2) {
  return dir1 === dir2;
}

function rotateDir(dir, angle) {
  let retVal = dir;
  if (angle === 90) {
    if (dir === DN) {
      retVal = DW;
    }
    if (dir === DW) {
      retVal = DS;
    }
    if (dir === DS) {
      retVal = DE;
    }
    if (dir === DE) {
      retVal = DN;
    }
  }
  if (angle === -90) {
    if (dir === DN) {
      retVal = DE;
    }
    if (dir === DE) {
      retVal = DS;
    }
    if (dir === DS) {
      retVal = DW;
    }
    if (dir === DW) {
      retVal = DN;
    }
  }
  if (angle === 180 || angle === -180) {
    if (dir === DN) {
      retVal = DS;
    }
    if (dir === DW) {
      retVal = DE;
    }
    if (dir === DS) {
      retVal = DN;
    }
    if (dir === DE) {
      retVal = DW;
    }
  }
  return retVal;
}
