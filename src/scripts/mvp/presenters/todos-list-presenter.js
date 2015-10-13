function TodosListPresenter(view, model) {
  this.view = view
  this.model = model
  this.init()
}

TodosListPresenter.prototype.init = function() {
  this.view.setPresenter(this)
  this.view.build(this.model.getTodos())
  this.listenModelChange()
}

TodosListPresenter.prototype.onCheck = function(index) {
  this.toggleTodoModel(index)
  this.toggleTodoView(index)
}

TodosListPresenter.prototype.toggleTodoModel = function(index) {
  var todos = this.model.getTodos()
  var todo = todos[index]
  todo.done = !todo.done
}

TodosListPresenter.prototype.toggleTodoView = function(index) {
  if (this.model.getTodos()[index].done) {
    this.view.checkItem(index)
  } else {
    this.view.uncheckItem(index)
  }
}

TodosListPresenter.prototype.listenModelChange = function() {
  var self = this
  this.model.on("change", function() {
    self.view.render(self.model.getTodos())
  })
}

module.exports = TodosListPresenter