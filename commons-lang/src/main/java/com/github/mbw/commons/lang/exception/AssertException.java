package com.github.mbw.commons.lang.exception;

/**
 * @author Mabowen
 * @date 2019-12-20 17:05
 */
public class AssertException extends ServiceException {
    private static final long serialVersionUID = -1425170114646296669L;

    public AssertException(String msg) {
        super(msg);
    }

    public AssertException(String errorCode, String msg) {
        super(errorCode, msg);
    }

    public AssertException(String msg, Throwable exception) {
        super(msg, exception);
    }

    public AssertException(String errorCode, String msg, Throwable exception) {
        super(errorCode, msg, exception);
    }
}
