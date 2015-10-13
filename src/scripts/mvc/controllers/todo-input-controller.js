function TodoInputController(todosModel) {
  this.todosModel = todosModel
}

TodoInputController.prototype.onAddNewTodo = function(content) {
  var todos = this.todosModel.getTodos()
  todos.unshift({content: content, done: false})
  this.todosModel.setTodos(todos)
}

module.exports = TodoInputController