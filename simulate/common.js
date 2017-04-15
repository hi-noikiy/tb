function getUrlParam(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return r[2]; return null;
		}
$(function(){
		$.ajax({
			url:"/list"
		}).done(function(d){
			var htmlList=d.map(function(e){
				return "<li rel='"+e.type+"'>"+e.name+"</li>"
			})
			$("#list").html(htmlList.join(" "))
		});
	$("#list").on("click","li",function(){
		$("#name").val($(this).html())
	})
})