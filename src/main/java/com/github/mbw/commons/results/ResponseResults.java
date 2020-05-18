package com.github.mbw.commons.results;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;


/**
 * 后端返回前端数据响应类
 * @author Mabowen
 * @date 2019-12-20 17:24
 */
@Data
@ToString
@Accessors(chain = true)
public class ResponseResults {
    /**
     * 网络请求的状态码
     */
    public static final int OK = 0;
    public static final int SUCCESS = 200;
    public static final int DEFAULT_ERROR = 500;
    public static final int FORBIDDEN = 403;
    public static final int PARAM_ERROR = 400;

    /**
     * 属性
     */
    private boolean success;
    private Object data;
    private String message;
    private int status;
    private Integer code;
    private String codeMsg;

    public ResponseResults() {
    }

    public ResponseResults(int status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static ResponseResults newSuccess() {
        ResponseResults rd = new ResponseResults();
        rd.setStatus(SUCCESS);
        rd.setMessage("Success");
        return rd;
    }

    public static ResponseResults newSuccess(String message) {
        ResponseResults rd = new ResponseResults();
        rd.setStatus(SUCCESS);
        rd.setMessage(message);
        return rd;
    }

    public static ResponseResults newSuccess(Object data) {
        return newSuccess("", data);
    }

    public static ResponseResults newSuccess(String message, Object data) {
        ResponseResults rd = new ResponseResults();
        rd.setStatus(SUCCESS);
        rd.setMessage(message);
        return rd;
    }

    public static ResponseResults newFailed() {
        ResponseResults rd = new ResponseResults();
        rd.message = "Failed";
        rd.data = "Failed";
        rd.setStatus(DEFAULT_ERROR);
        return rd;
    }

    public static ResponseResults newFailed(String message) {
        ResponseResults rd = new ResponseResults();
        rd.message = message;
        rd.data = message;
        rd.setStatus(DEFAULT_ERROR);
        return rd;
    }

    public static ResponseResults newFailed(Object data) {
        return newFailed("", data);
    }

    public static ResponseResults newFailed(String message, Object data) {
        ResponseResults rd = new ResponseResults();
        rd.message = message;
        rd.data = data;
        rd.setStatus(DEFAULT_ERROR);
        return rd;
    }

    /**
     * 请求是否成功
     * 仅仅指网络请求和参数没有错误，Provider没有内部错误
     * @return true:成功；false：失败
     */
    public boolean isSuccess() {
        return this.code == OK;
    }
}
