function TodosListController(model) {
  this.model = model
}

TodosListController.prototype.onCheck = function(index) {
  var todos = this.model.getTodos()
  var todo = todos[index]
  todo.done = !todo.done
  this.model.setTodos(todos)
}

module.exports = TodosListController