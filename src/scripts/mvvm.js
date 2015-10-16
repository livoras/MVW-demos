var ViewModel = require("vue")

var app = new ViewModel({
  el: "#app",
  data: {
    newTodoContent: "",
    todos: [{content: "Make PPT!", done: false}]
  },
  methods: {
    addNewTodo: function() {
      if (!this.newTodoContent.length) return
      this.todos.push({
        content: this.newTodoContent, 
        done: false
      })
      this.newTodoContent = ""
    },
    checkTodo: function(i) {
      var todo = this.todos[i]
      todo.done = !todo.done
    }
  }
})
