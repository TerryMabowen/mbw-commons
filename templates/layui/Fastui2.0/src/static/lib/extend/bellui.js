layui.define(['jquery','table','lodash','form'], function(exports) {
	"use strict";

	var MODULE = "bellui"
		,$ = layui.jquery
		,form = layui.form
		,table=layui.table
		,_ = layui.lodash;

	//列表框
	var ListBox = function() {
		this.version = '1.0.0';
		this.data = [];
		this.elem = {};
	};

	ListBox.prototype.render = function render(opt) {
		var elem = $(opt.elem),
			data = opt.data || [],
			listSwitch = opt.listSwitch || false,
			onChange = opt.onChange || function() {},
			onItemSwitch = opt.onItemSwitch || function() {};

		this.data = data;
		this.elem = elem;

		if (listSwitch) {
			layui.each(data, function(key, value) {
				if (value.checked) {
					let itemHtml = '<li data-id="' + value.id + '">' +
						'<a href="javascript:;">' + value.name + '</a>' +
						'<span>' +
						'<input checked type="checkbox" value="' + value.id +
						'" name="switch" lay-filter="listItem" lay-skin="switch" lay-text="是|否">' +
						'</span>' +
						'</li>';
					elem.append(itemHtml);
				} else {
					let itemHtml = '<li data-id="' + value.id + '">' +
						'<a href="javascript:;">' + value.name + '</a>' +
						'<span>' +
						'<input type="checkbox" value="' + value.id +
						'" name="switch" lay-filter="listItem" lay-skin="switch" lay-text="是|否">' +
						'</span>' +
						'</li>';
					elem.append(itemHtml);
				}
			});

			var $this = this;
			form.on('switch(listItem)', function(switchData) {
				if (switchData.elem.checked) {
					_.map($this.data, function(item, index) {
						if (item.id == switchData.elem.value) {
							item.checked = true;
						}
					});
				} else {
					_.map($this.data, function(item, index) {
						if (item.id == switchData.elem.value) {
							item.checked = false;
						}
					});
				}
				onItemSwitch({
					id: switchData.elem.value,
					status: switchData.elem.checked
				});
			});


		} else {
			layui.each(data, function(key, value) {
				elem.append("<li value='' data-id='" + value.id + "'><a href='javascript:;'>" +
					value.name + "</a></li>");
			});
		}

		elem.find("li").on("click", function(e) {
			var dataId = $(this).attr("data-id");
			$(this).siblings().removeClass("fastui-this");
			$(this).addClass("fastui-this");
			onChange(dataId);
		});

		form.render();
	}

	ListBox.prototype.getData = function(othis) {
		console.log(othis)
		return this.data;
	}

	ListBox.prototype.getSelectedData = function() {
		let arr = [];
		layui.each(this.data, function(key, value) {
			if (value.checked) {
				arr.push(value);
			}
		})
		return arr;
	}
	
	ListBox.prototype.append = function(item, index) {
		var appendArr=this.data
			,thisData=[]
			,appenduniq=[];
			appenduniq=this.data;
		layui.each(item[0].appendData, function(key, value) {
		    var appendId=[];
		    for(var i = 0; i < appenduniq.length; i++){
		    	appendId.push(appenduniq[i].id)
		    }
		    if(appendId.indexOf(item[0].appendData[key].id) == -1){
	        	if (value.checked) {
					let itemHtml = '<li data-id="' + value.id + '">' +
						'<a href="javascript:;">' + value.name + '</a>' +
						'<span>' +
						'<input checked type="checkbox" value="' + value.id +
						'" name="switch" lay-filter="listItem" lay-skin="switch" lay-text="是|否">' +
						'</span>' +
						'</li>';
					$(item[0].elem).append(itemHtml);
				}else{
					let itemHtml = '<li data-id="' + value.id + '">' +
						'<a href="javascript:;">' + value.name + '</a>' +
						'<span>' +
						'<input type="checkbox" value="' + value.id +
						'" name="switch" lay-filter="listItem" lay-skin="switch" lay-text="是|否">' +
						'</span>' +
						'</li>';
					$(item[0].elem).append(itemHtml);
				}
	        }
			
		})
		thisData=appendArr.concat(item[0].appendData);
		this.data=uniq(thisData);
		form.render()
	}

	ListBox.prototype.remove = function(value) {
		for (var i = 0; i < this.data.length; i++) {
			if (value == this.data[i].id) {
				this.data.splice(i, 1);
				this.elem.find('li[data-id="' + value + '"]').remove();
			}
		}
	}

	var listboxInstance = new ListBox();

	var Select = function() {
		this.version = "1.0.0";
	}

	Select.prototype.render = function(opt) {
		var elem = $(opt.elem),
			data = opt.data || [],
			onChange = opt.onChange || function() {};

		elem.empty();
		// 设置占位提示字? 设置默认值
		layui.each(data, function(key, value) {
			elem.append("<option  value='" + value.id + "'>" + value.name + "</option>");
		});

		form.render();

		form.on('select(' + opt.filter + ')', function(data) {
			onChange(data.value);
		});

	}
	function uniq(array){
	    var temp = [],tempArr=[]; //一个新的临时数组
	    for(var i = 0; i < array.length; i++){
	        if(temp.indexOf(array[i].id) == -1){
	            temp.push(array[i].id);
	            tempArr.push(array[i])
	        }
	    }
	    return tempArr;
	}

	var selectInstance = new Select();
	
	
	
	exports(MODULE, {
		listbox: listboxInstance,
		select: selectInstance
		
	});
});
