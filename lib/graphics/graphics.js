const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawLine(a, b, p = currentpen) {
  p.setStyle(ctx);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawArrow(a, b, arrowSize = 10, p = currentpen) {
  p.setStyle(ctx);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();

  let angle = Math.atan2(a.y - b.y, b.x - a.x);
  ctx.lineWidth = p.width;
  ctx.beginPath();
  ctx.moveTo(
    b.x - arrowSize * Math.cos(angle - Math.PI / 6),
    b.y + arrowSize * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(
    b.x - arrowSize * Math.cos(angle + Math.PI / 6),
    b.y + arrowSize * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

function drawPoint(pos, p = currentpen) {
  p.setStyle(ctx);
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, p.width, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawCircle(pos, rad, p = currentpen) {
  p.setStyle(ctx);
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, rad, 0, Math.PI * 2, true);
  ctx.stroke();
}

function drawPoly(pL, p = currentpen) {
  if (pL.length === 0) return;
  let pos = pL[0];
  let start = pos;
  if (pL.length === 1) {
    drawPoint(pos, p);
    return;
  }
  p.setStyle(ctx);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  for (let i = 1; i < pL.length; i++) {
    pos = pL[i];
    ctx.lineTo(pos.x, pos.y);
  }
  ctx.lineTo(start.x, start.y);
  ctx.stroke();
}

function isInCanvas(p) {
  if (p.x < 0) return false;
  if (p.y < 0) return false;
  if (p.x > 400) return false;
  if (p.y > 400) return false;
  return true;
}
