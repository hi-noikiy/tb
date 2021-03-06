var express = require('express');
var router = express.Router();
const fs=require('fs');
var http=require("http")
var request = require('request');
var iconv = require('iconv-lite');
var tumblr = require('tumblr.js');
var debug = require('debug')('my:index');

var appKeyList=["MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc",
"Y6fcF1mgfP80tlsQgQwwXuYM80u3nKlzrYmC8G3D7SKXKmuChz"]
var client = tumblr.createClient({
  consumer_key: 'MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc',
  consumer_secret: '4Q0aIYPeKXWmvmIgeok43N4DxwIRkMZthUPHncUBZ0yYgGscTy',
  token: 'nHyDBDQiaNgkmVEvCwlRPWB89SMMKkdHKikeHyXwIbf6kenW12',
  token_secret: 'e5tPdEknmpoxrR4wjnDSjPzwjTMMZ1SZGimuZIudgfvS1ddXKw'
});
var appKey=appKeyList[0]

var follow=[]
function getList(i){
	client.userFollowing({offset:(i*20),limit:20},function(err, data) {
		if(data.blogs.length>0){
			data.blogs.forEach(function(e){
				follow.push({name:e.name,type:"new"})
			})
			getList(i+1)
		}else{
			var oldFollows=fs.readFileSync("data/follows.txt");
			fs.writeFileSync("data/follows.txt",JSON.stringify(follow))
			console.log("old start")
				debug("old start")
			if(follow.length>=oldFollows.length){
				debug("follow>oldFollows")
				follow.forEach((e,i)=>{
					oldFollows.forEach((q,w)=>{
						if(e.name==q.name){
							e.type="old"
						}
					})
				})
			}
			console.log("list ok")
		}
	});
}
getList(0)




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../syzjWeb/index.html', { title: 'Express' });
});
router.get('/list', function(req, res, next) {
	res.send(follow)
});
router.get('/getcont', function(req, res, next) {
	var uri={
		video:'https://api.tumblr.com/v2/blog/'+req.query.name+
		'.tumblr.com/posts/video?api_key='+appKey+'&limit='+(req.query.limit||20)+
		"&offset="+(req.query.offset||0),
		photo:'https://api.tumblr.com/v2/blog/'+req.query.name+
		'.tumblr.com/posts/photo?api_key='+appKey+'&limit='+(req.query.limit||20)+
		"&offset="+(req.query.offset||0),
	}
	 request({uri:uri[req.query.type],encoding: null}, function (error, response, body) {
	 	if(error){
	 		console.log("ERROR:",error)
	 		res.send(error);
	 	}else{
	    var html1=JSON.parse(iconv.decode(body, 'utf8'));
	    	if(html1.meta.status=="429"){
	    		appKey=appKeyList[1]
	    	}
  			res.send(html1);
  		}
	});
});

router.get('/getLike', function(req, res, next) {
	 request({uri:"https://api.tumblr.com/v2/blog/"+req.query.name+
		".tumblr.com/likes?api_key="+appKey+"&limit="+(req.query.limit||20)+
		"&before="+(req.query.time||0),encoding: null}, function (error, response, body) {
	    var html1=iconv.decode(body, 'utf8');
  		res.send(html1);
	}); 
});

router.get('/saveHtml', function(req, res, next) {
	 fs.writeFile('./file/'+req.query.name+'.html', `${req.query.html.replace(/\*/g,"https://vtt.tumblr.com")}`, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
        res.send("ok");
    });
});

module.exports = router;
