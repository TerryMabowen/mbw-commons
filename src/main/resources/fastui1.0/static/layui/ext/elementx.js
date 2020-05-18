layui.define(['element', 'templatex','jquery'], function(exports) {
	"use strict";
	var $ = layui.$;
	var element = layui.element;
	var templatex = layui.templatex;
	
	var obj = {
		hello : function(word) {
			alert(' hello, ' + word);
		}
	};
	
	var tabIndex=10000;
	
	element.tabReload = function(layfilter, layid, opts) {
	    var title = '.layui-tab-title',
	    		tabElem = $(".layui-tab[lay-filter='" + layfilter + "']"),
	    		titElem = tabElem.children(title);

	    var	liElem = titElem.find(">li[lay-id='" + layid +"']"),
	    		tabItems = tabElem.children('.layui-tab-content').children('.layui-tab-item');
	
		var index = liElem.index();
		var currentTabItem = tabItems.eq(index);
		
		if(opts.url != null) {
			if(opts.target == 'tab') {
				
				var queryParam = {};
				if(opts.queryParam) {
					queryParam = opts.queryParam;
				}
				
				var data = $("<div class='fastui-tab-wrapper'></div>").html("<div class='fastui-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop'>&#xe63d;</div>").prop("outerHTML");
				currentTabItem.html(data);

				$.ajax({
					type:'post',
					url:opts.url,
					data:queryParam,
					success:function(data, status) {
						data = templatex.render(data, {
							container_id: "tab_" + (tabIndex++)
						});
						
						data = $("<div class='fastui-tab-wrapper'></div>").html(data).prop("outerHTML");

						var id = opts.id;
						var title = opts.title;
						
						currentTabItem.html(data);
					},
					datatType:"html"
				});

				return;
			}
		}
	};
	
	element.tabReplace = function(filter, layid, htmlData) {
		var title = '.layui-tab-title',
		tabElem = $(".layui-tab[lay-filter='" + filter + "']"),
		titElem = tabElem.children(title);

		var	liElem = titElem.find(">li[lay-id='" + layid +"']"),
		tabItems = tabElem.children('.layui-tab-content').children('.layui-tab-item');
		
		var index = liElem.index();
		var currentTabItem = tabItems.eq(index);

		currentTabItem.html(htmlData);
	};
	
	exports('elementx', element);
});