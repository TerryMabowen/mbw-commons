/**
 * uploadFile插件，封装文件上传
 * @param exports
 * @returns
 */
layui.define(["jquery", "upload"], function(exports) {
	var MODULE = "uploadFile",
		$ = layui.$,
		upload = layui.upload;

	//列表框
	var UploadExcel = function() {
		this.version = '1.0.0';
	};
	var UploadImg = function() {
		this.version = '1.0.0';
	};
	UploadExcel.prototype.render = function(opt) {
		uploadFn(opt);
	}
	UploadImg.prototype.render = function(opt) {
		uploadFn(opt);
	}

	function uploadFn(opt) {
		var elem = $(opt.elem),
			url = opt.url || "",
			accept = opt.accept || 'file',
			acceptMine = opt.acceptMine ||
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
			exts = opt.exts || "xls|xlsx",
			size = opt.size || "10240",
			before = opt.before || function() {},
			success = opt.success || function() {};

		upload.render({
			elem: elem,
			url: url,
			accept: accept,
			acceptMime: acceptMine,
			exts: exts,
			size: size,
			before: before,
			done: function(res) {
				if (res.status === 200) {
					success(res);
				} else {
					layer.confirm(res.message, {
						btn: ["关闭"]
					});
				}
			},
			error: function() {
				layer.confirm("上传失败，请稍后再试", {
					btn: ["关闭"]
				})
			}
		})
	}

	var uploadExcel = new UploadExcel();
	var uploadImg = new UploadImg();

	exports(MODULE, {
		uploadExcel: uploadExcel,
		uploadImg: uploadImg
	});
});
