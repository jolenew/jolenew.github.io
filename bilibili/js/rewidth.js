/* ** rewidth Fn ** */
	!function(){
		var addtrue = false;
		var reCss = document.createElement("link");
		reCss.rel = "stylesheet";
		reCss.href = "css/resetwidth.css";
		resetW();
		$(window).resize(resetW);
		function resetW(){
			var wWidth = $(window).width();
			if(wWidth > 1420 && !addtrue){		// 当页面宽度大于1420加载加宽样式
				$("head script").eq(0).before(reCss);
				addtrue = true;
			}else if(wWidth <= 1420 && addtrue){
				$(reCss).remove();
				addtrue = false;
			}
		}
	}()
