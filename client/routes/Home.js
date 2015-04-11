React = require('react');
$ = require('jquery');


var Home = React.createClass({

	componentDidMount: function() {
		$('body').removeClass().addClass('home');
	},

  render: function() {
    return (
      <div className="MainPage container">
        <h5>Main Page</h5>
      </div>
    )
  }
});

module.exports = Home;
