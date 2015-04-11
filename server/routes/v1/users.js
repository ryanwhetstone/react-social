var config = require('../../../config.js'),
		User = require('../../../models/user');

var users = function(router) {
	
	router.get('/v1/users', function(req, res, next) {

		User.find({}, function(err, users) {
			console.log(users);
			res.json(users);
		});
	});

	router.get('/v1/users/:id', function(req, res, next) {

		User.findOne({ _id: req.params.id}, function(err, user) {
			console.log(user);
			res.json(user);
		});
	});

	router.delete('/v1/users/:id', function(req, res, next) {

		User.findOneAndRemove({ _id: req.params.id }, function(err) {
		  if (err) throw err;
		  res.json('User deleted!');
		});
	});

	router.post('/v1/users/:id', function(req, res, next) {

		User.update( 
			{ _id: req.params.id }, 
			{ name: req.body.name, category: req.body.category},
			null,
	    function(err) {
	    	if (err) throw err;
	    	res.json('Updated User!');
	    }
		);
	});

	router.post('/v1/users', function(req, res, next) {

		var user = new User({
			name: req.body.userName,
			category: req.body.category,
			colorScheme: req.body.colorScheme
		});

		user.save(function(err, doc) {
			if (err) throw err;
			res.json(doc);
		});
	});

	

}

module.exports = users;