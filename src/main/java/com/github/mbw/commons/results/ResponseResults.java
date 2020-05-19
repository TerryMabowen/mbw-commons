package com.github.mbw.commons.results;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

/**
 * 后端返回前端数据响应类
 * @author Mabowen
 * @date 2019-12-20 17:24
 */
public class ResponseResults implements Serializable {
    private static final long serialVersionUID = -3416308495731001893L;

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

        return new EqualsBuilder()
                .append(success, that.success)
                .append(data, that.data)
                .append(message, that.message)
                .append(code, that.code)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(success)
                .append(data)
                .append(message)
                .append(code)
                .toHashCode();
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
