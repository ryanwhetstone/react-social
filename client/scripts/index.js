
var React = require('react'),
	Router = require('react-router');

var PageNav = React.createClass({
	render: function() {
		return (
			<div className="nav">
				<Router.Link to="home">Home</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="users">Users</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="create">Create</Router.Link>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="main">
				<div className="color-scheme">
					<div className="col-xs-2">&nbsp;</div>
					<div className="col-xs-2">&nbsp;</div>
					<div className="col-xs-2">&nbsp;</div>
					<div className="col-xs-2">&nbsp;</div>
					<div className="col-xs-2">&nbsp;</div>
					<div className="col-xs-2">&nbsp;</div>
				</div>
				<div className="page-nav">
						<div className="container">
							<PageNav />
						</div>
				</div>
				<Router.RouteHandler/>
			</div>
			
		);
	}
});

var routes = {
	Home: require('../routes/Home'),
	Create: require('../routes/Create'),
	Edit: require('../routes/Edit'),
	Users: require('../routes/Users'),
	UserShow: require('../routes/UserShow')
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.Home}/>
		<Router.Route name="users" path="/users" handler={routes.Users}/>
		<Router.Route name="create" path="/create" handler={routes.Create}/> 
		<Router.Route name="edit" path="/user/:userId/edit" handler={routes.Edit}/> 
		<Router.Route name="userShow" path="/user/:userId" handler={routes.UserShow} />
		<Router.DefaultRoute handler={routes.Home}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
