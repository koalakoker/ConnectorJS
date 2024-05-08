// Edit content
editor.setContent("First draft");
console.log(editor.content); // Output: First draft

// Save state
history.push(editor.createMemento());

// Edit content again
editor.setContent("Second draft");
console.log(editor.content); // Output: Second draft

// Restore previous state
editor.restoreFromMemento(history.pop());
console.log(editor.content); // Output: First draft
