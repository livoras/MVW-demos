var TodosModel = require("./mvc/models/todos")

var TodoInputController = require("./mvc/controllers/todo-input-controller")
var TodoInputView = require("./mvc/views/todo-input-view")

var TodosListController = require("./mvc/controllers/todos-list-controller")
var TodosListView = require("./mvc/views/todos-list-view")

var todosModel = new TodosModel

function initTodoApp() {
  initInput()
  initList()
}

function initInput() {
  var todoInputController = new TodoInputController(todosModel)
  var todoInputView = new TodoInputView(todoInputController, todosModel)

  todoInputView.build()
  $("#todo-input").html(todoInputView.$el)
}

function initList() {
  var todosListController = new TodosListController(todosModel)
  var todosListView = new TodosListView(todosListController, todosModel)

  todosListView.build()
  $("#todos-list").html(todosListView.$el)
}

initTodoApp()
