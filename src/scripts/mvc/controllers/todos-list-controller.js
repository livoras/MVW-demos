function TodosListController(todosModel) {
  this.todosModel = todosModel
}

TodosListController.prototype.onCheck = function(index) {
  var todos = this.todosModel.getTodos()
  var todo = todos[index]
  todo.done = !todo.done
  this.todosModel.setTodos(todos)
}

module.exports = TodosListController