/**

 @Name：layuiAdmin iframe版主入口
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */

layui.extend({
	setter: 'config' //配置模块
	,admin: 'lib/admin' //核心模块
	,view: 'lib/view' //视图渲染模块
}).define(['setter', 'admin'], function(exports) {
	var setter = layui.setter
		,element = layui.element
		,admin = layui.admin
		,tabsPage = admin.tabsPage
		,view = layui.view

		//打开标签页
		,openTabsPage = function(url, text) {
			//遍历页签选项卡
			var matchTo, tabs = $('#LAY_app_tabsheader>li'),
				path = url.replace(/(^http(s*):)|(\?[\s\S]*$)/g, '');

			tabs.each(function(index) {
				var li = $(this),
					layid = li.attr('lay-id');

				if(layid === url) {
					matchTo = true;
					tabsPage.index = index;
				}
			});

			text = text || '新标签页';

			if(setter.pageTabs) {
				//如果未在选项卡中匹配到，则追加选项卡
				if(!matchTo) {
					$(APP_BODY).append([
						'<div class="layadmin-tabsbody-item layui-show">', '<iframe src="' + url + '" frameborder="0" class="layadmin-iframe"></iframe>', '</div>'
					].join(''));
					tabsPage.index = tabs.length;
					element.tabAdd(FILTER_TAB_TBAS, {
						title: '<span>' + text + '</span>',
						id: url,
						attr: path
					});
				}
			} else {
				var iframe = admin.tabsBody(admin.tabsPage.index).find('.layadmin-iframe');
				iframe[0].contentWindow.location.href = url;
			}
			//刷新
			
			//定位当前tabs
			element.tabChange(FILTER_TAB_TBAS, url);
			admin.tabsBodyChange(tabsPage.index, {
				url: url,
				text: text
			});
		}
		,refreshAndCloseTabs = function (refreshUrl, closeUrl) {
            //遍历页签选项卡
            var matchTo,
                mathCloseIndex,
                mathCloseTo,
                tabs = $('#LAY_app_tabsheader>li'),
                path = refreshUrl.replace(/(^http(s*):)|(\?[\s\S]*$)/g, '');

            tabs.each(function (index) {
                var li = $(this), layid = li.attr('lay-id');
                if (layid === refreshUrl) {
                    matchTo = true;
                    tabsPage.index = index;
                }
                if (layid == closeUrl) {
                    mathCloseTo = true;
                    mathCloseIndex = index;
                }
            });

            if (mathCloseTo) {
                $('#LAY_app_tabsheader>li').eq(mathCloseIndex).find('.layui-tab-close').trigger('click');
            }

            if (matchTo) {
                //定位当前tabs
                element.tabChange(FILTER_TAB_TBAS, refreshUrl);
                admin.tabsBodyChange(tabsPage.index,
                    {
                        url: refreshUrl,
                        //text: text
                    });
                var iframe = admin.tabsBody(admin.tabsPage.index).find('.layadmin-iframe');
                iframe[0].contentWindow.location.href = refreshUrl;
            } else {
                console.log("调用openTabsPageRefresh没有匹配到url:", refreshUrl, "路径！");
            }
        }
		,getTabsIndex = function (url) {
            //遍历页签选项卡
            var matchTo, tabs = $('#LAY_app_tabsheader>li'), path = url.replace(/(^http(s*):)|(\?[\s\S]*$)/g, '');

            tabs.each(function (index) {
                var li = $(this), layid = li.attr('lay-id');
                if (layid === url) {
                    matchTo = true;
                    tabsPage.index = index;
                }
            });

            if (matchTo) {
                return tabsPage.index;
            } else {
                console.log("调用openTabsPageRefresh没有匹配到url:", url, "路径！");
                return -1;
            }
        }
		,APP_BODY = '#LAY_app_body'
		,FILTER_TAB_TBAS = 'layadmin-layout-tabs'
		,$ = layui.$
		,$win = $(window);

	//初始
	if(admin.screen() < 2) admin.sideFlexible();

	//将模块根路径设置为 controller 目录
	layui.config({
		base: setter.base + 'modules/'
	});

	//扩展 lib 目录下的其它模块
	layui.each(setter.extend, function(index, item) {
		var mods = {};
		mods[item] = '{/}' + setter.base + 'lib/extend/' + item;
		layui.extend(mods);
	});

	view().autoRender();

	//加载公共模块
	layui.use('common');
	
	//角色切换
	$(".fastui-switch-role").hover(function(){
		$(".fastui-switch-role .fastui-role").stop().slideDown(200);
	},function(){
		$(".fastui-switch-role .fastui-role").stop().slideUp(200);
	});
	$(".fastui-switch-role .fastui-role li").on("click",function(){
		var thisRole=$(this).find('a').text();
		$(".fastui-switch-role>a span").html(thisRole)
	});
	//查询的展开收起
	$(".fastui-seachertab-hide").on('click', function() {
		$('.fastui-seachertab-more').stop().slideToggle(600);
		$(this).hide().siblings('.fastui-seachertab-hide').show()
	})
	//状态
	$(".fastui-seacher-type-title").on("click",function(){
		$(this).siblings().show();
		$(this).parent(".fastui-seacher-bg").siblings(".fastui-seacher-bg").find(".fastui-seacher-type-con").hide()
	});
	//隐藏遮罩层
	$(".fastui-loading").hide();
	//面板切换角色
	function stopPropagation(e) {
	    if (e.stopPropagation) 
	      e.stopPropagation();
	    else
	      e.cancelBubble = true;
	};
	$(document).bind('click',function(){
	    $('.fastui-panel-role-list ul').css('display','none');
	});
	$(".fastui-panel-role-list > a").on("click",function(e){
		stopPropagation(e);
		$(".fastui-panel-role-list ul").slideToggle(100);
	});
	
	$(".fastui-panel-role-list").on("click","ul li",function(e){
		var role=$(this).html();
		$(".fastui-role-name").val(role)
	})
	//对外输出
	exports('index', {
		openTabsPage: openTabsPage,
		refreshAndCloseTabs:refreshAndCloseTabs,
		getTabsIndex:getTabsIndex
	});
});