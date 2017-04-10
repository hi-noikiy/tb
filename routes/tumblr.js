var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc',
  consumer_secret: '4Q0aIYPeKXWmvmIgeok43N4DxwIRkMZthUPHncUBZ0yYgGscTy',
  token: 'nHyDBDQiaNgkmVEvCwlRPWB89SMMKkdHKikeHyXwIbf6kenW12',
  token_secret: 'e5tPdEknmpoxrR4wjnDSjPzwjTMMZ1SZGimuZIudgfvS1ddXKw'
});

var follow=[],going=true;
for(let i=0;i<100;i++){
	if(going){
		client.userFollowing({offset:(i*20)},function(err, data) {
			if(!data){
				going=false
			}else{
				data.blogs.forEach(function(e){
					follow.push(e.name)
				})
			}
		});
	}
}
setTimeout(function(){
	console.log(follow)
},3000)