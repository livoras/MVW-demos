var Handlebars = require("handlebars")

function TodoInputView(controller, model) {
  this.controller = controller
  this.model = model
  this.template = Handlebars.compile($("#todo-input-tpl").html())
}

TodoInputView.prototype.build = function() {
  this.render()
  this.listen()
}

TodoInputView.prototype.render = function() {
  this.$el = $(this.template())
}

TodoInputView.prototype.listen = function() {
  var self = this
  this.$el
    .find("button.new-todo-btn")
    .on("click", function() {
      var $input = self.$el.find("input.input-todo")
      var content = $input.val()
      if (content.length === 0) return
      $input.val("")
      self.controller.onAddNewTodo(content)
    })
}

module.exports = TodoInputView