class History {
  constructor() {
    this.states = [];
    this.index = -1;
  }

  push(memento) {
    if (this.index === this.states.length - 1) {
      this.index = this.states.push(memento) - 1;
    } else {
      this.index += 1;
      const start = this.index;
      const deleteCount = this.states.length - this.index;
      const itemInstert = memento;
      this.states.splice(start, deleteCount, itemInstert);
    }
  }

  undo() {
    let retVal;
    if (this.index > 0) {
      this.index -= 1;
      retVal = this.states[this.index];
    } else {
      retVal = this.states[0];
    }
    return retVal;
  }

  redo() {
    let retVal;
    const l = this.states.length;
    if (this.index < l - 1) {
      this.index += 1;
      retVal = this.states[this.index];
    } else {
      retVal = this.states[l - 1];
    }
    return retVal;
  }
}
