var ko = require("knockout")

var viewModel = {
  newTodoContent: ko.observable(""),
  todos: ko.observableArray([{
    content: "Make PPT!", 
    done: ko.observable(true)
  }])
}

viewModel.addNewTodo = function() {
  this.todos.push({
    content: this.newTodoContent(),
    done: ko.observable(false)
  })
  this.newTodoContent("")
}

viewModel.checkTodo = function(todo) {
  todo.done(!todo.done())
}

ko.applyBindings(viewModel, document.getElementById("app"))
