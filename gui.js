function getPosOnCanvas(p) {
  let rect = canvas.getBoundingClientRect();
  let cX = rect.left;
  let cY = rect.top;
  return new Point(p.x - cX, p.y - cY);
}

function mouseDown(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  factory.mouseDown(p);
}

function mouseMove(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  factory.mouseMove(p);
}

function mouseUp(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  factory.mouseUp(p);
}

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);

const txt = document.getElementById("txt");
