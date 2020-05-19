package com.github.mbw.commons.lang.response;

import java.io.Serializable;

/**
 * 后端返回前端数据响应类
 *
 * @author Mabowen
 * @date 2020-05-19 17:15
 */
public class ResponseResults implements Serializable {
    private static final long serialVersionUID = 5390343053421148656L;

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
    private Integer code;

    public ResponseResults() {
    }

    public static ResponseResults newSuccess() {
        return newSuccess("Success", null);
    }

    public static ResponseResults newSuccess(String message) {
        return newSuccess(message, null);
    }

    public static ResponseResults newSuccess(Object data) {
        return newSuccess("Success", data);
    }

    public static ResponseResults newSuccess(String message, Object data) {
        ResponseResults rd = new ResponseResults();
        rd.setSuccess(true);
        rd.setCode(SUCCESS);
        rd.setMessage(message);
        rd.setData(data);
        return rd;
    }

    public static ResponseResults newFailed() {
        return newFailed("Failed", null);
    }

    public static ResponseResults newFailed(String message) {
        return newFailed(message, null);
    }

    public static ResponseResults newFailed(Object data) {
        return newFailed("Failed", data);
    }

    public static ResponseResults newFailed(String message, Object data) {
        ResponseResults rd = new ResponseResults();
        rd.setSuccess(false);
        rd.setMessage(message);
        rd.setData(data);
        rd.setCode(DEFAULT_ERROR);
        return rd;
    }

    public boolean isSuccess() {
        return success;
    }

    public ResponseResults setSuccess(boolean success) {
        this.success = success;
        return this;
    }

    public Object getData() {
        return data;
    }

    public ResponseResults setData(Object data) {
        this.data = data;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public ResponseResults setMessage(String message) {
        this.message = message;
        return this;
    }

    public Integer getCode() {
        return code;
    }

    public ResponseResults setCode(Integer code) {
        this.code = code;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResponseResults)) {
            return false;
        }

        ResponseResults that = (ResponseResults) o;

        if (success != that.success) {
            return false;
        }
        if (!data.equals(that.data)) {
            return false;
        }
        if (!message.equals(that.message)) {
            return false;
        }
        return code.equals(that.code);
    }

    @Override
    public int hashCode() {
        int result = (success ? 1 : 0);
        result = 31 * result + data.hashCode();
        result = 31 * result + message.hashCode();
        result = 31 * result + code.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "ResponseResults{" +
                "success=" + success +
                ", code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
