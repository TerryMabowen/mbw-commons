/**

 @Name：layuiAdmin 主页控制台
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：GPL-2
    
 */

layui.define(function(exports) {

	/*
	  下面通过 layui.use 分段加载不同的模块，实现不同区域的同时渲染，从而保证视图的快速呈现
	*/

	//区块轮播切换
	layui.use(['jquery', 'layer', 'index', 'tableFindBack', 'form', 'treeFindBack'], function() {
		var $ = layui.$,
			layer = layui.layer,
			tableFindBack = layui.tableFindBack,
			form = layui.form,
			treeFindBack = layui.treeFindBack;

		var data = [{
			title: '江西',
			id: '1',
			children: [{
				title: '南昌',
				id: 1000,
				children: [{
					title: '青山湖区',
					id: 10001,
					children: [{
						title: '青蛙',
						id: 100011
					}, {
						title: '蝌蚪',
						id: 100012
					}]
				}, {
					title: '高新区',
					id: 10002
				}]
			}, {
				title: '九江',
				id: 1001
			}, {
				title: '赣州',
				id: 1002
			}]
		}, {
			title: '广西',
			id: 2,
			children: [{
				title: '南宁',
				id: 2000
			}, {
				title: '桂林',
				id: 2001
			}]
		}, {
			title: '甘肃',
			id: 3
		}, {
			title: '陕西',
			id: 4,
			children: [{
				title: '西安',
				id: 4000
			}, {
				title: '延安',
				id: 4001
			}]
		}];
		var originals = [{
			name: '智联商品',
			id: 4000
		}];
		var treeOriginal = [{
			title: '智联商品',
			id: 4000
		}];

		$('.department').click(function() {
			treeFindBack.open({
				title: '选择部门',
				type: 'multiple',
				area: ['650px', '540px'],
				btn: ['确定', '取消'],
				original: treeOriginal,
				isClick: false,
				data: data,
				done: function(selOption) {
					var _html = '';
					for(var i = 0; i < selOption.length; i++) {
						_html +=
							'<button class="layui-btn layui-btn-primary fastui-btn-border-blue" data-type="department" data-index="6">' +
							selOption[i].title + '<i class="layui-icon layui-icon-close"></i></button>';
					}
					$('.layui-button-container').html(_html);
				}
			})
		})
		$('#getDepartment').focus(function() {
			treeFindBack.open({
				title: '选择部门',
				type: 'single',
				area: ['650px', '540px'],
				btn: ['确定', '取消'],
				original: treeOriginal,
				data: data,
				done: function(selOption) {
					var _html = '';
					for(var i = 0; i < selOption.length; i++) {
						_html +=
							'<button class="layui-btn layui-btn-primary fastui-btn-border-blue" data-type="department" data-index="6">' +
							selOption[i].title + '<i class="layui-icon layui-icon-close"></i></button>';
					}
					$('.layui-button-container').html(_html);
				}
			})
		})
		$('.layui-button-container').on('click', 'button i', function() {
			$(this).parent('button').remove();
		})
		$('#getStaff').focus(function() {
			tableFindBack.open({
				title: '选择人员',
				type: 'multiple',
				area: ['850px', '700px'],
				original: originals,
				btn: ['确定', '取消'],
				url: '../../../static/json/layer/staff.js',
				header: {
					name: '用户名',
					post: '岗位',
					department: '部门'
				},
				done: function(selOption) {
					var _html = '';
					for(var i = 0; i < selOption.length; i++) {
						_html +=
							'<button class="layui-btn layui-btn-primary fastui-btn-border-blue" data-type="department" data-index="6">' +
							selOption[i].name + '<i class="layui-icon layui-icon-close"></i></button>';
					}

					$('.layui-button-container').html(_html);
				}
			})
		})
		$('.staff').click(function() {
			tableFindBack.open({
				title: '选择人员',
				type: 'multiple',
				area: ['850px', '700px'],
				btn: ['确定', '取消'],
				original: originals,
				url: '../../../static/json/layer/staff.js',
				header: {
					name: '用户名',
					post: '岗位',
					department: '部门'
				},
				done: function(selOption) {
					var _html = '';
					for(var i = 0; i < selOption.length; i++) {
						_html +=
							'<button class="layui-btn layui-btn-primary fastui-btn-border-blue" data-type="department" data-index="6">' +
							selOption[i].name + '<i class="layui-icon layui-icon-close"></i></button>';
					}
					$('.layui-button-container').html(_html);
				}
			})
		});
		function getNextFocus() {
			var oEvent = window.event;
			if (oEvent.keyCode == '9') {
				treeFindBack.close();
				tableFindBack.close();
			}
		}
	});
	

	exports('layerBack', {})
});