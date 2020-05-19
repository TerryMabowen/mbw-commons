package com.github.mbw.commons.lang.response;

import java.io.Serializable;

/**
 * 接口响应接收类
 *
 * @author Mabowen
 * @date 2020-05-19 17:11
 */
public class ResponseBean<T> implements Serializable {
    private static final long serialVersionUID = 8250867438041566267L;

    /**
     * 网络请求的成功的状态
     */
    public static final int OK = 0;
    public static final int ERROR = 500;
    public static final int FORBIDDEN = 403;
    public static final int PARAM_ERROR = 400;
    private boolean success;
    private T data;
    private String message;
    private Integer code;

    public ResponseBean() {
    }

    public static <T> ResponseBean<T> newSuccess() {
        return newSuccess("Success", null);
    }

    public static <T> ResponseBean<T> newSuccess(String message) {
        return newSuccess(message, null);
    }

    public static <T> ResponseBean<T> newSuccess(T data) {
        return newSuccess("Success", data);
    }

    public static <T> ResponseBean<T> newSuccess(String message, T data) {
        ResponseBean<T> responseBean = new ResponseBean<T>();
        responseBean.setSuccess(true);
        responseBean.setCode(OK);
        responseBean.setMessage(message);
        responseBean.setData(data);
        return responseBean;
    }

    public static <T> ResponseBean<T> newFailed() {
        return newSuccess("Success", null);
    }

    public static <T> ResponseBean<T> newFailed(String message) {
        return newSuccess(message, null);
    }

    public static <T> ResponseBean<T> newFailed(String message, T data) {
        ResponseBean<T> responseBean = new ResponseBean<T>();
        responseBean.setSuccess(false);
        responseBean.setCode(ERROR);
        responseBean.setMessage(message);
        responseBean.setData(data);
        return responseBean;
    }

    public boolean isSuccess() {
        return success;
    }

    public ResponseBean<T> setSuccess(boolean success) {
        this.success = success;
        return this;
    }

    public T getData() {
        return data;
    }

    public ResponseBean<T> setData(T data) {
        this.data = data;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public ResponseBean<T> setMessage(String message) {
        this.message = message;
        return this;
    }

    public Integer getCode() {
        return code;
    }

    public ResponseBean<T> setCode(Integer code) {
        this.code = code;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResponseBean)) {
            return false;
        }

        ResponseBean<?> that = (ResponseBean<?>) o;

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
        return "ResponseBean{" +
                "success=" + success +
                ", code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
