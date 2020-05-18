layui.define(["jquery", 'form'], function(exports) {
	"use strict";
	var $ = layui.$;
	var form = layui.form;
	
	// 初始化form表单
	function resetDefaultValue(filter, object) {
		form.on('radio('+filter+')', function(data){
		  console.log(data.elem); //得到radio原始DOM对象
		  console.log(data.value); //被点击的radio的value值
		}); 
		var formElement = $(".layui-form[lay-filter='" + filter + "']");
		formElement.each(function() {
			var itemForm = $(this);
			layui.each(object, function(key, value) {
				var itemElement = itemForm.find("[name='" + key + "']");
				// 如果对应的表单对象不存在则不执行
				if(itemElement.length === 1){
					switch (itemElement[0].type) {
						case "checkbox":
							itemElement[0].defaultChecked = value;
							break;
						case "select-one":
						case "textarea":
						case "text":
						case "number":
						case "hidden":
							$('*'+ itemElement.selector).val(value);
							break;
					}
				}else{
					$('*'+ itemElement.selector + '[value=' + value + ']').attr('checked','checked');
				}
			})
		});
		form.render(null, filter);
	}
	
	window.resetDefaultValue = resetDefaultValue;
	exports('resetDefaultValue', resetDefaultValue);
});
