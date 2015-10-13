var EventEmitter = require("eventemitter2").EventEmitter2

function TodosModel() {
  EventEmitter.call(this)
  this._todos = [{content: "Make PPT!", done: false}]
}

var pro = TodosModel.prototype = Object.create(EventEmitter.prototype)

pro.getTodos = function() {
  return this._todos
}

pro.setTodos = function(todos) {
  this._todos = todos
  this.emit("change", todos)
}

module.exports = TodosModel