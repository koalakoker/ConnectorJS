drawLine(new Point(100, 100), new Point(200, 200));
drawLine(new Point(100, 200), new Point(200, 100), new Pen("red", 5, [3, 5]));

drawArrow(new Point(100, 300), new Point(180, 350));
setCurrentPen(new Pen("blue", 10));
drawArrow(new Point(100, 300), new Point(180, 250));
