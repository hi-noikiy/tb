var fs=require("fs")

fs.readdir("file",(err,files)=>{
   var html="",arr=[];
   files.forEach((e,i)=>{
   		 html+=fs.readFileSync("./file/"+e,'utf8');
   })
   arr=html.split("</li><li>")

   arr.forEach((e,i)=>{
   		if(i%800==0){
   			var newArr=arr.slice(i,(i+800))
   			console.log(newArr.length)
   			let html=+"<li>"+newArr.length+"</li>"+newArr.join("</li><li>")
   			 fs.writeFile('./1000file/total'+i+".html", html, (err) => {
				  console.log('It\'s saved!');
			});
   		}
   })
  
})