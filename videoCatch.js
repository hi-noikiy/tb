var fs=require("fs")

fs.readdir("D:/bin/bin/tb",(err,files)=>{
	var sizeArr=[],nameArr=[];
	files.forEach((e,i)=>{
		if(/mp4$/i.test(e)){
			var stat=fs.statSync("D:/bin/bin/tb/"+e)
			sizeArr.push({size:stat.size,name:e})
		}
	})
	fs.writeFile("total.txt",files.join(","),function(){
		console.log("save ok")
	})
	
	sizeArr.forEach((e,i)=>{
		sizeArr.forEach((q,x)=>{
			if(q.size==e.size&&x!=i){
				nameArr.push({v1:q.name,v2:e.name})
			}
		})
	})
	nameArr.forEach((e,i)=>{
		let buffer1=fs.readFileSync('D:/bin/bin/tb/'+e.v1)
		let buffer2=fs.readFileSync('D:/bin/bin/tb/'+e.v2)
		fs.writeFile("D:/bin/bin/new/"+e.v1,buffer1)
		fs.writeFile("D:/bin/bin/new/"+e.v1,buffer2)
	})
	nameArr.forEach((e,i)=>{
		fs.unlink("D:/bin/bin/tb/"+e.v1,(err,d)=>{
			if(err){
				console.log(1)
			}else{
				console.log(2)
			}
		})
		fs.unlink("D:/bin/bin/tb/"+e.v2,(err,d)=>{
			if(err){
				console.log(1)
			}else{
				console.log(2)
			}
		})
	})

		
})