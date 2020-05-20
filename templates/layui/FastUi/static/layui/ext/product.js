/**
 * version: 1.0.1
 * author: lsy
 * 最近更改: 2019-10-21
 * product选择商品的插件用法
 * 引入插件layui/ext/product.js文件
 * title为弹框标题，必填项
 * url为数据请求接口，必填项
 * * original为带回已经选择的结果数组，没有则为空数组，必填项
 * done事件为确认弹框关闭的回调
 * 使用demo
 product.open({
  title: '选择部门',
  area: ['650px', '540px'],
  btn: ['确定', '取消'],
  original :[{title: '员工名1', id: 23}],
  url: '',
  done: function(res) {
   console.log(res);
  }
 })
 **/
layui.define(['jquery', 'form', 'layer', 'table'], function(exports) {
    "use strict";
    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        table = layui.table,
        _html = '<div class = "layui-row fastui-select-product" > ' +
            '<div class="layui-col-xs12 grid-box">' +
            '<div class="layui-fluid grid-box-body">' +
            '<form class="layui-form">' +
            '<div class="layui-form-item"><input style="width:initial;display:inline-block;" type="text" id="product" class="layui-input" placeholder="请输入员工关键字" autofocus="autofocus" value=""><i class="layui-icon layui-icon-search"></i><button type="button" class="layui-btn fastui-btn fastui-btn-sky" id="product-search">查询</button><button type="reset" class="layui-btn layui-btn-primary" style="margin-left:0px;">重置</button></div>' +
            '<div class="layui-form-item options-box">' +
            '<div id="products"></div>' +
            '<div id="product-list"><table id="select-product-layer" lay-filter="select-product-layer"></table></div>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>';

    function close() {
        layer.closeAll();
    }

    function open(e) {
        var options;
        if (e.original.length === 0) {
            options = [];
        } else {
            options = e.original;
        }
        var data;
        // 打开弹框
        layer.open({
            type: 1,
            title: e.title,
            content: _html,
			scrollbar: false,
            // area: e.area == undefined ? ['900px', '640px'] : e.area,
            area: ['600px', '560px'],
            btn: e.btn == undefined ? ['确定', '取消'] : e.btn,
            success: function() {
                if(options.length != 0){
                    $('#product').val(options[0].title);
                }
                form.render();
            },
            yes: function(index) {
                layer.close(index);
                e.done(options);
                options = [];
            }
        });
        // 渲染员工列表
        if (e.url == undefined) {
            data = e.data;
            table.render({
                elem: '#select-product-layer',
                data: e.data,
                size: 'sm',
                page: true,
                limit: 20,
                cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                cols: [
                    [{
                        field: 'id',
                        width: 80,
                        title: '编号'
                    }, {
                        field: 'name',
                        title: '商品名称'
                    }, {
                        field: 'price',
                        width: 120,
                        title: '商品价格'
                    }]
                ],
            });
        } else {
            table.render({
                elem: '#select-product-layer',
                url: e.url,
                size: 'sm',
                page: true,
                limit: 10,
                cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                cols: [
                    [{
                        field: 'id',
                        width: 80,
                        title: '编号'
                    }, {
                        field: 'name',
                        title: '商品名称'
                    }, {
                        field: 'price',
                        width: 120,
                        title: '商品价格'
                    }]
                ],
            });
        }
        form.render();
        setTimeout(function() {
            $('#product').focus();
        }, 500);
        // 搜索结果的点击事件
        table.on('row(select-product-layer)', function(obj) {
            var clickTitle = obj.data.name == undefined ? "" : obj.data.name;
            var clickId = obj.data.id == undefined ? "" : Number(obj.data.id);
            var price = obj.data.price == undefined ? "" : Number(obj.data.price);
            obj.tr.addClass('selected').siblings().removeClass('selected');
            options.length = 0;
            options.push({
                title: clickTitle,
                id: clickId,
				price: price
            });
        })
        // 删除已选选项
        $('.fastui-select-product').on('click', '.layui-icon-add-circle-fine', function() {
            var id = $(this).parent().attr('data-id');
            for (var i = 0; i < options.length; i++) {
                if (options[i].id == id) {
                    options.splice(i, 1);
                }
            }
            $(this).parent().parent().remove();
        });
        // 监听input框实现实时搜索
        function inputClick() {
            var word = $('.fastui-select-product input').val();
            $(".fastui-select-product #product-list").html(
                '<table id="select-product-layer" lay-filter="select-product-layer"></table>');
            // 渲染部门树结构
            table.render({
                elem: '#select-product-layer',
                url: e.url + '?name=' + word,
                size: 'sm',
                page: true,
                limit: 10,
                cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                cols: [
                    [{
                        field: 'id',
                        width: 80,
                        title: '编号'
                    }, {
                        field: 'name',
                        title: '商品名称'
                    }, {
                        field: 'price',
                        width: 120,
                        title: '商品价格'
                    }]
                ],
                done: function(){
                    $("div[lay-id='select-product-layer'] table").find("tr").each(function(){
                        if($(this).find('td[data-field="id"]').find('div').text() == options[0].id){
                            $(this).addClass('selected');
                        }
                    })
                }
            });
            table.on('row(select-product-layer)', function(obj) {
                var clickTitle = obj.data.name == undefined ? "" : obj.data.name;
                var clickId = obj.data.id == undefined ? "" : Number(obj.data.id);
                var price = obj.data.price == undefined ? "" : Number(obj.data.price);
                obj.tr.addClass('selected').siblings().removeClass('selected');
                options.length = 0;
                options.push({
                    title: clickTitle,
                    id: clickId,
					price: price
                });
            })
        }
        $('.fastui-select-product').on('click', '.layui-form-item i', function() {
            inputClick();
        })
        $('.fastui-select-product').on('click', '#product-search', function(){
            inputClick();
        })
        $('.fastui-select-product .layui-form-item input').on('keypress', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                inputClick();
            }
        })

    }

    var product = {
        open: open,
        close: close
    };

    window.product = product;
    exports('product', product);
});