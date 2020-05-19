/**
 * smthit插件，封装网络请求
 * @param exports
 * @returns
 */
layui.define(["jquery", "layer"], function (exports) {
	var $ = layui.$;
	var layer = layui.layer;
	
	function getData(url, params) {
		return  new Promise(function(resolve, reject) {
			$.getJSON(url, params, function(result){
				if(result.success) {
					resolve(result);
				} else {
					reject(result);
				}
			});
		});
	}
	
	function postData(url, params) {
		return httpRequest(url, params, 'post');
	}
	
	function deleteData(url, params) {
		return httpRequest(url, params, 'delete');		
	}
	
	function putData(url, params) {
		return httpRequest(url, params, 'put');	
	}
	
	function httpRequest(url, params, type) {
		return new Promise(function(resolve, reject) {
			layer.load(2);
			$.ajax(url, {
		        type: type,
		        data: params,
		        success: function (response) {
		        	layer.closeAll('loading');
		            if (response.status === 200) {
		            	resolve(response);
		            } else {
		            	reject(response);
		            }
		        },
		        error: function () {
		        	layer.closeAll('loading');
		        	reject({
		        		success:false, 
		        		status:500, 
		        		message: "请求失败"
		        	});
		        }
		    })
		});
	}

	function postJsonData(url, params) {
		return httpJsonPostRequest(url, params);
	}

	function httpJsonPostRequest(url, params) {
		return new Promise(function(resolve, reject) {
			layer.load(2);
			$.ajax(url, {
				type: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(params),
				success: function (response) {
					layer.closeAll('loading');
					if (response.status === 200) {
						resolve(response);
					} else {
						reject(response);
					}
				},
				error: function () {
					layer.closeAll('loading');
					reject({
						success:false,
						status:500,
						message: "请求失败"
					});
				}
			})
		});
	}
	
    exports("smthit", {
    	http: {
    		getData:getData
    		,postData: postData
    		,deleteData: deleteData
    		,putData: putData
			,postJsonData: postJsonData
    	} 
    });
});