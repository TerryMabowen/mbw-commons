package com.github.mbw.commons.util.validate;

import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * 手机号校验工具类
 * @author Mabowen
 * @date 2020/01/11 23:21
 */
public class PhoneCheckUtil {
    private static Pattern CHINA_PHONE_LEGAL = Pattern.compile("^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\\d{8}$");
    private static Pattern HK_PHONE_LEGAL = Pattern.compile("^([5689])\\d{7}$");

    /**
     * 大陆号码或香港号码均可
     */
    public static boolean isPhoneLegal(String str)throws PatternSyntaxException {
        return isChinaPhoneLegal(str) || isHKPhoneLegal(str);
    }

    /**
     * 大陆手机号码11位数，匹配格式：前三位固定格式+后8位任意数
     * 此方法中前三位格式有：
     * 13+任意数
     * 15+除4的任意数
     * 18+除1和4的任意数
     * 17+除9的任意数
     * 147
     */
    public static boolean isChinaPhoneLegal(String str) throws PatternSyntaxException {
        if (null == str || "".equals(str)) {
            return false;
        }
        return CHINA_PHONE_LEGAL.matcher(str).matches();
    }

    /**
     * 香港手机号码8位数，5|6|8|9开头+7位任意数
     */
    public static boolean isHKPhoneLegal(String str) throws PatternSyntaxException {
        if (null == str || "".equals(str)) {
            return false;
        }
        return HK_PHONE_LEGAL.matcher(str).matches();
    }
}
