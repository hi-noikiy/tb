var fs=require("fs")


/*fs.readdir("tb",(err,files)=>{
   	var html="",q=0;
	files.forEach((e,i)=>{
		fs.stat("./file/"+e, (err, stats) => {
		  
		});
	})
})*/
fs.stat("./tb/tumblr_nwf1ukRLXk1uib5bj.mp4", (err, stats) => {
		  console.log(stats)
});