package com.github.mbw.commons.results;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

/**
 * 分页数据响应类
 * @author Mabowen
 * @date 2020-01-08 09:25
 */
public class ResponsePage implements Serializable {
    private static final long serialVersionUID = 919707890666135330L;

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
    private boolean success;
    private Integer code;
    private String message;
    private long count;
    private Object data;

    public ResponsePage() {
    }

    public static ResponsePage newFailed() {
        return newFailed("Failed");
    }

    public static ResponsePage newFailed(String errorMsg) {
        ResponsePage responsePage = new ResponsePage();
        responsePage.setSuccess(false);
        responsePage.setCode(DEFAULT_ERROR);
        responsePage.setMessage(errorMsg);
        responsePage.setCount(0);
        responsePage.setData(null);
        return responsePage;
    }

    public static ResponsePage newSuccess() {
        return newSuccess("Success", null, 0);
    }

    public static ResponsePage newSuccess(String msg) {
        return newSuccess(msg, null, 0);
    }

    public static ResponsePage newSuccess(Object data, long count) {
        return newSuccess("Success", data, count);
}

    public static ResponsePage newSuccess(String msg, Object data, long count) {
        ResponsePage responsePage = new ResponsePage();
        responsePage.setSuccess(true);
        responsePage.setCode(OK);
        responsePage.setMessage(msg);
        responsePage.setData(data);
        responsePage.setCount(count);
        return responsePage;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof ResponsePage)) {
            return false;
        }

        ResponsePage that = (ResponsePage) o;

        return new EqualsBuilder()
                .append(success, that.success)
                .append(count, that.count)
                .append(code, that.code)
                .append(message, that.message)
                .append(data, that.data)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(success)
                .append(code)
                .append(message)
                .append(count)
                .append(data)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "PageResult{" +
                "success=" + success +
                ", code=" + code +
                ", message='" + message + '\'' +
                ", count=" + count +
                ", data=" + data +
                '}';
    }
}
