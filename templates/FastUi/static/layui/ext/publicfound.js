layui.define(["jquery"], function(exports){
	var $ = layui.$;
	//工作台右侧弹出
	//点击弹出右侧侧边栏
	$(".fastui-left-side").on('click',function() {
		$(".fastui-side").stop().fadeIn(200);
		$("body").css("overflow","hidden")
	});
	//点击黑色背景右侧侧边栏消失
	$(".fastui-side-html").on('click','.fastui-block-bg',function() {
		$(".fastui-side").css("display", "none")
		$("body").css("overflow","")
	})
	//点击缩进按钮右侧侧边栏消失
	$(".fastui-side-html").on('click','h2',function(){
		$(".fastui-side").css("display", "none")
		$("body").css("overflow","")
	})
	//消息右侧弹出
	//点击弹出右侧侧边栏
	$(".fastui-left-side-news").on('click',function() {
		$(".fastui-side-news").stop().fadeIn(200);
		$("body").css("overflow","hidden")
	});
	//点击黑色背景右侧侧边栏消失
	$(".fastui-side-news-html").on('click','.fastui-block-bg',function() {
		$(".fastui-side-news").css("display", "none");
		$("body").css("overflow","")
	})
	//点击缩进按钮右侧侧边栏消失
	$(".fastui-side-news-html").on('click','h2 i',function(){
		$(".fastui-side-news").css("display", "none");
		$("body").css("overflow","")
	});
	//消息tab已读未读切换
	$(".fastui-side-news-html").on('click','.fastui-side-newtitle a',function(){
		var i=$(this).index()-1;
		$(".fastui-side-news-html").find(".fastui-side-newcon").children(".layui-tab-brief").eq(i).show().siblings(".layui-tab-brief").hide();
		$(this).addClass("fastui-this").siblings('a').removeClass("fastui-this");
	});
	
	//查询的展开收起
	$(".fastui-seachertab-hide").on('click',function(){
		$('.fastui-seachertab-more').toggle(500);
		$(this).hide().siblings('.fastui-seachertab-hide').show()
	})
	//状态更换
	$(".fastui-seachertab .fastui-seachertab-right").on('click','.fastui-short-seachertab .fastui-seachertab-title',function(){
		if(!$(this).hasClass('fastui-seacherwidth-title')){
			$(this).parent().addClass('fastui-short-seachertab-three')
			.removeClass('fastui-short-seachertab')
			.siblings('.fastui-short-seachertab-three')
			.addClass('fastui-short-seachertab')
			.removeClass('fastui-short-seachertab-three');
		}
	})
	$(".fastui-seachertab .fastui-seachertab-right").on('click','.fastui-short-seachertab-two .fastui-seachertab-title',function(){
		if(!$(this).hasClass('fastui-seacherwidth-title')){
			$(this).parent().addClass('fastui-short-seachertab-three')
			.removeClass('fastui-short-seachertab-two')
			.siblings('.fastui-short-seachertab-three')
			.addClass('fastui-short-seachertab-two')
			.removeClass('fastui-short-seachertab-three');
		}
	})
	//点击选中
	$('.fastui-seachertab-total,.fastui-short-seachertab .fastui-seachertab-con >div,.fastui-short-seachertab-two .fastui-seachertab-con >div,.fastui-seachertab-con >div .fastui-seacher-dateil a,.fastui-short-seachertab-three .fastui-seachertab-con >div .fastui-seachertab-dateiltit').on('click',function(e){
		e.stopPropagation();
		var that = $(this);
		$('.fastui-seachertab').find('.fastui-this').removeClass('fastui-this');
		that.addClass('fastui-this');
	});
	
	
	//表格中的更多的下拉效果
	$("body").on('mouseover','.fastui-dropdown',function(){
		$(this).find(".fastui-dropdown-menu")
		.stop().slideDown(100)
		.parents('tr').siblings().find(".fastui-dropdown-menu").hide();
	})
	$("body").on('mouseout','.fastui-dropdown',function(){
		$(this).find(".fastui-dropdown-menu")
		.stop().slideUp(100)
	})
	
	
	
	//人力中台
	$(".fastui-side").on('click','.fastui-block-bg',function() {
		$(".fastui-side").css("display", "none")
		$("body").css("overflow","")
	})
	//点击缩进按钮右侧侧边栏消失
	$(".fastui-side").on('click','h2',function(){
		$(".fastui-side").css("display", "none")
		$("body").css("overflow","")
	})

	/**
	 * Layui Form表单扩展方法，默认值赋值
	 * Layui Form中只有form.val()表单初始赋值功能，没有默认值赋值功能。自己实现一个
	 *
	 * @param filter 表单的filter
	 * @param object 将name=""的值做为json参数对象传入
	 *
	 * Created by haoyun.zheng
	 * Created at 2019.07.30
	 */
	function setupDefaultValue(filter, object) {
		var formElement = $(".layui-form[lay-filter='" + filter + "']");
		formElement.each(function () {
			var itemForm = $(this);
			layui.each(object, function (key, value) {
				var itemElement = itemForm.find("[name='" + key + "']");

				// 如果对应的表单对象不存在则不执行
				if (!itemElement[0]) {
					return;
				}

				switch (itemElement[0].type) {
					case "checkbox":
						itemElement[0].defaultChecked = value;
						break;
					case "select-one":
						layui.each(itemElement[0].children, function (v, element) {
							if (value.toString() === element.value.toString()) {
								element.selected = true;
								element.defaultSelected = true;
							} else {
								element.selected = false;
								element.defaultSelected = false;
							}
						});
						break;
					case "text":
					case "hidden":
						itemElement[0].defaultValue = value;
						itemElement.val(value);
						break;
				}
			})
		});
		form.render(null, filter);
	}

    var publicfound = {
        setupDefaultValue: setupDefaultValue
    };
	
	
	window.publicfound = publicfound;
	
	
	
	
	
	exports("publicfound", publicfound);
});