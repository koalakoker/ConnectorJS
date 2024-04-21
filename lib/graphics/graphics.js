const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawLine(a, b, p = currentpen) {
  ctx.strokeStyle = p.color;
  ctx.lineWidth = p.width;
  ctx.setLineDash(p.dash);

  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawArrow(a, b, arrowSize = 10, p = currentpen) {
  ctx.strokeStyle = p.color;
  ctx.lineWidth = p.width;
  ctx.setLineDash(p.dash);

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
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, p.width, 0, Math.PI * 2, true);
  ctx.fill();
}

function startPoly(p, color, width, dash = []) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function moveTo(p) {
  ctx.lineTo(p.x, p.y);
}

function endPoly() {
  ctx.stroke();
}

function drawCircle(pos, rad, p = currentpen) {
  ctx.strokeStyle = p.color;
  ctx.lineWidth = p.width;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, rad, 0, Math.PI * 2, true);
  ctx.stroke();
}
