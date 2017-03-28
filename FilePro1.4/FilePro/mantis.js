/**
 * for mantis
 */
$(function(){
	// 图片类型的附件直接新窗口打开 不下载
	if(location.href.indexOf("view.php?") >= 0){
		var td = $("#attachments").parent(".category").siblings("td");
		if(td.find("a img") != ""){
			var ele = td.find("br").next("a");
			for (var i = 0; i < ele.length; i++) {
				if(ele.eq(i).find("img").size() > 0){
					// 是图片
					var src = ele.eq(i).find("img").attr("src");
					if(src.indexOf('images/fileicons') < 0){
						ele.eq(i).attr('href', src).attr('target','_blank');
					}
				}
			}
		}
	}
	// 将bug详情中的注释移动到页面上方，便于查看
	if(location.href.indexOf("view.php?") >= 0){
		if($("#bugnotes").size() > 0){
			$("body").append("<div id='notesList' style='width:35%;padding:0;float:right;'></div>");

			if($("#relationships_open").size() > 0){
				$("#notesList").insertBefore($("#relationships_open").prev("br"));
			}else{
				if($("#relationships_closed").size() > 0 && !$("#relationships_closed").hasClass("hidden")){
					$("#notesList").insertBefore($("#relationships_closed"));
				}
			}

			$("#notesList").prev("table.width100").css({
				'width': '65%',
				'float': 'left',
				'marginBottom': '10px'
			})

			$("#relationships_open").css({
				'clear': 'both',
			})

			$("#bugnotes").appendTo($("#notesList"));
			if($("#bugnote_add_open").size()>0){
				$("#bugnote_add_open").prev("br").appendTo($("#notesList"));
				$("#bugnote_add_open").appendTo($("#notesList"));
			}
			$("#history #history_open").prev("br").appendTo($("#notesList"));
			$("#history #history_open").appendTo($("#notesList"));

			$("#bugnotes").find("br").eq(0).hide().siblings("#bugnotes_open").css('paddingTop', 0);

		}
	}
});