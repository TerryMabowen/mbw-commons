package com.github.mbw.commons.results;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

/**
 * 接口响应接收类
 *
 * @author Mabowen
 * @date 2020-05-19 10:13
 */
public class ResponseBean<T> implements Serializable {
    private static final long serialVersionUID = -9052894692203855750L;
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

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
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
        return "ResponseBean{" +
                "success=" + success +
                ", code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
