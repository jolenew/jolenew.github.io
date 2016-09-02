/* ** tophead ** */
	!function(){
		var $topLib = $("#tophead .top-box .libox");
		var timer = null;
		$topLib.hover(function(){
			clearTimeout(timer);
			$(this).siblings().find(".box").hide();
			$(this).find(".box").fadeIn(80);
		},function(){
			var This = this;
			timer = setTimeout(function(){
				$(This).find(".box").fadeOut(350);
			},400);
		});
	}()

/* ** tophead game ** */
	!function(){
		var $gameBack = $("#tophead .game-box .game-back");
		var $gameNew = $("#tophead .game-box .game-r .game-new li");
		$gameNew.hover(function(){
			var imgLink = $(this).find("a").attr("data-img");
			$gameBack.css("background-image","url("+imgLink+")");
		},function(){
			$gameBack.css("background-image","none");
		});
	}()

/* ** h-banner ** */
	!function(){
		var $bLink = $("#header .h-banner .b-link");
		var $bTitle = $("#header .h-banner .b-title");

		$bLink.hover(function(){
			$bTitle.addClass("on");
		},function(){
			$bTitle.removeClass("on");
		});
	}()

/* ** search ** */
	!function(){
		var $sBox = $("#search .search-box");
		var $sText = $sBox.find("input");
		$sBox.hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		});

		$sText.focus(function(){
			$sBox.addClass("focus");
		});
		$sText.blur(function(){
			$sBox.removeClass("focus");
		});
	}()

/* ** sidebar ** */
	!function(){
		// 定位
		var $sidebox = $("#sidebox");
		var bTop = $sidebox.position().top;
		var bWidth = $sidebox.width();
		var $side = $("#side");
		var sWidth = $side.width();
		var sHeight = $side.height();
		var allWidth = 1096;
		var dsT = $(document).scrollTop();
		size();
		$(window).scroll(function(){
			dsT = $(document).scrollTop();
			size();
		}).resize(function(){
			size();
		})
		function size(){
			var wW = $(window).width();
			var wH = $(window).height();
			wW<allWidth ? $side.addClass("sizew") : $side.removeClass("sizew");
			var num = dsT<bTop ? bTop : 0;
			var _top = wH-sHeight-50;
			if(_top < num) _top = num;
			$side.css("top",_top+"px");
		}

		// 功能
		var $sideA = $("#side .sidebar .tap");
		var $check = $("#side .sidebar .check");
		var $part = $("#main .part");
		var aLen = $sideA.length;
		var pHeight = $part.height();
		var pTop0 = $part.position().top;
		var onoff = true;
		var insort = false;
		
		$sideA.click(function(){
			onoff = false;
			var _index = $(this).index();
			var _top = $(this).position().top;
			$(this).addClass("on").siblings().removeClass("on");
			$check.stop().animate({
				top : _top+"px"
			},200);
			$("html, body").stop().animate({
				scrollTop : $part.eq(_index).position().top+"px"
			},200,function(){
				onoff = true;
			})
		})

		$(window).scroll(toScroll);
		toScroll();

		function toScroll(){			// 滚动条检索判断
			if(onoff && dsT>pTop0-pHeight){
				var n = 0;
				for(var i=0,l=$part.length; i<l; i++){
					var pTop = $part.eq(i).position().top;
					if(dsT<pTop+pHeight/2){
						n = i;
						break;
					}else if((i==l-1) && dsT>=pTop+pHeight/2){
						$sideA.removeClass("on");
						$check.stop().fadeOut(50);
						return;
					}
				}
				var _top = $sideA.eq(n).position().top;
				$sideA.eq(n).addClass("on").siblings().removeClass("on");
				$check.stop().fadeIn(50).animate({
					top : _top+"px"
				},20);
			}else if(dsT<=pTop0-pHeight){
				$sideA.removeClass("on");
				$check.stop().fadeOut(50);
			}
		}
		
		// 排序前奏
		var $sidebar = $("#side .sidebar");
		var $sort = $("#side .sidebar .sort");
		var $sidebg = $("#side .side-bg");
		var $tip = $("#side .tip");

		var $div = $("<div></div>");
		$div.css({
			position : "fixed",
			left : "0",
			top : "0",
			width : "100%",
			height : "100%",
			background : "rgba(0,0,0,.5)",
			zIndex : "70",
			display : "none"
		}).click(function(){
			insort = false;
			$(this).hide();
			$sidebar.removeClass("insort");
			$sidebg.stop().removeClass("show").fadeOut(200);
			$tip.stop().animate({
				top:"30px",
				opacity:"0"
			},200,function(){
				$(this).hide();
			});
		})
		$("body").append($div);		// 添加遮罩层

		$sort.click(function(){		// 点击显示和隐藏排序菜单
			if(!insort){
				insort = !insort;
				$div.show();
				$sidebar.addClass("insort");
				$sidebg.stop().fadeIn(200).addClass("show");
				$tip.css({
					top:"30px",
					opacity:"0",
					display:"block"
				}).stop().animate({
					top:"0",
					opacity:"1",
				},200);
			}else{
				insort = !insort;
				$div.hide();
				$sidebar.removeClass("insort");
				$sidebg.stop().removeClass("show").fadeOut(200);
				$tip.stop().animate({
					top:"30px",
					opacity:"0"
				},200,function(){
					$(this).hide();
				});
			}
		})
		
		// 排序
		$sideA.mousedown(function(e){
			if(insort){
				var This = this;
				var _index = $(this).index();
				var x0 = e.clientX;
				var y0 = e.clientY;
				var y;
				
				$(document).mousemove(function(e){
					var x9 = e.clientX-x0;
					var y9 = e.clientY-y0;
					y = Math.round(y9/32);		// 判断移动时受影响标签的个数
					
					$(This).css({			// 当前标签的位置随鼠标移动
						left : x9+"px",
						top : y9+"px",
						zIndex : 25
					}).siblings().addClass("guodu").css("top",0);		// siblings().css("top",0) 每次移动初始化和复位其他标签的位置
					
					if(_index+y<0){			// 限制标签索引的范围
						y=0-_index;
					}else if(_index+y>aLen-1){
						y=aLen-1-_index;
					}

					if(y<0){		// 移动每个受影响标签的位置
						for(var i=1; i<=-y; i++){
							$sideA.eq(_index-i).css("top","32px")
						}	
					}else if(y>0){
						for(var i=1; i<=y; i++){
							$sideA.eq(_index+i).css("top","-32px")
						}	
					}

				}).mouseup(function(){
					$(this).off("mousemove");
					var toIndex = _index+y;		// 根据受影响标签的个数就能得出当前标签要移动到的位置的索引
					if(y<0){		// 根据最终索引进行元素节点排序
						$sideA.eq(toIndex).before($(This));
						$part.eq(toIndex).before($part.eq(_index));
					}else if(y>0){
						$sideA.eq(toIndex).after($(This));
						$part.eq(toIndex).after($part.eq(_index));
					}
					$sideA.removeClass("guodu").css({		// 复位所有标签相对自身的位置
						left : 0,
						top : 0,
						zIndex : 20
					})	
					$sideA = $("#side .sidebar .tap");		// 由于元素位置发生变化，相应的所以就会改变，所以要重新获取
					$part = $("#main .part");
					toScroll();			// 位置改变要重新判断滚动条检索
					$(this).off("mouseup");
				})
			}
			return false;
		})
		
		// 回顶部
		var $totop = $("#side .totop");
		$totop.click(function(){
			onoff = false;
			$("html, body").stop().animate({
				scrollTop : 0
			},200,function(){
				$sideA.removeClass("on");
				$check.stop().fadeOut(50).css("top","0");
				onoff = true;
			})
		});

		// app 功能
		var $app = $("#side .app");
		var $aInfo = $app.find(".a-info");
		var $aImg = $app.find(".a-img");
		var timer = null;
		var x=0;
		
		$app.hover(function(){
			clearInterval(timer);
			timer = setInterval(function(){
				x++;
				if(x >= 16){
					x = 10;
				}else if(x >= 10){
					$aInfo.stop().fadeIn(150);
				}
				$aImg.css("background-position",-x*80+"px 0px");
			},70);
		},function(){
			clearInterval(timer);
			$aInfo.stop().fadeOut(150);
			timer = setInterval(function(){
				x--;
				if(x <= 0){
					x = 0;
					clearInterval(timer);
				}
				$aImg.css("background-position",-x*80+"px 0px");
			},70);
		})
	}()

/* ** nav ** */
	!function(){
		var $menu = $("#header .menu");
		var $navList = $("#header .menu .nav");
		
		$menu.hover(function(){  // 鼠标移上去提升z-index层级，防止下拉菜单被侧栏挡住
			$(this).addClass("up");
		},function(){
			$(this).removeClass("up");
		});

		function addE(){
			for(var i=0, l=navData.length; i<l; i++){
				var _li = document.createElement("li");
				if(i==0){
					_li.className = "li home";
					_li.innerHTML = "<a class='title' href='###'>首页</a>";
				}else {
					_li.className = "li";
					_li.innerHTML = "<a class='title' href='###'>"+ navData[i].t +"<p class='num'><span>"+ navData[i].n +"</span></p></a>";
					var nMenu = document.createElement("ul");
					nMenu.className = "n-menu";
					for(var j=0, s=navData[i].m.length; j<s; j++){
						var li2 = document.createElement("li");
						li2.innerHTML = "<a href='###'><b>"+ navData[i].m[j] +"<i></i></b></a>";
						nMenu.appendChild(li2);
					}
					_li.appendChild(nMenu);
				}
				$navList.append(_li);
			}
		}
		addE();

		var $navLi = $("#header .nav .li");
		var $menuLi = $("#header .nav .n-menu li");

		$navLi.hover(function(){
			$(this).addClass("on");
		},function(){
			$(this).removeClass("on");
		});

		$menuLi.hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		});
	}()

/* ** event ** */
	!function(){
		var $evLi = $("#header .event .live");
		function addEl(){
			var oul = document.createElement("ul");
			oul.className = "n-menu";
			for(var i=0,l=evData[1].m.length; i<l; i++){
				var oli = document.createElement("li");
				oli.innerHTML = "<li><a href='###'><b>"+ evData[1].m[i] +"<i></i></b></a></li>";
				oul.appendChild(oli);
			}
			$evLi.append(oul);
		}
		addEl();

		var $navLi = $("#header .event .li");
		var $menuLi = $("#header .event .n-menu li");

		$navLi.hover(function(){
			$(this).addClass("on");
		},function(){
			$(this).removeClass("on");
		});

		$menuLi.hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		});
	}()

/* ** banner-l ** */
	!function(){
		var $bannerL = $("#banner .banner-l");
		var $bBox = $bannerL.find(".banner-l-box");
		var lWidth = $bBox.find("li").width();
		var $bTxt = $bannerL.find(".b-title li");
		var $bSLi = $bannerL.find(".slider li");
		var $more = $bannerL.find(".more");
		var timer = null, _index = 0, slen = $bSLi.length;

		$bannerL.hover(function(){
			$more.fadeIn(300);
			clearInterval(timer);
		},function(){
			$more.fadeOut(300);
			play();
		});
		$bSLi.click(function(){
			_index = $(this).index();
			move();
		});

		play();

		function play(){
			timer = setInterval(function(){
				_index++;
				move();
			},5000);
		}

		function move(){
			if(_index < 0){
				_index = slen-1;
			}else if(_index >= slen){
				_index = 0;
			}
			$bSLi.eq(_index).addClass("on").siblings().removeClass("on");
			$bBox.stop().animate({"left":-_index*lWidth+"px"},150);
			$bTxt.eq(_index).fadeIn(150).siblings().fadeOut(150);
		}
	}()

/* ** banner-r ** */
	!function(){
		var $bannerR = $("#banner .banner-r");
		var $bannerUl = $bannerR.find(".banner-r-box ul");
		var $bannerLi = $bannerR.find(".banner-r-box ul li");
		var $bBtns = $bannerR.find(".btn a");
		var ulLen = $bannerUl.length;
		var _index = 0;
		var btxtArr = ["昨日","三日","一周"];
		
		$bannerR.hover(function(){
			$bBtns.stop().fadeIn(150);
		},function(){
			$bBtns.stop().fadeOut(150);
		})
		$bannerLi.hover(function(){
			$(this).find(".back").stop().show();
			$(this).find(".info p").stop().fadeIn(250,"linear");
		},function(){
			$(this).find(".back").stop().fadeOut(250,"linear");
			$(this).find(".info p").stop().hide();
		});

		$bBtns.click(function(){
			var a = $(this).index();
			if(a){
				_index++;
				_index %= ulLen;
			}else{
				_index--;
				if(_index < 0) _index = ulLen-1;
			}
			var x = _index+1;
			x %= ulLen;
			$bannerUl.eq(_index).show().siblings().hide();
			$bBtns.eq(0).html(btxtArr[x]);
			$bBtns.eq(1).html(btxtArr[_index]);
		});
	}()

/* ** promote ** */
	!function(){
		var $lists = $("#promote .m-list .li");
		$lists.hover(function(){
			showBox(this);
			danMu(this);
		},function(){
			this.hideBox();
			this.hideTxt();
		});
	}()

/* ** live ** */
	!function(){
		/* left */
		// addElement
		var $mList = $("#live .m-main .m-list");
		for(var i=0,l=allData.live.length; i<l; i++){
			var _li = document.createElement("li");
			_li.className = "li";
			_li.innerHTML = "<a href='###' title='"+ allData.live[i].title +"'>"+
					"<div class='imgbox'>"+
						"<img src='"+ allData.live[i].pic +"' alt='"+ allData.live[i].title +"' />"+
						"<div class='backg'><span>LIVE</span></div>"+
					"</div>"+
					"<div class='l-title'>"+
						"<div class='face'><img src='"+ allData.live[i].face +"' alt='"+ allData.live[i].user +"' title='"+ allData.live[i].user +"' /></div>"+
						"<p>"+ allData.live[i].title +"</p>"+
					"</div>"+
					"<div class='l-info'>"+
						"<p class='l-upid' title='"+ allData.live[i].user +"'><i class='icon'></i>"+ allData.live[i].user +"</p>"+
						"<p class='l-online'><i class='icon'></i>"+ allData.live[i].online +"</p>"+
					"</div>"+
				"</a>";
			$mList.append(_li);
		}

		// hover
		var $li = $("#live .m-main .li");
		$li.hover(function(){
			$(this).find(".backg").stop().fadeIn(300);
		},function(){
			$(this).find(".backg").stop().fadeOut(300);
		})

		/* right */
		// addElement
		var $ranking = $("#live .m-body .ranking");
		for(var i=0,l=allRanks.live.length; i<l; i++){
			var _li = document.createElement("li");
			_li.innerHTML = "<div class='r-num num"+ (i+1) +"'>"+ (i+1) +"</div>"+
				"<a href='###' class='r-img'><img src='"+ allRanks.live[i].face +"' title='"+ allRanks.live[i].title +"' alt='' /></a>"+
				"<a href='###' class='r-main' title='"+ allRanks.live[i].title +"'>"+
					"<p class='r-title'>"+
						"<span class='r-name'>"+ allRanks.live[i].title +"</span>"+
						"<span class='r-online'>"+ toNum(allRanks.live[i].online) +"</span>"+
					"</p>"+
					"<p class='r-des' title='"+ allRanks.live[i].des +"'>"+ allRanks.live[i].des +"</p>"+
				"</a>";
			$ranking.append(_li);
		}

		// tab change
		var $tList = $("#live .m-top .t-list li");
		var $bList = $("#live .m-body .b-list");
		$tList.click(function(){
			var _index = $(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$bList.stop().animate({
				marginLeft : -_index*260+"px"
			},200)
		});
	}()

/* ** cartoon ** */
	/*
		!function(){
		//* left
			var $tap = $("#cartoon .m-head .h-tap li");
			var $list = $("#cartoon .m-main .m-list");
			var dName = $tap.eq(0).attr("dataname");
			// 创建元素节点（包含了注册鼠标事件）
			createCon(dName, $list);
			// 选项卡点击切换（包含了创建元素节点和鼠标事件）
			$tap.click(function(){
				$(this).addClass("on").siblings().removeClass("on");
				addCon(this, $list);
			})

		//* right
			var $tapR = $("#cartoon .m-top .t-list li");
			var $btn = $("#cartoon .m-top .t-btn");
			var $slta = $btn.find(".t-slt a");
			var $text = $btn.find(".text");
			var $listBox = $("#cartoon .m-body .b-list");
			var $team = $listBox.find(".b-team");
			var tdName = $slta.eq(0).attr("dataName");
			// 创建元素节点（包含了注册鼠标事件）
			createConR(tdName, $team);
			// 选项卡切换
			$tapR.mouseenter(function(){
				var index = $(this).index();
				$(this).addClass("on").siblings().removeClass("on");
				$listBox.animate({marginLeft : -index*260+"px"},150);
			})

			$btn.hover(function(){
				$(this).addClass("on");
			},function(){
				$(this).removeClass("on");
			})
			$slta.click(function(){
				$(this).addClass("checked").siblings().removeClass("checked");
				$text.html($(this).html());
				$btn.removeClass("on");
				addConR(this, $team);
			})
		}()
	*/
	!function(){
		var mainfn = new MainFn("cartoon");
	}()

/* ** fanju ** */
	!function(){
	/* left */
		var $tap = $("#fanju .m-head .h-tap li");
		var $list = $("#fanju .m-main .m-list");
		var dName = $tap.eq(0).attr("dataname");
		// 创建元素节点（包含了注册鼠标事件）
		createCon(dName, $list);
		// 选项卡点击切换（包含了创建元素节点和鼠标事件）
		$tap.click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			addCon(this, $list);
		})

	/* right */
		var $btn = $("#fanju .m-top .t-btn");
		var $slta = $btn.find(".t-slt a");
		var $text = $btn.find(".text");
		var $listBox = $("#fanju .m-body .b-list");
		var $team = $listBox.find(".b-team");
		var tdName = $slta.eq(0).attr("dataName");
		// 创建元素节点（包含了注册鼠标事件）
		createConR(tdName, $team);

		$btn.hover(function(){
			$(this).addClass("on");
		},function(){
			$(this).removeClass("on");
		})
		$slta.click(function(){
			$(this).addClass("checked").siblings().removeClass("checked");
			$text.html($(this).html());
			$btn.removeClass("on");
			addConR(this, $team);
		})
	}()
	
	/* newbox */
	!function(){
		//	添加元素
		var $newUl = $("#fanju .f-newbox .f-box ul");
		var fanNum = 0;		// 当前列表的序列号

		addFan();
		function addFan(){
			$newUl.html("");	// 清空内容
			var fData = fannew[fanNum];
			for(var i=0,l=fData.length; i<l; i++){
				var _li = document.createElement("li");
				if(fData[i].isnew) _li.className = "new";
				_li.innerHTML = "<div class='f-img'><a href='###' title='"+ fData[i].title +"'><img src='"+ fData[i].pic +"' alt='' /></a></div>"+
					"<div class='f-con'>"+
						"<p class='f-title'><a href='###' title='"+ fData[i].title +"'>"+ fData[i].title +"</a></p>"+
						"<p class='f-info'>更新至<span>"+ fData[i].num +"话</span></p>"+
					"</div>";
				$newUl.append(_li);		// 添加内容
			}
		}
		// 选项卡切换
		var $newli = $("#fanju .f-newbox .m-head li");
		$newli.click(function(){
			var _index = $(this).index();
			if(_index != fanNum){
				fanNum = _index;
				$(this).addClass("on").siblings().removeClass("on");
				addFan();
			}
		})
	}()
		
	/* banner区域 */
	!function(){
		var $banner = $("#fanju .f-newbox .f-banner");
		var $box = $banner.find(".b-box");
		var $title = $banner.find(".b-title p");
		var $slider = $banner.find(".slider-box li");
		var _index = 0, timer = null;
		
		$slider.mouseenter(function(){
			_index = $(this).index();
			move();
		})
		auto();

		$banner.hover(function(){
			clearInterval(timer);
		},function(){
			auto();
		})

		function auto(){
			timer = setInterval(function(){
				_index++;
				_index %= 3;
				move();
			},5000);
		}
		function move(){
			$box.stop().animate({left:-_index*260+"px"},200);
			$slider.eq(_index).addClass("on").siblings().removeClass("on");
			$title.eq(_index).stop().fadeIn(100).siblings().stop().fadeOut(50);
		}
	}()

/* ** music ** */
	!function(){
		var mainfn = new MainFn("music");
	}()

/* ** dance ** */
	!function(){
		var mainfn = new MainFn("dance");
	}()

/* ** game ** */
	!function(){
		var mainfn = new MainFn("game");
	}()

/* ** science ** */
	!function(){
		var mainfn = new MainFn("science");
	}()

/* ** life ** */
	!function(){
		var mainfn = new MainFn("life");
		/* hotlife */
		var $lists = $("#life .hotlife .hotlist .li");
		$lists.hover(function(){
			showBox(this);
		},function(){
			this.hideBox();
		});
		// 列表切换
		var $main = $("#life .hotlife .m-main");
		var $listbox = $main.find(".hotlist");
		var $btn = $main.find(".hot-btn");
		var $btnA = $main.find(".hot-btn a");
		var liL = $lists.length;  // 列表个数
		var allW = liL*($lists.width()+20);  // 列表总宽度（加上margin）
		var boxL = 0;	// $listbox的left值
		
		$main.hover(function(){
			$btn.show();
		},function(){
			$btn.hide();
		});
		$btnA.click(function(){
			move.call(this);  // 点击执行move函数，并指向当前点击的按钮
		});

		function move(){
			var mainW = $main.width()+20;  // 要展示的宽度（要加一个看不见的margin）
			var overW = allW-boxL-mainW;  // 右边剩余（还没展示）的宽度
			var r = Math.min(overW, mainW);  // 当右边剩余的宽度够一个展示的宽度时，移动一个展示的宽度；反之移动剩余的宽度
			var l = Math.min(boxL, mainW);  // 同上（这里是判断左边的宽度）

			if($(this).index()){  // 根据当前点击的对象的索引判断是左按钮或右按钮
				boxL += r;
				$listbox.stop().animate({left:-boxL+"px"},200);
			}else{
				boxL -= l;
				$listbox.stop().animate({left:-boxL+"px"},200);
			}

			overW = allW-boxL-mainW;  // 移动之后更新剩余宽度，并进行下面的判断是否显示按钮

			if(boxL <= 0){  // 当left值为0时，隐藏左边按钮
				$btnA.eq(0).removeClass("show");
			}else{
				$btnA.eq(0).addClass("show");
			}
			if(overW <= 0){  // 当剩余宽度为0时，隐藏右边按钮
				$btnA.eq(1).removeClass("show");
			}else{
				$btnA.eq(1).addClass("show");
			}
		}
	}()

/* ** kichiku ** */
	!function(){
		var mainfn = new MainFn("kichiku");
	}()

/* ** fashion ** */
	!function(){
		var mainfn = new MainFn("fashion");
	}()

/* ** yule ** */
	!function(){
		var mainfn = new MainFn("yule");
	}()

/* ** movie ** */
	!function(){
		var mainfn = new MainFn("movie");
	}()

/* ** tvju ** */
	!function(){
		var mainfn = new MainFn("tvju");
	}()

/* ** special ** */
	!function(){
		var $lists = $("#special .m-list .li");
		$lists.hover(function(){
			showBox(this);
		},function(){
			this.hideBox();
		});
	}()
