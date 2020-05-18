layui.define(["jquery"], function (exports) {
    var MODULE = "url"
    	,BASE_URL = "/app/v2";

    var URL = function() {
    	this.version = "1.0.0";
    }
    
    /**
     * 应用管理相关URL
     */
    app_manage = {
            // 获取子角色信息
            GET_SUBROLES : BASE_URL + "/authorize/role/getSubRoles"
            ,SET_SUBROLES: BASE_URL + "/authorize/role/setSubRoles"
    };
    
    URL.prototype = {
            /* ****************************** 转场相关 ****************************** */
            // 显示员工授权页面
            VIEW_USER_AUTHORIZE: "/user/authorize.html",
            // 应用导航页面打开新的APP页
            VIEW_NEW_APP: "/app/redirect"
            
        };
    
    
    URL.prototype.app_manage = app_manage;
    
    var url = new URL();
    
    exports(MODULE, url);
});