var fs=require("fs")

/*fs.readFile('./file/farsar1.html','utf8', (err, data) => {
  
 // console.log(data);
});

fs.stat('./file/wazipole.html', (err, stats) => {
  if (err) throw err;
  console.log(`stats: ${JSON.stringify(stats)}`);
});
*/

fs.readdir("file",(err,files)=>{
   var html="",q=0;
  files.forEach((e,i)=>{
  		fs.stat("./file/"+e, (err, stats) => {
		  if(stats.size<10000&&!(e.indexOf("$")!=-1)){
			html+=fs.readFileSync("./file/"+e,'utf8');
			fs.renameSync("./file/"+e, "./file/$"+e)
		  }
		  console.log(q)
		  q++;
		  if(q==files.length){
		  	fs.writeFile('total.html', html, (err) => {
			 
			  console.log('It\'s saved!');
			});
		  }
		});
  })
  
})