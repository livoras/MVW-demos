var angular = require("angular")

angular.module("todoApp", [])

.controller("TodoAppController", ["$scope", function($scope) {
  $scope.newTodoContent = ""
  $scope.todos = [{content: "Make PPT!", done: false}]

  $scope.addNewTodo = function() {
    if ($scope.newTodoContent.length === 0) return
    $scope.todos.push({content: $scope.newTodoContent, done: false})
    $scope.newTodoContent = ""
  }

  $scope.checkTodo = function(i) {
    $scope.todos[i].done = !$scope.todos[i].done
  }

}])
