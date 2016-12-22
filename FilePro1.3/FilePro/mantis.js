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
});