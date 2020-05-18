package com.github.mbw.commons.kit.valid;

import org.apache.commons.lang3.StringUtils;

import java.util.Collection;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Mabowen
 * @date 2019-12-20 17:07
 */
public class RegexUtils {
    public RegexUtils() {
    }

    public static final boolean isNull(Object[] objs) {
        return objs == null || objs.length == 0;
    }

    public static final boolean isNull(Integer integer) {
        return integer == null || integer == 0;
    }

    public static final boolean isNull(Collection<?> collection) {
        return collection == null || collection.size() == 0;
    }

    public static final boolean isNull(Map<?, ?> map) {
        return map == null || map.size() == 0;
    }

    public static final boolean isNull(String str) {
        return str == null || "".equals(str.trim()) || "null".equals(str.toLowerCase());
    }

    public static final boolean isNull(Long longs) {
        return longs == null || longs == 0L;
    }

    public static final boolean isNotNull(Long longs) {
        return !isNull(longs);
    }

    public static final boolean isNotNull(String str) {
        return !isNull(str);
    }

    public static final boolean isNotNull(Collection<?> collection) {
        return !isNull(collection);
    }

    public static final boolean isNotNull(Map<?, ?> map) {
        return !isNull(map);
    }

    public static final boolean isNotNull(Integer integer) {
        return !isNull(integer);
    }

    public static final boolean isNotNull(Object[] objs) {
        return !isNull(objs);
    }

    public static final boolean isUrl(String str) {
        return match(str, "^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$");
    }

    public static final boolean isPwd(String str) {
        return match(str, "^[a-zA-Z]\\w{6,12}$");
    }

    public static final boolean stringCheck(String str) {
        return match(str, "^[a-zA-Z0-9一-龥-_]+$");
    }

    public static final boolean isEmail(String str) {
        return match(str, "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    }

    public static final boolean isInteger(String str) {
        return match(str, "^[+]?\\d+$");
    }

    public static final boolean isNumeric(String str) {
        return isFloat(str) || isInteger(str);
    }

    public static final boolean isDigits(String str) {
        return match(str, "^[0-9]*$");
    }

    public static final boolean isFloat(String str) {
        return match(str, "^[-\\+]?\\d+(\\.\\d+)?$");
    }

    public static final boolean isTel(String text) {
        return isMobile(text) || isPhone(text);
    }

    public static final boolean isPhone(String text) {
        return match(text, "^(\\d{3,4}-?)?\\d{7,9}$");
    }

    public static final boolean isMobile(String text) {
        return text.length() != 11 ? false : match(text, "^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]){1}|(14[0-9]){1}|(18[0-9]{1}))+\\d{8})$");
    }

    public static final boolean isIdCardNo(String text) {
        return match(text, "^(\\d{6})()?(\\d{4})(\\d{2})(\\d{2})(\\d{3})(\\w)$");
    }

    public static final boolean isZipCode(String text) {
        return match(text, "^[0-9]{6}$");
    }

    public static final boolean isIntEqZero(int num) {
        return num == 0;
    }

    public static final boolean isIntGtZero(int num) {
        return num > 0;
    }

    public static final boolean isIntGteZero(int num) {
        return num >= 0;
    }

    public static final boolean isFloatEqZero(float num) {
        return num == 0.0F;
    }

    public static final boolean isFloatGtZero(float num) {
        return num > 0.0F;
    }

    public static final boolean isFloatGteZero(float num) {
        return num >= 0.0F;
    }

    public static final boolean isRightfulString(String text) {
        return match(text, "^[A-Za-z0-9_-]+$");
    }

    public static final boolean isEnglish(String text) {
        return match(text, "^[A-Za-z]+$");
    }

    public static final boolean isChineseChar(String text) {
        return match(text, "^[Α-￥]+$");
    }

    public static final boolean isChinese(String text) {
        return match(text, "^[一-龥]+$");
    }

    public static boolean isContainsSpecialChar(String text) {
        if (StringUtils.isBlank(text)) {
            return false;
        } else {
            String[] chars = new String[]{"[", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "|", "{", "}", "'", ":", ";", "'", ",", "[", "]", ".", "<", ">", "/", "?", "~", "！", "@", "#", "￥", "%", "…", "&", "*", "（", "）", "—", "+", "|", "{", "}", "【", "】", "‘", "；", "：", "”", "“", "’", "。", "，", "、", "？", "]"};
            String[] var2 = chars;
            int var3 = chars.length;

            for(int var4 = 0; var4 < var3; ++var4) {
                String ch = var2[var4];
                if (text.contains(ch)) {
                    return true;
                }
            }

            return false;
        }
    }

    public static String stringFilter(String text) {
        String regExpr = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
        Pattern p = Pattern.compile(regExpr);
        Matcher m = p.matcher(text);
        return m.replaceAll("").trim();
    }

    public static String htmlFilter(String inputString) {
        String htmlStr = inputString;
        String textStr = "";

        try {
            String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>";
            String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>";
            String regEx_html = "<[^>]+>";
            String patternStr = "\\s+";
            Pattern p_script = Pattern.compile(regEx_script, 2);
            Matcher m_script = p_script.matcher(htmlStr);
            htmlStr = m_script.replaceAll("");
            Pattern p_style = Pattern.compile(regEx_style, 2);
            Matcher m_style = p_style.matcher(htmlStr);
            htmlStr = m_style.replaceAll("");
            Pattern p_html = Pattern.compile(regEx_html, 2);
            Matcher m_html = p_html.matcher(htmlStr);
            htmlStr = m_html.replaceAll("");
            Pattern p_ba = Pattern.compile(patternStr, 2);
            Matcher m_ba = p_ba.matcher(htmlStr);
            htmlStr = m_ba.replaceAll("");
            textStr = htmlStr;
        } catch (Exception var15) {
            System.err.println("Html2Text: " + var15.getMessage());
        }

        return textStr;
    }

    private static final boolean match(String text, String reg) {
        return !StringUtils.isBlank(text) && !StringUtils.isBlank(reg) ? Pattern.compile(reg).matcher(text).matches() : false;
    }

}
