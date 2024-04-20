let factor = 150;
let currentpen = new Pen("black", 3);
const canvas = document.getElementById("igbtCanvas");
const ctx = canvas.getContext("2d");

function ToPoint(a) {
  if (Array.isArray(a)) {
    a.x = a[0] * factor;
    a.y = a[1] * factor;
  }
  return a;
}

// Utility functions for drawing
function drawLine(start, end, p = currentpen) {
  start = ToPoint(start);
  end = ToPoint(end);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.strokeStyle = p.color;
  ctx.lineWidth = p.width;
  ctx.stroke();
}

function drawArrow(start, end, arrowPos, p = currentpen) {
  start = ToPoint(start);
  end = ToPoint(end);
  var headlen = 15;
  var dx = end.x - start.x;
  var dy = end.y - start.y;
  var angle = Math.atan2(dy, dx);

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  let aPx = start.x + dx * arrowPos;
  let aPy = start.y + dy * arrowPos;

  ctx.beginPath();
  ctx.lineTo(aPx, aPy);
  ctx.lineTo(
    aPx - headlen * Math.cos(angle - Math.PI / 6),
    aPy - headlen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    aPx - headlen * Math.cos(angle + Math.PI / 6),
    aPy - headlen * Math.sin(angle + Math.PI / 6)
  );
  ctx.fill();
}

function drawDot(pos, p = currentpen) {
  const rad = 5;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, rad, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawBox(start, end) {
  // Draw a box with specified start and end points
}

function label(text, pos, align) {
  pos = ToPoint(pos);
  ctx.font = "25px serif";
  ctx.fillText(text, pos.x, pos.y);
}
