React = require('react');
$ = require('jquery');
Router = require('react-router');

var Create = React.createClass({
	mixins: [Router.Navigation],


	getInitialState: function() {
		$('body').removeClass().addClass('create');
    return {userName: null, category: null};
  },

  componentDidMount: function() {
		var ref = this.refs.userNameInput.getDOMNode();
		$(ref).focus();
  },

	handleSubmit: function(e) {
		var self = this;
		e.preventDefault();

		$.post('/v1/users', this.state, function(data) {
				// console.log(data);
				self.transitionTo('userShow',{ userId: data._id });
			});
	},
	handleUserNameChange: function(event) {
    this.setState({userName: event.target.value});
  },
	handleCategoryChange: function(event) {
    this.setState({category: event.target.value});
  },
	handleColorSchemeChange: function(event) {
    this.setState({colorScheme: event.target.value});
  },
  render: function() {
  	var userName = this.state.userName;
  	var category = this.state.category;
  	var colorScheme = this.state.colorScheme;
    return (
      <div className="CreatePage container">
        <h5>Create Page</h5>
        <form className="form-inline" onSubmit={this.handleSubmit}>
	        <div className="form-group">
	        	<input className="form-control userNameInput" type="text" value={userName} onChange={this.handleUserNameChange} placeholder="User Name" ref="userNameInput" />
	        </div>
	        <div className="form-group">
	        	<input className="form-control" type="text" value={category} onChange={this.handleCategoryChange} placeholder="Hashtag" />
	        </div>
	        <div className="form-group">
		        <select name="colorScheme" className="form-control" value={colorScheme} onChange={this.handleColorSchemeChange}>
							<option value="default">Color Scheme</option>
	        		<option value="red">Red</option>
							<option value="blue">Blue</option>
							<option value="green">Green</option>
							<option value="orange">Orange</option>
							<option value="magenta">Magenta</option>
							<option value="yellow">Yellow</option>
						</select>
	        </div>
					<div className="form-group">
	        	<button className='form-control'>Create User ></button>
	        </div>
        </form>
      </div>
    )
  }
})


module.exports = Create;
