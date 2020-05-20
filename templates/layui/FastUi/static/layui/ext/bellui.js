layui.define("lodash", function(exports) {
	"use strict";

	var MODULE = "bellui",
		$ = layui.jquery,
		form = layui.form,
		_ = layui.lodash;

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

	ListBox.prototype.getData = function() {
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
		var index = index || this.data.length;
		if (item.length == 1) {
			let addItem = item[0];
			let addHtml = "";
			if (addItem.checked) {
				addHtml = '<li data-id="' + addItem.id + '">' +
					'<a href="javascript:;">' + addItem.name + '</a>' +
					'<span>' +
					'<input checked type="checkbox" value="' + addItem.id +
					'" name="switch" lay-filter="listItem" lay-skin="switch" lay-text="是|否">' +
					'</span>' +
					'</li>';
			} else {
				addHtml = '<li data-id="' + addItem.id + '">' +
					'<a href="javascript:;">' + addItem.name + '</a>' +
					'<span>' +
					'<input type="checkbox" value="' + addItem.id +
					'" name="switch" lay-filter="listItem" lay-skin="switch" lay-text="是|否">' +
					'</span>' +
					'</li>';
			}
			if (JSON.stringify(this.data).indexOf(JSON.stringify(addItem)) == -1) {
				this.data.splice(index, 0, item[0]);
				this.elem.find('li:nth-child(' + index + ')').after(addHtml);
				form.render();
			}
		} else {
			item.unshift(2, 0);
			Array.prototype.splice.apply(this.data, item);
			this.data = _.uniqWith(this.data, _.isEqual);
			console.log(this.data);
			// TODO 页面追加元素列表
		}
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
			placeholder = opt.placeholder || "请选择",
			filter = opt.filter || '',
			select = opt.select || '',
			data = opt.data || [],
			onChange = opt.onChange || function() {},
			fail = opt.fail || function() {};

		elem.empty();
		if (filter == '') {
			fail('选择框filter不能为空,选择框绑定事件未生效');
		} else {
			elem.append("<option  value=''>" + placeholder + "</option>");
			if (select == '') {
				layui.each(data, function(key, value) {
					elem.append("<option  value='" + value.id + "'>" + value.name + "</option>");
				});
			} else {
				layui.each(data, function(key, value) {
					if (value.id == select) {
						elem.append("<option selected='selected' value='" + value.id + "'>" + value.name + "</option>");
					} else {
						elem.append("<option value='" + value.id + "'>" + value.name + "</option>");
					}
				});
			}

			form.render();
			form.on('select(' + filter + ')', function(data) {
				onChange(data.value);
			});
		}

	}

	var selectInstance = new Select();

	exports(MODULE, {
		listbox: listboxInstance,
		select: selectInstance
	});
});
