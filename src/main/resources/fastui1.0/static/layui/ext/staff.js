/**
	* version: 0.0.2
	* author: lsy
	* 最近更改: 2019-10-17
	* staff选择人员的插件用法
	* 引入插件layui/ext/staff.js文件
	* title为弹框标题，必填项
	* type的可选值为single/multiple，必填项
	* url为数据请求接口，必填项
	* * original为带回已经选择的结果数组，没有则为空数组，必填项
	* done事件为确认弹框关闭的回调
	* 使用demo
	staff.open({
		title: '选择部门',
		type: 'multiple',
		area: ['650px', '540px'],
		btn: ['确定', '取消'],
		original :[{title: '员工名1', id: 23},{title: '员工名2', id: 24}],
		url: '',
		done: function(res) {
			console.log(res);
		}
	})
**/
layui.define(['jquery', 'form', 'layer', 'table'], function(exports) {
	"use strict";
	var $ = layui.jquery,
		form = layui.form,
		layer = layui.layer,
		table = layui.table,
		_html = '<div class = "layui-row fastui-select-staff" > ' +
		'<div class="layui-col-xs8 grid-box">' +
		'<p class="grid-box-header">选择</p>' +
		'<div class="layui-fluid grid-box-body">' +
		'<form class="layui-form">' +
		'<div class="layui-form-item"><input type="text" id="staff" class="layui-input" placeholder="请输入员工关键字" autofocus="autofocus" value=""><i class="layui-icon layui-icon-search"></i></div>' +
		'<div class="layui-form-item options-box">' +
		'<div id="staffs"></div>' +
		'<div id="staff-list"><table id="select-staff-layer" lay-filter="select-staff-layer"></table></div>' +
		'</div>' +
		'</form>' +
		'</div>' +
		'</div>' +
		'<div class="layui-col-xs4 grid-box">' +
		'<p class="grid-box-header"><span>已选</span><span class="grid-box-header-clear">清空</span></p>' +
		'<div class="layui-fluid  grid-box-body result-box">' +
		'</div>' +
		'</div>' +
		'</div>';

	function close() {
		layer.closeAll();
	}

	function open(e) {
		var options;
		if (e.original.length === 0) {
			options = [];
		} else {
			options = e.original;
		}
		var data;
		// 打开弹框
		layer.open({
			type: 1,
			title: e.title,
			content: _html,
			// area: e.area == undefined ? ['900px', '640px'] : e.area,
			area: ['900px', '640px'],
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
				$(".fastui-select-staff .result-box").append(_html);
			},
			yes: function(index) {
				layer.close(index);
				e.done(options);
				options = [];
			}
		});
		// 渲染员工列表
		if (e.url == undefined) {
			data = e.data;
			table.render({
				elem: '#select-staff-layer',
				data: e.data,
				size: 'sm',
				page: true,
				limit: 12,
				cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
				cols: [
					[{
						field: 'name',
						title: '用户名',
					}, {
						title: '手机号',
						templet: function(d) {
							return '<span>' + d.phone.substring(0, 3) + 'xxxx' + d.phone.substring(d.phone.length - 4) + '</span>'
						}
					}, {
						field: 'post',
						title: '岗位'
					}, {
						field: 'department',
						title: '部门',
					}]
				],
			});
		} else {
			table.render({
				elem: '#select-staff-layer',
				url: e.url,
				size: 'sm',
				page: true,
				limit: 12,
				cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
				cols: [
					[{
						field: 'name',
						title: '用户名',
					}, {
						title: '手机号',
						templet: function(d) {
							return '<span>' + d.phone.substring(0, 3) + 'xxxx' + d.phone.substring(d.phone.length - 4) + '</span>'
						}
					}, {
						field: 'post',
						title: '岗位'
					}, {
						field: 'department',
						title: '部门',
					}]
				],
			});
		}
		form.render();
		setTimeout(function() {
			$('#staff').focus();
		}, 500);
		// 搜索结果的点击事件
		table.on('row(select-staff-layer)', function(obj) {
			var clickTitle = obj.data.name == undefined ? "" : obj.data.name;
			var clickId = obj.data.id == undefined ? "" : Number(obj.data.id);
			var phone = obj.data.phone == undefined ? "" : obj.data.phone;
			var department = obj.data.department == undefined ? "" : obj.data.department;
			var post = obj.data.post == undefined ? "" : obj.data.post;
			var departmentId = obj.data.departmentId == undefined ? "" : obj.data.departmentId;
			var str = '<div class="layui-card">' +
				'<div class="layui-block" data-id="' + clickId + '"><span>' + clickTitle +
				'</span><i class="layui-icon layui-icon-add-circle-fine"></i></div>' +
				'</div>';
			if (e.type == 'single') {
				obj.tr.addClass('selected').siblings().removeClass('selected');
				$(".fastui-select-staff .result-box").empty().append(str);
				options.length = 0;
				options.push({
					title: clickTitle,
					id: clickId,
					phone: phone,
					post: post,
					department: department,
					departmentId: departmentId
				});
			} else if (e.type == 'multiple') {
				obj.tr.addClass('selected');
				if (options.length === 0) {
					$(".fastui-select-staff .result-box").append(str);
					options.push({
						title: clickTitle,
						id: clickId,
						phone: phone,
						post: post,
						department: department,
						departmentId: departmentId
					});
				} else {
					var arr = [];
					for (var i = 0; i < options.length; i++) {
						arr.push(Number(options[i].id));
					}
					if (arr.indexOf(clickId) == -1) {
						$(".fastui-select-staff .result-box").append(str);
						options.push({
							title: clickTitle,
							id: clickId,
							phone: phone,
							post: post,
							department: department,
							departmentId: departmentId
						});
					}
				}
			}
		})
		// 删除已选选项
		$('.fastui-select-staff').on('click', '.layui-icon-add-circle-fine', function() {
			var id = $(this).parent().attr('data-id');
			for (var i = 0; i < options.length; i++) {
				if (options[i].id == id) {
					options.splice(i, 1);
				}
			}
			$(this).parent().parent().remove();
		});
		// 监听input框实现实时搜索
		function inputClick() {
			var word = $('.fastui-select-staff input').val();
			$(".fastui-select-staff #staff-list").html(
				'<table id="select-staff-layer" lay-filter="select-staff-layer"></table>');
			// 渲染部门树结构
			table.render({
				elem: '#select-staff-layer',
				url: e.url + '&name=' + word,
				size: 'sm',
				page: true,
				limit: 12,
				cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
				cols: [
					[{
						field: 'name',
						title: '用户名',
					}, {
						title: '手机号',
						templet: function(d) {
							return '<span>' + d.phone.substring(0, 3) + 'xxxx' + d.phone.substring(d.phone.length - 4) + '</span>'
						}
					}, {
						field: 'post',
						title: '岗位'
					}, {
						field: 'department',
						title: '部门',
					}]
				],
			});
			table.on('row(select-staff-layer)', function(obj) {
				var clickTitle = obj.data.name == undefined ? "" : obj.data.name;
				var clickId = obj.data.id == undefined ? "" : Number(obj.data.id);
				var phone = obj.data.phone == undefined ? "" : obj.data.phone;
				var department = obj.data.department == undefined ? "" : obj.data.department;
				var post = obj.data.post == undefined ? "" : obj.data.post;
				var departmentId = obj.data.departmentId == undefined ? "" : obj.data.departmentId;
				var str = '<div class="layui-card">' +
					'<div class="layui-block" data-id="' + clickId + '"><span>' + clickTitle +
					'</span><i class="layui-icon layui-icon-add-circle-fine"></i></div>' +
					'</div>';
				if (e.type == 'single') {
					obj.tr.addClass('selected').siblings().removeClass('selected');
					$(".fastui-select-staff .result-box").empty().append(str);
					options.length = 0;
					options.push({
						title: clickTitle,
						id: clickId,
						phone: phone,
						department: department,
						departmentId: departmentId
					});
				} else if (e.type == 'multiple') {
					obj.tr.addClass('selected');
					if (options.length === 0) {
						$(".fastui-select-staff .result-box").append(str);
						options.push({
							title: clickTitle,
							id: clickId,
							phone: phone,
							post: post,
							department: department,
							departmentId: departmentId
						});
					} else {
						var arr = [];
						for (var i = 0; i < options.length; i++) {
							arr.push(Number(options[i].id));
						}
						if (arr.indexOf(clickId) == -1) {
							$(".fastui-select-staff .result-box").append(str);
							options.push({
								title: clickTitle,
								id: clickId,
								phone: phone,
								post: post,
								department: department,
								departmentId: departmentId
							});
						}
					}
				}
			})
		}
		$('.fastui-select-staff').on('click', '.layui-form-item i', function() {
			inputClick();
		})
		$('.fastui-select-staff .layui-form-item input').on('keypress', function(e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				inputClick();
			}
		})
		// 清空事件
		$('.fastui-select-staff').on('click', '.grid-box-header-clear', function() {
			$(this).parents('.grid-box').find('.layui-card').html('');
			$('.fastui-select-staff').find('.selected').removeClass('selected');
			options.length = 0;
		})
		// //监听行单击事件（单击事件为：rowDouble）
		//   table.on('row(select-staff-layer)', function(obj){
		//     var data = obj.data;
		//     
		//     layer.alert(JSON.stringify(data), {
		//       title: '当前行数据：'
		//     });
		//     
		//     //标注选中样式
		//     obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
		//   });

	}

	var staff = {
		open: open,
		close: close
	};

	exports('staff', staff);
});
