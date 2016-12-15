var express = require('express');
var router = express.Router();
const fs=require('fs');
var http=require("http")
var request = require('request');
var iconv = require('iconv-lite');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../syzjWeb/index.html', { title: 'Express' });
});
router.get('/getcont', function(req, res, next) {
	var uri={
		video:'https://api.tumblr.com/v2/blog/'+req.param('name')+
		'.tumblr.com/posts/video?api_key=MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc&limit='+(req.param('limit')||20)+
		"&offset="+req.param('offset'||0),
		photo:'https://api.tumblr.com/v2/blog/'+req.param('name')+
		'.tumblr.com/posts/photo?api_key=MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc&limit='+(req.param('limit')||20)+
		"&offset="+req.param('offset'||0)
	}
	 request({uri:uri[req.param('type')],encoding: null}, function (error, response, body) {
	    var html1=iconv.decode(body, 'utf8');
  		res.send(html1);
	});
});

router.get('/getLike', function(req, res, next) {
	 request({uri:"https://api.tumblr.com/v2/blog/"+req.param('name')+
		".tumblr.com/likes?api_key=MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc&limit="+(req.param('limit')||20)+
		"&offset="+req.param('offset'||0),encoding: null}, function (error, response, body) {
	    var html1=iconv.decode(body, 'utf8');
  		res.send(html1);
	});
});

module.exports = router;
