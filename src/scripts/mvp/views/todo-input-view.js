var Handlebars = require("handlebars")

function TodoInputView() {
  this.presenter = null
  this.template = Handlebars.compile($("#todo-input-tpl").html())
}

TodoInputView.prototype.build = function() {
  this.render()
  this.listen()
}

TodoInputView.prototype.render = function() {
  this.$el = $(this.template())
}

TodoInputView.prototype.setPresenter = function(presenter) {
  this.presenter = presenter
}

TodoInputView.prototype.listen = function() {
  var self = this
  this.$el
    .find("button.new-todo-btn")
    .on("click", function() {
      self.presenter.onAddNewTodo()
    })
}

TodoInputView.prototype.getInput = function() {
  return this.$el.find("input").val()
}

TodoInputView.prototype.setInput = function(content) {
  return this.$el.find("input").val(content)
}

module.exports = TodoInputView