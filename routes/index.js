var express = require('express');
var router = express.Router();
const fs=require('fs');
var http=require("http")
var request = require('request');
var iconv = require('iconv-lite');
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc',
  consumer_secret: '4Q0aIYPeKXWmvmIgeok43N4DxwIRkMZthUPHncUBZ0yYgGscTy',
  token: 'nHyDBDQiaNgkmVEvCwlRPWB89SMMKkdHKikeHyXwIbf6kenW12',
  token_secret: 'e5tPdEknmpoxrR4wjnDSjPzwjTMMZ1SZGimuZIudgfvS1ddXKw'
});





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../syzjWeb/index.html', { title: 'Express' });
});
router.get('/list', function(req, res, next) {
	var promise = new Promise(function(resolve, reject) {
	    var follow=[],going=true;
		for(let i=0;i<10;i++){
			if(going){
				client.userFollowing({offset:0},function(err, data) {
					if(!data){
						going=false;
						resolve(data,follow);
					}else{
						console.log(i)
						data.blogs.forEach(function(e){
							follow.push(e.name)
						})
					}
				});
			}
		}
	});
	promise.then((v1,v2) => {
	  console.log(v1,v2);
	  res.send(v2);
	});
  	
});
router.get('/getcont', function(req, res, next) {
	var uri={
		video:'https://api.tumblr.com/v2/blog/'+req.query.name+
		'.tumblr.com/posts/video?api_key=MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc&limit='+(req.query.limit||20)+
		"&offset="+(req.query.offset||0),
		photo:'https://api.tumblr.com/v2/blog/'+req.query.name+
		'.tumblr.com/posts/photo?api_key=MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc&limit='+(req.query.limit||20)+
		"&offset="+(req.query.offset||0),
	}
	 request({uri:uri[req.query.type],encoding: null}, function (error, response, body) {
	 	if(error){
	 		console.log("ERROR:",error)
	 		res.send(error);
	 	}else{
	    var html1=iconv.decode(body, 'utf8');
  			res.send(html1);
	 	}
	});
});

router.get('/getLike', function(req, res, next) {
	 request({uri:"https://api.tumblr.com/v2/blog/"+req.query.name+
		".tumblr.com/likes?api_key=MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc&limit="+(req.query.limit||20)+
		"&before="+(req.query.time||0),encoding: null}, function (error, response, body) {
	    var html1=iconv.decode(body, 'utf8');
  		res.send(html1);
	}); 
});

router.get('/saveHtml', function(req, res, next) {
	 fs.writeFile('./file/'+req.query.name+'.html', `${req.query.html.replace(/\*/g,"https://vtt.tumblr.com")}`, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});

module.exports = router;
