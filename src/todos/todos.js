import _ from 'lodash';
export default function($scope, todoFactory) {

	// params is an object because it gets passed by refference to the factory
	// individual variables, and even the ones inside of the object will be passed
	// by copy
	let params = {
		createHasInput: false
	};
	// console.log(todoFactory.createTask);
	// mock data
	// $scope.todos = [
	// 	{
	// 		task: 'do dishes',
	// 		isCompleted: false,
	// 		isEditing: false
	// 	},
	// 	{
	// 		task: 'walk',
	// 		isCompleted: true,
	// 		isEditing: false
	// 	}
	// ]

	todoFactory.getTasks($scope);

	// destructuring to remove todoFactory.fucntionName
	// it will create variables as mentioned above
	const {createTask, updateTask, deleteTask, watchCreateTaskInput} = todoFactory;

	// example before destructuring
	// $scope.deleteTask = _.partial(todoFactory.deleteTask, $scope);
	$scope.deleteTask = _.partial(deleteTask, $scope);

	// the parameter automatically goes the the factory; don't need to write it here
	// only need to pass scope
	// or the variables that are defined in this file like params
	$scope.updateTask = _.partial(updateTask, $scope);

	$scope.onCancelClick = todo => {
		todo.isEditing = false;
	};

	$scope.onEditClick = todo => {
		todo.isEditing = true;
	};

	$scope.onCompletedClick = (todo) => {
		todo.isCompleted = !todo.isCompleted;
	};

	$scope.createTask = _.partial(createTask, $scope, params);

	$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));

	// look how this changes because of using the factory
	// $scope.$watch('createTaskInput', val => {
	// 	if(!val && params.createHasInput) {
	// 		$scope.todos.pop();
	// 		params.createHasInput = false;
	// 	}
	// 	else if(val && !params.createHasInput) {
	// 		$scope.todos.push({task: val, isCompleted: false});
	// 		params.createHasInput = true;
	// 	} else if(val && params.createHasInput) {
	// 		$scope.todos[$scope.todos.length - 1].task = val;
	// 	}
	//
	// });
}
