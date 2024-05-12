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
    mAlt === false
  ) {
    undo();
  }
  if (
    e.code === "KeyZ" &&
    mControl === true &&
    mShift === true &&
    mAlt === false
  ) {
    redo();
  }
  if (e.code === "KeyL" && noModifier()) {
    setMode("line");
    e.preventDefault();
  }
  if (e.code === "KeyC" && noModifier()) {
    setMode("circle");
    e.preventDefault();
  }
  if (e.code === "KeyA" && noModifier()) {
    setMode("arc");
    e.preventDefault();
  }
  if (e.code === "KeyR" && noModifier()) {
    setMode("rect");
    e.preventDefault();
  }
  if (e.code === "KeyP" && noModifier()) {
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
  if (e.code === "KeyP" && mAlt) {
    factory.event("setPivot");
  }
  if (e.code === "KeyC" && mControl) {
    if (isInCanvas(getPosOnCanvas(mouse))) {
      factory.event("copy");
    }
  }
  if (e.code === "KeyV" && mControl) {
    if (isInCanvas(getPosOnCanvas(mouse))) {
      factory.event("paste");
    }
  }
  if (e.code === "Delete" || e.code === "Backspace") {
    if (isInCanvas(getPosOnCanvas(mouse))) {
      factory.event("canc");
    }
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
