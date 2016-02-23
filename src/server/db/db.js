var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/todos');
// this also works for heroku
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');

var Todo = mongoose.model('Todo', {
	task: String,
	isCompleted: Boolean,
	isEditing: Boolean
});

module.exports.Todo = Todo;
