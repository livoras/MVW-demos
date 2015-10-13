var Handlebars = require("handlebars")

function TodosListView(controller, model) {
  this.controller = controller
  this.model = model
  this.template = Handlebars.compile($("#todos-list-tpl").html())
  this.$el = $("<div></div>")
}

TodosListView.prototype.build = function() {
  this.render()
  this.listenCheck()
  this.listenModel()
}

TodosListView.prototype.render = function() {
  var todos = this.model.getTodos()
  this.$el.html(this.template({todos: todos}))
}

TodosListView.prototype.listenCheck = function() {
  var self = this
  self.$el.on("click", "li", null, function(event) {
    var $li = $(event.currentTarget)
    self.controller.onCheck(+$li.attr("data-index"))
  })
}

TodosListView.prototype.listenModel = function() {
  this.model.on("change", this.render.bind(this))
}

module.exports =TodosListView 
