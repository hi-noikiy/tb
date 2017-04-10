
$(function(){
		$.ajax({
			url:"/list"
		}).done(function(d){
			var htmlList=d.map(function(e){
				return "<li>"+e+"</li>"
			})
			$("#list").html(htmlList.join(" "))
		});
	$("#list").on("click","li",function(){
		$("#name").val($(this).html())
	})
})