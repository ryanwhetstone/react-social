var instagram_client_id = 'abc',
	instagram_client_secret = 'abc',
	youtube_api_key = 'abc',
	replace_string = 'xyz';

var config = {
	replace_string: replace_string,

  instagram_hashtag: {
  	url: 'https://api.instagram.com/v1/tags/' + replace_string + '/media/recent?client_id='+instagram_client_id+'&client_secret='+instagram_client_secret
  },

  twitter_hashtag: {
		consumer_key: 'abc',
		consumer_secret: 'abc',
		access_token: 'abc',
		token_secret: 'abc',
		url: 'https://api.twitter.com/1.1/search/tweets.json?q='+replace_string+'&count=50'
  },

  youtube_hashtag: {
  	url: 'https://www.googleapis.com/youtube/v3/search/?q=' + replace_string + '&part=snippet&maxResults=10&key=' + youtube_api_key
  }
}

module.exports = config;