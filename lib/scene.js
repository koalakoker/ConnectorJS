class Scene {
  constructor(content = "") {
    this.content = content;
  }
  draw() {
    this.content.draw();
  }
  reset() {
    this.content.reset();
  }
  addShape(s) {
    this.content.addShape(s);
  }
  setContent(content) {
    this.content = content;
  }
  getContent() {
    return this.content;
  }
  deselectAll() {
    this.content.deselectAll();
  }
  isOnItem(p) {
    return this.content.isOnItem(p);
  }
  isOnHandle(p) {
    return this.content.isOnHandle(p);
  }

  // Creates a Memento containing a copy of the current state
  createMemento() {
    return new Memento(this.content);
  }

  // Restores the state from a Memento
  restoreFromMemento(memento) {
    this.content = memento.getContent();
  }
}
