var mongoose = require('mongoose');
var Todo = require('server/db/db').Todo;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	// res.send('Hello from /todos');
	Todo.find(function(err, results) {
		if (err) {console.log(err);}
		res.send({todos: results});
	});
});

router.post('/', function(req, res) {
	var todo = new Todo(req.body);
	todo.save(function(err) {

		if (err) {console.log(err);}
		console.log('saved');
		res.send('success');
	});
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
    $set: { task: req.body.task }
  }, function(err) {
    if (err) { console.log(err); }
    res.send('Todo updated');
  });
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Todo.remove({_id: mongoose.Types.ObjectId(id)}, function(err) {
		console.log(err);
		res.send('Todo delted');
	});
});

module.exports = router;
