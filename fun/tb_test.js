
const fs=require('fs');
var http=require("http")
var request = require('request');
var iconv = require('iconv-lite');

 //request({uri:'http://finance.qq.com/gdyw.htm',encoding: null}, function (error, response, body) {
 request({uri:'https://api.tumblr.com/v2/blog/banytam.tumblr.com/posts/video?api_key=MTSQG9xC2tAAgK6y8AHKvVFpI3QGIKPRDx9O0Iybpfls3DTfYc',encoding: null}, function (error, response, body) {

            var html1=iconv.decode(body, 'utf8');
        /*var box=html1.split('<div class="Q-tpList" id="listZone">')[1].split('<style type="text/css">')[0];
        console.log(html1)*/
         fs.writeFile('game.html', `${html1}`, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    });