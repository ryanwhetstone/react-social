React = require('react');
Router = require('react-router');
Link = Router.Link;
$ = require('jquery');

var TableRow = React.createClass({
  mixins: [Router.Navigation],

  handleViewClick: function(event) {
    var self = this;
    var DOMNode = this.getDOMNode();
    var userId = $(DOMNode).data('id');

    self.transitionTo( 'userShow', {userId: userId} );
  },

  handleEditClick: function(event) {
    var self = this;
    var DOMNode = this.getDOMNode();
    var userId = $(DOMNode).data('id');

    self.transitionTo( 'edit', {userId: userId} );
  },

  handleDeleteClick: function(event) {
    var self = this;
    var DOMNode = this.getDOMNode();
    var userId = $(DOMNode).data('id');

    $.ajax({
      url: '/v1/users/'+userId,
      type: 'DELETE',
      success: function(data) {
        console.log(data);
        $(DOMNode).fadeOut();
      }
    });
  },

  render: function() {
    self = this;
    return(
        <tr data-id={this.props.user._id}>
          <td>
            <Link to="userShow" params={{userId: this.props.user._id}}>{this.props.user.name}</Link>
          </td>
          <td>
            {this.props.user.category}
          </td>
          <td>
            {this.props.user.colorScheme}
          </td>
          <td>
            <button type="button" className="btn btn-default" aria-label="Left Align" title="View" onClick={self.handleViewClick} >
              <i className="fa fa-eye"></i>
            </button>
            <button type="button" className="btn btn-default" aria-label="Left Align" title="Edit" onClick={self.handleEditClick} >
              <i className="fa fa-edit"></i>
            </button>
            <button type="button" className="btn btn-default" aria-label="Left Align" title="Delete" onClick={self.handleDeleteClick} >
              <i className="fa fa-remove"></i>
            </button>
          </td>
        </tr>
      )
  }
})
var Users = React.createClass({
  mixins: [Router.Navigation],

	getInitialState: function(){
		return {data:[]};
	},

  componentDidMount: function() {
    $('body').removeClass().addClass('users');
  	$.ajax({
      url: '/v1/users',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.reverse()});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/getUsers', status, err.toString());
      }.bind(this)
    });

  },

  render: function() {
    var self = this;
    return (
      <div className="UsersPage container">
        <h5>Users</h5>
        <div className="col-md-12">
          <div className="row">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Color Scheme</th>
                  <th>&nbsp;</th>
                </thead>
                <tbody>
                {this.state.data.map(function(user) {
                  return (
                    <TableRow user={user}></TableRow>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
})


module.exports = Users;
