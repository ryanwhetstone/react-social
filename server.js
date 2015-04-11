var express = require('express'),
	nunjucks = require('nunjucks'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	router = express.Router();

// initialise express
var app = express();

mongoose.connect('mongodb://localhost/react-social');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// use nunjucks to process view templates in express
nunjucks.configure('server/views', {
    express: app
});

app.use(express.static(__dirname + '/public'));

app.use('/', router);

// Nicely separated routes for our app api endpoints
require('./server/routes/v1/provider.js')(router);
require('./server/routes/v1/users.js')(router);

router.get('*', function(req, res) {
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
    res.render('index.html');
});

// start the server
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('\nServer ready on port %d\n', server.address().port);
});
