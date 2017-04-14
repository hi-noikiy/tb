var fs=require("fs")

fs.readdir("file",(err,files)=>{
   var html="",arr=[],newArr=[];
   files.forEach((e,i)=>{
   		 html+=fs.readFileSync("./file/"+e,'utf8');
   })
   arr=html.split("</li><li>")

   //去除非连接
   arr.forEach((e,i)=>{
         if(e.indexOf("tumblr")!=-1){
            newArr.push(e)
         }
   })
   arr=[];
   //去除重复连接
   newArr.forEach((e,i)=>{
      var canInt=true;
         arr.forEach((q,y)=>{
            if(q==e){
               canInt=false;
            }
         })
         if(canInt){
            arr.push(e);
         }
   })

   console.log(newArr.length,arr.length)

   arr.forEach((e,i)=>{
   		if(i%800==0){
   			let newArr=arr.slice(i,(i+800))
   			/*console.log(newArr.length)
   			let html=+"<li>"+newArr.length+"</li>"+newArr.join("</li><li>")
   			 fs.writeFile('./1000file/total'+i+".html", html, (err) => {
				  console.log('It\'s saved!');
			   });*/
   		}
   })
  
})