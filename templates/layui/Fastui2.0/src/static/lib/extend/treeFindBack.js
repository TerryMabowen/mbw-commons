/**
	* version: 0.0.2
	* author: lsy
	* 最近更改: 2019-10-17
	* department选择部门的插件用法
	* 引入插件layui/ext/department.js文件
	* title为弹框标题，必填项
	* type的可选值为single/multiple，必填项
	* url与data二选一，必填项
	* isClick，选填项，只展示不可点击
	* original为带回已经选择的结果数组，没有则为空数组，必填项
	* done事件为确认弹框关闭的回调
	* 使用demo
	department.open({
		title: '选择部门',
		type: 'multiple',
		area: ['650px', '540px'],
		btn: ['确定', '取消'],
		original :[{title: '部门名1', id: 23},{title: '部门名2', id: 24}],
		// url: '',
		data: data,
		isClick: true,
		done: function(res) {
			console.log(res);
		}
	})
**/

layui.define(['jquery', 'form', 'layer', 'tree'], function(exports) {
	"use strict";
	var $ = layui.jquery,
		form = layui.form,
		layer = layui.layer,
		tree = layui.tree,
		_html = '<div class = "layui-row fastui-select-department" > ' +
		'<div class="layui-col-xs6 grid-box">' +
		'<p class="grid-box-header">选择</p>' +
		'<div class="layui-fluid grid-box-body">' +
		'<form class="layui-form">' +
		'<div class="layui-form-item"><input type="text" id="department" class="layui-input" placeholder="请输入部门关键字" autofocus="autofocus" value=""><i class="layui-icon layui-icon-search"></i></div>' +
		'<div class="layui-form-item options-box">' +
		'<div id="select-department-layer"></div>' +
		'<div id="search"></div>' +
		'</div>' +
		'</form>' +
		'</div>' +
		'</div>' +
		'<div class="layui-col-xs6 grid-box">' +
		'<p class="grid-box-header"><span>已选</span><span class="grid-box-header-clear">清空</span></p>' +
		'<div class="layui-fluid  grid-box-body result-box">' +
		'</div>' +
		'</div>' +
		'</div>';

	function close() {
		layer.closeAll();
	}

	function open(e) {
		var options = [];
		if (e.original.length === 0) {
			options = [];
		} else {
			options = e.original;
		}
		var isClick = true;
		if (e.isClick != undefined) {
			isClick = e.isClick;
		}
		var data;
		// 打开弹框
		layer.open({
			type: 1,
			title: e.title,
			content: _html,
			area: e.area == undefined ? ['650px', '540px'] : e.area,
			btn: e.btn == undefined ? ['确定', '取消'] : e.btn,
			scrollbar: false,
			success: function() {
				form.render();
				var _html = '';
				for (var i = 0; i < options.length; i++) {
					_html += '<div class="layui-card">' +
						'<div class="layui-block" data-id="' + options[i].id + '"><span>' + options[i].title +
						'</span><i class="layui-icon layui-icon-add-circle-fine"></i></div>' +
						'</div>';
				}
				$(".fastui-select-department .result-box").append(_html);
				if (e.url == undefined) {
					data = e.data;
					// 渲染部门树结构
					tree.render({
						elem: '#select-department-layer',
						data: data,
						showLine: false,
					});
				} else {
					$.ajax({
						type: 'get',
						url: e.url,
						dataType: 'json',
						success: function(res) {
							data = res.data.json;
							// 渲染部门树结构
							tree.render({
								elem: '#select-department-layer',
								data: data,
								showLine: false,
							});
						},
						error: function(err) {
							layer.alert(err);
						}
					});
				}
			},
			yes: function(index) {
				layer.close(index);
				e.done(options);
				options = [];
			}
		});
		form.render();
		setTimeout(function() {
			$('#department').focus();
		}, 500);
		// 删除已选选项
		$('.fastui-select-department').on('click', '.layui-icon-add-circle-fine', function() {
			var id = $(this).parent().attr('data-id');
			for (var i = 0; i < options.length; i++) {
				if (options[i].id == id) {
					options.splice(i, 1);
				}
			}
			$(this).parent().parent().remove();
		});
		// 递归按字符串查询
		function searchItem(data, word) {
			if (isClick) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].title.indexOf(word) != -1) {
						$(".fastui-select-department #search").append('<div class="layui-block layui-tree-set search-item" data-id="' +
							data[i].id +
							'"><span class="layui-tree-txt">' + data[i].title + '</span></div></div>');
					}
					if (data[i].children != undefined) {
						searchItem(data[i].children, word);
					}
				}
			} else {
				for (var i = 0; i < data.length; i++) {
					if (data[i].title.indexOf(word) != -1 && data[i].children == undefined) {
						$(".fastui-select-department #search").append('<div class="layui-block layui-tree-set search-item" data-id="' +
							data[i].id +
							'"><span class="layui-tree-txt">' + data[i].title + '</span></div></div>');
					} else if (data[i].children != undefined) {
						searchItem(data[i].children, word);
					}
				}
			}
		}
		// 监听input框实现实时搜索
		$('.fastui-select-department').bind('input propertychange', function() {
			var word = $(this).parent().find('input').val();
			if (word == '') {
				$('.fastui-select-department #search').hide();
				$('.fastui-select-department #select-department-layer').show();
			} else {
				$('.fastui-select-department #select-department-layer').hide();
				$('.fastui-select-department #search').show();
				$(".fastui-select-department #search").html('');
				searchItem(data, word);
			}
		})
		// 清空事件
		$('.fastui-select-department').on('click', '.grid-box-header-clear', function() {
			$(this).parents('.grid-box').find('.layui-card').html('');
			$('.fastui-select-department').find('.selected').removeClass('selected');
			options.length = 0;
		})
		// 搜索结果的点击事件
		$('.fastui-select-department').on('click', '.layui-tree-txt', function() {
			var that = $(this);
			var clickTitle = that.text();
			var clickId = parseInt(that.parents('.layui-tree-set').attr('data-id'));
			if (isClick) {
				var str = '<div class="layui-card">' +
					'<div class="layui-block" data-id="' + clickId + '"><span>' + clickTitle +
					'</span><i class="layui-icon layui-icon-add-circle-fine"></i></div>' +
					'</div>';
				if (e.type == 'single') {
					that.parents('.fastui-select-department').find('.selected').removeClass('selected');
					that.addClass('selected');
					$(".fastui-select-department .result-box").empty().append(str);
					options.length = 0;
					options.push({
						title: clickTitle,
						id: clickId
					});
				} else if (e.type == 'multiple') {
					that.addClass('selected');
					if (options.length === 0) {
						$(".fastui-select-department .result-box").append(str);
						options.push({
							title: clickTitle,
							id: clickId
						});
					} else {
						var arr = [];
						for (var i = 0; i < options.length; i++) {
							arr.push(Number(options[i].id));
						}
						if (arr.indexOf(clickId) == -1) {
							$(".fastui-select-department .result-box").append(str);
							options.push({
								title: clickTitle,
								id: clickId
							});
						}
					}
				}
			} else {
				if (that.parents('.layui-tree-entry').siblings().length === 0) {
					var str = '<div class="layui-card">' +
						'<div class="layui-block" data-id="' + clickId + '"><span>' + clickTitle +
						'</span><i class="layui-icon layui-icon-add-circle-fine"></i></div>' +
						'</div>';
					if (e.type == 'single') {
						that.parents('.fastui-select-department').find('.selected').removeClass('selected');
						that.addClass('selected');
						$(".fastui-select-department .result-box").empty().append(str);
						options.length = 0;
						options.push({
							title: clickTitle,
							id: clickId
						});
					} else if (e.type == 'multiple') {
						that.addClass('selected');
						if (options.length === 0) {
							$(".fastui-select-department .result-box").append(str);
							options.push({
								title: clickTitle,
								id: clickId
							});
						} else {
							var arr = [];
							for (var i = 0; i < options.length; i++) {
								arr.push(Number(options[i].id));
							}
							if (arr.indexOf(clickId) == -1) {
								$(".fastui-select-department .result-box").append(str);
								options.push({
									title: clickTitle,
									id: clickId
								});
							}
						}
					}
				}
			}
		})
	}

	var treeFindBack = {
		open: open,
		close: close
	};

	exports('treeFindBack', treeFindBack);
});
