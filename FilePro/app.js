var currentDir = ''; //fix file cannot found

(function($){

	$("#header").addClass("scrollBar");
	//$("table").addClass("contentWrap firstWrap");
	
	$("body").append('<div class="firstWrap contentWrap scrollBar"></div><div class="midWrap contentWrap scrollBar"></div><div class="lastWrap contentWrap scrollBar"></div>');
	
	$(".firstWrap, .midWrap, .lastWrap").css({
		'height':$(window).height() - 80
	})
	
	// 修改链接属性和方式
	$("a").each(function(){
		// console.log($(this).hasClass("icon"));
		
		// .icon.up .icon.dir .icon.file
		if($(this).hasClass("icon")){
			$(this).attr("link", $(this).attr("href"));
			$(this).attr("href", "javascript:void(0)");
			
			$(".firstWrap").append($(this));

		}
	})
	
	$(".firstWrap, .midWrap").on("click", "a", function(){
		
		$(this).addClass("highlight").siblings("a").removeClass("highlight");
		
		// 文件
		if($(this).hasClass("file")){
			/*$.get($(this).attr("link"), function(data){
				console.log(data);
				data = "<pre>" + data + "</pre>";
				$(".lastWrap").html(data);
			})*/
			
			var file_name = $(this).text();
			var file_type = ""; // file type
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".txt") + 4){
				// .txt file
				file_type = 'txt';
			}
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".plain") + 6){
				// .plain file
				file_type = 'txt';
			}
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".md") + 3){
				// .md file
				file_type = 'md';
			}
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".html") + 5){
				// .html file
				file_type = 'html';
			}
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".htm") + 4){
				// .html file
				file_type = 'html';
			}
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".jpg") + 4){
				// .jpg file
				file_type = 'img';
			}
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".png") + 4){
				// .png file
				file_type = 'img';
			}
			
			if(file_name.length == file_name.toLowerCase().lastIndexOf(".jpeg") + 5){
				// .jpeg file
				file_type = 'img';
			}
			
			if(file_name.toLowerCase().lastIndexOf(".") == -1){
				file_type = 'txt';
			}
			
			if(file_type == ""){
				$(".lastWrap").html("不支持的文件类型");
				return false;
			}
			
			if(file_type == 'html'){
				// 直接嵌入HTML
				$(".lastWrap").html("<iframe src='" + $(this).attr("link") + "' style='border:0;width:100%;height:100%;'></iframe>");
				return false;
			}
			
			if(file_type == 'img'){
				// 直接嵌入图片
				$(".lastWrap").html('<p>TIP:点击图片查看原图</p><br><img src="' + $(this).attr("link") + '">');
				return false;
			}
			
			$.ajax({
				type: "GET",
				url: $(this).attr("link"),
				success: function(data){
					//console.log(data);
					if(file_type != 'html'){
						data = "<pre>" + data + "</pre>";
					}
					
					$(".lastWrap").html(data);
				},
				error: function(xhr, textStatus, errorThrown) {
					data = "<pre>" + "" + "</pre>";
					$(".lastWrap").html(data);
				}
			});
		}
		
		//文件夹
		if($(this).hasClass("dir")){
			currentDir = $(this).text();
			
			// 如果在第一列，则在第二列显示文件夹内容
			if($(this).parent().hasClass("firstWrap")){
				$.get($(this).attr("link"), function(data){
					// 筛选数据
					data = data.match(/<script>addRow.*<\/script>/g);
					$(".midWrap").html(data);
				})
			}else{
				// 不在第一列，则跳转
				location.href = $(this).attr("link");
			}
		}
		
		//上级目录
		if($(this).hasClass("up")){
			// 如果在第一列，则跳转
			if($(this).parent().hasClass("firstWrap")){
				location.href = $(this).attr("link");
			}else{
				//不处理
			}
		}
			
	})
	
	$(".lastWrap").on("click", "img", function(){
		$(this).toggleClass("big");
	})
	
})(jQuery);

// original functions
function addRow(name, url, isdir,
    size, size_string, date_modified, date_modified_string) {
  if (name == ".")
    return;

  var root = document.location.pathname;
  if (root.substr(-1) !== "/")
    root += "/";

  root += currentDir; //fix file cannot found

  var tbody = document.getElementById("tbody");
  var row = document.createElement("tr");
  var file_cell = document.createElement("td");
  var link = document.createElement("a");

  link.className = isdir ? "icon dir" : "icon file";

  if (name == "..") {
    link.href = root + "..";
    link.innerText = document.getElementById("parentDirText").innerText;
    link.className = "icon up";
    size = 0;
    size_string = "";
    date_modified = 0;
    date_modified_string = "";
  } else {
    if (isdir) {
      name = name + "/";
      url = url + "/";
      size = 0;
      size_string = "";
    } else {
      link.draggable = "true";
      link.addEventListener("dragstart", onDragStart, false);
    }
    link.innerText = name;
    link.href = root + url;
  }
  file_cell.dataset.value = name;
  file_cell.appendChild(link);

  row.appendChild(file_cell);
  //row.appendChild(createCell(size, size_string));
  //row.appendChild(createCell(date_modified, date_modified_string));

  //tbody.appendChild(row);
  
  // 直接添加到第二列
  var contentWrap = document.querySelector(".midWrap");
  link.setAttribute("link", link.getAttribute("href"));
  link.setAttribute("href", "javascript:void(0)");
  contentWrap.appendChild(link);
}

function onDragStart(e) {
  var el = e.srcElement;
  var name = el.innerText.replace(":", "");
  var download_url_data = "application/octet-stream:" + name + ":" + el.href;
  e.dataTransfer.setData("DownloadURL", download_url_data);
  e.dataTransfer.effectAllowed = "copy";
}

function createCell(value, text) {
  var cell = document.createElement("td");
  cell.setAttribute("class", "detailsColumn");
  cell.dataset.value = value;
  cell.innerText = text;
  return cell;
}