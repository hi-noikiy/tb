var fs=require("fs")

fs.readdir("任务组",(err,files)=>{
	var sizeArr=[],nameArr=[];
	files.forEach((e,i)=>{
		if(/mp4$/i.test(e)){
			var stat=fs.statSync("./任务组/"+e)
			sizeArr.push({size:stat.size,name:e})
		}
	})
	
	sizeArr.forEach((e,i)=>{
		sizeArr.forEach((q,x)=>{
			if(q.size==e.size&&x!=i){
				nameArr.push({v1:q.name,v2:e.name})
			}
		})
	})
	nameArr.forEach((e,i)=>{
		let buffer1=fs.readFileSync('./任务组/'+e.v1)
		let buffer2=fs.readFileSync('./任务组/'+e.v2)
		fs.writeFile("./new/"+e.v1,buffer1)
		fs.writeFile("./new/"+e.v1,buffer2)
	})
	nameArr.forEach((e,i)=>{
		fs.unlink("./任务组/"+e.v1,(err,d)=>{
			if(err){
				console.log(1)
			}else{
				console.log(2)
			}
		})
		fs.unlink("./任务组/"+e.v2,(err,d)=>{
			if(err){
				console.log(1)
			}else{
				console.log(2)
			}
		})
	})

		
})