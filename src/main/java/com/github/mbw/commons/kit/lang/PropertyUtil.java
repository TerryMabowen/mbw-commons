package com.github.mbw.commons.kit.lang;





import org.apache.commons.lang.StringEscapeUtils;

import java.lang.reflect.Field;
import java.util.regex.Pattern;

/**
 * 类属性相关工具类
 * @author Mabowen
 * @date 2020-03-10 10:10
 */
public class PropertyUtil {
    // 正则表达式校验，可以通过预编译的方式提高效率，这样写比在方法体中更好
    private static final Pattern NUMBER_REGEX_CHECK = Pattern.compile("^[-\\+]?[.\\d]*$");

    /**
     * @description 验证传入的字符串是否是数字
     * @author Mabowen
     * @date 10:46 2020-03-10
     * @param str
     * @return true 是数字， false 不是数字
     */
    public static boolean isNumber(String str) {
        if (null == str || "".equals(str.trim())) {
            return false;
        }

        return NUMBER_REGEX_CHECK.matcher(str).matches();
    }

    /**
     * @description  将空字符串属性值置为null
     * @author Mabowen
     * @date 10:45 2020-03-10
     * @param source
     * @return T
     */
    public static <T> T setNullValue(T source) throws IllegalArgumentException, IllegalAccessException, SecurityException {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            if ("class java.lang.String".equals(field.getGenericType().toString())) {
                field.setAccessible(true);
                Object obj = field.get(source);
                if ("".equals(obj)) {
                    field.set(source, null);
                } else if (obj != null) {
                    String str = obj.toString();
                    str = StringEscapeUtils.escapeSql(str);//StringEscapeUtils是commons-lang中的通用类
                    field.set(source, str.replace("\\", "\\" + "\\").replace("(", "\\(").replace(")", "\\)")
                            .replace("%", "\\%").replace("*", "\\*").replace("[", "\\[").replace("]", "\\]")
                            .replace("|", "\\|").replace(".", "\\.").replace("$", "\\$").replace("+", "\\+").trim()
                    );
                }
            }
        }
        return source;
    }
}
