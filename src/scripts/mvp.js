var TodosModel = require("./mvp/models/todos")

var TodoInputPresenter = require("./mvp/presenters/todo-input-presenter")
var TodoInputView = require("./mvp/views/todo-input-view")

var TodosListPresenter = require("./mvp/presenters/todos-list-presenter")
var TodosListView = require("./mvp/views/todos-list-view")

var todosModel = new TodosModel

function initTodoApp() {
  initInput()
  initList()
}

function initInput() {
  var todoInputView = new TodoInputView()
  var todoInputPresenter = new TodoInputPresenter(todoInputView, todosModel)
  $("#todo-input").html(todoInputView.$el)
}

function initList() {
  var todosListView = new TodosListView()
  var todosListPresenter = new TodosListPresenter(todosListView, todosModel)
  $("#todos-list").html(todosListView.$el)
}

initTodoApp()
