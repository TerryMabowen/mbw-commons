package com.github.mbw.commons.results;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

/**
 * 分页数据响应类
 * @author Mabowen
 * @date 2020-01-08 09:25
 */
@Data
@ToString
@Accessors(chain = true)
public class PageResult {
    /**
     * 网络请求的成功的状态
     */
    public static final int OK = 0;
    public static final int SUCCESS = 200;
    public static final int DEFAULT_ERROR = 500;
    public static final int FORBIDDEN = 403;
    public static final int PARAM_ERROR = 400;

    /**
     * 属性
     */
    private int code;
    private String msg;
    private long count;
    private Object data;

    public PageResult() {
    }

    public static PageResult newFailed() {
        PageResult responsePage = new PageResult();
        responsePage.setCode(DEFAULT_ERROR);
        responsePage.setMsg("Failed");

        return responsePage;
    }

    public static PageResult newFailed(String errorMsg) {
        PageResult responsePage = new PageResult();
        responsePage.setCode(DEFAULT_ERROR);
        responsePage.setMsg(errorMsg);

        return responsePage;
    }

    public static PageResult newSuccess() {
        PageResult responsePage = new PageResult();
        responsePage.setCode(OK);
        responsePage.setMsg("Success");

        return responsePage;
    }

    public static PageResult newSuccess(String msg) {
        PageResult responsePage = new PageResult();
        responsePage.setCode(OK);
        responsePage.setMsg(msg);

        return responsePage;
    }

    public static PageResult newSuccess(Object data) {
        PageResult responsePage = new PageResult();
        responsePage.setCode(OK);
        responsePage.setMsg("Success");
        responsePage.setData(data);
        return responsePage;
    }

    public static PageResult newSuccess(String msg, Object data) {
        PageResult responsePage = new PageResult();
        responsePage.setCode(OK);
        responsePage.setMsg(msg);
        responsePage.setData(data);
        return responsePage;
    }

}
