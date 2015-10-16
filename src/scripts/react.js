var React = require("react")

var Title = React.createClass({
  render: function() {
    return (
      <h1>TodosList Demo</h1>
    )
  }
})

var TodoInput = React.createClass({
  onClickAdd: function() {
    var value = React.findDOMNode(this.refs.input).value
    this.props.onClickAdd(value)
  },
  onInputChange: function() {
    var value = React.findDOMNode(this.refs.input).value
    this.props.onContentChange(value)
  },
  render: function() {
    return (
      <div>
        <input 
          type="text" 
          className="input-todo" 
          ref="input" 
          onChange={this.onInputChange}
          value={this.props.content}/>
        <button className="new-todo-btn" onClick={this.onClickAdd}>新增</button>
      </div>
    )
  }
})

var TodosList = React.createClass({
  onClickTodo: function(index) {
    this.props.onCheckTodo(index)
  },
  render: function() {
    var self = this
    return (
      <ul>
        {this.props.todos.map(function(todo, i) {
          var className = todo.done ? "done" : ""
          return (
            <li 
              className={className}
              onClick={self.onClickTodo.bind(self, i)}>
              {todo.content}
            </li>
          )
        })}
      </ul>
    )
  }
})

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      newTodoContent: "",
      todos: [{content: "Make PPT!", done: false}]
    }
  },
  addNewTodo: function(content) {
    if (content.length === 0) return
    var todos = this.state.todos
    todos.push({content: content, done: false})
    this.setState({
      newTodoContent: "",
      todos: todos
    })
  },
  onContentChange: function(content) {
    this.setState({newTodoContent: content})
  },
  onCheckTodo: function(index) {
    var todos = this.state.todos
    todos[index].done = !todos[index].done
    this.setState(todos)
  },
  render: function() {
    return (
      <div>
        <Title />
        <TodoInput 
          onContentChange={this.onContentChange} 
          onClickAdd={this.addNewTodo} 
          content={this.state.newTodoContent} />
        <TodosList 
          todos={this.state.todos}
          onCheckTodo={this.onCheckTodo}/>
      </div>
    )
  }
})

React.render(<TodoApp />, document.getElementById('app'))