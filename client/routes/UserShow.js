React = require('react');
Router = require('react-router');
$ = require('jquery');
_ = require('lodash');
config = require('../../config.js');
animations = ['bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceInDown'];
timeout_count = 0;
max_data_reloads = 5;
// animations = ['bounceInUp'];

var TwitterHashtag = React.createClass({

  render: function() {
    return(
      <div className="twitter-hashtag">
        <h3>Twitter</h3>
        <ul>
          {this.props.data.map( function (tweet) {
            return(
                <Tweet tweet={tweet}></Tweet>
              )
          })}
        </ul>
      </div>
    )
  }
});

var Tweet = React.createClass({

  // componentDidUpdate: function() {
  //   dom_node = this.getDOMNode();
  //   $(dom_node).removeClass();
  //   animation = animations[Math.floor(Math.random() * animations.length)];
  //   $(dom_node).addClass('animated').addClass(animation);
  // },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.tweet.id !== this.props.tweet.id;
  },

  componentDidMount: function() {
    dom_node = this.getDOMNode();
    $(dom_node).removeClass();
    animation = animations[Math.floor(Math.random() * animations.length)];
    $(dom_node).removeClass().addClass('animated').addClass(animation);
  },

  render: function() {
    console.log(this.props.tweet.entities);
    var href = "http://twitter.com/" + this.props.tweet.user.screen_name;
    return(
        <li className="animated lightSpeedIn">
          <a href={href} target="_blank">{this.props.tweet.text}</a>
        </li>
    )
  }
});

var InstagramHashtag = React.createClass({

  render: function() {
    return(
      <div className="instagram-hashtag">
        <h3>Instagram</h3>
        <div className="row">
          <ul>
            {this.props.data.map( function (image) {
              return(
                  <InstagramImage image={image}></InstagramImage>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
});

var InstagramImage = React.createClass({

  componentWillUpdate: function() {
    // dom_node = this.getDOMNode();
  },

  componentDidUpdate: function() {
    // dom_node = this.getDOMNode();
    // console.log(dom_node);
    // $(dom_node).removeClass();
    // animation = animations[Math.floor(Math.random() * animations.length)];
    // $(dom_node).removeClass().addClass('col-sm-6 col-md-3 animated').addClass(animation);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.image.id !== this.props.image.id;
  },

  componentDidMount: function() { 
    dom_node = this.getDOMNode();
    $(dom_node).removeClass();
    animation = animations[Math.floor(Math.random() * animations.length)];
    $(dom_node).removeClass().addClass('col-sm-6 col-md-4 animated').addClass(animation);
  },

  render: function() {

    return(
      <li className="col-sm-6 col-md-4 ">
        <a href={this.props.image.link} target="_blank">
          <img src={this.props.image.images.standard_resolution.url} ></img>
        </a>
      </li>
    )
  }
});

var YoutubeHashtag = React.createClass({

  render: function() {
    return(
      <div className="youtube-hashtag">
        <h3>Youtube</h3>
        <div className="row">
          <ul>
            {this.props.data.map( function (video) {
              return(
                  <YoutubeVideo video={video}></YoutubeVideo>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
});

var YoutubeVideo = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.video.id.videoId !== this.props.video.id.videoId;
  },

  componentDidMount: function() { 
    dom_node = this.getDOMNode();
    $(dom_node).removeClass();
    animation = animations[Math.floor(Math.random() * animations.length)];
    $(dom_node).removeClass().addClass('col-xs-12 animated').addClass(animation);
  },

  render: function() {
    var href="https://www.youtube.com/watch?v=" + this.props.video.id.videoId;
    var src="https://www.youtube.com/embed/" + this.props.video.id.videoId;
    return(
      <li className="col-xs-12">
        <a href={href} target="_blank">
          <iframe width="450" height="300" src={src} frameborder="0" allowfullscreen></iframe>
        </a>
      </li>
    )
  }
});

var UserShow = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function(){
    return {user_data: [], instagram_hashtag_data: [], twitter_hashtag_data: [], youtube_hashtag_data: []}; 
  },

  getSocialData: function() {
    // Get Instagram hashtag data
    url = '/v1/provider/instagram_hashtag/'+this.state.user_data.category;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function ig(data) {
        new_data = this.state.instagram_hashtag_data.concat(data.data);
        new_data = _.uniq(new_data,'id');
        this.setState({instagram_hashtag_data: new_data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });

    // Get Youtube hashtag data
    url = '/v1/provider/youtube_hashtag/'+this.state.user_data.category;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function ig(data) {
        new_data = this.state.youtube_hashtag_data.concat(data.items);
        new_data = _.uniq(new_data,'etag');
        console.log(new_data);
        this.setState({youtube_hashtag_data: new_data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });

    // Get Twitter hashtag data
    url = '/v1/provider/twitter_hashtag/'+this.state.user_data.category;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function twitter(data) {
        new_data = this.state.twitter_hashtag_data.concat(data.statuses);
        new_data = _.uniq(new_data,'id');
        this.setState({twitter_hashtag_data: new_data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });

    (++timeout_count > max_data_reloads) ? clearTimeout(this.timer) : this.timer = setTimeout(this.getSocialData, 8000);
  },

  handleClick: function(e) {
    var self = this;
    e.preventDefault();
    var userId = this._currentElement._context.getCurrentParams().userId;
    $.get('/delete/'+userId, null, function(data) {
      console.log(data);
      self.transitionTo('users');
    });
  },

  handleEditClick: function(e) {
    var self = this;
    e.preventDefault();
    var userId = this._currentElement._context.getCurrentParams().userId;
    self.transitionTo('edit',{ userId: userId });
  },

  componentWillUnmount: function() {
    console.log("unmount");
    clearTimeout(this.timer);
  },

  componentDidMount: function() {
    console.log('mounted');
  	var userId = this._currentElement._context.getCurrentParams().userId;
  	var url = '/v1/users/' + userId;
  	$.ajax({
      url: url,
      dataType: 'json',
      success: function(user_data) {
        this.setState({user_data: user_data});
        $('body').removeClass().addClass(user_data.colorScheme);
        this.getSocialData();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/v1/users', status, err.toString());
      }.bind(this)
    });
  },

  render: function() {

    return (
      <div className="UserShowPage">
      	<div className="container">
          <div className="row">
          	<h5 className="col-sm-6">{this.state.user_data.name} - {this.state.user_data.category}</h5>
            <div className="col-sm-6">
              <button className="pull-right btn btn-danger" onClick={this.handleClick}>Delete</button>
              <button className="pull-right btn btn-warning" onClick={this.handleEditClick}>Edit</button>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <InstagramHashtag data={this.state.instagram_hashtag_data}></InstagramHashtag>
        </div>
        <div className="col-md-5">
          <YoutubeHashtag data={this.state.youtube_hashtag_data}></YoutubeHashtag>
        </div>
        <div className="col-md-2">
          <TwitterHashtag data={this.state.twitter_hashtag_data}></TwitterHashtag>
        </div>
      </div>
    )
  }
})


module.exports = UserShow;
