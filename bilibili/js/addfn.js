
/* ** showBox(obj) ** */
	function showBox( obj ){
		var $_infoBox = $("#infobox");
		var bHeight = $_infoBox.outerHeight();			// 信息框高度
		var index = $(obj).index();
		var dName = $(obj).parent().attr("dataname");	// 获取数据名
		var data = dataId(dName);
		//window[dName] || allData[dName];		// 根据数据名获取数据对象

		if(!obj.hideBox){
			obj.hideBox = function(){			//  注册隐藏函数供移出调用
				clearTimeout(obj.timer);
				$_infoBox.hide();
				$_infoBox.html("");
			}
		}

		if(data && data[index]){		// 给信息框添加内容
			$_infoBox.html(
				"<div class='i-head'>"+
					"<p class='i-title'>"+ data[index].title +"</p>"+
					"<p class='i-info'>"+
						"<span class='i-user'>"+ data[index].user +"</span>"+
						"<span class='i-time'>"+ data[index].time +"</span>"+
					"</p>"+
				"</div>"+
				"<div class='i-con'>"+
					"<p class='i-img'><img src='"+ data[index].pic +"' alt='' /></p>"+
					"<p class='i-des'>"+ data[index].des +"</p>"+
				"</div>"+
				"<div class='i-data'>"+
					"<p class='i-view'><i></i>"+ toNum(data[index].data.view) +"</p>"+
					"<p class='i-danmaku'><i></i>"+ toNum(data[index].data.danmaku) +"</p>"+
					"<p class='i-favorite'><i></i>"+ toNum(data[index].data.favorite) +"</p>"+
					"<p class='i-coin'><i></i>"+ toNum(data[index].data.coin) +"</p>"+
				"</div>"
			);
		}else{
			return false;
		}

		obj.lTop = $(obj).offset().top - bHeight -10;	// 定位信息
		obj.lLeft = $(obj).offset().left;

		obj.timer = setTimeout(function(){			// 定位及显示
			$_infoBox.css({
				top : obj.lTop+"px",
				left : obj.lLeft+"px"
			});
			$_infoBox.stop().fadeIn(200);
		},300);
	}

/* ** dataId(dName) ** */
	function dataId( dName ){
		if(dName.indexOf("-new")>0){
			var newName = dName.replace("-new","");
			return allNew[newName];
		}else if(dName.indexOf("-7")>0){
			var newName = dName.replace("-7","");
			return allNew[newName];
		}else if(dName.indexOf("-3")>0){
			var newName = dName.replace("-3","");
			return allData[newName];
		}else{
			return allData[dName] || window[dName];
		}
	}

/* ** toNum(num) ** */
	function toNum(num){			// 数字转换
		if(!isNaN(num)){
			return num>=10000 ? parseFloat(num/10000).toFixed(1)+"万" : num;
		}
	}

/* ** danmaku(obj) ** */
	function danMu( obj ){
		var $txtBox = $(obj).find(".danmaku");
		var $text = $txtBox.find("p");			// 获取弹幕
		var tLen = $text.length;
		if(!tLen){			// 没有弹幕时，停止执行
			obj.hideTxt = function(){return false};
			return false;
		};

		var index = 0, _top = 0, _on = true, firstT=null, timeO = null, outTime = null;

		obj.hideTxt = function(){				// 注册隐藏方法供移出调用
			_on = false;
			clearTimeout(firstT);
			clearTimeout(timeO);
			clearTimeout(outTime);
			$text.stop().css({"top":0,"left":"170px"}).each(function(){
				var This = this;
				clearInterval(This.timer);
				this.play = null;				// 清空数据等待回收
			});
		}
		
		firstT = setTimeout(action,1000);
		// action();
		function action(){					// 初始显示两条弹幕
			move();
			timeO = setTimeout(function(){
				move();
			},1000);
		}

		function move(){
			if(index == 0){					// 给初始两条弹幕定义top位置，之后自动获取top值
				_top = "0px";
			}else if(index ==1){
				_top = "15px";
			}else if(index >= tLen){
				clearTimeout(outTime);		// 最后一条弹幕结束后再从头开始一遍
				outTime = setTimeout(function(){
					$text.stop().css({"top":0,"left":"170px"});
					danMu(obj);
				},3000);
				return false;		// 最后一条弹幕发出后不继续生成新的弹幕
			}
			
			$text[index].play = function(){		// 弹幕移动并检测位置
				var This = this;
				var _right = 0;
				$(this).css({"top":_top,left:"170px"}).stop().animate({left:-($(This).width()+10)+"px"},5000,"linear");
				This.timer = setInterval(function(){
					_right = 160-$(This).position().left-$(This).width();
					if(_right >= 40){		// 当该条弹幕移出后右边大于40px时，在该top位置显示下一条弹幕
						clearInterval(This.timer);
						_top = $(This).position().top+"px";
						move();
					}else if(!_on){			// 当鼠标移出时停止检测
						clearInterval(This.timer);
					}
				},200)
			}

			$text[index].play();
			index++;
		}
	}

/* ** addCon(obj1,obj2) ** */
	function addCon(tap, list){
		var $tap = $(tap);
		var $list = $(list);
		var tdName = $tap.attr("dataname");
		var ldName = $list.attr("dataname");
		if(tdName != ldName){
			createCon(tdName, $list);
		}
	}
	/* 创建并添加内容 */
	function createCon(tdName, $list){
		var data = dataId(tdName);
		if(!data) return false;
		$list.html("").attr("dataname",tdName);
		for(var i=0,l=data.length; i<l; i++){
			var _li = document.createElement("li");
			_li.className = "li";
			_li.innerHTML = "<a href='###' title='"+ data[i].title +"'>"+
					"<div class='imgbox'>"+
						"<img src='"+ data[i].pic +"' alt='' />"+ rank(data[i].rank) +
						"<span class='m-time'>"+ data[i].duration +"</span>"+ zimu(data[i].zimu) +
					"</div>"+
					"<div class='m-title'>"+ data[i].title +"</div>"+
					"<div class='m-info'>"+
						"<p class='m-view'><i class='icon'></i>"+ toNum(data[i].data.view) +"</p>"+
						"<p class='m-danmaku'><i class='icon'></i>"+ toNum(data[i].data.danmaku) +"</p>"+
					"</div>"+
				"</a>";
			$list.append(_li);
		}
		// 注册弹窗及字幕滚动事件
		var $li = $list.find("li");
		$li.hover(function(){
			showBox(this);
			danMu(this);
		},function(){
			this.hideBox();
			this.hideTxt();
		})
	}

	/* rank() */
	function rank(strR){
		if( strR ){
			return "<em class='"+ strR +"'></em>";
		}else{
			return "";
		}
	}

	/* zimu() */
	function zimu(arrZ){
		if(arrZ && arrZ.length>0){
			var strZ = "<div class='danmaku'>";
			for(var i=0,l=arrZ.length; i<l; i++){
				strZ += "<p>"+ arrZ[i] +"</p>";
			}
			strZ += "</div>";
			return strZ;
		}else{
			return "";
		}
	}

/* ** addConR(obj1,obj2) ** */
	function addConR(tap, list){
		var $tap = $(tap);
		var $list = $(list);
		var tdName = $tap.attr("dataname");
		var ldName = $list.attr("dataname");
		if(tdName != ldName){
			createConR(tdName, $list);
		}
	}

	function createConR(tdName, $list){
		var data = dataId(tdName);
		if(!data) return false;
		$list.html("").attr("dataname",tdName);
		$list.each(function(){
			for(var i=0; i<7; i++){
				var _li = document.createElement("li");
				if( i==0 ){
					_li.className = "first";
					_li.innerHTML = "<div class='r-num num"+ (i+1) +"'>"+ (i+1) +"</div>"+
						"<a href='###' class='r-img'><img src='"+ data[i].pic +"' title='"+ data[i].title +"' alt='' /></a>"+
						"<a href='###' class='r-main' title='"+ data[i].title +"'>"+
							"<p class='r-title'>"+ data[i].title +"</p>"+
							"<p class='r-info'>综合评分：67.7万</p>"+
						"</a>";
				}else{
					_li.innerHTML = "<div class='r-num num"+ (i+1) +"'>"+ (i+1) +"</div>"+
						"<a href='###' class='r-main' title='"+ data[i].title +"'>"+
							"<p class='r-title'>"+ data[i].title +"</p>"+
						"</a>";
				}
				$(this).append(_li);
			}
		});
		var $li = $list.find("li");
		$li.hover(function(){
			showBox(this);
		},function(){
			this.hideBox();
		})
	}

/* ** MainFn ** */
	/*
		main下面各模块的内容生成及功能实现；
		参数idName：个模块的id名；
	*/
	function MainFn( idName ){
	/* left */
		var This = this;
		this.$tap = $("#"+ idName +" .m-head .h-tap li");
		this.$list = $("#"+ idName +" .m-main .m-list");
		this.dName = this.$tap.eq(0).attr("dataname");
		// 创建元素节点（包含了注册鼠标事件）
		createCon(this.dName, this.$list);
		// 选项卡点击切换（包含了创建元素节点和鼠标事件）
		this.$tap.click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			addCon(this, This.$list);
		})

	/* right */
		this.$tapR = $("#"+ idName +" .m-top .t-list li");
		this.$btn = $("#"+ idName +" .m-top .t-btn");
		this.$slta = this.$btn.find(".t-slt a");
		this.$text = this.$btn.find(".text");
		this.$listBox = $("#"+ idName +" .m-body .b-list");
		this.$team = this.$listBox.find(".b-team");
		this.tdName = this.$slta.eq(0).attr("dataName");
		// 创建元素节点（包含了注册鼠标事件）
		createConR(this.tdName, this.$team);
		// 选项卡切换
		this.$tapR.mouseenter(function(){
			var index = $(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			This.$listBox.animate({marginLeft : -index*260+"px"},150);
		})

		this.$btn.hover(function(){
			$(this).addClass("on");
		},function(){
			$(this).removeClass("on");
		})
		this.$slta.click(function(){
			$(this).addClass("checked").siblings().removeClass("checked");
			This.$text.html($(this).html());
			This.$btn.removeClass("on");
			addConR(this, This.$team);
		})
	}
