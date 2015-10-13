function TodoInputController(model) {
  this.model = model
}

TodoInputController.prototype.onAddNewTodo = function(content) {
  var todos = this.model.getTodos()
  todos.unshift({content: content, done: false})
  this.model.setTodos(todos)
}

module.exports = TodoInputController