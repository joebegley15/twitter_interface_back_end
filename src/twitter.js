const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const my_user_name = config.userName;

// Pull Tweets from an individual user
const pullTweetsFromUser = function(handle,tweetCount){
	let tweets;
	return new Promise(function(resolve, reject) {
		T.get("statuses/user_timeline", {screen_name:handle, count:tweetCount}, function(err, data, response) {
			tweets = data.map(data => data.text);
			resolve(tweets);
		})
		return tweets;
	})
}
const pullTweetsByHashTag = function(hashTag, tweetCount) {
	let tweets;
	return new Promise(function(resolve, reject) {
		T.get('search/tweets', { q: hashTag, count: tweetCount }, function(err, data, response) {
			tweets = data['statuses'].map(data => data.text);
			resolve(tweets);
		})
		return tweets;
	})
}

module.exports.pullTweetsFromUser = pullTweetsFromUser;
module.exports.pullTweetsByHashTag = pullTweetsByHashTag;