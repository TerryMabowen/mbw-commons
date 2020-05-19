package com.github.mbw.commons.lang.response;

import java.io.Serializable;

/**
 * 分页数据响应类
 *
 * @author Mabowen
 * @date 2020-05-19 17:17
 */
public class ResponsePage implements Serializable {
    private static final long serialVersionUID = -8322865242392387264L;

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

    public ResponsePage setSuccess(boolean success) {
        this.success = success;
        return this;
    }

    public Integer getCode() {
        return code;
    }

    public ResponsePage setCode(int code) {
        this.code = code;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public ResponsePage setMessage(String message) {
        this.message = message;
        return this;
    }

    public long getCount() {
        return count;
    }

    public ResponsePage setCount(long count) {
        this.count = count;
        return this;
    }

    public Object getData() {
        return data;
    }

    public ResponsePage setData(Object data) {
        this.data = data;
        return this;
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

        if (success != that.success) {
            return false;
        }
        if (count != that.count) {
            return false;
        }
        if (!code.equals(that.code)) {
            return false;
        }
        if (!message.equals(that.message)) {
            return false;
        }
        return data.equals(that.data);
    }

    @Override
    public int hashCode() {
        int result = (success ? 1 : 0);
        result = 31 * result + code.hashCode();
        result = 31 * result + message.hashCode();
        result = 31 * result + (int) (count ^ (count >>> 32));
        result = 31 * result + data.hashCode();
        return result;
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
