var fs=require("fs")

fs.readdir("./new",(err,files)=>{
	var sizeArr=[],nameObj={};
	files.forEach((e,i)=>{
			var stat=fs.statSync("./new/"+e)
			sizeArr.push({size:stat.size,name:e})
	})
	
	sizeArr.forEach((e,i)=>{
		sizeArr.forEach((q,x)=>{
			if(q.size==e.size&&x!=i){
				nameObj[e.size]=q.name
			}
		})
	})
	console.log(files.join(","))
	for(let x in nameObj){
		files.forEach((q,i)=>{
			if(q==nameObj[x]){
				files.splice(i,1)
				console.log(i)
			}
		})
	}
	//console.log(files.join(","))
	files.forEach((q,x)=>{
			fs.unlink("./new/"+q,(err,d)=>{
			if(err){
				console.log(1)
			}else{
				console.log(2)
			}
		})
	})

		

		
})