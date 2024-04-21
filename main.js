function drawLeg(origin, phase) {
  const HS = String(phase * 2 + 1);
  const LS = String(phase * 2 + 2);

  const Q1 = new Igbt(origin, "Q" + HS);
  Q1.draw();
  const Q2 = new Igbt([origin[0], origin[1] + 1.0], "Q" + LS);
  Q2.draw();

  const g1 = new Node(GetAnchorPos(Q1, 0), "gQ" + HS, "W");
  g1.draw();
  const g2 = new Node(GetAnchorPos(Q2, 0), "gQ" + LS, "W");
  g2.draw();

  const D1 = new Diode(
    [GetAnchorPos(Q1, 2)[0] + 0.3, GetAnchorPos(Q1, 2)[1]],
    "$D_" + HS + "$",
    Math.PI / 2
  );
  D1.draw();
  const D2 = new Diode(
    [GetAnchorPos(Q2, 2)[0] + 0.3, GetAnchorPos(Q2, 2)[1]],
    "$D_" + LS + "$",
    Math.PI / 2
  );
  D2.draw();

  ConnectParallel(Q1, 2, 1, D1, 0, 1, DE);
  ConnectParallel(Q2, 2, 1, D2, 0, 1, DE);

  const out = new Node([GetAnchorPos(Q1, 2)[0], GetAnchorPos(Q1, 2)[1] - 0.2]);
  out.draw();

  drawAnchorConnector(Q1, 2, out, DN - 1);
  drawAnchorConnector(Q2, 1, out, DS - 1);

  const L1 = new Inductor(
    [GetAnchorPos(out, 0)[0] + 0.6, GetAnchorPos(out, 0)[1] - 0.1],
    -90,
    "$Ph_{" + phaseName[phase] + "}$"
  );
  L1.draw();

  drawAnchorConnector(out, DE - 1, L1, 0);

  const retVal = [];
  retVal[0] = new Node(GetAnchorPos(Q1, 1), "");
  retVal[1] = new Node(GetAnchorPos(Q2, 2), "");
  retVal[2] = out;
  return retVal;
}

drawLeg([0.5, 0.75], 0);
