class History {
  constructor() {
    this.states = [];
    this.index = -1;
  }

  // Adds a Memento to the history
  push(memento) {
    // Push not in the tail to be managed
    this.index = this.states.push(memento) - 1;
  }

  // Retrieves the last Memento from history
  undo() {
    if (this.index > 0) {
      this.index -= 1;
      return this.states[this.index];
    } else {
      return this.states[0];
    }
  }

  redo() {
    const l = this.states.length;
    if (this.index < l - 1) {
      this.index += 1;
      return this.states[this.index];
    } else {
      return this.states[l - 1];
    }
  }
}
