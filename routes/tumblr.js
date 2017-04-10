var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc',
  consumer_secret: '4Q0aIYPeKXWmvmIgeok43N4DxwIRkMZthUPHncUBZ0yYgGscTy',
  token: 'nHyDBDQiaNgkmVEvCwlRPWB89SMMKkdHKikeHyXwIbf6kenW12',
  token_secret: 'e5tPdEknmpoxrR4wjnDSjPzwjTMMZ1SZGimuZIudgfvS1ddXKw'
});

client.userFollowing({offset:0,limit:20},function(err, data) {
		data.blogs.forEach(function(e){
			console.log(e.name)
		})
});