const p1 = new Polygon(new Point(200, 200), 100, 4, 0);
const r1 = new Rectangle(new Point(200, 200), 100, 50, 0, new Pen("red"));

const comp = new Composition();
comp.addShape(p1);
comp.addShape(r1);
comp.draw();
