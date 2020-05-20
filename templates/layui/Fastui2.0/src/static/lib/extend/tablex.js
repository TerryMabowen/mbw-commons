layui.define(['jquery','table','form'], function(exports) {
	"use strict";

	var MODULE = "tablex"
		,$ = layui.jquery
		,form = layui.form
		,table=layui.table;
	
	//tablex渲染
	function render(e){
		var elem = e.elem
			,url = e.url || ''
			,method = e.method || 'get'
			,where = e.where || {}
			,parseData = e.parseData || function(){}
			,request = e.request || {}
			,response = e.response || {}
			,cols = e.cols
			,toolbar = e.toolbar || false
			,defaultToolbar = e.defaultToolbar || []
			,width = e.width || ''
			,height = e.height || ''
			,cellMinWidth = e.cellMinWidth || '60'
			,limit = e.limit || '10'
			,limits = e.limits || [10,20,30,40,50,60,70,80,90]
			,loading = e.loading || false
			,title = e.title || ''
			,text = e.text || {}
			,autoSort = e.autoSort || true
			,initSort = e.initSort || Object
			,id = e.id || ''
			,skin = e.skin || ''
			,even = e.even || false
			,data = e.data || []
			,page = e.page || false
			,size = e.size || 'sm'
			,done = e.done || function() {};
			
			
		table.render({
			elem: elem
			,url: url
			,size: size
			,width: width
			,height: height
			,cellMinWidth: cellMinWidth
			,limit: limit
			,loading: loading
			,limits: limits
			,toolbar:toolbar
			,defaultToolbar:defaultToolbar
			,id: id
			,skin: skin
			,even: even
			,autoSort: autoSort
			,initSort: initSort
			,text:text
			,cols: cols
			,page: page
			,done:function(res, curr, count){
				$(".layui-table-main tr").each(function (index ,val) {
		            $($(".layui-table-fixed .layui-table-body tbody tr")[index]).height($(val).height());
		            $($(".layui-table-fixed-r .layui-table-body tbody tr")[index]).height($(val).height());
		       });
				$(".layui-table-header tr").each(function (index ,val) {
		            $($(".layui-table-fixed .layui-table-header tr")[index]).height($(val).height());
		            $($(".layui-table-fixed-r .layui-table-header tr")[index]).height($(val).height());
		       });
		       done(res, curr, count)
			}
		})
	};
	//tablex重载
	function reload(e,options){
		var elem = e || ''
			,options = options || {};
		table.reload(elem,options)
	};
	//tablex初始化
	function init(e,obj){
		var elem = e || ''
			,obj = obj || {};
		table.init(elem, obj);
	};
	//tablex监听
	function on(event,callback){
		table.on(event, callback);
	}
	
	
	
	var tablex = {
		render: render,
		reload:reload,
		init:init,
		on:on
	};

	exports(MODULE, tablex);
});
