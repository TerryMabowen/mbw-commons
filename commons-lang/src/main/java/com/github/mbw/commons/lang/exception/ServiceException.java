package com.github.mbw.commons.lang.exception;

/**
 * @author Mabowen
 * @date 2019-12-20 17:04
 */
public class ServiceException extends RuntimeException {
    private static final long serialVersionUID = -8933234650805836993L;
    private String errorCode;

    public ServiceException(String msg) {
        super(msg);
    }

    public ServiceException(String errorCode, String msg) {
        super(msg);
        this.errorCode = errorCode;
    }

    public ServiceException(String msg, Throwable exception) {
        super(msg, exception);
    }

    public ServiceException(String errorCode, String msg, Throwable exception) {
        super(msg, exception);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return this.errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
