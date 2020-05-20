layui.define(['dtree', 'jquery'], function(exports) {
	"use strict";
	var dtree = layui.dtree;
	var $ = layui.$;
	
	var dtreex = {
		// toolbar扩展功能
		toolbar: {
			// 全选功能: 所有根节点的工具栏添加'全选'按钮,所有节点启用复选框
			selectAll: function(params) {
				// 处理 params.toolbarFun 参数
				if (!params.toolbarFun) {
					params.toolbarFun = {};
				}
				if (!params.toolbarFun.loadToolbarBefore) {
					params.toolbarFun.loadToolbarBefore = function(buttons, param, $div) {
						return buttons;
					}
				}
				params.toolbarFun.loadToolbarBefore = (function(fn) {
					return function(buttons, param, $div) {
						var btns = fn.call(treeObj, buttons, param, $div);
						if(param.leaf) { // 如果是叶子节点
							delete btns.selectAll; // 取消新增功能
						} else {
							btns.selectAll = '<a dtree-tool="selectAll" title="全选">全选</a>'
						}
						return btns;
					};
				})(params.toolbarFun.loadToolbarBefore);
				
				// 处理 params.toolbarExt 参数
				if (!params.toolbarExt) {
					params.toolbarExt = [];
				}
				params.toolbarExt.push({
					toolbarId: "selectAll",
					icon: "dtree-icon-wefill",
					title: "全选",
					handler: function(node, ele) {
						if($(ele).find(".dtree-toolbar-fixed a").attr('title') == '全选') {
							var nodeId = node.nodeId;
							var childrenNode = treeObj.getChildParam(node.nodeId);
							var $childcheckbar;
							var $checkbar = treeObj.getNodeDom(nodeId).checkbox();
							treeObj.checkStatus($checkbar).check(); // 当前复选框选中
							for(var i = 0; i < childrenNode.length; i++) {
								var childNodeId = childrenNode[i].nodeId;
								$childcheckbar = treeObj.getNodeDom(childNodeId).checkbox();
								treeObj.checkStatus($childcheckbar).check(); // 当前复选框选中
							}
							$(ele).closest('.d-click-checkbar').find(".dtree-toolbar-fixed a").html('全不选');
							$(ele).closest('.d-click-checkbar').find(".dtree-toolbar-fixed a").attr('title', '全不选');
						} else {
							var nodeId = node.nodeId;
							var childrenNode = treeObj.getChildParam(node.nodeId);
							var $childcheckbar;
							var $checkbar = treeObj.getNodeDom(nodeId).checkbox();
							treeObj.checkStatus($checkbar).noCheck(); // 当前复选框不选中
							for(var i = 0; i < childrenNode.length; i++) {
								var childNodeId = childrenNode[i].nodeId;
								$childcheckbar = treeObj.getNodeDom(childNodeId).checkbox();
								treeObj.checkStatus($childcheckbar).noCheck(); // 当前复选框不选中
							}
							$(ele).closest('.d-click-checkbar').find(".dtree-toolbar-fixed a").html('全选');
							$(ele).find(".dtree-toolbar-fixed a").attr('title', '全选');
						}
						// find event handler
						for (var i = 0; i < params.toolbarExtX.length; i++) {
							var ext = params.toolbarExtX[i];
							if (ext.id == 'selectAll' && typeof ext.handler == 'function') {
								ext.handler.call(treeObj, treeObj.getCheckbarNodesParam());
								break;
							}
						}
					}
				});
			}
		}
	};
	var treeObj;
	dtree.render = (function(render) {
		return function(param) {
			if (param.toolbarExtX) {
				for (var i = 0; i < param.toolbarExtX.length; i++) {
					var ext = param.toolbarExtX[i];
					var hasExt = dtreex.toolbar[ext.id]
					if (hasExt) {
						hasExt.call(dtreex, param);
					}
				}
			}
			treeObj = render(param);
			return treeObj;
		}
	})(dtree.render);
	
	exports('dtreex', dtree);
})