var Handlebars = require("handlebars")

function TodosListView(controller, model) {
  this.controller = controller
  this.model = model
  this.template = Handlebars.compile($("#todos-list-tpl").html())
}

TodosListView.prototype.build = function() {
  this.render()
  this.listen()
}

TodosListView.prototype.render = function() {
  var todos = this.model.getTodos()
  this.$el = $(this.template({todos: todos}))
}

TodosListView.prototype.listen = function() {
  var self = this
  self.$el.find("li").each(function(i, todo) {
    $(todo).click(function() {
      self.controller.onCheck(i)
    })
  })
}

module.exports =TodosListView 
