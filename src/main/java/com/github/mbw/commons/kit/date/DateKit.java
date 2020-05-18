package com.github.mbw.commons.kit.date;

import com.github.mbw.commons.throwable.ServiceException;
import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * TODO
 *
 * @author Mabowen
 * @date 2020-04-08 22:07
 */
public class DateKit {
    private static final String PATTERN = "yyyy-MM-dd HH:mm:ss";

    /**
     * TODO
     * @author Mabowen
     * @date 22:12 2020-04-08
     * @param
     * @return
     */
    public static String format(Date date, String pattern) {
        if (StringUtils.isBlank(pattern)) {
            pattern = PATTERN;
        }

        if (null == date) {
            throw new ServiceException("date can not is null");
        }

        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * TODO
     * @author Mabowen
     * @date 09:50 2020-04-09
     */
    public static Date parse(String str, String pattern) {
        if (StringUtils.isBlank(pattern)) {
            pattern = PATTERN;
        }

        if (StringUtils.isBlank(str)) {
            throw new ServiceException("date str can not is empty");
        }

        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        try {
            return sdf.parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new ServiceException("parse date str exception：" + e.getMessage(), e);
        }
    }

    /**
     * 获取当前时间戳---精确到毫秒
     * @author bowen.M
     * @param
     * @date 2020/02/20 14:57
     * @return
     */
    public static String getCurrentTimestamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmssSSS");
        Date date = new Date();
        return sdf.format(date);
    }
}
