let factor = 150;

// Utility functions for drawing
function drawLine(start, end, color) {
  const canvas = document.getElementById("igbtCanvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawDot(pos) {
  // Draw a dot at the specified position
}

function drawBox(start, end) {
  // Draw a box with specified start and end points
}

function label(pos, text, align) {
  // Draw a label at the specified position with the specified text and alignment
}

let currentpen = 0;
