var TodosListPresenter = require("../../src/scripts/mvp/presenters/todos-list-presenter")
var TodosModels = require("../../src/scripts/mvp/models/todos") 

var chai = require("chai")
var sinon = require("sinon")
var sinonChai = require("sinon-chai")

chai.should();
chai.use(sinonChai);

describe("测试MVP模式中的TodosListPresenter的逻辑是否正确", function() {
  var mockView = {
    setPresenter: function() {},
    build: function() {},
    checkItem: function() {},
    uncheckItem: function() {}
  }

  var model = new TodosModels()

  it("用户勾选todo，使得model的done变为true，并且让视图改变", function() {
    var todosListPresenter = new TodosListPresenter(mockView, model)

    mockView.checkItem = sinon.spy()
    todosListPresenter.onCheck(0)

    model.getTodos()[0].done.should.be.equal(true)
    mockView.checkItem.should.have.been.calledWith(0)
  })

  it("用户去勾选todo，使得model的done变为false，并且让视图改变", function() {
    var todosListPresenter = new TodosListPresenter(mockView, model)

    mockView.uncheckItem = sinon.spy()
    todosListPresenter.onCheck(0)

    model.getTodos()[0].done.should.be.equal(false)
    mockView.uncheckItem.should.have.been.calledWith(0)
  })
})