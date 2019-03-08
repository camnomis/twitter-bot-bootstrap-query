
// Dependencies =========================
var
    twit = require('twit')

var Twitter = new twit({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret
})

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
  //    q: '#Crypto #Cryptocurrency #blockchain',  // example if not taking varibale from process.env
        q: process.env.searchString,
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted sucessfully!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe???');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet approx every 50 minutes
setInterval(retweet, 3006435);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
  //  q: '#Crypto #Cryptocurrency #blockchain',  // REQUIRED
      q: process.env.searchString,
      result_type: 'recent',
      lang: 'en'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITED... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet approx. every 60 minutes
setInterval(favoriteTweet, 3596731);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
