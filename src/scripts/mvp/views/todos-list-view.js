var Handlebars = require("handlebars")

function TodosListView(model) {
  this.presenter = null
  this.model = model
  this.template = Handlebars.compile($("#todos-list-tpl").html())
  this.$el = $("<div></div>")
}

TodosListView.prototype.build = function(todos) {
  this.render(todos)
  this.listen()
}

TodosListView.prototype.render = function(todos) {
  this.$el.html(this.template({todos: todos}))
}

TodosListView.prototype.setPresenter = function(presenter) {
  this.presenter = presenter
}

TodosListView.prototype.listen = function() {
  var self = this
  self.$el.on("click", "li", null, function(event) {
    var $li = $(event.currentTarget)
    self.presenter.onCheck(+$li.attr("data-index"))
  })
}

TodosListView.prototype.checkItem = function(i) {
  return this.$el.find("li").eq(i).addClass("done")
}

TodosListView.prototype.uncheckItem = function(i) {
  return this.$el.find("li").eq(i).removeClass("done")
}

module.exports = TodosListView