drawLine(new Point(100, 100), new Point(200, 200));
drawLine(new Point(100, 200), new Point(200, 100), new Pen("red", 5, [3, 5]));

drawArrow(new Point(100, 300), new Point(180, 350));
setCurrentPen(new Pen("blue", 10));
drawArrow(new Point(100, 300), new Point(180, 250));

drawPoint(new Point(100, 300));
drawPoint(new Point(180, 350));

drawPoint(new Point(100, 100), new Pen("black", 3));
drawPoint(new Point(100, 200), new Pen("purple", 6));

drawCircle(new Point(400, 400), 50);
setCurrentPen(new Pen("red", 1));
drawCircle(new Point(0, 400), 75);
drawCircle(new Point(300, 40), 40, new Pen("green", 1));

let angle = 0;
let rad = 100;
let pL = [];
for (let i = 0; i < 5; i++) {
  let pt = new Point(200 + rad * Math.sin(angle), 200 + rad * Math.cos(angle));
  pL.push(pt);
  angle += (Math.PI * 2) / 5;
}
drawPoly(pL);
