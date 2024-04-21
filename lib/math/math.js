function rotate(p, rad) {
  let rP = new Point(0, 0);
  rP.x = p.x * Math.cos(rad) - p.y * Math.sin(rad);
  rP.y = p.y * Math.cos(rad) + p.x * Math.sin(rad);
  return rP;
}

function translate(p, o) {
  let rP = new Point(0, 0);
  rP.x = p.x + o.x;
  rP.y = p.y + o.y;
  return rP;
}

function gradToRad(grad) {
  const rad = (grad * Math.PI) / 180;
  return rad;
}
