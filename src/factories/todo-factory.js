import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])
.factory('todoFactory', ($http) => {

	function getTasks($scope) {
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
	}

	function createTask($scope, params) {
		if(!$scope.createTaskInput) {return;}

		$http.post('/todos', {
			task: $scope.createTaskInput,
			isCompleted: false,
			isEditing: false
		}).success(response => {
			$scope.createTaskInput = '';
			getTasks($scope);
		});
		// params.createHasInput = false;
		// $scope.createTaskInput = '';
	}

	function updateTask($scope, todo) {
		 $http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(response => {
				getTasks($scope);
				todo.isEditing = false;
		 });
		// '/todos' + todo._id
		// todo.task = todo.updatedTask;
		// todo.isEditing = false;
	}

	// what we are passing into the original function is the last arguement here
	function watchCreateTaskInput(params, $scope, val) {

		if(!val && params.createHasInput) {
			$scope.todos.pop();
			params.createHasInput = false;
		}
		else if(val && !params.createHasInput) {
			$scope.todos.push({task: val, isCompleted: false});
			params.createHasInput = true;
		} else if(val && params.createHasInput) {
			$scope.todos[$scope.todos.length - 1].task = val;
		}
	}

	function deleteTask($scope, todoToDelete) {
		$http.delete(`/todos/${todoToDelete._id}`).success(response => {
			getTasks($scope);
		});
		// _.remove($scope.todos, todo => todo.task === todoToDelete.task);
	}
	return {
		createTask,
		updateTask,
		deleteTask,
		watchCreateTaskInput,
		getTasks
	}
});

export default todoFactory;
