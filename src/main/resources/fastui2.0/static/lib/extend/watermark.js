layui.define(['jquery'],function(exports) {
	var $=layui.jquery;
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
			canvas.setAttribute("style", "position:absolute;z-index: -1;");
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
	
	water();
	var watermark = {
		water: water,
	};
	exports("watermark", watermark);
});