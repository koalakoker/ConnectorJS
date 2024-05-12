let modifier = "";
let mControl = false;
let mShift = false;
let mAlt = false;

function noModifier() {
  return mControl === false && mAlt === false && mShift === false;
}

function keydown(e) {
  if (
    e.code === "KeyZ" &&
    mControl === true &&
    mShift === false &&
    mAlt === false &&
    isInCanvas(getPosOnCanvas(mouse))
  ) {
    undo();
    e.preventDefault();
  }
  if (
    e.code === "KeyZ" &&
    mControl === true &&
    mShift === true &&
    mAlt === false &&
    isInCanvas(getPosOnCanvas(mouse))
  ) {
    redo();
    e.preventDefault();
  }
  if (e.code === "KeyL" && noModifier() && isInCanvas(getPosOnCanvas(mouse))) {
    setMode("line");
    e.preventDefault();
  }
  if (e.code === "KeyC" && noModifier() && isInCanvas(getPosOnCanvas(mouse))) {
    setMode("circle");
    e.preventDefault();
  }
  if (e.code === "KeyA" && noModifier() && isInCanvas(getPosOnCanvas(mouse))) {
    setMode("arc");
    e.preventDefault();
  }
  if (e.code === "KeyR" && noModifier() && isInCanvas(getPosOnCanvas(mouse))) {
    setMode("rect");
    e.preventDefault();
  }
  if (e.code === "KeyP" && noModifier() && isInCanvas(getPosOnCanvas(mouse))) {
    setMode("poly");
    e.preventDefault();
  }
  if (e.key === "Escape") {
    if (factory !== selectFact) {
      setMode("select");
    }
    factory.event("deselect");
    factory.event("escape");
  }
  if (e.code === "KeyP" && mAlt) {
    factory.event("setPivot");
  }
  if (e.code === "KeyC" && mControl && isInCanvas(getPosOnCanvas(mouse))) {
    factory.event("copy");
  }
  if (e.code === "KeyV" && mControl && isInCanvas(getPosOnCanvas(mouse))) {
    factory.event("paste");
  }
  if (e.code === "Delete" || e.code === "Backspace") {
    if (isInCanvas(getPosOnCanvas(mouse))) {
      factory.event("canc");
    }
  }
  if (e.key === "Control" || e.code === "MetaLeft" || e.code === "MetaRight") {
    mControl = true;
  }
  if (e.key === "Shift") {
    modifier = "shift";
    mShift = true;
  }
  if (e.key === "Alt") {
    mAlt = true;
  }
  //console.log(e.code);
}

function keyup(e) {
  if (e.key === "Control" || e.code === "MetaLeft" || e.code === "MetaRight") {
    mControl = false;
  }
  if (e.key === "Shift") {
    modifier = "";
    mShift = false;
  }
  if (e.key === "Alt") {
    mAlt = false;
  }
}

function keypress(e) {
  if (e.key === "+") {
    factory.wheel(-1);
  }
  if (e.key === "-") {
    factory.wheel(1);
  }
}
