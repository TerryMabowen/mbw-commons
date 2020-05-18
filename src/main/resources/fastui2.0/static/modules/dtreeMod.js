layui.define(function(exports) {
	layui.use(['jquery', 'index', 'dtreex','form'], function() {
		var $ = layui.jquery,
			form=layui.form,
			dtreex = layui.dtreex;
		var orgdtree = dtreex.render({
			elem: "#test-dtree",
			method: "get",
			url:layui.setter.base + 'json/tree/dtreeData.js',
			ficon: ["2", "-1"],
			icon: "-1",
			dot: false,
			checkbar: true,
			checkbarType: 'self',
			initLevel: 1,
			toolbarWay: 'fixed',
			toolbar: true,
			toolbarShow: [],
			toolbarExtX: [{
				id: 'selectAll',
				handler: function(checkbarNodesParam) {
					var data;
					var _html = '';
					var nodeIdArr = [];
					for(var i = 0; i < checkbarNodesParam.length; i++) {
						data = checkbarNodesParam[i].context;
						nodeIdArr.push(checkbarNodesParam[i].nodeId);
						if(arr.indexOf(checkbarNodesParam[i].nodeId) != -1) {
							_html += '<li><a href="javascript:;">' + data + '</a><span><input checked type="checkbox" value="' +
								checkbarNodesParam[i].nodeId +
								'" name="switch" lay-filter="childrenDep" lay-skin="switch" lay-text="是|否"></span></li>'
						} else {
							_html += '<li><a href="javascript:;">' + data + '</a><span><input type="checkbox" value="' +
								checkbarNodesParam[i].nodeId +
								'" name="switch" lay-filter="childrenDep" lay-skin="switch" lay-text="是|否"></span></li>'

						}
					}
					var arr1 = [];
					for(var j = 0; j < arr.length; j++) {
						if(nodeIdArr.indexOf(arr[j]) != -1) {
							arr1.push(arr[j]);
						}
					}
					arr = [].concat(arr1);
					$(".fastui-dtree-list").html(_html);

					form.render();
				}
			}],

			checkbarFun: {
				chooseDone: function(checkbarNodesParam) {
					var data;
					var _html = '';
					var nodeIdArr = [];
					for(var i = 0; i < checkbarNodesParam.length; i++) {
						data = checkbarNodesParam[i].context;
						nodeIdArr.push(checkbarNodesParam[i].nodeId);

						if(arr.indexOf(checkbarNodesParam[i].nodeId) != -1) {
							_html += '<li><a href="javascript:;">' + data + '</a><span><input checked type="checkbox" value="' +
								checkbarNodesParam[i].nodeId +
								'" name="switch" lay-filter="childrenDep" lay-skin="switch" lay-text="是|否"></span></li>'

						} else {
							_html += '<li id="' + checkbarNodesParam[i].nodeId + '"><a href="javascript:;">' + data +
								'</a><span><input type="checkbox" value="' + checkbarNodesParam[i].nodeId +
								'" name="switch" lay-filter="childrenDep" lay-skin="switch" lay-text="是|否"></span></li>'
						}
					}
					for(var j = 0; j < arr.length; j++) {
						console.log(nodeIdArr.indexOf(arr[j]))
						if(nodeIdArr.indexOf(arr[j]) == -1) {
							arr.splice(j, 1);
						}
					}
					$(".fastui-dtree-list").html(_html);
					form.render();
				}
			},
		});
		dtreex.on("node(test-dtree)", function(obj) {
			if(!obj.param.leaf) {
				var $div = obj.dom;
				orgdtree.clickSpread($div); //调用内置函数展开节点
			}
		});
		var arr = [];
		form.on('switch(childrenDep)', function(data) {
			if(data.elem.checked) {
				arr.push(data.elem.value)
			} else {
				var switchIndex = arr.indexOf(data.elem.value)
				arr.splice(switchIndex, 1)
			}
		})

	})

	exports('dtreeMod', {})
});