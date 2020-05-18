package com.github.mbw.commons.throwable;

/**
 * @author Mabowen
 * @date 2019-12-20 17:05
 */
public class AssertException extends ServiceException {
    private static final long serialVersionUID = -162456259376571319L;

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
