var Todo = Backbone.Model.extend({
  default: {
    content: "",
    done: false
  }
})

var Todos = Backbone.Collection.extend({
  model: Todo
})

var TodoAppView = Backbone.View.extend({
  el: "#todo-app",
  template: Handlebars.compile($("#todo-app-tpl").html()),
  events: {
    "click .new-todo-btn": "onClickAdd"
  },
  initialize: function() {
    this.todos = new Todos()
    this.render()
    this.renderTodos()
    this.listenTo(this.todos, "change", this.renderTodos)
  },
  onClickAdd: function() {
    var $input = this.$el.find("input")
    var value = $input
    if (value.length === 0) return
    this.todos.add({content: value, done: false})
  },
  render: function() {
    this.$el.html(this.template())
  },
  renderTodos: function() {
    var self = this
    self.$el.find("ul").html()
    this.todos.forEach(function(todo) {
      var todoView = new TodoView(todo)
      self.$el.append(todoView.$el)
    })
  }
})

var TodoView = Backbone.View.extend({
  // TODO
})

var todoApp = new TodoAppView