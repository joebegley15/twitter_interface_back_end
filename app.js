// Configure the Express file
const express = require('express')
const app = express();
// Configure HTTP
const http = require('http');
// Require the file that handles interactions with the Twitter API
const twt = require('./src/twitter');
// Define varaibles
let count, port = 5050;

app.get('/', function(req,res){
	res.send('Hello World');
})
// Get request for user specific tweets
app.get('/api/userTweets/:handle/:count',function(req,res){
	count = req.params.count < 50 ? req.params.count : 50;
	async function main() {
		const tweets = await twt.pullTweetsFromUser(req.params.handle,count);
		res.send(tweets);
	}
	main();
})
// Get request for word specific tweets
app.get('/api/tagTweets/:tag/:count',function(req,res){
	count = req.params.count < 50 ? req.params.count : 50;
	async function ma() {
		const tweets = await twt.pullTweetsByHashTag(req.params.tag,count);
		res.send(tweets);
	}
	ma();
})
app.listen(port,function(){
	console.log('Listening on port #' + port);
})