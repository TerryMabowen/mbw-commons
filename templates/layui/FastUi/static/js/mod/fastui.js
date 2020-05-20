layui.define(["jquery", "templatex","layer"], function(exports) {
	var $ = layui.$;
	var templatex = layui.templatex;
	var layer=layui.layer;

	Array.prototype.contain = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) {
				return true;
			}
		}
		return false;
	};

	var tabConfig = {};
	tabConfig.opts = {};

	var tabs = [],
		tabIndex = 1000;

	$(".fastui-sidebar .title").on("click", function() {
		$(".fastui-sidebar").toggleClass("fastui-sidebar-min");
	});

	function closeSideBar() {
		$(".fastui-sidebar").toggleClass("fastui-sidebar-min");
	}

	/**
	 * 在主窗口中打开一个新的窗口
	 * opts = {url:'url', target:'tab|iframe|window'}
	 * @param opts
	 */
	function openInTab(opts) {

		var options = opts || {
			target: "tab"
		};

		tabConfig.opts[options.id] = options;

		//tab已经打开
		if (tabs.contain(options.id)) {
			layui.use(['element'], function(element) {
				element.tabChange("fastui-maincontent", options.id);
			});
			return;
		}

		if (options.target == 'tab') {
			layui.use(['elementx', 'layer'], function(element) {
				var layer = layui.layer;

				var data = $("<div class='fastui-tab-wrapper'></div>").html(
					"<div class='fastui-loading layui-icon layui-anim  layui-anim-loop' style='color:#999;text-align:center;font-size:14px;'><img style='width:130px;' src='../static/images/load.gif'><p>玩命加载中<span class='fastui-dot'></span><span class='fastui-dot'></span><span class='fastui-dot'></span></p></div>"
				).prop("outerHTML");

				element.tabAdd("fastui-maincontent", {
					title: options.title,
					content: data,
					id: options.id
				});

				tabs.push(options.id);

				element.tabChange("fastui-maincontent", options.id);

				$.get(options.url, options.queryParam, function(data, status) {
					data = templatex.render(data, {
						container_id: "tab_" + (tabIndex++)
					});
					data = $("<div class='fastui-tab-wrapper'></div>").html(data).prop("outerHTML");
					//replace
					element.tabReplace("fastui-maincontent", options.id, data);
				}, "html");
			});

			return;
		}

		if (options.target == "iframe") {
			var id = options.id,
				url = options.url,
				title = options.title;
			var content = '<iframe data-frameid="' + id +
				'" frameborder="0" name="content" scrolling="auto" height="100%" width="100%" src="' + url + '"></iframe>'

			layui.use(['element'], function(element) {
				if (tabs.contain(id)) {
					element.tabChange("fastui-maincontent", id);
				} else {
					element.tabAdd("fastui-maincontent", {
						title: title,
						content: content,
						id: id
					});
					tabs.push(id);
					element.tabChange("fastui-maincontent", id);
					element.on('tabDelete(fastui-maincontent)', function(data) {
						tabs.splice(data.index - 1, 1);
					});
				}
			});
			return;
		}

		if (options.target == "window") {
			var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1"; //定义弹出窗口的参数  
			if (window.screen) {
				var ah = screen.availHeight - 30;
				var aw = screen.availWidth - 10;
				fulls += ",height=" + ah;
				fulls += ",innerHeight=" + ah;
				fulls += ",width=" + aw;
				fulls += ",innerWidth=" + aw;
				fulls += ",resizable"
			} else {
				fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually  
			}
			window.open(options.url, fulls);
			return;
		}
	}

	function reloadTab(layerId, queryParam) {
		if (tabConfig.opts[layerId] == null) {
			return;
		}

		var opts = tabConfig.opts[layerId];
		layui.use(['elementx'], function(element) {
			if (queryParam) {
				opts.queryParam = queryParam;
			}
			element.tabReload("fastui-maincontent", opts.id, opts);
		});
	}

	function closeInTab(tabId) {
		layui.use(['element'], function(element) {
			element.tabDelete('fastui-maincontent', tabId);
		});
	}

	/**
	 * 初始化fastui 
	 */
	function init() {
		layui.config({
			base: '../static/layui/ext/'
		});
		//绑定
		layui.use(['element'], function(element) {
			element.on('tabDelete(fastui-maincontent)', function(data) {
				tabs.splice(data.index - 1, 1);
				//console.log(data.index);
			});

			element.on('tab(fastui-maincontent)', function() {
				//TODO 触发reload事件
				//var layid = this.getAttribute('lay-id');
				//alert(layid);
			});
		});

		//主菜单和侧边菜单

		$(".fastui-sidebar-all .fastui-pack-up h3 i").click(function() {
			$(".fastui-sidebar-all").toggleClass("fastui-sidebar-up");
			if ($(".fastui-sidebar-all").attr("class") == "fastui-sidebar-all fastui-sidebar-up") {
				$(".fastui-maincontent").stop().animate({
					"left": "136px"
				}, 300);
				$(".fastui-pack-up").stop().animate({
					"width": "48px"
				}, 300);
				$(".fastui-header .fastui-menubar").stop().animate({
					"left": "66px"
				}, 300);
				$(".fastui-logo").stop().animate({
					"width": "64px"
				}, 300);
				$(".fastui-logo img").attr('src', '../static/images/logo1.png');
				$(".fastui-logo-white img").attr('src', '../static/images/logo3.png');
				$(".fastui-logo img").stop().animate({
					"height": "38px"
				}, 300);
				$(".fastui-logo span").css("display", "none");
				$(".fastui-pack-up span").hide();
				$('.fastui-sidebar-up .fastui-silder>li').hover(function() {
					$(this).find('ul').show()
				}, function() {
					$(this).find('ul').hide()
				})
			} else {
				$(".fastui-maincontent").stop().animate({
					"left": "226px"
				}, 300);
				$(".fastui-pack-up").stop().animate({
					"width": "138px"
				}, 300);
				$(".fastui-pack-up span").show();
				$(".fastui-header .fastui-menubar").stop().animate({
					"left": "180px"
				}, 300);
				$(".fastui-logo img").attr('src', '../static/images/logo.png');
				$(".fastui-logo-white img").attr('src', '../static/images/logo2.png');
				$(".fastui-logo").stop().animate({
					"width": "180px"
				}, 300);
				$(".fastui-logo img").stop().animate({
					"height": "23px"
				}, 300);
				$(".fastui-logo span").css("display", "block");
				$('.fastui-silder>li').unbind('mouseenter').unbind('mouseleave');
			}
		})
		//单页面二级菜单
		$("body").on("mouseover", ".fastui-menu-wrapper li", function() {
			$(this).find(".fastui-two-menu").stop().slideDown(200)
		});
		$("body").on("mouseout", ".fastui-menu-wrapper li", function() {
			$(this).find(".fastui-two-menu").stop().slideUp(200)
		});
		//点击搜索事件
		$("body").on("click", ".fastui-toolbar-btn .fastui-btn-slide", function() {
			$(".fastui-seacher-up").stop().slideToggle(500);
		});
		$("body").on("click", ".fastui-seacher-hide", function() {
			$(".fastui-seacher-up").stop().slideUp(500);
		});




		$(".fastui-window-screen").on("click", ".fastui-menuitem", function() {
			$this = $(this);
			fastui.openInTab({
				title: $this.text(),
				url: $this.attr("data-href"),
				target: $this.attr("data-target"),
				id: $this.attr("data-id")
			});
		});

	}

	// 绘制页面水印
	function water() {
		var START_POSITION_X = 0,
			START_POSITION_Y = -50;
		var OFFSET_X = 150,
			OFFSET_Y = 100;

		var name = $("#watermark-current-login-username").val();
		var canvas;
		var positionX = START_POSITION_X,
			positionY = START_POSITION_Y;
		if (!!name) {
			// 绘制水印
			waterMark();
		}

		// 重新绘制水印
		function redrawWaterMark() {
			// 重新绘制水印时，先检测Canvas是否存在，如果不存在则创建一个Canvas对象
			if (!checkCanvasExist()) {
				createCanvas();
			}

			// 绘制Canvas大小
			sizeCanvas();

			// 绘制水印
			waterMark();
		}

		// 绘制Canvas大小
		function sizeCanvas() {
			// 绘制Canvas大小时，先检测Canvas是否存在，如果不存在则创建一个Canvas对象
			if (!checkCanvasExist()) {
				createCanvas();
			}
			// 设置大小并绘制
			canvas.setAttribute("width", $('body').innerWidth());
			canvas.setAttribute("height", $(document).innerHeight() - 3);
			var canvasContext = canvas.getContext("2d");
			canvasContext.fillStyle = "white";
			canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		}

		// 屏幕尺寸变化时，重新绘制水印
		$(window).resize(function() {
			redrawWaterMark();
		});

		// 每隔5秒检测一次Canvas是否存在，如果不存在则创建一个Canvas对象并绘制水印
		setInterval(function() {
			if (!checkCanvasExist()) {
				createCanvas();
				waterMark();
			}
		}, 5000);

		// 检测Canvas是否存在, 存在返回true，不存在返回false
		function checkCanvasExist() {
			return !!document.getElementById("watermark-canvas");
		}

		// 创建一个Canvas对象并加入到body下的第一个节点
		function createCanvas() {
			canvas = document.createElement("canvas");
			canvas.id = "watermark-canvas";
			canvas.setAttribute("class", "fastui-canvas");
			canvas = document.body.insertBefore(canvas, document.body.firstElementChild);
		}

		// 绘制水印
		function waterMark() {
			// 绘制水印时，先检测Canvas是否存在，如果不存在则创建一个Canvas对象
			if (!checkCanvasExist()) {
				createCanvas();
			}

			// 设置Canvas大小
			sizeCanvas();

			// 获取到画笔进行绘制
			var canvasContext = canvas.getContext("2d");
			canvasContext.fillStyle = "white";
			canvasContext.fillRect(0, 0, canvas.width, canvas.height);

			// 设置字体样式
			canvasContext.font = "16px Courier New";
			// 设置字体填充颜色
			canvasContext.fillStyle = "#dcdcdc";

			// 循环画字，先按行，后按列，行满换行，屏满结束
			var isContinue = true;
			while (isContinue) {
				if (positionX < canvas.width || positionY < canvas.height) {
					if (positionX < canvas.width) {
						canvasContext.save();

						canvasContext.translate(positionX, positionY);
						canvasContext.rotate(-Math.PI / 6);

						canvasContext.fillText(name, 0, 0);
						canvasContext.restore();

						positionX += OFFSET_X;
					} else {
						positionX = START_POSITION_X;
						positionY += OFFSET_Y;
					}
				} else {
					isContinue = false;
					positionX = START_POSITION_X;
					positionY = START_POSITION_Y;
				}
			}
		}
	};
	function myBrowser() {
	    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	    if (userAgent.indexOf("Chrome") == -1) {
	    	var browser='<div class="fastui-browser-fixed"><i class="layui-icon layui-icon-tips"></i>建议使用谷歌浏览器<a target="_blank" href="https://www.google.cn/chrome/">去下载</a></div>'
	    	$('body').append(browser)
	    }else{
	    	var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
            function _mime(option, value) {
                var mimeTypes = navigator.mimeTypes;
                for (var mt in mimeTypes) {
                    if (mimeTypes[mt][option] == value) {
                        return true;
                    }
                }
                return false;
            }
            if(is360){
                var browser='<div class="fastui-browser-fixed"><i class="layui-icon layui-icon-tips"></i>建议使用谷歌浏览器<a target="_blank" href="https://www.google.cn/chrome/">去下载</a></div>'
	    		$('body').append(browser)
            }
	    };
	    
	}
	myBrowser();
	var fastui = {
		closeSideBar: closeSideBar,
		openInTab: openInTab,
		closeInTab: closeInTab,
		reloadTab: reloadTab,
		tabConfig: tabConfig,
		water: water,
		myBrowser:myBrowser,
	};
	
	window.fastui = fastui;

	init();
	if(layui.cache.isLoadWatermark){
		water();
	}
	

	exports("fastui", fastui);
});
