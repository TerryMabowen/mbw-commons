layui.define(function(exports){
  
	layui.use(['jquery',  'form',  'element','layer', 'table'], function() {
		 var $ = layui.jquery,
		 element = layui.element,
		 form = layui.form;
		 layer = layui.layer;
		 table = layui.table;
		
		 //保存更新角色
		form.on('submit(formSaveRole)', function(data){
			 $.ajax({
	             url: $("#basePath").val() +"/changeRole",
	             type: "post",
	             data: data.field,
	             success: function (result) {
	            	 if(result.status == 200){
	            		 layer.closeAll();
	            		 layer.msg("切换角色成功");
	            		 location.reload();
	            	 }else{
	            		 layer.msg("切换角色失败:" + result.data);
	            	 }
	             }
	         });
			return false;
		});
		
		 //保存更新校区
		form.on('submit(formSaveSchool)', function(data){
			 $.ajax({
	             url: $("#basePath").val() + "/changeSchool",
	             type: "post",
	             data: data.field,
	             success: function (result) {
	            	 if(result.status == 200){
	            		 layer.closeAll();
	            		 layer.msg("设置校区成功");
	            		 location.reload();
	            	 }else{
	            		 layer.msg("设置校区失败:" + result.data);
	            	 }
	             }
	         });
			return false;
		});
		
		element.on('nav(user_operation)', function(obj){
		    if($.trim(obj.text()) == '切换角色'){//elem.event
		    	$("#queryroles").html("");
		    	//加载角色列表
		    	$.post( $("#basePath").val() + "/queryrolesData.json",function(result){
					var data = result.data;
					if(data.length > 0){
						var html = '';
						for(var i=0; i < data.length; i++){
							html += ' <input type="radio" name="currentRoleId" value="' + data[i].id + '" title="' + data[i].name +'">';
						}
						$("#queryroles").append(html);
						//默认赋值
						$("input[name='currentRoleId'][value="+result.currentRoleId+"]").attr("checked",true)
						form.render("radio");
					}
					layer.open({
						title:'切换角色',
						type:1,
						content:$("#changeRolelog"),
						shade:0.01,
						area:['500px', '300px']
					});
				},"json");
		    
		    }else  if($.trim(obj.text()) == '设置默认校区'){//elem.event
		    	$("#queryschools").html("");
		    	//加载校区选项
				$.post($("#basePath").val() + "/queryschoolsData.json",function(result){
					var data = result.data;
					if(data.length > 0){
						var html = '';
						for(var i=0; i < data.length; i++){
							html += ' <input type="radio" name="defaultSchoolId" value="' + data[i].id + '" title="' + data[i].name +'">';
						}
						$("#queryschools").append(html);
						//默认赋值
						$("input[name='defaultSchoolId'][value="+result.defaultSchoolId+"]").attr("checked",true)
						form.render("radio");
					}
					layer.open({
						title:'设置默认校区',
						type:1,
						content:$("#changeSchoollog"),
						shade:0.01,
						area:['500px', '300px']
					});
				},"json");
		    }
		  });
		
		$("#message").on("click", function() {
			var loading_index = layer.load(1, {
				  shade: [0.1,'#fff']
				});	
			$.post($("#basePath").val() + "/findNewMessages.json",function(result){
				layer.close(loading_index);
				if(result.status == 200){
					$("#messageNum").remove();
					var tabledata = result.data;
					if(tabledata.length > 0){
						table.render({
	        				data:tabledata,
	        				limit:100,
	        				elem:'#messageTable',
	        				cols:[[
	        					{field:'typeText', width:'110', title:"消息类型"},
	        					{field:'content', width:'300', title:"消息内容"},
	        					{field:'schoolName', width:'150', title:"校区"}
	        					]]
	        			});
						
						layer.open({
							title:'最新消息列表',
							type:1,
							content:$("#messageDialog"),
							shade:0.01,
							area:['600px', '300px']
						});
					}else{
						layer.msg("暂无最新消息");
					}
				}else{
					layer.msg("获取失败:" + result.data);
				}
				
			},"json");
		});
	});

  exports('header', {})
});