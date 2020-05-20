/**
 * smthit插件，封装网络请求
 * @param exports
 * @returns
 */
layui.define(["jquery"], function (exports) {
	var $ = layui.$;
	
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
			$.ajax(url, {
		        type: type,
		        data: params,
		        success: function (response) {
		            if (response.status === 200) {
		            	resolve(response);
		            } else {
		            	reject(response);
		            }
		        },
		        error: function () {
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
    	} 
    });
});