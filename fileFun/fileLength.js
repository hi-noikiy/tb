/*运行直接对比本地文件 及抓取目录 剩余未重复的文件*/

var fs=require("fs")
let time1=new Date().getTime()
fs.readdir("file",(err,files)=>{
   var html="",arr=[],newArr=[];
   files.forEach((e,i)=>{
   		 html+=fs.readFileSync("./file/"+e,'utf8');
   })
   arr=html.split("</li><li>")

   //已下载列表
   var downArr=fs.readdirSync("D:/bin/bin/tb")
   console.log(downArr)

   //去除非连接
   arr.forEach((e,i)=>{
         if(e.indexOf("tumblr")!=-1){
            var canInt=true;
            newArr.forEach((q,y)=>{
               if(q==e){
                  canInt=false;
               }
            })

            //去除已下载链接
            downArr.forEach((q,y)=>{
               if(e.indexOf(q)!=-1){
                  canInt=false;
               }
            })
            if(canInt){
               newArr.push(e);
            }
         }
   })


   console.log(newArr.length,arr.length)

   newArr.forEach((e,i)=>{
   		if(i%800==0){
   			let arr=newArr.slice(i,(i+800))
   			let html="<li>"+arr.length+"</li>"+arr.join("</li><li>")
   			 fs.writeFile('./1000file/total'+i+".html", html, (err) => {
				  console.log('It\'s saved!');
			   });
   		}
   })
   let time=new Date().getTime()
   console.log((time-time1)/1000+"s")
  
})