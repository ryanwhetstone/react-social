var config = require('../../../config.js'),
	OAuth = require('oauth');
	request = require('request');

var providers = function(router) {
	
	router.get('/v1/provider/twitter_hashtag/:hashtag', function(req, res, next) {
		var search_url = config.twitter_hashtag.url.replace(config.replace_string, req.params.hashtag);
		var oauth = new OAuth.OAuth(
			'https://api.twitter.com/oauth/request_token',
			'https://api.twitter.com/oauth/access_token',
			config.twitter_hashtag.consumer_key,
			config.twitter_hashtag.consumer_secret,
			'1.0A',
			null,
			'HMAC-SHA1'
			); 
		oauth.get(
			search_url,
			config.twitter_hashtag.access_token,
			config.twitter_hashtag.token_secret,
			function (e, data, response){
				if (e) console.error(e);  
				console.log("twitter hashtag "+req.params.hashtag);
		  res.json(JSON.parse(data));
		});    
	});

	router.get('/v1/provider/instagram_hashtag/:hashtag', function(req, res, next) {
		var url = config.instagram_hashtag.url.replace(config.replace_string, req.params.hashtag);
		request.get(url, function (error, response, body) {
			res.json(JSON.parse(body));
			console.log("instagram hashtag "+req.params.hashtag);
			if ( error ) {
				console.error(error);
			}
		}) 
	});

	router.get('/v1/provider/youtube_hashtag/:hashtag', function(req, res, next) {
		var url = config.youtube_hashtag.url.replace(config.replace_string, req.params.hashtag);
		request.get(url, function (error, response, body) {
			res.json(JSON.parse(body));
			console.log("youtube hashtag "+req.params.hashtag);
			if ( error ) {
				console.error(error);
			}
		}) 
	});

}

module.exports = providers;