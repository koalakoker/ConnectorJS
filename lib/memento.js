class Memento {
  constructor(content) {
    this.content = JSON.stringify(content, serialize, 2);
  }

  getContent() {
    return JSON.parse(this.content, reviveScene);
  }
}
