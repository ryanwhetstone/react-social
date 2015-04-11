React = require('react');
$ = require('jquery');
Router = require('react-router');

var Create = React.createClass({
	mixins: [Router.Navigation],


	getInitialState: function() {
		$('body').removeClass().addClass('edit');
    return { name: null, category: null, colorScheme: null }; 
  },
	
	handleSubmit: function(e) {
		var self = this;
		e.preventDefault();
		console.log(this.state);
		var userId = this._currentElement._context.getCurrentParams().userId;
		// console.log(this.state);
		$.post('/v1/users/'+userId, this.state, function(data) {
				console.log(data);
				self.transitionTo('userShow',{ userId: userId });
			});
	},
	
	handleNameChange: function(event) {
    this.setState({name: event.target.value});
  },

	handleCategoryChange: function(event) {
    this.setState({category: event.target.value});
  },

  handleColorSchemeChange: function(event) {
    this.setState({colorScheme: event.target.value});
  },

  componentDidMount: function() {
    var ref = this.refs.userNameInput.getDOMNode();
    $(ref).focus();
  	var userId = this._currentElement._context.getCurrentParams().userId;
  	var url = '/v1/users/' + userId;
  	$.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        this.setState({name: data.name, category: data.category, colorScheme: data.colorScheme});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/v1/users', status, err.toString());
      }.bind(this)
    });

  },

  render: function() {
    return (
      <div className="EditPage container">
        <h5>Edit Page</h5>
        <form className="form-inline" onSubmit={this.handleSubmit}>
	        <div className="form-group">
	        	<input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="User Name" ref="userNameInput" />
	        </div>
	        <div className="form-group">
	        	<input className="form-control" type="text" value={this.state.category} onChange={this.handleCategoryChange} placeholder="Hashtag" />
	        </div>
          <div className="form-group">
            <select name="colorScheme" className="form-control" value={this.state.colorScheme} onChange={this.handleColorSchemeChange}>
              <option value="default">Default</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
              <option value="magenta">Magenta</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
	        <div className="form-group">
	        	<button className='form-control'>Update User ></button>
	        </div>
        </form>
      </div>
    )
  }
})


module.exports = Create;
