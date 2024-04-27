function reviveScene(key, value) {
  let rObj;

  rObj = Composition.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Point.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Pen.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Line.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Circle.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Arc.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Rectangle.revive(value);
  if (rObj !== undefined) return rObj;

  rObj = Polygon.revive(value);
  if (rObj !== undefined) return rObj;

  return value;
}
